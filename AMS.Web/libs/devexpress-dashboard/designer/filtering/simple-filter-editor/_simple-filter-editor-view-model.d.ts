﻿/**
* DevExpress Dashboard (_simple-filter-editor-view-model.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { DataDashboardItem } from '../../../model';
import { ExpressionEditorViewModel } from '../../expression-editor/_expression-editor-utils';
import { SimpleFilterEditor } from './_simple-filter-editor';
export interface SimpleFilterExpressionEditorOptions {
    dashboardItem: DataDashboardItem;
    dataSourceBrowser: DataSourceBrowser;
}
export declare class SimpleFilterExpressionEditorViewModel implements ExpressionEditorViewModel<SimpleFilterEditor> {
    private options;
    editor: SimpleFilterEditor;
    editorTemplate: string;
    criteriaString: ko.Computed<string>;
    constructor(options: SimpleFilterExpressionEditorOptions);
    edit(): void;
    remove(): void;
}
