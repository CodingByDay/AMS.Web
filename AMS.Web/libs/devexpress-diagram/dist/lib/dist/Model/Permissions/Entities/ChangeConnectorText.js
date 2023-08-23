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
exports.ChangeConnectorTextEventArgs = exports.ChangeConnectorTextRequestedEntity = void 0;
var ModelOperationSettings_1 = require("../../../ModelOperationSettings");
var RequestedEntity_1 = require("./RequestedEntity");
var ChangeConnectorTextRequestedEntity = (function (_super) {
    __extends(ChangeConnectorTextRequestedEntity, _super);
    function ChangeConnectorTextRequestedEntity(apiController, connector, position, text) {
        var _this = _super.call(this, apiController) || this;
        _this.connector = connector;
        _this.position = position;
        _this.text = text;
        return _this;
    }
    Object.defineProperty(ChangeConnectorTextRequestedEntity.prototype, "operation", {
        get: function () {
            return ModelOperationSettings_1.DiagramModelOperation.ChangeConnectorText;
        },
        enumerable: false,
        configurable: true
    });
    ChangeConnectorTextRequestedEntity.prototype.createEventArgs = function () {
        return new ChangeConnectorTextEventArgs(this.apiController.createNativeConnector(this.connector), this.position, this.connector.texts.map(function (t) { return t; }).sort(function (a, b) { return a.position - b.position; }).indexOf(this.connector.texts.get(this.position)), this.text);
    };
    Object.defineProperty(ChangeConnectorTextRequestedEntity.prototype, "settingsKey", {
        get: function () {
            return "changeConnectorText";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChangeConnectorTextRequestedEntity.prototype, "storageKey", {
        get: function () {
            return this.settingsKey + "_" + (this.connector && this.connector.key);
        },
        enumerable: false,
        configurable: true
    });
    ChangeConnectorTextRequestedEntity.prototype.equals = function (other) {
        if (other instanceof ChangeConnectorTextRequestedEntity)
            return this.connector === other.connector && this.position === other.position && this.text === other.text;
        return false;
    };
    return ChangeConnectorTextRequestedEntity;
}(RequestedEntity_1.RequestedEntity));
exports.ChangeConnectorTextRequestedEntity = ChangeConnectorTextRequestedEntity;
var ChangeConnectorTextEventArgs = (function (_super) {
    __extends(ChangeConnectorTextEventArgs, _super);
    function ChangeConnectorTextEventArgs(connector, position, index, text) {
        var _this = _super.call(this) || this;
        _this.connector = connector;
        _this.position = position;
        _this.index = index;
        _this.text = text;
        return _this;
    }
    return ChangeConnectorTextEventArgs;
}(RequestedEntity_1.PermissionRequestEventArgs));
exports.ChangeConnectorTextEventArgs = ChangeConnectorTextEventArgs;
//# sourceMappingURL=ChangeConnectorText.js.map