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
exports.SendToBackCommand = void 0;
var ChangeZindexHistoryItem_1 = require("../../History/Properties/ChangeZindexHistoryItem");
var SimpleCommandBase_1 = require("../SimpleCommandBase");
var SendToBackCommand = (function (_super) {
    __extends(SendToBackCommand, _super);
    function SendToBackCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SendToBackCommand.prototype.isEnabled = function () {
        var items = this.control.selection.getSelectedItems();
        return _super.prototype.isEnabled.call(this) && items.length > 0 && this.needSendToBack(items);
    };
    SendToBackCommand.prototype.executeCore = function (state, parameter) {
        var _this = this;
        this.control.history.beginTransaction();
        var items = this.control.selection.getSelectedItems();
        items.forEach(function (item) {
            var newZIndex = _this.control.model.getIntersectItemsMinZIndex(item) - 1;
            _this.control.history.addAndRedo(new ChangeZindexHistoryItem_1.ChangeZindexHistoryItem(item, newZIndex));
        });
        this.control.history.endTransaction();
        return true;
    };
    SendToBackCommand.prototype.needSendToBack = function (items) {
        var _this = this;
        var _loop_1 = function (i) {
            var zIndex = this_1.control.model.getIntersectItemsMinZIndex(items[i]);
            if (zIndex < items[i].zIndex)
                return { value: true };
            if (zIndex === items[i].zIndex) {
                var result_1 = false;
                var sameZIndexItems = this_1.control.model.getIntersectItems(items[i]).filter(function (item) { return item.zIndex === items[i].zIndex; });
                sameZIndexItems.forEach(function (item) {
                    if (_this.control.model.getItemIndex(item) < _this.control.model.getItemIndex(items[i])) {
                        result_1 = true;
                        return;
                    }
                });
                return { value: result_1 };
            }
        };
        var this_1 = this;
        for (var i = 0; i < items.length; i++) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return false;
    };
    return SendToBackCommand;
}(SimpleCommandBase_1.SimpleCommandBase));
exports.SendToBackCommand = SendToBackCommand;
//# sourceMappingURL=SendToBackCommand.js.map