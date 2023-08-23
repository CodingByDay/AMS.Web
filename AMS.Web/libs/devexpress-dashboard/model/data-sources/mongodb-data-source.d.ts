﻿/**
* DevExpress Dashboard (mongodb-data-source.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { SerializableModel } from '../serializable-model';
import { DataSource } from './data-source';
export declare class MongoDBDataSource extends DataSource {
    queries: ko.ObservableArray<MongoDBQuery>;
    get _isFederationDataProvider(): boolean;
    constructor(dataSourceJSON?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    getDisplayNamePrefix(): string;
    protected _getDefaultItemType(): string;
}
export declare class MongoDBQuery extends SerializableModel {
    alias: ko.Observable<string>;
    collectionName: ko.Observable<string>;
    _actualName: ko.PureComputed<string>;
    constructor(json?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    protected _getDefaultItemType(): string;
}
