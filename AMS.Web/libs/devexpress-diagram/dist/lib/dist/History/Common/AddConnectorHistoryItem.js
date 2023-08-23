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
exports.AddConnectorHistoryItem = void 0;
var HistoryItem_1 = require("../HistoryItem");
var Connector_1 = require("../../Model/Connectors/Connector");
var AddConnectorHistoryItem = (function (_super) {
    __extends(AddConnectorHistoryItem, _super);
    function AddConnectorHistoryItem(points, dataKey, renderPointsContext) {
        var _this = _super.call(this) || this;
        _this.points = points;
        _this.dataKey = dataKey;
        _this.renderPointsContext = renderPointsContext;
        return _this;
    }
    AddConnectorHistoryItem.prototype.redo = function (manipulator) {
        var connector = new Connector_1.Connector(this.points);
        if (this.dataKey !== undefined)
            connector.dataKey = this.dataKey;
        if (this.renderPointsContext !== undefined)
            connector.replaceRenderPoints(this.renderPointsContext);
        manipulator.addConnector(connector, this.connectorKey);
        this.connectorKey = connector.key;
    };
    AddConnectorHistoryItem.prototype.undo = function (manipulator) {
        var connector = manipulator.model.findConnector(this.connectorKey);
        manipulator.deleteConnector(connector);
    };
    return AddConnectorHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.AddConnectorHistoryItem = AddConnectorHistoryItem;
//# sourceMappingURL=AddConnectorHistoryItem.js.map