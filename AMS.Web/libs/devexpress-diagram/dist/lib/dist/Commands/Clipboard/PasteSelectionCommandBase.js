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
exports.PasteSelectionCommandBase = void 0;
var ClipboardCommand_1 = require("./ClipboardCommand");
var Importer_1 = require("../../ImportAndExport/Importer");
var Shape_1 = require("../../Model/Shapes/Shape");
var ImportShapeHistoryItem_1 = require("../../History/Common/ImportShapeHistoryItem");
var Connector_1 = require("../../Model/Connectors/Connector");
var ImportConnectorHistoryItem_1 = require("../../History/Common/ImportConnectorHistoryItem");
var ModelUtils_1 = require("../../Model/ModelUtils");
var SetSelectionHistoryItem_1 = require("../../History/Common/SetSelectionHistoryItem");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var unit_converter_1 = require("@devexpress/utils/lib/class/unit-converter");
var PasteSelectionCommandBase = (function (_super) {
    __extends(PasteSelectionCommandBase, _super);
    function PasteSelectionCommandBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PasteSelectionCommandBase.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && (this.isPasteSupportedByBrowser() || ClipboardCommand_1.ClipboardCommand.clipboardData !== undefined);
    };
    PasteSelectionCommandBase.prototype.isVisible = function () {
        return this.isPasteSupportedByBrowser() || ClipboardCommand_1.ClipboardCommand.clipboardData !== undefined;
    };
    PasteSelectionCommandBase.prototype.parseClipboardData = function (data) {
        var items = [];
        var importer = new Importer_1.Importer(this.control.shapeDescriptionManager, data);
        items = importer.importItems(this.control.model);
        var offset = this.getEventPositionOffset(items, this.control.contextMenuPosition);
        offset = this.getCorrectedOffsetByModel(items, offset);
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item instanceof Shape_1.Shape)
                item.position.offsetByPoint(offset);
            else if (item instanceof Connector_1.Connector)
                item.points.forEach(function (p) { return p.offsetByPoint(offset); });
        }
        return items;
    };
    PasteSelectionCommandBase.prototype.getCorrectedOffsetByModel = function (items, baseOffset) {
        var topLeftItem = items.reduce(function (acc, item) {
            var x = item instanceof Shape_1.Shape ? item.position.x : item instanceof Connector_1.Connector ? item.getMinX() : Number.MAX_VALUE;
            var y = item instanceof Shape_1.Shape ? item.position.y : item instanceof Connector_1.Connector ? item.getMinY() : Number.MAX_VALUE;
            if (y < acc.y || (y === acc.y && x < acc.x)) {
                acc.topLeftItem = item;
                acc.x = x;
                acc.y = y;
            }
            return acc;
        }, {
            topLeftItem: items[0],
            x: Number.MAX_VALUE,
            y: Number.MAX_VALUE
        }).topLeftItem;
        if (topLeftItem instanceof Shape_1.Shape) {
            var newPoint = this.getShapeCorrectedPosition(this.control.model, topLeftItem, baseOffset);
            return new point_1.Point(newPoint.x - topLeftItem.position.x, newPoint.y - topLeftItem.position.y);
        }
        else if (topLeftItem instanceof Connector_1.Connector) {
            var newPoints = this.getConnectorCorrectedPoints(this.control.model, topLeftItem, baseOffset);
            return new point_1.Point(topLeftItem.points[0].x - newPoints[0].x, topLeftItem.points[0].y - newPoints[0].y);
        }
    };
    PasteSelectionCommandBase.prototype.executeCore = function (state, parameter) {
        var _this = this;
        var ret = true;
        if (parameter)
            this.performPaste(parameter);
        else
            this.getClipboardData(function (data) {
                ret = _this.execute(data);
            });
        return ret;
    };
    PasteSelectionCommandBase.prototype.addItemForSortingRecursive = function (itemsHashtable, item) {
        if (itemsHashtable[item.key])
            return itemsHashtable[item.key];
        if (item instanceof Connector_1.Connector) {
            if (item.endItem)
                itemsHashtable[item.key] = this.addItemForSortingRecursive(itemsHashtable, item.endItem) - 0.5;
            else if (item.beginItem)
                itemsHashtable[item.key] = this.addItemForSortingRecursive(itemsHashtable, item.beginItem) + 0.5;
            else
                itemsHashtable[item.key] = -1;
            return itemsHashtable[item.key];
        }
        if (item.attachedConnectors.length === 0)
            return itemsHashtable[item.key] = 0;
        else
            for (var i = 0; i < item.attachedConnectors.length; i++) {
                var beginItem = item.attachedConnectors[i].beginItem;
                if (item.attachedConnectors[i].endItem === item && beginItem && beginItem !== item.attachedConnectors[i].endItem)
                    return itemsHashtable[item.key] = this.addItemForSortingRecursive(itemsHashtable, beginItem) + 1;
                else
                    return itemsHashtable[item.key] = 0;
            }
    };
    PasteSelectionCommandBase.prototype.getSortedPasteItems = function (items) {
        var sortedItems = [];
        var connectors = [];
        var itemsHashtable = {};
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item instanceof Shape_1.Shape)
                sortedItems.push(item);
            else if (item instanceof Connector_1.Connector) {
                connectors.push(item);
                this.addItemForSortingRecursive(itemsHashtable, item);
            }
        }
        connectors.sort(function (a, b) { return itemsHashtable[b.key] - itemsHashtable[a.key]; });
        return sortedItems.concat(connectors);
    };
    PasteSelectionCommandBase.prototype.performPaste = function (data) {
        this.control.beginUpdateCanvas();
        this.control.history.beginTransaction();
        var idsForSelection = {};
        var items = this.parseClipboardData(data);
        items = this.getSortedPasteItems(items);
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item instanceof Shape_1.Shape)
                this.control.history.addAndRedo(new ImportShapeHistoryItem_1.ImportShapeHistoryItem(item));
            else if (item instanceof Connector_1.Connector)
                this.control.history.addAndRedo(new ImportConnectorHistoryItem_1.ImportConnectorHistoryItem(item));
            var containerKey = item.container && item.container.key;
            if (!containerKey || idsForSelection[containerKey] === undefined)
                idsForSelection[item.key] = true;
            else if (containerKey && idsForSelection[containerKey] !== undefined)
                idsForSelection[item.key] = false;
        }
        ModelUtils_1.ModelUtils.tryUpdateModelRectangle(this.control.history);
        this.control.history.addAndRedo(new SetSelectionHistoryItem_1.SetSelectionHistoryItem(this.control.selection, Object.keys(idsForSelection).filter(function (id) { return idsForSelection[id]; })));
        this.control.history.endTransaction();
        this.control.endUpdateCanvas();
        this.control.barManager.updateItemsState();
    };
    PasteSelectionCommandBase.prototype.getShapeCorrectedPosition = function (model, shape, initOffset) {
        var position = shape.position.clone().offsetByPoint(initOffset);
        while (model.findShapeAtPosition(position))
            position.offset(PasteSelectionCommandBase.positionOffset, PasteSelectionCommandBase.positionOffset);
        return position;
    };
    PasteSelectionCommandBase.prototype.getConnectorCorrectedPoints = function (model, connector, initOffset) {
        var points = connector.points.map(function (p) { return p.clone().offsetByPoint(initOffset); });
        while (model.findConnectorAtPoints(points))
            points.forEach(function (pt) {
                pt.x += PasteSelectionCommandBase.positionOffset;
                pt.y += PasteSelectionCommandBase.positionOffset;
            });
        return points;
    };
    Object.defineProperty(PasteSelectionCommandBase.prototype, "isPermissionsRequired", {
        get: function () { return true; },
        enumerable: false,
        configurable: true
    });
    PasteSelectionCommandBase.positionOffset = unit_converter_1.UnitConverter.pixelsToTwips(10);
    return PasteSelectionCommandBase;
}(ClipboardCommand_1.ClipboardCommand));
exports.PasteSelectionCommandBase = PasteSelectionCommandBase;
//# sourceMappingURL=PasteSelectionCommandBase.js.map