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
exports.UnbindDocumentCommand = void 0;
var ModelUtils_1 = require("../../Model/ModelUtils");
var SimpleCommandBase_1 = require("../SimpleCommandBase");
var UnbindDocumentCommand = (function (_super) {
    __extends(UnbindDocumentCommand, _super);
    function UnbindDocumentCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnbindDocumentCommand.prototype.isEnabledInReadOnlyMode = function () {
        return true;
    };
    UnbindDocumentCommand.prototype.executeCore = function (state) {
        this.permissionsProvider.lockPermissions();
        this.control.deleteDocumentDataSource();
        ModelUtils_1.ModelUtils.deleteAllItems(this.control.history, this.control.model, this.control.selection);
        this.control.history.clear();
        this.permissionsProvider.unlockPermissions();
        return true;
    };
    return UnbindDocumentCommand;
}(SimpleCommandBase_1.SimpleCommandBase));
exports.UnbindDocumentCommand = UnbindDocumentCommand;
//# sourceMappingURL=UnbindDocumentCommand.js.map