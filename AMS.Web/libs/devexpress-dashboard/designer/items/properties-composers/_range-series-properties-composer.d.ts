﻿/**
* DevExpress Dashboard (_range-series-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ChartSeries } from '../../../model/items/chart/chart-series';
import { CustomizeDataItemContainerTabs } from './_base-properties-composer';
import { ChartSeriesPropertiesComposer } from './_chart-series-properties-composer';
export declare class RangeSeriesPropertiesComposer extends ChartSeriesPropertiesComposer {
    constructor(customizeHandler: CustomizeDataItemContainerTabs);
    protected _showIgnoreEmptyPointsVisible(model: ChartSeries): boolean;
    protected _fillConditionalFormattingTab(): void;
}
