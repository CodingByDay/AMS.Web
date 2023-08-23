﻿/**
* DevExpress Dashboard (_filter-expression-editor.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FilterEditor } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { ExpressionEditorViewModel, FilterEditorParams } from './_expression-editor-utils';
export declare class FilterExpressionEditorViewModel implements ExpressionEditorViewModel<FilterEditor> {
    private params;
    editor: FilterEditor;
    editorTemplate: string;
    criteriaString: ko.Observable<string>;
    constructor(params: FilterEditorParams);
    edit(): void;
    remove(): void;
}
