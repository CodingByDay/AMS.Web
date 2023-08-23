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
exports.ToggleStyleTextPropertyCommand = void 0;
var StylePropertyCommandBase_1 = require("./StylePropertyCommandBase");
var ChangeStyleTextHistoryItem_1 = require("../../History/StyleProperties/ChangeStyleTextHistoryItem");
var Style_1 = require("../../Model/Style");
var ToggleStyleTextPropertyCommand = (function (_super) {
    __extends(ToggleStyleTextPropertyCommand, _super);
    function ToggleStyleTextPropertyCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToggleStyleTextPropertyCommand.prototype.getValue = function () {
        var value = this.control.selection.inputPosition.getCurrentTextStylePropertyValue(this.getStyleProperty());
        return value === this.getStylePropertyValue();
    };
    ToggleStyleTextPropertyCommand.prototype.executeCore = function (state) {
        var _this = this;
        this.control.history.beginTransaction();
        var styleProperty = this.getStyleProperty();
        var styleValue = state.value ? Style_1.TextStyle.defaultInstance[styleProperty] : this.getStylePropertyValue();
        var items = this.control.selection.getSelectedItems();
        items.forEach(function (item) {
            _this.control.history.addAndRedo(new ChangeStyleTextHistoryItem_1.ChangeStyleTextHistoryItem(item.key, styleProperty, styleValue));
        });
        this.control.selection.inputPosition.setTextStylePropertyValue(this.getStyleProperty(), styleValue);
        this.control.history.endTransaction();
        return true;
    };
    ToggleStyleTextPropertyCommand.prototype.getStyleObj = function (item) {
        return item.styleText;
    };
    ToggleStyleTextPropertyCommand.prototype.getDefaultStyleObj = function () {
        return new Style_1.TextStyle();
    };
    return ToggleStyleTextPropertyCommand;
}(StylePropertyCommandBase_1.StylePropertyCommandBase));
exports.ToggleStyleTextPropertyCommand = ToggleStyleTextPropertyCommand;
//# sourceMappingURL=ToggleStyleTextPropertyCommand.js.map