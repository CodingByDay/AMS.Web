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
exports.ContextMenuHandler = void 0;
var Utils_1 = require("../../Utils");
var Event_1 = require("../Event");
var key_1 = require("@devexpress/utils/lib/utils/key");
var batch_updatable_1 = require("@devexpress/utils/lib/class/batch-updatable");
var browser_1 = require("@devexpress/utils/lib/browser");
var ContextMenuHandler = (function (_super) {
    __extends(ContextMenuHandler, _super);
    function ContextMenuHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.contextMenuVisible = false;
        _this.textInputStarted = false;
        _this.canHideContextMenu = true;
        _this.onVisibilityChanged = new Utils_1.EventDispatcher();
        return _this;
    }
    ContextMenuHandler.prototype.onMouseDown = function (evt) {
        if (evt.button === Event_1.MouseButton.Left && evt.source.type !== Event_1.MouseEventElementType.Undefined)
            this.hideContextMenu();
    };
    ContextMenuHandler.prototype.onMouseUp = function (evt) {
        if (!browser_1.Browser.MacOSPlatform || browser_1.Browser.MacOSPlatform && this.canHideContextMenu)
            this.hideContextMenu();
        this.canHideContextMenu = true;
    };
    ContextMenuHandler.prototype.onContextMenu = function (evt) {
        if (browser_1.Browser.MacOSPlatform)
            this.canHideContextMenu = false;
        this.showContextMenu(evt.eventPoint, evt.modelPoint);
    };
    ContextMenuHandler.prototype.onFocus = function (evt) { };
    ContextMenuHandler.prototype.onBlur = function (evt) { };
    ContextMenuHandler.prototype.onTextInputFocus = function (evt) { };
    ContextMenuHandler.prototype.onTextInputBlur = function (evt) { };
    ContextMenuHandler.prototype.onLongTouch = function (evt) { };
    ContextMenuHandler.prototype.onKeyDown = function (evt) {
        if (evt.keyCode === key_1.KeyCode.Esc)
            this.hideContextMenu();
    };
    ContextMenuHandler.prototype.onShortcut = function (evt) {
        this.hideContextMenu();
    };
    ContextMenuHandler.prototype.showContextMenu = function (eventPoint, modelPoint) {
        var _this = this;
        if (this.textInputStarted)
            return;
        window.setTimeout(function () {
            _this.onVisibilityChanged.raise1(function (l) { return l.notifyShowContextMenu(eventPoint, modelPoint); });
            _this.contextMenuVisible = true;
        }, 0);
    };
    ContextMenuHandler.prototype.hideContextMenu = function () {
        var _this = this;
        if (this.contextMenuVisible)
            window.setTimeout(function () {
                _this.onVisibilityChanged.raise1(function (l) { return l.notifyHideContextMenu(); });
                _this.contextMenuVisible = false;
            }, 0);
    };
    ContextMenuHandler.prototype.notifyDragStart = function (itemKeys) { };
    ContextMenuHandler.prototype.notifyDragEnd = function (itemKeys) { };
    ContextMenuHandler.prototype.notifyDragScrollStart = function () { };
    ContextMenuHandler.prototype.notifyDragScrollEnd = function () { };
    ContextMenuHandler.prototype.notifyShowContextToolbox = function (modelPoint, getPositionToInsertShapeTo, side, category, callback) { };
    ContextMenuHandler.prototype.notifyHideContextToolbox = function () { };
    ContextMenuHandler.prototype.notifyTextInputStart = function (item, text, position, size) {
        this.textInputStarted = true;
    };
    ContextMenuHandler.prototype.notifyTextInputEnd = function (item, captureFocus) {
        this.textInputStarted = false;
    };
    ContextMenuHandler.prototype.notifyTextInputPermissionsCheck = function (item, allowed) { };
    ContextMenuHandler.prototype.onUpdateUnlocked = function (occurredEvents) { };
    return ContextMenuHandler;
}(batch_updatable_1.BatchUpdatableObject));
exports.ContextMenuHandler = ContextMenuHandler;
//# sourceMappingURL=ContextMenuHandler.js.map