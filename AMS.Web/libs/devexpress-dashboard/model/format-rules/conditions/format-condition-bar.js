﻿/**
* DevExpress Dashboard (format-condition-bar.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatConditionBar = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const _format_rules_common_1 = require("../metadata/_format-rules-common");
const bar_style_settings_1 = require("../style-settings/bar-style-settings");
const format_condition_min_max_base_1 = require("./format-condition-min-max-base");
const _format_condition_bar_1 = require("./metadata/_format-condition-bar");
class FormatConditionBar extends format_condition_min_max_base_1.FormatConditionMinMaxBase {
    constructor(modelJson, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.currentStyleSettingsType = ko.observable('Positive');
        this.getSpecificType = () => null;
        this.setSpecificType = (type) => { };
        this.negativeStyleSettings(new bar_style_settings_1.BarStyleSettings(modelJson && modelJson[_format_condition_bar_1.barNegativeStyleSettings.modelName] || {}));
        if (modelJson) {
            delete modelJson[_format_condition_bar_1.barNegativeStyleSettings.modelName];
        }
        this.currentStyleSettings = ko.computed({
            read: () => this.currentStyleSettingsType() == 'Positive' ? this.styleSettings() : this.negativeStyleSettings(),
            write: value => this.currentStyleSettingsType() == 'Positive' ? this.styleSettings(value) : this.negativeStyleSettings(value)
        });
    }
    get _isApplyToRowColumnRestricted() { return true; }
    _getInfoButStyleSettings() {
        return _format_condition_bar_1.formatConditionBarSerializationsInfo;
    }
    _getStyleSettingsInfo() {
        return Object.assign(Object.assign({}, _format_rules_common_1.styleSettings), { modelName: 'StyleSettings', type: bar_style_settings_1.BarStyleSettings });
    }
    _getDefaultStyleSettingsType() {
        return 'BarStyleSettings';
    }
    init() {
        super.init();
        if (this.negativeStyleSettings()) {
            this.negativeStyleSettings().init();
        }
        this.isEmpty(false);
    }
}
exports.FormatConditionBar = FormatConditionBar;
