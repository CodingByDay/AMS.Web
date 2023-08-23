/**
 * DevExtreme (cjs/ui/form/ui.form.items_runtime_info.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _guid = _interopRequireDefault(require("../../core/guid"));
var _iterator = require("../../core/utils/iterator");
var _extend = require("../../core/utils/extend");
var _type = require("../../core/utils/type");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var FormItemsRunTimeInfo = function() {
    function FormItemsRunTimeInfo() {
        this._map = {}
    }
    var _proto = FormItemsRunTimeInfo.prototype;
    _proto._findWidgetInstance = function(condition) {
        var result;
        (0, _iterator.each)(this._map, (function(guid, _ref) {
            var widgetInstance = _ref.widgetInstance,
                item = _ref.item;
            if (condition(item)) {
                result = widgetInstance;
                return false
            }
        }));
        return result
    };
    _proto._findFieldByCondition = function(callback, valueExpr) {
        var result;
        (0, _iterator.each)(this._map, (function(key, value) {
            if (callback(value)) {
                result = "guid" === valueExpr ? key : value[valueExpr];
                return false
            }
        }));
        return result
    };
    _proto.clear = function() {
        this._map = {}
    };
    _proto.removeItemsByItems = function(itemsRunTimeInfo) {
        var _this = this;
        (0, _iterator.each)(itemsRunTimeInfo.getItems(), (function(guid) {
            return _this.removeItemByKey(guid)
        }))
    };
    _proto.removeItemByKey = function(key) {
        delete this._map[key]
    };
    _proto.add = function(options) {
        var key = options.guid || new _guid.default;
        this._map[key] = options;
        return key
    };
    _proto.addItemsOrExtendFrom = function(itemsRunTimeInfo) {
        var _this2 = this;
        itemsRunTimeInfo.each((function(key, itemRunTimeInfo) {
            if (_this2._map[key]) {
                if (itemRunTimeInfo.widgetInstance) {
                    _this2._map[key].widgetInstance = itemRunTimeInfo.widgetInstance
                }
                _this2._map[key].$itemContainer = itemRunTimeInfo.$itemContainer
            } else {
                _this2.add({
                    item: itemRunTimeInfo.item,
                    widgetInstance: itemRunTimeInfo.widgetInstance,
                    guid: key,
                    $itemContainer: itemRunTimeInfo.$itemContainer
                })
            }
        }))
    };
    _proto.extendRunTimeItemInfoByKey = function(key, options) {
        if (this._map[key]) {
            this._map[key] = (0, _extend.extend)(this._map[key], options)
        }
    };
    _proto.findWidgetInstanceByItem = function(item) {
        return this._findWidgetInstance((function(storedItem) {
            return storedItem === item
        }))
    };
    _proto.findGroupOrTabLayoutManagerByPath = function(targetPath) {
        return this._findFieldByCondition((function(_ref2) {
            var path = _ref2.path;
            return path === targetPath
        }), "layoutManager")
    };
    _proto.findKeyByPath = function(targetPath) {
        return this._findFieldByCondition((function(_ref3) {
            var path = _ref3.path;
            return path === targetPath
        }), "guid")
    };
    _proto.findWidgetInstanceByName = function(name) {
        return this._findWidgetInstance((function(item) {
            return name === item.name
        }))
    };
    _proto.findWidgetInstanceByDataField = function(dataField) {
        return this._findWidgetInstance((function(item) {
            return dataField === ((0, _type.isString)(item) ? item : item.dataField)
        }))
    };
    _proto.findItemContainerByItem = function(item) {
        for (var key in this._map) {
            if (this._map[key].item === item) {
                return this._map[key].$itemContainer
            }
        }
        return null
    };
    _proto.findItemIndexByItem = function(targetItem) {
        return this._findFieldByCondition((function(_ref4) {
            var item = _ref4.item;
            return item === targetItem
        }), "itemIndex")
    };
    _proto.findPreparedItemByItem = function(item) {
        return this._findFieldByCondition((function(_ref5) {
            var currentItem = _ref5.item;
            return currentItem === item
        }), "preparedItem")
    };
    _proto.getItems = function() {
        return this._map
    };
    _proto.each = function(handler) {
        (0, _iterator.each)(this._map, (function(key, itemRunTimeInfo) {
            handler(key, itemRunTimeInfo)
        }))
    };
    _proto.removeItemsByPathStartWith = function(path) {
        var _this3 = this;
        var keys = Object.keys(this._map);
        var filteredKeys = keys.filter((function(key) {
            if (_this3._map[key].path) {
                return _this3._map[key].path.indexOf(path, 0) > -1
            }
            return false
        }));
        filteredKeys.forEach((function(key) {
            return _this3.removeItemByKey(key)
        }))
    };
    return FormItemsRunTimeInfo
}();
exports.default = FormItemsRunTimeInfo;
module.exports = exports.default;
module.exports.default = exports.default;
