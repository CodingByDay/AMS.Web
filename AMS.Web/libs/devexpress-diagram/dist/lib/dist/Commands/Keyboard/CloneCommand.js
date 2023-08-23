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
exports.CloneDownCommand = exports.CloneUpCommand = exports.CloneRightCommand = exports.CloneLeftCommand = exports.CloneCommand = void 0;
var ModelUtils_1 = require("../../Model/ModelUtils");
var SimpleCommandBase_1 = require("../SimpleCommandBase");
var CloneCommand = (function (_super) {
    __extends(CloneCommand, _super);
    function CloneCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CloneCommand.prototype.isEnabled = function () {
        var items = this.control.selection.getSelectedItems();
        return _super.prototype.isEnabled.call(this) && items.length && items.length > 0 && this.permissionsProvider.canAddItems(items);
    };
    CloneCommand.prototype.executeCore = function (state, parameter) {
        var selectionRect = ModelUtils_1.ModelUtils.createRectangle(this.control.selection.getSelectedItems());
        ModelUtils_1.ModelUtils.cloneSelectionToOffset(this.control.history, this.control.model, undefined, this.control.selection, this.getOffsetX(selectionRect), this.getOffsetY(selectionRect));
        return true;
    };
    Object.defineProperty(CloneCommand.prototype, "isPermissionsRequired", {
        get: function () { return true; },
        enumerable: false,
        configurable: true
    });
    CloneCommand.prototype.getOffsetX = function (selectionRect) {
        return 0;
    };
    CloneCommand.prototype.getOffsetY = function (selectionRect) {
        return 0;
    };
    return CloneCommand;
}(SimpleCommandBase_1.SimpleCommandBase));
exports.CloneCommand = CloneCommand;
var CloneLeftCommand = (function (_super) {
    __extends(CloneLeftCommand, _super);
    function CloneLeftCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CloneLeftCommand.prototype.getOffsetX = function (selectionRect) {
        return -selectionRect.width;
    };
    return CloneLeftCommand;
}(CloneCommand));
exports.CloneLeftCommand = CloneLeftCommand;
var CloneRightCommand = (function (_super) {
    __extends(CloneRightCommand, _super);
    function CloneRightCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CloneRightCommand.prototype.getOffsetX = function (selectionRect) {
        return selectionRect.width;
    };
    return CloneRightCommand;
}(CloneCommand));
exports.CloneRightCommand = CloneRightCommand;
var CloneUpCommand = (function (_super) {
    __extends(CloneUpCommand, _super);
    function CloneUpCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CloneUpCommand.prototype.getOffsetY = function (selectionRect) {
        return -selectionRect.height;
    };
    return CloneUpCommand;
}(CloneCommand));
exports.CloneUpCommand = CloneUpCommand;
var CloneDownCommand = (function (_super) {
    __extends(CloneDownCommand, _super);
    function CloneDownCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CloneDownCommand.prototype.getOffsetY = function (selectionRect) {
        return selectionRect.height;
    };
    return CloneDownCommand;
}(CloneCommand));
exports.CloneDownCommand = CloneDownCommand;
//# sourceMappingURL=CloneCommand.js.map