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
exports.CutSelectionCommand = void 0;
var Exporter_1 = require("../../ImportAndExport/Exporter");
var ModelUtils_1 = require("../../Model/ModelUtils");
var ClipboardCommand_1 = require("./ClipboardCommand");
var CutSelectionCommand = (function (_super) {
    __extends(CutSelectionCommand, _super);
    function CutSelectionCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CutSelectionCommand.prototype.isEnabled = function () {
        var items = this.control.selection.getSelectedItems();
        return _super.prototype.isEnabled.call(this) && items.length && (items.length > 1 || this.permissionsProvider.canDeleteItems(items));
    };
    CutSelectionCommand.prototype.executeCore = function (state) {
        var exporter = new Exporter_1.Exporter();
        var items = this.control.selection.getSelectedItems(true, true);
        var data = exporter.exportItems(items);
        this.permissionsProvider.beginDeleteItems(items);
        this.setClipboardData(data);
        ModelUtils_1.ModelUtils.deleteSelection(this.control.history, this.control.model, this.control.selection);
        this.permissionsProvider.endDeleteItems();
        return true;
    };
    Object.defineProperty(CutSelectionCommand.prototype, "isPermissionsRequired", {
        get: function () { return true; },
        enumerable: false,
        configurable: true
    });
    return CutSelectionCommand;
}(ClipboardCommand_1.ClipboardCommand));
exports.CutSelectionCommand = CutSelectionCommand;
//# sourceMappingURL=CutSelectionCommand.js.map