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
exports.ArrowVerticalShapeDescription = exports.ArrowVerticalLineWidthParameterName = exports.ArrowVerticalTriangleHeightParameterName = void 0;
var ShapeDescription_1 = require("../ShapeDescription");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var ShapeParameters_1 = require("../../ShapeParameters");
var DiagramItem_1 = require("../../../DiagramItem");
exports.ArrowVerticalTriangleHeightParameterName = "th";
exports.ArrowVerticalLineWidthParameterName = "lw";
var ArrowVerticalShapeDescription = (function (_super) {
    __extends(ArrowVerticalShapeDescription, _super);
    function ArrowVerticalShapeDescription() {
        return _super.call(this, new size_1.Size(ShapeDescription_1.ShapeDefaultDimension * 0.375, ShapeDescription_1.ShapeDefaultDimension)) || this;
    }
    Object.defineProperty(ArrowVerticalShapeDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    ArrowVerticalShapeDescription.prototype.createParameters = function (parameters) {
        parameters.addRange([
            new ShapeParameters_1.ShapeParameter(exports.ArrowVerticalTriangleHeightParameterName, Math.sqrt(Math.pow(this.defaultSize.width, 2) - Math.pow(this.defaultSize.width / 2, 2))),
            new ShapeParameters_1.ShapeParameter(exports.ArrowVerticalLineWidthParameterName, this.defaultSize.width / 3)
        ]);
    };
    ArrowVerticalShapeDescription.prototype.normalizeParameters = function (shape, parameters) {
        this.changeParameterValue(parameters, exports.ArrowVerticalTriangleHeightParameterName, function (p) { return Math.max(0, Math.min(shape.size.height, p.value)); });
        this.changeParameterValue(parameters, exports.ArrowVerticalLineWidthParameterName, function (p) { return Math.max(0, Math.min(shape.size.width, p.value)); });
    };
    ArrowVerticalShapeDescription.prototype.processConnectionPoint = function (shape, point) {
        var delta = (shape.size.width - shape.parameters.get(exports.ArrowVerticalLineWidthParameterName).value) / 2;
        var side = shape.getConnectionPointSide(point);
        if (side === DiagramItem_1.ConnectionPointSide.East)
            point.x -= delta;
        else if (side === DiagramItem_1.ConnectionPointSide.West)
            point.x += delta;
    };
    ArrowVerticalShapeDescription.prototype.getTextRectangle = function (shape) {
        return shape.rectangle.clone().inflate(-ShapeDescription_1.ShapeTextPadding, -ShapeDescription_1.ShapeTextPadding);
    };
    ArrowVerticalShapeDescription.prototype.getSizeByText = function (textSize, _shape) {
        return textSize.clone().offset(ShapeDescription_1.ShapeTextPadding * 2, ShapeDescription_1.ShapeTextPadding * 2);
    };
    return ArrowVerticalShapeDescription;
}(ShapeDescription_1.ShapeDescription));
exports.ArrowVerticalShapeDescription = ArrowVerticalShapeDescription;
//# sourceMappingURL=ArrowVerticalShapeDescription.js.map