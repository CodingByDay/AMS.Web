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
exports.VerticalContainerDescription = void 0;
var point_1 = require("@devexpress/utils/lib/geometry/point");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var RectaglePrimitive_1 = require("../../../../Render/Primitives/RectaglePrimitive");
var rectangle_1 = require("@devexpress/utils/lib/geometry/rectangle");
var ShapeTypes_1 = require("../../ShapeTypes");
var ShapeDescription_1 = require("../ShapeDescription");
var ContainerDescription_1 = require("./ContainerDescription");
var VerticalContainerDescription = (function (_super) {
    __extends(VerticalContainerDescription, _super);
    function VerticalContainerDescription() {
        return _super.call(this, new size_1.Size(ShapeDescription_1.ShapeDefaultDimension * 2, ShapeDescription_1.ShapeDefaultDimension * 1.5)) || this;
    }
    Object.defineProperty(VerticalContainerDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.VerticalContainer; },
        enumerable: false,
        configurable: true
    });
    VerticalContainerDescription.prototype.getExpandedSize = function (shape) {
        return new size_1.Size(shape.size.width, shape.expandedSize.height);
    };
    VerticalContainerDescription.prototype.getCollapsedSize = function (shape) {
        return new size_1.Size(shape.size.width, ContainerDescription_1.CONTAINER_HEADER_SIZE + 2 * shape.strokeWidth);
    };
    VerticalContainerDescription.prototype.allowResizeVertically = function (shape) {
        return shape.expanded;
    };
    VerticalContainerDescription.prototype.createHeaderPrimitives = function (shape, forToolbox) {
        var rect = shape.rectangle;
        var left = rect.x, top = rect.y, width = rect.width;
        var headerSize = this.getHeaderSize(shape, forToolbox);
        var primitives = [];
        primitives = primitives.concat([
            new RectaglePrimitive_1.RectanglePrimitive(left, top, width, headerSize, shape.style)
        ]);
        if (!forToolbox)
            primitives = primitives.concat(this.createExpandButtonPrimitives(shape, new rectangle_1.Rectangle(left, top, headerSize, headerSize)));
        return primitives;
    };
    VerticalContainerDescription.prototype.getClientRectangle = function (shape) {
        var rect = shape.rectangle;
        var headerSize = this.getHeaderSize(shape);
        return rectangle_1.Rectangle.fromGeometry(new point_1.Point(rect.x, rect.y + headerSize), new size_1.Size(rect.width, rect.height - headerSize));
    };
    VerticalContainerDescription.prototype.getTextRectangle = function (shape) {
        var rect = shape.rectangle;
        var headerSize = this.getHeaderSize(shape);
        return rectangle_1.Rectangle.fromGeometry(new point_1.Point(rect.x + headerSize, rect.y), new size_1.Size(rect.width - headerSize, headerSize));
    };
    VerticalContainerDescription.prototype.getSizeByText = function (textSize, shape) {
        var headerSize = this.getHeaderSize(shape);
        return new size_1.Size(Math.max(shape.size.width, textSize.width + headerSize), shape.size.height);
    };
    VerticalContainerDescription.prototype.getHeaderSize = function (shape, forToolbox) {
        var rect = shape.rectangle;
        return forToolbox ? rect.height * ContainerDescription_1.CONTAINER_HEADER_TOOLBOX_SIZE_RATIO : (ContainerDescription_1.CONTAINER_HEADER_SIZE + 2 * shape.strokeWidth);
    };
    return VerticalContainerDescription;
}(ContainerDescription_1.ContainerDescription));
exports.VerticalContainerDescription = VerticalContainerDescription;
//# sourceMappingURL=VerticalContainerDescription.js.map