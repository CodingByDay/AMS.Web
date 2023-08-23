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
exports.ChangeConnectorPropertyCommand = void 0;
var ChangeConnectorPropertyHistoryItem_1 = require("../../History/Properties/ChangeConnectorPropertyHistoryItem");
var SimpleCommandBase_1 = require("../SimpleCommandBase");
var ChangeConnectorPropertyCommand = (function (_super) {
    __extends(ChangeConnectorPropertyCommand, _super);
    function ChangeConnectorPropertyCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangeConnectorPropertyCommand.prototype.getValue = function () {
        return this.control.selection.inputPosition.getCurrentConnectorPropertyValue(this.getPropertyName());
    };
    ChangeConnectorPropertyCommand.prototype.getDefaultValue = function () {
        return this.getPropertyDefaultValue();
    };
    ChangeConnectorPropertyCommand.prototype.executeCore = function (state, parameter) {
        var _this = this;
        this.control.history.beginTransaction();
        var connectors = this.control.selection.getSelectedConnectors();
        connectors.forEach(function (connector) {
            var propertyName = _this.getPropertyName();
            _this.control.history.addAndRedo(new ChangeConnectorPropertyHistoryItem_1.ChangeConnectorPropertyHistoryItem(connector.key, propertyName, parameter));
        });
        this.control.selection.inputPosition.setConnectorPropertyValue(this.getPropertyName(), parameter);
        this.control.history.endTransaction();
        return true;
    };
    ChangeConnectorPropertyCommand.prototype.lockInputPositionUpdating = function () {
        return true;
    };
    ChangeConnectorPropertyCommand.prototype.isEnabled = function () {
        var connectors = this.control.selection.getSelectedConnectors();
        return _super.prototype.isEnabled.call(this) && connectors.length > 0;
    };
    return ChangeConnectorPropertyCommand;
}(SimpleCommandBase_1.SimpleCommandBase));
exports.ChangeConnectorPropertyCommand = ChangeConnectorPropertyCommand;
//# sourceMappingURL=ChangeConnectorPropertyCommand.js.map