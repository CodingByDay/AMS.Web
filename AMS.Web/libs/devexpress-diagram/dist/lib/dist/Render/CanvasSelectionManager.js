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
exports.CanvasSelectionManager = exports.ACTIVE_SELECTION_CSSCLASS = exports.SELECTION_ELEMENT_CLASSNAMES = void 0;
var CanvasManagerBase_1 = require("./CanvasManagerBase");
var GroupPrimitive_1 = require("./Primitives/GroupPrimitive");
var Utils_1 = require("./Utils");
var Event_1 = require("../Events/Event");
var DiagramItem_1 = require("../Model/DiagramItem");
var Utils_2 = require("../Utils");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var ExtensionLinesVisualizer_1 = require("../Events/Visualizers/ExtensionLinesVisualizer");
var Shape_1 = require("../Model/Shapes/Shape");
var Connector_1 = require("../Model/Connectors/Connector");
var ConnectorProperties_1 = require("../Model/Connectors/ConnectorProperties");
var RectaglePrimitive_1 = require("./Primitives/RectaglePrimitive");
var PathPrimitive_1 = require("./Primitives/PathPrimitive");
var TextPrimitive_1 = require("./Primitives/TextPrimitive");
var EllipsePrimitive_1 = require("./Primitives/EllipsePrimitive");
var Style_1 = require("../Model/Style");
var unit_converter_1 = require("@devexpress/utils/lib/class/unit-converter");
var ITextMeasurer_1 = require("./Measurer/ITextMeasurer");
var browser_1 = require("@devexpress/utils/lib/browser");
var dom_1 = require("@devexpress/utils/lib/utils/dom");
var CanvasItemsManager_1 = require("./CanvasItemsManager");
var CanvasManager_1 = require("./CanvasManager");
var metrics_1 = require("@devexpress/utils/lib/geometry/metrics");
var math_1 = require("@devexpress/utils/lib/utils/math");
var ModelUtils_1 = require("../Model/ModelUtils");
var MULTIPLE_SELECTION_KEY = "-1";
exports.SELECTION_ELEMENT_CLASSNAMES = {
    SELECTION_RECTANGLE: "selection-rect",
    CONNECTION_POINT: "connection-point",
    ACTIVE: "active",
    CONTAINER_TARGET: "container-target",
    CONNECTION_TARGET: "connection-target",
    EXTENSION_LINE: "extension-line",
    CONNECTION_MARK: "connection-mark",
    SELECTION_MARK: "selection-mark",
    LOCKED_SELECTION_MARK: "locked-selection-mark",
    ITEMS_SELECTION_RECT: "items-selection-rect",
    CONNECTOR_MULTI_SELECTION: "connector-multi-selection",
    CONNECTOR_SELECTION: "connector-selection",
    CONNECTOR_POINT_MARK: "connector-point-mark",
    CONNECTOR_SELECTION_MASK: "connector-selection-mask",
    CONNECTOR_SIDE_MARK: "connector-side-mark",
    ITEM_SELECTION_RECT: "item-selection-rect",
    ITEM_MULTI_SELECTION: "item-multi-selection-rect"
};
exports.ACTIVE_SELECTION_CSSCLASS = "dxdi-active-selection";
var CanvasSelectionManager = (function (_super) {
    __extends(CanvasSelectionManager, _super);
    function CanvasSelectionManager(parent, zoomLevel, readOnly, dom, instanceId) {
        var _this = _super.call(this, zoomLevel, dom, instanceId) || this;
        _this.readOnly = readOnly;
        _this.connectionPointElements = [];
        _this.extensionLineElements = [];
        _this.selectionMap = {};
        _this.parentContainer = parent;
        _this.initializeContainerElements(parent);
        return _this;
    }
    CanvasSelectionManager.prototype.initializeContainerElements = function (parent) {
        this.itemSelectionContainer = this.createAndChangePrimitiveElement(new GroupPrimitive_1.GroupPrimitive([], null), parent);
        this.visualizersContainer = this.createAndChangePrimitiveElement(new GroupPrimitive_1.GroupPrimitive([], null), parent);
        this.selectionMarksContainer = this.createAndChangePrimitiveElement(new GroupPrimitive_1.GroupPrimitive([], null), parent);
    };
    CanvasSelectionManager.prototype.clear = function () {
        Utils_1.RenderUtils.removeContent(this.itemSelectionContainer);
        Utils_1.RenderUtils.removeContent(this.selectionMarksContainer);
        Utils_1.RenderUtils.removeContent(this.visualizersContainer);
        this.selectionRectElement = undefined;
        this.resizeInfoElement = undefined;
        this.connectionPointElements = [];
        this.connectionTargetElement = undefined;
        this.containerTargetElement = undefined;
        this.extensionLineElements = [];
        this.selectionMap = {};
    };
    CanvasSelectionManager.prototype.showSelectionRect = function (rect) {
        dom_1.DomUtils.addClassName(this.parentContainer, exports.ACTIVE_SELECTION_CSSCLASS);
        var primitive = new RectaglePrimitive_1.RectanglePrimitive(rect.x, rect.y, rect.width, rect.height, Style_1.StrokeStyle.default1pxInstance, exports.SELECTION_ELEMENT_CLASSNAMES.SELECTION_RECTANGLE);
        var rectEl = this.getSelectionRectElement(primitive);
        this.changePrimitiveElement(primitive, rectEl);
    };
    CanvasSelectionManager.prototype.hideSelectionRect = function () {
        dom_1.DomUtils.removeClassName(this.parentContainer, exports.ACTIVE_SELECTION_CSSCLASS);
        if (this.selectionRectElement !== undefined)
            this.dom.changeByFunc(this.selectionRectElement, function (e) { return e.style.display = "none"; });
    };
    CanvasSelectionManager.prototype.getSelectionRectElement = function (primitive) {
        if (this.selectionRectElement !== undefined)
            this.dom.changeByFunc(this.selectionRectElement, function (e) { return e.style.display = ""; });
        else
            this.selectionRectElement = this.createPrimitiveElement(primitive, this.visualizersContainer);
        return this.selectionRectElement;
    };
    CanvasSelectionManager.prototype.showResizeInfo = function (point, text) {
        var rectPrimitive = new RectaglePrimitive_1.RectanglePrimitive(point.x, point.y, 0, 0, Style_1.StrokeStyle.default1pxInstance);
        var primitive = new GroupPrimitive_1.GroupPrimitive([
            rectPrimitive,
            new TextPrimitive_1.TextPrimitive(point.x, point.y, text, ITextMeasurer_1.TextOwner.Resize)
        ], "resize-info");
        var groupEl = this.getResizeInfoElement(primitive);
        this.changePrimitiveElement(primitive, groupEl);
        var textSize = this.dom.measurer.measureTextLine(text, null, ITextMeasurer_1.TextOwner.Resize).applyConverter(unit_converter_1.UnitConverter.pixelsToTwips);
        rectPrimitive.width = textSize.width + CanvasSelectionManager.resizeInfoTextOffset * 2;
        rectPrimitive.height = textSize.height + CanvasSelectionManager.resizeInfoTextOffset * 2;
        rectPrimitive.x = point.x - textSize.width / 2 - CanvasSelectionManager.resizeInfoTextOffset;
        rectPrimitive.y = point.y - textSize.height / 2 - CanvasSelectionManager.resizeInfoTextOffset;
        this.changePrimitiveElement(primitive, groupEl);
    };
    CanvasSelectionManager.prototype.hideResizeInfo = function () {
        if (this.resizeInfoElement !== undefined)
            this.dom.changeByFunc(this.resizeInfoElement, function (e) { return e.style.display = "none"; });
    };
    CanvasSelectionManager.prototype.getResizeInfoElement = function (primitive) {
        if (this.resizeInfoElement !== undefined)
            this.dom.changeByFunc(this.resizeInfoElement, function (e) { return e.style.display = ""; });
        else
            this.resizeInfoElement = this.createPrimitiveElement(primitive, this.visualizersContainer);
        return this.resizeInfoElement;
    };
    CanvasSelectionManager.prototype.getConnectionPointClassName = function (active, allowed) {
        var className = exports.SELECTION_ELEMENT_CLASSNAMES.CONNECTION_POINT;
        if (active)
            className += " " + exports.SELECTION_ELEMENT_CLASSNAMES.ACTIVE;
        if (!allowed)
            className += " " + CanvasItemsManager_1.NOT_VALID_CSSCLASS;
        return className;
    };
    CanvasSelectionManager.prototype.showConnectionPoint = function (index, point, key, value, active, allowed) {
        this.showConnectionPointCore(index * 2, point.x, point.y, CanvasSelectionManager.connectionPointLargeSize, CanvasSelectionManager.connectionPointLargeSize, Event_1.MouseEventElementType.ShapeConnectionPoint, key, value, exports.SELECTION_ELEMENT_CLASSNAMES.CONNECTION_POINT + " selector" + (!allowed ? " " + CanvasItemsManager_1.NOT_VALID_CSSCLASS : ""));
        this.showConnectionPointCore(index * 2 + 1, point.x, point.y, CanvasSelectionManager.connectionPointSmallSize, CanvasSelectionManager.connectionPointSmallSize, Event_1.MouseEventElementType.ShapeConnectionPoint, key, value, this.getConnectionPointClassName(active, allowed));
    };
    CanvasSelectionManager.prototype.showConnectionPointCore = function (index, cx, cy, rx, ry, type, key, value, className) {
        var primitive = new EllipsePrimitive_1.EllipsePrimitive(cx, cy, rx, ry, null, className, function (e) { return Utils_1.RenderUtils.setElementEventData(e, type, key, value); });
        var ellEl = this.getConnectionPointElement(primitive, index);
        this.changePrimitiveElement(primitive, ellEl);
    };
    CanvasSelectionManager.prototype.hideConnectionPoints = function () {
        for (var i = 0; i < this.connectionPointElements.length; i++)
            this.dom.changeByFunc(this.connectionPointElements[i], function (e) { return e.style.display = "none"; });
    };
    CanvasSelectionManager.prototype.getConnectionPointElement = function (primitive, index) {
        var ellEl = this.connectionPointElements[index];
        if (ellEl !== undefined)
            this.dom.changeByFunc(ellEl, function (e) { return e.style.display = ""; });
        else {
            ellEl = this.createPrimitiveElement(primitive, this.visualizersContainer);
            this.connectionPointElements[index] = ellEl;
        }
        return ellEl;
    };
    CanvasSelectionManager.prototype.showContainerTarget = function (index, targetRect) {
        var primitive = new RectaglePrimitive_1.RectanglePrimitive(targetRect.x, targetRect.y, targetRect.width, targetRect.height, null, exports.SELECTION_ELEMENT_CLASSNAMES.CONTAINER_TARGET);
        var rectEl = this.getContainerTargetElement(primitive);
        this.changePrimitiveElement(primitive, rectEl);
    };
    CanvasSelectionManager.prototype.hideContainerTarget = function () {
        if (this.containerTargetElement)
            this.dom.changeByFunc(this.containerTargetElement, function (e) { return e.style.display = "none"; });
    };
    CanvasSelectionManager.prototype.getContainerTargetElement = function (primitive) {
        if (this.containerTargetElement !== undefined)
            this.dom.changeByFunc(this.containerTargetElement, function (e) { return e.style.display = ""; });
        else
            this.containerTargetElement = this.createPrimitiveElement(primitive, this.itemSelectionContainer);
        return this.containerTargetElement;
    };
    CanvasSelectionManager.prototype.showConnectionTarget = function (index, targetRect) {
        var primitive = new RectaglePrimitive_1.RectanglePrimitive(targetRect.x, targetRect.y, targetRect.width, targetRect.height, null, exports.SELECTION_ELEMENT_CLASSNAMES.CONNECTION_TARGET);
        var rectEl = this.getConnectionTargetElement(primitive);
        this.changePrimitiveElement(primitive, rectEl);
    };
    CanvasSelectionManager.prototype.hideConnectionTarget = function () {
        if (this.connectionTargetElement)
            this.dom.changeByFunc(this.connectionTargetElement, function (e) { return e.style.display = "none"; });
    };
    CanvasSelectionManager.prototype.getConnectionTargetElement = function (primitive) {
        if (this.connectionTargetElement !== undefined)
            this.dom.changeByFunc(this.connectionTargetElement, function (e) { return e.style.display = ""; });
        else
            this.connectionTargetElement = this.createPrimitiveElement(primitive, this.itemSelectionContainer);
        return this.connectionTargetElement;
    };
    CanvasSelectionManager.prototype.showExtensionLine = function (index, type, startPoint, endPoint, text) {
        var className = exports.SELECTION_ELEMENT_CLASSNAMES.EXTENSION_LINE;
        if (type === ExtensionLinesVisualizer_1.ExtensionLineType.VerticalCenterAfter || type === ExtensionLinesVisualizer_1.ExtensionLineType.VerticalCenterBefore ||
            type === ExtensionLinesVisualizer_1.ExtensionLineType.HorizontalCenterAbove || type === ExtensionLinesVisualizer_1.ExtensionLineType.HorizontalCenterBelow)
            className += " center";
        if (type === ExtensionLinesVisualizer_1.ExtensionLineType.VerticalCenterToPageCenter || type === ExtensionLinesVisualizer_1.ExtensionLineType.HorizontalCenterToPageCenter ||
            type === ExtensionLinesVisualizer_1.ExtensionLineType.LeftToPageCenter || type === ExtensionLinesVisualizer_1.ExtensionLineType.RightToPageCenter ||
            type === ExtensionLinesVisualizer_1.ExtensionLineType.TopToPageCenter || type === ExtensionLinesVisualizer_1.ExtensionLineType.BottomToPageCenter)
            className += " page";
        var x1_1 = 0;
        var y1_1 = 0;
        var x1_2 = 0;
        var y1_2 = 0;
        var x2_1 = 0;
        var y2_1 = 0;
        var x2_2 = 0;
        var y2_2 = 0;
        if (startPoint.y === endPoint.y) {
            x1_1 = startPoint.x - CanvasSelectionManager.extensionLineWidth;
            y1_1 = startPoint.y - CanvasSelectionManager.extensionLineEndingSize;
            x1_2 = startPoint.x - CanvasSelectionManager.extensionLineWidth;
            y1_2 = startPoint.y + CanvasSelectionManager.extensionLineEndingSize;
            x2_1 = endPoint.x - CanvasSelectionManager.extensionLineWidth;
            y2_1 = startPoint.y - CanvasSelectionManager.extensionLineEndingSize;
            x2_2 = endPoint.x - CanvasSelectionManager.extensionLineWidth;
            y2_2 = startPoint.y + CanvasSelectionManager.extensionLineEndingSize;
        }
        else if (startPoint.x === endPoint.x) {
            x1_1 = startPoint.x - CanvasSelectionManager.extensionLineEndingSize;
            y1_1 = startPoint.y - CanvasSelectionManager.extensionLineWidth;
            x1_2 = startPoint.x + CanvasSelectionManager.extensionLineEndingSize;
            y1_2 = startPoint.y - CanvasSelectionManager.extensionLineWidth;
            x2_1 = startPoint.x - CanvasSelectionManager.extensionLineEndingSize;
            y2_1 = endPoint.y - CanvasSelectionManager.extensionLineWidth;
            x2_2 = startPoint.x + CanvasSelectionManager.extensionLineEndingSize;
            y2_2 = endPoint.y - CanvasSelectionManager.extensionLineWidth;
        }
        var sizeLineXCorr = 0;
        var sizeLineYCorr = 0;
        if (type === ExtensionLinesVisualizer_1.ExtensionLineType.RightToRightAbove || type === ExtensionLinesVisualizer_1.ExtensionLineType.RightToRightBelow)
            sizeLineXCorr -= CanvasSelectionManager.extensionLineWidth;
        if (type === ExtensionLinesVisualizer_1.ExtensionLineType.BottomToBottomAfter || type === ExtensionLinesVisualizer_1.ExtensionLineType.BottomToBottomBefore)
            sizeLineYCorr -= CanvasSelectionManager.extensionLineWidth;
        var children = [
            new PathPrimitive_1.PathPrimitive([
                PathPrimitive_1.PathPrimitiveMoveToCommand.fromPoint(startPoint.clone().offset(sizeLineXCorr, sizeLineYCorr)),
                PathPrimitive_1.PathPrimitiveLineToCommand.fromPoint(endPoint.clone().offset(sizeLineXCorr, sizeLineYCorr))
            ], Style_1.StrokeStyle.default1pxInstance, "size-line"),
            new PathPrimitive_1.PathPrimitive([
                new PathPrimitive_1.PathPrimitiveMoveToCommand(x1_1, y1_1),
                new PathPrimitive_1.PathPrimitiveLineToCommand(x1_2, y1_2),
                new PathPrimitive_1.PathPrimitiveMoveToCommand(x2_1, y2_1),
                new PathPrimitive_1.PathPrimitiveLineToCommand(x2_2, y2_2)
            ], Style_1.StrokeStyle.default1pxInstance),
            new TextPrimitive_1.TextPrimitive((endPoint.x + startPoint.x) / 2, (endPoint.y + startPoint.y) / 2, text, ITextMeasurer_1.TextOwner.ExtensionLine, undefined, undefined, undefined, null, undefined, null, CanvasManagerBase_1.PAGE_BG_TEXTFLOOR_FILTER_IDPREFIX + this.instanceId)
        ];
        var primitive = new GroupPrimitive_1.GroupPrimitive(children, className);
        var ellEl = this.getExtensionLineElement(primitive, index);
        this.changePrimitiveElement(primitive, ellEl);
    };
    CanvasSelectionManager.prototype.hideExtensionLines = function () {
        for (var i = 0; i < this.extensionLineElements.length; i++)
            if (this.extensionLineElements[i])
                this.dom.changeByFunc(this.extensionLineElements[i], function (e) { return e.style.display = "none"; });
    };
    CanvasSelectionManager.prototype.getExtensionLineElement = function (primitive, index) {
        var ellEl = this.extensionLineElements[index];
        if (ellEl !== undefined)
            this.dom.changeByFunc(ellEl, function (e) { return e.style.display = ""; });
        else {
            ellEl = this.createPrimitiveElement(primitive, this.visualizersContainer);
            this.extensionLineElements[index] = (ellEl);
        }
        return ellEl;
    };
    CanvasSelectionManager.prototype.getOrCreateShapeSelection = function (shape, usedItems) {
        var element = this.selectionMap[shape.key];
        if (!element) {
            element = new ShapeSelectionElement(this.itemSelectionContainer, this.selectionMarksContainer, this.actualZoom, this.readOnly, this.dom, shape.key, shape.isLocked, shape.rectangle, shape.style, shape.allowResizeHorizontally, shape.allowResizeVertically, shape.description.getParameterPoints(shape));
            this.selectionMap[shape.key] = element;
        }
        usedItems && (usedItems[shape.key] = true);
        return element;
    };
    CanvasSelectionManager.prototype.getOrCreateConnectorSelection = function (connector, usedItems) {
        var element = this.selectionMap[connector.key];
        var points = connector.getRenderPoints();
        if (!element) {
            element = new ConnectorSelectionElement(this.itemSelectionContainer, this.selectionMarksContainer, this.actualZoom, this.readOnly, this.dom, connector.key, connector.isLocked, connector.rectangle, points, connector.style, connector.styleText, connector.enableText, connector.texts.map(function (t) {
                var textInfo = Utils_2.GeometryUtils.getPathPointByPosition(points, t.position);
                return {
                    text: connector.getText(t.position),
                    point: textInfo[0],
                    pointIndex: textInfo[1],
                    pos: t.position
                };
            }).sort(function (a, b) { return a.pos - b.pos; }), connector.points, connector.properties.lineOption);
            this.selectionMap[connector.key] = element;
        }
        usedItems && (usedItems[connector.key] = true);
        return element;
    };
    CanvasSelectionManager.prototype.getOrCreateMultipleSelection = function (usedItems) {
        var element = this.selectionMap[MULTIPLE_SELECTION_KEY];
        if (!element) {
            element = new MultipleSelectionElement(this.itemSelectionContainer, this.selectionMarksContainer, this.actualZoom, this.readOnly, this.dom);
            this.selectionMap[MULTIPLE_SELECTION_KEY] = element;
        }
        usedItems[MULTIPLE_SELECTION_KEY] = true;
        return element;
    };
    CanvasSelectionManager.prototype.getMultipleSelection = function () {
        return this.selectionMap[MULTIPLE_SELECTION_KEY];
    };
    CanvasSelectionManager.prototype.updateShapeSelection = function (shape, multipleSelection) {
        if (shape.key in this.selectionMap) {
            this.getOrCreateShapeSelection(shape).onModelChanged(shape.isLocked, shape.rectangle, shape.style, shape.allowResizeHorizontally, shape.allowResizeVertically, shape.description.getParameterPoints(shape));
            multipleSelection && multipleSelection.onModelItemChanged(shape.key, shape.rectangle);
        }
    };
    CanvasSelectionManager.prototype.updateConnectorSelection = function (connector, multipleSelection) {
        if (connector.key in this.selectionMap) {
            var renderPoints_1 = connector.getRenderPoints();
            this.getOrCreateConnectorSelection(connector)
                .onModelChanged(connector.isLocked, connector.rectangle, renderPoints_1, connector.style, connector.styleText, connector.enableText, connector.texts.map(function (t) {
                var textPos = Utils_2.GeometryUtils.getPathPointByPosition(renderPoints_1, t.position);
                return {
                    text: connector.getText(t.position),
                    pointIndex: textPos[1],
                    pos: t.position,
                    point: textPos[0]
                };
            }).sort(function (a, b) { return a.pos - b.pos; }), connector.points, connector.properties.lineOption);
            multipleSelection && multipleSelection.onModelItemChanged(connector.key, connector.rectangle);
        }
    };
    CanvasSelectionManager.prototype.hideOutdatedSelection = function (updated) {
        var _this = this;
        Object.keys(this.selectionMap)
            .filter(function (k) { return !updated[k]; })
            .forEach(function (k) {
            _this.selectionMap[k].destroy();
            delete _this.selectionMap[k];
        });
    };
    CanvasSelectionManager.prototype.selectionCanBeDrawn = function (item) {
        return !item.container || (item.container.expanded && this.selectionCanBeDrawn(item.container));
    };
    CanvasSelectionManager.prototype.notifySelectionChanged = function (selection) {
        var _this = this;
        var items = selection.getSelectedItems(true).filter(function (item) { return _this.selectionCanBeDrawn(item); });
        var changedItems = {};
        var isMultipleSelection = items.length > 1;
        var shapes = selection.getSelectedShapes(true).filter(function (shape) { return _this.selectionCanBeDrawn(shape); });
        var connectors = selection.getSelectedConnectors(true).filter(function (connector) { return _this.selectionCanBeDrawn(connector); });
        shapes.forEach(function (shape) { return _this.getOrCreateShapeSelection(shape, changedItems).onSelectionChanged(isMultipleSelection); });
        connectors.forEach(function (connector) { return _this.getOrCreateConnectorSelection(connector, changedItems).onSelectionChanged(isMultipleSelection); });
        if (isMultipleSelection) {
            var strokeWidth = items.length > 0 ? items[0].strokeWidth : 0;
            var rectangles_1 = {};
            items.filter(function (i) { return !i.isLocked; }).forEach(function (item) { return rectangles_1[item.key] = item.rectangle; });
            this.getOrCreateMultipleSelection(changedItems).onSelectionChanged(!!shapes.filter(function (i) { return !i.isLocked; }).length, strokeWidth, rectangles_1);
        }
        this.hideOutdatedSelection(changedItems);
    };
    CanvasSelectionManager.prototype.applyChangesCore = function (changes) {
        _super.prototype.applyChangesCore.call(this, changes);
        var multipleSelection = this.getMultipleSelection();
        multipleSelection && multipleSelection.onModelChanged();
    };
    CanvasSelectionManager.prototype.applyChange = function (change) {
        var multipleSelection = this.getMultipleSelection();
        if (change.item instanceof Shape_1.Shape)
            this.updateShapeSelection(change.item, multipleSelection);
        else if (change.item instanceof Connector_1.Connector)
            this.updateConnectorSelection(change.item, multipleSelection);
    };
    CanvasSelectionManager.prototype.notifyPageColorChanged = function (color) { };
    CanvasSelectionManager.prototype.notifyPageSizeChanged = function (pageSize, pageLandscape) { };
    CanvasSelectionManager.prototype.notifyActualZoomChanged = function (actualZoom) {
        var _this = this;
        Object.keys(this.selectionMap).forEach(function (k) { return _this.selectionMap[k].notifyZoomChanged(actualZoom); });
        this.actualZoom = actualZoom;
    };
    CanvasSelectionManager.prototype.notifyViewAdjusted = function (canvasOffset) { };
    CanvasSelectionManager.prototype.notifyReadOnlyChanged = function (readOnly) {
        var _this = this;
        this.readOnly = readOnly;
        Object.keys(this.selectionMap).forEach(function (k) { return _this.selectionMap[k].notifyReadOnlyChanged(readOnly); });
    };
    CanvasSelectionManager.prototype.notifySelectionRectShow = function (rect) {
        this.showSelectionRect(rect.clone().multiply(this.actualZoom, this.actualZoom));
    };
    CanvasSelectionManager.prototype.notifySelectionRectHide = function () {
        this.hideSelectionRect();
    };
    CanvasSelectionManager.prototype.notifyResizeInfoShow = function (point, text) {
        this.showResizeInfo(point.clone().multiply(this.actualZoom, this.actualZoom), text);
    };
    CanvasSelectionManager.prototype.notifyResizeInfoHide = function () {
        this.hideResizeInfo();
    };
    CanvasSelectionManager.prototype.notifyConnectionPointsShow = function (key, points, activePointIndex, outsideRectangle) {
        var _this = this;
        this.hideConnectionPoints();
        points.forEach(function (p, index) {
            var point = p.point.clone().multiply(_this.actualZoom, _this.actualZoom);
            if (outsideRectangle)
                switch (p.side) {
                    case DiagramItem_1.ConnectionPointSide.North:
                        point.y = outsideRectangle.y * _this.actualZoom - CanvasSelectionManager.connectionPointShift;
                        break;
                    case DiagramItem_1.ConnectionPointSide.South:
                        point.y = outsideRectangle.bottom * _this.actualZoom + CanvasSelectionManager.connectionPointShift;
                        break;
                    case DiagramItem_1.ConnectionPointSide.West:
                        point.x = outsideRectangle.x * _this.actualZoom - CanvasSelectionManager.connectionPointShift;
                        break;
                    case DiagramItem_1.ConnectionPointSide.East:
                        point.x = outsideRectangle.right * _this.actualZoom + CanvasSelectionManager.connectionPointShift;
                        break;
                }
            _this.showConnectionPoint(index, point, key, index, index === activePointIndex, p.allowed);
        });
    };
    CanvasSelectionManager.prototype.notifyConnectionPointsHide = function () {
        this.hideConnectionPoints();
    };
    CanvasSelectionManager.prototype.notifyConnectionTargetShow = function (key, info) {
        if (!info.allowed)
            return;
        var rect = CanvasSelectionManager.correctSelectionRect(info.rect.clone().multiply(this.actualZoom, this.actualZoom), info.strokeWidth, CanvasSelectionManager.connectionTargetBorderWidth, this.actualZoom, 0);
        this.showConnectionTarget(0, rect);
    };
    CanvasSelectionManager.prototype.notifyConnectionTargetHide = function () {
        this.hideConnectionTarget();
    };
    CanvasSelectionManager.prototype.notifyContainerTargetShow = function (key, info) {
        var rect = CanvasSelectionManager.correctSelectionRect(info.rect.clone().multiply(this.actualZoom, this.actualZoom), info.strokeWidth, CanvasSelectionManager.connectionTargetBorderWidth, this.actualZoom, 0);
        this.showContainerTarget(0, rect);
    };
    CanvasSelectionManager.prototype.notifyContainerTargetHide = function () {
        this.hideContainerTarget();
    };
    CanvasSelectionManager.prototype.notifyExtensionLinesShow = function (lines) {
        var _this = this;
        this.hideExtensionLines();
        lines.forEach(function (line, index) {
            _this.showExtensionLine(index, line.type, line.segment.startPoint.clone().multiply(_this.actualZoom, _this.actualZoom), line.segment.endPoint.clone().multiply(_this.actualZoom, _this.actualZoom), line.text);
        });
    };
    CanvasSelectionManager.prototype.notifyExtensionLinesHide = function () {
        this.hideExtensionLines();
    };
    CanvasSelectionManager.prototype.notifyDragStart = function (itemKeys) {
        this.dom.changeByFunc(this.selectionMarksContainer, function (e) { return e.style.display = "none"; });
    };
    CanvasSelectionManager.prototype.notifyDragEnd = function (itemKeys) {
        this.dom.changeByFunc(this.selectionMarksContainer, function (e) { return e.style.display = ""; });
    };
    CanvasSelectionManager.prototype.notifyDragScrollStart = function () { };
    CanvasSelectionManager.prototype.notifyDragScrollEnd = function () { };
    CanvasSelectionManager.prototype.notifyTextInputStart = function (item, text, position, size) {
        this.dom.changeByFunc(this.visualizersContainer, function (e) { return e.style.display = "none"; });
    };
    CanvasSelectionManager.prototype.notifyTextInputEnd = function (item, captureFocus) {
        this.dom.changeByFunc(this.visualizersContainer, function (e) { return e.style.display = ""; });
    };
    CanvasSelectionManager.prototype.notifyTextInputPermissionsCheck = function (item, allowed) { };
    CanvasSelectionManager.correctSelectionRect = function (rect, targetLineWidth, selectionLineWidth, zoomLevel, outsideOffset) {
        if (outsideOffset === void 0) { outsideOffset = CanvasSelectionManager.selectionOffset; }
        var evenOddWidth = unit_converter_1.UnitConverter.twipsToPixels(targetLineWidth) % 2 !== unit_converter_1.UnitConverter.twipsToPixels(selectionLineWidth) % 2;
        var corr = Math.ceil(targetLineWidth / 2 * zoomLevel);
        rect = rect.clone().inflate(corr, corr);
        var lwCorr = Math.floor(selectionLineWidth / 2);
        rect.x -= lwCorr;
        rect.y -= lwCorr;
        rect.width += selectionLineWidth;
        rect.height += selectionLineWidth;
        if (evenOddWidth) {
            var correction = CanvasSelectionManager.evenOddSelectionCorrection * (unit_converter_1.UnitConverter.twipsToPixels(selectionLineWidth) % 2 === 1 ? -1 : 1);
            rect = rect.clone().moveRectangle(correction, correction);
        }
        return rect.clone().inflate(outsideOffset, outsideOffset);
    };
    CanvasSelectionManager.selectionMarkSize = unit_converter_1.UnitConverter.pixelsToTwips(10);
    CanvasSelectionManager.lockedSelectionMarkSize = unit_converter_1.UnitConverter.pixelsToTwips(8);
    CanvasSelectionManager.selectionOffset = unit_converter_1.UnitConverter.pixelsToTwips(2);
    CanvasSelectionManager.selectionRectLineWidth = unit_converter_1.UnitConverter.pixelsToTwips(1);
    CanvasSelectionManager.multiSelectionRectLineWidth = unit_converter_1.UnitConverter.pixelsToTwips(1);
    CanvasSelectionManager.connectionPointSmallSize = unit_converter_1.UnitConverter.pixelsToTwips(5);
    CanvasSelectionManager.connectionPointLargeSize = unit_converter_1.UnitConverter.pixelsToTwips(12);
    CanvasSelectionManager.connectionPointShift = unit_converter_1.UnitConverter.pixelsToTwips(16);
    CanvasSelectionManager.connectionTargetBorderWidth = unit_converter_1.UnitConverter.pixelsToTwips(2);
    CanvasSelectionManager.geomertyMarkSize = unit_converter_1.UnitConverter.pixelsToTwips(8);
    CanvasSelectionManager.connectorPointMarkSize = unit_converter_1.UnitConverter.pixelsToTwips(6);
    CanvasSelectionManager.connectorSideMarkSize = unit_converter_1.UnitConverter.pixelsToTwips(6);
    CanvasSelectionManager.extensionLineWidth = unit_converter_1.UnitConverter.pixelsToTwips(1);
    CanvasSelectionManager.extensionLineOffset = unit_converter_1.UnitConverter.pixelsToTwips(1);
    CanvasSelectionManager.extensionLineEndingSize = unit_converter_1.UnitConverter.pixelsToTwips(6);
    CanvasSelectionManager.resizeInfoOffset = unit_converter_1.UnitConverter.pixelsToTwips(16);
    CanvasSelectionManager.resizeInfoTextOffset = unit_converter_1.UnitConverter.pixelsToTwips(2);
    CanvasSelectionManager.resizeInfoLineWidth = unit_converter_1.UnitConverter.pixelsToTwips(1);
    CanvasSelectionManager.evenOddSelectionCorrection = unit_converter_1.UnitConverter.pixelsToTwips(1);
    return CanvasSelectionManager;
}(CanvasManager_1.CanvasManager));
exports.CanvasSelectionManager = CanvasSelectionManager;
var CanvasElement = (function () {
    function CanvasElement(rectsContainer, marksContainer, key, zoomLevel, readOnly, dom) {
        this.rectsContainer = rectsContainer;
        this.marksContainer = marksContainer;
        this.key = key;
        this.zoomLevel = zoomLevel;
        this.readOnly = readOnly;
        this.dom = dom;
        this.elements = {};
        this.updatedElements = {};
    }
    CanvasElement.prototype.notifyZoomChanged = function (zoom) {
        if (this.zoomLevel !== zoom) {
            this.zoomLevel = zoom;
            this.redraw();
        }
    };
    CanvasElement.prototype.notifyReadOnlyChanged = function (readOnly) {
        this.readOnly = readOnly;
        this.redraw();
    };
    CanvasElement.prototype.destroy = function () {
        var _this = this;
        Object.keys(this.elements)
            .forEach(function (key) {
            _this.elements[key].parentNode.removeChild(_this.elements[key]);
            delete _this.elements[key];
        });
    };
    CanvasElement.prototype.redraw = function () {
        var _this = this;
        this.updatedElements = {};
        this.redrawCore();
        Object.keys(this.elements)
            .filter(function (key) { return !_this.updatedElements[key]; })
            .forEach(function (key) {
            _this.elements[key].parentNode.removeChild(_this.elements[key]);
            delete _this.elements[key];
        });
        this.updatedElements = {};
    };
    CanvasElement.prototype.drawSelectionMarks = function (rect, allowResizeHorizontally, allowResizeVertically) {
        if (this.readOnly)
            return;
        var hasEWMarks = allowResizeHorizontally && rect.height > CanvasSelectionManager.selectionMarkSize * 3;
        var hasNSMarks = allowResizeVertically && rect.width > CanvasSelectionManager.selectionMarkSize * 3;
        var hasCornerMarks = allowResizeHorizontally || allowResizeVertically;
        if (hasCornerMarks)
            this.drawSelectionMark(0, new point_1.Point(rect.x, rect.y), CanvasSelectionManager.selectionMarkSize, Event_1.MouseEventElementType.ShapeResizeBox, Event_1.ResizeEventSource.ResizeBox_NW, exports.SELECTION_ELEMENT_CLASSNAMES.SELECTION_MARK);
        if (hasNSMarks && !browser_1.Browser.TouchUI)
            this.drawSelectionMark(1, new point_1.Point(rect.x + rect.width / 2, rect.y), CanvasSelectionManager.selectionMarkSize, Event_1.MouseEventElementType.ShapeResizeBox, Event_1.ResizeEventSource.ResizeBox_N, exports.SELECTION_ELEMENT_CLASSNAMES.SELECTION_MARK);
        if (hasCornerMarks)
            this.drawSelectionMark(2, new point_1.Point(rect.right, rect.y), CanvasSelectionManager.selectionMarkSize, Event_1.MouseEventElementType.ShapeResizeBox, Event_1.ResizeEventSource.ResizeBox_NE, exports.SELECTION_ELEMENT_CLASSNAMES.SELECTION_MARK);
        if (hasEWMarks && !browser_1.Browser.TouchUI)
            this.drawSelectionMark(3, new point_1.Point(rect.right, rect.y + rect.height / 2), CanvasSelectionManager.selectionMarkSize, Event_1.MouseEventElementType.ShapeResizeBox, Event_1.ResizeEventSource.ResizeBox_E, exports.SELECTION_ELEMENT_CLASSNAMES.SELECTION_MARK);
        if (hasCornerMarks)
            this.drawSelectionMark(4, new point_1.Point(rect.right, rect.bottom), CanvasSelectionManager.selectionMarkSize, Event_1.MouseEventElementType.ShapeResizeBox, Event_1.ResizeEventSource.ResizeBox_SE, exports.SELECTION_ELEMENT_CLASSNAMES.SELECTION_MARK);
        if (hasNSMarks && !browser_1.Browser.TouchUI)
            this.drawSelectionMark(5, new point_1.Point(rect.x + rect.width / 2, rect.bottom), CanvasSelectionManager.selectionMarkSize, Event_1.MouseEventElementType.ShapeResizeBox, Event_1.ResizeEventSource.ResizeBox_S, exports.SELECTION_ELEMENT_CLASSNAMES.SELECTION_MARK);
        if (hasCornerMarks)
            this.drawSelectionMark(6, new point_1.Point(rect.x, rect.bottom), CanvasSelectionManager.selectionMarkSize, Event_1.MouseEventElementType.ShapeResizeBox, Event_1.ResizeEventSource.ResizeBox_SW, exports.SELECTION_ELEMENT_CLASSNAMES.SELECTION_MARK);
        if (hasEWMarks && !browser_1.Browser.TouchUI)
            this.drawSelectionMark(7, new point_1.Point(rect.x, rect.y + rect.height / 2), CanvasSelectionManager.selectionMarkSize, Event_1.MouseEventElementType.ShapeResizeBox, Event_1.ResizeEventSource.ResizeBox_W, exports.SELECTION_ELEMENT_CLASSNAMES.SELECTION_MARK);
    };
    CanvasElement.prototype.drawSelectionMark = function (index, point, size, type, value, className) {
        var _this = this;
        this.getOrCreateElement("SM" + index, new RectaglePrimitive_1.RectanglePrimitive(point.x - size / 2, point.y - size / 2, size, size, null, className, undefined, function (el) {
            Utils_1.RenderUtils.setElementEventData(el, type, _this.key, value);
        }), this.marksContainer);
    };
    CanvasElement.prototype.drawSelectionRect = function (rectangle, type, className) {
        var primitive = new RectaglePrimitive_1.RectanglePrimitive(rectangle.x, rectangle.y, rectangle.width, rectangle.height, Style_1.StrokeStyle.default1pxInstance, className, undefined, function (el) {
            Utils_1.RenderUtils.setElementEventData(el, type, "-1", -1);
        });
        this.getOrCreateElement("shapeSelection", primitive, this.rectsContainer);
    };
    CanvasElement.prototype.getOrCreateElement = function (cacheKey, primitive, container) {
        var element = this.elements[cacheKey];
        if (!element) {
            element = primitive.createElement(function (el) { return container.appendChild(el); });
            this.elements[cacheKey] = element;
        }
        this.updatedElements[cacheKey] = true;
        this.dom.changeByPrimitive(element, primitive);
        return element;
    };
    return CanvasElement;
}());
var ItemSelectionElement = (function (_super) {
    __extends(ItemSelectionElement, _super);
    function ItemSelectionElement(rectsContainer, marksContainer, key, zoomLevel, readOnly, dom, isLocked, rectangle) {
        var _this = _super.call(this, rectsContainer, marksContainer, key, zoomLevel, readOnly, dom) || this;
        _this.isLocked = isLocked;
        _this.rectangle = rectangle;
        return _this;
    }
    ItemSelectionElement.prototype.onSelectionChanged = function (isMultipleSelection) {
        if (this.isMultipleSelection !== isMultipleSelection) {
            this.isMultipleSelection = isMultipleSelection;
            this.redraw();
        }
    };
    ItemSelectionElement.prototype.isLockedRender = function () {
        return this.isLocked && !this.readOnly;
    };
    ItemSelectionElement.prototype.drawLockedSelectionMark = function (index, point, size, className) {
        var primitive = new PathPrimitive_1.PathPrimitive([
            new PathPrimitive_1.PathPrimitiveMoveToCommand(point.x - size / 2, point.y - size / 2),
            new PathPrimitive_1.PathPrimitiveLineToCommand(point.x + size / 2, point.y + size / 2),
            new PathPrimitive_1.PathPrimitiveMoveToCommand(point.x + size / 2, point.y - size / 2),
            new PathPrimitive_1.PathPrimitiveLineToCommand(point.x - size / 2, point.y + size / 2)
        ], null, className);
        this.getOrCreateElement("LSM" + index, primitive, this.marksContainer);
    };
    return ItemSelectionElement;
}(CanvasElement));
var MultipleSelectionElement = (function (_super) {
    __extends(MultipleSelectionElement, _super);
    function MultipleSelectionElement(rectsContainer, marksContainer, zoomLevel, readOnly, dom) {
        var _this = _super.call(this, rectsContainer, marksContainer, "-1", zoomLevel, readOnly, dom) || this;
        _this.rectangles = {};
        return _this;
    }
    MultipleSelectionElement.prototype.onModelItemChanged = function (key, rectangle) {
        if (key in this.rectangles)
            this.rectangles[key] = rectangle;
    };
    MultipleSelectionElement.prototype.onModelChanged = function () {
        this.redraw();
    };
    MultipleSelectionElement.prototype.onSelectionChanged = function (needDrawSelectionMarks, strokeWidth, rectangles) {
        this.needDrawSelectionMarks = needDrawSelectionMarks;
        this.strokeWidth = strokeWidth;
        this.rectangles = rectangles;
        this.redraw();
    };
    MultipleSelectionElement.prototype.redrawCore = function () {
        var _this = this;
        var rectKeys = Object.keys(this.rectangles);
        if (!rectKeys.length)
            return;
        var rect = Utils_2.GeometryUtils.getCommonRectangle(rectKeys.map(function (key) { return _this.rectangles[key]; })).clone().multiply(this.zoomLevel, this.zoomLevel);
        var selRect = CanvasSelectionManager.correctSelectionRect(rect, this.strokeWidth, CanvasSelectionManager.selectionRectLineWidth, this.zoomLevel);
        this.drawSelectionRect(selRect, Event_1.MouseEventElementType.SelectionRect, exports.SELECTION_ELEMENT_CLASSNAMES.ITEMS_SELECTION_RECT);
        if (this.needDrawSelectionMarks)
            this.drawSelectionMarks(rect, true, true);
    };
    return MultipleSelectionElement;
}(CanvasElement));
var ShapeSelectionElement = (function (_super) {
    __extends(ShapeSelectionElement, _super);
    function ShapeSelectionElement(rectsContainer, marksContainer, zoomLevel, readOnly, dom, key, isLocked, rectangle, style, allowResizeHorizontally, allowResizeVertically, shapeParameterPoints) {
        var _this = _super.call(this, rectsContainer, marksContainer, key, zoomLevel, readOnly, dom, isLocked, rectangle) || this;
        _this.style = style;
        _this.allowResizeHorizontally = allowResizeHorizontally;
        _this.allowResizeVertically = allowResizeVertically;
        _this.shapeParameterPoints = shapeParameterPoints;
        return _this;
    }
    ShapeSelectionElement.prototype.onModelChanged = function (isLocked, rectangle, style, allowResizeHorizontally, allowResizeVertically, shapeParameterPoints) {
        this.isLocked = isLocked;
        this.rectangle = rectangle;
        this.style = style;
        this.allowResizeHorizontally = allowResizeHorizontally;
        this.allowResizeVertically = allowResizeVertically;
        this.shapeParameterPoints = shapeParameterPoints;
        this.redraw();
    };
    ShapeSelectionElement.prototype.redrawCore = function () {
        var rect = this.rectangle.clone().multiply(this.zoomLevel, this.zoomLevel);
        if (this.isLockedRender())
            this.drawLockedSelection(rect);
        else
            this.drawUnlockedSelection(rect);
    };
    ShapeSelectionElement.prototype.drawLockedSelection = function (rect) {
        this.drawLockedSelectionMark(0, new point_1.Point(rect.x, rect.y), CanvasSelectionManager.lockedSelectionMarkSize, exports.SELECTION_ELEMENT_CLASSNAMES.LOCKED_SELECTION_MARK);
        this.drawLockedSelectionMark(1, new point_1.Point(rect.right, rect.y), CanvasSelectionManager.lockedSelectionMarkSize, exports.SELECTION_ELEMENT_CLASSNAMES.LOCKED_SELECTION_MARK);
        this.drawLockedSelectionMark(2, new point_1.Point(rect.right, rect.bottom), CanvasSelectionManager.lockedSelectionMarkSize, exports.SELECTION_ELEMENT_CLASSNAMES.LOCKED_SELECTION_MARK);
        this.drawLockedSelectionMark(3, new point_1.Point(rect.x, rect.bottom), CanvasSelectionManager.lockedSelectionMarkSize, exports.SELECTION_ELEMENT_CLASSNAMES.LOCKED_SELECTION_MARK);
    };
    ShapeSelectionElement.prototype.drawUnlockedSelection = function (rect) {
        var selRect = CanvasSelectionManager.correctSelectionRect(rect, this.style.strokeWidth, CanvasSelectionManager.selectionRectLineWidth, this.zoomLevel);
        this.drawSelectionRect(selRect, Event_1.MouseEventElementType.SelectionRect, this.isMultipleSelection ? exports.SELECTION_ELEMENT_CLASSNAMES.ITEM_MULTI_SELECTION : exports.SELECTION_ELEMENT_CLASSNAMES.ITEM_SELECTION_RECT);
        if (!this.isMultipleSelection)
            this.drawSelectionMarks(rect, this.allowResizeHorizontally, this.allowResizeVertically);
        this.drawShapeParameterPoints();
    };
    ShapeSelectionElement.prototype.drawShapeParameterPoints = function () {
        var _this = this;
        if (this.readOnly)
            return;
        this.shapeParameterPoints.forEach(function (pp, index) {
            var point = pp.point.clone().multiply(_this.zoomLevel, _this.zoomLevel);
            _this.drawShapeParameterPoint(point, index, pp.key);
        });
    };
    ShapeSelectionElement.prototype.drawShapeParameterPoint = function (point, index, pointKey) {
        var _this = this;
        var size = CanvasSelectionManager.geomertyMarkSize;
        var primitive = new RectaglePrimitive_1.RectanglePrimitive(point.x - size / 2, point.y - size / 2, size, size, null, "geometry-mark", undefined, function (el) {
            Utils_1.RenderUtils.setElementEventData(el, Event_1.MouseEventElementType.ShapeParameterBox, _this.key, pointKey);
        });
        this.getOrCreateElement("pp" + index.toString(), primitive, this.marksContainer);
    };
    return ShapeSelectionElement;
}(ItemSelectionElement));
var ConnectorSelectionElement = (function (_super) {
    __extends(ConnectorSelectionElement, _super);
    function ConnectorSelectionElement(rectsContainer, marksContainer, zoomLevel, readOnly, dom, key, isLocked, rectangle, renderPoints, style, styleText, enableText, texts, points, lineType) {
        var _this = _super.call(this, rectsContainer, marksContainer, key, zoomLevel, readOnly, dom, isLocked, rectangle) || this;
        _this.renderPoints = renderPoints;
        _this.style = style;
        _this.styleText = styleText;
        _this.enableText = enableText;
        _this.texts = texts;
        _this.points = points;
        _this.lineType = lineType;
        return _this;
    }
    ConnectorSelectionElement.prototype.onModelChanged = function (isLocked, rectangle, renderPoints, style, styleText, enableText, texts, points, lineType) {
        this.isLocked = isLocked;
        this.rectangle = rectangle;
        this.renderPoints = renderPoints;
        this.style = style;
        this.styleText = styleText;
        this.enableText = enableText;
        this.texts = texts;
        this.points = points;
        this.lineType = lineType;
        this.redraw();
    };
    ConnectorSelectionElement.prototype.redrawCore = function () {
        if (this.isLockedRender())
            this.drawLockedSelection();
        else
            this.drawUnlockedSelection();
    };
    ConnectorSelectionElement.prototype.drawLockedSelection = function () {
        var _this = this;
        this.renderPoints.forEach(function (pt, index) {
            _this.drawLockedSelectionMark(index, pt, CanvasSelectionManager.lockedSelectionMarkSize, exports.SELECTION_ELEMENT_CLASSNAMES.LOCKED_SELECTION_MARK);
        });
    };
    ConnectorSelectionElement.prototype.drawUnlockedSelection = function () {
        this.drawConnectorSelection();
        if (!this.isMultipleSelection && !this.readOnly)
            this.drawConnectorSelectionMarks();
    };
    ConnectorSelectionElement.prototype.drawConnectorSelection = function () {
        var commands = [];
        var commandsWB = [];
        var className = this.isMultipleSelection ? exports.SELECTION_ELEMENT_CLASSNAMES.CONNECTOR_MULTI_SELECTION : exports.SELECTION_ELEMENT_CLASSNAMES.CONNECTOR_SELECTION;
        this.populateSelectionPrimitiveCommands(commands, commandsWB);
        var primitive = new PathPrimitive_1.PathPrimitive(commands.concat(commandsWB.reverse()), Style_1.StrokeStyle.default1pxInstance, className);
        this.getOrCreateElement("CS", primitive, this.rectsContainer);
    };
    ConnectorSelectionElement.prototype.populateSelectionPrimitiveCommands = function (commands, commandsWB) {
        var texts = this.texts;
        var txtAlign = this.styleText.getAlignment();
        var points = this.createNotSkippedRenderPoints();
        var zoomLevel = this.zoomLevel;
        var strokeWidthPx = this.style.strokeWidthPx;
        var selectionOffset = this.getSelectionOffset(strokeWidthPx);
        var strokeWidthPxIsEvenOdd = strokeWidthPx % 2 === 0;
        var prevPt = points[0];
        var textIndex = 0;
        var offset;
        var distance;
        var nextOffset;
        var nextDistance;
        for (var i = 1, pt = void 0; pt = points[i]; i++) {
            var nextPt = points[i + 1];
            if (offset === undefined) {
                distance = metrics_1.Metrics.euclideanDistance(prevPt, pt);
                if (math_1.MathUtils.numberCloseTo(distance, 0))
                    continue;
                offset = Utils_2.GeometryUtils.getSelectionOffsetPoint(prevPt, pt, distance).multiply(selectionOffset, selectionOffset);
            }
            if (nextPt) {
                nextDistance = metrics_1.Metrics.euclideanDistance(pt, nextPt);
                if (math_1.MathUtils.numberCloseTo(nextDistance, 0))
                    continue;
                nextOffset = Utils_2.GeometryUtils.getSelectionOffsetPoint(pt, nextPt, nextDistance).multiply(selectionOffset, selectionOffset);
            }
            var offsetX = offset.x;
            var offsetY = offset.y;
            var offsetXNegative = -offsetX;
            var offsetYNegative = -offsetY;
            var nextOffsetX = nextOffset && nextOffset.x;
            var nextOffsetY = nextOffset && nextOffset.y;
            var nextOffsetXNegative = nextOffset && -nextOffset.x;
            var nextOffsetYNegative = nextOffset && -nextOffset.y;
            if (strokeWidthPxIsEvenOdd) {
                if (offsetXNegative > 0)
                    offsetXNegative -= CanvasSelectionManager.evenOddSelectionCorrection;
                else if (offsetX > 0)
                    offsetX -= CanvasSelectionManager.evenOddSelectionCorrection;
                if (offsetYNegative > 0)
                    offsetYNegative -= CanvasSelectionManager.evenOddSelectionCorrection;
                else if (offsetY > 0)
                    offsetY -= CanvasSelectionManager.evenOddSelectionCorrection;
                if (nextOffsetXNegative > 0)
                    nextOffsetXNegative -= CanvasSelectionManager.evenOddSelectionCorrection;
                else if (nextOffsetX > 0)
                    nextOffsetX -= CanvasSelectionManager.evenOddSelectionCorrection;
                if (nextOffsetYNegative > 0)
                    nextOffsetYNegative -= CanvasSelectionManager.evenOddSelectionCorrection;
                else if (nextOffsetY > 0)
                    nextOffsetY -= CanvasSelectionManager.evenOddSelectionCorrection;
            }
            while (texts[textIndex] && texts[textIndex].pointIndex <= i) {
                var text = texts[textIndex];
                var size = this.getConnectorSelectionTextSize(text.text, selectionOffset);
                var textPts = Utils_2.GeometryUtils.getSelectionTextStartEndPoints(prevPt, pt, distance, text.point, size, txtAlign);
                if (texts[textIndex].pointIndex < i) {
                    prevPt = textPts[1];
                    commands.push(PathPrimitive_1.PathPrimitiveMoveToCommand.fromPoint(prevPt.clone().offset(offsetX, offsetY).multiply(zoomLevel, zoomLevel)));
                    commandsWB.push(PathPrimitive_1.PathPrimitiveLineToCommand.fromPoint(prevPt.clone().offset(offsetXNegative, offsetYNegative).multiply(zoomLevel, zoomLevel)));
                }
                else {
                    if (!commands.length) {
                        commands.push(PathPrimitive_1.PathPrimitiveMoveToCommand.fromPoint(prevPt.clone().offset(offsetX, offsetY).multiply(zoomLevel, zoomLevel)));
                        commandsWB.push(PathPrimitive_1.PathPrimitiveLineToCommand.fromPoint(prevPt.clone().offset(offsetXNegative, offsetYNegative).multiply(zoomLevel, zoomLevel)));
                    }
                    commands.push(PathPrimitive_1.PathPrimitiveLineToCommand.fromPoint(textPts[0].clone().offset(offsetX, offsetY).multiply(zoomLevel, zoomLevel)));
                    commands.push(PathPrimitive_1.PathPrimitiveMoveToCommand.fromPoint(textPts[1].clone().offset(offsetX, offsetY).multiply(zoomLevel, zoomLevel)));
                    commandsWB.push(PathPrimitive_1.PathPrimitiveMoveToCommand.fromPoint(textPts[0].clone().offset(offsetXNegative, offsetYNegative).multiply(zoomLevel, zoomLevel)));
                    commandsWB.push(PathPrimitive_1.PathPrimitiveLineToCommand.fromPoint(textPts[1].clone().offset(offsetXNegative, offsetYNegative).multiply(zoomLevel, zoomLevel)));
                    prevPt = textPts[1];
                }
                textIndex++;
            }
            if (!commands.length) {
                commands.push(PathPrimitive_1.PathPrimitiveMoveToCommand.fromPoint(prevPt.clone().offset(offsetX, offsetY).multiply(zoomLevel, zoomLevel)));
                commandsWB.push(PathPrimitive_1.PathPrimitiveLineToCommand.fromPoint(prevPt.clone().offset(offsetXNegative, offsetYNegative).multiply(zoomLevel, zoomLevel)));
            }
            if (nextPt) {
                Utils_2.GeometryUtils.addSelectedLinesTo(prevPt, pt, nextPt, offsetX, offsetY, offsetXNegative, offsetYNegative, nextOffsetX, nextOffsetY, nextOffsetXNegative, nextOffsetYNegative, function (x, y) { return commands.push(new PathPrimitive_1.PathPrimitiveLineToCommand(x * zoomLevel, y * zoomLevel)); }, function (x, y) { return commandsWB.push(new PathPrimitive_1.PathPrimitiveLineToCommand(x * zoomLevel, y * zoomLevel)); });
                offset = nextOffset;
                distance = nextDistance;
            }
            else {
                commands.push(PathPrimitive_1.PathPrimitiveLineToCommand.fromPoint(pt.clone().offset(offsetX, offsetY).multiply(zoomLevel, zoomLevel)));
                commandsWB.push(PathPrimitive_1.PathPrimitiveMoveToCommand.fromPoint(pt.clone().offset(offsetXNegative, offsetYNegative).multiply(zoomLevel, zoomLevel)));
            }
            prevPt = pt;
        }
    };
    ConnectorSelectionElement.prototype.createNotSkippedRenderPoints = function () {
        var clonedRenderPoints = this.renderPoints.map(function (p) { return p.clone(); });
        if (this.lineType === ConnectorProperties_1.ConnectorLineOption.Straight) {
            ModelUtils_1.ModelUtils.removeUnnecessaryRenderPoints(clonedRenderPoints);
            return clonedRenderPoints.filter(function (p) { return !p.skipped; });
        }
        ModelUtils_1.ModelUtils.removeUnnecessaryRightAngleRenderPoints(clonedRenderPoints);
        return clonedRenderPoints.filter(function (p) { return !p.skipped; });
    };
    ConnectorSelectionElement.prototype.getSelectionOffset = function (strokeWidthPx) {
        return CanvasSelectionManager.selectionOffset + unit_converter_1.UnitConverter.pixelsToTwips(Math.round(strokeWidthPx / 2) + (strokeWidthPx + 1) % 2);
    };
    ConnectorSelectionElement.prototype.getConnectorSelectionTextSize = function (text, selectionOffset) {
        return this.dom.measurer.measureTextLine(text, this.styleText, ITextMeasurer_1.TextOwner.Connector)
            .applyConverter(unit_converter_1.UnitConverter.pixelsToTwips)
            .clone().offset(selectionOffset, selectionOffset).nonNegativeSize();
    };
    ConnectorSelectionElement.prototype.drawConnectorSelectionMarks = function () {
        var _this = this;
        var pointsCount = this.points.length - 1;
        this.points.forEach(function (pt, index) {
            var isEdgePoint = index === 0 || index === pointsCount;
            var className = isEdgePoint ? exports.SELECTION_ELEMENT_CLASSNAMES.SELECTION_MARK : exports.SELECTION_ELEMENT_CLASSNAMES.CONNECTOR_POINT_MARK;
            var markSize = isEdgePoint ? CanvasSelectionManager.selectionMarkSize : CanvasSelectionManager.connectorPointMarkSize;
            if (isEdgePoint || _this.lineType === ConnectorProperties_1.ConnectorLineOption.Straight)
                _this.drawSelectionMark(index, pt.clone().multiply(_this.zoomLevel, _this.zoomLevel), markSize, Event_1.MouseEventElementType.ConnectorPoint, index, className);
            else
                _this.drawSelectionMark(index, pt.clone().multiply(_this.zoomLevel, _this.zoomLevel), markSize, Event_1.MouseEventElementType.Undefined, -1, className + " disabled");
        });
        this.drawConnectorSideMarks();
    };
    ConnectorSelectionElement.prototype.drawConnectorSideMarks = function () {
        var _this = this;
        var type = (this.lineType === ConnectorProperties_1.ConnectorLineOption.Straight) ?
            Event_1.MouseEventElementType.ConnectorSide : Event_1.MouseEventElementType.ConnectorOrthogonalSide;
        var prevPt;
        var prevPtIndex;
        this.renderPoints.forEach(function (pt, index) {
            if (pt.skipped)
                return;
            if (prevPt !== undefined)
                if (_this.canDrawConnectorSideMark(pt, prevPt)) {
                    var classNameSuffix = _this.lineType === ConnectorProperties_1.ConnectorLineOption.Orthogonal ?
                        (pt.x - prevPt.x === 0 ? "vertical" : "horizontal") : "";
                    _this.drawSelectionMark(_this.points.length + index - 1, new point_1.Point(prevPt.x + (pt.x - prevPt.x) / 2, prevPt.y + (pt.y - prevPt.y) / 2).clone().multiply(_this.zoomLevel, _this.zoomLevel), CanvasSelectionManager.connectorSideMarkSize, type, prevPtIndex + "_" + index, exports.SELECTION_ELEMENT_CLASSNAMES.CONNECTOR_SIDE_MARK + " " + classNameSuffix);
                }
            prevPt = pt;
            prevPtIndex = index;
        });
    };
    ConnectorSelectionElement.prototype.canDrawConnectorSideMark = function (current, prev) {
        if (this.lineType === ConnectorProperties_1.ConnectorLineOption.Straight) {
            var minSize = CanvasSelectionManager.selectionMarkSize + CanvasSelectionManager.connectorSideMarkSize;
            return metrics_1.Metrics.euclideanDistance(current, prev) > minSize;
        }
        if (this.lineType === ConnectorProperties_1.ConnectorLineOption.Orthogonal) {
            var hasBeginPoint = prev.pointIndex === 0;
            var hasEndPoint = Utils_2.GeometryUtils.areDuplicatedPoints(this.points[this.points.length - 1], current);
            if (hasBeginPoint && hasEndPoint)
                return metrics_1.Metrics.euclideanDistance(current, prev) > 2 * Connector_1.Connector.minOffset;
            if (!hasBeginPoint && hasEndPoint || hasBeginPoint && !hasEndPoint)
                return metrics_1.Metrics.euclideanDistance(current, prev) > Connector_1.Connector.minOffset;
            var minSize = CanvasSelectionManager.selectionMarkSize + CanvasSelectionManager.connectorSideMarkSize;
            return metrics_1.Metrics.euclideanDistance(current, prev) > minSize;
        }
        return false;
    };
    return ConnectorSelectionElement;
}(ItemSelectionElement));
//# sourceMappingURL=CanvasSelectionManager.js.map