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
exports.GroupPrimitive = void 0;
var RenderHelper_1 = require("../RenderHelper");
var Primitive_1 = require("./Primitive");
var GroupPrimitive = (function (_super) {
    __extends(GroupPrimitive, _super);
    function GroupPrimitive(children, className, zIndex, clipPathId, onApplyProperties, onBeforeDispose) {
        var _this = _super.call(this, null, className, clipPathId, onApplyProperties) || this;
        _this.zIndex = zIndex;
        _this.onBeforeDispose = onBeforeDispose;
        _this.children = children;
        return _this;
    }
    GroupPrimitive.prototype.createMainElement = function () {
        return document.createElementNS(RenderHelper_1.svgNS, "g");
    };
    GroupPrimitive.prototype.applyElementProperties = function (element, measurer) {
        if (this.zIndex || this.zIndex === 0)
            element.style.setProperty("z-index", this.zIndex.toString());
        _super.prototype.applyElementProperties.call(this, element, measurer);
    };
    GroupPrimitive.prototype.dispose = function () {
        if (this.onBeforeDispose)
            this.onBeforeDispose();
        _super.prototype.dispose.call(this);
    };
    return GroupPrimitive;
}(Primitive_1.SvgPrimitive));
exports.GroupPrimitive = GroupPrimitive;
//# sourceMappingURL=GroupPrimitive.js.map