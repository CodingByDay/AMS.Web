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
exports.DataShapeDescription = void 0;
var RectangleShapeDescription_1 = require("../General/RectangleShapeDescription");
var ShapeTypes_1 = require("../../ShapeTypes");
var PathPrimitive_1 = require("../../../../Render/Primitives/PathPrimitive");
var DiagramItem_1 = require("../../../DiagramItem");
var ShapeDescription_1 = require("../ShapeDescription");
var DataShapeDescription = (function (_super) {
    __extends(DataShapeDescription, _super);
    function DataShapeDescription() {
        return _super.call(this, undefined, true) || this;
    }
    Object.defineProperty(DataShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.Data; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataShapeDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    DataShapeDescription.prototype.createShapePrimitives = function (shape) {
        var _a = shape.rectangle, left = _a.x, top = _a.y, right = _a.right, bottom = _a.bottom, width = _a.width, height = _a.height;
        var px = Math.min(Math.max(0, height / Math.tan(DataShapeDescription.slopeAngle)), width);
        var x1 = left + px;
        var x2 = right - px;
        return [
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(x1, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(right, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(x2, bottom),
                new PathPrimitive_1.PathPrimitiveLineToCommand(left, bottom),
                new PathPrimitive_1.PathPrimitiveClosePathCommand()
            ], shape.style)
        ];
    };
    DataShapeDescription.prototype.processConnectionPoint = function (shape, point) {
        var offset = shape.size.height / Math.tan(DataShapeDescription.slopeAngle);
        var side = shape.getConnectionPointSide(point);
        if (side === DiagramItem_1.ConnectionPointSide.East)
            point.x -= offset / 2;
        else if (side === DiagramItem_1.ConnectionPointSide.West)
            point.x += offset / 2;
    };
    DataShapeDescription.prototype.getTextRectangle = function (shape) {
        var px = Math.min(Math.max(0, shape.size.height / Math.tan(DataShapeDescription.slopeAngle)), shape.size.width);
        return shape.rectangle.clone().moveRectangle(px, ShapeDescription_1.ShapeTextPadding).resize(-px * 2, -ShapeDescription_1.ShapeTextPadding * 2);
    };
    DataShapeDescription.slopeAngle = 81 * Math.PI / 180;
    return DataShapeDescription;
}(RectangleShapeDescription_1.RectangleShapeDescription));
exports.DataShapeDescription = DataShapeDescription;
//# sourceMappingURL=DataShapeDescription.js.map