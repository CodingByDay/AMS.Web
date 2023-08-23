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
exports.PolygonShapeDescription = void 0;
var ShapeDescription_1 = require("../ShapeDescription");
var PolygonShapeDescription = (function (_super) {
    __extends(PolygonShapeDescription, _super);
    function PolygonShapeDescription(hasDefaultText) {
        var _this = _super.call(this, undefined, hasDefaultText) || this;
        _this.defaultSize.height = _this.calculateHeight(ShapeDescription_1.ShapeDefaultDimension);
        return _this;
    }
    Object.defineProperty(PolygonShapeDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return true; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PolygonShapeDescription.prototype, "angle", {
        get: function () {
            return Math.PI * (this.angleCount - 2) / this.angleCount;
        },
        enumerable: false,
        configurable: true
    });
    return PolygonShapeDescription;
}(ShapeDescription_1.ShapeDescription));
exports.PolygonShapeDescription = PolygonShapeDescription;
//# sourceMappingURL=PolygonShapeDescription.js.map