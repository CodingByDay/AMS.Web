﻿/**
* DevExpress Dashboard (_expression-editor.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDisplayNameProvider, IItemsProvider } from '@devexpress/analytics-core/analytics-utils';
import { ExpressionEditor, IExpressionOptions } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
export declare class DashboardExpressionEditor extends ExpressionEditor {
    constructor(options: IExpressionOptions, fieldListProvider: ko.Observable<IItemsProvider>, displayNameProvider: IDisplayNameProvider, saveHandler?: ko.Observable<(callback: {
        (): void;
    }) => void>, disabled?: ko.Observable<boolean>);
    focus(): void;
}
