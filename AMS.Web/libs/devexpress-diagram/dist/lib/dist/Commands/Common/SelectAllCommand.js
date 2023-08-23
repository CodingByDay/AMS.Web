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
exports.SelectAllCommand = void 0;
var SimpleCommandBase_1 = require("../SimpleCommandBase");
var SelectAllCommand = (function (_super) {
    __extends(SelectAllCommand, _super);
    function SelectAllCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectAllCommand.prototype.isEnabledInReadOnlyMode = function () {
        return true;
    };
    SelectAllCommand.prototype.executeCore = function (state, parameter) {
        var itemKeys = [];
        this.control.model.iterateItems(function (i) { return itemKeys.push(i.key); });
        this.control.selection.set(itemKeys);
        return true;
    };
    return SelectAllCommand;
}(SimpleCommandBase_1.SimpleCommandBase));
exports.SelectAllCommand = SelectAllCommand;
//# sourceMappingURL=SelectAllCommand.js.map