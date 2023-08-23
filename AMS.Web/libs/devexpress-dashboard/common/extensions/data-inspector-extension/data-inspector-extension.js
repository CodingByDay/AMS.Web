﻿/**
* DevExpress Dashboard (data-inspector-extension.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataInspectorExtension = void 0;
const _default_1 = require("../../../data/localization/_default");
const model_1 = require("../../../model");
const disposable_object_1 = require("../../../model/disposable-object");
const _dashboard_layout_mode_helper_1 = require("../../../viewer-parts/_dashboard-layout-mode-helper");
const caption_toolbar_options_1 = require("../../../viewer-parts/widgets/caption-toolbar/caption-toolbar-options");
const control_options_1 = require("../../control-options");
const _underlying_data_provider_1 = require("../../data/_underlying-data-provider");
const _options_manager_1 = require("../../internal/_options-manager");
const _utils_1 = require("../../internal/_utils");
const _data_inspector_view_model_1 = require("./_data-inspector-view-model");
const name = 'dataInspector';
const nameAlias = 'data-inspector';
class DataInspectorExtension extends disposable_object_1.DisposableObject {
    constructor(dashboardControl, options = {}) {
        super();
        this._optionsManager = new _options_manager_1.OptionsManager();
        this._defaultOptions = {
            allowInspectAggregatedData: false,
            allowInspectRawData: false
        };
        this.name = name;
        this._addContextToolbarItem = (toolbarOptions, dashboardItem) => {
            if ((this._optionsManager.get('allowInspectAggregatedData') || this._optionsManager.get('allowInspectRawData')) && dashboardItem instanceof model_1.DataDashboardItem) {
                toolbarOptions.actionItems.push({
                    hint: _default_1.getLocalizationById('DashboardStringId.ActionShowDataInspector'),
                    icon: 'dx-dashboard-data-inspector',
                    name: caption_toolbar_options_1.dashboardToolbarItemNames.dataInspector,
                    type: 'button',
                    click: () => {
                        this._viewModel.show(dashboardItem, this._optionsManager.get('allowInspectAggregatedData'), this._optionsManager.get('allowInspectRawData'));
                    }
                });
            }
        };
        this._optionsManager.initialize({
            extensionName: name,
            dashboardControl: dashboardControl,
            defaultOptions: this._defaultOptions,
            eventsHolder: this,
            initOptions: options,
            optionChanged: (args) => this._optionChanged(args)
        });
        this._dashboardControl = dashboardControl;
        this._viewModel = new _data_inspector_view_model_1.DataInspectorViewModel({
            getContainer: () => _dashboard_layout_mode_helper_1.DashboardLayoutModeHelper.isMobile ? window.document.body : dashboardControl.getWidgetContainer(),
            onGridContentReady: (e) => { this._optionsManager.raiseEvent('gridContentReady', e); },
            onGridInitialized: (e) => { this._optionsManager.raiseEvent('gridInitialized', e); },
            onDialogShowing: (e) => { this._optionsManager.raiseEvent('dialogShowing', e); },
            onDialogShown: (e) => { this._optionsManager.raiseEvent('dialogShown', e); },
            onDialogHidden: (e) => { this._optionsManager.raiseEvent('dialogHidden', e); },
        });
        this._customTemplate = {
            name: 'dx-dashboard-data-inspector-extension',
            data: this._viewModel
        };
    }
    _optionChanged(args) {
        switch (args.name) {
            case 'allowInspectAggregatedData':
            case 'allowInspectRawData':
                this.hideDataInspector();
                return 'updateItemToolbars';
            default:
                return null;
        }
    }
    start() {
        this._dashboardControl.customTemplates.push(this._customTemplate);
        if (this._dashboardControl._serviceClient()) {
            this._viewModel.setUnderlyingDataProvider(new _underlying_data_provider_1.UnderlyingDataProvider(this._dashboardControl._serviceClient()));
        }
        this.toDispose(this._dashboardControl._serviceClient.subscribe(serviceClient => {
            this._viewModel.setUnderlyingDataProvider(new _underlying_data_provider_1.UnderlyingDataProvider(serviceClient));
        }));
        this._dashboardControl._dashboardContext.addContextToolbarItems.add(this._addContextToolbarItem);
    }
    stop() {
        this._dashboardControl.customTemplates.remove(this._customTemplate);
        this._dashboardControl._dashboardContext.addContextToolbarItems.remove(this._addContextToolbarItem);
    }
    showDataInspector(dashboardItemName, inspectedType) {
        var dashboard = this._dashboardControl.dashboard();
        if (dashboard) {
            var dashboardItem = _utils_1.findItemForApi(dashboard, dashboardItemName, model_1.DataDashboardItem);
            this._viewModel.show(dashboardItem, this._optionsManager.get('allowInspectAggregatedData'), this._optionsManager.get('allowInspectRawData'), inspectedType);
        }
    }
    currentInspectedType() {
        return this._viewModel.visible() && this._viewModel.inspectedDataType() || null;
    }
    hideDataInspector() {
        this._viewModel.visible(false);
    }
}
exports.DataInspectorExtension = DataInspectorExtension;
control_options_1.defaultExtensions[nameAlias] = (dashboardControl, options) => new DataInspectorExtension(dashboardControl, options);
control_options_1.extensionNameMap[nameAlias] = name;
