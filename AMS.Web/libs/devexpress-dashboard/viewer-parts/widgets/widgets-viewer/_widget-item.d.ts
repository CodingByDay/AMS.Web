﻿/**
* DevExpress Dashboard (_widget-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import DOMComponent from 'devextreme/core/dom_component';
import { widgetItemCore } from '../../viewer-items/_widget-viewer-item-core';
import { BaseWidgetItem } from './_base-widget-item';
export declare class WidgetItem extends BaseWidgetItem {
    static ensureOptions(options: any): any;
    _widgetType: any;
    _itemData: any;
    _widget: DOMComponent;
    constructor(itemData?: widgetItemCore, options?: any);
    dispose(): void;
    _disposeWidget(): void;
    _getDefaultOptions(): any;
    detachItem(): void;
    initDraw(width?: any, height?: any, index?: any): HTMLElement;
    draw(width?: any, height?: any, index?: any): HTMLElement;
    resize(width: any, height: any, index?: any): HTMLElement;
    rerender(drawOptions: any): void;
    getWidget(): DOMComponent;
}
