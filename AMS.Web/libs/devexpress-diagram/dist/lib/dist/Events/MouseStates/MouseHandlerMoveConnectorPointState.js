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
exports.MouseHandlerMoveConnectorPointState = void 0;
var point_1 = require("@devexpress/utils/lib/geometry/point");
var MouseHandlerMoveConnectorPointStateBase_1 = require("./MouseHandlerMoveConnectorPointStateBase");
var Connector_1 = require("../../Model/Connectors/Connector");
var ModelUtils_1 = require("../../Model/ModelUtils");
var ConnectorProperties_1 = require("../../Model/Connectors/ConnectorProperties");
var MouseHandlerMoveConnectorPointState = (function (_super) {
    __extends(MouseHandlerMoveConnectorPointState, _super);
    function MouseHandlerMoveConnectorPointState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MouseHandlerMoveConnectorPointState.prototype.onMouseDown = function (evt) {
        this.connector = this.model.findConnector(evt.source.key);
        this.pointIndex = parseInt(evt.source.value);
        if (this.pointIndex === 0)
            this.pointPosition = Connector_1.ConnectorPosition.Begin;
        else if (this.pointIndex === this.connector.points.length - 1)
            this.pointPosition = Connector_1.ConnectorPosition.End;
        this.handler.addInteractingItem(this.connector);
        _super.prototype.onMouseDown.call(this, evt);
    };
    MouseHandlerMoveConnectorPointState.prototype.onApplyChanges = function (evt) {
        if (this.connector.properties.lineOption !== ConnectorProperties_1.ConnectorLineOption.Orthogonal ||
            this.pointIndex === 0 || this.pointIndex === this.connector.points.length - 1)
            _super.prototype.onApplyChanges.call(this, evt);
    };
    MouseHandlerMoveConnectorPointState.prototype.onFinishWithChanges = function () {
        _super.prototype.onFinishWithChanges.call(this);
        ModelUtils_1.ModelUtils.deleteConnectorUnnecessaryPoints(this.history, this.connector);
        this.handler.tryUpdateModelSize();
    };
    MouseHandlerMoveConnectorPointState.prototype.getSnappedPoint = function (evt, point) {
        var points = this.connector.points;
        var index = this.pointIndex;
        if (0 < index && index < points.length - 1) {
            var tg = (points[index + 1].y - points[index - 1].y) / (points[index + 1].x - points[index - 1].x);
            var x = point.x;
            var y = points[index + 1].y - (points[index + 1].x - x) * tg;
            return this.handler.getSnappedPointOnDragPoint(evt, point, new point_1.Point(x, y));
        }
        return this.handler.getSnappedPointOnDragPoint(evt, point);
    };
    return MouseHandlerMoveConnectorPointState;
}(MouseHandlerMoveConnectorPointStateBase_1.MouseHandlerMoveConnectorPointStateBase));
exports.MouseHandlerMoveConnectorPointState = MouseHandlerMoveConnectorPointState;
//# sourceMappingURL=MouseHandlerMoveConnectorPointState.js.map