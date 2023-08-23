﻿/**
* DevExpress Analytics (accessibility\_treeListKeyboardHelper.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AccessibilityControlElementBase } from './_controlElementBase';
import { ListKeyboardHelper } from './_listKeyboardHelper';
export declare class TreeListKeyboardHelper extends ListKeyboardHelper {
    controlElementClassName: string;
    private _setFocusToParentNode;
    private _toggleCollapsed;
    private _toggleSelected;
    private _getItemModel;
    createControlElement(element: HTMLElement, index?: number): AccessibilityControlElementBase;
    itemHandleLeftArrowKey(e: any, index: any): boolean;
    itemHandleRightArrowKey(e: any, index: any): boolean;
    itemHandleEnterKey(e: any, index: any): boolean;
    itemHandleSpaceKey(e: any, index: any): boolean;
    clickHandler(e: any, index: any): void;
}
