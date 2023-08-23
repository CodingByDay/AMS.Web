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
exports.SetConnectionPointIndexHistoryItem = exports.AddConnectionHistoryItem = void 0;
var HistoryItem_1 = require("../HistoryItem");
var Connector_1 = require("../../Model/Connectors/Connector");
var AddConnectionHistoryItem = (function (_super) {
    __extends(AddConnectionHistoryItem, _super);
    function AddConnectionHistoryItem(connector, item, connectionPointIndex, position) {
        var _this = _super.call(this) || this;
        _this.connectorKey = connector.key;
        _this.itemKey = item.key;
        _this.connectionPointIndex = connectionPointIndex;
        _this.position = position;
        return _this;
    }
    AddConnectionHistoryItem.prototype.redo = function (manipulator) {
        var connector = manipulator.model.findConnector(this.connectorKey);
        var item = manipulator.model.findItem(this.itemKey);
        manipulator.addConnection(connector, item, this.connectionPointIndex, this.position);
    };
    AddConnectionHistoryItem.prototype.undo = function (manipulator) {
        var connector = manipulator.model.findConnector(this.connectorKey);
        manipulator.deleteConnection(connector, this.position);
    };
    return AddConnectionHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.AddConnectionHistoryItem = AddConnectionHistoryItem;
var SetConnectionPointIndexHistoryItem = (function (_super) {
    __extends(SetConnectionPointIndexHistoryItem, _super);
    function SetConnectionPointIndexHistoryItem(connector, connectionPointIndex, position) {
        var _this = _super.call(this) || this;
        _this.connectorKey = connector.key;
        _this.connectionPointIndex = connectionPointIndex;
        _this.position = position;
        return _this;
    }
    SetConnectionPointIndexHistoryItem.prototype.redo = function (manipulator) {
        var connector = manipulator.model.findConnector(this.connectorKey);
        this.oldConnectionPointIndex = this.position === Connector_1.ConnectorPosition.Begin ? connector.beginConnectionPointIndex : connector.endConnectionPointIndex;
        manipulator.setConnectionPointIndex(connector, this.connectionPointIndex, this.position);
    };
    SetConnectionPointIndexHistoryItem.prototype.undo = function (manipulator) {
        var connector = manipulator.model.findConnector(this.connectorKey);
        manipulator.setConnectionPointIndex(connector, this.oldConnectionPointIndex, this.position);
    };
    return SetConnectionPointIndexHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.SetConnectionPointIndexHistoryItem = SetConnectionPointIndexHistoryItem;
//# sourceMappingURL=AddConnectionHistoryItem.js.map