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
exports.StoredDataShapeDescription = void 0;
var RectangleShapeDescription_1 = require("../General/RectangleShapeDescription");
var ShapeTypes_1 = require("../../ShapeTypes");
var PathPrimitive_1 = require("../../../../Render/Primitives/PathPrimitive");
var ShapeDescription_1 = require("../ShapeDescription");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var StoredDataShapeDescription = (function (_super) {
    __extends(StoredDataShapeDescription, _super);
    function StoredDataShapeDescription() {
        return _super.call(this, undefined, true) || this;
    }
    Object.defineProperty(StoredDataShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.StoredData; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StoredDataShapeDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    StoredDataShapeDescription.prototype.createShapePrimitives = function (shape) {
        var rect = shape.rectangle;
        var left = rect.x, top = rect.y, right = rect.right, bottom = rect.bottom, width = rect.width;
        var dx = width * StoredDataShapeDescription.arcWidthRatio;
        return [
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(right, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(left + dx / 2, top),
                new PathPrimitive_1.PathPrimitiveArcToCommand(dx / 2, (bottom - top) / 2, 0, false, false, left + dx / 2, bottom),
                new PathPrimitive_1.PathPrimitiveLineToCommand(right, bottom),
                new PathPrimitive_1.PathPrimitiveArcToCommand(dx / 2, (bottom - top) / 2, 0, false, true, right, top)
            ], shape.style)
        ];
    };
    StoredDataShapeDescription.prototype.getTextRectangle = function (shape) {
        var rect = shape.rectangle;
        var dx = rect.width * StoredDataShapeDescription.arcWidthRatio / 2;
        return rect.clone()
            .resize(-dx - 2 * ShapeDescription_1.ShapeTextPadding, -2 * ShapeDescription_1.ShapeTextPadding)
            .moveRectangle(ShapeDescription_1.ShapeTextPadding, ShapeDescription_1.ShapeTextPadding)
            .nonNegativeSize();
    };
    StoredDataShapeDescription.prototype.getSizeByText = function (textSize, _shape) {
        return new size_1.Size((textSize.width + 2 * ShapeDescription_1.ShapeTextPadding) / (1 - StoredDataShapeDescription.arcWidthRatio / 2), textSize.height + 2 * ShapeDescription_1.ShapeTextPadding);
    };
    StoredDataShapeDescription.arcWidthRatio = 0.2;
    return StoredDataShapeDescription;
}(RectangleShapeDescription_1.RectangleShapeDescription));
exports.StoredDataShapeDescription = StoredDataShapeDescription;
//# sourceMappingURL=StoredDataShapeDescription.js.map