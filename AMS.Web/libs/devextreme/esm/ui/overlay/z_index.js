/**
 * DevExtreme (esm/ui/overlay/z_index.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    ensureDefined
} from "../../core/utils/common";
var baseZIndex = 1500;
var zIndexStack = [];
export var base = ZIndex => {
    baseZIndex = ensureDefined(ZIndex, baseZIndex);
    return baseZIndex
};
export var create = function() {
    var baseIndex = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : baseZIndex;
    var length = zIndexStack.length;
    var index = (length ? zIndexStack[length - 1] : baseIndex) + 1;
    zIndexStack.push(index);
    return index
};
export var remove = zIndex => {
    var position = zIndexStack.indexOf(zIndex);
    if (position >= 0) {
        zIndexStack.splice(position, 1)
    }
};
export var isLastZIndexInStack = zIndex => zIndexStack.length && zIndexStack[zIndexStack.length - 1] === zIndex;
export var clearStack = () => {
    zIndexStack = []
};
