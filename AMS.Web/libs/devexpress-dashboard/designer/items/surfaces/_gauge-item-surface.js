﻿/**
* DevExpress Dashboard (_gauge-item-surface.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GaugeItemSurface = void 0;
const ko = require("knockout");
const gauge_1 = require("../../../model/items/gauge/gauge");
const _collection_editor_viewmodel_1 = require("../../ui-widgets/collection-editor/_collection-editor-viewmodel");
const _gauge_element_properties_composer_1 = require("../properties-composers/_gauge-element-properties-composer");
const _gauge_item_properties_composer_1 = require("../properties-composers/_gauge-item-properties-composer");
const _data_item_collection_surface_1 = require("../sections/_data-item-collection-surface");
const _data_item_container_collection_surface_1 = require("../sections/_data-item-container-collection-surface");
const _section_descriptors_1 = require("../_section-descriptors");
const _base_item_surface_1 = require("./_base-item-surface");
const _delta_numeric_format_surface_1 = require("./_delta-numeric-format-surface");
class GaugeItemSurface extends _base_item_surface_1.DataDashboardItemSurface {
    fillSections() {
        var sectionInfo = {
            title: 'DashboardWebStringId.Binding.Gauges',
            bindingProperty: {
                propertyName: 'gauges',
                emptyPlaceholder: 'DashboardWebStringId.Binding.AddGauge',
                selectedPlaceholder: 'DashboardWebStringId.Binding.ConfigureGauge',
                creator: (itemType = 'GaugeElement') => {
                    return new gauge_1.Gauge(this.dashboardItem, { '@ItemType': itemType });
                },
                dataItemType: 'Measure'
            },
            detailsPropertiesComposer: new _gauge_element_properties_composer_1.GaugeElementPropertiesComposer(this._dataItemContainerCustomization, (model) => {
                var surface = new _delta_numeric_format_surface_1.DeltaNumericFormatSurface(model, this.propertiesController);
                surface.startEditing(new _collection_editor_viewmodel_1.CollectionEditorEditItemArguments());
            })
        };
        this.dataSections.push(new _data_item_container_collection_surface_1.DataItemContainerCollectionSurface(this, this.dashboardItem, sectionInfo, ko.computed(() => !this.dashboardItem.gauges().length && !!this.dashboardItem.seriesDimensions().length)));
        this.dataSections.push(new _data_item_collection_surface_1.DataItemCollectionSurface(this, _section_descriptors_1.SectionDescriptors.SeriesDimension));
    }
    constructor(dashboardItem, dashboardModel, dataSourceBrowser, notificationController) {
        super(dashboardItem, dashboardModel, dataSourceBrowser, notificationController);
    }
    getPropertiesComposer() {
        return new _gauge_item_properties_composer_1.GaugeItemPropertiesComposer(this._dashboardItemCustomization);
    }
}
exports.GaugeItemSurface = GaugeItemSurface;
_section_descriptors_1.surfaceItemsFactory.register('Gauge', GaugeItemSurface);
