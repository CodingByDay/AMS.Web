﻿/**
* DevExpress Dashboard (chorolpeth-map.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeltaMap = exports.ValueMap = exports.ChoroplethMap = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const data_item_container_1 = require("../data-item-container");
const _chorolpeth_map_1 = require("./metadata/_chorolpeth-map");
class ChoroplethMap extends data_item_container_1.DataItemContainer {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this._displayNameSeparator = 'vs';
    }
}
exports.ChoroplethMap = ChoroplethMap;
class ValueMap extends ChoroplethMap {
    constructor(dataItemProvider, modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        dataItemProvider._attachDataItem(this, _chorolpeth_map_1.chorolpethMapValue.propertyName);
    }
    _getInfoCore() {
        return _chorolpeth_map_1.valueMapSerializationsInfo;
    }
    _getDataId() {
        return this.value() && this.value().uniqueName() || null;
    }
    _getBindingModel() {
        return [
            {
                propertyName: _chorolpeth_map_1.chorolpethMapValue.propertyName,
                dataItemType: 'Measure',
                emptyPlaceholder: 'DashboardWebStringId.Binding.SetValue'
            }
        ];
    }
    _getDefaultItemType() { return 'ValueMap'; }
}
exports.ValueMap = ValueMap;
class DeltaMap extends ChoroplethMap {
    constructor(dataItemProvider, modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        dataItemProvider._attachDataItem(this, _chorolpeth_map_1.deltaMapActualValue.propertyName);
        dataItemProvider._attachDataItem(this, _chorolpeth_map_1.deltaMapTargetValue.propertyName);
    }
    _getInfoCore() {
        return _chorolpeth_map_1.deltaMapSerializationsInfo;
    }
    _getDataId() {
        var dataItem = this.actualValue() && this.targetValue();
        return dataItem && dataItem.uniqueName() || null;
    }
    _getBindingModel() {
        return [
            {
                propertyName: _chorolpeth_map_1.deltaMapActualValue.propertyName,
                dataItemType: 'Measure',
                emptyPlaceholder: 'DashboardStringId.ActualValueCaption'
            },
            {
                propertyName: _chorolpeth_map_1.deltaMapTargetValue.propertyName,
                dataItemType: 'Measure',
                emptyPlaceholder: 'DashboardStringId.TargetValueCaption'
            }
        ];
    }
    _getDefaultItemType() { return 'DeltaMap'; }
}
exports.DeltaMap = DeltaMap;
