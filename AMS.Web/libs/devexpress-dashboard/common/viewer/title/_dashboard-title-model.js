﻿/**
* DevExpress Dashboard (_dashboard-title-model.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardTitleModel = exports.masterFilterValues = exports.maxFilterValuesCount = void 0;
const ko = require("knockout");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _utils_1 = require("../../../data/_utils");
const disposable_object_1 = require("../../../model/disposable-object");
const _dashboard_title_toolbar_adapter_1 = require("../../../viewer-parts/title/_dashboard-title-toolbar-adapter");
exports.maxFilterValuesCount = 20;
function masterFilterValues(dashboard) {
    if (dashboard && dashboard.title.visible() && dashboard.title.includeMasterFilter()) {
        var newMasterFilterValues = dashboard
            ._masterFilterItems()
            .reduce((acc, item) => acc.concat(item._getDisplayFilterValues(exports.maxFilterValuesCount)), []);
        return newMasterFilterValues.length ? newMasterFilterValues : null;
    }
    return null;
}
exports.masterFilterValues = masterFilterValues;
class DashboardTitleModel extends disposable_object_1.DisposableObject {
    constructor(context, dashboard, customizeToolbarOptions) {
        super();
        this.context = context;
        this.dashboard = dashboard;
        this.customizeToolbarOptions = customizeToolbarOptions;
        this.onUpdated = _jquery_helpers_1.createJQueryCallbacks();
        this.toolbarOptions = ko.observable(null);
        this.parametersExtension = context && context.parametersExtension || ko.computed(() => null);
        this.exportExtension = context && context.exportExtension || ko.computed(() => null);
        this.viewerApi = context && context.viewerApi || null;
        this.viewerApi && this.viewerApi.title(this);
        let showParametersButton = ko.computed(() => {
            return dashboard && dashboard.parameters().some(param => param.parameterVisible()) &&
                (this.parametersExtension() && _utils_1.type.isDefined(this.parametersExtension().showDialogButton()) ? this.parametersExtension().showDialogButton() : false);
        });
        this.allowShowExportDialog = ko.computed(() => {
            return this.exportExtension() && this.exportExtension().allowExportDashboard;
        });
        this.masterFilterValues = ko.computed(() => {
            return masterFilterValues(dashboard);
        });
        this.showTitle = ko.computed(() => {
            return dashboard ? dashboard.title.visible() : false;
        });
        this.viewModel = ko.computed(() => {
            var titleModel = dashboard ? dashboard.title : undefined;
            if (titleModel && titleModel.visible()) {
                let imageViewModel;
                if (titleModel.image64()) {
                    imageViewModel = {
                        SourceBase64String: titleModel.image64(),
                        MimeType: 'image/png'
                    };
                }
                else if (titleModel.url()) {
                    imageViewModel = {
                        Url: titleModel.url()
                    };
                }
                var viewModel = {
                    Text: titleModel.text(),
                    Visible: titleModel.visible(),
                    ShowParametersButton: showParametersButton(),
                    IncludeMasterFilterValues: titleModel.includeMasterFilter(),
                    LayoutModel: {
                        Alignment: titleModel.alignment(),
                        ImageViewModel: imageViewModel
                    },
                };
                return viewModel;
            }
            return null;
        });
        this.update();
        this.toDispose(this.viewModel.subscribe(newValue => this.update()));
        this.toDispose(this.masterFilterValues.subscribe(newValue => this.update()));
        this.toDispose(this.masterFilterValues);
        this.toDispose(this.showTitle);
        this.toDispose(this.viewModel);
        this.toDispose(this.allowShowExportDialog);
        this.toDispose(showParametersButton);
    }
    update() {
        let showExportDialog = (format) => {
            this.exportExtension() && this.exportExtension().showExportDashboardDialog(format);
        };
        let showParametersDialog = () => {
            this.parametersExtension() && this.parametersExtension().show();
        };
        let options = _dashboard_title_toolbar_adapter_1.DashboardTitleToolbarAdapter.getTitleOptions(this.viewModel(), this.masterFilterValues(), showExportDialog, showParametersDialog, this.allowShowExportDialog());
        if (this.customizeToolbarOptions) {
            this.customizeToolbarOptions(options);
        }
        this._raiseUpdated(options);
        this.toolbarOptions({
            centerAligned: this.viewModel() ? this.viewModel().LayoutModel.Alignment === 'Center' : false,
            toolbarOptions: {
                staticItems: options.contentItems,
                actionItems: options.actionItems,
                navigationItems: options.navigationItems,
                stateItems: []
            },
        });
    }
    dispose() {
        this.viewerApi && this.viewerApi.title(null);
        super.dispose();
    }
    _raiseUpdated(option) {
        this.onUpdated.fire(option);
    }
}
exports.DashboardTitleModel = DashboardTitleModel;
