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
exports.ToggleSimpleViewCommand = void 0;
var SimpleCommandBase_1 = require("../SimpleCommandBase");
var ToggleSimpleViewCommand = (function (_super) {
    __extends(ToggleSimpleViewCommand, _super);
    function ToggleSimpleViewCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToggleSimpleViewCommand.prototype.isEnabledInReadOnlyMode = function () {
        return true;
    };
    ToggleSimpleViewCommand.prototype.getValue = function () {
        return this.control.settings.simpleView;
    };
    ToggleSimpleViewCommand.prototype.executeCore = function (state, parameter) {
        if (typeof parameter === "boolean")
            this.control.settings.simpleView = parameter;
        else if (parameter === undefined)
            this.control.settings.simpleView = !state.value;
        this.control.updateLayout(true);
        return true;
    };
    return ToggleSimpleViewCommand;
}(SimpleCommandBase_1.SimpleCommandBase));
exports.ToggleSimpleViewCommand = ToggleSimpleViewCommand;
//# sourceMappingURL=ToggleSimpleViewCommand.js.map