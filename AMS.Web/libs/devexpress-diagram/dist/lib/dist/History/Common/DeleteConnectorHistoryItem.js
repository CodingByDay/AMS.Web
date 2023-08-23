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
exports.DeleteConnectorHistoryItem = void 0;
var HistoryItem_1 = require("../HistoryItem");
var DeleteConnectorHistoryItem = (function (_super) {
    __extends(DeleteConnectorHistoryItem, _super);
    function DeleteConnectorHistoryItem(connectorKey) {
        var _this = _super.call(this) || this;
        _this.connectorKey = connectorKey;
        return _this;
    }
    DeleteConnectorHistoryItem.prototype.redo = function (manipulator) {
        var connector = manipulator.model.findConnector(this.connectorKey);
        this.connector = connector.clone();
        manipulator.deleteConnector(connector);
    };
    DeleteConnectorHistoryItem.prototype.undo = function (manipulator) {
        manipulator.addConnector(this.connector, this.connector.key);
    };
    return DeleteConnectorHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.DeleteConnectorHistoryItem = DeleteConnectorHistoryItem;
//# sourceMappingURL=DeleteConnectorHistoryItem.js.map