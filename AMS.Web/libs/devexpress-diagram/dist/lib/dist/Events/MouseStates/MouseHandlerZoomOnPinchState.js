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
exports.MouseHandlerZoomOnPinchState = void 0;
var Settings_1 = require("../../Settings");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var MouseHandlerScrollingState_1 = require("./MouseHandlerScrollingState");
var metrics_1 = require("@devexpress/utils/lib/geometry/metrics");
var PINCH_CHANGE_DISTANCE = 1;
var MouseHandlerZoomOnPinchState = (function (_super) {
    __extends(MouseHandlerZoomOnPinchState, _super);
    function MouseHandlerZoomOnPinchState(handler, selection, settings, view) {
        var _this = _super.call(this, handler, view, selection) || this;
        _this.selection = selection;
        _this.settings = settings;
        _this.view = view;
        return _this;
    }
    MouseHandlerZoomOnPinchState.prototype.onMouseDown = function (evt) {
        _super.prototype.onMouseDown.call(this, evt);
        if (evt.touches.length > 1) {
            this.startDistance = this.getTouchDistance(evt);
            this.startZoomLevel = this.settings.zoomLevel;
            this.prevDistance = this.startDistance;
        }
    };
    MouseHandlerZoomOnPinchState.prototype.onMouseMove = function (evt) {
        if (evt.touches.length > 1) {
            var distance = this.getTouchDistance(evt);
            if (Math.abs(this.prevDistance - distance) > PINCH_CHANGE_DISTANCE) {
                this.settings.zoomLevel = this.startZoomLevel * (distance / this.startDistance);
                this.view.scrollTo(this.getMiddleLayoutPoint(evt), this.getMiddleAbsPoint(evt));
                this.view.normalize();
                this.prevDistance = distance;
            }
        }
        _super.prototype.onMouseMove.call(this, evt);
    };
    MouseHandlerZoomOnPinchState.prototype.onMouseUp = function (evt) {
        if (evt.touches.length === 0)
            setTimeout(function () {
                this.handler.switchToDefaultState();
            }.bind(this), 1);
    };
    MouseHandlerZoomOnPinchState.prototype.start = function () {
        _super.prototype.start.call(this);
        this.settings.zoomLevel = this.view.getZoom();
        this.settings.autoZoom = Settings_1.AutoZoomMode.Disabled;
    };
    MouseHandlerZoomOnPinchState.prototype.getTouchDistance = function (evt) {
        var pt0 = new point_1.Point(evt.touches[0].offsetPoint.x, evt.touches[0].offsetPoint.y);
        var pt1 = new point_1.Point(evt.touches[1].offsetPoint.x, evt.touches[1].offsetPoint.y);
        return metrics_1.Metrics.euclideanDistance(pt0, pt1);
    };
    MouseHandlerZoomOnPinchState.prototype.getPointByEvent = function (evt) {
        return this.getMiddleAbsPoint(evt);
    };
    MouseHandlerZoomOnPinchState.prototype.getMiddleAbsPoint = function (evt) {
        if (evt.touches.length > 1)
            return MouseHandlerZoomOnPinchState.getMiddlePointByEvent(evt, function (touch) { return touch.offsetPoint; });
        return evt.offsetPoint;
    };
    MouseHandlerZoomOnPinchState.prototype.getMiddleLayoutPoint = function (evt) {
        if (evt.touches.length > 1)
            return MouseHandlerZoomOnPinchState.getMiddlePointByEvent(evt, function (touch) { return touch.modelPoint; });
        return evt.modelPoint;
    };
    MouseHandlerZoomOnPinchState.getMiddlePointByEvent = function (evt, getPoint) {
        if (evt.touches.length > 1)
            return new point_1.Point((getPoint(evt.touches[0]).x + getPoint(evt.touches[1]).x) / 2, (getPoint(evt.touches[0]).y + getPoint(evt.touches[1]).y) / 2);
    };
    return MouseHandlerZoomOnPinchState;
}(MouseHandlerScrollingState_1.MouseHandlerScrollingState));
exports.MouseHandlerZoomOnPinchState = MouseHandlerZoomOnPinchState;
//# sourceMappingURL=MouseHandlerZoomOnPinchState.js.map