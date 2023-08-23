/**
 * DevExtreme (cjs/ui/gantt/ui.gantt.task.area.container.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.TaskAreaContainer = void 0;
var _scroll_view = _interopRequireDefault(require("../scroll_view"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

function _typeof(obj) {
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
    }, _typeof(obj)
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true
        }
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor)
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps)
    }
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor
}

function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return "symbol" === _typeof(key) ? key : String(key)
}

function _toPrimitive(input, hint) {
    if ("object" !== _typeof(input) || null === input) {
        return input
    }
    var prim = input[Symbol.toPrimitive];
    if (void 0 !== prim) {
        var res = prim.call(input, hint || "default");
        if ("object" !== _typeof(res)) {
            return res
        }
        throw new TypeError("@@toPrimitive must return a primitive value.")
    }
    return ("string" === hint ? String : Number)(input)
}
var TaskAreaContainer = function() {
    function TaskAreaContainer(element, ganttViewWidget) {
        this._element = element;
        this._scrollView = ganttViewWidget._createComponent(this._element, _scroll_view.default, {
            scrollByContent: false,
            scrollByThumb: true,
            showScrollbar: "onHover",
            direction: "both",
            onScroll: function() {
                ganttViewWidget.updateView()
            }
        })
    }
    var _proto = TaskAreaContainer.prototype;
    _proto.getWidth = function() {
        return this._element.offsetWidth
    };
    _proto.getHeight = function() {
        return this._element.offsetHeight
    };
    _proto.getElement = function() {
        return this._element
    };
    _createClass(TaskAreaContainer, [{
        key: "scrollTop",
        get: function() {
            return this._scrollView.scrollTop()
        },
        set: function(value) {
            var diff = value - this._scrollView.scrollTop();
            if (0 !== diff) {
                this._scrollView.scrollBy({
                    left: 0,
                    top: diff
                })
            }
        }
    }, {
        key: "scrollLeft",
        get: function() {
            return this._scrollView.scrollLeft()
        },
        set: function(value) {
            var diff = value - this._scrollView.scrollLeft();
            if (0 !== diff) {
                this._scrollView.scrollBy({
                    left: diff,
                    top: 0
                })
            }
        }
    }, {
        key: "scrollWidth",
        get: function() {
            return this._scrollView.scrollWidth()
        }
    }, {
        key: "scrollHeight",
        get: function() {
            return this._scrollView.scrollHeight()
        }
    }, {
        key: "isExternal",
        get: function() {
            return true
        }
    }]);
    return TaskAreaContainer
}();
exports.TaskAreaContainer = TaskAreaContainer;
