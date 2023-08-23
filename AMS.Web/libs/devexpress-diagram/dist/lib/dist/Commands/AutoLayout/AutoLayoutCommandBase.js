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
exports.AutoLayoutCommandBase = void 0;
var ModelUtils_1 = require("../../Model/ModelUtils");
var SimpleCommandBase_1 = require("../SimpleCommandBase");
var Shape_1 = require("../../Model/Shapes/Shape");
var Connector_1 = require("../../Model/Connectors/Connector");
var Utils_1 = require("../../Utils");
var rectangle_1 = require("@devexpress/utils/lib/geometry/rectangle");
var ScrollIntoViewHistoryItem_1 = require("../../History/Common/ScrollIntoViewHistoryItem");
var AutoLayoutCommandBase = (function (_super) {
    __extends(AutoLayoutCommandBase, _super);
    function AutoLayoutCommandBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AutoLayoutCommandBase.prototype.executeCore = function (state, parameter) {
        var _this = this;
        this.control.history.beginTransaction();
        var shapes = this.getAffectedShapes();
        var connectors = this.getAffectedConnectors();
        var settings = this.createLayoutSettings();
        var graphInfo = ModelUtils_1.ModelUtils.getGraphInfoByItems(this.control.model, shapes, connectors, false);
        if (graphInfo.length) {
            var rectangle_2;
            var model_1 = this.control.model;
            var commonRect = Utils_1.GeometryUtils.getCommonRectangle(Utils_1.Utils.flatten(graphInfo.map(function (g) { return g.graph.items.map(function (i) { return model_1.findItem(i.key); }); }))
                .concat(graphInfo.map(function (g) { return g.container; }))
                .filter(function (i) { return i; })
                .map(function (i) { return i.rectangle; }));
            this.control.history.addAndRedo(new ScrollIntoViewHistoryItem_1.ScrollIntoViewOnUndoHistoryItem(this.control.view, commonRect));
            graphInfo.forEach(function (info) {
                var layout = _this.createLayout(settings, info.graph);
                var nonGraphItems = ModelUtils_1.ModelUtils.getNonGraphItems(_this.control.model, info.container, layout.nodeToLayout, shapes, connectors);
                var layoutRect = ModelUtils_1.ModelUtils.applyLayout(_this.control.history, _this.control.model, info.container, info.graph, layout, nonGraphItems, settings, _this.control.settings.snapToGrid, _this.control.settings.gridSize, false);
                rectangle_2 = rectangle_2 && rectangle_1.Rectangle.union(rectangle_2, layoutRect) || layoutRect;
            });
            ModelUtils_1.ModelUtils.tryUpdateModelRectangle(this.control.history);
            this.control.history.addAndRedo(new ScrollIntoViewHistoryItem_1.ScrollIntoViewOnRedoHistoryItem(this.control.view, rectangle_2));
        }
        this.control.history.endTransaction();
        return true;
    };
    AutoLayoutCommandBase.prototype.getAffectedShapes = function () {
        return this.control.selection.isEmpty() ?
            this.control.model.items.filter((function (i) { return i instanceof Shape_1.Shape && !i.locked; })) :
            this.control.selection.getSelectedShapes(false, true);
    };
    AutoLayoutCommandBase.prototype.getAffectedConnectors = function () {
        return this.control.selection.isEmpty() ?
            this.control.model.items.filter((function (i) { return i instanceof Connector_1.Connector && !i.locked; })) :
            this.control.selection.getSelectedConnectors(false, true);
    };
    return AutoLayoutCommandBase;
}(SimpleCommandBase_1.SimpleCommandBase));
exports.AutoLayoutCommandBase = AutoLayoutCommandBase;
//# sourceMappingURL=AutoLayoutCommandBase.js.map