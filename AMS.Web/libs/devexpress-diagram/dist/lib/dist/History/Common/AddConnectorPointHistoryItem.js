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
exports.AddConnectorPointHistoryItem = void 0;
var HistoryItem_1 = require("../HistoryItem");
var AddConnectorPointHistoryItem = (function (_super) {
    __extends(AddConnectorPointHistoryItem, _super);
    function AddConnectorPointHistoryItem(connectorKey, pointIndex, point) {
        var _this = _super.call(this) || this;
        _this.connectorKey = connectorKey;
        _this.pointIndex = pointIndex;
        _this.point = point;
        return _this;
    }
    AddConnectorPointHistoryItem.prototype.redo = function (manipulator) {
        var _this = this;
        var connector = manipulator.model.findConnector(this.connectorKey);
        this.renderContext = connector.tryCreateRenderPointsContext();
        manipulator.addDeleteConnectorPoint(connector, function (connector) {
            connector.addPoint(_this.pointIndex, _this.point);
            connector.onAddPoint(_this.pointIndex, _this.point);
        });
    };
    AddConnectorPointHistoryItem.prototype.undo = function (manipulator) {
        var _this = this;
        var connector = manipulator.model.findConnector(this.connectorKey);
        manipulator.addDeleteConnectorPoint(connector, function (connector) {
            connector.deletePoint(_this.pointIndex);
            connector.replaceRenderPoints(_this.renderContext);
        });
    };
    return AddConnectorPointHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.AddConnectorPointHistoryItem = AddConnectorPointHistoryItem;
//# sourceMappingURL=AddConnectorPointHistoryItem.js.map