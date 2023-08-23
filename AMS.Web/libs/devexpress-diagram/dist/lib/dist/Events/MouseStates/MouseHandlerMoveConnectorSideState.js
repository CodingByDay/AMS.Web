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
exports.MouseHandlerMoveConnectorSideState = void 0;
var MouseHandlerDraggingState_1 = require("./MouseHandlerDraggingState");
var ModelUtils_1 = require("../../Model/ModelUtils");
var MouseHandlerMoveConnectorSideState = (function (_super) {
    __extends(MouseHandlerMoveConnectorSideState, _super);
    function MouseHandlerMoveConnectorSideState(handler, history, model) {
        var _this = _super.call(this, handler, history) || this;
        _this.model = model;
        return _this;
    }
    MouseHandlerMoveConnectorSideState.prototype.onMouseDown = function (evt) {
        this.startPoint = evt.modelPoint;
        this.connectorKey = evt.source.key;
        this.pointIndex = parseInt(evt.source.value) + 1;
        _super.prototype.onMouseDown.call(this, evt);
    };
    MouseHandlerMoveConnectorSideState.prototype.onApplyChanges = function (evt) {
        var point = this.getSnappedPoint(evt, evt.modelPoint);
        var connector = this.model.findConnector(this.connectorKey);
        if (!this.pointCreated) {
            this.handler.addInteractingItem(connector);
            ModelUtils_1.ModelUtils.addConnectorPoint(this.history, this.connectorKey, this.pointIndex, point.clone());
            this.pointCreated = true;
        }
        else
            ModelUtils_1.ModelUtils.moveConnectorPoint(this.history, connector, this.pointIndex, point);
        this.handler.tryUpdateModelSize();
    };
    MouseHandlerMoveConnectorSideState.prototype.onFinishWithChanges = function () {
        var connector = this.model.findConnector(this.connectorKey);
        ModelUtils_1.ModelUtils.deleteConnectorUnnecessaryPoints(this.history, connector);
        ModelUtils_1.ModelUtils.fixConnectorBeginEndConnectionIndex(this.history, connector);
        this.handler.tryUpdateModelSize();
    };
    MouseHandlerMoveConnectorSideState.prototype.getDraggingElementKeys = function () {
        return [this.connectorKey];
    };
    return MouseHandlerMoveConnectorSideState;
}(MouseHandlerDraggingState_1.MouseHandlerDraggingState));
exports.MouseHandlerMoveConnectorSideState = MouseHandlerMoveConnectorSideState;
//# sourceMappingURL=MouseHandlerMoveConnectorSideState.js.map