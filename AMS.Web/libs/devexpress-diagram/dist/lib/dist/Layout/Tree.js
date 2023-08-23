"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tree = void 0;
var Structures_1 = require("./Structures");
var Tree = (function () {
    function Tree(root, parentToChildren) {
        var _this = this;
        this.childToParent = {};
        this.root = root;
        this.parentToChildren = parentToChildren;
        var _loop_1 = function (key) {
            if (!Object.prototype.hasOwnProperty.call(parentToChildren, key))
                return "continue";
            parentToChildren[key].forEach(function (c) { return _this.childToParent[c.key] = key; });
        };
        for (var key in parentToChildren) {
            _loop_1(key);
        }
    }
    Tree.prototype.getChildren = function (node) {
        return node && this.parentToChildren[node.key] ? this.parentToChildren[node.key] : [];
    };
    Tree.prototype.hasChildren = function (node) {
        return this.parentToChildren[node.key] && this.parentToChildren[node.key].length > 0;
    };
    Tree.prototype.iterate = function (callback) {
        this.iterateCore(this.root, 0, callback);
    };
    Tree.createSpanningTree = function (component) {
        var rootKey = Tree.findRoot(component);
        var iterator = component.createIterator(Structures_1.ConnectionMode.Outgoing);
        var parentToChildren = {};
        iterator.skipEdge = (function (e) { return e.to === undefined || iterator.isNodeVisited(e.to); });
        iterator.onNode = function (n) { return parentToChildren[n.key] = []; };
        iterator.onEdge = function (e) {
            var node = component.getNode(e.to);
            node && parentToChildren[e.from].push(node);
        };
        iterator.iterate(rootKey);
        return new Tree(component.getNode(rootKey), parentToChildren);
    };
    Tree.prototype.iterateCore = function (node, level, callback) {
        var _this = this;
        callback(node, level);
        this.getChildren(node).forEach(function (n) { return _this.iterateCore(n, level + 1, callback); });
    };
    Tree.findRoot = function (component) {
        return component.nodes.reduce(function (aggregator, cur) {
            var edges = component.getAdjacentEdges(cur);
            var inc = edges.filter(function (l) { return l.to === cur; }).length;
            var out = edges.filter(function (l) { return l.from === cur; }).length;
            if (aggregator.candidate === undefined || (inc === 0 && aggregator.inc > 0) || (aggregator.inc !== 0 && aggregator.out - aggregator.inc < out - inc)) {
                aggregator.candidate = cur;
                aggregator.inc = inc;
                aggregator.out = out;
            }
            return aggregator;
        }, { inc: -1, out: -1, candidate: undefined }).candidate;
    };
    return Tree;
}());
exports.Tree = Tree;
//# sourceMappingURL=Tree.js.map