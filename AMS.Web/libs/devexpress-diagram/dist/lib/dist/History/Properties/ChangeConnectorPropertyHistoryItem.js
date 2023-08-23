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
exports.ChangeConnectorPropertyHistoryItem = void 0;
var HistoryItem_1 = require("../HistoryItem");
var ChangeConnectorPropertyHistoryItem = (function (_super) {
    __extends(ChangeConnectorPropertyHistoryItem, _super);
    function ChangeConnectorPropertyHistoryItem(connectorKey, propertyName, value) {
        var _this = _super.call(this) || this;
        _this.connectorKey = connectorKey;
        _this.propertyName = propertyName;
        _this.value = value;
        return _this;
    }
    ChangeConnectorPropertyHistoryItem.prototype.redo = function (manipulator) {
        var connector = manipulator.model.findConnector(this.connectorKey);
        this.oldValue = connector.properties[this.propertyName];
        manipulator.changeConnectorProperty(connector, this.propertyName, this.value);
    };
    ChangeConnectorPropertyHistoryItem.prototype.undo = function (manipulator) {
        var connector = manipulator.model.findConnector(this.connectorKey);
        manipulator.changeConnectorProperty(connector, this.propertyName, this.oldValue);
    };
    return ChangeConnectorPropertyHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.ChangeConnectorPropertyHistoryItem = ChangeConnectorPropertyHistoryItem;
//# sourceMappingURL=ChangeConnectorPropertyHistoryItem.js.map