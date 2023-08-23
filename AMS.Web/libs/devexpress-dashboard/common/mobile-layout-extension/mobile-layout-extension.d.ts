﻿/**
* DevExpress Dashboard (mobile-layout-extension.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DisposableType } from '../../model/disposable-object';
import { DashboardControl } from '../dashboard-control';
import { ISupportOptionExtension } from '../internal/_interfaces';
import { OptionsManager } from '../internal/_options-manager';
export declare type MobileLayoutMode = 'Always' | 'Auto' | 'Never';
export interface MobileLayoutExtensionOptions {
    mobileLayoutEnabled?: MobileLayoutMode;
}
export declare class MobileLayoutExtension implements ISupportOptionExtension<MobileLayoutExtensionOptions> {
    private dashboardControl;
    name: string;
    _disposables: DisposableType[];
    _optionsManager: OptionsManager<MobileLayoutExtensionOptions, any>;
    _mobileLayoutEnabledOption: ko.Observable<any>;
    mobileLayoutEnabled: ko.Computed<boolean>;
    private _canMobileLayoutBeEnabled;
    private _isMobileLayoutModeExpected;
    readonly _defaultOptions: MobileLayoutExtensionOptions;
    readonly _mobileLayoutTemplateName: string;
    constructor(dashboardControl: DashboardControl, options?: MobileLayoutExtensionOptions);
    private _optionChanged;
    start(): void;
    _dashboardList: any[];
    stop(): void;
}
