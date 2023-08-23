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
exports.ConnectorPointsOrthogonalEastSideCalculator = void 0;
var DiagramItem_1 = require("../../DiagramItem");
var ConnectorPointsOrthogonalSideCalculatorBase_1 = require("./ConnectorPointsOrthogonalSideCalculatorBase");
var ConnectorRenderPoint_1 = require("../ConnectorRenderPoint");
var ConnectorPointsOrthogonalEastSideCalculator = (function (_super) {
    __extends(ConnectorPointsOrthogonalEastSideCalculator, _super);
    function ConnectorPointsOrthogonalEastSideCalculator(parent) {
        return _super.call(this, parent) || this;
    }
    ConnectorPointsOrthogonalEastSideCalculator.prototype.getCorrectOriginPoint = function (originPoint, originRect) {
        if (originPoint.x < originRect.right)
            originPoint = originPoint.clone().offset(originRect.right - originPoint.x, 0);
        return originPoint;
    };
    ConnectorPointsOrthogonalEastSideCalculator.prototype.getSameShapeOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        switch (targetSide) {
            case DiagramItem_1.ConnectionPointSide.North:
            case DiagramItem_1.ConnectionPointSide.South:
            case DiagramItem_1.ConnectionPointSide.East:
                return [originPoint.clone().offset(this.getMinOffset(), 0)];
            case DiagramItem_1.ConnectionPointSide.West:
                return this.getAsideOffsetPoints(originPoint, targetPoint, originRect, this.getMinOffset(), this.getMinOffset());
        }
    };
    ConnectorPointsOrthogonalEastSideCalculator.prototype.getOverlappedPointsOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        switch (targetSide) {
            case DiagramItem_1.ConnectionPointSide.East:
                return [originPoint.clone().offset(this.getMinOffset(), 0)];
            case DiagramItem_1.ConnectionPointSide.West:
                return [originPoint.clone().offset(-this.getMinOffset(), 0)];
        }
        return [];
    };
    ConnectorPointsOrthogonalEastSideCalculator.prototype.getBeginOverlappedShapeOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        switch (targetSide) {
            case DiagramItem_1.ConnectionPointSide.North:
                if (originPoint.x < targetPoint.x)
                    if (originPoint.y < targetPoint.y)
                        return [];
                    else
                        return [originPoint.clone().offset(this.getMinOffset(), 0)];
                if (originPoint.x > this.endRect.right)
                    return this.getAsideOffsetPoints(originPoint, targetPoint, originRect, this.getMinOffset(), this.getMinOffset(), true);
                return [originPoint.clone().offset(this.getMinOffset(), 0)];
            case DiagramItem_1.ConnectionPointSide.South:
                if (originPoint.x < targetPoint.x)
                    if (originPoint.y > targetPoint.y)
                        return [];
                    else
                        return [originPoint.clone().offset(this.getMinOffset(), 0)];
                if (originPoint.x > this.endRect.right)
                    return this.getAsideOffsetPoints(originPoint, targetPoint, originRect, this.getMinOffset(), this.getMinOffset(), false);
                return [originPoint.clone().offset(this.getMinOffset(), 0)];
            case DiagramItem_1.ConnectionPointSide.East:
                return [originPoint.clone().offset(this.getMinOffset(), 0)];
            case DiagramItem_1.ConnectionPointSide.West:
                return this.getAsideOffsetPoints(originPoint, targetPoint, originRect, this.getMinOffset(), this.getMinOffset(), originPoint.y < targetPoint.y);
        }
    };
    ConnectorPointsOrthogonalEastSideCalculator.prototype.getEndOverlappedShapeOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        switch (targetSide) {
            case DiagramItem_1.ConnectionPointSide.East:
                return [originPoint.clone().offset(this.getMinOffset(), 0)];
            case DiagramItem_1.ConnectionPointSide.West: {
                var offset = this.getMinOffset();
                if (this.beginRect.right > originPoint.x)
                    offset += this.beginRect.right - originPoint.x;
                return [originPoint.clone().offset(offset, 0)];
            }
            case DiagramItem_1.ConnectionPointSide.North:
                if (targetPoint.x < originPoint.x)
                    return this.getAsideOffsetPoints(originPoint, targetPoint, originRect, this.getMinOffset(), this.getMinOffset(), true);
                if (originPoint.y > targetPoint.y)
                    return [originPoint.clone().offset(this.getMinOffset(), 0)];
                return [];
            case DiagramItem_1.ConnectionPointSide.South:
                if (targetPoint.x < originPoint.x)
                    return this.getAsideOffsetPoints(originPoint, targetPoint, originRect, this.getMinOffset(), this.getMinOffset(), false);
                if (originPoint.y < targetPoint.y)
                    return [originPoint.clone().offset(this.getMinOffset(), 0)];
                return [];
        }
    };
    ConnectorPointsOrthogonalEastSideCalculator.prototype.getBeginOnSideOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        return [originPoint.clone().offset(this.getScaleableOffsetX(originPoint, targetPoint, false), 0)];
    };
    ConnectorPointsOrthogonalEastSideCalculator.prototype.getEndOnSideOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        return [originPoint.clone().offset(this.getScaleableOffsetX(originPoint, targetPoint, true), 0)];
    };
    ConnectorPointsOrthogonalEastSideCalculator.prototype.getBeginOffSideOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        switch (targetSide) {
            case DiagramItem_1.ConnectionPointSide.South:
                if (this.isBeginEndOverlappedY())
                    return this.getScaleableAsideOffsetPoints(originPoint, targetPoint, originRect, false, false);
                break;
            case DiagramItem_1.ConnectionPointSide.North:
                if (this.isBeginEndOverlappedY())
                    return this.getScaleableAsideOffsetPoints(originPoint, targetPoint, originRect, false, true);
                break;
            case DiagramItem_1.ConnectionPointSide.East:
                if (this.isBeginEndOverlappedY())
                    return this.getScaleableAsideOffsetPoints(originPoint, targetPoint, originRect, false);
                break;
            case DiagramItem_1.ConnectionPointSide.Undefined:
            case DiagramItem_1.ConnectionPointSide.West:
                return this.getScaleableAsideOffsetPoints(originPoint, targetPoint, originRect, false);
        }
        return [originPoint.clone().offset(this.getScaleableOffsetX(originPoint, targetPoint, false), 0)];
    };
    ConnectorPointsOrthogonalEastSideCalculator.prototype.getEndOffSideOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        if (targetSide === DiagramItem_1.ConnectionPointSide.Undefined)
            return this.getScaleableAsideOffsetPoints(originPoint, targetPoint, originRect, true);
        else if (this.isBeginEndOverlappedY()) {
            var direction = this.beginRect.center.y > this.endRect.center.y;
            return this.getScaleableAsideOffsetPoints(originPoint, targetPoint, originRect, true, direction);
        }
        return [originPoint.clone().offset(this.getScaleableOffsetX(originPoint, targetPoint, true), 0)];
    };
    ConnectorPointsOrthogonalEastSideCalculator.prototype.getAsideOffsetPoints = function (originPoint, targetPoint, originRect, offset, asideOffset, direction) {
        var points = [];
        if (originRect !== undefined) {
            if (direction === undefined)
                direction = targetPoint.y < originPoint.y;
            if (direction)
                points.push(originPoint.clone().offset(offset, -(originPoint.y - originRect.y + asideOffset)));
            else
                points.push(originPoint.clone().offset(offset, (originRect.bottom - originPoint.y + asideOffset)));
        }
        points.push(originPoint.clone().offset(offset, 0));
        return points;
    };
    ConnectorPointsOrthogonalEastSideCalculator.prototype.getScaleableAsideOffsetPoints = function (originPoint, targetPoint, originRect, isEnd, direction) {
        var offset = this.getScaleableOffsetX(originPoint, targetPoint, isEnd);
        var asideOffset = this.getScaleableOffsetY(originPoint, targetPoint, isEnd);
        return this.getAsideOffsetPoints(originPoint, targetPoint, originRect, offset, asideOffset, direction);
    };
    ConnectorPointsOrthogonalEastSideCalculator.prototype.getScaleableOffsetX = function (originPoint, targetPoint, isEnd) {
        if (this.beginRect && this.endRect) {
            var distance = isEnd ? this.beginRect.x - originPoint.x : this.endRect.x - originPoint.x;
            if (distance > 0 && distance < this.getMinOffset() * 2)
                return distance / 2;
        }
        return this.getMinOffset();
    };
    ConnectorPointsOrthogonalEastSideCalculator.prototype.getScaleableOffsetY = function (originPoint, targetPoint, isEnd) {
        if (this.beginRect && this.endRect)
            if (!isEnd && !this.isBeginEndOverlappedY()) {
                var distance = void 0;
                if (targetPoint.y < originPoint.y)
                    distance = this.beginRect.y - this.endRect.bottom;
                else
                    distance = this.endRect.y - this.beginRect.bottom;
                if (distance < this.getMinOffset() * 2)
                    return distance / 2;
            }
        return this.getMinOffset();
    };
    ConnectorPointsOrthogonalEastSideCalculator.prototype.isOnSidePoint = function (originPoint, targetPoint) {
        return targetPoint.x > originPoint.x;
    };
    ConnectorPointsOrthogonalEastSideCalculator.prototype.isDirectConnectionAllowed = function (targetSide, originPoint, targetPoint) {
        return targetSide === DiagramItem_1.ConnectionPointSide.West || targetSide === DiagramItem_1.ConnectionPointSide.Undefined;
    };
    ConnectorPointsOrthogonalEastSideCalculator.prototype.getDirectConnectionPoints = function (originPoint, targetPoint) {
        var cx = originPoint.x + (targetPoint.x - originPoint.x) / 2;
        return [
            new ConnectorRenderPoint_1.ConnectorRenderPoint(cx, originPoint.y),
            new ConnectorRenderPoint_1.ConnectorRenderPoint(cx, targetPoint.y)
        ];
    };
    return ConnectorPointsOrthogonalEastSideCalculator;
}(ConnectorPointsOrthogonalSideCalculatorBase_1.ConnectorPointsOrthogonalSideCalculatorBase));
exports.ConnectorPointsOrthogonalEastSideCalculator = ConnectorPointsOrthogonalEastSideCalculator;
//# sourceMappingURL=ConnectorPointsOrthogonalEastSideCalculator.js.map