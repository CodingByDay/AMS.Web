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
exports.RectangleShapeDescription = void 0;
var ShapeDescription_1 = require("../ShapeDescription");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var RectaglePrimitive_1 = require("../../../../Render/Primitives/RectaglePrimitive");
var ShapeTypes_1 = require("../../ShapeTypes");
var RectangleShapeDescription = (function (_super) {
    __extends(RectangleShapeDescription, _super);
    function RectangleShapeDescription(defaultSize, hasDefaultText) {
        if (defaultSize === void 0) { defaultSize = new size_1.Size(ShapeDescription_1.ShapeDefaultDimension, ShapeDescription_1.ShapeDefaultDimension * 0.75); }
        return _super.call(this, defaultSize, hasDefaultText) || this;
    }
    Object.defineProperty(RectangleShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.Rectangle; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RectangleShapeDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    RectangleShapeDescription.prototype.createShapePrimitives = function (shape) {
        var _a = shape.rectangle, left = _a.x, top = _a.y, width = _a.width, height = _a.height;
        return [
            new RectaglePrimitive_1.RectanglePrimitive(left, top, width, height, shape.style),
        ];
    };
    RectangleShapeDescription.prototype.getTextRectangle = function (shape) {
        return shape.rectangle.clone().inflate(-ShapeDescription_1.ShapeTextPadding, -ShapeDescription_1.ShapeTextPadding);
    };
    RectangleShapeDescription.prototype.getSizeByText = function (textSize, _shape) {
        return textSize.clone().offset(ShapeDescription_1.ShapeTextPadding * 2, ShapeDescription_1.ShapeTextPadding * 2);
    };
    return RectangleShapeDescription;
}(ShapeDescription_1.ShapeDescription));
exports.RectangleShapeDescription = RectangleShapeDescription;
//# sourceMappingURL=RectangleShapeDescription.js.map