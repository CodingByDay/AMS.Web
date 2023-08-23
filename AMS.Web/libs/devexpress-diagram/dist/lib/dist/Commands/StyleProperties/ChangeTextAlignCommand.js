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
exports.TextRightAlignCommand = exports.TextCenterAlignCommand = exports.TextLeftAlignCommand = exports.ChangeTextAlignCommand = void 0;
var ToggleStyleTextPropertyCommand_1 = require("./ToggleStyleTextPropertyCommand");
var ChangeTextAlignCommand = (function (_super) {
    __extends(ChangeTextAlignCommand, _super);
    function ChangeTextAlignCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangeTextAlignCommand.prototype.getStyleProperty = function () {
        return "text-anchor";
    };
    return ChangeTextAlignCommand;
}(ToggleStyleTextPropertyCommand_1.ToggleStyleTextPropertyCommand));
exports.ChangeTextAlignCommand = ChangeTextAlignCommand;
var TextLeftAlignCommand = (function (_super) {
    __extends(TextLeftAlignCommand, _super);
    function TextLeftAlignCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextLeftAlignCommand.prototype.getStylePropertyValue = function () {
        return "start";
    };
    return TextLeftAlignCommand;
}(ChangeTextAlignCommand));
exports.TextLeftAlignCommand = TextLeftAlignCommand;
var TextCenterAlignCommand = (function (_super) {
    __extends(TextCenterAlignCommand, _super);
    function TextCenterAlignCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextCenterAlignCommand.prototype.getStylePropertyValue = function () {
        return "middle";
    };
    return TextCenterAlignCommand;
}(ChangeTextAlignCommand));
exports.TextCenterAlignCommand = TextCenterAlignCommand;
var TextRightAlignCommand = (function (_super) {
    __extends(TextRightAlignCommand, _super);
    function TextRightAlignCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextRightAlignCommand.prototype.getStylePropertyValue = function () {
        return "end";
    };
    return TextRightAlignCommand;
}(ChangeTextAlignCommand));
exports.TextRightAlignCommand = TextRightAlignCommand;
//# sourceMappingURL=ChangeTextAlignCommand.js.map