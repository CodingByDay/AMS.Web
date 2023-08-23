﻿/**
* DevExpress Dashboard (_pie-item-surface.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PieItemSurface = void 0;
const ko = require("knockout");
const _pie_item_properties_composer_1 = require("../properties-composers/_pie-item-properties-composer");
const _data_item_collection_surface_1 = require("../sections/_data-item-collection-surface");
const _section_descriptors_1 = require("../_section-descriptors");
const _base_item_surface_1 = require("./_base-item-surface");
class PieItemSurface extends _base_item_surface_1.DataDashboardItemSurface {
    fillSections() {
        this.dataSections.push(new _data_item_collection_surface_1.DataItemCollectionSurface(this, _section_descriptors_1.SectionDescriptors.Values, undefined, ko.computed(() => (this.dashboardItem.arguments().length > 0 || this.dashboardItem.seriesDimensions().length > 0) && this.dashboardItem.values().length === 0)));
        this.dataSections.push(new _data_item_collection_surface_1.DataItemCollectionSurface(this, _section_descriptors_1.SectionDescriptors.Arguments));
        this.dataSections.push(new _data_item_collection_surface_1.DataItemCollectionSurface(this, _section_descriptors_1.SectionDescriptors.SeriesDimension));
    }
    constructor(dashboardItem, dashboardModel, dataSourceBrowser, notificationController) {
        super(dashboardItem, dashboardModel, dataSourceBrowser, notificationController);
    }
    getPropertiesComposer() {
        return new _pie_item_properties_composer_1.PieItemPropertiesComposer(this._dashboardItemCustomization);
    }
}
exports.PieItemSurface = PieItemSurface;
_section_descriptors_1.surfaceItemsFactory.register('Pie', PieItemSurface);
