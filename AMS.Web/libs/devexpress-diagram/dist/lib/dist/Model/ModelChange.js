"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemChange = exports.ItemChangeType = void 0;
var ItemChangeType;
(function (ItemChangeType) {
    ItemChangeType[ItemChangeType["Create"] = 0] = "Create";
    ItemChangeType[ItemChangeType["UpdateProperties"] = 1] = "UpdateProperties";
    ItemChangeType[ItemChangeType["UpdateStructure"] = 2] = "UpdateStructure";
    ItemChangeType[ItemChangeType["Update"] = 3] = "Update";
    ItemChangeType[ItemChangeType["Remove"] = 4] = "Remove";
    ItemChangeType[ItemChangeType["UpdateClassName"] = 5] = "UpdateClassName";
})(ItemChangeType = exports.ItemChangeType || (exports.ItemChangeType = {}));
var ItemChange = (function () {
    function ItemChange(item, type, isValid) {
        if (isValid === void 0) { isValid = true; }
        this.item = item;
        this.type = type;
        this.isValid = isValid;
    }
    Object.defineProperty(ItemChange.prototype, "key", {
        get: function () { return this.item.key; },
        enumerable: false,
        configurable: true
    });
    return ItemChange;
}());
exports.ItemChange = ItemChange;
//# sourceMappingURL=ModelChange.js.map