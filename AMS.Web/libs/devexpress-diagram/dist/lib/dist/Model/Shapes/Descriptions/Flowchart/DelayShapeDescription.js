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
exports.DelayShapeDescription = void 0;
var RectangleShapeDescription_1 = require("../General/RectangleShapeDescription");
var ShapeTypes_1 = require("../../ShapeTypes");
var PathPrimitive_1 = require("../../../../Render/Primitives/PathPrimitive");
var Utils_1 = require("../../../../Utils");
var ShapeDescription_1 = require("../ShapeDescription");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var DelayShapeDescription = (function (_super) {
    __extends(DelayShapeDescription, _super);
    function DelayShapeDescription() {
        var _this = _super.call(this, undefined, true) || this;
        _this.defaultSize.width = _this.defaultSize.height;
        return _this;
    }
    Object.defineProperty(DelayShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.Delay; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DelayShapeDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    DelayShapeDescription.prototype.createShapePrimitives = function (shape) {
        var rect = shape.rectangle;
        var left = rect.x, top = rect.y, right = rect.right, bottom = rect.bottom;
        var cx = rect.center.x;
        return [
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(left, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(cx, top),
                new PathPrimitive_1.PathPrimitiveArcToCommand((right - left) / 2, (bottom - top) / 2, 0, false, true, cx, bottom),
                new PathPrimitive_1.PathPrimitiveLineToCommand(left, bottom),
                new PathPrimitive_1.PathPrimitiveClosePathCommand()
            ], shape.style)
        ];
    };
    DelayShapeDescription.prototype.getTextRectangle = function (shape) {
        var maxRectInEllipse = Utils_1.GeometryUtils.getMaxRectangleEnscribedInEllipse(shape.size);
        return shape.rectangle.clone().moveRectangle(ShapeDescription_1.ShapeTextPadding, ShapeDescription_1.ShapeTextPadding)
            .setSize({
            width: maxRectInEllipse.width / 2 + shape.size.width / 2 - ShapeDescription_1.ShapeTextPadding,
            height: maxRectInEllipse.height / 2 + shape.size.height / 2 - ShapeDescription_1.ShapeTextPadding
        }).nonNegativeSize();
    };
    DelayShapeDescription.prototype.getSizeByText = function (textSize, _shape) {
        var rectByEllipse = Utils_1.GeometryUtils.getEllipseByEnscribedRectangle(textSize);
        return new size_1.Size(rectByEllipse.width / 2 + textSize.width / 2 + ShapeDescription_1.ShapeTextPadding, rectByEllipse.height / 2 + textSize.height / 2 + ShapeDescription_1.ShapeTextPadding);
    };
    DelayShapeDescription.arcWidthRatio = 0.2;
    return DelayShapeDescription;
}(RectangleShapeDescription_1.RectangleShapeDescription));
exports.DelayShapeDescription = DelayShapeDescription;
//# sourceMappingURL=DelayShapeDescription.js.map