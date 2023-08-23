﻿/**
* DevExpress Dashboard (_data-controller-base.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Properties as dxSparklineOptions } from 'devextreme/viz/sparkline';
import { FormatRuleModelBase } from '../conditional-formatting/_view-model';
import { itemData } from '../item-data/_item-data';
import { itemDataAxisPoint } from '../item-data/_item-data-axis-point';
import { DataControllerOptions } from '../_factory';
export declare let DATA_POSTFIX: string;
export declare let DEFAULT_SUBTITLE_SEPARATOR: string;
export declare class dataControllerBase {
    deltaIndicatorTypes: any;
    multiData: itemData;
    viewModel: any;
    cfModel: any;
    drillDownState: any;
    useNeutralFilterMode: boolean;
    constructor(options: DataControllerOptions);
    isMultiselectable(): boolean;
    update(selectedValues: any[][], encodeHtml: boolean): void;
    getTitle(axisPoint: itemDataAxisPoint, separator?: any, saveOrder?: any): any;
    _getMeasureValueByAxisPoints(axisPoints: Array<itemDataAxisPoint>, cfMeasureId: any): any;
    _getSlice(axisPoints: any): itemData;
    _getZeroPosition(zeroPositionMeasureId: any, columnAxisName: any, rowAxisName: any): any;
    protected _getStyleIndexes(rule: FormatRuleModelBase, cellInfo: any, points: any): Array<number>;
    _getStyleSettingsInfoCore(cellInfo: any, rules: any, columnAxisName: any, rowAxisName: any): any;
    _generateSparklineOptions(data: any, options: any, format: (value: any) => string): dxSparklineOptions;
    _convertIndicatorType(type: any): any;
    protected _findAxisPoint(dataId: string, axisPoint: itemDataAxisPoint): itemDataAxisPoint;
}
