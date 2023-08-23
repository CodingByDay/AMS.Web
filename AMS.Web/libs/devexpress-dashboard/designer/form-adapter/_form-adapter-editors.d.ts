﻿/**
* DevExpress Dashboard (_form-adapter-editors.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DxPromise } from 'devextreme/core/utils/deferred';
import { Properties as dxButtonOptions } from 'devextreme/ui/button';
import dxForm from 'devextreme/ui/form';
import { Properties as dxNumberBoxOptions } from 'devextreme/ui/number_box';
import { Properties as dxSelectBoxOptions } from 'devextreme/ui/select_box';
import * as ko from 'knockout';
import { DashboardLocalizationId } from '../../data/localization/_default';
import { FormAdapterItem } from '../../model/metadata/_base-metadata';
import { FormatConditionTypeEditorOptions } from '../conditional-formatting/_condition-type-editor';
import { RuleRangesEditorOptions } from '../conditional-formatting/_rule-ranges-editor';
import { StyleSettingsEditorOptions } from '../conditional-formatting/_style-settings-editor';
import { ExpressionEditorParams, FilterEditorParams } from '../expression-editor/_expression-editor-utils';
import { SimpleFilterExpressionEditorOptions } from '../filtering/simple-filter-editor/_simple-filter-editor-view-model';
import { ContainerTypeSelectorOptions } from '../items/container-type-selector/_container-type-selector';
import { CollectionEditorOptions } from '../ui-widgets/collection-editor/_collection-editor-viewmodel';
import { EditableListEditorOptions } from '../ui-widgets/collection-editor/_editable-list-editor-viewmodel';
import { InlineEditCollectionEditorOptions } from '../ui-widgets/collection-editor/_inline-edit-collection-editor-viewmodel';
export declare type dxFormTemplateArgs = {
    component?: dxForm;
    dataField?: string;
    editorOptions?: any;
    editorType?: string;
    name?: string;
};
export declare function getFieldValue(args: dxFormTemplateArgs): any;
export declare type FormAdapterEditor<T = void> = (options: T) => FormAdapterItem;
export declare const dateBoxEditor: FormAdapterEditor;
export declare const colorBoxEditor: FormAdapterEditor;
export declare const numberBoxEditor: FormAdapterEditor<dxNumberBoxOptions | void>;
export declare const checkBoxEditor: FormAdapterEditor<{
    text?: string;
}>;
export declare const textBoxEditor: FormAdapterEditor;
export declare const guidEditor: FormAdapterEditor;
export declare const selectBoxEditor: FormAdapterEditor<Array<{
    value: any;
    displayValueId: DashboardLocalizationId;
}>>;
export declare type SelectBoxValues = Array<{
    value: any;
    displayValue: string;
}>;
export declare type LocalizableSelectBoxValues = Array<{
    value: any;
    displayValueId: string | DashboardLocalizationId;
}>;
export declare type observableSelectBoxEditorOptions<T> = {
    observables: {
        [K in keyof T]: ko.Subscribable<T[K]>;
    };
    load: (args: T) => DxPromise<SelectBoxValues> | SelectBoxValues;
} & selectBoxEditorOptions;
export declare type dynamicSelectBoxEditorOptions = {
    values: ko.Subscribable<LocalizableSelectBoxValues>;
} & selectBoxEditorOptions;
export declare type selectBoxEditorOptions = {
    additionalOptions?: () => dxSelectBoxOptions;
    comparableEditorOptions?: string[];
};
export declare function dynamicSelectBoxEditor(options: dynamicSelectBoxEditorOptions): FormAdapterItem;
export declare function observableSelectBoxEditor<T>(options: observableSelectBoxEditorOptions<T>): FormAdapterItem;
export declare const buttonGroupEditor: FormAdapterEditor<Array<{
    value: any;
    displayValueId: DashboardLocalizationId;
}>>;
export declare const listEditor: FormAdapterEditor<Array<{
    value: any;
    displayValueId: DashboardLocalizationId;
}>>;
export declare const editableListEditor: FormAdapterEditor<EditableListEditorOptions<any>>;
export declare const collectionEditor: FormAdapterEditor<CollectionEditorOptions<any>>;
export declare const inlineEditCollectionEditor: FormAdapterEditor<InlineEditCollectionEditorOptions<any>>;
export declare const textPreviewEditor: FormAdapterEditor<{
    target: ko.Subscribable<string>;
}>;
export declare const actionButtons: FormAdapterEditor<dxButtonOptions[]>;
export declare const flagsEnumListEditor: FormAdapterEditor<{
    values: Array<{
        value: any;
        displayValueId: DashboardLocalizationId;
    }>;
    enumDeclaration: any;
}>;
export declare const flagsEnumTagBoxEditor: FormAdapterEditor<{
    values: Array<{
        value: any;
        displayValueId: DashboardLocalizationId;
    }>;
    enumDeclaration: any;
}>;
export declare const currencyEditor: FormAdapterEditor;
export declare const iconTypeEditor: FormAdapterEditor<ContainerTypeSelectorOptions>;
declare type nullableNumberBoxEditorOptions = {
    defaultValue?: number;
    editorOptions?: dxNumberBoxOptions;
};
export declare const nullableNumberBoxEditor: FormAdapterEditor<nullableNumberBoxEditorOptions>;
export declare const flowModeSettingsEditor: FormAdapterEditor;
export declare const calculationExpressionEditor: FormAdapterEditor<ExpressionEditorParams>;
export declare const filterEditor: FormAdapterEditor<FilterEditorParams>;
export declare const simpleFilterEditor: FormAdapterEditor<SimpleFilterExpressionEditorOptions>;
declare type filePickerEditorOptions = {
    type: 'img' | 'file';
    accept: string;
    showClearButton?: boolean;
    placeholderId?: 'Image' | DashboardLocalizationId;
    readMode?: 'text';
};
export declare const filePickerEditor: FormAdapterEditor<filePickerEditorOptions>;
export declare const nestedPropertyGridEditor: FormAdapterEditor<string>;
export declare const ruleRangesEditor: FormAdapterEditor<RuleRangesEditorOptions>;
export declare const styleSettingsEditor: FormAdapterEditor<StyleSettingsEditorOptions>;
export declare const conditionTypeEditor: FormAdapterEditor<FormatConditionTypeEditorOptions>;
export {};
