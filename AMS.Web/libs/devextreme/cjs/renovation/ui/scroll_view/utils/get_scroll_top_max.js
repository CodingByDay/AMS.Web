/**
 * DevExtreme (cjs/renovation/ui/scroll_view/utils/get_scroll_top_max.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.getScrollTopMax = getScrollTopMax;

function getScrollTopMax(element) {
    return element.scrollHeight - element.clientHeight
}
