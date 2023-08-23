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
exports.BindDocumentCommand = void 0;
var DataLayoutParameters_1 = require("../../Data/DataLayoutParameters");
var SimpleCommandBase_1 = require("../SimpleCommandBase");
var BindDocumentCommand = (function (_super) {
    __extends(BindDocumentCommand, _super);
    function BindDocumentCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BindDocumentCommand.prototype.isEnabledInReadOnlyMode = function () {
        return true;
    };
    BindDocumentCommand.prototype.executeCore = function (state, parameter) {
        if (!parameter || !Array.isArray(parameter.nodeDataSource))
            throw Error("Format exception");
        this.performImportData(parameter);
        this.control.updateLayout(true);
        return true;
    };
    BindDocumentCommand.prototype.performImportData = function (parameter) {
        var dataSource = this.control.createDocumentDataSource(parameter.nodeDataSource, parameter.edgeDataSource, parameter.dataParameters, parameter.nodeDataImporter, parameter.edgeDataImporter);
        this.control.beginUpdateCanvas();
        this.permissionsProvider.lockPermissions();
        var layoutParameters = new DataLayoutParameters_1.DataLayoutParameters(this.control.settings, parameter.layoutParameters);
        dataSource.createModelItems(this.control.history, this.control.model, this.control.shapeDescriptionManager, this.control.selection, layoutParameters, this.control.settings.snapToGrid, this.control.settings.gridSize, this.control.measurer);
        this.permissionsProvider.unlockPermissions();
        this.control.endUpdateCanvas();
    };
    return BindDocumentCommand;
}(SimpleCommandBase_1.SimpleCommandBase));
exports.BindDocumentCommand = BindDocumentCommand;
//# sourceMappingURL=BindDocumentCommand.js.map