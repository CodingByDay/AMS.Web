﻿/**
* DevExpress Dashboard (_item-filter-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemFilterPropertiesComposer = void 0;
const ko = require("knockout");
const _default_1 = require("../../data/localization/_default");
const model_1 = require("../../model");
const _knockout_utils_1 = require("../../model/internal/_knockout-utils");
const _data_dashboard_item_1 = require("../../model/items/metadata/_data-dashboard-item");
const _filter_utils_1 = require("../filtering/_filter-utils");
const _item_filter_display_name_provider_1 = require("../filtering/_item-filter-display-name-provider");
const _item_filter_items_provider_1 = require("../filtering/_item-filter-items-provider");
const _form_adapter_editors_1 = require("../form-adapter/_form-adapter-editors");
const _object_properties_wrapper_1 = require("../form-adapter/_object-properties-wrapper");
const _accordion_tab_1 = require("../properties-controller/_accordion-tab");
class ItemFilterPropertiesComposer {
    constructor(dataSourceBrowser) {
        this.dataSourceBrowser = dataSourceBrowser;
    }
    composeTabs(item) {
        if (this.dataSourceBrowser.findDataSource(item.dataSource()) instanceof model_1.OlapDataSource) {
            var itemFilterTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.ItemFilter, 'DashboardWebStringId.AccordionTab.ItemFilter');
            this._fillSimpleFilterTab(itemFilterTab, item, this.dataSourceBrowser);
            return [itemFilterTab];
        }
        else {
            var itemFilterTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.ItemFilter, 'DashboardWebStringId.AccordionTab.ItemFilter');
            var visibleDataFilterTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.VisibleDataFilter, 'DashboardWebStringId.AccordionTab.VisibleDataFilter');
            this._fillFilterTab(itemFilterTab, item, item.filterString, this.dataSourceBrowser, _data_dashboard_item_1.filterString);
            this._fillFilterTab(visibleDataFilterTab, item, item.visibleDataFilterString, this.dataSourceBrowser, _data_dashboard_item_1.visibleDataFilterString);
            return [itemFilterTab, visibleDataFilterTab];
        }
    }
    _fillFilterTab(tab, dashboardItem, targetObservable, dataSourceBrowser, propertyDescriptor) {
        let wrapper = new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: dashboardItem,
            properties: [
                Object.assign(Object.assign({}, propertyDescriptor), { formAdapterItem: _form_adapter_editors_1.filterEditor({
                        fieldListProvider: ko.observable(new _item_filter_items_provider_1.ItemFilterItemsProvider(dataSourceBrowser, dataSourceBrowser, dataSourceBrowser.parameters, dashboardItem, (di) => { return di instanceof model_1.Dimension; })),
                        options: _filter_utils_1.createItemFilterOptions(targetObservable, undefined, dataSourceBrowser),
                        displayNameProvider: new _item_filter_display_name_provider_1.ItemFilterDisplayNameProvider(dashboardItem, dataSourceBrowser)
                    }) })
            ],
            summary: _knockout_utils_1.safeComputed({ filterString: targetObservable }, (args) => { return !!args.filterString ? _default_1.getLocalizationById('DashboardWebStringId.ButtonOn') : ''; })
        });
        tab.tabModel(wrapper);
    }
    _fillSimpleFilterTab(tab, dashboardItem, dataSourceBrowser) {
        let wrapper = new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: dashboardItem,
            properties: [
                Object.assign(Object.assign({}, _data_dashboard_item_1.filterString), { formAdapterItem: _form_adapter_editors_1.simpleFilterEditor({
                        dashboardItem, dataSourceBrowser
                    }) })
            ],
            summary: _knockout_utils_1.safeComputed({ filterString: dashboardItem.filterString }, (args) => { return !!args.filterString ? _default_1.getLocalizationById('DashboardWebStringId.ButtonOn') : ''; })
        });
        tab.tabModel(wrapper);
    }
}
exports.ItemFilterPropertiesComposer = ItemFilterPropertiesComposer;
