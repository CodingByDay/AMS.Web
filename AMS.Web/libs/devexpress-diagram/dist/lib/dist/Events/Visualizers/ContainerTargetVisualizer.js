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
exports.ContainerTargetVisualizer = exports.ContainerTargetInfo = void 0;
var TargetVisualizerBase_1 = require("./TargetVisualizerBase");
var ContainerTargetInfo = (function () {
    function ContainerTargetInfo(rect, strokeWidth) {
        this.rect = rect;
        this.strokeWidth = strokeWidth;
    }
    return ContainerTargetInfo;
}());
exports.ContainerTargetInfo = ContainerTargetInfo;
var ContainerTargetVisualizer = (function (_super) {
    __extends(ContainerTargetVisualizer, _super);
    function ContainerTargetVisualizer(dispatcher) {
        return _super.call(this, dispatcher) || this;
    }
    ContainerTargetVisualizer.prototype.raiseShow = function () {
        var _this = this;
        var info = new ContainerTargetInfo(this.targetRect, this.targetStrokeWidth);
        this.dispatcher.raise1(function (l) { return l.notifyContainerTargetShow(_this.key, info); });
    };
    ContainerTargetVisualizer.prototype.raiseHide = function () {
        this.dispatcher.raise1(function (l) { return l.notifyContainerTargetHide(); });
    };
    return ContainerTargetVisualizer;
}(TargetVisualizerBase_1.TargetVisualizerBase));
exports.ContainerTargetVisualizer = ContainerTargetVisualizer;
//# sourceMappingURL=ContainerTargetVisualizer.js.map