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
exports.ChangeConnectorRoutingModeCommand = void 0;
var SimpleCommandBase_1 = require("../SimpleCommandBase");
var Settings_1 = require("../../Settings");
var ChangeConnectorRoutingModeCommand = (function (_super) {
    __extends(ChangeConnectorRoutingModeCommand, _super);
    function ChangeConnectorRoutingModeCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangeConnectorRoutingModeCommand.prototype.getValue = function () {
        return this.control.settings.connectorRoutingMode;
    };
    ChangeConnectorRoutingModeCommand.prototype.executeCore = function (state, parameter) {
        var mode = parameter !== undefined ? parameter : Settings_1.ConnectorRoutingMode.None;
        this.control.settings.connectorRoutingMode = mode;
        return true;
    };
    return ChangeConnectorRoutingModeCommand;
}(SimpleCommandBase_1.SimpleCommandBase));
exports.ChangeConnectorRoutingModeCommand = ChangeConnectorRoutingModeCommand;
//# sourceMappingURL=ChangeConnectorRoutingModeCommand.js.map