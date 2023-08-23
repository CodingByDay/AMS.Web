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
exports.TriangleShapeDescription = void 0;
var ShapeDescription_1 = require("../ShapeDescription");
var PathPrimitive_1 = require("../../../../Render/Primitives/PathPrimitive");
var ShapeTypes_1 = require("../../ShapeTypes");
var ConnectionPoint_1 = require("../../../ConnectionPoint");
var DiagramItem_1 = require("../../../DiagramItem");
var rectangle_1 = require("@devexpress/utils/lib/geometry/rectangle");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var TriangleShapeDescription = (function (_super) {
    __extends(TriangleShapeDescription, _super);
    function TriangleShapeDescription(hasDefaultText) {
        var _this = _super.call(this, undefined, hasDefaultText) || this;
        _this.defaultSize.height = _this.calculateHeight(ShapeDescription_1.ShapeDefaultDimension);
        return _this;
    }
    Object.defineProperty(TriangleShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.Triangle; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TriangleShapeDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    TriangleShapeDescription.prototype.createConnectionPoints = function () {
        return [
            new ConnectionPoint_1.ConnectionPoint(0.5, 0, DiagramItem_1.ConnectionPointSide.North),
            new ConnectionPoint_1.ConnectionPoint(0.75, 0.5, DiagramItem_1.ConnectionPointSide.East),
            new ConnectionPoint_1.ConnectionPoint(0.5, 1, DiagramItem_1.ConnectionPointSide.South),
            new ConnectionPoint_1.ConnectionPoint(0.25, 0.5, DiagramItem_1.ConnectionPointSide.West)
        ];
    };
    TriangleShapeDescription.prototype.createShapePrimitives = function (shape) {
        var rect = shape.rectangle;
        var left = rect.x, top = rect.y, right = rect.right, bottom = rect.bottom;
        return [
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(rect.center.x, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(right, bottom),
                new PathPrimitive_1.PathPrimitiveLineToCommand(left, bottom),
                new PathPrimitive_1.PathPrimitiveClosePathCommand()
            ], shape.style)
        ];
    };
    TriangleShapeDescription.prototype.calculateHeight = function (width) {
        return Math.sqrt(Math.pow(width, 2) - Math.pow(width / 2, 2));
    };
    TriangleShapeDescription.prototype.getTextRectangle = function (shape) {
        return new rectangle_1.Rectangle(shape.position.x + shape.size.width / 4, shape.position.y + shape.size.height / 2, shape.size.width / 2, shape.size.height / 2 - ShapeDescription_1.ShapeTextPadding)
            .nonNegativeSize();
    };
    TriangleShapeDescription.prototype.getSizeByText = function (textSize, _shape) {
        return new size_1.Size(textSize.width * 2, textSize.height * 2 + ShapeDescription_1.ShapeTextPadding);
    };
    return TriangleShapeDescription;
}(ShapeDescription_1.ShapeDescription));
exports.TriangleShapeDescription = TriangleShapeDescription;
//# sourceMappingURL=TriangleShapeDescription.js.map