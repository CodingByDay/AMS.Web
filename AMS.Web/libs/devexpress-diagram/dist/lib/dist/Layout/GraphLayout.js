"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphLayout = void 0;
var Utils_1 = require("../Utils");
var NodeLayout_1 = require("./NodeLayout");
var GraphLayout = (function () {
    function GraphLayout() {
        this.nodeKeys = [];
        this.nodeToLayout = {};
        this.edgeToPosition = {};
    }
    GraphLayout.prototype.forEachNode = function (callback) {
        var _this = this;
        this.nodeKeys.forEach(function (nk) { return callback(_this.nodeToLayout[nk], nk); });
    };
    GraphLayout.prototype.reduce = function (callback, initValue) {
        var _this = this;
        return this.nodeKeys.reduce(function (acc, key, index) { return callback(acc, _this.nodeToLayout[key], index); }, initValue);
    };
    GraphLayout.prototype.addNode = function (nodeLayout) {
        if (this.nodeToLayout[nodeLayout.key])
            throw Error("Node layout is already registered");
        this.nodeKeys.push(nodeLayout.key);
        this.nodeToLayout[nodeLayout.key] = nodeLayout;
        return nodeLayout;
    };
    GraphLayout.prototype.hasNode = function (key) {
        return !!this.nodeToLayout[key];
    };
    GraphLayout.prototype.addEdge = function (edgeLayout) {
        if (this.edgeToPosition[edgeLayout.key])
            throw Error("Edge layout is already registered");
        this.edgeToPosition[edgeLayout.key] = edgeLayout;
    };
    GraphLayout.prototype.getRectangle = function (includeMargins) {
        var _this = this;
        return Utils_1.GeometryUtils.getCommonRectangle(this.nodeKeys.map(function (nk) { return _this.nodeToLayout[nk].rectangle; }));
    };
    GraphLayout.prototype.offsetNodes = function (deltaX, deltaY) {
        var _this = this;
        if (deltaX === void 0) { deltaX = 0; }
        if (deltaY === void 0) { deltaY = 0; }
        var layout = new GraphLayout();
        this.nodeKeys.forEach(function (nk) {
            var nl = _this.nodeToLayout[nk];
            layout.addNode(new NodeLayout_1.NodeLayout(nl.info, nl.position.clone().offset(deltaX, deltaY)));
        });
        layout.copyEdges(this);
        return layout;
    };
    GraphLayout.prototype.extend = function (layout) {
        var _this = this;
        layout.forEachNode(function (nl) { return _this.addNode(nl); });
        this.copyEdges(layout);
    };
    GraphLayout.prototype.copyEdges = function (source) {
        var _this = this;
        Object.keys(source.edgeToPosition).forEach(function (e) {
            var edge = source.edgeToPosition[e];
            _this.addEdge(new NodeLayout_1.EdgeLayout(edge.key, edge.beginIndex, edge.endIndex));
        });
    };
    return GraphLayout;
}());
exports.GraphLayout = GraphLayout;
//# sourceMappingURL=GraphLayout.js.map