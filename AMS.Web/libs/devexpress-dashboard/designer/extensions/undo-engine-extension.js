﻿/**
* DevExpress Dashboard (undo-engine-extension.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UndoRedoExtension = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const control_options_1 = require("../../common/control-options");
const _interfaces_1 = require("../../common/internal/_interfaces");
const _utils_1 = require("../../data/_utils");
const _default_1 = require("../../data/localization/_default");
const disposable_object_1 = require("../../model/disposable-object");
const _knockout_utils_1 = require("../../model/internal/_knockout-utils");
const _obsolete_helper_1 = require("../../model/internal/_obsolete-helper");
const _undo_engine_helper_1 = require("../../model/internal/_undo-engine-helper");
const viewer_parts_1 = require("../../viewer-parts");
const _toolbar_extension_1 = require("../toolbar-extension/_toolbar-extension");
const toolbox_items_1 = require("../toolbox-extension/toolbox-items");
const name = 'undoRedo';
const nameAlias = 'undo-redo';
class UndoRedoExtension extends disposable_object_1.DisposableObject {
    constructor(dashboardControl) {
        super();
        this.dashboardControl = dashboardControl;
        this.name = name;
        this._undoEngine = ko.observable();
        this._predefinedToolbarItems = [];
        this._defaultToolbarItems = [];
        this.isChanged = ko.computed({
            read: () => !!(this._undoEngine() && this._undoEngine().isDirty()),
            write: (value) => this._undoEngine() && this._undoEngine().isDirty(value)
        });
        _obsolete_helper_1.defineObsoleteProperty({
            target: this,
            memberName: 'undoEngine',
            oldMemberDisplayName: 'UndoRedoExtension.undoEngine',
            warmMessage: 'The undoEngine property is obsolete.',
            action: () => {
                return this._undoEngine;
            }
        });
    }
    reset() {
        if (this._undoEngine()) {
            this._undoEngine().reset();
        }
    }
    processKeyEvent(keyEventType, eventArgs) {
        if (keyEventType === 'keyup' && eventArgs.ctrlKey) {
            if (eventArgs.keyCode === _interfaces_1.KeyCodes.Z && this._undoEngine().undoEnabled()) {
                this._undoEngine().undo();
                return true;
            }
            else if (eventArgs.keyCode === _interfaces_1.KeyCodes.Y && this._undoEngine().redoEnabled()) {
                this._undoEngine().redo();
                return true;
            }
        }
        else if (keyEventType === 'keydown' && eventArgs.ctrlKey && [_interfaces_1.KeyCodes.Z, _interfaces_1.KeyCodes.Y].indexOf(eventArgs.keyCode) !== -1) {
            eventArgs.preventDefault();
            return true;
        }
        return false;
    }
    start() {
        this.toDispose(this.dashboardControl.dashboard.subscribe(prevDashboard => {
            this.reset();
        }, null, 'beforeChange'));
        this.toDispose(this.dashboardControl.dashboard.subscribe(newDashboard => {
            var undoEngine = new DashboardUndoEngine(newDashboard, null, 'getInfo');
            _undo_engine_helper_1.UndoEngineContainer.undoEngine = undoEngine;
            this._undoEngine(undoEngine);
        }));
        this._controlOptionChangedHandler = this._onControlOptionChanged.bind(this);
        this.dashboardControl.on('optionChanged', this._controlOptionChangedHandler);
        this._setShowConfirmationDialog(this.dashboardControl.showConfirmationOnBrowserClosing);
        let undoButton = this._createToolbarItem('undoButton', () => this.undo(), 'dx-dashboard-undo', _default_1.getLocalizationById('DashboardStringId.UndoText'), ko.pureComputed(() => !this.undoEnabled()));
        let redoButton = this._createToolbarItem('redoButton', () => this.redo(), 'dx-dashboard-redo', _default_1.getLocalizationById('DashboardStringId.RedoText'), ko.pureComputed(() => !this.redoEnabled()));
        let separator = Object.assign({ name: 'undoRedoSeparator', location: 'before' }, _toolbar_extension_1.createToolbarSeparator());
        this._predefinedToolbarItems = [undoButton, redoButton, separator];
        if (viewer_parts_1.LegacySettings.showUndoRedoButtonsInToolbox) {
            let toolboxExtension = this.dashboardControl.findExtension('toolbox');
            if (!!toolboxExtension) {
                let undoItem = new toolbox_items_1.DashboardToolbarItem('undo', () => this.undo(), 'dx-dashboard-undo', 'DashboardStringId.UndoText');
                undoItem.disabled = ko.pureComputed(() => !this.undoEnabled());
                let redoItem = new toolbox_items_1.DashboardToolbarItem('redo', () => this.redo(), 'dx-dashboard-redo', 'DashboardStringId.RedoText');
                redoItem.disabled = ko.pureComputed(() => !this.redoEnabled());
                this._toolboxToolbarGroup = new toolbox_items_1.DashboardToolbarGroup('undo-redo', 'Undo/Redo', 50, undoItem, redoItem);
                toolboxExtension.toolbarGroups.push(this._toolboxToolbarGroup);
            }
        }
        else {
            this._defaultToolbarItems = this._predefinedToolbarItems.map((item, index) => ({ name: item.name, index: UndoRedoExtension._toolbarItemsIndex + index }));
        }
        this._addToolbarItems(this.dashboardControl.findExtension('designerToolbar'));
    }
    _createToolbarItem(name, action, icon, hint, disabled) {
        let subscription;
        return {
            name: name,
            location: 'before',
            widget: 'dxButton',
            cssClass: `dx-dashboard-undo-redo-button ${icon}`,
            options: {
                hint: hint,
                stylingMode: 'text',
                onClick: action,
                focusStateEnabled: false,
                activeStateEnabled: false,
                disabled: disabled(),
                template: (args) => _utils_1.createSvgIconElement(icon),
                onInitialized: (args) => {
                    subscription = _knockout_utils_1.subscribeAndPerform(disabled, () => {
                        args.component && args.component.option('disabled', disabled());
                    });
                },
                onDisposed: () => {
                    subscription.dispose();
                }
            }
        };
    }
    _addToolbarItems(toolbar) {
        if (toolbar) {
            toolbar._unregisterDefaultItems(this._defaultToolbarItems);
            toolbar._unregisterPredefinedItems(this._predefinedToolbarItems);
            toolbar._registerDefaultItems(this._defaultToolbarItems);
            toolbar._registerPredefinedItems(this._predefinedToolbarItems);
            toolbar._update();
        }
    }
    _removeToolbarItems(toolbar) {
        if (toolbar) {
            toolbar._unregisterDefaultItems(this._defaultToolbarItems);
            toolbar._unregisterPredefinedItems(this._predefinedToolbarItems);
            toolbar._update();
        }
    }
    undo() {
        this._undoEngine() && this._undoEngine().undo();
    }
    redo() {
        this._undoEngine() && this._undoEngine().redo();
    }
    undoEnabled() {
        return !!(this._undoEngine() && this._undoEngine().undoEnabled());
    }
    redoEnabled() {
        return !!(this._undoEngine() && this._undoEngine().redoEnabled());
    }
    stop() {
        this._removeToolbarItems(this.dashboardControl.findExtension('designerToolbar'));
        let toolboxExtension = this.dashboardControl.findExtension('toolbox');
        if (toolboxExtension && this._toolboxToolbarGroup) {
            toolboxExtension.toolbarGroups.remove(this._toolboxToolbarGroup);
        }
        this.reset();
        if (this._controlOptionChangedHandler)
            this.dashboardControl.off('optionChanged', this._controlOptionChangedHandler);
        this._setShowConfirmationDialog(false);
    }
    _onControlOptionChanged(args) {
        switch (args.name) {
            case 'showConfirmationOnBrowserClosing':
                this._setShowConfirmationDialog(args.value);
                break;
        }
    }
    _setShowConfirmationDialog(value) {
        if (value) {
            this._beforeWindowUnloadHandler = this._onBeforeWindowUnload.bind(this);
            window.onbeforeunload = this._beforeWindowUnloadHandler;
        }
        else {
            if (this._beforeWindowUnloadHandler)
                window.onbeforeunload = null;
            this._beforeWindowUnloadHandler = null;
        }
    }
    _onBeforeWindowUnload(event) {
        if (this.dashboardControl.isDesignMode() && this.isChanged()) {
            event.preventDefault();
            return event.returnValue = _default_1.getLocalizationById('DashboardWebStringId.LayoutHasBeenChangedDialogMessage') + ' ' + _default_1.getLocalizationById('DashboardWebStringId.SaveConfirmationDialogMessage');
        }
    }
}
exports.UndoRedoExtension = UndoRedoExtension;
UndoRedoExtension._toolbarItemsIndex = 0;
class DashboardUndoEngine extends analytics_utils_1.UndoEngine {
    constructor(target, ignoredProperties, getInfoMethodName) {
        super(target, ignoredProperties, getInfoMethodName);
    }
    validatePropertyName(target, propertyName) {
        return propertyName;
    }
}
control_options_1.designerExtensions[nameAlias] = (dashboardControl, options) => new UndoRedoExtension(dashboardControl);
control_options_1.extensionNameMap[nameAlias] = name;
