/**
 * DevExtreme (esm/ui/form/components/empty_item.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import $ from "../../../core/renderer";
export var FIELD_EMPTY_ITEM_CLASS = "dx-field-empty-item";
export function renderEmptyItem(_ref) {
    var {
        $parent: $parent,
        rootElementCssClassList: rootElementCssClassList
    } = _ref;
    return $("<div>").addClass(FIELD_EMPTY_ITEM_CLASS).html("&nbsp;").addClass(rootElementCssClassList.join(" ")).appendTo($parent)
}
