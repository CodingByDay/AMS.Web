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
exports.ChangePagePropertyCommand = void 0;
var ModelUtils_1 = require("../../Model/ModelUtils");
var SimpleCommandBase_1 = require("../SimpleCommandBase");
var ChangePagePropertyCommand = (function (_super) {
    __extends(ChangePagePropertyCommand, _super);
    function ChangePagePropertyCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangePagePropertyCommand.prototype.executeCore = function (state, parameter) {
        var _this = this;
        this.control.history.beginTransaction();
        var items = this.createHistoryItems(parameter);
        items.forEach(function (item) { _this.control.history.addAndRedo(item); });
        ModelUtils_1.ModelUtils.tryUpdateModelRectangle(this.control.history);
        this.control.history.endTransaction();
        return true;
    };
    ChangePagePropertyCommand.prototype.getItems = function () {
        return null;
    };
    return ChangePagePropertyCommand;
}(SimpleCommandBase_1.SimpleCommandBase));
exports.ChangePagePropertyCommand = ChangePagePropertyCommand;
//# sourceMappingURL=ChangePagePropertyCommand.js.map