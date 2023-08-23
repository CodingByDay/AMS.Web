/**
 * DevExtreme (esm/events/remove.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import $ from "../core/renderer";
import {
    beforeCleanData
} from "../core/element_data";
import eventsEngine from "./core/events_engine";
import registerEvent from "./core/event_registrator";
export var removeEvent = "dxremove";
var eventPropName = "dxRemoveEvent";
beforeCleanData((function(elements) {
    elements = [].slice.call(elements);
    for (var i = 0; i < elements.length; i++) {
        var $element = $(elements[i]);
        if ($element.prop(eventPropName)) {
            $element[0][eventPropName] = null;
            eventsEngine.triggerHandler($element, removeEvent)
        }
    }
}));
registerEvent(removeEvent, {
    noBubble: true,
    setup: function(element) {
        $(element).prop(eventPropName, true)
    }
});
