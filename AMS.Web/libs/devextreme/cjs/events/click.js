/**
 * DevExtreme (cjs/events/click.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.name = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));
var _devices = _interopRequireDefault(require("../core/devices"));
var _dom_adapter = _interopRequireDefault(require("../core/dom_adapter"));
var _dom = require("../core/utils/dom");
var _frame = require("../animation/frame");
var _index = require("./utils/index");
var _event_nodes_disposing = require("./utils/event_nodes_disposing");
var _pointer = _interopRequireDefault(require("./pointer"));
var _emitter = _interopRequireDefault(require("./core/emitter"));
var _emitter_registrator = _interopRequireDefault(require("./core/emitter_registrator"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var CLICK_EVENT_NAME = "dxclick";
exports.name = CLICK_EVENT_NAME;
var misc = {
    requestAnimationFrame: _frame.requestAnimationFrame,
    cancelAnimationFrame: _frame.cancelAnimationFrame
};
var prevented = null;
var lastFiredEvent = null;
var onNodeRemove = function() {
    lastFiredEvent = null
};
var clickHandler = function(e) {
    var originalEvent = e.originalEvent;
    var eventAlreadyFired = lastFiredEvent === originalEvent || originalEvent && originalEvent.DXCLICK_FIRED;
    var leftButton = !e.which || 1 === e.which;
    if (leftButton && !prevented && !eventAlreadyFired) {
        if (originalEvent) {
            originalEvent.DXCLICK_FIRED = true
        }(0, _event_nodes_disposing.unsubscribeNodesDisposing)(lastFiredEvent, onNodeRemove);
        lastFiredEvent = originalEvent;
        (0, _event_nodes_disposing.subscribeNodesDisposing)(lastFiredEvent, onNodeRemove);
        (0, _index.fireEvent)({
            type: CLICK_EVENT_NAME,
            originalEvent: e
        })
    }
};
var ClickEmitter = _emitter.default.inherit({
    ctor: function(element) {
        this.callBase(element);
        _events_engine.default.on(this.getElement(), "click", clickHandler)
    },
    start: function(e) {
        prevented = null
    },
    cancel: function() {
        prevented = true
    },
    dispose: function() {
        _events_engine.default.off(this.getElement(), "click", clickHandler)
    }
});
! function() {
    var desktopDevice = _devices.default.real().generic;
    if (!desktopDevice) {
        var startTarget = null;
        var blurPrevented = false;
        var document = _dom_adapter.default.getDocument();
        _events_engine.default.subscribeGlobal(document, (0, _index.addNamespace)(_pointer.default.down, "NATIVE_CLICK_FIXER"), (function(e) {
            startTarget = e.target;
            blurPrevented = e.isDefaultPrevented()
        }));
        _events_engine.default.subscribeGlobal(document, (0, _index.addNamespace)("click", "NATIVE_CLICK_FIXER"), (function(e) {
            var $target = (0, _renderer.default)(e.target);
            if (!blurPrevented && startTarget && !$target.is(startTarget) && !(0, _renderer.default)(startTarget).is("label") && (element = $target, (0, _renderer.default)(element).is("input, textarea, select, button ,:focus, :focus *"))) {
                (0, _dom.resetActiveElement)()
            }
            var element;
            startTarget = null;
            blurPrevented = false
        }))
    }
}();
(0, _emitter_registrator.default)({
    emitter: ClickEmitter,
    bubble: true,
    events: [CLICK_EVENT_NAME]
});
