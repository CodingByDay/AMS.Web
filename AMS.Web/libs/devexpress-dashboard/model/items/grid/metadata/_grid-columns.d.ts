﻿/**
* DevExpress Dashboard (_grid-columns.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDashboardSerializationInfo, IDashboardSerializationInfoArray } from '../../../metadata/_base-metadata';
export declare let columnType: IDashboardSerializationInfo;
export declare let displayMode: IDashboardSerializationInfo;
export declare let columnWeight: IDashboardSerializationInfo;
export declare let fixedWidth: IDashboardSerializationInfo;
export declare let widthType: IDashboardSerializationInfo;
export declare let totalsTemplate: IDashboardSerializationInfo;
export declare let gridColumnBaseSerializationsInfo: IDashboardSerializationInfoArray;
export declare let dimension: IDashboardSerializationInfo;
export declare let dimensionDisplayMode: IDashboardSerializationInfo;
export declare let gridDimensionColumnSerializationsInfo: IDashboardSerializationInfoArray;
export declare let alwaysShowZeroLevel: IDashboardSerializationInfo;
export declare let measure: IDashboardSerializationInfo;
export declare let gridMeasureColumnSerializationsInfo: IDashboardSerializationInfoArray;
export declare let gridColumnDeltaOptions: IDashboardSerializationInfo;
export declare let gridColumnActualValue: IDashboardSerializationInfo;
export declare let gridColumnTargetValue: IDashboardSerializationInfo;
export declare let gridDeltaColumnSerializationsInfo: IDashboardSerializationInfoArray;
export declare let showStartEndValues: IDashboardSerializationInfo;
export declare let sparkline: IDashboardSerializationInfo;
export declare let sparklineOptions: IDashboardSerializationInfo;
export declare let gridSparklineColumnSerializationsInfo: IDashboardSerializationInfoArray;
export declare let uri: IDashboardSerializationInfo;
export declare let displayValue: IDashboardSerializationInfo;
export declare function checkGridUriPattern(value: any): string;
export declare function validateGridUriPattern(value: any): boolean;
export declare function gridValidateUriPattern(uriPattern: any): boolean;
export declare let uriPatternValidationRules: {
    type: string;
    validationCallback: (options: any) => boolean;
    message: string;
}[];
export declare let gridColumnUriPattern: IDashboardSerializationInfo;
export declare let gridHyperlinkColumnSerializationsInfo: IDashboardSerializationInfoArray;
