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
exports.StarShapeDescription = exports.StarConvexParameterName = void 0;
var PathPrimitive_1 = require("../../../../Render/Primitives/PathPrimitive");
var ShapeTypes_1 = require("../../ShapeTypes");
var PentagonShapeDescription_1 = require("./PentagonShapeDescription");
var ShapeParameters_1 = require("../../ShapeParameters");
var ShapeParameterPoint_1 = require("../../ShapeParameterPoint");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var DiagramItem_1 = require("../../../DiagramItem");
exports.StarConvexParameterName = "sc";
var StarShapeDescription = (function (_super) {
    __extends(StarShapeDescription, _super);
    function StarShapeDescription() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(StarShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.Star; },
        enumerable: false,
        configurable: true
    });
    StarShapeDescription.prototype.createShapePrimitives = function (shape) {
        var rect = shape.rectangle;
        var left = rect.x, top = rect.y, right = rect.right, width = rect.width, height = rect.height;
        var bottom = this.getActualBottom(top, rect.bottom, width, height);
        var cx = rect.center.x;
        var cy = top + (bottom - top) / 2;
        var ratio = height / width;
        var angle = Math.PI - this.angle;
        var py = width / 2 * Math.tan(angle / 2) * ratio;
        var y = top + py;
        var px = (height - py) / Math.tan(angle) / ratio;
        var x1 = left + px;
        var x2 = right - px;
        var pDistance = shape.parameters.get(exports.StarConvexParameterName).value;
        var distance = this.getInnerPointDistance(cx, cx, right, cy, top, y);
        return [
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(cx, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(this.getInnerPointPos(cx, cx, right, pDistance, distance), this.getInnerPointPos(cy, top, y, pDistance, distance)),
                new PathPrimitive_1.PathPrimitiveLineToCommand(right, y),
                new PathPrimitive_1.PathPrimitiveLineToCommand(this.getInnerPointPos(cx, right, x2, pDistance, distance), this.getInnerPointPos(cy, y, bottom, pDistance, distance)),
                new PathPrimitive_1.PathPrimitiveLineToCommand(x2, bottom),
                new PathPrimitive_1.PathPrimitiveLineToCommand(this.getInnerPointPos(cx, x2, x1, pDistance, distance), this.getInnerPointPos(cy, bottom, bottom, pDistance, distance)),
                new PathPrimitive_1.PathPrimitiveLineToCommand(x1, bottom),
                new PathPrimitive_1.PathPrimitiveLineToCommand(this.getInnerPointPos(cx, x1, left, pDistance, distance), this.getInnerPointPos(cy, bottom, y, pDistance, distance)),
                new PathPrimitive_1.PathPrimitiveLineToCommand(left, y),
                new PathPrimitive_1.PathPrimitiveLineToCommand(this.getInnerPointPos(cx, left, cx, pDistance, distance), this.getInnerPointPos(cy, y, top, pDistance, distance)),
                new PathPrimitive_1.PathPrimitiveClosePathCommand()
            ], shape.style)
        ];
    };
    StarShapeDescription.prototype.createParameters = function (parameters) {
        parameters.addRange([
            new ShapeParameters_1.ShapeParameter(exports.StarConvexParameterName, 300)
        ]);
    };
    StarShapeDescription.prototype.normalizeParameters = function (shape, parameters) {
        var rect = shape.rectangle;
        var top = rect.y, right = rect.right, width = rect.width, height = rect.height;
        var bottom = this.getActualBottom(top, rect.bottom, width, height);
        var cx = rect.center.x;
        var cy = top + (bottom - top) / 2;
        var ratio = height / width;
        var angle = Math.PI - this.angle;
        var py = width / 2 * Math.tan(angle / 2) * ratio;
        var y = top + py;
        var distance = this.getInnerPointDistance(cx, cx, right, cy, top, y);
        this.changeParameterValue(parameters, exports.StarConvexParameterName, function (p) { return Math.max(0, Math.min(distance, p.value)); });
    };
    StarShapeDescription.prototype.modifyParameters = function (shape, parameters, deltaX, deltaY) {
        var distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
        if (deltaX < 0 || deltaY > 0)
            distance = -distance;
        this.changeParameterValue(parameters, exports.StarConvexParameterName, function (p) { return p.value + distance; });
        this.normalizeParameters(shape, parameters);
    };
    StarShapeDescription.prototype.getParameterPoints = function (shape) {
        var rect = shape.rectangle;
        var top = rect.y, right = rect.right, width = rect.width, height = rect.height;
        var bottom = this.getActualBottom(top, rect.bottom, width, height);
        var cx = rect.center.x;
        var cy = top + (bottom - top) / 2;
        var ratio = height / width;
        var angle = Math.PI - this.angle;
        var py = width / 2 * Math.tan(angle / 2) * ratio;
        var y = top + py;
        var pDistance = shape.parameters.get(exports.StarConvexParameterName).value;
        var distance = this.getInnerPointDistance(cx, cx, right, cy, top, y);
        var innerPointX = this.getInnerPointPos(cx, cx, right, pDistance, distance);
        var innerPointY = this.getInnerPointPos(cy, top, y, pDistance, distance);
        return [
            new ShapeParameterPoint_1.ShapeParameterPoint("c", new point_1.Point(innerPointX, innerPointY))
        ];
    };
    StarShapeDescription.prototype.processConnectionPoint = function (shape, point) {
        _super.prototype.processConnectionPoint.call(this, shape, point);
        var side = shape.getConnectionPointSide(point);
        if (side === DiagramItem_1.ConnectionPointSide.South) {
            var rect = shape.rectangle;
            var top_1 = rect.y, right = rect.right, width = rect.width, height = rect.height;
            var bottom = this.getActualBottom(top_1, rect.bottom, width, height);
            var cx = rect.center.x;
            var cy = top_1 + (bottom - top_1) / 2;
            var ratio = height / width;
            var angle = Math.PI - this.angle;
            var py = width / 2 * Math.tan(angle / 2) * ratio;
            var y = top_1 + py;
            var pDistance = shape.parameters.get(exports.StarConvexParameterName).value;
            var distance = this.getInnerPointDistance(cx, cx, right, cy, top_1, y);
            point.y = this.getInnerPointPos(cy, bottom, bottom, pDistance, distance);
        }
    };
    StarShapeDescription.prototype.getInnerPointDistanceByAxis = function (center, edge1, edge2) {
        var edgeX = Math.min(edge1, edge2) + Math.abs(edge1 - edge2) / 2;
        return edgeX - center;
    };
    StarShapeDescription.prototype.getInnerPointPos = function (center, edge1, edge2, pDistance, distance) {
        var ratio = Math.min(1, pDistance / distance);
        return center + this.getInnerPointDistanceByAxis(center, edge1, edge2) * ratio;
    };
    StarShapeDescription.prototype.getInnerPointDistance = function (centerX, edgeX1, edgeX2, centerY, edgeY1, edgeY2) {
        var disX = this.getInnerPointDistanceByAxis(centerX, edgeX1, edgeX2);
        var disY = this.getInnerPointDistanceByAxis(centerY, edgeY1, edgeY2);
        return Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2));
    };
    StarShapeDescription.prototype.getActualBottom = function (top, bottom, width, height) {
        var result = top + _super.prototype.calculateHeight.call(this, width) * height / width;
        return result < bottom ? result : bottom;
    };
    StarShapeDescription.prototype.calculateHeight = function (width) {
        return width;
    };
    return StarShapeDescription;
}(PentagonShapeDescription_1.PentagonShapeDescription));
exports.StarShapeDescription = StarShapeDescription;
//# sourceMappingURL=StarShapeDescription.js.map