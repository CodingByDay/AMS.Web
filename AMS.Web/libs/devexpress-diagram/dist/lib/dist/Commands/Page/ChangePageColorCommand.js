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
exports.ChangePageColorCommand = void 0;
var ChangePagePropertyCommand_1 = require("./ChangePagePropertyCommand");
var ChangePageColorHistoryItem_1 = require("../../History/Page/ChangePageColorHistoryItem");
var Model_1 = require("../../Model/Model");
var color_1 = require("@devexpress/utils/lib/utils/color");
var ChangePageColorCommand = (function (_super) {
    __extends(ChangePageColorCommand, _super);
    function ChangePageColorCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangePageColorCommand.prototype.getValue = function () {
        return color_1.ColorUtils.colorToHash(this.control.model.pageColor);
    };
    ChangePageColorCommand.prototype.getDefaultValue = function () {
        return color_1.ColorUtils.colorToHash(Model_1.DiagramModel.defaultPageColor);
    };
    ChangePageColorCommand.prototype.createHistoryItems = function (parameter) {
        return [new ChangePageColorHistoryItem_1.ChangePageColorHistoryItem(color_1.ColorUtils.fromString(parameter))];
    };
    return ChangePageColorCommand;
}(ChangePagePropertyCommand_1.ChangePagePropertyCommand));
exports.ChangePageColorCommand = ChangePageColorCommand;
//# sourceMappingURL=ChangePageColorCommand.js.map