﻿/**
* DevExpress Dashboard (_object-properties-wrapper.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DxElement } from 'devextreme/core/element';
import dxForm from 'devextreme/ui/form';
import * as ko from 'knockout';
import { DisposableType } from '../../model/disposable-object';
import { FormAdapterItem, PropertyEditorInfo, SimpleFormAdapterItems } from '../../model/metadata/_base-metadata';
export interface WrapperPropertyInfo extends PropertyEditorInfo {
    replacementPropertyName?: string;
    sourceObject?: any;
}
export interface PropertyDesciptors extends Array<PropertyEditorInfo | WrapperPropertyInfo | {
    container: PropertyEditorInfo;
    properties: PropertyDesciptors;
}> {
}
export interface ObjectPropertiesRules {
    [key: string]: Array<any> | ((model: any) => boolean);
}
export interface DynamicEditorInfo {
    simpleFormAdapterItem?: SimpleFormAdapterItems;
    formAdapterItem?: FormAdapterItem;
    editor?: any;
    editorOptions?: Object;
}
export interface IDynamicEditorRules<T> {
    [key: string]: (model: T) => DynamicEditorInfo;
}
export interface ObjectPropertiesInfo<TModel = any> {
    properties: PropertyDesciptors;
    visibilityFilterRules?: ObjectPropertiesRules;
    disabledFilterRules?: ObjectPropertiesRules;
    dynamicEditorRules?: IDynamicEditorRules<TModel>;
    disposableModelSubscriptions?: DisposableType[];
}
export interface ObjectPropertiesWrapperOptions<TModel = any> extends ObjectPropertiesInfo<TModel> {
    model: TModel;
    modelExtention?: any;
    summary?: ko.Computed<string>;
}
export declare class ObjectPropertiesWrapper<TModel = any> {
    private _serializationInfo;
    private _modelSubscriptions;
    model: TModel;
    visibilityFilterRules: ObjectPropertiesRules;
    disabledFilterRules: ObjectPropertiesRules;
    summary: ko.Computed<string>;
    dynamicEditorRules: IDynamicEditorRules<TModel>;
    onContentReady: ((e: {
        component?: dxForm;
        element?: DxElement;
    }) => void);
    onInitialized: ((e: {
        component?: dxForm;
        element?: DxElement;
    }) => void);
    onFieldDataChanged: (e: {
        component?: dxForm;
        element?: DxElement;
        model?: any;
        dataField?: string;
        value?: any;
    }) => any;
    constructor(options: ObjectPropertiesWrapperOptions<TModel>);
    getPropertiesFromContainer(cur: any, properties: PropertyDesciptors): void;
    _validationProvider: dxForm;
    assignValidationPovider(validationProvider: dxForm): void;
    _assignPropertyCore(propertyObject: any, info: PropertyEditorInfo): void;
    addProperty(propertyValue: any, info: PropertyEditorInfo): void;
    getInfo(): PropertyEditorInfo[];
    isEmpty(): boolean;
    isPropertyVisible: (name: string) => boolean;
    isPropertyDisabled: (name: string) => boolean;
    getDynamicEditor: (name: string) => DynamicEditorInfo;
    unbindModel(): void;
}
