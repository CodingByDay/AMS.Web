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
exports.ExportDOMManipulator = exports.DOMManipulator = void 0;
var Diagnostics_1 = require("../Diagnostics");
var RAF_CHANGES_LIMIT = 2000;
var DOMManipulator = (function () {
    function DOMManipulator(measurer) {
        this.measurer = measurer;
        this.queue = [];
    }
    DOMManipulator.prototype.createElement = function (primitive, parent, sibling) {
        return primitive.createElement(function (el) {
            if (parent != null)
                if (sibling !== undefined)
                    parent.insertBefore(el, sibling);
                else
                    parent.appendChild(el);
        });
    };
    DOMManipulator.prototype.changeChildrenByPrimitives = function (primitives, parent) {
        var _this = this;
        primitives.forEach(function (primitive, index) {
            var element = parent.childNodes[index];
            _this.changeByPrimitive(element, primitive);
        });
    };
    DOMManipulator.prototype.changeByFunc = function (element, func) {
        this.doChange(element, func);
    };
    DOMManipulator.prototype.changeByPrimitive = function (element, primitive) {
        this.doChange(element, primitive);
    };
    DOMManipulator.prototype.cancelAnimation = function () {
        if (this.rafId !== undefined) {
            cancelAnimationFrame(this.rafId);
            this.queue = [];
        }
    };
    DOMManipulator.prototype.doChange = function (element, action) {
        if (Diagnostics_1.Diagnostics.optimizeUsingRAF) {
            this.queue.push([element, action]);
            this.requestAnimation();
        }
        else
            this.doChangeSync(element, action);
    };
    DOMManipulator.prototype.doChangeSync = function (element, action) {
        if (typeof action === "function")
            action(element);
        else
            action.applyElementProperties(element, this.measurer);
    };
    DOMManipulator.prototype.requestAnimation = function () {
        var _this = this;
        if (!this.rafRequested) {
            this.rafRequested = true;
            var func_1 = function () {
                _this.queue.splice(0, RAF_CHANGES_LIMIT).forEach(function (t) { return _this.doChangeSync(t[0], t[1]); });
                if (_this.queue.length)
                    _this.rafId = requestAnimationFrame(func_1);
                else {
                    _this.rafRequested = false;
                    _this.rafId = undefined;
                }
            };
            this.rafId = requestAnimationFrame(func_1);
        }
    };
    return DOMManipulator;
}());
exports.DOMManipulator = DOMManipulator;
var ExportDOMManipulator = (function (_super) {
    __extends(ExportDOMManipulator, _super);
    function ExportDOMManipulator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExportDOMManipulator.prototype.doChange = function (element, action) {
        this.doChangeSync(element, action);
    };
    return ExportDOMManipulator;
}(DOMManipulator));
exports.ExportDOMManipulator = ExportDOMManipulator;
//# sourceMappingURL=DOMManipulator.js.map