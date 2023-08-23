﻿/**
* DevExpress Dashboard (_add-data-source-popup.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDataSourcePopup = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const _default_1 = require("../../data/localization/_default");
const dashboard_1 = require("../../model/dashboard");
class AddDataSourcePopup {
    constructor(accessibleDataSourcesExtension, dataSourceFilter, addDataSourcesCallback, popupVisible) {
        this.title = _default_1.getLocalizationById('DashboardWebStringId.DataSources.AddDataSource');
        this.toolbarItems = [];
        this.addButtonDisable = ko.computed(() => { return accessibleDataSourcesExtension && accessibleDataSourcesExtension().selectedDataSources().length === 0; });
        this.template = accessibleDataSourcesExtension().templateName;
        this.bindingData = accessibleDataSourcesExtension().viewModel;
        this.dataSourcesFilter = dataSourceFilter;
        this.toolbarItems = [{
                toolbar: 'bottom',
                location: 'after',
                widget: 'dxButton',
                disabled: this.addButtonDisable,
                options: {
                    text: _default_1.getLocalizationById('DashboardWebStringId.DataSources.IncludeToTheDashboard'),
                    type: 'default',
                    onClick: () => {
                        addDataSourcesCallback(accessibleDataSourcesExtension().selectedDataSources().map(dataSource => {
                            return dashboard_1.Dashboard._createDataSource(new analytics_utils_1.ModelSerializer({ useRefs: false }).serialize(dataSource), new analytics_utils_1.ModelSerializer());
                        }));
                        popupVisible(false);
                    }
                }
            }, {
                toolbar: 'bottom',
                location: 'after',
                widget: 'dxButton',
                options: {
                    text: _default_1.getLocalizationById('DashboardWebStringId.DataSources.Cancel'),
                    onClick: () => { popupVisible(false); }
                }
            }];
    }
}
exports.AddDataSourcePopup = AddDataSourcePopup;
