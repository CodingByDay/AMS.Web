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
exports.CrossShapeDescription = exports.CrossVerticalWidthParameterName = exports.CrossHorizontalWidthParameterName = void 0;
var ShapeDescription_1 = require("../ShapeDescription");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var ShapeParameters_1 = require("../../ShapeParameters");
var ShapeParameterPoint_1 = require("../../ShapeParameterPoint");
var PathPrimitive_1 = require("../../../../Render/Primitives/PathPrimitive");
var ShapeTypes_1 = require("../../ShapeTypes");
exports.CrossHorizontalWidthParameterName = "chw";
exports.CrossVerticalWidthParameterName = "cvw";
var CrossShapeDescription = (function (_super) {
    __extends(CrossShapeDescription, _super);
    function CrossShapeDescription() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CrossShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.Cross; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CrossShapeDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return true; },
        enumerable: false,
        configurable: true
    });
    CrossShapeDescription.prototype.createShapePrimitives = function (shape) {
        var rect = shape.rectangle;
        var left = rect.x, top = rect.y, right = rect.right, bottom = rect.bottom, width = rect.width, height = rect.height;
        var p0dx = (width - shape.parameters.get(exports.CrossHorizontalWidthParameterName).value) / 2;
        var p1dy = (height - shape.parameters.get(exports.CrossVerticalWidthParameterName).value) / 2;
        var p0x1 = shape.normalizeX(left + p0dx);
        var p1y1 = shape.normalizeY(top + p1dy);
        var p0x2 = shape.normalizeX(right - p0dx);
        var p1y2 = shape.normalizeY(bottom - p1dy);
        return [
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(left, p1y1),
                new PathPrimitive_1.PathPrimitiveLineToCommand(p0x1, p1y1),
                new PathPrimitive_1.PathPrimitiveLineToCommand(p0x1, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(p0x2, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(p0x2, p1y1),
                new PathPrimitive_1.PathPrimitiveLineToCommand(right, p1y1),
                new PathPrimitive_1.PathPrimitiveLineToCommand(right, p1y2),
                new PathPrimitive_1.PathPrimitiveLineToCommand(p0x2, p1y2),
                new PathPrimitive_1.PathPrimitiveLineToCommand(p0x2, bottom),
                new PathPrimitive_1.PathPrimitiveLineToCommand(p0x1, bottom),
                new PathPrimitive_1.PathPrimitiveLineToCommand(p0x1, p1y2),
                new PathPrimitive_1.PathPrimitiveLineToCommand(left, p1y2),
                new PathPrimitive_1.PathPrimitiveClosePathCommand()
            ], shape.style)
        ];
    };
    CrossShapeDescription.prototype.createParameters = function (parameters) {
        parameters.addRange([
            new ShapeParameters_1.ShapeParameter(exports.CrossHorizontalWidthParameterName, this.defaultSize.width * 0.2),
            new ShapeParameters_1.ShapeParameter(exports.CrossVerticalWidthParameterName, this.defaultSize.height * 0.2)
        ]);
    };
    CrossShapeDescription.prototype.normalizeParameters = function (shape, parameters) {
        this.changeParameterValue(parameters, exports.CrossHorizontalWidthParameterName, function (p) { return Math.max(0, Math.min(shape.size.width, p.value)); });
        this.changeParameterValue(parameters, exports.CrossVerticalWidthParameterName, function (p) { return Math.max(0, Math.min(shape.size.height, p.value)); });
    };
    CrossShapeDescription.prototype.modifyParameters = function (shape, parameters, deltaX, deltaY) {
        this.changeParameterValue(parameters, exports.CrossHorizontalWidthParameterName, function (p) { return p.value - deltaX * 2; });
        this.changeParameterValue(parameters, exports.CrossVerticalWidthParameterName, function (p) { return p.value - deltaY * 2; });
        this.normalizeParameters(shape, parameters);
    };
    CrossShapeDescription.prototype.getParameterPoints = function (shape) {
        return [
            new ShapeParameterPoint_1.ShapeParameterPoint("c", new point_1.Point(shape.normalizeX(shape.position.x + (shape.size.width - shape.parameters.get(exports.CrossHorizontalWidthParameterName).value) / 2), shape.normalizeY(shape.position.y + (shape.size.height - shape.parameters.get(exports.CrossVerticalWidthParameterName).value) / 2)))
        ];
    };
    CrossShapeDescription.prototype.getTextRectangle = function (shape) {
        return shape.rectangle.clone().inflate(-ShapeDescription_1.ShapeTextPadding, -ShapeDescription_1.ShapeTextPadding);
    };
    CrossShapeDescription.prototype.getSizeByText = function (textSize, _shape) {
        return textSize.clone().offset(ShapeDescription_1.ShapeTextPadding * 2, ShapeDescription_1.ShapeTextPadding * 2);
    };
    return CrossShapeDescription;
}(ShapeDescription_1.ShapeDescription));
exports.CrossShapeDescription = CrossShapeDescription;
//# sourceMappingURL=CrossShapeDescription.js.map