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
exports.HardDiskShapeDescription = void 0;
var RectangleShapeDescription_1 = require("../General/RectangleShapeDescription");
var ShapeTypes_1 = require("../../ShapeTypes");
var PathPrimitive_1 = require("../../../../Render/Primitives/PathPrimitive");
var EllipsePrimitive_1 = require("../../../../Render/Primitives/EllipsePrimitive");
var ShapeDescription_1 = require("../ShapeDescription");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var HardDiskShapeDescription = (function (_super) {
    __extends(HardDiskShapeDescription, _super);
    function HardDiskShapeDescription() {
        return _super.call(this, undefined, true) || this;
    }
    Object.defineProperty(HardDiskShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.HardDisk; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HardDiskShapeDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    HardDiskShapeDescription.prototype.createShapePrimitives = function (shape) {
        var rect = shape.rectangle;
        var left = rect.x, top = rect.y, right = rect.right, bottom = rect.bottom, width = rect.width;
        var cy = rect.center.y;
        var dx = width * HardDiskShapeDescription.arcWidthRatio;
        return [
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(right - dx / 2, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(left + dx / 2, top),
                new PathPrimitive_1.PathPrimitiveArcToCommand(dx / 2, (bottom - top) / 2, 0, false, false, left + dx / 2, bottom),
                new PathPrimitive_1.PathPrimitiveLineToCommand(right - dx / 2, bottom),
            ], shape.style),
            new EllipsePrimitive_1.EllipsePrimitive(right - dx / 2, cy, dx / 2, (bottom - top) / 2, shape.style)
        ];
    };
    HardDiskShapeDescription.prototype.getTextRectangle = function (shape) {
        var rect = shape.rectangle;
        var dx = rect.width * HardDiskShapeDescription.arcWidthRatio * 1.5;
        return rect.clone()
            .resize(-dx - 2 * ShapeDescription_1.ShapeTextPadding, -2 * ShapeDescription_1.ShapeTextPadding)
            .moveRectangle(ShapeDescription_1.ShapeTextPadding, ShapeDescription_1.ShapeTextPadding)
            .nonNegativeSize();
    };
    HardDiskShapeDescription.prototype.getSizeByText = function (textSize, shape) {
        return new size_1.Size((textSize.width + ShapeDescription_1.ShapeTextPadding * 2) / (1 - 1.5 * HardDiskShapeDescription.arcWidthRatio), shape.size.height + ShapeDescription_1.ShapeTextPadding);
    };
    HardDiskShapeDescription.arcWidthRatio = 0.2;
    return HardDiskShapeDescription;
}(RectangleShapeDescription_1.RectangleShapeDescription));
exports.HardDiskShapeDescription = HardDiskShapeDescription;
//# sourceMappingURL=HardDiskShapeDescription.js.map