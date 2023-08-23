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
exports.AutoLayoutTreeHorizontalCommand = void 0;
var AutoLayoutCommandBase_1 = require("./AutoLayoutCommandBase");
var WideTree_1 = require("../../Layout/Builders/WideTree");
var LayoutSettings_1 = require("../../Layout/LayoutSettings");
var AutoLayoutTreeHorizontalCommand = (function (_super) {
    __extends(AutoLayoutTreeHorizontalCommand, _super);
    function AutoLayoutTreeHorizontalCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AutoLayoutTreeHorizontalCommand.prototype.createLayoutSettings = function () {
        var gridSize = this.control.settings.snapToGrid ? this.control.settings.gridSize : undefined;
        var settings = new LayoutSettings_1.TreeLayoutSettings(gridSize);
        settings.orientation = LayoutSettings_1.DataLayoutOrientation.Horizontal;
        return settings;
    };
    AutoLayoutTreeHorizontalCommand.prototype.createLayout = function (settings, graph) {
        return new WideTree_1.TreeLayoutBuilder(settings, graph).build();
    };
    return AutoLayoutTreeHorizontalCommand;
}(AutoLayoutCommandBase_1.AutoLayoutCommandBase));
exports.AutoLayoutTreeHorizontalCommand = AutoLayoutTreeHorizontalCommand;
//# sourceMappingURL=AutoLayoutTreeHorizontalCommand.js.map