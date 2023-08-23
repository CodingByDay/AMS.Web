﻿/**
* DevExpress Dashboard (data-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer, ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IDataField } from '../data-sources/_data-field';
import { IDashboardComponent } from '../internal/_dashboard-component-name-generator';
import { IDataItemProvider } from '../items/_binding-model';
import { IDashboardSerializationInfo } from '../metadata/_base-metadata';
import { TypedSerializableModel } from '../serializable-model';
import { DataItemDateTimeFormat, DataItemNumericFormat } from './data-item-format';
export declare abstract class DataItem extends TypedSerializableModel implements IDashboardComponent {
    static typesMap: {
        Integer: string;
        Float: string;
        Double: string;
        Decimal: string;
        DateTime: string;
        Text: string;
        String: string;
        Bool: string;
        Boolean: string;
        Enum: string;
    };
    name: ko.Observable<string>;
    uniqueName: ko.Observable<string>;
    dataMember: ko.Observable<string>;
    numericFormat: DataItemNumericFormat;
    dateTimeFormat: DataItemDateTimeFormat;
    showValues: ko.Observable<boolean>;
    showTotals: ko.Observable<boolean>;
    showGrandTotals: ko.Observable<boolean>;
    constructor(dataItemJSON?: any, serializer?: IModelSerializer);
    getInfo(): ISerializationInfoArray;
    grabFrom(dataItem: DataItem): void;
    isDefinitionEquals(dataItem: DataItem): boolean;
    getUniqueNamePrefix(): string;
}
export declare enum AcceptableShapingType {
    Number = 0,
    String = 1,
    RangeDate = 2,
    Attribute = 3,
    Hidden = 4
}
export declare class DataItemLink extends TypedSerializableModel {
    static create(dataItemProvider: IDataItemProvider, dataItemLink: DataItemLink): DataItemLink;
    uniqueName: ko.Observable<string>;
    dataItem: ko.Subscribable<DataItem>;
    private _dataItemProvider;
    _specifics: {
        acceptableShapingType: AcceptableShapingType;
        customOptionsProperties: {
            serializationInfo: IDashboardSerializationInfo;
            filter?: (dataItem: DataItem) => boolean;
            disabledRule?: (dataItem: DataItem) => boolean;
        }[];
        customDataShapingProperties: {
            serializationInfo: IDashboardSerializationInfo;
            filter?: (dataField: IDataField) => boolean;
        }[];
        isAttribute: boolean;
        skipFormatting: boolean;
        supportsTopNOther: boolean;
        forceAddOlapExactDateFormat: boolean;
    };
    constructor(dataItemProvider: IDataItemProvider, dataItemLinkJSON?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    protected _getDefaultItemType(): string;
    _updateProvider(dataItemProvider: IDataItemProvider): void;
}
