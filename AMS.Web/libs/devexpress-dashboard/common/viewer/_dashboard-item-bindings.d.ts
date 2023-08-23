﻿/**
* DevExpress Dashboard (_dashboard-item-bindings.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DisposableObject, DisposableType } from '../../model/disposable-object';
import { DashboardItem } from '../../model/items/dashboard-item';
import { ISizeController } from '../internal/_interfaces';
import { IDashboardContext, IDashboardItemContext } from './_viewer-interfaces';
export declare let DashboardItemHeaderHeight: number;
export interface IDashboardItemBindings {
    dashboardItem: DashboardItem;
    dashboardContext: IDashboardContext;
    localContext: IDashboardItemContext;
    sizeController: ISizeController;
}
export declare class DashboardUIItemStateController extends DisposableObject {
    private _element;
    private _dashboardItem;
    private _sizeController;
    private _bindingContext;
    private _renderDashboardItem;
    private _additionalClasses;
    private _perUiStateSubscriptions;
    constructor(_element: HTMLElement, _dashboardItem: DashboardItem, _sizeController: ISizeController, _bindingContext: ko.BindingContext, _renderDashboardItem: () => DisposableType, _additionalClasses?: string[]);
    render(): void;
    _renderDashboardItemState: () => void;
    dispose(): void;
}
