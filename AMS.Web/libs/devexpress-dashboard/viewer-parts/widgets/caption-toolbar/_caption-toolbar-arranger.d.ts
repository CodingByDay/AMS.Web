﻿/**
* DevExpress Dashboard (_caption-toolbar-arranger.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DashboardItemCaptionToolbarOptions, ViewerToolbarItem } from './caption-toolbar-options';
export interface ViewerToolbarLocatedItem extends ViewerToolbarItem {
    location: 'before' | 'center' | 'after';
    isSeparator?: boolean;
    disabled?: boolean;
}
export declare function arrangeFloatingToolbarItems(itemOptions: DashboardItemCaptionToolbarOptions): Array<ViewerToolbarLocatedItem>;
export declare function arrangeHoveredToolbarItems(itemOptions: DashboardItemCaptionToolbarOptions, containerHovered: boolean, disabled: boolean): Array<ViewerToolbarLocatedItem>;
export declare function arrangeTitleToolbarItems(itemOptions: DashboardItemCaptionToolbarOptions, showStaticItemsOnCenter: boolean): Array<ViewerToolbarLocatedItem>;
export declare function arrangeStaticToolbarItems(itemOptions: DashboardItemCaptionToolbarOptions, disabled: boolean): Array<ViewerToolbarLocatedItem>;
