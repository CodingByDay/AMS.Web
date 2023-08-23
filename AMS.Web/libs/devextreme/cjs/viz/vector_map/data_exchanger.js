/**
 * DevExtreme (cjs/viz/vector_map/data_exchanger.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.DataExchanger = DataExchanger;
var _callbacks = _interopRequireDefault(require("../../core/utils/callbacks"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

function DataExchanger() {
    this._store = {}
}
DataExchanger.prototype = {
    constructor: DataExchanger,
    dispose: function() {
        this._store = null;
        return this
    },
    _get: function(category, name) {
        var store = this._store[category] || (this._store[category] = {});
        return store[name] || (store[name] = {
            callbacks: (0, _callbacks.default)()
        })
    },
    set: function(category, name, data) {
        var item = this._get(category, name);
        item.data = data;
        item.callbacks.fire(data);
        return this
    },
    bind: function(category, name, callback) {
        var item = this._get(category, name);
        item.callbacks.add(callback);
        item.data && callback(item.data);
        return this
    },
    unbind: function(category, name, callback) {
        var item = this._get(category, name);
        item.callbacks.remove(callback);
        return this
    }
};
