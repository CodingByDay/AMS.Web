﻿/**
* DevExpress Dashboard (_parameter.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardParameterSerializationsInfo = exports.selectAllValues = exports.defaultValues = exports.lookUpSourceType = exports.parameterTypePropertyGrid = exports.parameterTypeSerialization = exports.defaultValue = exports.parameterName = exports.allowNull = exports.allowMultiselect = exports.description = exports.parameterVisible = void 0;
const analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
const _base_metadata_1 = require("../../metadata/_base-metadata");
const dynamic_list_lookup_settings_1 = require("../dynamic-list-lookup-settings");
const static_list_lookup_settings_1 = require("../static-list-lookup-settings");
const _parameters_helper_1 = require("../_parameters-helper");
exports.parameterVisible = { propertyName: 'parameterVisible', modelName: '@Visible', displayName: 'DevExpress.DashboardCommon.DashboardParameter.Visible', defaultVal: true, simpleFormAdapterItem: 'checkBoxEditor', from: _base_metadata_1.parseBool };
exports.description = { propertyName: 'description', modelName: '@Description', displayName: 'DevExpress.DashboardCommon.DashboardParameter.Description', defaultVal: '', simpleFormAdapterItem: 'textBoxEditor' };
exports.allowMultiselect = { propertyName: 'allowMultiselect', modelName: '@AllowMultiselect', displayName: 'DevExpress.DashboardCommon.DashboardParameter.AllowMultiselect', defaultVal: false, simpleFormAdapterItem: 'checkBoxEditor', from: _base_metadata_1.parseBool };
exports.allowNull = { propertyName: 'allowNull', modelName: '@AllowNull', displayName: 'DevExpress.DashboardCommon.DashboardParameter.AllowNull', defaultVal: false, simpleFormAdapterItem: 'checkBoxEditor', from: _base_metadata_1.parseBool };
exports.parameterName = { propertyName: 'name', modelName: '@Name', displayName: 'DashboardWebStringId.DataSources.CalculatedField.Name', defaultVal: '', simpleFormAdapterItem: 'textBoxEditor', validationRules: analytics_internal_1.nameValidationRules };
exports.defaultValue = { propertyName: 'defaultValue', modelName: '@Value', displayName: 'DashboardWebStringId.Parameters.DefaultValue' };
exports.parameterTypeSerialization = { propertyName: '_type', modelName: '@Type', defaultVal: 'System.String' };
exports.parameterTypePropertyGrid = { propertyName: 'type', displayName: 'DashboardWebStringId.FilterItem.Type', simpleFormAdapterItem: 'selectBoxEditor', valuesArray: (_parameters_helper_1.ParameterHelper.typeValues) };
exports.lookUpSourceType = {
    propertyName: 'lookUpSourceType', displayName: 'DashboardWebStringId.Parameters.LookUpSettingsType', values: {
        'None': 'DashboardWebStringId.Parameters.LookUpSettingsType.NoLookUp',
        'StaticListLookUpSettings': 'DashboardWebStringId.Parameters.LookUpSettingsType.StaticList',
        'DynamicListLookUpSettings': 'DashboardWebStringId.Parameters.LookUpSettingsType.DynamicList'
    }
};
exports.defaultValues = { propertyName: 'defaultValues', modelName: 'Values', array: true, displayName: 'DashboardWebStringId.Parameters.DefaultValue' };
exports.selectAllValues = { propertyName: 'selectAllValues', modelName: '@SelectAllValues', displayName: 'DevExpress.DashboardCommon.DashboardParameter.SelectAllValues', defaultVal: false, simpleFormAdapterItem: 'checkBoxEditor', from: _base_metadata_1.parseBool };
exports.dashboardParameterSerializationsInfo = [_base_metadata_1.itemType, exports.parameterName, exports.description, exports.parameterVisible, exports.allowNull, exports.allowMultiselect, exports.parameterTypeSerialization, exports.parameterTypePropertyGrid, exports.defaultValue, exports.selectAllValues, exports.lookUpSourceType, static_list_lookup_settings_1._staticListLookUpSettingsSerializationInfo, dynamic_list_lookup_settings_1._dynamicListLookUpSettingsSerializationInfo, exports.defaultValues];
