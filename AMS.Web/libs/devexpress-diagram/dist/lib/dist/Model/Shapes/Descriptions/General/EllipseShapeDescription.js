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
exports.EllipseShapeDescription = void 0;
var ShapeDescription_1 = require("../ShapeDescription");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var EllipsePrimitive_1 = require("../../../../Render/Primitives/EllipsePrimitive");
var ShapeTypes_1 = require("../../ShapeTypes");
var Utils_1 = require("../../../../Utils");
var rectangle_1 = require("@devexpress/utils/lib/geometry/rectangle");
var EllipseShapeDescription = (function (_super) {
    __extends(EllipseShapeDescription, _super);
    function EllipseShapeDescription(hasDefaultText) {
        return _super.call(this, new size_1.Size(ShapeDescription_1.ShapeDefaultDimension, ShapeDescription_1.ShapeDefaultDimension * 0.75), hasDefaultText) || this;
    }
    Object.defineProperty(EllipseShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.Ellipse; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EllipseShapeDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    EllipseShapeDescription.prototype.getTextRectangle = function (shape) {
        var textSize = Utils_1.GeometryUtils.getMaxRectangleEnscribedInEllipse(shape.size);
        return rectangle_1.Rectangle.fromGeometry(shape.position.clone().offset((shape.size.width - textSize.width) / 2, (shape.size.height - textSize.height) / 2), textSize);
    };
    EllipseShapeDescription.prototype.getSizeByText = function (textSize, _shape) {
        return Utils_1.GeometryUtils.getEllipseByEnscribedRectangle(textSize);
    };
    EllipseShapeDescription.prototype.createShapePrimitives = function (shape) {
        var rect = shape.rectangle;
        var width = rect.width, height = rect.height;
        var _a = rect.center, cx = _a.x, cy = _a.y;
        return [
            new EllipsePrimitive_1.EllipsePrimitive(cx, cy, width / 2, height / 2, shape.style),
        ];
    };
    return EllipseShapeDescription;
}(ShapeDescription_1.ShapeDescription));
exports.EllipseShapeDescription = EllipseShapeDescription;
//# sourceMappingURL=EllipseShapeDescription.js.map