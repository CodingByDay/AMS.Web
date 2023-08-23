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
exports.IconToolbox = void 0;
var Toolbox_1 = require("./Toolbox");
var RenderHelper_1 = require("../RenderHelper");
var Shape_1 = require("../../Model/Shapes/Shape");
var unit_converter_1 = require("@devexpress/utils/lib/class/unit-converter");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var TextShapeDescription_1 = require("../../Model/Shapes/Descriptions/General/TextShapeDescription");
var Style_1 = require("../../Model/Style");
var CustomShapeDescription_1 = require("../../Model/Shapes/Descriptions/CustomShapeDescription");
var RectaglePrimitive_1 = require("../Primitives/RectaglePrimitive");
var DEFAULT_SHAPE_ICON_SIZE = 32;
var SHRINK_TEXT_SHAPE_ICON_SIZE = 26;
var SHRINKED_TEXT = "T";
var IconToolbox = (function (_super) {
    __extends(IconToolbox, _super);
    function IconToolbox(parent, readonly, allowDragging, shapeDescriptionManager, shapeTypes, getAllowedShapeTypes, options, measurer, instanceId) {
        var _this = _super.call(this, parent, readonly, allowDragging, shapeDescriptionManager, shapeTypes, getAllowedShapeTypes) || this;
        _this.options = options;
        _this.measurer = measurer;
        _this.instanceId = instanceId;
        return _this;
    }
    IconToolbox.prototype.createElements = function (element, shapeTypes) {
        var svgElement = document.createElementNS(RenderHelper_1.svgNS, "svg");
        svgElement.className.baseVal = "dxdi-canvas";
        element.appendChild(svgElement);
        this.drawShapeIcons(svgElement, shapeTypes, this.options.toolboxWidth || svgElement.getBoundingClientRect().width);
    };
    IconToolbox.prototype.drawShapeIcons = function (parent, shapeTypes, svgWidth) {
        var _this = this;
        var lineWidth = Style_1.DEFAULT_STROKE_WIDTH;
        var targetWidth = svgWidth - 2 * lineWidth;
        var shapeIconSize = this.options.shapeIconSize;
        if (!shapeIconSize && this.options.shapeIconSpacing && this.options.shapeIconCountInRow)
            shapeIconSize = Math.floor((targetWidth - (this.options.shapeIconCountInRow - 1) * this.options.shapeIconSpacing) / this.options.shapeIconCountInRow);
        if (!shapeIconSize)
            shapeIconSize = DEFAULT_SHAPE_ICON_SIZE;
        shapeIconSize = Math.max(shapeIconSize, this.options.shapeIconSpacing / 2);
        var width = shapeIconSize;
        var iconCountInRow = this.options.shapeIconCountInRow;
        if (!iconCountInRow) {
            iconCountInRow = 1;
            while (width < targetWidth) {
                width += this.options.shapeIconSpacing + shapeIconSize;
                if (width < targetWidth)
                    iconCountInRow++;
            }
        }
        var shapeIconSpacing = (iconCountInRow > 1) ? (targetWidth - shapeIconSize * iconCountInRow) / (iconCountInRow - 1) : 0;
        var xPos = lineWidth;
        var yPos = lineWidth;
        var size = unit_converter_1.UnitConverter.pixelsToTwips(shapeIconSize);
        shapeTypes.forEach(function (shapeType, index) {
            if (index > 0 && index % iconCountInRow === 0) {
                xPos = lineWidth;
                yPos += shapeIconSize + shapeIconSpacing;
            }
            var shapeDescription = _this.shapeDescriptionManager.get(shapeType);
            var shape = _this.createShape(shapeDescription, xPos, yPos, shapeIconSize < SHRINK_TEXT_SHAPE_ICON_SIZE);
            _this.updateShapeIconBounds(shape, shapeIconSize);
            var shapeEl = _this.drawShape(parent, shape);
            _this.drawSelector(shapeEl, unit_converter_1.UnitConverter.pixelsToTwips(xPos), unit_converter_1.UnitConverter.pixelsToTwips(yPos), size);
            xPos += shapeIconSize + shapeIconSpacing;
        });
        parent.style.height = yPos + shapeIconSize + lineWidth + "px";
        parent.style.width = svgWidth + "px";
    };
    IconToolbox.prototype.drawShape = function (parent, shape) {
        var _this = this;
        var primitives = shape.description.createPrimitives(shape, this.instanceId, true);
        var gEl = document.createElementNS(RenderHelper_1.svgNS, "g");
        gEl.setAttribute("data-tb-type", shape.description.key.toString());
        gEl.setAttribute("class", "toolbox-item");
        gEl.setAttribute("title", shape.description.getTitle());
        if (this.options.shapeIconAttributes)
            for (var key in this.options.shapeIconAttributes)
                if (Object.prototype.hasOwnProperty.call(this.options.shapeIconAttributes, key))
                    gEl.setAttribute(key, this.options.shapeIconAttributes[key]);
        parent.appendChild(gEl);
        primitives.forEach(function (pr) {
            var el = pr.createElement(function (e) { return gEl.appendChild(e); });
            pr.applyElementProperties(el, _this.measurer);
        });
        return gEl;
    };
    IconToolbox.prototype.drawSelector = function (parent, x, y, size) {
        var _this = this;
        var selectorRect = new RectaglePrimitive_1.RectanglePrimitive(x, y, size, size, undefined, "selector");
        selectorRect.createElement(function (el) {
            selectorRect.applyElementProperties(el, _this.measurer);
            parent.appendChild(el);
        });
    };
    IconToolbox.prototype.createShape = function (shapeDescription, xPos, yPos, shrinkText) {
        var xPosT = unit_converter_1.UnitConverter.pixelsToTwips(xPos);
        var yPosT = unit_converter_1.UnitConverter.pixelsToTwips(yPos);
        var shape = new Shape_1.Shape(shapeDescription, new point_1.Point(xPosT, yPosT), true);
        if (this.needResetShapeText(shapeDescription))
            shape.text = "";
        else if (shrinkText)
            shape.text = SHRINKED_TEXT;
        return shape;
    };
    IconToolbox.prototype.needResetShapeText = function (shapeDescription) {
        if (shapeDescription instanceof TextShapeDescription_1.TextShapeDescription)
            return false;
        if (shapeDescription instanceof CustomShapeDescription_1.CustomShapeDescription && shapeDescription.baseDescription instanceof TextShapeDescription_1.TextShapeDescription)
            return false;
        return true;
    };
    IconToolbox.prototype.updateShapeIconBounds = function (shape, shapeIconSize) {
        var shapeSizeT = unit_converter_1.UnitConverter.pixelsToTwips(shapeIconSize);
        shape.size.height = shape.size.width * shape.getToolboxHeightToWidthRatio();
        if (shape.size.width > shape.size.height) {
            var ratio = shape.size.height / shape.size.width;
            shape.size.width = shapeSizeT;
            shape.size.height = shapeSizeT * ratio;
            shape.position.y = shape.position.y + (shapeSizeT - shape.size.height) / 2;
            shape.parameters.forEach(function (p) { p.value = p.value * shapeSizeT / shape.description.defaultSize.width; });
        }
        else if (shape.size.width < shape.size.height) {
            var ratio = shape.size.width / shape.size.height;
            shape.size.height = shapeSizeT;
            shape.size.width = shapeSizeT * ratio;
            shape.position.x = shape.position.x + (shapeSizeT - shape.size.width) / 2;
            shape.parameters.forEach(function (p) { p.value = p.value * shapeSizeT / shape.description.defaultSize.height; });
        }
        else {
            shape.size.width = shapeSizeT;
            shape.size.height = shapeSizeT;
            shape.parameters.forEach(function (p) { p.value = p.value * shapeSizeT / shape.description.defaultSize.width; });
        }
    };
    IconToolbox.prototype.createDraggingElement = function (draggingObject) {
        var element = document.createElement("DIV");
        element.setAttribute("class", "dxdi-toolbox-drag-item");
        document.body.appendChild(element);
        var svgElement = document.createElementNS(RenderHelper_1.svgNS, "svg");
        svgElement.className.baseVal = "dxdi-canvas";
        element.appendChild(svgElement);
        var shapeDescription = this.shapeDescriptionManager.get(draggingObject.evt.data);
        var shape = this.createShape(shapeDescription, Style_1.DEFAULT_STROKE_WIDTH, Style_1.DEFAULT_STROKE_WIDTH);
        this.drawShape(svgElement, shape);
        element.style.width = unit_converter_1.UnitConverter.twipsToPixels(shape.size.width) + 2 * Style_1.DEFAULT_STROKE_WIDTH + "px";
        element.style.height = unit_converter_1.UnitConverter.twipsToPixels(shape.size.height) + 2 * Style_1.DEFAULT_STROKE_WIDTH + "px";
        return element;
    };
    return IconToolbox;
}(Toolbox_1.Toolbox));
exports.IconToolbox = IconToolbox;
//# sourceMappingURL=IconToolbox.js.map