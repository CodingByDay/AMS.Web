/**
 * DevExtreme (cjs/ui/text_box/utils.scroll.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.prepareScrollData = exports.allowScroll = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _index = require("../../events/utils/index");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var allowScroll = function(container, delta, shiftKey) {
    var $container = (0, _renderer.default)(container);
    var scrollTopPos = shiftKey ? $container.scrollLeft() : $container.scrollTop();
    var prop = shiftKey ? "Width" : "Height";
    var scrollSize = $container.prop("scroll".concat(prop));
    var clientSize = $container.prop("client".concat(prop));
    var scrollBottomPos = scrollSize - clientSize - scrollTopPos | 0;
    if (0 === scrollTopPos && 0 === scrollBottomPos) {
        return false
    }
    var isScrollFromTop = 0 === scrollTopPos && delta >= 0;
    var isScrollFromBottom = 0 === scrollBottomPos && delta <= 0;
    var isScrollFromMiddle = scrollTopPos > 0 && scrollBottomPos > 0;
    if (isScrollFromTop || isScrollFromBottom || isScrollFromMiddle) {
        return true
    }
};
exports.allowScroll = allowScroll;
var prepareScrollData = function(container, validateTarget) {
    var $container = (0, _renderer.default)(container);
    return {
        validate: function(e) {
            if ((0, _index.isDxMouseWheelEvent)(e) && (eventTarget = e.target, validateTarget ? (0, _renderer.default)(eventTarget).is(container) : true)) {
                if (allowScroll($container, -e.delta, e.shiftKey)) {
                    e._needSkipEvent = true;
                    return true
                }
                return false
            }
            var eventTarget
        }
    }
};
exports.prepareScrollData = prepareScrollData;
