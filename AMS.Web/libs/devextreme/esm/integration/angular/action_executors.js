/**
 * DevExtreme (esm/integration/angular/action_executors.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import Action from "../../core/action";
import angular from "angular";
if (angular) {
    Action.registerExecutor({
        ngExpression: {
            execute: function(e) {
                if ("string" === typeof e.action) {
                    e.context.$eval(e.action)
                }
            }
        }
    })
}
