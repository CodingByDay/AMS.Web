﻿/**
* DevExpress Dashboard (_date-filter-item-surface.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateFilterItemSurface = void 0;
const ko = require("knockout");
const _data_field_1 = require("../../../model/data-sources/_data-field");
const _date_filter_item_1 = require("../../../model/items/filter-items/metadata/_date-filter-item");
const _custom_range_properties_composer_1 = require("../properties-composers/_custom-range-properties-composer");
const _date_filter_item_properties_composer_1 = require("../properties-composers/_date-filter-item-properties-composer");
const _single_data_item_surface_1 = require("../sections/_single-data-item-surface");
const _section_descriptors_1 = require("../_section-descriptors");
const _base_item_surface_1 = require("./_base-item-surface");
class DateFilterItemSurface extends _base_item_surface_1.DataDashboardItemSurface {
    constructor(dashboardItem, dashboardModel, dataSourceBrowser, notificationController) {
        super(dashboardItem, dashboardModel, dataSourceBrowser, notificationController);
    }
    fillSections() {
        this.dataSections.push(new _single_data_item_surface_1.SingleDataItemSurface({
            itemSurface: this,
            sectionInfo: {
                title: 'DashboardStringId.DescriptionItemDimension',
                bindingProperty: {
                    propertyName: _date_filter_item_1.dateFilterDimension.propertyName,
                    dataItemType: 'Dimension',
                    emptyPlaceholder: 'DashboardStringId.DescriptionItemDimension',
                    selectedPlaceholder: 'DashboardStringId.DescriptionItemDimension'
                }
            },
            fieldConstraint: (dataField) => _data_field_1.DataField.isDateTime(dataField)
        }));
    }
    getPropertiesComposer() {
        return new _date_filter_item_properties_composer_1.DateFilterItemPropertiesComposer(this._dashboardItemCustomization, (model) => {
            var composer = new _custom_range_properties_composer_1.CustomRangePropertiesComposer();
            var tabs = composer.composeTabs(model, {
                argument: this.dashboardItem.dimension(),
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
exports.DateFilterItemSurface = DateFilterItemSurface;
_section_descriptors_1.surfaceItemsFactory.register('DateFilter', DateFilterItemSurface);
