/**
 * DevExtreme (cjs/ui/scheduler/publisher_mixin.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var publisherMixin = {
    notifyObserver: function(subject, args) {
        var observer = this.option("observer");
        if (observer) {
            observer.fire(subject, args)
        }
    },
    invoke: function() {
        var observer = this.option("observer");
        if (observer) {
            return observer.fire.apply(observer, arguments)
        }
    }
};
var _default = publisherMixin;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
