﻿/**
* DevExpress Analytics (core\tools\_keyboardHelper.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { addDisposeCallback } from '../../serializer/_internal';
import { Disposable } from '../../serializer/utils';
import { KeyboardCodesEnum } from '../../property-grid/widgets/internal/_utils';
export class KeyboardHelperBase extends Disposable {
    _processShortcut(map, e, index) {
        var method = map[KeyboardCodesEnum[e.keyCode]];
        if (method) {
            return method(e, index);
        }
        return false;
    }
    processShortcut(e, index) {
        return this._processShortcut(this.shortcutMap, e, index);
    }
    processChildrenShortcut(e, index) {
        return this._processShortcut(this.childrenShortcutMap, e, index);
    }
}
export class KeyboardHelper extends KeyboardHelperBase {
    constructor(selection, undoEngine) {
        super();
        this._selection = selection;
        this._undoEngine = undoEngine;
        this.shortcutMap = {
            Esc: (e) => { this.processEsc(); return true; },
            Left: (e) => { this.moveSelectedControls(true, true, -1); return true; },
            Up: (e) => { this.moveSelectedControls(true, false, -1); return true; },
            Right: (e) => { this.moveSelectedControls(false, true, 1); return true; },
            Down: (e) => { this.moveSelectedControls(false, false, 1); return true; }
        };
    }
    processEsc() {
        var parent = this._selection.focused() && this._selection.focused().parent;
        parent && this._selection.focused(parent);
    }
    moveSelectedControls(leftUp, isHoriz, sign) {
        var focusedControl = this._selection.focused();
        if (!focusedControl || focusedControl && focusedControl.getControlModel().getMetaData().isCopyDeny) {
            return;
        }
        this._undoEngine && this._undoEngine().start();
        var distance = 1, axisProperty = isHoriz ? 'left' : 'top', lengthProperty = isHoriz ? 'width' : 'height', minAxis, maxSide, newAxis;
        if (focusedControl.rect) {
            minAxis = focusedControl.rect()[axisProperty];
            maxSide = focusedControl.rect()[axisProperty] + focusedControl.rect()[lengthProperty];
        }
        else {
            return;
        }
        this._selection.selectedItems.filter((item) => { return !item.locked; }).forEach((item) => {
            var axis = item.rect()[axisProperty];
            if (axis < minAxis) {
                minAxis = axis;
            }
        });
        this._selection.selectedItems.filter((item) => { return !item.locked; }).forEach((item) => {
            var side = item.rect()[axisProperty] + item.rect()[lengthProperty];
            if (side > maxSide) {
                maxSide = side;
            }
        });
        if ((leftUp && minAxis <= 0) || (!focusedControl.parent.rect || (!leftUp && maxSide.toFixed(5) >= focusedControl.parent.rect()[lengthProperty]))) {
            return;
        }
        else {
            this._selection.selectedItems.filter((item) => { return !item.locked; })
                .filter((item) => { return !!item.rect; })
                .forEach((item) => {
                var newVal = {}, itemAxisProperty = item.rect()[axisProperty], itemLengthProperty = item.rect()[lengthProperty], parentLengthProperty = item.parent.rect()[lengthProperty];
                newAxis = itemAxisProperty + sign * distance;
                if ((leftUp && newAxis >= 0) || (!leftUp && (newAxis + itemLengthProperty) <= parentLengthProperty)) {
                    newVal[axisProperty] = newAxis;
                }
                if (!leftUp && (newAxis + itemLengthProperty) > parentLengthProperty) {
                    newVal[axisProperty] = parentLengthProperty - itemLengthProperty;
                }
                if (leftUp && newAxis < 0 && itemAxisProperty > 0) {
                    newVal[axisProperty] = 0;
                }
                item.rect(newVal);
            });
        }
        this._undoEngine && this._undoEngine().end();
    }
}
export class KeyDownHandlersManager {
    constructor(targetElement) {
        this._handlers = [];
        this._targetElement = targetElement;
    }
    get _activeHandler() {
        return this._handlers.length > 0 ? this._handlers[this._handlers.length - 1] : null;
    }
    _removeHandler(handler, eventName) {
        var index = this._handlers.indexOf(handler);
        if (index < 0)
            return;
        this._handlers.splice(index, 1);
        if (index === this._handlers.length) {
            this._targetElement.removeEventListener(eventName, handler);
            if (this._activeHandler)
                this._targetElement.addEventListener(eventName, this._activeHandler);
        }
    }
    bindHandler(element, handler, eventName = 'keydown') {
        if (this._activeHandler)
            this._targetElement.removeEventListener(eventName, this._activeHandler);
        var _handler = (e) => {
            if ($.fn.constructor(this._targetElement).closest('.dx-designer').length > 0 ||
                $.fn.constructor(e.target).closest('.dx-designer').length > 0 ||
                e.target === document.body)
                handler(e);
        };
        this._handlers.push(_handler);
        this._targetElement.addEventListener(eventName, _handler);
        addDisposeCallback(element, () => { this._removeHandler(_handler, eventName); });
    }
}
