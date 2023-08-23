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
exports.MouseHandlerDragDiagramItemStateBase = exports.DraggingConnector = void 0;
var vector_1 = require("@devexpress/utils/lib/geometry/vector");
var ChangeConnectorPointsHistoryItem_1 = require("../../History/Common/ChangeConnectorPointsHistoryItem");
var ConnectorRenderPoint_1 = require("../../Model/Connectors/ConnectorRenderPoint");
var ConnectorRenderPointsContext_1 = require("../../Model/Connectors/Routing/ConnectorRenderPointsContext");
var ModelUtils_1 = require("../../Model/ModelUtils");
var ModelOperationSettings_1 = require("../../ModelOperationSettings");
var Event_1 = require("../Event");
var MouseHandlerDraggingState_1 = require("./MouseHandlerDraggingState");
var DraggingConnector = (function () {
    function DraggingConnector(connector) {
        this.connector = connector;
        this.startPoints = connector.points.map(function (x) { return x.clone(); });
        this.startRenderContext = connector.tryCreateRenderPointsContext();
    }
    return DraggingConnector;
}());
exports.DraggingConnector = DraggingConnector;
var DraggingShape = (function () {
    function DraggingShape(shape) {
        this.shape = shape;
        this.startPosition = shape.position.clone();
    }
    return DraggingShape;
}());
var MouseHandlerDragDiagramItemStateBase = (function (_super) {
    __extends(MouseHandlerDragDiagramItemStateBase, _super);
    function MouseHandlerDragDiagramItemStateBase(handler, history, model, selection, visualizerManager) {
        var _this = _super.call(this, handler, history) || this;
        _this.model = model;
        _this.selection = selection;
        _this.visualizerManager = visualizerManager;
        _this.startScrollLeft = 0;
        _this.startScrollTop = 0;
        return _this;
    }
    MouseHandlerDragDiagramItemStateBase.prototype.finish = function () {
        this.visualizerManager.resetExtensionLines();
        this.visualizerManager.resetContainerTarget();
        this.visualizerManager.resetConnectionTarget();
        this.visualizerManager.resetConnectionPoints();
        _super.prototype.finish.call(this);
    };
    MouseHandlerDragDiagramItemStateBase.prototype.onMouseDown = function (evt) {
        var _this = this;
        this.handler.addDiagramItemToSelection(evt);
        this.shouldClone = this.handler.canCopySelectedItems(evt);
        this.startPoint = evt.modelPoint;
        this.initDrag();
        this.lockInitDrag = false;
        if (!this.shouldClone)
            this.draggingShapes.forEach(function (draggingShape) { return _this.handler.addInteractingItem(draggingShape.shape, ModelOperationSettings_1.DiagramModelOperation.MoveShape); });
        _super.prototype.onMouseDown.call(this, evt);
    };
    MouseHandlerDragDiagramItemStateBase.prototype.onMouseMove = function (evt) {
        this.mouseMoveEvent = evt;
        if (evt.button !== Event_1.MouseButton.Left) {
            this.cancelChanges();
            this.handler.switchToDefaultState();
            return;
        }
        if (!this.canApplyChangesOnMouseMove(this.startPoint, evt.modelPoint))
            return;
        if (this.handler.canCopySelectedItems(evt))
            if (!this.lockInitDrag) {
                this.cancelChanges();
                this.shouldClone = true;
                this.copySelection();
                this.initDrag();
                this.lockInitDrag = true;
            }
        this.onApplyChanges(evt);
        this.onAfterApplyChanges();
        this.updateContainers(evt);
    };
    MouseHandlerDragDiagramItemStateBase.prototype.updateContainers = function (evt) {
        this.visualizerManager.setExtensionLines(this.selection.getSelectedShapes(false, true));
        var container = ModelUtils_1.ModelUtils.findContainerByEventKey(this.model, this.selection, evt.source.key);
        if (container && this.allowInsertToContainer(evt, container))
            this.visualizerManager.setContainerTarget(container, evt.source.type);
        else
            this.visualizerManager.resetContainerTarget();
    };
    MouseHandlerDragDiagramItemStateBase.prototype.onMouseUp = function (evt) {
        _super.prototype.onMouseUp.call(this, evt);
        if (this.handler.canRemoveDiagramItemToSelection(evt) && this.handler.canMultipleSelection(evt))
            this.handler.removeDiagramItemFromSelection(evt.button, evt.source.key);
    };
    MouseHandlerDragDiagramItemStateBase.prototype.onApplyChanges = function (evt) {
        var _this = this;
        this.calculateFixedPosition(evt);
        if (this.draggingShapes.length) {
            var selectedShapes_1 = this.draggingShapes.map(function (ds) { return ds.shape; });
            this.draggingShapes.forEach(function (ds) {
                var shape = ds.shape;
                while (shape.container) {
                    if (selectedShapes_1.indexOf(shape.container) !== -1)
                        return false;
                    shape = shape.container;
                }
                _this.moveShape(ds, evt);
            });
            var firstDraggingShape = this.draggingShapes[0];
            var offset_1 = vector_1.Vector.fromPoints(firstDraggingShape.startPosition.clone(), firstDraggingShape.shape.position.clone());
            if (offset_1.x || offset_1.y)
                this.draggingConnectors.forEach(function (dc) { return _this.moveConnectorCore(dc.connector, dc.startPoints, dc.startRenderContext, offset_1); });
        }
        else
            this.draggingConnectors.forEach(function (x) { return _this.moveConnector(x, evt); });
        var container = ModelUtils_1.ModelUtils.findContainerByEventKey(this.model, this.selection, evt.source.key);
        if (container && this.allowInsertToContainer(evt, container))
            ModelUtils_1.ModelUtils.insertSelectionToContainer(this.history, this.model, this.selection, container);
        else
            ModelUtils_1.ModelUtils.removeSelectionFromContainer(this.history, this.model, this.selection);
        this.handler.tryUpdateModelSize(function (offsetLeft, offsetTop) {
            _this.modelConnectorsWithoutBeginItemInfo.forEach(function (pi) {
                pi.point.x += offsetLeft;
                pi.point.y += offsetTop;
            });
            _this.modelConnectorsWithoutEndItemInfo.forEach(function (pi) {
                pi.point.x += offsetLeft;
                pi.point.y += offsetTop;
            });
        });
    };
    MouseHandlerDragDiagramItemStateBase.prototype.getDraggingElementKeys = function () {
        return this.draggingShapes.map(function (x) { return x.shape.key; }).concat(this.draggingConnectors.map(function (x) { return x.connector.key; }));
    };
    MouseHandlerDragDiagramItemStateBase.prototype.getSnappedPoint = function (evt, point) {
        return this.handler.getSnappedPointOnDragDiagramItem(evt, point, this.fixedX, this.fixedY, this.startPoint);
    };
    MouseHandlerDragDiagramItemStateBase.prototype.initDrag = function () {
        this.selectedItems = ModelUtils_1.ModelUtils.createSelectedItems(this.selection);
        this.initDraggingShapes();
        if (!this.areValidDraggingShapes) {
            this.handler.switchToDefaultState();
            return;
        }
        this.initDraggingConnectors();
        if (!this.areValidDraggingConnectors) {
            this.handler.switchToDefaultState();
            return;
        }
        this.modelConnectorsWithoutBeginItemInfo = this.createModelConnectorsWithoutBeginItemInfo();
        this.modelConnectorsWithoutEndItemInfo = this.createModelConnectorsWithoutEndItemInfo();
    };
    MouseHandlerDragDiagramItemStateBase.prototype.initDraggingShapes = function () {
        this.draggingShapes = this.selection.getSelectedShapes(false, true).map(function (s) { return new DraggingShape(s); });
    };
    MouseHandlerDragDiagramItemStateBase.prototype.initDraggingConnectors = function () {
        var _this = this;
        this.draggingConnectors = [];
        this.draggingConnectorsIndexByKey = {};
        this.selection.getSelectedConnectors(false, true).forEach(function (c) { return _this.registerConnector(c); });
        if (this.shouldClone)
            return;
        this.draggingShapes.forEach(function (x) {
            var attachedConnectors = x.shape.attachedConnectors;
            if (attachedConnectors)
                attachedConnectors.forEach(function (c) {
                    if (!_this.containsDraggingConnectorByKey(c.key))
                        _this.registerConnector(c);
                });
        });
    };
    MouseHandlerDragDiagramItemStateBase.prototype.copySelection = function () {
        var _this = this;
        ModelUtils_1.ModelUtils.cloneSelectionToOffset(this.history, this.model, function (key) {
            var item = _this.model.findItem(key);
            if (item)
                _this.handler.addInteractingItem(item, ModelOperationSettings_1.DiagramModelOperation.AddShape);
        }, this.selection, 0, 0);
    };
    MouseHandlerDragDiagramItemStateBase.prototype.calculateFixedPosition = function (evt) {
        this.fixedX = false;
        this.fixedY = false;
        if (this.handler.canCalculateFixedPosition(evt)) {
            var dx = Math.abs(this.startPoint.x - evt.modelPoint.x);
            var dy = Math.abs(this.startPoint.y - evt.modelPoint.y);
            if (dx < dy)
                this.fixedX = true;
            else
                this.fixedY = true;
        }
    };
    MouseHandlerDragDiagramItemStateBase.prototype.containsDraggingConnectorByKey = function (key) {
        return this.draggingConnectorsIndexByKey[key] !== undefined;
    };
    MouseHandlerDragDiagramItemStateBase.prototype.allowInsertToContainer = function (evt, container) {
        if (this.handler.canMultipleSelection(evt))
            return false;
        return container && container.expanded && ModelUtils_1.ModelUtils.canInsertSelectionToContainer(this.model, this.selection, container);
    };
    MouseHandlerDragDiagramItemStateBase.prototype.registerConnector = function (connector) {
        this.draggingConnectorsIndexByKey[connector.key] = this.draggingConnectors.push(new DraggingConnector(connector)) - 1;
    };
    MouseHandlerDragDiagramItemStateBase.prototype.createModelConnectorsWithoutBeginItemInfo = function () {
        var _this = this;
        var connectors = this.model.findConnectorsCore(function (c) { return !c.beginItem && !_this.containsDraggingConnectorByKey(c.key); });
        return connectors.map(function (c) {
            return {
                connector: c,
                point: c.points[0].clone()
            };
        });
    };
    MouseHandlerDragDiagramItemStateBase.prototype.createModelConnectorsWithoutEndItemInfo = function () {
        var _this = this;
        var connectors = this.model.findConnectorsCore(function (c) { return !c.endItem && !_this.containsDraggingConnectorByKey(c.key); });
        return connectors.map(function (c) {
            return {
                connector: c,
                point: c.points[c.points.length - 1].clone()
            };
        });
    };
    MouseHandlerDragDiagramItemStateBase.prototype.moveConnector = function (dc, evt) {
        var startPoints = dc.startPoints;
        var offset = vector_1.Vector.fromPoints(startPoints[0].clone(), this.getSnappedPoint(evt, startPoints[0]).clone());
        if (offset.x || offset.y)
            this.moveConnectorCore(dc.connector, startPoints, dc.startRenderContext, offset);
    };
    MouseHandlerDragDiagramItemStateBase.prototype.moveConnectorCore = function (connector, startPoints, startRenderContext, offset) {
        if (this.shouldClone || ModelUtils_1.ModelUtils.canMoveConnector(this.selectedItems, connector))
            this.offsetConnector(connector, startPoints, startRenderContext, offset);
        else
            this.changeConnector(connector);
    };
    MouseHandlerDragDiagramItemStateBase.prototype.moveShape = function (ds, evt) {
        var _this = this;
        var shape = ds.shape;
        var position = this.getSnappedPoint(evt, ds.startPosition);
        ModelUtils_1.ModelUtils.setShapePosition(this.history, this.model, shape, position);
        ModelUtils_1.ModelUtils.updateMovingShapeConnections(this.history, shape, this.modelConnectorsWithoutBeginItemInfo, this.modelConnectorsWithoutEndItemInfo, function () {
            _this.visualizerManager.resetConnectionTarget();
            _this.visualizerManager.resetConnectionPoints();
        }, function (shape, connectionPointIndex) {
            _this.visualizerManager.setConnectionTarget(shape, Event_1.MouseEventElementType.Shape);
            _this.visualizerManager.setConnectionPoints(shape, Event_1.MouseEventElementType.Shape, connectionPointIndex, true);
        }, function (connector) { return _this.handler.addInteractingItem(connector); });
        if (!this.draggingConnectors.filter(function (dc) { return !!_this.selectedItems[dc.connector.key]; }).length)
            ModelUtils_1.ModelUtils.updateShapeAttachedConnectors(this.history, this.model, shape);
    };
    MouseHandlerDragDiagramItemStateBase.prototype.offsetConnector = function (connector, startPoints, startRenderContext, offset) {
        var _this = this;
        var newPoints = startPoints.map(function (p) { return _this.offsetPoint(p, offset); });
        if (!newPoints[0].equals(connector.points[0]))
            this.history.addAndRedo(new ChangeConnectorPointsHistoryItem_1.ChangeConnectorPointsHistoryItem(connector.key, newPoints, this.offsetRenderContext(startRenderContext, offset)));
    };
    MouseHandlerDragDiagramItemStateBase.prototype.offsetRenderContext = function (context, offset) {
        var _this = this;
        if (context === undefined)
            return undefined;
        return new ConnectorRenderPointsContext_1.ConnectorRenderPointsContext(context.renderPoints.map(function (p) {
            var newPoint = _this.offsetPoint(p, offset);
            return new ConnectorRenderPoint_1.ConnectorRenderPoint(newPoint.x, newPoint.y, p.pointIndex, p.skipped);
        }), true, context.actualRoutingMode);
    };
    MouseHandlerDragDiagramItemStateBase.prototype.offsetPoint = function (point, offset) {
        var pointOffset = vector_1.Vector.fromPoints(point, this.startPoint);
        return this.startPoint.clone().offset(offset.x - pointOffset.x, offset.y - pointOffset.y);
    };
    MouseHandlerDragDiagramItemStateBase.prototype.changeConnector = function (connector) {
        ModelUtils_1.ModelUtils.tryRemoveConnectorIntermediatePoints(this.history, connector);
        ModelUtils_1.ModelUtils.updateConnectorAttachedPoints(this.history, this.model, connector);
    };
    return MouseHandlerDragDiagramItemStateBase;
}(MouseHandlerDraggingState_1.MouseHandlerDraggingState));
exports.MouseHandlerDragDiagramItemStateBase = MouseHandlerDragDiagramItemStateBase;
//# sourceMappingURL=MouseHandlerDragDiagramItemStateBase.js.map