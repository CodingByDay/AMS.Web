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
exports.TerminatorShapeDescription = void 0;
var RectangleShapeDescription_1 = require("../General/RectangleShapeDescription");
var ShapeTypes_1 = require("../../ShapeTypes");
var PathPrimitive_1 = require("../../../../Render/Primitives/PathPrimitive");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var ShapeDescription_1 = require("../ShapeDescription");
var rectangle_1 = require("@devexpress/utils/lib/geometry/rectangle");
var Utils_1 = require("../../../../Utils");
var TerminatorShapeDescription = (function (_super) {
    __extends(TerminatorShapeDescription, _super);
    function TerminatorShapeDescription() {
        return _super.call(this, new size_1.Size(ShapeDescription_1.ShapeDefaultDimension, ShapeDescription_1.ShapeDefaultDimension * 0.5), true) || this;
    }
    Object.defineProperty(TerminatorShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.Terminator; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TerminatorShapeDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    TerminatorShapeDescription.prototype.createShapePrimitives = function (shape) {
        var rect = shape.rectangle;
        var left = rect.x, top = rect.y, right = rect.right, bottom = rect.bottom, width = rect.width;
        var cy = rect.center.y;
        var x1 = left + width * TerminatorShapeDescription.curveWidthRatio;
        var x2 = left + width * (1 - TerminatorShapeDescription.curveWidthRatio);
        return [
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(x1, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(x2, top),
                new PathPrimitive_1.PathPrimitiveQuadraticCurveToCommand(right, top, right, cy),
                new PathPrimitive_1.PathPrimitiveQuadraticCurveToCommand(right, bottom, x2, bottom),
                new PathPrimitive_1.PathPrimitiveLineToCommand(x1, bottom),
                new PathPrimitive_1.PathPrimitiveQuadraticCurveToCommand(left, bottom, left, cy),
                new PathPrimitive_1.PathPrimitiveQuadraticCurveToCommand(left, top, x1, top),
                new PathPrimitive_1.PathPrimitiveClosePathCommand()
            ], shape.style)
        ];
    };
    TerminatorShapeDescription.prototype.getTextRectangle = function (shape) {
        var textSize = Utils_1.GeometryUtils.getMaxRectangleEnscribedInEllipse(shape.size);
        return rectangle_1.Rectangle.fromGeometry(shape.position.clone().offset((shape.size.width - textSize.width) / 2, (shape.size.height - textSize.height) / 2), textSize);
    };
    TerminatorShapeDescription.prototype.getSizeByText = function (textSize, _shape) {
        return Utils_1.GeometryUtils.getEllipseByEnscribedRectangle(textSize);
    };
    TerminatorShapeDescription.curveWidthRatio = 0.3;
    return TerminatorShapeDescription;
}(RectangleShapeDescription_1.RectangleShapeDescription));
exports.TerminatorShapeDescription = TerminatorShapeDescription;
//# sourceMappingURL=TerminatorShapeDescription.js.map