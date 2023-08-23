﻿/**
* DevExpress Dashboard (_expression-editor-item-provider.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IDataMemberInfo, IItemsProvider, IPathRequest } from '@devexpress/analytics-core/analytics-utils';
import { IDataFieldsProvider, IDataItemValuesProvider, IDataSourceProvider } from '../../common/_data-source-browser';
import { KnockoutEntry } from '../../model/internal/_knockout-utils';
import { Parameter } from '../../model/parameters/parameter';
export declare class ExpressionEditorItemsProvider implements IItemsProvider {
    private dataFieldsProvider;
    private dataSourceProvider;
    private dataItemValuesProvider;
    private parameters;
    private dataSourceName;
    private dataMember;
    private filterPredicate;
    constructor(dataFieldsProvider: IDataFieldsProvider, dataSourceProvider: IDataSourceProvider, dataItemValuesProvider: IDataItemValuesProvider, parameters: Parameter[], dataSourceName: KnockoutEntry<string>, dataMember: KnockoutEntry<string>, filterPredicate?: (field?: any) => boolean);
    getValues(pathRequest: IPathRequest): JQuery.Promise<IDataMemberInfo[], any, any>;
    getItems(pathRequest: IPathRequest): JQueryPromise<IDataMemberInfo[]>;
}
