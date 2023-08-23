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
exports.ClipPathPrimitive = void 0;
var RenderHelper_1 = require("../RenderHelper");
var Primitive_1 = require("./Primitive");
var ClipPathPrimitive = (function (_super) {
    __extends(ClipPathPrimitive, _super);
    function ClipPathPrimitive(id, children) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.children = children;
        return _this;
    }
    ClipPathPrimitive.prototype.createMainElement = function () {
        var element = document.createElementNS(RenderHelper_1.svgNS, "clipPath");
        element.setAttribute("id", this.id);
        return element;
    };
    ClipPathPrimitive.prototype.applyElementProperties = function (element, measurer) {
        if (this.id)
            element.setAttribute("id", this.id);
        _super.prototype.applyElementProperties.call(this, element, measurer);
    };
    return ClipPathPrimitive;
}(Primitive_1.SvgPrimitive));
exports.ClipPathPrimitive = ClipPathPrimitive;
//# sourceMappingURL=ClipPathPrimitive.js.map