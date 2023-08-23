/**
* DevExpress Dashboard (format-condition-base.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DateTimeGroupInterval } from '../../enums';
import { SerializableModel } from '../../serializable-model';
export declare abstract class FormatConditionBase extends SerializableModel {
    dataType: ko.Observable<string>;
    dateTimeGroupInterval: ko.Observable<DateTimeGroupInterval>;
    private _empty;
    get _isApplyToRowColumnRestricted(): boolean;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    isValid(): boolean;
    isRange(): boolean;
    isGradient(): boolean;
    isEmpty: ko.Observable<boolean>;
    getSpecificType: () => any;
    setSpecificType: (type: any) => void;
    init(): void;
    _getAvailableFontFamilies: () => ko.Subscribable<string[]>;
}
