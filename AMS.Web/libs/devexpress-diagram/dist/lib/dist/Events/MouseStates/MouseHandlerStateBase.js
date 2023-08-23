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
exports.MouseHandlerCancellableState = exports.MouseHandlerStateBase = void 0;
var key_1 = require("@devexpress/utils/lib/utils/key");
var MouseHandlerStateBase = (function () {
    function MouseHandlerStateBase(handler) {
        this.handler = handler;
    }
    MouseHandlerStateBase.prototype.start = function () { };
    MouseHandlerStateBase.prototype.finish = function () { };
    MouseHandlerStateBase.prototype.onMouseClick = function (_evt) { };
    MouseHandlerStateBase.prototype.onMouseDblClick = function (_evt) {
        this.handler.switchToDefaultState();
    };
    MouseHandlerStateBase.prototype.onMouseDown = function (_evt) { };
    MouseHandlerStateBase.prototype.onMouseUp = function (_evt) { };
    MouseHandlerStateBase.prototype.onMouseMove = function (_evt) { };
    MouseHandlerStateBase.prototype.onMouseWheel = function (_evt) { return false; };
    MouseHandlerStateBase.prototype.onDragStart = function (_evt) { };
    MouseHandlerStateBase.prototype.onDragEnd = function (_evt) { };
    MouseHandlerStateBase.prototype.onShortcut = function (_shortcutCode) { return false; };
    MouseHandlerStateBase.prototype.onKeyDown = function (_evt) { };
    MouseHandlerStateBase.prototype.onKeyUp = function (_evt) { };
    MouseHandlerStateBase.prototype.onConnectionPointsShow = function (key, points) { };
    MouseHandlerStateBase.prototype.onConnectionTargetShow = function (key, info) { };
    return MouseHandlerStateBase;
}());
exports.MouseHandlerStateBase = MouseHandlerStateBase;
var MouseHandlerCancellableState = (function (_super) {
    __extends(MouseHandlerCancellableState, _super);
    function MouseHandlerCancellableState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MouseHandlerCancellableState.prototype.onShortcut = function (code) {
        if (code === key_1.KeyCode.Esc) {
            this.cancelChanges();
            this.handler.switchToDefaultState();
            return true;
        }
        return false;
    };
    return MouseHandlerCancellableState;
}(MouseHandlerStateBase));
exports.MouseHandlerCancellableState = MouseHandlerCancellableState;
//# sourceMappingURL=MouseHandlerStateBase.js.map