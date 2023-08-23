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
exports.ManualInputShapeDescription = void 0;
var RectangleShapeDescription_1 = require("../General/RectangleShapeDescription");
var ShapeTypes_1 = require("../../ShapeTypes");
var PathPrimitive_1 = require("../../../../Render/Primitives/PathPrimitive");
var DiagramItem_1 = require("../../../DiagramItem");
var ShapeDescription_1 = require("../ShapeDescription");
var ManualInputShapeDescription = (function (_super) {
    __extends(ManualInputShapeDescription, _super);
    function ManualInputShapeDescription() {
        return _super.call(this, undefined, true) || this;
    }
    Object.defineProperty(ManualInputShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.ManualInput; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ManualInputShapeDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    ManualInputShapeDescription.prototype.createShapePrimitives = function (shape) {
        var _a = shape.rectangle, left = _a.x, top = _a.y, right = _a.right, bottom = _a.bottom, height = _a.height;
        var y1 = top + height * ManualInputShapeDescription.slopeHeightRatio;
        return [
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(left, y1),
                new PathPrimitive_1.PathPrimitiveLineToCommand(right, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(right, bottom),
                new PathPrimitive_1.PathPrimitiveLineToCommand(left, bottom),
                new PathPrimitive_1.PathPrimitiveClosePathCommand()
            ], shape.style)
        ];
    };
    ManualInputShapeDescription.prototype.processConnectionPoint = function (shape, point) {
        var side = shape.getConnectionPointSide(point);
        if (side === DiagramItem_1.ConnectionPointSide.North)
            point.y += ManualInputShapeDescription.slopeHeightRatio / 2 * shape.size.height;
    };
    ManualInputShapeDescription.prototype.getTextRectangle = function (shape) {
        var yOffset = shape.size.height * ManualInputShapeDescription.slopeHeightRatio;
        return shape.rectangle.clone()
            .moveRectangle(ShapeDescription_1.ShapeTextPadding, yOffset)
            .resize(-ShapeDescription_1.ShapeTextPadding * 2, -yOffset - ShapeDescription_1.ShapeTextPadding)
            .nonNegativeSize();
    };
    ManualInputShapeDescription.slopeHeightRatio = 0.1;
    return ManualInputShapeDescription;
}(RectangleShapeDescription_1.RectangleShapeDescription));
exports.ManualInputShapeDescription = ManualInputShapeDescription;
//# sourceMappingURL=ManualInputShapeDescription.js.map