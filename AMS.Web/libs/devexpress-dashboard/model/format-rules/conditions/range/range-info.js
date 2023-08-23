﻿/**
* DevExpress Dashboard (range-info.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangeInfo = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const serializable_model_1 = require("../../../serializable-model");
const _style_settings_utils_1 = require("../../style-settings/_style-settings-utils");
const format_condition_style_base_1 = require("../format-condition-style-base");
const _range_info_1 = require("./metadata/_range-info");
class RangeInfo extends serializable_model_1.TypedSerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.styleSettings = ko.observable();
        this._styleSettingsType = ko.observable();
        this._styleSettingsType(_style_settings_utils_1.styleSettingsTypes.filter(mapItem => !!modelJson && modelJson[mapItem])[0]);
        if (this._styleSettingsType()) {
            this.styleSettings(new _style_settings_utils_1.styleSettingsTypesMap[this._styleSettingsType()]((modelJson || {})[this._styleSettingsType()]));
            delete this['_model'][this._styleSettingsType()];
        }
        this.styleSettings.subscribe(styleSettings => {
            this._styleSettingsType(_style_settings_utils_1.styleSettingsTypes.filter(mapItem => styleSettings instanceof _style_settings_utils_1.styleSettingsTypesMap[mapItem])[0]);
        });
    }
    getInfo() {
        let styleSettingsInfo = format_condition_style_base_1.currentStyleSettingsInfo(this._styleSettingsType);
        if (!styleSettingsInfo || !styleSettingsInfo.modelName) {
            styleSettingsInfo = {
                propertyName: 'styleSettings',
                modelName: 'FakeSettingsForModelSubscriber',
                from: (json, serializer) => undefined,
                toJsonObject: (value, serializer, refs) => null
            };
        }
        return _range_info_1.rangeInfoSerializationsInfo.concat([styleSettingsInfo]);
    }
    clone() {
        var rangeInfo = new RangeInfo();
        rangeInfo.value.setValue(this.value.value(), this.value.type());
        rangeInfo.styleSettings(this.styleSettings().clone());
        return rangeInfo;
    }
    _getDefaultItemType() {
        return 'RangeInfo';
    }
}
exports.RangeInfo = RangeInfo;
