﻿/**
* DevExpress Dashboard (_grid-bar-calculator.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare class GridBarCalculator {
    _valueItems: any;
    _alwaysShowZeroLevel: any;
    _normalizedValues: any;
    _zeroPosition: any;
    _range: any;
    _min: any;
    _max: any;
    _normalizationData: any;
    constructor(showZeroLevel: any);
    addValue(indexRow: number, valueItem: any): void;
    getNormalizedValue(index: any): any;
    getZeroPosition(): any;
    initialize(min: number, max: number): void;
    _normalizeValue(value: any): number;
    _calcMinMax(min: number, max: number): void;
    _calcRange(): void;
    _calcZeroPosition(): void;
    _calcNormalizationData(): void;
}
