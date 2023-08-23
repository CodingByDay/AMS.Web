﻿/**
* DevExpress Dashboard (custom-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomItem = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const _item_data_axis_point_1 = require("../../../data/item-data/_item-data-axis-point");
const special_values_1 = require("../../../data/special-values");
const _formatter_1 = require("../../../data/_formatter");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const color_1 = require("../../color");
const custom_properties_metadata_1 = require("../../custom-properties/custom-properties-metadata");
const _custom_properties_utils_1 = require("../../custom-properties/_custom-properties-utils");
const data_item_1 = require("../../data-item/data-item");
const _data_item_1 = require("../../data-item/metadata/_data-item");
const custom_item_calc_window_definition_1 = require("../../data-item/window-definition/custom-item-calc-window-definition");
const _knockout_utils_1 = require("../../internal/_knockout-utils");
const _utils_1 = require("../../internal/_utils");
const _base_metadata_1 = require("../../metadata/_base-metadata");
const data_dashboard_item_1 = require("../data-dashboard-item");
const interactivity_options_1 = require("../options/interactivity-options");
const _coloring_options_1 = require("../options/metadata/_coloring-options");
const _custom_item_1 = require("./metadata/_custom-item");
const slice_table_1 = require("./slice-table");
var COLOR_MEASURE_ID = 'ColorMeasure';
class CustomItem extends data_dashboard_item_1.DataDashboardItem {
    constructor(_meta, modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer, CustomItem._getInfo(_meta, modelJson['@CustomItemType']));
        this._meta = _meta;
        this.sliceTables = ko.observableArray();
        this.interactivityTargets = ko.observableArray();
        this.coloringDimensions = ko.observableArray();
        this.coloringMeasures = ko.observableArray();
        this.customMetadata = {};
        this._getMeasureValue = (dataRow, dataItemUniqueName) => {
            return this._getStorage().getValue(dataRow, dataItemUniqueName);
        };
        this._getMeasureDisplayText = (dataRow, dataItemUniqueName) => {
            var value = this._getMeasureValue(dataRow, dataItemUniqueName);
            if (value === null || value === undefined) {
                return null;
            }
            var metaData = this._dataManager().getMetaData(), formatViewModel = metaData.getMeasureFormat(dataItemUniqueName);
            return this._format(value, formatViewModel);
        };
        this._getDimensionUniqueValue = (dataRow, dataItemUniqueName) => {
            return this._getStorage().getKeyValue(dataRow, dataItemUniqueName);
        };
        this._getDimensionValue = (dataRow, dataItemUniqueName) => {
            var value = this._getSpecialValue(dataRow, dataItemUniqueName, _item_data_axis_point_1.dataStorageSpecialIds.Value);
            if (value === null || value === undefined)
                value = this._getDimensionUniqueValue(dataRow, dataItemUniqueName);
            if (value === special_values_1.specialValues.nullValueGuid)
                value = null;
            return value;
        };
        this._getDimensionDisplayText = (dataRow, dataItemUniqueName) => {
            var displayText = this._getServerText(dataRow, dataItemUniqueName), uniqueValue = this._getDimensionUniqueValue(dataRow, dataItemUniqueName);
            if (uniqueValue === special_values_1.specialValues.olapNullValueGuid)
                return undefined;
            if (displayText == null) {
                var metaData = this._dataManager().getMetaData(), formatViewModel = metaData.getDimensionFormat(dataItemUniqueName);
                displayText = this._format(this._getDimensionValue(dataRow, dataItemUniqueName), formatViewModel);
            }
            return displayText;
        };
        this._isExcludingAllFilter = ko.computed(() => {
            if (this._isMasterFilter() && !!this.customInteractivity && !!this.customInteractivity.applyEmptyFilter) {
                var selectionValues = this._selectionValues();
                return !selectionValues || selectionValues.length === 0;
            }
            return false;
        });
        var modelCustomMetadata = modelJson.CustomMetadata || {};
        this.customBindings.forEach((binding) => {
            let linkPropertyName = CustomItem._getBindingLinkName(binding.propertyName);
            if (binding.array) {
                this[linkPropertyName] = analytics_utils_1.deserializeArray(modelCustomMetadata[binding.propertyName], (item) => new data_item_1.DataItemLink(this, item, serializer));
                this[binding.propertyName] = ko.observableArray([]);
                this._subscribeDataItemLinkArrays({ propertyName: linkPropertyName, modelName: binding.propertyName });
                _knockout_utils_1.subscribeArrayChange(this[linkPropertyName], {
                    added: item => item.itemType(binding.dataItemType)
                });
            }
            else {
                this[binding.propertyName] = ko.observable();
                this._attachDataItem(this, linkPropertyName, new data_item_1.DataItemLink(this, modelCustomMetadata[binding.propertyName], serializer));
            }
            this.customMetadata[linkPropertyName] = this[linkPropertyName];
        });
        this.legacyCustomProperties.forEach(p => {
            this.customMetadata[p.propertyName] = this[p.propertyName] = ko.pureComputed({
                read: () => this.customProperties[p.propertyName](),
                write: (value) => this.customProperties.setValue(p.propertyName, value),
            });
        });
        ko.computed(() => {
            var sliceTables = [];
            var interactivityTargets = [];
            var coloringDimensions = [];
            var coloringMeasures = [];
            this.customBindings.forEach(binding => {
                var prop = this[CustomItem._getBindingLinkName(binding.propertyName)];
                var bindings = (binding.array ? prop() : [prop]).filter(link => !!link.dataItem());
                var sliceTable = sliceTables.filter(sliceTable => sliceTable.name() === binding.slice)[0];
                if (!sliceTable) {
                    sliceTable = new slice_table_1.SliceTable(this, { '@ItemType': 'SliceTable', '@Name': binding.slice });
                    sliceTables.push(sliceTable);
                }
                sliceTable.push(bindings, binding.dataItemType);
                if (binding.enableInteractivity) {
                    interactivityTargets = interactivityTargets.concat(bindings);
                }
                if (binding.enableColoring) {
                    if (binding.dataItemType === 'Dimension') {
                        bindings.forEach(link => data_dashboard_item_1.DataDashboardItem._addColoringMeta([link]));
                        if (binding.array) {
                            prop.subscribe(links => data_dashboard_item_1.DataDashboardItem._addColoringMeta(links));
                        }
                        coloringDimensions = coloringDimensions.concat(bindings);
                    }
                    if (binding.dataItemType === 'Measure') {
                        coloringMeasures = coloringMeasures.concat(bindings);
                    }
                }
            });
            this.sliceTables(sliceTables);
            this.interactivityTargets(interactivityTargets);
            this.coloringDimensions(coloringDimensions);
            this.coloringMeasures(coloringMeasures);
        });
        if (!this.customBindings.length) {
            this._supportedUIStates(['error']);
        }
    }
    static getPropertyInfo(p) {
        return _jquery_helpers_1.deepExtend({ modelName: '@' + p.propertyName, category: _base_metadata_1.PropertyCategory.ViewModel }, p);
    }
    static _getBindingLinkName(propertyName) {
        return '__' + propertyName;
    }
    static _getSerializationsInfo(bindings) {
        return (bindings || []).map(binding => {
            return {
                propertyName: CustomItem._getBindingLinkName(binding.propertyName),
                modelName: binding.propertyName,
                array: binding.array,
                info: !binding.array ? _data_item_1.dataItemLinkSerializationsInfo : undefined
            };
        });
    }
    static _hasInteractivityTargets(meta) {
        var bindings = (meta && meta['bindings']) || [];
        return bindings.some(binding => binding.enableInteractivity);
    }
    static _hasColoringDimensions(bindings) {
        return bindings.some(binding => binding.enableColoring && binding.dataItemType === 'Dimension');
    }
    static _hasColoringMeasures(bindings) {
        return bindings.some(binding => binding.enableColoring && binding.dataItemType === 'Measure');
    }
    static _isFilterAllowed(meta) {
        var interactivity = !!meta && meta['interactivity'];
        return !!interactivity && interactivity.filter && CustomItem._hasInteractivityTargets(meta);
    }
    static _isDrillDownAllowed(meta) {
        var interactivity = !!meta && meta['interactivity'];
        return !!interactivity && interactivity.drillDown && CustomItem._hasInteractivityTargets(meta);
    }
    static _getInfo(meta, customItemType) {
        if (!meta) {
            const staticCustomPropertiesInfo = CustomItem._getCustomPropertiesSerializationInfo(customItemType, []);
            return _custom_item_1.customDashboardItemSerializationsInfo.concat([staticCustomPropertiesInfo]);
        }
        const dynamicInfo = [];
        const bindings = (meta && meta.bindings) || [];
        const isFilterAllowed = CustomItem._isFilterAllowed(meta);
        const isDrillDownAllowed = CustomItem._isDrillDownAllowed(meta);
        const bindingsInfo = CustomItem._getSerializationsInfo(bindings);
        const propertiesMetadata = ((meta && meta.properties) || [])
            .map(p => ({
            ownerType: CustomItem,
            customItemType: customItemType,
            propertyName: p.propertyName,
            defaultValue: p.defaultVal,
        }))
            .concat((meta && meta.customProperties))
            .filter(cp => !!cp);
        const customProperties = CustomItem._getCustomPropertiesSerializationInfo(customItemType, propertiesMetadata);
        if (isFilterAllowed && isDrillDownAllowed) {
            dynamicInfo.push(interactivity_options_1._dashboardItemInteractivityOptionsMeta);
        }
        else if (isFilterAllowed) {
            dynamicInfo.push(interactivity_options_1._masterFilterInteractivityOptionsMeta);
        }
        else if (isDrillDownAllowed) {
            dynamicInfo.push(interactivity_options_1._drillDownInteractivityOptionsMeta);
        }
        else {
            dynamicInfo.push(interactivity_options_1._baseInteractivityOptionsMeta);
        }
        var hasColoringDimensions = CustomItem._hasColoringDimensions(bindings);
        if (hasColoringDimensions) {
            dynamicInfo.push(_custom_item_1.coloringDimensions);
        }
        var hasColoringMeasures = CustomItem._hasColoringMeasures(bindings);
        if (hasColoringMeasures) {
            dynamicInfo.push(_custom_item_1.coloringMeasures);
        }
        if (hasColoringDimensions || hasColoringMeasures) {
            dynamicInfo.push(_coloring_options_1.coloringOptions);
        }
        return _custom_item_1.customDashboardItemSerializationsInfo
            .concat([{ propertyName: 'customMetadata', modelName: 'CustomMetadata', info: bindingsInfo }])
            .concat(dynamicInfo)
            .concat(customProperties);
    }
    _clearBindings() {
        super._clearBindings();
        this.customBindings.forEach(binding => {
            if (binding.array) {
                this[CustomItem._getBindingLinkName(binding.propertyName)].removeAll();
            }
        });
    }
    getBindingValue(propertyName, index) {
        var binding = ko.unwrap(this[CustomItem._getBindingLinkName(propertyName)]);
        var bindingValues = undefined;
        var wrapBindingValue = (binding) => {
            return !binding.dataItem() ? undefined : {
                displayName: () => this._getDataItemDisplayName(binding.dataItem()),
                uniqueName: () => binding.uniqueName()
            };
        };
        if (Array.isArray(binding)) {
            bindingValues = index != undefined ? [wrapBindingValue(binding[index])] : binding.map(b => wrapBindingValue(b));
        }
        else {
            bindingValues = [wrapBindingValue(binding)];
        }
        return bindingValues.filter(b => b !== undefined);
    }
    iterateData(action, sliceTableName = null) {
        var slice = this.getSlice(sliceTableName);
        if (!slice)
            return;
        var keyIds = slice.getKeyIds() || [], valueIds = slice.getValueIds() || [], processDataRow = (dataRow, propertyName, measureAction, dimensionAction) => {
            var binding = this.customBindings.filter(b => b.propertyName === propertyName)[0], result = [];
            if (!!binding) {
                let property = this[CustomItem._getBindingLinkName(propertyName)];
                (binding.array ? property() : [property]).forEach(item => {
                    var uniqueName = item.uniqueName();
                    if (keyIds.indexOf(uniqueName) != -1)
                        result.push(dimensionAction(dataRow, uniqueName));
                    if (valueIds.indexOf(uniqueName) != -1)
                        result.push(measureAction(dataRow, uniqueName));
                });
            }
            return result;
        };
        slice.forEach(dataRow => {
            action({
                getColor: (measureBindingName) => {
                    if (!measureBindingName) {
                        return [this._getColor(dataRow, keyIds, COLOR_MEASURE_ID)];
                    }
                    else {
                        return processDataRow(dataRow, measureBindingName, (dataRow, uniqueName) => this._getColor(dataRow, keyIds, this._getColorMeasureId(uniqueName)), (dataRow, uniqueName) => this._getColor(dataRow, keyIds, COLOR_MEASURE_ID));
                    }
                },
                getDisplayText: (property) => {
                    return processDataRow(dataRow, property, this._getMeasureDisplayText, this._getDimensionDisplayText);
                },
                getValue: (property) => {
                    return processDataRow(dataRow, property, this._getMeasureValue, this._getDimensionValue);
                },
                getUniqueValue: (property) => {
                    return processDataRow(dataRow, property, this._getMeasureValue, this._getDimensionUniqueValue);
                }
            });
        });
    }
    _getDefaultItemType() {
        return CustomItem.ItemType;
    }
    _getSliceTable(name) {
        var sliceTables = this.sliceTables();
        if (!!name) {
            return sliceTables.filter(slice => slice.name() === name)[0];
        }
        else {
            return sliceTables.length > 0 ? sliceTables[0] : undefined;
        }
    }
    _getAllSelectionValues(activeDimensions) {
        var sliceTables = this.sliceTables().filter(slice => activeDimensions.every(id => slice.dimensions().map(dim => dim.uniqueName()).indexOf(id) !== -1)), values = [];
        if (sliceTables.length > 0) {
            var slice = this.getSlice(sliceTables[0].name());
            if (!!slice) {
                var keyIds = slice.getKeyIds().filter(id => activeDimensions.indexOf(id) !== -1);
                slice.forEach(dataRow => values.push(keyIds.map(id => slice.getKeyValue(dataRow.rowKey, id))));
            }
        }
        return values;
    }
    getSlice(sliceTableName = null) {
        var dimensions = this._getSliceTable(sliceTableName).dimensions();
        var storage = this._getStorage();
        return storage && storage.getSliceByIds && storage.getSliceByIds(this._getValidIds(dimensions));
    }
    _getStorage() {
        return this._dataManager() && this._dataManager().getDataStorage();
    }
    _getValidIds(dimensionLinks) {
        var excluded = [];
        if (this.isDrillDownAllowed() && this._isDrillDownEnabled() && this.interactivityTargets().every(d => dimensionLinks.filter(dd => d.uniqueName() === dd.uniqueName()).length > 0)) {
            excluded = this.interactivityTargets().slice(this._drillDownValues().length + 1);
        }
        return dimensionLinks.filter(d => excluded.filter(dd => d.uniqueName() === dd.uniqueName()).length == 0).map(d => d.uniqueName());
    }
    _getColor(dataRow, keyIds, colorMeasureId) {
        var coloredDimensionIds = this._coloredDimensions().map(dim => dim.uniqueName()).filter(id => keyIds.indexOf(id) != -1), sliceKey = [];
        if (coloredDimensionIds.length > 0) {
            var lastColored = coloredDimensionIds[coloredDimensionIds.length - 1];
            for (var i = 0; i < keyIds.length; i++) {
                var currentId = keyIds[i];
                sliceKey.push(currentId);
                if (currentId == lastColored)
                    break;
            }
        }
        var colorValue = this._getValueBySliceKey(dataRow, sliceKey, colorMeasureId);
        if (colorValue)
            return color_1.Color.toHex(colorValue);
        return null;
    }
    _getColorMeasureId(uniqueName) {
        if (this.coloringOptions && this._coloredByMeasures()) {
            let metaData = this._dataManager().getMetaData();
            let colorMeasureDescriptors = metaData.getColorMeasures().filter(mi => mi.dataItemId === uniqueName);
            if (colorMeasureDescriptors && colorMeasureDescriptors.length > 0)
                return colorMeasureDescriptors[0].id;
        }
        return COLOR_MEASURE_ID;
    }
    _format(value, formatViewModel) {
        return !!formatViewModel ? _formatter_1.format(value, formatViewModel) : value.toString();
    }
    _getServerText(dataRow, dataItemUniqueName) {
        return this._getSpecialValue(dataRow, dataItemUniqueName, _item_data_axis_point_1.dataStorageSpecialIds.DisplayText);
    }
    _getSpecialValue(dataRow, dataItemUniqueName, specialId) {
        return this._getValueBySliceKey(dataRow, [dataItemUniqueName], specialId);
    }
    _getValueBySliceKey(dataRow, sliceKey, valueId) {
        var storage = this._getStorage(), metaDataSliceKey = storage.getSliceKey(sliceKey);
        if (metaDataSliceKey < 0)
            return null;
        var metaDataRowKey = storage.findDataRowKey(metaDataSliceKey, dataRow);
        return storage.getValue(metaDataRowKey, valueId);
    }
    get customBindings() {
        return (this._meta && this._meta.bindings) || [];
    }
    get legacyCustomProperties() {
        return (this._meta && this._meta.properties) || [];
    }
    get customInteractivity() {
        return !!this._meta && this._meta.interactivity;
    }
    get _optionsPanelSections() {
        return !!this._meta && this._meta.optionsPanelSections;
    }
    _getMasterFilterMode() {
        return this.interactivityOptions instanceof interactivity_options_1.DashboardItemMasterFilterInteractivityOptions ? this.interactivityOptions.masterFilterMode() : 'None';
    }
    _getDrillDownEnabled() {
        return this.interactivityOptions instanceof interactivity_options_1.DashboardItemInteractivityOptions && this.interactivityOptions.isDrillDownEnabled();
    }
    _getIgnoreMasterFilter() { return !!this.interactivityOptions && this.interactivityOptions.ignoreMasterFilters(); }
    _getInteractivityDimensionLinks() { return this.interactivityTargets(); }
    _getIsVisualInteractivitySupported() { return this.isDrillDownAllowed() || this.isFilterAllowed(); }
    isDrillDownAllowed() {
        return CustomItem._isDrillDownAllowed(this._meta);
    }
    isFilterAllowed() {
        return CustomItem._isFilterAllowed(this._meta);
    }
    _isInteractivityAllowed() {
        return this.isDrillDownAllowed() || this.isFilterAllowed();
    }
    _getCanColorByMeasures() { return CustomItem._hasColoringMeasures(this.customBindings); }
    _getCanColorByDimensions() { return CustomItem._hasColoringDimensions(this.customBindings); }
    _getColorizableDataItemsInfo() {
        return this.customBindings.filter(binding => binding.enableColoring && binding.dataItemType === 'Dimension').map(binding => {
            var prop = this[CustomItem._getBindingLinkName(binding.propertyName)];
            return {
                items: binding.array ? prop() : [prop],
                prefixId: binding.displayName
            };
        });
    }
    _getDefaultCalculationWindowDefinition() {
        return new custom_item_calc_window_definition_1.CustomItemWindowDefinition();
    }
    getInfo() {
        return CustomItem._getInfo(this._meta, this.customItemType());
    }
    _getInfoCore() {
        return null;
    }
    static _getCustomPropertiesSerializationInfo(customItemType, dynamicCustomPropertiesMetadata) {
        const filterPredicate = cp => cp.ownerType === CustomItem && cp.customItemType === customItemType || CustomItem.prototype instanceof cp.ownerType;
        const filteredCustomProperties = custom_properties_metadata_1._customPropertiesMeta
            .filter(filterPredicate)
            .concat(dynamicCustomPropertiesMetadata);
        return _custom_properties_utils_1._getCustomPropertiesSerializationInfoCore(filteredCustomProperties);
    }
}
CustomItem.ItemType = 'CustomItem';
__decorate([
    _utils_1.collectionItemType('Dimension')
], CustomItem.prototype, "interactivityTargets", void 0);
__decorate([
    _utils_1.collectionItemType('Dimension')
], CustomItem.prototype, "coloringDimensions", void 0);
__decorate([
    _utils_1.collectionItemType('Measure')
], CustomItem.prototype, "coloringMeasures", void 0);
exports.CustomItem = CustomItem;
