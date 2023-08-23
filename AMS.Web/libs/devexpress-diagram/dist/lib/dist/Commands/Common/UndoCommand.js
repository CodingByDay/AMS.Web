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
exports.UndoCommand = void 0;
var SimpleCommandBase_1 = require("../SimpleCommandBase");
var UndoCommand = (function (_super) {
    __extends(UndoCommand, _super);
    function UndoCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UndoCommand.prototype.executeCore = function (state) {
        this.control.beginUpdateCanvas();
        this.permissionsProvider.lockPermissions();
        this.control.history.undo();
        this.permissionsProvider.unlockPermissions();
        this.control.endUpdateCanvas();
        return true;
    };
    UndoCommand.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && this.control.history.canUndo();
    };
    return UndoCommand;
}(SimpleCommandBase_1.SimpleCommandBase));
exports.UndoCommand = UndoCommand;
//# sourceMappingURL=UndoCommand.js.map