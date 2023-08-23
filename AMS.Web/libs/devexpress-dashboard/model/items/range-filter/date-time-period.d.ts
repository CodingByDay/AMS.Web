﻿/**
* DevExpress Dashboard (date-time-period.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DateTimeFormatInfoType, DayOfWeekNumber } from '../../../data/_formatter';
import { IRange } from '../../../viewer-parts/viewer-items/range-selector-item/_datetime-period-converter';
import { Dimension } from '../../data-item/dimension';
import { DisposableType } from '../../disposable-object';
import { DateTimeGroupInterval } from '../../enums';
import { TypedSerializableModel } from '../../serializable-model';
import { LimitContainer } from './limit-container';
export declare class DateTimePeriod extends TypedSerializableModel {
    start: LimitContainer;
    end: LimitContainer;
    name: ko.Observable<string>;
    argumentInterval: ko.Observable<DateTimeGroupInterval>;
    _firstDayOfWeek: ko.Observable<DayOfWeekNumber>;
    _getPeriodTextValue: ko.PureComputed<any>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    protected _getDefaultItemType(): string;
    getDateTimeValue(): IRange;
    getDateFormat(): DateTimeFormatInfoType;
    format(value: Date): string;
    _subscribeToGroupInterval(dimension: Dimension): DisposableType;
}
