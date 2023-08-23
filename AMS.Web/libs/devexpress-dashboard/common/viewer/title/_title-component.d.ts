﻿/**
* DevExpress Dashboard (_title-component.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DisposableObject } from '../../../model/disposable-object';
import { IExtension } from '../../common-interfaces';
import { DashboardExportExtension } from '../../extensions/export-extension';
import { DashboardParameterDialogExtension } from '../../extensions/parameter-dialog-extension';
import { ViewerApi } from '../_viewer-api';
import { TitleComponentOptions } from './_dashboard-title-model';
export declare class DashboardTitleContext extends DisposableObject implements IDashboardTitleContext {
    constructor(encodeHtml: boolean, findExtension: (name: string) => IExtension, allowExport: boolean, viewerApi: ViewerApi);
    encodeHtml: boolean;
    parametersExtension: ko.Computed<DashboardParameterDialogExtension>;
    exportExtension: ko.Computed<DashboardExportExtension>;
    viewerApi: ViewerApi;
}
export interface IDashboardTitleContext {
    encodeHtml: boolean;
    parametersExtension: ko.Computed<DashboardParameterDialogExtension>;
    exportExtension: ko.Computed<DashboardExportExtension>;
    viewerApi: ViewerApi;
}
export declare type DashboardTitleKoComponentArgs = {
    options: ko.Subscribable<TitleComponentOptions>;
    width: ko.Subscribable<number>;
    height: ko.Subscribable<number>;
    encodeHtml: boolean;
    className?: string;
};
export declare class DashboardTitleComponent extends DisposableObject {
    private params;
    private container;
    private controlContainer;
    constructor(params: DashboardTitleKoComponentArgs, container: HTMLElement, controlContainer: HTMLElement);
    initialize(): void;
}
