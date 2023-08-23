﻿/**
* DevExpress Dashboard (period-limit.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDisplayedValue, ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DateTimeGroupInterval, DateTimeInterval } from '../../enums';
import { SerializableModel } from '../../serializable-model';
export declare class FixedDateTimePeriodLimit extends SerializableModel {
    date: ko.Observable<Date>;
    isEmpty: ko.Observable<boolean>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    getDateTimeValue(): Date;
}
export declare class FlowDateTimePeriodLimit extends SerializableModel {
    interval: ko.Observable<DateTimeInterval>;
    offset: ko.Observable<number>;
    isEmpty: ko.Observable<boolean>;
    argumentInterval: ko.Observable<DateTimeGroupInterval>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    _getAvailableIntervals(): IDisplayedValue[];
}
