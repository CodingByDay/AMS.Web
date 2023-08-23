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
exports.ConnectionTargetVisualizer = exports.ConnectionTargetInfo = void 0;
var TargetVisualizerBase_1 = require("./TargetVisualizerBase");
var ConnectionTargetInfo = (function () {
    function ConnectionTargetInfo(rect, strokeWidth) {
        this.rect = rect;
        this.strokeWidth = strokeWidth;
        this.allowed = true;
    }
    return ConnectionTargetInfo;
}());
exports.ConnectionTargetInfo = ConnectionTargetInfo;
var ConnectionTargetVisualizer = (function (_super) {
    __extends(ConnectionTargetVisualizer, _super);
    function ConnectionTargetVisualizer(dispatcher) {
        return _super.call(this, dispatcher) || this;
    }
    ConnectionTargetVisualizer.prototype.raiseShow = function () {
        var _this = this;
        var info = new ConnectionTargetInfo(this.targetRect, this.targetStrokeWidth);
        this.dispatcher.raise1(function (l) { return l.notifyConnectionTargetShow(_this.key, info); });
    };
    ConnectionTargetVisualizer.prototype.raiseHide = function () {
        this.dispatcher.raise1(function (l) { return l.notifyConnectionTargetHide(); });
    };
    return ConnectionTargetVisualizer;
}(TargetVisualizerBase_1.TargetVisualizerBase));
exports.ConnectionTargetVisualizer = ConnectionTargetVisualizer;
//# sourceMappingURL=ConnectionTargetVisualizer.js.map