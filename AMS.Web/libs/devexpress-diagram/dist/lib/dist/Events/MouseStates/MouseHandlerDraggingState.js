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
exports.MouseHandlerDraggingState = void 0;
var MouseHandlerStateBase_1 = require("./MouseHandlerStateBase");
var Event_1 = require("../Event");
var unit_converter_1 = require("@devexpress/utils/lib/class/unit-converter");
var MouseHandlerDraggingState = (function (_super) {
    __extends(MouseHandlerDraggingState, _super);
    function MouseHandlerDraggingState(handler, history) {
        var _this = _super.call(this, handler) || this;
        _this.history = history;
        return _this;
    }
    MouseHandlerDraggingState.prototype.canApplyChangesOnMouseMove = function (initPosition, position) {
        return !initPosition || !position ||
            Math.abs(initPosition.x - position.x) > MouseHandlerDraggingState.dragStartLimit ||
            Math.abs(initPosition.y - position.y) > MouseHandlerDraggingState.dragStartLimit;
    };
    MouseHandlerDraggingState.prototype.onAfterApplyChanges = function () {
        if (!this.modified)
            this.handler.raiseDragStart(this.getDraggingElementKeys());
        this.modified = true;
        this.mouseDownPoint = undefined;
    };
    MouseHandlerDraggingState.prototype.onMouseDown = function (evt) {
        this.mouseDownPoint = evt.modelPoint.clone();
    };
    MouseHandlerDraggingState.prototype.onMouseMove = function (evt) {
        this.mouseMoveEvent = evt;
        if (evt.button !== Event_1.MouseButton.Left) {
            this.cancelChanges();
            this.handler.switchToDefaultState();
        }
        else if (evt.button === Event_1.MouseButton.Left && this.canApplyChangesOnMouseMove(this.mouseDownPoint, evt.modelPoint)) {
            this.onApplyChanges(evt);
            this.onAfterApplyChanges();
        }
    };
    MouseHandlerDraggingState.prototype.onKeyDown = function (evt) {
        if (this.mouseMoveEvent && (evt.keyCode === 16 || evt.keyCode === 17 || evt.keyCode === 18))
            this.performMouseMoveEvent(evt.modifiers);
    };
    MouseHandlerDraggingState.prototype.onKeyUp = function (evt) {
        if (this.mouseMoveEvent && (evt.keyCode === 16 || evt.keyCode === 17 || evt.keyCode === 18))
            this.performMouseMoveEvent(evt.modifiers);
    };
    MouseHandlerDraggingState.prototype.onMouseUp = function (evt) {
        this.mouseDownPoint = undefined;
        this.mouseMoveEvent = undefined;
        this.handler.switchToDefaultState();
    };
    MouseHandlerDraggingState.prototype.performMouseMoveEvent = function (modifiers) {
        this.mouseMoveEvent.modifiers = modifiers;
        this.onMouseMove(this.mouseMoveEvent);
    };
    MouseHandlerDraggingState.prototype.start = function () {
        this.handler.beginStorePermissions();
        this.history.beginTransaction();
    };
    MouseHandlerDraggingState.prototype.finish = function () {
        this.checkStoredPermissionsOnFinish();
        if (this.modified) {
            this.onFinishWithChanges();
            this.modified = false;
            this.history.endTransaction();
            this.handler.raiseDragEnd(this.getDraggingElementKeys());
        }
        else
            this.history.endTransaction();
        this.handler.endStorePermissions();
        this.handler.clearInteractingItems();
    };
    MouseHandlerDraggingState.prototype.checkStoredPermissionsOnFinish = function () {
        if (!this.handler.isStoredPermissionsGranted()) {
            this.cancelChanges();
            this.modified = false;
        }
    };
    MouseHandlerDraggingState.prototype.onFinishWithChanges = function () { };
    MouseHandlerDraggingState.prototype.cancelChanges = function () {
        this.handler.lockPermissions();
        this.history.undoTransaction();
        this.handler.unlockPermissions();
        if (this.modified)
            this.handler.raiseDragEnd(this.getDraggingElementKeys());
        this.modified = false;
    };
    MouseHandlerDraggingState.prototype.getSnappedPoint = function (evt, point) {
        return this.handler.getSnappedPointOnDragPoint(evt, point);
    };
    MouseHandlerDraggingState.dragStartLimit = unit_converter_1.UnitConverter.pixelsToTwips(4);
    return MouseHandlerDraggingState;
}(MouseHandlerStateBase_1.MouseHandlerCancellableState));
exports.MouseHandlerDraggingState = MouseHandlerDraggingState;
//# sourceMappingURL=MouseHandlerDraggingState.js.map