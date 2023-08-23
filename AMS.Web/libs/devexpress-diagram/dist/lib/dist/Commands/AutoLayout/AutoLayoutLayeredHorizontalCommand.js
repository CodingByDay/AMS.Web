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
exports.AutoLayoutLayeredHorizontalCommand = void 0;
var AutoLayoutCommandBase_1 = require("./AutoLayoutCommandBase");
var Sugiyama_1 = require("../../Layout/Builders/Sugiyama");
var LayoutSettings_1 = require("../../Layout/LayoutSettings");
var AutoLayoutLayeredHorizontalCommand = (function (_super) {
    __extends(AutoLayoutLayeredHorizontalCommand, _super);
    function AutoLayoutLayeredHorizontalCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AutoLayoutLayeredHorizontalCommand.prototype.createLayoutSettings = function () {
        var settings = new LayoutSettings_1.LayoutSettings();
        settings.orientation = LayoutSettings_1.DataLayoutOrientation.Horizontal;
        return settings;
    };
    AutoLayoutLayeredHorizontalCommand.prototype.createLayout = function (settings, graph) {
        return new Sugiyama_1.SugiyamaLayoutBuilder(settings, graph).build();
    };
    return AutoLayoutLayeredHorizontalCommand;
}(AutoLayoutCommandBase_1.AutoLayoutCommandBase));
exports.AutoLayoutLayeredHorizontalCommand = AutoLayoutLayeredHorizontalCommand;
//# sourceMappingURL=AutoLayoutLayeredHorizontalCommand.js.map