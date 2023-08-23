﻿/**
* DevExpress Analytics (accessibility\_keyboardHelperBase.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { KeyboardHelperBase, KeyDownHandlersManager } from '../core/tools/_keyboardHelper';
import { findFirstItemMatchesCondition } from '../core/utils/_arrayutils';
import { addDisposeCallback } from '../serializer/_internal';
import { AccessibilityControlElementBase } from './_controlElementBase';
export class AccessibilityKeyboardHelperBase extends KeyboardHelperBase {
    constructor() {
        super();
        this.childrenInitialized = false;
        this.accessibilityCompliantEnabled = false;
        this.focusFirstFocusableDescendant = false;
        this.controlElements = [];
        this._eventListeners = [];
        this.setTabIndexes = (index) => {
            this.controlElements.forEach(button => button.setTabIndex(index));
        };
        this.liveRegion = () => {
            if (!this.liveRegionId)
                return null;
            if (!this._liveRegion || !this._liveRegion.element) {
                this._liveRegion = {
                    element: document.getElementById(this.liveRegionId),
                    changeText: (text, timeout = 200) => {
                        return setTimeout(() => {
                            if (this._liveRegion.element)
                                this._liveRegion.element.textContent = text;
                        }, timeout);
                    }
                };
            }
            return this._liveRegion;
        };
        this.shortcutMap = {
            Esc: (e) => { return this.handleEscKey(e); },
            Tab: (e) => {
                var shiftKey = !!(e && e.shiftKey);
                return shiftKey ? this.handleShiftTabKey(e) : this.handleTabKey(e);
            },
            Enter: (e) => { return this.handleEnterKey(e); },
            Space: (e) => { return this.handleSpaceKey(e); },
            End: (e) => { return this.handleEndKey(e); },
            Home: (e) => { return this.handleHomeKey(e); },
            Up: (e) => { return this.handleUpArrowKey(e); },
            Down: (e) => { return this.handleDownArrowKey(e); },
            Left: (e) => { return this.handleLeftArrowKey(e); },
            Right: (e) => { return this.handleRightArrowKey(e); },
        };
        this.childrenShortcutMap = {
            Tab: (e, index) => {
                var shiftKey = !!(e && e.shiftKey);
                return shiftKey ? this.itemHandleShiftTabKey(e, index) : this.itemHandleTabKey(e, index);
            },
            Enter: (e, index) => { return this.itemHandleEnterKey(e, index); },
            Space: (e, index) => { return this.itemHandleSpaceKey(e, index); },
            End: (e, index) => { return this.itemHandleEndKey(e, index); },
            Home: (e, index) => { return this.itemHandleHomeKey(e, index); },
            Up: (e, index) => { return this.itemHandleUpArrowKey(e, index); },
            Down: (e, index) => { return this.itemHandleDownArrowKey(e, index); },
            Left: (e, index) => { return this.itemHandleLeftArrowKey(e, index); },
            Right: (e, index) => { return this.itemHandleRightArrowKey(e, index); },
            Esc: (e, index) => { return this.itemHandleEscKey(e, index); },
        };
    }
    _disposeItems() {
        this._eventListeners.forEach((item) => { item.element.removeEventListener(item.eventType, item.listener); });
        this._eventListeners.length = 0;
        this.disposeArray(this.controlElements);
        this.controlElements.length = 0;
    }
    initialize(predicate) {
        this._disposeItems();
        if (!this._elementContainer)
            return;
        var htmlElements = Array.prototype.slice.call(this._elementContainer.querySelectorAll('.' + this.controlElementClassName));
        if (!htmlElements.length)
            return;
        if (predicate)
            htmlElements = htmlElements.filter(predicate);
        htmlElements.forEach((element, index) => {
            var newItem = this.createControlElement(element, index);
            if (newItem) {
                this.controlElements.push(newItem);
            }
        });
        this.controlElements.forEach((item, index) => {
            this.addListener(item.element, index, 'click', this.clickHandler);
        });
        this.childrenInitialized = true;
    }
    getIndexByElement(htmlElement) {
        return this.controlElements.map(element => element.element).indexOf(htmlElement);
    }
    createControlElement(element, index) {
        return new AccessibilityControlElementBase(element);
    }
    getContainer() {
        return this._elementContainer;
    }
    changeFocus(index, roundTrip = true) {
        var elCount = this.controlElements.length - 1;
        if (index < 0)
            index = roundTrip ? elCount : 0;
        if (index > elCount)
            index = roundTrip ? 0 : elCount;
        this.controlElements[index].setFocus();
        return index;
    }
    bindHandler(elementContainer) {
        this._elementContainer = elementContainer;
        var handlersManager = new KeyDownHandlersManager(this._elementContainer);
        this.initialize();
        var handler = (e) => {
            var target = e.target;
            if (findFirstItemMatchesCondition(Object.keys(target.classList), (key) => target.classList[key] === this.controlElementClassName) && this.processChildrenShortcut(e, this.getIndexByElement(target))
                || this.processShortcut(e)) {
                e.stopPropagation();
                e.preventDefault();
            }
        };
        handlersManager.bindHandler(this._elementContainer, handler);
    }
    handleEscKey(e, index) {
        if (this._prevActiveElement) {
            this._prevActiveElement.focus();
            return true;
        }
        return false;
    }
    handleTabKey(e) {
        return false;
    }
    handleShiftTabKey(e) {
        return false;
    }
    handleEnterKey(e) {
        return false;
    }
    handleSpaceKey(e) {
        return false;
    }
    handleEndKey(e) {
        return false;
    }
    handleHomeKey(e) {
        return false;
    }
    handleUpArrowKey(e) {
        return false;
    }
    handleDownArrowKey(e) {
        return false;
    }
    handleLeftArrowKey(e) {
        return false;
    }
    handleRightArrowKey(e) {
        return false;
    }
    itemHandleHomeKey(e, index) {
        this.changeFocus(0);
        return true;
    }
    itemHandleEndKey(e, index) {
        this.changeFocus(this.controlElements.length - 1);
        return true;
    }
    itemHandleLeftArrowKey(e, index) {
        return false;
    }
    itemHandleRightArrowKey(e, index) {
        return false;
    }
    itemHandleEnterKey(e, index) {
        return false;
    }
    itemHandleSpaceKey(e, index) {
        return false;
    }
    itemHandleUpArrowKey(e, index) {
        return false;
    }
    itemHandleDownArrowKey(e, index) {
        return false;
    }
    itemHandleTabKey(e, index) {
        return false;
    }
    itemHandleShiftTabKey(e, index) {
        return false;
    }
    itemHandleEscKey(e, index) {
        return false;
    }
    setFocusToPrevious(currentIndex, roundTrip = true) {
        return this.changeFocus(currentIndex - 1, roundTrip);
    }
    setFocusToNext(currentIndex, roundTrip = true) {
        return this.changeFocus(currentIndex + 1, roundTrip);
    }
    clickHandler(e, index) {
        this.changeFocus(index);
    }
    dispose() {
        super.dispose();
        this._disposeItems();
        this._elementContainer = null;
        this._prevActiveElement = null;
    }
    addListener(element, index, eventType, handler) {
        var listener = (e) => {
            handler.call(this, e, index);
        };
        element.addEventListener(eventType, listener);
        addDisposeCallback(element, function () {
            element.removeEventListener(eventType, listener);
        });
        this._eventListeners.push({ element: element, eventType: eventType, listener: listener });
    }
    focus(prevActiveElement) {
        if (!this.childrenInitialized && !this._elementContainer)
            return;
        this._prevActiveElement = (prevActiveElement || document.activeElement);
        if (this.childrenInitialized && !this.focusFirstFocusableDescendant) {
            this.changeFocus(this.startIndex || 0);
        }
        else {
            var focusable = this._elementContainer.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            focusable.length && focusable[0].focus();
        }
    }
    lastFocusItem() {
        return document.getElementById('dxrd-designer-last-focus-item-blank');
    }
}
