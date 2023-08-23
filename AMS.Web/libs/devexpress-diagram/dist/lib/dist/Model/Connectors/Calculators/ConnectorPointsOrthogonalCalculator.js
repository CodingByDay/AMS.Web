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
exports.ConnectorPointsOrthogonalCalculator = void 0;
var rectangle_1 = require("@devexpress/utils/lib/geometry/rectangle");
var DiagramItem_1 = require("../../DiagramItem");
var ConnectorPointsCalculatorBase_1 = require("./ConnectorPointsCalculatorBase");
var ConnectorPointsOrthogonalUndefinedSideCalculator_1 = require("./ConnectorPointsOrthogonalUndefinedSideCalculator");
var ConnectorPointsOrthogonalSouthSideCalculator_1 = require("./ConnectorPointsOrthogonalSouthSideCalculator");
var ConnectorPointsOrthogonalNorthSideCalculator_1 = require("./ConnectorPointsOrthogonalNorthSideCalculator");
var ConnectorPointsOrthogonalEastSideCalculator_1 = require("./ConnectorPointsOrthogonalEastSideCalculator");
var ConnectorPointsOrthogonalWestSideCalculator_1 = require("./ConnectorPointsOrthogonalWestSideCalculator");
var ConnectorRenderPoint_1 = require("../ConnectorRenderPoint");
var ModelUtils_1 = require("../../ModelUtils");
var ConnectorPointsOrthogonalCalculator = (function (_super) {
    __extends(ConnectorPointsOrthogonalCalculator, _super);
    function ConnectorPointsOrthogonalCalculator(connector) {
        var _this = _super.call(this, connector) || this;
        _this.sideCalculators = {};
        _this.sideCalculators[DiagramItem_1.ConnectionPointSide.Undefined] = new ConnectorPointsOrthogonalUndefinedSideCalculator_1.ConnectorPointsOrthogonalUndefinedSideCalculator(_this);
        _this.sideCalculators[DiagramItem_1.ConnectionPointSide.South] = new ConnectorPointsOrthogonalSouthSideCalculator_1.ConnectorPointsOrthogonalSouthSideCalculator(_this);
        _this.sideCalculators[DiagramItem_1.ConnectionPointSide.North] = new ConnectorPointsOrthogonalNorthSideCalculator_1.ConnectorPointsOrthogonalNorthSideCalculator(_this);
        _this.sideCalculators[DiagramItem_1.ConnectionPointSide.East] = new ConnectorPointsOrthogonalEastSideCalculator_1.ConnectorPointsOrthogonalEastSideCalculator(_this);
        _this.sideCalculators[DiagramItem_1.ConnectionPointSide.West] = new ConnectorPointsOrthogonalWestSideCalculator_1.ConnectorPointsOrthogonalWestSideCalculator(_this);
        return _this;
    }
    Object.defineProperty(ConnectorPointsOrthogonalCalculator.prototype, "beginRect", {
        get: function () { return this.connector.beginItem ? this.connector.beginItem.rectangle : undefined; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConnectorPointsOrthogonalCalculator.prototype, "endRect", {
        get: function () { return this.connector.endItem ? this.connector.endItem.rectangle : undefined; },
        enumerable: false,
        configurable: true
    });
    ConnectorPointsOrthogonalCalculator.prototype.getPoints = function () {
        var points = this.connector.points.map(function (pt, index) { return new ConnectorRenderPoint_1.ConnectorRenderPoint(pt.x, pt.y, index); });
        ModelUtils_1.ModelUtils.removeUnnecessaryRenderPoints(points);
        var beginIndex = 0;
        var endIndex = points.length - 1;
        var beginSide = this.getPointSide(points, 0);
        var beginNextSide = this.getPointSide(points, 1);
        var endSide = this.getPointSide(points, points.length - 1);
        var endPrevSide = this.getPointSide(points, points.length - 1 - 1);
        var beginSideCalculator = this.getSideCalculator(beginSide);
        var endSideCalculator = this.getSideCalculator(endSide);
        var originRect = this.beginRect;
        var originPoint = beginSideCalculator.getCorrectOriginPoint(points[beginIndex], originRect);
        var targetPoint = points[beginIndex + 1];
        if (points.length === 2 && beginSideCalculator.isOnSidePoint(originPoint, targetPoint) &&
            beginSideCalculator.isDirectConnectionAllowed(beginNextSide, originPoint, targetPoint)) {
            var directConnectionPoints = beginSideCalculator.getDirectConnectionPoints(originPoint, targetPoint);
            directConnectionPoints.forEach(function (pt) {
                points.splice(beginIndex + 1, 0, pt);
                beginIndex++;
                endIndex++;
            });
        }
        else {
            var bOffsetPoints = beginSideCalculator.getBeginOffsetPoints(beginNextSide, points[beginIndex], points[beginIndex + 1], this.beginRect);
            bOffsetPoints.forEach(function (pt) {
                points.splice(beginIndex + 1, 0, pt);
            });
            beginIndex += bOffsetPoints.length;
            endIndex += bOffsetPoints.length;
            var eOffsetPoints = endSideCalculator.getEndOffsetPoints(endPrevSide, points[endIndex], points[endIndex - 1], this.endRect);
            eOffsetPoints.forEach(function (pt, index) {
                points.splice(endIndex + index, 0, pt);
            });
            this.addMiddlePoints(points, beginIndex, endIndex);
        }
        ModelUtils_1.ModelUtils.removeUnnecessaryRenderPoints(points);
        return points;
    };
    ConnectorPointsOrthogonalCalculator.prototype.getSideCalculator = function (side) {
        return this.sideCalculators[side];
    };
    ConnectorPointsOrthogonalCalculator.prototype.getPointSide = function (points, index) {
        if (index === 0 && this.connector.beginItem) {
            var connectionPointIndex = this.connector.beginConnectionPointIndex;
            return this.connector.beginItem.getConnectionPointSideByIndex(connectionPointIndex, points[1]);
        }
        if (index === points.length - 1 && this.connector.endItem) {
            var connectionPointIndex = this.connector.endConnectionPointIndex;
            return this.connector.endItem.getConnectionPointSideByIndex(connectionPointIndex, points[points.length - 2]);
        }
        return DiagramItem_1.ConnectionPointSide.Undefined;
    };
    ConnectorPointsOrthogonalCalculator.prototype.addMiddlePoints = function (points, beginIndex, endIndex) {
        for (var index = beginIndex; index < endIndex; index++) {
            var nextIndex = index + 1;
            var middlePoint = this.getMiddlePoint(points[index], points[index - 1], index - 1 === 0, points[nextIndex], points[nextIndex + 1], nextIndex + 1 === points.length - 1);
            if (middlePoint !== undefined) {
                points.splice(index + 1, 0, middlePoint);
                index++;
                endIndex++;
            }
        }
    };
    ConnectorPointsOrthogonalCalculator.prototype.getMiddlePoints = function (point1, point2) {
        if (point1.x === point2.x || point1.y === point2.y)
            return [];
        return [
            new ConnectorRenderPoint_1.ConnectorRenderPoint(point1.x, point2.y),
            new ConnectorRenderPoint_1.ConnectorRenderPoint(point2.x, point1.y)
        ];
    };
    ConnectorPointsOrthogonalCalculator.prototype.getMiddlePoint = function (point1, directionPoint1, nextToBegin, point2, directionPoint2, nextToEnd) {
        var _this = this;
        var point;
        var points = this.getMiddlePoints(point1, point2);
        points.forEach(function (pt) {
            var rect1 = _this.createPointsRect(point1, pt);
            var rect2 = _this.createPointsRect(pt, point2);
            var itemRect1 = _this.connector.beginItem ? _this.connector.beginItem.rectangle : undefined;
            var itemRect2 = _this.connector.endItem ? _this.connector.endItem.rectangle : undefined;
            if (itemRect1)
                if (rectangle_1.Rectangle.areIntersected(itemRect1, rect1) || rectangle_1.Rectangle.areIntersected(itemRect1, rect2))
                    return;
            if (itemRect2)
                if (rectangle_1.Rectangle.areIntersected(itemRect2, rect1) || rectangle_1.Rectangle.areIntersected(itemRect2, rect2))
                    return;
            if ((!_this.isReturnPoint(pt, point1, directionPoint1) || _this.isIntermediatePoints(point1, directionPoint1)) &&
                (!_this.isReturnPoint(pt, point2, directionPoint2) || _this.isIntermediatePoints(point2, directionPoint2)))
                if (point === undefined)
                    point = pt;
                else if (_this.isPriorMiddlePoint(pt, point1, directionPoint1, point2, directionPoint2))
                    point = pt;
        });
        if (point === undefined && points.length > 0)
            point = points[0];
        return point;
    };
    ConnectorPointsOrthogonalCalculator.prototype.createPointsRect = function (point1, point2) {
        var result = rectangle_1.Rectangle.fromPoints(point1, point2);
        if (result.width > 0)
            result = result.clone().inflate(-1, 0);
        if (result.height > 0)
            result = result.clone().inflate(0, -1);
        return result;
    };
    ConnectorPointsOrthogonalCalculator.prototype.isPriorMiddlePoint = function (point, point1, directionPoint1, point2, directionPoint2) {
        if (directionPoint1)
            if (point.x === directionPoint1.x || point.y === directionPoint1.y)
                return true;
        if (directionPoint2)
            if (point.x === directionPoint2.x || point.y === directionPoint2.y)
                return true;
        return false;
    };
    ConnectorPointsOrthogonalCalculator.prototype.isReturnPoint = function (point, point1, point2) {
        if (point1 !== undefined && point2 !== undefined) {
            if (point.x === point2.x)
                if (point1.y < point.y && point.y < point2.y || point1.y > point.y && point.y > point2.y)
                    return true;
            if (point.y === point2.y)
                if (point1.x < point.x && point.x < point2.x || point1.x > point.x && point.x > point2.x)
                    return true;
        }
        return false;
    };
    ConnectorPointsOrthogonalCalculator.prototype.isIntermediatePoints = function (point1, point2) {
        return 0 < point1.pointIndex && point1.pointIndex < this.connector.points.length - 1 &&
            0 < point2.pointIndex && point2.pointIndex < this.connector.points.length - 1;
    };
    return ConnectorPointsOrthogonalCalculator;
}(ConnectorPointsCalculatorBase_1.ConnectorPointsCalculatorBase));
exports.ConnectorPointsOrthogonalCalculator = ConnectorPointsOrthogonalCalculator;
//# sourceMappingURL=ConnectorPointsOrthogonalCalculator.js.map