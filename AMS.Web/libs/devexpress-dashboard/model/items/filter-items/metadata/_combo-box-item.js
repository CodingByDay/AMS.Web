﻿/**
* DevExpress Dashboard (_combo-box-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comboBoxDashboardItemSerializationsInfo = exports.comboBoxType = void 0;
const _filter_element_item_base_1 = require("./_filter-element-item-base");
exports.comboBoxType = {
    propertyName: 'comboBoxType', modelName: '@ComboBoxType', displayName: 'DashboardWebStringId.FilterItem.Type', defaultVal: 'Standard', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Standard': 'DashboardWebStringId.FilterItem.Type.Standard',
        'Checked': 'DashboardWebStringId.FilterItem.Type.Checked'
    }
};
exports.comboBoxDashboardItemSerializationsInfo = _filter_element_item_base_1.filterElementItemBaseSerializationInfo.concat([exports.comboBoxType, _filter_element_item_base_1.showAllValue]);
