/**
 * DevExtreme (renovation/ui/scroll_view/utils/get_scroll_left_max.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.getScrollLeftMax = getScrollLeftMax;

function getScrollLeftMax(element) {
    return element.scrollWidth - element.clientWidth
}
