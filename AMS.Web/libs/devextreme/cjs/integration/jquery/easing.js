/**
 * DevExtreme (cjs/integration/jquery/easing.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _jquery = _interopRequireDefault(require("jquery"));
var _easing = require("../../animation/easing");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
if (_jquery.default) {
    (0, _easing.setEasing)(_jquery.default.easing)
}
