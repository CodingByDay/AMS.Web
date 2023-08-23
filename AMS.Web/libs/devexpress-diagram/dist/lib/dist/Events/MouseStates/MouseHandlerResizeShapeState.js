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
exports.MouseHandlerResizeShapeState = void 0;
var size_1 = require("@devexpress/utils/lib/geometry/size");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var Event_1 = require("../Event");
var MouseHandlerDraggingState_1 = require("./MouseHandlerDraggingState");
var ModelUtils_1 = require("../../Model/ModelUtils");
var ShapeDescription_1 = require("../../Model/Shapes/Descriptions/ShapeDescription");
var ModelOperationSettings_1 = require("../../ModelOperationSettings");
var MouseHandlerResizeShapeState = (function (_super) {
    __extends(MouseHandlerResizeShapeState, _super);
    function MouseHandlerResizeShapeState(handler, history, model, selection, visualizerManager, settings) {
        var _this = _super.call(this, handler, history) || this;
        _this.model = model;
        _this.selection = selection;
        _this.visualizerManager = visualizerManager;
        _this.settings = settings;
        _this.startScrollLeft = 0;
        _this.startScrollTop = 0;
        _this.rotation = 0;
        return _this;
    }
    MouseHandlerResizeShapeState.prototype.finish = function () {
        this.visualizerManager.resetResizeInfo();
        this.visualizerManager.resetExtensionLines();
        _super.prototype.finish.call(this);
    };
    MouseHandlerResizeShapeState.prototype.onMouseDown = function (evt) {
        var _this = this;
        var source = parseInt(evt.source.value);
        this.resizeEventSource = source;
        this.startPoint = evt.modelPoint;
        this.lockH = source === Event_1.ResizeEventSource.ResizeBox_S || source === Event_1.ResizeEventSource.ResizeBox_N;
        this.lockV = source === Event_1.ResizeEventSource.ResizeBox_E || source === Event_1.ResizeEventSource.ResizeBox_W;
        this.sideH = source === Event_1.ResizeEventSource.ResizeBox_E || source === Event_1.ResizeEventSource.ResizeBox_NE || source === Event_1.ResizeEventSource.ResizeBox_SE;
        this.sideV = source === Event_1.ResizeEventSource.ResizeBox_SE || source === Event_1.ResizeEventSource.ResizeBox_S || source === Event_1.ResizeEventSource.ResizeBox_SW;
        this.shapes = this.selection.getSelectedShapes();
        if (this.shapes.length === 0) {
            this.handler.switchToDefaultState();
            return;
        }
        this.shapes.forEach(function (shape) {
            _this.handler.addInteractingItem(shape, ModelOperationSettings_1.DiagramModelOperation.ResizeShape);
            _this.handler.addInteractingItem(shape, ModelOperationSettings_1.DiagramModelOperation.MoveShape);
        });
        this.connectors = this.selection.getSelectedConnectors();
        this.startRectangle = ModelUtils_1.ModelUtils.createRectangle(this.shapes);
        this.startShapeSizes = this.shapes.map(function (shape) { return shape.size.clone(); });
        this.startShapePositions = this.shapes.map(function (shape) { return shape.position.clone(); });
        this.startConnectorPoints = this.connectors.map(function (c) { return c.points.map(function (p) { return p.clone(); }); });
        _super.prototype.onMouseDown.call(this, evt);
    };
    MouseHandlerResizeShapeState.prototype.onMouseMove = function (evt) {
        _super.prototype.onMouseMove.call(this, evt);
        var shapes = this.selection.getSelectedShapes();
        this.visualizerManager.setExtensionLines(shapes);
    };
    MouseHandlerResizeShapeState.prototype.onApplyChanges = function (evt) {
        var _this = this;
        var rectangle = ModelUtils_1.ModelUtils.createRectangle(this.shapes);
        var minWidth = this.shapes.length === 1 ? this.shapes[0].getMinWidth(this.settings.shapeMinWidth) : ShapeDescription_1.ShapeMinDimension;
        var minHeight = this.shapes.length === 1 ? this.shapes[0].getMinHeight(this.settings.shapeMinHeight) : ShapeDescription_1.ShapeMinDimension;
        var maxWidth = this.shapes.length === 1 ? this.shapes[0].getMaxWidth(this.settings.shapeMaxWidth) : undefined;
        var maxHeight = this.shapes.length === 1 ? this.shapes[0].getMaxHeight(this.settings.shapeMaxHeight) : undefined;
        var size = this.getSize(evt, rectangle.createPosition(), this.startRectangle.createSize(), minWidth, minHeight, maxWidth, maxHeight, this.handler.lockAspectRatioOnShapeResize(evt));
        var pos = this.getPosition(evt, size, this.startRectangle.createSize(), this.startRectangle.createPosition());
        var ratioX = size.width / this.startRectangle.width;
        var ratioY = size.height / this.startRectangle.height;
        this.shapes.forEach(function (shape, index) {
            var shapeWidth = _this.startShapeSizes[index].width * (shape.allowResizeHorizontally ? ratioX : 1);
            shapeWidth = _this.getNormalizedSize(shapeWidth, shape.getMinWidth(_this.settings.shapeMinWidth), shape.getMaxWidth(_this.settings.shapeMaxWidth));
            var shapeHeight = _this.startShapeSizes[index].height * (shape.allowResizeVertically ? ratioY : 1);
            shapeHeight = _this.getNormalizedSize(shapeHeight, shape.getMinHeight(_this.settings.shapeMinHeight), shape.getMaxHeight(_this.settings.shapeMaxHeight));
            var shapeLeft = shape.allowResizeHorizontally ? (pos.x + (_this.startShapePositions[index].x - _this.startRectangle.x) * ratioX) : _this.startShapePositions[index].x;
            var shapeTop = shape.allowResizeVertically ? (pos.y + (_this.startShapePositions[index].y - _this.startRectangle.y) * ratioY) : _this.startShapePositions[index].y;
            ModelUtils_1.ModelUtils.setShapeSize(_this.history, _this.model, shape, new point_1.Point(shapeLeft, shapeTop), new size_1.Size(shapeWidth, shapeHeight));
        });
        this.connectors.forEach(function (connector, index) {
            var startPtIndex = connector.beginItem ? 1 : 0;
            var endPtIndex = connector.endItem ? (connector.points.length - 2) : (connector.points.length - 1);
            for (var i = startPtIndex; i <= endPtIndex; i++) {
                var connectorPtPos = new point_1.Point(pos.x + (_this.startConnectorPoints[index][i].x - _this.startRectangle.x) * ratioX, pos.y + (_this.startConnectorPoints[index][i].y - _this.startRectangle.y) * ratioY);
                ModelUtils_1.ModelUtils.moveConnectorPoint(_this.history, connector, i, connectorPtPos);
            }
        });
        var shapes = this.selection.getSelectedShapes(false, true);
        shapes.forEach(function (shape) {
            ModelUtils_1.ModelUtils.updateShapeAttachedConnectors(_this.history, _this.model, shape);
        });
        this.tryUpdateModelSize();
        this.visualizerManager.setResizeInfo(this.shapes);
    };
    MouseHandlerResizeShapeState.prototype.tryUpdateModelSize = function () {
        var _this = this;
        this.handler.tryUpdateModelSize(function (offsetLeft, offsetTop) {
            _this.startShapePositions.forEach(function (pt) {
                pt.x += offsetLeft;
                pt.y += offsetTop;
            });
            _this.startConnectorPoints.forEach(function (connector) {
                connector.forEach(function (pt) {
                    pt.x += offsetLeft;
                    pt.y += offsetTop;
                });
            });
            _this.startRectangle.x += offsetLeft;
            _this.startRectangle.y += offsetTop;
            _this.startPoint.x += offsetLeft;
            _this.startPoint.y += offsetTop;
        });
    };
    MouseHandlerResizeShapeState.prototype.getDraggingElementKeys = function () {
        return this.shapes.map(function (shape) { return shape.key; });
    };
    MouseHandlerResizeShapeState.prototype.getNormalizedSize = function (value, minValue, maxValue) {
        if (minValue !== undefined)
            value = Math.max(value, minValue);
        if (maxValue !== undefined)
            value = Math.min(value, maxValue);
        return value;
    };
    MouseHandlerResizeShapeState.prototype.getSize = function (evt, position, startSize, minWidth, minHeight, maxWidth, maxHeight, lockAspectRatio) {
        var absDeltaX = evt.modelPoint.x - (this.startScrollLeft - evt.scrollX) - this.startPoint.x;
        var absDeltaY = evt.modelPoint.y - (this.startScrollTop - evt.scrollY) - this.startPoint.y;
        var deltaX = absDeltaX * Math.cos(this.rotation) - (-absDeltaY) * Math.sin(this.rotation);
        var deltaY = -(absDeltaX * Math.sin(this.rotation) + (-absDeltaY) * Math.cos(this.rotation));
        var newWidth;
        var newHeight;
        deltaY = !this.sideV && deltaY > 0 ? Math.min(startSize.height + 1, deltaY) : deltaY;
        deltaX = !this.sideH && deltaX > 0 ? Math.min(startSize.width + 1, deltaX) : deltaX;
        if (!this.lockH && !this.lockV && lockAspectRatio)
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                newWidth = this.getNormalizedSize(this.sideH ? (startSize.width + deltaX) : (startSize.width - deltaX), minWidth, maxWidth);
                newHeight = startSize.height * (newWidth / startSize.width);
            }
            else {
                newHeight = this.getNormalizedSize(this.sideV ? (startSize.height + deltaY) : (startSize.height - deltaY), minHeight, maxHeight);
                newWidth = startSize.width * (newHeight / startSize.height);
            }
        else {
            deltaX = this.lockH ? 0 : deltaX;
            deltaY = this.lockV ? 0 : deltaY;
            newWidth = this.getNormalizedSize(this.sideH ? (startSize.width + deltaX) : (startSize.width - deltaX), minWidth, maxWidth);
            newHeight = this.getNormalizedSize(this.sideV ? (startSize.height + deltaY) : (startSize.height - deltaY), minHeight, maxHeight);
        }
        if (!this.lockH)
            newWidth = this.getSnappedPosition(evt, position.x + newWidth, true) - position.x;
        if (!this.lockV)
            newHeight = this.getSnappedPosition(evt, position.y + newHeight, false) - position.y;
        return new size_1.Size(newWidth, newHeight);
    };
    MouseHandlerResizeShapeState.prototype.getPosition = function (evt, size, startSize, startPosition) {
        var x = startPosition.x;
        var y = startPosition.y;
        if (this.resizeEventSource === Event_1.ResizeEventSource.ResizeBox_N ||
            this.resizeEventSource === Event_1.ResizeEventSource.ResizeBox_NE ||
            this.resizeEventSource === Event_1.ResizeEventSource.ResizeBox_NW) {
            y += startSize.height - size.height;
            var snappedY = this.getSnappedPosition(evt, y, false);
            size.height += y - snappedY;
            y = snappedY;
        }
        if (this.resizeEventSource === Event_1.ResizeEventSource.ResizeBox_W ||
            this.resizeEventSource === Event_1.ResizeEventSource.ResizeBox_NW ||
            this.resizeEventSource === Event_1.ResizeEventSource.ResizeBox_SW) {
            x += startSize.width - size.width;
            var snappedX = this.getSnappedPosition(evt, x, true);
            size.width += x - snappedX;
            x = snappedX;
        }
        return new point_1.Point(x, y);
    };
    MouseHandlerResizeShapeState.prototype.getSnappedPosition = function (evt, pos, isHorizontal) {
        return this.handler.getSnappedPositionOnResizeShape(evt, pos, isHorizontal);
    };
    return MouseHandlerResizeShapeState;
}(MouseHandlerDraggingState_1.MouseHandlerDraggingState));
exports.MouseHandlerResizeShapeState = MouseHandlerResizeShapeState;
//# sourceMappingURL=MouseHandlerResizeShapeState.js.map