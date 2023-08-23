﻿/**
* DevExpress Analytics (accessibility\_keyboardHelperWithArrowButtonBase.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AccessibilityKeyboardHelperBase } from './_keyboardHelperBase';
export declare class KeyboardHelperWithArrowButtonBase extends AccessibilityKeyboardHelperBase {
    resetTabIndexes(): void;
    initialize(): void;
    changeFocus(index: number, roundTrip?: boolean): number;
    startIndex: number;
}
