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
exports.DeleteCommand = void 0;
var ModelUtils_1 = require("../../Model/ModelUtils");
var SimpleCommandBase_1 = require("../SimpleCommandBase");
var DeleteCommand = (function (_super) {
    __extends(DeleteCommand, _super);
    function DeleteCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeleteCommand.prototype.isEnabled = function () {
        var items = this.control.selection.getSelectedItems();
        return _super.prototype.isEnabled.call(this) && items.length && (items.length > 1 || this.permissionsProvider.canDeleteItems(items));
    };
    DeleteCommand.prototype.executeCore = function (state) {
        var items = this.control.selection.getSelectedItems(true, true);
        this.permissionsProvider.beginDeleteItems(items);
        ModelUtils_1.ModelUtils.deleteSelection(this.control.history, this.control.model, this.control.selection);
        this.permissionsProvider.endDeleteItems();
        return true;
    };
    Object.defineProperty(DeleteCommand.prototype, "isPermissionsRequired", {
        get: function () { return true; },
        enumerable: false,
        configurable: true
    });
    return DeleteCommand;
}(SimpleCommandBase_1.SimpleCommandBase));
exports.DeleteCommand = DeleteCommand;
//# sourceMappingURL=DeleteCommand.js.map