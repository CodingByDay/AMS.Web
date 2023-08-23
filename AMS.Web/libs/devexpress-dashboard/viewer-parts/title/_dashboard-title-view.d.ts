﻿/**
* DevExpress Dashboard (_dashboard-title-view.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { DashboardTitleToolbar } from '../widgets/caption-toolbar/_title-toolbar';
import { TitleViewModel } from './_title-view-model';
export interface DashboardTitleOptions {
    allowExport: boolean;
    showExportDialog: (format: any) => void;
    showParametersDialog: () => void;
}
export interface IDashboardTitle {
    onUpdated?: JQueryCallback;
    update: () => void;
}
export declare class DashboardTitleView {
    onUpdated: JQuery.Callbacks<Function>;
    protected _captionToolbar: DashboardTitleToolbar;
    private _options;
    protected _titleViewModel: TitleViewModel;
    protected get _visible(): boolean;
    initialize(container: HTMLElement, controlContainer: HTMLElement, encodeHtml: boolean, options: DashboardTitleOptions, titleViewModel: TitleViewModel): void;
    calcHeight(masterFilterValues: Array<any>): number;
    update(masterFilterValues: Array<any>): void;
    resize(): void;
    private _convertToToolbarOptions;
    private _raiseUpdated;
}
