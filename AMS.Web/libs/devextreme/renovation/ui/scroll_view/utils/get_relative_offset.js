/**
 * DevExtreme (renovation/ui/scroll_view/utils/get_relative_offset.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.getRelativeOffset = getRelativeOffset;

function getRelativeOffset(targetElementClass, sourceElement) {
    var offset = {
        left: 0,
        top: 0
    };
    var element = sourceElement;
    while (null !== (_element = element) && void 0 !== _element && _element.offsetParent && !element.classList.contains(targetElementClass)) {
        var _element;
        var parentElement = element.offsetParent;
        var elementRect = element.getBoundingClientRect();
        var parentElementRect = parentElement.getBoundingClientRect();
        offset.left += elementRect.left - parentElementRect.left;
        offset.top += elementRect.top - parentElementRect.top;
        element = element.offsetParent
    }
    return offset
}
