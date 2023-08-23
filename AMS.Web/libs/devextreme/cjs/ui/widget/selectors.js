/**
 * DevExtreme (cjs/ui/widget/selectors.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.tabbable = exports.focused = exports.focusable = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var focusableFn = function(element, tabIndex) {
    if (!visible(element)) {
        return false
    }
    var nodeName = element.nodeName.toLowerCase();
    var isTabIndexNotNaN = !isNaN(tabIndex);
    var isDisabled = element.disabled;
    var isDefaultFocus = /^(input|select|textarea|button|object|iframe)$/.test(nodeName);
    var isHyperlink = "a" === nodeName;
    var isFocusable;
    var isContentEditable = element.isContentEditable;
    if (isDefaultFocus || isContentEditable) {
        isFocusable = !isDisabled
    } else if (isHyperlink) {
        isFocusable = element.href || isTabIndexNotNaN
    } else {
        isFocusable = isTabIndexNotNaN
    }
    return isFocusable
};

function visible(element) {
    var $element = (0, _renderer.default)(element);
    return $element.is(":visible") && "hidden" !== $element.css("visibility") && "hidden" !== $element.parents().css("visibility")
}
var focusable = function(index, element) {
    return focusableFn(element, (0, _renderer.default)(element).attr("tabIndex"))
};
exports.focusable = focusable;
var tabbable = function(index, element) {
    var tabIndex = (0, _renderer.default)(element).attr("tabIndex");
    return (isNaN(tabIndex) || tabIndex >= 0) && focusableFn(element, tabIndex)
};
exports.tabbable = tabbable;
var focused = function($element) {
    var element = (0, _renderer.default)($element).get(0);
    return _dom_adapter.default.getActiveElement(element) === element
};
exports.focused = focused;
