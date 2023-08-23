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
exports.ExportImageCommand = void 0;
var CanvasItemsManager_1 = require("../../Render/CanvasItemsManager");
var CanvasExportManager_1 = require("../../Render/CanvasExportManager");
var ExportImportCommandBase_1 = require("./ExportImportCommandBase");
var Exporter_1 = require("../../ImportAndExport/Exporter");
var RenderHelper_1 = require("../../Render/RenderHelper");
var TextMeasurer_1 = require("../../Render/Measurer/TextMeasurer");
var DOMManipulator_1 = require("../../Render/DOMManipulator");
var ImageCache_1 = require("../../Images/ImageCache");
var ExportImageCommand = (function (_super) {
    __extends(ExportImageCommand, _super);
    function ExportImageCommand(control) {
        var _this = _super.call(this, control) || this;
        _this.exporter = new Exporter_1.Exporter();
        return _this;
    }
    ExportImageCommand.prototype.isEnabled = function () {
        return !ImageCache_1.ImageCache.instance.hasNonLoadedImages();
    };
    ExportImageCommand.prototype.executeCore = function (state, parameter) {
        var _this = this;
        try {
            var exportManager = this.getExportManager();
            var exportFunc = this.getExportFunc();
            exportFunc(this.control.model.size.clone(), this.control.model.pageColor, exportManager, function (url) {
                parameter(url, _this.getExtension());
                _this.tryDispose();
            }, this.control.settings.useCanvgForExportToImage);
        }
        catch (e) {
            this.tryDispose();
            throw e;
        }
        return true;
    };
    ExportImageCommand.prototype.getExportManager = function () {
        var measurer = this.getOrCreateMeasurer();
        var itemsManager = (this.control.render && this.control.render.items) || this.createItemsManager(measurer);
        return this.exportManager || (this.exportManager = new CanvasExportManager_1.CanvasExportManager(itemsManager.itemsContainer, measurer, this.control.instanceId));
    };
    ExportImageCommand.prototype.createItemsManager = function (measurer) {
        this.svgElement = RenderHelper_1.RenderHelper.createSvgElement(document.body, true);
        var canvasManager = new CanvasItemsManager_1.CanvasItemsManager(this.svgElement, 1, new DOMManipulator_1.ExportDOMManipulator(measurer), this.control.instanceId);
        this.control.modelManipulator.onModelChanged.add(canvasManager);
        this.control.modelManipulator.commitItemsCreateChanges();
        return canvasManager;
    };
    ExportImageCommand.prototype.tryDispose = function () {
        if (this.svgElement) {
            document.body.removeChild(this.svgElement);
            delete this.svgElement;
        }
        if (this.tempMeasurer) {
            this.tempMeasurer.clean();
            this.tempMeasurer = undefined;
        }
        this.exportManager = undefined;
    };
    ExportImageCommand.prototype.getOrCreateMeasurer = function () {
        return this.control.measurer || (this.tempMeasurer = new TextMeasurer_1.TextMeasurer(document.body));
    };
    return ExportImageCommand;
}(ExportImportCommandBase_1.ExportImportCommandBase));
exports.ExportImageCommand = ExportImageCommand;
//# sourceMappingURL=ExportImageCommand.js.map