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
exports.MouseHandlerDefaultTouchState = void 0;
var MouseHandlerDefaultState_1 = require("./MouseHandlerDefaultState");
var MouseHandlerDefaultTouchState = (function (_super) {
    __extends(MouseHandlerDefaultTouchState, _super);
    function MouseHandlerDefaultTouchState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MouseHandlerDefaultTouchState.prototype.updateConnectionsOnMouseMove = function (evt) {
    };
    MouseHandlerDefaultTouchState.prototype.canDragObjectOnMouseDown = function (key) {
        return this.inSelection(key);
    };
    MouseHandlerDefaultTouchState.prototype.canExpandContainerOnMouseDown = function (key) {
        return true;
    };
    MouseHandlerDefaultTouchState.prototype.canClearSelectionOnMouseDown = function () {
        return true;
    };
    MouseHandlerDefaultTouchState.prototype.canSelectOnMouseUp = function (key) {
        return !this.inSelection(key);
    };
    MouseHandlerDefaultTouchState.prototype.canClearSelectionOnMouseUp = function () {
        return false;
    };
    return MouseHandlerDefaultTouchState;
}(MouseHandlerDefaultState_1.MouseHandlerDefaultState));
exports.MouseHandlerDefaultTouchState = MouseHandlerDefaultTouchState;
//# sourceMappingURL=MouseHandlerDefaultTouchState.js.map