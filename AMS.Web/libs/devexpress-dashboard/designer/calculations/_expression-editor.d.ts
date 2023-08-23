/**
* DevExpress Dashboard (_expression-editor.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ExpressionEditor } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { ExpressionEditorParams, ExpressionEditorViewModel } from '../expression-editor/_expression-editor-utils';
export declare class CalculationExpressionEditor implements ExpressionEditorViewModel<ExpressionEditorWrapper> {
    private params;
    editor: ExpressionEditorWrapper;
    editorTemplate: string;
    criteriaString: ko.Computed<string>;
    constructor(params: ExpressionEditorParams);
    edit(): void;
    remove(): void;
}
export declare class ExpressionEditorWrapper {
    private params;
    viewModel: ko.Observable<ExpressionEditor>;
    constructor(params: ExpressionEditorParams);
    show(): void;
}
