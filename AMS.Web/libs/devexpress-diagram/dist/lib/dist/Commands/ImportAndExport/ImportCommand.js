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
exports.ImportCommand = void 0;
var Importer_1 = require("../../ImportAndExport/Importer");
var ExportImportCommandBase_1 = require("./ExportImportCommandBase");
var ImportCommand = (function (_super) {
    __extends(ImportCommand, _super);
    function ImportCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImportCommand.prototype.executeCore = function (state, parameter) {
        this.permissionsProvider.lockPermissions();
        var data = parameter["data"] ? parameter["data"] : parameter;
        var importer = new Importer_1.Importer(this.control.shapeDescriptionManager, data);
        if (parameter["keepExistingItems"] === true) {
            importer.importItemsData(this.control.model);
            this.control.importItemsData();
        }
        else {
            var model = importer.import();
            this.control.importModel(model);
        }
        this.permissionsProvider.unlockPermissions();
        return true;
    };
    return ImportCommand;
}(ExportImportCommandBase_1.ExportImportCommandBase));
exports.ImportCommand = ImportCommand;
//# sourceMappingURL=ImportCommand.js.map