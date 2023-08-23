﻿/**
* DevExpress Analytics (accessibility\_rightPanelKeyboardHelper.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { TabPanel } from '../core/tools/tabPanel';
import { AccessibilityControlElementBase } from './_controlElementBase';
import { AccessibilityKeyboardHelperBase } from './_keyboardHelperBase';
export declare class RightPanelKeyboardHelper extends AccessibilityKeyboardHelperBase {
    private _tabPanel;
    controlElementClassName: string;
    constructor(_tabPanel: TabPanel);
    bindHandler(el: any): void;
    initialize(): void;
    createControlElement(element: HTMLElement, index?: number): AccessibilityControlElementBase;
    itemHandleDownArrowKey(e: any, index?: any): boolean;
    itemHandleUpArrowKey(e: any, index?: any): boolean;
}
