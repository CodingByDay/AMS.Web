﻿/**
* DevExpress Dashboard (_range-filter-item-surface.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangeFilterItemSurface = void 0;
const ko = require("knockout");
const _data_field_1 = require("../../../model/data-sources/_data-field");
const chart_series_creator_1 = require("../../../model/items/chart/chart-series-creator");
const range_filter_item_1 = require("../../../model/items/range-filter/range-filter-item");
const _custom_range_properties_composer_1 = require("../properties-composers/_custom-range-properties-composer");
const _range_filter_item_properties_composer_1 = require("../properties-composers/_range-filter-item-properties-composer");
const _range_series_properties_composer_1 = require("../properties-composers/_range-series-properties-composer");
const _data_item_collection_surface_1 = require("../sections/_data-item-collection-surface");
const _data_item_container_collection_surface_1 = require("../sections/_data-item-container-collection-surface");
const _single_data_item_surface_1 = require("../sections/_single-data-item-surface");
const _section_descriptors_1 = require("../_section-descriptors");
const _base_item_surface_1 = require("./_base-item-surface");
class RangeFilterItemSurface extends _base_item_surface_1.DataDashboardItemSurface {
    fillSections() {
        var creator = chart_series_creator_1.ChartSeriesCreator.getSeriesCreator(this.dashboardItem);
        var sectionInfo = {
            title: 'DashboardWebStringId.Binding.Values',
            bindingProperty: {
                propertyName: 'series',
                emptyPlaceholder: 'DashboardWebStringId.Binding.AddValue',
                selectedPlaceholder: 'DashboardWebStringId.Binding.ConfigureValue',
                creator: (itemType = 'Line') => {
                    return creator(itemType);
                },
                containersMap: range_filter_item_1.RangeFilterItem.rangeSeriesViewTypesMap,
                dataItemType: 'Measure'
            },
            detailsPropertiesComposer: new _range_series_properties_composer_1.RangeSeriesPropertiesComposer(this._dataItemContainerCustomization)
        };
        this.dataSections.push(new _data_item_container_collection_surface_1.DataItemContainerCollectionSurface(this, this.dashboardItem, sectionInfo, ko.computed(() => !this.dashboardItem.series().length && (!!this.dashboardItem.argument() || !!this.dashboardItem.seriesDimensions().length))));
        this.dataSections.push(new _single_data_item_surface_1.SingleDataItemSurface({
            itemSurface: this,
            sectionInfo: _section_descriptors_1.SectionDescriptors.SingleArgument,
            fieldConstraint: (dataField) => _data_field_1.DataField.isContinous(dataField) && !_data_field_1.DataField.isOlapHierarchy(dataField),
            warning: ko.computed(() => (!!this.dashboardItem.series().length || !!this.dashboardItem.seriesDimensions().length) && !this.dashboardItem.argument())
        }));
        this.dataSections.push(new _data_item_collection_surface_1.DataItemCollectionSurface(this, _section_descriptors_1.SectionDescriptors.SeriesDimension));
    }
    constructor(dashboardItem, dashboardModel, dataSourceBrowser, notificationController) {
        super(dashboardItem, dashboardModel, dataSourceBrowser, notificationController);
    }
    getPropertiesComposer() {
        return new _range_filter_item_properties_composer_1.RangeFilterItemPropertiesComposer(this._dashboardItemCustomization, (model) => {
            var composer = new _custom_range_properties_composer_1.CustomRangePropertiesComposer();
            var tabs = composer.composeTabs(model, {
                argument: this.dashboardItem.argument(),
                rangeFilterItem: this.dashboardItem
            });
            this.propertiesController.secondaryModel({
                displayText: model.name,
                data: {
                    model: model,
                    propertiesTabs: ko.observableArray(tabs)
                },
                containingCollection: this.dashboardItem.dateTimePeriods
            });
        });
    }
}
exports.RangeFilterItemSurface = RangeFilterItemSurface;
_section_descriptors_1.surfaceItemsFactory.register('RangeFilter', RangeFilterItemSurface);
