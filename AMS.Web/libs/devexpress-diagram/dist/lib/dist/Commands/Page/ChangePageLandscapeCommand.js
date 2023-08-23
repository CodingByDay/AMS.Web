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
exports.ChangePageLandscapeCommand = void 0;
var ChangePagePropertyCommand_1 = require("./ChangePagePropertyCommand");
var ChangePageLandscapeHistoryItem_1 = require("../../History/Page/ChangePageLandscapeHistoryItem");
var ChangePageLandscapeCommand = (function (_super) {
    __extends(ChangePageLandscapeCommand, _super);
    function ChangePageLandscapeCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangePageLandscapeCommand.prototype.getValue = function () {
        return this.control.model.pageLandscape;
    };
    ChangePageLandscapeCommand.prototype.createHistoryItems = function (parameter) {
        return [new ChangePageLandscapeHistoryItem_1.ChangePageLandscapeHistoryItem(parameter)];
    };
    return ChangePageLandscapeCommand;
}(ChangePagePropertyCommand_1.ChangePagePropertyCommand));
exports.ChangePageLandscapeCommand = ChangePageLandscapeCommand;
//# sourceMappingURL=ChangePageLandscapeCommand.js.map