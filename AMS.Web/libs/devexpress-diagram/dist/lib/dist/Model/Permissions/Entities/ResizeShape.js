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
exports.ResizeShapeEventArgs = exports.ResizeShapeRequestedEntity = void 0;
var ModelOperationSettings_1 = require("../../../ModelOperationSettings");
var RequestedEntity_1 = require("./RequestedEntity");
var ResizeShapeRequestedEntity = (function (_super) {
    __extends(ResizeShapeRequestedEntity, _super);
    function ResizeShapeRequestedEntity(apiController, shape, oldSize, size) {
        var _this = _super.call(this, apiController) || this;
        _this.shape = shape;
        _this.oldSize = oldSize;
        _this.size = size;
        return _this;
    }
    Object.defineProperty(ResizeShapeRequestedEntity.prototype, "operation", {
        get: function () {
            return ModelOperationSettings_1.DiagramModelOperation.ResizeShape;
        },
        enumerable: false,
        configurable: true
    });
    ResizeShapeRequestedEntity.prototype.createEventArgs = function () {
        return new ResizeShapeEventArgs(this.apiController.createNativeShape(this.shape), this.apiController.convertSize(this.oldSize), this.apiController.convertSize(this.size));
    };
    Object.defineProperty(ResizeShapeRequestedEntity.prototype, "settingsKey", {
        get: function () {
            return "resizeShape";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ResizeShapeRequestedEntity.prototype, "storageKey", {
        get: function () {
            return this.settingsKey + "_" + (this.shape && this.shape.key);
        },
        enumerable: false,
        configurable: true
    });
    ResizeShapeRequestedEntity.prototype.equals = function (other) {
        if (other instanceof ResizeShapeRequestedEntity)
            return this.shape === other.shape && this.oldSize.equals(other.oldSize) && this.size.equals(other.size);
        return false;
    };
    return ResizeShapeRequestedEntity;
}(RequestedEntity_1.RequestedEntity));
exports.ResizeShapeRequestedEntity = ResizeShapeRequestedEntity;
var ResizeShapeEventArgs = (function (_super) {
    __extends(ResizeShapeEventArgs, _super);
    function ResizeShapeEventArgs(shape, oldSize, size) {
        var _this = _super.call(this) || this;
        _this.shape = shape;
        _this.oldSize = oldSize;
        _this.size = size;
        return _this;
    }
    return ResizeShapeEventArgs;
}(RequestedEntity_1.PermissionRequestEventArgs));
exports.ResizeShapeEventArgs = ResizeShapeEventArgs;
//# sourceMappingURL=ResizeShape.js.map