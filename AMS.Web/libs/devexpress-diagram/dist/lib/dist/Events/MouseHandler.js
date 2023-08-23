"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseHandler = void 0;
var MouseHandlerDefaultState_1 = require("./MouseStates/MouseHandlerDefaultState");
var Event_1 = require("./Event");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var ModelUtils_1 = require("../Model/ModelUtils");
var MouseHandlerDefaultReadOnlyTouchState_1 = require("./MouseStates/MouseHandlerDefaultReadOnlyTouchState");
var MouseHandlerDefaultReadOnlyState_1 = require("./MouseStates/MouseHandlerDefaultReadOnlyState");
var MouseHandlerDefaultTouchState_1 = require("./MouseStates/MouseHandlerDefaultTouchState");
var key_1 = require("@devexpress/utils/lib/utils/key");
var Utils_1 = require("../Utils");
var MouseHandler = (function () {
    function MouseHandler(history, selection, model, eventManager, readOnly, view, visualizerManager, contextToolboxHandler, shapeDescriptionManager, settings, permissionsProvider) {
        this.history = history;
        this.selection = selection;
        this.model = model;
        this.eventManager = eventManager;
        this.readOnly = readOnly;
        this.view = view;
        this.visualizerManager = visualizerManager;
        this.contextToolboxHandler = contextToolboxHandler;
        this.shapeDescriptionManager = shapeDescriptionManager;
        this.settings = settings;
        this.permissionsProvider = permissionsProvider;
        this.finishStateLock = 0;
        this.initialize(model);
        this.selection.onChanged.add(this);
    }
    MouseHandler.prototype.initialize = function (model) {
        this.model = model;
        this.allowMultipleSelection = true;
        this.allowCopyDiagramItems = true;
        this.allowSnapToCellOnDragDiagramItem = true;
        this.allowSnapToCellOnDragPoint = true;
        this.allowSnapToCellOnResizeShape = true;
        this.allowFixedDrag = true;
        this.allowZoomOnWheel = true;
        this.allowScrollPage = true;
        this.shouldScrollPage = false;
        this.copyDiagramItemsByCtrlAndShift = false;
        this.startScrollingPageByCtrl = false;
        this.initializeDefaultState();
    };
    MouseHandler.prototype.initializeDefaultState = function () {
        this.defaultState = this.readOnly ?
            (Utils_1.EventUtils.isTouchMode() ?
                new MouseHandlerDefaultReadOnlyTouchState_1.MouseHandlerDefaultReadOnlyTouchState(this, this.history, this.selection, this.model, this.view, this.visualizerManager, this.shapeDescriptionManager, this.settings) :
                new MouseHandlerDefaultReadOnlyState_1.MouseHandlerDefaultReadOnlyState(this, this.history, this.selection, this.model, this.view, this.visualizerManager, this.shapeDescriptionManager, this.settings)) :
            (Utils_1.EventUtils.isTouchMode() ?
                new MouseHandlerDefaultTouchState_1.MouseHandlerDefaultTouchState(this, this.history, this.selection, this.model, this.view, this.visualizerManager, this.shapeDescriptionManager, this.settings) :
                new MouseHandlerDefaultState_1.MouseHandlerDefaultState(this, this.history, this.selection, this.model, this.view, this.visualizerManager, this.shapeDescriptionManager, this.settings));
        this.switchToDefaultState();
    };
    MouseHandler.prototype.onMouseDown = function (evt) {
        this.mouseDownEvent = evt;
        this.state.onMouseDown(evt);
    };
    MouseHandler.prototype.onMouseMove = function (evt) {
        this.state.onMouseMove(evt);
    };
    MouseHandler.prototype.onMouseUp = function (evt) {
        this.state.onMouseUp(evt);
    };
    MouseHandler.prototype.onMouseDblClick = function (evt) {
        this.state.onMouseDblClick(evt);
    };
    MouseHandler.prototype.onMouseClick = function (evt) {
        this.state.onMouseClick(evt);
    };
    MouseHandler.prototype.onLongTouch = function (evt) {
        if (!evt.touches || evt.touches.length > 1)
            return;
        var key = evt.source.key;
        if (key === undefined)
            this.selection.clear();
        else if (this.selection.hasKey(key))
            this.selection.remove(key);
        else
            this.selection.add(key);
    };
    MouseHandler.prototype.onShortcut = function (code) {
        return this.state.onShortcut(code);
    };
    MouseHandler.prototype.onWheel = function (evt) {
        return this.state.onMouseWheel(evt);
    };
    MouseHandler.prototype.onDragStart = function (evt) {
        this.state.onDragStart(evt);
    };
    MouseHandler.prototype.onDragEnd = function (evt) {
        this.state.onDragEnd(evt);
    };
    MouseHandler.prototype.onKeyDown = function (evt) {
        this.state.onKeyDown(evt);
    };
    MouseHandler.prototype.onKeyUp = function (evt) {
        this.state.onKeyUp(evt);
    };
    MouseHandler.prototype.showContextToolbox = function (modelPoint, getPositionToInsertShapeTo, side, category, applyCallback, cancelCallback) {
        this.contextToolboxHandler.showContextToolbox(modelPoint, getPositionToInsertShapeTo, side, category, applyCallback, cancelCallback);
    };
    MouseHandler.prototype.hideContextToolbox = function (applyed) {
        this.contextToolboxHandler.hideContextToolbox(applyed);
    };
    MouseHandler.prototype.canScrollPage = function (evt) {
        if (this.startScrollingPageByCtrl) {
            if (!this.hasCtrlModifier(evt.modifiers))
                return false;
            if (!this.copyDiagramItemsByCtrlAndShift)
                return true;
            return evt.source.type !== Event_1.MouseEventElementType.Shape && evt.source.type !== Event_1.MouseEventElementType.Connector;
        }
        return this.allowScrollPage && this.shouldScrollPage;
    };
    MouseHandler.prototype.canMultipleSelection = function (evt) {
        return this.allowMultipleSelection && this.hasCtrlOrShiftModifier(evt.modifiers);
    };
    MouseHandler.prototype.canCopySelectedItems = function (evt) {
        if (!this.allowCopyDiagramItems)
            return false;
        return this.copyDiagramItemsByCtrlAndShift ? this.hasCtrlAndShiftModifier(evt.modifiers) : this.hasAltModifier(evt.modifiers);
    };
    MouseHandler.prototype.canCalculateFixedPosition = function (evt) {
        if (!this.allowFixedDrag || !this.hasShiftModifier(evt.modifiers))
            return false;
        if (this.copyDiagramItemsByCtrlAndShift && this.hasCtrlModifier(evt.modifiers))
            return false;
        return true;
    };
    MouseHandler.prototype.canStartZoomOnWheel = function (evt) {
        return this.allowZoomOnWheel && this.hasCtrlModifier(evt.modifiers);
    };
    MouseHandler.prototype.canFinishZoomOnWheel = function (evt) {
        return this.allowZoomOnWheel && !this.hasCtrlModifier(evt.modifiers);
    };
    MouseHandler.prototype.onStartScrollPageByKeyboard = function (evt) {
        if (this.canStartScrollingPageByKeyboard(evt)) {
            this.raiseDragScrollStart();
            this.shouldScrollPage = true;
        }
    };
    MouseHandler.prototype.onFinishScrollPageByKeyboard = function (evt) {
        if (this.canEndScrollingPageByKeyboard(evt))
            this.finishScrollingPage();
    };
    MouseHandler.prototype.onFinishScrollPageByMouse = function (evt) {
        if (this.canEndScrollingPage(evt))
            this.finishScrollingPage();
    };
    MouseHandler.prototype.finishScrollingPage = function () {
        this.shouldScrollPage = false;
        this.raiseDragScrollEnd();
        this.switchToDefaultState();
    };
    MouseHandler.prototype.hasCtrlOrShiftModifier = function (key) {
        return this.hasCtrlModifier(key) || this.hasShiftModifier(key);
    };
    MouseHandler.prototype.hasCtrlAndShiftModifier = function (key) {
        return this.hasCtrlModifier(key) && this.hasShiftModifier(key);
    };
    MouseHandler.prototype.hasCtrlModifier = function (key) {
        return (key & key_1.ModifierKey.Ctrl) > 0;
    };
    MouseHandler.prototype.hasAltModifier = function (key) {
        return (key & key_1.ModifierKey.Alt) > 0;
    };
    MouseHandler.prototype.hasShiftModifier = function (key) {
        return (key & key_1.ModifierKey.Shift) > 0;
    };
    MouseHandler.prototype.canStartScrollingPageByKeyboard = function (evt) {
        return !this.startScrollingPageByCtrl && !this.shouldScrollPage && evt.keyCode === key_1.KeyCode.Space;
    };
    MouseHandler.prototype.canEndScrollingPageByKeyboard = function (evt) {
        return !this.startScrollingPageByCtrl && evt.keyCode === key_1.KeyCode.Space;
    };
    MouseHandler.prototype.canEndScrollingPage = function (evt) {
        return this.startScrollingPageByCtrl ? this.hasCtrlModifier(evt.modifiers) : true;
    };
    MouseHandler.prototype.getSnappedPointOnDragDiagramItem = function (evt, basePoint, fixedX, fixedY, startPoint) {
        var snapToCell = this.getSnapToCellOnDragDiagramItem(evt);
        return new point_1.Point(this.getSnappedPos(this.getFixedXPosition(evt, basePoint, fixedX, startPoint), true, snapToCell), this.getSnappedPos(this.getFixedYPosition(evt, basePoint, fixedY, startPoint), false, snapToCell));
    };
    MouseHandler.prototype.getSnappedPointOnDragPoint = function (evt, point, additionalSnappedPoint) {
        var snapToCell = this.getSnapToCellOnDragPoint(evt);
        var x = this.getSnappedPos(point.x, true, snapToCell);
        var y = this.getSnappedPos(point.y, false, snapToCell);
        if (additionalSnappedPoint === undefined)
            return new point_1.Point(x, y);
        else if (Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2) < Math.pow(point.x - additionalSnappedPoint.x, 2) + Math.pow(point.y - additionalSnappedPoint.y, 2))
            return new point_1.Point(x, y);
        else
            return additionalSnappedPoint;
    };
    MouseHandler.prototype.getSnappedOffsetOnDragPoint = function (evt, startPoint) {
        var snapToCell = this.getSnapToCellOnDragPoint(evt);
        return new point_1.Point(this.getSnappedPos(evt.modelPoint.x - startPoint.x, true, snapToCell), this.getSnappedPos(evt.modelPoint.y - startPoint.y, false, snapToCell));
    };
    MouseHandler.prototype.lockAspectRatioOnShapeResize = function (evt) {
        return this.hasShiftModifier(evt.modifiers);
    };
    MouseHandler.prototype.getSnappedPositionOnResizeShape = function (evt, pos, isHorizontal) {
        if (!this.getSnapToCellOnResizeShape(evt))
            return pos;
        return ModelUtils_1.ModelUtils.getSnappedPos(this.model, this.settings.gridSize, pos, isHorizontal);
    };
    MouseHandler.prototype.getSnappedPos = function (pos, isHorizontal, snapToCell) {
        return snapToCell ? ModelUtils_1.ModelUtils.getSnappedPos(this.model, this.settings.gridSize, pos, isHorizontal) : pos;
    };
    MouseHandler.prototype.getFixedXPosition = function (evt, basePoint, fixedX, startPoint) {
        return fixedX ? basePoint.x : basePoint.x + evt.modelPoint.x - startPoint.x;
    };
    MouseHandler.prototype.getFixedYPosition = function (evt, basePoint, fixedY, startPoint) {
        return fixedY ? basePoint.y : basePoint.y + evt.modelPoint.y - startPoint.y;
    };
    MouseHandler.prototype.getSnapToCellOnDragDiagramItem = function (evt) {
        return this.allowSnapToCellOnDragDiagramItem &&
            this.settings.snapToGrid &&
            !this.hasCtrlModifier(evt.modifiers);
    };
    MouseHandler.prototype.getSnapToCellOnDragPoint = function (evt) {
        return this.allowSnapToCellOnDragPoint &&
            this.settings.snapToGrid &&
            !this.hasCtrlModifier(evt.modifiers);
    };
    MouseHandler.prototype.getSnapToCellOnResizeShape = function (evt) {
        return this.allowSnapToCellOnResizeShape &&
            this.settings.snapToGrid &&
            !this.hasCtrlModifier(evt.modifiers);
    };
    MouseHandler.prototype.tryUpdateModelSize = function (processPoints) {
        this.lockPermissions();
        ModelUtils_1.ModelUtils.tryUpdateModelRectangle(this.history, processPoints);
        this.unlockPermissions();
    };
    MouseHandler.prototype.canAddDiagramItemToSelection = function (evt) {
        return evt.source.key && (evt.button === Event_1.MouseButton.Left || evt.button === Event_1.MouseButton.Right);
    };
    MouseHandler.prototype.addDiagramItemToSelection = function (evt) {
        this.pressedDiagramItemKey = evt.source.key;
        this.pressedDiagramItemInSelection = this.selection.hasKey(this.pressedDiagramItemKey);
        if (this.canMultipleSelection(evt))
            this.selection.add(evt.source.key);
        else
            this.changeSingleSelection(evt.source.key);
    };
    MouseHandler.prototype.canRemoveDiagramItemToSelection = function (evt) {
        return this.pressedDiagramItemKey &&
            evt.source.key &&
            this.pressedDiagramItemKey === evt.source.key &&
            (evt.button === Event_1.MouseButton.Left || evt.button === Event_1.MouseButton.Right);
    };
    MouseHandler.prototype.removeDiagramItemFromSelection = function (button, sourceKey) {
        if (this.pressedDiagramItemInSelection && this.selection.getKeys().length > 1 && button === Event_1.MouseButton.Left)
            this.selection.remove(sourceKey);
    };
    MouseHandler.prototype.changeSingleSelection = function (key) {
        if (!this.selection.hasKey(key))
            this.selection.set([key]);
    };
    MouseHandler.prototype.notifySelectionChanged = function (selection) {
        if (this.pressedDiagramItemKey && !this.selection.hasKey(this.pressedDiagramItemKey)) {
            this.pressedDiagramItemKey = undefined;
            this.pressedDiagramItemInSelection = false;
        }
    };
    MouseHandler.prototype.raiseDragStart = function (keys) {
        this.eventManager.onDocumentDragStart(keys);
    };
    MouseHandler.prototype.raiseDragEnd = function (keys) {
        this.eventManager.onDocumentDragEnd(keys);
    };
    MouseHandler.prototype.raiseDragScrollStart = function () {
        this.eventManager.onDocumentDragScrollStart();
    };
    MouseHandler.prototype.raiseDragScrollEnd = function () {
        this.eventManager.onDocumentDragScrollEnd();
    };
    MouseHandler.prototype.raiseClick = function (keys) {
        this.eventManager.onDocumentClick(keys);
    };
    MouseHandler.prototype.beginStorePermissions = function () {
        this.permissionsProvider.beginStorePermissions();
    };
    MouseHandler.prototype.endStorePermissions = function () {
        this.permissionsProvider.endStorePermissions();
    };
    MouseHandler.prototype.isStoredPermissionsGranted = function () {
        return this.permissionsProvider.isStoredPermissionsGranted();
    };
    MouseHandler.prototype.lockPermissions = function () {
        this.permissionsProvider.lockPermissions();
    };
    MouseHandler.prototype.unlockPermissions = function () {
        this.permissionsProvider.unlockPermissions();
    };
    MouseHandler.prototype.canPerformChangeConnection = function (connector, operationParams) {
        var allowed = true;
        if (connector)
            allowed = this.permissionsProvider.canChangeConnection(connector, operationParams.item, operationParams.oldItem, operationParams.position, operationParams.connectionPointIndex);
        else if (operationParams.item)
            allowed = this.permissionsProvider.canChangeConnection(undefined, operationParams.item, operationParams.oldItem, operationParams.position, operationParams.connectionPointIndex);
        return allowed;
    };
    MouseHandler.prototype.canPerformChangeConnectionOnUpdateUI = function (connector, operationParams) {
        this.permissionsProvider.beginUpdateUI();
        var allowed = this.canPerformChangeConnection(connector, operationParams);
        this.permissionsProvider.endUpdateUI();
        return allowed;
    };
    MouseHandler.prototype.canFinishTextEditing = function () {
        return this.eventManager.canFinishTextEditing();
    };
    MouseHandler.prototype.restartState = function () {
        if (this.state && !this.finishStateLock) {
            this.finishStateLock++;
            this.state.finish();
            this.finishStateLock--;
        }
        this.state.start();
    };
    MouseHandler.prototype.switchToDefaultState = function () {
        this.switchState(this.defaultState);
    };
    MouseHandler.prototype.switchState = function (state) {
        this.newState = state;
        if (this.state && !this.finishStateLock) {
            this.finishStateLock++;
            this.state.finish();
            this.finishStateLock--;
        }
        if (this.newState) {
            this.state = this.newState;
            this.state.start();
            this.newState = undefined;
        }
    };
    MouseHandler.prototype.addInteractingItem = function (item, operation) {
        this.permissionsProvider.addInteractingItem(item, operation);
    };
    MouseHandler.prototype.clearInteractingItems = function () {
        this.permissionsProvider.clearInteractingItems();
    };
    MouseHandler.prototype.notifyReadOnlyChanged = function (readOnly) {
        this.readOnly = readOnly;
        this.initializeDefaultState();
    };
    MouseHandler.prototype.notifySelectionRectShow = function (rect) { };
    MouseHandler.prototype.notifySelectionRectHide = function () { };
    MouseHandler.prototype.notifyResizeInfoShow = function (point, text) { };
    MouseHandler.prototype.notifyResizeInfoHide = function () { };
    MouseHandler.prototype.notifyConnectionPointsShow = function (key, points, activePointIndex, outsideRectangle) {
        this.state.onConnectionPointsShow(key, points);
    };
    MouseHandler.prototype.notifyConnectionPointsHide = function () { };
    MouseHandler.prototype.notifyConnectionTargetShow = function (key, info) {
        this.state.onConnectionTargetShow(key, info);
    };
    MouseHandler.prototype.notifyConnectionTargetHide = function () { };
    MouseHandler.prototype.notifyContainerTargetShow = function (key, info) { };
    MouseHandler.prototype.notifyContainerTargetHide = function () { };
    MouseHandler.prototype.notifyExtensionLinesShow = function (lines) { };
    MouseHandler.prototype.notifyExtensionLinesHide = function () { };
    return MouseHandler;
}());
exports.MouseHandler = MouseHandler;
//# sourceMappingURL=MouseHandler.js.map