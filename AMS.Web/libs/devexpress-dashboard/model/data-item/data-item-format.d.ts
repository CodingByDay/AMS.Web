﻿/**
* DevExpress Dashboard (data-item-format.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DataItemNumericFormatType, DataItemNumericUnit, DateFormat, DateTimeFormat, DayOfWeekFormat, ExactDateFormat, HourFormat, MonthFormat, QuarterFormat, YearFormat } from '../enums';
import { SerializableModel } from '../serializable-model';
export declare class DataItemNumericFormat extends SerializableModel {
    currencyCultureName: ko.Observable<string>;
    formatType: ko.Observable<DataItemNumericFormatType>;
    precision: ko.Observable<number>;
    unit: ko.Observable<DataItemNumericUnit>;
    includeGroupSeparator: ko.Observable<boolean>;
    customFormatString: ko.Observable<string>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    _getViewModel(): {
        NumericFormat: {
            CurrencyCulture: string;
            FormatType: DataItemNumericFormatType;
            Precision: number;
            Unit: DataItemNumericUnit;
            IncludeGroupSeparator: boolean;
        };
    };
}
export declare class AbsoluteVariationNumericFormat extends DataItemNumericFormat {
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
export declare class PercentVariationNumericFormat extends DataItemNumericFormat {
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
export declare class PercentOfTargetNumericFormat extends DataItemNumericFormat {
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
export declare class DataItemDateTimeFormat extends SerializableModel {
    yearFormat: ko.Observable<YearFormat>;
    quarterFormat: ko.Observable<QuarterFormat>;
    monthFormat: ko.Observable<MonthFormat>;
    dayOfWeekFormat: ko.Observable<DayOfWeekFormat>;
    dateFormat: ko.Observable<DateFormat>;
    dateHourFormat: ko.Observable<DateTimeFormat>;
    dateHourMinuteFormat: ko.Observable<DateTimeFormat>;
    dateTimeFormat: ko.Observable<DateTimeFormat>;
    hourFormat: ko.Observable<HourFormat>;
    exactDateFormat: ko.Observable<ExactDateFormat>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    _getViewModel(groupInterval: any): {
        DateTimeFormat: {
            GroupInterval: any;
            YearFormat: YearFormat;
            QuarterFormat: QuarterFormat;
            MonthFormat: MonthFormat;
            DayOfWeekFormat: DayOfWeekFormat;
            DateFormat: DateFormat;
            DateHourFormat: DateTimeFormat;
            DateHourMinuteFormat: DateTimeFormat;
            DateTimeFormat: DateTimeFormat;
            HourFormat: HourFormat;
            ExactDateFormat: ExactDateFormat;
        };
    };
}
