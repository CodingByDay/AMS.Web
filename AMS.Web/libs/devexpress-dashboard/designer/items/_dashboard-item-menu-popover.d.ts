﻿/**
* DevExpress Dashboard (_dashboard-item-menu-popover.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DashboardItemMenu, IContextPopupMenu } from './_dashboard-item-menu';
export declare const createPopoverOptionsGetterFunction: (menuItem: IContextPopupMenu, dashboardItemMenu: DashboardItemMenu) => (rootContainer: any) => {
    target: any;
    container: any;
    visible: ko.PureComputed<boolean>;
    position: {
        my: ko.PureComputed<"left" | "right">;
        at: ko.PureComputed<"left" | "right">;
        boundary: any;
        collision: string;
        boundaryOffset: string;
        offset: ko.PureComputed<"+10, 0" | "-10, 0">;
    };
    height: any;
    width: number;
    hoverStateEnabled: boolean;
    onShown: (options: any) => void;
    hideOnOutsideClick: boolean;
    animation: {
        enabled: boolean;
    };
    onInitialized: (args: any) => void;
    onDisposing: () => void;
    hideOnParentScroll: boolean;
    wrapperAttr: ko.PureComputed<{
        class: string;
    }>;
};
