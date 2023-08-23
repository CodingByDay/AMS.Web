/**
 * DevExtreme (cjs/core/utils/support.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.pointerEvents = exports.nativeScrolling = exports.inputType = exports.animation = void 0;
Object.defineProperty(exports, "styleProp", {
    enumerable: true,
    get: function() {
        return _style.styleProp
    }
});
Object.defineProperty(exports, "stylePropPrefix", {
    enumerable: true,
    get: function() {
        return _style.stylePropPrefix
    }
});
exports.transitionEndEventName = exports.transition = exports.touchEvents = exports.touch = exports.supportProp = void 0;
var _dom_adapter = _interopRequireDefault(require("../dom_adapter"));
var _call_once = _interopRequireDefault(require("./call_once"));
var _window = require("./window");
var _devices = _interopRequireDefault(require("../devices"));
var _style = require("./style");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var _getNavigator = (0, _window.getNavigator)(),
    maxTouchPoints = _getNavigator.maxTouchPoints;
var transitionEndEventNames = {
    webkitTransition: "webkitTransitionEnd",
    MozTransition: "transitionend",
    OTransition: "oTransitionEnd",
    transition: "transitionend"
};
var supportProp = function(prop) {
    return !!(0, _style.styleProp)(prop)
};
exports.supportProp = supportProp;
var isNativeScrollingSupported = function() {
    var _devices$real = _devices.default.real(),
        platform = _devices$real.platform,
        isMac = _devices$real.mac;
    var isNativeScrollDevice = "ios" === platform || "android" === platform || isMac;
    return isNativeScrollDevice
};
var inputType = function(type) {
    if ("text" === type) {
        return true
    }
    var input = _dom_adapter.default.createElement("input");
    try {
        input.setAttribute("type", type);
        input.value = "wrongValue";
        return !input.value
    } catch (e) {
        return false
    }
};
exports.inputType = inputType;
var detectTouchEvents = function(hasWindowProperty, maxTouchPoints) {
    return (hasWindowProperty("ontouchstart") || !!maxTouchPoints) && !hasWindowProperty("callPhantom")
};
var detectPointerEvent = function(hasWindowProperty) {
    return hasWindowProperty("PointerEvent")
};
var touchEvents = detectTouchEvents(_window.hasProperty, maxTouchPoints);
exports.touchEvents = touchEvents;
var pointerEvents = detectPointerEvent(_window.hasProperty);
exports.pointerEvents = pointerEvents;
var touchPointersPresent = !!maxTouchPoints;
var touch = touchEvents || pointerEvents && touchPointersPresent;
exports.touch = touch;
var transition = (0, _call_once.default)((function() {
    return supportProp("transition")
}));
exports.transition = transition;
var transitionEndEventName = (0, _call_once.default)((function() {
    return transitionEndEventNames[(0, _style.styleProp)("transition")]
}));
exports.transitionEndEventName = transitionEndEventName;
var animation = (0, _call_once.default)((function() {
    return supportProp("animation")
}));
exports.animation = animation;
var nativeScrolling = isNativeScrollingSupported();
exports.nativeScrolling = nativeScrolling;
