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
exports.ImagePrimitive = void 0;
var RenderHelper_1 = require("../RenderHelper");
var Primitive_1 = require("./Primitive");
var ImagePrimitive = (function (_super) {
    __extends(ImagePrimitive, _super);
    function ImagePrimitive(x, y, width, height, url, preserveAspectRatio, style, className) {
        if (preserveAspectRatio === void 0) { preserveAspectRatio = "none"; }
        var _this = _super.call(this, style, className) || this;
        _this.x = x;
        _this.y = y;
        _this.width = width;
        _this.height = height;
        _this.url = url;
        _this.preserveAspectRatio = preserveAspectRatio;
        return _this;
    }
    ImagePrimitive.prototype.createMainElement = function () {
        return document.createElementNS(RenderHelper_1.svgNS, "image");
    };
    ImagePrimitive.prototype.applyElementProperties = function (element, measurer) {
        this.setUnitAttribute(element, "x", this.x);
        this.setUnitAttribute(element, "y", this.y);
        this.setUnitAttribute(element, "width", this.width);
        this.setUnitAttribute(element, "height", this.height);
        this.setPositionCorrectionAttribute(element);
        element.setAttribute("href", this.url);
        element.setAttribute("preserveAspectRatio", this.preserveAspectRatio);
        _super.prototype.applyElementProperties.call(this, element, measurer);
    };
    return ImagePrimitive;
}(Primitive_1.SvgPrimitive));
exports.ImagePrimitive = ImagePrimitive;
//# sourceMappingURL=ImagePrimitive.js.map