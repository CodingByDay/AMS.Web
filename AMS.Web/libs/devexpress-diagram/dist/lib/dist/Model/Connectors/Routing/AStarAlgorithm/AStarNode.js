"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AStarNode = void 0;
var AStarNode = (function () {
    function AStarNode(position, distance) {
        this.position = position;
        this.distance = distance;
        this.penalty = 0;
    }
    Object.defineProperty(AStarNode.prototype, "key", {
        get: function () { return this.distance + this.penalty; },
        enumerable: false,
        configurable: true
    });
    AStarNode.prototype.getPath = function () {
        var result = [];
        var currentNode = this;
        while (currentNode !== undefined) {
            result.splice(0, 0, currentNode.position);
            currentNode = currentNode.parent;
        }
        return result;
    };
    return AStarNode;
}());
exports.AStarNode = AStarNode;
//# sourceMappingURL=AStarNode.js.map