﻿/**
* DevExpress Dashboard (_rename-data-source-viewmodel.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenameDataSourceViewModel = void 0;
const ko = require("knockout");
const _default_1 = require("../../../data/localization/_default");
const _helper_classes_1 = require("../../../model/internal/_helper-classes");
class RenameDataSourceViewModel {
    constructor(dataSourceBrowser) {
        this.title = _default_1.getLocalizationById('DashboardWebStringId.DataSources.RenameDataSource');
        this.label = _default_1.getLocalizationById('DashboardWebStringId.DataSources.NewDataSourceName');
        this.isDataSourceNameValid = ko.observable(true);
        this.popupVisible = ko.observable(false);
        this.toolbarItems = [];
        this.dsName = ko.observable('');
        this._dataSourceNameValid = (dsName) => {
            let otherDataSources = this._dataSourceBrowser._dataSources().filter(ds => ds.componentName() !== this._dataSource.componentName());
            return dsName && _helper_classes_1.NameGenerator.isValidName(dsName, otherDataSources, 'name');
        };
        this._dataSourceBrowser = dataSourceBrowser;
        this.toolbarItems = [{
                toolbar: 'bottom',
                location: 'after',
                widget: 'dxButton',
                options: {
                    text: _default_1.getLocalizationById('DashboardWebStringId.DataSources.Rename'),
                    type: 'default',
                    disabled: ko.computed(() => !this.isDataSourceNameValid()),
                    onClick: () => {
                        this._dataSource.name(this.dsName());
                        this.popupVisible(false);
                    }
                }
            },
            {
                toolbar: 'bottom',
                location: 'after',
                widget: 'dxButton',
                options: {
                    text: _default_1.getLocalizationById('DashboardWebStringId.DataSources.Cancel'),
                    onClick: () => { this.popupVisible(false); }
                }
            }];
        this.nameValidationRules = [{
                type: 'required'
            }, {
                type: 'custom',
                validationCallback: (params) => {
                    return this._dataSourceNameValid(params.value);
                },
                message: _default_1.getLocalizationById('DashboardWebStringId.DataSources.DataSourceNameExistsMessage')
            }];
        this.nameTextBoxOptions = {
            value: this.dsName
        };
        this.nameValidatorOptions = {
            isValid: this.isDataSourceNameValid,
            validationRules: this.nameValidationRules
        };
    }
    show(dataSource) {
        this._dataSource = dataSource;
        this.dsName(dataSource.name());
        this.popupVisible(true);
    }
}
exports.RenameDataSourceViewModel = RenameDataSourceViewModel;
