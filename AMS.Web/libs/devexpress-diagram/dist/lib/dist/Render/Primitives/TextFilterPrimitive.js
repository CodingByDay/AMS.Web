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
exports.TextFloodFilterPrimitive = exports.TextFilterPrimitive = void 0;
var RenderHelper_1 = require("../RenderHelper");
var FilterPrimitive_1 = require("./FilterPrimitive");
var Model_1 = require("../../Model/Model");
var color_1 = require("@devexpress/utils/lib/utils/color");
var TextFilterPrimitive = (function (_super) {
    __extends(TextFilterPrimitive, _super);
    function TextFilterPrimitive(id, x, y, width, height) {
        if (x === void 0) { x = "-0.05"; }
        if (y === void 0) { y = "-0.05"; }
        if (width === void 0) { width = "1.1"; }
        if (height === void 0) { height = "1.1"; }
        var _this = _super.call(this, id, x, y, width, height) || this;
        _this.id = id;
        _this.x = x;
        _this.y = y;
        _this.width = width;
        _this.height = height;
        return _this;
    }
    TextFilterPrimitive.prototype.createChildElements = function (parent) {
        var feFlood = document.createElementNS(RenderHelper_1.svgNS, "feFlood");
        parent.appendChild(feFlood);
        var feComposite = document.createElementNS(RenderHelper_1.svgNS, "feComposite");
        feComposite.setAttribute("in", "SourceGraphic");
        feComposite.setAttribute("operator", "atop");
        parent.appendChild(feComposite);
    };
    return TextFilterPrimitive;
}(FilterPrimitive_1.FilterPrimitive));
exports.TextFilterPrimitive = TextFilterPrimitive;
var TextFloodFilterPrimitive = (function (_super) {
    __extends(TextFloodFilterPrimitive, _super);
    function TextFloodFilterPrimitive(id, floodColor, x, y, width, height) {
        if (x === void 0) { x = "-0.05"; }
        if (y === void 0) { y = "-0.05"; }
        if (width === void 0) { width = "1.1"; }
        if (height === void 0) { height = "1.1"; }
        var _this = _super.call(this, id, x, y, width, height) || this;
        _this.id = id;
        _this.floodColor = floodColor;
        _this.x = x;
        _this.y = y;
        _this.width = width;
        _this.height = height;
        return _this;
    }
    TextFloodFilterPrimitive.prototype.applyChildrenProperties = function (element) {
        for (var child = void 0, i = 0; child = element.childNodes[i]; i++)
            if (child.nodeName && child.nodeName.toUpperCase() === "FEFLOOD") {
                this.prepareFEFloodNode(child);
                break;
            }
    };
    TextFloodFilterPrimitive.prototype.prepareFEFloodNode = function (node) {
        var colorHash = color_1.ColorUtils.colorToHash(this.floodColor);
        node.setAttribute("flood-color", colorHash);
        node.setAttribute("class", "text-filter-flood");
        if (this.floodColor !== Model_1.DiagramModel.defaultPageColor)
            node.style.setProperty("flood-color", colorHash);
        else
            node.style.setProperty("flood-color", "");
    };
    return TextFloodFilterPrimitive;
}(TextFilterPrimitive));
exports.TextFloodFilterPrimitive = TextFloodFilterPrimitive;
//# sourceMappingURL=TextFilterPrimitive.js.map