﻿/**
* DevExpress Analytics (core\selection\_selection.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { Disposable } from '../../serializer/utils';
import { blur } from '../internal/_utils';
export class SurfaceSelection extends Disposable {
    constructor(ignoreMultiSelectProperties = ['name']) {
        super();
        this.ignoreMultiSelectProperties = ignoreMultiSelectProperties;
        this._focused = ko.observable(null);
        this._selectedControls = ko.observableArray();
        this._selectedControlsInner = [];
        this.focused = ko.pureComputed({
            read: () => {
                return this._focused();
            },
            write: (val) => {
                if (val !== this._focused()) {
                    if (!!val) {
                        this._firstSelected = val;
                    }
                    this.updateSelection(this._firstSelected);
                }
            }
        });
        this.dropTarget = null;
        this.expectClick = false;
        this.disabled = ko.observable(false);
        this._disposables.push(this.focused);
    }
    dispose() {
        this.reset();
        super.dispose();
    }
    _removeFromSelection(control) {
        control.focused(false);
        control.selected(false);
        if (this._selectedControlsInner.indexOf(control) !== -1) {
            this._selectedControlsInner.splice(this._selectedControlsInner.indexOf(control), 1);
        }
    }
    _setFocused(control) {
        if (this._focused()) {
            this._removeFromSelection(this._focused());
        }
        this._focused(control);
        if (control) {
            control.focused(true);
            if (this._selectedControlsInner.indexOf(control) === -1) {
                this._selectedControlsInner.push(control);
            }
            control.selected(true);
        }
    }
    _resetTabPanelFocus() {
        var isTabPanelFocused = document.activeElement && $.fn.constructor(document.activeElement).closest('.dxrd-surface').length === 0;
        if (isTabPanelFocused) {
            blur(document.activeElement);
        }
    }
    get selectedItems() {
        return this._selectedControls();
    }
    clear() {
        this.focused(null);
        this._selectedControls([]);
    }
    reset() {
        this._focused(null);
        this._selectedControlsInner.splice(0);
        this._firstSelected = null;
        this._selectedControls([]);
    }
    applySelection() {
        this._selectedControls(this._selectedControlsInner);
    }
    selectItems(items) {
        this._selectedControlsInner = items;
        this._selectedControlsInner.forEach((selectedControl) => {
            if (!selectedControl.focused()) {
                selectedControl.selected(true);
            }
        });
        this.applySelection();
    }
    updateSelection(control) {
        this._selectedControlsInner.forEach((selectedControl) => {
            selectedControl.focused(false);
            selectedControl.selected(false);
        });
        this._selectedControlsInner = [];
        this._setFocused(control);
        this.applySelection();
    }
    swapFocusedItem(control) {
        if (this._focused() !== control) {
            this._focused().focused(false);
            this._focused(control);
            this._focused().focused(true);
        }
    }
    initialize(control) {
        control = control || this.dropTarget;
        this._firstSelected = !!(control && control['focused']) ? control : null;
        this.updateSelection(this._firstSelected);
    }
    clickHandler(control, event = { ctrlKey: false, metaKey: false }) {
        if (this.expectClick) {
            this.expectClick = false;
            return;
        }
        control = control || this.dropTarget;
        if (!event.ctrlKey && !event.metaKey) {
            if (this._selectedControlsInner.length > 1 && this._selectedControlsInner.indexOf(control) !== -1) {
                this.swapFocusedItem(control);
            }
            else {
                if (this._focused() !== control) {
                    this.initialize(control);
                }
            }
        }
        else {
            this.selectionWithCtrl(control);
            this.applySelection();
        }
        this._resetTabPanelFocus();
    }
    selecting(event) {
        if (!this._focused()) {
            this._setFocused(event.control);
        }
        else {
            event.cancel = !event.control.checkParent(this._firstSelected);
            if (!event.cancel) {
                if (this._firstSelected && this._firstSelected.focused()) {
                    this._setFocused(event.control);
                }
                else if (this._selectedControlsInner.indexOf(event.control) === -1) {
                    event.control.selected(true);
                    this._selectedControlsInner.push(event.control);
                }
            }
        }
    }
    unselecting(control) {
        if (this._focused() === control) {
            this._setFocused(null);
            if (this._selectedControlsInner.length === 0) {
                this._setFocused(this._firstSelected);
            }
            else {
                this._setFocused(this._selectedControlsInner[0]);
            }
        }
        else {
            this._removeFromSelection(control);
        }
    }
    selectionWithCtrl(control) {
        if (control && control.allowMultiselect) {
            var selectedControls = this._selectedControlsInner;
            if (selectedControls.length === 0 || (selectedControls.length === 1 && (!selectedControls[0].allowMultiselect))) {
                this.initialize(control);
            }
            else {
                if (this._selectedControlsInner.indexOf(control) === -1) {
                    control.selected(true);
                    this._selectedControlsInner.push(control);
                }
                else {
                    if (this._selectedControlsInner.length > 1) {
                        this.unselecting(control);
                    }
                }
            }
        }
    }
}
