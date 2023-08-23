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
exports.ChangeCustomDataHistoryItem = void 0;
var HistoryItem_1 = require("../HistoryItem");
var Utils_1 = require("../../Utils");
var ChangeCustomDataHistoryItem = (function (_super) {
    __extends(ChangeCustomDataHistoryItem, _super);
    function ChangeCustomDataHistoryItem(itemKey, customData) {
        var _this = _super.call(this) || this;
        _this.itemKey = itemKey;
        _this.customData = Utils_1.ObjectUtils.cloneObject(customData);
        return _this;
    }
    ChangeCustomDataHistoryItem.prototype.redo = function (manipulator) {
        var item = manipulator.model.findItem(this.itemKey);
        this.oldCustomData = Utils_1.ObjectUtils.cloneObject(item.customData);
        manipulator.changeCustomData(item, this.customData);
    };
    ChangeCustomDataHistoryItem.prototype.undo = function (manipulator) {
        var item = manipulator.model.findItem(this.itemKey);
        manipulator.changeCustomData(item, this.oldCustomData);
    };
    return ChangeCustomDataHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.ChangeCustomDataHistoryItem = ChangeCustomDataHistoryItem;
//# sourceMappingURL=ChangeCustomDataHistoryItem.js.map