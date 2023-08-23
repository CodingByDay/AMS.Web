"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectionRectVisualizer = void 0;
var SelectionRectVisualizer = (function () {
    function SelectionRectVisualizer(dispatcher) {
        this.dispatcher = dispatcher;
    }
    SelectionRectVisualizer.prototype.setRectangle = function (rect) {
        this.rect = rect;
        this.raiseShow();
    };
    SelectionRectVisualizer.prototype.reset = function () {
        this.rect = undefined;
        this.raiseHide();
    };
    SelectionRectVisualizer.prototype.raiseShow = function () {
        var _this = this;
        this.dispatcher.raise1(function (l) { return l.notifySelectionRectShow(_this.rect); });
    };
    SelectionRectVisualizer.prototype.raiseHide = function () {
        this.dispatcher.raise1(function (l) { return l.notifySelectionRectHide(); });
    };
    return SelectionRectVisualizer;
}());
exports.SelectionRectVisualizer = SelectionRectVisualizer;
//# sourceMappingURL=SelectionRectVisualizer.js.map