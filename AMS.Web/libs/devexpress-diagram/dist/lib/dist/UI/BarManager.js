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
exports.BarManager = void 0;
var batch_updatable_1 = require("@devexpress/utils/lib/class/batch-updatable");
var BarManager = (function (_super) {
    __extends(BarManager, _super);
    function BarManager(control) {
        var _this = _super.call(this) || this;
        _this.bars = [];
        _this.control = control;
        return _this;
    }
    BarManager.prototype.clean = function () {
        var _this = this;
        this.bars.forEach(function (bar) { return bar.onChanged.remove(_this); });
        this.bars = [];
    };
    BarManager.prototype.registerBar = function (bar) {
        this.bars.push(bar);
        bar.onChanged.add(this);
        this.updateBarItemsState(bar);
    };
    BarManager.prototype.updateItemsState = function (queryCommands) {
        if (this.isUpdateLocked())
            return;
        for (var i = 0, bar = void 0; bar = this.bars[i]; i++)
            this.updateBarItemsState(bar, queryCommands);
    };
    BarManager.prototype.updateBarItemsState = function (bar, queryCommands) {
        if (this.isUpdateLocked())
            return;
        this.control.permissionsProvider.beginUpdateUI();
        if (bar.isVisible()) {
            var commandKeys = void 0;
            if (queryCommands) {
                var knownCommandKeys_1 = bar.getCommandKeys().reduce(function (hash, cmd) {
                    hash[cmd] = true;
                    return hash;
                }, {});
                commandKeys = queryCommands.filter(function (cmd) { return knownCommandKeys_1[cmd]; });
            }
            else
                commandKeys = bar.getCommandKeys();
            var length_1 = commandKeys.length;
            for (var j = 0; j < length_1; j++)
                this.updateBarItem(bar, commandKeys[j]);
        }
        this.control.permissionsProvider.endUpdateUI();
    };
    BarManager.prototype.updateBarItem = function (bar, commandKey) {
        var command = this.control.commandManager.getCommand(commandKey);
        if (command) {
            var commandState = command.getState();
            bar.setItemVisible(commandKey, commandState.visible);
            if (commandState.visible) {
                bar.setItemEnabled(commandKey, commandState.enabled);
                if (!commandState.denyUpdateValue) {
                    var itemValue = this.getItemValue(commandState.value);
                    if (commandState.items)
                        bar.setItemSubItems(commandKey, commandState.items);
                    bar.setItemValue(commandKey, itemValue, this.getDefaultItemValue(commandState.defaultValue));
                }
            }
        }
    };
    BarManager.prototype.setEnabled = function (enabled) {
        for (var i = 0, bar = void 0; bar = this.bars[i]; i++)
            bar.setEnabled(enabled);
    };
    BarManager.prototype.notifyBarCommandExecuted = function (commandID, parameter) {
        var executeResult = this.control.commandManager.getCommand(commandID).execute(parameter);
        if (!executeResult)
            this.updateItemsState([commandID]);
    };
    BarManager.prototype.notifyBarUpdateRequested = function () {
        this.updateItemsState();
    };
    BarManager.prototype.notifySelectionChanged = function (_selection) {
        this.updateItemsState();
    };
    BarManager.prototype.onUpdateUnlocked = function (occurredEvents) { };
    BarManager.prototype.getItemValue = function (value) {
        return value;
    };
    BarManager.prototype.getDefaultItemValue = function (value) {
        return value;
    };
    return BarManager;
}(batch_updatable_1.BatchUpdatableObject));
exports.BarManager = BarManager;
//# sourceMappingURL=BarManager.js.map