﻿/**
* DevExpress Dashboard (_hidden-caption-toolbar.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DashboardItemCaptionToolbarOptions } from '../caption-toolbar/caption-toolbar-options';
import { CaptionToolbar } from '../caption-toolbar/_caption-toolbar-base';
export declare class HiddenCaptionToolbar implements CaptionToolbar {
    element: HTMLElement;
    disabled: boolean;
    calcHeight(options: DashboardItemCaptionToolbarOptions): number;
    calcMinWidth(options: DashboardItemCaptionToolbarOptions): number;
    update(options: DashboardItemCaptionToolbarOptions): boolean;
    onResize(): void;
    dispose(): void;
}
