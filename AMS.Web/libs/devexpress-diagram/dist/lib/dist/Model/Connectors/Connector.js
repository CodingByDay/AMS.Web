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
exports.Connector = exports.CONNECTOR_DEFAULT_TEXT_POSITION = exports.ConnectorPosition = void 0;
var unit_converter_1 = require("@devexpress/utils/lib/class/unit-converter");
var rectangle_1 = require("@devexpress/utils/lib/geometry/rectangle");
var segment_1 = require("@devexpress/utils/lib/geometry/segment");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var CanvasManagerBase_1 = require("../../../src/Render/CanvasManagerBase");
var NativeItem_1 = require("../../Api/NativeItem");
var Event_1 = require("../../Events/Event");
var ITextMeasurer_1 = require("../../Render/Measurer/ITextMeasurer");
var PathPrimitive_1 = require("../../Render/Primitives/PathPrimitive");
var TextPrimitive_1 = require("../../Render/Primitives/TextPrimitive");
var Utils_1 = require("../../Render/Utils");
var Settings_1 = require("../../Settings");
var Utils_2 = require("../../Utils");
var DiagramItem_1 = require("../DiagramItem");
var ModelUtils_1 = require("../ModelUtils");
var ConnectorPointsCalculator_1 = require("./Calculators/ConnectorPointsCalculator");
var ConnectorPointsOrthogonalCalculator_1 = require("./Calculators/ConnectorPointsOrthogonalCalculator");
var ConnectorLineEndingStrategies_1 = require("./ConnectorLineEndingStrategies");
var ConnectorProperties_1 = require("./ConnectorProperties");
var ConnectorTexts_1 = require("./ConnectorTexts");
var ConnectorRenderPointsContext_1 = require("./Routing/ConnectorRenderPointsContext");
var ConnectorPosition;
(function (ConnectorPosition) {
    ConnectorPosition[ConnectorPosition["Begin"] = 0] = "Begin";
    ConnectorPosition[ConnectorPosition["End"] = 1] = "End";
})(ConnectorPosition = exports.ConnectorPosition || (exports.ConnectorPosition = {}));
exports.CONNECTOR_DEFAULT_TEXT_POSITION = 0.5;
var Connector = (function (_super) {
    __extends(Connector, _super);
    function Connector(points) {
        var _this = _super.call(this) || this;
        _this.beginConnectionPointIndex = -1;
        _this.endConnectionPointIndex = -1;
        _this.properties = new ConnectorProperties_1.ConnectorProperties();
        _this.points = points.map(function (pt) { return pt.clone(); });
        if (points.length < 2)
            throw Error("Points count should be greater than 1");
        _this.texts = new ConnectorTexts_1.ConnectorTexts();
        return _this;
    }
    Object.defineProperty(Connector.prototype, "rectangle", {
        get: function () {
            return Utils_2.GeometryUtils.createRectagle(this.getRenderPoints(true));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Connector.prototype, "skippedRenderPoints", {
        get: function () {
            return this.renderPoints ? this.renderPoints.filter(function (p) { return p.skipped; }) : undefined;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Connector.prototype, "shouldChangeRenderPoints", {
        get: function () {
            return this.renderPoints !== undefined && this.routingStrategy !== undefined;
        },
        enumerable: false,
        configurable: true
    });
    Connector.prototype.assign = function (item) {
        _super.prototype.assign.call(this, item);
        item.beginItem = this.beginItem;
        item.beginConnectionPointIndex = this.beginConnectionPointIndex;
        item.endItem = this.endItem;
        item.endConnectionPointIndex = this.endConnectionPointIndex;
        item.properties = this.properties.clone();
        item.texts = this.texts.clone();
        if (this.routingStrategy !== undefined)
            item.routingStrategy = this.routingStrategy.clone();
        if (this.renderPoints !== undefined)
            item.renderPoints = this.renderPoints.map(function (p) { return p.clone(); });
        if (this.renderPointsWithoutSkipped !== undefined)
            item.renderPointsWithoutSkipped = this.renderPointsWithoutSkipped.map(function (p) { return p.clone(); });
        if (this.actualRoutingMode !== undefined)
            item.actualRoutingMode = this.actualRoutingMode;
        if (this.lockCreateRenderPoints !== undefined)
            item.lockCreateRenderPoints = this.lockCreateRenderPoints;
        if (this.shouldInvalidateRenderPoints !== undefined)
            item.shouldInvalidateRenderPoints = this.shouldInvalidateRenderPoints;
    };
    Connector.prototype.clone = function () {
        var clone = new Connector(this.points);
        this.assign(clone);
        return clone;
    };
    Connector.prototype.getTextCount = function () {
        return this.texts.count();
    };
    Connector.prototype.getText = function (position) {
        if (position === void 0) { position = exports.CONNECTOR_DEFAULT_TEXT_POSITION; }
        var textObj = this.texts.get(position);
        return textObj ? textObj.value : "";
    };
    Connector.prototype.setText = function (text, position) {
        if (position === void 0) { position = exports.CONNECTOR_DEFAULT_TEXT_POSITION; }
        if (!text || text === "")
            this.texts.remove(position);
        else
            this.texts.set(position, new ConnectorTexts_1.ConnectorText(position, text));
    };
    Connector.prototype.getTextPoint = function (position) {
        var points = this.getRenderPoints();
        return Utils_2.GeometryUtils.getPathPointByPosition(points, position)[0];
    };
    Connector.prototype.getTextPositionByPoint = function (point) {
        var points = this.getRenderPoints();
        var length = Utils_2.GeometryUtils.getPathLength(points);
        var pos = Utils_2.GeometryUtils.getPathPositionByPoint(points, point);
        var minTextHeight = unit_converter_1.UnitConverter.pointsToTwips(parseInt(this.styleText["font-size"]));
        if (minTextHeight > pos * length)
            return minTextHeight / length;
        if (minTextHeight > length - pos * length)
            return (length - minTextHeight) / length;
        return pos;
    };
    Connector.prototype.getTextRectangle = function (position) {
        return rectangle_1.Rectangle.fromGeometry(this.getTextPoint(position), new size_1.Size(0, 0));
    };
    Connector.prototype.changeRoutingStrategy = function (strategy) {
        this.routingStrategy = strategy;
        this.invalidateRenderPoints();
    };
    Connector.prototype.clearRoutingStrategy = function () {
        delete this.routingStrategy;
        delete this.renderPoints;
        delete this.renderPointsWithoutSkipped;
        delete this.lockCreateRenderPoints;
        delete this.actualRoutingMode;
        delete this.shouldInvalidateRenderPoints;
        this.invalidateRenderPoints();
    };
    Connector.prototype.getCustomRenderPoints = function (keepSkipped) {
        if (keepSkipped === void 0) { keepSkipped = false; }
        var renderPoints = this.getRenderPoints(keepSkipped);
        var result = [];
        renderPoints.forEach(function (p, index) {
            if (index > 0 && index < renderPoints.length - 1)
                result.push(p);
        });
        return result;
    };
    Connector.prototype.getRenderPoints = function (keepSkipped) {
        if (keepSkipped === void 0) { keepSkipped = false; }
        if (this.shouldInvalidateRenderPoints === undefined || this.shouldInvalidateRenderPoints) {
            this.shouldInvalidateRenderPoints = false;
            if (!this.routingStrategy)
                this.changeRenderPoints(this.getCalculator().getPoints());
            else if (!this.lockCreateRenderPoints) {
                this.changeRenderPoints(new ConnectorPointsOrthogonalCalculator_1.ConnectorPointsOrthogonalCalculator(this).getPoints());
                if (this.actualRoutingMode !== Settings_1.ConnectorRoutingMode.None && this.points && this.renderPoints) {
                    var beginPoint = this.points[0];
                    var endPoint = this.points[this.points.length - 1];
                    if (!beginPoint.equals(endPoint)) {
                        var newRenderPoints = this.routingStrategy.createRenderPoints(this.points, this.renderPoints, this.beginItem, this.endItem, this.beginConnectionPointIndex, this.endConnectionPointIndex, ModelUtils_1.ModelUtils.getConnectorContainer(this));
                        if (newRenderPoints) {
                            this.changeRenderPoints(newRenderPoints);
                            this.actualRoutingMode = Settings_1.ConnectorRoutingMode.AllShapesOnly;
                        }
                        else
                            this.actualRoutingMode = Settings_1.ConnectorRoutingMode.None;
                    }
                }
            }
        }
        return keepSkipped ? this.renderPoints : this.renderPointsWithoutSkipped;
    };
    Connector.prototype.tryCreateRenderPointsContext = function (forceCreate) {
        return forceCreate || this.shouldChangeRenderPoints ? new ConnectorRenderPointsContext_1.ConnectorRenderPointsContext(this.renderPoints.map(function (p) { return p.clone(); }), this.lockCreateRenderPoints, this.actualRoutingMode) : undefined;
    };
    Connector.prototype.updatePointsOnPageResize = function (offsetX, offsetY) {
        this.points = this.points.map(function (p) { return p.clone().offset(offsetX, offsetY); });
        if (this.renderPoints)
            this.changeRenderPoints(this.renderPoints.map(function (p) {
                var result = p.clone().offset(offsetX, offsetY);
                result.pointIndex = p.pointIndex;
                result.skipped = p.skipped;
                return result;
            }));
    };
    Connector.prototype.addPoint = function (pointIndex, point) {
        this.points.splice(pointIndex, 0, point);
    };
    Connector.prototype.deletePoint = function (pointIndex) {
        this.points.splice(pointIndex, 1);
    };
    Connector.prototype.movePoint = function (pointIndex, point) {
        this.points[pointIndex] = point;
    };
    Connector.prototype.onAddPoint = function (pointIndex, point) {
        if (this.shouldChangeRenderPoints)
            this.replaceRenderPointsCore(this.routingStrategy.onAddPoint(this.points, pointIndex, point, this.renderPoints), true, Settings_1.ConnectorRoutingMode.AllShapesOnly);
        else
            this.invalidateRenderPoints();
    };
    Connector.prototype.onDeletePoint = function (pointIndex) {
        if (this.shouldChangeRenderPoints)
            this.replaceRenderPointsCore(this.routingStrategy.onDeletePoint(this.points, pointIndex, this.renderPoints), this.points.length > 2, Settings_1.ConnectorRoutingMode.AllShapesOnly);
        else
            this.invalidateRenderPoints();
    };
    Connector.prototype.onMovePoint = function (pointIndex, point) {
        if (this.shouldChangeRenderPoints) {
            if (pointIndex === 0 || pointIndex === this.points.length - 1)
                this.lockCreateRenderPoints = false;
            this.replaceRenderPointsCore(this.routingStrategy.onMovePoint(this.points, pointIndex, point, this.renderPoints), this.lockCreateRenderPoints, Settings_1.ConnectorRoutingMode.AllShapesOnly);
        }
        else
            this.invalidateRenderPoints();
    };
    Connector.prototype.onMovePoints = function (beginPointIndex, beginPoint, lastPointIndex, lastPoint) {
        if (this.shouldChangeRenderPoints) {
            if (beginPointIndex === 0 || lastPointIndex === this.points.length - 1)
                this.lockCreateRenderPoints = false;
            this.replaceRenderPointsCore(this.routingStrategy.onMovePoints(this.points, beginPointIndex, beginPoint, lastPointIndex, lastPoint, this.renderPoints), this.lockCreateRenderPoints, Settings_1.ConnectorRoutingMode.AllShapesOnly);
        }
        else
            this.invalidateRenderPoints();
    };
    Connector.prototype.replaceRenderPoints = function (context) {
        if (context !== undefined)
            this.replaceRenderPointsCore(context.renderPoints, context.lockCreateRenderPoints, context.actualRoutingMode);
        else
            this.invalidateRenderPoints();
    };
    Connector.prototype.clearRenderPoints = function () {
        this.changeRenderPoints(undefined);
        this.lockCreateRenderPoints = false;
        this.actualRoutingMode = undefined;
        this.invalidateRenderPoints();
    };
    Connector.prototype.replaceRenderPointsCore = function (renderPoints, lockCreateRenderPoints, mode) {
        this.changeRenderPoints(renderPoints);
        this.lockCreateRenderPoints = lockCreateRenderPoints;
        this.actualRoutingMode = mode;
        this.invalidateRenderPoints();
    };
    Connector.prototype.changeRenderPoints = function (renderPoints) {
        this.renderPoints = renderPoints;
        this.renderPointsWithoutSkipped = renderPoints ? this.renderPoints.filter(function (pt) { return !pt.skipped; }) : undefined;
    };
    Connector.prototype.getCalculator = function () {
        return (this.properties.lineOption === ConnectorProperties_1.ConnectorLineOption.Straight) ?
            new ConnectorPointsCalculator_1.ConnectorPointsCalculator(this) :
            new ConnectorPointsOrthogonalCalculator_1.ConnectorPointsOrthogonalCalculator(this);
    };
    Connector.prototype.invalidateRenderPoints = function () {
        this.shouldInvalidateRenderPoints = true;
    };
    Connector.prototype.createPrimitives = function (instanceId) {
        var result = [];
        var points = this.getRenderPoints();
        var path = new PathPrimitive_1.PathPrimitive(points.map(function (pt, index) {
            return index === 0 ? new PathPrimitive_1.PathPrimitiveMoveToCommand(pt.x, pt.y) : new PathPrimitive_1.PathPrimitiveLineToCommand(pt.x, pt.y);
        }), this.style);
        result.push(path);
        result = result.concat(this.createLineEndingPrimitives(points, path));
        result = result.concat(this.createTextPrimitives(instanceId));
        return result;
    };
    Connector.prototype.createLineEndingPrimitives = function (points, connectorPath) {
        var result = [];
        if (points.length > 1) {
            var lineEndingInfo = [
                { strategy: this.createLineEndingStrategy(this.properties.startLineEnding), point1: points[0], point2: points[1] },
                { strategy: this.createLineEndingStrategy(this.properties.endLineEnding), point1: points[points.length - 1], point2: points[points.length - 2] }
            ];
            lineEndingInfo.forEach(function (info) {
                var strategy = info.strategy;
                if (strategy.hasCommands()) {
                    var lineEndingPath = connectorPath;
                    if (strategy.needCreateSeparatePrimitive())
                        result.push(lineEndingPath = strategy.createPrimitive());
                    lineEndingPath.commands = lineEndingPath.commands.concat(strategy.createCommands(info.point1, info.point2));
                }
            });
        }
        return result;
    };
    Connector.prototype.createLineEndingStrategy = function (lineEnding) {
        switch (lineEnding) {
            case ConnectorProperties_1.ConnectorLineEnding.None:
                return new ConnectorLineEndingStrategies_1.ConnectorLineEndingNoneStrategy(this.style);
            case ConnectorProperties_1.ConnectorLineEnding.Arrow:
                return new ConnectorLineEndingStrategies_1.ConnectorLineEndingArrowStrategy(this.style);
            case ConnectorProperties_1.ConnectorLineEnding.OutlinedTriangle:
                return new ConnectorLineEndingStrategies_1.ConnectorLineEndingOutlinedTriangleStrategy(this.style);
            case ConnectorProperties_1.ConnectorLineEnding.FilledTriangle:
                return new ConnectorLineEndingStrategies_1.ConnectorLineEndingFilledTriangleStrategy(this.style);
            default:
                return new ConnectorLineEndingStrategies_1.ConnectorLineEndingStrategy(this.style);
        }
    };
    Connector.prototype.createSelectorPrimitives = function () {
        var result = [];
        var points = this.getRenderPoints();
        result.push(new PathPrimitive_1.PathPrimitive(points.map(function (pt, index) {
            if (index === 0)
                return new PathPrimitive_1.PathPrimitiveMoveToCommand(pt.x, pt.y);
            else
                return new PathPrimitive_1.PathPrimitiveLineToCommand(pt.x, pt.y);
        }), null, "selector"));
        return result;
    };
    Connector.prototype.createTextPrimitives = function (instanceId) {
        var _this = this;
        if (!this.enableText)
            return [];
        var result = [];
        this.texts.forEach(function (textObj) {
            var text = _this.getText(textObj.position);
            if (text && text !== "") {
                var pt = _this.getTextPoint(textObj.position);
                result = result.concat([
                    new TextPrimitive_1.TextPrimitive(pt.x, pt.y, text, ITextMeasurer_1.TextOwner.Connector, undefined, undefined, undefined, _this.styleText, true, null, CanvasManagerBase_1.PAGE_BG_TEXTFLOOR_FILTER_IDPREFIX + instanceId, undefined, function (el) {
                        Utils_1.RenderUtils.setElementEventData(el, Event_1.MouseEventElementType.ConnectorText, _this.key, textObj.position);
                    })
                ]);
            }
        });
        return result;
    };
    Connector.prototype.getExtremeItem = function (position) {
        if (position === ConnectorPosition.Begin)
            return this.beginItem;
        if (position === ConnectorPosition.End)
            return this.endItem;
        return null;
    };
    Connector.prototype.getExtremeConnectionPointIndex = function (position) {
        if (position === ConnectorPosition.Begin)
            return this.beginConnectionPointIndex;
        if (position === ConnectorPosition.End)
            return this.endConnectionPointIndex;
        return -1;
    };
    Connector.prototype.getMinX = function () {
        var points = this.getRenderPoints();
        var xarr = points.map(function (p) { return p.x; });
        return xarr.reduce(function (prev, cur) { return Math.min(prev, cur); }, Number.MAX_VALUE);
    };
    Connector.prototype.getMinY = function () {
        var points = this.getRenderPoints();
        var yarr = points.map(function (p) { return p.y; });
        return yarr.reduce(function (prev, cur) { return Math.min(prev, cur); }, Number.MAX_VALUE);
    };
    Connector.prototype.getConnectionPoints = function () {
        return [];
    };
    Connector.prototype.getConnectionPointSide = function (point, targetPoint) {
        return DiagramItem_1.ConnectionPointSide.Undefined;
    };
    Connector.prototype.getSegments = function () {
        var result = [];
        var renderPoints = this.getRenderPoints();
        renderPoints.forEach(function (pt, index) {
            if (index > 0)
                result.push(new segment_1.Segment(renderPoints[index - 1], pt));
        });
        return result;
    };
    Connector.prototype.intersectedByRect = function (rect) {
        return this.getSegments().some(function (s) { return s.isIntersectedByRect(rect); });
    };
    Connector.prototype.toNative = function (units) {
        var item = new NativeItem_1.NativeConnector(this.key, this.dataKey);
        item.fromKey = this.beginItem && this.beginItem.dataKey;
        item.toKey = this.endItem && this.endItem.dataKey;
        item.texts = this.texts.map(function (t) { return t; }).sort(function (a, b) { return a.position - b.position; }).map(function (a) { return a.value; });
        item.fromId = this.beginItem && this.beginItem.key;
        item.fromPointIndex = this.beginConnectionPointIndex;
        item.toId = this.endItem && this.endItem.key;
        item.toPointIndex = this.endConnectionPointIndex;
        item.points = this.points.map(function (pt) { return pt.clone(); });
        item.applyUnits(units);
        return item;
    };
    Connector.minOffset = unit_converter_1.UnitConverter.pixelsToTwips(24);
    Connector.minTextHeight = unit_converter_1.UnitConverter.pixelsToTwips(12);
    return Connector;
}(DiagramItem_1.DiagramItem));
exports.Connector = Connector;
//# sourceMappingURL=Connector.js.map