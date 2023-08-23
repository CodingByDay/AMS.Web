"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exporter = void 0;
var Shape_1 = require("../Model/Shapes/Shape");
var Connector_1 = require("../Model/Connectors/Connector");
var Utils_1 = require("../Utils");
var Exporter = (function () {
    function Exporter() {
    }
    Exporter.prototype.export = function (model) {
        var obj = {
            page: {},
            connectors: [],
            shapes: []
        };
        obj.page = {
            "width": model.size.width,
            "height": model.size.height,
            "pageColor": model.pageColor,
            "pageWidth": model.pageSize.width,
            "pageHeight": model.pageSize.height,
            "pageLandscape": model.pageLandscape
        };
        this.exportItemsCore(model.items, obj);
        return JSON.stringify(obj);
    };
    Exporter.prototype.exportItems = function (items) {
        var obj = {
            connectors: [],
            shapes: []
        };
        this.exportItemsCore(items, obj);
        return JSON.stringify(obj);
    };
    Exporter.prototype.exportItemsCore = function (items, obj) {
        var _this = this;
        items.forEach(function (item) {
            if (item instanceof Shape_1.Shape)
                obj.shapes.push(_this.exportShape(item));
            else if (item instanceof Connector_1.Connector) {
                var connectorObj = _this.exportConnector(item);
                if (item.beginItem) {
                    connectorObj["beginItemKey"] = item.beginItem.key;
                    connectorObj["beginConnectionPointIndex"] = item.beginConnectionPointIndex;
                }
                if (item.endItem) {
                    connectorObj["endItemKey"] = item.endItem.key;
                    connectorObj["endConnectionPointIndex"] = item.endConnectionPointIndex;
                }
                obj.connectors.push(connectorObj);
            }
        });
    };
    Exporter.prototype.exportItem = function (item) {
        return {
            "key": item.key,
            "dataKey": item.dataKey,
            "customData": Utils_1.ObjectUtils.cloneObject(item.customData),
            "locked": item.locked,
            "zIndex": item.zIndex
        };
    };
    Exporter.prototype.exportShape = function (shape) {
        var result = this.exportItem(shape);
        result["type"] = shape.description.key;
        result["text"] = shape.text;
        if (!shape.image.isEmpty)
            result["imageUrl"] = shape.image.exportUrl;
        result["x"] = shape.position.x;
        result["y"] = shape.position.y;
        result["width"] = shape.size.width;
        result["height"] = shape.size.height;
        var paramsObj = shape.parameters.toObject();
        if (paramsObj)
            result["parameters"] = paramsObj;
        var styleObj = shape.style.toObject();
        if (styleObj)
            result["style"] = styleObj;
        var styleTextObj = shape.styleText.toObject();
        if (styleTextObj)
            result["styleText"] = styleTextObj;
        if (shape.children.length)
            result["childKeys"] = shape.children.map(function (child) { return child.key; });
        if (!shape.expanded)
            result["expanded"] = false;
        if (shape.expandedSize) {
            result["expandedWidth"] = shape.expandedSize.width;
            result["expandedHeight"] = shape.expandedSize.height;
        }
        return result;
    };
    Exporter.prototype.exportConnector = function (connector) {
        var result = this.exportItem(connector);
        result["points"] = connector.points.map(function (p) { return { "x": p.x, "y": p.y }; });
        var textObj = connector.texts.toObject();
        if (textObj)
            result["texts"] = textObj;
        var propsObj = connector.properties.toObject();
        if (propsObj)
            result["properties"] = propsObj;
        var styleObj = connector.style.toObject();
        if (styleObj)
            result["style"] = styleObj;
        var styleTextObj = connector.styleText.toObject();
        if (styleTextObj)
            result["styleText"] = styleTextObj;
        return result;
    };
    Exporter.prototype.exportSvg = function (modelSize, pageColor, exportManager, callback) {
        exportManager.exportSvgImage(modelSize, pageColor, callback);
    };
    Exporter.prototype.exportPng = function (modelSize, pageColor, exportManager, callback, useCanvgForExportToImage) {
        exportManager.exportPngImage(modelSize, pageColor, callback, useCanvgForExportToImage);
    };
    Exporter.prototype.exportJpg = function (modelSize, pageColor, exportManager, callback, useCanvgForExportToImage) {
        exportManager.exportJpgImage(modelSize, pageColor, callback, useCanvgForExportToImage);
    };
    return Exporter;
}());
exports.Exporter = Exporter;
//# sourceMappingURL=Exporter.js.map