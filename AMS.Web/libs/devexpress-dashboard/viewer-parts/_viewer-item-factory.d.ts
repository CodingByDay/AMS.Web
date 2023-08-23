/**
* DevExpress Dashboard (_viewer-item-factory.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { baseItem, ViewerItemOptions } from './viewer-items/_base-item';
export declare class ViewerItemFactory {
    createItem(container: HTMLElement, options: ViewerItemOptions): baseItem;
}
export declare let defaultViewerItemFactory: ViewerItemFactory;
