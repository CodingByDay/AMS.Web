﻿/**
* DevExpress Dashboard (_period-limit.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FixedDateTimePeriodLimit, FlowDateTimePeriodLimit } from '../../..';
import { DashboardLocalizationId } from '../../../../data/localization/_default';
import { DateTimeGroupInterval, DateTimeInterval } from '../../../enums';
import { IDashboardSerializationInfo, IDashboardSerializationInfoArray, ITypedDashboardSerializationInfo } from '../../../metadata/_base-metadata';
export declare let flowIntervalOrderedValues: Array<DateTimeInterval>;
export declare let flowIntervalValues: {
    [key in DateTimeInterval]: DashboardLocalizationId;
};
export declare function convertDateTimeGroupInterval(groupInterval: DateTimeGroupInterval): DateTimeInterval;
export declare let interval: IDashboardSerializationInfo;
export declare let offset: ITypedDashboardSerializationInfo<FlowDateTimePeriodLimit>;
export declare let flowDateTimePeriodLimitSerializationsInfo: IDashboardSerializationInfoArray;
export declare let date: ITypedDashboardSerializationInfo<FixedDateTimePeriodLimit>;
export declare let fixedDateTimePeriodLimitSerializationsInfo: IDashboardSerializationInfoArray;
