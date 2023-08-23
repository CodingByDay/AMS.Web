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
exports.TextShapeDescription = void 0;
var ShapeDescription_1 = require("../ShapeDescription");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var ShapeTypes_1 = require("../../ShapeTypes");
var ClipPathPrimitive_1 = require("../../../../Render/Primitives/ClipPathPrimitive");
var RectaglePrimitive_1 = require("../../../../Render/Primitives/RectaglePrimitive");
var Utils_1 = require("../../../../Render/Utils");
var TextShapeDescription = (function (_super) {
    __extends(TextShapeDescription, _super);
    function TextShapeDescription() {
        var _this = _super.call(this, new size_1.Size(ShapeDescription_1.ShapeDefaultDimension, ShapeDescription_1.ShapeDefaultDimension * 0.5), true) || this;
        _this.textClipPathId = Utils_1.RenderUtils.generateSvgElementId("clipRect");
        return _this;
    }
    Object.defineProperty(TextShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.Text; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextShapeDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    TextShapeDescription.prototype.createShapePrimitives = function (shape, forToolbox) {
        if (forToolbox) {
            var _a = shape.rectangle, left = _a.x, top_1 = _a.y, width = _a.width, height = _a.height;
            return [
                new ClipPathPrimitive_1.ClipPathPrimitive(this.getTextClipPathId(forToolbox), [
                    new RectaglePrimitive_1.RectanglePrimitive(left, top_1, width, height)
                ])
            ];
        }
        return [];
    };
    TextShapeDescription.prototype.getTextClipPathId = function (forToolbox) {
        return forToolbox ? this.textClipPathId : undefined;
    };
    TextShapeDescription.prototype.getSizeByTextRectangle = function (textSize) {
        return textSize;
    };
    TextShapeDescription.prototype.getSizeByText = function (textSize, shape) {
        return textSize.clone();
    };
    TextShapeDescription.prototype.getTextRectangle = function (shape) {
        return shape.rectangle;
    };
    return TextShapeDescription;
}(ShapeDescription_1.ShapeDescription));
exports.TextShapeDescription = TextShapeDescription;
//# sourceMappingURL=TextShapeDescription.js.map