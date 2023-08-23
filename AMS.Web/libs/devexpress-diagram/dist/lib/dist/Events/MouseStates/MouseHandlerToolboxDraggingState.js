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
exports.MouseHandlerToolboxDraggingState = exports.MouseHandlerBeforeToolboxDraggingState = void 0;
var Event_1 = require("../Event");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var AddShapeHistoryItem_1 = require("../../History/Common/AddShapeHistoryItem");
var SetSelectionHistoryItem_1 = require("../../History/Common/SetSelectionHistoryItem");
var MouseHandlerDraggingState_1 = require("./MouseHandlerDraggingState");
var DeleteShapeHistoryItem_1 = require("../../History/Common/DeleteShapeHistoryItem");
var ModelUtils_1 = require("../../Model/ModelUtils");
var MouseHandlerStateBase_1 = require("./MouseHandlerStateBase");
var ModelOperationSettings_1 = require("../../ModelOperationSettings");
var NON_DOCUMENT_TIMER = 500;
var LOCK_UPDATEPAGESIZE_TIMER = 300;
var MouseHandlerBeforeToolboxDraggingState = (function (_super) {
    __extends(MouseHandlerBeforeToolboxDraggingState, _super);
    function MouseHandlerBeforeToolboxDraggingState(handler, history, model, selection, visualizerManager, shapeDescriptionManager) {
        var _this = _super.call(this, handler) || this;
        _this.history = history;
        _this.model = model;
        _this.selection = selection;
        _this.visualizerManager = visualizerManager;
        _this.shapeDescriptionManager = shapeDescriptionManager;
        _this.isModelEmpty = model.items.length === 0;
        return _this;
    }
    MouseHandlerBeforeToolboxDraggingState.prototype.cancelChanges = function () {
        this.tryRemoveTimer();
    };
    MouseHandlerBeforeToolboxDraggingState.prototype.onDragStart = function (evt) {
        this.dragging = evt;
    };
    MouseHandlerBeforeToolboxDraggingState.prototype.onDragEnd = function (evt) {
        this.cancelChanges();
        this.handler.switchToDefaultState();
    };
    MouseHandlerBeforeToolboxDraggingState.prototype.onMouseMove = function (evt) {
        var _this = this;
        if (evt.source.type > Event_1.MouseEventElementType.Background) {
            this.tryRemoveTimer();
            this.switchToDraggingState(evt, false);
        }
        else if (evt.source.type === Event_1.MouseEventElementType.Background && !this.isModelEmpty) {
            this.savedEvt = evt;
            if (this.nonPageAreaTimer === undefined)
                this.nonPageAreaTimer = setTimeout(function () { return _this.switchToDraggingState(_this.savedEvt, true); }, NON_DOCUMENT_TIMER);
        }
        else if (this.nonPageAreaTimer !== undefined)
            this.tryRemoveTimer();
    };
    MouseHandlerBeforeToolboxDraggingState.prototype.switchToDraggingState = function (evt, skipLockUpdatePageSize) {
        this.handler.switchState(new MouseHandlerToolboxDraggingState(this.handler, this.history, this.model, this.selection, this.visualizerManager, this.shapeDescriptionManager, skipLockUpdatePageSize));
        this.handler.state.onDragStart(this.dragging);
        this.handler.state.onMouseMove(evt);
    };
    MouseHandlerBeforeToolboxDraggingState.prototype.tryRemoveTimer = function () {
        if (this.nonPageAreaTimer !== undefined) {
            clearTimeout(this.nonPageAreaTimer);
            delete this.nonPageAreaTimer;
        }
    };
    MouseHandlerBeforeToolboxDraggingState.prototype.finish = function () {
        this.tryRemoveTimer();
    };
    return MouseHandlerBeforeToolboxDraggingState;
}(MouseHandlerStateBase_1.MouseHandlerCancellableState));
exports.MouseHandlerBeforeToolboxDraggingState = MouseHandlerBeforeToolboxDraggingState;
var MouseHandlerToolboxDraggingState = (function (_super) {
    __extends(MouseHandlerToolboxDraggingState, _super);
    function MouseHandlerToolboxDraggingState(handler, history, model, selection, visualizerManager, shapeDescriptionManager, skipLockUpdatePageSize) {
        var _this = _super.call(this, handler, history) || this;
        _this.model = model;
        _this.selection = selection;
        _this.visualizerManager = visualizerManager;
        _this.shapeDescriptionManager = shapeDescriptionManager;
        if (!skipLockUpdatePageSize)
            _this.updatePageSizeTimer = setTimeout(function () {
                _this.processAndRemoveUpdatePageSizeTimer();
            }, LOCK_UPDATEPAGESIZE_TIMER);
        return _this;
    }
    MouseHandlerToolboxDraggingState.prototype.cancelChanges = function () {
        this.tryRemoveUpdatePageSizeTimer();
        _super.prototype.cancelChanges.call(this);
    };
    MouseHandlerToolboxDraggingState.prototype.tryRemoveUpdatePageSizeTimer = function () {
        if (this.updatePageSizeTimer !== undefined) {
            clearTimeout(this.updatePageSizeTimer);
            delete this.updatePageSizeTimer;
        }
    };
    MouseHandlerToolboxDraggingState.prototype.processAndRemoveUpdatePageSizeTimer = function () {
        if (this.updatePageSizeTimer !== undefined) {
            this.handler.tryUpdateModelSize();
            delete this.updatePageSizeTimer;
        }
    };
    MouseHandlerToolboxDraggingState.prototype.onMouseMove = function (evt) {
        _super.prototype.onMouseMove.call(this, evt);
        var shape = this.model.findShape(this.shapeKey);
        if (shape) {
            this.visualizerManager.setExtensionLines([shape]);
            var container = ModelUtils_1.ModelUtils.findContainerByEventKey(this.model, this.selection, evt.source.key);
            if (container && this.allowInsertToContainer(evt, shape, container))
                this.visualizerManager.setContainerTarget(container, evt.source.type);
            else
                this.visualizerManager.resetContainerTarget();
        }
    };
    MouseHandlerToolboxDraggingState.prototype.getDraggingElementKeys = function () {
        return this.shapeKey === undefined ? [] : [this.shapeKey];
    };
    MouseHandlerToolboxDraggingState.prototype.onApplyChanges = function (evt) {
        var _this = this;
        if (evt.source.type === Event_1.MouseEventElementType.Undefined) {
            this.dragging.onCaptured(false);
            if (this.shapeKey !== undefined && !this.deleteHistoryItem) {
                var shape = this.model.findShape(this.shapeKey);
                ModelUtils_1.ModelUtils.detachConnectors(this.history, shape);
                ModelUtils_1.ModelUtils.removeFromContainer(this.history, this.model, shape);
                this.deleteHistoryItem = new DeleteShapeHistoryItem_1.DeleteShapeHistoryItem(this.shapeKey, true);
                this.history.addAndRedo(this.deleteHistoryItem);
            }
        }
        else {
            this.dragging.onCaptured(true);
            if (this.shapeKey === undefined) {
                this.startPoint = evt.modelPoint;
                this.shapeKey = this.insertToolboxItem(evt);
                var shape_1 = this.model.findShape(this.shapeKey);
                if (shape_1)
                    this.handler.addInteractingItem(shape_1, ModelOperationSettings_1.DiagramModelOperation.AddShape);
            }
            if (this.deleteHistoryItem) {
                this.history.undoTransactionTo(this.deleteHistoryItem);
                delete this.deleteHistoryItem;
            }
            var pos = this.getPosition(evt, this.startShapePosition);
            var shape = this.model.findShape(this.shapeKey);
            ModelUtils_1.ModelUtils.setShapePosition(this.history, this.model, shape, pos);
            ModelUtils_1.ModelUtils.updateMovingShapeConnections(this.history, shape, this.connectorsWithoutBeginItemInfo, this.connectorsWithoutEndItemInfo, function () {
                _this.visualizerManager.resetConnectionTarget();
                _this.visualizerManager.resetConnectionPoints();
            }, function (shape, connectionPointIndex) {
                _this.visualizerManager.setConnectionTarget(shape, Event_1.MouseEventElementType.Shape);
                _this.visualizerManager.setConnectionPoints(shape, Event_1.MouseEventElementType.Shape, connectionPointIndex, true);
            }, function (connector) { return _this.handler.addInteractingItem(connector); });
            ModelUtils_1.ModelUtils.updateShapeAttachedConnectors(this.history, this.model, shape);
            var container = ModelUtils_1.ModelUtils.findContainerByEventKey(this.model, this.selection, evt.source.key);
            if (shape && container && this.allowInsertToContainer(evt, shape, container))
                ModelUtils_1.ModelUtils.insertToContainer(this.history, this.model, shape, container);
            else
                ModelUtils_1.ModelUtils.removeFromContainer(this.history, this.model, shape);
            if (this.updatePageSizeTimer === undefined)
                this.handler.tryUpdateModelSize(function (offsetLeft, offsetTop) {
                    _this.connectorsWithoutBeginItemInfo.forEach(function (pi) {
                        pi.point.x += offsetLeft;
                        pi.point.y += offsetTop;
                    });
                    _this.connectorsWithoutEndItemInfo.forEach(function (pi) {
                        pi.point.x += offsetLeft;
                        pi.point.y += offsetTop;
                    });
                });
        }
    };
    MouseHandlerToolboxDraggingState.prototype.onFinishWithChanges = function () {
        if (!this.deleteHistoryItem)
            this.history.addAndRedo(new SetSelectionHistoryItem_1.SetSelectionHistoryItem(this.selection, [this.shapeKey]));
    };
    MouseHandlerToolboxDraggingState.prototype.onDragStart = function (evt) {
        this.dragging = evt;
        this.connectorsWithoutBeginItemInfo = ModelUtils_1.ModelUtils.getConnectorsWithoutBeginItemInfo(this.model);
        this.connectorsWithoutEndItemInfo = ModelUtils_1.ModelUtils.getConnectorsWithoutEndItemInfo(this.model);
    };
    MouseHandlerToolboxDraggingState.prototype.onDragEnd = function (evt) {
        if (this.shapeKey !== undefined && evt.source.type === Event_1.MouseEventElementType.Undefined)
            this.cancelChanges();
        this.handler.switchToDefaultState();
    };
    MouseHandlerToolboxDraggingState.prototype.finish = function () {
        this.visualizerManager.resetExtensionLines();
        this.visualizerManager.resetContainerTarget();
        this.visualizerManager.resetConnectionTarget();
        this.visualizerManager.resetConnectionPoints();
        this.processAndRemoveUpdatePageSizeTimer();
        this.dragging.onFinishDragging();
        _super.prototype.finish.call(this);
    };
    MouseHandlerToolboxDraggingState.prototype.insertToolboxItem = function (evt) {
        var description = this.shapeDescriptionManager.get(this.dragging.data);
        this.startShapePosition = this.getSnappedPoint(evt, new point_1.Point(evt.modelPoint.x - description.defaultSize.width / 2, evt.modelPoint.y - description.defaultSize.height / 2));
        var historyItem = new AddShapeHistoryItem_1.AddShapeHistoryItem(description, this.startShapePosition);
        this.history.addAndRedo(historyItem);
        ModelUtils_1.ModelUtils.updateNewShapeProperties(this.history, this.selection, historyItem.shapeKey);
        return historyItem.shapeKey;
    };
    MouseHandlerToolboxDraggingState.prototype.allowInsertToContainer = function (evt, item, container) {
        if (this.handler.canMultipleSelection(evt))
            return false;
        return container && container.expanded && ModelUtils_1.ModelUtils.canInsertToContainer(this.model, item, container);
    };
    MouseHandlerToolboxDraggingState.prototype.getPosition = function (evt, basePoint) {
        return this.getSnappedPoint(evt, new point_1.Point(basePoint.x + evt.modelPoint.x - this.startPoint.x, basePoint.y + evt.modelPoint.y - this.startPoint.y));
    };
    return MouseHandlerToolboxDraggingState;
}(MouseHandlerDraggingState_1.MouseHandlerDraggingState));
exports.MouseHandlerToolboxDraggingState = MouseHandlerToolboxDraggingState;
//# sourceMappingURL=MouseHandlerToolboxDraggingState.js.map