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
exports.ConnectorPointsOrthogonalWestSideCalculator = void 0;
var DiagramItem_1 = require("../../DiagramItem");
var ConnectorPointsOrthogonalSideCalculatorBase_1 = require("./ConnectorPointsOrthogonalSideCalculatorBase");
var ConnectorRenderPoint_1 = require("../ConnectorRenderPoint");
var ConnectorPointsOrthogonalWestSideCalculator = (function (_super) {
    __extends(ConnectorPointsOrthogonalWestSideCalculator, _super);
    function ConnectorPointsOrthogonalWestSideCalculator(parent) {
        return _super.call(this, parent) || this;
    }
    ConnectorPointsOrthogonalWestSideCalculator.prototype.getCorrectOriginPoint = function (originPoint, originRect) {
        if (originPoint.x > originRect.x)
            originPoint = originPoint.clone().offset(originRect.x - originPoint.x, 0);
        return originPoint;
    };
    ConnectorPointsOrthogonalWestSideCalculator.prototype.getSameShapeOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        switch (targetSide) {
            case DiagramItem_1.ConnectionPointSide.North:
            case DiagramItem_1.ConnectionPointSide.South:
            case DiagramItem_1.ConnectionPointSide.West:
                return [originPoint.clone().offset(-this.getMinOffset(), 0)];
            case DiagramItem_1.ConnectionPointSide.East:
                return this.getAsideOffsetPoints(originPoint, targetPoint, originRect, this.getMinOffset(), this.getMinOffset());
        }
    };
    ConnectorPointsOrthogonalWestSideCalculator.prototype.getOverlappedPointsOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        switch (targetSide) {
            case DiagramItem_1.ConnectionPointSide.East:
                return [originPoint.clone().offset(this.getMinOffset(), 0)];
            case DiagramItem_1.ConnectionPointSide.West:
                return [originPoint.clone().offset(-this.getMinOffset(), 0)];
        }
        return [];
    };
    ConnectorPointsOrthogonalWestSideCalculator.prototype.getBeginOverlappedShapeOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        switch (targetSide) {
            case DiagramItem_1.ConnectionPointSide.North:
                if (originPoint.x > targetPoint.x)
                    if (originPoint.y < targetPoint.y)
                        return [];
                    else
                        return [originPoint.clone().offset(-this.getMinOffset(), 0)];
                if (originPoint.x < this.endRect.x)
                    return this.getAsideOffsetPoints(originPoint, targetPoint, originRect, this.getMinOffset(), this.getMinOffset(), true);
                return [originPoint.clone().offset(-this.getMinOffset(), 0)];
            case DiagramItem_1.ConnectionPointSide.South:
                if (originPoint.x > targetPoint.x)
                    if (originPoint.y > targetPoint.y)
                        return [];
                    else
                        return [originPoint.clone().offset(-this.getMinOffset(), 0)];
                if (originPoint.x < this.endRect.x)
                    return this.getAsideOffsetPoints(originPoint, targetPoint, originRect, this.getMinOffset(), this.getMinOffset(), false);
                return [originPoint.clone().offset(-this.getMinOffset(), 0)];
            case DiagramItem_1.ConnectionPointSide.West:
                return [originPoint.clone().offset(-this.getMinOffset(), 0)];
            case DiagramItem_1.ConnectionPointSide.East:
                return this.getAsideOffsetPoints(originPoint, targetPoint, originRect, this.getMinOffset(), this.getMinOffset(), originPoint.y < targetPoint.y);
        }
    };
    ConnectorPointsOrthogonalWestSideCalculator.prototype.getEndOverlappedShapeOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        switch (targetSide) {
            case DiagramItem_1.ConnectionPointSide.East: {
                var offset = -this.getMinOffset();
                if (this.beginRect.x < originPoint.x)
                    offset -= originPoint.x - this.beginRect.x;
                return [originPoint.clone().offset(offset, 0)];
            }
            case DiagramItem_1.ConnectionPointSide.West:
                return [originPoint.clone().offset(-this.getMinOffset(), 0)];
            case DiagramItem_1.ConnectionPointSide.North:
                if (targetPoint.x > originPoint.x)
                    return this.getAsideOffsetPoints(originPoint, targetPoint, originRect, this.getMinOffset(), this.getMinOffset(), true);
                if (originPoint.y > targetPoint.y)
                    return [originPoint.clone().offset(-this.getMinOffset(), 0)];
                return [];
            case DiagramItem_1.ConnectionPointSide.South:
                if (targetPoint.x > originPoint.x)
                    return this.getAsideOffsetPoints(originPoint, targetPoint, originRect, this.getMinOffset(), this.getMinOffset(), false);
                if (originPoint.y < targetPoint.y)
                    return [originPoint.clone().offset(-this.getMinOffset(), 0)];
                return [];
        }
    };
    ConnectorPointsOrthogonalWestSideCalculator.prototype.getBeginOnSideOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        return [originPoint.clone().offset(-this.getScaleableOffsetX(originPoint, false), 0)];
    };
    ConnectorPointsOrthogonalWestSideCalculator.prototype.getEndOnSideOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        return [originPoint.clone().offset(-this.getScaleableOffsetX(originPoint, true), 0)];
    };
    ConnectorPointsOrthogonalWestSideCalculator.prototype.getBeginOffSideOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        switch (targetSide) {
            case DiagramItem_1.ConnectionPointSide.South:
                if (this.isBeginEndOverlappedY())
                    return this.getScaleableAsideOffsetPoints(originPoint, targetPoint, originRect, false, false);
                break;
            case DiagramItem_1.ConnectionPointSide.North:
                if (this.isBeginEndOverlappedY())
                    return this.getScaleableAsideOffsetPoints(originPoint, targetPoint, originRect, false, true);
                break;
            case DiagramItem_1.ConnectionPointSide.West:
                if (this.isBeginEndOverlappedY())
                    return this.getScaleableAsideOffsetPoints(originPoint, targetPoint, originRect, false);
                break;
            case DiagramItem_1.ConnectionPointSide.Undefined:
            case DiagramItem_1.ConnectionPointSide.East:
                return this.getScaleableAsideOffsetPoints(originPoint, targetPoint, originRect, false);
        }
        return [originPoint.clone().offset(-this.getScaleableOffsetX(originPoint, false), 0)];
    };
    ConnectorPointsOrthogonalWestSideCalculator.prototype.getEndOffSideOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        if (targetSide === DiagramItem_1.ConnectionPointSide.Undefined)
            return this.getScaleableAsideOffsetPoints(originPoint, targetPoint, originRect, true);
        else if (this.isBeginEndOverlappedY()) {
            var direction = this.beginRect.center.y > this.endRect.center.y;
            return this.getScaleableAsideOffsetPoints(originPoint, targetPoint, originRect, true, direction);
        }
        return [originPoint.clone().offset(-this.getScaleableOffsetX(originPoint, true), 0)];
    };
    ConnectorPointsOrthogonalWestSideCalculator.prototype.getAsideOffsetPoints = function (originPoint, targetPoint, originRect, offset, asideOffset, direction) {
        var points = [];
        if (originRect !== undefined) {
            if (direction === undefined)
                direction = targetPoint.y < originPoint.y;
            if (direction)
                points.push(originPoint.clone().offset(-offset, -(originPoint.y - originRect.y + asideOffset)));
            else
                points.push(originPoint.clone().offset(-offset, (originRect.bottom - originPoint.y + asideOffset)));
        }
        points.push(originPoint.clone().offset(-offset, 0));
        return points;
    };
    ConnectorPointsOrthogonalWestSideCalculator.prototype.getScaleableAsideOffsetPoints = function (originPoint, targetPoint, originRect, isEnd, direction) {
        var offset = this.getScaleableOffsetX(originPoint, isEnd);
        var asideOffset = this.getScaleableOffsetY(originPoint, targetPoint, isEnd);
        return this.getAsideOffsetPoints(originPoint, targetPoint, originRect, offset, asideOffset, direction);
    };
    ConnectorPointsOrthogonalWestSideCalculator.prototype.getScaleableOffsetX = function (originPoint, isEnd) {
        if (this.beginRect && this.endRect) {
            var distance = isEnd ? originPoint.x - this.beginRect.right : originPoint.x - this.endRect.right;
            if (distance > 0 && distance < this.getMinOffset() * 2)
                return distance / 2;
        }
        return this.getMinOffset();
    };
    ConnectorPointsOrthogonalWestSideCalculator.prototype.getScaleableOffsetY = function (originPoint, targetPoint, isEnd) {
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
    ConnectorPointsOrthogonalWestSideCalculator.prototype.isOnSidePoint = function (originPoint, targetPoint) {
        return targetPoint.x < originPoint.x;
    };
    ConnectorPointsOrthogonalWestSideCalculator.prototype.isDirectConnectionAllowed = function (targetSide, originPoint, targetPoint) {
        return targetSide === DiagramItem_1.ConnectionPointSide.East || targetSide === DiagramItem_1.ConnectionPointSide.Undefined;
    };
    ConnectorPointsOrthogonalWestSideCalculator.prototype.getDirectConnectionPoints = function (originPoint, targetPoint) {
        var cx = targetPoint.x + (originPoint.x - targetPoint.x) / 2;
        return [
            new ConnectorRenderPoint_1.ConnectorRenderPoint(cx, originPoint.y),
            new ConnectorRenderPoint_1.ConnectorRenderPoint(cx, targetPoint.y)
        ];
    };
    return ConnectorPointsOrthogonalWestSideCalculator;
}(ConnectorPointsOrthogonalSideCalculatorBase_1.ConnectorPointsOrthogonalSideCalculatorBase));
exports.ConnectorPointsOrthogonalWestSideCalculator = ConnectorPointsOrthogonalWestSideCalculator;
//# sourceMappingURL=ConnectorPointsOrthogonalWestSideCalculator.js.map