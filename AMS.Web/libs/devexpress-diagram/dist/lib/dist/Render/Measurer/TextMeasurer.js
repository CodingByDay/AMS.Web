"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextMeasurer = void 0;
var size_1 = require("@devexpress/utils/lib/geometry/size");
var Utils_1 = require("../Utils");
var Shape_1 = require("../../Model/Shapes/Shape");
var Connector_1 = require("../../Model/Connectors/Connector");
var ITextMeasurer_1 = require("./ITextMeasurer");
var RenderHelper_1 = require("../RenderHelper");
var TextUtils_1 = require("../../Utils/TextUtils");
var TextMeasurer = (function () {
    function TextMeasurer(parent) {
        this.cache = {};
        this.fontSizeCache = {};
        this.containers = {};
        this.parent = parent;
        this.createNodes();
    }
    TextMeasurer.prototype.measureWords = function (text, style, owner) {
        var _this = this;
        var result = { words: {}, fontSize: -1 };
        var words = typeof text === "string" ? this.splitToWords(text, false) : text.reduce(function (acc, t) { return acc.concat(_this.splitToWords(t, false)); }, []);
        words.push(" ");
        var styleHashKey = this.getStyleHash(style, owner);
        var measureElements = this.tryLoadWordsToMeasurer(words, style, styleHashKey, owner, undefined, undefined, undefined, undefined, result);
        if (measureElements) {
            var container = this.containers[owner];
            this.putElementsInDOM(container, measureElements);
            this.beforeMeasureInDOM();
            this.measureElementsInDOM(measureElements, result);
            this.afterMeasureInDOM();
        }
        return result;
    };
    TextMeasurer.prototype.measureTextLine = function (textLine, style, owner) {
        var results = this.measureWords(textLine, style, owner);
        return TextUtils_1.getTextLineSize(textLine, results);
    };
    TextMeasurer.prototype.onNewModel = function (items, dom) {
        var _this = this;
        dom.changeByFunc(null, function () { return _this.onNewModelCore(items); });
    };
    TextMeasurer.prototype.onNewModelCore = function (items) {
        var shapes = items.filter(function (i) { return i instanceof Shape_1.Shape; });
        var connectors = items.filter(function (i) { return i instanceof Connector_1.Connector; });
        var shapeElements = this.tryLoadShapeTexts(shapes);
        var connectorElements = this.tryLoadConnectorTexts(connectors);
        if (shapeElements || connectorElements) {
            shapeElements && this.putElementsInDOM(this.containers[ITextMeasurer_1.TextOwner.Shape], shapeElements);
            connectorElements && this.putElementsInDOM(this.containers[ITextMeasurer_1.TextOwner.Connector], connectorElements);
            this.beforeMeasureInDOM();
            shapeElements && this.measureElementsInDOM(shapeElements);
            connectorElements && this.measureElementsInDOM(connectorElements);
            this.afterMeasureInDOM();
        }
    };
    TextMeasurer.prototype.replaceParent = function (parent) {
        if (this.parent !== parent) {
            if (this.mainElement.parentNode)
                parent.appendChild(this.mainElement);
            this.parent = parent;
        }
    };
    TextMeasurer.prototype.clean = function () {
        Utils_1.RenderUtils.removeElement(this.mainElement);
    };
    TextMeasurer.prototype.tryLoadShapeTexts = function (shapes) {
        var _this = this;
        var newSet = {};
        var elements = [];
        var hashes = [];
        var styleHashes = [];
        shapes.forEach(function (s) {
            var styleHashKey = _this.getStyleHash(s.styleText, ITextMeasurer_1.TextOwner.Shape);
            _this.tryLoadWordsToMeasurer(_this.splitToWords(s.text, true), s.styleText, styleHashKey, ITextMeasurer_1.TextOwner.Shape, newSet, elements, hashes, styleHashes);
        });
        return elements.length ? { elements: elements, hashes: hashes, styleHashes: styleHashes } : null;
    };
    TextMeasurer.prototype.tryLoadConnectorTexts = function (connectors) {
        var _this = this;
        var newSet = {};
        var elements = [];
        var hashes = [];
        var styleHashes = [];
        connectors.forEach(function (c) {
            var words = c.texts.map(function (t) { return t.value; }).reduce(function (acc, text) { return acc.concat(_this.splitToWords(text, false)); }, []);
            if (words.length) {
                words.push(" ");
                var styleHashKey = _this.getStyleHash(c.styleText, ITextMeasurer_1.TextOwner.Connector);
                _this.tryLoadWordsToMeasurer(words, c.styleText, styleHashKey, ITextMeasurer_1.TextOwner.Connector, newSet, elements, hashes, styleHashes);
            }
        });
        return elements.length ? { elements: elements, hashes: hashes, styleHashes: styleHashes } : null;
    };
    TextMeasurer.prototype.tryLoadWordsToMeasurer = function (words, style, styleHashKey, textOwner, newSet, elementsToMeasure, hashesToMeasure, styleHashesToMeasure, result) {
        var _this = this;
        var newWords = [];
        elementsToMeasure = elementsToMeasure || [];
        hashesToMeasure = hashesToMeasure || [];
        styleHashesToMeasure = styleHashesToMeasure || [];
        newSet = newSet || {};
        words.forEach(function (t) { return _this.tryLoadWordToMeasurer(t, style, styleHashKey, textOwner, newSet, elementsToMeasure, hashesToMeasure, styleHashesToMeasure, newWords, result); });
        return elementsToMeasure.length ? { elements: elementsToMeasure, hashes: hashesToMeasure, styleHashes: styleHashesToMeasure, newWords: newWords } : null;
    };
    TextMeasurer.prototype.putElementsInDOM = function (container, measureElements) {
        container.parentNode && container.parentNode.removeChild(container);
        while (container.firstChild)
            container.removeChild(container.firstChild);
        measureElements.elements.forEach(function (el) { return container.appendChild(el); });
        this.svgElement.appendChild(container);
    };
    TextMeasurer.prototype.measureElementsInDOM = function (measureElements, result) {
        var hashes = measureElements.hashes;
        var elements = measureElements.elements;
        var words = measureElements.newWords;
        var count = hashes.length;
        for (var i = 0; i < count; i++) {
            var size = this.getDomElementSize(elements[i]);
            if (size) {
                if (!size.isEmpty())
                    this.cache[hashes[i]] = size;
                if (result)
                    result.words[words[i]] = size;
            }
            var styleHashKey = measureElements.styleHashes[i];
            if (this.fontSizeCache[styleHashKey] === undefined)
                this.fontSizeCache[styleHashKey] = this.getDomFontSize(elements[i]);
            if (result && result.fontSize < 0)
                result.fontSize = this.fontSizeCache[styleHashKey];
        }
    };
    TextMeasurer.prototype.beforeMeasureInDOM = function () {
        this.parent.appendChild(this.mainElement);
    };
    TextMeasurer.prototype.afterMeasureInDOM = function () {
        this.mainElement.parentNode && this.mainElement.parentNode.removeChild(this.mainElement);
    };
    TextMeasurer.prototype.tryLoadWordToMeasurer = function (word, style, styleHashKey, owner, newSet, elementsToMeasure, hashesToMeasure, styleHashesToMeasure, newWords, result) {
        var hash = this.getHash(word, style, owner);
        var cachedSize = this.cache[hash];
        if (!cachedSize && !newSet[hash]) {
            newSet[hash] = true;
            hashesToMeasure.push(hash);
            elementsToMeasure.push(this.createElement(word, style));
            styleHashesToMeasure.push(styleHashKey);
            newWords.push(word);
        }
        else if (cachedSize && result) {
            result.words[word] = cachedSize;
            result.fontSize = this.fontSizeCache[styleHashKey];
        }
    };
    TextMeasurer.prototype.getHash = function (text, style, owner) {
        return owner + "|" + (style && style.toHash()) + "|" + text;
    };
    TextMeasurer.prototype.getStyleHash = function (style, owner) {
        return this.getHash(" ", style, owner);
    };
    TextMeasurer.prototype.createElement = function (text, style) {
        var element = document.createElementNS(RenderHelper_1.svgNS, "text");
        if (text === " ")
            element.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve");
        element.textContent = text;
        style && Utils_1.RenderUtils.applyStyleToElement(style, element);
        return element;
    };
    TextMeasurer.prototype.splitToWords = function (text, includeWhitespace) {
        var words = TextUtils_1.textToWords(text);
        includeWhitespace && words.push(" ");
        return words;
    };
    TextMeasurer.prototype.getDomFontSize = function (textEl) {
        return parseFloat(window.getComputedStyle(textEl).fontSize);
    };
    TextMeasurer.prototype.getDomElementSize = function (textEl) {
        var bBox;
        try {
            bBox = textEl.getBBox();
        }
        catch (_a) { }
        return bBox ? new size_1.Size(bBox.width, bBox.height) : new size_1.Size(0, 0);
    };
    TextMeasurer.prototype.createNodes = function () {
        this.mainElement = RenderHelper_1.RenderHelper.createMainElement(undefined, true);
        this.svgElement = RenderHelper_1.RenderHelper.createSvgElement(this.mainElement, false);
        this.createContainer(ITextMeasurer_1.TextOwner.Shape, "shape");
        this.createContainer(ITextMeasurer_1.TextOwner.Connector, "connector");
        this.createContainer(ITextMeasurer_1.TextOwner.ExtensionLine, "extension-line");
        this.createContainer(ITextMeasurer_1.TextOwner.Resize, "resize-info");
    };
    TextMeasurer.prototype.createContainer = function (owner, className) {
        var element = document.createElementNS(RenderHelper_1.svgNS, "g");
        element.setAttribute("class", className);
        this.containers[owner] = element;
    };
    return TextMeasurer;
}());
exports.TextMeasurer = TextMeasurer;
//# sourceMappingURL=TextMeasurer.js.map