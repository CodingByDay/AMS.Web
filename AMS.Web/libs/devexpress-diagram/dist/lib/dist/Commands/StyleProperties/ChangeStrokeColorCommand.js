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
exports.ChangeStrokeColorCommand = void 0;
var ChangeStylePropertyCommand_1 = require("./ChangeStylePropertyCommand");
var color_1 = require("@devexpress/utils/lib/utils/color");
var ChangeStrokeColorCommand = (function (_super) {
    __extends(ChangeStrokeColorCommand, _super);
    function ChangeStrokeColorCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangeStrokeColorCommand.prototype.processParameter = function (parameter) {
        return color_1.ColorUtils.stringToHash(parameter);
    };
    ChangeStrokeColorCommand.prototype.getStyleProperty = function () {
        return "stroke";
    };
    return ChangeStrokeColorCommand;
}(ChangeStylePropertyCommand_1.ChangeStylePropertyCommand));
exports.ChangeStrokeColorCommand = ChangeStrokeColorCommand;
//# sourceMappingURL=ChangeStrokeColorCommand.js.map