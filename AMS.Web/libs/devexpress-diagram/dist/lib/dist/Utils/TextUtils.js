"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLineHeight = exports.getTextHeight = exports.getTextLineSize = exports.getOptimalTextRectangle = exports.TEXTRECT_RATIO_EPS = exports.textToParagraphs = exports.textToWords = exports.wordsByLines = exports.LINE_HEIGHT = void 0;
var Utils_1 = require("../Utils");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var Data_1 = require("./Data");
var WHITESPACES = /\s/gm;
exports.LINE_HEIGHT = 1.05;
function wordsByLines(absLineWidth, words, measureWords) {
    if (words.length === 1)
        return words;
    var measuredWords = measureWords();
    var spaceWidth = measuredWords.words[" "].width;
    var result = [];
    var lastLineWidth = 0;
    var lastLineIndex = -1;
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        var wordWidth = measuredWords.words[word].width;
        if (lastLineIndex === -1 || lastLineWidth + spaceWidth + wordWidth > absLineWidth) {
            lastLineIndex = result.push(word) - 1;
            lastLineWidth = wordWidth;
        }
        else {
            lastLineWidth += spaceWidth + wordWidth;
            result[lastLineIndex] += " " + word;
        }
    }
    return result;
}
exports.wordsByLines = wordsByLines;
function textToWords(text) {
    return text.split(WHITESPACES).filter(function (t) { return t.length; });
}
exports.textToWords = textToWords;
function textToParagraphs(text) {
    return text.split("\n");
}
exports.textToParagraphs = textToParagraphs;
exports.TEXTRECT_RATIO_EPS = 1.2;
var TEXTRECT_WIDTH_DIFF_EPS = 1;
function getOptimalTextRectangle(text, style, owner, measurer, initialSize, keepRatio, minWidth, maxWidth, minHeight, maxHeight) {
    if (minWidth === void 0) { minWidth = 0; }
    if (maxWidth === void 0) { maxWidth = Number.MAX_SAFE_INTEGER || Number.MAX_VALUE; }
    if (minHeight === void 0) { minHeight = 0; }
    if (maxHeight === void 0) { maxHeight = Number.MAX_SAFE_INTEGER || Number.MAX_VALUE; }
    if (!text)
        return new size_1.Size(Data_1.Data.byRange(initialSize.width, minWidth, maxWidth), Data_1.Data.byRange(initialSize.height, minHeight, maxHeight));
    if (minWidth > maxWidth || minHeight > maxHeight)
        throw new Error("Min size cannot exceed max size");
    if (minWidth === maxWidth && minHeight === maxHeight)
        return new size_1.Size(minWidth, minHeight);
    var measureResult = measurer.measureWords(text, style, owner);
    var paragraphs = textToParagraphs(text);
    var maxWordWidth = Object.keys(measureResult.words).reduce(function (acc, word) { return Math.max(acc, measureResult.words[word].width); }, 0);
    var xRange = new Utils_1.Range(Data_1.Data.byRange(Math.max(initialSize.width, maxWordWidth), minWidth, maxWidth), maxWidth);
    var yRange = new Utils_1.Range(Data_1.Data.byRange(initialSize.height, minHeight, maxHeight), maxHeight);
    if (maxWordWidth <= initialSize.width && getTextHeight(paragraphs, initialSize.width, measureResult, false) <= initialSize.height && xRange.includes(initialSize.width) && yRange.includes(initialSize.height))
        return initialSize;
    var ratio = initialSize.width / initialSize.height;
    return getOptimalTextRectangleCore(paragraphs, measureResult, ratio, xRange, yRange, keepRatio);
}
exports.getOptimalTextRectangle = getOptimalTextRectangle;
function getOptimalTextRectangleCore(paragraphs, measureResult, initRatio, xRange, yRange, incHeightToRatio) {
    var _a;
    var maxParagraphWidth = paragraphs.reduce(function (acc, val) { return Math.max(acc, getTextLineSize(val, measureResult).width); }, 0);
    var size = new size_1.Size(0, 0);
    var newSize = new size_1.Size(0, 0);
    var newFitToHeight;
    var deltaWidth = 0;
    var error = 0;
    for (var attempt = 0; attempt < 5; attempt++) {
        if (attempt === 0)
            newSize.width = calcByFit(maxParagraphWidth, xRange)[0];
        else if (Math.abs(deltaWidth) > TEXTRECT_WIDTH_DIFF_EPS)
            newSize.width = calcByFit(size.width + deltaWidth, xRange)[0];
        else
            break;
        _a = calcHeight(paragraphs, newSize.width, measureResult, yRange), newSize.height = _a[0], newFitToHeight = _a[1];
        if (attempt === 0) {
            size = newSize.clone();
            error = (size.width / size.height) / initRatio;
        }
        if (attempt === 0 && !newFitToHeight)
            break;
        var newRatio = (newSize.width / newSize.height);
        var newError = newRatio / initRatio;
        if (attempt === 0)
            deltaWidth = (newSize.width / newError - newSize.width) / 2;
        else if (!newFitToHeight)
            deltaWidth /= 2;
        else if (!compareRatio(initRatio, newRatio, exports.TEXTRECT_RATIO_EPS)) {
            size = newSize.clone();
            error = newError;
            break;
        }
        else if (compareRatio(error, newError, 1) < 0) {
            size = newSize.clone();
            error = newError;
            deltaWidth = (newSize.width / newError - newSize.width) / 2;
            if (newError < 1)
                deltaWidth /= 2;
        }
        else
            break;
    }
    if (incHeightToRatio)
        size.height = Data_1.Data.byRange(size.width / initRatio, size.height, yRange.to);
    return size;
}
function compareRatio(a, b, eps) {
    var an = a < 1 ? 1 / a : a;
    var bn = b < 1 ? 1 / b : b;
    var e = an / bn;
    var en = e < 1 ? 1 / e : e;
    return en <= eps ? 0 : bn > an ? 1 : -1;
}
function calcHeight(paragraphs, width, measureResult, yRange) {
    var height = getTextHeight(paragraphs, width, measureResult, false);
    return calcByFit(height, yRange);
}
function calcByFit(value, range) {
    return [
        Data_1.Data.byRange(value, range.from, range.to),
        value <= range.to
    ];
}
function getTextLineSize(text, measureResult) {
    var words = textToWords(text);
    return words.reduce(function (acc, word, index) {
        var wordSize = measureResult.words[word];
        acc.width += wordSize.width;
        acc.height = Math.max(acc.height, wordSize.height);
        if (index > 0)
            acc.width += measureResult.words[" "].width;
        return acc;
    }, new size_1.Size(0, 0));
}
exports.getTextLineSize = getTextLineSize;
function getTextHeight(textOrParagraphs, width, measureResult, emptyTextAsSingleLine) {
    var paragraphs = Array.isArray(textOrParagraphs) ? textOrParagraphs : textToParagraphs(textOrParagraphs);
    if (emptyTextAsSingleLine && (!paragraphs.length || (paragraphs.length === 1 && !paragraphs[0].length)))
        return getLineHeight(measureResult);
    return paragraphs.reduce(function (acc, line) { return acc + wordsByLines(width, textToWords(line), function () { return measureResult; }).length; }, 0) * getLineHeight(measureResult);
}
exports.getTextHeight = getTextHeight;
function getLineHeight(measureResult) {
    return measureResult.fontSize * exports.LINE_HEIGHT;
}
exports.getLineHeight = getLineHeight;
//# sourceMappingURL=TextUtils.js.map