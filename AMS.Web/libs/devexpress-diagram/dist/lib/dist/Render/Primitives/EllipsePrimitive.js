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
exports.EllipsePrimitive = void 0;
var RenderHelper_1 = require("../RenderHelper");
var Primitive_1 = require("./Primitive");
var EllipsePrimitive = (function (_super) {
    __extends(EllipsePrimitive, _super);
    function EllipsePrimitive(cx, cy, rx, ry, style, className, onApplyProperties) {
        var _this = _super.call(this, style, className, undefined, onApplyProperties) || this;
        _this.cx = cx;
        _this.cy = cy;
        _this.rx = rx;
        _this.ry = ry;
        return _this;
    }
    EllipsePrimitive.prototype.createMainElement = function () {
        return document.createElementNS(RenderHelper_1.svgNS, "ellipse");
    };
    EllipsePrimitive.prototype.applyElementProperties = function (element, measurer) {
        this.setUnitAttribute(element, "cx", this.cx);
        this.setUnitAttribute(element, "cy", this.cy);
        this.setUnitAttribute(element, "rx", this.rx);
        this.setUnitAttribute(element, "ry", this.ry);
        this.setPositionCorrectionAttribute(element);
        _super.prototype.applyElementProperties.call(this, element, measurer);
    };
    return EllipsePrimitive;
}(Primitive_1.SvgPrimitive));
exports.EllipsePrimitive = EllipsePrimitive;
//# sourceMappingURL=EllipsePrimitive.js.map