﻿/**
* DevExpress Dashboard (_color-style-settings.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorStyleSettingsSerializationsInfo = exports.color = exports.predefinedColor = void 0;
const color_1 = require("../../../color");
const _appearance_settings_1 = require("./_appearance-settings");
const _style_settings_base_1 = require("./_style-settings-base");
exports.predefinedColor = {
    propertyName: 'predefinedColor', modelName: '@PredefinedColor', displayName: 'DashboardStringId.FormatRulePredefinedColor', defaultVal: _appearance_settings_1.appearanceType.defaultVal, simpleFormAdapterItem: _appearance_settings_1.appearanceType.simpleFormAdapterItem, values: _appearance_settings_1.appearanceType.values
};
exports.color = { propertyName: 'color', modelName: '@Color', displayName: 'DashboardStringId.DescriptionItemColor', defaultVal: null, from: color_1.Color._colorFromModel, toJsonObject: color_1.Color._colorToModel, simpleFormAdapterItem: 'numberBoxEditor' };
exports.colorStyleSettingsSerializationsInfo = _style_settings_base_1.styleSettingsBaseSerializationsInfo.concat([exports.color, exports.predefinedColor]);
