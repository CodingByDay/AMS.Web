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
exports.RedoCommand = void 0;
var SimpleCommandBase_1 = require("../SimpleCommandBase");
var RedoCommand = (function (_super) {
    __extends(RedoCommand, _super);
    function RedoCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RedoCommand.prototype.executeCore = function (state) {
        this.control.beginUpdateCanvas();
        this.permissionsProvider.lockPermissions();
        this.control.history.redo();
        this.permissionsProvider.unlockPermissions();
        this.control.endUpdateCanvas();
        return true;
    };
    RedoCommand.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && this.control.history.canRedo();
    };
    return RedoCommand;
}(SimpleCommandBase_1.SimpleCommandBase));
exports.RedoCommand = RedoCommand;
//# sourceMappingURL=RedoCommand.js.map