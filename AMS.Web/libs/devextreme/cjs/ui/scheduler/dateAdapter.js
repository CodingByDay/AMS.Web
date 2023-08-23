/**
 * DevExtreme (cjs/ui/scheduler/dateAdapter.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _date = _interopRequireDefault(require("../../core/utils/date"));

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
var toMs = _date.default.dateToMilliseconds;
var DateAdapterCore = function() {
    function DateAdapterCore(source) {
        this._source = new Date(source.getTime ? source.getTime() : source)
    }
    var _proto = DateAdapterCore.prototype;
    _proto.result = function() {
        return this._source
    };
    _proto.getTimezoneOffset = function() {
        var format = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
        var value = this._source.getTimezoneOffset();
        if ("minute" === format) {
            return value * toMs("minute")
        }
        return value
    };
    _proto.getTime = function() {
        return this._source.getTime()
    };
    _proto.setTime = function(value) {
        this._source.setTime(value);
        return this
    };
    _proto.addTime = function(value) {
        this._source.setTime(this._source.getTime() + value);
        return this
    };
    _proto.setMinutes = function(value) {
        this._source.setMinutes(value);
        return this
    };
    _proto.addMinutes = function(value) {
        this._source.setMinutes(this._source.getMinutes() + value);
        return this
    };
    _proto.subtractMinutes = function(value) {
        this._source.setMinutes(this._source.getMinutes() - value);
        return this
    };
    _createClass(DateAdapterCore, [{
        key: "source",
        get: function() {
            return this._source
        }
    }]);
    return DateAdapterCore
}();
var DateAdapter = function(date) {
    return new DateAdapterCore(date)
};
var _default = DateAdapter;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
