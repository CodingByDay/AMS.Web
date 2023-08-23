﻿/**
* DevExpress Dashboard (_dimension.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DashboardLocalizationId } from '../../../data/localization/_default';
import { DateTimeGroupInterval, DimensionTopNMode } from '../../enums';
import { IDashboardSerializationInfo, IDashboardSerializationInfoArray } from '../../metadata/_base-metadata';
export declare let dateTimeGroupIntervalsDict: {
    [key in DateTimeGroupInterval]: DashboardLocalizationId;
};
export declare let dimensionGroupIndex: IDashboardSerializationInfo;
export declare let dateTimeGroupInterval: IDashboardSerializationInfo;
export declare let rangeDateTimeGroupInterval: IDashboardSerializationInfo;
export declare let sortOrderBase: IDashboardSerializationInfo;
export declare let sortOrderOlap: IDashboardSerializationInfo;
export declare let sortOrderNonOlap: IDashboardSerializationInfo;
export declare let sortMode: IDashboardSerializationInfo;
export declare let textGroupInterval: IDashboardSerializationInfo;
export declare let isDiscreteNumericScale: IDashboardSerializationInfo;
export declare let groupChildValues: IDashboardSerializationInfo;
export declare let coloringMode: IDashboardSerializationInfo;
export declare let sortMeasure: IDashboardSerializationInfo;
export declare let realSortMode: IDashboardSerializationInfo;
export declare let topNOptionsEnabled: IDashboardSerializationInfo;
export declare let topNOptionsModeValues: {
    [key in DimensionTopNMode]: DashboardLocalizationId;
};
export declare let topNOptionsMode: IDashboardSerializationInfo;
export declare let topNOptionsCount: IDashboardSerializationInfo;
export declare let topNOptionsMeasure: IDashboardSerializationInfo;
export declare let topNOptionsShowOthers: IDashboardSerializationInfo;
export declare let topNOptionsSerializationsInfo: IDashboardSerializationInfoArray;
export declare let dimensionItemSerializationsInfo: IDashboardSerializationInfoArray;
