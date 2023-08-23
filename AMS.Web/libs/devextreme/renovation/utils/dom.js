/**
 * DevExtreme (renovation/utils/dom.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.querySelectorInSameDocument = querySelectorInSameDocument;

function querySelectorInSameDocument(el, selector) {
    var _el$getRootNode, _el$getRootNode2;
    var root = null !== (_el$getRootNode = null === (_el$getRootNode2 = el.getRootNode) || void 0 === _el$getRootNode2 ? void 0 : _el$getRootNode2.call(el)) && void 0 !== _el$getRootNode ? _el$getRootNode : document;
    return root.querySelector(selector)
}
