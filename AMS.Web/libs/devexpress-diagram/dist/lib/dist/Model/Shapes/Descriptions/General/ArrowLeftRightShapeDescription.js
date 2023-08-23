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
exports.ArrowLeftRightShapeDescription = void 0;
var PathPrimitive_1 = require("../../../../Render/Primitives/PathPrimitive");
var ArrowHorizontalShapeDescription_1 = require("./ArrowHorizontalShapeDescription");
var ShapeParameterPoint_1 = require("../../ShapeParameterPoint");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var ShapeTypes_1 = require("../../ShapeTypes");
var ArrowLeftRightShapeDescription = (function (_super) {
    __extends(ArrowLeftRightShapeDescription, _super);
    function ArrowLeftRightShapeDescription() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ArrowLeftRightShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.ArrowLeftRight; },
        enumerable: false,
        configurable: true
    });
    ArrowLeftRightShapeDescription.prototype.createShapePrimitives = function (shape) {
        var rect = shape.rectangle;
        var left = rect.x, top = rect.y, right = rect.right, bottom = rect.bottom, height = rect.height;
        var cy = rect.center.y;
        var p0dx = shape.parameters.get(ArrowHorizontalShapeDescription_1.ArrowVerticalTriangleWidthParameterName).value;
        var p1dy = (height - shape.parameters.get(ArrowHorizontalShapeDescription_1.ArrowVerticalLineHeightParameterName).value) / 2;
        var p0x1 = shape.normalizeX(left + p0dx);
        var p1y1 = shape.normalizeY(top + p1dy);
        var p0x2 = shape.normalizeX(right - p0dx);
        var p1y2 = shape.normalizeY(bottom - p1dy);
        return [
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(left, cy),
                new PathPrimitive_1.PathPrimitiveLineToCommand(p0x1, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(p0x1, p1y1),
                new PathPrimitive_1.PathPrimitiveLineToCommand(p0x2, p1y1),
                new PathPrimitive_1.PathPrimitiveLineToCommand(p0x2, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(right, cy),
                new PathPrimitive_1.PathPrimitiveLineToCommand(p0x2, bottom),
                new PathPrimitive_1.PathPrimitiveLineToCommand(p0x2, p1y2),
                new PathPrimitive_1.PathPrimitiveLineToCommand(p0x1, p1y2),
                new PathPrimitive_1.PathPrimitiveLineToCommand(p0x1, bottom),
                new PathPrimitive_1.PathPrimitiveClosePathCommand()
            ], shape.style)
        ];
    };
    ArrowLeftRightShapeDescription.prototype.normalizeParameters = function (shape, parameters) {
        this.changeParameterValue(parameters, ArrowHorizontalShapeDescription_1.ArrowVerticalTriangleWidthParameterName, function (p) { return Math.max(0, Math.min(shape.size.width / 2 - 2 * shape.strokeWidth, p.value)); });
        this.changeParameterValue(parameters, ArrowHorizontalShapeDescription_1.ArrowVerticalLineHeightParameterName, function (p) { return Math.max(0, Math.min(shape.size.height, p.value)); });
    };
    ArrowLeftRightShapeDescription.prototype.modifyParameters = function (shape, parameters, deltaX, deltaY) {
        this.changeParameterValue(parameters, ArrowHorizontalShapeDescription_1.ArrowVerticalTriangleWidthParameterName, function (p) { return p.value + deltaX; });
        this.changeParameterValue(parameters, ArrowHorizontalShapeDescription_1.ArrowVerticalLineHeightParameterName, function (p) { return p.value - deltaY * 2; });
        this.normalizeParameters(shape, parameters);
    };
    ArrowLeftRightShapeDescription.prototype.getParameterPoints = function (shape) {
        return [
            new ShapeParameterPoint_1.ShapeParameterPoint("c", new point_1.Point(shape.normalizeX(shape.position.x + shape.parameters.get(ArrowHorizontalShapeDescription_1.ArrowVerticalTriangleWidthParameterName).value), shape.normalizeY(shape.position.y + (shape.size.height - shape.parameters.get(ArrowHorizontalShapeDescription_1.ArrowVerticalLineHeightParameterName).value) / 2)))
        ];
    };
    return ArrowLeftRightShapeDescription;
}(ArrowHorizontalShapeDescription_1.ArrowHorizontalShapeDescription));
exports.ArrowLeftRightShapeDescription = ArrowLeftRightShapeDescription;
//# sourceMappingURL=ArrowLeftRightShapeDescription.js.map