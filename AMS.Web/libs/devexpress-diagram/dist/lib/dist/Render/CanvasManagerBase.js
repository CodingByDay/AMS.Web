"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasManagerBase = exports.PAGE_BG_TEXTFLOOR_FILTER_IDPREFIX = void 0;
var TextFilterPrimitive_1 = require("./Primitives/TextFilterPrimitive");
var unit_converter_1 = require("@devexpress/utils/lib/class/unit-converter");
exports.PAGE_BG_TEXTFLOOR_FILTER_IDPREFIX = "page-text-flood";
var CanvasManagerBase = (function () {
    function CanvasManagerBase(actualZoom, dom, instanceId) {
        this.elements = {};
        this.instanceId = instanceId;
        this.actualZoom = actualZoom;
        this.dom = dom;
    }
    CanvasManagerBase.prototype.createAndChangePrimitivesElements = function (primitives, parent) {
        var _this = this;
        primitives.forEach(function (primitive) {
            _this.createAndChangePrimitiveElement(primitive, parent);
        });
    };
    CanvasManagerBase.prototype.createPrimitiveElement = function (primitive, parent, sibling) {
        return this.dom.createElement(primitive, parent, sibling);
    };
    CanvasManagerBase.prototype.createAndChangePrimitiveElement = function (primitive, parent, sibling) {
        var element = this.createPrimitiveElement(primitive, parent, sibling);
        this.dom.changeByPrimitive(element, primitive);
        return element;
    };
    CanvasManagerBase.prototype.changePrimitiveElement = function (primitive, element) {
        this.dom.changeByPrimitive(element, primitive);
    };
    CanvasManagerBase.prototype.getOrCreateElement = function (key, primitive, parent, sibling) {
        var element = (key && this.elements[key]) || (this.elements[key] = this.createPrimitiveElement(primitive, parent, sibling));
        this.changePrimitiveElement(primitive, element);
        return element;
    };
    CanvasManagerBase.prototype.createTextFloodFilter = function (instanceId, key, parent, pageColor) {
        this.getOrCreateElement(key, new TextFilterPrimitive_1.TextFloodFilterPrimitive(exports.PAGE_BG_TEXTFLOOR_FILTER_IDPREFIX + instanceId, pageColor), parent);
    };
    CanvasManagerBase.prototype.getAbsoluteSize = function (modelSize) {
        return modelSize
            .clone().applyConverter(unit_converter_1.UnitConverter.twipsToPixelsF)
            .clone().multiply(this.actualZoom, this.actualZoom);
    };
    return CanvasManagerBase;
}());
exports.CanvasManagerBase = CanvasManagerBase;
//# sourceMappingURL=CanvasManagerBase.js.map