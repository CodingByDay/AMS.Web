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
exports.ChangeFontColorCommand = void 0;
var ChangeStyleTextPropertyCommand_1 = require("./ChangeStyleTextPropertyCommand");
var color_1 = require("@devexpress/utils/lib/utils/color");
var ChangeFontColorCommand = (function (_super) {
    __extends(ChangeFontColorCommand, _super);
    function ChangeFontColorCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangeFontColorCommand.prototype.processParameter = function (parameter) {
        return color_1.ColorUtils.stringToHash(parameter);
    };
    ChangeFontColorCommand.prototype.getStyleProperty = function () {
        return "fill";
    };
    return ChangeFontColorCommand;
}(ChangeStyleTextPropertyCommand_1.ChangeStyleTextPropertyCommand));
exports.ChangeFontColorCommand = ChangeFontColorCommand;
//# sourceMappingURL=ChangeFontColorCommand.js.map