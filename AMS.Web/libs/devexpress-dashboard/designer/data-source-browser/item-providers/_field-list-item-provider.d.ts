﻿/**
* DevExpress Dashboard (_field-list-item-provider.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IDataMemberInfo, IItemsProvider, IPathRequest } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IDataField } from '../../../model/data-sources/_data-field';
import { IDataSourceBrowserViewModel } from '../_data-source-browser-viewmodel';
export declare class DataFieldViewModel implements IDataMemberInfo {
    name: string;
    displayName: string;
    hasItems: boolean;
    specifics: string;
    field: IDataField;
    isList: boolean;
    isCorruptedCalcField: boolean;
    constructor(name: string, displayName: string, hasItems: boolean, specifics: string, field: IDataField, isList: boolean, isCorruptedCalcField: boolean);
    style: string;
    innerActions: ko.ObservableArray<IDataFieldViewModelAction>;
}
export interface IDataFieldViewModelAction {
    click: () => void;
    icon: string;
    style?: string;
}
export declare class FieldListItemProvider implements IItemsProvider {
    private _dataSourceBrowserViewModel;
    private _getDataFieldArrayCallback;
    private isFieldValid?;
    loading: ko.Observable<boolean>;
    private _changeTrigger;
    constructor(_dataSourceBrowserViewModel: IDataSourceBrowserViewModel, _getDataFieldArrayCallback: (dataSourceName: string, dataMember: string, fieldPath: string) => JQueryPromise<Array<IDataField>>, isFieldValid?: (field: IDataField) => boolean);
    triggerItemsChanged(): void;
    getItems(pathRequest: IPathRequest): JQueryPromise<Array<IDataMemberInfo>>;
    customizeDataFieldViewModel: (dataField: DataFieldViewModel) => void;
}
