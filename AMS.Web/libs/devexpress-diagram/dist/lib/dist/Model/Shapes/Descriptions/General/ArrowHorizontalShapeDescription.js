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
exports.ArrowHorizontalShapeDescription = exports.ArrowVerticalLineHeightParameterName = exports.ArrowVerticalTriangleWidthParameterName = void 0;
var ShapeDescription_1 = require("../ShapeDescription");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var ShapeParameters_1 = require("../../ShapeParameters");
var DiagramItem_1 = require("../../../DiagramItem");
exports.ArrowVerticalTriangleWidthParameterName = "tw";
exports.ArrowVerticalLineHeightParameterName = "lh";
var ArrowHorizontalShapeDescription = (function (_super) {
    __extends(ArrowHorizontalShapeDescription, _super);
    function ArrowHorizontalShapeDescription() {
        return _super.call(this, new size_1.Size(ShapeDescription_1.ShapeDefaultDimension, ShapeDescription_1.ShapeDefaultDimension * 0.375)) || this;
    }
    Object.defineProperty(ArrowHorizontalShapeDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    ArrowHorizontalShapeDescription.prototype.createParameters = function (parameters) {
        parameters.addRange([
            new ShapeParameters_1.ShapeParameter(exports.ArrowVerticalTriangleWidthParameterName, Math.sqrt(Math.pow(this.defaultSize.height, 2) - Math.pow(this.defaultSize.height / 2, 2))),
            new ShapeParameters_1.ShapeParameter(exports.ArrowVerticalLineHeightParameterName, this.defaultSize.height / 3)
        ]);
    };
    ArrowHorizontalShapeDescription.prototype.normalizeParameters = function (shape, parameters) {
        this.changeParameterValue(parameters, exports.ArrowVerticalTriangleWidthParameterName, function (p) { return Math.max(0, Math.min(shape.size.width, p.value)); });
        this.changeParameterValue(parameters, exports.ArrowVerticalLineHeightParameterName, function (p) { return Math.max(0, Math.min(shape.size.height, p.value)); });
    };
    ArrowHorizontalShapeDescription.prototype.processConnectionPoint = function (shape, point) {
        var delta = (shape.size.height - shape.parameters.get(exports.ArrowVerticalLineHeightParameterName).value) / 2;
        var side = shape.getConnectionPointSide(point);
        if (side === DiagramItem_1.ConnectionPointSide.North)
            point.y += delta;
        else if (side === DiagramItem_1.ConnectionPointSide.South)
            point.y -= delta;
    };
    ArrowHorizontalShapeDescription.prototype.getTextRectangle = function (shape) {
        return shape.rectangle.clone().inflate(-ShapeDescription_1.ShapeTextPadding, -ShapeDescription_1.ShapeTextPadding);
    };
    ArrowHorizontalShapeDescription.prototype.getSizeByText = function (textSize, _shape) {
        return textSize.clone().offset(ShapeDescription_1.ShapeTextPadding * 2, ShapeDescription_1.ShapeTextPadding * 2);
    };
    return ArrowHorizontalShapeDescription;
}(ShapeDescription_1.ShapeDescription));
exports.ArrowHorizontalShapeDescription = ArrowHorizontalShapeDescription;
//# sourceMappingURL=ArrowHorizontalShapeDescription.js.map