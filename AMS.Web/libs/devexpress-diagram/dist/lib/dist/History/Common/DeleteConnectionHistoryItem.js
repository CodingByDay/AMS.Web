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
exports.DeleteConnectionHistoryItem = void 0;
var HistoryItem_1 = require("../HistoryItem");
var Connector_1 = require("../../Model/Connectors/Connector");
var DeleteConnectionHistoryItem = (function (_super) {
    __extends(DeleteConnectionHistoryItem, _super);
    function DeleteConnectionHistoryItem(connector, position) {
        var _this = _super.call(this) || this;
        _this.connectorKey = connector.key;
        _this.position = position;
        _this.itemKey = connector.getExtremeItem(_this.position).key;
        return _this;
    }
    DeleteConnectionHistoryItem.prototype.redo = function (manipulator) {
        var connector = manipulator.model.findConnector(this.connectorKey);
        this.oldConnectionPointIndex = this.position === Connector_1.ConnectorPosition.Begin ? connector.beginConnectionPointIndex : connector.endConnectionPointIndex;
        manipulator.deleteConnection(connector, this.position);
    };
    DeleteConnectionHistoryItem.prototype.undo = function (manipulator) {
        var connector = manipulator.model.findConnector(this.connectorKey);
        var item = manipulator.model.findItem(this.itemKey);
        manipulator.addConnection(connector, item, this.oldConnectionPointIndex, this.position);
    };
    return DeleteConnectionHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.DeleteConnectionHistoryItem = DeleteConnectionHistoryItem;
//# sourceMappingURL=DeleteConnectionHistoryItem.js.map