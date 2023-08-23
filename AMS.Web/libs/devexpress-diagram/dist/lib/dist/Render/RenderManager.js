"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderManager = exports.DBL_CLICK_TIMEOUT = exports.LONG_TOUCH_TIMEOUT = void 0;
var Event_1 = require("../Events/Event");
var evt_1 = require("@devexpress/utils/lib/utils/evt");
var dom_1 = require("@devexpress/utils/lib/utils/dom");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var key_1 = require("@devexpress/utils/lib/utils/key");
var browser_1 = require("@devexpress/utils/lib/browser");
var Utils_1 = require("./Utils");
var CanvasItemsManager_1 = require("./CanvasItemsManager");
var ScrollView_1 = require("./ScrollView");
var Settings_1 = require("../Settings");
var InputManager_1 = require("./InputManager");
var CanvasPageManager_1 = require("./CanvasPageManager");
var CanvasViewManager_1 = require("./CanvasViewManager");
var CanvasSelectionManager_1 = require("./CanvasSelectionManager");
var AutoScrollController_1 = require("./AutoScrollController");
var TextMeasurer_1 = require("./Measurer/TextMeasurer");
var RenderHelper_1 = require("./RenderHelper");
var DOMManipulator_1 = require("./DOMManipulator");
var Utils_2 = require("../Utils");
var READONLY_CSSCLASS = "dxdi-read-only";
var TOUCH_ACTION_CSSCLASS = "dxdi-touch-action";
exports.LONG_TOUCH_TIMEOUT = 500;
exports.DBL_CLICK_TIMEOUT = 500;
var RenderManager = (function () {
    function RenderManager(parent, events, measurer, settings, instanceId, scrollView, focusElementsParent) {
        this.moveLocked = false;
        this.lockMouseMoveTimer = -1;
        this.lastClickElement = undefined;
        this.longTouchTimer = undefined;
        this.dblTouchTimer = undefined;
        this.pointers = {};
        var mainElement = RenderHelper_1.RenderHelper.createMainElement(parent);
        var svgElement = RenderHelper_1.RenderHelper.createSvgElement(mainElement);
        this.instanceId = instanceId;
        this.scroll = scrollView || new ScrollView_1.NativeScrollView(parent);
        this.measurer = measurer;
        this.dom = new DOMManipulator_1.DOMManipulator(this.measurer);
        this.view = new CanvasViewManager_1.CanvasViewManager(this.scroll, svgElement, settings.modelSize, settings.zoomLevel, settings.autoZoom, settings.simpleView, settings.rectangle, this.dom, this.instanceId);
        this.input = new InputManager_1.InputManager(mainElement, this.view, events, this.measurer, settings.zoomLevel, focusElementsParent);
        this.items = new CanvasItemsManager_1.CanvasItemsManager(this.view.canvasElement, settings.zoomLevel, this.dom, this.instanceId);
        this.page = new CanvasPageManager_1.CanvasPageManager(this.view.pageElement, settings, this.dom, this.instanceId);
        this.selection = new CanvasSelectionManager_1.CanvasSelectionManager(this.view.canvasElement, settings.zoomLevel, settings.readOnly, this.dom, this.instanceId);
        this.contextMenuEnabled = settings.contextMenuEnabled;
        this.view.onViewChanged.add(this.page);
        this.view.onViewChanged.add(this.items);
        this.view.onViewChanged.add(this.selection);
        this.view.onViewChanged.add(this.input);
        this.autoScroll = new AutoScrollController_1.AutoScrollController(this.scroll, svgElement, this.view, this.dom);
        this.attachEvents(svgElement);
        this.mainElement = mainElement;
        this.svgElement = svgElement;
        this.events = events;
        this.notifyReadOnlyChanged(settings.readOnly);
    }
    RenderManager.prototype.clean = function (removeElement) {
        this.killLockMouseMoveTimer();
        this.clearLastMouseDownEvent();
        this.detachEvents(this.svgElement);
        this.scroll.detachEvents();
        this.input.detachEvents();
        this.dom.cancelAnimation();
        if (removeElement)
            removeElement(this.mainElement);
    };
    RenderManager.prototype.replaceParent = function (parent, scroll) {
        if (this.mainElement && this.mainElement.parentNode !== parent)
            parent.appendChild(this.mainElement);
        if (scroll && scroll !== this.scroll) {
            this.scroll && this.scroll.detachEvents();
            this.scroll = scroll;
        }
        if (this.measurer instanceof TextMeasurer_1.TextMeasurer)
            this.measurer.replaceParent(parent);
    };
    RenderManager.prototype.update = function (saveScrollPosition) {
        this.view.adjust({ horizontal: !saveScrollPosition, vertical: !saveScrollPosition });
        this.page.redraw();
    };
    RenderManager.prototype.onNewModel = function (items) {
        this.measurer.onNewModel(items, this.dom);
    };
    RenderManager.prototype.clear = function () {
        this.items.clear();
        this.selection.clear();
    };
    RenderManager.prototype.attachPointerEvents = function (svgElement) {
        dom_1.DomUtils.addClassName(svgElement, TOUCH_ACTION_CSSCLASS);
        RenderHelper_1.RenderHelper.addEventListener(svgElement, "pointerdown", this.onPointerDownHandler);
        RenderHelper_1.RenderHelper.addEventListener(browser_1.Browser.TouchUI ? svgElement : document, "pointerup", this.onPointerUpHandler);
        RenderHelper_1.RenderHelper.addEventListener(browser_1.Browser.TouchUI ? svgElement : document, "pointermove", this.onPointerMoveHandler);
        RenderHelper_1.RenderHelper.addEventListener(svgElement, "pointercancel", this.onPointerCancelHandler);
        RenderHelper_1.RenderHelper.addEventListener(svgElement, "pointerleave", this.onPointerLeaveHandler);
    };
    RenderManager.prototype.detachPointerEvents = function (svgElement) {
        RenderHelper_1.RenderHelper.removeEventListener(svgElement, "pointerdown", this.onPointerDownHandler);
        RenderHelper_1.RenderHelper.removeEventListener(browser_1.Browser.TouchUI ? svgElement : document, "pointerup", this.onPointerUpHandler);
        RenderHelper_1.RenderHelper.removeEventListener(browser_1.Browser.TouchUI ? svgElement : document, "pointermove", this.onPointerMoveHandler);
        RenderHelper_1.RenderHelper.removeEventListener(svgElement, "pointercancel", this.onPointerCancelHandler);
        RenderHelper_1.RenderHelper.removeEventListener(svgElement, "pointerleave", this.onPointerLeaveHandler);
        dom_1.DomUtils.removeClassName(svgElement, TOUCH_ACTION_CSSCLASS);
    };
    RenderManager.prototype.attachMouseTouchEvents = function (svgElement) {
        RenderHelper_1.RenderHelper.addEventListener(svgElement, this.mouseDownEventName, this.onMouseDownHandler);
        RenderHelper_1.RenderHelper.addEventListener(document, this.mouseMoveEventName, this.onMouseMoveHandler);
        RenderHelper_1.RenderHelper.addEventListener(document, this.mouseUpEventName, this.onMouseUpHandler);
    };
    RenderManager.prototype.detachMouseTouchEvents = function (svgElement) {
        RenderHelper_1.RenderHelper.removeEventListener(svgElement, this.mouseDownEventName, this.onMouseDownHandler);
        RenderHelper_1.RenderHelper.removeEventListener(document, this.mouseMoveEventName, this.onMouseMoveHandler);
        RenderHelper_1.RenderHelper.removeEventListener(document, this.mouseUpEventName, this.onMouseUpHandler);
    };
    RenderManager.prototype.attachEvents = function (svgElement) {
        this.mouseDownEventName = browser_1.Browser.TouchUI ? "touchstart" : "mousedown";
        this.mouseMoveEventName = browser_1.Browser.TouchUI ? "touchmove" : "mousemove";
        this.mouseUpEventName = browser_1.Browser.TouchUI ? "touchend" : "mouseup";
        this.onPointerDownHandler = this.onPointerDown.bind(this);
        this.onPointerUpHandler = this.onPointerUp.bind(this);
        this.onPointerMoveHandler = this.onPointerMove.bind(this);
        this.onPointerCancelHandler = this.onPointerCancel.bind(this);
        this.onPointerLeaveHandler = this.onPointerLeave.bind(this);
        this.onMouseDownHandler = this.onMouseDown.bind(this);
        this.onMouseEnterHandler = this.onMouseEnter.bind(this);
        this.onMouseLeaveHandler = this.onMouseLeave.bind(this);
        this.onMouseWheelHandler = this.onMouseWheel.bind(this);
        this.onMouseDblClickHandler = this.onMouseDblClick.bind(this);
        this.onContextMenuHandler = this.onContextMenu.bind(this);
        this.onMouseMoveHandler = this.onMouseMove.bind(this);
        this.onMouseUpHandler = this.onMouseUp.bind(this);
        this.onWindowResizelHandler = this.onWindowResize.bind(this);
        this.onOrientationChangeHandler = this.onOrientationChange.bind(this);
        this.onMouseClickHandler = this.onMouseClick.bind(this);
        if (Utils_2.EventUtils.isPointerEvents())
            this.attachPointerEvents(svgElement);
        else {
            this.attachMouseTouchEvents(svgElement);
            RenderHelper_1.RenderHelper.addEventListener(svgElement, "mouseenter", this.onMouseEnterHandler);
            RenderHelper_1.RenderHelper.addEventListener(svgElement, "mouseleave", this.onMouseLeaveHandler);
        }
        RenderHelper_1.RenderHelper.addEventListener(svgElement, "wheel", this.onMouseWheelHandler);
        RenderHelper_1.RenderHelper.addEventListener(svgElement, "dblclick", this.onMouseDblClickHandler);
        RenderHelper_1.RenderHelper.addEventListener(svgElement, "click", this.onMouseClickHandler);
        RenderHelper_1.RenderHelper.addEventListener(svgElement, "contextmenu", this.onContextMenuHandler);
        RenderHelper_1.RenderHelper.addEventListener(window, "resize", this.onWindowResizelHandler);
        RenderHelper_1.RenderHelper.addEventListener(window, "orientationchange", this.onOrientationChangeHandler);
        this.input.mouseWheelHandler = this.onMouseWheelHandler;
    };
    RenderManager.prototype.detachEvents = function (svgElement) {
        if (Utils_2.EventUtils.isPointerEvents())
            this.detachPointerEvents(svgElement);
        else {
            this.detachMouseTouchEvents(svgElement);
            RenderHelper_1.RenderHelper.removeEventListener(svgElement, "mouseenter", this.onMouseEnterHandler);
            RenderHelper_1.RenderHelper.removeEventListener(svgElement, "mouseleave", this.onMouseLeaveHandler);
        }
        RenderHelper_1.RenderHelper.removeEventListener(svgElement, "wheel", this.onMouseWheelHandler);
        RenderHelper_1.RenderHelper.removeEventListener(svgElement, "dblclick", this.onMouseDblClickHandler);
        RenderHelper_1.RenderHelper.removeEventListener(svgElement, "contextmenu", this.onContextMenuHandler);
        RenderHelper_1.RenderHelper.removeEventListener(svgElement, "click", this.onMouseClickHandler);
        RenderHelper_1.RenderHelper.removeEventListener(window, "resize", this.onWindowResizelHandler);
        RenderHelper_1.RenderHelper.removeEventListener(window, "orientationchange", this.onOrientationChangeHandler);
    };
    RenderManager.prototype.setPointerPosition = function (evt) {
        this.pointers[evt.pointerId] = {
            clientX: evt.clientX,
            clientY: evt.clientY
        };
    };
    RenderManager.prototype.clearPointerPosition = function (evt) {
        delete this.pointers[evt.pointerId];
    };
    RenderManager.prototype.onPointerDown = function (evt) {
        this.setPointerPosition(evt);
        if (this.getPointerCount() > 2)
            this.pointers = {};
        this.onMouseDown(evt);
    };
    RenderManager.prototype.onPointerUp = function (evt) {
        this.clearPointerPosition(evt);
        this.onMouseUp(evt);
    };
    RenderManager.prototype.onPointerMove = function (evt) {
        if ((browser_1.Browser.TouchUI && !Utils_2.EventUtils.isMousePointer(evt)) || Utils_2.EventUtils.isLeftButtonPressed(evt))
            this.setPointerPosition(evt);
        this.onMouseMove(evt);
    };
    RenderManager.prototype.onPointerCancel = function (evt) {
        this.clearPointerPosition(evt);
    };
    RenderManager.prototype.onPointerLeave = function (evt) {
        if (Utils_2.EventUtils.isMousePointer(evt))
            this.onMouseLeave(evt);
        this.clearPointerPosition(evt);
    };
    RenderManager.prototype.onMouseDown = function (evt) {
        var _this = this;
        this.lockMouseMove();
        this.input.lockFocus();
        this.autoScroll.onMouseDown(evt);
        this.lastDownMouseEvent = this.createDiagramMouseEvent(evt);
        Utils_1.raiseEvent(evt, this.lastDownMouseEvent, function (e) { return _this.events.onMouseDown(e); });
        if (this.events.canFinishTextEditing())
            this.input.captureFocus();
        if (Utils_2.EventUtils.isTouchEvent(evt))
            this.processTouchDown(evt);
        var srcElement = evt_1.EvtUtils.getEventSource(evt);
        var tagName = srcElement && srcElement.tagName;
        if (browser_1.Browser.TouchUI || tagName.toLowerCase() === "img" || tagName.toLowerCase() === "image") {
            evt_1.EvtUtils.preventEventAndBubble(evt);
            return false;
        }
    };
    RenderManager.prototype.onMouseMove = function (evt) {
        var _this = this;
        if (this.moveLocked)
            return;
        this.autoScroll.onMouseMove(evt, function () { return _this.onMouseMoveCore(evt); });
        this.onMouseMoveCore(evt);
        browser_1.Browser.IE && this.lockMouseMove();
        if (Utils_2.EventUtils.isTouchEvent(evt))
            this.processTouchMove(evt);
    };
    RenderManager.prototype.onMouseMoveCore = function (evt) {
        var _this = this;
        Utils_1.raiseEvent(evt, this.createDiagramMouseEvent(evt), function (e) { return _this.events.onMouseMove(e); });
    };
    RenderManager.prototype.onMouseUp = function (evt) {
        var _this = this;
        this.lockMouseMove();
        var mouseEvent = this.createDiagramMouseEvent(evt);
        Utils_1.raiseEvent(evt, mouseEvent, function (e) { return _this.events.onMouseUp(e); });
        this.autoScroll.onMouseUp(evt);
        if (mouseEvent.source.type !== Event_1.MouseEventElementType.Undefined)
            this.input.captureFocus(true);
        if (Utils_2.EventUtils.isTouchEvent(evt))
            this.processTouchUp(evt);
    };
    RenderManager.prototype.onMouseEnter = function (evt) {
        var _this = this;
        this.autoScroll.onMouseEnter(evt);
        Utils_1.raiseEvent(evt, this.createDiagramMouseEvent(evt), function (e) { return _this.events.onMouseEnter(e); });
    };
    RenderManager.prototype.onMouseLeave = function (evt) {
        var _this = this;
        Utils_1.raiseEvent(evt, this.createDiagramMouseEvent(evt), function (e) { return _this.events.onMouseLeave(e); });
    };
    RenderManager.prototype.onMouseDblClick = function (evt) {
        var _this = this;
        Utils_1.raiseEvent(evt, this.createDiagramMouseEvent(evt), function (e) { return _this.events.onDblClick(e); });
    };
    RenderManager.prototype.onMouseClick = function (evt) {
        var _this = this;
        if (!Utils_2.EventUtils.isTouchEvent(evt))
            Utils_1.raiseEvent(evt, this.createActualMouseClickEvent(evt), function (e) { return _this.events.onClick(e); });
        else if (!Utils_2.EventUtils.isMousePointer(evt))
            this.input.captureFocus();
    };
    RenderManager.prototype.createActualMouseClickEvent = function (evt) {
        if (!this.lastDownMouseEvent)
            return this.createDiagramMouseEvent(evt);
        return new Event_1.DiagramMouseEvent(this.lastDownMouseEvent.modifiers, this.lastDownMouseEvent.button, this.lastDownMouseEvent.offsetPoint.clone(), this.lastDownMouseEvent.modelPoint.clone(), this.lastDownMouseEvent.source, this.createDiagramMouseEventTouches(evt));
    };
    RenderManager.prototype.onContextMenu = function (evt) {
        var _this = this;
        if (!this.contextMenuEnabled)
            return;
        if (evt.buttons !== 1)
            Utils_1.raiseEvent(evt, this.createDiagramContextMenuEvent(evt), function (e) { return _this.events.onContextMenu(e); });
        this.input.captureFocus();
        return evt_1.EvtUtils.preventEventAndBubble(evt);
    };
    RenderManager.prototype.processTouchDown = function (evt) {
        var _this = this;
        this.touchDownPoint = this.getTouchPointFromEvent(evt);
        this.resetLongTouch();
        this.longTouchTimer = setTimeout(function () {
            Utils_1.raiseEvent(evt, _this.createDiagramMouseEvent(evt), function (e) { return _this.events.onLongTouch(e); });
            _this.resetLongTouch();
            _this.resetDblClick();
        }, exports.LONG_TOUCH_TIMEOUT);
    };
    RenderManager.prototype.processTouchMove = function (evt) {
        var currentTouchPoint = this.getTouchPointFromEvent(evt);
        if (this.touchDownPoint && currentTouchPoint && (Math.abs(this.touchDownPoint.x - currentTouchPoint.x) > RenderManager.touchPositionLimit ||
            Math.abs(this.touchDownPoint.y - currentTouchPoint.y) > RenderManager.touchPositionLimit)) {
            this.resetLongTouch();
            this.resetDblClick();
        }
    };
    RenderManager.prototype.getPointers = function () {
        var _this = this;
        return Object.keys(this.pointers).map(function (k) { return _this.pointers[k]; });
    };
    RenderManager.prototype.getPointerCount = function () {
        return Object.keys(this.pointers).length;
    };
    RenderManager.prototype.getTouchPointFromEvent = function (evt) {
        var touchPosition;
        var touches = evt["touches"];
        if (touches && touches.length > 0)
            touchPosition = new point_1.Point(touches[0].clientX, touches[0].clientY);
        else {
            var pointers = this.getPointers();
            if (pointers.length)
                touchPosition = new point_1.Point(pointers[0].clientX, pointers[0].clientY);
        }
        return touchPosition;
    };
    RenderManager.prototype.processTouchUp = function (evt) {
        var _this = this;
        if (this.longTouchTimer !== undefined) {
            Utils_1.raiseEvent(evt, this.createDiagramMouseEvent(evt), function (e) { return _this.events.onClick(e); });
            var element = evt_1.EvtUtils.getEventSource(evt);
            if (this.dblTouchTimer !== undefined && this.lastClickElement === element) {
                Utils_1.raiseEvent(evt, this.createDiagramMouseEvent(evt), function (e) { return _this.events.onDblClick(e); });
                this.resetDblClick();
            }
            else {
                this.resetDblClick();
                this.dblTouchTimer = setTimeout(function () { return _this.dblTouchTimer = undefined; }, exports.DBL_CLICK_TIMEOUT);
            }
            this.lastClickElement = element;
        }
        this.resetLongTouch();
        this.touchDownPoint = undefined;
    };
    RenderManager.prototype.resetLongTouch = function () {
        if (this.longTouchTimer !== undefined)
            clearTimeout(this.longTouchTimer);
        this.longTouchTimer = undefined;
    };
    RenderManager.prototype.resetDblClick = function () {
        if (this.dblTouchTimer !== undefined)
            clearTimeout(this.dblTouchTimer);
        this.dblTouchTimer = undefined;
    };
    RenderManager.prototype.onOrientationChange = function () {
        var _this = this;
        setTimeout(function () { return _this.onWindowResize(); }, 100);
    };
    RenderManager.prototype.onWindowResize = function () {
        var resetTo = { horizontal: false, vertical: false };
        if (this.view.autoZoom !== Settings_1.AutoZoomMode.Disabled) {
            resetTo.horizontal = true;
            resetTo.vertical = true;
        }
        else {
            var oldFitInfo = this.view.checkFitToCanvas();
            var newFitInfo = this.view.checkFitToCanvas(this.scroll.getSize());
            resetTo = { horizontal: oldFitInfo.horizontal !== newFitInfo.horizontal || newFitInfo.horizontal, vertical: oldFitInfo.vertical !== newFitInfo.vertical || newFitInfo.vertical };
        }
        this.view.adjust(resetTo);
    };
    RenderManager.prototype.onMouseWheel = function (evt) {
        var _this = this;
        Utils_1.raiseEvent(evt, this.createDiagramWheelEvent(evt), function (e) { return _this.events.onMouseWheel(e); });
    };
    RenderManager.prototype.notifyModelSizeChanged = function (size, offset) {
        this.view.notifyModelSizeChanged(size, offset);
    };
    RenderManager.prototype.notifyModelRectangleChanged = function (rectangle) {
        this.view.notifyModelRectangleChanged(rectangle);
    };
    RenderManager.prototype.notifyReadOnlyChanged = function (readOnly) {
        dom_1.DomUtils.toggleClassName(this.mainElement, READONLY_CSSCLASS, readOnly);
    };
    RenderManager.prototype.notifyDragStart = function (itemKeys) { };
    RenderManager.prototype.notifyDragEnd = function (itemKeys) { };
    RenderManager.prototype.notifyDragScrollStart = function () {
        this.autoScroll.onDragScrollStart();
    };
    RenderManager.prototype.notifyDragScrollEnd = function () {
        this.autoScroll.onDragScrollEnd();
    };
    RenderManager.prototype.notifyToolboxDragStart = function (evt) {
        this.onMouseEnter(evt);
    };
    RenderManager.prototype.notifyToolboxDragEnd = function (evt) {
        if (evt && Utils_2.EventUtils.isPointerEvents())
            this.onMouseUp(evt);
    };
    RenderManager.prototype.notifyToolboxDraggingMouseMove = function (evt) {
        this.onMouseMove(evt);
    };
    RenderManager.prototype.createDiagramMouseEvent = function (evt) {
        var modifiers = key_1.KeyUtils.getKeyModifiers(evt);
        var button = isLeftButtonPressed(evt) ? Event_1.MouseButton.Left : Event_1.MouseButton.Right;
        var offsetPoint = this.getOffsetPointByEvent(evt);
        var modelPoint = this.getModelPoint(offsetPoint);
        var isTouchMode = Utils_2.EventUtils.isTouchEvent(evt);
        var eventSource = this.getEventSource(evt, isTouchMode);
        var touches = this.createDiagramMouseEventTouches(evt);
        return new Event_1.DiagramMouseEvent(modifiers, button, offsetPoint, modelPoint, eventSource, touches, isTouchMode);
    };
    RenderManager.prototype.createDiagramMouseEventTouches = function (evt) {
        var touches = [];
        if (evt["touches"])
            for (var i = 0; i < evt["touches"].length; i++) {
                var x = evt["touches"][i].clientX;
                var y = evt["touches"][i].clientY;
                var offsetPoint = this.getOffsetPointByEventPoint(x, y);
                var modelPoint = this.getModelPoint(offsetPoint);
                touches.push(new Event_1.DiagramMouseEventTouch(offsetPoint, modelPoint));
            }
        else {
            var pointers = this.getPointers();
            for (var i = 0; i < pointers.length; i++) {
                var x = pointers[i].clientX;
                var y = pointers[i].clientY;
                var offsetPoint = this.getOffsetPointByEventPoint(x, y);
                var modelPoint = this.getModelPoint(offsetPoint);
                touches.push(new Event_1.DiagramMouseEventTouch(offsetPoint, modelPoint));
            }
        }
        return touches;
    };
    RenderManager.prototype.createDiagramContextMenuEvent = function (evt) {
        var modifiers = key_1.KeyUtils.getKeyModifiers(evt);
        var eventPoint = new point_1.Point(evt.pageX, evt.pageY);
        var offsetPoint = this.getOffsetPointByEvent(evt);
        var modelPoint = this.getModelPoint(offsetPoint);
        return new Event_1.DiagramContextMenuEvent(modifiers, eventPoint, modelPoint);
    };
    RenderManager.prototype.createDiagramWheelEvent = function (evt) {
        var modifiers = key_1.KeyUtils.getKeyModifiers(evt);
        var offsetPoint = this.getOffsetPointByEvent(evt);
        var modelPoint = this.view.getModelPoint(offsetPoint);
        var eventSource = this.getEventSource(evt);
        var deltaX = evt.deltaX || (evt["originalEvent"] && evt["originalEvent"].deltaX);
        var deltaY = evt.deltaY || (evt["originalEvent"] && evt["originalEvent"].deltaY);
        return new Event_1.DiagramWheelEvent(modifiers, deltaX, deltaY, offsetPoint, modelPoint, eventSource);
    };
    RenderManager.prototype.getEventSource = function (evt, findByPosition) {
        var element = findByPosition ? evt_1.EvtUtils.getEventSourceByPosition(evt) : evt_1.EvtUtils.getEventSource(evt);
        if (this.isDiagramControl(element))
            while (element && !this.isDocumentContainer(element)) {
                var src_1 = Utils_1.RenderUtils.getElementEventData(element);
                if (src_1 !== undefined)
                    return src_1;
                if (this.input.isTextInputElement(element))
                    return new Event_1.MouseEventSource(Event_1.MouseEventElementType.Document);
                element = element.parentNode;
            }
        var src = new Event_1.MouseEventSource(Event_1.MouseEventElementType.Undefined);
        if (element && this.isDocumentContainer(element))
            src.type = Event_1.MouseEventElementType.Background;
        return src;
    };
    RenderManager.prototype.isDiagramControl = function (element) {
        while (element) {
            if (this.isDocumentContainer(element))
                return true;
            element = element.parentNode;
        }
        return false;
    };
    RenderManager.prototype.isDocumentContainer = function (element) {
        return element === this.mainElement;
    };
    RenderManager.prototype.lockMouseMove = function () {
        var _this = this;
        this.moveLocked = true;
        this.lockMouseMoveTimer = setTimeout(function () {
            _this.moveLocked = false;
            _this.lockMouseMoveTimer = -1;
        }, 10);
    };
    RenderManager.prototype.killLockMouseMoveTimer = function () {
        if (this.lockMouseMoveTimer !== -1) {
            clearTimeout(this.lockMouseMoveTimer);
            this.lockMouseMoveTimer = -1;
        }
    };
    RenderManager.prototype.clearLastMouseDownEvent = function () {
        this.lastDownMouseEvent = undefined;
    };
    RenderManager.prototype.getModelPoint = function (offsetPoint) {
        return this.view.getModelPoint(offsetPoint);
    };
    RenderManager.prototype.getOffsetPointByEvent = function (evt) {
        var clientX = evt_1.EvtUtils.getEventX(evt);
        var clientY = evt_1.EvtUtils.getEventY(evt);
        return this.getOffsetPointByEventPoint(clientX, clientY);
    };
    RenderManager.prototype.getOffsetPointByEventPoint = function (clientX, clientY) {
        var scrollContainer = this.scroll.getScrollContainer();
        var containerX = dom_1.DomUtils.getAbsolutePositionX(scrollContainer);
        var containerY = dom_1.DomUtils.getAbsolutePositionY(scrollContainer);
        return new point_1.Point(clientX - containerX, clientY - containerY);
    };
    RenderManager.prototype.getModelPointByEventPoint = function (clientX, clientY) {
        var offsetPoint = this.getOffsetPointByEventPoint(clientX, clientY);
        return this.view.getModelPoint(offsetPoint);
    };
    RenderManager.prototype.getEventPointByModelPoint = function (point) {
        var pos = this.view.getAbsolutePoint(point);
        var scrollContainer = this.scroll.getScrollContainer();
        return new point_1.Point(dom_1.DomUtils.getAbsolutePositionX(scrollContainer) + pos.x, dom_1.DomUtils.getAbsolutePositionY(scrollContainer) + pos.y);
    };
    RenderManager.touchPositionLimit = 4;
    return RenderManager;
}());
exports.RenderManager = RenderManager;
function isLeftButtonPressed(evt) {
    return !browser_1.Browser.MSTouchUI ? Utils_2.EventUtils.isLeftButtonPressed(evt) : evt.button !== 2;
}
//# sourceMappingURL=RenderManager.js.map