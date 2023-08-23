﻿/**
* DevExpress Dashboard (_format-condition-average.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatConditionAverageSerializationsInfo = exports.averageType = void 0;
const _format_condition_style_base_1 = require("./_format-condition-style-base");
exports.averageType = {
    propertyName: 'averageType', modelName: '@AverageType', displayName: 'DashboardWebStringId.ConditionalFormatting.AverageType', defaultVal: 'Above', simpleFormAdapterItem: 'selectBoxEditor',
    values: {
        'Above': 'DashboardWebStringId.ConditionalFormatting.Above',
        'AboveOrEqual': 'DashboardWebStringId.ConditionalFormatting.AboveOrEqual',
        'Below': 'DashboardWebStringId.ConditionalFormatting.Below',
        'BelowOrEqual': 'DashboardWebStringId.ConditionalFormatting.BelowOrEqual'
    }
};
exports.formatConditionAverageSerializationsInfo = _format_condition_style_base_1.formatConditionStyleBaseSerializationsInfo.concat([exports.averageType]);
