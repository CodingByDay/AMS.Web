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
exports.MouseHandlerScrollingState = void 0;
var MouseHandlerStateBase_1 = require("./MouseHandlerStateBase");
var Event_1 = require("../Event");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var MouseHandlerScrollingState = (function (_super) {
    __extends(MouseHandlerScrollingState, _super);
    function MouseHandlerScrollingState(handler, view, selection) {
        var _this = _super.call(this, handler) || this;
        _this.view = view;
        _this.selection = selection;
        _this.lastOffset = new point_1.Point(0, 0);
        return _this;
    }
    MouseHandlerScrollingState.prototype.onKeyUp = function (evt) {
        this.handler.onFinishScrollPageByKeyboard(evt);
    };
    MouseHandlerScrollingState.prototype.onMouseDown = function (evt) {
        evt.preventDefault = true;
        this.startPoint = this.getPointByEvent(evt);
    };
    MouseHandlerScrollingState.prototype.onMouseMove = function (evt) {
        if (evt.button !== Event_1.MouseButton.Left) {
            this.handler.onFinishScrollPageByMouse(evt);
            return;
        }
        var prevPoint = this.currentPoint || this.startPoint;
        evt.preventDefault = true;
        var point = this.getPointByEvent(evt);
        var actualOffset = this.view.scrollBy(new point_1.Point(point.x - prevPoint.x, point.y - prevPoint.y));
        this.lastOffset = this.lastOffset.clone().offset(actualOffset.x, actualOffset.y);
        this.currentPoint = point;
    };
    MouseHandlerScrollingState.prototype.onMouseUp = function (evt) {
        if (evt.button === Event_1.MouseButton.Left)
            this.handler.onFinishScrollPageByMouse(evt);
        this.handler.switchToDefaultState();
    };
    MouseHandlerScrollingState.prototype.cancelChanges = function () {
        if (this.currentPoint)
            this.view.scrollBy(this.lastOffset.clone().multiply(-1, -1));
    };
    MouseHandlerScrollingState.prototype.finish = function () {
        if (!this.currentPoint || !this.startPoint || this.currentPoint.equals(this.startPoint))
            this.selection.set([]);
        _super.prototype.finish.call(this);
    };
    MouseHandlerScrollingState.prototype.getPointByEvent = function (evt) {
        return evt.offsetPoint;
    };
    return MouseHandlerScrollingState;
}(MouseHandlerStateBase_1.MouseHandlerCancellableState));
exports.MouseHandlerScrollingState = MouseHandlerScrollingState;
//# sourceMappingURL=MouseHandlerScrollingState.js.map