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
exports.ChangePageSizeItemsCommand = exports.ChangePageSizeCommand = void 0;
var ChangePagePropertyCommand_1 = require("./ChangePagePropertyCommand");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var ChangePageSizeHistoryItem_1 = require("../../History/Page/ChangePageSizeHistoryItem");
var SimpleCommandBase_1 = require("../SimpleCommandBase");
var ChangePageSizeCommand = (function (_super) {
    __extends(ChangePageSizeCommand, _super);
    function ChangePageSizeCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangePageSizeCommand.prototype.getValue = function () {
        return this.getModelUnitSize(this.control.model.pageSize);
    };
    ChangePageSizeCommand.prototype.createHistoryItems = function (parameter) {
        return [new ChangePageSizeHistoryItem_1.ChangePageSizeHistoryItem(new size_1.Size(this.getModelUnitTwipsValue(parameter.width), this.getModelUnitTwipsValue(parameter.height)))];
    };
    ChangePageSizeCommand.prototype.getItems = function () {
        var _this = this;
        return this.control.settings.pageSizeItems.map(function (i) {
            return {
                value: _this.getModelUnitSize(i.size),
                text: i.text.replace("{width}", _this.getViewUnitText(i.size.width)).replace("{height}", _this.getViewUnitText(i.size.height))
            };
        });
    };
    ChangePageSizeCommand.prototype.getModelUnitSize = function (size) {
        return new size_1.Size(this.getModelUnit(size.width), this.getModelUnit(size.height));
    };
    return ChangePageSizeCommand;
}(ChangePagePropertyCommand_1.ChangePagePropertyCommand));
exports.ChangePageSizeCommand = ChangePageSizeCommand;
var ChangePageSizeItemsCommand = (function (_super) {
    __extends(ChangePageSizeItemsCommand, _super);
    function ChangePageSizeItemsCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangePageSizeItemsCommand.prototype.isEnabled = function () {
        return true;
    };
    ChangePageSizeItemsCommand.prototype.getValue = function () {
        var _this = this;
        return this.control.settings.pageSizeItems.map(function (i) {
            return {
                size: new size_1.Size(_this.getModelUnit(i.width), _this.getModelUnit(i.height)),
                text: i.text
            };
        });
    };
    ChangePageSizeItemsCommand.prototype.executeCore = function (state, parameter) {
        var _this = this;
        this.control.settings.pageSizeItems = parameter.map(function (i) {
            return {
                size: new size_1.Size(_this.getModelUnitTwipsValue(i.width), _this.getModelUnitTwipsValue(i.height)),
                text: i.text
            };
        });
        return true;
    };
    return ChangePageSizeItemsCommand;
}(SimpleCommandBase_1.SimpleCommandBase));
exports.ChangePageSizeItemsCommand = ChangePageSizeItemsCommand;
//# sourceMappingURL=ChangePageSizeCommand.js.map