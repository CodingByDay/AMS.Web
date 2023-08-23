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
exports.DocumentShapeDescription = void 0;
var RectangleShapeDescription_1 = require("../General/RectangleShapeDescription");
var ShapeTypes_1 = require("../../ShapeTypes");
var PathPrimitive_1 = require("../../../../Render/Primitives/PathPrimitive");
var DiagramItem_1 = require("../../../DiagramItem");
var DocumentShapeDescription = (function (_super) {
    __extends(DocumentShapeDescription, _super);
    function DocumentShapeDescription() {
        return _super.call(this, undefined, true) || this;
    }
    Object.defineProperty(DocumentShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.Document; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DocumentShapeDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    DocumentShapeDescription.prototype.createShapePrimitives = function (shape) {
        return this.createDocumentPrimitives(shape.rectangle, shape.style);
    };
    DocumentShapeDescription.prototype.createDocumentPrimitives = function (rect, style) {
        var left = rect.x, top = rect.y, right = rect.right, bottom = rect.bottom, width = rect.width, height = rect.height;
        var cx = rect.center.x;
        var dy = height * DocumentShapeDescription.curveOffsetRatio;
        var primitives = [];
        return primitives.concat([
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(left, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(right, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(right, bottom),
                new PathPrimitive_1.PathPrimitiveQuadraticCurveToCommand(right - width * 0.25, bottom - 2 * dy, cx, bottom - dy),
                new PathPrimitive_1.PathPrimitiveQuadraticCurveToCommand(left + width * 0.25, bottom + dy, left, bottom - dy),
                new PathPrimitive_1.PathPrimitiveClosePathCommand()
            ], style)
        ]);
    };
    DocumentShapeDescription.prototype.processConnectionPoint = function (shape, point) {
        var side = shape.getConnectionPointSide(point);
        if (side === DiagramItem_1.ConnectionPointSide.South)
            point.y -= shape.size.height * DocumentShapeDescription.curveOffsetRatio;
    };
    DocumentShapeDescription.prototype.getTextRectangle = function (shape) {
        var rect = shape.rectangle;
        return rect.clone().resize(0, -rect.height * DocumentShapeDescription.curveOffsetRatio);
    };
    DocumentShapeDescription.curveOffsetRatio = 0.1;
    return DocumentShapeDescription;
}(RectangleShapeDescription_1.RectangleShapeDescription));
exports.DocumentShapeDescription = DocumentShapeDescription;
//# sourceMappingURL=DocumentShapeDescription.js.map