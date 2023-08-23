﻿/**
* DevExpress Dashboard (toolbar-extension.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignerToolbarExtension = void 0;
const _helpers_1 = require("../../common/_helpers");
const control_options_1 = require("../../common/control-options");
const _options_manager_1 = require("../../common/internal/_options-manager");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _utils_1 = require("../../data/_utils");
const disposable_object_1 = require("../../model/disposable-object");
const _toolbox_extension_1 = require("../toolbox-extension/_toolbox-extension");
const _toolbar_extension_1 = require("./_toolbar-extension");
const _toolbar_view_model_1 = require("./_toolbar-view-model");
const name = 'designerToolbar';
class DesignerToolbarExtension extends disposable_object_1.DisposableObject {
    constructor(dashboardControl, options = {}) {
        super();
        this._defaultItems = [];
        this._predefinedItems = [];
        this.name = 'designerToolbar';
        this._optionsManager = new _options_manager_1.OptionsManager();
        this._showPanelAsync = (options, cancellationToken) => {
            var def = _jquery_helpers_1.createJQueryDeferred();
            if (cancellationToken.canceled)
                def.reject();
            else {
                this._viewModel.showPanel();
                setTimeout(() => {
                    if (!cancellationToken.canceled) {
                        options.surfaceTop = this._viewModel.height;
                        def.resolve(options);
                    }
                    else {
                        def.reject();
                    }
                }, _toolbar_view_model_1.toolbarAnimationTime);
            }
            return def.promise();
        };
        this._hidePanelAsync = (options, cancellationToken) => {
            var def = _jquery_helpers_1.createJQueryDeferred();
            if (cancellationToken.canceled)
                def.reject();
            else {
                this._viewModel.hidePanel();
                setTimeout(() => {
                    if (!cancellationToken.canceled) {
                        options.surfaceTop = 0;
                        def.resolve(options);
                    }
                    else {
                        def.reject();
                    }
                }, _toolbar_view_model_1.toolbarAnimationTime);
            }
            return def.promise();
        };
        this._dashboardControl = dashboardControl;
        this._optionsManager.initialize({
            extensionName: name,
            dashboardControl: dashboardControl,
            defaultOptions: {},
            eventsHolder: this,
            initOptions: options,
            optionChanged: (args) => {
                switch (args.name) {
                    case 'items':
                    case 'onPreparing':
                        this._update();
                        break;
                }
                return 'noop';
            }
        });
        this._predefinedItems = [
            Object.assign(Object.assign({}, _toolbar_extension_1.createToolbarSeparator()), { name: 'separator' })
        ];
        let cancelableDesignerToViewerAction = {
            orderNo: 40,
            action: (options) => this._hidePanelAsync(options, _helpers_1.CancellationToken.None),
            cancelableAction: this._hidePanelAsync
        };
        this.designerToViewerAction = cancelableDesignerToViewerAction;
        let cancelableViewerToDesignerAction = {
            orderNo: 40,
            action: (options) => this._showPanelAsync(options, _helpers_1.CancellationToken.None),
            cancelableAction: this._showPanelAsync
        };
        this.viewerToDesignerAction = cancelableViewerToDesignerAction;
        this._viewModel = new _toolbar_view_model_1.ToolbarKoViewModel(() => this._dashboardControl.getWidgetContainer(), () => this._update());
        this.template = {
            data: this._viewModel,
            name: 'dx-dashboard-toolbar-extension'
        };
    }
    start() {
        let toolbox = this._dashboardControl.findExtension('toolbox');
        this._viewModel.left(toolbox ? _toolbox_extension_1.toolboxConstants.leftPanelWidth : 0);
        this._extensionChangeSubscription && this._extensionChangeSubscription.dispose();
        this._extensionChangeSubscription = this._dashboardControl.subscribeExtensionsChanged({
            added: (extension) => {
                if (extension.name === 'toolbox')
                    this._viewModel.left(_toolbox_extension_1.toolboxConstants.leftPanelWidth);
            },
            deleted: (extension) => {
                if (extension.name === 'toolbox')
                    this._viewModel.left(0);
            }
        });
        if (this._dashboardControl.isDesignMode())
            this._viewModel.showPanel();
        else
            this._viewModel.hidePanel();
        this._dashboardControl.surfaceTop(this._viewModel.height);
        this._update();
    }
    stop() {
        this._unsubscribe();
        this._viewModel.hidePanel();
        this._dashboardControl.surfaceTop(0);
    }
    _unsubscribe() {
        this._extensionChangeSubscription && this._extensionChangeSubscription.dispose();
    }
    _registerDefaultItems(defaultItems) {
        this._defaultItems.push(...defaultItems);
    }
    _unregisterDefaultItems(defaultItems) {
        this._defaultItems = this._defaultItems.filter(item => !defaultItems.some(n => n === item));
    }
    _registerPredefinedItems(predefinedItems) {
        this._predefinedItems.push(...predefinedItems);
    }
    _unregisterPredefinedItems(predefinedItems) {
        this._predefinedItems = this._predefinedItems.filter(item => !predefinedItems.some(n => n === item));
    }
    _update() {
        let args = {
            component: this._dashboardControl,
            dashboard: this._dashboardControl.dashboard(),
            items: []
        };
        let items = this._optionsManager.get('items');
        if (items) {
            args.items = items;
        }
        else {
            args.items = this._defaultItems
                .filter(defaultItem => _utils_1.type.isDefined(defaultItem.index))
                .sort((item1, item2) => item1.index - item2.index);
        }
        this._optionsManager.raiseEvent('preparing', args);
        let dxToolbarItems = args.items.reduce((acc, sourceItem) => {
            let item = typeof sourceItem === 'string' ? { name: sourceItem } : sourceItem;
            let defaultItem = this._predefinedItems.find(predefinedItem => predefinedItem.name === item.name);
            if (defaultItem) {
                let resultItem = {};
                _options_manager_1.mergeOptions(resultItem, defaultItem);
                _options_manager_1.mergeOptions(resultItem, item);
                resultItem.name = undefined;
                return acc.concat(resultItem);
            }
            return acc.concat([item]);
        }, []);
        this._viewModel.setToolbarItems(dxToolbarItems);
    }
    dispose() {
        this.stop();
        this._optionsManager.dispose();
        super.dispose();
    }
}
exports.DesignerToolbarExtension = DesignerToolbarExtension;
control_options_1.designerExtensions[name] = (dashboardControl, options) => new DesignerToolbarExtension(dashboardControl, options);
control_options_1.extensionNameMap[name] = name;
