﻿/**
* DevExpress Dashboard (dynamic-list-lookup-settings.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IDataSourceConsumer } from '../data-sources/data-source';
import { DimensionSortOrder } from '../enums';
import { IDashboardSerializationInfo } from '../metadata/_base-metadata';
import { SerializableModel } from '../serializable-model';
export declare class DynamicListLookUpSettings extends SerializableModel implements IDataSourceConsumer {
    static modelName: string;
    dataMember: ko.Observable<string>;
    dataSource: ko.Observable<string>;
    valueMemberName: ko.Observable<string>;
    displayMemberName: ko.Observable<string>;
    sortByMember: ko.Observable<string>;
    sortOrder: ko.Observable<DimensionSortOrder>;
    _dataSource: ko.Computed<string>;
    _dataMember: ko.Computed<string>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    equals(target: DynamicListLookUpSettings): boolean;
    isPropertyDisabled(propertyName: string): boolean;
}
export declare let _dynamicListLookUpSettingsSerializationInfo: IDashboardSerializationInfo;
