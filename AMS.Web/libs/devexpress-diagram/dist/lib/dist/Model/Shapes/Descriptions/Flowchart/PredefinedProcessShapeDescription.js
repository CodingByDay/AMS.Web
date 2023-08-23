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
exports.PredefinedProcessShapeDescription = exports.PredefinedProcessEdgeParameterName = void 0;
var RectangleShapeDescription_1 = require("../General/RectangleShapeDescription");
var ShapeTypes_1 = require("../../ShapeTypes");
var ShapeParameters_1 = require("../../ShapeParameters");
var ShapeParameterPoint_1 = require("../../ShapeParameterPoint");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var PathPrimitive_1 = require("../../../../Render/Primitives/PathPrimitive");
exports.PredefinedProcessEdgeParameterName = "e";
var PredefinedProcessShapeDescription = (function (_super) {
    __extends(PredefinedProcessShapeDescription, _super);
    function PredefinedProcessShapeDescription() {
        return _super.call(this, undefined, true) || this;
    }
    Object.defineProperty(PredefinedProcessShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.PredefinedProcess; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PredefinedProcessShapeDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    PredefinedProcessShapeDescription.prototype.createShapePrimitives = function (shape) {
        var rect = shape.rectangle;
        var left = rect.x, top = rect.y, right = rect.right, bottom = rect.bottom;
        var x1 = left + shape.parameters.get(exports.PredefinedProcessEdgeParameterName).value;
        var x2 = right - shape.parameters.get(exports.PredefinedProcessEdgeParameterName).value;
        var primitives = _super.prototype.createShapePrimitives.call(this, shape);
        return primitives.concat([
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(x1, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(x1, bottom),
                new PathPrimitive_1.PathPrimitiveMoveToCommand(x2, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(x2, bottom)
            ], shape.style)
        ]);
    };
    PredefinedProcessShapeDescription.prototype.createParameters = function (parameters) {
        parameters.add(new ShapeParameters_1.ShapeParameter(exports.PredefinedProcessEdgeParameterName, this.defaultSize.width * 0.1));
    };
    PredefinedProcessShapeDescription.prototype.normalizeParameters = function (shape, parameters) {
        this.changeParameterValue(parameters, exports.PredefinedProcessEdgeParameterName, function (p) { return Math.max(PredefinedProcessShapeDescription.minEdge, Math.min(shape.size.width * 0.3, p.value)); });
    };
    PredefinedProcessShapeDescription.prototype.modifyParameters = function (shape, parameters, deltaX, deltaY) {
        this.changeParameterValue(parameters, exports.PredefinedProcessEdgeParameterName, function (p) { return p.value + deltaX; });
        this.normalizeParameters(shape, parameters);
    };
    PredefinedProcessShapeDescription.prototype.getParameterPoints = function (shape) {
        return [
            new ShapeParameterPoint_1.ShapeParameterPoint("c", new point_1.Point(shape.normalizeX(shape.position.x + shape.parameters.get(exports.PredefinedProcessEdgeParameterName).value), shape.position.y))
        ];
    };
    PredefinedProcessShapeDescription.prototype.getTextRectangle = function (shape) {
        var rect = shape.rectangle;
        var dx = shape.parameters.get(exports.PredefinedProcessEdgeParameterName).value;
        return rect.clone().resize(-2 * dx, 0).clone().moveRectangle(dx, 0);
    };
    PredefinedProcessShapeDescription.minEdge = 72;
    return PredefinedProcessShapeDescription;
}(RectangleShapeDescription_1.RectangleShapeDescription));
exports.PredefinedProcessShapeDescription = PredefinedProcessShapeDescription;
//# sourceMappingURL=PredefinedProcessShapeDescription.js.map