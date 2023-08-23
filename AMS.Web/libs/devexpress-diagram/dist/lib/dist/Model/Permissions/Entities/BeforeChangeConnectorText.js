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
exports.BeforeChangeConnectorTextEventArgs = exports.BeforeChangeConnectorTextRequestedEntity = void 0;
var ModelOperationSettings_1 = require("../../../ModelOperationSettings");
var RequestedEntity_1 = require("./RequestedEntity");
var BeforeChangeConnectorTextRequestedEntity = (function (_super) {
    __extends(BeforeChangeConnectorTextRequestedEntity, _super);
    function BeforeChangeConnectorTextRequestedEntity(apiController, connector, position) {
        var _this = _super.call(this, apiController) || this;
        _this.connector = connector;
        _this.position = position;
        return _this;
    }
    Object.defineProperty(BeforeChangeConnectorTextRequestedEntity.prototype, "operation", {
        get: function () {
            return ModelOperationSettings_1.DiagramModelOperation.BeforeChangeConnectorText;
        },
        enumerable: false,
        configurable: true
    });
    BeforeChangeConnectorTextRequestedEntity.prototype.createEventArgs = function () {
        return new BeforeChangeConnectorTextEventArgs(this.apiController.createNativeConnector(this.connector), this.position, this.connector.texts.map(function (t) { return t; }).sort(function (a, b) { return a.position - b.position; }).indexOf(this.connector.texts.get(this.position)));
    };
    Object.defineProperty(BeforeChangeConnectorTextRequestedEntity.prototype, "settingsKey", {
        get: function () {
            return "changeConnectorText";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BeforeChangeConnectorTextRequestedEntity.prototype, "storageKey", {
        get: function () {
            return "before" + this.settingsKey + "_" + (this.connector && this.connector.key);
        },
        enumerable: false,
        configurable: true
    });
    BeforeChangeConnectorTextRequestedEntity.prototype.equals = function (other) {
        if (other instanceof BeforeChangeConnectorTextRequestedEntity)
            return this.connector === other.connector && this.position === other.position && this.connector.texts.get(this.position) === other.connector.texts.get(other.position);
        return false;
    };
    return BeforeChangeConnectorTextRequestedEntity;
}(RequestedEntity_1.RequestedEntity));
exports.BeforeChangeConnectorTextRequestedEntity = BeforeChangeConnectorTextRequestedEntity;
var BeforeChangeConnectorTextEventArgs = (function (_super) {
    __extends(BeforeChangeConnectorTextEventArgs, _super);
    function BeforeChangeConnectorTextEventArgs(connector, position, index) {
        var _this = _super.call(this) || this;
        _this.connector = connector;
        _this.position = position;
        _this.index = index;
        return _this;
    }
    return BeforeChangeConnectorTextEventArgs;
}(RequestedEntity_1.PermissionRequestEventArgs));
exports.BeforeChangeConnectorTextEventArgs = BeforeChangeConnectorTextEventArgs;
//# sourceMappingURL=BeforeChangeConnectorText.js.map