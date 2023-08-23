/**
 * DevExtreme (esm/core/http_request.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    getWindow
} from "./utils/window";
var window = getWindow();
import injector from "./utils/dependency_injector";
var nativeXMLHttpRequest = {
    getXhr: function() {
        return new window.XMLHttpRequest
    }
};
export default injector(nativeXMLHttpRequest);
