﻿/**
* DevExpress Dashboard (format-condition-range-base.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatConditionRangeBase = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const _format_rules_common_1 = require("../../metadata/_format-rules-common");
const appearance_settings_1 = require("../../style-settings/appearance-settings");
const format_condition_base_1 = require("../format-condition-base");
const _format_condition_range_base_1 = require("./metadata/_format-condition-range-base");
class FormatConditionRangeBase extends format_condition_base_1.FormatConditionBase {
    constructor(modelJson, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.getSpecificType = () => this.getActualPredefinedType();
        this.setSpecificType = specificType => this.setActualPredefinedType(specificType);
    }
    get actualStyles() {
        var ranges = this._getSortedRanges();
        return ranges.map((range, index) => {
            var style = range.styleSettings();
            if (!style) {
                style = this._getRangeIndexSettings(index);
            }
            return style;
        });
    }
    get stopStyles() {
        return this._getSortedRanges().filter(range => !!range.styleSettings()).map(range => range.styleSettings());
    }
    getInfo() {
        return _format_condition_range_base_1.formatConditionRangeBaseSerializationsInfo;
    }
    isValid() {
        return super.isValid();
    }
    isRange() {
        return true;
    }
    setValues(values) {
        if (values.length > this.rangeSet.ranges().length)
            throw new Error('The number of values exceeds the number of ranges.');
        var index = 0;
        const valueType = this.valueType() === 'Percent' ? 'System.Double' : _format_rules_common_1.fieldTypes[this.dataType()];
        values.forEach(value => this.rangeSet.ranges()[index++].value.setValue(value, valueType));
    }
    createStyleSettings(styleListItem) {
        return new appearance_settings_1.AppearanceSettings({ '@AppearanceType': styleListItem });
    }
    _getSortedRanges() {
        return this.rangeSet.ranges();
    }
    _getRangeIndexSettings(index) {
        return null;
    }
}
exports.FormatConditionRangeBase = FormatConditionRangeBase;
