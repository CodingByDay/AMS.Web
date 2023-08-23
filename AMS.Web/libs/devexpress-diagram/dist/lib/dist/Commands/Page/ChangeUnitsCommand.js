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
exports.ChangeViewUnitsCommand = exports.ChangeUnitsCommand = void 0;
var ChangePagePropertyCommand_1 = require("./ChangePagePropertyCommand");
var ChangeUnitsHistoryItem_1 = require("../../History/Page/ChangeUnitsHistoryItem");
var SimpleCommandBase_1 = require("../SimpleCommandBase");
var LocalizationService_1 = require("../../LocalizationService");
var ChangeUnitsCommand = (function (_super) {
    __extends(ChangeUnitsCommand, _super);
    function ChangeUnitsCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangeUnitsCommand.prototype.isEnabledInReadOnlyMode = function () {
        return true;
    };
    ChangeUnitsCommand.prototype.getValue = function () {
        return this.control.model.units;
    };
    ChangeUnitsCommand.prototype.createHistoryItems = function (parameter) {
        return [new ChangeUnitsHistoryItem_1.ChangeUnitsHistoryItem(parameter)];
    };
    ChangeUnitsCommand.prototype.getItems = function () {
        return Object.keys(LocalizationService_1.DiagramLocalizationService.unitItems).map(function (key) {
            return { value: parseInt(key), text: LocalizationService_1.DiagramLocalizationService.unitItems[key] };
        });
    };
    return ChangeUnitsCommand;
}(ChangePagePropertyCommand_1.ChangePagePropertyCommand));
exports.ChangeUnitsCommand = ChangeUnitsCommand;
var ChangeViewUnitsCommand = (function (_super) {
    __extends(ChangeViewUnitsCommand, _super);
    function ChangeViewUnitsCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangeViewUnitsCommand.prototype.isEnabledInReadOnlyMode = function () {
        return true;
    };
    ChangeViewUnitsCommand.prototype.getValue = function () {
        return this.control.settings.viewUnits;
    };
    ChangeViewUnitsCommand.prototype.executeCore = function (state, parameter) {
        this.control.settings.viewUnits = parameter;
        return true;
    };
    ChangeViewUnitsCommand.prototype.getItems = function () {
        return Object.keys(LocalizationService_1.DiagramLocalizationService.unitItems).map(function (key) {
            return { value: parseInt(key), text: LocalizationService_1.DiagramLocalizationService.unitItems[key] };
        });
    };
    return ChangeViewUnitsCommand;
}(SimpleCommandBase_1.SimpleCommandBase));
exports.ChangeViewUnitsCommand = ChangeViewUnitsCommand;
//# sourceMappingURL=ChangeUnitsCommand.js.map