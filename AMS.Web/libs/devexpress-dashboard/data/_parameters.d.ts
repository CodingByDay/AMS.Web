﻿/**
* DevExpress Dashboard (_parameters.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { DashboardParameter, DashboardParameterCollection } from '../common/parameters-definitions';
interface ParameterViewModel {
    Name: string;
    DefaultValue: any;
    Description: string;
    Type: any;
    Visible: boolean;
    AllowNull: boolean;
    AllowMultiselect: boolean;
    Values: IParameterValueViewModel[];
    ContainsDisplayMember: boolean;
}
export interface IParameterValueViewModel {
    Value: any;
    DisplayText?: any;
}
export declare class Parameter implements DashboardParameter {
    _name: string;
    _value: any;
    _defaultValue: any;
    _description: any;
    _type: any;
    _visible: boolean;
    _allowNull: boolean;
    _allowmultiselect: boolean;
    parameterChanged: JQuery.Callbacks<Function>;
    _values: any;
    constructor(parameterViewModel: ParameterViewModel);
    getName(): string;
    getAllowNull(): boolean;
    getAllowMultiselect(): boolean;
    getValue(): any;
    setValue(value: any): void;
    getDefaultValue(): any;
    getDescription(): any;
    getType(): any;
    getLookUpValues(): any;
    setLookUpValues(values: IParameterValueViewModel[], containsDisplayMember: boolean): void;
    isVisible(): boolean;
}
export declare class ParametersCollection implements DashboardParameterCollection {
    collectionChanged: JQuery.Callbacks<Function>;
    _parameters: Parameter[];
    constructor(parametersViewModel: any);
    updateParameterValues(parametersViewModel: any): void;
    setParameters(newParameters: IParameter[]): void;
    getParameterValues(): IParameter[];
    getParameterDefaultValue(name: any): any;
    getParameterValue(name: any): any;
    setParameterValue(name: any, value: any): void;
    getParameters(): Parameter[];
    getVisibleParameters(): Parameter[];
    getParameterList(): Parameter[];
    getParameterByName(name: string): Parameter;
    getParameterByIndex(index: any): Parameter;
}
export interface IParameter {
    Name: string;
    Value: any;
}
export {};
