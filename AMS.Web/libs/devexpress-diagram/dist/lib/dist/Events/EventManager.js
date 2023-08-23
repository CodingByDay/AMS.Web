"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManager = void 0;
var MouseHandler_1 = require("./MouseHandler");
var Utils_1 = require("../Utils");
var TextInputHandler_1 = require("./TextInputHandler");
var ContextMenuHandler_1 = require("./ContextMenu/ContextMenuHandler");
var ContextMenuTouchHandler_1 = require("./ContextMenu/ContextMenuTouchHandler");
var VisualizersManager_1 = require("./Visualizers/VisualizersManager");
var VisualizersTouchManager_1 = require("./Visualizers/VisualizersTouchManager");
var ContextToolboxHandler_1 = require("./ContextToolboxHandler");
var browser_1 = require("@devexpress/utils/lib/browser");
var key_1 = require("@devexpress/utils/lib/utils/key");
var EventManager = (function () {
    function EventManager(control) {
        this.onMouseOperation = new Utils_1.EventDispatcher();
        this.onTextInputOperation = new Utils_1.EventDispatcher();
        this.toolboxes = [];
        this.control = control;
        this.visualizersManager = Utils_1.EventUtils.isTouchMode() ?
            new VisualizersTouchManager_1.VisualizerTouchManager(control.selection, control.model, this, control.settings) :
            new VisualizersManager_1.VisualizerManager(control.selection, control.model, this, control.settings);
        this.onMouseOperation.add(this.visualizersManager);
        this.contextMenuHandler = browser_1.Browser.TouchUI ?
            new ContextMenuTouchHandler_1.ContextMenuTouchHandler(control.selection) :
            new ContextMenuHandler_1.ContextMenuHandler();
        this.contextMenuHandler.onVisibilityChanged.add(control);
        this.onMouseOperation.add(this.contextMenuHandler);
        this.onTextInputOperation.add(this.contextMenuHandler);
        this.contextToolboxHandler = new ContextToolboxHandler_1.ContextToolboxHandler();
        this.contextToolboxHandler.onVisibilityChanged.add(control);
        this.contextToolboxHandler.onVisibilityChanged.add(this.contextMenuHandler);
        this.mouseHandler = new MouseHandler_1.MouseHandler(control.history, control.selection, control.model, this, control.settings.readOnly, control.view, this.visualizersManager, this.contextToolboxHandler, control.shapeDescriptionManager, control.settings, control.permissionsProvider);
        this.textInputHandler = new TextInputHandler_1.TextInputHandler(control);
        this.visualizersManager.onVisualizersUpdate.add(this.mouseHandler);
    }
    Object.defineProperty(EventManager.prototype, "onVisualizersUpdate", {
        get: function () {
            return this.visualizersManager.onVisualizersUpdate;
        },
        enumerable: false,
        configurable: true
    });
    EventManager.prototype.registerToolbox = function (toolbox) {
        this.toolboxes.push(toolbox);
    };
    EventManager.prototype.cleanToolboxes = function (eventDispatcher) {
        this.toolboxes.forEach(function (toolbox) {
            eventDispatcher.remove(toolbox);
        });
        this.toolboxes = [];
    };
    EventManager.prototype.initialize = function () {
        this.visualizersManager.initialize(this.control.model);
        this.mouseHandler.initialize(this.control.model);
    };
    EventManager.prototype.beginUpdate = function (lockUpdateCanvas) {
        this.contextMenuHandler.beginUpdate();
        this.visualizersManager.beginUpdate();
    };
    EventManager.prototype.endUpdate = function () {
        this.contextMenuHandler.endUpdate();
        this.visualizersManager.endUpdate();
    };
    EventManager.prototype.onMouseDown = function (evt) {
        this.mouseHandler.onMouseDown(evt);
        this.contextMenuHandler.onMouseDown(evt);
        this.visualizersManager.onMouseDown(evt);
        this.contextToolboxHandler.onMouseDown(evt);
    };
    EventManager.prototype.onMouseMove = function (evt) {
        this.processDragging(evt);
        this.mouseHandler.onMouseMove(evt);
    };
    EventManager.prototype.onMouseUp = function (evt) {
        this.contextToolboxHandler.onMouseUp(evt);
        this.mouseHandler.onMouseUp(evt);
        this.contextMenuHandler.onMouseUp(evt);
        this.visualizersManager.onMouseUp(evt);
        this.processDragging(evt);
    };
    EventManager.prototype.onMouseEnter = function (evt) {
        this.visualizersManager.onMouseEnter(evt);
    };
    EventManager.prototype.onMouseLeave = function (evt) {
        this.visualizersManager.onMouseLeave(evt);
    };
    EventManager.prototype.onDblClick = function (evt) {
        this.mouseHandler.onMouseDblClick(evt);
        this.textInputHandler.onDblClick(evt);
        this.control.apiController.notifyDblClick(evt);
    };
    EventManager.prototype.onClick = function (evt) {
        this.mouseHandler.onMouseClick(evt);
        this.control.apiController.notifyClick(evt);
    };
    EventManager.prototype.onContextMenu = function (evt) {
        this.contextMenuHandler.onContextMenu(evt);
    };
    EventManager.prototype.onLongTouch = function (evt) {
        this.mouseHandler.onLongTouch(evt);
        this.contextMenuHandler.onLongTouch(evt);
    };
    EventManager.prototype.onBlur = function (evt) {
        this.contextMenuHandler.onBlur(evt);
        this.contextToolboxHandler.onBlur(evt);
        this.visualizersManager.onBlur(evt);
    };
    EventManager.prototype.onFocus = function (evt) {
        this.contextMenuHandler.onFocus(evt);
        this.contextToolboxHandler.onFocus(evt);
        this.visualizersManager.onFocus(evt);
    };
    EventManager.prototype.onKeyDown = function (evt) {
        var scCode = evt.getShortcutCode();
        if (this.onShortcut(scCode)) {
            this.visualizersManager.updateConnectionPoints();
            this.contextMenuHandler.onShortcut(evt);
            this.contextToolboxHandler.onShortcut(evt);
            evt.preventDefault = true;
        }
        else if (this.isShortcutForFocusInput(scCode))
            evt.preventDefault = true;
        this.contextMenuHandler.onKeyDown(evt);
        this.contextToolboxHandler.onKeyDown(evt);
        this.mouseHandler.onKeyDown(evt);
    };
    EventManager.prototype.onKeyUp = function (evt) {
        this.mouseHandler.onKeyUp(evt);
    };
    EventManager.prototype.onTextInputBlur = function (evt) {
        this.textInputHandler.onBlur(evt);
        this.contextMenuHandler.onTextInputBlur(evt);
    };
    EventManager.prototype.onTextInputFocus = function (evt) {
        this.textInputHandler.onFocus(evt);
        this.contextMenuHandler.onTextInputFocus(evt);
    };
    EventManager.prototype.onTextInputKeyDown = function (evt) {
        this.textInputHandler.onKeyDown(evt);
    };
    EventManager.prototype.onShortcut = function (code) {
        if (this.control.commandManager.processShortcut(code))
            return true;
        if (this.mouseHandler.onShortcut(code))
            return true;
    };
    EventManager.prototype.isShortcutForFocusInput = function (code) {
        return code === key_1.KeyCode.Delete || code === (key_1.KeyCode.Delete | key_1.ModifierKey.Ctrl) || code === (key_1.KeyCode.Delete | key_1.ModifierKey.Meta) ||
            (code === key_1.KeyCode.Backspace) || code === (key_1.KeyCode.Backspace | key_1.ModifierKey.Ctrl) || code === (key_1.KeyCode.Backspace | key_1.ModifierKey.Shift) || code === (key_1.KeyCode.Backspace | key_1.ModifierKey.Meta) ||
            code === key_1.KeyCode.Home || code === key_1.KeyCode.End ||
            code === key_1.KeyCode.Up || code === (key_1.KeyCode.Up | key_1.ModifierKey.Ctrl) || code === (key_1.KeyCode.Up | key_1.ModifierKey.Meta) ||
            code === key_1.KeyCode.Down || code === (key_1.KeyCode.Down | key_1.ModifierKey.Ctrl) || code === (key_1.KeyCode.Down | key_1.ModifierKey.Meta) ||
            code === key_1.KeyCode.Left || code === (key_1.KeyCode.Left | key_1.ModifierKey.Ctrl) || code === (key_1.KeyCode.Left | key_1.ModifierKey.Meta) ||
            code === key_1.KeyCode.Right || code === (key_1.KeyCode.Right | key_1.ModifierKey.Ctrl) || code === (key_1.KeyCode.Right | key_1.ModifierKey.Meta);
    };
    EventManager.prototype.onPaste = function (evt) {
        if (!this.textInputHandler.isTextInputActive() && this.control.commandManager.processPaste(evt.clipboardData)) {
            this.visualizersManager.updateConnectionPoints();
            evt.preventDefault = true;
        }
    };
    EventManager.prototype.onMouseWheel = function (evt) {
        if (this.mouseHandler.onWheel(evt))
            evt.preventDefault = true;
    };
    EventManager.prototype.isFocused = function () {
        return this.control.isFocused();
    };
    EventManager.prototype.processDragging = function (evt) {
        var draggingEvt = this.getDraggingEvent();
        if (draggingEvt && this.draggingEvent !== draggingEvt) {
            this.draggingEvent = draggingEvt;
            this.mouseHandler.onDragStart(this.draggingEvent);
            this.control.captureFocus();
        }
        else if (!draggingEvt && this.draggingEvent) {
            delete this.draggingEvent;
            this.mouseHandler.onDragEnd(evt);
        }
    };
    EventManager.prototype.getDraggingEvent = function () {
        return this.toolboxes
            .filter(function (t) { return t.draggingObject; })
            .map(function (t) { return t.draggingObject.evt; })[0];
    };
    EventManager.prototype.onDocumentDragStart = function (itemKeys) {
        this.control.beginUpdate();
        this.control.captureFocus();
        this.onMouseOperation.raise("notifyDragStart", itemKeys);
    };
    EventManager.prototype.onDocumentDragEnd = function (itemKeys) {
        this.onMouseOperation.raise("notifyDragEnd", itemKeys);
        this.control.endUpdate();
        this.control.barManager.updateItemsState();
    };
    EventManager.prototype.onDocumentDragScrollStart = function () {
        this.onMouseOperation.raise1(function (l) { return l.notifyDragScrollStart(); });
    };
    EventManager.prototype.onDocumentDragScrollEnd = function () {
        this.onMouseOperation.raise1(function (l) { return l.notifyDragScrollEnd(); });
    };
    EventManager.prototype.onDocumentClick = function (itemKeys) {
        this.control.beginUpdate();
        this.control.endUpdate();
        this.control.barManager.updateItemsState();
    };
    EventManager.prototype.raiseTextInputStart = function (item, text, position, size) {
        this.onTextInputOperation.raise("notifyTextInputStart", item, text, position, size);
    };
    EventManager.prototype.raiseTextInputEnd = function (item, captureFocus) {
        this.onTextInputOperation.raise("notifyTextInputEnd", item, captureFocus);
    };
    EventManager.prototype.raiseTextInputPermissionsCheck = function (item, allowed) {
        this.onTextInputOperation.raise("notifyTextInputPermissionsCheck", item, allowed);
    };
    EventManager.prototype.canFinishTextEditing = function () {
        return this.textInputHandler.canFinishTextEditing();
    };
    return EventManager;
}());
exports.EventManager = EventManager;
//# sourceMappingURL=EventManager.js.map