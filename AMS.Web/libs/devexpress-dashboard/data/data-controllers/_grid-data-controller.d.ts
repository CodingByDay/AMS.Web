﻿/**
* DevExpress Dashboard (_grid-data-controller.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Properties as dxSparklineOptions } from 'devextreme/viz/sparkline';
import { FormatRuleModelBase } from '../conditional-formatting/_view-model';
import { PrimitiveType } from '../types';
import { dataControllerBase } from './_data-controller-base';
export interface CellValue {
    getValue: () => any;
    getData: () => any;
    getStyleSettingsInfo: () => any;
}
export interface DimensionCellValue extends CellValue {
    getUniqueValue: () => any;
}
export interface HyperlinkCellValue extends DimensionCellValue {
    getUriValue: () => any;
}
export declare class gridDataController extends dataControllerBase {
    private _axisColumnPoints;
    private _axisSparklinePoints;
    private _columnRepository;
    private _selectionMembers;
    constructor(options: any);
    getDataSource(): any[];
    private initializeColumnBarCalculator;
    getValueItem(columnName: any, rowIndex?: any): any;
    private _getValueItem;
    getSelectionValues(values: any): any[];
    getSelectedRowKeys(valuesSet: any[][]): number[];
    getDimensionValues(rowIndex: number): PrimitiveType[];
    getTotalValue(measureId: any): string;
    private _getBarCellValue;
    private _getBarData;
    private _getMeasureCellValue;
    private _getCellValue;
    private _getStyleSettingsInfo;
    protected _getStyleIndexes(rule: FormatRuleModelBase, cellInfo: any, points: any): any[];
    private _getAxisPoint;
    private _getDeltaValue;
    private _getDeltaValueItem;
    private _getSparklineCellValues;
    private _getColumnAxisPoint;
    private _getPointArray;
}
export interface SparklineData {
    sparkline: dxSparklineOptions;
    startText: string;
    endText: string;
}
