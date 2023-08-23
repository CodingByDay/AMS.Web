﻿/**
* DevExpress Dashboard (_format-condition-top-bottom.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatConditionTopBottomSerializationsInfo = exports.topBottom = exports._actualRankType = exports.rank = void 0;
const _base_metadata_1 = require("../../../metadata/_base-metadata");
const _format_condition_style_base_1 = require("./_format-condition-style-base");
exports.rank = { propertyName: 'rank', modelName: '@Rank', displayName: 'DashboardStringId.SummaryTypeCount', defaultVal: 5, simpleFormAdapterItem: 'numberBoxEditor', from: _base_metadata_1.floatFromModel, editorOptions: { min: 1 }, validationRules: [_base_metadata_1.integerValidationRule] };
let rankType = { propertyName: 'rankType', modelName: '@RankType', defaultVal: 'Automatic' };
exports._actualRankType = { propertyName: '_actualRankType', displayName: 'DashboardWebStringId.Calculations.RankType', simpleFormAdapterItem: 'buttonGroupEditor', values: {
        'Number': 'DashboardStringId.FormatConditionNumberValueType',
        'Percent': 'DashboardStringId.FormatConditionPercentValueType'
    }
};
exports.topBottom = {
    propertyName: 'topBottom', modelName: '@TopBottomType', displayName: 'DashboardWebStringId.TopNMode', defaultVal: 'Top', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Top': 'DashboardStringId.CommandFormatRuleTopN',
        'Bottom': 'DashboardStringId.CommandFormatRuleBottomN'
    }
};
exports.formatConditionTopBottomSerializationsInfo = _format_condition_style_base_1.formatConditionStyleBaseSerializationsInfo.concat([exports.rank, rankType, exports.topBottom]);
