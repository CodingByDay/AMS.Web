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
exports.MultipleDocumentsShapeDescription = void 0;
var ShapeTypes_1 = require("../../ShapeTypes");
var PathPrimitive_1 = require("../../../../Render/Primitives/PathPrimitive");
var DocumentShapeDescription_1 = require("./DocumentShapeDescription");
var ClipPathPrimitive_1 = require("../../../../Render/Primitives/ClipPathPrimitive");
var Utils_1 = require("../../../../Render/Utils");
var ShapeDescription_1 = require("../ShapeDescription");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var MultipleDocumentsShapeDescription = (function (_super) {
    __extends(MultipleDocumentsShapeDescription, _super);
    function MultipleDocumentsShapeDescription() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MultipleDocumentsShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.MultipleDocuments; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MultipleDocumentsShapeDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    MultipleDocumentsShapeDescription.prototype.createShapePrimitives = function (shape, forToolbox) {
        var rect = shape.rectangle;
        var _a = shape.rectangle, width = _a.width, height = _a.height;
        var ratio = forToolbox ? MultipleDocumentsShapeDescription.documentsOffsetRatioForToolbox : MultipleDocumentsShapeDescription.documentsOffsetRatio;
        var documentOffsetX = Math.ceil(width * ratio);
        var documentOffsetY = Math.ceil(height * ratio);
        rect = rect.clone().inflate(-documentOffsetX, -documentOffsetY).clone().moveRectangle(-documentOffsetX, -documentOffsetY);
        var rect1 = rect.clone().moveRectangle(documentOffsetX, documentOffsetY);
        var rect2 = rect1.clone().moveRectangle(documentOffsetX, documentOffsetY);
        var clipPathId = Utils_1.RenderUtils.generateSvgElementId("clipRect");
        var primitives = [];
        return primitives
            .concat(this.createDocumentPrimitives(rect, shape.style, clipPathId + "1", rect1))
            .concat(this.createDocumentPrimitives(rect1, shape.style, clipPathId + "2", rect2))
            .concat(this.createDocumentPrimitives(rect2, shape.style));
    };
    MultipleDocumentsShapeDescription.prototype.createDocumentPrimitives = function (rect, style, clipPathId, clipRect) {
        var left = rect.x, top = rect.y, right = rect.right, bottom = rect.bottom, width = rect.width, height = rect.height;
        var cx = rect.center.x;
        var dy = height * DocumentShapeDescription_1.DocumentShapeDescription.curveOffsetRatio;
        var primitives = [];
        primitives = primitives.concat([
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(left, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(right, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(right, bottom),
                new PathPrimitive_1.PathPrimitiveQuadraticCurveToCommand(right - width * 0.25, bottom - 2 * dy, cx, bottom - dy),
                new PathPrimitive_1.PathPrimitiveQuadraticCurveToCommand(left + width * 0.25, bottom + dy, left, bottom - dy),
                new PathPrimitive_1.PathPrimitiveClosePathCommand()
            ], style, undefined, clipRect && clipPathId)
        ]);
        if (clipRect && clipPathId)
            primitives = primitives.concat([
                new ClipPathPrimitive_1.ClipPathPrimitive(clipPathId, [
                    new PathPrimitive_1.PathPrimitive([
                        new PathPrimitive_1.PathPrimitiveMoveToCommand(left - style.strokeWidth, top - style.strokeWidth),
                        new PathPrimitive_1.PathPrimitiveLineToCommand(right + style.strokeWidth, top - style.strokeWidth),
                        new PathPrimitive_1.PathPrimitiveLineToCommand(right + style.strokeWidth, clipRect.y),
                        new PathPrimitive_1.PathPrimitiveLineToCommand(clipRect.x, clipRect.y),
                        new PathPrimitive_1.PathPrimitiveLineToCommand(clipRect.x, bottom + style.strokeWidth),
                        new PathPrimitive_1.PathPrimitiveLineToCommand(left - style.strokeWidth, bottom + style.strokeWidth),
                        new PathPrimitive_1.PathPrimitiveClosePathCommand()
                    ])
                ])
            ]);
        return primitives;
    };
    MultipleDocumentsShapeDescription.prototype.getTextRectangle = function (shape) {
        var rect = shape.rectangle;
        var documentOffsetX = rect.width * MultipleDocumentsShapeDescription.documentsOffsetRatio;
        var documentOffsetY = rect.height * MultipleDocumentsShapeDescription.documentsOffsetRatio;
        rect = rect.clone().inflate(-documentOffsetX, -documentOffsetY).clone().moveRectangle(-documentOffsetX, -documentOffsetY);
        var innerRect = rect.clone().moveRectangle(2 * documentOffsetX + ShapeDescription_1.ShapeTextPadding, 2 * documentOffsetY + ShapeDescription_1.ShapeTextPadding);
        return innerRect.clone().resize(-2 * ShapeDescription_1.ShapeTextPadding, -rect.height * DocumentShapeDescription_1.DocumentShapeDescription.curveOffsetRatio - 2 * ShapeDescription_1.ShapeTextPadding);
    };
    MultipleDocumentsShapeDescription.prototype.getSizeByText = function (textSize, _shape) {
        return new size_1.Size((textSize.width + 2 * ShapeDescription_1.ShapeTextPadding) / (1 - 2 * MultipleDocumentsShapeDescription.documentsOffsetRatio), (textSize.height + 2 * ShapeDescription_1.ShapeTextPadding) / ((1 - DocumentShapeDescription_1.DocumentShapeDescription.curveOffsetRatio) * (1 - MultipleDocumentsShapeDescription.documentsOffsetRatio)))
            .nonNegativeSize();
    };
    MultipleDocumentsShapeDescription.documentsOffsetRatio = 0.1;
    MultipleDocumentsShapeDescription.documentsOffsetRatioForToolbox = 0.16;
    return MultipleDocumentsShapeDescription;
}(DocumentShapeDescription_1.DocumentShapeDescription));
exports.MultipleDocumentsShapeDescription = MultipleDocumentsShapeDescription;
//# sourceMappingURL=MultipleDocumentsShapeDescription.js.map