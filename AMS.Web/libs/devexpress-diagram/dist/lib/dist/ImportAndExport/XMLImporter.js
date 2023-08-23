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
exports.XmlImporter = void 0;
var Connector_1 = require("../Model/Connectors/Connector");
var Shape_1 = require("../Model/Shapes/Shape");
var ImporterBase_1 = require("./ImporterBase");
var ShapeTypes_1 = require("../Model/Shapes/ShapeTypes");
var ShapeDescriptionManager_1 = require("../Model/Shapes/Descriptions/ShapeDescriptionManager");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var ImportUtils_1 = require("./ImportUtils");
var color_1 = require("@devexpress/utils/lib/utils/color");
var unit_converter_1 = require("@devexpress/utils/lib/class/unit-converter");
var XmlImporter = (function (_super) {
    __extends(XmlImporter, _super);
    function XmlImporter(shapeDescriptionManager, xml) {
        var _this = _super.call(this, shapeDescriptionManager) || this;
        _this.doc = ImportUtils_1.ImportUtils.createDocument(xml);
        return _this;
    }
    XmlImporter.prototype.getObject = function () {
        return this.doc;
    };
    XmlImporter.prototype.getPageObject = function (obj) {
        var pageElements = this.doc.querySelectorAll("[ItemKind='DiagramRoot']");
        return pageElements && pageElements[0];
    };
    XmlImporter.prototype.getShapeObjects = function (obj) {
        var shapeObjs = [];
        this.doc.querySelectorAll("[ItemKind='DiagramRoot'] > Children > [ItemKind='DiagramShape']").forEach(function (obj) { shapeObjs.push(obj); });
        this.doc.querySelectorAll("[ItemKind='DiagramRoot'] > Children > [ItemKind='DiagramContainer']").forEach(function (obj) { shapeObjs.push(obj); });
        return shapeObjs;
    };
    XmlImporter.prototype.getConnectorObjects = function (obj) {
        var connectorObjs = [];
        this.doc.querySelectorAll("[ItemKind='DiagramRoot'] > Children > [ItemKind='DiagramConnector']").forEach(function (obj) { connectorObjs.push(obj); });
        return connectorObjs;
    };
    XmlImporter.prototype.importPageSettings = function (model, pageObj) {
        if (!pageObj)
            return;
        var pageSizeAttr = pageObj.getAttribute("PageSize");
        var pageSize = this.getSize(pageSizeAttr);
        if (pageSize) {
            model.size = pageSize.clone();
            model.pageSize = pageSize.clone();
        }
    };
    XmlImporter.prototype.importShape = function (shapeObj) {
        var positionAttr = shapeObj.getAttribute("Position");
        var position = this.getPoint(positionAttr);
        var shapeAttr = shapeObj.getAttribute("Shape");
        var shapeType = this.getShapeType(shapeAttr);
        var description = this.shapeDescriptionManager.get(shapeType);
        var shape = new Shape_1.Shape(description || ShapeDescriptionManager_1.ShapeDescriptionManager.default, position);
        shape.key = this.getItemKey(shapeObj);
        var sizeAttr = shapeObj.getAttribute("Size");
        var size = this.getSize(sizeAttr);
        if (size)
            shape.size = size;
        var contentAttr = shapeObj.getAttribute("Content");
        if (typeof contentAttr === "string")
            shape.text = contentAttr;
        else {
            var headerAttr = shapeObj.getAttribute("Header");
            if (typeof headerAttr === "string")
                shape.text = headerAttr;
        }
        this.importStyle(shapeObj, shape);
        return shape;
    };
    XmlImporter.prototype.importShapeChildren = function (shapeObj, shape) {
        var childShapeObjs = [];
        shapeObj.setAttribute("dxDiagram", "");
        this.doc.querySelectorAll("[dxDiagram] > Children > [ItemKind='DiagramShape']").forEach(function (obj) { childShapeObjs.push(obj); });
        this.doc.querySelectorAll("[dxDiagram] > Children > [ItemKind='DiagramContainer']").forEach(function (obj) { childShapeObjs.push(obj); });
        shapeObj.removeAttribute("dxDiagram");
        var result = [];
        if (!childShapeObjs)
            return result;
        for (var i = 0; i < childShapeObjs.length; i++) {
            var childShapeObj = childShapeObjs[i];
            var childShape = this.importShape(childShapeObj);
            childShape.key = shape.key + "," + childShape.key;
            var rect = shape.clientRectangle;
            childShape.position = childShape.position.clone().offset(rect.x, rect.y);
            if (!shape["childKeys"])
                shape["childKeys"] = [];
            shape["childKeys"].push(childShape.key);
            result.push(childShape);
            result = result.concat(this.importShapeChildren(childShapeObj, childShape));
        }
        return result;
    };
    XmlImporter.prototype.importConnector = function (connectorObj) {
        var _this = this;
        var points = [];
        var beginPointAttr = connectorObj.getAttribute("BeginPoint");
        var beginPoint = this.getPoint(beginPointAttr);
        if (beginPoint)
            points.push(beginPoint);
        var pointsAttr = connectorObj.getAttribute("Points");
        pointsAttr.split(" ").forEach(function (pointAttr) {
            var point = _this.getPoint(pointAttr);
            if (point)
                points.push(point);
        });
        var endPointAttr = connectorObj.getAttribute("EndPoint");
        var endPoint = this.getPoint(endPointAttr);
        if (endPoint)
            points.push(endPoint);
        var connector = new Connector_1.Connector(points);
        connector.key = this.getItemKey(connectorObj);
        var endItemPointIndexAttr = connectorObj.getAttribute("EndItemPointIndex");
        var endItemPointIndex = parseInt(endItemPointIndexAttr);
        connector.endConnectionPointIndex = !isNaN(endItemPointIndex) ? endItemPointIndex : -1;
        var beginItemPointIndexAttr = connectorObj.getAttribute("BeginItemPointIndex");
        var beginItemPointIndex = parseInt(beginItemPointIndexAttr);
        connector.beginConnectionPointIndex = !isNaN(beginItemPointIndex) ? beginItemPointIndex : -1;
        var endItemAttr = connectorObj.getAttribute("EndItem");
        if (endItemAttr !== undefined)
            this.assert(endItemAttr, "string");
        var beginItemAttr = connectorObj.getAttribute("BeginItem");
        if (beginItemAttr !== undefined)
            this.assert(beginItemAttr, "string");
        connector["endItemKey"] = endItemAttr;
        connector["beginItemKey"] = beginItemAttr;
        var contentAttr = connectorObj.getAttribute("Content");
        if (typeof contentAttr === "string")
            connector.setText(contentAttr);
        this.importStyle(connectorObj, connector);
        return connector;
    };
    XmlImporter.prototype.importStyle = function (obj, item) {
        var backgroundAttr = obj.getAttribute("Background");
        if (typeof backgroundAttr === "string")
            item.style["fill"] = this.getColor(backgroundAttr);
        var strokeAttr = obj.getAttribute("Stroke");
        if (typeof strokeAttr === "string")
            item.style["stroke"] = this.getColor(strokeAttr);
        var foregroundAttr = obj.getAttribute("Foreground");
        if (typeof foregroundAttr === "string")
            item.styleText["fill"] = this.getColor(foregroundAttr);
        var fontFamilyAttr = obj.getAttribute("FontFamily");
        if (typeof fontFamilyAttr === "string")
            item.styleText["font-family"] = fontFamilyAttr;
        var fontSizeAttr = obj.getAttribute("FontSize");
        if (typeof fontSizeAttr === "string")
            item.styleText["font-size"] = fontSizeAttr;
        var fontWeightAttr = obj.getAttribute("FontWeight");
        if (fontWeightAttr === "Bold")
            item.styleText["font-weight"] = "bold";
        var fontStyleAttr = obj.getAttribute("FontStyle");
        if (fontStyleAttr === "Italic")
            item.styleText["font-style"] = "italic";
        var textDecorationsAttr = obj.getAttribute("TextDecorations");
        if (textDecorationsAttr === "Underline")
            item.styleText["text-decoration"] = "underline";
        var textAlignmentAttr = obj.getAttribute("TextAlignment");
        if (textAlignmentAttr === "Left")
            item.styleText["text-anchor"] = "start";
        else if (textAlignmentAttr === "Right")
            item.styleText["text-anchor"] = "end";
        else if (textAlignmentAttr === "Center")
            item.styleText["text-anchor"] = "middle";
    };
    XmlImporter.prototype.getShapeType = function (shapeAttr) {
        if (XmlImporter.shapeTypes[shapeAttr])
            return XmlImporter.shapeTypes[shapeAttr];
        if (shapeAttr && shapeAttr.toLowerCase().indexOf("container") > -1)
            return ShapeTypes_1.ShapeTypes.VerticalContainer;
        return ShapeTypes_1.ShapeTypes.Rectangle;
    };
    XmlImporter.prototype.getItemKey = function (obj) {
        return (parseInt(obj.tagName.replace("Item", "")) - 1).toString();
    };
    XmlImporter.prototype.getNumbers = function (s) {
        var parts = s.split(",");
        return parts && parts.length ? parts.map(function (part) { return +part; }) : [];
    };
    XmlImporter.prototype.getSize = function (attrValue) {
        if (attrValue) {
            var numbers = this.getNumbers(attrValue);
            if (numbers.length >= 2) {
                this.assert(numbers[0], "number");
                this.assert(numbers[1], "number");
                return new size_1.Size(unit_converter_1.UnitConverter.pixelsToTwips(numbers[0]), unit_converter_1.UnitConverter.pixelsToTwips(numbers[1]));
            }
        }
    };
    XmlImporter.prototype.getPoint = function (attrValue) {
        if (attrValue) {
            var numbers = this.getNumbers(attrValue);
            if (numbers.length >= 2) {
                this.assert(numbers[0], "number");
                this.assert(numbers[1], "number");
                return new point_1.Point(unit_converter_1.UnitConverter.pixelsToTwips(numbers[0]), unit_converter_1.UnitConverter.pixelsToTwips(numbers[1]));
            }
        }
    };
    XmlImporter.prototype.getColor = function (attrValue) {
        attrValue = attrValue.charAt(0) === "#" ? attrValue.substr(1) : attrValue;
        var color = parseInt(attrValue, 16);
        return !isNaN(color) ? color_1.ColorUtils.colorToHash(color) : undefined;
    };
    XmlImporter.shapeTypes = {
        "BasicShapes.Rectangle": ShapeTypes_1.ShapeTypes.Rectangle,
        "BasicShapes.Ellipse": ShapeTypes_1.ShapeTypes.Ellipse,
        "BasicShapes.Triangle": ShapeTypes_1.ShapeTypes.Triangle,
        "BasicShapes.Pentagon": ShapeTypes_1.ShapeTypes.Pentagon,
        "BasicShapes.Hexagon": ShapeTypes_1.ShapeTypes.Hexagon,
        "BasicShapes.Octagon": ShapeTypes_1.ShapeTypes.Octagon,
        "BasicShapes.Diamond": ShapeTypes_1.ShapeTypes.Diamond,
        "BasicShapes.Cross": ShapeTypes_1.ShapeTypes.Cross,
        "BasicShapes.Star5": ShapeTypes_1.ShapeTypes.Star,
        "BasicFlowchartShapes.StartEnd": ShapeTypes_1.ShapeTypes.Terminator,
        "BasicFlowchartShapes.Data": ShapeTypes_1.ShapeTypes.Data,
        "BasicFlowchartShapes.Database": ShapeTypes_1.ShapeTypes.Database,
        "BasicFlowchartShapes.ExternalData": ShapeTypes_1.ShapeTypes.StoredData,
        "BasicFlowchartShapes.Process": ShapeTypes_1.ShapeTypes.Process,
        "BasicFlowchartShapes.Decision": ShapeTypes_1.ShapeTypes.Decision,
        "BasicFlowchartShapes.Subprocess": ShapeTypes_1.ShapeTypes.PredefinedProcess,
        "BasicFlowchartShapes.Document": ShapeTypes_1.ShapeTypes.Document,
        "BasicFlowchartShapes.Custom1": ShapeTypes_1.ShapeTypes.ManualInput,
        "BasicFlowchartShapes.Custom2": ShapeTypes_1.ShapeTypes.ManualOperation,
        "ArrowShapes.SimpleArrow": ShapeTypes_1.ShapeTypes.ArrowLeft,
        "ArrowShapes.SimpleDoubleArrow": ShapeTypes_1.ShapeTypes.ArrowLeftRight
    };
    return XmlImporter;
}(ImporterBase_1.ImporterBase));
exports.XmlImporter = XmlImporter;
//# sourceMappingURL=XMLImporter.js.map