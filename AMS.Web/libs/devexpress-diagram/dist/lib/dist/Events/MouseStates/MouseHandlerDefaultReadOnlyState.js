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
exports.MouseHandlerDefaultReadOnlyState = void 0;
var MouseHandlerDefaultStateBase_1 = require("./MouseHandlerDefaultStateBase");
var MouseHandlerDefaultReadOnlyState = (function (_super) {
    __extends(MouseHandlerDefaultReadOnlyState, _super);
    function MouseHandlerDefaultReadOnlyState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MouseHandlerDefaultReadOnlyState.prototype.canDragObjectOnMouseDown = function (key) {
        return false;
    };
    MouseHandlerDefaultReadOnlyState.prototype.canExpandContainerOnMouseDown = function (key) {
        return false;
    };
    MouseHandlerDefaultReadOnlyState.prototype.canClearSelectionOnMouseDown = function () {
        return false;
    };
    MouseHandlerDefaultReadOnlyState.prototype.canSelectOnMouseUp = function (key) {
        return true;
    };
    MouseHandlerDefaultReadOnlyState.prototype.canClearSelectionOnMouseUp = function () {
        return true;
    };
    MouseHandlerDefaultReadOnlyState.prototype.updateConnectionsOnMouseMove = function (evt) {
    };
    return MouseHandlerDefaultReadOnlyState;
}(MouseHandlerDefaultStateBase_1.MouseHandlerDefaultStateBase));
exports.MouseHandlerDefaultReadOnlyState = MouseHandlerDefaultReadOnlyState;
//# sourceMappingURL=MouseHandlerDefaultReadOnlyState.js.map