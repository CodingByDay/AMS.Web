"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionMode = exports.PositionInfo = exports.Edge = void 0;
var Edge = (function () {
    function Edge(key, from, to, weight) {
        if (weight === void 0) { weight = 1; }
        this.weight = weight;
        this.key = key;
        this.from = from;
        this.to = to;
    }
    Edge.prototype.getHashKey = function () {
        return this.from + "_" + this.to;
    };
    Edge.prototype.reverse = function () {
        return new Edge(this.key, this.to, this.from, this.weight);
    };
    return Edge;
}());
exports.Edge = Edge;
var PositionInfo = (function () {
    function PositionInfo(item, position) {
        this.item = item;
        this.position = position;
    }
    return PositionInfo;
}());
exports.PositionInfo = PositionInfo;
var ConnectionMode;
(function (ConnectionMode) {
    ConnectionMode[ConnectionMode["Outgoing"] = 1] = "Outgoing";
    ConnectionMode[ConnectionMode["Incoming"] = 2] = "Incoming";
    ConnectionMode[ConnectionMode["OutgoingAndIncoming"] = 3] = "OutgoingAndIncoming";
})(ConnectionMode = exports.ConnectionMode || (exports.ConnectionMode = {}));
//# sourceMappingURL=Structures.js.map