﻿/**
* DevExpress Dashboard (limit-container.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DateTimeGroupInterval, DateTimeInterval } from '../../enums';
import { SerializableModel } from '../../serializable-model';
import { FixedDateTimePeriodLimit, FlowDateTimePeriodLimit } from './period-limit';
export declare class LimitContainer extends SerializableModel {
    fixed: FixedDateTimePeriodLimit;
    flow: FlowDateTimePeriodLimit;
    mode: ko.Observable<"None" | "Fixed" | "Flow">;
    argumentInterval: ko.Observable<DateTimeGroupInterval>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    isEmpty(): boolean;
    getInterval(): DateTimeInterval;
}
