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
exports.ChangeConnectionEventArgs = exports.ChangeConnectionRequestedEntity = void 0;
var ModelOperationSettings_1 = require("../../../ModelOperationSettings");
var RequestedEntity_1 = require("./RequestedEntity");
var ChangeConnectionRequestedEntity = (function (_super) {
    __extends(ChangeConnectionRequestedEntity, _super);
    function ChangeConnectionRequestedEntity(apiController, connector, shape, oldShape, position, connectionPointIndex) {
        var _this = _super.call(this, apiController) || this;
        _this.connector = connector;
        _this.shape = shape;
        _this.oldShape = oldShape;
        _this.position = position;
        _this.connectionPointIndex = connectionPointIndex;
        return _this;
    }
    Object.defineProperty(ChangeConnectionRequestedEntity.prototype, "operation", {
        get: function () {
            return ModelOperationSettings_1.DiagramModelOperation.ChangeConnection;
        },
        enumerable: false,
        configurable: true
    });
    ChangeConnectionRequestedEntity.prototype.createEventArgs = function () {
        return new ChangeConnectionEventArgs(this.apiController.createNativeConnector(this.connector), this.apiController.createNativeShape(this.shape), this.apiController.createNativeShape(this.oldShape), this.position, this.connectionPointIndex);
    };
    Object.defineProperty(ChangeConnectionRequestedEntity.prototype, "settingsKey", {
        get: function () {
            return "changeConnection";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChangeConnectionRequestedEntity.prototype, "storageKey", {
        get: function () {
            return this.settingsKey + "_" + (this.connector && this.connector.key) + "_" + this.position;
        },
        enumerable: false,
        configurable: true
    });
    ChangeConnectionRequestedEntity.prototype.equals = function (other) {
        if (other instanceof ChangeConnectionRequestedEntity) {
            var connectorsAreEqual = (!this.connector && !other.connector) || (this.connector && other.connector && this.connector === other.connector);
            var shapesAreEqual = (!this.shape && !other.shape) || (this.shape && other.shape && this.shape === other.shape);
            var oldShapesAreEqual = (!this.oldShape && !other.oldShape) || (this.oldShape && other.oldShape && this.oldShape === other.oldShape);
            return shapesAreEqual && oldShapesAreEqual && connectorsAreEqual && this.position === other.position && this.connectionPointIndex === other.connectionPointIndex;
        }
        return false;
    };
    return ChangeConnectionRequestedEntity;
}(RequestedEntity_1.RequestedEntity));
exports.ChangeConnectionRequestedEntity = ChangeConnectionRequestedEntity;
var ChangeConnectionEventArgs = (function (_super) {
    __extends(ChangeConnectionEventArgs, _super);
    function ChangeConnectionEventArgs(connector, shape, oldShape, position, connectionPointIndex) {
        var _this = _super.call(this) || this;
        _this.connector = connector;
        _this.shape = shape;
        _this.oldShape = oldShape;
        _this.position = position;
        _this.connectionPointIndex = connectionPointIndex;
        return _this;
    }
    return ChangeConnectionEventArgs;
}(RequestedEntity_1.PermissionRequestEventArgs));
exports.ChangeConnectionEventArgs = ChangeConnectionEventArgs;
//# sourceMappingURL=ChangeConnection.js.map