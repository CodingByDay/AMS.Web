﻿/**
* DevExpress Dashboard (_expression-editor-utils.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDisplayNameProvider, IItemsProvider } from '@devexpress/analytics-core/analytics-utils';
import { FilterEditor, IExpressionOptions, IFilterEditorOptions } from '@devexpress/analytics-core/analytics-widgets';
import { ExpressionEditorWrapper } from '../calculations/_expression-editor';
import { SimpleFilterEditor } from '../filtering/simple-filter-editor/_simple-filter-editor';
export interface ExpressionEditorViewModel<TEditor = ExpressionEditorWrapper | FilterEditor | SimpleFilterEditor> {
    editor: TEditor;
    editorTemplate: string;
    criteriaString: ko.Observable<string> | ko.Computed<string>;
    edit: () => void;
    remove: () => void;
}
export interface ExpressionEditorParamsBase<TOptions = IFilterEditorOptions | IExpressionOptions> {
    options: ko.Observable<TOptions> | ko.Computed<TOptions>;
    fieldListProvider: ko.Observable<IItemsProvider>;
    displayNameProvider: IDisplayNameProvider;
}
export interface ExpressionEditorParams extends ExpressionEditorParamsBase<IExpressionOptions> {
}
export interface FilterEditorParams extends ExpressionEditorParamsBase<IFilterEditorOptions> {
}
