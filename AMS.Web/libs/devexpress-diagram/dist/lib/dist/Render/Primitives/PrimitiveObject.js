"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimitiveObject = void 0;
var unit_converter_1 = require("@devexpress/utils/lib/class/unit-converter");
var PrimitiveObject = (function () {
    function PrimitiveObject(style) {
        this.style = style;
    }
    Object.defineProperty(PrimitiveObject.prototype, "strokeWidthPx", {
        get: function () {
            return this.style ? this.style.strokeWidthPx : 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PrimitiveObject.prototype, "strokeOffset", {
        get: function () {
            return this.style ? this.style.strokeOffset : 0;
        },
        enumerable: false,
        configurable: true
    });
    PrimitiveObject.prototype.getUnitVaue = function (value) {
        return typeof value === "number" ? unit_converter_1.UnitConverter.twipsToPixels(value).toString() : value;
    };
    PrimitiveObject.prototype.setUnitAttribute = function (element, key, value) {
        if (value === undefined || value === null)
            return;
        element.setAttribute(key, this.getUnitVaue(value));
    };
    PrimitiveObject.prototype.setPositionCorrectionAttribute = function (element) {
        var transformAttr = this.strokeWidthPx % 2 === 1 ? "translate(" + this.strokeOffset + ", " + this.strokeOffset + ")" : "";
        element.setAttribute("transform", transformAttr);
    };
    return PrimitiveObject;
}());
exports.PrimitiveObject = PrimitiveObject;
//# sourceMappingURL=PrimitiveObject.js.map