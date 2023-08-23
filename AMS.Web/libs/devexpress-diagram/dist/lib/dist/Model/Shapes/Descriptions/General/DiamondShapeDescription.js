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
exports.DiamondShapeDescription = void 0;
var ShapeDescription_1 = require("../ShapeDescription");
var PathPrimitive_1 = require("../../../../Render/Primitives/PathPrimitive");
var ShapeTypes_1 = require("../../ShapeTypes");
var DiamondShapeDescription = (function (_super) {
    __extends(DiamondShapeDescription, _super);
    function DiamondShapeDescription(defaultSize, hasDefaultText) {
        if (defaultSize === void 0) { defaultSize = ShapeDescription_1.ShapeDefaultSize.clone(); }
        return _super.call(this, defaultSize, hasDefaultText) || this;
    }
    Object.defineProperty(DiamondShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.Diamond; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiamondShapeDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    DiamondShapeDescription.prototype.createShapePrimitives = function (shape) {
        var rect = shape.rectangle;
        var left = rect.x, top = rect.y, right = rect.right, bottom = rect.bottom;
        var _a = rect.center, cx = _a.x, cy = _a.y;
        return [
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(cx, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(right, cy),
                new PathPrimitive_1.PathPrimitiveLineToCommand(cx, bottom),
                new PathPrimitive_1.PathPrimitiveLineToCommand(left, cy),
                new PathPrimitive_1.PathPrimitiveClosePathCommand()
            ], shape.style)
        ];
    };
    DiamondShapeDescription.prototype.getTextRectangle = function (shape) {
        return shape.rectangle.clone().inflate(-shape.size.width / 4, -shape.size.height / 4);
    };
    DiamondShapeDescription.prototype.getSizeByText = function (textSize, _shape) {
        return textSize.clone().multiply(2, 2);
    };
    return DiamondShapeDescription;
}(ShapeDescription_1.ShapeDescription));
exports.DiamondShapeDescription = DiamondShapeDescription;
//# sourceMappingURL=DiamondShapeDescription.js.map