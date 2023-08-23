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
exports.ToggleReadOnlyCommand = void 0;
var SimpleCommandBase_1 = require("../SimpleCommandBase");
var ToggleReadOnlyCommand = (function (_super) {
    __extends(ToggleReadOnlyCommand, _super);
    function ToggleReadOnlyCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToggleReadOnlyCommand.prototype.isEnabledInReadOnlyMode = function () {
        return true;
    };
    ToggleReadOnlyCommand.prototype.getValue = function () {
        return this.control.settings.readOnly;
    };
    ToggleReadOnlyCommand.prototype.executeCore = function (state, parameter) {
        if (typeof parameter === "boolean")
            this.control.settings.readOnly = parameter;
        else if (parameter === undefined)
            this.control.settings.readOnly = !state.value;
        return true;
    };
    return ToggleReadOnlyCommand;
}(SimpleCommandBase_1.SimpleCommandBase));
exports.ToggleReadOnlyCommand = ToggleReadOnlyCommand;
//# sourceMappingURL=ToggleReadOnlyCommand.js.map