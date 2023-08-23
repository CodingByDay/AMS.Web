﻿/**
* DevExpress Dashboard (_filter-item-surface.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterItemSurface = void 0;
const _filter_item_properties_composer_1 = require("../properties-composers/_filter-item-properties-composer");
const _data_item_collection_surface_1 = require("../sections/_data-item-collection-surface");
const _section_descriptors_1 = require("../_section-descriptors");
const _base_item_surface_1 = require("./_base-item-surface");
class FilterItemSurface extends _base_item_surface_1.DataDashboardItemSurface {
    fillSections() {
        this.dataSections.push(new _data_item_collection_surface_1.DataItemCollectionSurface(this, _section_descriptors_1.SectionDescriptors.FilterDimensions));
    }
    constructor(dashboardItem, dashboardModel, dataSourceBrowser, notificationController) {
        super(dashboardItem, dashboardModel, dataSourceBrowser, notificationController);
    }
    getPropertiesComposer() {
        return new _filter_item_properties_composer_1.FilterItemPropertiesComposer(this._dashboardItemCustomization);
    }
}
exports.FilterItemSurface = FilterItemSurface;
_section_descriptors_1.surfaceItemsFactory.register('ComboBox', FilterItemSurface);
_section_descriptors_1.surfaceItemsFactory.register('ListBox', FilterItemSurface);
_section_descriptors_1.surfaceItemsFactory.register('TreeView', FilterItemSurface);
