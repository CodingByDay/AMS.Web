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
exports.PentagonShapeDescription = void 0;
var PathPrimitive_1 = require("../../../../Render/Primitives/PathPrimitive");
var ShapeTypes_1 = require("../../ShapeTypes");
var PolygonShapeDescription_1 = require("./PolygonShapeDescription");
var DiagramItem_1 = require("../../../DiagramItem");
var Utils_1 = require("../../../../Utils");
var rectangle_1 = require("@devexpress/utils/lib/geometry/rectangle");
var PentagonShapeDescription = (function (_super) {
    __extends(PentagonShapeDescription, _super);
    function PentagonShapeDescription(hasDefaultText) {
        var _this = _super.call(this, hasDefaultText) || this;
        _this.defaultRatio = _this.defaultSize.height / _this.defaultSize.width;
        return _this;
    }
    Object.defineProperty(PentagonShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.Pentagon; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PentagonShapeDescription.prototype, "angleCount", {
        get: function () { return 5; },
        enumerable: false,
        configurable: true
    });
    PentagonShapeDescription.prototype.createShapePrimitives = function (shape) {
        var rect = shape.rectangle;
        var left = rect.x, top = rect.y, right = rect.right, bottom = rect.bottom, width = rect.width, height = rect.height;
        var cx = rect.center.x;
        var ratio = height / width / this.defaultRatio;
        var angle = Math.PI - this.angle;
        var py = width / 2 * Math.tan(angle / 2) * ratio;
        var y = top + py;
        var px = (height - py) / Math.tan(angle) / ratio;
        var x1 = left + px;
        var x2 = right - px;
        return [
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(cx, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(right, y),
                new PathPrimitive_1.PathPrimitiveLineToCommand(x2, bottom),
                new PathPrimitive_1.PathPrimitiveLineToCommand(x1, bottom),
                new PathPrimitive_1.PathPrimitiveLineToCommand(left, y),
                new PathPrimitive_1.PathPrimitiveClosePathCommand()
            ], shape.style)
        ];
    };
    PentagonShapeDescription.prototype.processConnectionPoint = function (shape, point) {
        var side = shape.getConnectionPointSide(point);
        if (side === DiagramItem_1.ConnectionPointSide.East || side === DiagramItem_1.ConnectionPointSide.West) {
            var rect = shape.rectangle;
            var top_1 = rect.y, width = rect.width, height = rect.height;
            var ratio = height / width / this.defaultRatio;
            var angle = Math.PI - this.angle;
            var py = width / 2 * Math.tan(angle / 2) * ratio;
            var y = top_1 + py;
            if (side === DiagramItem_1.ConnectionPointSide.East)
                point.y = y;
            else if (side === DiagramItem_1.ConnectionPointSide.West)
                point.y = y;
        }
    };
    PentagonShapeDescription.prototype.calculateHeight = function (width) {
        var angle = Math.PI - this.angle;
        var h1 = width / 2 * Math.tan(angle / 2);
        var side = width / 2 / Math.cos(angle / 2);
        var h2 = side * Math.sin(angle);
        return h1 + h2;
    };
    PentagonShapeDescription.prototype.getTextRectangle = function (shape) {
        var textSize = Utils_1.GeometryUtils.getMaxRectangleEnscribedInEllipse(shape.size);
        return rectangle_1.Rectangle.fromGeometry(shape.position.clone().offset((shape.size.width - textSize.width) / 2, (shape.size.height - textSize.height) / 2), textSize);
    };
    PentagonShapeDescription.prototype.getSizeByText = function (textSize, _shape) {
        return Utils_1.GeometryUtils.getEllipseByEnscribedRectangle(textSize);
    };
    return PentagonShapeDescription;
}(PolygonShapeDescription_1.PolygonShapeDescription));
exports.PentagonShapeDescription = PentagonShapeDescription;
//# sourceMappingURL=PentagonShapeDescription.js.map