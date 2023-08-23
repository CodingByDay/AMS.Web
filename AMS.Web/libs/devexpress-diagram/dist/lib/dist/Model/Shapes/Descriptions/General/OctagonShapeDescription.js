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
exports.OctagonShapeDescription = void 0;
var PathPrimitive_1 = require("../../../../Render/Primitives/PathPrimitive");
var ShapeTypes_1 = require("../../ShapeTypes");
var PolygonShapeDescription_1 = require("./PolygonShapeDescription");
var Utils_1 = require("../../../../Utils");
var rectangle_1 = require("@devexpress/utils/lib/geometry/rectangle");
var OctagonShapeDescription = (function (_super) {
    __extends(OctagonShapeDescription, _super);
    function OctagonShapeDescription() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(OctagonShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.Octagon; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OctagonShapeDescription.prototype, "angleCount", {
        get: function () { return 8; },
        enumerable: false,
        configurable: true
    });
    OctagonShapeDescription.prototype.createShapePrimitives = function (shape) {
        var rect = shape.rectangle;
        var left = rect.x, top = rect.y, right = rect.right, bottom = rect.bottom, width = rect.width, height = rect.height;
        var angle = Math.PI - this.angle;
        var sideX = width / (1 + 2 * Math.cos(angle));
        var sideY = height / (1 + 2 * Math.cos(angle));
        var x1 = left + (width - sideX) / 2;
        var x2 = x1 + sideX;
        var y1 = top + (height - sideY) / 2;
        var y2 = y1 + sideY;
        return [
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(x1, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(x2, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(right, y1),
                new PathPrimitive_1.PathPrimitiveLineToCommand(right, y2),
                new PathPrimitive_1.PathPrimitiveLineToCommand(x2, bottom),
                new PathPrimitive_1.PathPrimitiveLineToCommand(x1, bottom),
                new PathPrimitive_1.PathPrimitiveLineToCommand(left, y2),
                new PathPrimitive_1.PathPrimitiveLineToCommand(left, y1),
                new PathPrimitive_1.PathPrimitiveClosePathCommand()
            ], shape.style)
        ];
    };
    OctagonShapeDescription.prototype.calculateHeight = function (width) {
        return width;
    };
    OctagonShapeDescription.prototype.getTextRectangle = function (shape) {
        var textSize = Utils_1.GeometryUtils.getMaxRectangleEnscribedInEllipse(shape.size);
        return rectangle_1.Rectangle.fromGeometry(shape.position.clone().offset((shape.size.width - textSize.width) / 2, (shape.size.height - textSize.height) / 2), textSize);
    };
    OctagonShapeDescription.prototype.getSizeByText = function (textSize, _shape) {
        return Utils_1.GeometryUtils.getEllipseByEnscribedRectangle(textSize);
    };
    return OctagonShapeDescription;
}(PolygonShapeDescription_1.PolygonShapeDescription));
exports.OctagonShapeDescription = OctagonShapeDescription;
//# sourceMappingURL=OctagonShapeDescription.js.map