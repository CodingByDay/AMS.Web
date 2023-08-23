﻿/**
* DevExpress Dashboard (_style-settings-utils.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styleSettingsTypes = exports.styleSettingsTypesMap = void 0;
const appearance_settings_1 = require("../style-settings/appearance-settings");
const bar_style_settings_1 = require("../style-settings/bar-style-settings");
const color_style_settings_1 = require("../style-settings/color-style-settings");
const icon_settings_1 = require("../style-settings/icon-settings");
exports.styleSettingsTypesMap = {
    'AppearanceSettings': appearance_settings_1.AppearanceSettings,
    'IconSettings': icon_settings_1.IconSettings,
    'BarStyleSettings': bar_style_settings_1.BarStyleSettings,
    'ColorStyleSettings': color_style_settings_1.ColorStyleSettings,
};
exports.styleSettingsTypes = Object.keys(exports.styleSettingsTypesMap);
