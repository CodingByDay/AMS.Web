"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Margin = exports.EdgeLayout = exports.NodeLayout = exports.NodeInfo = void 0;
var rectangle_1 = require("@devexpress/utils/lib/geometry/rectangle");
var NodeInfo = (function () {
    function NodeInfo(key, margin, size, connectionPoints) {
        if (connectionPoints === void 0) { connectionPoints = []; }
        this.key = key;
        this.margin = margin;
        this.size = size;
        this.connectionPoints = connectionPoints;
    }
    return NodeInfo;
}());
exports.NodeInfo = NodeInfo;
var NodeLayout = (function () {
    function NodeLayout(info, position) {
        this.info = info;
        this.position = position;
    }
    Object.defineProperty(NodeLayout.prototype, "key", {
        get: function () { return this.info.key; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NodeLayout.prototype, "rectangle", {
        get: function () {
            return rectangle_1.Rectangle.fromGeometry(this.position, this.info.size);
        },
        enumerable: false,
        configurable: true
    });
    return NodeLayout;
}());
exports.NodeLayout = NodeLayout;
var EdgeLayout = (function () {
    function EdgeLayout(key, beginIndex, endIndex) {
        this.key = key;
        this.beginIndex = beginIndex;
        this.endIndex = endIndex;
    }
    return EdgeLayout;
}());
exports.EdgeLayout = EdgeLayout;
var Margin = (function () {
    function Margin(top, right, bottom, left) {
        if (right === void 0) { right = top; }
        if (bottom === void 0) { bottom = top; }
        if (left === void 0) { left = top; }
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
    }
    Margin.empty = function () {
        return new Margin(0);
    };
    return Margin;
}());
exports.Margin = Margin;
//# sourceMappingURL=NodeLayout.js.map