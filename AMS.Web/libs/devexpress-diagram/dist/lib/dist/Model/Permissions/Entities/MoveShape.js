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
exports.MoveShapeEventArgs = exports.MoveShapeRequestedEntity = void 0;
var ModelOperationSettings_1 = require("../../../ModelOperationSettings");
var RequestedEntity_1 = require("./RequestedEntity");
var MoveShapeRequestedEntity = (function (_super) {
    __extends(MoveShapeRequestedEntity, _super);
    function MoveShapeRequestedEntity(apiController, shape, oldPosition, position) {
        var _this = _super.call(this, apiController) || this;
        _this.shape = shape;
        _this.oldPosition = oldPosition;
        _this.position = position;
        return _this;
    }
    Object.defineProperty(MoveShapeRequestedEntity.prototype, "operation", {
        get: function () {
            return ModelOperationSettings_1.DiagramModelOperation.MoveShape;
        },
        enumerable: false,
        configurable: true
    });
    MoveShapeRequestedEntity.prototype.createEventArgs = function () {
        return new MoveShapeEventArgs(this.apiController.createNativeShape(this.shape), this.apiController.convertPoint(this.oldPosition), this.apiController.convertPoint(this.position));
    };
    Object.defineProperty(MoveShapeRequestedEntity.prototype, "settingsKey", {
        get: function () {
            return "moveShape";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MoveShapeRequestedEntity.prototype, "storageKey", {
        get: function () {
            return this.settingsKey + "_" + (this.shape && this.shape.key);
        },
        enumerable: false,
        configurable: true
    });
    MoveShapeRequestedEntity.prototype.equals = function (other) {
        if (other instanceof MoveShapeRequestedEntity)
            return this.shape === other.shape && this.oldPosition.equals(other.oldPosition) && this.position.equals(other.position);
        return false;
    };
    return MoveShapeRequestedEntity;
}(RequestedEntity_1.RequestedEntity));
exports.MoveShapeRequestedEntity = MoveShapeRequestedEntity;
var MoveShapeEventArgs = (function (_super) {
    __extends(MoveShapeEventArgs, _super);
    function MoveShapeEventArgs(shape, oldPosition, position) {
        var _this = _super.call(this) || this;
        _this.shape = shape;
        _this.oldPosition = oldPosition;
        _this.position = position;
        return _this;
    }
    return MoveShapeEventArgs;
}(RequestedEntity_1.PermissionRequestEventArgs));
exports.MoveShapeEventArgs = MoveShapeEventArgs;
//# sourceMappingURL=MoveShape.js.map