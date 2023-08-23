import { createUnitConverter } from '../base-utils/unit-converter';
import { DocumentFormat } from '../core/document-format';
import { FileNameHelper } from '../core/formats/file-name-helper';
import { FormatterManager } from '../core/layout-formatter/managers/formatter-manager';
import { AnchorObjectsPositionInfo, DocumentLayout } from '../core/layout/document-layout';
import { LayoutSelection } from '../core/layout/selection/layout-selection';
import { Measurer } from '../core/measurer/measurer';
import { FontInfoCache } from '../core/model/caches/hashed-caches/font-info-cache';
import { CharacterPropertyDescriptor } from '../core/model/character/character-property-descriptor';
import { DocumentModel } from '../core/model/document-model';
import { IsModified } from '../core/model/json/enums/json-top-level-enums';
import { RichUtils } from '../core/model/rich-utils';
import { SubDocumentInterval, SubDocumentPosition } from '../core/model/sub-document';
import { InnerClientProperties } from '../core/rich-utils/inner-client-properties';
import { SpellCheckerLayoutChangesListener, SpellCheckerModelChangesListener } from '../core/spelling/listeners';
import { SpellChecker } from '../core/spelling/spell-checker';
import { Browser } from '@devexpress/utils/lib/browser';
import { PdfHelperFrame } from '@devexpress/utils/lib/pdf/helper-frame';
import { DomUtils } from '@devexpress/utils/lib/utils/dom';
import { afterFontsLoaded, fontWebApiAvailable } from '@devexpress/utils/lib/utils/fonts';
import { StringUtils } from '@devexpress/utils/lib/utils/string';
import { HtmlImporter } from '../html/import/html-importer';
import { AutoCorrectService } from './auto-correct/auto-correct-service';
import { SimpleViewCanvasSizeManager } from './canvas/renderes/common/document-renderer';
import { ViewManager } from './canvas/renderes/view-manager';
import { ClientSideEvents } from './client-side-events';
import { RichEditClientCommand } from './commands/client-command';
import { CommandBase, CommandSimpleOptions } from './commands/command-base';
import { UpdateFieldCommandParameters } from './commands/fields/update-field-command';
import { EventManager } from './event-manager';
import { FocusManager } from './focus-manager';
import { GlobalEventDispatcher } from './global-event-dispatcher';
import { InputController } from './input-controller';
import { ReadOnlyMode } from './interfaces/i-rich-edit-core';
import { HitTestManager } from './layout-engine/hit-test-manager/hit-test-manager';
import { SelectionFormatter } from './layout-engine/selection/selection-formatter';
import { BoxVisualizerManager } from './layout-engine/visualizers/box-visualizer-manager';
import { PopupMenuManager } from './popup-menu-manager';
import { ScrollFormatter } from './scroll/scroll-formatter';
import { InputPosition } from './selection/input-position';
import { InputPositionModelChangesListener } from './selection/input-position-model-changes-listener';
import { Selection } from './selection/selection';
import { SelectionModelChangesListener } from './selection/selection-model-changes-listener';
import { ServerDispatcher } from './server-dispatcher';
import { ServerDispatcherModelChangesListener } from './server-dispatcher-model-changes-listener';
import { SpellCheckerSelectionChangesListener } from './spelling/spell-checker-selection-changes-listener';
import { HorizontalRulerControl } from './ui/ruler/ruler';
import { SearchManager } from './ui/search-manager';
export class RichEditCore {
    constructor(owner, name, element, clientGuid, readOnly, barHolder, unitsType, rulerSettings, richOptions, viewsSettings, stringResources) {
        this.isLoadingPictureFromClipboard = false;
        this.readOnly = ReadOnlyMode.None;
        this._isDisposed = false;
        this.lastSavedHistoryItemId = -1;
        if (this.isClientMode())
            name = "";
        this.beforeInitialization(richOptions);
        this.barHolder = barHolder;
        this.barHolder.initialize(this);
        CharacterPropertyDescriptor.fontInfo.defaultValue = FontInfoCache.defaultFontInfo;
        this.pdfHelperFrame = new PdfHelperFrame(element, "dxre-helperFrame");
        this.owner = owner;
        this.clientGuid = clientGuid;
        this.readOnly = readOnly ? ReadOnlyMode.Persistent : ReadOnlyMode.None;
        this.modelManager = this.createModelManager(richOptions);
        this.stringResources = stringResources;
        this.measurer = new Measurer(name);
        this.boxVisualizerManager = new BoxVisualizerManager(this);
        this.eventManager = new EventManager(this, this.boxVisualizerManager);
        this.uiUnitConverter = createUnitConverter(unitsType);
        const viewElement = this.createViewElement(name, element);
        this.horizontalRulerControl = new HorizontalRulerControl(this, rulerSettings, viewElement);
        this.barHolder.horizontalRuler = this.horizontalRulerControl;
        this.inputController = new InputController(this, this.eventManager, viewElement);
        this.innerClientProperties = new InnerClientProperties(viewsSettings);
        this.viewManager = new ViewManager(this, viewElement, this.eventManager, this.stringResources, this.horizontalRulerControl, this.inputController, this.innerClientProperties, this, this, this.owner.internalApi, this.modelManager.richOptions.fields);
        this.loadingPanelManager = this.createLoadingPanelManager();
        this.popupMenuManager = new PopupMenuManager(this.owner, this.viewManager, this.measurer, null);
        this.focusManager = new FocusManager(this.viewManager.canvasManager, this.owner, this.inputController, this.eventManager);
        this.commandManager = this.createCommandManager();
        this.shortcutManager = this.createShortcutManager();
        this.serverDispatcher = new ServerDispatcher(this);
        this.searchManager = new SearchManager(this);
        this.boxVisualizerManager.initListeners(this.viewManager);
        this.autoCorrectService = new AutoCorrectService(this, this.modelManager.richOptions.autoCorrect);
        this.clientSideEvents = new ClientSideEvents(this.owner);
        this.globalEventDispatcher = new GlobalEventDispatcher(this, () => {
            this.searchManager.raiseSearchReset();
            this.clientSideEvents.raiseDocumentChanged();
        });
        this.simpleViewCanvasSizeManager = new SimpleViewCanvasSizeManager(this.viewManager.canvasManager, this);
        if (this.innerClientProperties.viewsSettings.isSimpleView)
            this.simpleViewCanvasSizeManager.setViewMode(true);
        if (fontWebApiAvailable())
            afterFontsLoaded(() => {
                this.invalidateLayoutAfterFontsLoaded();
            });
    }
    get isReadOnlyPersistent() { return this.readOnly == ReadOnlyMode.Persistent; }
    get model() { return this.modelManager.model; }
    get isDisposed() {
        return this._isDisposed;
    }
    beforeInitialization(_options) { }
    registerActiveContextTabManager() { }
    registerFontChangesListeners() { }
    initialize(sessionGuid, documentInfo, subDocumentsCounter, model, testMode = false) {
        this.closed = false;
        if (!model)
            model = new DocumentModel(this.modelManager.richOptions, subDocumentsCounter);
        this.setWorkSession(sessionGuid, documentInfo);
        this.modelManager.model = model;
        this.measurer.setCharacterPropertiesCache(this.modelManager.model.cache.mergedCharacterPropertiesCache);
        this.layout = new DocumentLayout(new AnchorObjectsPositionInfo(model));
        this.selection = new Selection(this.modelManager.model, this.layout, this.modelManager.model.mainSubDocument);
        this.inputPosition = new InputPosition(this.selection);
        this.inputPositionModelChangesListener = new InputPositionModelChangesListener(this.inputPosition, this.selection);
        this.selection.inputPosition = this.inputPosition;
        this.popupMenuManager.setSelection(this.selection);
        this.selectionModelChangesListener = new SelectionModelChangesListener(this.selection);
        const layoutSelection = new LayoutSelection(this.selection.activeSubDocument.info, -1, this.innerClientProperties);
        this.viewManager.setWorkSession(this.layout, layoutSelection, this.modelManager.model.cache.imageCache);
        this.hitTestManager = new HitTestManager(this.layout, this.measurer);
        this.serverDispatcher.initialize(testMode);
        this.selectionFormatter = new SelectionFormatter(this.selection, this.measurer, layoutSelection, this.modelManager.richOptions.documentProtection);
        this.selectionFormatter.onSelectionLayoutChanged.add(this.viewManager);
        this.selection.onChanged.add(this.inputPositionModelChangesListener);
        this.selection.onChanged.add(this.selectionFormatter);
        this.selection.onChanged.add(this.boxVisualizerManager.fullTableSelectorVisualizer);
        this.selection.onSearchChanged.add(this.selectionFormatter);
        this.selection.onMisspelledSelectionChanged.add(this.selectionFormatter);
        this.scrollFormatter = new ScrollFormatter(this.selection);
        this.selection.scrollManager.onChanged.add(this.scrollFormatter);
        this.scrollFormatter.onScrollLayoutChanged.add(this.viewManager.canvasScrollManager);
        this.spellChecker = new SpellChecker(this.serverDispatcher, this.selection, this.modelManager.richOptions.spellChecker);
        this.layoutFormatterManager = new FormatterManager(this.measurer, this.innerClientProperties, this.modelManager.model, this.layout, this.selection, this.modelManager.richOptions.bookmarks, this.modelManager.richOptions.documentProtection, this.viewManager.canvasManager.controlHeightProvider, this.stringResources, [
            this.viewManager,
            this.globalEventDispatcher,
            this.selectionFormatter,
            this.scrollFormatter,
            this.boxVisualizerManager.resizeBoxVisualizer,
            this.boxVisualizerManager.anchorVisualizer,
            this.boxVisualizerManager.fullTableSelectorVisualizer,
            new SpellCheckerLayoutChangesListener(this.spellChecker)
        ]);
        this.modelManager.modelManipulator.clearListeners();
        this.modelManager.history.clear();
        this.modelManager.modelManipulator.modelListeners.push(this.inputPositionModelChangesListener);
        this.modelManager.modelManipulator.modelListeners.push(this.layoutFormatterManager.modelChangesListener);
        this.modelManager.modelManipulator.modelListeners.push(new ServerDispatcherModelChangesListener(this.serverDispatcher));
        this.modelManager.modelManipulator.modelListeners.push(this.selectionModelChangesListener);
        this.modelManager.modelManipulator.modelListeners.push(new SpellCheckerModelChangesListener(this.spellChecker));
        if (this.barHolder.ribbon)
            this.modelManager.modelManipulator.modelListeners.push(this.barHolder.ribbon);
        this.modelManager.modelManipulator.modelListeners.push(this.barHolder.contextMenu);
        this.modelManager.modelManipulator.modelListeners.push(this.horizontalRulerControl);
        this.modelManager.modelManipulator.modelListeners.push(this.selectionFormatter);
        this.registerFontChangesListeners();
        this.selection.onChanged.add(this.searchManager);
        this.selection.onChanged.add(this.boxVisualizerManager.resizeBoxVisualizer);
        this.selection.onChanged.add(this.boxVisualizerManager.anchorVisualizer);
        this.selection.onChanged.add(this.barHolder.contextMenu);
        if (this.barHolder.ribbon)
            this.selection.onChanged.add(this.barHolder.ribbon);
        this.barHolder.setEnabled(false);
        this.horizontalRulerControl.initialize(testMode);
        this.horizontalRulerControl.setEnable(false);
        this.selection.onChanged.add(this.horizontalRulerControl);
        this.spellChecker.initialize(this.selection.activeSubDocument);
        this.selection.onChanged.add(new SpellCheckerSelectionChangesListener(this.spellChecker));
        this.selection.onChanged.add(this.globalEventDispatcher);
        this.selection.onChanged.add(this.barHolder.publicUiChangesListener);
        this.registerActiveContextTabManager();
        this.modelManager.modelManipulator.modelListeners.push(this.globalEventDispatcher);
        this.modelManager.modelManipulator.modelListeners.push(this.barHolder.publicUiChangesListener);
    }
    dispose() {
        var _a, _b;
        if (this.isDisposed)
            return;
        this.pdfHelperFrame.dispose();
        this.measurer.dispose();
        this.horizontalRulerControl.dispose();
        this.searchManager.dispose();
        this.inputController.dispose();
        this.viewManager.dispose();
        this.layoutFormatterManager.dispose();
        this.serverDispatcher.dispose();
        this.eventManager.dispose();
        this.simpleViewCanvasSizeManager.dispose();
        this.loadingPanelManager.dispose();
        this.commandManager.dispose();
        this.spellChecker.dispose();
        this.selection.dispose();
        (_b = (_a = this.barHolder).dispose) === null || _b === void 0 ? void 0 : _b.call(_a);
        this.modelManager = null;
        this.commandManager = null;
        this.shortcutManager = null;
        this.selection = null;
        this.inputPosition = null;
        this.hitTestManager = null;
        this.measurer = null;
        this.uiUnitConverter = null;
        this.horizontalRulerControl = null;
        this.spellChecker = null;
        this.autoCorrectService = null;
        this.searchManager = null;
        this.clientSideEvents = null;
        this.innerClientProperties = null;
        this.focusManager = null;
        this.inputController = null;
        this.layout = null;
        this.viewManager = null;
        this.layoutFormatterManager = null;
        this.barHolder = null;
        this.popupMenuManager = null;
        this.serverDispatcher = null;
        this.owner = null;
        this.eventManager = null;
        this.selectionFormatter = null;
        this.scrollFormatter = null;
        this.boxVisualizerManager = null;
        this.globalEventDispatcher = null;
        this.simpleViewCanvasSizeManager = null;
        this.selectionModelChangesListener = null;
        this.loadingPanelManager = null;
        this.inputPositionModelChangesListener = null;
        this._isDisposed = true;
    }
    beginUpdate() {
        var _a;
        this.layoutFormatterManager.beginUpdate();
        this.selectionFormatter.beginUpdate();
        this.scrollFormatter.beginUpdate();
        this.viewManager.canvasManager.beginUpdate();
        this.selectionModelChangesListener.beginUpdate();
        this.selection.beginUpdate();
        this.inputPositionModelChangesListener.beginUpdate();
        (_a = this.barHolder.ribbon) === null || _a === void 0 ? void 0 : _a.beginUpdate();
        this.barHolder.contextMenu.beginUpdate();
        this.horizontalRulerControl.beginUpdate();
        this.globalEventDispatcher.beginUpdate();
        this.barHolder.publicUiChangesListener.beginUpdate();
    }
    endUpdate() {
        var _a;
        this.layoutFormatterManager.endUpdate();
        this.selectionFormatter.endUpdate();
        this.scrollFormatter.endUpdate();
        this.viewManager.canvasManager.endUpdate();
        this.layoutFormatterManager.runFormattingAsync();
        this.selectionModelChangesListener.endUpdate();
        this.selection.endUpdate();
        this.inputPositionModelChangesListener.endUpdate();
        (_a = this.barHolder.ribbon) === null || _a === void 0 ? void 0 : _a.endUpdate();
        this.barHolder.contextMenu.endUpdate();
        this.horizontalRulerControl.endUpdate();
        this.globalEventDispatcher.endUpdate();
        this.barHolder.publicUiChangesListener.endUpdate();
    }
    setPersistentReadOnly(readOnly) {
        if (readOnly)
            this.readOnly = ReadOnlyMode.Persistent;
        else if (!readOnly && this.readOnly === ReadOnlyMode.Persistent) {
            this.readOnly = ReadOnlyMode.None;
            this.inputController.inputEditor.initializeIfNotReadOnly();
        }
    }
    setWorkSession(sessionGuid, documentInfo) {
        this.sessionGuid = sessionGuid;
        this.documentInfo = documentInfo;
        if (this.owner)
            this.owner.syncSessionGuid(sessionGuid);
    }
    sendRequest(requestQueryString, viaInternalCallback) {
        this.owner.raiseBeginSynchronization();
        this.owner.sendRequest(requestQueryString, viaInternalCallback);
    }
    beginLoading() {
        if (this.readOnly === ReadOnlyMode.None) {
            this.readOnly = ReadOnlyMode.Temporary;
            const ribbon = this.barHolder.ribbon;
            if (ribbon) {
                ribbon.suspendUpdate();
                ribbon.updateItemsState();
                ribbon.continueUpdate();
            }
            this.loadingPanelManager.statusBarLoadingPanel.setVisible(true);
        }
    }
    endLoading() {
        if (this.readOnly === ReadOnlyMode.Temporary) {
            this.readOnly = ReadOnlyMode.None;
            const ribbon = this.barHolder.ribbon;
            if (ribbon) {
                ribbon.suspendUpdate();
                ribbon.updateItemsState();
                ribbon.continueUpdate();
            }
            this.loadingPanelManager.statusBarLoadingPanel.setVisible(false);
        }
    }
    closeDocument() {
        this.selection.onChanged.remove(this.globalEventDispatcher);
        for (let ind = 0; ind < this.modelManager.modelManipulator.modelListeners.length; ind++) {
            if (this.modelManager.modelManipulator.modelListeners[ind] == this.globalEventDispatcher) {
                this.modelManager.modelManipulator.modelListeners.splice(ind, 1);
                break;
            }
        }
        this.barHolder.setEnabled(false);
        if (this.horizontalRulerControl)
            this.horizontalRulerControl.setEnable(false);
        this.layoutFormatterManager.closeDocument();
        this.viewManager.closeDocument();
        this.boxVisualizerManager.closeDocument();
        this.serverDispatcher.reset();
        this.closed = true;
    }
    importHtml(elements) {
        const interval = this.selection.lastSelectedInterval;
        this.beginUpdate();
        var exportedRangeCopy = this.inputController.getExportedRangeCopy();
        const charPropsBundle = this.inputPosition.charPropsBundle;
        const subDocument = this.selection.activeSubDocument;
        this.modelManager.history.beginTransaction();
        CommandBase.addSelectionBefore(this);
        this.modelManager.modelManipulator.range.removeInterval(new SubDocumentInterval(subDocument, interval), true, true);
        let insertedInterval;
        if (exportedRangeCopy && this.isUsedInnerClipboard(elements))
            insertedInterval = this.importInnerClipboard(exportedRangeCopy, this.selection);
        else {
            insertedInterval = new HtmlImporter(this.modelManager, this.measurer, new SubDocumentPosition(this.selection.activeSubDocument, interval.start), elements, charPropsBundle).import();
        }
        const pos = subDocument.positionManager.registerPosition(insertedInterval.end);
        const afterUpdate = () => {
            CommandBase.addSelectionAfter(this, pos.value);
            subDocument.positionManager.unregisterPosition(pos);
            this.modelManager.history.endTransaction();
            this.endUpdate();
        };
        const cmd = this.commandManager.getCommand(RichEditClientCommand.UpdateField);
        if (insertedInterval.length > 0 && this.modelManager.richOptions.fields.updateFieldsOnPaste && cmd.getState().enabled) {
            const params = new UpdateFieldCommandParameters(subDocument, [insertedInterval], () => afterUpdate());
            params.options.updateFillIn = false;
            const opts = new CommandSimpleOptions(this, params);
            cmd.execute(this.commandManager.isPublicApiCall, opts);
        }
        else
            afterUpdate();
    }
    importInnerClipboard(exportedRangeCopy, selection) {
        const interval = selection.lastSelectedInterval;
        const subDocument = this.selection.activeSubDocument;
        const insertPosition = new SubDocumentPosition(subDocument, interval.start);
        if (selection.tableInfo.isSelected)
            return exportedRangeCopy.insertToTable(this.modelManager.modelManipulator, insertPosition, selection.tableInfo);
        else
            return exportedRangeCopy.insertTo(this.modelManager.modelManipulator, insertPosition);
    }
    onViewTypeChanged() {
        this.viewManager.renderer.onViewTypeChanged();
        this.horizontalRulerControl.onViewTypeChanged();
        this.simpleViewCanvasSizeManager.setViewMode(this.innerClientProperties.viewsSettings.isSimpleView);
    }
    getModifiedState() {
        if (this.serverDispatcher.saveInProgress())
            return IsModified.SaveInProgress;
        else if (this.serverDispatcher.wasModifiedOnServer)
            return IsModified.True;
        else if (this.lastSavedHistoryItemId != this.modelManager.history.getCurrentItemId())
            return IsModified.True;
        return IsModified.False;
    }
    setModifiedFalse() {
        this.lastSavedHistoryItemId = this.modelManager.history.getCurrentItemId();
    }
    getGuidParams() {
        return { sguid: this.sessionGuid, cguid: this.clientGuid };
    }
    isTouchMode() {
        return Browser.TouchUI && !Browser.MSTouchUI;
    }
    isRibbon(element) {
        return this.owner.isRibbon(element);
    }
    isClosed() {
        return this.closed;
    }
    invalidateLayoutAfterFontsLoaded() {
        if (!this.isDisposed && this.measurer && this.layoutFormatterManager && this.layoutFormatterManager.invalidator) {
            this.measurer.clearCache();
            this.layoutFormatterManager.invalidator.onChangedAllLayout();
        }
    }
    createViewElement(id, element) {
        const viewElement = document.createElement("DIV");
        viewElement.id = id + "_View";
        viewElement.className = "dxreView";
        element.appendChild(viewElement);
        return viewElement;
    }
    isUsedInnerClipboard(elements) {
        const elem = elements[0];
        return elem && DomUtils.isHTMLElementNode(elem) && elem.id == RichUtils.getCopyPasteGuid(this.getGuidParams());
    }
    getExportDocumentFormat() {
        const format = this.documentInfo.documentFormat;
        return format !== undefined && format !== null ? format : DocumentFormat.OpenXml;
    }
}
export class DocumentInfo {
    constructor(fileName, documentHasSource, documentFormat = DocumentInfo.defaultDocumentFormat) {
        this._fileName = fileName;
        this._documentFormat = documentFormat;
        this.documentHasSource = documentHasSource;
    }
    get fileName() { return this._fileName; }
    set fileName(val) { this._fileName = val; }
    get documentFormat() { return this._documentFormat; }
    set documentFormat(val) {
        if (typeof val === 'string')
            this._documentFormat = FileNameHelper.convertExtensionToDocumentFormat(val);
        else
            this._documentFormat = val;
    }
    getFileNameForDownload(fileName) {
        if (!StringUtils.isNullOrEmpty(fileName))
            return fileName;
        return StringUtils.isNullOrEmpty(this._fileName) ? DocumentInfo.defaultDocumentName : this._fileName;
    }
}
DocumentInfo.defaultDocumentName = 'document1';
DocumentInfo.defaultDocumentFormat = DocumentFormat.OpenXml;
