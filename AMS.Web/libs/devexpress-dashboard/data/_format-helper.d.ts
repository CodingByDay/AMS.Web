﻿/**
* DevExpress Dashboard (_format-helper.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DateTimeFormatInfo, NumericFormatInfo } from './_formatter';
export declare let invariantCurrencyIdentifier: string;
export declare let invariantCurrencySymbol: string;
export declare class DashboardFormatHelper {
    static defaultLargeNumberFormatPostfixes: {
        1: string;
        2: string;
        3: string;
        4: string;
    };
    static romanDigits: string[];
    static defaultQuarterFormat(): any;
    static format(value: any, format: NumericFormatInfo | DateTimeFormatInfo): string;
    static _applyNumberFormat(value: any, formatConfig: any): any;
    static _getQuarterString(date: any, format: any): any;
    static _formatDateEx(value: any, formatInfo: DateTimeFormatInfo): string;
    static _getMinimalPossibleValue(formatType: any, precision: any): number;
    static _formatNumberEx(value: any, formatInfo: NumericFormatInfo): string;
    static _getUnitFormatSettings(value: any, formatInfo: NumericFormatInfo): {
        unitPower: string | number;
        precision: number;
        showTrailingZeros: boolean;
        includeGroupSeparator: boolean;
    };
    static _insertUnitPostfix(formattedNumber: any, unitPower: any): any;
    static _generateNumericFormatConfig(settings: any, value: any): any;
    static _countSignsAfterPoint(num: any, formatType: any): number;
    static _excludeTrailingZeros(strValue: any, floatingSymbol: any): any;
    static _normalizeFormatConfig(format: any, precision: any, value: any): any;
    static _getNumberByPower(number: any, power: any, base: any): any;
}
