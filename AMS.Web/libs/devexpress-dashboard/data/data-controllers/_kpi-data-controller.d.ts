﻿/**
* DevExpress Dashboard (_kpi-data-controller.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { widgetItemCore } from '../../viewer-parts/viewer-items/_widget-viewer-item-core';
import { FormatRuleModelBase } from '../conditional-formatting/_view-model';
import { ItemDataDeltaValue, ItemDataMeasureValue } from '../item-data/item-data-definitions';
import { dataControllerBase } from './_data-controller-base';
export declare class kpiDataController extends dataControllerBase {
    setSourceItemProperties: (sourceItem: widgetItemCore, element: any, properties: any) => void;
    _axisPoints: any;
    _sparklineAxisPoints: any;
    constructor(options: any);
    getDataSource(): any[];
    _createSourceItem(axisPoint: any, kpiElement: any): widgetItemCore;
    _getDeltaValue(axisPoint: any, kpiElement: any): ItemDataDeltaValue;
    _getMeasureValue(axisPoint: any, kpiElement: any): ItemDataMeasureValue;
    _getSparklineValues(axisPoint: any, kpiElement: any): any[];
    private _getStyleSettingsInfo;
    private _correctAxisPoint;
    protected _getStyleIndexes(rule: FormatRuleModelBase, cellInfo: any, points: any): any[];
    _initialize(): void;
    _iterateKpiItems(delegate: any): void;
    _getGaugeRange(element: any): void;
}
