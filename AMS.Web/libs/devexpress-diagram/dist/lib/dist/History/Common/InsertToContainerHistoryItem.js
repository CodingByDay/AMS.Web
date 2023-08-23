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
exports.InsertToContainerHistoryItem = void 0;
var HistoryItem_1 = require("../HistoryItem");
var InsertToContainerHistoryItem = (function (_super) {
    __extends(InsertToContainerHistoryItem, _super);
    function InsertToContainerHistoryItem(item, container) {
        var _this = _super.call(this) || this;
        _this.containerKey = container.key;
        _this.itemKey = item.key;
        return _this;
    }
    InsertToContainerHistoryItem.prototype.redo = function (manipulator) {
        var item = manipulator.model.findItem(this.itemKey);
        var container = manipulator.model.findShape(this.containerKey);
        manipulator.insertToContainer(item, container);
    };
    InsertToContainerHistoryItem.prototype.undo = function (manipulator) {
        var item = manipulator.model.findItem(this.itemKey);
        manipulator.removeFromContainer(item);
    };
    return InsertToContainerHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.InsertToContainerHistoryItem = InsertToContainerHistoryItem;
//# sourceMappingURL=InsertToContainerHistoryItem.js.map