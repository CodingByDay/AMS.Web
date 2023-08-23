/**
 * DevExtreme (cjs/renovation/ui/scheduler/utils/filtering/getDatesWithoutTime.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _date = _interopRequireDefault(require("../../../../../core/utils/date"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var getDatesWithoutTime = function(min, max) {
    var newMin = _date.default.trimTime(min);
    var newMax = _date.default.trimTime(max);
    newMax.setDate(newMax.getDate() + 1);
    return [newMin, newMax]
};
var _default = getDatesWithoutTime;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
