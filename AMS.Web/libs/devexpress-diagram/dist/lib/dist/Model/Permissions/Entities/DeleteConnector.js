"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteConnectorEventArgs = exports.DeleteConnectorRequestedEntity = void 0;
var ModelOperationSettings_1 = require("../../../ModelOperationSettings");
var RequestedEntity_1 = require("./RequestedEntity");
var DeleteConnectorRequestedEntity = (function (_super) {
    __extends(DeleteConnectorRequestedEntity, _super);
    function DeleteConnectorRequestedEntity(apiController, connector) {
        var _this = _super.call(this, apiController) || this;
        _this.connector = connector;
        return _this;
    }
    Object.defineProperty(DeleteConnectorRequestedEntity.prototype, "operation", {
        get: function () {
            return ModelOperationSettings_1.DiagramModelOperation.DeleteConnector;
        },
        enumerable: false,
        configurable: true
    });
    DeleteConnectorRequestedEntity.prototype.createEventArgs = function () {
        return new DeleteConnectorEventArgs(this.apiController.createNativeConnector(this.connector));
    };
    Object.defineProperty(DeleteConnectorRequestedEntity.prototype, "settingsKey", {
        get: function () {
            return "deleteConnector";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DeleteConnectorRequestedEntity.prototype, "storageKey", {
        get: function () {
            return this.settingsKey + "_" + (this.connector && this.connector.key);
        },
        enumerable: false,
        configurable: true
    });
    DeleteConnectorRequestedEntity.prototype.equals = function (other) {
        if (other instanceof DeleteConnectorRequestedEntity)
            return this.connector === other.connector;
        return false;
    };
    return DeleteConnectorRequestedEntity;
}(RequestedEntity_1.RequestedEntity));
exports.DeleteConnectorRequestedEntity = DeleteConnectorRequestedEntity;
var DeleteConnectorEventArgs = (function (_super) {
    __extends(DeleteConnectorEventArgs, _super);
    function DeleteConnectorEventArgs(connector) {
        var _this = _super.call(this) || this;
        _this.connector = connector;
        return _this;
    }
    return DeleteConnectorEventArgs;
}(RequestedEntity_1.PermissionRequestEventArgs));
exports.DeleteConnectorEventArgs = DeleteConnectorEventArgs;
//# sourceMappingURL=DeleteConnector.js.map