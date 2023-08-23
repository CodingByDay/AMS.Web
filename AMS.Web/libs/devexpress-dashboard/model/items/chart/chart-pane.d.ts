﻿/**
* DevExpress Dashboard (chart-pane.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { SerializableModel } from '../../serializable-model';
import { DataDashboardItem } from '../data-dashboard-item';
import { ChartAxisY, ChartSecondaryAxisY } from './chart-axis';
import { ChartSeries } from './chart-series';
export declare class ChartPane extends SerializableModel {
    name: ko.Observable<string>;
    series: ko.ObservableArray<ChartSeries>;
    primaryAxisY: ChartAxisY;
    secondaryAxisY: ChartSecondaryAxisY;
    createSeriesByViewType: (seriesViewType: string) => ChartSeries;
    constructor(dataItemProvider: DataDashboardItem, dashboardItemJSON?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
