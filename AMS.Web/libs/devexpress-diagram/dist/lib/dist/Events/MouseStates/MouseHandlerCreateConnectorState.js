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
exports.MouseHandlerCreateConnectorState = void 0;
var Connector_1 = require("../../Model/Connectors/Connector");
var AddConnectionHistoryItem_1 = require("../../History/Common/AddConnectionHistoryItem");
var AddConnectorHistoryItem_1 = require("../../History/Common/AddConnectorHistoryItem");
var DiagramItem_1 = require("../../Model/DiagramItem");
var MouseHandlerMoveConnectorPointStateBase_1 = require("./MouseHandlerMoveConnectorPointStateBase");
var SetSelectionHistoryItem_1 = require("../../History/Common/SetSelectionHistoryItem");
var AddShapeHistoryItem_1 = require("../../History/Common/AddShapeHistoryItem");
var ModelUtils_1 = require("../../Model/ModelUtils");
var DeleteConnectionHistoryItem_1 = require("../../History/Common/DeleteConnectionHistoryItem");
var DeleteConnectorHistoryItem_1 = require("../../History/Common/DeleteConnectorHistoryItem");
var MouseHandlerCreateConnectorState = (function (_super) {
    __extends(MouseHandlerCreateConnectorState, _super);
    function MouseHandlerCreateConnectorState(handler, history, model, visualizerManager, shapeDescriptionManager, selection, connectionPointIndex) {
        var _this = _super.call(this, handler, history, model, visualizerManager) || this;
        _this.shapeDescriptionManager = shapeDescriptionManager;
        _this.selection = selection;
        _this.connectionPointIndex = connectionPointIndex;
        return _this;
    }
    MouseHandlerCreateConnectorState.prototype.onMouseDown = function (evt) {
        if (this.connectionPointIndex === undefined)
            this.connectionPointIndex = parseInt(evt.source.value);
        this.connectedItem = this.model.findItem(evt.source.key);
        this.pointIndex = 1;
        this.pointPosition = Connector_1.ConnectorPosition.End;
        _super.prototype.onMouseDown.call(this, evt);
    };
    MouseHandlerCreateConnectorState.prototype.onMouseUp = function (evt) {
        if (this.connector && !this.connector.endItem)
            this.createNewShapeAtConnectorEnd(evt);
        _super.prototype.onMouseUp.call(this, evt);
    };
    MouseHandlerCreateConnectorState.prototype.onApplyChanges = function (evt) {
        var point = this.getSnappedPoint(evt, evt.modelPoint);
        if (!this.connector) {
            var historyItem = new AddConnectorHistoryItem_1.AddConnectorHistoryItem([this.connectedItem.getConnectionPointPosition(this.connectionPointIndex, point), point]);
            this.history.addAndRedo(historyItem);
            this.connector = this.model.findConnector(historyItem.connectorKey);
            this.handler.addInteractingItem(this.connector);
            this.history.addAndRedo(new AddConnectionHistoryItem_1.AddConnectionHistoryItem(this.connector, this.connectedItem, this.connectionPointIndex, Connector_1.ConnectorPosition.Begin));
            ModelUtils_1.ModelUtils.updateNewConnectorProperties(this.history, this.selection, this.connector.key);
        }
        else
            _super.prototype.onApplyChanges.call(this, evt);
    };
    MouseHandlerCreateConnectorState.prototype.checkStoredPermissionsOnFinish = function () {
        if (this.connector && this.connector.endItem)
            _super.prototype.checkStoredPermissionsOnFinish.call(this);
    };
    MouseHandlerCreateConnectorState.prototype.onFinishWithChanges = function () {
        _super.prototype.onFinishWithChanges.call(this);
        this.history.addAndRedo(new SetSelectionHistoryItem_1.SetSelectionHistoryItem(this.selection, [this.connector.key]));
    };
    MouseHandlerCreateConnectorState.prototype.createNewShapeAtConnectorEnd = function (evt) {
        var _this = this;
        var beginShape = this.connector && this.connector.beginItem;
        if (!beginShape)
            return;
        if (this.connector && !this.handler.canPerformChangeConnection(this.connector, { position: Connector_1.ConnectorPosition.End, connectionPointIndex: -1 })) {
            this.cancelChanges();
            return;
        }
        var side = this.getNewShapeSide(this.connector);
        var point = this.getSnappedPoint(evt, evt.modelPoint);
        var category = this.shapeDescriptionManager.getCategoryByDescription(beginShape.description);
        var getPositionToInsertShapeTo = function (shape) {
            var clonedShape = shape.clone();
            clonedShape.position = point.clone();
            var position = _this.getNewShapePosition(clonedShape, side);
            return _this.handler.getSnappedPointOnDragPoint(evt, position);
        };
        this.handler.showContextToolbox(point, getPositionToInsertShapeTo, side, category, function (shapeType) {
            if (!shapeType)
                return;
            _this.handler.beginStorePermissions();
            _this.history.beginTransaction();
            var historyItem = new AddShapeHistoryItem_1.AddShapeHistoryItem(_this.shapeDescriptionManager.get(shapeType), point);
            _this.history.addAndRedo(historyItem);
            var shape = _this.model.findShape(historyItem.shapeKey);
            var container = _this.targetItem && _this.model.findNearestContainer(_this.targetItem.key);
            if (container)
                ModelUtils_1.ModelUtils.insertToContainer(_this.history, _this.model, shape, container);
            var newPosition = _this.getNewShapePosition(shape, side);
            ModelUtils_1.ModelUtils.setShapePosition(_this.history, _this.model, shape, _this.getSnappedPoint(evt, newPosition));
            ModelUtils_1.ModelUtils.updateNewShapeProperties(_this.history, _this.selection, shape.key);
            _this.history.addAndRedo(new AddConnectionHistoryItem_1.AddConnectionHistoryItem(_this.connector, shape, shape.getConnectionPointIndexForSide(side), Connector_1.ConnectorPosition.End));
            if (container)
                ModelUtils_1.ModelUtils.updateConnectorContainer(_this.history, _this.model, _this.connector);
            ModelUtils_1.ModelUtils.updateShapeAttachedConnectors(_this.history, _this.model, shape);
            if (!_this.handler.isStoredPermissionsGranted()) {
                _this.handler.lockPermissions();
                _this.history.undoTransaction();
                _this.handler.unlockPermissions();
                _this.checkNewConnectorPermissions();
            }
            else {
                _this.handler.tryUpdateModelSize();
                _this.history.addAndRedo(new SetSelectionHistoryItem_1.SetSelectionHistoryItem(_this.selection, [shape.key]));
            }
            _this.history.endTransaction();
            _this.handler.endStorePermissions();
            _this.handler.hideContextToolbox(true);
        }, function () {
            _this.checkNewConnectorPermissions();
        });
    };
    MouseHandlerCreateConnectorState.prototype.checkNewConnectorPermissions = function () {
        if (this.connector && !this.handler.canPerformChangeConnection(this.connector, { position: Connector_1.ConnectorPosition.End, connectionPointIndex: -1 })) {
            this.handler.lockPermissions();
            this.history.beginTransaction();
            this.history.addAndRedo(new SetSelectionHistoryItem_1.SetSelectionHistoryItem(this.selection, []));
            if (this.connector.beginItem)
                this.history.addAndRedo(new DeleteConnectionHistoryItem_1.DeleteConnectionHistoryItem(this.connector, Connector_1.ConnectorPosition.Begin));
            if (this.connector.endItem)
                this.history.addAndRedo(new DeleteConnectionHistoryItem_1.DeleteConnectionHistoryItem(this.connector, Connector_1.ConnectorPosition.End));
            this.history.addAndRedo(new DeleteConnectorHistoryItem_1.DeleteConnectorHistoryItem(this.connector.key));
            this.history.endTransaction();
            this.handler.unlockPermissions();
        }
    };
    MouseHandlerCreateConnectorState.prototype.getNewShapePosition = function (shape, side) {
        switch (side) {
            case DiagramItem_1.ConnectionPointSide.North:
                return shape.position.clone().offset(-shape.size.width / 2, 0);
            case DiagramItem_1.ConnectionPointSide.South:
                return shape.position.clone().offset(-shape.size.width / 2, -shape.size.height);
            case DiagramItem_1.ConnectionPointSide.East:
                return shape.position.clone().offset(-shape.size.width, -shape.size.height / 2);
            case DiagramItem_1.ConnectionPointSide.West:
                return shape.position.clone().offset(0, -shape.size.height / 2);
        }
    };
    MouseHandlerCreateConnectorState.prototype.getNewShapeSide = function (connector) {
        var renderPoints = connector.getRenderPoints();
        return MouseHandlerCreateConnectorState.getNewShapeSideByConnectorPoints(renderPoints[renderPoints.length - 1], renderPoints[renderPoints.length - 2]);
    };
    MouseHandlerCreateConnectorState.prototype.getSourceItem = function () {
        return this.connectedItem;
    };
    MouseHandlerCreateConnectorState.getNewShapeSideByConnectorPoints = function (point, directionPoint) {
        if (point.x === directionPoint.x)
            if (point.y > directionPoint.y)
                return DiagramItem_1.ConnectionPointSide.North;
            else
                return DiagramItem_1.ConnectionPointSide.South;
        else if (point.x > directionPoint.x)
            if (point.y === directionPoint.y)
                return DiagramItem_1.ConnectionPointSide.West;
            else if (point.y > directionPoint.y)
                if (Math.abs(point.x - directionPoint.x) > Math.abs(point.y - directionPoint.y))
                    return DiagramItem_1.ConnectionPointSide.West;
                else
                    return DiagramItem_1.ConnectionPointSide.North;
            else if (Math.abs(point.x - directionPoint.x) > Math.abs(point.y - directionPoint.y))
                return DiagramItem_1.ConnectionPointSide.West;
            else
                return DiagramItem_1.ConnectionPointSide.South;
        else if (point.y === directionPoint.y)
            return DiagramItem_1.ConnectionPointSide.East;
        else if (point.y > directionPoint.y)
            if (Math.abs(point.x - directionPoint.x) > Math.abs(point.y - directionPoint.y))
                return DiagramItem_1.ConnectionPointSide.East;
            else
                return DiagramItem_1.ConnectionPointSide.North;
        else if (Math.abs(point.x - directionPoint.x) > Math.abs(point.y - directionPoint.y))
            return DiagramItem_1.ConnectionPointSide.East;
        else
            return DiagramItem_1.ConnectionPointSide.South;
    };
    return MouseHandlerCreateConnectorState;
}(MouseHandlerMoveConnectorPointStateBase_1.MouseHandlerMoveConnectorPointStateBase));
exports.MouseHandlerCreateConnectorState = MouseHandlerCreateConnectorState;
//# sourceMappingURL=MouseHandlerCreateConnectorState.js.map