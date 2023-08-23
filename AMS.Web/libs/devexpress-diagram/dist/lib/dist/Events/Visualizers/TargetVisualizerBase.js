"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetVisualizerBase = void 0;
var TargetVisualizerBase = (function () {
    function TargetVisualizerBase(dispatcher) {
        this.dispatcher = dispatcher;
    }
    TargetVisualizerBase.prototype.getKey = function () {
        return this.key;
    };
    TargetVisualizerBase.prototype.setTargetRect = function (key, targetRect, targetStrokeWidth) {
        if (this.key !== key) {
            this.key = key;
            this.targetRect = targetRect;
            this.targetStrokeWidth = targetStrokeWidth;
            this.raiseShow();
        }
    };
    TargetVisualizerBase.prototype.reset = function () {
        if (this.key !== "-1") {
            this.key = "-1";
            this.targetRect = undefined;
            this.targetStrokeWidth = 0;
            this.raiseHide();
        }
    };
    return TargetVisualizerBase;
}());
exports.TargetVisualizerBase = TargetVisualizerBase;
//# sourceMappingURL=TargetVisualizerBase.js.map