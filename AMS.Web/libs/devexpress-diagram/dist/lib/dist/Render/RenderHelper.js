"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderHelper = exports.svgNS = void 0;
var Diagnostics_1 = require("../Diagnostics");
exports.svgNS = "http://www.w3.org/2000/svg";
var RenderHelper = (function () {
    function RenderHelper() {
    }
    RenderHelper.createSvgElement = function (parent, forExport) {
        if (forExport === void 0) { forExport = false; }
        var svgElement = document.createElementNS(exports.svgNS, "svg");
        svgElement.className.baseVal = "dxdi-canvas" + (forExport ? " export" : "");
        parent && parent.appendChild(svgElement);
        return svgElement;
    };
    RenderHelper.createMainElement = function (parent, forMeasurer) {
        if (forMeasurer === void 0) { forMeasurer = false; }
        var element = document.createElement("div");
        element.setAttribute("class", "dxdi-control" + (forMeasurer ? " measurer" : ""));
        if (Diagnostics_1.Diagnostics.optimizeLayers)
            element.style.transform = "translateZ(0)";
        parent && parent.appendChild(element);
        return element;
    };
    RenderHelper.addEventListener = function (element, eventName, handler) {
        element.addEventListener(eventName, handler);
    };
    RenderHelper.removeEventListener = function (element, eventName, handler) {
        element.removeEventListener(eventName, handler);
    };
    return RenderHelper;
}());
exports.RenderHelper = RenderHelper;
//# sourceMappingURL=RenderHelper.js.map