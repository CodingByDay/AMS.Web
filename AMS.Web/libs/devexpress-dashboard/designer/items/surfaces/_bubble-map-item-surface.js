﻿/**
* DevExpress Dashboard (_bubble-map-item-surface.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BubbleMapItemSurface = void 0;
const ko = require("knockout");
const _data_field_1 = require("../../../model/data-sources/_data-field");
const _bubble_map_item_properties_composer_1 = require("../properties-composers/_bubble-map-item-properties-composer");
const _data_item_collection_surface_1 = require("../sections/_data-item-collection-surface");
const _single_data_item_surface_1 = require("../sections/_single-data-item-surface");
const _section_descriptors_1 = require("../_section-descriptors");
const _base_item_surface_1 = require("./_base-item-surface");
class BubbleMapItemSurface extends _base_item_surface_1.DataDashboardItemSurface {
    constructor(dashboardItem, dashboardModel, dataSourceBrowser, notificationController) {
        super(dashboardItem, dashboardModel, dataSourceBrowser, notificationController);
    }
    fillSections() {
        this.dataSections.push(new _single_data_item_surface_1.SingleDataItemSurface({
            itemSurface: this,
            sectionInfo: _section_descriptors_1.SectionDescriptors.Latitude,
            fieldConstraint: field => _data_field_1.DataField.isNumeric(field),
            warning: ko.computed(() => !this.dashboardItem.latitude() && !!(this.dashboardItem.longitude() || this.dashboardItem.weight() || this.dashboardItem.color() || this.dashboardItem.tooltipDimensions().length || this.dashboardItem.tooltipMeasures().length))
        }));
        this.dataSections.push(new _single_data_item_surface_1.SingleDataItemSurface({
            itemSurface: this,
            sectionInfo: _section_descriptors_1.SectionDescriptors.Longitude,
            fieldConstraint: field => _data_field_1.DataField.isNumeric(field),
            warning: ko.computed(() => !this.dashboardItem.longitude() && !!(this.dashboardItem.latitude() || this.dashboardItem.weight() || this.dashboardItem.color() || this.dashboardItem.tooltipDimensions().length || this.dashboardItem.tooltipMeasures().length))
        }));
        this.dataSections.push(new _single_data_item_surface_1.SingleDataItemSurface({ itemSurface: this, sectionInfo: _section_descriptors_1.SectionDescriptors.Weight }));
        this.dataSections.push(new _single_data_item_surface_1.SingleDataItemSurface({
            itemSurface: this,
            sectionInfo: _section_descriptors_1.SectionDescriptors.Color,
            warning: ko.computed(() => !this.dashboardItem.color() && !!(this.dashboardItem.latitude() || this.dashboardItem.longitude() || this.dashboardItem.weight() || this.dashboardItem.tooltipDimensions().length || this.dashboardItem.tooltipMeasures().length))
        }));
        this.dataSections.push(new _data_item_collection_surface_1.DataItemCollectionSurface(this, _section_descriptors_1.SectionDescriptors.TooltipDimensions));
        this.dataSections.push(new _data_item_collection_surface_1.DataItemCollectionSurface(this, _section_descriptors_1.SectionDescriptors.TooltipMeasures));
    }
    getPropertiesComposer() {
        return new _bubble_map_item_properties_composer_1.BubleMapItemPropertiesComposer(this._dashboardItemCustomization);
    }
}
exports.BubbleMapItemSurface = BubbleMapItemSurface;
_section_descriptors_1.surfaceItemsFactory.register('BubbleMap', BubbleMapItemSurface);
