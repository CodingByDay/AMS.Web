/**
 * DevExtreme (cjs/renovation/ui/scroll_view/utils/get_translate_values.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.getTranslateValues = getTranslateValues;
var _get_element_style = require("./get_element_style");

function getTranslateValues(el) {
    var matrix = (0, _get_element_style.getElementTransform)(el);
    var matrixValues = /matrix.*\((.+)\)/.exec(matrix);
    if (matrixValues) {
        var result = matrixValues[1].split(", ");
        return {
            left: Number(result[4]),
            top: Number(result[5])
        }
    }
    return {
        left: 0,
        top: 0
    }
}
