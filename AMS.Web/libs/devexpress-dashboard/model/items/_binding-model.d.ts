﻿/**
* DevExpress Dashboard (_binding-model.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IFieldConstraint } from '../../common/_data-source-browser';
import { AcceptableShapingType, DataItem } from '../data-item/data-item';
import { IDataField } from '../data-sources/_data-field';
import { DataFieldType } from '../enums';
import { IBindingProperty } from './binding-property';
export interface IBindingModelProvider {
    name?: ko.Observable<string>;
    _getBindingModel(): Array<ConstrainedBindingProperty>;
    _displayNameSeparator?: string;
    _getContainerType(): string;
    grabFrom?: (container: any) => void;
}
export interface ConstrainedBindingProperty extends IBindingProperty {
    fieldConstraint?: IFieldConstraint;
}
export interface ICollectionBindingProperty extends ConstrainedBindingProperty {
    creator?: (type?: string, ...args: any[]) => any;
    containersMap?: any;
}
export interface IDataItemProvider {
    _getDataItem: (uniqueName: string) => DataItem;
    _getFinalDataType(dataItemId: string): DataFieldType;
    _createDataItem(dataInfo: IDataField, binding: IBindingProperty): DataItem;
    _updateDataItem(dataItem: DataItem, binding: IBindingProperty, dataField: IDataField, acceptableShapingType: AcceptableShapingType): void;
    _removeDataItem(dataItem: DataItem): void;
    _attachDataItem(targetObject: any, linkPropertyName: string): any;
}
export declare let _areTheSameBindingProviders: (a: IBindingModelProvider, b: IBindingModelProvider) => false | ConstrainedBindingProperty;
