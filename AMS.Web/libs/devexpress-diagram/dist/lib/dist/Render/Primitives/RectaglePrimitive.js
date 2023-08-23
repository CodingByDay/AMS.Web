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
exports.RectanglePrimitive = void 0;
var RenderHelper_1 = require("../RenderHelper");
var Primitive_1 = require("./Primitive");
var RectanglePrimitive = (function (_super) {
    __extends(RectanglePrimitive, _super);
    function RectanglePrimitive(x, y, width, height, style, className, clipPathId, onApplyProperties) {
        var _this = _super.call(this, style, className, clipPathId, onApplyProperties) || this;
        _this.x = x;
        _this.y = y;
        _this.width = width;
        _this.height = height;
        return _this;
    }
    RectanglePrimitive.prototype.createMainElement = function () {
        return document.createElementNS(RenderHelper_1.svgNS, "rect");
    };
    RectanglePrimitive.prototype.applyElementProperties = function (element, measurer) {
        this.setUnitAttribute(element, "x", this.x);
        this.setUnitAttribute(element, "y", this.y);
        this.setUnitAttribute(element, "width", this.width);
        this.setUnitAttribute(element, "height", this.height);
        this.setPositionCorrectionAttribute(element);
        _super.prototype.applyElementProperties.call(this, element, measurer);
    };
    return RectanglePrimitive;
}(Primitive_1.SvgPrimitive));
exports.RectanglePrimitive = RectanglePrimitive;
//# sourceMappingURL=RectaglePrimitive.js.map