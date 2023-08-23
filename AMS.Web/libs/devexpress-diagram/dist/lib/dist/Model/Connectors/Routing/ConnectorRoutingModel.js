"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectorRoutingModel = exports.ConnectorRoutingPenaltyDescription = void 0;
var Settings_1 = require("../../../Settings");
var Shape_1 = require("../../Shapes/Shape");
var Connector_1 = require("../Connector");
var ConnectorProperties_1 = require("../ConnectorProperties");
var RightAngleConnectorRoutingStrategy_1 = require("./Strategy/RightAngleConnectorRoutingStrategy");
var ConnectorRoutingPenaltyDescription = (function () {
    function ConnectorRoutingPenaltyDescription() {
        this.shape = 20.0;
        this.margin = 2.0;
        this.turnBack = 20.0;
        this.turnLeft = 3.1;
        this.turnRight = 3.0;
    }
    return ConnectorRoutingPenaltyDescription;
}());
exports.ConnectorRoutingPenaltyDescription = ConnectorRoutingPenaltyDescription;
var ConnectorRoutingModel = (function () {
    function ConnectorRoutingModel() {
        this.connectorRoutingMode = Settings_1.ConnectorRoutingMode.AllShapesOnly;
        this.shapeMargins = Connector_1.Connector.minOffset;
        this.shouldReverseConnections = true;
        this.shouldResizeConnections = true;
        this.penaltyDescription = new ConnectorRoutingPenaltyDescription();
    }
    ConnectorRoutingModel.prototype.initialize = function (model) {
        this.model = model;
    };
    ConnectorRoutingModel.prototype.createStrategy = function (option) {
        if (this.model !== undefined && this.connectorRoutingMode !== Settings_1.ConnectorRoutingMode.None && option === ConnectorProperties_1.ConnectorLineOption.Orthogonal)
            return new RightAngleConnectorRoutingStrategy_1.RightAngleConnectorRoutingStrategy(this);
        return undefined;
    };
    ConnectorRoutingModel.prototype.getItems = function (beginConnectorShape, endConnectorShape) {
        return this.getShapes(beginConnectorShape, endConnectorShape);
    };
    ConnectorRoutingModel.prototype.notifyConnectorRoutingModeChanged = function (connectorRoutingMode) {
        this.connectorRoutingMode = connectorRoutingMode;
    };
    ConnectorRoutingModel.prototype.getShapes = function (beginConnectorShape, endConnectorShape) {
        if (this.model === undefined || this.connectorRoutingMode === undefined || this.connectorRoutingMode === Settings_1.ConnectorRoutingMode.None)
            return [];
        if (this.connectorRoutingMode === Settings_1.ConnectorRoutingMode.AllShapesOnly)
            return this.model.items.filter(function (i) { return i instanceof Shape_1.Shape; });
        return this.getConnectorShapes(beginConnectorShape, endConnectorShape);
    };
    ConnectorRoutingModel.prototype.getConnectorShapes = function (beginConnectorShape, endConnectorShape) {
        var result = [];
        if (beginConnectorShape)
            result.push(beginConnectorShape);
        if (endConnectorShape && beginConnectorShape !== endConnectorShape)
            result.push(endConnectorShape);
        return result;
    };
    return ConnectorRoutingModel;
}());
exports.ConnectorRoutingModel = ConnectorRoutingModel;
//# sourceMappingURL=ConnectorRoutingModel.js.map