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
exports.VisualizerManager = void 0;
var ConnectionTargetVisualizer_1 = require("./ConnectionTargetVisualizer");
var ContainerTargetVisualizer_1 = require("./ContainerTargetVisualizer");
var ExtensionLinesVisualizer_1 = require("./ExtensionLinesVisualizer");
var Event_1 = require("../Event");
var ConnectionPointsVisualizer_1 = require("./ConnectionPointsVisualizer");
var Shape_1 = require("../../Model/Shapes/Shape");
var Utils_1 = require("../../Utils");
var segment_1 = require("@devexpress/utils/lib/geometry/segment");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var CanvasSelectionManager_1 = require("../../Render/CanvasSelectionManager");
var ModelUtils_1 = require("../../Model/ModelUtils");
var ResizeInfoVisualizer_1 = require("./ResizeInfoVisualizer");
var SelectionRectVisualizer_1 = require("./SelectionRectVisualizer");
var batch_updatable_1 = require("@devexpress/utils/lib/class/batch-updatable");
var LocalizationService_1 = require("../../LocalizationService");
var VisualizerManager = (function (_super) {
    __extends(VisualizerManager, _super);
    function VisualizerManager(selection, model, eventManager, settings, readOnly) {
        if (readOnly === void 0) { readOnly = settings.readOnly; }
        var _this = _super.call(this) || this;
        _this.selection = selection;
        _this.model = model;
        _this.eventManager = eventManager;
        _this.settings = settings;
        _this.readOnly = readOnly;
        _this.onVisualizersUpdate = new Utils_1.EventDispatcher();
        _this.connectionPointsVisualizer = new ConnectionPointsVisualizer_1.ConnectionPointsVisualizer(_this.onVisualizersUpdate);
        _this.connectionPointsVisualizer = new ConnectionPointsVisualizer_1.ConnectionPointsVisualizer(_this.onVisualizersUpdate);
        _this.connectionTargetVisualizer = new ConnectionTargetVisualizer_1.ConnectionTargetVisualizer(_this.onVisualizersUpdate);
        _this.containerTargetVisualizer = new ContainerTargetVisualizer_1.ContainerTargetVisualizer(_this.onVisualizersUpdate);
        _this.extensionLinesVisualizer = new ExtensionLinesVisualizer_1.ExtensionLinesVisualizer(_this.onVisualizersUpdate);
        _this.resizeInfoVisualizer = new ResizeInfoVisualizer_1.ResizeInfoVisualizer(_this.onVisualizersUpdate);
        _this.selectionRectangleVisualizer = new SelectionRectVisualizer_1.SelectionRectVisualizer(_this.onVisualizersUpdate);
        return _this;
    }
    VisualizerManager.prototype.initialize = function (model) {
        this.model = model;
    };
    VisualizerManager.prototype.onMouseDown = function (evt) {
    };
    VisualizerManager.prototype.onMouseUp = function (evt) {
    };
    VisualizerManager.prototype.onMouseEnter = function (evt) {
    };
    VisualizerManager.prototype.onMouseLeave = function (evt) {
        this.resetConnectionPoints();
        this.resetConnectionTarget();
        this.resetExtensionLines();
        this.resetContainerTarget();
        this.resetResizeInfo();
        this.resetSelectionRectangle();
    };
    VisualizerManager.prototype.onBlur = function (evt) {
    };
    VisualizerManager.prototype.onFocus = function (evt) {
    };
    VisualizerManager.prototype.updateConnections = function (item, type, value) {
        var pointIndex = -1;
        if (value && type === Event_1.MouseEventElementType.ShapeConnectionPoint)
            pointIndex = parseInt(value);
        var preventShowOutside = item && ((!item.allowResizeHorizontally && !item.allowResizeVertically) || item.isLocked);
        this.setConnectionPoints(item, type, pointIndex, preventShowOutside);
    };
    VisualizerManager.prototype.setConnectionPoints = function (item, type, pointIndex, preventShowOutside) {
        if (!this.eventManager.isFocused())
            return;
        if (item && (type === Event_1.MouseEventElementType.Shape || type === Event_1.MouseEventElementType.ShapeResizeBox ||
            type === Event_1.MouseEventElementType.ShapeConnectionPoint) && item !== undefined) {
            var key = item.key;
            var isSelected = this.selection.hasKey(key);
            var points = item.getConnectionPoints();
            this.connectionPointsVisualizer.setPoints(key, points.map(function (pt) { return new ConnectionPointsVisualizer_1.ConnectionPointInfo(pt, item.getConnectionPointSide(pt)); }), pointIndex, isSelected && !preventShowOutside && item.rectangle);
        }
        else
            this.connectionPointsVisualizer.reset();
    };
    VisualizerManager.prototype.setConnectionPointIndex = function (index) {
        this.connectionPointsVisualizer.setPointIndex(index);
    };
    VisualizerManager.prototype.updateConnectionPoints = function () {
        var item = this.model.findItem(this.connectionPointsVisualizer.getKey());
        if (item !== undefined)
            this.connectionPointsVisualizer.update();
        else
            this.connectionPointsVisualizer.reset();
    };
    VisualizerManager.prototype.resetConnectionPoints = function () {
        this.connectionPointsVisualizer.reset();
    };
    VisualizerManager.prototype.setConnectionTarget = function (item, type) {
        if (item && (type === Event_1.MouseEventElementType.Shape ||
            type === Event_1.MouseEventElementType.ShapeConnectionPoint))
            this.connectionTargetVisualizer.setTargetRect(item.key, item.rectangle, item.strokeWidth);
        else
            this.connectionTargetVisualizer.reset();
    };
    VisualizerManager.prototype.resetConnectionTarget = function () {
        this.connectionTargetVisualizer.reset();
    };
    VisualizerManager.prototype.setContainerTarget = function (item, type) {
        if (item && !item.isLocked && (type === Event_1.MouseEventElementType.Shape) && item.enableChildren)
            this.containerTargetVisualizer.setTargetRect(item.key, item.rectangle, item.strokeWidth);
        else
            this.containerTargetVisualizer.reset();
    };
    VisualizerManager.prototype.resetContainerTarget = function () {
        this.containerTargetVisualizer.reset();
    };
    VisualizerManager.prototype.setExtensionLines = function (items) {
        var _this = this;
        if (!this.eventManager.isFocused())
            return;
        this.extensionLinesVisualizer.reset();
        var rect = ModelUtils_1.ModelUtils.createRectangle(items.filter(function (item) { return item; }));
        this.addPageExtensionLines(rect);
        this.model.items.forEach(function (item) {
            if (items.indexOf(item) > -1)
                return;
            if (item instanceof Shape_1.Shape)
                _this.addShapeExtensionLines(item, rect);
        });
    };
    VisualizerManager.prototype.addPageExtensionLines = function (rect) {
        var horPages = Math.round(this.model.size.width / this.model.pageWidth);
        var verPages = Math.round(this.model.size.height / this.model.pageHeight);
        for (var i = 0; i < horPages; i++)
            for (var j = 0; j < verPages; j++) {
                var center = new point_1.Point(i * this.model.pageWidth + this.model.pageWidth / 2, j * this.model.pageHeight + this.model.pageHeight / 2);
                if (Math.abs(rect.center.x - center.x) < this.settings.gridSize / 2) {
                    var segment = new segment_1.Segment(new point_1.Point(rect.center.x, 0), new point_1.Point(rect.center.x, this.model.size.height));
                    this.extensionLinesVisualizer.addSegment(ExtensionLinesVisualizer_1.ExtensionLineType.HorizontalCenterToPageCenter, segment, "");
                }
                if (Math.abs(rect.center.y - center.y) < this.settings.gridSize / 2) {
                    var segment = new segment_1.Segment(new point_1.Point(0, rect.center.y), new point_1.Point(this.model.size.width, rect.center.y));
                    this.extensionLinesVisualizer.addSegment(ExtensionLinesVisualizer_1.ExtensionLineType.VerticalCenterToPageCenter, segment, "");
                }
                if (Math.abs(rect.x - center.x) < this.settings.gridSize / 2) {
                    var segment = new segment_1.Segment(new point_1.Point(rect.x, 0), new point_1.Point(rect.x, this.model.size.height));
                    this.extensionLinesVisualizer.addSegment(ExtensionLinesVisualizer_1.ExtensionLineType.LeftToPageCenter, segment, "");
                }
                if (Math.abs(rect.y - center.y) < this.settings.gridSize / 2) {
                    var segment = new segment_1.Segment(new point_1.Point(0, rect.y), new point_1.Point(this.model.size.width, rect.y));
                    this.extensionLinesVisualizer.addSegment(ExtensionLinesVisualizer_1.ExtensionLineType.TopToPageCenter, segment, "");
                }
                if (Math.abs(rect.right - center.x) < this.settings.gridSize / 2) {
                    var segment = new segment_1.Segment(new point_1.Point(rect.right, 0), new point_1.Point(rect.right, this.model.size.height));
                    this.extensionLinesVisualizer.addSegment(ExtensionLinesVisualizer_1.ExtensionLineType.RightToPageCenter, segment, "");
                }
                if (Math.abs(rect.bottom - center.y) < this.settings.gridSize / 2) {
                    var segment = new segment_1.Segment(new point_1.Point(0, rect.bottom), new point_1.Point(this.model.size.width, rect.bottom));
                    this.extensionLinesVisualizer.addSegment(ExtensionLinesVisualizer_1.ExtensionLineType.BottomToPageCenter, segment, "");
                }
            }
    };
    VisualizerManager.prototype.addShapeExtensionLines = function (shape, rect) {
        var sRect = shape.rectangle;
        var lwCor = shape.strokeWidth - CanvasSelectionManager_1.CanvasSelectionManager.extensionLineWidth;
        var showDistance = true;
        var x1nc;
        var y1nc;
        var x2nc;
        var y2nc;
        var x1;
        var y1;
        var x2;
        var y2;
        if (rect.right < sRect.x) {
            x1nc = rect.right;
            x2nc = sRect.x;
            x1 = x1nc + lwCor + CanvasSelectionManager_1.CanvasSelectionManager.extensionLineOffset;
            x2 = x2nc - CanvasSelectionManager_1.CanvasSelectionManager.extensionLineOffset;
        }
        else if (rect.x > sRect.right) {
            x1nc = rect.x;
            x2nc = sRect.right;
            x1 = x1nc - CanvasSelectionManager_1.CanvasSelectionManager.extensionLineOffset;
            x2 = x2nc + lwCor + CanvasSelectionManager_1.CanvasSelectionManager.extensionLineOffset;
        }
        if (rect.bottom < sRect.y) {
            y1nc = rect.bottom;
            y2nc = sRect.y;
            y1 = y1nc + lwCor + CanvasSelectionManager_1.CanvasSelectionManager.extensionLineOffset;
            y2 = y2nc - CanvasSelectionManager_1.CanvasSelectionManager.extensionLineOffset;
        }
        else if (rect.y > sRect.bottom) {
            y1nc = rect.y;
            y2nc = sRect.bottom;
            y1 = y1nc - CanvasSelectionManager_1.CanvasSelectionManager.extensionLineOffset;
            y2 = y2nc + lwCor + CanvasSelectionManager_1.CanvasSelectionManager.extensionLineOffset;
        }
        if (x1 !== undefined && x2 !== undefined) {
            var distanceText = this.getViewUnitText(Math.abs(x1nc - x2nc));
            if (rect.center.y === sRect.center.y) {
                var segment = new segment_1.Segment(new point_1.Point(x1, rect.center.y), new point_1.Point(x2, sRect.center.y));
                this.extensionLinesVisualizer.addSegment(x1 > x2 ? ExtensionLinesVisualizer_1.ExtensionLineType.VerticalCenterAfter : ExtensionLinesVisualizer_1.ExtensionLineType.VerticalCenterBefore, segment, showDistance ? distanceText : "");
                showDistance = false;
            }
            if (rect.y === sRect.y) {
                var segment = new segment_1.Segment(new point_1.Point(x1, rect.y), new point_1.Point(x2, sRect.y));
                this.extensionLinesVisualizer.addSegment(x1 > x2 ? ExtensionLinesVisualizer_1.ExtensionLineType.TopToTopAfter : ExtensionLinesVisualizer_1.ExtensionLineType.TopToTopBefore, segment, showDistance ? distanceText : "");
            }
            if (rect.bottom === sRect.bottom) {
                var segment = new segment_1.Segment(new point_1.Point(x1, rect.bottom + lwCor), new point_1.Point(x2, sRect.bottom + lwCor));
                this.extensionLinesVisualizer.addSegment(x1 > x2 ? ExtensionLinesVisualizer_1.ExtensionLineType.BottomToBottomAfter : ExtensionLinesVisualizer_1.ExtensionLineType.BottomToBottomBefore, segment, showDistance ? distanceText : "");
            }
            if (rect.y === sRect.bottom) {
                var segment = new segment_1.Segment(new point_1.Point(x1, rect.y), new point_1.Point(x2, sRect.bottom + lwCor));
                this.extensionLinesVisualizer.addSegment(x1 > x2 ? ExtensionLinesVisualizer_1.ExtensionLineType.TopToBottomAfter : ExtensionLinesVisualizer_1.ExtensionLineType.TopToBottomBefore, segment, showDistance ? distanceText : "");
            }
            if (rect.bottom === sRect.y) {
                var segment = new segment_1.Segment(new point_1.Point(x1, rect.bottom + lwCor), new point_1.Point(x2, sRect.y));
                this.extensionLinesVisualizer.addSegment(x1 > x2 ? ExtensionLinesVisualizer_1.ExtensionLineType.BottomToTopAfter : ExtensionLinesVisualizer_1.ExtensionLineType.BottomToTopBefore, segment, showDistance ? distanceText : "");
            }
        }
        if (y1 !== undefined && y2 !== undefined) {
            var distanceText = this.getViewUnitText(Math.abs(y1nc - y2nc));
            if (rect.center.x === sRect.center.x) {
                var segment = new segment_1.Segment(new point_1.Point(rect.center.x, y1), new point_1.Point(sRect.center.x, y2));
                this.extensionLinesVisualizer.addSegment(y1 > y2 ? ExtensionLinesVisualizer_1.ExtensionLineType.HorizontalCenterBelow : ExtensionLinesVisualizer_1.ExtensionLineType.HorizontalCenterAbove, segment, showDistance ? distanceText : "");
                showDistance = false;
            }
            if (rect.x === sRect.x) {
                var segment = new segment_1.Segment(new point_1.Point(rect.x, y1), new point_1.Point(sRect.x, y2));
                this.extensionLinesVisualizer.addSegment(y1 > y2 ? ExtensionLinesVisualizer_1.ExtensionLineType.LeftToLeftBelow : ExtensionLinesVisualizer_1.ExtensionLineType.LeftToLeftAbove, segment, showDistance ? distanceText : "");
            }
            if (rect.right === sRect.right) {
                var segment = new segment_1.Segment(new point_1.Point(rect.right + lwCor, y1), new point_1.Point(sRect.right + lwCor, y2));
                this.extensionLinesVisualizer.addSegment(y1 > y2 ? ExtensionLinesVisualizer_1.ExtensionLineType.RightToRightBelow : ExtensionLinesVisualizer_1.ExtensionLineType.RightToRightAbove, segment, showDistance ? distanceText : "");
            }
            if (rect.x === sRect.right) {
                var segment = new segment_1.Segment(new point_1.Point(rect.x, y1), new point_1.Point(sRect.right + lwCor, y2));
                this.extensionLinesVisualizer.addSegment(y1 > y2 ? ExtensionLinesVisualizer_1.ExtensionLineType.LeftToRightBelow : ExtensionLinesVisualizer_1.ExtensionLineType.LeftToRightAbove, segment, showDistance ? distanceText : "");
            }
            if (rect.right === sRect.x) {
                var segment = new segment_1.Segment(new point_1.Point(rect.right + lwCor, y1), new point_1.Point(sRect.x, y2));
                this.extensionLinesVisualizer.addSegment(y1 > y2 ? ExtensionLinesVisualizer_1.ExtensionLineType.RightToLeftBelow : ExtensionLinesVisualizer_1.ExtensionLineType.RightToLeftAbove, segment, showDistance ? distanceText : "");
            }
        }
    };
    VisualizerManager.prototype.resetExtensionLines = function () {
        this.extensionLinesVisualizer.reset();
    };
    VisualizerManager.prototype.setResizeInfo = function (items) {
        var rect = ModelUtils_1.ModelUtils.createRectangle(items);
        var point = new point_1.Point(rect.center.x, rect.bottom + CanvasSelectionManager_1.CanvasSelectionManager.resizeInfoOffset);
        var text = this.getViewUnitText(rect.width) + " x " + this.getViewUnitText(rect.height);
        this.resizeInfoVisualizer.set(point, text);
    };
    VisualizerManager.prototype.resetResizeInfo = function () {
        this.resizeInfoVisualizer.reset();
    };
    VisualizerManager.prototype.setSelectionRectangle = function (rect) {
        this.selectionRectangleVisualizer.setRectangle(rect);
    };
    VisualizerManager.prototype.resetSelectionRectangle = function () {
        this.selectionRectangleVisualizer.reset();
    };
    VisualizerManager.prototype.getViewUnitText = function (value) {
        return ModelUtils_1.ModelUtils.getUnitText(this.settings.viewUnits, LocalizationService_1.DiagramLocalizationService.unitItems, LocalizationService_1.DiagramLocalizationService.formatUnit, value);
    };
    VisualizerManager.prototype.notifyReadOnlyChanged = function (readOnly) {
        this.readOnly = readOnly;
        if (this.readOnly) {
            this.resetConnectionPoints();
            this.resetConnectionTarget();
            this.resetExtensionLines();
            this.resetContainerTarget();
            this.resetResizeInfo();
            this.resetSelectionRectangle();
        }
    };
    VisualizerManager.prototype.notifyDragStart = function (itemKeys) { };
    VisualizerManager.prototype.notifyDragEnd = function (itemKeys) { };
    VisualizerManager.prototype.notifyDragScrollStart = function () { };
    VisualizerManager.prototype.notifyDragScrollEnd = function () { };
    VisualizerManager.prototype.onUpdateUnlocked = function (occurredEvents) { };
    return VisualizerManager;
}(batch_updatable_1.BatchUpdatableObject));
exports.VisualizerManager = VisualizerManager;
//# sourceMappingURL=VisualizersManager.js.map