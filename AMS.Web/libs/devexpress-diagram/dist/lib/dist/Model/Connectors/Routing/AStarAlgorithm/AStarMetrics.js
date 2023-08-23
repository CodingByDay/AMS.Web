"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntersectedShapeZone = exports.AStarMetrics = exports.IntersectedShapesMetrics = exports.TurnDirectionMetrics = exports.IntersectedShapeMetrics = exports.RightAngleTurnDirection = void 0;
var point_1 = require("@devexpress/utils/lib/geometry/point");
var metrics_1 = require("@devexpress/utils/lib/geometry/metrics");
var RightAngleTurnDirection;
(function (RightAngleTurnDirection) {
    RightAngleTurnDirection[RightAngleTurnDirection["Straight"] = 0] = "Straight";
    RightAngleTurnDirection[RightAngleTurnDirection["Left"] = 1] = "Left";
    RightAngleTurnDirection[RightAngleTurnDirection["Right"] = 2] = "Right";
    RightAngleTurnDirection[RightAngleTurnDirection["Backwards"] = 3] = "Backwards";
})(RightAngleTurnDirection = exports.RightAngleTurnDirection || (exports.RightAngleTurnDirection = {}));
var IntersectedShapeMetrics = (function () {
    function IntersectedShapeMetrics(description, shapeMargin) {
        this.description = description;
        this.shapeMargin = shapeMargin;
    }
    IntersectedShapeMetrics.prototype.penalty = function (oldValue, distance, position, item) {
        var rectangle = item.rectangle;
        if (rectangle.containsPoint(position))
            return oldValue + this.description.shape * distance;
        var relativePenalty = this.createRelativeMarginPenalty(position, rectangle, this.shapeMargin);
        if (relativePenalty > 0)
            return oldValue + this.description.margin * relativePenalty * distance;
        return oldValue;
    };
    IntersectedShapeMetrics.prototype.createRelativeMarginPenalty = function (point, rectangle, margin) {
        var isTopPosition = this.isTopPosition(point, rectangle, margin);
        var isLeftPosition = this.isLeftPosition(point, rectangle, margin);
        var isBottomPosition = this.isBottomPosition(point, rectangle, margin);
        var isRightPosition = this.isRightPosition(point, rectangle, margin);
        if (isTopPosition) {
            if (isLeftPosition) {
                var extendedRectangle = rectangle.clone().inflate(margin);
                var extendedTopLeft = extendedRectangle.createPosition();
                var rectangleTopLeft = rectangle.createPosition();
                var topLeftDistance = metrics_1.Metrics.euclideanDistance(rectangleTopLeft, extendedTopLeft);
                var currentDistance = metrics_1.Metrics.euclideanDistance(rectangleTopLeft, point);
                return 1 - currentDistance / topLeftDistance;
            }
            if (isRightPosition) {
                var extendedRectangle = rectangle.clone().inflate(margin);
                var extendedTopRight = new point_1.Point(extendedRectangle.right, extendedRectangle.y);
                var rectangleTopRight = new point_1.Point(rectangle.right, rectangle.y);
                var topRightDistance = metrics_1.Metrics.euclideanDistance(rectangleTopRight, extendedTopRight);
                var currentDistance = metrics_1.Metrics.euclideanDistance(rectangleTopRight, point);
                return 1 - currentDistance / topRightDistance;
            }
            return 1 - (rectangle.y - point.y) / margin;
        }
        if (isBottomPosition) {
            if (isLeftPosition) {
                var extendedRectangle = rectangle.clone().inflate(margin);
                var extendedBottomLeft = new point_1.Point(extendedRectangle.x, extendedRectangle.bottom);
                var rectangleBottomLeft = new point_1.Point(rectangle.x, rectangle.bottom);
                var bottomLeftDistance = metrics_1.Metrics.euclideanDistance(rectangleBottomLeft, extendedBottomLeft);
                var currentDistance = metrics_1.Metrics.euclideanDistance(rectangleBottomLeft, point);
                return 1 - currentDistance / bottomLeftDistance;
            }
            if (isRightPosition) {
                var extendedRectangle = rectangle.clone().inflate(margin);
                var extendedBottomRight = new point_1.Point(extendedRectangle.right, extendedRectangle.bottom);
                var rectangleBottomRight = new point_1.Point(rectangle.right, rectangle.bottom);
                var bottomRightDistance = metrics_1.Metrics.euclideanDistance(rectangleBottomRight, extendedBottomRight);
                var currentDistance = metrics_1.Metrics.euclideanDistance(rectangleBottomRight, point);
                return 1 - currentDistance / bottomRightDistance;
            }
            return 1 - (point.y - rectangle.bottom) / margin;
        }
        if (isLeftPosition)
            return 1 - (rectangle.x - point.x) / margin;
        if (isRightPosition)
            return 1 - (point.x - rectangle.right) / margin;
        return 0;
    };
    IntersectedShapeMetrics.prototype.isTopPosition = function (point, rectangle, margin) {
        return point.x > rectangle.x - margin && point.x < rectangle.right + margin &&
            point.y > rectangle.y - margin && point.y < rectangle.y;
    };
    IntersectedShapeMetrics.prototype.isBottomPosition = function (point, rectangle, margin) {
        return point.x > rectangle.x - margin && point.x < rectangle.right + margin &&
            point.y > rectangle.bottom && point.y < rectangle.bottom + margin;
    };
    IntersectedShapeMetrics.prototype.isLeftPosition = function (point, rectangle, margin) {
        return point.x > rectangle.x - margin && point.x < rectangle.x &&
            point.y > rectangle.y - margin && point.y < rectangle.bottom + margin;
    };
    IntersectedShapeMetrics.prototype.isRightPosition = function (point, rectangle, margin) {
        return point.x > rectangle.right && point.x < rectangle.right + margin &&
            point.y > rectangle.y - margin && point.y < rectangle.bottom + margin;
    };
    return IntersectedShapeMetrics;
}());
exports.IntersectedShapeMetrics = IntersectedShapeMetrics;
var TurnDirectionMetrics = (function () {
    function TurnDirectionMetrics(description) {
        this.description = description;
    }
    TurnDirectionMetrics.prototype.penalty = function (oldValue, turnDirection) {
        switch (turnDirection) {
            case RightAngleTurnDirection.Backwards: return oldValue * this.description.turnBack;
            case RightAngleTurnDirection.Left: return oldValue * this.description.turnLeft;
            case RightAngleTurnDirection.Right: return oldValue * this.description.turnRight;
        }
        return oldValue;
    };
    return TurnDirectionMetrics;
}());
exports.TurnDirectionMetrics = TurnDirectionMetrics;
var IntersectedShapesMetrics = (function () {
    function IntersectedShapesMetrics(shapeMetrics) {
        this.shapeMetrics = shapeMetrics;
    }
    IntersectedShapesMetrics.prototype.penalty = function (oldValue, distance, position, intersectedItems) {
        var _this = this;
        if (!intersectedItems || !intersectedItems.length)
            return oldValue;
        var result = oldValue;
        intersectedItems.forEach(function (item) { return result = _this.shapeMetrics.penalty(result, distance, position, item); });
        return result;
    };
    return IntersectedShapesMetrics;
}());
exports.IntersectedShapesMetrics = IntersectedShapesMetrics;
var AStarMetrics = (function () {
    function AStarMetrics(turnDirectionMetrics, shapesMetrics) {
        this.turnDirectionMetrics = turnDirectionMetrics;
        this.shapesMetrics = shapesMetrics;
    }
    AStarMetrics.prototype.distance = function (point1, point2) {
        return metrics_1.Metrics.manhattanDistance(point1, point2);
    };
    AStarMetrics.prototype.penalty = function (distance, position, turnDirection, intersectedItems) {
        var result = distance;
        result = this.shapesMetrics.penalty(result, distance, position, intersectedItems);
        result = this.turnDirectionMetrics.penalty(result, turnDirection);
        return result;
    };
    return AStarMetrics;
}());
exports.AStarMetrics = AStarMetrics;
var IntersectedShapeZone;
(function (IntersectedShapeZone) {
    IntersectedShapeZone[IntersectedShapeZone["None"] = 0] = "None";
    IntersectedShapeZone[IntersectedShapeZone["Shape"] = 1] = "Shape";
    IntersectedShapeZone[IntersectedShapeZone["Margin"] = 2] = "Margin";
})(IntersectedShapeZone = exports.IntersectedShapeZone || (exports.IntersectedShapeZone = {}));
//# sourceMappingURL=AStarMetrics.js.map