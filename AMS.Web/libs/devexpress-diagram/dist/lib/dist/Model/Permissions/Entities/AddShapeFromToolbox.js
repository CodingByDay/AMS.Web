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
exports.AddShapeFromToolboxEventArgs = exports.AddShapeFromToolboxRequestedEntity = void 0;
var ModelOperationSettings_1 = require("../../../ModelOperationSettings");
var RequestedEntity_1 = require("./RequestedEntity");
var AddShapeFromToolboxRequestedEntity = (function (_super) {
    __extends(AddShapeFromToolboxRequestedEntity, _super);
    function AddShapeFromToolboxRequestedEntity(apiController, shapeType) {
        var _this = _super.call(this, apiController) || this;
        _this.shapeType = shapeType;
        return _this;
    }
    Object.defineProperty(AddShapeFromToolboxRequestedEntity.prototype, "operation", {
        get: function () {
            return ModelOperationSettings_1.DiagramModelOperation.AddShapeFromToolbox;
        },
        enumerable: false,
        configurable: true
    });
    AddShapeFromToolboxRequestedEntity.prototype.createEventArgs = function () {
        return new AddShapeFromToolboxEventArgs(this.shapeType);
    };
    Object.defineProperty(AddShapeFromToolboxRequestedEntity.prototype, "settingsKey", {
        get: function () {
            return "addShapeFromToolbox";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddShapeFromToolboxRequestedEntity.prototype, "storageKey", {
        get: function () {
            return this.settingsKey + "_" + this.shapeType;
        },
        enumerable: false,
        configurable: true
    });
    AddShapeFromToolboxRequestedEntity.prototype.equals = function (other) {
        if (other instanceof AddShapeFromToolboxRequestedEntity)
            return this.shapeType === other.shapeType;
        return false;
    };
    return AddShapeFromToolboxRequestedEntity;
}(RequestedEntity_1.RequestedEntity));
exports.AddShapeFromToolboxRequestedEntity = AddShapeFromToolboxRequestedEntity;
var AddShapeFromToolboxEventArgs = (function (_super) {
    __extends(AddShapeFromToolboxEventArgs, _super);
    function AddShapeFromToolboxEventArgs(shapeType) {
        var _this = _super.call(this) || this;
        _this.shapeType = shapeType;
        return _this;
    }
    return AddShapeFromToolboxEventArgs;
}(RequestedEntity_1.PermissionRequestEventArgs));
exports.AddShapeFromToolboxEventArgs = AddShapeFromToolboxEventArgs;
//# sourceMappingURL=AddShapeFromToolbox.js.map