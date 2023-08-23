﻿/**
* DevExpress Dashboard (kpi-element.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KpiElement = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const data_item_container_1 = require("../data-item-container");
const _kpi_element_1 = require("./metadata/_kpi-element");
class KpiElement extends data_item_container_1.DataItemContainer {
    constructor(dataItemProvider, modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this._displayNameSeparator = 'vs';
        dataItemProvider._attachDataItem(this, _kpi_element_1.kpiItemActualValue.propertyName);
        dataItemProvider._attachDataItem(this, _kpi_element_1.kpiItemTargetValue.propertyName);
    }
    _getDataId() {
        var dataItem = this.actualValue() || this.targetValue();
        return dataItem && dataItem.uniqueName() || null;
    }
    _getInfoCore() {
        return _kpi_element_1.kpiElementSerializationsInfo;
    }
    _getBindingModel() {
        return [
            {
                propertyName: _kpi_element_1.kpiItemActualValue.propertyName,
                dataItemType: 'Measure',
                emptyPlaceholder: 'DashboardStringId.ActualValueCaption'
            },
            {
                propertyName: _kpi_element_1.kpiItemTargetValue.propertyName,
                dataItemType: 'Measure',
                emptyPlaceholder: 'DashboardStringId.TargetValueCaption'
            }
        ];
    }
}
exports.KpiElement = KpiElement;
