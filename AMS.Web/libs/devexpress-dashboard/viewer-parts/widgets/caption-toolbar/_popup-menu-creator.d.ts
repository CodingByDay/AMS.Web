﻿/**
* DevExpress Dashboard (_popup-menu-creator.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Properties as dxListOptions } from 'devextreme/ui/list';
import 'devextreme/ui/tile_view';
import { Properties as dxTileViewOptions } from 'devextreme/ui/tile_view';
import { ViewerToolbarItemMenu } from './caption-toolbar-options';
export declare class PopupMenuCreator {
    private static _icon_menu_element_size;
    static toggleMenu(element: HTMLElement, menu: ViewerToolbarItemMenu, container: HTMLElement, controlContainer: HTMLElement, onMenuItemClick?: () => void): void;
    private static _createPopoverOptions;
    static _createTileViewOptions(menu: ViewerToolbarItemMenu, onItemClick: (data: any) => void): dxTileViewOptions;
    static _createListOptions(menu: ViewerToolbarItemMenu, onItemClick: (data: any) => void): dxListOptions;
    private static _getPopupContainer;
}
