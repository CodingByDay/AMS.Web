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
exports.CardBaseDescription = void 0;
var ShapeDescription_1 = require("../ShapeDescription");
var rectangle_1 = require("@devexpress/utils/lib/geometry/rectangle");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var ShapeWithImageDescription_1 = require("../ShapeWithImageDescription");
var RoundedRectanglePrimitive_1 = require("../../../../Render/Primitives/RoundedRectanglePrimitive");
var PathPrimitive_1 = require("../../../../Render/Primitives/PathPrimitive");
var GroupPrimitive_1 = require("../../../../Render/Primitives/GroupPrimitive");
var ShapeImageIndicator_1 = require("../../../../Render/ShapeImageIndicator");
var ShapeTypes_1 = require("../../ShapeTypes");
var LocalizationService_1 = require("../../../../LocalizationService");
var unit_converter_1 = require("@devexpress/utils/lib/class/unit-converter");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var CardBaseDescription = (function (_super) {
    __extends(CardBaseDescription, _super);
    function CardBaseDescription(defaultSize) {
        if (defaultSize === void 0) { defaultSize = new size_1.Size(ShapeDescription_1.ShapeDefaultDimension, 26 / 46 * ShapeDescription_1.ShapeDefaultDimension); }
        return _super.call(this, defaultSize, true) || this;
    }
    Object.defineProperty(CardBaseDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    CardBaseDescription.prototype.getDefaultText = function () {
        return LocalizationService_1.DiagramLocalizationService.shapeTexts[ShapeTypes_1.ShapeTypes.Card];
    };
    CardBaseDescription.prototype.createShapePrimitives = function (shape, forToolbox) {
        var _a = shape.rectangle, left = _a.x, top = _a.y, width = _a.width, height = _a.height;
        return [
            new RoundedRectanglePrimitive_1.RoundedRectanglePrimitive(left, top, width, height, (forToolbox) ? 30 : 60, (forToolbox) ? 30 : 60, shape.style)
        ];
    };
    CardBaseDescription.prototype.createImagePlaceholder = function (rect) {
        return [
            new RoundedRectanglePrimitive_1.RoundedRectanglePrimitive(rect.x, rect.y, rect.width, rect.height, unit_converter_1.UnitConverter.pixelsToTwips(2), unit_converter_1.UnitConverter.pixelsToTwips(2), undefined, ShapeWithImageDescription_1.SHAPE_IMAGE_CLASSNAMES.IMAGE_PLACEHOLDER)
        ];
    };
    CardBaseDescription.prototype.createEmptyImagePrimitive = function (rect) {
        return ShapeImageIndicator_1.ShapeImageIndicator.createUserIconPrimitives(rect.x, rect.y, this.defaultIconSize, unit_converter_1.UnitConverter.pixelsToTwips(1), ShapeWithImageDescription_1.SHAPE_IMAGE_CLASSNAMES.USER_PIC);
    };
    CardBaseDescription.prototype.createWarningPrimitive = function (rect) {
        return ShapeImageIndicator_1.ShapeImageIndicator.createWarningIconPrimitives(rect.x + this.defaultIconSize / 2, rect.y + this.defaultIconSize / 2, this.defaultIconSize / 2, ShapeWithImageDescription_1.SHAPE_IMAGE_CLASSNAMES.WARNING_MARK);
    };
    CardBaseDescription.prototype.getTextRectangle = function (shape) {
        var rect = shape.rectangle;
        var textRectangle = rect.clone().inflate(-ShapeDescription_1.ShapeTextPadding, -ShapeDescription_1.ShapeTextPadding);
        var imgBlockSize = this.getImageSize(rect.createSize(), true);
        if (this.isTextAfterImage)
            textRectangle.moveRectangle(this.isHorizontal ? imgBlockSize.width : 0, this.isHorizontal ? 0 : imgBlockSize.height);
        textRectangle.resize(this.isHorizontal ? -imgBlockSize.width : 0, this.isHorizontal ? 0 : -imgBlockSize.height);
        return textRectangle.nonNegativeSize();
    };
    CardBaseDescription.prototype.getSizeByText = function (textSize, _shape) {
        var size = textSize.clone().offset(ShapeDescription_1.ShapeTextPadding * 2, ShapeDescription_1.ShapeTextPadding * 2);
        var imgBlockSize = this.getImageSizeByTextBlockSize(size);
        if (this.isHorizontal)
            size.width += imgBlockSize.width;
        else
            size.height += imgBlockSize.height;
        return size;
    };
    CardBaseDescription.prototype.createTextPrimitives = function (shape, forToolbox) {
        if (forToolbox)
            return this.createGraphicalTextRepresentation(shape.rectangle);
        else
            return _super.prototype.createTextPrimitives.call(this, shape, forToolbox);
    };
    CardBaseDescription.prototype.createGraphicalTextRepresentation = function (rect) {
        var textRect = new rectangle_1.Rectangle(0, 0, 0, 0);
        var imgBlockSize = this.getImageSize(rect.createSize(), true, true);
        if (this.isHorizontal) {
            var horizontalShift = this.isTextAfterImage ? rect.width / 2 - unit_converter_1.UnitConverter.pixelsToTwips(2) : 0;
            textRect.x = rect.x + horizontalShift + unit_converter_1.UnitConverter.pixelsToTwips(4);
            textRect.y = rect.y + unit_converter_1.UnitConverter.pixelsToTwips(5);
            textRect.width = imgBlockSize.width - unit_converter_1.UnitConverter.pixelsToTwips(4);
            textRect.height = rect.height - unit_converter_1.UnitConverter.pixelsToTwips(6);
        }
        else {
            var verticalShift = this.isTextAfterImage ? rect.height / 2 - unit_converter_1.UnitConverter.pixelsToTwips(2) : 0;
            textRect.x = rect.x + rect.width / 4;
            textRect.y = rect.y + verticalShift + unit_converter_1.UnitConverter.pixelsToTwips(4);
            textRect.width = rect.width / 2;
            textRect.height = imgBlockSize.height - unit_converter_1.UnitConverter.pixelsToTwips(2);
        }
        return this.createTextRepresentationPrimitives(textRect);
    };
    CardBaseDescription.prototype.getImagePlacementRectangle = function (rect, forToolbox) {
        var imageSize = this.getImageSize(rect.createSize(), false, forToolbox);
        var imageRectangle = rectangle_1.Rectangle.fromGeometry(new point_1.Point(rect.x, rect.y), imageSize);
        var imgBlockSize = this.getImageSize(rect.createSize(), true, forToolbox);
        if (this.isHorizontal && this.isTextAfterImage)
            imageRectangle.x += this.getImageMargin(forToolbox);
        else if (this.isHorizontal)
            imageRectangle.x = rect.right - imgBlockSize.width - this.getImageMargin(forToolbox);
        if (!this.isHorizontal && !this.isTextAfterImage)
            imageRectangle.y = rect.bottom - imgBlockSize.height - this.getImageMargin(forToolbox);
        else
            imageRectangle.y += this.getImageMargin(forToolbox);
        if (!this.isHorizontal)
            imageRectangle.x += (rect.width - imageRectangle.width) / 2;
        return imageRectangle;
    };
    CardBaseDescription.prototype.createTextRepresentationPrimitives = function (rect) {
        var lineHeight = unit_converter_1.UnitConverter.pixelsToTwips(unit_converter_1.UnitConverter.twipsToPixels(rect.height / 3));
        return [
            new GroupPrimitive_1.GroupPrimitive([
                new PathPrimitive_1.PathPrimitive([
                    new PathPrimitive_1.PathPrimitiveMoveToCommand(rect.x, rect.y),
                    new PathPrimitive_1.PathPrimitiveLineToCommand(rect.x + rect.width, rect.y)
                ]),
                new PathPrimitive_1.PathPrimitive([
                    new PathPrimitive_1.PathPrimitiveMoveToCommand(rect.x, rect.y + lineHeight),
                    new PathPrimitive_1.PathPrimitiveLineToCommand(rect.x + rect.width, rect.y + lineHeight)
                ]),
                new PathPrimitive_1.PathPrimitive([
                    new PathPrimitive_1.PathPrimitiveMoveToCommand(rect.x, rect.y + lineHeight * 2),
                    new PathPrimitive_1.PathPrimitiveLineToCommand(rect.x + rect.width * 0.66, rect.y + lineHeight * 2)
                ])
            ], "dxdi-shape-text")
        ];
    };
    return CardBaseDescription;
}(ShapeWithImageDescription_1.ShapeWithImageDescription));
exports.CardBaseDescription = CardBaseDescription;
//# sourceMappingURL=CardBaseDescription.js.map