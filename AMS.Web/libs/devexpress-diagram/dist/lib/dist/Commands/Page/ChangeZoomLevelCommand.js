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
exports.ToggleAutoZoomCommand = exports.ToggleAutoZoomToWidthCommand = exports.ToggleAutoZoomToContentCommand = exports.SwitchAutoZoomCommand = exports.FitToWidthCommand = exports.FitToScreenCommand = exports.ChangeZoomLevelItemsCommand = exports.ChangeZoomLevelTo200Command = exports.ChangeZoomLevelTo150Command = exports.ChangeZoomLevelTo125Command = exports.ChangeZoomLevelTo100Command = exports.ChangeZoomLevelTo75Command = exports.ChangeZoomLevelTo50Command = exports.ChangeZoomLevelTo25Command = exports.ChangeZoomLevelInPercentageCommand = exports.ChangeZoomLevelCommand = void 0;
var SimpleCommandBase_1 = require("../SimpleCommandBase");
var Settings_1 = require("../../Settings");
var ChangeZoomLevelCommand = (function (_super) {
    __extends(ChangeZoomLevelCommand, _super);
    function ChangeZoomLevelCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangeZoomLevelCommand.prototype.isEnabledInReadOnlyMode = function () {
        return true;
    };
    ChangeZoomLevelCommand.prototype.getValue = function () {
        return this.control.view.getZoom();
    };
    ChangeZoomLevelCommand.prototype.executeCore = function (state, parameter) {
        this.control.settings.zoomLevel = parameter;
        this.control.settings.autoZoom = Settings_1.AutoZoomMode.Disabled;
        this.control.updateLayout(true);
        return true;
    };
    ChangeZoomLevelCommand.prototype.getItems = function () {
        return this.control.settings.zoomLevelItems.map(function (l) {
            return { value: l, text: l * 100 + "%" };
        });
    };
    return ChangeZoomLevelCommand;
}(SimpleCommandBase_1.SimpleCommandBase));
exports.ChangeZoomLevelCommand = ChangeZoomLevelCommand;
var ChangeZoomLevelInPercentageCommand = (function (_super) {
    __extends(ChangeZoomLevelInPercentageCommand, _super);
    function ChangeZoomLevelInPercentageCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangeZoomLevelInPercentageCommand.prototype.executeCore = function (state, parameter) {
        return _super.prototype.executeCore.call(this, state, parameter / 100);
    };
    ChangeZoomLevelInPercentageCommand.prototype.getValue = function () {
        return this.control.view.getZoom() * 100;
    };
    return ChangeZoomLevelInPercentageCommand;
}(ChangeZoomLevelCommand));
exports.ChangeZoomLevelInPercentageCommand = ChangeZoomLevelInPercentageCommand;
var ChangeZoomLevelExactlyCommand = (function (_super) {
    __extends(ChangeZoomLevelExactlyCommand, _super);
    function ChangeZoomLevelExactlyCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangeZoomLevelExactlyCommand.prototype.getValue = function () {
        return this.control.view.getZoom() === this.exactValue;
    };
    ChangeZoomLevelExactlyCommand.prototype.executeCore = function (state, parameter) {
        _super.prototype.executeCore.call(this, state, this.exactValue);
        return true;
    };
    ChangeZoomLevelExactlyCommand.prototype.getItems = function () {
        return undefined;
    };
    return ChangeZoomLevelExactlyCommand;
}(ChangeZoomLevelCommand));
var ChangeZoomLevelTo25Command = (function (_super) {
    __extends(ChangeZoomLevelTo25Command, _super);
    function ChangeZoomLevelTo25Command() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.exactValue = 0.25;
        return _this;
    }
    return ChangeZoomLevelTo25Command;
}(ChangeZoomLevelExactlyCommand));
exports.ChangeZoomLevelTo25Command = ChangeZoomLevelTo25Command;
var ChangeZoomLevelTo50Command = (function (_super) {
    __extends(ChangeZoomLevelTo50Command, _super);
    function ChangeZoomLevelTo50Command() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.exactValue = 0.5;
        return _this;
    }
    return ChangeZoomLevelTo50Command;
}(ChangeZoomLevelExactlyCommand));
exports.ChangeZoomLevelTo50Command = ChangeZoomLevelTo50Command;
var ChangeZoomLevelTo75Command = (function (_super) {
    __extends(ChangeZoomLevelTo75Command, _super);
    function ChangeZoomLevelTo75Command() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.exactValue = 0.75;
        return _this;
    }
    return ChangeZoomLevelTo75Command;
}(ChangeZoomLevelExactlyCommand));
exports.ChangeZoomLevelTo75Command = ChangeZoomLevelTo75Command;
var ChangeZoomLevelTo100Command = (function (_super) {
    __extends(ChangeZoomLevelTo100Command, _super);
    function ChangeZoomLevelTo100Command() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.exactValue = 1;
        return _this;
    }
    return ChangeZoomLevelTo100Command;
}(ChangeZoomLevelExactlyCommand));
exports.ChangeZoomLevelTo100Command = ChangeZoomLevelTo100Command;
var ChangeZoomLevelTo125Command = (function (_super) {
    __extends(ChangeZoomLevelTo125Command, _super);
    function ChangeZoomLevelTo125Command() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.exactValue = 1.25;
        return _this;
    }
    return ChangeZoomLevelTo125Command;
}(ChangeZoomLevelExactlyCommand));
exports.ChangeZoomLevelTo125Command = ChangeZoomLevelTo125Command;
var ChangeZoomLevelTo150Command = (function (_super) {
    __extends(ChangeZoomLevelTo150Command, _super);
    function ChangeZoomLevelTo150Command() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.exactValue = 1.5;
        return _this;
    }
    return ChangeZoomLevelTo150Command;
}(ChangeZoomLevelExactlyCommand));
exports.ChangeZoomLevelTo150Command = ChangeZoomLevelTo150Command;
var ChangeZoomLevelTo200Command = (function (_super) {
    __extends(ChangeZoomLevelTo200Command, _super);
    function ChangeZoomLevelTo200Command() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.exactValue = 2;
        return _this;
    }
    return ChangeZoomLevelTo200Command;
}(ChangeZoomLevelExactlyCommand));
exports.ChangeZoomLevelTo200Command = ChangeZoomLevelTo200Command;
var ChangeZoomLevelItemsCommand = (function (_super) {
    __extends(ChangeZoomLevelItemsCommand, _super);
    function ChangeZoomLevelItemsCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangeZoomLevelItemsCommand.prototype.isEnabledInReadOnlyMode = function () {
        return true;
    };
    ChangeZoomLevelItemsCommand.prototype.getValue = function () {
        return this.control.settings.zoomLevelItems;
    };
    ChangeZoomLevelItemsCommand.prototype.executeCore = function (state, parameter) {
        this.control.settings.zoomLevelItems = parameter;
        return true;
    };
    return ChangeZoomLevelItemsCommand;
}(SimpleCommandBase_1.SimpleCommandBase));
exports.ChangeZoomLevelItemsCommand = ChangeZoomLevelItemsCommand;
var FitZoomCommandBase = (function (_super) {
    __extends(FitZoomCommandBase, _super);
    function FitZoomCommandBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FitZoomCommandBase.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && !!this.control.render;
    };
    FitZoomCommandBase.prototype.isEnabledInReadOnlyMode = function () {
        return true;
    };
    FitZoomCommandBase.prototype.executeCore = function (state) {
        var zoomLevel = this.getZoomLevel();
        this.control.settings.zoomLevel = zoomLevel;
        this.control.settings.autoZoom = Settings_1.AutoZoomMode.Disabled;
        this.control.updateLayout(true);
        return true;
    };
    return FitZoomCommandBase;
}(SimpleCommandBase_1.SimpleCommandBase));
var FitToScreenCommand = (function (_super) {
    __extends(FitToScreenCommand, _super);
    function FitToScreenCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FitToScreenCommand.prototype.getZoomLevel = function () {
        return this.control.render.view.getActualAutoZoomLevel(Settings_1.AutoZoomMode.FitContent);
    };
    return FitToScreenCommand;
}(FitZoomCommandBase));
exports.FitToScreenCommand = FitToScreenCommand;
var FitToWidthCommand = (function (_super) {
    __extends(FitToWidthCommand, _super);
    function FitToWidthCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FitToWidthCommand.prototype.getZoomLevel = function () {
        return this.control.render.view.getActualAutoZoomLevel(Settings_1.AutoZoomMode.FitToWidth);
    };
    return FitToWidthCommand;
}(FitZoomCommandBase));
exports.FitToWidthCommand = FitToWidthCommand;
var SwitchAutoZoomCommand = (function (_super) {
    __extends(SwitchAutoZoomCommand, _super);
    function SwitchAutoZoomCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SwitchAutoZoomCommand.prototype.isEnabledInReadOnlyMode = function () {
        return true;
    };
    SwitchAutoZoomCommand.prototype.getValue = function () {
        return this.control.settings.autoZoom;
    };
    SwitchAutoZoomCommand.prototype.executeCore = function (state, value) {
        value = parseInt(value);
        if (this.control.settings.autoZoom === value)
            return false;
        if (value === Settings_1.AutoZoomMode.Disabled)
            this.control.settings.zoomLevel = this.control.view.getZoom();
        this.control.settings.autoZoom = value;
        this.control.updateLayout(true);
        return true;
    };
    return SwitchAutoZoomCommand;
}(SimpleCommandBase_1.SimpleCommandBase));
exports.SwitchAutoZoomCommand = SwitchAutoZoomCommand;
var ToggleAutoZoomToContentCommand = (function (_super) {
    __extends(ToggleAutoZoomToContentCommand, _super);
    function ToggleAutoZoomToContentCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToggleAutoZoomToContentCommand.prototype.getValue = function () {
        return this.control.settings.autoZoom === Settings_1.AutoZoomMode.FitContent;
    };
    ToggleAutoZoomToContentCommand.prototype.executeCore = function (state, value) {
        return _super.prototype.executeCore.call(this, state, Settings_1.AutoZoomMode.FitContent);
    };
    return ToggleAutoZoomToContentCommand;
}(SwitchAutoZoomCommand));
exports.ToggleAutoZoomToContentCommand = ToggleAutoZoomToContentCommand;
var ToggleAutoZoomToWidthCommand = (function (_super) {
    __extends(ToggleAutoZoomToWidthCommand, _super);
    function ToggleAutoZoomToWidthCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToggleAutoZoomToWidthCommand.prototype.getValue = function () {
        return this.control.settings.autoZoom === Settings_1.AutoZoomMode.FitToWidth;
    };
    ToggleAutoZoomToWidthCommand.prototype.executeCore = function (state, value) {
        return _super.prototype.executeCore.call(this, state, Settings_1.AutoZoomMode.FitToWidth);
    };
    return ToggleAutoZoomToWidthCommand;
}(SwitchAutoZoomCommand));
exports.ToggleAutoZoomToWidthCommand = ToggleAutoZoomToWidthCommand;
var ToggleAutoZoomCommand = (function (_super) {
    __extends(ToggleAutoZoomCommand, _super);
    function ToggleAutoZoomCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToggleAutoZoomCommand.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && !!this.control.render;
    };
    ToggleAutoZoomCommand.prototype.isEnabledInReadOnlyMode = function () {
        return true;
    };
    ToggleAutoZoomCommand.prototype.getValue = function () {
        return this.control.settings.autoZoom;
    };
    ToggleAutoZoomCommand.prototype.executeCore = function (state, value) {
        var newValue;
        if (value === undefined)
            newValue = this.control.settings.autoZoom === Settings_1.AutoZoomMode.Disabled ? Settings_1.AutoZoomMode.FitContent : Settings_1.AutoZoomMode.Disabled;
        else
            newValue = value ? Settings_1.AutoZoomMode.FitContent : Settings_1.AutoZoomMode.Disabled;
        if (this.control.settings.autoZoom === newValue)
            return false;
        if (!newValue)
            this.control.settings.zoomLevel = this.control.view.getZoom();
        this.control.settings.autoZoom = newValue;
        this.control.updateLayout(true);
        return true;
    };
    return ToggleAutoZoomCommand;
}(SimpleCommandBase_1.SimpleCommandBase));
exports.ToggleAutoZoomCommand = ToggleAutoZoomCommand;
//# sourceMappingURL=ChangeZoomLevelCommand.js.map