﻿/**
* DevExpress Dashboard (dimension-key.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { SerializableModel } from '../serializable-model';
export interface IDimensionDefinition {
    dataMember: ko.Observable<string>;
    dateTimeGroupInterval: ko.Observable<string>;
}
export interface IDimensionValue {
    type: ko.Observable<string>;
    value: ko.Observable<string>;
}
export declare class DimensionKey extends SerializableModel {
    displayText: ko.Computed<string>;
    definition: IDimensionDefinition;
    value: IDimensionValue;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
