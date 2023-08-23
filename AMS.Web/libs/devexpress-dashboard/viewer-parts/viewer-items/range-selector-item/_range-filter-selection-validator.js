﻿/**
* DevExpress Dashboard (_range-filter-selection-validator.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangeFilterSelectionValidator = void 0;
class RangeFilterSelectionValidator {
    static validate(range, isYearGroupInterval, entireRange) {
        let validatedRange = this._prepareYearRangeBeforeSelection(range, isYearGroupInterval);
        validatedRange = this._validateValues(validatedRange, entireRange || { maximum: null, minimum: null });
        validatedRange = this.validateLimitsOrder(validatedRange);
        if (entireRange) {
            validatedRange = this._validateOutOfRange(validatedRange, entireRange);
        }
        return validatedRange;
    }
    static validateLimitsOrder(range) {
        if (range.startValue && range.endValue && range.startValue > range.endValue) {
            return {
                startValue: range.endValue,
                endValue: range.startValue
            };
        }
        return range;
    }
    static isValidValue(value) {
        return (typeof value === 'number') || (value instanceof Date);
    }
    static _validateValues(range, entireRange) {
        return {
            startValue: RangeFilterSelectionValidator.isValidValue(range.startValue) ? range.startValue : entireRange.minimum,
            endValue: RangeFilterSelectionValidator.isValidValue(range.endValue) ? range.endValue : entireRange.maximum
        };
    }
    static _validateOutOfRange(range, entireRange) {
        let startValue = range.startValue >= entireRange.minimum ? range.startValue : entireRange.minimum;
        startValue = startValue <= entireRange.maximum ? startValue : entireRange.minimum;
        let endValue = range.endValue <= entireRange.maximum ? range.endValue : entireRange.maximum;
        endValue = endValue >= entireRange.minimum ? endValue : entireRange.maximum;
        return {
            startValue: startValue,
            endValue: endValue
        };
    }
    static _prepareYearRangeBeforeSelection(range, isYearGroupInterval) {
        let prepareYearBeforeSelection = (value) => {
            return value && value.getFullYear ? value.getFullYear() : value;
        };
        if (isYearGroupInterval) {
            return {
                startValue: prepareYearBeforeSelection(range.startValue),
                endValue: prepareYearBeforeSelection(range.endValue)
            };
        }
        else {
            return range;
        }
    }
}
exports.RangeFilterSelectionValidator = RangeFilterSelectionValidator;
