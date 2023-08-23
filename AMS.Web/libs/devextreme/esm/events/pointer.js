/**
 * DevExtreme (esm/events/pointer.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import * as support from "../core/utils/support";
import {
    each
} from "../core/utils/iterator";
import devices from "../core/devices";
import registerEvent from "./core/event_registrator";
import TouchStrategy from "./pointer/touch";
import MouseStrategy from "./pointer/mouse";
import MouseAndTouchStrategy from "./pointer/mouse_and_touch";
var getStrategy = (support, device) => {
    var {
        tablet: tablet,
        phone: phone
    } = device;
    if (support.touch && !(tablet || phone)) {
        return MouseAndTouchStrategy
    }
    if (support.touch) {
        return TouchStrategy
    }
    return MouseStrategy
};
var EventStrategy = getStrategy(support, devices.real());
each(EventStrategy.map, (pointerEvent, originalEvents) => {
    registerEvent(pointerEvent, new EventStrategy(pointerEvent, originalEvents))
});
var pointer = {
    down: "dxpointerdown",
    up: "dxpointerup",
    move: "dxpointermove",
    cancel: "dxpointercancel",
    enter: "dxpointerenter",
    leave: "dxpointerleave",
    over: "dxpointerover",
    out: "dxpointerout"
};
export default pointer;
