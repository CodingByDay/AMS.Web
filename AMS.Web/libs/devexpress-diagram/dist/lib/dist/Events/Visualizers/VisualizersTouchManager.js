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
exports.VisualizerTouchManager = void 0;
var VisualizersManager_1 = require("./VisualizersManager");
var Event_1 = require("../Event");
var SELECTION_CHANGED_EVENT = 1;
var VisualizerTouchManager = (function (_super) {
    __extends(VisualizerTouchManager, _super);
    function VisualizerTouchManager(selection, model, eventManager, settings, readOnly) {
        if (readOnly === void 0) { readOnly = settings.readOnly; }
        var _this = _super.call(this, selection, model, eventManager, settings, readOnly) || this;
        selection.onChanged.add(_this);
        return _this;
    }
    VisualizerTouchManager.prototype.onBlur = function (evt) {
        var _this = this;
        setTimeout(function () { _this.hideConnections(); }, 1);
    };
    VisualizerTouchManager.prototype.onFocus = function (evt) {
        var _this = this;
        setTimeout(function () { _this.showConnections(); }, 1);
    };
    VisualizerTouchManager.prototype.hideConnections = function () {
        if (this.readOnly)
            return;
        this.resetConnectionPoints();
    };
    VisualizerTouchManager.prototype.showConnections = function () {
        if (this.readOnly)
            return;
        if (this.needShowConnections()) {
            var shapes = this.selection.getSelectedShapes();
            if (shapes.length === 1)
                this.setConnectionPoints(shapes[0], Event_1.MouseEventElementType.ShapeConnectionPoint, -1, (!shapes[0].allowResizeHorizontally && !shapes[0].allowResizeVertically) || shapes[0].isLocked);
        }
    };
    VisualizerTouchManager.prototype.needShowConnections = function () {
        var items = this.selection.getSelectedItems();
        var shapes = this.selection.getSelectedShapes();
        return (items.length === 1 && shapes.length === 1);
    };
    VisualizerTouchManager.prototype.notifySelectionChanged = function (selection) {
        if (this.isUpdateLocked())
            this.registerOccurredEvent(SELECTION_CHANGED_EVENT);
        else
            this.raiseSelectionChanged();
    };
    VisualizerTouchManager.prototype.raiseSelectionChanged = function () {
        if (this.needShowConnections())
            this.showConnections();
        else
            this.hideConnections();
    };
    VisualizerTouchManager.prototype.onUpdateUnlocked = function (occurredEvents) {
        if (occurredEvents & SELECTION_CHANGED_EVENT)
            this.raiseSelectionChanged();
    };
    VisualizerTouchManager.prototype.notifyDragStart = function (itemKeys) {
        this.hideConnections();
    };
    VisualizerTouchManager.prototype.notifyDragEnd = function (itemKeys) {
        this.showConnections();
    };
    return VisualizerTouchManager;
}(VisualizersManager_1.VisualizerManager));
exports.VisualizerTouchManager = VisualizerTouchManager;
//# sourceMappingURL=VisualizersTouchManager.js.map