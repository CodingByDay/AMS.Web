﻿/**
* DevExpress Dashboard (_parameters-dialog.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import 'devextreme/ui/check_box';
import dxCheckBox from 'devextreme/ui/check_box';
import dxDataGrid, { Column as dxDataGridColumn } from 'devextreme/ui/data_grid';
import Widget from 'devextreme/ui/widget/ui.widget';
import { DashboardParameterLookUpValue } from '../../../common/parameters-definitions';
import { IParameter, Parameter, ParametersCollection } from '../../../data/_parameters';
import { ParameterDialogContent } from './parameters-dialog-content';
import { dialogForm } from './_dialog-form';
export declare let parameterTypes: {
    string: string;
    int: string;
    float: string;
    bool: string;
    dateTime: string;
    selector: string;
    multiselector: string;
    guid: string;
};
export declare class parametersDialog {
    options: ParametersDialogOptions;
    getParametersCollection: () => ParametersCollection;
    submitParameters: any;
    dialogForm: dialogForm;
    valueChanged: JQuery.Callbacks<Function>;
    _dataGrid: dxDataGrid;
    setActualState: () => void;
    submitParameterValues: () => void;
    resetParameterValues: () => void;
    constructor(options: ParametersDialogOptions);
    _initialize(): void;
    _disposeGrid(): void;
    appendNullGridColumn(gridColumns: Array<dxDataGridColumn>): void;
    allowNullColumn(): any;
    createNullColumn(): dxDataGridColumn;
    createGridColumns(): Array<dxDataGridColumn>;
    private _generateContent;
    generateContent(element: HTMLElement, disposeCallback?: () => void): ParameterDialogContent;
    show(): void;
    hide(): void;
    dispose(): void;
    _getParameterEntity(parameter: Parameter, controlCreationCallbacks: any): ParameterEntity;
}
export interface ParameterEntityOptions {
    name: string;
    type: any;
    description?: any;
    defaultValue: any;
    value: any;
    lookUpValues: Array<any>;
    allowNull: boolean;
    allowMultiselect: boolean;
    createControl: (element: HTMLElement) => Widget<any>;
    valueName: any;
    controlCreationCallbacks: JQueryCallback;
}
export declare class ParameterEntity {
    name: string;
    type: any;
    description: any;
    defaultValue: any;
    value: any;
    lookUpValues: any[];
    allowNull: boolean;
    allowMultiselect: boolean;
    createControl: (element: HTMLElement) => Widget<any>;
    valueName: any;
    controlCreationCallbacks: any;
    divValueEditor: HTMLElement;
    divAllowNull: HTMLElement;
    allowNullControl: dxCheckBox;
    control: Widget<any>;
    valueChanged: JQuery.Callbacks<Function>;
    dispose(): void;
    constructor(options: ParameterEntityOptions);
    getValue(): any;
    setValue(value: any): void;
    setLookUpValues(values: DashboardParameterLookUpValue[]): void;
    wrapParameter(): {
        Name: string;
        Value: any;
    };
    _addControl(): void;
}
export interface ParametersDialogOptions {
    parametersDialogContainer: HTMLElement;
    getParametersCollection: () => ParametersCollection;
    submitParameters: (newParameters: IParameter[]) => void;
    onShowing?: (args: any) => void;
    onShown?: (args: any) => void;
    onHidden?: (args: any) => void;
}
