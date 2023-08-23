"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueAStarNodePositions = void 0;
var UniqueAStarNodePositions = (function () {
    function UniqueAStarNodePositions(getKey) {
        if (getKey === void 0) { getKey = function (key) { return key.toString(); }; }
        this.getKey = getKey;
        this.items = {};
    }
    Object.defineProperty(UniqueAStarNodePositions.prototype, "count", {
        get: function () { return Object.keys(this.items).length; },
        enumerable: false,
        configurable: true
    });
    UniqueAStarNodePositions.prototype.getNode = function (position) {
        var item = this.items[this.getKey(position)];
        return item !== undefined ? item.node : undefined;
    };
    UniqueAStarNodePositions.prototype.add = function (position, node) {
        var key = this.getKey(position);
        if (this.items[key] === undefined)
            this.items[key] = { position: position, node: node };
    };
    UniqueAStarNodePositions.prototype.remove = function (position) {
        var key = this.getKey(position);
        if (this.items[key] !== undefined)
            delete this.items[key];
    };
    return UniqueAStarNodePositions;
}());
exports.UniqueAStarNodePositions = UniqueAStarNodePositions;
//# sourceMappingURL=UniqueAStarNodePositions.js.map