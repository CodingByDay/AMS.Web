﻿/**
* DevExpress Dashboard (federation-data-source.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { SerializableModel } from '../serializable-model';
import { DataSource } from './data-source';
export declare class FederationDataSource extends DataSource {
    sources: ko.ObservableArray<Source>;
    queries: ko.ObservableArray<QueryNode>;
    context: ko.ObservableArray<ContextItem>;
    get _isFederationDataProvider(): boolean;
    constructor(dataSourceJSON?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    getDisplayNamePrefix(): string;
    protected _getDefaultItemType(): string;
}
export declare type FederationQueryType = 'TransformationNode' | 'SelectNode' | 'UnionNode';
export declare class QueryNode extends SerializableModel {
    alias: ko.Observable<string>;
    private _queryType;
    get queryType(): FederationQueryType;
    constructor(json?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    protected _getDefaultItemType(): string;
}
export declare class ContextItem extends SerializableModel {
    source: ko.Observable<DataSource>;
    id: ko.Observable<string>;
    constructor(json?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    protected _getDefaultItemType(): string;
}
export declare class Source extends SerializableModel {
    dataSource: ko.Observable<string>;
    dataMember: ko.Observable<string>;
    name: ko.Observable<string>;
    constructor(json?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    protected _getDefaultItemType(): string;
}
