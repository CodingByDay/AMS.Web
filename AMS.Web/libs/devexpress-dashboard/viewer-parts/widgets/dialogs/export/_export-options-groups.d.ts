﻿/**
* DevExpress Dashboard (_export-options-groups.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { Properties as dxCheckBoxOptions } from 'devextreme/ui/check_box';
import { Properties as dxNumberBoxOptions } from 'devextreme/ui/number_box';
import { Properties as dxRadioGroupOptions } from 'devextreme/ui/radio_group';
import { Properties as dxSelectBoxOptions } from 'devextreme/ui/select_box';
import { Properties as dxTextBoxOptions } from 'devextreme/ui/text_box';
import Widget from 'devextreme/ui/widget/ui.widget';
import { DashboardExcelFormat } from '../../../export-options';
import { IExportOptions } from '../../../_export-options';
export declare type ControlCreator = {
    name: string;
    create: (element: HTMLElement, options: Object) => Widget<any>;
};
declare type ElementMargin = 'Large' | 'Medium' | 'Small';
export interface LabeledEditorOptions {
    controlCreator: ControlCreator;
    labelText: string;
    controlOptions?: dxTextBoxOptions | dxCheckBoxOptions | dxNumberBoxOptions | dxRadioGroupOptions | dxSelectBoxOptions;
    customText?: boolean;
    margin?: ElementMargin;
    values?: Array<any>;
}
export declare class labeledEditor {
    _options: LabeledEditorOptions;
    private _editor;
    private _valueName;
    enabled: boolean;
    labelDiv: HTMLElement;
    editorDiv: HTMLElement;
    get margin(): ElementMargin;
    constructor(options: LabeledEditorOptions);
    _initialize(): void;
    setEnabled(enabled: any): void;
    setVisibility(visible: any): void;
    set(value: any): void;
    get(): any;
    dispose(): void;
    _getControlOptions(options: LabeledEditorOptions): any;
    _generateElementNameClassName(controlCreator: string, largeMargin: boolean): string;
    _getElementClassName(controlName: string, largeMargin: boolean): string;
}
export declare abstract class optionsGroup {
    enabled: boolean;
    _additionalOptions: {
        popupContainer: HTMLElement;
    };
    constructor();
    abstract set(documentInfo: IExportOptions): any;
    abstract apply(documentInfo: IExportOptions): any;
    abstract getEditors(captionEditors?: any): labeledEditor[];
    abstract _initialize(): any;
    setEnabled(enabled: any): void;
    createEditors(additionalOptions: any): void;
    dispose(): void;
}
export declare class dashboardStateOptionsGroup extends optionsGroup {
    exportFilters: labeledEditor;
    exportParameters: labeledEditor;
    dashboardStatePosition: labeledEditor;
    constructor();
    _initialize(): void;
    set(documentInfo: IExportOptions): void;
    apply(documentInfo: IExportOptions): void;
    getEditors(): labeledEditor[];
}
export declare class captionOptionsGroup extends optionsGroup {
    private _showCaptionValue;
    showCaption: labeledEditor;
    caption: labeledEditor;
    constructor(_showCaptionValue: any);
    _initialize(): void;
    set(documentInfo: IExportOptions): void;
    apply(documentInfo: IExportOptions): void;
    getEditors(): labeledEditor[];
}
export declare class scaleModeOptionsGroup extends optionsGroup {
    private _scaleModeValue;
    scaleMode: labeledEditor;
    scaleFactor: labeledEditor;
    autoFitPageCount: labeledEditor;
    visibilityUpdated: JQuery.Callbacks<Function>;
    constructor(_scaleModeValue: any);
    _initialize(): void;
    set(documentInfo: IExportOptions): void;
    apply(documentInfo: IExportOptions): void;
    getEditors(): labeledEditor[];
    _setScaleModeOptionsVisibility(scaleModeValue: any): void;
}
export declare class documentOptionsGroup extends optionsGroup {
    private _includeCaptionValue;
    pageLayout: labeledEditor;
    paperKind: labeledEditor;
    captionOptionsGroup: captionOptionsGroup;
    constructor(_includeCaptionValue: any);
    _initialize(): void;
    createEditors(additionalOptions: any): void;
    set(documentInfo: IExportOptions): void;
    apply(documentInfo: IExportOptions): void;
    getEditors(): labeledEditor[];
}
export declare class textItemOptionsGroup extends optionsGroup {
    private _showCaptionValue;
    fileName: labeledEditor;
    documentOptionsGroup: documentOptionsGroup;
    dashboardStateOptionsGroup: dashboardStateOptionsGroup;
    constructor(_showCaptionValue: any);
    _initialize(): void;
    createEditors(additionalOptions: any): void;
    set(documentInfo: IExportOptions): void;
    apply(documentInfo: IExportOptions): void;
    getEditors(): labeledEditor[];
}
export declare class boundImageItemOptionsGroup extends optionsGroup {
    private _showCaptionValue;
    private _scaleModeValue;
    fileName: labeledEditor;
    documentOptionsGroup: documentOptionsGroup;
    scaleModeOptionsGroup: scaleModeOptionsGroup;
    dashboardStateOptionsGroup: dashboardStateOptionsGroup;
    constructor(_showCaptionValue: any, _scaleModeValue: any);
    _initialize(): void;
    createEditors(additionalOptions: any): void;
    set(documentInfo: IExportOptions): void;
    apply(documentInfo: IExportOptions): void;
    getEditors(): labeledEditor[];
}
export declare class imageItemOptionsGroup extends optionsGroup {
    private _showCaptionValue;
    private _scaleModeValue;
    pageLayout: labeledEditor;
    paperKind: labeledEditor;
    showCaption: labeledEditor;
    caption: labeledEditor;
    fileName: labeledEditor;
    scaleModeOptionsGroup: scaleModeOptionsGroup;
    constructor(_showCaptionValue: any, _scaleModeValue: any);
    _initialize(): void;
    createEditors(additionalOptions: any): void;
    set(documentInfo: IExportOptions): void;
    apply(documentInfo: IExportOptions): void;
    getEditors(): labeledEditor[];
}
export declare class groupItemOptionsGroup extends optionsGroup {
    private _showCaptionValue;
    private _dashboardAutomaticPageLayoutValue;
    private _scaleModeValue;
    dashboardOptionsGroup: dashboardOptionsGroup;
    captionOptionsGroup: captionOptionsGroup;
    dashboardStateOptionsGroup: dashboardStateOptionsGroup;
    constructor(_showCaptionValue: any, _dashboardAutomaticPageLayoutValue: any, _scaleModeValue: any);
    _initialize(): void;
    createEditors(additionalOptions: any): void;
    set(documentInfo: IExportOptions): void;
    apply(documentInfo: IExportOptions): void;
    getEditors(): labeledEditor[];
}
export declare class customItemOptionsGroup extends optionsGroup {
    private _showCaptionValue;
    private _dashboardAutomaticPageLayoutValue;
    private _scaleModeValue;
    dashboardOptionsGroup: dashboardOptionsGroup;
    captionOptionsGroup: captionOptionsGroup;
    dashboardStateOptionsGroup: dashboardStateOptionsGroup;
    constructor(_showCaptionValue: any, _dashboardAutomaticPageLayoutValue: any, _scaleModeValue: any);
    _initialize(): void;
    createEditors(additionalOptions: any): void;
    set(documentInfo: IExportOptions): void;
    apply(documentInfo: IExportOptions): void;
    getEditors(): labeledEditor[];
}
export declare class entireDashboardOptionsGroup extends optionsGroup {
    private _showTitleValue;
    private _dashboardAutomaticPageLayoutValue;
    private _scaleModeValue;
    showTitle: labeledEditor;
    title: labeledEditor;
    dashboardOptionsGroup: dashboardOptionsGroup;
    dashboardStateOptionsGroup: dashboardStateOptionsGroup;
    constructor(_showTitleValue: any, _dashboardAutomaticPageLayoutValue: any, _scaleModeValue: any);
    _initialize(): void;
    createEditors(additionalOptions: any): void;
    set(documentInfo: IExportOptions): void;
    apply(documentInfo: IExportOptions): void;
    getEditors(): labeledEditor[];
}
export declare class dashboardOptionsGroup extends optionsGroup {
    private _dashboardAutomaticPageLayoutValue;
    private _scaleModeValue;
    pageLayout: labeledEditor;
    paperKind: labeledEditor;
    fileName: labeledEditor;
    scaleModeOptionsGroup: scaleModeOptionsGroup;
    constructor(_dashboardAutomaticPageLayoutValue: any, _scaleModeValue: any);
    _initialize(): void;
    createEditors(additionalOptions: any): void;
    set(documentInfo: IExportOptions): void;
    apply(documentInfo: IExportOptions): void;
    getEditors(captionEditors: any): labeledEditor[];
    _setScaleModeOptionsVisibility(pageLayoutValue: any): void;
}
export declare class gridOptionsGroup extends optionsGroup {
    private _includeCaptionValue;
    private _fitToPageWidthValue;
    private _scaleModeValue;
    printHeadersOnEveryPage: labeledEditor;
    fitToPageWidth: labeledEditor;
    fileName: labeledEditor;
    documentOptionsGroup: documentOptionsGroup;
    scaleModeOptionsGroup: scaleModeOptionsGroup;
    dashboardStateOptionsGroup: dashboardStateOptionsGroup;
    constructor(_includeCaptionValue: any, _fitToPageWidthValue: any, _scaleModeValue: any);
    _initialize(): void;
    createEditors(additionalOptions: any): void;
    set(documentInfo: IExportOptions): void;
    apply(documentInfo: IExportOptions): void;
    getEditors(): any[];
    _setScaleModeOptionsVisibility(fitToPageWidth: any): void;
}
export declare class pivotOptionsGroup extends optionsGroup {
    private _includeCaptionValue;
    private _scaleModeValue;
    printHeadersOnEveryPage: labeledEditor;
    fileName: labeledEditor;
    documentOptionsGroup: documentOptionsGroup;
    scaleModeOptionsGroup: scaleModeOptionsGroup;
    dashboardStateOptionsGroup: dashboardStateOptionsGroup;
    constructor(_includeCaptionValue: any, _scaleModeValue: any);
    _initialize(): void;
    createEditors(additionalOptions: any): void;
    set(documentInfo: IExportOptions): void;
    apply(documentInfo: IExportOptions): void;
    getEditors(): any[];
}
export declare class chartOptionsGroup extends optionsGroup {
    private _includeCaptionValue;
    pageLayout: labeledEditor;
    paperKind: labeledEditor;
    sizeMode: labeledEditor;
    fileName: labeledEditor;
    captionOptionsGroup: captionOptionsGroup;
    dashboardStateOptionsGroup: dashboardStateOptionsGroup;
    constructor(_includeCaptionValue: any);
    _initialize(): void;
    createEditors(additionalOptions: any): void;
    set(documentInfo: IExportOptions): void;
    apply(documentInfo: IExportOptions): void;
    getEditors(): labeledEditor[];
}
export declare class mapOptionsGroup extends optionsGroup {
    private _includeCaptionValue;
    pageLayout: labeledEditor;
    paperKind: labeledEditor;
    sizeMode: labeledEditor;
    fileName: labeledEditor;
    captionOptionsGroup: captionOptionsGroup;
    dashboardStateOptionsGroup: dashboardStateOptionsGroup;
    constructor(_includeCaptionValue: any);
    _initialize(): void;
    createEditors(additionalOptions: any): void;
    set(documentInfo: IExportOptions): void;
    apply(documentInfo: IExportOptions): void;
    getEditors(): labeledEditor[];
}
export declare class treemapOptionsGroup extends optionsGroup {
    private _includeCaptionValue;
    pageLayout: labeledEditor;
    paperKind: labeledEditor;
    sizeMode: labeledEditor;
    fileName: labeledEditor;
    captionOptionsGroup: captionOptionsGroup;
    dashboardStateOptionsGroup: dashboardStateOptionsGroup;
    constructor(_includeCaptionValue: any);
    _initialize(): void;
    createEditors(additionalOptions: any): void;
    set(documentInfo: IExportOptions): void;
    apply(documentInfo: IExportOptions): void;
    getEditors(): labeledEditor[];
}
export declare class rangeFilterOptionsGroup extends optionsGroup {
    private _includeCaptionValue;
    pageLayout: labeledEditor;
    paperKind: labeledEditor;
    sizeMode: labeledEditor;
    fileName: labeledEditor;
    captionOptionsGroup: captionOptionsGroup;
    dashboardStateOptionsGroup: dashboardStateOptionsGroup;
    constructor(_includeCaptionValue: any);
    _initialize(): void;
    createEditors(additionalOptions: any): void;
    set(documentInfo: IExportOptions): void;
    apply(documentInfo: IExportOptions): void;
    getEditors(): labeledEditor[];
}
export declare class pieOptionsGroup extends optionsGroup {
    private _includeCaptionValue;
    private _autoArrangeContentValue;
    private _scaleModeValue;
    autoArrangeContent: labeledEditor;
    fileName: labeledEditor;
    documentOptionsGroup: documentOptionsGroup;
    scaleModeOptionsGroup: scaleModeOptionsGroup;
    dashboardStateOptionsGroup: dashboardStateOptionsGroup;
    constructor(_includeCaptionValue: any, _autoArrangeContentValue: any, _scaleModeValue: any);
    _initialize(): void;
    createEditors(additionalOptions: any): void;
    set(documentInfo: IExportOptions): void;
    apply(documentInfo: IExportOptions): void;
    getEditors(): any[];
    _setScaleModeOptionsVisibility(autoArrangeContent: any): void;
}
export declare class gaugeOptionsGroup extends optionsGroup {
    private _includeCaptionValue;
    private _autoArrangeContentValue;
    private _scaleModeValue;
    autoArrangeContent: labeledEditor;
    fileName: labeledEditor;
    documentOptionsGroup: documentOptionsGroup;
    scaleModeOptionsGroup: scaleModeOptionsGroup;
    dashboardStateOptionsGroup: dashboardStateOptionsGroup;
    constructor(_includeCaptionValue: any, _autoArrangeContentValue: any, _scaleModeValue: any);
    _initialize(): void;
    createEditors(additionalOptions: any): void;
    set(documentInfo: IExportOptions): void;
    apply(documentInfo: IExportOptions): void;
    getEditors(): any[];
    _setScaleModeOptionsVisibility(autoArrangeContent: any): void;
}
export declare class cardOptionsGroup extends optionsGroup {
    private _includeCaptionValue;
    private _autoArrangeContentValue;
    private _scaleModeValue;
    autoArrangeContent: labeledEditor;
    fileName: labeledEditor;
    documentOptionsGroup: documentOptionsGroup;
    scaleModeOptionsGroup: scaleModeOptionsGroup;
    dashboardStateOptionsGroup: dashboardStateOptionsGroup;
    constructor(_includeCaptionValue: any, _autoArrangeContentValue: any, _scaleModeValue: any);
    _initialize(): void;
    createEditors(additionalOptions: any): void;
    set(documentInfo: IExportOptions): void;
    apply(documentInfo: IExportOptions): void;
    getEditors(): any[];
    _setScaleModeOptionsVisibility(autoArrangeContent: any): void;
}
export declare class imageOptionsGroup extends optionsGroup {
    private _showTitleValue;
    imageFormat: labeledEditor;
    showTitle: labeledEditor;
    title: labeledEditor;
    exportFilters: labeledEditor;
    exportParameters: labeledEditor;
    resolution: labeledEditor;
    fileName: labeledEditor;
    constructor(_showTitleValue: any);
    _initialize(): void;
    set(documentInfo: IExportOptions): void;
    apply(documentInfo: IExportOptions): void;
    getEditors(): labeledEditor[];
}
export declare class dashboardExcelOptionsGroup extends optionsGroup {
    private _formatValue;
    excelFormat: labeledEditor;
    exportFilters: labeledEditor;
    exportParameters: labeledEditor;
    dashboardStatePosition: labeledEditor;
    fileName: labeledEditor;
    constructor(_formatValue: any);
    _checkExportFormat(format: any): boolean;
    _initialize(): void;
    set(documentInfo: IExportOptions): void;
    apply(documentInfo: IExportOptions): void;
    getEditors(): labeledEditor[];
}
export declare class excelOptionsGroup extends optionsGroup {
    private _formatValue;
    private _enableCsv;
    excelFormat: labeledEditor;
    separator: labeledEditor;
    exportFilters: labeledEditor;
    exportParameters: labeledEditor;
    dashboardStatePosition: labeledEditor;
    fileName: labeledEditor;
    constructor(_formatValue: DashboardExcelFormat, _enableCsv: boolean);
    _checkExportFormat(format: any): boolean;
    _initialize(): void;
    set(documentInfo: IExportOptions): void;
    apply(documentInfo: IExportOptions): void;
    getEditors(): labeledEditor[];
}
export declare class simplyImageOptionsGroup extends optionsGroup {
    private _showTitleValue;
    imageFormat: labeledEditor;
    showTitle: labeledEditor;
    title: labeledEditor;
    resolution: labeledEditor;
    fileName: labeledEditor;
    constructor(_showTitleValue: any);
    _initialize(): void;
    set(documentInfo: IExportOptions): void;
    apply(documentInfo: IExportOptions): void;
    getEditors(): labeledEditor[];
}
export declare class dashboardImageOptionsGroup extends optionsGroup {
    private _showTitleValue;
    imageFormat: labeledEditor;
    showTitle: labeledEditor;
    title: labeledEditor;
    exportFilters: labeledEditor;
    exportParameters: labeledEditor;
    resolution: labeledEditor;
    fileName: labeledEditor;
    constructor(_showTitleValue: any);
    _initialize(): void;
    set(documentInfo: IExportOptions): void;
    apply(documentInfo: IExportOptions): void;
    getEditors(): labeledEditor[];
}
export {};
