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
exports.ToggleFontUnderlineCommand = void 0;
var ToggleStyleTextPropertyCommand_1 = require("./ToggleStyleTextPropertyCommand");
var ToggleFontUnderlineCommand = (function (_super) {
    __extends(ToggleFontUnderlineCommand, _super);
    function ToggleFontUnderlineCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToggleFontUnderlineCommand.prototype.getStyleProperty = function () {
        return "text-decoration";
    };
    ToggleFontUnderlineCommand.prototype.getStylePropertyValue = function () {
        return "underline";
    };
    return ToggleFontUnderlineCommand;
}(ToggleStyleTextPropertyCommand_1.ToggleStyleTextPropertyCommand));
exports.ToggleFontUnderlineCommand = ToggleFontUnderlineCommand;
//# sourceMappingURL=ToggleFontUnderlineCommand.js.map