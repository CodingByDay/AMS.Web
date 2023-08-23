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
exports.PaperTapeShapeDescription = void 0;
var RectangleShapeDescription_1 = require("../General/RectangleShapeDescription");
var ShapeTypes_1 = require("../../ShapeTypes");
var PathPrimitive_1 = require("../../../../Render/Primitives/PathPrimitive");
var DiagramItem_1 = require("../../../DiagramItem");
var ShapeDescription_1 = require("../ShapeDescription");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var PaperTapeShapeDescription = (function (_super) {
    __extends(PaperTapeShapeDescription, _super);
    function PaperTapeShapeDescription() {
        return _super.call(this, undefined, true) || this;
    }
    Object.defineProperty(PaperTapeShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.PaperTape; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PaperTapeShapeDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    PaperTapeShapeDescription.prototype.createShapePrimitives = function (shape) {
        return this.createDocumentPrimitives(shape.rectangle, shape.style);
    };
    PaperTapeShapeDescription.prototype.createDocumentPrimitives = function (rect, style) {
        var left = rect.x, top = rect.y, right = rect.right, bottom = rect.bottom, width = rect.width, height = rect.height;
        var cx = rect.center.x;
        var dy = height * PaperTapeShapeDescription.curveOffsetRatio;
        var primitives = [];
        return primitives.concat([
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(left, top),
                new PathPrimitive_1.PathPrimitiveQuadraticCurveToCommand(left + width * 0.25, top + 2 * dy, cx, top + dy),
                new PathPrimitive_1.PathPrimitiveQuadraticCurveToCommand(right - width * 0.25, top - dy, right, top + dy),
                new PathPrimitive_1.PathPrimitiveLineToCommand(right, bottom),
                new PathPrimitive_1.PathPrimitiveQuadraticCurveToCommand(right - width * 0.25, bottom - 2 * dy, cx, bottom - dy),
                new PathPrimitive_1.PathPrimitiveQuadraticCurveToCommand(left + width * 0.25, bottom + dy, left, bottom - dy),
                new PathPrimitive_1.PathPrimitiveClosePathCommand()
            ], style)
        ]);
    };
    PaperTapeShapeDescription.prototype.processConnectionPoint = function (shape, point) {
        var side = shape.getConnectionPointSide(point);
        if (side === DiagramItem_1.ConnectionPointSide.North)
            point.y += shape.size.height * PaperTapeShapeDescription.curveOffsetRatio;
        if (side === DiagramItem_1.ConnectionPointSide.South)
            point.y -= shape.size.height * PaperTapeShapeDescription.curveOffsetRatio;
    };
    PaperTapeShapeDescription.prototype.getTextRectangle = function (shape) {
        var rect = shape.rectangle;
        return rect.clone().inflate(ShapeDescription_1.ShapeTextPadding, -rect.height * PaperTapeShapeDescription.curveOffsetRatio);
    };
    PaperTapeShapeDescription.prototype.getSizeByText = function (textSize, _shape) {
        return new size_1.Size(textSize.width + ShapeDescription_1.ShapeTextPadding * 2, textSize.height / (1 - 2 * PaperTapeShapeDescription.curveOffsetRatio));
    };
    PaperTapeShapeDescription.curveOffsetRatio = 0.1;
    return PaperTapeShapeDescription;
}(RectangleShapeDescription_1.RectangleShapeDescription));
exports.PaperTapeShapeDescription = PaperTapeShapeDescription;
//# sourceMappingURL=PaperTapeShapeDescription.js.map