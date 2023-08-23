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
exports.HorizontalContainerDescription = void 0;
var ShapeDescription_1 = require("../ShapeDescription");
var rectangle_1 = require("@devexpress/utils/lib/geometry/rectangle");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var ShapeTypes_1 = require("../../ShapeTypes");
var ContainerDescription_1 = require("./ContainerDescription");
var RectaglePrimitive_1 = require("../../../../Render/Primitives/RectaglePrimitive");
var TextPrimitive_1 = require("../../../../Render/Primitives/TextPrimitive");
var HorizontalContainerDescription = (function (_super) {
    __extends(HorizontalContainerDescription, _super);
    function HorizontalContainerDescription() {
        return _super.call(this, new size_1.Size(ShapeDescription_1.ShapeDefaultDimension * 2, ShapeDescription_1.ShapeDefaultDimension * 1.5)) || this;
    }
    Object.defineProperty(HorizontalContainerDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.HorizontalContainer; },
        enumerable: false,
        configurable: true
    });
    HorizontalContainerDescription.prototype.getExpandedSize = function (shape) {
        return new size_1.Size(shape.expandedSize.width, shape.size.height);
    };
    HorizontalContainerDescription.prototype.getCollapsedSize = function (shape) {
        return new size_1.Size(ContainerDescription_1.CONTAINER_HEADER_SIZE + 2 * shape.strokeWidth, shape.size.height);
    };
    HorizontalContainerDescription.prototype.allowResizeHorizontally = function (shape) {
        return shape.expanded;
    };
    HorizontalContainerDescription.prototype.createHeaderPrimitives = function (shape, forToolbox) {
        var rect = shape.rectangle;
        var left = rect.x, top = rect.y, height = rect.height;
        var headerSize = this.getHeaderSize(shape, forToolbox);
        var primitives = [];
        primitives = primitives.concat([
            new RectaglePrimitive_1.RectanglePrimitive(left, top, headerSize, height, shape.style)
        ]);
        if (!forToolbox)
            primitives = primitives.concat(this.createExpandButtonPrimitives(shape, new rectangle_1.Rectangle(left, top, headerSize, headerSize)));
        return primitives;
    };
    HorizontalContainerDescription.prototype.getClientRectangle = function (shape) {
        var rect = shape.rectangle;
        var headerSize = this.getHeaderSize(shape);
        return rectangle_1.Rectangle.fromGeometry(new point_1.Point(rect.x + headerSize, rect.y), new size_1.Size(rect.width - headerSize, rect.height));
    };
    HorizontalContainerDescription.prototype.getTextRectangle = function (shape) {
        var rect = shape.rectangle;
        var headerSize = this.getHeaderSize(shape);
        return rectangle_1.Rectangle.fromGeometry(new point_1.Point(rect.x, rect.y + headerSize), new size_1.Size(headerSize, rect.height - headerSize))
            .nonNegativeSize();
    };
    HorizontalContainerDescription.prototype.getSizeByText = function (textSize, shape) {
        var headerSize = this.getHeaderSize(shape);
        return new size_1.Size(shape.size.width, Math.max(shape.size.height, Math.max(textSize.width + headerSize, shape.size.height)));
    };
    HorizontalContainerDescription.prototype.getTextEditRectangle = function (shape) {
        var rect = this.getTextRectangle(shape);
        return rectangle_1.Rectangle.fromGeometry(new point_1.Point(rect.x, rect.y + rect.height), new size_1.Size(rect.height, rect.width));
    };
    HorizontalContainerDescription.prototype.getTextAngle = function () {
        return TextPrimitive_1.TextAngle.Angle270deg;
    };
    HorizontalContainerDescription.prototype.getHeaderSize = function (shape, forToolbox) {
        var rect = shape.rectangle;
        return forToolbox ? rect.height * ContainerDescription_1.CONTAINER_HEADER_TOOLBOX_SIZE_RATIO : (ContainerDescription_1.CONTAINER_HEADER_SIZE + 2 * shape.strokeWidth);
    };
    return HorizontalContainerDescription;
}(ContainerDescription_1.ContainerDescription));
exports.HorizontalContainerDescription = HorizontalContainerDescription;
//# sourceMappingURL=HorizontalContainerDescription.js.map