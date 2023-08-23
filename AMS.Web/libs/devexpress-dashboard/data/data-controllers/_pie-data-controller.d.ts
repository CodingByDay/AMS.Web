﻿/**
* DevExpress Dashboard (_pie-data-controller.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { itemDataAxisPoint } from '../item-data/_item-data-axis-point';
import { chartDataControllerBase } from './_chart-data-controller-base';
export declare class pieDataController extends chartDataControllerBase {
    _measures: any;
    _argumentAxisPoints: any;
    settingsType: any;
    constructor(options: any);
    getPointDisplayTexts(pointTag: any, value: any, percent: any): {
        argumentText: any;
        valueText: any;
        percentText: string;
    };
    isDiscreteArgument(): boolean;
    createDataSource(seriesAxisPoint: any, valueDataMember: string): any[];
    getValueDataMembers(): any;
    getValueDisplayNames(seriesAxisPoint: itemDataAxisPoint, valueDataMemberIndex: any): any;
    _getCorrectZeroValue(value: any): number;
    _getColorDataMemberByMeasureId(valueDataMember: string): any;
    _getColorDataMemberByIndex(index: any): any;
}
