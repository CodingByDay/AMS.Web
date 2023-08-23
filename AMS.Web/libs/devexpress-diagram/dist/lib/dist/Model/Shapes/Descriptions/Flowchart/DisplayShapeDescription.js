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
exports.DisplayShapeDescription = void 0;
var RectangleShapeDescription_1 = require("../General/RectangleShapeDescription");
var ShapeTypes_1 = require("../../ShapeTypes");
var PathPrimitive_1 = require("../../../../Render/Primitives/PathPrimitive");
var ShapeDescription_1 = require("../ShapeDescription");
var DisplayShapeDescription = (function (_super) {
    __extends(DisplayShapeDescription, _super);
    function DisplayShapeDescription() {
        return _super.call(this, undefined, true) || this;
    }
    Object.defineProperty(DisplayShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.Display; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DisplayShapeDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    DisplayShapeDescription.prototype.createShapePrimitives = function (shape) {
        var rect = shape.rectangle;
        var left = rect.x, top = rect.y, right = rect.right, bottom = rect.bottom, width = rect.width;
        var cy = rect.center.y;
        var dx = width * DisplayShapeDescription.arcWidthRatio;
        return [
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(right - dx / 2, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(left + dx / 2, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(left, cy),
                new PathPrimitive_1.PathPrimitiveLineToCommand(left + dx / 2, bottom),
                new PathPrimitive_1.PathPrimitiveLineToCommand(right - dx / 2, bottom),
                new PathPrimitive_1.PathPrimitiveArcToCommand(dx / 2, (bottom - top) / 2, 0, false, false, right - dx / 2, top)
            ], shape.style),
        ];
    };
    DisplayShapeDescription.prototype.getTextRectangle = function (shape) {
        var dx = shape.size.width * DisplayShapeDescription.arcWidthRatio;
        return shape.rectangle
            .clone()
            .moveRectangle(dx / 2, ShapeDescription_1.ShapeTextPadding)
            .resize(-dx, -ShapeDescription_1.ShapeTextPadding * 2)
            .nonNegativeSize();
    };
    DisplayShapeDescription.arcWidthRatio = 0.2;
    return DisplayShapeDescription;
}(RectangleShapeDescription_1.RectangleShapeDescription));
exports.DisplayShapeDescription = DisplayShapeDescription;
//# sourceMappingURL=DisplayShapeDescription.js.map