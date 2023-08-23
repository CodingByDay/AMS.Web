﻿/**
* DevExpress Dashboard (_parameter-list-editor-viewmodel.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DataSourceBrowser } from '../../common/_data-source-browser';
import { Dashboard } from '../../model/dashboard';
import { DisposableObject } from '../../model/disposable-object';
import { Parameter } from '../../model/parameters/parameter';
import { ParameterEditorViewModel } from './_parameter-editor-viewmodel';
export declare class ParameterListEditorViewModel extends DisposableObject {
    dashboard: ko.Computed<Dashboard>;
    private _dataSourceBrowserGetter?;
    constructor(dashboard: ko.Computed<Dashboard>, _dataSourceBrowserGetter?: () => DataSourceBrowser);
    initialize(): void;
    selectedParameters: ko.Observable<Parameter[]>;
    selectedParameter: ko.Computed<Parameter>;
    parameterEditorViewModel: ko.Observable<ParameterEditorViewModel>;
    allowReordering: ko.Observable<boolean>;
    toggleReordering: () => void;
    addParameter: () => void;
    removeParameter: () => void;
    reorderParameters: (e: any) => void;
}
