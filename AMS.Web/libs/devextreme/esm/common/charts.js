/**
 * DevExtreme (esm/common/charts.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import {
    getNextDefsSvgId
} from "../viz/core/utils";
var graphicObjects = {};
export var registerPattern = options => {
    var id = getNextDefsSvgId();
    graphicObjects[id] = _extends({
        type: "pattern"
    }, options);
    return id
};
export var registerGradient = (type, options) => {
    var id = getNextDefsSvgId();
    graphicObjects[id] = _extends({
        type: type
    }, options);
    return id
};
export var getGraphicObjects = () => graphicObjects;
