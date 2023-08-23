/**
 * DevExtreme (esm/integration/knockout/utils.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import ko from "knockout";
import $ from "../../core/renderer";
export var getClosestNodeWithContext = node => {
    var context = ko.contextFor(node);
    if (!context && node.parentNode) {
        return getClosestNodeWithContext(node.parentNode)
    }
    return node
};
export var getClosestNodeWithKoCreation = node => {
    var $el = $(node);
    var data = $el.data();
    var hasFlag = data && data.dxKoCreation;
    if (hasFlag) {
        return node
    }
    if (node.parentNode) {
        return getClosestNodeWithKoCreation(node.parentNode)
    }
    return null
};
