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
exports.ChangeConnectorEndLineEndingCommand = exports.ChangeConnectorStartLineEndingCommand = void 0;
var ChangeConnectorPropertyCommand_1 = require("./ChangeConnectorPropertyCommand");
var ConnectorProperties_1 = require("../../Model/Connectors/ConnectorProperties");
var ChangeConnectorStartLineEndingCommand = (function (_super) {
    __extends(ChangeConnectorStartLineEndingCommand, _super);
    function ChangeConnectorStartLineEndingCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangeConnectorStartLineEndingCommand.prototype.getPropertyName = function () {
        return "startLineEnding";
    };
    ChangeConnectorStartLineEndingCommand.prototype.getPropertyDefaultValue = function () {
        return ConnectorProperties_1.ConnectorLineEnding.None;
    };
    return ChangeConnectorStartLineEndingCommand;
}(ChangeConnectorPropertyCommand_1.ChangeConnectorPropertyCommand));
exports.ChangeConnectorStartLineEndingCommand = ChangeConnectorStartLineEndingCommand;
var ChangeConnectorEndLineEndingCommand = (function (_super) {
    __extends(ChangeConnectorEndLineEndingCommand, _super);
    function ChangeConnectorEndLineEndingCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangeConnectorEndLineEndingCommand.prototype.getPropertyName = function () {
        return "endLineEnding";
    };
    ChangeConnectorEndLineEndingCommand.prototype.getPropertyDefaultValue = function () {
        return ConnectorProperties_1.ConnectorLineEnding.Arrow;
    };
    return ChangeConnectorEndLineEndingCommand;
}(ChangeConnectorPropertyCommand_1.ChangeConnectorPropertyCommand));
exports.ChangeConnectorEndLineEndingCommand = ChangeConnectorEndLineEndingCommand;
//# sourceMappingURL=ChangeConnectorLineEndingCommand.js.map