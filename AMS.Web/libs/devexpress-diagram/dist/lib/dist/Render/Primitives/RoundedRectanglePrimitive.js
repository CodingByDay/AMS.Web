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
exports.RoundedRectanglePrimitive = void 0;
var RenderHelper_1 = require("../RenderHelper");
var RectaglePrimitive_1 = require("./RectaglePrimitive");
var RoundedRectanglePrimitive = (function (_super) {
    __extends(RoundedRectanglePrimitive, _super);
    function RoundedRectanglePrimitive(x, y, width, height, rx, ry, style, className, clipPathId, onApplyProperties) {
        if (rx === void 0) { rx = 0; }
        if (ry === void 0) { ry = 0; }
        var _this = _super.call(this, x, y, width, height, style, className, clipPathId, onApplyProperties) || this;
        _this.x = x;
        _this.y = y;
        _this.width = width;
        _this.height = height;
        _this.rx = rx;
        _this.ry = ry;
        return _this;
    }
    RoundedRectanglePrimitive.prototype.createMainElement = function () {
        return document.createElementNS(RenderHelper_1.svgNS, "rect");
    };
    RoundedRectanglePrimitive.prototype.applyElementProperties = function (element, measurer) {
        this.setUnitAttribute(element, "rx", this.rx);
        this.setUnitAttribute(element, "ry", this.ry);
        _super.prototype.applyElementProperties.call(this, element, measurer);
    };
    return RoundedRectanglePrimitive;
}(RectaglePrimitive_1.RectanglePrimitive));
exports.RoundedRectanglePrimitive = RoundedRectanglePrimitive;
//# sourceMappingURL=RoundedRectanglePrimitive.js.map