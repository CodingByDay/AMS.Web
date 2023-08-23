/**
* DevExpress Analytics (accessibility\_accordionKeyboardHelper.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { AccessibilityKeyboardHelperBase } from './_keyboardHelperBase';
export class AccordionKeyboardHelper extends AccessibilityKeyboardHelperBase {
    constructor() {
        super(...arguments);
        this.controlElementClassName = 'dxrd-accessibility-accordion-trigger';
        this.focusFirstFocusableDescendant = true;
        this._triggersParentMap = {};
    }
    _getElementsCount() {
        return Array
            .from(this.getContainer().querySelectorAll('.' + this.controlElementClassName))
            .filter(elt => this._filterPredicate(elt))
            .length;
    }
    _defferedInit() {
        setTimeout(() => {
            if (this.controlElements.length !== this._getElementsCount()) {
                this.initialize();
            }
        }, 20);
    }
    _collapseItem(item) {
        const collapsed = ko.dataFor(item).collapsed;
        const alwaysShow = ko.dataFor(item).alwaysShow;
        collapsed(alwaysShow() ? false : !collapsed());
        this._defferedInit();
    }
    _updateTriggersTree() {
        this._triggersParentMap = Array
            .from(this.getContainer().querySelectorAll(`.${this.controlElementClassName}`))
            .reduce((acc, trigger) => {
            var _a;
            const parentTriggerId = (_a = trigger === null || trigger === void 0 ? void 0 : trigger.closest('.dx-accordion-content')) === null || _a === void 0 ? void 0 : _a.getAttribute('aria-labelledby');
            acc[trigger.id] = parentTriggerId;
            return acc;
        }, {});
    }
    _filterPredicate(elt) {
        var _a;
        let curEltId = elt.id;
        while (this._triggersParentMap && this._triggersParentMap[curEltId]) {
            if ((_a = ko.dataFor(document.getElementById(this._triggersParentMap[curEltId]))) === null || _a === void 0 ? void 0 : _a.collapsed()) {
                return false;
            }
            curEltId = this._triggersParentMap[curEltId];
        }
        return true;
    }
    initialize() {
        this._updateTriggersTree();
        super.initialize(elt => this._filterPredicate(elt));
        this.setTabIndexes(0);
    }
    itemHandleUpArrowKey(e, index) {
        this.setFocusToPrevious(index);
        return true;
    }
    itemHandleDownArrowKey(e, index) {
        this.setFocusToNext(index);
        return true;
    }
    itemHandleEnterKey(e, index) {
        this._collapseItem(e.target);
        return true;
    }
    itemHandleSpaceKey(e, index) {
        this._collapseItem(e.target);
        return true;
    }
    clickHandler(e, index) {
        this._defferedInit();
        super.clickHandler(e, index);
    }
}
