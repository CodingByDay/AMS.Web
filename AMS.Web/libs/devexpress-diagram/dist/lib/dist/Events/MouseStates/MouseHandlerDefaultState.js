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
exports.MouseHandlerDefaultState = void 0;
var Event_1 = require("../Event");
var MouseHandlerMoveConnectorPointState_1 = require("./MouseHandlerMoveConnectorPointState");
var MouseHandlerResizeShapeState_1 = require("./MouseHandlerResizeShapeState");
var MouseHandlerMoveConnectorSideState_1 = require("./MouseHandlerMoveConnectorSideState");
var MouseHandlerDragParameterPointState_1 = require("./MouseHandlerDragParameterPointState");
var MouseHandlerCreateConnectorState_1 = require("./MouseHandlerCreateConnectorState");
var MouseHandlerMoveConnectorOrthogonalSideState_1 = require("./MouseHandlerMoveConnectorOrthogonalSideState");
var MouseHandlerToolboxDraggingState_1 = require("./MouseHandlerToolboxDraggingState");
var MouseHandlerMoveConnectorTextState_1 = require("./MouseHandlerMoveConnectorTextState");
var MouseHandlerDefaultStateBase_1 = require("./MouseHandlerDefaultStateBase");
var MouseHandlerMoveShapeState_1 = require("./MouseHandlerMoveShapeState");
var Connector_1 = require("../../Model/Connectors/Connector");
var MouseHandlerMoveConnectorState_1 = require("./MouseHandlerMoveConnectorState");
var MouseHandlerDefaultState = (function (_super) {
    __extends(MouseHandlerDefaultState, _super);
    function MouseHandlerDefaultState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MouseHandlerDefaultState.prototype.finish = function () {
        this.visualizerManager.resetConnectionPoints();
        _super.prototype.finish.call(this);
    };
    MouseHandlerDefaultState.prototype.onMouseDownCore = function (evt) {
        if (this.handler.canScrollPage(evt))
            this.startScrolling(evt);
        else if (evt.button === Event_1.MouseButton.Left && evt.source.type === Event_1.MouseEventElementType.ConnectorText) {
            this.handler.changeSingleSelection(evt.source.key);
            this.handler.switchState(new MouseHandlerMoveConnectorTextState_1.MouseHandlerMoveConnectorTextState(this.handler, this.history, this.model));
        }
        else if (evt.button === Event_1.MouseButton.Left && evt.source.type === Event_1.MouseEventElementType.ShapeResizeBox)
            this.handler.switchState(new MouseHandlerResizeShapeState_1.MouseHandlerResizeShapeState(this.handler, this.history, this.model, this.selection, this.visualizerManager, this.settings));
        else if (evt.button === Event_1.MouseButton.Left && evt.source.type === Event_1.MouseEventElementType.ShapeParameterBox)
            this.handler.switchState(new MouseHandlerDragParameterPointState_1.MouseHandlerDragParameterPointState(this.handler, this.history, this.model));
        else if (evt.button === Event_1.MouseButton.Left && evt.source.type === Event_1.MouseEventElementType.ConnectorPoint)
            this.handler.switchState(new MouseHandlerMoveConnectorPointState_1.MouseHandlerMoveConnectorPointState(this.handler, this.history, this.model, this.visualizerManager));
        else if (evt.button === Event_1.MouseButton.Left && evt.source.type === Event_1.MouseEventElementType.ConnectorSide)
            this.handler.switchState(new MouseHandlerMoveConnectorSideState_1.MouseHandlerMoveConnectorSideState(this.handler, this.history, this.model));
        else if (evt.button === Event_1.MouseButton.Left && evt.source.type === Event_1.MouseEventElementType.ConnectorOrthogonalSide)
            this.handler.switchState(new MouseHandlerMoveConnectorOrthogonalSideState_1.MouseHandlerMoveConnectorOrthogonalSideState(this.handler, this.history, this.model));
        else if (evt.button === Event_1.MouseButton.Left && evt.source.type === Event_1.MouseEventElementType.ShapeConnectionPoint)
            this.handler.switchState(new MouseHandlerCreateConnectorState_1.MouseHandlerCreateConnectorState(this.handler, this.history, this.model, this.visualizerManager, this.shapeDescriptionManager, this.selection));
        else
            _super.prototype.onMouseDownCore.call(this, evt);
    };
    MouseHandlerDefaultState.prototype.onDragDiagramItemOnMouseDown = function (evt) {
        if (!this.handler.canAddDiagramItemToSelection(evt))
            _super.prototype.onDragDiagramItemOnMouseDown.call(this, evt);
        else if (evt.source.type === Event_1.MouseEventElementType.Shape)
            this.handler.switchState(new MouseHandlerMoveShapeState_1.MouseHandlerMoveShapeState(this.handler, this.history, this.model, this.selection, this.visualizerManager));
        else if (evt.source.type === Event_1.MouseEventElementType.Connector)
            this.handler.switchState(new MouseHandlerMoveConnectorState_1.MouseHandlerMoveConnectorState(this.handler, this.history, this.model, this.selection, this.visualizerManager));
    };
    MouseHandlerDefaultState.prototype.onDragStart = function (evt) {
        this.handler.switchState(new MouseHandlerToolboxDraggingState_1.MouseHandlerBeforeToolboxDraggingState(this.handler, this.history, this.model, this.selection, this.visualizerManager, this.shapeDescriptionManager));
        this.handler.state.onDragStart(evt);
    };
    MouseHandlerDefaultState.prototype.onMouseMoveCore = function (evt) {
        this.updateConnectionsOnMouseMove(evt);
        _super.prototype.onMouseMoveCore.call(this, evt);
    };
    MouseHandlerDefaultState.prototype.onMouseUp = function (evt) {
        if (this.handler.canRemoveDiagramItemToSelection(evt))
            this.handler.removeDiagramItemFromSelection(evt.button, evt.source.key);
        else
            _super.prototype.onMouseUp.call(this, evt);
    };
    MouseHandlerDefaultState.prototype.updateConnectionsOnMouseMove = function (evt) {
        var item = this.model.findItem(evt.source.key);
        this.visualizerManager.updateConnections(item, evt.source.type, evt.source.value);
    };
    MouseHandlerDefaultState.prototype.canDragObjectOnMouseDown = function (key) {
        return true;
    };
    MouseHandlerDefaultState.prototype.canExpandContainerOnMouseDown = function (key) {
        return true;
    };
    MouseHandlerDefaultState.prototype.canClearSelectionOnMouseDown = function () {
        return false;
    };
    MouseHandlerDefaultState.prototype.canSelectOnMouseUp = function (key) {
        return false;
    };
    MouseHandlerDefaultState.prototype.canClearSelectionOnMouseUp = function () {
        return true;
    };
    MouseHandlerDefaultState.prototype.onConnectionPointsShow = function (key, points) {
        var _this = this;
        var shape = this.model.findShape(key);
        if (shape)
            points.forEach(function (point, index) {
                point.allowed = _this.handler.canPerformChangeConnectionOnUpdateUI(undefined, { item: shape, position: Connector_1.ConnectorPosition.Begin, connectionPointIndex: index });
            });
    };
    return MouseHandlerDefaultState;
}(MouseHandlerDefaultStateBase_1.MouseHandlerDefaultStateBase));
exports.MouseHandlerDefaultState = MouseHandlerDefaultState;
//# sourceMappingURL=MouseHandlerDefaultState.js.map