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
exports.MouseHandlerToggleShapeExpandedState = void 0;
var MouseHandlerStateBase_1 = require("./MouseHandlerStateBase");
var ToggleShapeExpandedHistoryItem_1 = require("../../History/Properties/ToggleShapeExpandedHistoryItem");
var ModelUtils_1 = require("../../Model/ModelUtils");
var MouseHandlerToggleShapeExpandedState = (function (_super) {
    __extends(MouseHandlerToggleShapeExpandedState, _super);
    function MouseHandlerToggleShapeExpandedState(handler, history, model, selection) {
        var _this = _super.call(this, handler) || this;
        _this.history = history;
        _this.model = model;
        _this.selection = selection;
        return _this;
    }
    MouseHandlerToggleShapeExpandedState.prototype.onMouseUp = function (evt) {
        var shape = this.model.findShape(evt.source.key);
        if (shape && !shape.isLocked) {
            this.history.beginTransaction();
            this.history.addAndRedo(new ToggleShapeExpandedHistoryItem_1.ToggleShapeExpandedHistoryItem(shape));
            ModelUtils_1.ModelUtils.updateShapeAttachedConnectors(this.history, this.model, shape);
            ModelUtils_1.ModelUtils.updateContainerConnectorsAttachedPoints(this.history, this.model, shape);
            ModelUtils_1.ModelUtils.updateSelection(this.history, this.selection);
            this.handler.tryUpdateModelSize();
            this.history.endTransaction();
            this.handler.raiseClick([shape.key]);
        }
        this.handler.switchToDefaultState();
    };
    return MouseHandlerToggleShapeExpandedState;
}(MouseHandlerStateBase_1.MouseHandlerStateBase));
exports.MouseHandlerToggleShapeExpandedState = MouseHandlerToggleShapeExpandedState;
//# sourceMappingURL=MouseHandlerToggleShapeExpandedState.js.map