﻿/**
* DevExpress Dashboard (url-state-extension.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DisposableObject } from '../../model/disposable-object';
import { IExtension } from '../common-interfaces';
import { DashboardControl } from '../dashboard-control';
export interface UrlStateExtensionOptions {
    includeDashboardIdToUrl?: boolean;
    includeDashboardStateToUrl?: boolean;
}
export declare class UrlStateExtension extends DisposableObject implements IExtension {
    private _dashboardControl;
    private _dashboardContaierSubscriptions;
    private _options;
    private _defaultOptions;
    name: string;
    constructor(dashboardControl: DashboardControl, options?: UrlStateExtensionOptions);
    start(): void;
    stop(): void;
    private _processDashboardChanged;
    private _updateDashboardState;
    private _updateUrl;
    private _replaceValue;
    protected _getUrl(): string;
    protected _setUrl(url: string): void;
}
