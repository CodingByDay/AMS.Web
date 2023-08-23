"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsProvider = void 0;
var Shape_1 = require("../Shapes/Shape");
var Utils_1 = require("../../Utils");
var ModelOperationSettings_1 = require("../../ModelOperationSettings");
var Connector_1 = require("../Connectors/Connector");
var AddShape_1 = require("./Entities/AddShape");
var DeleteShape_1 = require("./Entities/DeleteShape");
var DeleteConnector_1 = require("./Entities/DeleteConnector");
var AddShapeFromToolbox_1 = require("./Entities/AddShapeFromToolbox");
var ChangeConnection_1 = require("./Entities/ChangeConnection");
var ChangeConnectorPoints_1 = require("./Entities/ChangeConnectorPoints");
var BeforeChangeShapeText_1 = require("./Entities/BeforeChangeShapeText");
var BeforeChangeConnectorText_1 = require("./Entities/BeforeChangeConnectorText");
var ChangeShapeText_1 = require("./Entities/ChangeShapeText");
var ChangeConnectorText_1 = require("./Entities/ChangeConnectorText");
var PermissionsProviderStorage_1 = require("./PermissionsProviderStorage");
var ResizeShape_1 = require("./Entities/ResizeShape");
var MoveShape_1 = require("./Entities/MoveShape");
var PermissionsProvider = (function () {
    function PermissionsProvider(apiController) {
        this.onRequestOperation = new Utils_1.EventDispatcher();
        this.cache = [];
        this.permissionsLockCount = 0;
        this.requestDeleteItems = {};
        this.updateUICount = 0;
        this.apiController = apiController;
        this.operationSettings = new ModelOperationSettings_1.ModelOperationSettings();
        this.storage = new PermissionsProviderStorage_1.PermissionsProviderStorage();
    }
    PermissionsProvider.prototype.notifySelectionChanged = function (_selection) {
        this.clearCache();
    };
    PermissionsProvider.prototype.notifyModelChanged = function (changes) {
        this.clearCache();
    };
    PermissionsProvider.prototype.notifyPageColorChanged = function (color) { };
    PermissionsProvider.prototype.notifyPageSizeChanged = function (pageSize, pageLandscape) { };
    PermissionsProvider.prototype.clearCache = function (operation) {
        if (operation !== undefined)
            this.cache = this.cache.filter(function (entry) { return entry.operation !== operation; });
        else
            this.cache = [];
    };
    PermissionsProvider.prototype.canDeleteItems = function (items) {
        var _this = this;
        var allowed = true;
        items.forEach(function (item) {
            var entity;
            if (item instanceof Shape_1.Shape)
                entity = new DeleteShape_1.DeleteShapeRequestedEntity(_this.apiController, item);
            if (item instanceof Connector_1.Connector)
                entity = new DeleteConnector_1.DeleteConnectorRequestedEntity(_this.apiController, item);
            allowed = allowed && _this.requestOperation(entity);
        });
        return allowed;
    };
    PermissionsProvider.prototype.canAddItems = function (items) {
        var _this = this;
        var allowed = true;
        items.forEach(function (item) {
            if (item instanceof Shape_1.Shape)
                allowed = allowed && _this.requestOperation(new AddShape_1.AddShapeRequestedEntity(_this.apiController, item));
            if (item instanceof Connector_1.Connector) {
                allowed = allowed && _this.canChangeConnection(item, item.beginItem, undefined, Connector_1.ConnectorPosition.Begin, item.beginConnectionPointIndex);
                allowed = allowed && _this.canChangeConnection(item, item.endItem, undefined, Connector_1.ConnectorPosition.End, item.endConnectionPointIndex);
            }
        });
        return allowed;
    };
    PermissionsProvider.prototype.canAddShapeFromToolbox = function (itemType) {
        return this.requestOperation(new AddShapeFromToolbox_1.AddShapeFromToolboxRequestedEntity(this.apiController, itemType));
    };
    PermissionsProvider.prototype.canChangeConnection = function (connector, item, oldItem, position, connectionPointIndex) {
        if (connector && this.requestDeleteItems[connector.key])
            return true;
        if (item === undefined || item === null || item instanceof Shape_1.Shape)
            return this.requestOperation(new ChangeConnection_1.ChangeConnectionRequestedEntity(this.apiController, connector, item, oldItem, position, connectionPointIndex));
        return true;
    };
    PermissionsProvider.prototype.canChangeConnectorPoints = function (connector, oldPoints, points) {
        if (connector && this.requestDeleteItems[connector.key])
            return true;
        return this.requestOperation(new ChangeConnectorPoints_1.ChangeConnectorPointsRequestedEntity(this.apiController, connector, oldPoints, points));
    };
    PermissionsProvider.prototype.canChangeShapeText = function (shape) {
        return this.requestOperation(new BeforeChangeShapeText_1.BeforeChangeShapeTextRequestedEntity(this.apiController, shape));
    };
    PermissionsProvider.prototype.canChangeConnectorText = function (connector, position) {
        return this.requestOperation(new BeforeChangeConnectorText_1.BeforeChangeConnectorTextRequestedEntity(this.apiController, connector, position));
    };
    PermissionsProvider.prototype.canApplyShapeTextChange = function (shape, textToApply) {
        return this.requestOperation(new ChangeShapeText_1.ChangeShapeTextRequestedEntity(this.apiController, shape, textToApply));
    };
    PermissionsProvider.prototype.canApplyConnectorTextChange = function (connector, position, textToApply) {
        return this.requestOperation(new ChangeConnectorText_1.ChangeConnectorTextRequestedEntity(this.apiController, connector, position, textToApply));
    };
    PermissionsProvider.prototype.canResizeShapes = function (shapeInfo) {
        var _this = this;
        var allowed = true;
        shapeInfo.forEach(function (info) {
            allowed = allowed && _this.requestOperation(new ResizeShape_1.ResizeShapeRequestedEntity(_this.apiController, info.shape, info.oldSize, info.size));
        });
        return allowed;
    };
    PermissionsProvider.prototype.canMoveShapes = function (shapeInfo) {
        var _this = this;
        var allowed = true;
        shapeInfo.forEach(function (info) {
            allowed = allowed && _this.requestOperation(new MoveShape_1.MoveShapeRequestedEntity(_this.apiController, info.shape, info.oldPosition, info.position));
        });
        return allowed;
    };
    PermissionsProvider.prototype.requestOperation = function (entity) {
        var allowed = true;
        if (!this.permissionsLockCount) {
            var cachedEntity_1;
            if (this.updateUICount > 0)
                this.cache.forEach(function (item) {
                    if (item.equals(entity)) {
                        cachedEntity_1 = item;
                        return;
                    }
                });
            if (cachedEntity_1)
                allowed = cachedEntity_1.allowed;
            else {
                this.requestOperationCore(entity);
                if (this.updateUICount > 0)
                    this.cache.push(entity);
                allowed = entity.allowed;
            }
            if (this.updateUICount === 0 && this.storage.needStorePermissions()) {
                this.storage.storePermission(entity.storageKey, allowed);
                return this.storage.isStoredPermissionsGranted();
            }
        }
        return allowed;
    };
    PermissionsProvider.prototype.requestOperationCore = function (entity) {
        entity.eventArgs.allowed = this.operationSettings[entity.settingsKey];
        entity.eventArgs.updateUI = this.updateUICount > 0;
        if (entity.allowed)
            this.onRequestOperation.raise("notifyRequestOperation", entity.operation, entity.eventArgs);
    };
    PermissionsProvider.prototype.lockPermissions = function () {
        this.permissionsLockCount++;
    };
    PermissionsProvider.prototype.unlockPermissions = function () {
        this.permissionsLockCount--;
    };
    PermissionsProvider.prototype.beginDeleteItems = function (items) {
        var _this = this;
        items.forEach(function (item) { return _this.requestDeleteItems[item.key] = item; });
    };
    PermissionsProvider.prototype.endDeleteItems = function () {
        this.requestDeleteItems = {};
    };
    PermissionsProvider.prototype.beginUpdateUI = function () {
        this.updateUICount++;
    };
    PermissionsProvider.prototype.endUpdateUI = function () {
        this.updateUICount--;
    };
    PermissionsProvider.prototype.addInteractingItem = function (item, operation) {
        this.storage.addInteractingItem(item, operation);
    };
    PermissionsProvider.prototype.getInteractingItem = function (item, operation) {
        return this.storage.getInteractingItem(item, operation);
    };
    PermissionsProvider.prototype.getInteractingItemCount = function () {
        return this.storage.getInteractingItemCount();
    };
    PermissionsProvider.prototype.clearInteractingItems = function () {
        this.storage.clearInteractingItems();
    };
    PermissionsProvider.prototype.beginStorePermissions = function () {
        this.storage.beginStorePermissions();
    };
    PermissionsProvider.prototype.endStorePermissions = function () {
        this.storage.endStorePermissions();
    };
    PermissionsProvider.prototype.isStoredPermissionsGranted = function () {
        return this.permissionsLockCount > 0 || this.storage.isStoredPermissionsGranted();
    };
    return PermissionsProvider;
}());
exports.PermissionsProvider = PermissionsProvider;
//# sourceMappingURL=PermissionsProvider.js.map