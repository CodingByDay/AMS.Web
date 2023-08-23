﻿/**
* DevExpress Dashboard (_chart-item-style-settings-provider.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartItemStyleSettingsProvider = void 0;
const _appearance_settings_provider_1 = require("./_appearance-settings-provider");
const _style_settings_provider_1 = require("./_style-settings-provider");
class ChartItemStyleSettingsProvider {
    initialize(cfModel) {
        if (cfModel)
            this.cfModel = cfModel;
    }
    getDefaultBackColor() {
        return _appearance_settings_provider_1.appearanceSettingsProvider.getDefaultColorizationColor();
    }
    getBackColor(styleSettingsInfo) {
        let styleIndexes = styleSettingsInfo ? styleSettingsInfo.styleIndexes : undefined, styleSettingsModel;
        if (styleIndexes && styleIndexes.length > 0) {
            let resultIndex = styleIndexes[styleIndexes.length - 1];
            styleSettingsModel = this.cfModel.FormatConditionStyleSettings[resultIndex];
            return this.getBackColorFromStyleSettingsModel(styleSettingsModel);
        }
    }
    getBackColorFromStyleSettingsModel(styleSettingsModel) {
        if (styleSettingsModel.RangeIndex) {
            let condition = this.cfModel.RuleModels[styleSettingsModel.RuleIndex].ConditionModel;
            styleSettingsModel = _style_settings_provider_1.styleSettingsProvider._getRangeBackColorStyleSettings(styleSettingsModel, condition);
        }
        return _appearance_settings_provider_1.appearanceSettingsProvider.getColor(styleSettingsModel);
    }
}
exports.ChartItemStyleSettingsProvider = ChartItemStyleSettingsProvider;
