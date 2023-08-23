﻿/**
* DevExpress Dashboard (format-condition-range-gradient.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatConditionRangeGradient = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const appearance_settings_1 = require("../../style-settings/appearance-settings");
const range_index_settings_1 = require("../../style-settings/range-index-settings");
const format_condition_range_base_1 = require("./format-condition-range-base");
const _format_condition_range_gradient_1 = require("./metadata/_format-condition-range-gradient");
const range_generator_1 = require("./range-generator");
const range_info_1 = require("./range-info");
class FormatConditionRangeGradient extends format_condition_range_base_1.FormatConditionRangeBase {
    constructor(modelJson, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.getSpecificType = () => this.getActualPredefinedType();
        this.setSpecificType = (specificType) => this.setActualPredefinedType(specificType);
        this.segmentNumber = ko.computed({
            read: () => this.rangeSet.ranges().length,
            write: (value) => {
                this._generateByDefault(value);
            }
        });
    }
    static isGradientStop(predefined, color) {
        return predefined == 'Custom' && !!color || predefined != 'None' && predefined.indexOf('Gradient') != -1;
    }
    isGradient() {
        return true;
    }
    getInfo() {
        return _format_condition_range_gradient_1.formatConditionRangeGradientSerializationsInfo;
    }
    getActualPredefinedType() {
        return range_generator_1.FormatConditionRangeGenerator.getGradientPredefinedType(this.actualStyles, (type) => {
            var c = new FormatConditionRangeGradient();
            range_generator_1.FormatConditionRangeGenerator.generateGradientByType(c, type, 10);
            return c;
        });
    }
    setActualPredefinedType(type) {
        range_generator_1.FormatConditionRangeGenerator.generateGradientByType(this, type, 10);
    }
    _generateByDefault(segmentNumber) {
        range_generator_1.FormatConditionRangeGenerator.generateGradientByStyles(this, this.stopStyles, segmentNumber);
    }
    generateAsPercent(startStyle, endStyle, segmentNumber) {
        if (segmentNumber >= this.stopStyles.length) {
            this.valueType('Percent');
            this._generate(startStyle, endStyle, segmentNumber);
            this.setValues(range_generator_1.FormatConditionRangeGenerator.calculateRangePercentValues(segmentNumber));
        }
    }
    generateAsNumber(startStyle, endStyle, values) {
        var segmentNumber = values.length;
        if (segmentNumber >= this.stopStyles.length) {
            this.valueType('Number');
            this._generate(startStyle, endStyle, segmentNumber);
            this.setValues(values);
        }
    }
    _getRangeIndexSettings(index) {
        return new range_index_settings_1.RangeIndexSettings(index);
    }
    _getSortedRanges() {
        var ranges = this.rangeSet.ranges();
        ranges.sort((a, b) => {
            var aValue = a.value.value(), bValue = b.value.value();
            var c = range_generator_1.FormatConditionRangeGenerator.compareValues(aValue, bValue, true);
            if (c != 0)
                return c;
            if (a.valueComparison() == b.valueComparison())
                return 0;
            if (a.valueComparison() == 'Greater')
                return 1;
            return -1;
        });
        return ranges;
    }
    _generate(startStyle, endStyle, rangeCount) {
        var ranges = [];
        for (var i = 0; i < rangeCount; i++) {
            ranges.push(new range_info_1.RangeInfo());
        }
        ranges[0].styleSettings(this._validateStyle(startStyle));
        ranges[ranges.length - 1].styleSettings(this._validateStyle(endStyle));
        this.rangeSet.ranges(ranges);
    }
    _isGradientStop(style) {
        if (style instanceof appearance_settings_1.AppearanceSettings) {
            return FormatConditionRangeGradient.isGradientStop(style.appearanceType(), style.backColor());
        }
        else {
            return false;
        }
    }
    _validateStyle(style) {
        if (!this._isGradientStop(style))
            throw new Error("Use colors with the 'Gradient' prefix from the FormatConditionAppearanceType enumeration to initialize the AppearanceSettings.appearanceType property or set the AppearanceSettings.appearanceType property to 'Custom' and specify the AppearanceSettings.backColor property.");
        return style;
    }
}
exports.FormatConditionRangeGradient = FormatConditionRangeGradient;
