"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsProviderStorage = void 0;
var Shape_1 = require("../Shapes/Shape");
var Connector_1 = require("../Connectors/Connector");
var PermissionsProviderStorage = (function () {
    function PermissionsProviderStorage() {
        this.interactingItems = {};
        this.storedPermissions = {};
    }
    PermissionsProviderStorage.prototype.addInteractingItem = function (item, operation) {
        var key = this.getInteractingItemKey(item, operation);
        if (this.interactingItems[key] === undefined && (item instanceof Shape_1.Shape || item instanceof Connector_1.Connector))
            this.interactingItems[key] = item.clone();
    };
    PermissionsProviderStorage.prototype.getInteractingItem = function (item, operation) {
        var key = this.getInteractingItemKey(item, operation);
        return this.interactingItems[key];
    };
    PermissionsProviderStorage.prototype.getInteractingItemCount = function () {
        return Object.keys(this.interactingItems).length;
    };
    PermissionsProviderStorage.prototype.clearInteractingItems = function () {
        this.interactingItems = {};
    };
    PermissionsProviderStorage.prototype.getInteractingItemKey = function (item, operation) {
        return item.key + (operation !== undefined ? "_" + operation.toString() : "");
    };
    PermissionsProviderStorage.prototype.needStorePermissions = function () {
        return this.storePermissions;
    };
    PermissionsProviderStorage.prototype.beginStorePermissions = function () {
        this.storePermissions = true;
    };
    PermissionsProviderStorage.prototype.endStorePermissions = function () {
        this.storePermissions = false;
        this.storedPermissions = {};
    };
    PermissionsProviderStorage.prototype.isStoredPermissionsGranted = function () {
        var keys = Object.keys(this.storedPermissions);
        var granted = true;
        for (var i = 0; i < keys.length; i++)
            granted = granted && this.storedPermissions[keys[i]];
        return granted;
    };
    PermissionsProviderStorage.prototype.storePermission = function (key, allowed) {
        this.storedPermissions[key] = allowed;
    };
    return PermissionsProviderStorage;
}());
exports.PermissionsProviderStorage = PermissionsProviderStorage;
//# sourceMappingURL=PermissionsProviderStorage.js.map