"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeDescription = exports.ShapeTextPadding = exports.ShapeDefaultSize = exports.ShapeMinDimension = exports.ShapeDefaultDimension = void 0;
var unit_converter_1 = require("@devexpress/utils/lib/class/unit-converter");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var LocalizationService_1 = require("../../../LocalizationService");
var ITextMeasurer_1 = require("../../../Render/Measurer/ITextMeasurer");
var RectaglePrimitive_1 = require("../../../Render/Primitives/RectaglePrimitive");
var TextPrimitive_1 = require("../../../Render/Primitives/TextPrimitive");
var Utils_1 = require("../../../Utils");
var ConnectionPoint_1 = require("../../ConnectionPoint");
var DiagramItem_1 = require("../../DiagramItem");
exports.ShapeDefaultDimension = 1440;
exports.ShapeMinDimension = 360;
exports.ShapeDefaultSize = new size_1.Size(exports.ShapeDefaultDimension, exports.ShapeDefaultDimension);
exports.ShapeTextPadding = unit_converter_1.UnitConverter.pixelsToTwips(10);
var ShapeDescription = (function () {
    function ShapeDescription(defaultSize, hasDefaultText) {
        if (defaultSize === void 0) { defaultSize = exports.ShapeDefaultSize.clone(); }
        this.defaultSize = defaultSize;
        this.hasDefaultText = hasDefaultText;
        this.onChanged = new Utils_1.EventDispatcher();
        this.connectionPoints = this.createConnectionPoints();
    }
    Object.defineProperty(ShapeDescription.prototype, "enableText", {
        get: function () { return true; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShapeDescription.prototype, "allowEditText", {
        get: function () { return true; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShapeDescription.prototype, "enableImage", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShapeDescription.prototype, "allowEditImage", {
        get: function () { return true; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShapeDescription.prototype, "hasTemplate", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShapeDescription.prototype, "enableChildren", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShapeDescription.prototype, "minWidth", {
        get: function () { return undefined; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShapeDescription.prototype, "minHeight", {
        get: function () { return undefined; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShapeDescription.prototype, "maxWidth", {
        get: function () { return undefined; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShapeDescription.prototype, "maxHeight", {
        get: function () { return undefined; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShapeDescription.prototype, "toolboxSize", {
        get: function () { return this.defaultSize; },
        enumerable: false,
        configurable: true
    });
    ShapeDescription.prototype.getTitle = function () {
        return LocalizationService_1.DiagramLocalizationService.shapeTexts[this.key];
    };
    ShapeDescription.prototype.getDefaultText = function () {
        return this.hasDefaultText ? LocalizationService_1.DiagramLocalizationService.shapeTexts[this.key] : "";
    };
    ShapeDescription.prototype.getDefaultImageUrl = function () {
        return "";
    };
    ShapeDescription.prototype.getConnectionPoints = function () {
        return this.connectionPoints;
    };
    ShapeDescription.prototype.createConnectionPoints = function () {
        return [
            new ConnectionPoint_1.ConnectionPoint(0.5, 0, DiagramItem_1.ConnectionPointSide.North),
            new ConnectionPoint_1.ConnectionPoint(1, 0.5, DiagramItem_1.ConnectionPointSide.East),
            new ConnectionPoint_1.ConnectionPoint(0.5, 1, DiagramItem_1.ConnectionPointSide.South),
            new ConnectionPoint_1.ConnectionPoint(0, 0.5, DiagramItem_1.ConnectionPointSide.West)
        ];
    };
    ShapeDescription.prototype.processConnectionPoint = function (shape, point) {
    };
    ShapeDescription.prototype.getConnectionPointIndexForItem = function (item, connectionPointIndex) {
        return connectionPointIndex;
    };
    ShapeDescription.prototype.getConnectionPointIndexForSide = function (side) {
        return side;
    };
    ShapeDescription.getConnectionPointSideByGeometry = function (point) {
        if (point.x >= point.y && (point.x > 0 || point.y > 0)) {
            if (point.x < 0.5 || (1 - point.x) >= point.y)
                return DiagramItem_1.ConnectionPointSide.North;
            return DiagramItem_1.ConnectionPointSide.East;
        }
        else {
            if (point.x > 0.5 || (1 - point.x) <= point.y)
                return DiagramItem_1.ConnectionPointSide.South;
            return DiagramItem_1.ConnectionPointSide.West;
        }
    };
    ShapeDescription.prototype.createParameters = function (parameters) {
    };
    ShapeDescription.prototype.normalizeParameters = function (shape, parameters) {
    };
    ShapeDescription.prototype.modifyParameters = function (shape, parameters, deltaX, deltaY) {
        throw Error("Not implemented");
    };
    ShapeDescription.prototype.changeParameterValue = function (parameters, key, change) {
        var p = parameters.get(key);
        p.value = change(p);
    };
    ShapeDescription.prototype.getParameterPoints = function (shape) {
        return [];
    };
    ShapeDescription.prototype.getExpandedSize = function (shape) {
        return shape.size;
    };
    ShapeDescription.prototype.getCollapsedSize = function (shape) {
        return shape.size;
    };
    ShapeDescription.prototype.getToolboxHeightToWidthRatio = function (width, height) {
        return height / width;
    };
    ShapeDescription.prototype.allowResizeHorizontally = function (_shape) {
        return true;
    };
    ShapeDescription.prototype.allowResizeVertically = function (_shape) {
        return true;
    };
    ShapeDescription.prototype.createPrimitives = function (shape, instanceId, forToolbox) {
        var primitives = [];
        primitives = primitives.concat(this.createShapePrimitives(shape, forToolbox));
        if (this.enableImage)
            primitives = primitives.concat(this.createImagePrimitives(shape, forToolbox));
        if (this.enableText)
            primitives = primitives.concat(this.createTextPrimitives(shape, forToolbox));
        return primitives;
    };
    ShapeDescription.prototype.createImagePrimitives = function (_shape, _forToolbox) {
        return [];
    };
    ShapeDescription.prototype.createTextPrimitives = function (shape, forToolbox) {
        if (shape.text === undefined || shape.text === "")
            return [];
        var rect = this.getTextRectangle(shape);
        return [
            new TextPrimitive_1.TextPrimitive(rect.x, rect.y, shape.text, ITextMeasurer_1.TextOwner.Shape, rect.width, rect.height, ShapeDescription.textSpacing, shape.styleText, false, this.getTextClipPathId(forToolbox), undefined, this.getTextAngle())
        ];
    };
    ShapeDescription.prototype.getTextClipPathId = function (_forToolbox) {
        return undefined;
    };
    ShapeDescription.prototype.getTextAngle = function () {
        return TextPrimitive_1.TextAngle.Angle0deg;
    };
    ShapeDescription.prototype.getClientRectangle = function (shape) {
        return shape.rectangle;
    };
    ShapeDescription.prototype.getTextEditRectangle = function (shape) {
        return this.getTextRectangle(shape);
    };
    ShapeDescription.prototype.createSelectorPrimitives = function (shape) {
        return [
            new RectaglePrimitive_1.RectanglePrimitive(shape.position.x, shape.position.y, shape.size.width, shape.size.height, null, "selector")
        ];
    };
    ShapeDescription.prototype.raiseShapeDescriptionChanged = function (description) {
        this.onChanged.raise1(function (l) { return l.notifyShapeDescriptionChanged(description); });
    };
    ShapeDescription.textSpacing = unit_converter_1.UnitConverter.pixelsToTwips(2);
    return ShapeDescription;
}());
exports.ShapeDescription = ShapeDescription;
//# sourceMappingURL=ShapeDescription.js.map