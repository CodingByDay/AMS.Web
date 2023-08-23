﻿/**
* DevExpress Dashboard (_dynamic-list-lookup-settings.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamicListLookUpSettingsSerializationsInfo = exports._dataSourceNameSerialization = exports._dataMemberSerialization = exports.sortOrder = exports.sortByMember = exports.displayMemberSerialization = exports.valueMemberSerialization = exports.dataMemberSerialization = exports.dataSourceNameSerialization = void 0;
exports.dataSourceNameSerialization = { propertyName: 'dataSource', modelName: '@DataSourceName', defaultVal: null };
exports.dataMemberSerialization = { propertyName: 'dataMember', modelName: '@DataMember', defaultVal: null };
exports.valueMemberSerialization = { propertyName: 'valueMemberName', modelName: '@ValueMember', displayName: 'DevExpress.DashboardCommon.DynamicListLookUpSettings.ValueMember', defaultVal: null };
exports.displayMemberSerialization = { propertyName: 'displayMemberName', modelName: '@DisplayMember', displayName: 'DevExpress.DashboardCommon.DynamicListLookUpSettings.DisplayMember', defaultVal: null };
exports.sortByMember = { propertyName: 'sortByMember', modelName: '@SortByMember', displayName: 'DashboardWebStringId.Parameters.SortByMember', defaultVal: null };
exports.sortOrder = {
    propertyName: 'sortOrder', modelName: '@SortOrder', displayName: 'DevExpress.DashboardCommon.DynamicListLookUpSettings.SortOrder', defaultVal: 'Ascending', simpleFormAdapterItem: 'listEditor',
    values: {
        'Ascending': 'DevExpress.DashboardCommon.DimensionSortOrder.Ascending',
        'Descending': 'DevExpress.DashboardCommon.DimensionSortOrder.Descending',
        'None': 'DevExpress.DashboardCommon.DimensionSortOrder.None'
    }
};
exports._dataMemberSerialization = { propertyName: '_dataMember', displayName: 'DevExpress.DashboardCommon.DynamicListLookUpSettings.DataMember' };
exports._dataSourceNameSerialization = { propertyName: '_dataSource', displayName: 'DevExpress.DashboardCommon.DynamicListLookUpSettings.DataSource' };
exports.dynamicListLookUpSettingsSerializationsInfo = [exports._dataSourceNameSerialization, exports.dataSourceNameSerialization, exports._dataMemberSerialization, exports.dataMemberSerialization, exports.valueMemberSerialization, exports.displayMemberSerialization, exports.sortByMember, exports.sortOrder];
