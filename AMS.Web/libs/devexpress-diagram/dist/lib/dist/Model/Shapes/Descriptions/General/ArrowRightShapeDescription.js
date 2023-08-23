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
exports.ArrowRightShapeDescription = void 0;
var PathPrimitive_1 = require("../../../../Render/Primitives/PathPrimitive");
var ArrowHorizontalShapeDescription_1 = require("./ArrowHorizontalShapeDescription");
var ShapeParameterPoint_1 = require("../../ShapeParameterPoint");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var ShapeTypes_1 = require("../../ShapeTypes");
var DiagramItem_1 = require("../../../DiagramItem");
var ArrowRightShapeDescription = (function (_super) {
    __extends(ArrowRightShapeDescription, _super);
    function ArrowRightShapeDescription() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ArrowRightShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.ArrowRight; },
        enumerable: false,
        configurable: true
    });
    ArrowRightShapeDescription.prototype.createShapePrimitives = function (shape) {
        var rect = shape.rectangle;
        var left = rect.x, top = rect.y, right = rect.right, bottom = rect.bottom, width = rect.width, height = rect.height;
        var cy = rect.center.y;
        var p0dx = width - shape.parameters.get(ArrowHorizontalShapeDescription_1.ArrowVerticalTriangleWidthParameterName).value;
        var p1dy = (height - shape.parameters.get(ArrowHorizontalShapeDescription_1.ArrowVerticalLineHeightParameterName).value) / 2;
        var p0x1 = shape.normalizeX(left + p0dx);
        var p1y1 = shape.normalizeY(top + p1dy);
        var p1y2 = shape.normalizeY(bottom - p1dy);
        return [
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(left, p1y1),
                new PathPrimitive_1.PathPrimitiveLineToCommand(p0x1, p1y1),
                new PathPrimitive_1.PathPrimitiveLineToCommand(p0x1, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(right, cy),
                new PathPrimitive_1.PathPrimitiveLineToCommand(p0x1, bottom),
                new PathPrimitive_1.PathPrimitiveLineToCommand(p0x1, p1y2),
                new PathPrimitive_1.PathPrimitiveLineToCommand(left, p1y2),
                new PathPrimitive_1.PathPrimitiveClosePathCommand()
            ], shape.style)
        ];
    };
    ArrowRightShapeDescription.prototype.modifyParameters = function (shape, parameters, deltaX, deltaY) {
        this.changeParameterValue(parameters, ArrowHorizontalShapeDescription_1.ArrowVerticalTriangleWidthParameterName, function (p) { return p.value - deltaX; });
        this.changeParameterValue(parameters, ArrowHorizontalShapeDescription_1.ArrowVerticalLineHeightParameterName, function (p) { return p.value - deltaY * 2; });
        this.normalizeParameters(shape, parameters);
    };
    ArrowRightShapeDescription.prototype.getParameterPoints = function (shape) {
        return [
            new ShapeParameterPoint_1.ShapeParameterPoint("c", new point_1.Point(shape.normalizeX(shape.position.x + shape.size.width - shape.parameters.get(ArrowHorizontalShapeDescription_1.ArrowVerticalTriangleWidthParameterName).value), shape.normalizeY(shape.position.y + (shape.size.height - shape.parameters.get(ArrowHorizontalShapeDescription_1.ArrowVerticalLineHeightParameterName).value) / 2)))
        ];
    };
    ArrowRightShapeDescription.prototype.processConnectionPoint = function (shape, point) {
        var triangleWidth = shape.parameters.get(ArrowHorizontalShapeDescription_1.ArrowVerticalTriangleWidthParameterName).value;
        if (point.x > shape.position.x + shape.size.width - triangleWidth) {
            var tg = shape.size.height / 2 / triangleWidth;
            var delta = (point.x - (shape.position.x + shape.size.width - triangleWidth)) * tg;
            var side = shape.getConnectionPointSide(point);
            if (side === DiagramItem_1.ConnectionPointSide.North)
                point.y += delta;
            else if (side === DiagramItem_1.ConnectionPointSide.South)
                point.y -= delta;
        }
        else
            _super.prototype.processConnectionPoint.call(this, shape, point);
    };
    return ArrowRightShapeDescription;
}(ArrowHorizontalShapeDescription_1.ArrowHorizontalShapeDescription));
exports.ArrowRightShapeDescription = ArrowRightShapeDescription;
//# sourceMappingURL=ArrowRightShapeDescription.js.map