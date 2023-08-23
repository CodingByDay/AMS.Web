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
exports.ChangeStrokeWidthCommand = void 0;
var ChangeStylePropertyCommand_1 = require("./ChangeStylePropertyCommand");
var ChangeStrokeWidthCommand = (function (_super) {
    __extends(ChangeStrokeWidthCommand, _super);
    function ChangeStrokeWidthCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangeStrokeWidthCommand.prototype.getStyleProperty = function () {
        return "stroke-width";
    };
    return ChangeStrokeWidthCommand;
}(ChangeStylePropertyCommand_1.ChangeStylePropertyCommand));
exports.ChangeStrokeWidthCommand = ChangeStrokeWidthCommand;
//# sourceMappingURL=ChangeStrokeWidthCommand.js.map