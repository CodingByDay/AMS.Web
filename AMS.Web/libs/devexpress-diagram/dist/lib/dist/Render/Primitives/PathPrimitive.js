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
exports.PathPrimitiveClosePathCommand = exports.PathPrimitiveArcToCommand = exports.PathPrimitiveQuadraticCurveToCommand = exports.PathPrimitiveCubicCurveToCommand = exports.PathPrimitiveLineToCommand = exports.PathPrimitiveMoveToCommand = exports.PathPrimitiveCommand = exports.PathPrimitive = void 0;
var RenderHelper_1 = require("../RenderHelper");
var Primitive_1 = require("./Primitive");
var PrimitiveObject_1 = require("./PrimitiveObject");
var PathPrimitive = (function (_super) {
    __extends(PathPrimitive, _super);
    function PathPrimitive(commands, style, className, clipPathId, onApplyProperties) {
        var _this = _super.call(this, style, className, clipPathId, onApplyProperties) || this;
        _this.commands = commands.map(function (command) {
            command.style = style;
            return command;
        });
        return _this;
    }
    PathPrimitive.prototype.createMainElement = function () {
        return document.createElementNS(RenderHelper_1.svgNS, "path");
    };
    PathPrimitive.prototype.applyElementProperties = function (element, measurer) {
        element.setAttribute("d", this.commands.map(function (c) { return c.toString(); }).join(" "));
        this.setPositionCorrectionAttribute(element);
        _super.prototype.applyElementProperties.call(this, element, measurer);
    };
    return PathPrimitive;
}(Primitive_1.SvgPrimitive));
exports.PathPrimitive = PathPrimitive;
var PathPrimitiveCommand = (function (_super) {
    __extends(PathPrimitiveCommand, _super);
    function PathPrimitiveCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PathPrimitiveCommand;
}(PrimitiveObject_1.PrimitiveObject));
exports.PathPrimitiveCommand = PathPrimitiveCommand;
var PathPrimitiveMoveToCommand = (function (_super) {
    __extends(PathPrimitiveMoveToCommand, _super);
    function PathPrimitiveMoveToCommand(x, y) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.y = y;
        return _this;
    }
    PathPrimitiveMoveToCommand.prototype.toString = function () {
        return "M " + this.getUnitVaue(this.x) + " " + this.getUnitVaue(this.y);
    };
    PathPrimitiveMoveToCommand.fromPoint = function (point) {
        return new PathPrimitiveMoveToCommand(point.x, point.y);
    };
    return PathPrimitiveMoveToCommand;
}(PathPrimitiveCommand));
exports.PathPrimitiveMoveToCommand = PathPrimitiveMoveToCommand;
var PathPrimitiveLineToCommand = (function (_super) {
    __extends(PathPrimitiveLineToCommand, _super);
    function PathPrimitiveLineToCommand(x, y) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.y = y;
        return _this;
    }
    PathPrimitiveLineToCommand.prototype.toString = function () {
        return "L " + this.getUnitVaue(this.x) + " " + this.getUnitVaue(this.y);
    };
    PathPrimitiveLineToCommand.fromPoint = function (point) {
        return new PathPrimitiveLineToCommand(point.x, point.y);
    };
    return PathPrimitiveLineToCommand;
}(PathPrimitiveCommand));
exports.PathPrimitiveLineToCommand = PathPrimitiveLineToCommand;
var PathPrimitiveCubicCurveToCommand = (function (_super) {
    __extends(PathPrimitiveCubicCurveToCommand, _super);
    function PathPrimitiveCubicCurveToCommand(x1, y1, x2, y2, x3, y3) {
        var _this = _super.call(this) || this;
        _this.x1 = x1;
        _this.y1 = y1;
        _this.x2 = x2;
        _this.y2 = y2;
        _this.x3 = x3;
        _this.y3 = y3;
        return _this;
    }
    PathPrimitiveCubicCurveToCommand.prototype.toString = function () {
        return "C " + this.getUnitVaue(this.x1) + " " + this.getUnitVaue(this.y1) + "," +
            this.getUnitVaue(this.x2) + " " + this.getUnitVaue(this.y2) + "," +
            this.getUnitVaue(this.x3) + " " + this.getUnitVaue(this.y3);
    };
    return PathPrimitiveCubicCurveToCommand;
}(PathPrimitiveCommand));
exports.PathPrimitiveCubicCurveToCommand = PathPrimitiveCubicCurveToCommand;
var PathPrimitiveQuadraticCurveToCommand = (function (_super) {
    __extends(PathPrimitiveQuadraticCurveToCommand, _super);
    function PathPrimitiveQuadraticCurveToCommand(x1, y1, x2, y2) {
        var _this = _super.call(this) || this;
        _this.x1 = x1;
        _this.y1 = y1;
        _this.x2 = x2;
        _this.y2 = y2;
        return _this;
    }
    PathPrimitiveQuadraticCurveToCommand.prototype.toString = function () {
        return "Q " + this.getUnitVaue(this.x1) + " " + this.getUnitVaue(this.y1) + "," +
            this.getUnitVaue(this.x2) + " " + this.getUnitVaue(this.y2);
    };
    return PathPrimitiveQuadraticCurveToCommand;
}(PathPrimitiveCommand));
exports.PathPrimitiveQuadraticCurveToCommand = PathPrimitiveQuadraticCurveToCommand;
var PathPrimitiveArcToCommand = (function (_super) {
    __extends(PathPrimitiveArcToCommand, _super);
    function PathPrimitiveArcToCommand(rx, ry, xAxisRotation, largeArcFlag, sweepFag, x, y) {
        var _this = _super.call(this) || this;
        _this.rx = rx;
        _this.ry = ry;
        _this.xAxisRotation = xAxisRotation;
        _this.largeArcFlag = largeArcFlag;
        _this.sweepFag = sweepFag;
        _this.x = x;
        _this.y = y;
        return _this;
    }
    PathPrimitiveArcToCommand.prototype.toString = function () {
        return "A " + this.getUnitVaue(this.rx) + " " + this.getUnitVaue(this.ry) + " " +
            this.getUnitVaue(this.xAxisRotation) + " " +
            (this.largeArcFlag ? "1" : "0") + " " + (this.sweepFag ? "1" : "0") +
            this.getUnitVaue(this.x) + "," + this.getUnitVaue(this.y);
    };
    return PathPrimitiveArcToCommand;
}(PathPrimitiveCommand));
exports.PathPrimitiveArcToCommand = PathPrimitiveArcToCommand;
var PathPrimitiveClosePathCommand = (function (_super) {
    __extends(PathPrimitiveClosePathCommand, _super);
    function PathPrimitiveClosePathCommand() {
        return _super.call(this) || this;
    }
    PathPrimitiveClosePathCommand.prototype.toString = function () {
        return "z";
    };
    return PathPrimitiveClosePathCommand;
}(PathPrimitiveCommand));
exports.PathPrimitiveClosePathCommand = PathPrimitiveClosePathCommand;
//# sourceMappingURL=PathPrimitive.js.map