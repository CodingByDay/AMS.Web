/**
* DevExpress Analytics (accessibility\_listKeyboardHelper.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AccessibilityControlElementBase } from './_controlElementBase';
import { KeyboardHelperWithArrowButtonBase } from './_keyboardHelperWithArrowButtonBase';
export declare class ListKeyboardHelper extends KeyboardHelperWithArrowButtonBase {
    controlElementClassName: string;
    createControlElement(element: HTMLElement, index?: number): AccessibilityControlElementBase;
    itemHandleUpArrowKey(e: any, index?: any): boolean;
    itemHandleDownArrowKey(e: any, index?: any): boolean;
}
