﻿/**
* DevExpress Dashboard (_chart-indicators.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DashboardLocalizationId } from '../../../../data/localization/_default';
import { DashStyle, IndicatorType } from '../../../enums';
import { IDashboardSerializationInfo, IDashboardSerializationInfoArray } from '../../../metadata/_base-metadata';
export declare let dashStyleMap: {
    [key in DashStyle]: DashboardLocalizationId;
};
export declare let indicatorTypeMap: {
    [key in IndicatorType]: DashboardLocalizationId;
};
export declare let chartIndicatorColor: IDashboardSerializationInfo;
export declare let chartIndicatorDashStyle: IDashboardSerializationInfo;
export declare let chartIndicatorIgnoreEmptyArgument: IDashboardSerializationInfo;
export declare let chartIndicatorType: IDashboardSerializationInfo;
export declare let chartIndicatorLegendText: IDashboardSerializationInfo;
export declare let chartIndicatorValue: IDashboardSerializationInfo;
export declare let chartIndicatorShowInLegend: IDashboardSerializationInfo;
export declare let chartIndicatorThickness: IDashboardSerializationInfo;
export declare let chartIndicatorVisible: IDashboardSerializationInfo;
export declare let chartIndicatorValueLevel: IDashboardSerializationInfo;
export declare let chartIndicatorDisplayName: IDashboardSerializationInfo;
export declare let chartIndicatorTypeName: IDashboardSerializationInfo;
export declare let chartIndicatorSerializationInfo: IDashboardSerializationInfoArray;
