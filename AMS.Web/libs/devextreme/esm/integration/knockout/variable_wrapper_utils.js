/**
 * DevExtreme (esm/integration/knockout/variable_wrapper_utils.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import ko from "knockout";
import variableWrapper from "../../core/utils/variable_wrapper";
if (ko) {
    variableWrapper.inject({
        isWrapped: ko.isObservable,
        isWritableWrapped: ko.isWritableObservable,
        wrap: ko.observable,
        unwrap: function(value) {
            if (ko.isObservable(value)) {
                return ko.utils.unwrapObservable(value)
            }
            return this.callBase(value)
        },
        assign: function(variable, value) {
            if (ko.isObservable(variable)) {
                variable(value)
            } else {
                this.callBase(variable, value)
            }
        }
    })
}
