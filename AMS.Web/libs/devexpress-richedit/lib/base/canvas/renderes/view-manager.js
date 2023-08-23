import { MapCreator } from '../../../base-utils/map-creator';
import { RendererClassNames } from '../../../core/canvas/renderer-class-names';
import { LayoutPageFlags } from '../../../core/layout/main-structures/layout-page';
import { ColorHelper } from '../../../core/model/color/color';
import { Log } from '../../../core/rich-utils/debug/logger/base-logger/log';
import { LogListHelper } from '../../../core/rich-utils/debug/logger/base-logger/log-list-helper';
import { LogSource } from '../../../core/rich-utils/debug/logger/base-logger/log-source';
import { LogObjToStrLayout } from '../../../core/rich-utils/debug/logger/layout-logger/log-obj-to-str-layout';
import { ViewType } from '../../../core/view-settings/views-settings';
import { Browser } from '@devexpress/utils/lib/browser';
import { DomUtils } from '@devexpress/utils/lib/utils/dom';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { NumberMapUtils } from '@devexpress/utils/lib/utils/map/number';
import { CanvasManager } from '../canvas-manager';
import { CanvasScrollInfo } from '../canvas-scroll-info';
import { CanvasScrollManager } from '../canvas-scroll-manager';
import { CanvasSizeInfo } from '../canvas-size-info';
import { PrintLayoutViewCanvasListener } from './canvas-listener/print-layout-view-canvas-listener';
import { SimpleViewCanvasListener } from './canvas-listener/simple-view-canvas-listener';
import { RendererManager } from './change-active-sub-document/renderer';
import { DocumentRenderer } from './common/document-renderer';
import { PrintLayoutRenderer } from './common/print-layout-renderer';
import { SimpleViewRenderer } from './common/simple-view-renderer';
import { MisspelledSelectionRenderer } from './selection-renderers/misspelled-selection-renderer';
import { RangePermissionRenderer } from './selection-renderers/range-permission-renderer';
import { SearchSelectionRenderer } from './selection-renderers/search-selection-renderer';
import { SelectionRenderer } from './selection-renderers/selection-renderer';
export class ViewManager {
    constructor(control, canvas, eventManager, stringResources, horizontalRuler, inputController, innerClientProperties, readOnlyPropertyHolder, layoutFormatterManagerHolder, internalApi, fieldOptions) {
        this.cache = [];
        this.sizes = new CanvasSizeInfo();
        this.control = control;
        this.readOnlyPropertyHolder = readOnlyPropertyHolder;
        this.layoutFormatterManagerHolder = layoutFormatterManagerHolder;
        this.internalApi = internalApi;
        this.fieldOptions = fieldOptions;
        this.canvas = canvas;
        this.stringResources = stringResources;
        this.inputController = inputController;
        this.innerClientProperties = innerClientProperties;
        this.addTopLevelContainers();
        this.canvasManager = new CanvasManager(this, eventManager);
        this.scroll = new CanvasScrollInfo(canvas, this.sizes, this.internalApi);
        this.canvasScrollManager = new CanvasScrollManager(this, horizontalRuler);
        this.renderers = new MapCreator()
            .add(ViewType.PrintLayout, new PrintLayoutRenderer(this))
            .add(ViewType.Simple, new SimpleViewRenderer(this))
            .get();
        this.canvasListeners = new MapCreator()
            .add(ViewType.PrintLayout, new PrintLayoutViewCanvasListener(this, this.renderers[ViewType.PrintLayout]))
            .add(ViewType.Simple, new SimpleViewCanvasListener(this, this.renderers[ViewType.Simple]))
            .get();
        const layoutSelection = null;
        this.selection = new SelectionRenderer(this.cache, layoutSelection);
        this.searchSelection = new SearchSelectionRenderer(this.cache, layoutSelection);
        this.misspelledSelection = new MisspelledSelectionRenderer(this.cache, layoutSelection);
        this.rangePermission = new RangePermissionRenderer(this.cache, layoutSelection);
        this.changeActiveSubDocumentRenderer = new RendererManager(this, stringResources);
    }
    get renderer() { return this.renderers[this.innerClientProperties.viewsSettings.viewType]; }
    get printLayoutRenderer() { return this.renderers[ViewType.PrintLayout]; }
    get canvasListener() { return this.canvasListeners[this.innerClientProperties.viewsSettings.viewType]; }
    dispose() {
        this.canvasManager.dispose();
        this.canvasScrollManager.dispose();
        this.selection.dispose();
        this.pagesContainer = null;
    }
    adjust(force) {
        if ((force || !this.sizes.isInitialized()) && this.cache.length > 0) {
            const firstRenderedPageIndex = Math.min(this.cache.length, Math.max(0, ListUtils.indexBy(this.layout.pages, (page) => page.flags.get(LayoutPageFlags.ContentRendered))));
            this.sizes.initialize(this.cache[firstRenderedPageIndex].page, this.canvas);
            const oldPageIndo = this.innerClientProperties.viewsSettings.pageVerticalInfo.clone();
            this.innerClientProperties.viewsSettings.pageVerticalInfo.copyFrom(this.sizes.pageVerticalInfo);
            if (this.innerClientProperties.viewsSettings.isSimpleView && !this.innerClientProperties.viewsSettings.pageVerticalInfo.equals(oldPageIndo)) {
                const page = this.layout.pages[firstRenderedPageIndex];
                if (this.layoutFormatterManagerHolder.layoutFormatterManager && page)
                    this.layoutFormatterManagerHolder.layoutFormatterManager.invalidator.onChangedAllLayout();
            }
            if (force) {
                this.canvasScrollManager.updateScrollVisibility();
                this.canvasListener.onCanvasScroll();
            }
        }
    }
    NotifyPagesReady(pageChanges) {
        this.canvasListener.onPagesReady(pageChanges);
    }
    NotifyFullyFormatted(_pageCount) { }
    ;
    NotifySelectionLayoutChanged() {
        const layoutSelection = this.selection.layoutSelection;
        this.changeActiveSubDocumentRenderer.update(layoutSelection);
        Log.print(LogSource.CanvasManager, "onSelectionLayoutChanged\n", LogListHelper.level_1(Log.w(2, Log.flip(LogObjToStrLayout.pageSelectionChange, 0, 1))(""), this.selection.layoutSelection.selectionInfo.changes, "", "\n"));
        if (this.innerClientProperties.viewsSettings.isSimpleView)
            this.selection.renderAllPageSelection(this.layout, 0, true);
        else
            this.selection.applySelectionChanges(this.layout);
        if (Browser.WebKitTouchUI || (Browser.MacOSPlatform && Browser.MajorVersion >= 13) || Browser.Chrome) {
            const pageIndex = ListUtils.reverseIndexBy(layoutSelection.selectionInfo.pageInfos, pageInfo => pageInfo.oldItems.length > 0);
            if (pageIndex > -1) {
                const pageInfo = layoutSelection.selectionInfo.pageInfos[pageIndex];
                const item = pageInfo.oldItems[0];
                const layoutPage = this.layout.pages[pageIndex];
                this.inputController.setPosition(layoutPage.x + this.cache[pageIndex].page.offsetLeft + item.x, this.sizes.getPageOffsetY(layoutPage) + item.y);
            }
        }
    }
    NotifySearchSelectionLayoutChanged() {
        Log.print(LogSource.CanvasManager, "onSearchSelectionLayoutChanged\n", LogListHelper.level_1(Log.w(2, Log.flip(LogObjToStrLayout.pageSelectionChange, 0, 1))(""), this.selection.layoutSelection.searchInfo.changes, "", "\n"));
        if (this.innerClientProperties.viewsSettings.isSimpleView)
            this.searchSelection.renderAllPageSelection(this.layout, 0, true);
        else
            this.searchSelection.applySelectionChanges(this.layout);
    }
    NotifyMisspelledSelectionLayoutChanged() {
        Log.print(LogSource.CanvasManager, "onMisspelledSelectionLayoutChanged\n", LogListHelper.level_1(Log.w(2, Log.flip(LogObjToStrLayout.pageSelectionChange, 0, 1))(""), this.selection.layoutSelection.misspelledInfo.changes, "", "\n"));
        if (this.innerClientProperties.viewsSettings.isSimpleView)
            this.misspelledSelection.renderAllPageSelection(this.layout, 0, true);
        else
            this.misspelledSelection.applySelectionChanges(this.layout);
    }
    NotifyRangePermissionLayoutChanged() {
        Log.print(LogSource.CanvasManager, "onRangePermissionsLayoutChanged\n", LogListHelper.level_1(Log.w(2, Log.flip(LogObjToStrLayout.pageSelectionChange, 0, 1))(""), this.selection.layoutSelection.rangePermissionInfo.changes, "", "\n"));
        if (this.innerClientProperties.viewsSettings.isSimpleView)
            this.rangePermission.renderAllPageSelection(this.layout, 0, true);
        else
            this.rangePermission.applySelectionChanges(this.layout);
    }
    addTopLevelContainers() {
        this.pagesContainer = DocumentRenderer.renderContainer(RendererClassNames.PAGES);
        this.serviceContainer = DocumentRenderer.renderContainer(RendererClassNames.TOP_LEVEL_SERVICE_CONTAINER);
        DocumentRenderer.insertInContainer(this.canvas, 0, this.pagesContainer, (node) => node);
        this.canvas.appendChild(this.serviceContainer);
    }
    setWorkSession(layout, layoutSelection, imageCache) {
        this.layout = layout;
        this.imageCache = imageCache;
        this.changeActiveSubDocumentRenderer.init();
        this.selection.layoutSelection = layoutSelection;
        this.searchSelection.layoutSelection = layoutSelection;
        this.misspelledSelection.layoutSelection = layoutSelection;
        this.rangePermission.layoutSelection = layoutSelection;
        this.selection.touchSelectionCircleElementsManager.layoutSelection = layoutSelection;
    }
    closeDocument() {
        DomUtils.clearInnerHtml(this.pagesContainer);
        this.cache.splice(0);
        this.canvasManager.closeDocument();
        this.selection.closeDocument();
        this.searchSelection.closeDocument();
        this.misspelledSelection.closeDocument();
        this.rangePermission.closeDocument();
        NumberMapUtils.forEach(this.canvasListeners, (r) => r.closeDocument());
        this.layout.setEmptyLayout(ColorHelper.NO_COLOR);
    }
    ensureFirstPageIsRendered() {
        var _a, _b;
        const firstPage = (_b = (_a = this.layout) === null || _a === void 0 ? void 0 : _a.pages) === null || _b === void 0 ? void 0 : _b[0];
        if (!firstPage)
            return;
        if (this.lastUsedRendererType === ViewType.PrintLayout && !firstPage.flags.get(LayoutPageFlags.ContentRendered)) {
            this.printLayoutRenderer.renderPage(firstPage, firstPage.index, true);
            this.changeActiveSubDocumentRenderer.updatePage(this.searchSelection.layoutSelection, firstPage.index);
            firstPage.flags.set(LayoutPageFlags.ContentRendered, true);
        }
    }
}
