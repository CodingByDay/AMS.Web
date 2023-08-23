﻿/**
* DevExpress Dashboard (measure-definition.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { Calculation } from '../data-item/calculations/calculation';
import { WindowDefinition } from '../data-item/window-definition/window-definition';
import { SerializableModel } from '../serializable-model';
import { IDimensionDefinition } from './dimension-key';
export declare class MeasureDefinition extends SerializableModel {
    private static _constructFilteredName;
    displayText: ko.Computed<string>;
    dataMember: ko.Observable<string>;
    summaryType: ko.Observable<string>;
    calculation: Calculation;
    windowDefinition: WindowDefinition;
    expression: ko.Observable<string>;
    filterString: ko.Observable<string>;
    definitions: ko.ObservableArray<IDimensionDefinition>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    get _id(): string;
}
