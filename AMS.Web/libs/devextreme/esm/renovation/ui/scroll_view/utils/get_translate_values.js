/**
 * DevExtreme (esm/renovation/ui/scroll_view/utils/get_translate_values.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    getElementTransform
} from "./get_element_style";
export function getTranslateValues(el) {
    var matrix = getElementTransform(el);
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
