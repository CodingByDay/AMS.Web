﻿/**
* DevExpress Dashboard (_pie-map-item-surface.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PieMapItemSurface = void 0;
const ko = require("knockout");
const _data_field_1 = require("../../../model/data-sources/_data-field");
const _pie_map_item_properties_composer_1 = require("../properties-composers/_pie-map-item-properties-composer");
const _data_item_collection_surface_1 = require("../sections/_data-item-collection-surface");
const _single_data_item_surface_1 = require("../sections/_single-data-item-surface");
const _section_descriptors_1 = require("../_section-descriptors");
const _base_item_surface_1 = require("./_base-item-surface");
class PieMapItemSurface extends _base_item_surface_1.DataDashboardItemSurface {
    constructor(dashboardItem, dashboardModel, dataSourceBrowser, notificationController) {
        super(dashboardItem, dashboardModel, dataSourceBrowser, notificationController);
    }
    fillSections() {
        this.dataSections.push(new _single_data_item_surface_1.SingleDataItemSurface({
            itemSurface: this,
            sectionInfo: _section_descriptors_1.SectionDescriptors.Latitude,
            fieldConstraint: field => _data_field_1.DataField.isNumeric(field),
            warning: ko.computed(() => !this.dashboardItem.latitude() && !!(this.dashboardItem.longitude() || this.dashboardItem.values().length || this.dashboardItem.argument() || this.dashboardItem.tooltipDimensions().length || this.dashboardItem.tooltipMeasures().length))
        }));
        this.dataSections.push(new _single_data_item_surface_1.SingleDataItemSurface({
            itemSurface: this,
            sectionInfo: _section_descriptors_1.SectionDescriptors.Longitude,
            fieldConstraint: field => _data_field_1.DataField.isNumeric(field),
            warning: ko.computed(() => !this.dashboardItem.longitude() && !!(this.dashboardItem.latitude() || this.dashboardItem.values().length || this.dashboardItem.argument() || this.dashboardItem.tooltipDimensions().length || this.dashboardItem.tooltipMeasures().length))
        }));
        this.dataSections.push(new _data_item_collection_surface_1.DataItemCollectionSurface(this, _section_descriptors_1.SectionDescriptors.Values));
        this.dataSections.push(new _single_data_item_surface_1.SingleDataItemSurface({
            itemSurface: this,
            sectionInfo: _section_descriptors_1.SectionDescriptors.Argument,
            warning: ko.computed(() => !this.dashboardItem.argument() && !!(this.dashboardItem.latitude() || this.dashboardItem.longitude() || this.dashboardItem.values().length || this.dashboardItem.tooltipDimensions().length || this.dashboardItem.tooltipMeasures().length))
        }));
        this.dataSections.push(new _data_item_collection_surface_1.DataItemCollectionSurface(this, _section_descriptors_1.SectionDescriptors.TooltipDimensions));
        this.dataSections.push(new _data_item_collection_surface_1.DataItemCollectionSurface(this, _section_descriptors_1.SectionDescriptors.TooltipMeasures));
    }
    getPropertiesComposer() {
        return new _pie_map_item_properties_composer_1.PieMapItemPropertiesComposer(this._dashboardItemCustomization);
    }
}
exports.PieMapItemSurface = PieMapItemSurface;
_section_descriptors_1.surfaceItemsFactory.register('PieMap', PieMapItemSurface);
