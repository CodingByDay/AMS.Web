"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Selection = void 0;
var Utils_1 = require("../Utils");
var InputPosition_1 = require("./InputPosition");
var Shape_1 = require("../Model/Shapes/Shape");
var Connector_1 = require("../Model/Connectors/Connector");
var Data_1 = require("../Utils/Data");
var Selection = (function () {
    function Selection(model) {
        this.onChanged = new Utils_1.EventDispatcher();
        this.inputPosition = new InputPosition_1.InputPosition(this);
        this.onChanged.add(this.inputPosition);
        this.initialize(model);
    }
    Selection.prototype.initialize = function (model) {
        this.model = model;
        this.keys = [];
        this.inputPosition.initialize();
    };
    Selection.prototype.add = function (key) {
        if (this.keys.indexOf(key) < 0) {
            this.keys.push(key);
            this.raiseSelectionChanged();
        }
    };
    Selection.prototype.remove = function (key) {
        if (this.keys.indexOf(key) >= 0) {
            this.keys.splice(this.keys.indexOf(key), 1);
            this.raiseSelectionChanged();
        }
    };
    Selection.prototype.clear = function () {
        if (this.keys.length > 0) {
            this.keys = [];
            this.raiseSelectionChanged();
        }
    };
    Selection.prototype.set = function (keys, forceChange) {
        if (forceChange || !Data_1.Data.ArrayEqual(keys, this.keys)) {
            this.keys = keys;
            this.raiseSelectionChanged();
        }
    };
    Selection.prototype.getKeys = function () {
        return this.keys;
    };
    Selection.prototype.getKey = function (index) {
        return this.keys[index];
    };
    Selection.prototype.getSelectedItemsInsideContainers = function (items) {
        var _this = this;
        var result = items.slice();
        items.forEach(function (item) {
            if (item instanceof Shape_1.Shape) {
                var children = _this.getSelectedItemsInsideContainers(_this.model.getChildren(item));
                children.forEach(function (child) {
                    if (result.indexOf(child) === -1 && !_this.hasKey(child.key))
                        result.push(child);
                });
            }
        });
        return result;
    };
    Selection.prototype.getSelectedItemsCore = function (includeLocked) {
        var _this = this;
        return this.keys.map(function (key) { return _this.model.findItem(key); })
            .filter(function (item) { return item && (includeLocked || !item.isLocked); });
    };
    Selection.prototype.getSelectedItems = function (includeLocked, includeInsideContainers) {
        if (includeInsideContainers)
            return this.getSelectedItemsInsideContainers(this.getSelectedItemsCore(includeLocked));
        return this.getSelectedItemsCore(includeLocked);
    };
    Selection.prototype.getSelectedShapes = function (includeLocked, includeInsideContainers) {
        var _this = this;
        if (includeInsideContainers) {
            var items = this.getSelectedItemsCore(includeLocked);
            return this.getSelectedItemsInsideContainers(items)
                .map(function (item) { return item instanceof Shape_1.Shape ? item : undefined; })
                .filter(function (shape) { return shape; });
        }
        else
            return this.keys.map(function (key) { return _this.model.findShape(key); })
                .filter(function (shape) { return shape && (includeLocked || !shape.isLocked); });
    };
    Selection.prototype.getSelectedConnectors = function (includeLocked, includeInsideContainers) {
        var _this = this;
        if (includeInsideContainers) {
            var items = this.keys.map(function (key) { return _this.model.findItem(key); });
            return this.getSelectedItemsInsideContainers(items)
                .map(function (item) { return item instanceof Connector_1.Connector ? item : undefined; })
                .filter(function (connector) { return connector && (includeLocked || !connector.isLocked); });
        }
        else
            return this.keys.map(function (key) { return _this.model.findConnector(key); })
                .filter(function (conn) { return conn && (includeLocked || !conn.isLocked); });
    };
    Selection.prototype.hasKey = function (key) {
        return this.keys.indexOf(key) >= 0;
    };
    Selection.prototype.isEmpty = function (includeLocked) {
        return !this.getSelectedItems(includeLocked).length;
    };
    Selection.prototype.selectRect = function (rect) {
        var keys = [];
        this.model.iterateItems(function (item) {
            if (item.intersectedByRect(rect))
                keys.push(item.key);
        });
        this.set(keys);
    };
    Selection.prototype.raiseSelectionChanged = function () {
        this.onChanged.raise("notifySelectionChanged", this);
    };
    return Selection;
}());
exports.Selection = Selection;
//# sourceMappingURL=Selection.js.map