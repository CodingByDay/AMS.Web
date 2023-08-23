﻿/**
* DevExpress Dashboard (_expression-editor-display-name-provider.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IDisplayNameProvider } from '@devexpress/analytics-core/analytics-utils';
import { IDataFieldsProvider, IDataSourceProvider } from '../../common/_data-source-browser';
export declare class ExpressionEditorDisplayNameProvider implements IDisplayNameProvider {
    private _dataFieldsProvider;
    private _dataSourceName;
    private _dataMember;
    static create(dataSourceProvider: IDataSourceProvider, dataFieldsProvider: IDataFieldsProvider, dataSourceName: string, dataMember: string): ExpressionEditorDisplayNameProvider;
    protected constructor(_dataFieldsProvider: IDataFieldsProvider, _dataSourceName: string, _dataMember: string);
    getDisplayNameByPath(dataSourcePath: string, fieldPath: string): JQueryPromise<string>;
    getRealName(dataSourcePath: string, fieldDisplayPath: string): JQueryPromise<string>;
    _getRealNameRecursive(curFieldPath: string, displayNameParts: string[]): JQueryPromise<string>;
}
