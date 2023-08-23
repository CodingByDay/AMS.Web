/**
 * DevExtreme (cjs/core/utils/position.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.getDefaultAlignment = exports.getBoundingRect = void 0;
var _config = _interopRequireDefault(require("../config"));
var _type = require("../utils/type");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var getDefaultAlignment = function(isRtlEnabled) {
    var rtlEnabled = null !== isRtlEnabled && void 0 !== isRtlEnabled ? isRtlEnabled : (0, _config.default)().rtlEnabled;
    return rtlEnabled ? "right" : "left"
};
exports.getDefaultAlignment = getDefaultAlignment;
var getBoundingRect = function(element) {
    if ((0, _type.isWindow)(element)) {
        return {
            width: element.outerWidth,
            height: element.outerHeight
        }
    }
    return element.getBoundingClientRect()
};
exports.getBoundingRect = getBoundingRect;
