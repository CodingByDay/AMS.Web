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
exports.AutoLayoutTreeVerticalBottomToTopCommand = void 0;
var LayoutSettings_1 = require("../../Layout/LayoutSettings");
var AutoLayoutTreeVerticalCommand_1 = require("./AutoLayoutTreeVerticalCommand");
var AutoLayoutTreeVerticalBottomToTopCommand = (function (_super) {
    __extends(AutoLayoutTreeVerticalBottomToTopCommand, _super);
    function AutoLayoutTreeVerticalBottomToTopCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AutoLayoutTreeVerticalBottomToTopCommand.prototype.createLayoutSettings = function () {
        var settings = _super.prototype.createLayoutSettings.call(this);
        settings.direction = LayoutSettings_1.LogicalDirectionKind.Backward;
        return settings;
    };
    return AutoLayoutTreeVerticalBottomToTopCommand;
}(AutoLayoutTreeVerticalCommand_1.AutoLayoutTreeVerticalCommand));
exports.AutoLayoutTreeVerticalBottomToTopCommand = AutoLayoutTreeVerticalBottomToTopCommand;
//# sourceMappingURL=AutoLayoutTreeVerticalBottomToTopCommand.js.map