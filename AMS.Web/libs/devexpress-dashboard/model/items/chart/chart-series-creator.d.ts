﻿/**
* DevExpress Dashboard (chart-series-creator.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { OpenHighLowCloseSeriesType, RangeSeriesType, SimpleSeriesType } from '../../enums';
import { DataDashboardItem } from '../data-dashboard-item';
import { ChartSeries, HighLowCloseSeries, OpenHighLowCloseSeries, RangeSeries, SimpleSeries, WeightedSeries } from './chart-series';
export declare class ChartSeriesCreator {
    static chartSeriesTypesMap: {
        Simple: typeof SimpleSeries;
        Range: typeof RangeSeries;
        Weighted: typeof WeightedSeries;
        OpenHighLowClose: typeof OpenHighLowCloseSeries;
        HighLowClose: typeof HighLowCloseSeries;
    };
    static chartSeriesViewTypesMap: {
        Point: any;
        Bar: any;
        StackedBar: any;
        FullStackedBar: any;
        Line: any;
        StackedLine: any;
        FullStackedLine: any;
        StepLine: any;
        Spline: any;
        Area: any;
        StackedArea: any;
        FullStackedArea: any;
        StepArea: any;
        SplineArea: any;
        StackedSplineArea: any;
        FullStackedSplineArea: any;
    };
    static chartSeriesGroupLocalization: {
        Area: string;
        Bar: string;
        Bubble: string;
        Financial: string;
        'Point / Line': string;
        Range: string;
    };
    static getSeriesCreator(dataItemProvider: DataDashboardItem): (seriesViewType: SimpleSeriesType | RangeSeriesType | OpenHighLowCloseSeriesType) => ChartSeries;
    static createSeries(dataItemProvider: DataDashboardItem, seriesJSON: any, serializer?: ModelSerializer): ChartSeries;
}
