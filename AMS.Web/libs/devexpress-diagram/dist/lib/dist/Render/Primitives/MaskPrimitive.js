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
exports.MaskPrimitive = void 0;
var RenderHelper_1 = require("../RenderHelper");
var Primitive_1 = require("./Primitive");
var MaskPrimitive = (function (_super) {
    __extends(MaskPrimitive, _super);
    function MaskPrimitive(id, children, className, x, y, width, height) {
        var _this = _super.call(this, null, className) || this;
        _this.id = id;
        _this.x = x;
        _this.y = y;
        _this.width = width;
        _this.height = height;
        _this.children = children;
        return _this;
    }
    MaskPrimitive.prototype.createMainElement = function () {
        var element = document.createElementNS(RenderHelper_1.svgNS, "mask");
        element.setAttribute("id", this.id);
        return element;
    };
    MaskPrimitive.prototype.applyElementProperties = function (element, measurer) {
        if (this.id)
            element.setAttribute("id", this.id);
        this.setUnitAttribute(element, "x", this.x);
        this.setUnitAttribute(element, "y", this.y);
        this.setUnitAttribute(element, "width", this.width);
        this.setUnitAttribute(element, "height", this.height);
        this.setPositionCorrectionAttribute(element);
        _super.prototype.applyElementProperties.call(this, element, measurer);
    };
    return MaskPrimitive;
}(Primitive_1.SvgPrimitive));
exports.MaskPrimitive = MaskPrimitive;
//# sourceMappingURL=MaskPrimitive.js.map