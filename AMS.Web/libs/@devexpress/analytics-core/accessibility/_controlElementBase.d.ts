﻿/**
* DevExpress Analytics (accessibility\_controlElementBase.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '../serializer/utils';
export declare class AccessibilityControlElementBase extends Disposable {
    element: HTMLElement;
    private _eventListeners;
    dispose(): void;
    constructor(element: HTMLElement);
    addListener(element: HTMLElement, eventType: string, handler: any): void;
    setTabIndex(index: string): void;
    setFocus(): void;
}
