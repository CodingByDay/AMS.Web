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
exports.ChangeLockedCommand = void 0;
var ModelUtils_1 = require("../../Model/ModelUtils");
var SimpleCommandBase_1 = require("../SimpleCommandBase");
var ChangeLockedCommand = (function (_super) {
    __extends(ChangeLockedCommand, _super);
    function ChangeLockedCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangeLockedCommand.prototype.isEnabled = function () {
        var _this = this;
        var items = this.control.selection.getSelectedItems(true);
        var enabled = false;
        items.forEach(function (item) { if (item.locked !== _this.getLockState())
            enabled = true; });
        return _super.prototype.isEnabled.call(this) && enabled;
    };
    ChangeLockedCommand.prototype.executeCore = function (state, parameter) {
        ModelUtils_1.ModelUtils.changeSelectionLocked(this.control.history, this.control.model, this.control.selection, this.getLockState());
        return true;
    };
    return ChangeLockedCommand;
}(SimpleCommandBase_1.SimpleCommandBase));
exports.ChangeLockedCommand = ChangeLockedCommand;
//# sourceMappingURL=ChangeLockedCommand.js.map