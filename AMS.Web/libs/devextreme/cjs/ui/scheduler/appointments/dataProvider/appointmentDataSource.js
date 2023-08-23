/**
 * DevExtreme (cjs/ui/scheduler/appointments/dataProvider/appointmentDataSource.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.AppointmentDataSource = void 0;
var _deferred = require("../../../../core/utils/deferred");

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
var STORE_EVENTS = {
    updating: "updating",
    push: "push"
};
var AppointmentDataSource = function() {
    function AppointmentDataSource(dataSource) {
        this.setDataSource(dataSource);
        this._updatedAppointmentKeys = []
    }
    var _proto = AppointmentDataSource.prototype;
    _proto._getStoreKey = function(target) {
        var store = this._dataSource.store();
        return store.keyOf(target)
    };
    _proto.setDataSource = function(dataSource) {
        this._dataSource = dataSource;
        this.cleanState();
        this._initStoreChangeHandlers()
    };
    _proto._initStoreChangeHandlers = function() {
        var _this = this;
        var dataSource = this._dataSource;
        var store = null === dataSource || void 0 === dataSource ? void 0 : dataSource.store();
        if (store) {
            store.on(STORE_EVENTS.updating, (function(key) {
                var keyName = store.key();
                if (keyName) {
                    _this._updatedAppointmentKeys.push({
                        key: keyName,
                        value: key
                    })
                } else {
                    _this._updatedAppointment = key
                }
            }));
            store.on(STORE_EVENTS.push, (function(pushItems) {
                var items = dataSource.items();
                var keyName = store.key();
                pushItems.forEach((function(pushItem) {
                    var itemExists = 0 !== items.filter((function(item) {
                        return item[keyName] === pushItem.key
                    })).length;
                    if (itemExists) {
                        _this._updatedAppointmentKeys.push({
                            key: keyName,
                            value: pushItem.key
                        })
                    } else {
                        var data = pushItem.data;
                        data && items.push(data)
                    }
                }));
                dataSource.load()
            }))
        }
    };
    _proto.getUpdatedAppointment = function() {
        return this._updatedAppointment
    };
    _proto.getUpdatedAppointmentKeys = function() {
        return this._updatedAppointmentKeys
    };
    _proto.cleanState = function() {
        this._updatedAppointment = null;
        this._updatedAppointmentKeys = []
    };
    _proto.add = function(rawAppointment) {
        var _this2 = this;
        return this._dataSource.store().insert(rawAppointment).done((function() {
            return _this2._dataSource.load()
        }))
    };
    _proto.update = function(target, data) {
        var _this3 = this;
        var key = this._getStoreKey(target);
        var d = new _deferred.Deferred;
        this._dataSource.store().update(key, data).done((function(result) {
            return _this3._dataSource.load().done((function() {
                return d.resolve(result)
            })).fail(d.reject)
        })).fail(d.reject);
        return d.promise()
    };
    _proto.remove = function(rawAppointment) {
        var _this4 = this;
        var key = this._getStoreKey(rawAppointment);
        return this._dataSource.store().remove(key).done((function() {
            return _this4._dataSource.load()
        }))
    };
    _proto.destroy = function() {
        var _this$_dataSource;
        var store = null === (_this$_dataSource = this._dataSource) || void 0 === _this$_dataSource ? void 0 : _this$_dataSource.store();
        if (store) {
            store.off(STORE_EVENTS.updating);
            store.off(STORE_EVENTS.push)
        }
    };
    _createClass(AppointmentDataSource, [{
        key: "keyName",
        get: function() {
            var store = this._dataSource.store();
            return store.key()
        }
    }, {
        key: "isDataSourceInit",
        get: function() {
            return !!this._dataSource
        }
    }]);
    return AppointmentDataSource
}();
exports.AppointmentDataSource = AppointmentDataSource;
