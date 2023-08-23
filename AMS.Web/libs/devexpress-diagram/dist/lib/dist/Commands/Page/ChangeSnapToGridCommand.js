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
exports.ChangeSnapToGridCommand = void 0;
var SimpleCommandBase_1 = require("../SimpleCommandBase");
var ChangeSnapToGridCommand = (function (_super) {
    __extends(ChangeSnapToGridCommand, _super);
    function ChangeSnapToGridCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangeSnapToGridCommand.prototype.executeCore = function (state, parameter) {
        var newValue = parameter === undefined ? !this.control.settings.snapToGrid : !!parameter;
        if (this.control.settings.snapToGrid !== newValue) {
            this.control.settings.snapToGrid = newValue;
            return true;
        }
        return false;
    };
    ChangeSnapToGridCommand.prototype.getValue = function () {
        return this.control.settings.snapToGrid;
    };
    return ChangeSnapToGridCommand;
}(SimpleCommandBase_1.SimpleCommandBase));
exports.ChangeSnapToGridCommand = ChangeSnapToGridCommand;
//# sourceMappingURL=ChangeSnapToGridCommand.js.map