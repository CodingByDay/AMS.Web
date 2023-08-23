﻿/**
* DevExpress Dashboard (range-generator.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatConditionRangeGenerator = void 0;
const color_1 = require("../../../color");
const _helper_classes_1 = require("../../../internal/_helper-classes");
const _format_rules_common_1 = require("../../metadata/_format-rules-common");
const appearance_settings_1 = require("../../style-settings/appearance-settings");
const bar_style_settings_1 = require("../../style-settings/bar-style-settings");
const icon_settings_1 = require("../../style-settings/icon-settings");
const range_converter_1 = require("./range-converter");
const range_info_1 = require("./range-info");
class FormatConditionRangeGenerator {
    static generateRangeSet(condition, type) {
        if (type === range_converter_1.FormatConditionRangeSetPredefinedType.None || type === range_converter_1.FormatConditionRangeSetPredefinedType.Custom)
            return;
        condition.valueType(!!condition.dateTimeGroupInterval() ? 'Number' : 'Percent');
        var ranges = [];
        var styleList = range_converter_1.FormatConditionConverter.getStyleList(type);
        if (styleList.isIcon) {
            ranges = FormatConditionRangeGenerator._generateRangeSet(styleList.list.length, condition.dataType(), condition.dateTimeGroupInterval(), i => new icon_settings_1.IconSettings({
                '@IconType': styleList.list[i]
            }));
        }
        else {
            ranges = FormatConditionRangeGenerator._generateRangeSet(styleList.list.length, condition.dataType(), condition.dateTimeGroupInterval(), i => {
                return condition.createStyleSettings(styleList.list[i]);
            });
        }
        condition.rangeSet.ranges(ranges);
    }
    static generateGradientByType(condition, type, segmentNumber, isBar = false) {
        if (type === range_converter_1.FormatConditionRangeGradientPredefinedType.None || type === range_converter_1.FormatConditionRangeGradientPredefinedType.Custom)
            return;
        var styles = range_converter_1.FormatConditionConverter
            .toAppearanceTypes(type)
            .map(t => isBar ? new bar_style_settings_1.BarStyleSettings({ '@PredefinedColor': t }) : new appearance_settings_1.AppearanceSettings({ '@AppearanceType': t }));
        FormatConditionRangeGenerator.generateGradientByStyles(condition, styles, segmentNumber);
    }
    static generateGradientByStyles(condition, styles, segmentNumber) {
        var colorsCount = styles.length;
        if (segmentNumber >= colorsCount) {
            condition.generateAsPercent(styles[0], styles[colorsCount - 1], segmentNumber);
            if (colorsCount == 3)
                condition.rangeSet.ranges()[Math.floor(segmentNumber / 2)].styleSettings(styles[1]);
            if (colorsCount == 4) {
                condition.rangeSet.ranges()[Math.floor(segmentNumber / 3)].styleSettings(styles[1]);
                condition.rangeSet.ranges()[Math.floor(2 * segmentNumber / 3)].styleSettings(styles[2]);
            }
        }
    }
    static generateGradientColors(gradientType, count) {
        var gradientColors = [];
        var appearanceTypes = range_converter_1.FormatConditionConverter.toAppearanceTypes(gradientType);
        var prevIndex = 0, nextIndex = count - 1;
        gradientColors[prevIndex] = color_1.Color.fromAppearance(appearanceTypes[0]);
        gradientColors[nextIndex] = color_1.Color.fromAppearance(appearanceTypes[appearanceTypes.length - 1]);
        if (appearanceTypes.length == 3) {
            nextIndex = count / 2;
            gradientColors[nextIndex] = color_1.Color.fromAppearance(appearanceTypes[1]);
        }
        for (var i = 1; i < count - 1; i++) {
            if (appearanceTypes.length == 3 && (i === count / 2)) {
                nextIndex = count - 1;
            }
            gradientColors[i] = color_1.Color.fromDxColor(gradientColors[nextIndex].blend(gradientColors[prevIndex], (i - nextIndex) / (prevIndex - nextIndex)));
        }
        return gradientColors;
    }
    static getPredefinedType(actualStyles, func) {
        var enumValues = _helper_classes_1.EnumManager.getValues(range_converter_1.FormatConditionRangeSetPredefinedType);
        for (var i = 0; i < enumValues.length; i++) {
            var rangePredefinedType = enumValues[i];
            if (rangePredefinedType != range_converter_1.FormatConditionRangeSetPredefinedType.None && rangePredefinedType != range_converter_1.FormatConditionRangeSetPredefinedType.Custom
                && FormatConditionRangeGenerator._isStylesEqual(actualStyles, func(rangePredefinedType).actualStyles))
                return rangePredefinedType;
        }
        return range_converter_1.FormatConditionRangeSetPredefinedType.Custom;
    }
    static getGradientPredefinedType(actualStyles, func) {
        var enumValues = _helper_classes_1.EnumManager.getValues(range_converter_1.FormatConditionRangeGradientPredefinedType);
        for (var i = 0; i < enumValues.length; i++) {
            var rangePredefinedType = enumValues[i];
            if (rangePredefinedType != range_converter_1.FormatConditionRangeGradientPredefinedType.None && rangePredefinedType != range_converter_1.FormatConditionRangeGradientPredefinedType.Custom
                && FormatConditionRangeGenerator._isStylesEqual(actualStyles, func(rangePredefinedType).actualStyles))
                return rangePredefinedType;
        }
        return range_converter_1.FormatConditionRangeGradientPredefinedType.Custom;
    }
    static calculateRangePercentValues(segmentCount) {
        var values = [];
        for (var i = 0; i < segmentCount; i++) {
            values.push(FormatConditionRangeGenerator._calculateRangePercent(i, segmentCount));
        }
        return values;
    }
    static compareValues(val1, val2, changeType) {
        var negativeInfinity = negativeInfinity;
        var compare = (a, b) => {
            if (a == b) {
                return 0;
            }
            if (!a) {
                return -1;
            }
            if (!b) {
                return 1;
            }
            return a > b ? 1 : -1;
        };
        if (changeType && !!val1 && !!val2) {
            var firstNegativeInfinity = (val1 == negativeInfinity), secondNegativeInfinity = (val2 == negativeInfinity);
            if (firstNegativeInfinity && secondNegativeInfinity) {
                return 0;
            }
            if (firstNegativeInfinity) {
                return -1;
            }
            if (secondNegativeInfinity) {
                return 1;
            }
        }
        return compare(val1, val2);
    }
    static _isStylesEqual(actual, predefined) {
        if (actual.length != predefined.length)
            return false;
        for (var i = 0; i < actual.length; i++) {
            if ((actual[i] != null && predefined[i] == null) ||
                (actual[i] == null && predefined[i] != null) ||
                !actual[i].equals(predefined[i]))
                return false;
        }
        return true;
    }
    static _getPercentRangeStops(rangeStopsCount) {
        var marks = new Array(rangeStopsCount);
        for (var i = 0; i < rangeStopsCount; i++) {
            marks.push(i * 100 / rangeStopsCount);
        }
        return marks;
    }
    static _calculateRangePercent(index, count, decimals = 0) {
        return Math.round(100 * (index / count));
    }
    static _generateRangeSet(segmentCount, dataType, dateTimeGroupInterval, createStyleProc) {
        var ranges = [];
        for (var i = 0; i < segmentCount; i++) {
            let rangeInfo = new range_info_1.RangeInfo();
            let value = !dateTimeGroupInterval ? FormatConditionRangeGenerator._calculateRangePercent(i, segmentCount) : FormatConditionRangeGenerator._calculateRangeDate(dateTimeGroupInterval, i, segmentCount);
            rangeInfo.value.setValue(value, _format_rules_common_1.fieldTypes[dataType]);
            rangeInfo.styleSettings(createStyleProc(i));
            ranges.push(rangeInfo);
        }
        return ranges;
    }
    static _calculateRangeDate(groupInterval, i, segmentCount) {
        let dateIndex = segmentCount - i - 1;
        switch (groupInterval) {
            case 'DateHour':
                return DateTime.addHours(-dateIndex);
            case 'DateHourMinute':
                return DateTime.addMinutes(-dateIndex);
            case 'DateHourMinuteSecond':
                return DateTime.addSeconds(-dateIndex);
            case 'DayMonthYear':
            case 'None':
                return DateTime.addDays(-dateIndex);
            case 'WeekYear':
                return DateTime.addWeeks(-dateIndex);
            case 'MonthYear':
                return DateTime.addMonths(-dateIndex);
            case 'QuarterYear':
                return DateTime.addMonths(-dateIndex * 3);
            case 'Year':
                return DateTime.addYears(-dateIndex).getFullYear();
            case 'WeekOfMonth':
            case 'WeekOfYear':
            case 'Second':
            case 'Quarter':
            case 'Hour':
            case 'Minute':
            case 'Month':
            case 'DayOfWeek':
            case 'DayOfYear':
            case 'Day':
            default:
                return i;
        }
    }
}
exports.FormatConditionRangeGenerator = FormatConditionRangeGenerator;
class DateTime {
}
DateTime.addHours = function (v) {
    var date = new Date();
    date.setTime(date.getTime() + (v * 60 * 60 * 1000));
    return date;
};
DateTime.addMinutes = function (v) {
    var date = new Date();
    date.setTime(date.getTime() + (v * 60 * 1000));
    return date;
};
DateTime.addSeconds = function (v) {
    var date = new Date();
    date.setTime(date.getTime() + (v * 1000));
    return date;
};
DateTime.addDays = function (v) {
    var date = new Date();
    date.setTime(date.getTime() + (v * 24 * 60 * 60 * 1000));
    return date;
};
DateTime.addMonths = function (v) {
    var date = new Date();
    var year = date.getFullYear();
    var newMonth = date.getMonth() + v;
    var month = newMonth % 12;
    if (month < 0) {
        month += 12;
    }
    date.setMonth(month);
    date.setFullYear(year + (newMonth - month) / 12);
    return date;
};
DateTime.addYears = function (v) {
    var date = new Date();
    date.setFullYear(date.getFullYear() + v);
    return date;
};
DateTime.addWeeks = function (v) {
    return DateTime.addDays(7 * v);
};
