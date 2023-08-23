/**
 * DevExtreme (renovation/ui/scroll_view/utils/get_bounding_rect.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.getBoundingRect = getBoundingRect;

function getBoundingRect(el) {
    return null !== el && void 0 !== el && el.getBoundingClientRect ? el.getBoundingClientRect() : {
        width: 0,
        height: 0,
        bottom: 0,
        top: 0,
        left: 0,
        right: 0
    }
}
