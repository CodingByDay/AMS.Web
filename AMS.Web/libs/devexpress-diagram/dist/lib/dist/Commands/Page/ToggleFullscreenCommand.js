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
exports.ToggleFullscreenCommand = void 0;
var SimpleCommandBase_1 = require("../SimpleCommandBase");
var ToggleFullscreenCommand = (function (_super) {
    __extends(ToggleFullscreenCommand, _super);
    function ToggleFullscreenCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToggleFullscreenCommand.prototype.isEnabledInReadOnlyMode = function () {
        return true;
    };
    ToggleFullscreenCommand.prototype.getValue = function () {
        return this.control.settings.fullscreen;
    };
    ToggleFullscreenCommand.prototype.executeCore = function (state, parameter) {
        var newValue = typeof parameter === "boolean" ? parameter : !state.value;
        if (this.control.settings.fullscreen !== newValue) {
            this.control.settings.fullscreen = !state.value;
            this.control.notifyToggleFullscreen(this.control.settings.fullscreen);
        }
        return true;
    };
    return ToggleFullscreenCommand;
}(SimpleCommandBase_1.SimpleCommandBase));
exports.ToggleFullscreenCommand = ToggleFullscreenCommand;
//# sourceMappingURL=ToggleFullscreenCommand.js.map