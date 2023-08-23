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
exports.ArrowUpDownShapeDescription = void 0;
var PathPrimitive_1 = require("../../../../Render/Primitives/PathPrimitive");
var ShapeParameterPoint_1 = require("../../ShapeParameterPoint");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var ArrowVerticalShapeDescription_1 = require("./ArrowVerticalShapeDescription");
var ShapeTypes_1 = require("../../ShapeTypes");
var ArrowUpDownShapeDescription = (function (_super) {
    __extends(ArrowUpDownShapeDescription, _super);
    function ArrowUpDownShapeDescription() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ArrowUpDownShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.ArrowUpDown; },
        enumerable: false,
        configurable: true
    });
    ArrowUpDownShapeDescription.prototype.createShapePrimitives = function (shape) {
        var rect = shape.rectangle;
        var left = rect.x, top = rect.y, right = rect.right, bottom = rect.bottom, width = rect.width;
        var cx = rect.center.x;
        var p1dx = (width - shape.parameters.get(ArrowVerticalShapeDescription_1.ArrowVerticalLineWidthParameterName).value) / 2;
        var p0dy = shape.parameters.get(ArrowVerticalShapeDescription_1.ArrowVerticalTriangleHeightParameterName).value;
        var p1x1 = shape.normalizeX(left + p1dx);
        var p0y1 = shape.normalizeY(top + p0dy);
        var p1x2 = shape.normalizeX(right - p1dx);
        var p0y2 = shape.normalizeY(bottom - p0dy);
        return [
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(cx, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(right, p0y1),
                new PathPrimitive_1.PathPrimitiveLineToCommand(p1x2, p0y1),
                new PathPrimitive_1.PathPrimitiveLineToCommand(p1x2, p0y2),
                new PathPrimitive_1.PathPrimitiveLineToCommand(right, p0y2),
                new PathPrimitive_1.PathPrimitiveLineToCommand(cx, bottom),
                new PathPrimitive_1.PathPrimitiveLineToCommand(left, p0y2),
                new PathPrimitive_1.PathPrimitiveLineToCommand(p1x1, p0y2),
                new PathPrimitive_1.PathPrimitiveLineToCommand(p1x1, p0y1),
                new PathPrimitive_1.PathPrimitiveLineToCommand(left, p0y1),
                new PathPrimitive_1.PathPrimitiveClosePathCommand()
            ], shape.style)
        ];
    };
    ArrowUpDownShapeDescription.prototype.normalizeParameters = function (shape, parameters) {
        this.changeParameterValue(parameters, ArrowVerticalShapeDescription_1.ArrowVerticalTriangleHeightParameterName, function (p) { return Math.max(0, Math.min(shape.size.height / 2 - 2 * shape.strokeWidth, p.value)); });
        this.changeParameterValue(parameters, ArrowVerticalShapeDescription_1.ArrowVerticalLineWidthParameterName, function (p) { return Math.max(0, Math.min(shape.size.width, p.value)); });
    };
    ArrowUpDownShapeDescription.prototype.modifyParameters = function (shape, parameters, deltaX, deltaY) {
        this.changeParameterValue(parameters, ArrowVerticalShapeDescription_1.ArrowVerticalTriangleHeightParameterName, function (p) { return p.value + deltaY; });
        this.changeParameterValue(parameters, ArrowVerticalShapeDescription_1.ArrowVerticalLineWidthParameterName, function (p) { return p.value - deltaX * 2; });
        this.normalizeParameters(shape, parameters);
    };
    ArrowUpDownShapeDescription.prototype.getParameterPoints = function (shape) {
        return [
            new ShapeParameterPoint_1.ShapeParameterPoint("c", new point_1.Point(shape.normalizeX(shape.position.x + (shape.size.width - shape.parameters.get(ArrowVerticalShapeDescription_1.ArrowVerticalLineWidthParameterName).value) / 2), shape.normalizeY(shape.position.y + shape.parameters.get(ArrowVerticalShapeDescription_1.ArrowVerticalTriangleHeightParameterName).value)))
        ];
    };
    return ArrowUpDownShapeDescription;
}(ArrowVerticalShapeDescription_1.ArrowVerticalShapeDescription));
exports.ArrowUpDownShapeDescription = ArrowUpDownShapeDescription;
//# sourceMappingURL=ArrowUpDownShapeDescription.js.map