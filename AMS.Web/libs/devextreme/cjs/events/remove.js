/**
 * DevExtreme (cjs/events/remove.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.removeEvent = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _element_data = require("../core/element_data");
var _events_engine = _interopRequireDefault(require("./core/events_engine"));
var _event_registrator = _interopRequireDefault(require("./core/event_registrator"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var removeEvent = "dxremove";
exports.removeEvent = removeEvent;
var eventPropName = "dxRemoveEvent";
(0, _element_data.beforeCleanData)((function(elements) {
    elements = [].slice.call(elements);
    for (var i = 0; i < elements.length; i++) {
        var $element = (0, _renderer.default)(elements[i]);
        if ($element.prop(eventPropName)) {
            $element[0][eventPropName] = null;
            _events_engine.default.triggerHandler($element, removeEvent)
        }
    }
}));
(0, _event_registrator.default)(removeEvent, {
    noBubble: true,
    setup: function(element) {
        (0, _renderer.default)(element).prop(eventPropName, true)
    }
});
