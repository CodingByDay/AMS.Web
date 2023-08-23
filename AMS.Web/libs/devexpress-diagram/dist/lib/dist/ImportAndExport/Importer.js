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
exports.Importer = void 0;
var Shape_1 = require("../Model/Shapes/Shape");
var Utils_1 = require("../Utils");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var ShapeDescriptionManager_1 = require("../Model/Shapes/Descriptions/ShapeDescriptionManager");
var Connector_1 = require("../Model/Connectors/Connector");
var ImageInfo_1 = require("../Images/ImageInfo");
var ImporterBase_1 = require("./ImporterBase");
var ImportUtils_1 = require("./ImportUtils");
var color_1 = require("@devexpress/utils/lib/utils/color");
var Importer = (function (_super) {
    __extends(Importer, _super);
    function Importer(shapeDescriptionManager, json) {
        var _this = _super.call(this, shapeDescriptionManager) || this;
        _this.obj = ImportUtils_1.ImportUtils.parseJSON(json);
        return _this;
    }
    Importer.prototype.getObject = function () {
        return this.obj;
    };
    Importer.prototype.getPageObject = function (obj) {
        return obj["page"];
    };
    Importer.prototype.getShapeObjects = function (obj) {
        return obj["shapes"];
    };
    Importer.prototype.getConnectorObjects = function (obj) {
        return obj["connectors"];
    };
    Importer.prototype.importPageSettings = function (model, pageObj) {
        if (!pageObj)
            return;
        this.assert(pageObj["width"], "number");
        this.assert(pageObj["height"], "number");
        if (typeof pageObj["width"] === "number")
            model.size.width = pageObj["width"];
        if (typeof pageObj["height"] === "number")
            model.size.height = pageObj["height"];
        if (typeof pageObj["pageColor"] === "number")
            model.pageColor = pageObj["pageColor"];
        else if (typeof pageObj["pageColor"] === "string")
            model.pageColor = color_1.ColorUtils.fromString(pageObj["pageColor"]);
        if (typeof pageObj["pageWidth"] === "number")
            model.pageSize.width = pageObj["pageWidth"];
        if (typeof pageObj["pageHeight"] === "number")
            model.pageSize.height = pageObj["pageHeight"];
        if (typeof pageObj["pageLandscape"] === "boolean")
            model.pageLandscape = pageObj["pageLandscape"];
    };
    Importer.prototype.importShape = function (shapeObj) {
        this.assert(shapeObj["key"], "string");
        this.assert(shapeObj["x"], "number");
        this.assert(shapeObj["y"], "number");
        this.assert(shapeObj["type"], "string");
        var shapeType = shapeObj["type"];
        var description = this.shapeDescriptionManager.get(shapeType);
        var position = new point_1.Point(shapeObj["x"], shapeObj["y"]);
        var shape = new Shape_1.Shape(description || ShapeDescriptionManager_1.ShapeDescriptionManager.default, position);
        shape.key = shapeObj["key"];
        if (typeof shapeObj["dataKey"] === "string" || typeof shapeObj["dataKey"] === "number")
            shape.dataKey = shapeObj["dataKey"];
        if (typeof shapeObj["customData"] === "object")
            shape.customData = Utils_1.ObjectUtils.cloneObject(shapeObj["customData"]);
        if (typeof shapeObj["locked"] === "boolean")
            shape.locked = shapeObj["locked"];
        if (typeof shapeObj["width"] === "number")
            shape.size.width = shapeObj["width"];
        if (typeof shapeObj["height"] === "number")
            shape.size.height = shapeObj["height"];
        if (typeof shapeObj["text"] === "string")
            shape.text = shapeObj["text"];
        if (typeof shapeObj["imageUrl"] === "string")
            shape.image = new ImageInfo_1.ImageInfo(shapeObj["imageUrl"]);
        if (shapeObj["parameters"]) {
            shape.parameters.fromObject(shapeObj["parameters"]);
            shape.description.normalizeParameters(shape, shape.parameters);
        }
        if (shapeObj["style"])
            shape.style.fromObject(shapeObj["style"]);
        if (shapeObj["styleText"])
            shape.styleText.fromObject(shapeObj["styleText"]);
        if (typeof shapeObj["zIndex"] === "number")
            shape.zIndex = shapeObj["zIndex"];
        if (Array.isArray(shapeObj["childKeys"]))
            shape["childKeys"] = shapeObj["childKeys"].slice();
        if (typeof shapeObj["expanded"] === "boolean")
            shape.expanded = shapeObj["expanded"];
        if (typeof shapeObj["expandedWidth"] === "number" && typeof shapeObj["expandedHeight"] === "number")
            shape.expandedSize = new size_1.Size(shapeObj["expandedWidth"], shapeObj["expandedHeight"]);
        return shape;
    };
    Importer.prototype.importShapeChildren = function (shapeObj, shape) {
        return [];
    };
    Importer.prototype.importConnector = function (connectorObj) {
        var _this = this;
        this.assert(connectorObj["key"], "string");
        if (!Array.isArray(connectorObj["points"]))
            throw Error("Invalid Format");
        var points = connectorObj["points"].map(function (pt) {
            _this.assert(pt["x"], "number");
            _this.assert(pt["y"], "number");
            return new point_1.Point(pt["x"], pt["y"]);
        });
        var connector = new Connector_1.Connector(points);
        connector.key = connectorObj["key"];
        if (typeof connectorObj["dataKey"] === "string" || typeof connectorObj["dataKey"] === "number")
            connector.dataKey = connectorObj["dataKey"];
        if (typeof connectorObj["customData"] === "object")
            connector.customData = Utils_1.ObjectUtils.cloneObject(connectorObj["customData"]);
        if (typeof connectorObj["locked"] === "boolean")
            connector.locked = connectorObj["locked"];
        connector.endConnectionPointIndex = typeof connectorObj["endConnectionPointIndex"] === "number" ? connectorObj["endConnectionPointIndex"] : -1;
        connector.beginConnectionPointIndex = typeof connectorObj["beginConnectionPointIndex"] === "number" ? connectorObj["beginConnectionPointIndex"] : -1;
        if (connectorObj["endItemKey"] !== undefined)
            this.assert(connectorObj["endItemKey"], "string");
        if (connectorObj["beginItemKey"] !== undefined)
            this.assert(connectorObj["beginItemKey"], "string");
        connector["endItemKey"] = connectorObj["endItemKey"];
        connector["beginItemKey"] = connectorObj["beginItemKey"];
        if (connectorObj["texts"])
            connector.texts.fromObject(connectorObj["texts"]);
        if (connectorObj["properties"])
            connector.properties.fromObject(connectorObj["properties"]);
        if (connectorObj["style"])
            connector.style.fromObject(connectorObj["style"]);
        if (connectorObj["styleText"])
            connector.styleText.fromObject(connectorObj["styleText"]);
        if (typeof connectorObj["zIndex"] === "number")
            connector.zIndex = connectorObj["zIndex"];
        return connector;
    };
    return Importer;
}(ImporterBase_1.ImporterBase));
exports.Importer = Importer;
//# sourceMappingURL=Importer.js.map