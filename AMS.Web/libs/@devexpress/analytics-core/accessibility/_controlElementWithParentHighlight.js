﻿/**
* DevExpress Analytics (accessibility\_controlElementWithParentHighlight.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AccessibilityControlElementBase } from './_controlElementBase';
export class ControlElementWithParentHighlight extends AccessibilityControlElementBase {
    constructor(element, _parentElement) {
        super(element);
        this.element = element;
        this._parentElement = _parentElement;
        this._borderCssClassName = ['dxd-border-accented', 'dx-accessibility-container-highlight'];
        this.toolbarItemHandleFocus = () => {
            this._parentElement.classList.add(...this._borderCssClassName);
        };
        this.toolbarItemHandleBlur = () => {
            this._parentElement.classList.remove(...this._borderCssClassName);
        };
        element.addEventListener('focus', this.toolbarItemHandleFocus);
        element.addEventListener('blur', this.toolbarItemHandleBlur);
    }
    dispose() {
        this.element.removeEventListener('focus', this.toolbarItemHandleFocus);
        this.element.removeEventListener('blur', this.toolbarItemHandleBlur);
        super.dispose();
    }
}
