﻿/**
* DevExpress Dashboard (_dashboard-title-model.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { Dashboard } from '../../../model/dashboard';
import { DisposableObject } from '../../../model/disposable-object';
import { IDashboardTitle } from '../../../viewer-parts/title/_dashboard-title-view';
import { DashboardItemCaptionToolbarOptions, DashboardTitleToolbarOptions } from '../../../viewer-parts/widgets/caption-toolbar/caption-toolbar-options';
import { IDashboardTitleContext } from './_title-component';
export declare let maxFilterValuesCount: number;
export interface TitleComponentOptions {
    toolbarOptions: DashboardItemCaptionToolbarOptions;
    centerAligned?: boolean;
    allowHideEmptyToolbar: boolean;
}
export declare function masterFilterValues(dashboard: Dashboard): any[];
export declare class DashboardTitleModel extends DisposableObject implements IDashboardTitle {
    private context;
    private dashboard;
    private customizeToolbarOptions?;
    onUpdated: JQuery.Callbacks<Function>;
    toolbarOptions: ko.Observable<TitleComponentOptions>;
    showTitle: ko.Computed<boolean>;
    private viewModel;
    private masterFilterValues;
    private parametersExtension;
    private exportExtension;
    private viewerApi;
    private allowShowExportDialog;
    constructor(context: IDashboardTitleContext, dashboard: Dashboard, customizeToolbarOptions?: (options: DashboardTitleToolbarOptions) => void);
    update(): void;
    dispose(): void;
    private _raiseUpdated;
}
