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
exports.ChangeShowGridCommand = void 0;
var SimpleCommandBase_1 = require("../SimpleCommandBase");
var ChangeShowGridCommand = (function (_super) {
    __extends(ChangeShowGridCommand, _super);
    function ChangeShowGridCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangeShowGridCommand.prototype.isEnabledInReadOnlyMode = function () {
        return true;
    };
    ChangeShowGridCommand.prototype.executeCore = function (state, parameter) {
        var newValue = parameter === undefined ? !this.control.settings.showGrid : !!parameter;
        if (this.control.settings.showGrid !== newValue) {
            this.control.settings.showGrid = newValue;
            return true;
        }
        return false;
    };
    ChangeShowGridCommand.prototype.getValue = function () {
        return this.control.settings.showGrid;
    };
    return ChangeShowGridCommand;
}(SimpleCommandBase_1.SimpleCommandBase));
exports.ChangeShowGridCommand = ChangeShowGridCommand;
//# sourceMappingURL=ChangeShowGridCommand.js.map