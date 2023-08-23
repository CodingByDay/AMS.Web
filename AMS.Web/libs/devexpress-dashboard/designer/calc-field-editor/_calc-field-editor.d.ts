﻿/**
* DevExpress Dashboard (_calc-field-editor.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IDisplayNameProvider, IDisplayedValue, IItemsProvider } from '@devexpress/analytics-core/analytics-utils';
import { IExpressionOptions } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { DataSourceBrowser } from '../../common/_data-source-browser';
import { CalculatedField } from '../../model/data-sources/calculated-field';
export declare class CalcFieldEditor {
    private dataSourceBrowser;
    viewModel: ko.Observable<CalcFieldEditorViewModel>;
    constructor(dataSourceBrowser: DataSourceBrowser);
    canAddCalculatedField(dataSourceName: string): boolean;
    showAddDialog(dataSourceName: string, dataMemberName: string): JQuery.Promise<CalculatedField, any, any>;
    showEditDialog(calculatedField: CalculatedField, dataSourceName: string, dataMemberName: string): JQueryPromise<CalculatedField>;
    removeCalcField(calculatedField: CalculatedField, dataSourceName: string): JQueryPromise<CalculatedField>;
    private show;
}
export declare class CalcFieldEditorViewModel {
    toolbarItems: any[];
    expressionEditable: IExpressionOptions;
    itemsProvider: IItemsProvider;
    displayNameProvider?: IDisplayNameProvider;
    saveHandler?: ko.Observable<(callback: {
        (): void;
    }) => void>;
    getInfo: Function;
    nameValidationRules: Array<any>;
    calculatedField: CalculatedField;
    dataMember: ko.Observable<string>;
    fieldType: ko.Observable<string>;
    availableTypes: IDisplayedValue[];
    name: ko.Observable<string>;
    expression: ko.Observable<string>;
    isCalcFieldNameValid: ko.Observable<boolean>;
    popupVisible: ko.Observable<boolean>;
    onResize: ko.Observable<() => void>;
    resizeAceEditor(): void;
    getKeyLocalizationPair(values: any): IDisplayedValue[];
    constructor(calculatedField: CalculatedField, dataSourceBrowser: DataSourceBrowser, dataSourceName: string, onSave: (calcField: CalculatedField) => void, onBeforeSave?: () => void);
}
