﻿/**
* DevExpress Analytics (accessibility\_toolbarKeyboardHelper.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import dxSelectBox from 'devextreme/ui/select_box';
import dxMenu from 'devextreme/ui/menu';
import { KeyboardHelperWithArrowButtonBase } from './_keyboardHelperWithArrowButtonBase';
import { ControlElementWithParentHighlight } from './_controlElementWithParentHighlight';
import { getLocalization } from '../property-grid/localization/localization_utils';
export class ToolbarKeyboardHelper extends KeyboardHelperWithArrowButtonBase {
    constructor(_buttonModels) {
        super();
        this._buttonModels = _buttonModels;
        this.controlElementClassName = 'dx-accessibility-toolbar-item';
        this.liveRegionId = 'dxrd-preview-toolbar-live-region';
        this._disposables.push(ko.computed(() => {
            this.buttonModels.forEach((button) => { ko.unwrap(button.visible); });
            setTimeout(() => this.initialize(), 100);
        }));
    }
    createControlElement(element, index) {
        if (ko.unwrap(this.buttonModels[index].visible))
            return new ToolbarItemElement(element, this.getContainer(), this.buttonModels[index], this.liveRegion.bind(this));
    }
    itemHandleEnterKey(e, index) {
        var item = this.controlElements[index];
        item.actionExecute();
        return true;
    }
    itemHandleSpaceKey(e, index) {
        var item = this.controlElements[index];
        item.actionExecute();
        return true;
    }
    itemHandleLeftArrowKey(e, index) {
        this.setFocusToPrevious(index);
        return true;
    }
    itemHandleRightArrowKey(e, index) {
        this.setFocusToNext(index);
        return true;
    }
    get buttonModels() {
        return ko.unwrap(this._buttonModels);
    }
}
class ToolbarItemElement extends ControlElementWithParentHighlight {
    constructor(element, _toolbarElement, _toolbarItemModel, _liveRegion) {
        super(element, _toolbarElement);
        this.element = element;
        this._toolbarItemModel = _toolbarItemModel;
        this._liveRegion = _liveRegion;
        this._selectBox = dxSelectBox.getInstance(element.children[0]);
        this._menu = dxMenu.getInstance(element.children[0]);
    }
    _complexItem() {
        if (this._selectBox || this._menu)
            return true;
        return false;
    }
    dispose() {
        super.dispose();
        this._menu = null;
        this._selectBox = null;
    }
    setFocus() {
        if (this._complexItem() && this.element.getAttribute('aria-disabled') !== 'true')
            this._liveRegion().changeText(getLocalization('press Enter or Space to activate the editor', 'ASPxReportsStringId.WebDocumentViewer_AriaActivateEditor'), 200);
        else
            this._liveRegion().changeText('');
        return super.setFocus();
    }
    actionExecute() {
        if (this._complexItem()) {
            this._liveRegion().changeText(getLocalization('Press Alt ↓ or Alt  ↑ to navigate the editor. Press Shift Tab to exit navigation mode.', 'ASPxReportsStringId.WebDocumentViewer_AriaEditorKeyboardNavigation'), 500);
        }
        if (this._selectBox) {
            this._selectBox.focus();
            return;
        }
        if (this._menu) {
            this._menu.focus();
            return;
        }
        if (!ko.unwrap(this._toolbarItemModel.disabled))
            this._toolbarItemModel.clickAction();
    }
}
