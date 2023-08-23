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
exports.LinePrimitive = void 0;
var RenderHelper_1 = require("../RenderHelper");
var Primitive_1 = require("./Primitive");
var LinePrimitive = (function (_super) {
    __extends(LinePrimitive, _super);
    function LinePrimitive(x1, y1, x2, y2, style, className, clipPathId, onApplyProperties) {
        var _this = _super.call(this, style, className, clipPathId, onApplyProperties) || this;
        _this.x1 = x1;
        _this.y1 = y1;
        _this.x2 = x2;
        _this.y2 = y2;
        return _this;
    }
    LinePrimitive.prototype.createMainElement = function () {
        return document.createElementNS(RenderHelper_1.svgNS, "line");
    };
    LinePrimitive.prototype.applyElementProperties = function (element, measurer) {
        this.setUnitAttribute(element, "x1", this.x1);
        this.setUnitAttribute(element, "y1", this.y1);
        this.setUnitAttribute(element, "x2", this.x2);
        this.setUnitAttribute(element, "y2", this.y2);
        this.setPositionCorrectionAttribute(element);
        _super.prototype.applyElementProperties.call(this, element, measurer);
    };
    return LinePrimitive;
}(Primitive_1.SvgPrimitive));
exports.LinePrimitive = LinePrimitive;
//# sourceMappingURL=LinePrimitive.js.map