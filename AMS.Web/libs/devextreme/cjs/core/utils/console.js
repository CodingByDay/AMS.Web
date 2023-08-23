/**
 * DevExtreme (cjs/core/utils/console.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.logger = exports.debug = void 0;
var _type = require("./type");
var noop = function() {};
var getConsoleMethod = function(method) {
    if ("undefined" === typeof console || !(0, _type.isFunction)(console[method])) {
        return noop
    }
    return console[method].bind(console)
};
var logger = {
    log: getConsoleMethod("log"),
    info: getConsoleMethod("info"),
    warn: getConsoleMethod("warn"),
    error: getConsoleMethod("error")
};
exports.logger = logger;
var debug = function() {
    function assert(condition, message) {
        if (!condition) {
            throw new Error(message)
        }
    }
    return {
        assert: assert,
        assertParam: function(parameter, message) {
            assert(null !== parameter && void 0 !== parameter, message)
        }
    }
}();
exports.debug = debug;
