/**
 * DevExtreme (esm/viz/funnel/tiling.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    normalizeEnum as _normalizeEnum
} from "../core/utils";
var algorithms = {};
var defaultAlgorithm;
export function getAlgorithm(name) {
    return algorithms[_normalizeEnum(name)] || defaultAlgorithm
}
export function addAlgorithm(name, callback, setDefault) {
    algorithms[name] = callback;
    if (setDefault) {
        defaultAlgorithm = algorithms[name]
    }
}
