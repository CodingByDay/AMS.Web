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
exports.AddShapeEventArgs = exports.AddShapeRequestedEntity = void 0;
var ModelOperationSettings_1 = require("../../../ModelOperationSettings");
var RequestedEntity_1 = require("./RequestedEntity");
var AddShapeRequestedEntity = (function (_super) {
    __extends(AddShapeRequestedEntity, _super);
    function AddShapeRequestedEntity(apiController, shape) {
        var _this = _super.call(this, apiController) || this;
        _this.shape = shape;
        return _this;
    }
    Object.defineProperty(AddShapeRequestedEntity.prototype, "operation", {
        get: function () {
            return ModelOperationSettings_1.DiagramModelOperation.AddShape;
        },
        enumerable: false,
        configurable: true
    });
    AddShapeRequestedEntity.prototype.createEventArgs = function () {
        return new AddShapeEventArgs(this.apiController.createNativeShape(this.shape), this.apiController.convertPoint(this.shape.position));
    };
    Object.defineProperty(AddShapeRequestedEntity.prototype, "settingsKey", {
        get: function () {
            return "addShape";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddShapeRequestedEntity.prototype, "storageKey", {
        get: function () {
            return this.settingsKey + "_" + (this.shape && this.shape.key);
        },
        enumerable: false,
        configurable: true
    });
    AddShapeRequestedEntity.prototype.equals = function (other) {
        if (other instanceof AddShapeRequestedEntity)
            return this.shape === other.shape && this.shape.position.equals(other.shape.position);
        return false;
    };
    return AddShapeRequestedEntity;
}(RequestedEntity_1.RequestedEntity));
exports.AddShapeRequestedEntity = AddShapeRequestedEntity;
var AddShapeEventArgs = (function (_super) {
    __extends(AddShapeEventArgs, _super);
    function AddShapeEventArgs(shape, position) {
        var _this = _super.call(this) || this;
        _this.shape = shape;
        _this.position = position;
        return _this;
    }
    return AddShapeEventArgs;
}(RequestedEntity_1.PermissionRequestEventArgs));
exports.AddShapeEventArgs = AddShapeEventArgs;
//# sourceMappingURL=AddShape.js.map