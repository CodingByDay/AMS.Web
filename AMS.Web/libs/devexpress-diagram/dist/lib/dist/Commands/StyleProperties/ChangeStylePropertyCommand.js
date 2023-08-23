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
exports.ChangeStylePropertyCommand = void 0;
var ChangeStylePropertyCommandBase_1 = require("./ChangeStylePropertyCommandBase");
var ChangeStyleHistoryItem_1 = require("../../History/StyleProperties/ChangeStyleHistoryItem");
var Style_1 = require("../../Model/Style");
var ChangeStylePropertyCommand = (function (_super) {
    __extends(ChangeStylePropertyCommand, _super);
    function ChangeStylePropertyCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangeStylePropertyCommand.prototype.getValue = function () {
        return this.control.selection.inputPosition.getCurrentStylePropertyValue(this.getStyleProperty());
    };
    ChangeStylePropertyCommand.prototype.getStyleObj = function (item) {
        return item.style;
    };
    ChangeStylePropertyCommand.prototype.getDefaultStyleObj = function () {
        return new Style_1.Style();
    };
    ChangeStylePropertyCommand.prototype.createHistoryItem = function (item, styleProperty, styleValue) {
        return new ChangeStyleHistoryItem_1.ChangeStyleHistoryItem(item.key, styleProperty, styleValue);
    };
    ChangeStylePropertyCommand.prototype.updateInputPosition = function (value) {
        this.control.selection.inputPosition.setStylePropertyValue(this.getStyleProperty(), value);
    };
    return ChangeStylePropertyCommand;
}(ChangeStylePropertyCommandBase_1.ChangeStylePropertyCommandBase));
exports.ChangeStylePropertyCommand = ChangeStylePropertyCommand;
//# sourceMappingURL=ChangeStylePropertyCommand.js.map