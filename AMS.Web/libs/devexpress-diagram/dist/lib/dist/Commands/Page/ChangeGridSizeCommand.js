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
exports.ChangeGridSizeItemsCommand = exports.ChangeGridSizeCommand = void 0;
var SimpleCommandBase_1 = require("../SimpleCommandBase");
var ChangeGridSizeCommand = (function (_super) {
    __extends(ChangeGridSizeCommand, _super);
    function ChangeGridSizeCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangeGridSizeCommand.prototype.isEnabledInReadOnlyMode = function () {
        return true;
    };
    ChangeGridSizeCommand.prototype.getValue = function () {
        return this.getModelUnit(this.control.settings.gridSize);
    };
    ChangeGridSizeCommand.prototype.executeCore = function (state, parameter) {
        this.control.settings.gridSize = this.getModelUnitTwipsValue(parameter);
        return true;
    };
    ChangeGridSizeCommand.prototype.getItems = function () {
        var _this = this;
        return this.control.settings.gridSizeItems.map(function (s) {
            return { value: _this.getModelUnit(s), text: _this.getViewUnitText(s) };
        });
    };
    return ChangeGridSizeCommand;
}(SimpleCommandBase_1.SimpleCommandBase));
exports.ChangeGridSizeCommand = ChangeGridSizeCommand;
var ChangeGridSizeItemsCommand = (function (_super) {
    __extends(ChangeGridSizeItemsCommand, _super);
    function ChangeGridSizeItemsCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangeGridSizeItemsCommand.prototype.isEnabledInReadOnlyMode = function () {
        return true;
    };
    ChangeGridSizeItemsCommand.prototype.getValue = function () {
        var _this = this;
        return this.control.settings.gridSizeItems.map(function (s) { return _this.getModelUnit(s); });
    };
    ChangeGridSizeItemsCommand.prototype.executeCore = function (state, parameter) {
        var _this = this;
        this.control.settings.gridSizeItems = parameter.map(function (s) { return _this.getModelUnitTwipsValue(s); });
        return true;
    };
    return ChangeGridSizeItemsCommand;
}(SimpleCommandBase_1.SimpleCommandBase));
exports.ChangeGridSizeItemsCommand = ChangeGridSizeItemsCommand;
//# sourceMappingURL=ChangeGridSizeCommand.js.map