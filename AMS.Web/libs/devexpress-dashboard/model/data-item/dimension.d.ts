﻿/**
* DevExpress Dashboard (dimension.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IDimensionDefinition } from '../colorization/dimension-key';
import { ColoringMode, DateTimeGroupInterval, DimensionSortMode, DimensionSortOrder, DimensionTopNMode, TextGroupInterval } from '../enums';
import { DataItem } from './data-item';
export declare class Dimension extends DataItem implements IDimensionDefinition {
    groupIndex: ko.Observable<number>;
    sortOrder: ko.Observable<DimensionSortOrder>;
    sortMeasure: ko.Observable<string>;
    sortMode: ko.Observable<DimensionSortMode>;
    realSortMode: ko.Computed<string>;
    dateTimeGroupInterval: ko.Observable<DateTimeGroupInterval>;
    textGroupInterval: ko.Observable<TextGroupInterval>;
    isDiscreteNumericScale: ko.Observable<boolean>;
    groupChildValues: ko.Observable<boolean>;
    coloringMode: ko.Observable<ColoringMode>;
    topNOptionsEnabled: ko.Observable<boolean>;
    topNOptionsMode: ko.Observable<DimensionTopNMode>;
    topNOptionsCount: ko.Observable<number>;
    topNOptionsMeasureName: ko.Observable<string>;
    topNOptionsShowOthers: ko.Observable<boolean>;
    _actualDateTimeGroupInterval: ko.Computed<DateTimeGroupInterval>;
    constructor(dataItemJSON?: any, serializer?: IModelSerializer);
    getInfo(): ISerializationInfoArray;
    grabFrom(dataItem: Dimension): void;
    isDefinitionEquals(dataItem: DataItem): boolean;
    protected _getDefaultItemType(): string;
}
