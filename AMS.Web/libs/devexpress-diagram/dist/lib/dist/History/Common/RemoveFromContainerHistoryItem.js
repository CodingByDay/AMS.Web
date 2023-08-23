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
exports.RemoveFromContainerHistoryItem = void 0;
var HistoryItem_1 = require("../HistoryItem");
var RemoveFromContainerHistoryItem = (function (_super) {
    __extends(RemoveFromContainerHistoryItem, _super);
    function RemoveFromContainerHistoryItem(item) {
        var _this = _super.call(this) || this;
        _this.itemKey = item.key;
        return _this;
    }
    RemoveFromContainerHistoryItem.prototype.redo = function (manipulator) {
        var item = manipulator.model.findItem(this.itemKey);
        this.containerKey = item.container && item.container.key;
        manipulator.removeFromContainer(item);
    };
    RemoveFromContainerHistoryItem.prototype.undo = function (manipulator) {
        var container = manipulator.model.findContainer(this.containerKey);
        var item = manipulator.model.findItem(this.itemKey);
        manipulator.insertToContainer(item, container);
    };
    return RemoveFromContainerHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.RemoveFromContainerHistoryItem = RemoveFromContainerHistoryItem;
//# sourceMappingURL=RemoveFromContainerHistoryItem.js.map