﻿/**
* DevExpress Dashboard (_custom-item-surface.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomItemSurface = exports.CustomItemPropertiesComposer = void 0;
const string_1 = require("devextreme/core/utils/string");
const _default_1 = require("../../../data/localization/_default");
const custom_item_1 = require("../../../model/items/custom-item/custom-item");
const accordion_tab_options_1 = require("../../accordion-tab-options");
const _object_properties_wrapper_1 = require("../../form-adapter/_object-properties-wrapper");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _base_properties_composer_1 = require("../properties-composers/_base-properties-composer");
const _shared_composers_1 = require("../properties-composers/_shared-composers");
const _data_item_collection_surface_1 = require("../sections/_data-item-collection-surface");
const _single_data_item_surface_1 = require("../sections/_single-data-item-surface");
const _section_descriptors_1 = require("../_section-descriptors");
const _base_item_surface_1 = require("./_base-item-surface");
const _custom_item_properties_composer_helper_1 = require("./_custom-item-properties-composer-helper");
class CustomItemPropertiesComposer extends _base_properties_composer_1.DashboardItemPropertiesComposer {
    constructor(customizeHandler) {
        super(customizeHandler);
    }
    _mapLegacyPropertiesToTabs(model) {
        const propertiesByTabs = model.legacyCustomProperties && model.legacyCustomProperties.reduce((acc, property) => {
            const tabName = property.sectionName || _accordion_tab_1.KnownTabs.Common;
            acc[tabName] = acc[tabName] || [];
            acc[tabName].push(_custom_item_properties_composer_helper_1.CustomItemPropertiesComposerHelper.convertToDashboardSerializationInfo(property));
            return acc;
        }, {});
        const specificProperties = propertiesByTabs[_accordion_tab_1.KnownTabs.Common] ? [
            {
                container: { propertyName: 'customProperties' },
                properties: propertiesByTabs[_accordion_tab_1.KnownTabs.Common] || []
            }
        ] : [];
        return [
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Common, 'DashboardWebStringId.AccordionTab.Common', _shared_composers_1.SharedComposers.getCommonWrapper(model, specificProperties)),
            ...Object.keys(propertiesByTabs)
                .filter(tabName => tabName !== _accordion_tab_1.KnownTabs.Common)
                .map(tabName => new _accordion_tab_1.AccordionTab(tabName, tabName, new _object_properties_wrapper_1.ObjectPropertiesWrapper({
                model: model.customProperties,
                properties: propertiesByTabs[tabName]
            })))
        ];
    }
    _composeTabsCore(model) {
        if (model._optionsPanelSections) {
            return [
                new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Common, 'DashboardWebStringId.AccordionTab.Common', _shared_composers_1.SharedComposers.getCommonWrapper(model)),
                ...model._optionsPanelSections.reduce((tabs, section) => {
                    accordion_tab_options_1._customizeTabs(tabs, section, model);
                    return tabs;
                }, [])
            ];
        }
        else {
            return this._mapLegacyPropertiesToTabs(model);
        }
    }
}
exports.CustomItemPropertiesComposer = CustomItemPropertiesComposer;
class CustomItemSurface extends _base_item_surface_1.DataDashboardItemSurface {
    get showDefaultSections() {
        return this.dashboardItem.customBindings.length > 0;
    }
    fillSections() {
        var format = (localizationId, arg1) => string_1.format(_default_1.getLocalizationById(localizationId), _default_1.getLocalizationById(arg1));
        this.dashboardItem.customBindings.forEach(binding => {
            var sectionInfo = {
                title: binding.displayName,
                bindingProperty: {
                    propertyName: custom_item_1.CustomItem._getBindingLinkName(binding.propertyName),
                    dataItemType: binding.dataItemType,
                    emptyPlaceholder: binding.emptyPlaceholder || format('DashboardWebStringId.Binding.DefaultEmptyPlaceholder', binding.displayName),
                    selectedPlaceholder: binding.selectedPlaceholder || format('DashboardWebStringId.Binding.DefaultSelectedPlaceholder', binding.displayName)
                }
            };
            if (binding.array) {
                this.dataSections.push(new _data_item_collection_surface_1.DataItemCollectionSurface(this, sectionInfo));
            }
            else {
                this.dataSections.push(new _single_data_item_surface_1.SingleDataItemSurface({
                    itemSurface: this,
                    sectionInfo: sectionInfo,
                    fieldConstraint: (dataField) => {
                        return !binding.constraints || !binding.constraints.allowedTypes || binding.constraints.allowedTypes.indexOf(dataField.fieldType()) >= 0;
                    }
                }));
            }
        });
    }
    constructor(dashboardItem, dashboardModel, dataSourceBrowser, notificationController) {
        super(dashboardItem, dashboardModel, dataSourceBrowser, notificationController);
    }
    getPropertiesComposer() {
        return new CustomItemPropertiesComposer(this._dashboardItemCustomization);
    }
}
exports.CustomItemSurface = CustomItemSurface;
_section_descriptors_1.surfaceItemsFactory.register('CustomItem', CustomItemSurface);
