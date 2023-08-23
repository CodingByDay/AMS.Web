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
exports.ExportSvgCommand = void 0;
var ExportImageCommand_1 = require("./ExportImageCommand");
var ExportSvgCommand = (function (_super) {
    __extends(ExportSvgCommand, _super);
    function ExportSvgCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExportSvgCommand.prototype.getExtension = function () { return "svg"; };
    ExportSvgCommand.prototype.getExportFunc = function () {
        return this.exporter.exportSvg;
    };
    return ExportSvgCommand;
}(ExportImageCommand_1.ExportImageCommand));
exports.ExportSvgCommand = ExportSvgCommand;
//# sourceMappingURL=ExportSvgCommand.js.map