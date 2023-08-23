﻿/**
* DevExpress Analytics (accessibility\_treeListKeyboardHelper.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { AccessibilityControlElementBase } from './_controlElementBase';
import { ListKeyboardHelper } from './_listKeyboardHelper';
export class TreeListKeyboardHelper extends ListKeyboardHelper {
    constructor() {
        super(...arguments);
        this.controlElementClassName = 'dx-accessibility-treelist-item';
    }
    _setFocusToParentNode(item, index) {
        var offset = 1;
        var parentItems = item.parent.items();
        var indexOfParent = parentItems.indexOf(item);
        var getChildCount = (item, _offset) => {
            if (item.hasItems && !item.collapsed()) {
                item.items().forEach(element => {
                    _offset += getChildCount(element, 0);
                });
            }
            _offset += 1;
            return _offset;
        };
        for (var i = 0; i < indexOfParent; i++) {
            offset += getChildCount(parentItems[i], 0);
        }
        this.changeFocus(index - offset);
    }
    _toggleCollapsed(item, model) {
        this.startIndex = this.getIndexByElement(item);
        model.toggleCollapsed();
    }
    _toggleSelected(el) {
        this._getItemModel(el).toggleSelected();
    }
    _getItemModel(el) {
        return ko.dataFor(el);
    }
    createControlElement(element, index) {
        return new AccessibilityControlElementBase(element);
    }
    itemHandleLeftArrowKey(e, index) {
        var item = this._getItemModel(e.target);
        if (item.hasItems && !item.collapsed()) {
            this._toggleCollapsed(e.target, item);
        }
        else {
            this._setFocusToParentNode(item, index);
        }
        return true;
    }
    itemHandleRightArrowKey(e, index) {
        var item = this._getItemModel(e.target);
        if (item.hasItems) {
            if (item.collapsed())
                this._toggleCollapsed(e.target, item);
            else
                this.changeFocus(index + 1, false);
        }
        return true;
    }
    itemHandleEnterKey(e, index) {
        this._toggleSelected(e.target);
        return true;
    }
    itemHandleSpaceKey(e, index) {
        this._toggleSelected(e.target);
        return true;
    }
    clickHandler(e, index) {
        super.clickHandler(e, index);
        this.startIndex = index;
    }
}
