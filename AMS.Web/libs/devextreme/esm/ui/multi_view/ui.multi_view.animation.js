/**
 * DevExtreme (esm/ui/multi_view/ui.multi_view.animation.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import fx from "../../animation/fx";
import {
    move
} from "../../animation/translator";
export var _translator = {
    move($element, position) {
        move($element, {
            left: position
        })
    }
};
export var animation = {
    moveTo($element, position, duration, completeAction) {
        fx.animate($element, {
            type: "slide",
            to: {
                left: position
            },
            duration: duration,
            complete: completeAction
        })
    },
    complete($element) {
        fx.stop($element, true)
    }
};
