"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RightAngleConnectorRoutingContext = exports.IntersectingItemsByPointsContext = exports.CuttingItemsContext = void 0;
var point_1 = require("@devexpress/utils/lib/geometry/point");
var segment_1 = require("@devexpress/utils/lib/geometry/segment");
var vector_1 = require("@devexpress/utils/lib/geometry/vector");
var DiagramItem_1 = require("../../../DiagramItem");
var RightAngleConnectorRoutingMathOperations_1 = require("./RightAngleConnectorRoutingMathOperations");
var ConnectorRenderSegment_1 = require("../ConnectorRenderSegment");
var RoutingGrid_1 = require("../RoutingGrid");
var ModelUtils_1 = require("../../../ModelUtils");
var AStarMetrics_1 = require("../AStarAlgorithm/AStarMetrics");
var AStarContext_1 = require("../AStarAlgorithm/AStarContext");
var AStarCalculator_1 = require("../AStarAlgorithm/AStarCalculator");
var Utils_1 = require("../../../../Utils");
var CuttingItemsContext = (function () {
    function CuttingItemsContext() {
        this.cuttingItemKeys = [];
    }
    Object.defineProperty(CuttingItemsContext.prototype, "isEmpty", {
        get: function () {
            return this.cuttingItemKeys.length === 0;
        },
        enumerable: false,
        configurable: true
    });
    CuttingItemsContext.prototype.registerShape = function (key, rect, segments) {
        if (Utils_1.GeometryUtils.areSegmentsCutRectangle(segments, rect)) {
            this.cuttingItemKeys.push(key);
            return true;
        }
        return false;
    };
    return CuttingItemsContext;
}());
exports.CuttingItemsContext = CuttingItemsContext;
var IntersectingItemsByPointsContext = (function () {
    function IntersectingItemsByPointsContext() {
        this.items = {};
    }
    IntersectingItemsByPointsContext.prototype.getOrAddItems = function (point, getItems) {
        if (point) {
            var key = point.toString();
            var item = this.items[key];
            if (item !== undefined)
                return item.items;
            if (getItems) {
                var items = getItems(point);
                this.items[key] = { point: point, items: items };
                return items;
            }
        }
        return undefined;
    };
    return IntersectingItemsByPointsContext;
}());
exports.IntersectingItemsByPointsContext = IntersectingItemsByPointsContext;
var RightAngleConnectorRoutingContext = (function () {
    function RightAngleConnectorRoutingContext(routingModel, points, supportRenderPoints, beginConnectionShape, endConnectionShape, beginConnectionPointIndex, endConnectionPointIndex) {
        this.routingModel = routingModel;
        this.points = points;
        this.supportRenderPoints = supportRenderPoints;
        this.beginConnectionShape = beginConnectionShape;
        this.endConnectionShape = endConnectionShape;
        this.beginConnectionSide = this.getConnectionSide(this.beginConnectionShape, beginConnectionPointIndex, this.beginPoint);
        this.endConnectionSide = this.getConnectionSide(this.endConnectionShape, endConnectionPointIndex, this.endPoint);
        this.ignorableItemKeys = {};
        this.cuttingShapesContext = new CuttingItemsContext();
        this.intersectedItemsByPointsContext = new IntersectingItemsByPointsContext();
        this.isInvalidRenderSegments = true;
    }
    Object.defineProperty(RightAngleConnectorRoutingContext.prototype, "shapeMargins", {
        get: function () {
            return this.routingModel.shapeMargins;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RightAngleConnectorRoutingContext.prototype, "beginPoint", {
        get: function () {
            return this.points[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RightAngleConnectorRoutingContext.prototype, "endPoint", {
        get: function () {
            return this.points[this.points.length - 1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RightAngleConnectorRoutingContext.prototype, "hasIntersecting", {
        get: function () {
            return !this.cuttingShapesContext.isEmpty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RightAngleConnectorRoutingContext.prototype, "shouldCreateRenderPoints", {
        get: function () {
            return this.isInvalidRenderSegments ||
                (!this.isSmallPath &&
                    (this.hasIntersecting || this.isReversedStartConnection || this.isReversedEndConnection));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RightAngleConnectorRoutingContext.prototype, "beginPathPoint", {
        get: function () {
            return this.beginConnectionSegment instanceof segment_1.Segment ? this.beginConnectionSegment.startPoint : this.beginConnectionSegment;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RightAngleConnectorRoutingContext.prototype, "endPathPoint", {
        get: function () {
            return this.endConnectionSegment instanceof segment_1.Segment ? this.endConnectionSegment.endPoint : this.endConnectionSegment;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RightAngleConnectorRoutingContext.prototype, "isReversedStartConnection", {
        get: function () {
            if (!this.beginConnectionShape || this.beginConnectionSide === DiagramItem_1.ConnectionPointSide.Undefined)
                return false;
            var beginConnectionSegment = this.beginConnectionSegment;
            return !(beginConnectionSegment instanceof point_1.Point) &&
                this.isReversedConnectionSegment(this.supportSegments[0], beginConnectionSegment);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RightAngleConnectorRoutingContext.prototype, "isReversedEndConnection", {
        get: function () {
            if (!this.endConnectionShape || this.endConnectionSide === DiagramItem_1.ConnectionPointSide.Undefined)
                return false;
            var endConnectionSegment = this.endConnectionSegment;
            return !(endConnectionSegment instanceof point_1.Point) &&
                this.isReversedConnectionSegment(this.supportSegments[this.supportSegments.length - 1], endConnectionSegment);
        },
        enumerable: false,
        configurable: true
    });
    RightAngleConnectorRoutingContext.prototype.isReversedConnectionSegment = function (supportSegment, connectionSegment) {
        return vector_1.Vector.scalarProduct(vector_1.Vector.fromSegment(supportSegment), vector_1.Vector.fromPoints(connectionSegment.startPoint, connectionSegment.endPoint)) <= 0;
    };
    Object.defineProperty(RightAngleConnectorRoutingContext.prototype, "isSmallPath", {
        get: function () {
            var doubleMargins = 2 * this.routingModel.shapeMargins;
            return Math.abs(this.beginPathPoint.x - this.endPathPoint.x) < doubleMargins &&
                Math.abs(this.beginPathPoint.y - this.endPathPoint.y) < doubleMargins;
        },
        enumerable: false,
        configurable: true
    });
    RightAngleConnectorRoutingContext.prototype.initialize = function (container) {
        this.processContainers(container);
        this.processSupportSegments();
        this.processIntersection();
        this.processConnections();
        this.processRenderSegments();
    };
    RightAngleConnectorRoutingContext.prototype.setup = function () {
        this.processRoutingGrid();
        this.processRoutingMetrics();
    };
    RightAngleConnectorRoutingContext.prototype.createRoutedPoints = function (startInfo, targetInfo, prohibitedSegments) {
        var startPathPoint = startInfo instanceof point_1.Point ? startInfo : startInfo.endPoint;
        var targetPathPoint = targetInfo instanceof point_1.Point ? targetInfo : targetInfo.startPoint;
        var context = this.createAStarContext(startPathPoint, targetPathPoint, prohibitedSegments);
        AStarCalculator_1.AStarCalculator.calculate(context);
        var result = context.path;
        this.addConnectionRoutedPoints(result, startInfo, targetInfo);
        RightAngleConnectorRoutingMathOperations_1.RightAngleConnectorRoutingMathOperations.unionPoints(result);
        return result;
    };
    RightAngleConnectorRoutingContext.prototype.getIntersectedItems = function (point, predicate) {
        var _this = this;
        return this.intersectedItemsByPointsContext.getOrAddItems(point, function (p) { return _this.routingModel
            .getItems(_this.beginConnectionShape, _this.endConnectionShape)
            .filter(function (s) { return !_this.isIgnorableItem(s) && predicate(p, s); }); });
    };
    RightAngleConnectorRoutingContext.prototype.validateRenderPoints = function (result) {
        if (this.isInvalidRenderSegments) {
            RightAngleConnectorRoutingMathOperations_1.RightAngleConnectorRoutingMathOperations.unionPoints(result);
            ModelUtils_1.ModelUtils.validateRenderPointIndexes(this.points, result, 0);
        }
        ModelUtils_1.ModelUtils.skipUnnecessaryRightAngleRenderPoints(result);
    };
    RightAngleConnectorRoutingContext.prototype.processContainers = function (container) {
        if (container)
            this.registerIgnorableShape(container);
        if (this.beginConnectionShape) {
            var beginShapeContainer = this.beginConnectionShape.container;
            if (beginShapeContainer)
                this.registerIgnorableShape(beginShapeContainer);
        }
        if (this.endConnectionShape) {
            var endShapeContainer = this.endConnectionShape.container;
            if (endShapeContainer)
                this.registerIgnorableShape(endShapeContainer);
        }
    };
    RightAngleConnectorRoutingContext.prototype.processSupportSegments = function () {
        this.supportSegments = this.createSupportSegments();
    };
    RightAngleConnectorRoutingContext.prototype.processIntersection = function () {
        var _this = this;
        var shapes = this.routingModel.getItems(this.beginConnectionShape, this.endConnectionShape);
        if (shapes)
            shapes.forEach(function (s) {
                var key = s.key;
                var rect = s.rectangle;
                if (!_this.cuttingShapesContext.registerShape(key, rect, _this.supportSegments)) {
                    if ((!_this.isConnectedByStart(s) && rect.containsPoint(_this.beginPoint)) ||
                        !_this.isConnectedByEnd(s) && rect.containsPoint(_this.endPoint))
                        _this.registerIgnorableShape(s);
                }
                else if (_this.ignorableItemKeys[key] !== undefined)
                    delete _this.ignorableItemKeys[key];
            });
    };
    RightAngleConnectorRoutingContext.prototype.processConnections = function () {
        var beginShapeContainsEndConnection = false;
        var endShapeContainsBeginConnection = false;
        if (this.beginConnectionShape !== this.endConnectionShape) {
            beginShapeContainsEndConnection = this.shapeContainsOtherConnection(this.beginConnectionShape, this.endConnectionShape, this.endPoint);
            endShapeContainsBeginConnection = this.shapeContainsOtherConnection(this.endConnectionShape, this.beginConnectionShape, this.beginPoint);
            if (beginShapeContainsEndConnection)
                this.registerIgnorableShape(this.beginConnectionShape);
            if (endShapeContainsBeginConnection)
                this.registerIgnorableShape(this.endConnectionShape);
        }
        var shapeMargins = this.routingModel.shapeMargins;
        this.beginConnectionSegment = this.createBeginConnectionSegment(shapeMargins, beginShapeContainsEndConnection);
        this.endConnectionSegment = this.createEndConnectionSegment(shapeMargins, endShapeContainsBeginConnection);
    };
    RightAngleConnectorRoutingContext.prototype.processRenderSegments = function () {
        this.isInvalidRenderSegments = false;
        this.renderSegments = this.createRenderSegments();
        for (var i = 0; i < this.renderSegments.length - 1; i++) {
            var renderSegment = this.renderSegments[i];
            var nextRenderSegment = this.renderSegments[i + 1];
            if (renderSegment.endPoint.equals(nextRenderSegment.startPoint)) {
                this.isInvalidRenderSegments = true;
                return;
            }
        }
    };
    RightAngleConnectorRoutingContext.prototype.createGridPoints = function () {
        var result = [];
        this.renderSegments.forEach(function (s) { return s.createGridPoints().forEach(function (p) { return result.push(p); }); });
        return result;
    };
    RightAngleConnectorRoutingContext.prototype.processRoutingGrid = function () {
        this.routingGrid = this.createGrid();
    };
    RightAngleConnectorRoutingContext.prototype.processRoutingMetrics = function () {
        this.metrics = this.createAStarMetrics();
    };
    RightAngleConnectorRoutingContext.prototype.createAStarMetrics = function () {
        return new AStarMetrics_1.AStarMetrics(new AStarMetrics_1.TurnDirectionMetrics(this.routingModel.penaltyDescription), new AStarMetrics_1.IntersectedShapesMetrics(new AStarMetrics_1.IntersectedShapeMetrics(this.routingModel.penaltyDescription, this.routingModel.shapeMargins)));
    };
    RightAngleConnectorRoutingContext.prototype.createAStarContext = function (start, target, prohibitedSegments) {
        return new AStarContext_1.AStarContext(this, start, target, prohibitedSegments, this.routingGrid, this.metrics);
    };
    RightAngleConnectorRoutingContext.prototype.addConnectionRoutedPoints = function (path, startInfo, targetInfo) {
        if (startInfo instanceof segment_1.Segment)
            path.splice(0, 0, startInfo.startPoint);
        if (targetInfo instanceof segment_1.Segment)
            path.push(targetInfo.endPoint);
    };
    RightAngleConnectorRoutingContext.prototype.createSupportSegments = function () {
        var _this = this;
        return this.supportRenderPoints.length <= 1 ? [] : Utils_1.GeometryUtils.createSegments(this.supportRenderPoints).filter(function (s) { return !_this.isCustomSegment(s, _this.supportRenderPoints[0], _this.supportRenderPoints[_this.supportRenderPoints.length - 1]); });
    };
    RightAngleConnectorRoutingContext.prototype.isCustomSegment = function (segment, startSegmentsPoint, endSegmentsPoint) {
        var startRenderPoint = segment.startPoint;
        if (startRenderPoint.equals(startSegmentsPoint))
            return false;
        var endRenderPoint = segment.endPoint;
        if (endRenderPoint.equals(endSegmentsPoint))
            return false;
        return endRenderPoint.pointIndex - startRenderPoint.pointIndex === 1;
    };
    RightAngleConnectorRoutingContext.prototype.createRenderSegments = function () {
        var _this = this;
        var unionRoutingSegments = RightAngleConnectorRoutingMathOperations_1.RightAngleConnectorRoutingMathOperations.createUnionSegments(this.supportSegments, function (ep, sp) { return _this.shouldCreateSegment(ep, sp); });
        var lastIndex = unionRoutingSegments.length - 1;
        return unionRoutingSegments.map(function (s, i) {
            return new ConnectorRenderSegment_1.ConnectorRenderSegment(i > 0 ? new point_1.Point(s.startPoint.x, s.startPoint.y) : _this.beginConnectionSegment, i < lastIndex ? new point_1.Point(s.endPoint.x, s.endPoint.y) : _this.endConnectionSegment, s.startPoint.pointIndex, _this.createPreviousCustomSegment(s.startPoint));
        });
    };
    RightAngleConnectorRoutingContext.prototype.createPreviousCustomSegment = function (startRoutingPoint) {
        var previuosPointIndex = startRoutingPoint.pointIndex - 1;
        return previuosPointIndex >= 0 ? new segment_1.Segment(this.points[previuosPointIndex].clone(), new point_1.Point(startRoutingPoint.x, startRoutingPoint.y)) : undefined;
    };
    RightAngleConnectorRoutingContext.prototype.shouldCreateSegment = function (prevEndPoint, startNextPoint) {
        return !prevEndPoint.equals(startNextPoint) || startNextPoint.pointIndex > 0;
    };
    RightAngleConnectorRoutingContext.prototype.isPathNormal = function (connectionSide) {
        if (connectionSide === DiagramItem_1.ConnectionPointSide.Undefined)
            return true;
        return RightAngleConnectorRoutingMathOperations_1.RightAngleConnectorRoutingMathOperations.isSegmentNormal(new segment_1.Segment(this.beginPoint, this.endPoint), connectionSide === DiagramItem_1.ConnectionPointSide.East || connectionSide === DiagramItem_1.ConnectionPointSide.West);
    };
    RightAngleConnectorRoutingContext.prototype.registerIgnorableShape = function (shape) {
        this.ignorableItemKeys[shape.key] = true;
    };
    RightAngleConnectorRoutingContext.prototype.isConnectedByStart = function (shape) {
        return this.beginConnectionShape && this.beginConnectionShape.key === shape.key && this.beginConnectionSide !== DiagramItem_1.ConnectionPointSide.Undefined;
    };
    RightAngleConnectorRoutingContext.prototype.isConnectedByEnd = function (shape) {
        return this.endConnectionShape && this.endConnectionShape.key === shape.key && this.endConnectionSide !== DiagramItem_1.ConnectionPointSide.Undefined;
    };
    RightAngleConnectorRoutingContext.prototype.getConnectionSide = function (shape, index, point) {
        return shape ? shape.getConnectionPointSideByIndex(index, point) : DiagramItem_1.ConnectionPointSide.Undefined;
    };
    RightAngleConnectorRoutingContext.prototype.shapeContainsOtherConnection = function (targetShape, otherShape, otherPoint) {
        if (!targetShape)
            return false;
        var targetRectangle = targetShape.rectangle;
        return targetRectangle.containsPoint(otherPoint) &&
            (!otherShape || !otherShape.rectangle.equals(targetRectangle));
    };
    RightAngleConnectorRoutingContext.prototype.createBeginConnectionSegment = function (offset, beginShapeContainsEndConnection) {
        if (this.beginConnectionSide === DiagramItem_1.ConnectionPointSide.Undefined)
            return this.createBeginConnectionSegmentCore(offset);
        if (!beginShapeContainsEndConnection || !this.routingModel.shouldReverseConnections) {
            var segment = this.createBeginConnectionSegmentCore(offset);
            if (segment instanceof point_1.Point || !this.routingModel.shouldResizeConnections)
                return segment;
            var startPoint = segment.startPoint;
            var endPoint = segment.endPoint;
            var currentOffset = offset;
            while (this.hasIntersectedItemsByPoint(endPoint, startPoint, this.beginConnectionShape)) {
                currentOffset = currentOffset / 2;
                segment = this.createBeginConnectionSegmentCore(currentOffset);
                endPoint = segment.endPoint;
            }
            return segment;
        }
        if (!this.endConnectionShape)
            return this.createBeginConnectionSegmentCore(-offset);
        if (this.isPathNormal(this.endConnectionSide))
            return this.createBeginConnectionSegmentCore(-offset);
        var reversedSegment = this.createBeginConnectionSegmentCore(-2 * offset);
        if (this.isEndConnectionRectanleLineIntersected(reversedSegment, false, true))
            return this.createBeginConnectionSegmentCore(offset);
        return this.createBeginConnectionSegmentCore(-offset);
    };
    RightAngleConnectorRoutingContext.prototype.hasIntersectedItemsByPoint = function (point, secondPoint, connectionItem) {
        var intersectedItems = this.getIntersectedItems(point, function (p, s) { return s.rectangle.containsPoint(p) && !s.rectangle.containsPoint(secondPoint) && s.key !== connectionItem.key; });
        return intersectedItems !== undefined && intersectedItems.length > 0;
    };
    RightAngleConnectorRoutingContext.prototype.createEndConnectionSegment = function (offset, endShapeContainsBeginConnection) {
        if (this.endConnectionSide === DiagramItem_1.ConnectionPointSide.Undefined)
            return this.createEndConnectionSegmentCore(offset);
        if (!endShapeContainsBeginConnection || !this.routingModel.shouldReverseConnections) {
            var segment = this.createEndConnectionSegmentCore(offset);
            if (segment instanceof point_1.Point || !this.routingModel.shouldResizeConnections)
                return segment;
            var endPoint = segment.endPoint;
            var startPoint = segment.startPoint;
            var currentOffset = offset;
            while (this.hasIntersectedItemsByPoint(startPoint, endPoint, this.endConnectionShape)) {
                currentOffset = currentOffset / 2;
                segment = this.createEndConnectionSegmentCore(currentOffset);
                startPoint = segment.startPoint;
            }
            return segment;
        }
        if (!this.beginConnectionShape)
            return this.createEndConnectionSegmentCore(-offset);
        if (this.isPathNormal(this.beginConnectionSide))
            return this.createEndConnectionSegmentCore(-offset);
        var reversedSegment = this.createEndConnectionSegmentCore(-2 * offset);
        if (this.isBeginConnectionRectanleLineIntersected(reversedSegment, true, false))
            return this.createEndConnectionSegmentCore(offset);
        return this.createEndConnectionSegmentCore(-offset);
    };
    RightAngleConnectorRoutingContext.prototype.createBeginConnectionSegmentCore = function (offset) {
        return RightAngleConnectorRoutingMathOperations_1.RightAngleConnectorRoutingMathOperations.createBeginConnectionSegment(this.beginConnectionSide, this.beginPoint, offset, function (x, y) { return new point_1.Point(x, y); });
    };
    RightAngleConnectorRoutingContext.prototype.createEndConnectionSegmentCore = function (offset) {
        return RightAngleConnectorRoutingMathOperations_1.RightAngleConnectorRoutingMathOperations.createEndConnectionSegment(this.endConnectionSide, this.endPoint, offset, function (x, y) { return new point_1.Point(x, y); });
    };
    RightAngleConnectorRoutingContext.prototype.isBeginConnectionRectanleLineIntersected = function (segment, excludeBeginPoint, excludeEndPoint) {
        return RightAngleConnectorRoutingMathOperations_1.RightAngleConnectorRoutingMathOperations.isConnectionRectanleLineIntersected(this.beginConnectionShape.rectangle, segment, this.beginConnectionSide, excludeBeginPoint, excludeEndPoint, function (x, y) { return new point_1.Point(x, y); });
    };
    RightAngleConnectorRoutingContext.prototype.isEndConnectionRectanleLineIntersected = function (segment, excludeBeginPoint, excludeEndPoint) {
        return RightAngleConnectorRoutingMathOperations_1.RightAngleConnectorRoutingMathOperations.isConnectionRectanleLineIntersected(this.endConnectionShape.rectangle, segment, this.endConnectionSide, excludeBeginPoint, excludeEndPoint, function (x, y) { return new point_1.Point(x, y); });
    };
    RightAngleConnectorRoutingContext.prototype.isIgnorableItem = function (item) {
        return this.ignorableItemKeys[item.key] !== undefined;
    };
    RightAngleConnectorRoutingContext.prototype.createExtendedShapesBounds = function () {
        var _this = this;
        return this.routingModel.getItems(this.beginConnectionShape, this.endConnectionShape).map(function (i) { return i.rectangle.clone().inflate(_this.routingModel.shapeMargins); });
    };
    RightAngleConnectorRoutingContext.prototype.createGrid = function () {
        return RoutingGrid_1.RoutingGrid.create(this.createGridPoints(), this.createExtendedShapesBounds(), function (x, y) { return new point_1.Point(x, y); });
    };
    return RightAngleConnectorRoutingContext;
}());
exports.RightAngleConnectorRoutingContext = RightAngleConnectorRoutingContext;
//# sourceMappingURL=RightAngleConnectorRoutingContext.js.map