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
exports.AStarContext = exports.AStarContextBase = void 0;
var SortedQueues_1 = require("./SortedQueues");
var UniqueAStarNodePositions_1 = require("./UniqueAStarNodePositions");
var AStarNode_1 = require("./AStarNode");
var segment_1 = require("@devexpress/utils/lib/geometry/segment");
var RightAngleConnectorRoutingMathOperations_1 = require("../Strategy/RightAngleConnectorRoutingMathOperations");
var Utils_1 = require("../../../../Utils");
var AStarContextBase = (function () {
    function AStarContextBase(startPosition, targetPosition, maxStepsCount) {
        this.startPosition = startPosition;
        this.targetPosition = targetPosition;
        this.maxStepsCount = maxStepsCount;
        this.prohibitedPoints = {};
    }
    Object.defineProperty(AStarContextBase.prototype, "shouldStartContinue", {
        get: function () {
            return this.updatableSet.count > 0 && this.stepsCount < this.maxStepsCount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AStarContextBase.prototype, "shouldFinish", {
        get: function () {
            return this.currentNode.position.equals(this.targetPosition);
        },
        enumerable: false,
        configurable: true
    });
    AStarContextBase.prototype.start = function () {
        this.generalSet = new SortedQueues_1.SortedQueues(function (x) { return x.key; });
        this.updatableSet = new UniqueAStarNodePositions_1.UniqueAStarNodePositions();
        var currentNode = new AStarNode_1.AStarNode(this.startPosition, this.getDistance(this.startPosition, this.targetPosition));
        this.currentNode = currentNode;
        this.generalSet.enqueue(currentNode);
        this.updatableSet.add(currentNode.position, currentNode);
        this.stepsCount = 0;
        this.openNode = undefined;
    };
    AStarContextBase.prototype.startContinue = function () {
        this.currentNode = this.generalSet.dequeueMin();
    };
    AStarContextBase.prototype.endContinue = function () {
        var _this = this;
        var currentPosition = this.currentNode.position;
        this.updatableSet.remove(currentPosition);
        this.addProhibitedPoint(currentPosition);
        this.getNeighborPoints(currentPosition).forEach(function (nextPosition) {
            var penalty = _this.getPenalty(_this.currentNode, nextPosition);
            var openNode = _this.updatableSet.getNode(nextPosition);
            if (openNode === undefined) {
                openNode = new AStarNode_1.AStarNode(nextPosition, _this.getDistance(nextPosition, _this.targetPosition));
                openNode.parent = _this.currentNode;
                openNode.penalty = penalty;
                _this.generalSet.enqueue(openNode);
                _this.updatableSet.add(nextPosition, openNode);
            }
            else if (openNode.penalty > penalty) {
                var generalSet = _this.generalSet;
                generalSet.remove(openNode);
                openNode.parent = _this.currentNode;
                openNode.penalty = penalty;
                generalSet.enqueue(openNode);
            }
            _this.openNode = openNode;
        });
        this.stepsCount++;
    };
    AStarContextBase.prototype.finishWithPath = function () {
        this.path = this.currentNode.getPath();
    };
    AStarContextBase.prototype.finishWithoutPath = function () {
        this.path = [];
    };
    return AStarContextBase;
}());
exports.AStarContextBase = AStarContextBase;
var AStarContext = (function (_super) {
    __extends(AStarContext, _super);
    function AStarContext(routingContext, startPosition, targetPosition, prohibitedSegments, grid, metrics) {
        var _this = _super.call(this, startPosition, targetPosition, 10000) || this;
        _this.routingContext = routingContext;
        _this.startPosition = startPosition;
        _this.targetPosition = targetPosition;
        _this.prohibitedSegments = prohibitedSegments;
        _this.grid = grid;
        _this.metrics = metrics;
        return _this;
    }
    AStarContext.prototype.addProhibitedPoint = function (point) {
        this.prohibitedPoints[point.toString()] = point;
    };
    AStarContext.prototype.getNeighborPoints = function (point) {
        var _this = this;
        return this.grid.getNeighborPoints(point).filter(function (p) { return _this.allowPoint(p); });
    };
    AStarContext.prototype.getDistance = function (startPoint, endPoint) {
        return this.metrics.distance(startPoint, endPoint);
    };
    AStarContext.prototype.getPenalty = function (node, nextPoint) {
        var parent = node.parent;
        var currentPosition = node.position;
        var turnDirection = this.getTurnDirection(parent ? Utils_1.GeometryUtils.createAngle(parent.position, currentPosition, nextPoint) : 0);
        var distance = this.getDistance(currentPosition, nextPoint);
        var middlePosition = new segment_1.Segment(currentPosition, nextPoint).center;
        return node.penalty + this.metrics.penalty(distance, middlePosition, turnDirection, this.getIntersectedItems(middlePosition));
    };
    AStarContext.prototype.allowPoint = function (p) {
        return this.prohibitedPoints[p.toString()] === undefined && (!this.prohibitedSegments || this.prohibitedSegments.allowPoint(p));
    };
    AStarContext.prototype.getTurnDirection = function (angle) {
        return RightAngleConnectorRoutingMathOperations_1.RightAngleConnectorRoutingMathOperations.getTurnDirection(angle);
    };
    AStarContext.prototype.getIntersectedItems = function (position) {
        var _this = this;
        var margin = this.routingContext.shapeMargins;
        return this.routingContext.getIntersectedItems(position, function (p, i) { return _this.hasIntersectedItem(p, i, margin); });
    };
    AStarContext.prototype.hasIntersectedItem = function (point, item, margin) {
        if (!this.isIntersectedWithExtendedRectangle(point, item, margin))
            return false;
        if (this.hasOneShapeConnection(item))
            return true;
        return !this.itemContainsConnectionPoints(item);
    };
    AStarContext.prototype.isIntersectedWithExtendedRectangle = function (point, item, margin) {
        return item.rectangle.clone().inflate(margin).containsPoint(point);
    };
    AStarContext.prototype.itemContainsConnectionPoints = function (item) {
        var rectangle = item.rectangle;
        return rectangle.containsPoint(this.routingContext.beginPoint) && rectangle.containsPoint(this.routingContext.endPoint);
    };
    AStarContext.prototype.hasOneShapeConnection = function (item) {
        var connectionPoints = item.getConnectionPoints();
        return this.isConnectionPoint(connectionPoints, this.routingContext.beginPoint) &&
            this.isConnectionPoint(connectionPoints, this.routingContext.endPoint);
    };
    AStarContext.prototype.isConnectionPoint = function (connectionPoints, point) {
        return connectionPoints.filter(function (p) { return p.equals(point); }).length > 0;
    };
    return AStarContext;
}(AStarContextBase));
exports.AStarContext = AStarContext;
//# sourceMappingURL=AStarContext.js.map