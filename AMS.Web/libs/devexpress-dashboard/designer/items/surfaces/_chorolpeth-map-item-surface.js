﻿/**
* DevExpress Dashboard (_chorolpeth-map-item-surface.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChoroplethMapItemSurface = void 0;
const ko = require("knockout");
const _data_field_1 = require("../../../model/data-sources/_data-field");
const chorolpeth_map_item_1 = require("../../../model/items/map/chorolpeth-map-item");
const _collection_editor_viewmodel_1 = require("../../ui-widgets/collection-editor/_collection-editor-viewmodel");
const _choropleth_map_element_properties_composer_1 = require("../properties-composers/_choropleth-map-element-properties-composer");
const _choropleth_map_item_properties_composer_1 = require("../properties-composers/_choropleth-map-item-properties-composer");
const _data_item_collection_surface_1 = require("../sections/_data-item-collection-surface");
const _data_item_container_collection_surface_1 = require("../sections/_data-item-container-collection-surface");
const _single_data_item_surface_1 = require("../sections/_single-data-item-surface");
const _section_descriptors_1 = require("../_section-descriptors");
const _base_item_surface_1 = require("./_base-item-surface");
const _delta_numeric_format_surface_1 = require("./_delta-numeric-format-surface");
class ChoroplethMapItemSurface extends _base_item_surface_1.DataDashboardItemSurface {
    constructor(dashboardItem, dashboardModel, dataSourceBrowser, notificationController) {
        super(dashboardItem, dashboardModel, dataSourceBrowser, notificationController);
    }
    fillSections() {
        this.dataSections.push(new _single_data_item_surface_1.SingleDataItemSurface({
            itemSurface: this,
            sectionInfo: _section_descriptors_1.SectionDescriptors.AttributeDimension,
            fieldConstraint: (field) => _data_field_1.DataField.isNumeric(field) || field.fieldType() === 'Bool' || field.fieldType() === 'Text',
            warning: ko.computed(() => !this.dashboardItem.attributeDimension() && !!(this.dashboardItem.maps().length || this.dashboardItem.tooltipMeasures().length))
        }));
        var sectionInfo = {
            title: 'DashboardWebStringId.Binding.Maps',
            bindingProperty: {
                propertyName: 'maps',
                emptyPlaceholder: 'DashboardWebStringId.Binding.AddMap',
                selectedPlaceholder: 'DashboardWebStringId.Binding.ConfigureMap',
                creator: (itemType = 'ValueMap') => {
                    return this.dashboardItem._createMap({ '@ItemType': itemType });
                },
                containersMap: chorolpeth_map_item_1.ChoroplethMapItem.choroplethMapTypesMap,
                dataItemType: 'Measure'
            },
            detailsPropertiesComposer: new _choropleth_map_element_properties_composer_1.ChoroplethMapElementPropertiesComposer(this._dataItemContainerCustomization, (model) => {
                var surface = new _delta_numeric_format_surface_1.DeltaNumericFormatSurface(model, this.propertiesController);
                surface.startEditing(new _collection_editor_viewmodel_1.CollectionEditorEditItemArguments());
            })
        };
        this.dataSections.push(new _data_item_container_collection_surface_1.DataItemContainerCollectionSurface(this, this.dashboardItem, sectionInfo, ko.computed(() => !this.dashboardItem.maps().length && !!(this.dashboardItem.attributeDimension() || this.dashboardItem.tooltipMeasures().length))));
        this.dataSections.push(new _data_item_collection_surface_1.DataItemCollectionSurface(this, _section_descriptors_1.SectionDescriptors.TooltipMeasures));
    }
    getPropertiesComposer() {
        return new _choropleth_map_item_properties_composer_1.ChoroplethMapItemPropertiesComposer(this._dashboardItemCustomization);
    }
}
exports.ChoroplethMapItemSurface = ChoroplethMapItemSurface;
_section_descriptors_1.surfaceItemsFactory.register('ChoroplethMap', ChoroplethMapItemSurface);
