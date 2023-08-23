﻿/**
* DevExpress Analytics (accessibility\_controlElementWithParentHighlight.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AccessibilityControlElementBase } from './_controlElementBase';
export declare class ControlElementWithParentHighlight extends AccessibilityControlElementBase {
    element: HTMLElement;
    private _parentElement;
    private _borderCssClassName;
    dispose(): void;
    toolbarItemHandleFocus: () => void;
    toolbarItemHandleBlur: () => void;
    constructor(element: HTMLElement, _parentElement: Element);
}
