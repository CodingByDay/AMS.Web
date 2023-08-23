/**
 * DevExtreme (cjs/integration/angular/action_executors.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _action = _interopRequireDefault(require("../../core/action"));
var _angular = _interopRequireDefault(require("angular"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
if (_angular.default) {
    _action.default.registerExecutor({
        ngExpression: {
            execute: function(e) {
                if ("string" === typeof e.action) {
                    e.context.$eval(e.action)
                }
            }
        }
    })
}
