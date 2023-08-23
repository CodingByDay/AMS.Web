/**
 * DevExtreme (esm/core/utils/storage.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    getWindow
} from "../../core/utils/window";
var window = getWindow();
var getSessionStorage = function() {
    var sessionStorage;
    try {
        sessionStorage = window.sessionStorage
    } catch (e) {}
    return sessionStorage
};
export {
    getSessionStorage as sessionStorage
};
