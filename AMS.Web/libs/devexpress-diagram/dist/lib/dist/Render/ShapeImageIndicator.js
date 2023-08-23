"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeImageIndicator = void 0;
var EllipsePrimitive_1 = require("./Primitives/EllipsePrimitive");
var PathPrimitive_1 = require("./Primitives/PathPrimitive");
var GroupPrimitive_1 = require("./Primitives/GroupPrimitive");
var browser_1 = require("@devexpress/utils/lib/browser");
var RectaglePrimitive_1 = require("./Primitives/RectaglePrimitive");
var unit_converter_1 = require("@devexpress/utils/lib/class/unit-converter");
var ShapeImageIndicator = (function () {
    function ShapeImageIndicator(x, y, size, borderThickness, className) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.borderThickness = borderThickness;
        this.className = className;
        this.animationStarted = false;
    }
    ShapeImageIndicator.createLoadingIndicatorPrimitives = function (x, y, r, borderThickness, className) {
        var indicator = new ShapeImageIndicator(x, y, r, borderThickness, className);
        return indicator.createLoadingIndicatorPrimitive();
    };
    ShapeImageIndicator.createUserIconPrimitives = function (x, y, r, borderThickness, className) {
        var indicator = new ShapeImageIndicator(x, y, r, borderThickness, className);
        return indicator.createUserIconPrimitive();
    };
    ShapeImageIndicator.createWarningIconPrimitives = function (x, y, size, className) {
        var indicator = new ShapeImageIndicator(x, y, size, undefined, className);
        return indicator.createWarningIconPrimitive();
    };
    ShapeImageIndicator.prototype.rotate = function (element, centerX, centerY, timestamp) {
        if (!this.animationStarted)
            return;
        var angle = (Math.round(timestamp) % 1080) / 3;
        var transformAttributeValue = "rotate(" + angle + " " + centerX + " " + centerY + ")";
        element.setAttribute("transform", transformAttributeValue);
        this.animationRequestId = requestAnimationFrame(function (timestamp) {
            this.rotate(element, centerX, centerY, timestamp);
        }.bind(this));
    };
    ShapeImageIndicator.prototype.onApplyLoadingIndicatorElementProperties = function (element) {
        var _a = [unit_converter_1.UnitConverter.twipsToPixelsF(this.x + this.size / 2), unit_converter_1.UnitConverter.twipsToPixelsF(this.y + this.size / 2)], centerX = _a[0], centerY = _a[1];
        if (browser_1.Browser.IE) {
            this.animationRequestId = requestAnimationFrame(function (timestamp) {
                this.rotate(element, centerX, centerY, timestamp);
            }.bind(this));
            this.animationStarted = true;
        }
        else
            element.style.setProperty("transform-origin", centerX + "px " + centerY + "px");
    };
    ShapeImageIndicator.prototype.center = function () {
        return [unit_converter_1.UnitConverter.twipsToPixelsF(this.x + this.size / 2), unit_converter_1.UnitConverter.twipsToPixelsF(this.y + this.size / 2)];
    };
    ShapeImageIndicator.prototype.createLoadingIndicatorPrimitive = function () {
        var _a = this.center(), centerX = _a[0], centerY = _a[1];
        var radius = unit_converter_1.UnitConverter.twipsToPixelsF(this.size / 2 - this.borderThickness / 2);
        return new GroupPrimitive_1.GroupPrimitive([
            new EllipsePrimitive_1.EllipsePrimitive(centerX + "", centerY + "", radius + "", radius + ""),
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand((centerX + radius) + "", centerY + ""),
                new PathPrimitive_1.PathPrimitiveArcToCommand(radius + "", radius + "", 0, false, false, centerX + "", (centerY - radius) + "")
            ])
        ], this.className, undefined, undefined, this.onApplyLoadingIndicatorElementProperties.bind(this), this.onBeforeDispose.bind(this));
    };
    ShapeImageIndicator.prototype.createUserIconPrimitive = function () {
        var _a = this.center(), centerX = _a[0], centerY = _a[1];
        var radius = unit_converter_1.UnitConverter.twipsToPixelsF(this.size / 2 - this.borderThickness / 2);
        var sizeInPixels = unit_converter_1.UnitConverter.twipsToPixelsF(this.size);
        return new GroupPrimitive_1.GroupPrimitive([
            new EllipsePrimitive_1.EllipsePrimitive(centerX + "", centerY + "", radius + "", radius + "", undefined, "dxdi-background"),
            new EllipsePrimitive_1.EllipsePrimitive(centerX + "", centerY - sizeInPixels / 8 + "", sizeInPixels / 8 + "", sizeInPixels / 8 + ""),
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(centerX + "", centerY + sizeInPixels / 16 + ""),
                new PathPrimitive_1.PathPrimitiveCubicCurveToCommand(centerX + 0.1375 * sizeInPixels + "", centerY + sizeInPixels / 16 + "", centerX + sizeInPixels / 4 + "", centerY
                    + 0.11875 * sizeInPixels + "", centerX + sizeInPixels / 4 + "", centerY + 0.1875 * sizeInPixels + ""),
                new PathPrimitive_1.PathPrimitiveLineToCommand(centerX + sizeInPixels / 4 + "", centerY + sizeInPixels / 4 + ""),
                new PathPrimitive_1.PathPrimitiveLineToCommand(centerX - sizeInPixels / 4 + "", centerY + sizeInPixels / 4 + ""),
                new PathPrimitive_1.PathPrimitiveLineToCommand(centerX - sizeInPixels / 4 + "", centerY + 0.1875 * sizeInPixels + ""),
                new PathPrimitive_1.PathPrimitiveCubicCurveToCommand(centerX - sizeInPixels / 4 + "", centerY + 0.11875 * sizeInPixels + "", centerX - 0.1375 * sizeInPixels + "", centerY
                    + sizeInPixels / 16 + "", centerX + "", centerY + sizeInPixels / 16 + ""),
                new PathPrimitive_1.PathPrimitiveClosePathCommand()
            ])
        ], this.className);
    };
    ShapeImageIndicator.prototype.createWarningIconPrimitive = function () {
        var _a = this.center(), centerX = _a[0], centerY = _a[1];
        var radius = unit_converter_1.UnitConverter.twipsToPixelsF(this.size / 2) - 1;
        var exclamationLineWidth = unit_converter_1.UnitConverter.twipsToPixelsF(this.size / 8);
        return new GroupPrimitive_1.GroupPrimitive([
            new EllipsePrimitive_1.EllipsePrimitive(centerX + "", centerY + "", radius + "", radius + ""),
            new RectaglePrimitive_1.RectanglePrimitive(centerX - exclamationLineWidth / 2 + 0.5 + "", centerY + radius - unit_converter_1.UnitConverter.twipsToPixelsF(this.size / 4) + "", exclamationLineWidth + "", exclamationLineWidth + ""),
            new RectaglePrimitive_1.RectanglePrimitive(centerX - exclamationLineWidth / 2 + 0.5 + "", centerY - radius + unit_converter_1.UnitConverter.twipsToPixelsF(this.size / 4) - exclamationLineWidth + "", exclamationLineWidth + "", radius + "")
        ], this.className);
    };
    ShapeImageIndicator.prototype.onBeforeDispose = function () {
        if (this.animationRequestId)
            cancelAnimationFrame(this.animationRequestId);
        this.animationStarted = false;
    };
    return ShapeImageIndicator;
}());
exports.ShapeImageIndicator = ShapeImageIndicator;
//# sourceMappingURL=ShapeImageIndicator.js.map