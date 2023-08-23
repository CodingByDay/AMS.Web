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
exports.MergeShapeDescription = void 0;
var ShapeTypes_1 = require("../../ShapeTypes");
var rectangle_1 = require("@devexpress/utils/lib/geometry/rectangle");
var TriangleShapeDescription_1 = require("../General/TriangleShapeDescription");
var PathPrimitive_1 = require("../../../../Render/Primitives/PathPrimitive");
var ShapeDescription_1 = require("../ShapeDescription");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var MergeShapeDescription = (function (_super) {
    __extends(MergeShapeDescription, _super);
    function MergeShapeDescription() {
        return _super.call(this, true) || this;
    }
    Object.defineProperty(MergeShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.Merge; },
        enumerable: false,
        configurable: true
    });
    MergeShapeDescription.prototype.createShapePrimitives = function (shape) {
        var rect = shape.rectangle;
        var left = rect.x, top = rect.y, right = rect.right, bottom = rect.bottom;
        return [
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(left, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(right, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(rect.center.x, bottom),
                new PathPrimitive_1.PathPrimitiveClosePathCommand()
            ], shape.style)
        ];
    };
    MergeShapeDescription.prototype.calculateHeight = function (width) {
        return width * 0.75;
    };
    MergeShapeDescription.prototype.getTextRectangle = function (shape) {
        return rectangle_1.Rectangle.fromGeometry(shape.position.clone().offset(shape.size.width / 4, ShapeDescription_1.ShapeTextPadding), new size_1.Size(shape.size.width / 2, shape.size.height / 2 - ShapeDescription_1.ShapeTextPadding));
    };
    MergeShapeDescription.prototype.getSizeByText = function (textSize, _shape) {
        return new size_1.Size(textSize.width * 2, (textSize.height + ShapeDescription_1.ShapeTextPadding) * 2);
    };
    return MergeShapeDescription;
}(TriangleShapeDescription_1.TriangleShapeDescription));
exports.MergeShapeDescription = MergeShapeDescription;
//# sourceMappingURL=MergeShapeDescription.js.map