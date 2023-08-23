﻿/**
* DevExpress Dashboard (format-rules-common.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { SerializableModel } from '../serializable-model';
export declare class ComplexValue extends SerializableModel {
    _persistedValue: ko.Observable<any>;
    value: ko.Computed<any>;
    type: ko.Observable<string>;
    isEmpty(): boolean;
    get isInfinity(): boolean;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    setValue(value: any, type: string): void;
}
