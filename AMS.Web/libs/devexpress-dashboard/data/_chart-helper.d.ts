﻿/**
* DevExpress Dashboard (_chart-helper.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare type ChartSeriesTypeInternal = 'area' | 'bar' | 'bubble' | 'candlestick' | 'fullstackedarea' | 'fullstackedbar' | 'fullstackedline' | 'fullstackedspline' | 'fullstackedsplinearea' | 'line' | 'rangearea' | 'rangebar' | 'scatter' | 'spline' | 'splinearea' | 'stackedarea' | 'stackedbar' | 'stackedline' | 'stackedspline' | 'stackedsplinearea' | 'steparea' | 'stepline' | 'stock' | '';
export declare type PieSeriesType = 'doughnut' | 'pie';
export declare let chartHelper: {
    SelectionMode: {
        Argument: string;
        Series: string;
        Points: string;
    };
    ChartLegendInsidePosition: {
        TopLeftVertical: string;
        TopLeftHorizontal: string;
        TopCenterVertical: string;
        TopCenterHorizontal: string;
        TopRightVertical: string;
        TopRightHorizontal: string;
        BottomLeftVertical: string;
        BottomLeftHorizontal: string;
        BottomCenterVertical: string;
        BottomCenterHorizontal: string;
        BottomRightVertical: string;
        BottomRightHorizontal: string;
    };
    ChartLegendOutsidePosition: {
        TopLeftVertical: string;
        TopLeftHorizontal: string;
        TopCenterHorizontal: string;
        TopRightVertical: string;
        TopRightHorizontal: string;
        BottomLeftVertical: string;
        BottomLeftHorizontal: string;
        BottomCenterHorizontal: string;
        BottomRightVertical: string;
        BottomRightHorizontal: string;
    };
    convertSeriesType: (viewSeriesType: any) => ChartSeriesTypeInternal | PieSeriesType;
    convertPresentationUnit: (argumentViewModel: any) => "day" | "hour" | "minute" | "month" | "second" | "quarter" | "week";
    convertLegendInsidePosition: (position: any) => {
        verticalAlignment: string;
        horizontalAlignment: string;
        orientation: string;
    };
    convertLegendOutsidePosition: (position: any) => {
        verticalAlignment: string;
        horizontalAlignment: string;
        orientation: string;
    };
    convertPointLabelRotationAngle: (orientation: any) => 0 | 90 | 270;
    convertPointLabelPosition: (position: any) => "inside" | "outside";
    allowArgumentAxisMargins: (panes: any) => any;
    isFinancialType: (type: any) => boolean;
    isTransparentColorType: (type: any) => boolean;
    isSeriesColorSupported: (type: ChartSeriesTypeInternal) => boolean;
    isStackedAreaType: (type: ChartSeriesTypeInternal) => boolean;
};
