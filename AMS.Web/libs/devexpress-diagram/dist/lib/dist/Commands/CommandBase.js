"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandBase = void 0;
var CommandBase = (function () {
    function CommandBase(control) {
        this.control = control;
    }
    CommandBase.prototype.execute = function (parameter) {
        if (this.isPermissionsRequired)
            this.permissionsProvider.lockPermissions();
        var state = this.getState();
        if (this.isPermissionsRequired)
            this.permissionsProvider.unlockPermissions();
        if (!state.enabled)
            return false;
        this.control.beginUpdate();
        var executed = false;
        if (this.isPermissionsRequired)
            executed = this.executeWithPermissions(state, parameter);
        else
            executed = this.executeCore(state, parameter);
        this.control.endUpdate();
        if (executed)
            this.updateControlState();
        return executed;
    };
    CommandBase.prototype.executeWithPermissions = function (state, parameter) {
        var executed = false;
        this.permissionsProvider.beginStorePermissions();
        this.control.history.beginTransaction();
        executed = this.executeCore(state, parameter);
        if (!this.permissionsProvider.isStoredPermissionsGranted()) {
            this.permissionsProvider.lockPermissions();
            this.control.history.undoTransaction();
            this.permissionsProvider.unlockPermissions();
            executed = false;
        }
        this.control.history.endTransaction();
        this.permissionsProvider.endStorePermissions();
        return executed;
    };
    CommandBase.prototype.updateControlState = function () {
        if (!this.lockInputPositionUpdating())
            this.control.selection.inputPosition.reset();
        if (!this.lockUIUpdating())
            this.control.barManager.updateItemsState();
    };
    Object.defineProperty(CommandBase.prototype, "permissionsProvider", {
        get: function () { return this.control && this.control.permissionsProvider; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandBase.prototype, "isPermissionsRequired", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    CommandBase.prototype.lockUIUpdating = function () {
        return false;
    };
    CommandBase.prototype.lockInputPositionUpdating = function () {
        return false;
    };
    return CommandBase;
}());
exports.CommandBase = CommandBase;
//# sourceMappingURL=CommandBase.js.map