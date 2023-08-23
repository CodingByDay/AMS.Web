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
exports.ConnectorPointsOrthogonalNorthSideCalculator = void 0;
var DiagramItem_1 = require("../../DiagramItem");
var ConnectorPointsOrthogonalSideCalculatorBase_1 = require("./ConnectorPointsOrthogonalSideCalculatorBase");
var ConnectorRenderPoint_1 = require("../ConnectorRenderPoint");
var ConnectorPointsOrthogonalNorthSideCalculator = (function (_super) {
    __extends(ConnectorPointsOrthogonalNorthSideCalculator, _super);
    function ConnectorPointsOrthogonalNorthSideCalculator(parent) {
        return _super.call(this, parent) || this;
    }
    ConnectorPointsOrthogonalNorthSideCalculator.prototype.getCorrectOriginPoint = function (originPoint, originRect) {
        if (originPoint.y > originRect.y)
            originPoint = originPoint.clone().offset(0, originRect.y - originPoint.y);
        return originPoint;
    };
    ConnectorPointsOrthogonalNorthSideCalculator.prototype.getSameShapeOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        switch (targetSide) {
            case DiagramItem_1.ConnectionPointSide.East:
            case DiagramItem_1.ConnectionPointSide.West:
            case DiagramItem_1.ConnectionPointSide.North:
                return [originPoint.clone().offset(0, -this.getMinOffset())];
            case DiagramItem_1.ConnectionPointSide.South:
                return this.getAsideOffsetPoints(originPoint, targetPoint, originRect, this.getMinOffset(), this.getMinOffset());
        }
    };
    ConnectorPointsOrthogonalNorthSideCalculator.prototype.getOverlappedPointsOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        switch (targetSide) {
            case DiagramItem_1.ConnectionPointSide.South:
                return [originPoint.clone().offset(0, this.getMinOffset())];
            case DiagramItem_1.ConnectionPointSide.North:
                return [originPoint.clone().offset(0, -this.getMinOffset())];
        }
        return [];
    };
    ConnectorPointsOrthogonalNorthSideCalculator.prototype.getBeginOverlappedShapeOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        switch (targetSide) {
            case DiagramItem_1.ConnectionPointSide.East:
                if (originPoint.y > targetPoint.y)
                    if (originPoint.x > targetPoint.x)
                        return [];
                    else
                        return [originPoint.clone().offset(0, -this.getMinOffset())];
                if (originPoint.y < this.endRect.y)
                    return this.getAsideOffsetPoints(originPoint, targetPoint, originRect, this.getMinOffset(), this.getMinOffset(), false);
                return [originPoint.clone().offset(0, -this.getMinOffset())];
            case DiagramItem_1.ConnectionPointSide.West:
                if (originPoint.y > targetPoint.y)
                    if (originPoint.x < targetPoint.x)
                        return [];
                    else
                        return [originPoint.clone().offset(0, -this.getMinOffset())];
                if (originPoint.y < this.endRect.y)
                    return this.getAsideOffsetPoints(originPoint, targetPoint, originRect, this.getMinOffset(), this.getMinOffset(), true);
                return [originPoint.clone().offset(0, -this.getMinOffset())];
            case DiagramItem_1.ConnectionPointSide.North:
                return [originPoint.clone().offset(0, -this.getMinOffset())];
            case DiagramItem_1.ConnectionPointSide.South:
                return this.getAsideOffsetPoints(originPoint, targetPoint, originRect, this.getMinOffset(), this.getMinOffset(), originPoint.x < targetPoint.x);
        }
    };
    ConnectorPointsOrthogonalNorthSideCalculator.prototype.getEndOverlappedShapeOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        switch (targetSide) {
            case DiagramItem_1.ConnectionPointSide.East:
                if (targetPoint.y > originPoint.y)
                    return this.getAsideOffsetPoints(originPoint, targetPoint, originRect, this.getMinOffset(), this.getMinOffset(), false);
                if (originPoint.x < targetPoint.x)
                    return [originPoint.clone().offset(0, -this.getMinOffset())];
                return [];
            case DiagramItem_1.ConnectionPointSide.West:
                if (targetPoint.y > originPoint.y)
                    return this.getAsideOffsetPoints(originPoint, targetPoint, originRect, this.getMinOffset(), this.getMinOffset(), true);
                if (originPoint.x > targetPoint.x)
                    return [originPoint.clone().offset(0, -this.getMinOffset())];
                return [];
            case DiagramItem_1.ConnectionPointSide.North:
                return [originPoint.clone().offset(0, -this.getMinOffset())];
            case DiagramItem_1.ConnectionPointSide.South: {
                var offset = -this.getMinOffset();
                if (this.beginRect.y < originPoint.y)
                    offset -= originPoint.y - this.beginRect.y;
                return [originPoint.clone().offset(0, offset)];
            }
        }
    };
    ConnectorPointsOrthogonalNorthSideCalculator.prototype.getBeginOnSideOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        return [originPoint.clone().offset(0, -this.getScaleableOffsetY(originPoint, targetPoint, false))];
    };
    ConnectorPointsOrthogonalNorthSideCalculator.prototype.getEndOnSideOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        return [originPoint.clone().offset(0, -this.getScaleableOffsetY(originPoint, targetPoint, true))];
    };
    ConnectorPointsOrthogonalNorthSideCalculator.prototype.getBeginOffSideOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        switch (targetSide) {
            case DiagramItem_1.ConnectionPointSide.East:
                if (this.isBeginEndOverlappedX())
                    return this.getScaleableAsideOffsetPoints(originPoint, targetPoint, originRect, false, false);
                break;
            case DiagramItem_1.ConnectionPointSide.West:
                if (this.isBeginEndOverlappedX())
                    return this.getScaleableAsideOffsetPoints(originPoint, targetPoint, originRect, false, true);
                break;
            case DiagramItem_1.ConnectionPointSide.North:
                if (this.isBeginEndOverlappedX())
                    return this.getScaleableAsideOffsetPoints(originPoint, targetPoint, originRect, false);
                break;
            case DiagramItem_1.ConnectionPointSide.Undefined:
            case DiagramItem_1.ConnectionPointSide.South:
                return this.getScaleableAsideOffsetPoints(originPoint, targetPoint, originRect, false);
        }
        return [originPoint.clone().offset(0, -this.getScaleableOffsetY(originPoint, targetPoint, false))];
    };
    ConnectorPointsOrthogonalNorthSideCalculator.prototype.getEndOffSideOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        if (targetSide === DiagramItem_1.ConnectionPointSide.Undefined)
            return this.getScaleableAsideOffsetPoints(originPoint, targetPoint, originRect, true);
        else if (this.isBeginEndOverlappedX()) {
            var direction = this.beginRect.center.x > this.endRect.center.x;
            return this.getScaleableAsideOffsetPoints(originPoint, targetPoint, originRect, true, direction);
        }
        return [originPoint.clone().offset(0, -this.getScaleableOffsetY(originPoint, targetPoint, true))];
    };
    ConnectorPointsOrthogonalNorthSideCalculator.prototype.getAsideOffsetPoints = function (originPoint, targetPoint, originRect, offset, asideOffset, direction) {
        var points = [];
        if (originRect !== undefined) {
            if (direction === undefined)
                direction = targetPoint.x < originPoint.x;
            if (direction)
                points.push(originPoint.clone().offset(-(originPoint.x - originRect.x + asideOffset), -offset));
            else
                points.push(originPoint.clone().offset((originRect.right - originPoint.x + asideOffset), -offset));
        }
        points.push(originPoint.clone().offset(0, -offset));
        return points;
    };
    ConnectorPointsOrthogonalNorthSideCalculator.prototype.getScaleableAsideOffsetPoints = function (originPoint, targetPoint, originRect, isEnd, direction) {
        var offset = this.getScaleableOffsetY(originPoint, targetPoint, isEnd);
        var asideOffset = this.getScaleableOffsetX(originPoint, targetPoint, isEnd);
        return this.getAsideOffsetPoints(originPoint, targetPoint, originRect, offset, asideOffset, direction);
    };
    ConnectorPointsOrthogonalNorthSideCalculator.prototype.getScaleableOffsetX = function (originPoint, targetPoint, isEnd) {
        if (this.beginRect && this.endRect)
            if (!isEnd && !this.isBeginEndOverlappedX()) {
                var distance = void 0;
                if (targetPoint.x < originPoint.x)
                    distance = this.beginRect.x - this.endRect.right;
                else
                    distance = this.endRect.x - this.beginRect.right;
                if (distance < this.getMinOffset() * 2)
                    return distance / 2;
            }
        return this.getMinOffset();
    };
    ConnectorPointsOrthogonalNorthSideCalculator.prototype.getScaleableOffsetY = function (originPoint, targetPoint, isEnd) {
        if (this.beginRect && this.endRect) {
            var distance = isEnd ? originPoint.y - this.beginRect.bottom : originPoint.y - this.endRect.bottom;
            if (distance > 0 && distance < this.getMinOffset() * 2)
                return distance / 2;
        }
        return this.getMinOffset();
    };
    ConnectorPointsOrthogonalNorthSideCalculator.prototype.isOnSidePoint = function (originPoint, targetPoint) {
        return targetPoint.y < originPoint.y;
    };
    ConnectorPointsOrthogonalNorthSideCalculator.prototype.isDirectConnectionAllowed = function (targetSide, originPoint, targetPoint) {
        return targetSide === DiagramItem_1.ConnectionPointSide.South || targetSide === DiagramItem_1.ConnectionPointSide.Undefined;
    };
    ConnectorPointsOrthogonalNorthSideCalculator.prototype.getDirectConnectionPoints = function (originPoint, targetPoint) {
        var cy = targetPoint.y + (originPoint.y - targetPoint.y) / 2;
        return [
            new ConnectorRenderPoint_1.ConnectorRenderPoint(originPoint.x, cy),
            new ConnectorRenderPoint_1.ConnectorRenderPoint(targetPoint.x, cy)
        ];
    };
    return ConnectorPointsOrthogonalNorthSideCalculator;
}(ConnectorPointsOrthogonalSideCalculatorBase_1.ConnectorPointsOrthogonalSideCalculatorBase));
exports.ConnectorPointsOrthogonalNorthSideCalculator = ConnectorPointsOrthogonalNorthSideCalculator;
//# sourceMappingURL=ConnectorPointsOrthogonalNorthSideCalculator.js.map