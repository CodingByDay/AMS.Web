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
exports.ChangeConnectorTextHistoryItem = void 0;
var HistoryItem_1 = require("../HistoryItem");
var ChangeConnectorTextHistoryItem = (function (_super) {
    __extends(ChangeConnectorTextHistoryItem, _super);
    function ChangeConnectorTextHistoryItem(connector, position, text) {
        var _this = _super.call(this) || this;
        _this.connectorKey = connector.key;
        _this.text = text;
        _this.position = position;
        return _this;
    }
    ChangeConnectorTextHistoryItem.prototype.redo = function (manipulator) {
        var connector = manipulator.model.findConnector(this.connectorKey);
        this.oldText = connector.getText(this.position);
        manipulator.changeConnectorText(connector, this.text, this.position);
    };
    ChangeConnectorTextHistoryItem.prototype.undo = function (manipulator) {
        var connector = manipulator.model.findConnector(this.connectorKey);
        manipulator.changeConnectorText(connector, this.oldText, this.position);
    };
    return ChangeConnectorTextHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.ChangeConnectorTextHistoryItem = ChangeConnectorTextHistoryItem;
//# sourceMappingURL=ChangeConnectorTextHistoryItem.js.map