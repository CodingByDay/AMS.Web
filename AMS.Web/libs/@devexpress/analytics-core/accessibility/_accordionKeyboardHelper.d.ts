/**
* DevExpress Analytics (accessibility\_accordionKeyboardHelper.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AccessibilityKeyboardHelperBase } from './_keyboardHelperBase';
export declare class AccordionKeyboardHelper extends AccessibilityKeyboardHelperBase {
    controlElementClassName: string;
    focusFirstFocusableDescendant: boolean;
    private _triggersParentMap;
    private _getElementsCount;
    private _defferedInit;
    private _collapseItem;
    private _updateTriggersTree;
    private _filterPredicate;
    initialize(): void;
    itemHandleUpArrowKey(e: any, index?: any): boolean;
    itemHandleDownArrowKey(e: any, index?: any): boolean;
    itemHandleEnterKey(e: any, index?: any): boolean;
    itemHandleSpaceKey(e: any, index?: any): boolean;
    clickHandler(e: any, index?: any): void;
}
