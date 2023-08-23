﻿/**
* DevExpress Analytics (accessibility\_toolbarKeyboardHelper.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IAction } from '../widgets/utils';
import { KeyboardHelperWithArrowButtonBase } from './_keyboardHelperWithArrowButtonBase';
import { ControlElementWithParentHighlight } from './_controlElementWithParentHighlight';
import { IAccessibilityLiveRegion } from './_keyboardHelperBase';
export declare class ToolbarKeyboardHelper extends KeyboardHelperWithArrowButtonBase {
    private _buttonModels;
    controlElementClassName: string;
    liveRegionId: string;
    createControlElement(element: HTMLElement, index?: number): ToolbarItemElement;
    constructor(_buttonModels: IAction[] | ko.Observable<IAction[]> | ko.Computed<IAction[]>);
    itemHandleEnterKey(e: any, index: any): boolean;
    itemHandleSpaceKey(e: any, index: any): boolean;
    itemHandleLeftArrowKey(e: any, index?: any): boolean;
    itemHandleRightArrowKey(e: any, index?: any): boolean;
    get buttonModels(): IAction[];
}
declare class ToolbarItemElement extends ControlElementWithParentHighlight {
    element: HTMLElement;
    private _toolbarItemModel;
    private _liveRegion;
    private _selectBox;
    private _menu;
    private _complexItem;
    dispose(): void;
    constructor(element: HTMLElement, _toolbarElement: HTMLElement, _toolbarItemModel: IAction, _liveRegion: () => IAccessibilityLiveRegion);
    setFocus(): void;
    actionExecute(): void;
}
export {};
