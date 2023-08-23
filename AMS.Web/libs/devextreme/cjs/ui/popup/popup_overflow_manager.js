/**
 * DevExtreme (cjs/ui/popup/popup_overflow_manager.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.createBodyOverflowManager = void 0;
var _window = require("../../core/utils/window");
var _type = require("../../core/utils/type");
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _common = require("../../core/utils/common");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var overflowManagerMock = {
    setOverflow: _common.noop,
    restoreOverflow: _common.noop
};
var createBodyOverflowManager = function() {
    if (!(0, _window.hasWindow)()) {
        return overflowManagerMock
    }
    var window = (0, _window.getWindow)();
    var documentElement = _dom_adapter.default.getDocument().documentElement;
    var body = _dom_adapter.default.getBody();
    var isIosDevice = "ios" === _devices.default.real().platform;
    var prevSettings = {
        overflow: null,
        overflowX: null,
        overflowY: null,
        paddingRight: null,
        position: null,
        top: null,
        left: null
    };
    var setBodyPaddingRight = function() {
        var scrollBarWidth = window.innerWidth - documentElement.clientWidth;
        if (prevSettings.paddingRight || scrollBarWidth <= 0) {
            return
        }
        var paddingRight = window.getComputedStyle(body).getPropertyValue("padding-right");
        var computedBodyPaddingRight = parseInt(paddingRight, 10);
        prevSettings.paddingRight = computedBodyPaddingRight;
        body.style.setProperty("padding-right", "".concat(computedBodyPaddingRight + scrollBarWidth, "px"))
    };
    var restoreBodyPaddingRight = function() {
        if (!(0, _type.isDefined)(prevSettings.paddingRight)) {
            return
        }
        if (prevSettings.paddingRight) {
            body.style.setProperty("padding-right", "".concat(prevSettings.paddingRight, "px"))
        } else {
            body.style.removeProperty("padding-right")
        }
        prevSettings.paddingRight = null
    };
    return {
        setOverflow: isIosDevice ? function() {
            if ((0, _type.isDefined)(prevSettings.position) || "fixed" === body.style.position) {
                return
            }
            var scrollY = window.scrollY,
                scrollX = window.scrollX;
            prevSettings.position = body.style.position;
            prevSettings.top = body.style.top;
            prevSettings.left = body.style.left;
            body.style.setProperty("position", "fixed");
            body.style.setProperty("top", "".concat(-scrollY, "px"));
            body.style.setProperty("left", "".concat(-scrollX, "px"))
        } : function() {
            setBodyPaddingRight();
            if (prevSettings.overflow || "hidden" === body.style.overflow) {
                return
            }
            prevSettings.overflow = body.style.overflow;
            prevSettings.overflowX = body.style.overflowX;
            prevSettings.overflowY = body.style.overflowY;
            body.style.setProperty("overflow", "hidden")
        },
        restoreOverflow: isIosDevice ? function() {
            if (!(0, _type.isDefined)(prevSettings.position)) {
                return
            }
            var scrollY = -parseInt(body.style.top, 10);
            var scrollX = -parseInt(body.style.left, 10);
            ["position", "top", "left"].forEach((function(property) {
                if (prevSettings[property]) {
                    body.style.setProperty(property, prevSettings[property])
                } else {
                    body.style.removeProperty(property)
                }
            }));
            window.scrollTo(scrollX, scrollY);
            prevSettings.position = null
        } : function() {
            restoreBodyPaddingRight();
            ["overflow", "overflowX", "overflowY"].forEach((function(property) {
                if (!(0, _type.isDefined)(prevSettings[property])) {
                    return
                }
                var propertyInKebabCase = property.replace(/(X)|(Y)/, (function(symbol) {
                    return "-".concat(symbol.toLowerCase())
                }));
                if (prevSettings[property]) {
                    body.style.setProperty(propertyInKebabCase, prevSettings[property])
                } else {
                    body.style.removeProperty(propertyInKebabCase)
                }
                prevSettings[property] = null
            }))
        }
    }
};
exports.createBodyOverflowManager = createBodyOverflowManager;
