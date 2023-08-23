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
exports.ShadowFilterPrimitive = void 0;
var FilterPrimitive_1 = require("./FilterPrimitive");
var RenderHelper_1 = require("../RenderHelper");
var ShadowFilterPrimitive = (function (_super) {
    __extends(ShadowFilterPrimitive, _super);
    function ShadowFilterPrimitive() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShadowFilterPrimitive.prototype.createChildElements = function (parent) {
        var feGaussianBlur = document.createElementNS(RenderHelper_1.svgNS, "feGaussianBlur");
        feGaussianBlur.setAttribute("in", "SourceGraphic");
        feGaussianBlur.setAttribute("stdDeviation", "4.6");
        parent.appendChild(feGaussianBlur);
        var feOffset = document.createElementNS(RenderHelper_1.svgNS, "feOffset");
        feOffset.setAttribute("dx", "0");
        feOffset.setAttribute("dy", "0");
        parent.appendChild(feOffset);
        var feMerge = document.createElementNS(RenderHelper_1.svgNS, "feMerge");
        parent.appendChild(feMerge);
        var feMergeNode1 = document.createElementNS(RenderHelper_1.svgNS, "feMergeNode");
        feMerge.appendChild(feMergeNode1);
        var feMergeNode2 = document.createElementNS(RenderHelper_1.svgNS, "feMergeNode");
        feMergeNode2.setAttribute("in", "SourceGraphic");
        feMerge.appendChild(feMergeNode2);
    };
    return ShadowFilterPrimitive;
}(FilterPrimitive_1.FilterPrimitive));
exports.ShadowFilterPrimitive = ShadowFilterPrimitive;
//# sourceMappingURL=ShadowFilterPrimitive.js.map