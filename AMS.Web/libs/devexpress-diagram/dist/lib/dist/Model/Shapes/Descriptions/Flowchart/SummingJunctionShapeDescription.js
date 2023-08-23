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
exports.SummingJunctionShapeDescription = void 0;
var ShapeTypes_1 = require("../../ShapeTypes");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var ShapeDescription_1 = require("../ShapeDescription");
var EllipseShapeDescription_1 = require("../General/EllipseShapeDescription");
var PathPrimitive_1 = require("../../../../Render/Primitives/PathPrimitive");
var SummingJunctionShapeDescription = (function (_super) {
    __extends(SummingJunctionShapeDescription, _super);
    function SummingJunctionShapeDescription() {
        var _this = _super.call(this, true) || this;
        _this.defaultSize = new size_1.Size(ShapeDescription_1.ShapeDefaultDimension * 0.5, ShapeDescription_1.ShapeDefaultDimension * 0.5);
        return _this;
    }
    Object.defineProperty(SummingJunctionShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.SummingJunction; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SummingJunctionShapeDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return true; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SummingJunctionShapeDescription.prototype, "enableText", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    SummingJunctionShapeDescription.prototype.createShapePrimitives = function (shape) {
        var rect = shape.rectangle;
        var width = rect.width, height = rect.height;
        var _a = rect.center, cx = _a.x, cy = _a.y;
        var rx = width / 2;
        var ry = height / 2;
        var angle = Math.atan(ry / rx);
        var ex = 1 / Math.sqrt(1 / Math.pow(rx, 2) + Math.pow(Math.tan(angle), 2) / Math.pow(ry, 2));
        var ey = ex * Math.tan(angle);
        var primitives = [];
        return primitives
            .concat(_super.prototype.createShapePrimitives.call(this, shape))
            .concat([
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(cx - ex, cy - ey),
                new PathPrimitive_1.PathPrimitiveLineToCommand(cx + ex, cy + ey),
                new PathPrimitive_1.PathPrimitiveMoveToCommand(cx - ex, cy + ey),
                new PathPrimitive_1.PathPrimitiveLineToCommand(cx + ex, cy - ey)
            ], shape.style)
        ]);
    };
    return SummingJunctionShapeDescription;
}(EllipseShapeDescription_1.EllipseShapeDescription));
exports.SummingJunctionShapeDescription = SummingJunctionShapeDescription;
//# sourceMappingURL=SummingJunctionShapeDescription.js.map