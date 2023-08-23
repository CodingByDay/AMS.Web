﻿/**
* DevExpress Dashboard (_base-metadata.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jqueryui" />
import { IModelSerializer, ISerializableModelConstructor, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import { DxElement } from 'devextreme/core/element';
import { template } from 'devextreme/core/templates/template';
import dxForm, { SimpleItem as dxFormSimpleItem } from 'devextreme/ui/form';
import { AsyncRule, CompareRule, CustomRule, EmailRule, NumericRule, PatternRule, RangeRule, RequiredRule, StringLengthRule } from 'devextreme/ui/validation_rules';
import * as ko from 'knockout';
import { DashboardLocalizationId } from '../../data/localization/_default';
import { DisposableType } from '../disposable-object';
export declare type IDashboardSerializationInfoArray = Array<IDashboardSerializationInfo>;
export declare let NotSupportedProperty: string;
export declare type DevExtremeValidationRules = Array<RequiredRule | NumericRule | RangeRule | StringLengthRule | CustomRule | CompareRule | PatternRule | EmailRule | AsyncRule>;
export interface FormAdapterContext {
    bindingContext: ko.BindingContext;
    widgetContainer: HTMLElement;
}
export interface FormAdapterItemOptions {
    editorOptions?: Object;
    comparableEditorOptions?: string[];
    editorType?: 'dxAutocomplete' | 'dxCalendar' | 'dxCheckBox' | 'dxColorBox' | 'dxDateBox' | 'dxDropDownBox' | 'dxHtmlEditor' | 'dxLookup' | 'dxNumberBox' | 'dxRadioGroup' | 'dxRangeSlider' | 'dxSelectBox' | 'dxSlider' | 'dxSwitch' | 'dxTagBox' | 'dxTextArea' | 'dxTextBox';
    customEditorType?: string;
    template?: template | ((data: {
        component?: dxForm;
        dataField?: string;
        editorOptions?: any;
        editorType?: string;
        name?: string;
    }, itemElement: DxElement) => string | Element | JQuery);
    label?: {
        text?: string;
        visible?: boolean;
    };
    validationRules?: DevExtremeValidationRules;
}
export declare type FormAdapterItem = FormAdapterItemOptions | ((context: FormAdapterContext) => FormAdapterItemOptions);
export interface PropertyEditorInfo {
    propertyName: string;
    displayName?: DashboardLocalizationId;
    values?: {
        [key: string]: DashboardLocalizationId;
    };
    simpleFormAdapterItem?: SimpleFormAdapterItems;
    formAdapterItem?: FormAdapterItem;
    dxFormItem?: dxFormSimpleItem;
    externalUpdateCallback?: (formUpdateHandler: ({ forceValidate: boolean }: {
        forceValidate: any;
    }) => void) => DisposableType;
    validateBeforeSet?: boolean;
    validationRules?: Array<any>;
    valuesArray?: Array<{
        value: any;
        displayValue: DashboardLocalizationId | string;
    }>;
    editorOptions?: Object;
}
export interface PropertySerializationInfo {
    propertyName: string;
    modelName?: string;
    defaultVal?: any;
    type?: ISerializableModelConstructor;
    info?: ISerializationInfoArray;
    from?: (val: any, serializer?: IModelSerializer) => any;
    toJsonObject?: any;
    array?: boolean;
    alwaysSerialize?: boolean;
    isTwoWay?: boolean;
    category?: PropertyCategory;
}
export interface IDashboardSerializationInfo extends PropertySerializationInfo, PropertyEditorInfo {
}
export interface ITypedDashboardSerializationInfo<T> extends IDashboardSerializationInfo {
    propertyName: Extract<keyof T, string>;
}
export declare enum PropertyCategory {
    ClientState = 0,
    Data = 1,
    Interactivity = 2,
    ViewModel = 3,
    Map = 4,
    Initialize = 5,
    Coloring = 6,
    NoUpdate = 7,
    NoUpdateByObservableValue = 8
}
export declare type SimpleFormAdapterItems = 'textBoxEditor' | 'numberBoxEditor' | 'dateBoxEditor' | 'colorBoxEditor' | 'checkBoxEditor' | 'selectBoxEditor' | 'guidEditor' | 'listEditor' | 'buttonGroupEditor' | 'onOffButtonGroupEditor' | 'yesNoButtonGroupEditor' | 'discreteContinuousButtonGroupEditor';
export declare function parseBool(value: any): ko.Observable<any>;
export declare function floatFromModel(value: string): ko.Observable<number>;
export declare function fromStringToDate(val: string): ko.Observable<Date>;
export declare function fromDateToString(date: Date): string;
export declare function nullableFloatToModel(value: any): {};
export declare let integerValidationRule: {
    type: string;
    validationCallback: (e: any) => boolean;
};
export declare let itemType: IDashboardSerializationInfo;
export declare let componentName: IDashboardSerializationInfo;
export declare let url: IDashboardSerializationInfo;
export declare let name: IDashboardSerializationInfo;
export declare let name_ViewModel: IDashboardSerializationInfo;
export declare let nameTag: IDashboardSerializationInfo;
export declare let dataMember: IDashboardSerializationInfo;
export declare let filter: IDashboardSerializationInfo;
export declare let contentArrangementMode: IDashboardSerializationInfo;
export declare let contentLineCount: IDashboardSerializationInfo;
export declare let BindingSectionTitles: {
    Arguments: string;
    SingleArgument: string;
    SeriesDimension: string;
};
export declare let columnsPropertyName: string;
export declare let rowsPropertyName: string;
export declare let argumentsPropertyName: string;
export declare let valuesPropertyName: string;
export declare let argumentPropertyName: string;
export declare let valuePropertyName: string;
export declare let actualValuePropertyName: string;
export declare let targetValuePropertyName: string;
export declare let sparklineArgumentPropertyName: string;
export declare let weightPropertyName: string;
export declare let colorPropertyName: string;
