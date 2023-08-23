"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseHandlerDefaultStateBase = void 0;
var MouseHandlerStateBase_1 = require("./MouseHandlerStateBase");
var Event_1 = require("../Event");
var MouseHandlerToggleShapeExpandedState_1 = require("./MouseHandlerToggleShapeExpandedState");
var MouseHandlerSelectionState_1 = require("./MouseHandlerSelectionState");
var MouseHandlerZoomOnWheelState_1 = require("./MouseHandlerZoomOnWheelState");
var MouseHandlerScrollingState_1 = require("./MouseHandlerScrollingState");
var unit_converter_1 = require("@devexpress/utils/lib/class/unit-converter");
var MouseHandlerZoomOnPinchState_1 = require("./MouseHandlerZoomOnPinchState");
var MouseHandlerDefaultStateBase = (function (_super) {
    __extends(MouseHandlerDefaultStateBase, _super);
    function MouseHandlerDefaultStateBase(handler, history, selection, model, view, visualizerManager, shapeDescriptionManager, settings) {
        var _this = _super.call(this, handler) || this;
        _this.history = history;
        _this.selection = selection;
        _this.model = model;
        _this.view = view;
        _this.visualizerManager = visualizerManager;
        _this.shapeDescriptionManager = shapeDescriptionManager;
        _this.settings = settings;
        return _this;
    }
    MouseHandlerDefaultStateBase.prototype.onKeyDown = function (evt) {
        this.handler.onStartScrollPageByKeyboard(evt);
    };
    MouseHandlerDefaultStateBase.prototype.onKeyUp = function (evt) {
        this.handler.onFinishScrollPageByKeyboard(evt);
    };
    MouseHandlerDefaultStateBase.prototype.onMouseDown = function (evt) {
        if (!this.handler.canFinishTextEditing())
            return;
        this.onMouseDownCore(evt);
        if (this.handler.state !== this)
            this.handler.state.onMouseDown(evt);
    };
    MouseHandlerDefaultStateBase.prototype.onMouseDownCore = function (evt) {
        if (this.handler.canScrollPage(evt))
            this.startScrolling(evt);
        else if (this.hasDiagramItem(evt) && this.canDragObjectOnMouseDown(evt.source.key))
            this.onDragDiagramItemOnMouseDown(evt);
        else if (evt.button === Event_1.MouseButton.Left && evt.source.type === Event_1.MouseEventElementType.ShapeExpandButton && this.canExpandContainerOnMouseDown(evt.source.key))
            this.onShapeExpandBtnMouseDown(evt);
        else {
            if (!this.hasDiagramItem(evt) && this.canClearSelectionOnMouseDown())
                this.clearSelection();
            this.startPoint = evt.modelPoint;
        }
    };
    MouseHandlerDefaultStateBase.prototype.onDragDiagramItemOnMouseDown = function (evt) {
        this.replaceSelection(evt);
    };
    MouseHandlerDefaultStateBase.prototype.onMouseMove = function (evt) {
        this.onMouseMoveCore(evt);
        if (this.handler.state !== this) {
            this.handler.state.onMouseDown(this.handler.mouseDownEvent);
            this.handler.state.onMouseMove(evt);
        }
    };
    MouseHandlerDefaultStateBase.prototype.onMouseMoveCore = function (evt) {
        if (this.startPoint &&
            (Math.abs(this.startPoint.x - evt.modelPoint.x) > MouseHandlerDefaultStateBase.startLimit ||
                Math.abs(this.startPoint.y - evt.modelPoint.y) > MouseHandlerDefaultStateBase.startLimit)) {
            this.processOnMouseMoveAfterLimit(evt);
            this.startPoint = undefined;
        }
    };
    MouseHandlerDefaultStateBase.prototype.processOnMouseMoveAfterLimit = function (evt) {
        if (evt.isTouchMode)
            if (evt.touches.length > 1)
                this.startZooming(evt);
            else
                this.startScrolling(evt);
        else
            this.startSelection(evt);
    };
    MouseHandlerDefaultStateBase.prototype.onMouseUp = function (evt) {
        this.onMouseUpCore(evt);
        if (this.handler.state !== this)
            this.handler.state.onMouseUp(evt);
    };
    MouseHandlerDefaultStateBase.prototype.onMouseUpCore = function (evt) {
        if (evt.source.type === Event_1.MouseEventElementType.Shape && this.canSelectOnMouseUp(evt.source.key))
            this.replaceSelection(evt);
        else if (evt.source.type === Event_1.MouseEventElementType.Connector && this.canSelectOnMouseUp(evt.source.key))
            this.replaceSelection(evt);
        else if (evt.source.type === Event_1.MouseEventElementType.ShapeExpandButton && this.canSelectOnMouseUp(evt.source.key))
            this.replaceSelection(evt);
        else if (this.startPoint && this.canClearSelectionOnMouseUp())
            this.clearSelection();
        this.startPoint = undefined;
    };
    MouseHandlerDefaultStateBase.prototype.onMouseWheel = function (evt) {
        if (this.handler.canStartZoomOnWheel(evt)) {
            this.handler.switchState(new MouseHandlerZoomOnWheelState_1.MouseHandlerZoomOnWheelState(this.handler, this.settings, this.view));
            this.handler.state.onMouseWheel(evt);
            return true;
        }
        return false;
    };
    MouseHandlerDefaultStateBase.prototype.onLongTouch = function (evt) {
        this.replaceMultipleSelection(evt.source.key);
    };
    MouseHandlerDefaultStateBase.prototype.finish = function () {
        this.startPoint = undefined;
    };
    MouseHandlerDefaultStateBase.prototype.startSelection = function (evt) {
        if (evt.button === Event_1.MouseButton.Left)
            this.handler.switchState(new MouseHandlerSelectionState_1.MouseHandlerSelectionState(this.handler, this.selection, this.visualizerManager));
    };
    MouseHandlerDefaultStateBase.prototype.startScrolling = function (evt) {
        if (evt.button === Event_1.MouseButton.Left) {
            this.handler.raiseDragScrollStart();
            this.handler.switchState(new MouseHandlerScrollingState_1.MouseHandlerScrollingState(this.handler, this.view, this.selection));
        }
    };
    MouseHandlerDefaultStateBase.prototype.startZooming = function (evt) {
        this.handler.switchState(new MouseHandlerZoomOnPinchState_1.MouseHandlerZoomOnPinchState(this.handler, this.selection, this.settings, this.view));
    };
    MouseHandlerDefaultStateBase.prototype.inSelection = function (key) {
        return this.selection.hasKey(key);
    };
    MouseHandlerDefaultStateBase.prototype.hasDiagramItem = function (evt) {
        return evt.source.type === Event_1.MouseEventElementType.Shape ||
            evt.source.type === Event_1.MouseEventElementType.Connector;
    };
    MouseHandlerDefaultStateBase.prototype.onShapeExpandBtnMouseDown = function (evt) {
        this.handler.addDiagramItemToSelection(evt);
        this.handler.switchState(new MouseHandlerToggleShapeExpandedState_1.MouseHandlerToggleShapeExpandedState(this.handler, this.history, this.model, this.selection));
    };
    MouseHandlerDefaultStateBase.prototype.replaceSelection = function (evt) {
        if (this.handler.canMultipleSelection(evt))
            this.replaceMultipleSelection(evt.source.key);
        else
            this.handler.changeSingleSelection(evt.source.key);
    };
    MouseHandlerDefaultStateBase.prototype.replaceMultipleSelection = function (key) {
        if (this.selection.hasKey(key))
            this.selection.remove(key);
        else
            this.selection.add(key);
    };
    MouseHandlerDefaultStateBase.prototype.clearSelection = function () {
        this.selection.set([]);
    };
    MouseHandlerDefaultStateBase.startLimit = unit_converter_1.UnitConverter.pixelsToTwips(1);
    return MouseHandlerDefaultStateBase;
}(MouseHandlerStateBase_1.MouseHandlerStateBase));
exports.MouseHandlerDefaultStateBase = MouseHandlerDefaultStateBase;
//# sourceMappingURL=MouseHandlerDefaultStateBase.js.map