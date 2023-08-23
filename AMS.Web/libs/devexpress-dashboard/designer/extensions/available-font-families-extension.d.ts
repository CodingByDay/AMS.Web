/**
* DevExpress Dashboard (available-font-families-extension.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DashboardControl } from '../../common';
import { IExtension } from '../../common/common-interfaces';
import { DisposableObject, DisposableType } from '../../model';
export declare class AvailableFontFamiliesExtension extends DisposableObject implements IExtension {
    private dashboardControl;
    name: string;
    fontFamilies: ko.ObservableArray<string>;
    _disposables: Array<DisposableType>;
    private _isDataLoadingStarted;
    private _rootSubscription;
    private _isDesignModeSubscription;
    constructor(dashboardControl: DashboardControl);
    start(): void;
    stop(): void;
    private _dispose;
    private _isAppearanceItem;
    private _loadAvailableFontFamilies;
}
