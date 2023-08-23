/**
 * DevExtreme (esm/common/data/custom-store.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
function isGroupItem(item) {
    if (void 0 === item || null === item || "object" !== typeof item) {
        return false
    }
    return "key" in item && "items" in item
}
export function isLoadResultObject(res) {
    return !Array.isArray(res) && "data" in res
}
export function isGroupItemsArray(res) {
    return Array.isArray(res) && !!res.length && isGroupItem(res[0])
}
export function isItemsArray(res) {
    return Array.isArray(res) && !isGroupItem(res[0])
}
