/**
 * DevExtreme (cjs/core/element_data.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.afterCleanData = afterCleanData;
exports.beforeCleanData = beforeCleanData;
exports.cleanData = cleanData;
exports.cleanDataRecursive = cleanDataRecursive;
exports.data = data;
exports.getDataStrategy = getDataStrategy;
exports.removeData = removeData;
exports.strategyChanging = exports.setDataStrategy = void 0;
var _dom_adapter = _interopRequireDefault(require("./dom_adapter"));
var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));
var _memorized_callbacks = _interopRequireDefault(require("./memorized_callbacks"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var dataMap = new WeakMap;
var strategy;
var strategyChanging = new _memorized_callbacks.default;
exports.strategyChanging = strategyChanging;
var beforeCleanDataFunc = function() {};
var afterCleanDataFunc = function() {};
var setDataStrategy = function(value) {
    strategyChanging.fire(value);
    strategy = value;
    var cleanData = strategy.cleanData;
    strategy.cleanData = function(nodes) {
        beforeCleanDataFunc(nodes);
        var result = cleanData.call(this, nodes);
        afterCleanDataFunc(nodes);
        return result
    }
};
exports.setDataStrategy = setDataStrategy;
setDataStrategy({
    data: function() {
        var element = arguments[0];
        var key = arguments[1];
        var value = arguments[2];
        if (!element) {
            return
        }
        var elementData = dataMap.get(element);
        if (!elementData) {
            elementData = {};
            dataMap.set(element, elementData)
        }
        if (void 0 === key) {
            return elementData
        }
        if (2 === arguments.length) {
            return elementData[key]
        }
        elementData[key] = value;
        return value
    },
    removeData: function(element, key) {
        if (!element) {
            return
        }
        if (void 0 === key) {
            dataMap.delete(element)
        } else {
            var elementData = dataMap.get(element);
            if (elementData) {
                delete elementData[key]
            }
        }
    },
    cleanData: function(elements) {
        for (var i = 0; i < elements.length; i++) {
            _events_engine.default.off(elements[i]);
            dataMap.delete(elements[i])
        }
    }
});

function getDataStrategy() {
    return strategy
}

function data() {
    return strategy.data.apply(this, arguments)
}

function beforeCleanData(callback) {
    beforeCleanDataFunc = callback
}

function afterCleanData(callback) {
    afterCleanDataFunc = callback
}

function cleanData(nodes) {
    return strategy.cleanData.call(this, nodes)
}

function removeData(element, key) {
    return strategy.removeData.call(this, element, key)
}

function cleanDataRecursive(element, cleanSelf) {
    if (!_dom_adapter.default.isElementNode(element)) {
        return
    }
    var childElements = element.getElementsByTagName("*");
    strategy.cleanData(childElements);
    if (cleanSelf) {
        strategy.cleanData([element])
    }
}
