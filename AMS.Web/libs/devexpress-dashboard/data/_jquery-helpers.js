﻿/**
* DevExpress Dashboard (_jquery-helpers.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJQueryElement = exports.jqueryOffset = exports.jqueryQueryParam = exports.jqueryWhenArray = exports.jqueryWhen = exports.createJQueryDeferred = exports.createJQueryCallbacks = exports.closest = exports.isVisible = exports.accessJQueryData = exports.wrapInner = exports.getOuterHeight = exports.getOuterWidth = exports.getHeight = exports.getWidth = exports.isPlainObject = exports.deepExtend = exports.extend = exports.wrapPublicElement = exports.$wrap = exports.$unwrap = exports.$promiseAdapter = void 0;
const config_1 = require("devextreme/core/config");
const $ = require("jquery");
const $promiseAdapter = (promise) => promise;
exports.$promiseAdapter = $promiseAdapter;
const $unwrap = (element) => {
    if (element.jquery || element.dxRenderer) {
        return element[0];
    }
    else {
        return element;
    }
};
exports.$unwrap = $unwrap;
const $wrap = (element) => $.fn.constructor(element);
exports.$wrap = $wrap;
const wrapPublicElement = (element) => (config_1.default().useJQuery ? exports.$wrap(element) : element);
exports.wrapPublicElement = wrapPublicElement;
const extend = (target, source1, ...sources) => $.extend(target, source1, ...sources);
exports.extend = extend;
const deepExtend = (target, ...sources) => $.extend(true, target, ...sources);
exports.deepExtend = deepExtend;
const isPlainObject = (object) => $.isPlainObject(object);
exports.isPlainObject = isPlainObject;
const getWidth = (element) => $.fn.constructor(element).width();
exports.getWidth = getWidth;
const getHeight = (element) => $.fn.constructor(element).height();
exports.getHeight = getHeight;
const getOuterWidth = (element) => $.fn.constructor(element).outerWidth();
exports.getOuterWidth = getOuterWidth;
const getOuterHeight = (element) => $.fn.constructor(element).outerHeight();
exports.getOuterHeight = getOuterHeight;
const wrapInner = (element, wrappingElement) => $.fn.constructor(element).wrapInner(wrappingElement);
exports.wrapInner = wrapInner;
const accessJQueryData = function (element, key, value) {
    if (arguments.length > 2) {
        $.fn.constructor(element).data(key, value);
    }
    else {
        return $.fn.constructor(element).data(key);
    }
};
exports.accessJQueryData = accessJQueryData;
const isVisible = (element) => $.fn.constructor(element).is(':visible');
exports.isVisible = isVisible;
const closest = (element, css) => {
    var node = element;
    var matches = node.matches || node.matchesSelector || node.webkitMatchesSelector || node.mozMatchesSelector || node.msMatchesSelector || node.oMatchesSelector;
    while (node) {
        if (matches.apply(node, [css]))
            return node;
        node = closestParentElement(node);
    }
    return null;
};
exports.closest = closest;
const closestParentElement = (node) => {
    while (node && !node.parentElement) {
        node = node.parentNode;
    }
    return node ? node.parentElement : null;
};
const createJQueryCallbacks = () => $.Callbacks();
exports.createJQueryCallbacks = createJQueryCallbacks;
const createJQueryDeferred = () => $.Deferred();
exports.createJQueryDeferred = createJQueryDeferred;
const jqueryWhen = (...promises) => $.when(...promises);
exports.jqueryWhen = jqueryWhen;
const jqueryWhenArray = (promises) => $.when.apply($.when, promises);
exports.jqueryWhenArray = jqueryWhenArray;
const jqueryQueryParam = (value) => $.param(value);
exports.jqueryQueryParam = jqueryQueryParam;
const jqueryOffset = (element) => $.fn.constructor(element).offset();
exports.jqueryOffset = jqueryOffset;
const createJQueryElement = (element, options) => $.fn.constructor(element, options);
exports.createJQueryElement = createJQueryElement;
