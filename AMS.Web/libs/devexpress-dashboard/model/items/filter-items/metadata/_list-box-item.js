﻿/**
* DevExpress Dashboard (_list-box-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listBoxDashboardItemSerializationsInfo = exports.listBoxType = void 0;
const _filter_element_item_base_1 = require("./_filter-element-item-base");
exports.listBoxType = {
    propertyName: 'listBoxType', modelName: '@ListBoxType', displayName: 'DashboardWebStringId.FilterItem.Type', defaultVal: 'Checked', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Checked': 'DashboardWebStringId.FilterItem.Type.Checked',
        'Radio': 'DashboardWebStringId.FilterItem.Type.Radio'
    }
};
exports.listBoxDashboardItemSerializationsInfo = _filter_element_item_base_1.filterElementItemBaseSerializationInfo.concat([exports.listBoxType, _filter_element_item_base_1.showAllValue]);
