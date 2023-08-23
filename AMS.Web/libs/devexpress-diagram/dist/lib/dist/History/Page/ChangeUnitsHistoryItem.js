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
exports.ChangeUnitsHistoryItem = void 0;
var HistoryItem_1 = require("../HistoryItem");
var ChangeUnitsHistoryItem = (function (_super) {
    __extends(ChangeUnitsHistoryItem, _super);
    function ChangeUnitsHistoryItem(units) {
        var _this = _super.call(this) || this;
        _this.units = units;
        return _this;
    }
    ChangeUnitsHistoryItem.prototype.redo = function (manipulator) {
        this.oldUnits = manipulator.model.units;
        manipulator.model.units = this.units;
    };
    ChangeUnitsHistoryItem.prototype.undo = function (manipulator) {
        manipulator.model.units = this.oldUnits;
    };
    return ChangeUnitsHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.ChangeUnitsHistoryItem = ChangeUnitsHistoryItem;
//# sourceMappingURL=ChangeUnitsHistoryItem.js.map