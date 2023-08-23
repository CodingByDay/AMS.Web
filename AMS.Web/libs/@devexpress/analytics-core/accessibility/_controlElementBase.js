﻿/**
* DevExpress Analytics (accessibility\_controlElementBase.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '../serializer/utils';
import { addDisposeCallback } from '../serializer/_internal';
export class AccessibilityControlElementBase extends Disposable {
    constructor(element) {
        super();
        this.element = element;
        this._eventListeners = [];
    }
    dispose() {
        super.dispose();
        this._eventListeners.forEach((item) => { item.element.removeEventListener(item.eventType, item.listener); });
        this._eventListeners.length = 0;
        this.element = null;
    }
    addListener(element, eventType, handler) {
        var listener = (e) => {
            handler.call(this, e);
        };
        element.addEventListener(eventType, listener);
        addDisposeCallback(element, function () {
            element.removeEventListener(eventType, listener);
        });
        this._eventListeners.push({ element: element, eventType: eventType, listener: listener });
    }
    setTabIndex(index) {
        this.element.setAttribute('tabindex', index);
    }
    setFocus() {
        this.element.focus();
    }
}
