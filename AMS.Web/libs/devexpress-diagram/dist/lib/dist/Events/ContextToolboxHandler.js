"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextToolboxHandler = void 0;
var Event_1 = require("./Event");
var Utils_1 = require("../Utils");
var key_1 = require("@devexpress/utils/lib/utils/key");
var browser_1 = require("@devexpress/utils/lib/browser");
var ContextToolboxHandler = (function () {
    function ContextToolboxHandler() {
        this.contextToolboxVisible = false;
        this.onVisibilityChanged = new Utils_1.EventDispatcher();
    }
    ContextToolboxHandler.prototype.onMouseDown = function (evt) {
        if (evt.source.type !== Event_1.MouseEventElementType.Undefined)
            this.hideContextToolbox();
    };
    ContextToolboxHandler.prototype.onMouseUp = function (evt) {
        if (evt.source.type !== Event_1.MouseEventElementType.Undefined || !browser_1.Browser.TouchUI)
            this.hideContextToolbox();
    };
    ContextToolboxHandler.prototype.onFocus = function (evt) { };
    ContextToolboxHandler.prototype.onBlur = function (evt) { };
    ContextToolboxHandler.prototype.onKeyDown = function (evt) {
        if (evt.keyCode === key_1.KeyCode.Esc)
            this.hideContextToolbox();
    };
    ContextToolboxHandler.prototype.onShortcut = function (evt) {
        this.hideContextToolbox();
    };
    ContextToolboxHandler.prototype.showContextToolbox = function (modelPoint, getPositionToInsertShapeTo, side, category, applyCallback, cancelCallback) {
        this.onVisibilityChanged.raise1(function (l) { return l.notifyShowContextToolbox(modelPoint, getPositionToInsertShapeTo, side, category, applyCallback); });
        this.contextToolboxVisible = true;
        this.contextToolboxCancelCallback = cancelCallback;
    };
    ContextToolboxHandler.prototype.hideContextToolbox = function (applyed) {
        if (this.contextToolboxVisible) {
            this.onVisibilityChanged.raise1(function (l) { return l.notifyHideContextToolbox(); });
            if (this.contextToolboxCancelCallback) {
                if (!applyed)
                    this.contextToolboxCancelCallback();
                this.contextToolboxCancelCallback = undefined;
            }
            this.contextToolboxVisible = false;
        }
    };
    return ContextToolboxHandler;
}());
exports.ContextToolboxHandler = ContextToolboxHandler;
//# sourceMappingURL=ContextToolboxHandler.js.map