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
exports.ChangeShapeTextEventArgs = exports.ChangeShapeTextRequestedEntity = void 0;
var ModelOperationSettings_1 = require("../../../ModelOperationSettings");
var RequestedEntity_1 = require("./RequestedEntity");
var ChangeShapeTextRequestedEntity = (function (_super) {
    __extends(ChangeShapeTextRequestedEntity, _super);
    function ChangeShapeTextRequestedEntity(apiController, shape, text) {
        var _this = _super.call(this, apiController) || this;
        _this.shape = shape;
        _this.text = text;
        return _this;
    }
    Object.defineProperty(ChangeShapeTextRequestedEntity.prototype, "operation", {
        get: function () {
            return ModelOperationSettings_1.DiagramModelOperation.ChangeShapeText;
        },
        enumerable: false,
        configurable: true
    });
    ChangeShapeTextRequestedEntity.prototype.createEventArgs = function () {
        return new ChangeShapeTextEventArgs(this.apiController.createNativeShape(this.shape), this.text);
    };
    Object.defineProperty(ChangeShapeTextRequestedEntity.prototype, "settingsKey", {
        get: function () {
            return "changeShapeText";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChangeShapeTextRequestedEntity.prototype, "storageKey", {
        get: function () {
            return this.settingsKey + "_" + (this.shape && this.shape.key);
        },
        enumerable: false,
        configurable: true
    });
    ChangeShapeTextRequestedEntity.prototype.equals = function (other) {
        if (other instanceof ChangeShapeTextRequestedEntity)
            return this.shape === other.shape && this.text === other.text;
        return false;
    };
    return ChangeShapeTextRequestedEntity;
}(RequestedEntity_1.RequestedEntity));
exports.ChangeShapeTextRequestedEntity = ChangeShapeTextRequestedEntity;
var ChangeShapeTextEventArgs = (function (_super) {
    __extends(ChangeShapeTextEventArgs, _super);
    function ChangeShapeTextEventArgs(shape, text) {
        var _this = _super.call(this) || this;
        _this.shape = shape;
        _this.text = text;
        return _this;
    }
    return ChangeShapeTextEventArgs;
}(RequestedEntity_1.PermissionRequestEventArgs));
exports.ChangeShapeTextEventArgs = ChangeShapeTextEventArgs;
//# sourceMappingURL=ChangeShapeText.js.map