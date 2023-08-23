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
exports.ManualOperationShapeDescription = void 0;
var RectangleShapeDescription_1 = require("../General/RectangleShapeDescription");
var ShapeTypes_1 = require("../../ShapeTypes");
var PathPrimitive_1 = require("../../../../Render/Primitives/PathPrimitive");
var DiagramItem_1 = require("../../../DiagramItem");
var ShapeDescription_1 = require("../ShapeDescription");
var ManualOperationShapeDescription = (function (_super) {
    __extends(ManualOperationShapeDescription, _super);
    function ManualOperationShapeDescription() {
        return _super.call(this, undefined, true) || this;
    }
    Object.defineProperty(ManualOperationShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.ManualOperation; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ManualOperationShapeDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    ManualOperationShapeDescription.prototype.createShapePrimitives = function (shape) {
        var rect = shape.rectangle;
        var _a = shape.rectangle, left = _a.x, top = _a.y, right = _a.right, bottom = _a.bottom, width = _a.width, height = _a.height;
        var px = Math.min(Math.max(0, height / Math.tan(ManualOperationShapeDescription.slopeAngle)), width);
        var cx = rect.center.x;
        var x1 = Math.min(left + px, cx);
        var x2 = Math.max(right - px, cx);
        return [
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(left, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(right, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(x2, bottom),
                new PathPrimitive_1.PathPrimitiveLineToCommand(x1, bottom),
                new PathPrimitive_1.PathPrimitiveClosePathCommand()
            ], shape.style)
        ];
    };
    ManualOperationShapeDescription.prototype.processConnectionPoint = function (shape, point) {
        var offset = shape.size.height / Math.tan(ManualOperationShapeDescription.slopeAngle);
        var side = shape.getConnectionPointSide(point);
        if (side === DiagramItem_1.ConnectionPointSide.East)
            point.x -= offset / 2;
        else if (side === DiagramItem_1.ConnectionPointSide.West)
            point.x += offset / 2;
    };
    ManualOperationShapeDescription.prototype.getTextRectangle = function (shape) {
        var px = Math.min(Math.max(0, shape.size.height / Math.tan(ManualOperationShapeDescription.slopeAngle)), shape.size.width);
        return shape.rectangle.clone()
            .moveRectangle(px, ShapeDescription_1.ShapeTextPadding)
            .resize(-px * 2, -ShapeDescription_1.ShapeTextPadding * 2)
            .nonNegativeSize();
    };
    ManualOperationShapeDescription.slopeAngle = 81 * Math.PI / 180;
    return ManualOperationShapeDescription;
}(RectangleShapeDescription_1.RectangleShapeDescription));
exports.ManualOperationShapeDescription = ManualOperationShapeDescription;
//# sourceMappingURL=ManualOperationShapeDescription.js.map