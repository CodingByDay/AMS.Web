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
exports.InternalStorageShapeDescription = exports.InternalStorageVerticalEdgeParameterName = exports.InternalStorageHorizontalEdgeParameterName = void 0;
var RectangleShapeDescription_1 = require("../General/RectangleShapeDescription");
var ShapeTypes_1 = require("../../ShapeTypes");
var ShapeParameters_1 = require("../../ShapeParameters");
var ShapeParameterPoint_1 = require("../../ShapeParameterPoint");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var PathPrimitive_1 = require("../../../../Render/Primitives/PathPrimitive");
exports.InternalStorageHorizontalEdgeParameterName = "he";
exports.InternalStorageVerticalEdgeParameterName = "ve";
var InternalStorageShapeDescription = (function (_super) {
    __extends(InternalStorageShapeDescription, _super);
    function InternalStorageShapeDescription() {
        return _super.call(this, undefined, true) || this;
    }
    Object.defineProperty(InternalStorageShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.InternalStorage; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InternalStorageShapeDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    InternalStorageShapeDescription.prototype.createShapePrimitives = function (shape) {
        var rect = shape.rectangle;
        var left = rect.x, top = rect.y, right = rect.right, bottom = rect.bottom;
        var x = left + shape.parameters.get(exports.InternalStorageHorizontalEdgeParameterName).value;
        var y = top + shape.parameters.get(exports.InternalStorageVerticalEdgeParameterName).value;
        var primitives = _super.prototype.createShapePrimitives.call(this, shape);
        return primitives.concat([
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(x, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(x, bottom),
                new PathPrimitive_1.PathPrimitiveMoveToCommand(left, y),
                new PathPrimitive_1.PathPrimitiveLineToCommand(right, y)
            ], shape.style)
        ]);
    };
    InternalStorageShapeDescription.prototype.createParameters = function (parameters) {
        parameters.addRange([
            new ShapeParameters_1.ShapeParameter(exports.InternalStorageHorizontalEdgeParameterName, this.defaultSize.width * 0.1),
            new ShapeParameters_1.ShapeParameter(exports.InternalStorageVerticalEdgeParameterName, this.defaultSize.width * 0.1)
        ]);
    };
    InternalStorageShapeDescription.prototype.normalizeParameters = function (shape, parameters) {
        this.changeParameterValue(parameters, exports.InternalStorageHorizontalEdgeParameterName, function (p) { return Math.max(InternalStorageShapeDescription.minEdge, Math.min(shape.size.width * 0.3, p.value)); });
        this.changeParameterValue(parameters, exports.InternalStorageVerticalEdgeParameterName, function (p) { return Math.max(InternalStorageShapeDescription.minEdge, Math.min(shape.size.height * 0.3, p.value)); });
    };
    InternalStorageShapeDescription.prototype.modifyParameters = function (shape, parameters, deltaX, deltaY) {
        this.changeParameterValue(parameters, exports.InternalStorageHorizontalEdgeParameterName, function (p) { return p.value + deltaX; });
        this.changeParameterValue(parameters, exports.InternalStorageVerticalEdgeParameterName, function (p) { return p.value + deltaY; });
        this.normalizeParameters(shape, parameters);
    };
    InternalStorageShapeDescription.prototype.getParameterPoints = function (shape) {
        return [
            new ShapeParameterPoint_1.ShapeParameterPoint("c", new point_1.Point(shape.normalizeX(shape.position.x + shape.parameters.get(exports.InternalStorageHorizontalEdgeParameterName).value), shape.normalizeY(shape.position.y + shape.parameters.get(exports.InternalStorageVerticalEdgeParameterName).value)))
        ];
    };
    InternalStorageShapeDescription.prototype.getTextRectangle = function (shape) {
        var rect = shape.rectangle;
        var dx = shape.parameters.get(exports.InternalStorageHorizontalEdgeParameterName).value;
        return rect.clone().resize(-dx, 0).clone().moveRectangle(dx, 0);
    };
    InternalStorageShapeDescription.minEdge = 72;
    return InternalStorageShapeDescription;
}(RectangleShapeDescription_1.RectangleShapeDescription));
exports.InternalStorageShapeDescription = InternalStorageShapeDescription;
//# sourceMappingURL=InternalStorageShapeDescription.js.map