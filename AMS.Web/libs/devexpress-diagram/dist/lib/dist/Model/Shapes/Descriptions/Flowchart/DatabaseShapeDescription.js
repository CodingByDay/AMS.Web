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
exports.DatabaseShapeDescription = void 0;
var RectangleShapeDescription_1 = require("../General/RectangleShapeDescription");
var ShapeTypes_1 = require("../../ShapeTypes");
var PathPrimitive_1 = require("../../../../Render/Primitives/PathPrimitive");
var EllipsePrimitive_1 = require("../../../../Render/Primitives/EllipsePrimitive");
var DatabaseShapeDescription = (function (_super) {
    __extends(DatabaseShapeDescription, _super);
    function DatabaseShapeDescription() {
        var _this = _super.call(this, undefined, true) || this;
        _this.defaultSize.width = _this.defaultSize.height;
        return _this;
    }
    Object.defineProperty(DatabaseShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.Database; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DatabaseShapeDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    DatabaseShapeDescription.prototype.createShapePrimitives = function (shape) {
        var rect = shape.rectangle;
        var left = rect.x, top = rect.y, right = rect.right, bottom = rect.bottom, height = rect.height;
        var cx = rect.center.x;
        var dy = height * DatabaseShapeDescription.arcWidthRatio;
        return [
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(right, top + dy / 2),
                new PathPrimitive_1.PathPrimitiveLineToCommand(right, bottom - dy / 2),
                new PathPrimitive_1.PathPrimitiveArcToCommand((right - left) / 2, dy / 2, 0, false, true, left, bottom - dy / 2),
                new PathPrimitive_1.PathPrimitiveLineToCommand(left, top + dy / 2),
            ], shape.style),
            new EllipsePrimitive_1.EllipsePrimitive(cx, top + dy / 2, (right - left) / 2, dy / 2, shape.style)
        ];
    };
    DatabaseShapeDescription.prototype.getTextRectangle = function (shape) {
        var rect = shape.rectangle;
        var dy = rect.height * DatabaseShapeDescription.arcWidthRatio;
        return rect.clone().resize(0, -dy).clone().moveRectangle(0, dy);
    };
    DatabaseShapeDescription.arcWidthRatio = 0.2;
    return DatabaseShapeDescription;
}(RectangleShapeDescription_1.RectangleShapeDescription));
exports.DatabaseShapeDescription = DatabaseShapeDescription;
//# sourceMappingURL=DatabaseShapeDescription.js.map