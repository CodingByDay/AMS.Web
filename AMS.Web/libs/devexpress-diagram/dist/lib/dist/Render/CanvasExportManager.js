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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasExportManager = void 0;
var unit_converter_1 = require("@devexpress/utils/lib/class/unit-converter");
var browser_1 = require("@devexpress/utils/lib/browser");
var Utils_1 = require("./Utils");
var CanvasManagerBase_1 = require("./CanvasManagerBase");
var RenderHelper_1 = require("./RenderHelper");
var DOMManipulator_1 = require("./DOMManipulator");
var color_1 = require("@devexpress/utils/lib/utils/color");
var EXPORT_IMAGE_QUALITY = 1;
var CanvasExportManager = (function (_super) {
    __extends(CanvasExportManager, _super);
    function CanvasExportManager(itemsContainer, measurer, instanceId) {
        var _this = _super.call(this, 1, new DOMManipulator_1.ExportDOMManipulator(measurer), instanceId) || this;
        _this.itemsContainer = itemsContainer;
        return _this;
    }
    CanvasExportManager.prototype.getSvgImage = function (modelSize, pageColor, exportAsInline, exportForBinaryImage) {
        var svgEl = RenderHelper_1.RenderHelper.createSvgElement(undefined, true);
        var modelAbsSize = modelSize.clone().applyConverter(unit_converter_1.UnitConverter.twipsToPixelsF).clone().applyConverter(Math.ceil);
        Utils_1.RenderUtils.updateSvgElementSize(svgEl, modelAbsSize.width, modelAbsSize.height, true);
        svgEl.style.backgroundColor = color_1.ColorUtils.colorToHash(pageColor);
        this.createTextFloodFilter(this.instanceId, undefined, svgEl, pageColor);
        var exportCssRules = !exportAsInline && !browser_1.Browser.IE && this.getExportCssRules();
        if (exportCssRules) {
            var style = document.createElementNS(RenderHelper_1.svgNS, "style");
            style.innerHTML = exportCssRules;
            svgEl.appendChild(style);
        }
        if (exportForBinaryImage) {
            var bk = document.createElementNS(RenderHelper_1.svgNS, "rect");
            bk.setAttributeNS(null, "x", "0");
            bk.setAttributeNS(null, "y", "0");
            bk.setAttributeNS(null, "height", modelAbsSize.height.toString());
            bk.setAttributeNS(null, "width", modelAbsSize.width.toString());
            bk.setAttributeNS(null, "fill", svgEl.style.backgroundColor);
            svgEl.appendChild(bk);
        }
        for (var i = 0; i < this.itemsContainer.childNodes.length; i++) {
            var node = this.itemsContainer.childNodes[i].cloneNode(true);
            if (!exportCssRules)
                this.inlineStyle(node, this.itemsContainer.childNodes[i]);
            svgEl.appendChild(node);
        }
        return svgEl;
    };
    CanvasExportManager.prototype.getSvgImageUrl = function (modelSize, pageColor, exportAsInline) {
        var svgEl = this.getSvgImage(modelSize, pageColor, exportAsInline, false);
        return this.getSvgBase64String(svgEl);
    };
    CanvasExportManager.prototype.getSvgString = function (svgElement) {
        return new XMLSerializer().serializeToString(svgElement);
    };
    CanvasExportManager.prototype.getSvgBase64String = function (svgElement) {
        var xml = this.getSvgString(svgElement);
        return CanvasExportManager.base64Start + this.getBase64EncodeUnicode(xml);
    };
    CanvasExportManager.prototype.getBase64EncodeUnicode = function (s) {
        return btoa(encodeURIComponent(s).replace(/%([0-9A-F]{2})/g, function (match, p1) { return String.fromCharCode(parseInt("0x" + p1, 16)); }));
    };
    CanvasExportManager.prototype.getExportCssRules = function () {
        for (var i = 0; i < document.styleSheets.length; i++) {
            var rules = this.getRules(document.styleSheets[i]);
            if (rules) {
                var cssText = "";
                for (var j = 0; j < rules.length; j++) {
                    var rule = rules[j];
                    var selectorText = this.isCSSStyleRule(rule) ? rule.selectorText : null;
                    if (selectorText && this.checkSelector(selectorText))
                        cssText += rule.cssText + "\n";
                }
                if (cssText.length > 0)
                    return "\n" + cssText;
            }
        }
    };
    CanvasExportManager.prototype.checkSelector = function (selectorText) {
        for (var i = 0; i < CanvasExportManager.exportStyleRules.length; i++)
            if (selectorText.indexOf(CanvasExportManager.exportStyleRules[i]) === 0)
                return true;
        return false;
    };
    CanvasExportManager.prototype.getRules = function (styleSheet) {
        try {
            return this.isCSSStyleSheet(styleSheet) ? styleSheet.rules || styleSheet.cssRules : null;
        }
        catch (_a) { }
    };
    CanvasExportManager.prototype.isCSSStyleSheet = function (stylesheet) {
        return stylesheet.rules !== undefined;
    };
    CanvasExportManager.prototype.isCSSStyleRule = function (rule) {
        return rule.selectorText !== undefined;
    };
    CanvasExportManager.prototype.inlineStyle = function (destNode, srcNode) {
        for (var i = 0; i < destNode.childNodes.length; i++) {
            var child = destNode.childNodes[i];
            if (!child.tagName)
                continue;
            if (child.tagName === "g")
                this.inlineStyle(child, srcNode.childNodes[i]);
            else if (child.style) {
                var style = window.getComputedStyle(srcNode.childNodes[i]);
                if (style !== undefined)
                    for (var index = 0; index < CanvasExportManager.exportStyleAttributes.length; index++) {
                        var styleProperty = CanvasExportManager.exportStyleAttributes[index];
                        child.style.setProperty(styleProperty, style.getPropertyValue(styleProperty));
                    }
                this.inlineStyle(child, srcNode.childNodes[i]);
            }
        }
    };
    CanvasExportManager.prototype.exportSvgImage = function (modelSize, pageColor, callback) {
        callback(this.getSvgImageUrl(modelSize, pageColor, true));
    };
    CanvasExportManager.prototype.exportBinaryImage = function (modelSize, pageColor, mimeType, callback, useCanvgForExportToImage) {
        var modelAbsSize = this.getAbsoluteSize(modelSize).clone().applyConverter(Math.ceil);
        var canvasEl = document.createElement("canvas");
        canvasEl.width = modelAbsSize.width;
        canvasEl.height = modelAbsSize.height;
        var ctx = canvasEl.getContext("2d");
        ctx.fillStyle = color_1.ColorUtils.colorToHash(pageColor);
        ctx.fillRect(0, 0, modelAbsSize.width, modelAbsSize.height);
        if ((useCanvgForExportToImage || browser_1.Browser.IE) && typeof canvg === "object")
            this.exportBinaryImageCanvgAsync(modelSize, pageColor, canvasEl, ctx, mimeType).then(function (dataUrl) { return callback(dataUrl); });
        else if (browser_1.Browser.IE && typeof canvg === "function")
            this.exportBinaryImageCanvgOld(modelSize, pageColor, canvasEl, ctx, mimeType, callback);
        else {
            var imgEl_1 = new Image();
            imgEl_1.width = modelAbsSize.width;
            imgEl_1.height = modelAbsSize.height;
            imgEl_1.setAttribute("crossOrigin", "anonymous");
            imgEl_1.onload = function () {
                ctx.drawImage(imgEl_1, 0, 0);
                callback(canvasEl.toDataURL(mimeType, EXPORT_IMAGE_QUALITY));
            };
            imgEl_1.src = this.getSvgImageUrl(modelSize, pageColor, true);
        }
    };
    CanvasExportManager.prototype.exportBinaryImageCanvgOld = function (modelSize, pageColor, canvasEl, ctx, mimeType, callback) {
        var svgEl = this.getSvgImage(modelSize, pageColor, true, false);
        var svgStr = this.getSvgString(svgEl);
        ctx["drawSvg"](svgStr, 0, 0, null, null, {
            renderCallback: function () {
                callback(canvasEl.toDataURL(mimeType, EXPORT_IMAGE_QUALITY));
            }
        });
    };
    CanvasExportManager.prototype.exportBinaryImageCanvgAsync = function (modelSize, pageColor, canvas, ctx, mimeType) {
        return __awaiter(this, void 0, void 0, function () {
            var svgEl, svgStr, v;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        svgEl = this.getSvgImage(modelSize, pageColor, true, true);
                        svgStr = this.getSvgString(svgEl);
                        v = canvg.Canvg.fromString(ctx, svgStr);
                        return [4, v.render()];
                    case 1:
                        _a.sent();
                        return [2, canvas.toDataURL(mimeType, EXPORT_IMAGE_QUALITY)];
                }
            });
        });
    };
    CanvasExportManager.prototype.exportPngImage = function (modelSize, pageColor, callback, useCanvgForExportToImage) {
        this.exportBinaryImage(modelSize, pageColor, "image/png", callback, useCanvgForExportToImage);
    };
    CanvasExportManager.prototype.exportJpgImage = function (modelSize, pageColor, callback, useCanvgForExportToImage) {
        this.exportBinaryImage(modelSize, pageColor, "image/jpeg", callback, useCanvgForExportToImage);
    };
    CanvasExportManager.prototype.notifyModelChanged = function (changes) { };
    CanvasExportManager.prototype.notifyPageColorChanged = function (color) { };
    CanvasExportManager.prototype.notifyPageSizeChanged = function (pageSize, pageLandscape) { };
    CanvasExportManager.base64Start = "data:image/svg+xml;base64,";
    CanvasExportManager.exportStyleRules = [
        ".dxdi-canvas .shape ", ".dxdi-canvas .connector ", ".dxdi-canvas text", ".dxdi-canvas.export"
    ];
    CanvasExportManager.exportStyleAttributes = [
        "fill", "stroke", "stroke-width", "stroke-linejoin",
        "font-family", "font-size", "font-weight", "font-style", "text-decoration", "text-anchor"
    ];
    return CanvasExportManager;
}(CanvasManagerBase_1.CanvasManagerBase));
exports.CanvasExportManager = CanvasExportManager;
//# sourceMappingURL=CanvasExportManager.js.map