"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.raiseEvent = exports.RenderUtils = void 0;
var Event_1 = require("../Events/Event");
var math_1 = require("@devexpress/utils/lib/utils/math");
var RenderUtils = (function () {
    function RenderUtils() {
    }
    RenderUtils.updateSvgElementSize = function (svgElement, width, height, forExport) {
        svgElement.style.width = width + "px";
        svgElement.style.height = height + "px";
        svgElement.setAttribute("viewBox", "0 0 " + width + " " + height);
        if (forExport) {
            svgElement.setAttribute("width", width.toString());
            svgElement.setAttribute("height", height.toString());
        }
    };
    RenderUtils.removeElement = function (element) {
        element && element.parentNode && element.parentNode.removeChild(element);
    };
    RenderUtils.removeContent = function (element) {
        while (element && element.firstChild)
            element.removeChild(element.firstChild);
    };
    RenderUtils.setElementEventData = function (element, type, key, value) {
        if (type === Event_1.MouseEventElementType.Undefined)
            return;
        element.setAttribute("data-type", type.toString());
        if (key !== undefined)
            element.setAttribute("data-key", key.toString());
        if (value !== undefined)
            element.setAttribute("data-value", value.toString());
    };
    RenderUtils.getElementEventData = function (element) {
        if (element.getAttribute && element.getAttribute("data-type"))
            return new Event_1.MouseEventSource(parseInt(element.getAttribute("data-type")), element.getAttribute("data-key"), element.getAttribute("data-value"));
        var className = element.getAttribute && element.getAttribute("class");
        if (className === "dxdi-page" || className === "dxdi-main")
            return new Event_1.MouseEventSource(Event_1.MouseEventElementType.Document);
    };
    RenderUtils.getHtmlElementStylePropertyName = function (propertyName) {
        switch (propertyName) {
            case "fill":
                return "color";
            case "text-anchor":
                return "text-align";
        }
        return propertyName;
    };
    RenderUtils.getTextAnchorValue = function (propertyValue, reverseTextAnchor) {
        if (reverseTextAnchor === void 0) { reverseTextAnchor = false; }
        if (reverseTextAnchor) {
            if (propertyValue === "start")
                return "end";
            if (propertyValue === "end")
                return "start";
        }
        return propertyValue;
    };
    RenderUtils.getStrokeDasharrayValue = function (propertyValue, strokeWidth) {
        if (strokeWidth) {
            var dashArray = propertyValue && propertyValue.toString();
            var dashArrayParts = dashArray ? dashArray.split(/[\s,]+/) : [];
            return dashArrayParts.map(function (v) { return parseInt(v) / 2 * strokeWidth; }).join(",");
        }
        return propertyValue;
    };
    RenderUtils.applyStyleToElement = function (style, element, reverseTextAnchor) {
        var _this = this;
        if (reverseTextAnchor === void 0) { reverseTextAnchor = false; }
        var defaultStyle = style.getDefaultInstance();
        style.forEach(function (propertyName) {
            var propertyValue = style[propertyName];
            var elPropertyName = (element instanceof HTMLElement) ? _this.getHtmlElementStylePropertyName(propertyName) : propertyName;
            if (propertyValue !== undefined && propertyValue !== "" && propertyValue !== defaultStyle[propertyName]) {
                switch (propertyName) {
                    case "text-anchor":
                        propertyValue = _this.getTextAnchorValue(propertyValue, reverseTextAnchor);
                        break;
                    case "stroke-dasharray":
                        propertyValue = _this.getStrokeDasharrayValue(propertyValue, parseInt(style["stroke-width"]));
                        break;
                }
                element.style.setProperty(elPropertyName, propertyValue);
            }
            else
                element.style.setProperty(elPropertyName, "");
        });
    };
    RenderUtils.generateSvgElementId = function (prefix) {
        return prefix + "_" + math_1.MathUtils.generateGuid();
    };
    RenderUtils.getUrlPathById = function (id) {
        return "url(#" + id + ")";
    };
    return RenderUtils;
}());
exports.RenderUtils = RenderUtils;
function raiseEvent(evt, _evt, raiseFunc) {
    raiseFunc(_evt);
    if (_evt.preventDefault)
        evt.preventDefault();
}
exports.raiseEvent = raiseEvent;
//# sourceMappingURL=Utils.js.map