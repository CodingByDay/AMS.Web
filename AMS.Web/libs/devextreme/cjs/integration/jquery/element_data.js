/**
 * DevExtreme (cjs/integration/jquery/element_data.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _jquery = _interopRequireDefault(require("jquery"));
var _element_data = require("../../core/element_data");
var _use_jquery = _interopRequireDefault(require("./use_jquery"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var useJQuery = (0, _use_jquery.default)();
if (useJQuery) {
    (0, _element_data.setDataStrategy)(_jquery.default)
}
