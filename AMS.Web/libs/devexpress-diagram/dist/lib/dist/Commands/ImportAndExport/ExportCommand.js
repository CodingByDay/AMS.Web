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
exports.ExportCommand = void 0;
var Exporter_1 = require("../../ImportAndExport/Exporter");
var ExportImportCommandBase_1 = require("./ExportImportCommandBase");
var ExportCommand = (function (_super) {
    __extends(ExportCommand, _super);
    function ExportCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExportCommand.prototype.executeCore = function (state, parameter) {
        var exporter = new Exporter_1.Exporter();
        var data = exporter.export(this.control.model);
        parameter(data);
        return true;
    };
    return ExportCommand;
}(ExportImportCommandBase_1.ExportImportCommandBase));
exports.ExportCommand = ExportCommand;
//# sourceMappingURL=ExportCommand.js.map