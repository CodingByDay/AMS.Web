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
exports.MouseHandlerMoveConnectorTextState = void 0;
var MouseHandlerDraggingState_1 = require("./MouseHandlerDraggingState");
var ChangeConnectorTextPositionHistoryItem_1 = require("../../History/Properties/ChangeConnectorTextPositionHistoryItem");
var ChangeConnectorTextHistoryItem_1 = require("../../History/Properties/ChangeConnectorTextHistoryItem");
var MouseHandlerMoveConnectorTextState = (function (_super) {
    __extends(MouseHandlerMoveConnectorTextState, _super);
    function MouseHandlerMoveConnectorTextState(handler, history, model) {
        var _this = _super.call(this, handler, history) || this;
        _this.model = model;
        return _this;
    }
    MouseHandlerMoveConnectorTextState.prototype.onMouseDown = function (evt) {
        this.connector = this.model.findConnector(evt.source.key);
        this.position = parseFloat(evt.source.value);
        this.text = this.connector.getText(this.position);
        this.savedText = "";
        _super.prototype.onMouseDown.call(this, evt);
    };
    MouseHandlerMoveConnectorTextState.prototype.onApplyChanges = function (evt) {
        var newPosition = this.connector.getTextPositionByPoint(evt.modelPoint);
        if (newPosition !== this.position) {
            var text = this.connector.getText(newPosition);
            if (text !== "" && text !== this.text) {
                this.history.addAndRedo(new ChangeConnectorTextHistoryItem_1.ChangeConnectorTextHistoryItem(this.connector, newPosition, ""));
                this.savedText = text;
            }
            this.history.addAndRedo(new ChangeConnectorTextPositionHistoryItem_1.ChangeConnectorTextPositionHistoryItem(this.connector, this.position, newPosition));
            if (this.savedText !== "" && this.savedText !== text) {
                this.history.addAndRedo(new ChangeConnectorTextHistoryItem_1.ChangeConnectorTextHistoryItem(this.connector, this.position, this.savedText));
                this.savedText = "";
            }
            this.position = newPosition;
        }
    };
    MouseHandlerMoveConnectorTextState.prototype.getDraggingElementKeys = function () {
        return [this.connector.key];
    };
    return MouseHandlerMoveConnectorTextState;
}(MouseHandlerDraggingState_1.MouseHandlerDraggingState));
exports.MouseHandlerMoveConnectorTextState = MouseHandlerMoveConnectorTextState;
//# sourceMappingURL=MouseHandlerMoveConnectorTextState.js.map