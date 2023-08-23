﻿/**
* DevExpress Analytics (accessibility\_keyboardHelperWithArrowButtonBase.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AccessibilityKeyboardHelperBase } from './_keyboardHelperBase';
export class KeyboardHelperWithArrowButtonBase extends AccessibilityKeyboardHelperBase {
    constructor() {
        super(...arguments);
        this.startIndex = 0;
    }
    resetTabIndexes() {
        this.setTabIndexes('-1');
    }
    initialize() {
        super.initialize();
        this.resetTabIndexes();
        this.controlElements[this.startIndex] && this.controlElements[this.startIndex].element.setAttribute('tabindex', '0');
    }
    changeFocus(index, roundTrip = true) {
        this.resetTabIndexes();
        var nextIndex = super.changeFocus(index, roundTrip);
        this.controlElements[nextIndex].setTabIndex('0');
        this.controlElements[nextIndex].setFocus();
        this.startIndex = nextIndex;
        return nextIndex;
    }
}
