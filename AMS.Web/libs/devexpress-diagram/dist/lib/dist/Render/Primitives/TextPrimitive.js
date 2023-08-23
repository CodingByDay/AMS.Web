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
exports.TextPrimitive270degRenderHelper = exports.TextPrimitive180degRenderHelper = exports.TextPrimitive90degRenderHelper = exports.TextPrimitiveRenderHelper = exports.TextPrimitive = exports.TextAngle = void 0;
var unit_converter_1 = require("@devexpress/utils/lib/class/unit-converter");
var RenderHelper_1 = require("../RenderHelper");
var Primitive_1 = require("./Primitive");
var Utils_1 = require("../Utils");
var TextUtils_1 = require("../../Utils/TextUtils");
var TextAngle;
(function (TextAngle) {
    TextAngle[TextAngle["Angle0deg"] = 0] = "Angle0deg";
    TextAngle[TextAngle["Angle90deg"] = 90] = "Angle90deg";
    TextAngle[TextAngle["Angle180deg"] = 180] = "Angle180deg";
    TextAngle[TextAngle["Angle270deg"] = 270] = "Angle270deg";
})(TextAngle = exports.TextAngle || (exports.TextAngle = {}));
var TextPrimitive = (function (_super) {
    __extends(TextPrimitive, _super);
    function TextPrimitive(x, y, text, owner, textWidth, textHeight, textSpacing, style, reverseTextAhchor, clipPathId, filterId, angle, onApplyProperties) {
        var _this = _super.call(this, style, "", clipPathId, onApplyProperties) || this;
        _this.x = x;
        _this.y = y;
        _this.text = text;
        _this.owner = owner;
        _this.textWidth = textWidth;
        _this.textHeight = textHeight;
        _this.textSpacing = textSpacing;
        _this.reverseTextAhchor = reverseTextAhchor;
        _this.angle = angle;
        _this.filterId = filterId;
        _this.textSegmens = TextUtils_1.textToParagraphs(_this.text);
        _this.renderHelper = _this.createRenderHelper();
        if (_this.textWidth !== undefined && _this.textWidth !== undefined) {
            _this.x = _this.renderHelper.getTextX(_this.x);
            _this.y = _this.renderHelper.getTextY(_this.y);
        }
        return _this;
    }
    TextPrimitive.prototype.createMainElement = function () {
        return document.createElementNS(RenderHelper_1.svgNS, "text");
    };
    TextPrimitive.prototype.applyElementProperties = function (element, measurer) {
        this.setUnitAttribute(element, "x", this.x);
        this.setUnitAttribute(element, "y", this.y);
        if (this.filterId)
            element.setAttribute("filter", Utils_1.RenderUtils.getUrlPathById(this.filterId));
        _super.prototype.applyElementProperties.call(this, element, measurer);
        if (element.getAttribute("appliedText") !== this.text || element.getAttribute("appliedSize") !== (this.fitToSize && this.fitToSize.toString())) {
            this.createTSpanElements(element, measurer);
            element.setAttribute("appliedText", this.text);
            element.setAttribute("appliedSize", (this.fitToSize && this.fitToSize.toString()));
        }
        else
            this.prepareTSpanElements(element);
        this.renderHelper.prepareMainElement(element, this.x, this.y);
    };
    TextPrimitive.prototype.createTSpanElements = function (element, measurer) {
        var _this = this;
        Utils_1.RenderUtils.removeContent(element);
        this.textSegmens.forEach(function (txt, index) {
            if (!txt && _this.textSegmens.length > 1) {
                var span = _this.createTSpanElement(element);
                span.textContent = " ";
            }
            else if (_this.fitToSize) {
                var words_1 = TextUtils_1.textToWords(txt);
                var lines = TextUtils_1.wordsByLines(unit_converter_1.UnitConverter.twipsToPixels(_this.fitToSize), words_1, function () { return measurer.measureWords(words_1, _this.style, _this.owner); });
                lines.forEach(function (line) {
                    var span = _this.createTSpanElement(element);
                    span.textContent = line;
                });
                if (!lines.length) {
                    var span = _this.createTSpanElement(element);
                    span.textContent = " ";
                }
            }
            else {
                var tSpan = _this.createTSpanElement(element);
                tSpan.textContent = txt;
            }
        });
        var firstTSpan = element.firstChild;
        if (firstTSpan)
            this.prepareFirstTSpanElement(firstTSpan, element.childNodes.length);
    };
    TextPrimitive.prototype.createTSpanElement = function (parent) {
        var tSpan = document.createElementNS(RenderHelper_1.svgNS, "tspan");
        parent.appendChild(tSpan);
        this.prepareTSpanElement(tSpan);
        return tSpan;
    };
    TextPrimitive.prototype.prepareTSpanElements = function (element) {
        for (var i = 0; i < element.childNodes.length; i++) {
            var tSpan = element.childNodes[i];
            this.prepareTSpanElement(tSpan);
        }
        var firstTSpan = element.firstChild;
        if (firstTSpan)
            this.prepareFirstTSpanElement(firstTSpan, element.childNodes.length);
    };
    TextPrimitive.prototype.prepareTSpanElement = function (tSpan) {
        this.renderHelper.prepareTSpanElement(tSpan, this.x, this.y);
    };
    TextPrimitive.prototype.prepareFirstTSpanElement = function (tSpan, lineCount) {
        this.renderHelper.prepareFirstTSpanElement(tSpan, lineCount);
    };
    TextPrimitive.prototype.applyElementStyleProperties = function (element) {
        this.applyElementStylePropertiesCore(element, this.reverseTextAhchor);
    };
    Object.defineProperty(TextPrimitive.prototype, "fitToSize", {
        get: function () { return this.renderHelper.fitToSize; },
        enumerable: false,
        configurable: true
    });
    TextPrimitive.prototype.createRenderHelper = function () {
        switch (this.angle) {
            case TextAngle.Angle90deg:
                return new TextPrimitive90degRenderHelper(this);
            case TextAngle.Angle180deg:
                return new TextPrimitive180degRenderHelper(this);
            case TextAngle.Angle270deg:
                return new TextPrimitive270degRenderHelper(this);
            default:
                return new TextPrimitiveRenderHelper(this);
        }
    };
    TextPrimitive.baselineCorrection = 0.35;
    return TextPrimitive;
}(Primitive_1.SvgPrimitive));
exports.TextPrimitive = TextPrimitive;
var TextPrimitiveRenderHelper = (function () {
    function TextPrimitiveRenderHelper(primitive) {
        this.primitive = primitive;
    }
    Object.defineProperty(TextPrimitiveRenderHelper.prototype, "textWidth", {
        get: function () { return this.primitive.textWidth; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextPrimitiveRenderHelper.prototype, "textHeight", {
        get: function () { return this.primitive.textHeight; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextPrimitiveRenderHelper.prototype, "fitToSize", {
        get: function () { return this.textWidth; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextPrimitiveRenderHelper.prototype, "textAnchor", {
        get: function () { return this.primitive.style["text-anchor"]; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextPrimitiveRenderHelper.prototype, "textSpacing", {
        get: function () { return this.primitive.textSpacing; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextPrimitiveRenderHelper.prototype, "angle", {
        get: function () { return undefined; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextPrimitiveRenderHelper.prototype, "needRotation", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    TextPrimitiveRenderHelper.prototype.prepareMainElement = function (element, x, y) {
        if (this.needRotation)
            element.setAttribute("transform", "rotate(" + this.angle + ", " +
                unit_converter_1.UnitConverter.twipsToPixels(x) + ", " + unit_converter_1.UnitConverter.twipsToPixels(y) + ")");
    };
    TextPrimitiveRenderHelper.prototype.prepareTSpanElement = function (tSpan, x, y) {
        this.primitive.setUnitAttribute(tSpan, "x", x);
        tSpan.setAttribute("dy", TextUtils_1.LINE_HEIGHT + "em");
    };
    TextPrimitiveRenderHelper.prototype.prepareFirstTSpanElement = function (tSpan, lineCount) {
        var dy = -((lineCount - 1) / 2) + TextPrimitive.baselineCorrection;
        tSpan.setAttribute("dy", dy.toFixed(2) + "em");
    };
    TextPrimitiveRenderHelper.prototype.getTextX = function (x) {
        if (!this.textAnchor || this.textAnchor === "middle")
            return x + this.textWidth / 2;
        else if (this.textAnchor === "end")
            return x + this.textWidth - this.textSpacing;
        else if (this.textAnchor === "start")
            return x + this.textSpacing;
        return x;
    };
    TextPrimitiveRenderHelper.prototype.getTextY = function (y) {
        return y + this.textHeight / 2;
    };
    TextPrimitiveRenderHelper.prototype.setUnitAttribute = function (element, key, value) {
        this.primitive.setUnitAttribute(element, key, value);
    };
    return TextPrimitiveRenderHelper;
}());
exports.TextPrimitiveRenderHelper = TextPrimitiveRenderHelper;
var TextPrimitive90degRenderHelper = (function (_super) {
    __extends(TextPrimitive90degRenderHelper, _super);
    function TextPrimitive90degRenderHelper(primitive) {
        return _super.call(this, primitive) || this;
    }
    Object.defineProperty(TextPrimitive90degRenderHelper.prototype, "fitToSize", {
        get: function () { return this.textHeight; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextPrimitive90degRenderHelper.prototype, "angle", {
        get: function () { return 90; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextPrimitive90degRenderHelper.prototype, "needRotation", {
        get: function () { return true; },
        enumerable: false,
        configurable: true
    });
    TextPrimitive90degRenderHelper.prototype.getTextX = function (x) {
        return x + this.textWidth / 2;
    };
    TextPrimitive90degRenderHelper.prototype.getTextY = function (y) {
        if (!this.textAnchor || this.textAnchor === "middle")
            return y + this.textHeight / 2;
        else if (this.textAnchor === "end")
            return y + this.textHeight - this.textSpacing;
        else if (this.textAnchor === "start")
            return y + this.textSpacing;
        return y;
    };
    return TextPrimitive90degRenderHelper;
}(TextPrimitiveRenderHelper));
exports.TextPrimitive90degRenderHelper = TextPrimitive90degRenderHelper;
var TextPrimitive180degRenderHelper = (function (_super) {
    __extends(TextPrimitive180degRenderHelper, _super);
    function TextPrimitive180degRenderHelper(primitive) {
        return _super.call(this, primitive) || this;
    }
    Object.defineProperty(TextPrimitive180degRenderHelper.prototype, "angle", {
        get: function () { return 180; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextPrimitive180degRenderHelper.prototype, "needRotation", {
        get: function () { return true; },
        enumerable: false,
        configurable: true
    });
    TextPrimitive180degRenderHelper.prototype.getTextX = function (x) {
        if (!this.textAnchor || this.textAnchor === "middle")
            return x + this.textWidth / 2;
        else if (this.textAnchor === "start")
            return x + this.textWidth - this.textSpacing;
        else if (this.textAnchor === "end")
            return x + this.textSpacing;
        return x;
    };
    return TextPrimitive180degRenderHelper;
}(TextPrimitiveRenderHelper));
exports.TextPrimitive180degRenderHelper = TextPrimitive180degRenderHelper;
var TextPrimitive270degRenderHelper = (function (_super) {
    __extends(TextPrimitive270degRenderHelper, _super);
    function TextPrimitive270degRenderHelper(primitive) {
        return _super.call(this, primitive) || this;
    }
    Object.defineProperty(TextPrimitive270degRenderHelper.prototype, "angle", {
        get: function () { return 270; },
        enumerable: false,
        configurable: true
    });
    TextPrimitive270degRenderHelper.prototype.getTextY = function (y) {
        if (!this.textAnchor || this.textAnchor === "middle")
            return y + this.textHeight / 2;
        else if (this.textAnchor === "start")
            return y + this.textHeight - this.textSpacing;
        else if (this.textAnchor === "end")
            return y + this.textSpacing;
        return y;
    };
    return TextPrimitive270degRenderHelper;
}(TextPrimitive90degRenderHelper));
exports.TextPrimitive270degRenderHelper = TextPrimitive270degRenderHelper;
//# sourceMappingURL=TextPrimitive.js.map