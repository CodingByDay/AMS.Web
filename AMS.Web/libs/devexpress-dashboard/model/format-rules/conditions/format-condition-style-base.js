﻿/**
* DevExpress Dashboard (format-condition-style-base.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatConditionStyleBase = exports.currentStyleSettingsInfo = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const _format_rules_common_1 = require("../metadata/_format-rules-common");
const _style_settings_utils_1 = require("../style-settings/_style-settings-utils");
const format_condition_base_1 = require("./format-condition-base");
let currentStyleSettingsInfo = (styleSettingsType) => {
    return !styleSettingsType ? undefined : Object.assign(Object.assign({}, _format_rules_common_1.styleSettings), { modelName: styleSettingsType(), type: _style_settings_utils_1.styleSettingsTypesMap[styleSettingsType()] });
};
exports.currentStyleSettingsInfo = currentStyleSettingsInfo;
class FormatConditionStyleBase extends format_condition_base_1.FormatConditionBase {
    constructor(modelJson, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.styleSettings = ko.observable();
        this._styleSettingsType = ko.observable();
        this._styleSettingsType(_style_settings_utils_1.styleSettingsTypes.filter(mapItem => !!modelJson && modelJson[mapItem])[0] || this._getDefaultStyleSettingsType());
        let styleSettingsModelName = this._getStyleSettingsInfo().modelName;
        let styleSettingsJson = (modelJson || {})[styleSettingsModelName];
        this.styleSettings(new _style_settings_utils_1.styleSettingsTypesMap[this._styleSettingsType()](styleSettingsJson));
        delete this['_model'][styleSettingsModelName];
        this.styleSettings.subscribe(styleSettings => {
            this._styleSettingsType(_style_settings_utils_1.styleSettingsTypes.filter(mapItem => styleSettings instanceof _style_settings_utils_1.styleSettingsTypesMap[mapItem])[0]);
        });
    }
    getInfo() {
        let styleSettingsInfo = this._getStyleSettingsInfo();
        return this._getInfoButStyleSettings().concat(!styleSettingsInfo ? [] : [styleSettingsInfo]);
    }
    _getStyleSettingsInfo() {
        return exports.currentStyleSettingsInfo(this._styleSettingsType);
    }
    _getDefaultStyleSettingsType() {
        return 'AppearanceSettings';
    }
    getDefaultStyleSettingsType() {
        return this._getDefaultStyleSettingsType();
    }
    isValid() {
        return super.isValid();
    }
    init() {
        if (this.styleSettings()) {
            this.styleSettings().init();
        }
        this.isEmpty(false);
    }
}
exports.FormatConditionStyleBase = FormatConditionStyleBase;
