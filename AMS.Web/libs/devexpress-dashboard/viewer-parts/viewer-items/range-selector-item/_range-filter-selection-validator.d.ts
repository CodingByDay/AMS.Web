﻿/**
* DevExpress Dashboard (_range-filter-selection-validator.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IEntireRange, IRange } from './_datetime-period-converter';
export declare class RangeFilterSelectionValidator {
    static validate(range: IRange, isYearGroupInterval: boolean, entireRange?: IEntireRange): IRange;
    static validateLimitsOrder(range: IRange): IRange;
    static isValidValue(value: any): boolean;
    static _validateValues(range: IRange, entireRange: IEntireRange): IRange;
    static _validateOutOfRange(range: IRange, entireRange: IEntireRange): IRange;
    static _prepareYearRangeBeforeSelection(range: IRange, isYearGroupInterval: boolean): IRange;
}
