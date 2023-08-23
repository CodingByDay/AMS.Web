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
exports.CopySelectionCommand = void 0;
var Exporter_1 = require("../../ImportAndExport/Exporter");
var ClipboardCommand_1 = require("./ClipboardCommand");
var CopySelectionCommand = (function (_super) {
    __extends(CopySelectionCommand, _super);
    function CopySelectionCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CopySelectionCommand.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && !this.control.selection.isEmpty(true);
    };
    CopySelectionCommand.prototype.isEnabledInReadOnlyMode = function () {
        return true;
    };
    CopySelectionCommand.prototype.executeCore = function (state) {
        var exporter = new Exporter_1.Exporter();
        var data = exporter.exportItems(this.control.selection.getSelectedItems(true, true));
        this.setClipboardData(data);
        return true;
    };
    return CopySelectionCommand;
}(ClipboardCommand_1.ClipboardCommand));
exports.CopySelectionCommand = CopySelectionCommand;
//# sourceMappingURL=CopySelectionCommand.js.map