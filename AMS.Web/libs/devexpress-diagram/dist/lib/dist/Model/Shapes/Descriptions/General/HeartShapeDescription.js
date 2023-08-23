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
exports.HeartShapeDescription = void 0;
var ShapeDescription_1 = require("../ShapeDescription");
var PathPrimitive_1 = require("../../../../Render/Primitives/PathPrimitive");
var ShapeTypes_1 = require("../../ShapeTypes");
var ConnectionPoint_1 = require("../../../ConnectionPoint");
var DiagramItem_1 = require("../../../DiagramItem");
var HeartShapeDescription = (function (_super) {
    __extends(HeartShapeDescription, _super);
    function HeartShapeDescription() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(HeartShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.Heart; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HeartShapeDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return true; },
        enumerable: false,
        configurable: true
    });
    HeartShapeDescription.prototype.createConnectionPoints = function () {
        return [
            new ConnectionPoint_1.ConnectionPoint(0.5, 0.15, DiagramItem_1.ConnectionPointSide.North),
            new ConnectionPoint_1.ConnectionPoint(1, 0.25, DiagramItem_1.ConnectionPointSide.East),
            new ConnectionPoint_1.ConnectionPoint(0.5, 1, DiagramItem_1.ConnectionPointSide.South),
            new ConnectionPoint_1.ConnectionPoint(0, 0.25, DiagramItem_1.ConnectionPointSide.West)
        ];
    };
    HeartShapeDescription.prototype.createShapePrimitives = function (shape) {
        var rect = shape.rectangle;
        var left = rect.x, top = rect.y, right = rect.right, bottom = rect.bottom, width = rect.width, height = rect.height;
        return [
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(right - width * 0.25, top),
                new PathPrimitive_1.PathPrimitiveCubicCurveToCommand(right - width * 0.15, top, right, top + height * 0.1, right, top + height * 0.25),
                new PathPrimitive_1.PathPrimitiveCubicCurveToCommand(right, top + height * 0.3, right - width * 0.02, top + height * 0.35, right - width * 0.05, top + height * 0.4),
                new PathPrimitive_1.PathPrimitiveLineToCommand(rect.center.x, bottom),
                new PathPrimitive_1.PathPrimitiveLineToCommand(left + width * 0.05, top + height * 0.4),
                new PathPrimitive_1.PathPrimitiveCubicCurveToCommand(left + width * 0.02, top + height * 0.35, left, top + height * 0.3, left, top + height * 0.25),
                new PathPrimitive_1.PathPrimitiveCubicCurveToCommand(left, top + height * 0.1, left + width * 0.15, top, left + width * 0.25, top),
                new PathPrimitive_1.PathPrimitiveCubicCurveToCommand(left + width * 0.3, top, left + width * 0.45, top + height * 0.03, left + width * 0.5, top + height * 0.15),
                new PathPrimitive_1.PathPrimitiveCubicCurveToCommand(right - width * 0.45, top + height * 0.03, right - width * 0.3, top, right - width * 0.25, top),
                new PathPrimitive_1.PathPrimitiveClosePathCommand()
            ], shape.style)
        ];
    };
    HeartShapeDescription.prototype.getTextRectangle = function (shape) {
        return shape.rectangle.clone().inflate(-ShapeDescription_1.ShapeTextPadding, -ShapeDescription_1.ShapeTextPadding);
    };
    HeartShapeDescription.prototype.getSizeByText = function (_textSize, shape) {
        return shape.size.clone().offset(ShapeDescription_1.ShapeTextPadding * 2, ShapeDescription_1.ShapeTextPadding * 2);
    };
    return HeartShapeDescription;
}(ShapeDescription_1.ShapeDescription));
exports.HeartShapeDescription = HeartShapeDescription;
//# sourceMappingURL=HeartShapeDescription.js.map