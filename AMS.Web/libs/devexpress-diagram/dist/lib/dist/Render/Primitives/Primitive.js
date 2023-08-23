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
exports.SvgPrimitive = void 0;
var Utils_1 = require("../Utils");
var PrimitiveObject_1 = require("./PrimitiveObject");
var SvgPrimitive = (function (_super) {
    __extends(SvgPrimitive, _super);
    function SvgPrimitive(style, className, clipPathId, onApplyProperties) {
        var _this = _super.call(this, style) || this;
        _this.className = className;
        _this.clipPathId = clipPathId;
        _this.onApplyProperties = onApplyProperties;
        _this.children = [];
        return _this;
    }
    SvgPrimitive.prototype.createElement = function (insertInDOM) {
        var el = this.createMainElement();
        this.createChildElements(el);
        insertInDOM(el);
        this.createCustomContent(el);
        return el;
    };
    SvgPrimitive.prototype.createChildElements = function (parent) {
        for (var i = 0; i < this.children.length; i++)
            this.children[i].createElement(function (el) { return parent.appendChild(el); });
    };
    SvgPrimitive.prototype.applyElementProperties = function (element, measurer) {
        this.applyElementStyleProperties(element);
        if (this.className)
            element.setAttribute("class", this.className);
        if (typeof this.clipPathId === "string")
            if (this.clipPathId)
                element.setAttribute("clip-path", Utils_1.RenderUtils.getUrlPathById(this.clipPathId));
            else
                element.removeAttribute("clip-path");
        if (this.onApplyProperties)
            this.onApplyProperties(element);
        this.applyChildrenProperties(element, measurer);
    };
    SvgPrimitive.prototype.applyChildrenProperties = function (element, measurer) {
        for (var i = 0; i < this.children.length; i++)
            this.children[i].applyElementProperties(element.childNodes[i], measurer);
    };
    SvgPrimitive.prototype.applyElementStyleProperties = function (element) {
        this.applyElementStylePropertiesCore(element);
    };
    SvgPrimitive.prototype.applyElementStylePropertiesCore = function (element, reverseTextAnchor) {
        if (reverseTextAnchor === void 0) { reverseTextAnchor = false; }
        if (this.style)
            Utils_1.RenderUtils.applyStyleToElement(this.style, element, reverseTextAnchor);
    };
    SvgPrimitive.prototype.createCustomContent = function (parent) {
    };
    SvgPrimitive.prototype.destroyCustomContent = function (parent) {
    };
    SvgPrimitive.prototype.dispose = function () {
        if (this.children)
            this.children.forEach(function (primitive) { return primitive.dispose(); });
    };
    return SvgPrimitive;
}(PrimitiveObject_1.PrimitiveObject));
exports.SvgPrimitive = SvgPrimitive;
//# sourceMappingURL=Primitive.js.map