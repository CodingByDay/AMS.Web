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
exports.EmptyStyle = exports.StrokeStyle = exports.TextAlignment = exports.TextStyle = exports.Style = exports.DEFAULT_STROKE_DASHARRAY = exports.DEFAULT_STROKE_WIDTH = exports.StyleBase = void 0;
var color_1 = require("@devexpress/utils/lib/utils/color");
var Svg_1 = require("../Utils/Svg");
var unit_converter_1 = require("@devexpress/utils/lib/class/unit-converter");
var StyleBase = (function () {
    function StyleBase() {
        this.createDefaultProperties();
    }
    StyleBase.prototype.clone = function () {
        var _this = this;
        var style = this.createInstance();
        this.forEach(function (propertyName) { style[propertyName] = _this[propertyName]; });
        return style;
    };
    StyleBase.prototype.forEach = function (callback) {
        for (var propertyName in this)
            if (Object.prototype.hasOwnProperty.call(this, propertyName))
                callback(propertyName);
    };
    Object.defineProperty(StyleBase.prototype, "strokeWidthPx", {
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StyleBase.prototype, "strokeWidth", {
        get: function () {
            return unit_converter_1.UnitConverter.pixelsToTwips(this.strokeWidthPx);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StyleBase.prototype, "strokeOffset", {
        get: function () {
            return 0.5;
        },
        enumerable: false,
        configurable: true
    });
    StyleBase.prototype.toHash = function () {
        var obj = this.toObject();
        return !obj ? "" : Object.keys(obj).map(function (k) { return k + "|" + obj[k]; }).join("");
    };
    StyleBase.prototype.toObject = function () {
        var _this = this;
        var result = {};
        var modified = false;
        var defaultStyle = this.getDefaultInstance();
        this.forEach(function (key) {
            if (_this[key] !== defaultStyle[key]) {
                result[key] = _this[key];
                modified = true;
            }
        });
        return modified ? result : null;
    };
    StyleBase.prototype.fromObject = function (obj) {
        for (var key in obj)
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                var value = Svg_1.isColorProperty(key) ? color_1.ColorUtils.stringToHash(obj[key]) : obj[key];
                this[key] = value;
            }
    };
    return StyleBase;
}());
exports.StyleBase = StyleBase;
exports.DEFAULT_STROKE_WIDTH = 2;
exports.DEFAULT_STROKE_DASHARRAY = "";
var Style = (function (_super) {
    __extends(Style, _super);
    function Style() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Style.prototype.createInstance = function () {
        return new Style();
    };
    Style.prototype.createDefaultProperties = function () {
        this["fill"] = "#ffffff";
        this["stroke"] = "#000000";
        this["stroke-width"] = exports.DEFAULT_STROKE_WIDTH.toString();
        this["stroke-dasharray"] = exports.DEFAULT_STROKE_DASHARRAY;
    };
    Style.prototype.getDefaultInstance = function () {
        return Style.defaultInstance;
    };
    Style.prototype.isDefaultStrokeDashArray = function () {
        return this["stroke-dasharray"] === exports.DEFAULT_STROKE_DASHARRAY;
    };
    Style.prototype.resetStrokeDashArray = function () {
        this["stroke-dasharray"] = exports.DEFAULT_STROKE_DASHARRAY;
    };
    Object.defineProperty(Style.prototype, "strokeWidthPx", {
        get: function () {
            return parseInt(this["stroke-width"]);
        },
        enumerable: false,
        configurable: true
    });
    Style.defaultInstance = new Style();
    return Style;
}(StyleBase));
exports.Style = Style;
var TextStyle = (function (_super) {
    __extends(TextStyle, _super);
    function TextStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextStyle.prototype.createInstance = function () {
        return new TextStyle();
    };
    TextStyle.prototype.createDefaultProperties = function () {
        this["fill"] = "#000000";
        this["font-family"] = "Arial";
        this["font-size"] = "10pt";
        this["font-weight"] = "";
        this["font-style"] = "";
        this["text-decoration"] = "";
        this["text-anchor"] = "middle";
    };
    TextStyle.prototype.getDefaultInstance = function () {
        return TextStyle.defaultInstance;
    };
    TextStyle.prototype.getAlignment = function () {
        switch (this["text-anchor"]) {
            case "left":
                return TextAlignment.Left;
            case "right":
                return TextAlignment.Right;
            default:
                return TextAlignment.Center;
        }
    };
    TextStyle.defaultInstance = new TextStyle();
    return TextStyle;
}(StyleBase));
exports.TextStyle = TextStyle;
var TextAlignment;
(function (TextAlignment) {
    TextAlignment[TextAlignment["Left"] = 0] = "Left";
    TextAlignment[TextAlignment["Right"] = 1] = "Right";
    TextAlignment[TextAlignment["Center"] = 2] = "Center";
})(TextAlignment = exports.TextAlignment || (exports.TextAlignment = {}));
var StrokeStyle = (function (_super) {
    __extends(StrokeStyle, _super);
    function StrokeStyle(strokeWidthPx, strokeOffset) {
        var _this = _super.call(this) || this;
        _this._strokeWidthPx = strokeWidthPx;
        _this._strokeOffset = strokeOffset;
        return _this;
    }
    StrokeStyle.prototype.createInstance = function () {
        return new StrokeStyle();
    };
    StrokeStyle.prototype.createDefaultProperties = function () {
    };
    StrokeStyle.prototype.getDefaultInstance = function () {
        return TextStyle.defaultInstance;
    };
    Object.defineProperty(StrokeStyle.prototype, "strokeWidthPx", {
        get: function () {
            return this._strokeWidthPx || 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StrokeStyle.prototype, "strokeOffset", {
        get: function () {
            return this._strokeOffset || 0;
        },
        enumerable: false,
        configurable: true
    });
    StrokeStyle.default1pxInstance = new StrokeStyle(1, 0.5);
    StrokeStyle.default1pxNegativeOffsetInstance = new StrokeStyle(1, -0.5);
    StrokeStyle.default2pxInstance = new StrokeStyle(2);
    return StrokeStyle;
}(Style));
exports.StrokeStyle = StrokeStyle;
var EmptyStyle = (function (_super) {
    __extends(EmptyStyle, _super);
    function EmptyStyle(styles) {
        var _this = _super.call(this) || this;
        if (styles)
            Object.keys(styles).forEach(function (k) { return _this[k] = styles[k]; });
        return _this;
    }
    EmptyStyle.prototype.createInstance = function () {
        return new EmptyStyle();
    };
    EmptyStyle.prototype.createDefaultProperties = function () {
    };
    EmptyStyle.prototype.getDefaultInstance = function () {
        return TextStyle.defaultInstance;
    };
    EmptyStyle.defaultInstance = new EmptyStyle();
    return EmptyStyle;
}(Style));
exports.EmptyStyle = EmptyStyle;
//# sourceMappingURL=Style.js.map