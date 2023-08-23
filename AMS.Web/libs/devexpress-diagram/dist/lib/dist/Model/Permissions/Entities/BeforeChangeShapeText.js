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
exports.BeforeChangeShapeTextEventArgs = exports.BeforeChangeShapeTextRequestedEntity = void 0;
var ModelOperationSettings_1 = require("../../../ModelOperationSettings");
var RequestedEntity_1 = require("./RequestedEntity");
var BeforeChangeShapeTextRequestedEntity = (function (_super) {
    __extends(BeforeChangeShapeTextRequestedEntity, _super);
    function BeforeChangeShapeTextRequestedEntity(apiController, shape) {
        var _this = _super.call(this, apiController) || this;
        _this.shape = shape;
        return _this;
    }
    Object.defineProperty(BeforeChangeShapeTextRequestedEntity.prototype, "operation", {
        get: function () {
            return ModelOperationSettings_1.DiagramModelOperation.BeforeChangeShapeText;
        },
        enumerable: false,
        configurable: true
    });
    BeforeChangeShapeTextRequestedEntity.prototype.createEventArgs = function () {
        return new BeforeChangeShapeTextEventArgs(this.apiController.createNativeShape(this.shape));
    };
    Object.defineProperty(BeforeChangeShapeTextRequestedEntity.prototype, "settingsKey", {
        get: function () {
            return "changeShapeText";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BeforeChangeShapeTextRequestedEntity.prototype, "storageKey", {
        get: function () {
            return "before" + this.settingsKey + "_" + (this.shape && this.shape.key);
        },
        enumerable: false,
        configurable: true
    });
    BeforeChangeShapeTextRequestedEntity.prototype.equals = function (other) {
        if (other instanceof BeforeChangeShapeTextRequestedEntity)
            return this.shape === other.shape && this.shape.text === other.shape.text;
        return false;
    };
    return BeforeChangeShapeTextRequestedEntity;
}(RequestedEntity_1.RequestedEntity));
exports.BeforeChangeShapeTextRequestedEntity = BeforeChangeShapeTextRequestedEntity;
var BeforeChangeShapeTextEventArgs = (function (_super) {
    __extends(BeforeChangeShapeTextEventArgs, _super);
    function BeforeChangeShapeTextEventArgs(shape) {
        var _this = _super.call(this) || this;
        _this.shape = shape;
        return _this;
    }
    return BeforeChangeShapeTextEventArgs;
}(RequestedEntity_1.PermissionRequestEventArgs));
exports.BeforeChangeShapeTextEventArgs = BeforeChangeShapeTextEventArgs;
//# sourceMappingURL=BeforeChangeShapeText.js.map