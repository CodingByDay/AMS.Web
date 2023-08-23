import { EventDispatcher } from '../../../base-utils/event-dispatcher';
import { BatchUpdatableObject } from '@devexpress/utils/lib/class/batch-updatable';
import { Errors } from '@devexpress/utils/lib/errors';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { MeasureInfoText } from '../../measurer/measure-info';
import { CharacterPropertiesCache } from '../../model/caches/hashed-caches/character-properties-cache';
import { ChangesManager } from '../changes/engine/changes-manager';
import { AnchoredObjectsManager } from '../floating/anchored-objects-manager';
import { BaseFormatter } from '../formatter/base-formatter';
import { MainFormatter } from '../formatter/main-formatter';
import { ModelChangesListener } from '../formatter/model-changes-listener';
import { OtherPageAreaFormatter } from '../formatter/other-page-area-formatter';
import { BoundsCalculator } from '../formatter/utils/bounds-calculator';
import { FloatingRestartInfoHolder } from '../formatter/utils/floating-restart-info-holder';
import { LayoutDependentRunCache } from '../formatter/utils/layout-dependent-cache';
import { RemoveRedundantHelper } from '../formatter/utils/remove-redundant-helper';
import { LayoutInvalidator } from '../invalidator/layout-invalidator';
import { RestartManager } from './restart-manager';
export class FormatterManager extends BatchUpdatableObject {
    constructor(measurer, innerClientProperties, model, layout, activeSubDocumentHolder, bookmarksSettings, documentProtectionSettings, controlHeightProvider, stringResources, layoutChangesListeners) {
        super();
        this.formatterProcessID = null;
        this.unhideProcessID = null;
        this._isDocumentOpened = false;
        this.onLayoutChangedDispatcher = new EventDispatcher();
        this.measurer = measurer;
        this.innerClientProperties = innerClientProperties;
        this.model = model;
        this.layout = layout;
        this.activeSubDocumentHolder = activeSubDocumentHolder;
        this.bookmarksSettings = bookmarksSettings;
        this.documentProtectionSettings = documentProtectionSettings;
        this.controlHeightProvider = controlHeightProvider;
        this.stringResources = stringResources;
        ListUtils.forEach(layoutChangesListeners, (l) => this.onLayoutChangedDispatcher.add(l));
        this.floatingRestartInfoHolder = new FloatingRestartInfoHolder();
        this.mainFormatter = new MainFormatter(this);
        this.activeFormatter = this.mainFormatter;
        this.formatters = {};
        this.changesManager = new ChangesManager();
        this.boundsCalculator = new BoundsCalculator();
        this.invalidator = new LayoutInvalidator(this);
        this.modelChangesListener = new ModelChangesListener(this.invalidator);
        this.removeRedundantHelper = new RemoveRedundantHelper(this.changesManager);
        this.otherPageAreaFormatter = new OtherPageAreaFormatter(this);
        this.layoutDependentRunCache = new LayoutDependentRunCache(this);
        this.restartManager = new RestartManager(this);
        this.anchoredObjectsManager = new AnchoredObjectsManager(this);
    }
    get activeSubDocument() { return this.activeSubDocumentHolder.activeSubDocument; }
    get isDocumentOpened() { return this._isDocumentOpened; }
    dispose() {
        clearTimeout(this.formatterProcessID);
        clearTimeout(this.unhideProcessID);
    }
    onUpdateUnlocked(_occurredEvents) {
        if (this._isDocumentOpened)
            this.restartManager.startFormatting();
    }
    getLayoutFormatter(subDocumentId) {
        const formatter = this.formatters[subDocumentId];
        return formatter ? formatter : this.formatters[subDocumentId] = new BaseFormatter(this, subDocumentId);
    }
    openDocument() {
        this._isDocumentOpened = true;
        this.activeFormatter = this.mainFormatter;
    }
    closeDocument() {
        this._isDocumentOpened = false;
        this.stopFormatting();
        this.formatters = {};
        this.changesManager.reset();
        this.layoutDependentRunCache.reset();
        this.restartManager.reset();
    }
    runFormatting(pageIndex) {
        if (!this._isDocumentOpened)
            return;
        if (this.isUpdateLocked())
            throw new Error(Errors.InternalException);
        this.formatPage(pageIndex);
        this.runFormattingAsync();
    }
    runFormattingAsync() {
        if (this.formatterProcessID || this.isUpdateLocked() || !this._isDocumentOpened)
            return;
        const asyncCalculating = () => {
            if (this.isLocked()) {
                this.formatterProcessID = null;
                return;
            }
            for (let numRowsFormatAtTime = 10; numRowsFormatAtTime > 0; numRowsFormatAtTime--) {
                if (!this.mainFormatter.formatNext()) {
                    this.formatterProcessID = null;
                    break;
                }
            }
            if (this.formatterProcessID !== null)
                this.formatterProcessID = setTimeout(asyncCalculating, 0);
            this.checkMeasureValid();
        };
        this.formatterProcessID = setTimeout(asyncCalculating, 0);
    }
    checkMeasureValid() {
        if (this.measurer.resultsIsInvalid) {
            this.stopFormatting();
            if (this.unhideProcessID === null) {
                this.unhideProcessID = setInterval(() => {
                    if (this.measurer.resultsIsInvalid) {
                        const prop = CharacterPropertiesCache.getRareCharProperty(this.model.cache.fontInfoCache.fontMeasurer);
                        prop.fontInfo.reset();
                        this.measurer.measure([new MeasureInfoText("SomeUnusualText", prop)]);
                        prop.clearSizes();
                        prop.fontInfo.reset();
                    }
                    if (!this.measurer.resultsIsInvalid) {
                        if (this.unhideProcessID) {
                            clearInterval(this.unhideProcessID);
                            this.unhideProcessID = null;
                        }
                        this.invalidator.onChangedAllLayout();
                    }
                }, 1000);
            }
        }
    }
    forceFormatPage(pageIndex) {
        if (!this._isDocumentOpened)
            return;
        this.suspendUpdate();
        const page = this.formatPage(pageIndex);
        this.continueUpdate();
        return page;
    }
    formatSyncAllDocument() {
        this.suspendUpdate();
        while (this.mainFormatter.formatNext())
            ;
        this.checkMeasureValid();
        this.continueUpdate();
    }
    onPagesReady() {
        const mergedPageChanges = this.changesManager.getMergedPageChanges();
        this.changesManager.reset();
        this.onLayoutChangedDispatcher.listeners.forEach(listener => listener.NotifyPagesReady(mergedPageChanges));
        if (this.layout.isFullyFormatted)
            this.onLayoutChangedDispatcher.listeners.forEach(listener => listener.NotifyFullyFormatted(this.layout.pages.length));
    }
    formatPage(index) {
        if (this.isUpdateLocked())
            throw new Error("isUpdateLocked(). You can't call formatNext");
        while (index >= this.layout.validPageCount && this.mainFormatter.formatNext())
            ;
        this.checkMeasureValid();
        return this.layout.pages[index];
    }
    stopFormatting() {
        if (this.formatterProcessID) {
            clearTimeout(this.formatterProcessID);
            this.formatterProcessID = null;
        }
    }
}
