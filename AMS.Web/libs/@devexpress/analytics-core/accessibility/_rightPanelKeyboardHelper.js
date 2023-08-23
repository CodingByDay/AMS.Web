﻿/**
* DevExpress Analytics (accessibility\_rightPanelKeyboardHelper.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { AccessibilityControlElementBase } from './_controlElementBase';
import { AccessibilityKeyboardHelperBase } from './_keyboardHelperBase';
export class RightPanelKeyboardHelper extends AccessibilityKeyboardHelperBase {
    constructor(_tabPanel) {
        super();
        this._tabPanel = _tabPanel;
        this.controlElementClassName = 'dx-accessibility-rightpanel-button';
    }
    bindHandler(el) {
        super.bindHandler(el);
        this._disposables.push(ko.computed(() => {
            this._tabPanel.tabs.forEach((tab) => { ko.unwrap(tab.visible); });
            this.initialize();
        }).extend(({ rateLimit: { timeout: 1, method: 'notifyWhenChangesStop' } })));
    }
    initialize() {
        super.initialize();
        this.setTabIndexes(0);
    }
    createControlElement(element, index) {
        if (ko.unwrap(this._tabPanel.tabs[index].visible))
            return new AccessibilityControlElementBase(element);
    }
    itemHandleDownArrowKey(e, index) {
        this.setFocusToNext(index, true);
        return true;
    }
    itemHandleUpArrowKey(e, index) {
        this.setFocusToPrevious(index, true);
        return true;
    }
}
