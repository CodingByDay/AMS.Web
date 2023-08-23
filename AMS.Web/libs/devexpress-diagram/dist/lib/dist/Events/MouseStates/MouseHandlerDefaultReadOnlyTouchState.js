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
exports.MouseHandlerDefaultReadOnlyTouchState = void 0;
var MouseHandlerDefaultReadOnlyState_1 = require("./MouseHandlerDefaultReadOnlyState");
var MouseHandlerDefaultReadOnlyTouchState = (function (_super) {
    __extends(MouseHandlerDefaultReadOnlyTouchState, _super);
    function MouseHandlerDefaultReadOnlyTouchState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MouseHandlerDefaultReadOnlyTouchState.prototype.canDragObjectOnMouseDown = function (key) {
        return false;
    };
    MouseHandlerDefaultReadOnlyTouchState.prototype.canExpandContainerOnMouseDown = function (key) {
        return false;
    };
    MouseHandlerDefaultReadOnlyTouchState.prototype.canClearSelectionOnMouseDown = function () {
        return true;
    };
    MouseHandlerDefaultReadOnlyTouchState.prototype.canSelectOnMouseUp = function (key) {
        return !this.inSelection(key);
    };
    MouseHandlerDefaultReadOnlyTouchState.prototype.canClearSelectionOnMouseUp = function () {
        return false;
    };
    return MouseHandlerDefaultReadOnlyTouchState;
}(MouseHandlerDefaultReadOnlyState_1.MouseHandlerDefaultReadOnlyState));
exports.MouseHandlerDefaultReadOnlyTouchState = MouseHandlerDefaultReadOnlyTouchState;
//# sourceMappingURL=MouseHandlerDefaultReadOnlyTouchState.js.map