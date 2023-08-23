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
exports.CustomShapeDescription = void 0;
var ImagePrimitive_1 = require("../../../Render/Primitives/ImagePrimitive");
var rectangle_1 = require("@devexpress/utils/lib/geometry/rectangle");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var ConnectionPoint_1 = require("../../ConnectionPoint");
var DiagramItem_1 = require("../../DiagramItem");
var ShapeWithImageDescription_1 = require("./ShapeWithImageDescription");
var ShapeDescription_1 = require("./ShapeDescription");
var ImageInfo_1 = require("../../../Images/ImageInfo");
var ImageCache_1 = require("../../../Images/ImageCache");
var ImageLoader_1 = require("../../../Images/ImageLoader");
var SvgElementPrimitive_1 = require("../../../Render/Primitives/SvgElementPrimitive");
var CustomShapeDescription = (function (_super) {
    __extends(CustomShapeDescription, _super);
    function CustomShapeDescription(properties, baseDescription) {
        var _this = _super.call(this, new size_1.Size(properties.defaultWidth || baseDescription && baseDescription.defaultSize.width || ShapeDescription_1.ShapeDefaultDimension, properties.defaultHeight || baseDescription && baseDescription.defaultSize.height || ShapeDescription_1.ShapeDefaultDimension)) || this;
        _this.properties = properties;
        _this.baseDescription = baseDescription;
        _this.imageLoader = new ImageLoader_1.ImageLoader(_this.updateSvgImage.bind(_this));
        _this.defaultText = properties.defaultText !== undefined ? properties.defaultText : baseDescription && baseDescription.getDefaultText();
        _this.defaultImageUrl = properties.defaultImageUrl || baseDescription && baseDescription.getDefaultImageUrl();
        _this.title = properties.title || baseDescription && baseDescription.getTitle() || _this.defaultText || "";
        _this.connectionPoints = _this.createConnectionPoints();
        if (properties.svgUrl) {
            _this.svgImage = new ImageInfo_1.ImageInfo(properties.svgUrl);
            var cachedImage = ImageCache_1.ImageCache.instance.createUnloadedInfoByShapeImageInfo(_this.svgImage);
            _this.imageLoader.load(cachedImage);
        }
        if (properties.svgToolboxUrl) {
            _this.svgToolboxImage = new ImageInfo_1.ImageInfo(properties.svgToolboxUrl);
            var cachedImage = ImageCache_1.ImageCache.instance.createUnloadedInfoByShapeImageInfo(_this.svgToolboxImage);
            _this.imageLoader.load(cachedImage);
        }
        return _this;
    }
    Object.defineProperty(CustomShapeDescription.prototype, "key", {
        get: function () { return this.properties.type; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomShapeDescription.prototype, "allowEditText", {
        get: function () { return this.properties.allowEditText !== false; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomShapeDescription.prototype, "allowEditImage", {
        get: function () { return this.baseDescription ? this.baseDescription.allowEditImage : this.properties.allowEditImage === true; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomShapeDescription.prototype, "enableChildren", {
        get: function () { return this.baseDescription && this.baseDescription.enableChildren; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomShapeDescription.prototype, "hasTemplate", {
        get: function () { return !!this.properties.createTemplate; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomShapeDescription.prototype, "minWidth", {
        get: function () { return this.properties.minWidth || this.baseDescription && this.baseDescription.minWidth; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomShapeDescription.prototype, "minHeight", {
        get: function () { return this.properties.minHeight || this.baseDescription && this.baseDescription.minHeight; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomShapeDescription.prototype, "maxWidth", {
        get: function () { return this.properties.maxWidth || this.baseDescription && this.baseDescription.maxWidth; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomShapeDescription.prototype, "maxHeight", {
        get: function () { return this.properties.maxHeight || this.baseDescription && this.baseDescription.maxHeight; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomShapeDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return this.properties.keepRatioOnAutoSize; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomShapeDescription.prototype, "toolboxSize", {
        get: function () {
            if (this.properties.toolboxWidthToHeightRatio)
                return new size_1.Size(this.defaultSize.width, this.defaultSize.width / this.properties.toolboxWidthToHeightRatio);
            return this.defaultSize;
        },
        enumerable: false,
        configurable: true
    });
    CustomShapeDescription.prototype.getTextAngle = function () {
        return (this.baseDescription && this.baseDescription.getTextAngle()) || _super.prototype.getTextAngle.call(this);
    };
    CustomShapeDescription.prototype.getTitle = function () {
        return this.title !== undefined ? this.title : _super.prototype.getTitle.call(this);
    };
    CustomShapeDescription.prototype.getDefaultText = function () {
        return this.defaultText !== undefined ? this.defaultText : _super.prototype.getDefaultText.call(this);
    };
    CustomShapeDescription.prototype.getDefaultImageUrl = function () {
        return this.defaultImageUrl !== undefined ? this.defaultImageUrl : _super.prototype.getDefaultImageUrl.call(this);
    };
    CustomShapeDescription.prototype.allowResizeHorizontally = function (shape) {
        if (this.properties.allowResize === false)
            return false;
        if (this.baseDescription)
            return this.baseDescription.allowResizeHorizontally(shape);
        return _super.prototype.allowResizeHorizontally.call(this, shape);
    };
    CustomShapeDescription.prototype.allowResizeVertically = function (shape) {
        if (this.properties.allowResize === false)
            return false;
        if (this.baseDescription)
            return this.baseDescription.allowResizeVertically(shape);
        return _super.prototype.allowResizeVertically.call(this, shape);
    };
    CustomShapeDescription.prototype.createConnectionPoints = function () {
        if (this.properties && this.properties.connectionPoints && this.properties.connectionPoints.length)
            return this.properties.connectionPoints.map(function (ptObj) {
                if (ptObj && typeof ptObj["x"] === "number" && typeof ptObj["y"] === "number") {
                    var side = typeof ptObj["side"] === "number" ? ptObj["side"] : DiagramItem_1.ConnectionPointSide.Undefined;
                    return new ConnectionPoint_1.ConnectionPoint(ptObj["x"], ptObj["y"], side);
                }
            }).filter(function (pt) { return pt; });
        return _super.prototype.createConnectionPoints.call(this);
    };
    CustomShapeDescription.prototype.getConnectionPointSides = function () {
        var result = {};
        for (var i = 0; i < this.connectionPoints.length; i++) {
            var pointSide = ShapeDescription_1.ShapeDescription.getConnectionPointSideByGeometry(this.connectionPoints[i]);
            if (!result[pointSide])
                result[pointSide] = [];
            result[pointSide].push(i);
        }
        return result;
    };
    CustomShapeDescription.prototype.getConnectionPointIndexForSide = function (side) {
        var connectionPointSides = this.getConnectionPointSides();
        var pointIndexes = connectionPointSides[side];
        if (pointIndexes) {
            var index = Math.floor(pointIndexes.length / 2);
            if (pointIndexes.length % 2 === 0)
                index--;
            return pointIndexes[index];
        }
        else {
            pointIndexes = connectionPointSides[(side + 1) % 4];
            if (pointIndexes)
                return pointIndexes[0];
            else {
                pointIndexes = connectionPointSides[(side + 3) % 4];
                if (pointIndexes)
                    return pointIndexes[pointIndexes.length - 1];
                else {
                    pointIndexes = connectionPointSides[(side + 2) % 4];
                    if (pointIndexes)
                        return pointIndexes[0];
                }
            }
        }
        return side;
    };
    CustomShapeDescription.prototype.createImagePrimitives = function (shape, forToolbox) {
        if (this.baseDescription)
            return this.baseDescription.createImagePrimitives(shape, forToolbox);
        return _super.prototype.createImagePrimitives.call(this, shape, forToolbox);
    };
    CustomShapeDescription.prototype.createShapePrimitives = function (shape, forToolbox) {
        var primitives = [];
        var _a = shape.rectangle, left = _a.x, top = _a.y, width = _a.width, height = _a.height;
        if (this.baseDescription)
            primitives = this.baseDescription.createShapePrimitives(shape, forToolbox);
        else {
            var svgImage = forToolbox && this.svgToolboxImage ? this.svgToolboxImage : this.svgImage;
            if (svgImage) {
                var svgLeft = left + (this.properties.svgLeft && !forToolbox ? this.properties.svgLeft * width : 0);
                var svgTop = top + (this.properties.svgTop && !forToolbox ? this.properties.svgTop * height : 0);
                var svgWidth = this.properties.svgWidth && !forToolbox ? this.properties.svgWidth * width : width;
                var svgHeight = this.properties.svgHeight && !forToolbox ? this.properties.svgHeight * height : height;
                primitives = primitives.concat([
                    new ImagePrimitive_1.ImagePrimitive(svgLeft, svgTop, svgWidth, svgHeight, svgImage.exportUrl)
                ]);
            }
        }
        var createTemplate = forToolbox && this.properties.createToolboxTemplate || this.properties.createTemplate;
        if (createTemplate) {
            var templateLeft = left + (this.properties.templateLeft && !forToolbox ? this.properties.templateLeft * width : 0);
            var templateTop = top + (this.properties.templateTop && !forToolbox ? this.properties.templateTop * height : 0);
            var templateWidth = this.properties.templateWidth && !forToolbox ? this.properties.templateWidth * width : width;
            var templateHeight = this.properties.templateHeight && !forToolbox ? this.properties.templateHeight * height : height;
            var nativeShape = this.properties.apiController ? this.properties.apiController.createNativeShape(shape) : shape.toNative();
            primitives = primitives.concat([
                new SvgElementPrimitive_1.SvgElementPrimitive(templateLeft, templateTop, templateWidth, templateHeight, createTemplate, this.properties.destroyTemplate, nativeShape)
            ]);
        }
        return primitives;
    };
    CustomShapeDescription.prototype.createParameters = function (parameters) {
        if (this.baseDescription)
            return this.baseDescription.createParameters(parameters);
        else
            return _super.prototype.createParameters.call(this, parameters);
    };
    CustomShapeDescription.prototype.normalizeParameters = function (shape, parameters) {
        if (this.baseDescription)
            this.baseDescription.normalizeParameters(shape, parameters);
        else
            _super.prototype.normalizeParameters.call(this, shape, parameters);
    };
    CustomShapeDescription.prototype.modifyParameters = function (shape, parameters, deltaX, deltaY) {
        if (this.baseDescription)
            this.baseDescription.modifyParameters(shape, parameters, deltaX, deltaY);
        else
            _super.prototype.modifyParameters.call(this, shape, parameters, deltaX, deltaY);
    };
    CustomShapeDescription.prototype.getParameterPoints = function (shape) {
        if (this.baseDescription)
            return this.baseDescription.getParameterPoints(shape);
        else
            return _super.prototype.getParameterPoints.call(this, shape);
    };
    CustomShapeDescription.prototype.getTextRectangle = function (shape) {
        if (this.baseDescription)
            return this.baseDescription.getTextRectangle(shape);
        else {
            var _a = shape.rectangle, left = _a.x, top_1 = _a.y, width = _a.width, height = _a.height;
            return new rectangle_1.Rectangle(left + (this.properties.textLeft ? this.properties.textLeft * width : 0), top_1 + (this.properties.textTop ? this.properties.textTop * height : 0), this.properties.textWidth ? this.properties.textWidth * width : width, this.properties.textHeight ? this.properties.textHeight * height : height);
        }
    };
    CustomShapeDescription.prototype.getSizeByText = function (textSize, shape) {
        if (this.baseDescription)
            return this.baseDescription.getSizeByText(textSize, shape);
        else {
            var textWidth = this.properties.textWidth;
            if (!textWidth)
                textWidth = 1;
            var textHeight = this.properties.textHeight;
            if (!textHeight)
                textHeight = 1;
            return new size_1.Size(textSize.width / textWidth, textSize.height / textHeight);
        }
    };
    CustomShapeDescription.prototype.getImageSize = function (shapeSize, includeMargins, forToolbox) {
        if (this.baseDescription) {
            if (this.baseDescription instanceof ShapeWithImageDescription_1.ShapeWithImageDescription)
                return this.baseDescription.getImageSize(shapeSize, includeMargins, forToolbox);
            return size_1.Size.empty();
        }
        return new size_1.Size(this.properties.imageWidth ? this.properties.imageWidth * shapeSize.width : shapeSize.width, this.properties.imageHeight ? this.properties.imageHeight * shapeSize.height : shapeSize.height)
            .nonNegativeSize();
    };
    CustomShapeDescription.prototype.getImagePlacementRectangle = function (rect, forToolbox) {
        if (this.baseDescription) {
            if (this.baseDescription instanceof ShapeWithImageDescription_1.ShapeWithImageDescription)
                return this.baseDescription.getImagePlacementRectangle(rect, forToolbox);
            return rectangle_1.Rectangle.fromGeometry(point_1.Point.zero(), size_1.Size.empty());
        }
        var left = rect.x, top = rect.y, width = rect.width, height = rect.height;
        return new rectangle_1.Rectangle(left + (this.properties.imageLeft && !forToolbox ? this.properties.imageLeft * width : 0), top + (this.properties.imageTop && !forToolbox ? this.properties.imageTop * height : 0), this.properties.imageWidth && !forToolbox ? this.properties.imageWidth * width : width, this.properties.imageHeight && !forToolbox ? this.properties.imageHeight * height : height);
    };
    CustomShapeDescription.prototype.updateSvgImage = function (cacheImageInfo) {
        var isToolboxImage = cacheImageInfo.imageUrl && cacheImageInfo.imageUrl === this.properties.svgToolboxUrl;
        var svgImage = isToolboxImage ? this.svgToolboxImage : this.svgImage;
        if (cacheImageInfo.base64)
            svgImage.loadBase64Content(cacheImageInfo.base64);
        else
            svgImage.setUnableToLoadFlag();
        if (!isToolboxImage)
            this.raiseShapeDescriptionChanged(this);
    };
    return CustomShapeDescription;
}(ShapeWithImageDescription_1.ShapeWithImageDescription));
exports.CustomShapeDescription = CustomShapeDescription;
//# sourceMappingURL=CustomShapeDescription.js.map