﻿/**
* DevExpress Dashboard (_data-item-format.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DashboardLocalizationId } from '../../../data/localization/_default';
import { DataItemNumericFormatType } from '../../enums';
import { IDashboardSerializationInfo, IDashboardSerializationInfoArray } from '../../metadata/_base-metadata';
export declare let formatTypeValues: {
    [key in DataItemNumericFormatType]: DashboardLocalizationId;
};
export declare let customFormatString: IDashboardSerializationInfo;
export declare let formatType: IDashboardSerializationInfo;
export declare let unit: IDashboardSerializationInfo;
export declare let precision: IDashboardSerializationInfo;
export declare let includeGroupSeparator: IDashboardSerializationInfo;
export declare let dataItemCurrencyCultureName: IDashboardSerializationInfo;
export declare let dataItemNumericFormatSerializationsInfo: IDashboardSerializationInfoArray;
export declare let absoluteVariationNumericFormatSerializationsInfo: IDashboardSerializationInfoArray;
export declare let percentVariationNumericFormatSerializationsInfo: IDashboardSerializationInfoArray;
export declare let percentOfTargetNumericFormatSerializationsInfo: IDashboardSerializationInfoArray;
export declare let yearFormat: IDashboardSerializationInfo;
export declare let namelessYearFormat: IDashboardSerializationInfo;
export declare let quarterFormat: IDashboardSerializationInfo;
export declare let namelessQuarterFormat: IDashboardSerializationInfo;
export declare let monthFormat: IDashboardSerializationInfo;
export declare let namelessMonthFormat: IDashboardSerializationInfo;
export declare let dayOfWeekFormat: IDashboardSerializationInfo;
export declare let namelessDayOfWeekFormat: IDashboardSerializationInfo;
export declare let dateFormat: IDashboardSerializationInfo;
export declare let namelessDateFormat: IDashboardSerializationInfo;
export declare let dateHourFormat: IDashboardSerializationInfo;
export declare let namelessDateHourFormat: IDashboardSerializationInfo;
export declare let dateHourMinuteFormat: IDashboardSerializationInfo;
export declare let namelessDateHourMinuteFormat: IDashboardSerializationInfo;
export declare let dateTimeWithSecondsFormat: IDashboardSerializationInfo;
export declare let namelessDateTimeWithSecondsFormat: IDashboardSerializationInfo;
export declare let hourFormat: IDashboardSerializationInfo;
export declare let namelessHourFormat: IDashboardSerializationInfo;
export declare let exactDateFormat: IDashboardSerializationInfo;
export declare let namelessExactDateFormat: IDashboardSerializationInfo;
export declare let dataItemDateTimeFormatSerializationsInfo: IDashboardSerializationInfoArray;
