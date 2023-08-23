﻿/**
* DevExpress Dashboard (_docking-layout-bindings.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { Properties as dxScrollViewOptions } from 'devextreme/ui/scroll_view';
import * as ko from 'knockout';
import { Dashboard } from '../../model/dashboard';
import { ElementAccessorKoComponentArgs } from '../internal/_ko-element-accessor';
import { IDashboardTitleContext } from '../viewer/title/_title-component';
import { DataSourceBrowser } from '../_data-source-browser';
import { LayoutItem } from './core/_layout-item';
import { FullscreenItemModel } from './_docking-layout-fullscreen-item';
export declare type CssStyleObject = {
    [key in keyof CSSStyleDeclaration]?: string | number | ko.Subscribable<string> | ko.Subscribable<number>;
};
export declare type DockingLayoutKoComponentArgs = {
    dashboard: Dashboard;
    dataSourceBrowser: DataSourceBrowser;
    layout: LayoutItem;
    layoutMainElementEvents: ElementAccessorKoComponentArgs;
    headerHeight: ko.Observable<number>;
    repaintRequest: JQueryCallback;
    allowExportDashboard?: boolean;
    titleContext: IDashboardTitleContext;
    encodeHtml: boolean;
    resizeByTimer: ko.Observable<boolean>;
    fullscreenItemModel: FullscreenItemModel;
    scrollViewEvents: dxScrollViewOptions;
};
