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
exports.ShapeWithImageDescription = exports.SHAPE_IMAGE_CLASSNAMES = exports.ShapeDefaultSize = exports.ShapeDefaultDimension = void 0;
var ShapeDescription_1 = require("./ShapeDescription");
var rectangle_1 = require("@devexpress/utils/lib/geometry/rectangle");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var unit_converter_1 = require("@devexpress/utils/lib/class/unit-converter");
var ImagePrimitive_1 = require("../../../Render/Primitives/ImagePrimitive");
var RectaglePrimitive_1 = require("../../../Render/Primitives/RectaglePrimitive");
var GroupPrimitive_1 = require("../../../Render/Primitives/GroupPrimitive");
var Utils_1 = require("../../../Render/Utils");
var ClipPathPrimitive_1 = require("../../../Render/Primitives/ClipPathPrimitive");
var ShapeImageIndicator_1 = require("../../../Render/ShapeImageIndicator");
exports.ShapeDefaultDimension = 1440;
exports.ShapeDefaultSize = new size_1.Size(exports.ShapeDefaultDimension, exports.ShapeDefaultDimension);
exports.SHAPE_IMAGE_CLASSNAMES = {
    IMAGE: "dxdi-image",
    IMAGE_PLACEHOLDER: "dxdi-image-placeholder",
    LOADING_INDICATOR: "dxdi-spinner",
    USER_PIC: "dxdi-user",
    WARNING_MARK: "dxdi-warning"
};
var ShapeWithImageDescription = (function (_super) {
    __extends(ShapeWithImageDescription, _super);
    function ShapeWithImageDescription(defaultSize, hasDefaultText) {
        if (defaultSize === void 0) { defaultSize = exports.ShapeDefaultSize.clone(); }
        var _this = _super.call(this, defaultSize, hasDefaultText) || this;
        _this.hasDefaultText = hasDefaultText;
        _this.defaultIconSize = 480;
        return _this;
    }
    Object.defineProperty(ShapeWithImageDescription.prototype, "enableImage", {
        get: function () { return true; },
        enumerable: false,
        configurable: true
    });
    ShapeWithImageDescription.prototype.getImageMargin = function (forToolbox) {
        return forToolbox ? unit_converter_1.UnitConverter.pixelsToTwips(2) : unit_converter_1.UnitConverter.pixelsToTwips(3);
    };
    ShapeWithImageDescription.prototype.createImagePrimitives = function (shape, forToolbox) {
        if (!this.enableImage)
            return [];
        var rect = this.getImagePlacementRectangle(shape.rectangle, forToolbox);
        if (forToolbox)
            return this.createImagePlaceholder(rect);
        var imagePrimitives = [];
        if (shape.image.isEmpty || shape.image.unableToLoad)
            imagePrimitives = imagePrimitives.concat(this.createEmptyImagePrimitives(rect, shape.image.unableToLoad));
        else if (shape.image.renderUrl === "")
            imagePrimitives = imagePrimitives.concat(this.createLoadingImagePrimitives(rect));
        else
            imagePrimitives = imagePrimitives.concat(this.createLoadedImagePrimitives(rect, shape.image.renderUrl));
        if (shape.image.renderUrl === "") {
            var clipPathId = Utils_1.RenderUtils.generateSvgElementId("clipImage");
            return [].concat([
                new GroupPrimitive_1.GroupPrimitive(imagePrimitives, exports.SHAPE_IMAGE_CLASSNAMES.IMAGE, undefined, clipPathId),
                new ClipPathPrimitive_1.ClipPathPrimitive(clipPathId, [new RectaglePrimitive_1.RectanglePrimitive(rect.x, rect.y, rect.width, rect.height)])
            ]);
        }
        else
            return imagePrimitives;
    };
    ShapeWithImageDescription.prototype.createImagePlaceholder = function (rect) {
        return [];
    };
    ShapeWithImageDescription.prototype.createLoadedImagePrimitives = function (rect, imageUrl) {
        return [
            new ImagePrimitive_1.ImagePrimitive(rect.x, rect.y, rect.width, rect.height, imageUrl, ShapeWithImageDescription.imageScalingRule, undefined, exports.SHAPE_IMAGE_CLASSNAMES.IMAGE)
        ];
    };
    ShapeWithImageDescription.prototype.createLoadingImagePrimitives = function (rect) {
        var loadingRect = this.getIconPlacementRectangle(rect);
        return [
            ShapeImageIndicator_1.ShapeImageIndicator.createLoadingIndicatorPrimitives(loadingRect.x, loadingRect.y, this.defaultIconSize, unit_converter_1.UnitConverter.pixelsToTwips(5), exports.SHAPE_IMAGE_CLASSNAMES.LOADING_INDICATOR)
        ];
    };
    ShapeWithImageDescription.prototype.createEmptyImagePrimitives = function (rect, showWarning) {
        var loadingRect = this.getIconPlacementRectangle(rect);
        var primitives = [];
        primitives = primitives.concat(this.createEmptyImagePrimitive(loadingRect));
        if (showWarning)
            primitives = primitives.concat(this.createWarningPrimitive(loadingRect));
        return primitives;
    };
    ShapeWithImageDescription.prototype.createEmptyImagePrimitive = function (rect) {
        return new GroupPrimitive_1.GroupPrimitive([]);
    };
    ShapeWithImageDescription.prototype.createWarningPrimitive = function (rect) {
        return new GroupPrimitive_1.GroupPrimitive([]);
    };
    ShapeWithImageDescription.prototype.getIconPlacementRectangle = function (rect) {
        var iconRect = rectangle_1.Rectangle.fromGeometry(new point_1.Point(rect.x, rect.y), new size_1.Size(this.defaultIconSize, this.defaultIconSize));
        if (iconRect.width < rect.width)
            iconRect.x = rect.x + (rect.width - iconRect.width) / 2;
        if (iconRect.height < rect.height)
            iconRect.y = rect.y + (rect.height - iconRect.height) / 2;
        return iconRect;
    };
    ShapeWithImageDescription.imageScalingRule = "xMidYMid meet";
    return ShapeWithImageDescription;
}(ShapeDescription_1.ShapeDescription));
exports.ShapeWithImageDescription = ShapeWithImageDescription;
//# sourceMappingURL=ShapeWithImageDescription.js.map