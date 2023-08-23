﻿/**
* DevExpress Dashboard (format-condition-range-gradient-bar.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatConditionGradientRangeBar = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const bar_style_settings_1 = require("../../style-settings/bar-style-settings");
const format_condition_range_gradient_1 = require("./format-condition-range-gradient");
const _format_condition_range_gradient_bar_1 = require("./metadata/_format-condition-range-gradient-bar");
const range_generator_1 = require("./range-generator");
class FormatConditionGradientRangeBar extends format_condition_range_gradient_1.FormatConditionRangeGradient {
    constructor(modelJson, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    get _isApplyToRowColumnRestricted() { return true; }
    getInfo() {
        return _format_condition_range_gradient_bar_1.formatConditionGradientRangeBarSerializationsInfo;
    }
    getActualPredefinedType() {
        return range_generator_1.FormatConditionRangeGenerator.getGradientPredefinedType(this.actualStyles, (type) => {
            var c = new FormatConditionGradientRangeBar();
            range_generator_1.FormatConditionRangeGenerator.generateGradientByType(c, type, 5, true);
            return c;
        });
    }
    setActualPredefinedType(type) {
        range_generator_1.FormatConditionRangeGenerator.generateGradientByType(this, type, 5, true);
    }
    _isGradientStop(style) {
        if (style instanceof bar_style_settings_1.BarStyleSettings) {
            return format_condition_range_gradient_1.FormatConditionRangeGradient.isGradientStop(style.predefinedColor(), style.color());
        }
        else {
            return false;
        }
    }
    _generateByDefault(segmentNumber) {
        range_generator_1.FormatConditionRangeGenerator.generateGradientByStyles(this, this.stopStyles, segmentNumber);
    }
}
exports.FormatConditionGradientRangeBar = FormatConditionGradientRangeBar;
