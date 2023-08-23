/**
* DevExpress Dashboard (_group-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISize } from '../layout/_utils.layout';
import { baseItem, ViewerItemOptions } from './_base-item';
export declare class groupItem extends baseItem {
    constructor(container: HTMLElement, options: ViewerItemOptions);
    protected renderContentUnsafe(element: HTMLElement, changeExisting: boolean, afterRenderCallback?: any): boolean;
    _itemHasOwnContent(): boolean;
    _toggleLoadingPanel(): void;
    getOffset(): ISize;
}
