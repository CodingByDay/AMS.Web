"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagramItem = exports.DEFAULT_ZINDEX = exports.ConnectionPointSide = void 0;
var rectangle_1 = require("@devexpress/utils/lib/geometry/rectangle");
var metrics_1 = require("@devexpress/utils/lib/geometry/metrics");
var Utils_1 = require("../Utils");
var Style_1 = require("./Style");
var ConnectionPointSide;
(function (ConnectionPointSide) {
    ConnectionPointSide[ConnectionPointSide["Undefined"] = -1] = "Undefined";
    ConnectionPointSide[ConnectionPointSide["North"] = 0] = "North";
    ConnectionPointSide[ConnectionPointSide["East"] = 1] = "East";
    ConnectionPointSide[ConnectionPointSide["South"] = 2] = "South";
    ConnectionPointSide[ConnectionPointSide["West"] = 3] = "West";
})(ConnectionPointSide = exports.ConnectionPointSide || (exports.ConnectionPointSide = {}));
exports.DEFAULT_ZINDEX = 0;
var DiagramItem = (function () {
    function DiagramItem() {
        this.key = undefined;
        this.dataKey = undefined;
        this.customData = undefined;
        this.attachedConnectors = [];
        this.zIndex = exports.DEFAULT_ZINDEX;
        this.locked = false;
        this.container = undefined;
        this.style = new Style_1.Style();
        this.styleText = new Style_1.TextStyle();
    }
    DiagramItem.prototype.assign = function (item) {
        item.key = this.key;
        item.dataKey = this.dataKey;
        item.customData = Utils_1.ObjectUtils.cloneObject(this.customData);
        item.locked = this.locked;
        item.attachedConnectors = this.attachedConnectors.slice();
        item.style = this.style.clone();
        item.styleText = this.styleText.clone();
        item.zIndex = this.zIndex;
        item.container = this.container;
    };
    DiagramItem.prototype.getConnectionPointPosition = function (index, targetPoint) {
        return this.getConnectionPoint(index, targetPoint).toPoint();
    };
    DiagramItem.prototype.getConnectionPoint = function (index, targetPoint) {
        if (index < 0 && targetPoint)
            index = this.getNearestConnectionPoint(targetPoint);
        var connectionPoints = this.getConnectionPoints();
        return connectionPoints[index] || connectionPoints[0];
    };
    DiagramItem.prototype.getNearestConnectionPoint = function (targetPoint) {
        var distance = Number.MAX_VALUE;
        var result;
        this.getConnectionPoints().forEach(function (pt, index) {
            var ptDistance = metrics_1.Metrics.euclideanDistance(pt, targetPoint);
            if (ptDistance < distance) {
                distance = ptDistance;
                result = index;
            }
        });
        return result;
    };
    DiagramItem.prototype.getConnectionPointIndex = function (side) {
        var points = this.getConnectionPoints();
        return points.reduce(function (prevIndex, pt, index) {
            if (side === ConnectionPointSide.North && pt.y < points[prevIndex].y)
                return index;
            if (side === ConnectionPointSide.South && pt.y > points[prevIndex].y)
                return index;
            if (side === ConnectionPointSide.West && pt.x < points[prevIndex].x)
                return index;
            if (side === ConnectionPointSide.East && pt.x > points[prevIndex].x)
                return index;
            return prevIndex;
        }, 0);
    };
    DiagramItem.prototype.getConnectionPointSideByIndex = function (index, targetPoint) {
        var point = this.getConnectionPoint(index, targetPoint);
        return this.getConnectionPointSide(point, targetPoint);
    };
    DiagramItem.prototype.getConnectionPointIndexForSide = function (side) {
        return side;
    };
    Object.defineProperty(DiagramItem.prototype, "enableText", {
        get: function () { return true; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "allowEditText", {
        get: function () { return true; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "hasTemplate", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "enableChildren", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "isLocked", {
        get: function () { return this.locked || (this.container && this.container.isLocked); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "allowResizeHorizontally", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "allowResizeVertically", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "strokeWidth", {
        get: function () { return this.style.strokeWidth; },
        enumerable: false,
        configurable: true
    });
    DiagramItem.prototype.intersectedByRect = function (rect) {
        return rectangle_1.Rectangle.areIntersected(this.rectangle, rect);
    };
    return DiagramItem;
}());
exports.DiagramItem = DiagramItem;
//# sourceMappingURL=DiagramItem.js.map