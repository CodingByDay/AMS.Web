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
exports.SvgElementPrimitive = void 0;
var RenderHelper_1 = require("../RenderHelper");
var Primitive_1 = require("./Primitive");
var SvgElementPrimitive = (function (_super) {
    __extends(SvgElementPrimitive, _super);
    function SvgElementPrimitive(x, y, width, height, createContent, destroyContent, data, className, onApplyProperties) {
        var _this = _super.call(this, null, className, undefined, onApplyProperties) || this;
        _this.x = x;
        _this.y = y;
        _this.width = width;
        _this.height = height;
        _this.createContent = createContent;
        _this.destroyContent = destroyContent;
        _this.data = data;
        return _this;
    }
    SvgElementPrimitive.prototype.createMainElement = function () {
        return document.createElementNS(RenderHelper_1.svgNS, "svg");
    };
    SvgElementPrimitive.prototype.applyElementProperties = function (element, measurer) {
        this.setUnitAttribute(element, "x", this.x);
        this.setUnitAttribute(element, "y", this.y);
        this.setUnitAttribute(element, "width", this.width);
        this.setUnitAttribute(element, "height", this.height);
        this.setPositionCorrectionAttribute(element);
        _super.prototype.applyElementProperties.call(this, element, measurer);
    };
    SvgElementPrimitive.prototype.createCustomContent = function (parent) {
        if (this.createContent)
            this.createContent(parent, this.data);
    };
    SvgElementPrimitive.prototype.destroyCustomContent = function (parent) {
        if (this.destroyContent)
            this.destroyContent(parent);
    };
    return SvgElementPrimitive;
}(Primitive_1.SvgPrimitive));
exports.SvgElementPrimitive = SvgElementPrimitive;
//# sourceMappingURL=SvgElementPrimitive.js.map