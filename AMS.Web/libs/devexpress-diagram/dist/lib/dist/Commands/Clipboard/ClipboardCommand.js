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
exports.ClipboardCommand = void 0;
var SimpleCommandBase_1 = require("../SimpleCommandBase");
var ClipboardCommand = (function (_super) {
    __extends(ClipboardCommand, _super);
    function ClipboardCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClipboardCommand.prototype.setClipboardData = function (data) {
        if (this.control.render)
            this.control.render.input.setClipboardData(data);
        ClipboardCommand.clipboardData = data;
    };
    ClipboardCommand.prototype.getClipboardData = function (callback) {
        if (this.control.render && this.isPasteSupportedByBrowser())
            this.control.render.input.getClipboardData(callback);
        else
            callback(ClipboardCommand.clipboardData);
    };
    ClipboardCommand.prototype.isPasteSupportedByBrowser = function () {
        return this.control.render && this.control.render.input.isPasteSupportedByBrowser();
    };
    return ClipboardCommand;
}(SimpleCommandBase_1.SimpleCommandBase));
exports.ClipboardCommand = ClipboardCommand;
//# sourceMappingURL=ClipboardCommand.js.map