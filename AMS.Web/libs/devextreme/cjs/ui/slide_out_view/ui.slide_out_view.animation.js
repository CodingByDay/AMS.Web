/**
 * DevExtreme (cjs/ui/slide_out_view/ui.slide_out_view.animation.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.animation = void 0;
var _fx = _interopRequireDefault(require("../../animation/fx"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var ANIMATION_DURATION = 400;
var animation = {
    moveTo: function($element, position, completeAction) {
        _fx.default.animate($element, {
            type: "slide",
            to: {
                left: position
            },
            duration: ANIMATION_DURATION,
            complete: completeAction
        })
    },
    complete: function($element) {
        _fx.default.stop($element, true)
    }
};
exports.animation = animation;
