﻿/**
* DevExpress Dashboard (_appearance-settings.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appearanceSettingsSerializationsInfo = exports.foreColor = exports.backColor = exports.fontFamily = exports.fontStyle = exports.appearanceType = void 0;
const color_1 = require("../../../color");
const _style_settings_base_1 = require("./_style-settings-base");
exports.appearanceType = {
    propertyName: 'appearanceType', modelName: '@AppearanceType', displayName: 'DashboardWebStringId.ConditionalFormatting.AppearanceType', defaultVal: _style_settings_base_1.emptyStyleType, simpleFormAdapterItem: 'selectBoxEditor',
    values: {
        'None': 'DashboardStringId.FormatConditionAppearanceNone',
        'Custom': 'DashboardStringId.FormatConditionAppearanceCustom',
        'PaleRed': 'DashboardStringId.FormatConditionAppearancePaleRed',
        'PaleYellow': 'DashboardStringId.FormatConditionAppearancePaleYellow',
        'PaleGreen': 'DashboardStringId.FormatConditionAppearancePaleGreen',
        'PaleBlue': 'DashboardStringId.FormatConditionAppearancePaleBlue',
        'PalePurple': 'DashboardStringId.FormatConditionAppearancePalePurple',
        'PaleCyan': 'DashboardStringId.FormatConditionAppearancePaleCyan',
        'PaleOrange': 'DashboardStringId.FormatConditionAppearancePaleOrange',
        'PaleGray': 'DashboardStringId.FormatConditionAppearancePaleGray',
        'Red': 'DashboardStringId.FormatConditionAppearanceRed',
        'Yellow': 'DashboardStringId.FormatConditionAppearanceYellow',
        'Green': 'DashboardStringId.FormatConditionAppearanceGreen',
        'Blue': 'DashboardStringId.FormatConditionAppearanceBlue',
        'Purple': 'DashboardStringId.FormatConditionAppearancePurple',
        'Cyan': 'DashboardStringId.FormatConditionAppearanceCyan',
        'Orange': 'DashboardStringId.FormatConditionAppearanceOrange',
        'Gray': 'DashboardStringId.FormatConditionAppearanceGray',
        'GradientRed': 'DashboardStringId.FormatConditionAppearanceGradientRed',
        'GradientYellow': 'DashboardStringId.FormatConditionAppearanceGradientYellow',
        'GradientGreen': 'DashboardStringId.FormatConditionAppearanceGradientGreen',
        'GradientBlue': 'DashboardStringId.FormatConditionAppearanceGradientBlue',
        'GradientPurple': 'DashboardStringId.FormatConditionAppearanceGradientPurple',
        'GradientCyan': 'DashboardStringId.FormatConditionAppearanceGradientCyan',
        'GradientOrange': 'DashboardStringId.FormatConditionAppearanceGradientOrange',
        'GradientTransparent': 'DashboardStringId.FormatConditionAppearanceGradientTransparent',
        'FontBold': 'DashboardStringId.FormatConditionAppearanceFontBold',
        'FontItalic': 'DashboardStringId.FormatConditionAppearanceFontItalic',
        'FontUnderline': 'DashboardStringId.FormatConditionAppearanceFontUnderline',
        'FontGrayed': 'DashboardStringId.FormatConditionAppearanceFontGrayed',
        'FontRed': 'DashboardStringId.FormatConditionAppearanceFontRed',
        'FontYellow': 'DashboardStringId.FormatConditionAppearanceFontYellow',
        'FontGreen': 'DashboardStringId.FormatConditionAppearanceFontGreen',
        'FontBlue': 'DashboardStringId.FormatConditionAppearanceFontBlue'
    }
};
exports.fontStyle = {
    propertyName: 'fontStyle', modelName: '@FontStyle', displayName: 'DashboardWebStringId.ConditionalFormatting.FontStyle', defaultVal: null, simpleFormAdapterItem: 'selectBoxEditor',
    values: {
        'Regular': 'DashboardWebStringId.ConditionalFormatting.FontRegular',
        'Bold': 'DashboardStringId.FormatConditionAppearanceFontBold',
        'Italic': 'DashboardStringId.FormatConditionAppearanceFontItalic',
        'Underline': 'DashboardStringId.FormatConditionAppearanceFontUnderline',
        'Strikeout': 'DashboardStringId.FormatConditionAppearanceFontStrikeout'
    }
};
exports.fontFamily = { propertyName: 'fontFamily', modelName: '@FontFamily', displayName: 'DashboardWebStringId.ConditionalFormatting.FontFamily', defaultVal: 'Segoe UI', simpleFormAdapterItem: 'textBoxEditor' };
exports.backColor = { propertyName: 'backColor', modelName: '@BackColor', displayName: 'DashboardWebStringId.ConditionalFormatting.Appearance.BackColor', defaultVal: null, from: color_1.Color._colorFromModel, toJsonObject: color_1.Color._colorToModel, simpleFormAdapterItem: 'numberBoxEditor' };
exports.foreColor = { propertyName: 'foreColor', modelName: '@ForeColor', displayName: 'DashboardWebStringId.ConditionalFormatting.Appearance.ForeColor', defaultVal: null, from: color_1.Color._colorFromModel, toJsonObject: color_1.Color._colorToModel, simpleFormAdapterItem: 'numberBoxEditor' };
exports.appearanceSettingsSerializationsInfo = _style_settings_base_1.styleSettingsBaseSerializationsInfo.concat([exports.appearanceType, exports.backColor, exports.foreColor, exports.fontFamily, exports.fontStyle]);
