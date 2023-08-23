﻿/**
* DevExpress Dashboard (_simple-filter-editor.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleFilterEditor = void 0;
const ko = require("knockout");
const _default_1 = require("../../../data/localization/_default");
const disposable_object_1 = require("../../../model/disposable-object");
const _filter_field_wrapper_1 = require("./_filter-field-wrapper");
const _simple_filter_tree_list_1 = require("./_simple-filter-tree-list");
class SimpleFilterEditor extends disposable_object_1.DisposableObject {
    constructor(dashboardItem, dataSourceBrowser) {
        super();
        this.dashboardItem = dashboardItem;
        this.dataSourceBrowser = dataSourceBrowser;
        this.popupVisible = ko.observable(false);
        this._filterTreeList = new _simple_filter_tree_list_1.SimpleFilterTreeList(dashboardItem, dataSourceBrowser);
        this._fieldSelector = new _filter_field_wrapper_1.FilterFieldSelector(dashboardItem, dataSourceBrowser, (field) => {
            this._filterTreeList.reload(field);
        });
        this._fieldSelector.init();
        this.viewModel = {
            getPopupOptions: (container) => {
                return {
                    target: container,
                    container: container,
                    position: {
                        my: 'center',
                        at: 'center',
                        boundary: container
                    },
                    height: '50%',
                    width: '50%',
                    minHeight: '250px',
                    minWidth: '250px',
                    animation: {},
                    focusStateEnabled: true,
                    resizeEnabled: true,
                    hideOnOutsideClick: false,
                    toolbarItems: [
                        { toolbar: 'bottom',
                            location: 'after',
                            widget: 'dxButton',
                            options: {
                                text: _default_1.getLocalizationById('DashboardWebStringId.DataSources.Save'),
                                onClick: () => this._applyHandler()
                            }
                        },
                        { toolbar: 'bottom',
                            location: 'after',
                            widget: 'dxButton',
                            options: {
                                text: _default_1.getLocalizationById('DashboardWebStringId.DataSources.Cancel'),
                                onClick: () => { this._onPopupHidden(); }
                            }
                        }
                    ],
                    onHidden: () => this._onPopupHidden(),
                    onShown: () => this._onPopupShown(),
                    visible: this.popupVisible,
                    shadingColor: 'rgba(0, 0, 0, 0.2)',
                    showTitle: true,
                    title: _default_1.getLocalizationById('DataAccessUIStringId.FiltersView'),
                    wrapperAttr: {
                        class: 'dx-filter-popup dx-dashboard-typography dx-dashboard-simple-filter'
                    }
                };
            },
            fieldSelector: this._fieldSelector,
            filterTreeList: this._filterTreeList
        };
    }
    _onPopupHidden() {
        this.popupVisible(false);
        this._filterTreeList.hide();
    }
    _onPopupShown() {
        this._filterTreeList.show(this._fieldSelector.selectedField);
    }
    _applyHandler() {
        if (!!this._fieldSelector.selectedField) {
            this.dataSourceBrowser.getDimensionFilterString(this.dashboardItem, this._fieldSelector.selectedField.dataMember(), this._filterTreeList.getTreeListItems().map(i => i.data)).done(filterString => {
                this.dashboardItem.filterString(filterString);
            });
        }
        this.popupVisible(false);
    }
    dispose() {
        super.dispose();
        this._fieldSelector.dispose();
        this._filterTreeList.dispose();
    }
}
exports.SimpleFilterEditor = SimpleFilterEditor;
