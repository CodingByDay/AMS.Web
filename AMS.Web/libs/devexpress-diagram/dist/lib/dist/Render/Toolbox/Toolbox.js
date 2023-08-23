"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagramDraggingEvent = exports.ToolboxDraggingObject = exports.Toolbox = void 0;
var Utils_1 = require("../../Utils");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var evt_1 = require("@devexpress/utils/lib/utils/evt");
var Data_1 = require("../../Utils/Data");
var dom_1 = require("@devexpress/utils/lib/utils/dom");
var browser_1 = require("@devexpress/utils/lib/browser");
var RenderHelper_1 = require("../RenderHelper");
var CanvasItemsManager_1 = require("../CanvasItemsManager");
var TOOLBOX_CSSCLASS = "dxdi-toolbox";
var DRAG_CAPTURED_CSSCLASS = "dxdi-tb-drag-captured";
var START_DRAG_CSSCLASS = "dxdi-tb-start-drag-flag";
var TOUCH_DRAGTIMEOUT_MS = 800;
var Toolbox = (function () {
    function Toolbox(parent, readOnly, allowDragging, shapeDescriptionManager, shapeTypes, getAllowedShapeTypes) {
        this.readOnly = readOnly;
        this.allowDragging = allowDragging;
        this.shapeDescriptionManager = shapeDescriptionManager;
        this.shapeTypes = shapeTypes;
        this.getAllowedShapeTypes = getAllowedShapeTypes;
        this.dragPrepareTimeout = -1;
        this.dragState = DragState.None;
        this.emulateDragEvents = browser_1.Browser.WebKitTouchUI;
        this.onDragOperation = new Utils_1.EventDispatcher();
        this.onClickOperation = new Utils_1.EventDispatcher();
        if (!parent)
            return;
        this.mainElement = this.createMainElement(parent);
        this.attachHandlers(this.mainElement);
    }
    Toolbox.prototype.clean = function (removeElement) {
        this.detachHandlers(this.mainElement);
        if (removeElement)
            removeElement(this.mainElement);
    };
    Toolbox.prototype.createMainElement = function (parent) {
        var element = document.createElement("div");
        element.setAttribute("class", TOOLBOX_CSSCLASS);
        element.draggable = true;
        if (this.emulateDragEvents)
            element.tabIndex = 0;
        parent.appendChild(element);
        return element;
    };
    Toolbox.prototype.attachHandlers = function (element) {
        this.onElementMouseDownHandler = this.onElementMouseDown.bind(this);
        this.onElementMouseUpHandler = this.onElementMouseUp.bind(this);
        this.onMouseDownHandler = this.onMouseDown.bind(this);
        this.onMouseMoveHandler = this.onMouseMove.bind(this);
        this.onMouseUpHandler = this.onMouseUp.bind(this);
        this.onDragStartHandler = this.onDragStart.bind(this);
        this.onTouchMoveHandler = this.onTouchMove.bind(this);
        if (!this.emulateDragEvents)
            RenderHelper_1.RenderHelper.addEventListener(element, "dragstart", this.onDragStartHandler);
        if (Utils_1.EventUtils.isPointerEvents()) {
            this.mouseDownEventName = "pointerdown";
            this.mouseMoveEventName = "pointermove";
            this.mouseUpEventName = "pointerup";
        }
        else {
            this.mouseDownEventName = browser_1.Browser.TouchUI ? "touchstart" : "mousedown";
            this.mouseMoveEventName = browser_1.Browser.TouchUI ? "touchmove" : "mousemove";
            this.mouseUpEventName = browser_1.Browser.TouchUI ? "touchend" : "mouseup";
        }
        RenderHelper_1.RenderHelper.addEventListener(element, "touchmove", this.onTouchMoveHandler);
        RenderHelper_1.RenderHelper.addEventListener(element, this.mouseDownEventName, this.onElementMouseDownHandler);
        RenderHelper_1.RenderHelper.addEventListener(element, this.mouseUpEventName, this.onElementMouseUpHandler);
        RenderHelper_1.RenderHelper.addEventListener(element, this.mouseDownEventName, this.onMouseDownHandler);
        RenderHelper_1.RenderHelper.addEventListener(document, this.mouseMoveEventName, this.onMouseMoveHandler);
        RenderHelper_1.RenderHelper.addEventListener(document, this.mouseUpEventName, this.onMouseUpHandler);
    };
    Toolbox.prototype.detachHandlers = function (element) {
        if (!this.emulateDragEvents)
            RenderHelper_1.RenderHelper.removeEventListener(element, "dragstart", this.onDragStartHandler);
        RenderHelper_1.RenderHelper.removeEventListener(element, "touchmove", this.onTouchMoveHandler);
        RenderHelper_1.RenderHelper.removeEventListener(element, this.mouseDownEventName, this.onElementMouseDownHandler);
        RenderHelper_1.RenderHelper.removeEventListener(element, this.mouseUpEventName, this.onElementMouseUpHandler);
        RenderHelper_1.RenderHelper.removeEventListener(element, this.mouseDownEventName, this.onMouseDownHandler);
        RenderHelper_1.RenderHelper.removeEventListener(document, this.mouseMoveEventName, this.onMouseMoveHandler);
        RenderHelper_1.RenderHelper.removeEventListener(document, this.mouseUpEventName, this.onMouseUpHandler);
    };
    Toolbox.prototype.render = function (filter) {
        if (this.mainElement.childNodes)
            this.mainElement.innerHTML = "";
        var shapeTypes = this.shapeTypes;
        shapeTypes = this.getAllowedShapeTypes ? this.getAllowedShapeTypes(shapeTypes) : shapeTypes;
        shapeTypes = filter ? shapeTypes.filter(filter) : shapeTypes;
        if (shapeTypes.length)
            this.createElements(this.mainElement, shapeTypes);
        return !!shapeTypes.length;
    };
    Toolbox.prototype.createDraggingObject = function (shapeType) {
        var evt = new DiagramDraggingEvent();
        evt.data = shapeType;
        evt.onFinishDragging = this.resetDragState.bind(this);
        evt.onCaptured = this.capture.bind(this);
        return new ToolboxDraggingObject(evt);
    };
    Toolbox.prototype.getDragShapeType = function (element) {
        while (element && !dom_1.DomUtils.hasClassName(element, TOOLBOX_CSSCLASS)) {
            if (element.getAttribute && element.getAttribute("data-tb-type"))
                return element.getAttribute("data-tb-type");
            element = element.parentNode;
        }
        return undefined;
    };
    Toolbox.prototype.getTouchPointFromEvent = function (evt) {
        var touchPosition;
        var touches = evt["touches"];
        if (touches && touches.length > 0)
            touchPosition = new point_1.Point(touches[0].clientX, touches[0].clientY);
        else if (evt.clientX && evt.clientY)
            touchPosition = new point_1.Point(evt.clientX, evt.clientY);
        return touchPosition;
    };
    Toolbox.prototype.onElementMouseDown = function (evt) {
        this.mouseDownShapeType = this.getDragShapeType(evt_1.EvtUtils.getEventSource(evt));
        this.touchDownPoint = this.getTouchPointFromEvent(evt);
    };
    Toolbox.prototype.onElementMouseUp = function (evt) {
        var shapeType = this.getDragShapeType(evt_1.EvtUtils.getEventSource(evt));
        if (shapeType && shapeType === this.mouseDownShapeType)
            this.onClickOperation.raise("notifyToolboxClick", shapeType);
        this.mouseDownShapeType = undefined;
        this.touchDownPoint = undefined;
    };
    Toolbox.prototype.onMouseDown = function (evt) {
        this.setDragState(DragState.Prepare, evt);
        if (browser_1.Browser.TouchUI && Utils_1.EventUtils.isMousePointer(evt))
            this.setDragState(DragState.Start, evt);
    };
    Toolbox.prototype.onDragStart = function (evt) {
        this.setDragState(DragState.Start, evt);
        evt.preventDefault();
    };
    Toolbox.prototype.onTouchMove = function (evt) {
        if (this.draggingObject)
            evt.preventDefault();
    };
    Toolbox.prototype.isLeftButtonPressed = function (evt) {
        return evt_1.EvtUtils.isLeftButtonPressed(evt) ||
            (evt.type === "pointermove" && browser_1.Browser.TouchUI && browser_1.Browser.MacOSMobilePlatform && Utils_1.EventUtils.isMousePointer(evt));
    };
    Toolbox.prototype.onMouseMove = function (evt) {
        if (browser_1.Browser.TouchUI && browser_1.Browser.MacOSMobilePlatform) {
            var currentTouchPoint = this.getTouchPointFromEvent(evt);
            if (this.touchDownPoint && currentTouchPoint && this.touchDownPoint.x === currentTouchPoint.x && this.touchDownPoint.y === currentTouchPoint.y)
                return;
        }
        this.setDragState(this.isLeftButtonPressed(evt) ? DragState.Dragging : DragState.None, evt);
        if (Utils_1.EventUtils.isPointerEvents())
            this.raiseDraggingMouseMove(evt);
    };
    Toolbox.prototype.onMouseUp = function (evt) {
        this.setDragState(DragState.None, evt);
    };
    Toolbox.prototype.updateDraggingElementPosition = function (evtX, evtY) {
        var element = this.draggingObject.element;
        var xPos = evtX - element.offsetWidth / 2;
        var yPos = evtY - element.offsetHeight / 2;
        Data_1.SetAbsoluteX(element, xPos);
        Data_1.SetAbsoluteY(element, yPos);
    };
    Toolbox.prototype.setDragState = function (newState, evt) {
        if (this.readOnly || !this.allowDragging)
            return;
        if (newState === DragState.None && newState === this.dragState)
            return;
        if (this.dragPrepareTimeout > -1) {
            clearTimeout(this.dragPrepareTimeout);
            this.dragPrepareTimeout = -1;
            this.dragPrepareEvent = undefined;
        }
        if (newState - this.dragState > 1 || newState !== DragState.None && newState < this.dragState)
            return;
        this.dragState = newState;
        switch (newState) {
            case DragState.Prepare:
                if (!this.prepareDragging(evt))
                    this.setDragState(DragState.None, evt);
                if (this.emulateDragEvents || !Utils_1.EventUtils.isMousePointer(evt)) {
                    this.dragPrepareTimeout = setTimeout(this.onDragPrepareTimeout.bind(this), TOUCH_DRAGTIMEOUT_MS);
                    this.dragPrepareEvent = evt;
                }
                break;
            case DragState.Start:
                dom_1.DomUtils.addClassName(document.body, "dxdi-dragging");
                this.startDragging(evt);
                break;
            case DragState.Dragging:
                this.doDragging(evt);
                break;
            case DragState.None:
                this.finishDragging(evt);
                break;
        }
    };
    Toolbox.prototype.resetDragState = function () {
        this.setDragState(DragState.None, undefined);
    };
    Toolbox.prototype.onDragPrepareTimeout = function () {
        this.dragPrepareTimeout = -1;
        if (this.dragState === DragState.Prepare)
            this.setDragState(DragState.Start, this.dragPrepareEvent);
        this.dragPrepareEvent = undefined;
    };
    Toolbox.prototype.prepareDragging = function (evt) {
        this.dragStartPoint = new point_1.Point(evt_1.EvtUtils.getEventX(evt), evt_1.EvtUtils.getEventY(evt));
        this.dragStartShapeType = this.getDragShapeType(evt_1.EvtUtils.getEventSource(evt));
        if (Utils_1.EventUtils.isMousePointer(evt))
            dom_1.DomUtils.addClassName(this.mainElement, START_DRAG_CSSCLASS);
        if (this.emulateDragEvents || !Utils_1.EventUtils.isMousePointer(evt))
            Utils_1.HtmlFocusUtils.focusWithPreventScroll(this.mainElement);
        return !!this.dragStartShapeType;
    };
    Toolbox.prototype.startDragging = function (evt) {
        this.draggingObject = this.createDraggingObject(this.dragStartShapeType);
        if (this.dragStartShapeType) {
            this.raiseDragStart(evt);
            this.draggingObject.element = this.createDraggingElement(this.draggingObject);
            if (this.draggingObject.captured !== undefined)
                this.capture(this.draggingObject.captured, true);
            this.updateDraggingElementPosition(this.dragStartPoint.x, this.dragStartPoint.y);
        }
        else
            dom_1.DomUtils.addClassName(document.body, CanvasItemsManager_1.NOT_VALID_CSSCLASS);
    };
    Toolbox.prototype.doDragging = function (evt) {
        if (this.draggingObject.element)
            this.updateDraggingElementPosition(evt_1.EvtUtils.getEventX(evt), evt_1.EvtUtils.getEventY(evt));
    };
    Toolbox.prototype.finishDragging = function (evt) {
        if (this.draggingObject) {
            this.raiseDragEnd(evt);
            var element = this.draggingObject.element;
            if (element)
                element.parentNode.removeChild(element);
            delete this.draggingObject;
        }
        this.dragStartPoint = undefined;
        this.dragStartShapeType = undefined;
        dom_1.DomUtils.removeClassName(this.mainElement, START_DRAG_CSSCLASS);
        dom_1.DomUtils.removeClassName(document.body, CanvasItemsManager_1.NOT_VALID_CSSCLASS);
        setTimeout(function () { return dom_1.DomUtils.removeClassName(document.body, "dxdi-dragging"); }, 500);
    };
    Toolbox.prototype.capture = function (captured, forced) {
        if (this.draggingObject && (this.draggingObject.captured !== captured || forced)) {
            this.draggingObject.captured = captured;
            if (this.draggingObject.element)
                dom_1.DomUtils.toggleClassName(this.draggingObject.element, DRAG_CAPTURED_CSSCLASS, captured);
        }
    };
    Toolbox.prototype.raiseDragStart = function (evt) {
        this.onDragOperation.raise("notifyToolboxDragStart", evt);
    };
    Toolbox.prototype.raiseDragEnd = function (evt) {
        this.onDragOperation.raise("notifyToolboxDragEnd", evt);
    };
    Toolbox.prototype.raiseDraggingMouseMove = function (evt) {
        this.onDragOperation.raise("notifyToolboxDraggingMouseMove", evt);
    };
    Toolbox.prototype.notifyReadOnlyChanged = function (readOnly) {
        this.readOnly = readOnly;
    };
    return Toolbox;
}());
exports.Toolbox = Toolbox;
var DragState;
(function (DragState) {
    DragState[DragState["None"] = -1] = "None";
    DragState[DragState["Prepare"] = 0] = "Prepare";
    DragState[DragState["Start"] = 1] = "Start";
    DragState[DragState["Dragging"] = 2] = "Dragging";
})(DragState || (DragState = {}));
var ToolboxDraggingObject = (function () {
    function ToolboxDraggingObject(evt) {
        this.evt = evt;
    }
    return ToolboxDraggingObject;
}());
exports.ToolboxDraggingObject = ToolboxDraggingObject;
var DiagramDraggingEvent = (function () {
    function DiagramDraggingEvent() {
    }
    return DiagramDraggingEvent;
}());
exports.DiagramDraggingEvent = DiagramDraggingEvent;
//# sourceMappingURL=Toolbox.js.map