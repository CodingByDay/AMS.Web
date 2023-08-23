/**
 * DevExtreme (cjs/core/utils/locker.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _errors = _interopRequireDefault(require("../errors"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var Locker = function() {
    var info = {};
    var currentCount = function(lockName) {
        return info[lockName] || 0
    };
    return {
        obtain: function(lockName) {
            info[lockName] = currentCount(lockName) + 1
        },
        release: function(lockName) {
            var count = currentCount(lockName);
            if (count < 1) {
                throw _errors.default.Error("E0014")
            }
            if (1 === count) {
                delete info[lockName]
            } else {
                info[lockName] = count - 1
            }
        },
        locked: function(lockName) {
            return currentCount(lockName) > 0
        }
    }
};
var _default = Locker;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
