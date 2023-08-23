﻿/**
* DevExpress Dashboard (_format-condition-bar.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatConditionBarSerializationsInfo = exports.barCurrentStyleSettings = exports.barCurrentStyleSettingsType = exports.barNegativeStyleSettings = void 0;
const _format_rules_common_1 = require("../../metadata/_format-rules-common");
const bar_style_settings_1 = require("../../style-settings/bar-style-settings");
const _format_condition_min_max_base_1 = require("./_format-condition-min-max-base");
exports.barNegativeStyleSettings = { propertyName: 'negativeStyleSettings', modelName: 'NegativeStyleSettings', displayName: 'DashboardStringId.FormatRuleNegativeStyle' };
exports.barCurrentStyleSettingsType = {
    propertyName: 'currentStyleSettingsType', displayName: 'DashboardWebStringId.ConditionalFormatting.StyleSettingsType', defaultVal: 'Positive', simpleFormAdapterItem: 'buttonGroupEditor', values: {
        'Positive': 'DashboardWebStringId.ConditionalFormatting.Positive',
        'Negative': 'DashboardWebStringId.ConditionalFormatting.Negative'
    }
};
exports.barCurrentStyleSettings = { propertyName: 'currentStyleSettings', type: bar_style_settings_1.BarStyleSettings };
exports.formatConditionBarSerializationsInfo = _format_condition_min_max_base_1.formatConditionMinMaxBaseSerializationsInfo.concat([exports.barNegativeStyleSettings, _format_rules_common_1.barOptions]);
