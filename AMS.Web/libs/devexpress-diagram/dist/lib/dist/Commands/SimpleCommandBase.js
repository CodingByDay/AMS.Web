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
exports.SimpleCommandBase = void 0;
var CommandBase_1 = require("./CommandBase");
var CommandStates_1 = require("./CommandStates");
var ModelUtils_1 = require("../Model/ModelUtils");
var LocalizationService_1 = require("../LocalizationService");
var SimpleCommandBase = (function (_super) {
    __extends(SimpleCommandBase, _super);
    function SimpleCommandBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SimpleCommandBase.prototype.getState = function () {
        return new CommandStates_1.SimpleCommandState(this.isEnabled(), this.getValue(), this.getDefaultValue(), this.getItems(), this.isVisible());
    };
    SimpleCommandBase.prototype.isVisible = function () {
        return true;
    };
    SimpleCommandBase.prototype.isEnabled = function () {
        return !this.control.settings.readOnly || this.isEnabledInReadOnlyMode();
    };
    SimpleCommandBase.prototype.isEnabledInReadOnlyMode = function () {
        return false;
    };
    SimpleCommandBase.prototype.getValue = function () {
        return undefined;
    };
    SimpleCommandBase.prototype.getDefaultValue = function () {
        return undefined;
    };
    SimpleCommandBase.prototype.getItems = function () {
        return undefined;
    };
    SimpleCommandBase.prototype.getModelUnit = function (value) {
        return ModelUtils_1.ModelUtils.getlUnitValue(this.control.model.units, value);
    };
    SimpleCommandBase.prototype.getModelUnitText = function (value) {
        return ModelUtils_1.ModelUtils.getUnitText(this.control.model.units, LocalizationService_1.DiagramLocalizationService.unitItems, LocalizationService_1.DiagramLocalizationService.formatUnit, value);
    };
    SimpleCommandBase.prototype.getModelUnitTwipsValue = function (value) {
        return ModelUtils_1.ModelUtils.getTwipsValue(this.control.model.units, value);
    };
    SimpleCommandBase.prototype.getViewUnit = function (value) {
        return ModelUtils_1.ModelUtils.getlUnitValue(this.control.settings.viewUnits, value);
    };
    SimpleCommandBase.prototype.getViewUnitText = function (value) {
        return ModelUtils_1.ModelUtils.getUnitText(this.control.settings.viewUnits, LocalizationService_1.DiagramLocalizationService.unitItems, LocalizationService_1.DiagramLocalizationService.formatUnit, value);
    };
    SimpleCommandBase.prototype.getViewUnitTwipsValue = function (value) {
        return ModelUtils_1.ModelUtils.getTwipsValue(this.control.settings.viewUnits, value);
    };
    return SimpleCommandBase;
}(CommandBase_1.CommandBase));
exports.SimpleCommandBase = SimpleCommandBase;
//# sourceMappingURL=SimpleCommandBase.js.map