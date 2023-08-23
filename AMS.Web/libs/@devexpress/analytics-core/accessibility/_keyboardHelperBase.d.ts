﻿/**
* DevExpress Analytics (accessibility\_keyboardHelperBase.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { KeyboardHelperBase } from '../core/tools/_keyboardHelper';
import { AccessibilityControlElementBase } from './_controlElementBase';
export interface IAccessibilityLiveRegion {
    element: HTMLElement;
    changeText: (text: string, timeout?: number) => number;
}
export declare class AccessibilityKeyboardHelperBase extends KeyboardHelperBase {
    childrenInitialized: boolean;
    accessibilityCompliantEnabled: boolean;
    focusFirstFocusableDescendant: boolean;
    controlElementClassName: string;
    controlElements: AccessibilityControlElementBase[];
    startIndex: number;
    liveRegionId: string;
    private _prevActiveElement;
    private _eventListeners;
    private _elementContainer;
    private _liveRegion;
    private _disposeItems;
    constructor();
    initialize(predicate?: (elt: Element) => boolean): void;
    getIndexByElement(htmlElement: any): number;
    createControlElement(element: HTMLElement, index?: number): AccessibilityControlElementBase;
    setTabIndexes: (index: any) => void;
    getContainer(): HTMLElement;
    changeFocus(index: number, roundTrip?: boolean): number;
    bindHandler(elementContainer: HTMLElement): void;
    handleEscKey(e: any, index?: any): boolean;
    handleTabKey(e: any): boolean;
    handleShiftTabKey(e: any): boolean;
    handleEnterKey(e: any): boolean;
    handleSpaceKey(e: any): boolean;
    handleEndKey(e: any): boolean;
    handleHomeKey(e: any): boolean;
    handleUpArrowKey(e: any): boolean;
    handleDownArrowKey(e: any): boolean;
    handleLeftArrowKey(e: any): boolean;
    handleRightArrowKey(e: any): boolean;
    itemHandleHomeKey(e: any, index?: any): boolean;
    itemHandleEndKey(e: any, index?: any): boolean;
    itemHandleLeftArrowKey(e: any, index?: any): boolean;
    itemHandleRightArrowKey(e: any, index?: any): boolean;
    itemHandleEnterKey(e: any, index?: any): boolean;
    itemHandleSpaceKey(e: any, index?: any): boolean;
    itemHandleUpArrowKey(e: any, index?: any): boolean;
    itemHandleDownArrowKey(e: any, index?: any): boolean;
    itemHandleTabKey(e: any, index?: any): boolean;
    itemHandleShiftTabKey(e: any, index?: any): boolean;
    itemHandleEscKey(e: any, index?: any): boolean;
    setFocusToPrevious(currentIndex: number, roundTrip?: boolean): number;
    setFocusToNext(currentIndex: number, roundTrip?: boolean): number;
    clickHandler(e: any, index: any): void;
    dispose(): void;
    addListener(element: HTMLElement, index: number, eventType: string, handler: any): void;
    focus(prevActiveElement?: Element): void;
    liveRegion: () => IAccessibilityLiveRegion;
    lastFocusItem(): HTMLElement;
}
