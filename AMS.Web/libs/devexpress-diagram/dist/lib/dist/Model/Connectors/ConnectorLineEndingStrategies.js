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
exports.ConnectorLineEndingFilledTriangleStrategy = exports.ConnectorLineEndingOutlinedTriangleStrategy = exports.ConnectorLineEndingArrowStrategy = exports.ConnectorLineEndingNoneStrategy = exports.ConnectorLineEndingStrategy = void 0;
var Utils_1 = require("../../Utils");
var PathPrimitive_1 = require("../../Render/Primitives/PathPrimitive");
var ConnectorLineEndingStrategy = (function () {
    function ConnectorLineEndingStrategy(style) {
        this.style = style;
    }
    ConnectorLineEndingStrategy.prototype.hasCommands = function () {
        return true;
    };
    ConnectorLineEndingStrategy.prototype.needCreateSeparatePrimitive = function () {
        return false;
    };
    ConnectorLineEndingStrategy.prototype.createPrimitive = function () {
        return new PathPrimitive_1.PathPrimitive([], this.getStyle(), this.getCssClass());
    };
    ConnectorLineEndingStrategy.prototype.createCommands = function (point, directionPoint) {
        return [];
    };
    ConnectorLineEndingStrategy.prototype.getStyle = function () {
        var style = this.style.clone();
        style.resetStrokeDashArray();
        return style;
    };
    ConnectorLineEndingStrategy.prototype.getCssClass = function () {
        return undefined;
    };
    return ConnectorLineEndingStrategy;
}());
exports.ConnectorLineEndingStrategy = ConnectorLineEndingStrategy;
var ConnectorLineEndingNoneStrategy = (function (_super) {
    __extends(ConnectorLineEndingNoneStrategy, _super);
    function ConnectorLineEndingNoneStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConnectorLineEndingNoneStrategy.prototype.hasCommands = function () {
        return false;
    };
    return ConnectorLineEndingNoneStrategy;
}(ConnectorLineEndingStrategy));
exports.ConnectorLineEndingNoneStrategy = ConnectorLineEndingNoneStrategy;
var ConnectorLineEndingArrowStrategy = (function (_super) {
    __extends(ConnectorLineEndingArrowStrategy, _super);
    function ConnectorLineEndingArrowStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ConnectorLineEndingArrowStrategy.prototype, "arrowHeight", {
        get: function () { return this.style.strokeWidth * 6; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConnectorLineEndingArrowStrategy.prototype, "arrowWidth", {
        get: function () { return this.style.strokeWidth * 2; },
        enumerable: false,
        configurable: true
    });
    ConnectorLineEndingArrowStrategy.prototype.needCreateSeparatePrimitive = function () {
        return !this.style.isDefaultStrokeDashArray();
    };
    ConnectorLineEndingArrowStrategy.prototype.createCommands = function (point, directionPoint) {
        var arrowPoints = this.getArrowPoints(point, directionPoint);
        var commands = [
            new PathPrimitive_1.PathPrimitiveMoveToCommand(arrowPoints.point1.x, arrowPoints.point1.y),
            new PathPrimitive_1.PathPrimitiveLineToCommand(point.x, point.y),
            new PathPrimitive_1.PathPrimitiveLineToCommand(arrowPoints.point2.x, arrowPoints.point2.y)
        ];
        if (!this.style.isDefaultStrokeDashArray())
            commands = commands.concat([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(point.x, point.y),
                new PathPrimitive_1.PathPrimitiveLineToCommand(arrowPoints.point3.x, arrowPoints.point3.y)
            ]);
        return commands;
    };
    ConnectorLineEndingArrowStrategy.prototype.getArrowPoints = function (point, directionPoint) {
        var arrowHeight = this.arrowHeight;
        if (point.x === directionPoint.x) {
            var distance = Math.abs(point.y - directionPoint.y);
            if (distance < arrowHeight)
                arrowHeight = distance;
        }
        if (point.y === directionPoint.y) {
            var distance = Math.abs(point.x - directionPoint.x);
            if (distance < arrowHeight)
                arrowHeight = distance;
        }
        return Utils_1.GeometryUtils.getArrowPoints(point, directionPoint, arrowHeight, this.arrowWidth);
    };
    return ConnectorLineEndingArrowStrategy;
}(ConnectorLineEndingStrategy));
exports.ConnectorLineEndingArrowStrategy = ConnectorLineEndingArrowStrategy;
var ConnectorLineEndingOutlinedTriangleStrategy = (function (_super) {
    __extends(ConnectorLineEndingOutlinedTriangleStrategy, _super);
    function ConnectorLineEndingOutlinedTriangleStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConnectorLineEndingOutlinedTriangleStrategy.prototype.needCreateSeparatePrimitive = function () {
        return true;
    };
    ConnectorLineEndingOutlinedTriangleStrategy.prototype.createCommands = function (point, directionPoint) {
        var arrowPoints = this.getArrowPoints(point, directionPoint);
        return [
            new PathPrimitive_1.PathPrimitiveMoveToCommand(arrowPoints.point1.x, arrowPoints.point1.y),
            new PathPrimitive_1.PathPrimitiveLineToCommand(point.x, point.y),
            new PathPrimitive_1.PathPrimitiveLineToCommand(arrowPoints.point2.x, arrowPoints.point2.y),
            new PathPrimitive_1.PathPrimitiveClosePathCommand()
        ];
    };
    ConnectorLineEndingOutlinedTriangleStrategy.prototype.getCssClass = function () {
        return "outlined-line-ending";
    };
    return ConnectorLineEndingOutlinedTriangleStrategy;
}(ConnectorLineEndingArrowStrategy));
exports.ConnectorLineEndingOutlinedTriangleStrategy = ConnectorLineEndingOutlinedTriangleStrategy;
var ConnectorLineEndingFilledTriangleStrategy = (function (_super) {
    __extends(ConnectorLineEndingFilledTriangleStrategy, _super);
    function ConnectorLineEndingFilledTriangleStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConnectorLineEndingFilledTriangleStrategy.prototype.getStyle = function () {
        var style = _super.prototype.getStyle.call(this);
        style["fill"] = style["stroke"];
        return style;
    };
    ConnectorLineEndingFilledTriangleStrategy.prototype.getCssClass = function () {
        return "filled-line-ending";
    };
    return ConnectorLineEndingFilledTriangleStrategy;
}(ConnectorLineEndingOutlinedTriangleStrategy));
exports.ConnectorLineEndingFilledTriangleStrategy = ConnectorLineEndingFilledTriangleStrategy;
//# sourceMappingURL=ConnectorLineEndingStrategies.js.map