﻿/**
* DevExpress Dashboard (_docking-layout-adapter.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { DisposableObject } from '../../model/disposable-object';
import { IExtension } from '../common-interfaces';
import { DashboardControl } from '../dashboard-control';
import { DockingLayoutKoComponentArgs } from './_docking-layout-bindings';
import { DockingLayoutController } from './_docking-layout-controller';
interface DockingLayoutViewModelProperties {
    componentArgs: DockingLayoutKoComponentArgs;
    cssClasses: ko.Subscribable<string>;
}
export declare type DockingLayoutKoViewModel = ko.Subscribable<DockingLayoutViewModelProperties>;
export declare class DockingLayoutAdapter extends DisposableObject implements IExtension {
    private _dashboardControl;
    _dockingLayoutController: ko.Observable<DockingLayoutController>;
    name: string;
    constructor(_dashboardControl: DashboardControl);
    private readonly _templateName;
    start(): void;
    stop(): void;
    processKeyEvent(eventName: string, e: JQueryKeyEventObject): boolean;
    dispose(): void;
    private _getKoViewModel;
}
export {};
