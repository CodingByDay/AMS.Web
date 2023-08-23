﻿/**
* DevExpress Dashboard (measure.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { SummaryType } from '../enums';
import { Calculation } from './calculations/calculation';
import { DataItem } from './data-item';
import { WindowDefinition } from './window-definition/window-definition';
export declare class Measure extends DataItem {
    calculation: Calculation;
    windowDefinition: WindowDefinition;
    expression: ko.Observable<string>;
    summaryType: ko.Observable<SummaryType>;
    filterString: ko.Observable<string>;
    constructor(dataItemJSON?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    grabFrom(dataItem: Measure): void;
    isDefinitionEquals(dataItem: DataItem): boolean;
    _hasCalculation(): any;
    protected _getDefaultItemType(): string;
}
