"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResizeInfoVisualizer = void 0;
var ResizeInfoVisualizer = (function () {
    function ResizeInfoVisualizer(dispatcher) {
        this.dispatcher = dispatcher;
    }
    ResizeInfoVisualizer.prototype.set = function (point, text) {
        this.point = point;
        this.text = text;
        this.raiseShow();
    };
    ResizeInfoVisualizer.prototype.reset = function () {
        if (this.point !== undefined) {
            this.point = undefined;
            this.text = undefined;
            this.raiseHide();
        }
    };
    ResizeInfoVisualizer.prototype.raiseShow = function () {
        var _this = this;
        this.dispatcher.raise1(function (l) { return l.notifyResizeInfoShow(_this.point, _this.text); });
    };
    ResizeInfoVisualizer.prototype.raiseHide = function () {
        this.dispatcher.raise1(function (l) { return l.notifyResizeInfoHide(); });
    };
    return ResizeInfoVisualizer;
}());
exports.ResizeInfoVisualizer = ResizeInfoVisualizer;
//# sourceMappingURL=ResizeInfoVisualizer.js.map