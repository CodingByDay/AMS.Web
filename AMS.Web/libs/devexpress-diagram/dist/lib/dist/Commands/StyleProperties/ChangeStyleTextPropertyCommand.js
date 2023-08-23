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
exports.ChangeStyleTextPropertyCommand = void 0;
var ChangeStylePropertyCommandBase_1 = require("./ChangeStylePropertyCommandBase");
var ChangeStyleTextHistoryItem_1 = require("../../History/StyleProperties/ChangeStyleTextHistoryItem");
var Style_1 = require("../../Model/Style");
var ChangeStyleTextPropertyCommand = (function (_super) {
    __extends(ChangeStyleTextPropertyCommand, _super);
    function ChangeStyleTextPropertyCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangeStyleTextPropertyCommand.prototype.getValue = function () {
        return this.control.selection.inputPosition.getCurrentTextStylePropertyValue(this.getStyleProperty());
    };
    ChangeStyleTextPropertyCommand.prototype.getStyleObj = function (item) {
        return item.styleText;
    };
    ChangeStyleTextPropertyCommand.prototype.getDefaultStyleObj = function () {
        return new Style_1.TextStyle();
    };
    ChangeStyleTextPropertyCommand.prototype.createHistoryItem = function (item, styleProperty, styleValue) {
        return new ChangeStyleTextHistoryItem_1.ChangeStyleTextHistoryItem(item.key, styleProperty, styleValue);
    };
    ChangeStyleTextPropertyCommand.prototype.updateInputPosition = function (value) {
        this.control.selection.inputPosition.setTextStylePropertyValue(this.getStyleProperty(), value);
    };
    return ChangeStyleTextPropertyCommand;
}(ChangeStylePropertyCommandBase_1.ChangeStylePropertyCommandBase));
exports.ChangeStyleTextPropertyCommand = ChangeStyleTextPropertyCommand;
//# sourceMappingURL=ChangeStyleTextPropertyCommand.js.map