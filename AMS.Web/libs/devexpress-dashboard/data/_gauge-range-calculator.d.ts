﻿/**
* DevExpress Dashboard (_gauge-range-calculator.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare class gaugeRangeCalculator {
    _values: any;
    _gaugeViewType: any;
    _customMin: any;
    _customMax: any;
    _minDefined: any;
    _maxDefined: any;
    _minTickCount: any;
    _maxTickCount: any;
    _min: any;
    _max: any;
    _equalSign: any;
    constructor(options: any);
    getGaugeRange(): {
        minorTickCount: any;
        majorTickCount: any;
        min: any;
        max: any;
    };
    _getLeft(left: any, step: any): number;
    _getRight(right: any, step: any): number;
    _isFit(left: any, right: any, step: any, tickCount: any): boolean;
    _extendRange(): void;
    _setRangeStart(): void;
    _defineMinMax(): void;
    _signsEqual(number1: any, number2: any): boolean;
    _defineMinMaxTicks(): void;
    _chooseMultiplier(delta: any): any;
}
