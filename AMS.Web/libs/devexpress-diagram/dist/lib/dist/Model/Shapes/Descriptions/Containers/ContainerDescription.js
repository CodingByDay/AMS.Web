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
exports.ContainerDescription = exports.CONTAINER_EXPAND_BUTTON_SIGN_RATIO = exports.CONTAINER_EXPAND_BUTTON_RECT_RATIO = exports.CONTAINER_HEADER_TOOLBOX_SIZE_RATIO = exports.CONTAINER_HEADER_SIZE = void 0;
var ShapeDescription_1 = require("../ShapeDescription");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var ShapeTypes_1 = require("../../ShapeTypes");
var RectaglePrimitive_1 = require("../../../../Render/Primitives/RectaglePrimitive");
var PathPrimitive_1 = require("../../../../Render/Primitives/PathPrimitive");
var Utils_1 = require("../../../../Render/Utils");
var Event_1 = require("../../../../Events/Event");
var GroupPrimitive_1 = require("../../../../Render/Primitives/GroupPrimitive");
var ConnectionPoint_1 = require("../../../ConnectionPoint");
var DiagramItem_1 = require("../../../DiagramItem");
var LocalizationService_1 = require("../../../../LocalizationService");
exports.CONTAINER_HEADER_SIZE = 360;
exports.CONTAINER_HEADER_TOOLBOX_SIZE_RATIO = 0.2;
exports.CONTAINER_EXPAND_BUTTON_RECT_RATIO = 0.5;
exports.CONTAINER_EXPAND_BUTTON_SIGN_RATIO = 0.3;
var ContainerDescription = (function (_super) {
    __extends(ContainerDescription, _super);
    function ContainerDescription(defaultSize) {
        if (defaultSize === void 0) { defaultSize = new size_1.Size(ShapeDescription_1.ShapeDefaultDimension * 2, ShapeDescription_1.ShapeDefaultDimension * 1.5); }
        return _super.call(this, defaultSize, true) || this;
    }
    Object.defineProperty(ContainerDescription.prototype, "enableChildren", {
        get: function () { return true; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContainerDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    ContainerDescription.prototype.getDefaultText = function () {
        return LocalizationService_1.DiagramLocalizationService.shapeTexts[ShapeTypes_1.ShapeTypes.Container];
    };
    ContainerDescription.prototype.createConnectionPoints = function () {
        return [
            new ConnectionPoint_1.ConnectionPoint(0.25, 0, DiagramItem_1.ConnectionPointSide.North),
            new ConnectionPoint_1.ConnectionPoint(0.5, 0, DiagramItem_1.ConnectionPointSide.North),
            new ConnectionPoint_1.ConnectionPoint(0.75, 0, DiagramItem_1.ConnectionPointSide.North),
            new ConnectionPoint_1.ConnectionPoint(1, 0.25, DiagramItem_1.ConnectionPointSide.East),
            new ConnectionPoint_1.ConnectionPoint(1, 0.5, DiagramItem_1.ConnectionPointSide.East),
            new ConnectionPoint_1.ConnectionPoint(1, 0.75, DiagramItem_1.ConnectionPointSide.East),
            new ConnectionPoint_1.ConnectionPoint(0.75, 1, DiagramItem_1.ConnectionPointSide.South),
            new ConnectionPoint_1.ConnectionPoint(0.5, 1, DiagramItem_1.ConnectionPointSide.South),
            new ConnectionPoint_1.ConnectionPoint(0.25, 1, DiagramItem_1.ConnectionPointSide.South),
            new ConnectionPoint_1.ConnectionPoint(0, 0.75, DiagramItem_1.ConnectionPointSide.West),
            new ConnectionPoint_1.ConnectionPoint(0, 0.5, DiagramItem_1.ConnectionPointSide.West),
            new ConnectionPoint_1.ConnectionPoint(0, 0.25, DiagramItem_1.ConnectionPointSide.West)
        ];
    };
    ContainerDescription.prototype.getConnectionPointIndexForItem = function (item, connectionPointIndex) {
        var shapeConnectionPoints = item && item.getConnectionPoints();
        if (shapeConnectionPoints.length === 4)
            return connectionPointIndex * 3 + 1;
        return connectionPointIndex;
    };
    ContainerDescription.prototype.getConnectionPointIndexForSide = function (side) {
        return side * 3 + 1;
    };
    ContainerDescription.prototype.createShapePrimitives = function (shape, forToolbox) {
        var _a = shape.rectangle, left = _a.x, top = _a.y, width = _a.width, height = _a.height;
        var primitives = [];
        if (shape.expanded)
            primitives = primitives.concat([
                new RectaglePrimitive_1.RectanglePrimitive(left, top, width, height, shape.style)
            ]);
        return primitives.concat(this.createHeaderPrimitives(shape, forToolbox));
    };
    ContainerDescription.prototype.createExpandButtonPrimitives = function (shape, rect) {
        var commands = [
            new PathPrimitive_1.PathPrimitiveMoveToCommand(rect.x + rect.width * ((1 - exports.CONTAINER_EXPAND_BUTTON_SIGN_RATIO) / 2), rect.center.y),
            new PathPrimitive_1.PathPrimitiveLineToCommand(rect.x + rect.width * ((1 - exports.CONTAINER_EXPAND_BUTTON_SIGN_RATIO) / 2 + exports.CONTAINER_EXPAND_BUTTON_SIGN_RATIO), rect.center.y)
        ];
        if (!shape.expanded)
            commands = commands.concat([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(rect.center.x, rect.y + rect.height * ((1 - exports.CONTAINER_EXPAND_BUTTON_SIGN_RATIO) / 2)),
                new PathPrimitive_1.PathPrimitiveLineToCommand(rect.center.x, rect.y + rect.height * ((1 - exports.CONTAINER_EXPAND_BUTTON_SIGN_RATIO) / 2 + exports.CONTAINER_EXPAND_BUTTON_SIGN_RATIO)),
            ]);
        var buttonRect = rect.clone().inflate(-rect.width * (1 - exports.CONTAINER_EXPAND_BUTTON_RECT_RATIO) / 2, -rect.height * (1 - exports.CONTAINER_EXPAND_BUTTON_RECT_RATIO) / 2);
        return [
            new GroupPrimitive_1.GroupPrimitive([
                new RectaglePrimitive_1.RectanglePrimitive(buttonRect.x, buttonRect.y, buttonRect.width, buttonRect.height, shape.style),
                new PathPrimitive_1.PathPrimitive(commands, shape.style)
            ], "shape-expand-btn", null, null, function (el) {
                Utils_1.RenderUtils.setElementEventData(el, Event_1.MouseEventElementType.ShapeExpandButton, shape.key);
            })
        ];
    };
    return ContainerDescription;
}(ShapeDescription_1.ShapeDescription));
exports.ContainerDescription = ContainerDescription;
//# sourceMappingURL=ContainerDescription.js.map