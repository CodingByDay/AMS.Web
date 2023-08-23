﻿/**
* DevExpress Dashboard (_parameter-editor-viewmodel.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DataSourceBrowser } from '../../common/_data-source-browser';
import { DisposableObject } from '../../model/disposable-object';
import { DynamicListLookUpSettings } from '../../model/parameters/dynamic-list-lookup-settings';
import { Parameter } from '../../model/parameters/parameter';
import { StaticListLookUpSettings } from '../../model/parameters/static-list-lookup-settings';
import { ObjectPropertiesWrapper } from '../form-adapter/_object-properties-wrapper';
export declare class ParameterEditorViewModel extends DisposableObject {
    parameter: Parameter;
    private _dataSourceBrowserGetter?;
    get dataSourceBrowser(): DataSourceBrowser;
    commonParameterSettings: ObjectPropertiesWrapper;
    lookUpParameterType: ObjectPropertiesWrapper;
    staticListLookUpSettings: ko.Computed<ObjectPropertiesWrapper>;
    dynamicListLookUpSettings: ko.Computed<ObjectPropertiesWrapper>;
    constructor(parameter: Parameter, _dataSourceBrowserGetter?: () => DataSourceBrowser, isNameValid?: (string: any) => boolean);
    _getStaticListLookUpSettingsWrapper(staticListLookUpSettings: StaticListLookUpSettings, parameterType: string): ObjectPropertiesWrapper<StaticListLookUpSettings>;
    _getDynamicListLookUpSettingsWrapper(dynamicListLookUpSettings: DynamicListLookUpSettings): ObjectPropertiesWrapper<DynamicListLookUpSettings>;
    _getCommonParameterSettingsWrapper(parameter: Parameter, isNameValid: (string: any) => boolean): ObjectPropertiesWrapper<Parameter>;
}
