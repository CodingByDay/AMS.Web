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
exports.MouseHandlerMoveConnectorState = void 0;
var ModelUtils_1 = require("../../Model/ModelUtils");
var MouseHandlerDragDiagramItemStateBase_1 = require("./MouseHandlerDragDiagramItemStateBase");
var MouseHandlerMoveConnectorState = (function (_super) {
    __extends(MouseHandlerMoveConnectorState, _super);
    function MouseHandlerMoveConnectorState(handler, history, model, selection, visualizerManager) {
        var _this = _super.call(this, handler, history, model, selection, visualizerManager) || this;
        _this.model = model;
        _this.selection = selection;
        _this.visualizerManager = visualizerManager;
        return _this;
    }
    Object.defineProperty(MouseHandlerMoveConnectorState.prototype, "areValidDraggingShapes", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MouseHandlerMoveConnectorState.prototype, "areValidDraggingConnectors", {
        get: function () {
            var _this = this;
            if (this.shouldClone)
                return this.draggingShapes.length > 0 || this.draggingConnectors.length > 0;
            if (!this.draggingConnectors.length)
                return false;
            if (!this.draggingShapes.length)
                return !this.draggingConnectors.some(function (x) { return !ModelUtils_1.ModelUtils.canMoveConnector(_this.selectedItems, x.connector); });
            return ModelUtils_1.ModelUtils.canMoveConnector(this.selectedItems, this.draggingConnectors[this.draggingConnectorsIndexByKey[this.handler.mouseDownEvent.source.key]].connector);
        },
        enumerable: false,
        configurable: true
    });
    return MouseHandlerMoveConnectorState;
}(MouseHandlerDragDiagramItemStateBase_1.MouseHandlerDragDiagramItemStateBase));
exports.MouseHandlerMoveConnectorState = MouseHandlerMoveConnectorState;
//# sourceMappingURL=MouseHandlerMoveConnectorState.js.map