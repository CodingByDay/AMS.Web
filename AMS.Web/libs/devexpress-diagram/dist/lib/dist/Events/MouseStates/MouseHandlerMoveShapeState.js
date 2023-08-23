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
exports.MouseHandlerMoveShapeState = void 0;
var MouseHandlerDragDiagramItemStateBase_1 = require("./MouseHandlerDragDiagramItemStateBase");
var MouseHandlerMoveShapeState = (function (_super) {
    __extends(MouseHandlerMoveShapeState, _super);
    function MouseHandlerMoveShapeState(handler, history, model, selection, visualizerManager) {
        var _this = _super.call(this, handler, history, model, selection, visualizerManager) || this;
        _this.model = model;
        _this.selection = selection;
        _this.visualizerManager = visualizerManager;
        return _this;
    }
    Object.defineProperty(MouseHandlerMoveShapeState.prototype, "areValidDraggingShapes", {
        get: function () {
            return this.shouldClone || this.draggingShapes.length > 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MouseHandlerMoveShapeState.prototype, "areValidDraggingConnectors", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    return MouseHandlerMoveShapeState;
}(MouseHandlerDragDiagramItemStateBase_1.MouseHandlerDragDiagramItemStateBase));
exports.MouseHandlerMoveShapeState = MouseHandlerMoveShapeState;
//# sourceMappingURL=MouseHandlerMoveShapeState.js.map