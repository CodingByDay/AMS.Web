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
exports.DeleteShapeEventArgs = exports.DeleteShapeRequestedEntity = void 0;
var ModelOperationSettings_1 = require("../../../ModelOperationSettings");
var RequestedEntity_1 = require("./RequestedEntity");
var DeleteShapeRequestedEntity = (function (_super) {
    __extends(DeleteShapeRequestedEntity, _super);
    function DeleteShapeRequestedEntity(apiController, shape) {
        var _this = _super.call(this, apiController) || this;
        _this.shape = shape;
        return _this;
    }
    Object.defineProperty(DeleteShapeRequestedEntity.prototype, "operation", {
        get: function () {
            return ModelOperationSettings_1.DiagramModelOperation.DeleteShape;
        },
        enumerable: false,
        configurable: true
    });
    DeleteShapeRequestedEntity.prototype.createEventArgs = function () {
        return new DeleteShapeEventArgs(this.apiController.createNativeShape(this.shape));
    };
    Object.defineProperty(DeleteShapeRequestedEntity.prototype, "settingsKey", {
        get: function () {
            return "deleteShape";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DeleteShapeRequestedEntity.prototype, "storageKey", {
        get: function () {
            return this.settingsKey + "_" + (this.shape && this.shape.key);
        },
        enumerable: false,
        configurable: true
    });
    DeleteShapeRequestedEntity.prototype.equals = function (other) {
        if (other instanceof DeleteShapeRequestedEntity)
            return this.shape === other.shape;
        return false;
    };
    return DeleteShapeRequestedEntity;
}(RequestedEntity_1.RequestedEntity));
exports.DeleteShapeRequestedEntity = DeleteShapeRequestedEntity;
var DeleteShapeEventArgs = (function (_super) {
    __extends(DeleteShapeEventArgs, _super);
    function DeleteShapeEventArgs(shape) {
        var _this = _super.call(this) || this;
        _this.shape = shape;
        return _this;
    }
    return DeleteShapeEventArgs;
}(RequestedEntity_1.PermissionRequestEventArgs));
exports.DeleteShapeEventArgs = DeleteShapeEventArgs;
//# sourceMappingURL=DeleteShape.js.map