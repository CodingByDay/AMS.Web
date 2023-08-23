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
exports.ConnectorPointsOrthogonalUndefinedSideCalculator = void 0;
var ConnectorPointsOrthogonalSideCalculatorBase_1 = require("./ConnectorPointsOrthogonalSideCalculatorBase");
var ConnectorRenderPoint_1 = require("../ConnectorRenderPoint");
var ConnectorPointsOrthogonalUndefinedSideCalculator = (function (_super) {
    __extends(ConnectorPointsOrthogonalUndefinedSideCalculator, _super);
    function ConnectorPointsOrthogonalUndefinedSideCalculator(parent) {
        return _super.call(this, parent) || this;
    }
    ConnectorPointsOrthogonalUndefinedSideCalculator.prototype.getCorrectOriginPoint = function (originPoint, originRect) {
        return originPoint;
    };
    ConnectorPointsOrthogonalUndefinedSideCalculator.prototype.getSameShapeOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        return [];
    };
    ConnectorPointsOrthogonalUndefinedSideCalculator.prototype.getOverlappedPointsOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        return [];
    };
    ConnectorPointsOrthogonalUndefinedSideCalculator.prototype.getBeginOverlappedShapeOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        return [];
    };
    ConnectorPointsOrthogonalUndefinedSideCalculator.prototype.getEndOverlappedShapeOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        return [];
    };
    ConnectorPointsOrthogonalUndefinedSideCalculator.prototype.getBeginOnSideOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        return [];
    };
    ConnectorPointsOrthogonalUndefinedSideCalculator.prototype.getEndOnSideOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        return [];
    };
    ConnectorPointsOrthogonalUndefinedSideCalculator.prototype.getBeginOffSideOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        return [];
    };
    ConnectorPointsOrthogonalUndefinedSideCalculator.prototype.getEndOffSideOffsetPoints = function (targetSide, originPoint, targetPoint, originRect) {
        return [];
    };
    ConnectorPointsOrthogonalUndefinedSideCalculator.prototype.isOnSidePoint = function (originPoint, targetPoint) {
        return true;
    };
    ConnectorPointsOrthogonalUndefinedSideCalculator.prototype.isDirectConnectionAllowed = function (targetSide, originPoint, targetPoint) {
        var calculator = this.getSideCalculator(originPoint, targetPoint);
        if (calculator !== undefined)
            return calculator.isDirectConnectionAllowed(targetSide, originPoint, targetPoint);
        return true;
    };
    ConnectorPointsOrthogonalUndefinedSideCalculator.prototype.getDirectConnectionPoints = function (originPoint, targetPoint) {
        var diffX = Math.abs(targetPoint.x - originPoint.x);
        var diffY = Math.abs(targetPoint.y - originPoint.y);
        if (diffX > diffY) {
            var minX = Math.min(originPoint.x, targetPoint.x);
            var cx = minX + diffX / 2;
            return [
                new ConnectorRenderPoint_1.ConnectorRenderPoint(cx, originPoint.y),
                new ConnectorRenderPoint_1.ConnectorRenderPoint(cx, targetPoint.y)
            ];
        }
        else {
            var minY = Math.min(originPoint.y, targetPoint.y);
            var cy = minY + diffY / 2;
            return [
                new ConnectorRenderPoint_1.ConnectorRenderPoint(originPoint.x, cy),
                new ConnectorRenderPoint_1.ConnectorRenderPoint(targetPoint.x, cy)
            ];
        }
    };
    return ConnectorPointsOrthogonalUndefinedSideCalculator;
}(ConnectorPointsOrthogonalSideCalculatorBase_1.ConnectorPointsOrthogonalSideCalculatorBase));
exports.ConnectorPointsOrthogonalUndefinedSideCalculator = ConnectorPointsOrthogonalUndefinedSideCalculator;
//# sourceMappingURL=ConnectorPointsOrthogonalUndefinedSideCalculator.js.map