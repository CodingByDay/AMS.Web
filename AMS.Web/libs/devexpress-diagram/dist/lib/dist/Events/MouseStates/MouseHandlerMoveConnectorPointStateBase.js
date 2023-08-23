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
exports.MouseHandlerMoveConnectorPointStateBase = void 0;
var Connector_1 = require("../../Model/Connectors/Connector");
var Event_1 = require("../Event");
var MouseHandlerDraggingState_1 = require("./MouseHandlerDraggingState");
var DeleteConnectionHistoryItem_1 = require("../../History/Common/DeleteConnectionHistoryItem");
var AddConnectionHistoryItem_1 = require("../../History/Common/AddConnectionHistoryItem");
var ModelUtils_1 = require("../../Model/ModelUtils");
var MouseHandlerMoveConnectorPointStateBase = (function (_super) {
    __extends(MouseHandlerMoveConnectorPointStateBase, _super);
    function MouseHandlerMoveConnectorPointStateBase(handler, history, model, visualizerManager) {
        var _this = _super.call(this, handler, history) || this;
        _this.model = model;
        _this.visualizerManager = visualizerManager;
        return _this;
    }
    MouseHandlerMoveConnectorPointStateBase.prototype.finish = function () {
        this.visualizerManager.resetConnectionTarget();
        this.visualizerManager.resetConnectionPoints();
        _super.prototype.finish.call(this);
    };
    MouseHandlerMoveConnectorPointStateBase.prototype.onMouseDown = function (evt) {
        _super.prototype.onMouseDown.call(this, evt);
        if (this.connector)
            this.handler.addInteractingItem(this.connector);
    };
    MouseHandlerMoveConnectorPointStateBase.prototype.onMouseMove = function (evt) {
        _super.prototype.onMouseMove.call(this, evt);
        if (!this.allowAttachToObjects(evt, false, false)) {
            this.visualizerManager.resetConnectionTarget();
            this.visualizerManager.resetConnectionPoints();
        }
        else if (this.connector) {
            var item = this.connector.getExtremeItem(this.pointPosition);
            this.visualizerManager.setConnectionTarget(item, evt.source.type);
            var pointIndex = this.connector.getExtremeConnectionPointIndex(this.pointPosition);
            if (!item && this.oppositeConnectionPointIndex !== -1 || !this.allowAttachToObjects(evt, true, false))
                item = this.model.findItem(evt.source.key);
            this.visualizerManager.setConnectionPoints(item, evt.source.type, pointIndex, true);
        }
    };
    MouseHandlerMoveConnectorPointStateBase.prototype.onApplyChanges = function (evt) {
        var point = this.getSnappedPoint(evt, evt.modelPoint);
        if (this.pointPosition !== undefined) {
            if (this.oppositePointPosition === undefined) {
                this.oppositePointPosition = this.getOppositePointPosition();
                this.oppositeItem = this.connector.getExtremeItem(this.oppositePointPosition);
                this.oppositeConnectionPointIndex = this.connector.getExtremeConnectionPointIndex(this.oppositePointPosition);
            }
            this.targetItem = this.model.findItem(evt.source.key);
            var item = this.allowAttachToObjects(evt, true, true) ? this.targetItem : undefined;
            var connectionPointIndex = -1;
            if (evt.source.type === Event_1.MouseEventElementType.ShapeConnectionPoint)
                connectionPointIndex = parseInt(evt.source.value);
            if (item && (evt.source.type === Event_1.MouseEventElementType.Shape || evt.source.type === Event_1.MouseEventElementType.ShapeConnectionPoint) &&
                (this.connector.getExtremeItem(this.oppositePointPosition) !== item ||
                    (connectionPointIndex !== -1 && this.oppositeConnectionPointIndex !== -1 &&
                        connectionPointIndex !== this.oppositeConnectionPointIndex))) {
                if (this.connector.getExtremeItem(this.pointPosition) !== item ||
                    this.connector.getExtremeConnectionPointIndex(this.pointPosition) !== connectionPointIndex) {
                    if (this.connector.getExtremeItem(this.pointPosition))
                        this.history.addAndRedo(new DeleteConnectionHistoryItem_1.DeleteConnectionHistoryItem(this.connector, this.pointPosition));
                    this.history.addAndRedo(new AddConnectionHistoryItem_1.AddConnectionHistoryItem(this.connector, item, connectionPointIndex, this.pointPosition));
                    if (this.oppositeItem)
                        this.updateOppositeItemConnectionPointIndex(connectionPointIndex);
                }
                point = item.getConnectionPointPosition(connectionPointIndex, this.connector.points[this.pointIndex + (this.pointPosition === Connector_1.ConnectorPosition.End ? -1 : 1)]);
                this.visualizerManager.setConnectionPointIndex(connectionPointIndex);
            }
            else if (this.connector.getExtremeItem(this.pointPosition)) {
                this.history.addAndRedo(new DeleteConnectionHistoryItem_1.DeleteConnectionHistoryItem(this.connector, this.pointPosition));
                if (this.oppositeItem)
                    this.updateOppositeItemConnectionPointIndex(this.oppositeConnectionPointIndex);
            }
        }
        ModelUtils_1.ModelUtils.moveConnectorPoint(this.history, this.connector, this.pointIndex, point);
        ModelUtils_1.ModelUtils.updateConnectorAttachedPoints(this.history, this.model, this.connector);
        this.handler.tryUpdateModelSize();
    };
    MouseHandlerMoveConnectorPointStateBase.prototype.updateOppositeItemConnectionPointIndex = function (connectionPointIndex) {
        var pointIndex = connectionPointIndex === -1 ? -1 : this.oppositeConnectionPointIndex;
        if (pointIndex !== this.connector.getExtremeConnectionPointIndex(this.oppositePointPosition)) {
            this.history.addAndRedo(new DeleteConnectionHistoryItem_1.DeleteConnectionHistoryItem(this.connector, this.oppositePointPosition));
            this.history.addAndRedo(new AddConnectionHistoryItem_1.AddConnectionHistoryItem(this.connector, this.oppositeItem, pointIndex, this.oppositePointPosition));
        }
    };
    MouseHandlerMoveConnectorPointStateBase.prototype.onFinishWithChanges = function () {
        ModelUtils_1.ModelUtils.updateConnectorContainer(this.history, this.model, this.connector);
        ModelUtils_1.ModelUtils.deleteConnectorUnnecessaryPoints(this.history, this.connector);
        this.handler.tryUpdateModelSize();
    };
    MouseHandlerMoveConnectorPointStateBase.prototype.getDraggingElementKeys = function () {
        return this.connector ? [this.connector.key] : [];
    };
    MouseHandlerMoveConnectorPointStateBase.prototype.getOppositePointPosition = function () {
        return this.pointPosition === Connector_1.ConnectorPosition.Begin ? Connector_1.ConnectorPosition.End : Connector_1.ConnectorPosition.Begin;
    };
    MouseHandlerMoveConnectorPointStateBase.prototype.allowAttachToObjects = function (evt, checkContainers, checkOppositeItem) {
        if (this.handler.canMultipleSelection(evt))
            return false;
        var connector = this.connector;
        if (connector && evt.source.type === Event_1.MouseEventElementType.Shape) {
            var targetItem_1 = this.model.findItem(evt.source.key);
            if (checkContainers && this.model.findItemContainerCore(connector, function (c) { return c === targetItem_1; }))
                return false;
            if (checkContainers && this.oppositeItem && this.model.findItemContainerCore(this.oppositeItem, function (c) { return c === targetItem_1; }))
                return false;
            if (checkOppositeItem && this.oppositeItem === targetItem_1 && this.oppositeConnectionPointIndex === -1)
                return false;
        }
        return true;
    };
    MouseHandlerMoveConnectorPointStateBase.prototype.onConnectionPointsShow = function (key, points) {
        var _this = this;
        if (this.connector && this.pointPosition !== undefined && (this.connector.endItem && this.connector.endItem.key === key || this.connector.beginItem && this.connector.beginItem.key === key)) {
            var position_1 = this.connector.beginItem && this.connector.beginItem.key === key ? Connector_1.ConnectorPosition.Begin : Connector_1.ConnectorPosition.End;
            points.forEach(function (point, index) {
                point.allowed = _this.handler.canPerformChangeConnectionOnUpdateUI(_this.connector, { item: _this.connector.getExtremeItem(position_1), position: position_1, connectionPointIndex: index });
            });
        }
    };
    MouseHandlerMoveConnectorPointStateBase.prototype.onConnectionTargetShow = function (key, info) {
        if (this.connector && this.pointPosition !== undefined && (this.connector.endItem && this.connector.endItem.key === key || this.connector.beginItem && this.connector.beginItem.key === key)) {
            var position = this.connector.beginItem && this.connector.beginItem.key === key ? Connector_1.ConnectorPosition.Begin : Connector_1.ConnectorPosition.End;
            info.allowed = this.handler.canPerformChangeConnectionOnUpdateUI(this.connector, { item: this.connector.getExtremeItem(position), position: position, connectionPointIndex: -1 });
        }
    };
    return MouseHandlerMoveConnectorPointStateBase;
}(MouseHandlerDraggingState_1.MouseHandlerDraggingState));
exports.MouseHandlerMoveConnectorPointStateBase = MouseHandlerMoveConnectorPointStateBase;
//# sourceMappingURL=MouseHandlerMoveConnectorPointStateBase.js.map