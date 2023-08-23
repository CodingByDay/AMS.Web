﻿/**
* DevExpress Dashboard (_common.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlagsEnumTypeValues = exports.serializeFlagsEnumType = exports.parseFlagsEnumType = exports.contentType = exports.viewerActions = exports.DashboardDataIdField = void 0;
exports.DashboardDataIdField = '__DX_DASHBOARD_DATA_ID';
exports.viewerActions = {
    setMasterFilter: 'SetMasterFilter',
    setMultipleValuesMasterFilter: 'SetMultipleValuesMasterFilter',
    clearMasterFilter: 'ClearMasterFilter',
    drillDown: 'DrillDown',
    drillUp: 'DrillUp',
    setSelectedElementIndex: 'SetSelectedElementIndex',
    expandValue: 'ExpandValue',
    dataRequest: 'DataRequest',
    getDrillThroughData: 'GetDrillThroughData'
};
exports.contentType = {
    empty: 'Empty',
    viewModel: 'ViewModel',
    actionModel: 'ActionModel',
    completeDataSource: 'CompleteDataSource',
    partialDataSource: 'PartialDataSource',
    fullContent: 'FullContent'
};
var separator = ', ';
let parseFlagsEnumType = (typeModel, defaultValue, dic) => {
    var types = typeModel.split(separator);
    return Object.keys(dic).reduce((prev, curr) => {
        return prev | (types.indexOf(curr) >= 0 ? dic[curr] : 0);
    }, defaultValue);
};
exports.parseFlagsEnumType = parseFlagsEnumType;
let serializeFlagsEnumType = (val, defaultValue, dic) => {
    return Object.keys(dic).reduce((prev, curr) => {
        if (val & dic[curr]) {
            prev.push(curr);
        }
        return prev;
    }, []).join(separator) || defaultValue;
};
exports.serializeFlagsEnumType = serializeFlagsEnumType;
let getFlagsEnumTypeValues = (val, dic, type) => {
    var keys = [];
    Object.keys(dic).forEach(function (key) {
        if (dic[key] & val) {
            keys.push(type === 'value' ? dic[key] : key);
        }
    });
    return keys;
};
exports.getFlagsEnumTypeValues = getFlagsEnumTypeValues;
