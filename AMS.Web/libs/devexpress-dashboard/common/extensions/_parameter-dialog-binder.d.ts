﻿/**
* DevExpress Dashboard (_parameter-dialog-binder.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IParameterValueViewModel, ParametersCollection } from '../../data/_parameters';
import { DisposableObject } from '../../model/disposable-object';
import { DynamicListLookUpSettings } from '../../model/parameters/dynamic-list-lookup-settings';
import { Parameter } from '../../model/parameters/parameter';
export declare class ParameterDialogViewModel extends DisposableObject {
    private _parameters;
    private _getDashboardParameterType;
    private _getParameterValues;
    private _getParameterDefaultValue;
    constructor(_parameters: ko.ObservableArray<Parameter>, getParameterValues: (parameterType: string, settings: DynamicListLookUpSettings) => ko.ObservableArray<IParameterValueViewModel>);
    setParameters: (newParameters: any) => void;
    parameterCollection: ko.Computed<ParametersCollection>;
}
