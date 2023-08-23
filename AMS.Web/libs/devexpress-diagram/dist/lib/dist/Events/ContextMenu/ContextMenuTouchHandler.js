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
exports.ContextMenuTouchHandler = void 0;
var Event_1 = require("../Event");
var ContextMenuHandler_1 = require("./ContextMenuHandler");
var ModelUtils_1 = require("../../Model/ModelUtils");
var SELECTION_CHANGED_EVENT = 1;
var ContextMenuTouchHandler = (function (_super) {
    __extends(ContextMenuTouchHandler, _super);
    function ContextMenuTouchHandler(selection) {
        var _this = _super.call(this) || this;
        _this.selection = selection;
        _this.contextToolboxVisible = false;
        _this.selection.onChanged.add(_this);
        return _this;
    }
    ContextMenuTouchHandler.prototype.onMouseDown = function (evt) {
        if (evt.source.key === undefined)
            this.hideContextMenu();
    };
    ContextMenuTouchHandler.prototype.onMouseUp = function (evt) {
    };
    ContextMenuTouchHandler.prototype.onFocus = function (evt) {
        var _this = this;
        setTimeout(function () { _this.showContextMenuAtSelection(); }, 1);
    };
    ContextMenuTouchHandler.prototype.onBlur = function (evt) {
        var _this = this;
        setTimeout(function () { _this.hideContextMenu(); }, 1);
    };
    ContextMenuTouchHandler.prototype.onTextInputFocus = function (evt) {
        var _this = this;
        setTimeout(function () { _this.hideContextMenu(); }, 1);
    };
    ContextMenuTouchHandler.prototype.onTextInputBlur = function (evt) {
        var _this = this;
        setTimeout(function () { _this.showContextMenuAtSelection(); }, 1);
    };
    ContextMenuTouchHandler.prototype.onLongTouch = function (evt) {
        if (evt.source.type === Event_1.MouseEventElementType.Document)
            this.showContextMenuAtEmptySelection(evt.modelPoint);
    };
    ContextMenuTouchHandler.prototype.onKeyDown = function (evt) {
    };
    ContextMenuTouchHandler.prototype.onShortcut = function (evt) {
    };
    ContextMenuTouchHandler.prototype.getSelectedItems = function () {
        return this.selection.getSelectedItems(true);
    };
    ContextMenuTouchHandler.prototype.showContextMenuAtSelection = function () {
        if (this.contextToolboxVisible)
            return;
        var items = this.getSelectedItems();
        if (items.length !== 0)
            this.showContextMenu(undefined, ModelUtils_1.ModelUtils.createRectangle(items).createPosition());
    };
    ContextMenuTouchHandler.prototype.showContextMenuAtEmptySelection = function (point) {
        if (this.contextToolboxVisible)
            return;
        var items = this.getSelectedItems();
        if (items.length === 0)
            this.showContextMenu(undefined, point);
    };
    ContextMenuTouchHandler.prototype.notifyDragStart = function (itemKeys) {
        this.hideContextMenu();
    };
    ContextMenuTouchHandler.prototype.notifyDragEnd = function (itemKeys) {
        this.showContextMenuAtSelection();
    };
    ContextMenuTouchHandler.prototype.notifySelectionChanged = function (selection) {
        if (this.isUpdateLocked())
            this.registerOccurredEvent(SELECTION_CHANGED_EVENT);
        else
            this.raiseSelectionChanged();
    };
    ContextMenuTouchHandler.prototype.raiseSelectionChanged = function () {
        var items = this.getSelectedItems();
        if (items.length !== 0)
            this.showContextMenuAtSelection();
        else
            this.hideContextMenu();
    };
    ContextMenuTouchHandler.prototype.onUpdateUnlocked = function (occurredEvents) {
        if (occurredEvents & SELECTION_CHANGED_EVENT)
            this.raiseSelectionChanged();
    };
    ContextMenuTouchHandler.prototype.notifyShowContextToolbox = function (modelPoint, getPositionToInsertShapeTo, side, category, callback) {
        this.contextToolboxVisible = true;
        this.hideContextMenu();
    };
    ContextMenuTouchHandler.prototype.notifyHideContextToolbox = function () {
        this.contextToolboxVisible = false;
        this.showContextMenuAtSelection();
    };
    return ContextMenuTouchHandler;
}(ContextMenuHandler_1.ContextMenuHandler));
exports.ContextMenuTouchHandler = ContextMenuTouchHandler;
//# sourceMappingURL=ContextMenuTouchHandler.js.map