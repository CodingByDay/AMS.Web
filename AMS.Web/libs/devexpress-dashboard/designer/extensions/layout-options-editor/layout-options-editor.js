﻿/**
* DevExpress Dashboard (layout-options-editor.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutOptionEditorExtension = void 0;
const control_options_1 = require("../../../common/control-options");
const _default_1 = require("../../../data/localization/_default");
const disposable_object_1 = require("../../../model/disposable-object");
const _knockout_utils_1 = require("../../../model/internal/_knockout-utils");
const _layout_options_editor_1 = require("./_layout-options-editor");
const name = 'layoutOptionEditor';
class LayoutOptionEditorExtension extends disposable_object_1.DisposableObject {
    constructor(dashboardControl) {
        super();
        this.name = name;
        this._dashboardControl = dashboardControl;
        let widthItems = _layout_options_editor_1.getDimensionToolbarItems(_default_1.getLocalizationById('DashboardWebStringId.DesignerToolbar.Width'), 'width');
        let heightItems = _layout_options_editor_1.getDimensionToolbarItems(_default_1.getLocalizationById('DashboardWebStringId.DesignerToolbar.Height'), 'height');
        this._predefinedToolbarItems = widthItems.items.concat(heightItems.items);
        this._defaultToolbarItems = this._predefinedToolbarItems.map((item, index) => ({ name: item.name, index: LayoutOptionEditorExtension._toolbarItemsIndex + index }));
        this._refreshItems = (layoutOptions) => {
            widthItems.assignModel(layoutOptions && layoutOptions.width);
            heightItems.assignModel(layoutOptions && layoutOptions.height);
        };
        this._disposeItems = () => {
            widthItems.dispose();
            heightItems.dispose();
        };
    }
    start() {
        this._addToolbarItems(this._dashboardControl.findExtension('designerToolbar'));
        this._extensionsChangeSubscription && this._extensionsChangeSubscription.dispose();
        this._extensionsChangeSubscription = this._dashboardControl.subscribeExtensionsChanged({
            added: (extension) => {
                if (extension.name === 'designerToolbar') {
                    this._addToolbarItems(extension);
                }
            },
            deleted: (extension) => {
                if (extension.name === 'designerToolbar') {
                    this._removeToolbarItems(extension);
                }
            }
        });
        this._dashboardSubscription && this._dashboardSubscription.dispose();
        this._dashboardSubscription = _knockout_utils_1.subscribeAndPerform(this._dashboardControl.dashboard, dashboard => this._refreshItems(dashboard && dashboard.layoutOptions));
    }
    stop() {
        this._extensionsChangeSubscription && this._extensionsChangeSubscription.dispose();
        this._dashboardSubscription && this._dashboardSubscription.dispose();
        this._removeToolbarItems(this._dashboardControl.findExtension('designerToolbar'));
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
    dispose() {
        this.stop();
        this._disposeItems();
        super.dispose();
    }
}
exports.LayoutOptionEditorExtension = LayoutOptionEditorExtension;
LayoutOptionEditorExtension._toolbarItemsIndex = 100;
control_options_1.designerExtensions[name] = (dashboardControl, options) => new LayoutOptionEditorExtension(dashboardControl);
control_options_1.extensionNameMap[name] = name;
