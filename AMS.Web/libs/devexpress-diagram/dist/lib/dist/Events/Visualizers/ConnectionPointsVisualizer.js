"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionPointsVisualizer = exports.ConnectionPointInfo = void 0;
var ConnectionPointInfo = (function () {
    function ConnectionPointInfo(point, side) {
        this.point = point;
        this.side = side;
        this.allowed = true;
    }
    return ConnectionPointInfo;
}());
exports.ConnectionPointInfo = ConnectionPointInfo;
var ConnectionPointsVisualizer = (function () {
    function ConnectionPointsVisualizer(dispatcher) {
        this.dispatcher = dispatcher;
    }
    ConnectionPointsVisualizer.prototype.getKey = function () {
        return this.key;
    };
    ConnectionPointsVisualizer.prototype.setPoints = function (key, points, pointIndex, outsideRectangle) {
        if (this.key !== key || this.pointIndex !== pointIndex) {
            this.key = key;
            this.points = points;
            this.pointIndex = pointIndex;
            this.outsideRectangle = outsideRectangle;
            this.raiseShow();
        }
    };
    ConnectionPointsVisualizer.prototype.setPointIndex = function (pointIndex) {
        if (0 <= pointIndex && pointIndex < this.points.length && this.pointIndex !== pointIndex) {
            this.pointIndex = pointIndex;
            this.raiseShow();
        }
    };
    ConnectionPointsVisualizer.prototype.update = function () {
        this.raiseShow();
    };
    ConnectionPointsVisualizer.prototype.reset = function () {
        if (this.key !== "-1") {
            this.key = "-1";
            this.points = [];
            this.pointIndex = -1;
            this.outsideRectangle = undefined;
            this.raiseHide();
        }
    };
    ConnectionPointsVisualizer.prototype.raiseShow = function () {
        var _this = this;
        this.dispatcher.raise1(function (l) { return l.notifyConnectionPointsShow(_this.key, _this.points, _this.pointIndex, _this.outsideRectangle); });
    };
    ConnectionPointsVisualizer.prototype.raiseHide = function () {
        this.dispatcher.raise1(function (l) { return l.notifyConnectionPointsHide(); });
    };
    return ConnectionPointsVisualizer;
}());
exports.ConnectionPointsVisualizer = ConnectionPointsVisualizer;
//# sourceMappingURL=ConnectionPointsVisualizer.js.map