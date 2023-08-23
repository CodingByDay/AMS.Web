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
exports.OrShapeDescription = void 0;
var ShapeTypes_1 = require("../../ShapeTypes");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var ShapeDescription_1 = require("../ShapeDescription");
var EllipseShapeDescription_1 = require("../General/EllipseShapeDescription");
var PathPrimitive_1 = require("../../../../Render/Primitives/PathPrimitive");
var OrShapeDescription = (function (_super) {
    __extends(OrShapeDescription, _super);
    function OrShapeDescription() {
        var _this = _super.call(this, true) || this;
        _this.defaultSize = new size_1.Size(ShapeDescription_1.ShapeDefaultDimension * 0.5, ShapeDescription_1.ShapeDefaultDimension * 0.5);
        return _this;
    }
    Object.defineProperty(OrShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.Or; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OrShapeDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return true; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OrShapeDescription.prototype, "enableText", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    OrShapeDescription.prototype.createShapePrimitives = function (shape) {
        var rect = shape.rectangle;
        var left = rect.x, top = rect.y, right = rect.right, bottom = rect.bottom;
        var _a = rect.center, cx = _a.x, cy = _a.y;
        var primitives = [];
        return primitives
            .concat(_super.prototype.createShapePrimitives.call(this, shape))
            .concat([
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(cx, top),
                new PathPrimitive_1.PathPrimitiveLineToCommand(cx, bottom),
                new PathPrimitive_1.PathPrimitiveMoveToCommand(left, cy),
                new PathPrimitive_1.PathPrimitiveLineToCommand(right, cy)
            ], shape.style)
        ]);
    };
    return OrShapeDescription;
}(EllipseShapeDescription_1.EllipseShapeDescription));
exports.OrShapeDescription = OrShapeDescription;
//# sourceMappingURL=OrShapeDescription.js.map