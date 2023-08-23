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
exports.AutoLayoutTreeVerticalCommand = void 0;
var AutoLayoutCommandBase_1 = require("./AutoLayoutCommandBase");
var WideTree_1 = require("../../Layout/Builders/WideTree");
var LayoutSettings_1 = require("../../Layout/LayoutSettings");
var AutoLayoutTreeVerticalCommand = (function (_super) {
    __extends(AutoLayoutTreeVerticalCommand, _super);
    function AutoLayoutTreeVerticalCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AutoLayoutTreeVerticalCommand.prototype.createLayoutSettings = function () {
        var gridSize = this.control.settings.snapToGrid ? this.control.settings.gridSize : undefined;
        var settings = new LayoutSettings_1.TreeLayoutSettings(gridSize);
        settings.orientation = LayoutSettings_1.DataLayoutOrientation.Vertical;
        return settings;
    };
    AutoLayoutTreeVerticalCommand.prototype.createLayout = function (settings, graph) {
        return new WideTree_1.TreeLayoutBuilder(settings, graph).build();
    };
    return AutoLayoutTreeVerticalCommand;
}(AutoLayoutCommandBase_1.AutoLayoutCommandBase));
exports.AutoLayoutTreeVerticalCommand = AutoLayoutTreeVerticalCommand;
//# sourceMappingURL=AutoLayoutTreeVerticalCommand.js.map