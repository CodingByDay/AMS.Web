"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionRequestEventArgs = exports.RequestedEntity = void 0;
var RequestedEntity = (function () {
    function RequestedEntity(apiController) {
        this.apiController = apiController;
    }
    Object.defineProperty(RequestedEntity.prototype, "allowed", {
        get: function () {
            return this.eventArgs.allowed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestedEntity.prototype, "updateUI", {
        get: function () {
            return this.eventArgs.updateUI;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestedEntity.prototype, "eventArgs", {
        get: function () {
            if (!this._eventArgs)
                this._eventArgs = this.createEventArgs();
            return this._eventArgs;
        },
        enumerable: false,
        configurable: true
    });
    return RequestedEntity;
}());
exports.RequestedEntity = RequestedEntity;
var PermissionRequestEventArgs = (function () {
    function PermissionRequestEventArgs() {
        this.allowed = true;
        this.updateUI = false;
    }
    return PermissionRequestEventArgs;
}());
exports.PermissionRequestEventArgs = PermissionRequestEventArgs;
//# sourceMappingURL=RequestedEntity.js.map