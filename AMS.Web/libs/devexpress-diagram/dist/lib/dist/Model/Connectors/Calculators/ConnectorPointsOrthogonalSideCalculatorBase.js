"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectorPointsOrthogonalSideCalculatorBase = void 0;
var rectangle_1 = require("@devexpress/utils/lib/geometry/rectangle");
var DiagramItem_1 = require("../../DiagramItem");
var Connector_1 = require("../Connector");
var ConnectorPointsOrthogonalSideCalculatorBase = (function () {
    function ConnectorPointsOrthogonalSideCalculatorBase(parent) {
        this.parent = parent;
    }
    Object.defineProperty(ConnectorPointsOrthogonalSideCalculatorBase.prototype, "connector", {
        get: function () { return this.parent.connector; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConnectorPointsOrthogonalSideCalculatorBase.prototype, "beginRect", {
        get: function () { return this.parent.beginRect; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConnectorPointsOrthogonalSideCalculatorBase.prototype, "endRect", {
        get: function () { return this.parent.endRect; },
        enumerable: false,
        configurable: true
    });
    ConnectorPointsOrthogonalSideCalculatorBase.prototype.getBeginOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        originPoint = this.getCorrectOriginPoint(originPoint, originRect);
        if (targetSide !== DiagramItem_1.ConnectionPointSide.Undefined) {
            if (this.isBeginEndSame())
                return this.getSameShapeOffsetPoints(targetSide, originPoint, targetPoint, originRect);
            else if (this.isBeginEndOverlappedPoints(originPoint, targetPoint))
                return this.getOverlappedPointsOffsetPoints(targetSide, originPoint, targetPoint, originRect);
            else if (this.isBeginEndOverlapped())
                return this.getBeginOverlappedShapeOffsetPoints(targetSide, originPoint, targetPoint, originRect);
        }
        else if (this.isOriginRectContainsTargetPoint(originRect, targetPoint))
            return this.getOverlappedPointsOffsetPoints(targetSide, originPoint, targetPoint, originRect);
        if (this.isOnSidePoint(originPoint, targetPoint))
            return this.getBeginOnSideOffsetPoints(targetSide, originPoint, targetPoint, originRect);
        return this.getBeginOffSideOffsetPoints(targetSide, originPoint, targetPoint, originRect);
    };
    ConnectorPointsOrthogonalSideCalculatorBase.prototype.getEndOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        originPoint = this.getCorrectOriginPoint(originPoint, originRect);
        if (targetSide !== DiagramItem_1.ConnectionPointSide.Undefined) {
            if (this.isBeginEndSame())
                return this.getSameShapeOffsetPoints(targetSide, originPoint, targetPoint, originRect);
            else if (this.isBeginEndOverlappedPoints(targetPoint, originPoint))
                return this.getOverlappedPointsOffsetPoints(targetSide, originPoint, targetPoint, originRect);
            else if (this.isBeginEndOverlapped())
                return this.getEndOverlappedShapeOffsetPoints(targetSide, originPoint, targetPoint, originRect);
        }
        else if (this.isOriginRectContainsTargetPoint(originRect, targetPoint))
            return this.getOverlappedPointsOffsetPoints(targetSide, originPoint, targetPoint, originRect);
        if (this.isOnSidePoint(originPoint, targetPoint))
            return this.getEndOnSideOffsetPoints(targetSide, originPoint, targetPoint, originRect);
        return this.getEndOffSideOffsetPoints(targetSide, originPoint, targetPoint, originRect);
    };
    ConnectorPointsOrthogonalSideCalculatorBase.prototype.getSide = function (originPoint, targetPoint) {
        var diffX = Math.abs(targetPoint.x - originPoint.x);
        var diffY = Math.abs(targetPoint.y - originPoint.y);
        if (diffX > diffY)
            if (targetPoint.x > originPoint.x)
                return DiagramItem_1.ConnectionPointSide.East;
            else
                return DiagramItem_1.ConnectionPointSide.West;
        else if (targetPoint.y > originPoint.y)
            return DiagramItem_1.ConnectionPointSide.South;
        else
            return DiagramItem_1.ConnectionPointSide.North;
    };
    ConnectorPointsOrthogonalSideCalculatorBase.prototype.getSideCalculator = function (originPoint, targetPoint) {
        return this.parent.getSideCalculator(this.getSide(originPoint, targetPoint));
    };
    ConnectorPointsOrthogonalSideCalculatorBase.prototype.getMinOffset = function () {
        return Connector_1.Connector.minOffset;
    };
    ConnectorPointsOrthogonalSideCalculatorBase.prototype.isBeginEndSame = function () {
        return this.connector.beginItem === this.connector.endItem;
    };
    ConnectorPointsOrthogonalSideCalculatorBase.prototype.isBeginEndOverlapped = function () {
        return this.beginRect && this.endRect && rectangle_1.Rectangle.areIntersected(this.beginRect, this.endRect);
    };
    ConnectorPointsOrthogonalSideCalculatorBase.prototype.isBeginEndOverlappedX = function () {
        return this.beginRect && this.endRect && !!rectangle_1.Rectangle.getHorizIntersection(this.beginRect, this.endRect);
    };
    ConnectorPointsOrthogonalSideCalculatorBase.prototype.isBeginEndOverlappedY = function () {
        return this.beginRect && this.endRect && !!rectangle_1.Rectangle.getVertIntersection(this.beginRect, this.endRect);
    };
    ConnectorPointsOrthogonalSideCalculatorBase.prototype.isBeginEndOverlappedPoints = function (beginPoint, endPoint) {
        return this.beginRect && this.endRect && (this.beginRect.containsPoint(endPoint) || this.endRect.containsPoint(beginPoint));
    };
    ConnectorPointsOrthogonalSideCalculatorBase.prototype.isOriginRectContainsTargetPoint = function (originRect, targetPoint) {
        return originRect && targetPoint && originRect.containsPoint(targetPoint);
    };
    return ConnectorPointsOrthogonalSideCalculatorBase;
}());
exports.ConnectorPointsOrthogonalSideCalculatorBase = ConnectorPointsOrthogonalSideCalculatorBase;
//# sourceMappingURL=ConnectorPointsOrthogonalSideCalculatorBase.js.map