﻿/**
* DevExpress Dashboard (_bound-image-item-surface.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoundImageItemSurface = void 0;
const _bound_image_item_1 = require("../../../model/items/metadata/_bound-image-item");
const _bound_image_item_properties_composer_1 = require("../properties-composers/_bound-image-item-properties-composer");
const _single_data_item_surface_1 = require("../sections/_single-data-item-surface");
const _section_descriptors_1 = require("../_section-descriptors");
const _base_item_surface_1 = require("./_base-item-surface");
class BoundImageItemSurface extends _base_item_surface_1.DataDashboardItemSurface {
    fillSections() {
        this.dataSections.push(new _single_data_item_surface_1.SingleDataItemSurface({
            itemSurface: this,
            sectionInfo: {
                title: 'DashboardWebStringId.Binding.Attribute',
                bindingProperty: {
                    propertyName: _bound_image_item_1.imageItem.propertyName,
                    dataItemType: 'Dimension',
                    emptyPlaceholder: 'DashboardWebStringId.Binding.SetAttribute',
                    selectedPlaceholder: 'DashboardWebStringId.Binding.ConfigureAttribute'
                }
            }
        }));
    }
    constructor(dashboardItem, dashboardModel, dataSourceBrowser, notificationController) {
        super(dashboardItem, dashboardModel, dataSourceBrowser, notificationController);
    }
    getPropertiesComposer() {
        return new _bound_image_item_properties_composer_1.BoundImageItemPropertiesComposer(this._dashboardItemCustomization);
    }
}
exports.BoundImageItemSurface = BoundImageItemSurface;
_section_descriptors_1.surfaceItemsFactory.register('BoundImage', BoundImageItemSurface);
