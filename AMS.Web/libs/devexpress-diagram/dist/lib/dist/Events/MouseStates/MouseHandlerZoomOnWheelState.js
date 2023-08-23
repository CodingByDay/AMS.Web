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
exports.MouseHandlerZoomOnWheelState = void 0;
var MouseHandlerStateBase_1 = require("./MouseHandlerStateBase");
var Event_1 = require("../Event");
var Settings_1 = require("../../Settings");
var MouseHandlerZoomOnWheelState = (function (_super) {
    __extends(MouseHandlerZoomOnWheelState, _super);
    function MouseHandlerZoomOnWheelState(handler, settings, view) {
        var _this = _super.call(this, handler) || this;
        _this.settings = settings;
        _this.view = view;
        return _this;
    }
    MouseHandlerZoomOnWheelState.prototype.onMouseWheel = function (evt) {
        if (!this.trySwitchToDefault(evt)) {
            this.settings.zoomLevel = this.view.getNextStepZoom(evt.deltaY < 0);
            if (evt.source.type === Event_1.MouseEventElementType.Background)
                this.view.resetScroll();
            else {
                this.view.scrollTo(evt.modelPoint, evt.offsetPoint);
                this.view.normalize();
            }
            evt.preventDefault = true;
            return true;
        }
        else
            return this.handler.state.onMouseWheel(evt);
    };
    MouseHandlerZoomOnWheelState.prototype.onMouseUp = function (evt) {
        this.handler.switchToDefaultState();
        this.handler.state.onMouseUp(evt);
    };
    MouseHandlerZoomOnWheelState.prototype.onMouseDown = function (evt) {
        this.handler.switchToDefaultState();
        this.handler.state.onMouseDown(evt);
    };
    MouseHandlerZoomOnWheelState.prototype.onMouseMove = function (evt) {
        this.trySwitchToDefault(evt) && this.handler.state.onMouseMove(evt);
    };
    MouseHandlerZoomOnWheelState.prototype.trySwitchToDefault = function (evt) {
        if (this.handler.canFinishZoomOnWheel(evt)) {
            this.handler.switchToDefaultState();
            return true;
        }
        return false;
    };
    MouseHandlerZoomOnWheelState.prototype.start = function () {
        _super.prototype.start.call(this);
        this.settings.zoomLevel = this.view.getZoom();
        this.settings.autoZoom = Settings_1.AutoZoomMode.Disabled;
    };
    return MouseHandlerZoomOnWheelState;
}(MouseHandlerStateBase_1.MouseHandlerStateBase));
exports.MouseHandlerZoomOnWheelState = MouseHandlerZoomOnWheelState;
//# sourceMappingURL=MouseHandlerZoomOnWheelState.js.map