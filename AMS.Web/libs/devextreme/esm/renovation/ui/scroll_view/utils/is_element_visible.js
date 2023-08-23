/**
 * DevExtreme (esm/renovation/ui/scroll_view/utils/is_element_visible.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
export function isElementVisible(element) {
    if (element) {
        var _element$getClientRec;
        return !!(element.offsetWidth || element.offsetHeight || null !== (_element$getClientRec = element.getClientRects) && void 0 !== _element$getClientRec && _element$getClientRec.call(element).length)
    }
    return false
}
