﻿/**
* DevExpress Dashboard (_data-field.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DataFieldType } from '../enums';
import { SerializableModel } from '../serializable-model';
export declare type DataNodeType = 'Unknown' | 'DataSource' | 'DataTable' | 'DataMember' | 'DataField' | 'CalculatedFields' | 'CalculatedDataField' | 'ExpressionFields' | 'OlapDataSource' | 'OlapMeasureFolder' | 'OlapMeasure' | 'OlapDimensionFolder' | 'OlapDimension' | 'OlapKpiFolder' | 'OlapKpi' | 'OlapFolder' | 'OlapHierarchy';
export interface IDataField {
    dataMember: ko.Observable<string>;
    name: ko.Observable<string>;
    displayName: ko.Observable<string>;
    fieldType?: ko.Observable<DataFieldType>;
    isConvertible?: ko.Observable<boolean>;
    isDataFieldNode: ko.Observable<boolean>;
    hasCalculatedFields?: boolean;
    groupIndex?: ko.Observable<number>;
    nodeType?: ko.Observable<DataNodeType>;
    isAggregate?: ko.Observable<boolean>;
    isList?: ko.Observable<boolean>;
    isCorruptedCalcField?: ko.Observable<boolean>;
    isDataSourceNode?: ko.Observable<boolean>;
    isDataTableNode?: ko.Observable<boolean>;
    isExpressionsNode?: ko.Observable<boolean>;
}
export declare let IsNumeric: (dataType: DataFieldType) => boolean;
export declare let IsTextual: (dataType: DataFieldType) => boolean;
export declare let IsDateTime: (dataType: DataFieldType) => boolean;
export declare let IsOlapHierarchyField: (dataField: any) => boolean;
export declare class DataField extends SerializableModel implements IDataField {
    static isNumeric(dataField: IDataField): boolean;
    static isDateTime(dataField: IDataField): boolean;
    static olapMarker(): string;
    static isOlap(dataMember: string): boolean;
    static isMeasure(dataField: IDataField): boolean;
    static isOrContainMeasures(dataMember: string): boolean;
    static ifOlapThenOnlyMeasure(dataField: IDataField): boolean;
    static ifOlapThenOnlyDimension(dataField: IDataField): boolean;
    static isContinous(dataField: IDataField): boolean;
    static isOlapHierarchy(dataField: IDataField): boolean;
    defaultNumericFormat: any;
    dataMember: ko.Observable<string>;
    name: ko.Observable<string>;
    childNodes: ko.ObservableArray<DataField>;
    groupIndex: ko.Observable<number>;
    groupDataItems: Array<any>;
    displayName: ko.Observable<string>;
    fieldType: ko.Observable<DataFieldType>;
    nodeType: ko.Observable<DataNodeType>;
    isDataFieldNode: ko.Observable<boolean>;
    isDataMemberNode: ko.Observable<boolean>;
    expanded: boolean;
    isConvertible: ko.Observable<boolean>;
    isComparable: ko.Observable<boolean>;
    hasCalculatedFields: boolean;
    isAggregate: ko.Observable<boolean>;
    isList: ko.Observable<boolean>;
    isCorruptedCalcField: ko.Observable<boolean>;
    isDataSourceNode: ko.Observable<boolean>;
    isDataTableNode: ko.Observable<boolean>;
    isExpressionsNode: ko.Observable<boolean>;
    constructor(dataFieldJSON?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
