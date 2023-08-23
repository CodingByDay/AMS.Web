"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RightAngleConnectorRoutingMathOperations = void 0;
var segment_1 = require("@devexpress/utils/lib/geometry/segment");
var math_1 = require("@devexpress/utils/lib/utils/math");
var AStarMetrics_1 = require("../AStarAlgorithm/AStarMetrics");
var Utils_1 = require("../../../../Utils");
var DiagramItem_1 = require("../../../DiagramItem");
var RightAngleConnectorRoutingMathOperations = (function () {
    function RightAngleConnectorRoutingMathOperations() {
    }
    RightAngleConnectorRoutingMathOperations.createUnionSegments = function (segments, shouldCreateSegment) {
        var result = [];
        var startRenderPoint = segments[0].startPoint;
        var endRenderPoint = segments[0].endPoint;
        for (var i = 1; i < segments.length; i++) {
            var currentSegment = segments[i];
            if (shouldCreateSegment(endRenderPoint, currentSegment.startPoint)) {
                result.push(new segment_1.Segment(startRenderPoint.clone(), endRenderPoint.clone()));
                startRenderPoint = currentSegment.startPoint;
            }
            endRenderPoint = currentSegment.endPoint;
        }
        result.push(new segment_1.Segment(startRenderPoint, endRenderPoint));
        return result;
    };
    RightAngleConnectorRoutingMathOperations.unionPoints = function (points) {
        var index = 0;
        while (index < points.length - 2)
            if (Utils_1.GeometryUtils.isCorner(points[index], points[index + 1], points[index + 2]))
                index++;
            else {
                points.splice(index + 1, 1);
                index = Math.max(0, index - 1);
            }
    };
    RightAngleConnectorRoutingMathOperations.getTurnDirection = function (angle) {
        if (math_1.MathUtils.numberCloseTo(angle, 0))
            return AStarMetrics_1.RightAngleTurnDirection.Straight;
        if (math_1.MathUtils.numberCloseTo(angle, Math.PI))
            return AStarMetrics_1.RightAngleTurnDirection.Backwards;
        return angle < Math.PI ? AStarMetrics_1.RightAngleTurnDirection.Left : AStarMetrics_1.RightAngleTurnDirection.Right;
    };
    RightAngleConnectorRoutingMathOperations.isSegmentNormal = function (segment, isHorizontal) {
        return isHorizontal ? math_1.MathUtils.numberCloseTo(segment.startPoint.y, segment.endPoint.y) : math_1.MathUtils.numberCloseTo(segment.startPoint.x, segment.endPoint.x);
    };
    RightAngleConnectorRoutingMathOperations.isConnectionRectanleLineIntersected = function (rect, segment, side, excludeBeginPoint, excludeEndPoint, createPoint) {
        switch (side) {
            case DiagramItem_1.ConnectionPointSide.North:
                return Utils_1.GeometryUtils.isLineIntersected(createPoint(rect.x, rect.y), createPoint(rect.right, rect.y), segment, excludeBeginPoint, excludeEndPoint);
            case DiagramItem_1.ConnectionPointSide.South:
                return Utils_1.GeometryUtils.isLineIntersected(createPoint(rect.right, rect.bottom), createPoint(rect.x, rect.bottom), segment, excludeBeginPoint, excludeEndPoint);
            case DiagramItem_1.ConnectionPointSide.West:
                return Utils_1.GeometryUtils.isLineIntersected(createPoint(rect.x, rect.y), createPoint(rect.x, rect.bottom), segment, excludeBeginPoint, excludeEndPoint);
            case DiagramItem_1.ConnectionPointSide.East:
                return Utils_1.GeometryUtils.isLineIntersected(createPoint(rect.right, rect.y), createPoint(rect.right, rect.bottom), segment, excludeBeginPoint, excludeEndPoint);
            default:
                return false;
        }
    };
    RightAngleConnectorRoutingMathOperations.createBeginConnectionSegment = function (beginConnectionSide, beginPoint, offset, createPoint) {
        switch (beginConnectionSide) {
            case DiagramItem_1.ConnectionPointSide.North:
                return new segment_1.Segment(beginPoint, createPoint(beginPoint.x, beginPoint.y - offset));
            case DiagramItem_1.ConnectionPointSide.South:
                return new segment_1.Segment(beginPoint, createPoint(beginPoint.x, beginPoint.y + offset));
            case DiagramItem_1.ConnectionPointSide.West:
                return new segment_1.Segment(beginPoint, createPoint(beginPoint.x - offset, beginPoint.y));
            case DiagramItem_1.ConnectionPointSide.East:
                return new segment_1.Segment(beginPoint, createPoint(beginPoint.x + offset, beginPoint.y));
            default:
                return beginPoint;
        }
    };
    RightAngleConnectorRoutingMathOperations.createEndConnectionSegment = function (endConnectionSide, endPoint, offset, createPoint) {
        switch (endConnectionSide) {
            case DiagramItem_1.ConnectionPointSide.North:
                return new segment_1.Segment(createPoint(endPoint.x, endPoint.y - offset), endPoint);
            case DiagramItem_1.ConnectionPointSide.South:
                return new segment_1.Segment(createPoint(endPoint.x, endPoint.y + offset), endPoint);
            case DiagramItem_1.ConnectionPointSide.West:
                return new segment_1.Segment(createPoint(endPoint.x - offset, endPoint.y), endPoint);
            case DiagramItem_1.ConnectionPointSide.East:
                return new segment_1.Segment(createPoint(endPoint.x + offset, endPoint.y), endPoint);
            default:
                return endPoint;
        }
    };
    return RightAngleConnectorRoutingMathOperations;
}());
exports.RightAngleConnectorRoutingMathOperations = RightAngleConnectorRoutingMathOperations;
//# sourceMappingURL=RightAngleConnectorRoutingMathOperations.js.map