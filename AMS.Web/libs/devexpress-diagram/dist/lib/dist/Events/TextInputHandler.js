"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextInputHandler = void 0;
var ChangeShapeTextHistoryItem_1 = require("../History/Properties/ChangeShapeTextHistoryItem");
var Event_1 = require("./Event");
var key_1 = require("@devexpress/utils/lib/utils/key");
var Shape_1 = require("../Model/Shapes/Shape");
var Connector_1 = require("../Model/Connectors/Connector");
var ChangeConnectorTextHistoryItem_1 = require("../History/Properties/ChangeConnectorTextHistoryItem");
var TextInputHandler = (function () {
    function TextInputHandler(control) {
        this.control = control;
    }
    TextInputHandler.prototype.startTextInput = function (item, position) {
        if (item.isLocked || !item.enableText || !item.allowEditText || this.control.settings.readOnly || !this.canFinishTextEditing())
            return;
        this.control.beginUpdate();
        this.textInputItem = item;
        var allowed = true;
        if (this.textInputItem instanceof Shape_1.Shape) {
            var textRect = this.textInputItem.textEditRectangle;
            allowed = this.control.permissionsProvider.canChangeShapeText(this.textInputItem);
            if (allowed)
                this.control.eventManager.raiseTextInputStart(this.textInputItem, this.textInputItem.text, textRect.createPosition(), textRect.createSize());
        }
        else if (this.textInputItem instanceof Connector_1.Connector) {
            this.textInputPosition = position;
            allowed = this.control.permissionsProvider.canChangeConnectorText(this.textInputItem, this.textInputPosition);
            if (allowed)
                this.control.eventManager.raiseTextInputStart(this.textInputItem, this.textInputItem.getText(this.textInputPosition), this.textInputItem.getTextPoint(this.textInputPosition));
        }
        if (!allowed) {
            delete this.textInputItem;
            this.control.endUpdate();
        }
    };
    TextInputHandler.prototype.endTextInput = function (captureFocus) {
        var textInputItem = this.textInputItem;
        delete this.textInputItem;
        this.control.eventManager.raiseTextInputEnd(textInputItem, captureFocus);
        this.control.endUpdate();
        this.control.barManager.updateItemsState();
    };
    TextInputHandler.prototype.raiseTextInputPermissionsCheck = function (allowed) {
        this.control.eventManager.raiseTextInputPermissionsCheck(this.textInputItem, allowed);
    };
    TextInputHandler.prototype.applyTextInput = function (text, captureFocus) {
        if (!this.canFinishTextEditing(text))
            return;
        var textInputItem = this.textInputItem;
        var textInputPosition = this.textInputPosition;
        this.endTextInput(captureFocus);
        if (textInputItem instanceof Shape_1.Shape) {
            if (textInputItem.text !== text)
                this.control.history.addAndRedo(new ChangeShapeTextHistoryItem_1.ChangeShapeTextHistoryItem(textInputItem, text));
        }
        else if (textInputItem instanceof Connector_1.Connector)
            if (textInputItem.getText(textInputPosition) !== text)
                this.control.history.addAndRedo(new ChangeConnectorTextHistoryItem_1.ChangeConnectorTextHistoryItem(textInputItem, textInputPosition, text));
    };
    TextInputHandler.prototype.canFinishTextEditing = function (text) {
        var allowed = true;
        if (this.isTextInputActive()) {
            var newText = text || this.getTextInputElementValue();
            if (this.textInputItem instanceof Shape_1.Shape)
                allowed = this.control.permissionsProvider.canApplyShapeTextChange(this.textInputItem, newText);
            else if (this.textInputItem instanceof Connector_1.Connector)
                allowed = this.control.permissionsProvider.canApplyConnectorTextChange(this.textInputItem, this.textInputPosition, newText);
            this.raiseTextInputPermissionsCheck(allowed);
        }
        return allowed;
    };
    TextInputHandler.prototype.getTextInputElementValue = function () {
        if (this.control.render)
            return this.control.render.input.getTextInputElementValue();
        return "";
    };
    TextInputHandler.prototype.cancelTextInput = function () {
        this.raiseTextInputPermissionsCheck(true);
        this.endTextInput(true);
    };
    TextInputHandler.prototype.isTextInputActive = function () {
        return this.textInputItem !== undefined;
    };
    TextInputHandler.prototype.processDblClick = function (evt) {
        if (evt.source.type === Event_1.MouseEventElementType.Shape) {
            var shape = this.control.model.findShape(evt.source.key);
            this.startTextInput(shape);
        }
        else if (evt.source.type === Event_1.MouseEventElementType.Connector) {
            var connector = this.control.model.findConnector(evt.source.key);
            var position = connector.getTextPositionByPoint(evt.modelPoint);
            this.startTextInput(connector, position);
        }
        else if (evt.source.type === Event_1.MouseEventElementType.ConnectorText) {
            var connector = this.control.model.findConnector(evt.source.key);
            var position = parseFloat(evt.source.value);
            this.startTextInput(connector, position);
        }
    };
    TextInputHandler.prototype.onDblClick = function (evt) {
        var _this = this;
        setTimeout(function () {
            _this.processDblClick(evt);
        }, 10);
    };
    TextInputHandler.prototype.onKeyDown = function (evt) {
        if (!this.isTextInputActive())
            return;
        if (evt.keyCode === 13 && this.hasCtrlModifier(evt.modifiers)) {
            evt.preventDefault = true;
            this.applyTextInput(evt.inputText, true);
        }
        if (evt.keyCode === 27)
            this.cancelTextInput();
    };
    TextInputHandler.prototype.onBlur = function (evt) {
        if (this.isTextInputActive())
            this.applyTextInput(evt.inputText);
    };
    TextInputHandler.prototype.onFocus = function (evt) {
    };
    TextInputHandler.prototype.hasCtrlModifier = function (key) {
        return (key & key_1.ModifierKey.Ctrl) > 0;
    };
    return TextInputHandler;
}());
exports.TextInputHandler = TextInputHandler;
//# sourceMappingURL=TextInputHandler.js.map