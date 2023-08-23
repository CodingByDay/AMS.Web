import { EvtUtils } from '@devexpress/utils/lib/utils/evt';
import { LayoutPoint } from '../../core/layout/layout-point';
import { Log } from '../../core/rich-utils/debug/logger/base-logger/log';
import { LogSource } from '../../core/rich-utils/debug/logger/base-logger/log-source';
import { Browser } from '@devexpress/utils/lib/browser';
import { BatchUpdatableObject } from '@devexpress/utils/lib/class/batch-updatable';
import { DomEventHandlersHolder } from '@devexpress/utils/lib/class/event-handlers-holder';
import { DomUtils } from '@devexpress/utils/lib/utils/dom';
import { PopupUtils } from '@devexpress/utils/lib/utils/popup';
import { RichMouseEvent } from '../event-manager';
import { MouseEventSource } from '../mouse-handler/mouse-event-source';
import { CursorPointer } from '../mouse-handler/mouse-handler/mouse-handler';
import { ResizeBoxListener } from './listeners/resize-box-listener';
const SCROLL_INTERVAL_MS = 50;
const CSSCLASS_FOCUSED = "dxreInFocus";
const AUTOSCROLL_AREA_SIZE = 10;
const AUTOSCROLL_STEP = 10;
const MSTOUCH_MOVE_SENSITIVITY = 5;
export class CanvasManager extends BatchUpdatableObject {
    constructor(viewManager, eventManager) {
        super();
        this.lastMousePosition = { x: -1, y: -1 };
        this.canvasPosition = { x: -1, y: -1 };
        this.pointer = CursorPointer.Auto;
        this.blockNotPointerEvents = false;
        this.lastPointerPosition = { x: -1, y: -1 };
        this.evtHandlersHolder = new DomEventHandlersHolder();
        this.viewManager = viewManager;
        this.eventManager = eventManager;
        this.initCommonEvents();
        if (!Browser.WebKitTouchUI)
            this.initMouseEvents();
        if (Browser.TouchUI)
            this.initTouchEvents();
        if (Browser.MSTouchUI)
            if (Browser.MajorVersion > 10)
                this.initPointerEvents();
            else
                this.initMSPointerEvents();
    }
    get sizes() { return this.viewManager.sizes; }
    get scroll() { return this.viewManager.scroll; }
    get controlHeightProvider() { return this.sizes; }
    dispose() {
        this.evtHandlersHolder.removeAllListeners();
    }
    onUpdateUnlocked(_occurredEvents) {
        this.viewManager.canvasListener.updateVisibleParts();
    }
    setCursorPointer(pointer) {
        Log.print(LogSource.CanvasManager, "setCursorPointer", () => `pointer: ${CursorPointer[pointer]}`);
        if (this.pointer === pointer)
            return;
        if (this.pointer !== CursorPointer.Auto)
            DomUtils.removeClassName(this.viewManager.canvas, CanvasManager.getCursorClassName(this.pointer));
        const newClassName = CanvasManager.getCursorClassName(pointer);
        if (newClassName)
            DomUtils.addClassName(this.viewManager.canvas, newClassName);
        this.pointer = pointer;
    }
    closeDocument() {
        this.scroll.init(this.viewManager.canvas, this.sizes);
    }
    focusChanged(inFocus) {
        Log.print(LogSource.CanvasManager, "focusChanged", `to: ${inFocus}`);
        if (inFocus)
            DomUtils.addClassName(this.viewManager.canvas, CSSCLASS_FOCUSED);
        else
            DomUtils.removeClassName(this.viewManager.canvas, CSSCLASS_FOCUSED);
    }
    getCanvasWidth() {
        return this.viewManager.canvas.clientWidth;
    }
    onCanvasMouseWheel(evt) {
        if (!this.viewManager.layout)
            return;
        const point = this.getLayoutPoint(evt, false);
        point.y += evt.deltaY;
        this.eventManager.mouseWheelEvent = true;
        this.eventManager.onMouseMove(new RichMouseEvent(evt, point, CanvasManager.getMouseEventSource(EvtUtils.getEventSource(evt)), this.scroll.lastScrollTop, this.scroll.lastScrollLeft));
        this.eventManager.mouseWheelEvent = false;
        this.viewManager.canvasListener.updateVisibleParts();
    }
    onCanvasMouseDown(evt) {
        Log.print(LogSource.CanvasManager, "onCanvasMouseDown", `evt.button: ${evt.button}, evt.buttons: ${evt.buttons}`);
        if (!this.blockNotPointerEvents)
            this.onCanvasMouseDownInternal(evt);
        EvtUtils.preventEvent(evt);
    }
    onCanvasMouseDownInternal(evt) {
        const point = this.getLayoutPoint(evt, true);
        this.eventManager.onMouseDown(new RichMouseEvent(evt, point, CanvasManager.getMouseEventSource(EvtUtils.getEventSource(evt)), this.scroll.lastScrollTop, this.scroll.lastScrollLeft));
        this.saveMousePosition(evt);
        this.resetScrollInterval();
        this.canvasPosition.x = DomUtils.getAbsolutePositionX(this.viewManager.canvas);
        this.canvasPosition.y = DomUtils.getAbsolutePositionY(this.viewManager.canvas);
        if (!point.isEmpty()) {
            this.scrollIntervalID = setInterval(() => {
                this.onScrollIntervalTick();
            }, SCROLL_INTERVAL_MS);
        }
    }
    onCanvasMouseUp(evt) {
        Log.print(LogSource.CanvasManager, "onCanvasMouseUp", "");
        if (!this.blockNotPointerEvents)
            this.onCanvasMouseUpInternal(evt);
    }
    onCanvasMouseUpInternal(evt) {
        this.eventManager.onMouseUp(new RichMouseEvent(evt, this.getLayoutPoint(evt, false), CanvasManager.getMouseEventSource(EvtUtils.getEventSource(evt)), this.scroll.lastScrollTop, this.scroll.lastScrollLeft));
        this.resetScrollInterval();
    }
    onCanvasMouseMove(evt) {
        if (!this.blockNotPointerEvents)
            this.onCanvasMouseMoveInternal(evt);
    }
    onCanvasMouseMoveInternal(evt) {
        this.eventManager.onMouseMove(new RichMouseEvent(evt, this.getLayoutPoint(evt, false), CanvasManager.getMouseEventSource(EvtUtils.getEventSource(evt)), this.scroll.lastScrollTop, this.scroll.lastScrollLeft));
    }
    onCanvasMouseDblClick(evt) {
        this.eventManager.onMouseDblClick(new RichMouseEvent(evt, this.getLayoutPoint(evt, true), CanvasManager.getMouseEventSource(EvtUtils.getEventSource(evt)), this.scroll.lastScrollTop, this.scroll.lastScrollLeft));
        return EvtUtils.preventEventAndBubble(evt);
    }
    onCanvasTouchStart(evt) {
        if (!this.blockNotPointerEvents)
            this.onCanvasTouchStartInternal(evt);
        return true;
    }
    onCanvasTouchStartInternal(evt) {
        this.saveMousePosition(evt);
        let richMouseEvent = new RichMouseEvent(evt, this.getLayoutPoint(evt, true), CanvasManager.getMouseEventSource(EvtUtils.getEventSource(evt)), this.scroll.lastScrollTop, this.scroll.lastScrollLeft);
        if (this.doubleTapStartDate && ((new Date()) - this.doubleTapStartDate) < 600) {
            this.doubleTapStartDate = null;
            this.onCanvasDoubleTap(richMouseEvent);
        }
        else {
            this.doubleTapStartDate = new Date();
            this.eventManager.onTouchStart(richMouseEvent);
        }
    }
    onCanvasDoubleTap(evt) {
        this.eventManager.onDoubleTap(evt);
    }
    onCanvasTouchEnd(evt) {
        if (!this.blockNotPointerEvents)
            this.onCanvasTouchEndInternal(evt);
        EvtUtils.preventEventAndBubble(evt);
    }
    onCanvasTouchEndInternal(evt) {
        return this.eventManager.onTouchEnd(new RichMouseEvent(evt, this.getLayoutPoint(evt, false), CanvasManager.getMouseEventSource(EvtUtils.getEventSource(evt)), this.scroll.lastScrollTop, this.scroll.lastScrollLeft));
    }
    onCanvasTouchMove(evt) {
        if (!this.blockNotPointerEvents)
            return this.onCanvasTouchMoveInternal(evt);
        return true;
    }
    onCanvasTouchMoveInternal(evt) {
        if (!this.eventManager.onTouchMove(new RichMouseEvent(evt, this.getLayoutPoint(evt, false), CanvasManager.getMouseEventSource(EvtUtils.getEventSource(evt)), this.scroll.lastScrollTop, this.scroll.lastScrollLeft))) {
            EvtUtils.preventEventAndBubble(evt);
            return;
        }
        return true;
    }
    onCanvasPointerDown(evt) {
        if (evt.pointerType == "mouse")
            this.onCanvasMouseDownInternal(evt);
        else if (evt.pointerType == "touch")
            this.onCanvasTouchStartInternal(evt);
        this.blockNotPointerEvents = true;
        this.lastPointerPosition.x = evt.x;
        this.lastPointerPosition.y = evt.y;
    }
    onCanvasPointerMove(evt) {
        if (Math.abs(evt.x - this.lastPointerPosition.x) > MSTOUCH_MOVE_SENSITIVITY || Math.abs(evt.y - this.lastPointerPosition.y) > MSTOUCH_MOVE_SENSITIVITY) {
            if (evt.pointerType == "mouse")
                this.onCanvasMouseMoveInternal(evt);
            else if (evt.pointerType == "touch") {
                this.onCanvasTouchMoveInternal(evt);
                return;
            }
            EvtUtils.preventEventAndBubble(evt);
        }
    }
    onCanvasPointerUp(evt) {
        if (evt.pointerType == "mouse")
            this.onCanvasMouseUpInternal(evt);
        else if (evt.pointerType == "touch")
            this.onCanvasTouchEndInternal(evt);
        setTimeout(() => { this.blockNotPointerEvents = false; }, 0);
        EvtUtils.preventEventAndBubble(evt);
    }
    onCanvasGestureStart(evt) {
        this.eventManager.onGestureStart(evt);
    }
    onDocumentMouseUp(evt) {
        if (DomUtils.isItParent(this.viewManager.canvas, EvtUtils.getEventSource(evt))) {
            if (!EvtUtils.isLeftButtonPressed(evt))
                if (this.eventManager.shouldPreventContextMenuEvent)
                    PopupUtils.preventContextMenu(evt);
            this.onCanvasMouseUp(evt);
        }
        else {
            this.eventManager.onMouseUp(new RichMouseEvent(evt, null, MouseEventSource.Undefined, this.scroll.lastScrollTop, this.scroll.lastScrollLeft));
            this.resetScrollInterval();
        }
    }
    onDocumentContextMenu(evt) {
        if (!this.viewManager.canvas.parentNode)
            return;
        if (this.shouldPreventContextMenuEvent(evt) && this.eventManager.shouldPreventContextMenuEvent) {
            PopupUtils.preventContextMenu(evt);
            return EvtUtils.cancelBubble(evt);
        }
    }
    shouldPreventContextMenuEvent(evt) {
        const eventSource = EvtUtils.getEventSource(evt);
        if (this.viewManager.control.isClientMode())
            return DomUtils.isItParent(this.viewManager.canvas.parentNode, eventSource);
        else
            return DomUtils.isItParent(this.viewManager.canvas.parentNode.parentNode, eventSource);
    }
    onDocumentMouseMove(evt) {
        this.saveMousePosition(evt);
    }
    onDocumentTouchEnd(evt) {
        if (DomUtils.isItParent(this.viewManager.canvas, EvtUtils.getEventSource(evt)))
            return;
        this.eventManager.onTouchEnd(new RichMouseEvent(evt, null, MouseEventSource.Undefined, this.scroll.lastScrollTop, this.scroll.lastScrollLeft));
        this.resetScrollInterval();
    }
    onDocumentTouchMove(evt) {
        this.saveMousePosition(evt);
    }
    getScale(actualSize, originalSize) {
        return actualSize != 0 && originalSize != 0 ? actualSize / originalSize : 1;
    }
    getLayoutPoint(evt, checkScroll) {
        if (!this.viewManager.layout)
            return LayoutPoint.Empty();
        const canvas = this.viewManager.canvas;
        const clientRect = canvas.getBoundingClientRect();
        const scaleX = this.getScale(clientRect.width, canvas.offsetWidth);
        const scaleY = this.getScale(clientRect.height, canvas.offsetHeight);
        const clientX = EvtUtils.getEventX(evt) / scaleX;
        const clientY = EvtUtils.getEventY(evt) / scaleY;
        const canvasX = DomUtils.getAbsolutePositionX(canvas) / scaleX;
        const canvasY = DomUtils.getAbsolutePositionY(canvas) / scaleY;
        const offsetY = canvas.scrollTop + clientY - canvasY;
        const pageIndex = this.sizes.findPageIndexByOffsetY(this.viewManager.layout.pages, offsetY);
        if (checkScroll) {
            if (this.sizes.scrollYVisible && canvasX + this.sizes.getVisibleAreaWidth(false) - clientX < 0)
                return LayoutPoint.Empty();
            if (this.sizes.scrollXVisible && canvasY + this.sizes.getVisibleAreaHeight(false) - clientY < 0)
                return LayoutPoint.Empty();
        }
        const layoutPage = this.viewManager.layout.pages[pageIndex];
        const renderPageCacheElem = this.viewManager.cache[pageIndex];
        if (!layoutPage || !renderPageCacheElem)
            return LayoutPoint.Empty();
        return new LayoutPoint(pageIndex, canvas.scrollLeft + clientX - (canvasX + renderPageCacheElem.page.offsetLeft), offsetY - this.sizes.getPageOffsetY(layoutPage));
    }
    isVisiblePosition(layoutPoint) {
        const pages = this.viewManager.layout.pages;
        this.scroll.updatePageIndexesInfo(pages);
        if (layoutPoint.pageIndex < this.scroll.startVisiblePageIndex || layoutPoint.pageIndex > this.scroll.endVisiblePageIndex)
            return false;
        const pageY = this.sizes.getPageOffsetY(pages[layoutPoint.pageIndex]);
        const pageX = this.viewManager.cache[layoutPoint.pageIndex].page.offsetLeft;
        const x = pageX + layoutPoint.x;
        const y = pageY + layoutPoint.y;
        return x >= this.scroll.lastScrollLeft && x <= this.sizes.getVisibleAreaWidth(false) + this.scroll.lastScrollLeft &&
            y >= this.scroll.lastScrollTop && y <= this.sizes.getVisibleAreaHeight(false) + this.scroll.lastScrollTop;
    }
    initCommonEvents() {
        this.evtHandlersHolder.addListener(this.viewManager.canvas, "scroll", () => this.viewManager.canvasListener.onCanvasScroll());
    }
    initMouseEvents() {
        this.evtHandlersHolder.addListener(this.viewManager.canvas, "mousedown", this.onCanvasMouseDown.bind(this));
        this.evtHandlersHolder.addListener(this.viewManager.canvas, "mousemove", this.onCanvasMouseMove.bind(this));
        this.evtHandlersHolder.addListener(this.viewManager.canvas, "dblclick", this.onCanvasMouseDblClick.bind(this));
        this.evtHandlersHolder.addListener(this.viewManager.canvas, EvtUtils.getMouseWheelEventName(), this.onCanvasMouseWheel.bind(this), { passive: true });
        this.evtHandlersHolder.addListenerToDocument("mouseup", this.onDocumentMouseUp.bind(this));
        this.evtHandlersHolder.addListenerToDocument("mousemove", this.onDocumentMouseMove.bind(this));
        this.evtHandlersHolder.addListenerToDocument("contextmenu", this.onDocumentContextMenu.bind(this));
    }
    initTouchEvents() {
        this.evtHandlersHolder.addListener(this.viewManager.canvas, "touchstart", this.onCanvasTouchStart.bind(this));
        this.evtHandlersHolder.addListener(this.viewManager.canvas, "touchend", this.onCanvasTouchEnd.bind(this));
        this.evtHandlersHolder.addListener(this.viewManager.canvas, "touchmove", this.onCanvasTouchMove.bind(this));
        this.evtHandlersHolder.addListener(this.viewManager.canvas, "gesturestart", this.onCanvasGestureStart.bind(this));
        this.evtHandlersHolder.addListenerToDocument("touchend", this.onDocumentTouchEnd.bind(this));
        this.evtHandlersHolder.addListenerToDocument("touchmove", this.onDocumentTouchMove.bind(this));
    }
    initPointerEvents() {
        this.evtHandlersHolder.addListener(this.viewManager.canvas, "pointerdown", this.onCanvasPointerDown.bind(this));
        this.evtHandlersHolder.addListener(this.viewManager.canvas, "pointermove", this.onCanvasPointerMove.bind(this));
        this.evtHandlersHolder.addListener(this.viewManager.canvas, "pointerup", this.onCanvasPointerUp.bind(this));
    }
    initMSPointerEvents() {
        this.evtHandlersHolder.addListener(this.viewManager.canvas, "mspointerdown", this.onCanvasPointerDown.bind(this));
        this.evtHandlersHolder.addListener(this.viewManager.canvas, "mspointermove", this.onCanvasPointerMove.bind(this));
        this.evtHandlersHolder.addListener(this.viewManager.canvas, "mspointerup", this.onCanvasPointerUp.bind(this));
    }
    resetScrollInterval() {
        if (this.scrollIntervalID) {
            clearInterval(this.scrollIntervalID);
            this.scrollIntervalID = null;
        }
    }
    saveMousePosition(evt) {
        this.lastMousePosition.x = EvtUtils.getEventX(evt);
        this.lastMousePosition.y = EvtUtils.getEventY(evt);
    }
    onScrollIntervalTick() {
        const evtX = this.lastMousePosition.x;
        const evtY = this.lastMousePosition.y;
        const inHorizontalArea = evtX >= this.canvasPosition.x && evtX <= this.canvasPosition.x + this.sizes.getVisibleAreaWidth(true);
        const inVerticalArea = evtY >= this.canvasPosition.y && evtY <= this.canvasPosition.y + this.sizes.getVisibleAreaHeight(true);
        if (!inHorizontalArea && !inVerticalArea)
            return;
        if (inHorizontalArea && evtY - this.canvasPosition.y <= AUTOSCROLL_AREA_SIZE)
            this.viewManager.canvas.scrollTop -= AUTOSCROLL_STEP;
        else if (inHorizontalArea && this.canvasPosition.y + this.sizes.getVisibleAreaHeight(true) - evtY <= AUTOSCROLL_AREA_SIZE)
            this.viewManager.canvas.scrollTop += AUTOSCROLL_STEP;
        if (inVerticalArea && evtX - this.canvasPosition.x <= AUTOSCROLL_AREA_SIZE)
            this.viewManager.canvas.scrollLeft -= AUTOSCROLL_STEP;
        else if (inVerticalArea && this.canvasPosition.x + this.sizes.getVisibleAreaWidth(true) - evtX <= AUTOSCROLL_AREA_SIZE)
            this.viewManager.canvas.scrollLeft += AUTOSCROLL_STEP;
    }
    static getCursorClassName(pointer) {
        switch (pointer) {
            case CursorPointer.Copy:
                return "dxreCursorCopy";
            case CursorPointer.NoDrop:
                return "dxreCursorNoDrop";
            case CursorPointer.EResize:
                return "dxreCursorEResize";
            case CursorPointer.NResize:
                return "dxreCursorNResize";
            case CursorPointer.SResize:
                return "dxreCursorSResize";
            case CursorPointer.WResize:
                return "dxreCursorWResize";
            case CursorPointer.SEResize:
                return "dxreCursorSEResize";
            case CursorPointer.SWResize:
                return "dxreCursorSWResize";
            case CursorPointer.NWResize:
                return "dxreCursorNWResize";
            case CursorPointer.NEResize:
                return "dxreCursorNEResize";
            case CursorPointer.NSResize:
                return "dxreCursorNSResize";
            case CursorPointer.EWResize:
                return "dxreCursorEWResize";
            case CursorPointer.Move:
            case CursorPointer.Default:
                return "dxreCursorDefault";
        }
    }
    static getMouseEventSource(initSource) {
        const source = initSource.nodeType === Node.ELEMENT_NODE ? initSource : initSource.parentNode;
        const className = source.className;
        const cornerPrefix = ResizeBoxListener.getCornerPrefix();
        const ind = className.indexOf(cornerPrefix);
        if (ind != 0)
            return MouseEventSource.Undefined;
        return ResizeBoxListener.directionToSource[className.substr(ind + cornerPrefix.length, 2).trim()];
    }
    getScrollTopInfo() {
        const pages = this.viewManager.layout.pages;
        const scrollTop = this.viewManager.canvas.scrollTop;
        const pageIndex = this.sizes.findPageIndexByOffsetY(pages, scrollTop);
        return new ScrollTopInfo(pageIndex, scrollTop - this.sizes.getPageOffsetY(pages[pageIndex]));
    }
}
export class ScrollTopInfo {
    constructor(pageIndex, topPositionRelativePage) {
        this.pageIndex = pageIndex;
        this.topPositionRelativePage = topPositionRelativePage;
    }
}
