﻿/**
* DevExpress Dashboard (data-source.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IDashboardComponent } from '../internal/_dashboard-component-name-generator';
import { TypedSerializableModel } from '../serializable-model';
import { CalculatedField } from './calculated-field';
export interface IDataSourceConsumer {
    dataSource: ko.Observable<string>;
    dataMember: ko.Observable<string>;
}
export declare abstract class DataSource extends TypedSerializableModel implements IDashboardComponent {
    hasCalculatedFields: boolean;
    supportDataMembers: boolean;
    name: ko.Observable<string>;
    componentName: ko.Observable<string>;
    calculatedFields: ko.ObservableArray<CalculatedField>;
    hasFilter: boolean;
    filter: ko.Observable<string>;
    abstract get _isFederationDataProvider(): boolean;
    constructor(dataSourceJSON?: any, serializer?: ModelSerializer);
    abstract getDisplayNamePrefix(): string;
    abstract getInfo(): ISerializationInfoArray;
    getJson(): any;
    getUniqueNamePrefix(): string;
}
