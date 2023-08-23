﻿/**
* DevExpress Dashboard (format-condition-range-color-bar.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatConditionColorRangeBar = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const bar_style_settings_1 = require("../../style-settings/bar-style-settings");
const format_condition_range_set_1 = require("./format-condition-range-set");
const _format_condition_range_color_bar_1 = require("./metadata/_format-condition-range-color-bar");
const range_generator_1 = require("./range-generator");
class FormatConditionColorRangeBar extends format_condition_range_set_1.FormatConditionRangeSet {
    constructor(modelJson, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    get _isApplyToRowColumnRestricted() { return true; }
    getInfo() {
        return _format_condition_range_color_bar_1.formatConditionColorRangeBarSerializationsInfo;
    }
    getActualPredefinedType() {
        return range_generator_1.FormatConditionRangeGenerator.getPredefinedType(this.actualStyles, type => {
            var c = new FormatConditionColorRangeBar();
            range_generator_1.FormatConditionRangeGenerator.generateRangeSet(c, type);
            return c;
        });
    }
    setActualPredefinedType(type) {
        super.setActualPredefinedType(type);
    }
    createStyleSettings(styleListItem) {
        return new bar_style_settings_1.BarStyleSettings({ '@PredefinedColor': styleListItem });
    }
}
exports.FormatConditionColorRangeBar = FormatConditionColorRangeBar;
