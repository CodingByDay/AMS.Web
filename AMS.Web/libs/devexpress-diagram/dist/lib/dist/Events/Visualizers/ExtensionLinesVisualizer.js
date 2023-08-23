"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtensionLinesVisualizer = exports.ExtensionLine = exports.ExtensionLineType = void 0;
var ExtensionLineType;
(function (ExtensionLineType) {
    ExtensionLineType[ExtensionLineType["LeftToLeftAbove"] = 0] = "LeftToLeftAbove";
    ExtensionLineType[ExtensionLineType["LeftToLeftBelow"] = 1] = "LeftToLeftBelow";
    ExtensionLineType[ExtensionLineType["RightToRightAbove"] = 2] = "RightToRightAbove";
    ExtensionLineType[ExtensionLineType["RightToRightBelow"] = 3] = "RightToRightBelow";
    ExtensionLineType[ExtensionLineType["LeftToRightAbove"] = 4] = "LeftToRightAbove";
    ExtensionLineType[ExtensionLineType["LeftToRightBelow"] = 5] = "LeftToRightBelow";
    ExtensionLineType[ExtensionLineType["RightToLeftAbove"] = 6] = "RightToLeftAbove";
    ExtensionLineType[ExtensionLineType["RightToLeftBelow"] = 7] = "RightToLeftBelow";
    ExtensionLineType[ExtensionLineType["TopToTopBefore"] = 8] = "TopToTopBefore";
    ExtensionLineType[ExtensionLineType["TopToTopAfter"] = 9] = "TopToTopAfter";
    ExtensionLineType[ExtensionLineType["BottomToBottomBefore"] = 10] = "BottomToBottomBefore";
    ExtensionLineType[ExtensionLineType["BottomToBottomAfter"] = 11] = "BottomToBottomAfter";
    ExtensionLineType[ExtensionLineType["TopToBottomBefore"] = 12] = "TopToBottomBefore";
    ExtensionLineType[ExtensionLineType["TopToBottomAfter"] = 13] = "TopToBottomAfter";
    ExtensionLineType[ExtensionLineType["BottomToTopBefore"] = 14] = "BottomToTopBefore";
    ExtensionLineType[ExtensionLineType["BottomToTopAfter"] = 15] = "BottomToTopAfter";
    ExtensionLineType[ExtensionLineType["HorizontalCenterAbove"] = 16] = "HorizontalCenterAbove";
    ExtensionLineType[ExtensionLineType["HorizontalCenterBelow"] = 17] = "HorizontalCenterBelow";
    ExtensionLineType[ExtensionLineType["VerticalCenterBefore"] = 18] = "VerticalCenterBefore";
    ExtensionLineType[ExtensionLineType["VerticalCenterAfter"] = 19] = "VerticalCenterAfter";
    ExtensionLineType[ExtensionLineType["VerticalCenterToPageCenter"] = 20] = "VerticalCenterToPageCenter";
    ExtensionLineType[ExtensionLineType["HorizontalCenterToPageCenter"] = 21] = "HorizontalCenterToPageCenter";
    ExtensionLineType[ExtensionLineType["LeftToPageCenter"] = 22] = "LeftToPageCenter";
    ExtensionLineType[ExtensionLineType["RightToPageCenter"] = 23] = "RightToPageCenter";
    ExtensionLineType[ExtensionLineType["TopToPageCenter"] = 24] = "TopToPageCenter";
    ExtensionLineType[ExtensionLineType["BottomToPageCenter"] = 25] = "BottomToPageCenter";
})(ExtensionLineType = exports.ExtensionLineType || (exports.ExtensionLineType = {}));
var ExtensionLine = (function () {
    function ExtensionLine(type, segment, text) {
        this.type = type;
        this.segment = segment;
        this.text = text;
    }
    return ExtensionLine;
}());
exports.ExtensionLine = ExtensionLine;
var ExtensionLinesVisualizer = (function () {
    function ExtensionLinesVisualizer(dispatcher) {
        this.dispatcher = dispatcher;
        this.lines = [];
        this.lineIndexByType = {};
    }
    ExtensionLinesVisualizer.prototype.addSegment = function (type, segment, text) {
        var curIndex = this.lineIndexByType[type];
        if (curIndex === undefined) {
            var line = new ExtensionLine(type, segment, text);
            var index = this.lines.push(line);
            this.lineIndexByType[line.type] = index - 1;
            this.raiseShow();
        }
        else if (segment.length < this.lines[curIndex].segment.length) {
            var line = new ExtensionLine(type, segment, text);
            this.lines.splice(curIndex, 1, line);
            this.raiseShow();
        }
    };
    ExtensionLinesVisualizer.prototype.update = function () {
        this.raiseShow();
    };
    ExtensionLinesVisualizer.prototype.reset = function () {
        if (this.lines.length) {
            this.lines = [];
            this.lineIndexByType = {};
            this.raiseHide();
        }
    };
    ExtensionLinesVisualizer.prototype.raiseShow = function () {
        var _this = this;
        this.dispatcher.raise1(function (l) { return l.notifyExtensionLinesShow(_this.lines); });
    };
    ExtensionLinesVisualizer.prototype.raiseHide = function () {
        this.dispatcher.raise1(function (l) { return l.notifyExtensionLinesHide(); });
    };
    return ExtensionLinesVisualizer;
}());
exports.ExtensionLinesVisualizer = ExtensionLinesVisualizer;
//# sourceMappingURL=ExtensionLinesVisualizer.js.map