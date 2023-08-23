"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RightAngleConnectorRoutingStrategy = void 0;
var segment_1 = require("@devexpress/utils/lib/geometry/segment");
var ConnectorRenderPoint_1 = require("../../ConnectorRenderPoint");
var RightAngleConnectorRoutingContext_1 = require("./RightAngleConnectorRoutingContext");
var ModelUtils_1 = require("../../../ModelUtils");
var RightAngleConnectorRoutingStrategy = (function () {
    function RightAngleConnectorRoutingStrategy(model) {
        this.model = model;
    }
    RightAngleConnectorRoutingStrategy.prototype.createRenderPoints = function (points, supportRenderPoints, beginConnectionShape, endConnectionShape, beginConnectionPointIndex, endConnectionPointIndex, container) {
        if (supportRenderPoints.length > 1) {
            var context = new RightAngleConnectorRoutingContext_1.RightAngleConnectorRoutingContext(this.model, points, supportRenderPoints, beginConnectionShape, endConnectionShape, beginConnectionPointIndex, endConnectionPointIndex);
            context.initialize(container);
            if (context.shouldCreateRenderPoints)
                return this.createRenderPointsCore(context);
        }
    };
    RightAngleConnectorRoutingStrategy.prototype.clone = function () {
        return new RightAngleConnectorRoutingStrategy(this.model);
    };
    RightAngleConnectorRoutingStrategy.prototype.onAddPoint = function (points, pointIndex, point, oldRenderPoints) {
        var renderPoints = oldRenderPoints.map(function (p) { return new ConnectorRenderPoint_1.ConnectorRenderPoint(p.x, p.y, p.pointIndex); });
        var renderPointIndex = ModelUtils_1.ModelUtils.findFirstPointIndex(renderPoints, function (p) { return p.equals(point); });
        if (renderPointIndex === 0) {
            renderPoints.splice(1, 0, new ConnectorRenderPoint_1.ConnectorRenderPoint(point.x, point.y, pointIndex));
            return ModelUtils_1.ModelUtils.validateRenderPointIndexes(points, renderPoints, 2);
        }
        var lastRenderPointIndex = renderPoints.length - 1;
        if (renderPointIndex === lastRenderPointIndex) {
            renderPoints.splice(lastRenderPointIndex, 0, new ConnectorRenderPoint_1.ConnectorRenderPoint(point.x, point.y, pointIndex));
            renderPoints[lastRenderPointIndex + 1].pointIndex = pointIndex + 1;
            return renderPoints;
        }
        if (renderPointIndex > 0) {
            var oldRenderPoint = renderPoints[renderPointIndex];
            renderPoints[renderPointIndex] = new ConnectorRenderPoint_1.ConnectorRenderPoint(oldRenderPoint.x, oldRenderPoint.y, pointIndex, oldRenderPoint.skipped);
            return ModelUtils_1.ModelUtils.validateRenderPointIndexes(points, renderPoints, renderPointIndex + 1);
        }
        var firstSegment = new segment_1.Segment(renderPoints[0], renderPoints[1]);
        var newRenderPoint = new ConnectorRenderPoint_1.ConnectorRenderPoint(point.x, point.y);
        if (firstSegment.containsPoint(newRenderPoint)) {
            renderPoints.splice(1, 0, new ConnectorRenderPoint_1.ConnectorRenderPoint(newRenderPoint.x, newRenderPoint.y, -1));
            renderPoints.splice(2, 0, new ConnectorRenderPoint_1.ConnectorRenderPoint(newRenderPoint.x, newRenderPoint.y, pointIndex));
            return ModelUtils_1.ModelUtils.validateRenderPointIndexes(points, renderPoints, 3);
        }
        var lastSegment = new segment_1.Segment(renderPoints[lastRenderPointIndex - 1], renderPoints[lastRenderPointIndex]);
        if (lastSegment.containsPoint(newRenderPoint)) {
            renderPoints.splice(lastRenderPointIndex, 0, new ConnectorRenderPoint_1.ConnectorRenderPoint(newRenderPoint.x, newRenderPoint.y, pointIndex));
            renderPoints.splice(lastRenderPointIndex + 1, 0, new ConnectorRenderPoint_1.ConnectorRenderPoint(newRenderPoint.x, newRenderPoint.y, -1));
            renderPoints[lastRenderPointIndex + 2].pointIndex = pointIndex + 1;
            return renderPoints;
        }
        return oldRenderPoints;
    };
    RightAngleConnectorRoutingStrategy.prototype.onDeletePoint = function (points, pointIndex, oldRenderPoints) {
        var renderPoints = oldRenderPoints.map(function (p) { return new ConnectorRenderPoint_1.ConnectorRenderPoint(p.x, p.y, p.pointIndex); });
        var renderPointIndex = this.getRenderPointIndexByPointIndex(renderPoints, pointIndex);
        if (renderPointIndex === 1) {
            var previuosRenderPoint = renderPoints[0];
            var currentRenderPoint_1 = renderPoints[1];
            if (previuosRenderPoint.equals(currentRenderPoint_1)) {
                renderPoints.splice(1, 1);
                return ModelUtils_1.ModelUtils.validateRenderPointIndexes(points, renderPoints, 1);
            }
            renderPoints[1] = new ConnectorRenderPoint_1.ConnectorRenderPoint(currentRenderPoint_1.x, currentRenderPoint_1.y, -1, currentRenderPoint_1.skipped);
            return ModelUtils_1.ModelUtils.validateRenderPointIndexes(points, renderPoints, 2);
        }
        if (renderPointIndex === 2) {
            var previuosRenderPoint = renderPoints[1];
            var currentRenderPoint_2 = renderPoints[2];
            if (previuosRenderPoint.equals(currentRenderPoint_2)) {
                renderPoints.splice(1, 2);
                return ModelUtils_1.ModelUtils.validateRenderPointIndexes(points, renderPoints, 1);
            }
            renderPoints[2] = new ConnectorRenderPoint_1.ConnectorRenderPoint(currentRenderPoint_2.x, currentRenderPoint_2.y, -1, currentRenderPoint_2.skipped);
            return ModelUtils_1.ModelUtils.validateRenderPointIndexes(points, renderPoints, 3);
        }
        var lastRenderPointIndex = renderPoints.length - 1;
        if (renderPointIndex === lastRenderPointIndex - 1) {
            var currentRenderPoint_3 = renderPoints[lastRenderPointIndex - 1];
            var nextRenderPoint = renderPoints[lastRenderPointIndex];
            if (currentRenderPoint_3.equals(nextRenderPoint)) {
                renderPoints.splice(lastRenderPointIndex - 1, 1);
                return ModelUtils_1.ModelUtils.validateRenderPointIndexes(points, renderPoints, lastRenderPointIndex - 1);
            }
            renderPoints[lastRenderPointIndex - 1] = new ConnectorRenderPoint_1.ConnectorRenderPoint(currentRenderPoint_3.x, currentRenderPoint_3.y, -1, currentRenderPoint_3.skipped);
            return ModelUtils_1.ModelUtils.validateRenderPointIndexes(points, renderPoints, lastRenderPointIndex);
        }
        if (renderPointIndex === lastRenderPointIndex - 2) {
            var currentRenderPoint_4 = renderPoints[lastRenderPointIndex - 2];
            var nextRenderPoint = renderPoints[lastRenderPointIndex - 1];
            if (currentRenderPoint_4.equals(nextRenderPoint)) {
                renderPoints.splice(lastRenderPointIndex - 2, 2);
                return ModelUtils_1.ModelUtils.validateRenderPointIndexes(points, renderPoints, lastRenderPointIndex - 2);
            }
            renderPoints[lastRenderPointIndex - 2] = new ConnectorRenderPoint_1.ConnectorRenderPoint(currentRenderPoint_4.x, currentRenderPoint_4.y, -1, currentRenderPoint_4.skipped);
            return ModelUtils_1.ModelUtils.validateRenderPointIndexes(points, renderPoints, lastRenderPointIndex - 1);
        }
        var currentRenderPoint = renderPoints[renderPointIndex];
        renderPoints[renderPointIndex] = new ConnectorRenderPoint_1.ConnectorRenderPoint(currentRenderPoint.x, currentRenderPoint.y, -1, currentRenderPoint.skipped);
        return ModelUtils_1.ModelUtils.validateRenderPointIndexes(points, renderPoints, renderPointIndex + 1);
    };
    RightAngleConnectorRoutingStrategy.prototype.onMovePoint = function (points, pointIndex, point, oldRenderPoints) {
        if (pointIndex === 0 || pointIndex === points.length - 1)
            return oldRenderPoints;
        var renderPoints = oldRenderPoints.map(function (p) { return new ConnectorRenderPoint_1.ConnectorRenderPoint(p.x, p.y, p.pointIndex); });
        this.onMovePointCore(renderPoints, pointIndex, point);
        ModelUtils_1.ModelUtils.skipUnnecessaryRightAngleRenderPoints(renderPoints);
        return renderPoints;
    };
    RightAngleConnectorRoutingStrategy.prototype.onMovePoints = function (points, beginPointIndex, beginPoint, lastPointIndex, lastPoint, oldRenderPoints) {
        if (beginPointIndex === 0 || lastPointIndex === points.length - 1)
            return oldRenderPoints;
        var renderPoints = oldRenderPoints.map(function (p) { return new ConnectorRenderPoint_1.ConnectorRenderPoint(p.x, p.y, p.pointIndex); });
        this.onMovePointCore(renderPoints, beginPointIndex, beginPoint);
        this.onMovePointCore(renderPoints, lastPointIndex, lastPoint);
        ModelUtils_1.ModelUtils.skipUnnecessaryRightAngleRenderPoints(renderPoints);
        return renderPoints;
    };
    RightAngleConnectorRoutingStrategy.prototype.onMovePointCore = function (newRenderPoints, pointIndex, newPoint) {
        var renderPointIndex = this.getRenderPointIndexByPointIndex(newRenderPoints, pointIndex);
        if (renderPointIndex >= 0) {
            var oldRenderPoint = newRenderPoints[renderPointIndex];
            newRenderPoints[renderPointIndex] = new ConnectorRenderPoint_1.ConnectorRenderPoint(newPoint.x, newPoint.y, pointIndex, oldRenderPoint.skipped);
        }
    };
    RightAngleConnectorRoutingStrategy.prototype.createRenderPointsCore = function (context) {
        var result = [];
        var currentIndex = -1;
        var currentRenderSegment;
        var currentStartCustomPointIndex = -1;
        context.setup();
        var renderSegments = context.renderSegments;
        var endPoint = renderSegments[renderSegments.length - 1].endPoint;
        var points = context.points;
        do {
            this.registerCustomPoints(result, points, currentStartCustomPointIndex + 2, renderSegments[currentIndex + 1].startPointIndex - 1);
            currentIndex++;
            currentRenderSegment = renderSegments[currentIndex];
            currentStartCustomPointIndex = currentRenderSegment.startPointIndex;
            this.registerRenderPoints(result, context.createRoutedPoints(currentRenderSegment.startInfo, currentRenderSegment.endInfo, currentRenderSegment.createProhibitedSegments()), currentStartCustomPointIndex);
        } while (!currentRenderSegment.endPoint.equals(endPoint));
        context.validateRenderPoints(result);
        return result;
    };
    RightAngleConnectorRoutingStrategy.prototype.getRenderPointIndexByPointIndex = function (points, index) {
        return ModelUtils_1.ModelUtils.findFirstPointIndex(points, function (p) { return p.pointIndex === index; });
    };
    RightAngleConnectorRoutingStrategy.prototype.registerRenderPoints = function (resultPath, routedPoints, beginPointIndex) {
        var _this = this;
        routedPoints.forEach(function (p, i) {
            var pointIndex = i === 0 ? beginPointIndex : (i === routedPoints.length - 1 ? beginPointIndex + 1 : -1);
            _this.registerPoint(resultPath, p, pointIndex);
        });
    };
    RightAngleConnectorRoutingStrategy.prototype.registerCustomPoints = function (resultPath, points, startIndex, endIndex) {
        for (var i = startIndex; i <= endIndex; i++)
            this.registerPoint(resultPath, points[i], i);
    };
    RightAngleConnectorRoutingStrategy.prototype.registerPoint = function (resultPath, point, pointIndex) {
        resultPath.push(new ConnectorRenderPoint_1.ConnectorRenderPoint(point.x, point.y, pointIndex));
    };
    return RightAngleConnectorRoutingStrategy;
}());
exports.RightAngleConnectorRoutingStrategy = RightAngleConnectorRoutingStrategy;
//# sourceMappingURL=RightAngleConnectorRoutingStrategy.js.map