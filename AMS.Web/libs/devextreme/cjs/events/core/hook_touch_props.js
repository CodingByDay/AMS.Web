/**
 * DevExtreme (cjs/events/core/hook_touch_props.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = _default;
var touchPropsToHook = ["pageX", "pageY", "screenX", "screenY", "clientX", "clientY"];
var touchPropHook = function(name, event) {
    if (event[name] && !event.touches || !event.touches) {
        return event[name]
    }
    var touches = event.touches.length ? event.touches : event.changedTouches;
    if (!touches.length) {
        return
    }
    return touches[0][name]
};

function _default(callback) {
    touchPropsToHook.forEach((function(name) {
        callback(name, (function(event) {
            return touchPropHook(name, event)
        }))
    }), this)
}
module.exports = exports.default;
module.exports.default = exports.default;
