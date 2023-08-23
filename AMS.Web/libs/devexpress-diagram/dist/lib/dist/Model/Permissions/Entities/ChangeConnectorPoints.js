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
exports.ChangeConnectorPointsEventArgs = exports.ChangeConnectorPointsRequestedEntity = void 0;
var ModelOperationSettings_1 = require("../../../ModelOperationSettings");
var RequestedEntity_1 = require("./RequestedEntity");
var Utils_1 = require("../../../Utils");
var ChangeConnectorPointsRequestedEntity = (function (_super) {
    __extends(ChangeConnectorPointsRequestedEntity, _super);
    function ChangeConnectorPointsRequestedEntity(apiController, connector, oldPoints, points) {
        var _this = _super.call(this, apiController) || this;
        _this.connector = connector;
        _this.oldPoints = oldPoints;
        _this.points = points;
        return _this;
    }
    Object.defineProperty(ChangeConnectorPointsRequestedEntity.prototype, "operation", {
        get: function () {
            return ModelOperationSettings_1.DiagramModelOperation.ChangeConnectorPoints;
        },
        enumerable: false,
        configurable: true
    });
    ChangeConnectorPointsRequestedEntity.prototype.createEventArgs = function () {
        var _this = this;
        return new ChangeConnectorPointsEventArgs(this.apiController.createNativeConnector(this.connector), this.oldPoints.map(function (pt) { return _this.apiController.convertPoint(pt); }), this.points.map(function (pt) { return _this.apiController.convertPoint(pt); }));
    };
    Object.defineProperty(ChangeConnectorPointsRequestedEntity.prototype, "settingsKey", {
        get: function () {
            return "changeConnectorPoints";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChangeConnectorPointsRequestedEntity.prototype, "storageKey", {
        get: function () {
            return this.settingsKey + "_" + (this.connector && this.connector.key);
        },
        enumerable: false,
        configurable: true
    });
    ChangeConnectorPointsRequestedEntity.prototype.equals = function (other) {
        if (other instanceof ChangeConnectorPointsRequestedEntity)
            return this.connector === other.connector &&
                Utils_1.GeometryUtils.arePointsEqual(this.oldPoints, other.oldPoints) &&
                Utils_1.GeometryUtils.arePointsEqual(this.points, other.points);
        return false;
    };
    return ChangeConnectorPointsRequestedEntity;
}(RequestedEntity_1.RequestedEntity));
exports.ChangeConnectorPointsRequestedEntity = ChangeConnectorPointsRequestedEntity;
var ChangeConnectorPointsEventArgs = (function (_super) {
    __extends(ChangeConnectorPointsEventArgs, _super);
    function ChangeConnectorPointsEventArgs(connector, oldPoints, points) {
        var _this = _super.call(this) || this;
        _this.connector = connector;
        _this.oldPoints = oldPoints;
        _this.points = points;
        return _this;
    }
    return ChangeConnectorPointsEventArgs;
}(RequestedEntity_1.PermissionRequestEventArgs));
exports.ChangeConnectorPointsEventArgs = ChangeConnectorPointsEventArgs;
//# sourceMappingURL=ChangeConnectorPoints.js.map