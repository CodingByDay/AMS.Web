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
exports.ImportBPMNCommand = void 0;
var BPMNImporter_1 = require("../../ImportAndExport/BPMNImporter");
var ModelUtils_1 = require("../../Model/ModelUtils");
var AddShapeHistoryItem_1 = require("../../History/Common/AddShapeHistoryItem");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var Connector_1 = require("../../Model/Connectors/Connector");
var AddConnectorHistoryItem_1 = require("../../History/Common/AddConnectorHistoryItem");
var AddConnectionHistoryItem_1 = require("../../History/Common/AddConnectionHistoryItem");
var Sugiyama_1 = require("../../Layout/Builders/Sugiyama");
var LayoutSettings_1 = require("../../Layout/LayoutSettings");
var ExportImportCommandBase_1 = require("./ExportImportCommandBase");
var ImportBPMNCommand = (function (_super) {
    __extends(ImportBPMNCommand, _super);
    function ImportBPMNCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImportBPMNCommand.prototype.executeCore = function (state, parameter) {
        var importer = new BPMNImporter_1.BPMNImporter(parameter);
        var graph = importer.import();
        this.updateModel(graph);
        return true;
    };
    ImportBPMNCommand.prototype.updateModel = function (graph) {
        var _this = this;
        var externalKeyToModelKey = {};
        var shapes = [];
        var connectors = [];
        this.control.history.beginTransaction();
        graph.items.forEach(function (node) {
            var insert = new AddShapeHistoryItem_1.AddShapeHistoryItem(_this.getShapeDescription(node.type), new point_1.Point(0, 0), node.text, node.key);
            _this.control.history.addAndRedo(insert);
            externalKeyToModelKey[node.key] = insert.shapeKey;
            var shape = _this.control.model.findShape(insert.shapeKey);
            shapes.push(shape);
        });
        graph.edges.forEach(function (edge) {
            var from = _this.control.model.findShape(externalKeyToModelKey[edge.from]);
            var to = _this.control.model.findShape(externalKeyToModelKey[edge.to]);
            var insert = new AddConnectorHistoryItem_1.AddConnectorHistoryItem([from.getConnectionPointPosition(0), to.getConnectionPointPosition(0)]);
            _this.control.history.addAndRedo(insert);
            var connector = _this.control.model.findConnector(insert.connectorKey);
            _this.control.history.addAndRedo(new AddConnectionHistoryItem_1.AddConnectionHistoryItem(connector, from, 0, Connector_1.ConnectorPosition.Begin));
            _this.control.history.addAndRedo(new AddConnectionHistoryItem_1.AddConnectionHistoryItem(connector, to, 0, Connector_1.ConnectorPosition.End));
            connectors.push(connector);
        });
        var settings = new LayoutSettings_1.LayoutSettings();
        var graphInfo = ModelUtils_1.ModelUtils.getGraphInfoByItems(this.control.model, shapes, connectors);
        graphInfo.forEach(function (info) {
            var layout = new Sugiyama_1.SugiyamaLayoutBuilder(settings, info.graph).build();
            var nonGraphItems = ModelUtils_1.ModelUtils.getNonGraphItems(_this.control.model, info.container, layout.nodeToLayout, shapes, connectors);
            ModelUtils_1.ModelUtils.applyLayout(_this.control.history, _this.control.model, undefined, info.graph, layout, nonGraphItems, settings, _this.control.settings.snapToGrid, _this.control.settings.gridSize, false);
        });
        ModelUtils_1.ModelUtils.tryUpdateModelRectangle(this.control.history);
        this.control.history.endTransaction();
    };
    ImportBPMNCommand.prototype.getShapeDescription = function (shapeType) {
        return this.control.shapeDescriptionManager.get(shapeType);
    };
    return ImportBPMNCommand;
}(ExportImportCommandBase_1.ExportImportCommandBase));
exports.ImportBPMNCommand = ImportBPMNCommand;
//# sourceMappingURL=ImportBPMNCommand.js.map