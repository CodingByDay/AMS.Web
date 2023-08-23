﻿/**
* DevExpress Dashboard (parameter.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { TypedSerializableModel } from '../serializable-model';
import { DynamicListLookUpSettings } from './dynamic-list-lookup-settings';
import { LookUpValue } from './look-up-value';
import { StaticListLookUpSettings } from './static-list-lookup-settings';
export interface IQueryParameter {
    name: string;
    value: any;
    type: string;
    allowMultiselect: boolean;
    selectAll: boolean;
}
export declare type LookUpSourceType = 'None' | 'DynamicListLookUpSettings' | 'StaticListLookUpSettings';
export declare function _getParametersQuery(parameters: Parameter[]): IQueryParameter[];
export declare class Parameter extends TypedSerializableModel {
    private _allParameters?;
    static SelectAllValue: string;
    private _patchSerializationsInfo;
    type: ko.Computed<string>;
    parameterVisible: ko.Observable<boolean>;
    description: ko.Observable<string>;
    allowMultiselect: ko.Observable<boolean>;
    allowNull: ko.Observable<boolean>;
    name: ko.Observable<string>;
    defaultValue: ko.Observable<any>;
    _type: ko.Observable<string>;
    lookUpSourceType: ko.Subscribable<LookUpSourceType>;
    defaultValues: ko.ObservableArray<LookUpValue>;
    selectAllValues: ko.Observable<boolean>;
    containsDisplayMember: ko.Computed<boolean>;
    staticListLookUpSettings: ko.Observable<StaticListLookUpSettings>;
    dynamicListLookUpSettings: ko.Observable<DynamicListLookUpSettings>;
    _valuesOfDefaultValues: ko.Computed<string[]>;
    _actualValue: ko.Computed<any>;
    private _paramDialogValue;
    _value: ko.Computed<any>;
    constructor(modelJson?: any, serializer?: ModelSerializer, _allParameters?: ko.ObservableArray<Parameter>);
    _isNameValid: (name: string) => boolean;
    getInfo(): ISerializationInfoArray;
    _resetDefaultValues(): void;
    grabFrom(another: Parameter): void;
    protected _getDefaultItemType(): string;
}
