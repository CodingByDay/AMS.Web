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
exports.GraphIterator = exports.FastGraph = exports.Graph = void 0;
var Structures_1 = require("./Structures");
var Shape_1 = require("../Model/Shapes/Shape");
var search_1 = require("@devexpress/utils/lib/utils/search");
var ListUtils_1 = require("../ListUtils");
var GraphBase = (function () {
    function GraphBase(nodes, edges) {
        this.nodeMap = {};
        this.edgeMap = {};
        this.nodes = [];
        this.edges = [];
        this.onInit();
        nodes.forEach(this.addNode.bind(this));
        edges.forEach(this.addEdge.bind(this));
    }
    Object.defineProperty(GraphBase.prototype, "items", {
        get: function () {
            return this.nodes.map(this.getNode.bind(this));
        },
        enumerable: false,
        configurable: true
    });
    GraphBase.prototype.onInit = function () { };
    GraphBase.prototype.addEdge = function (edge) {
        this.edgeMap[edge.key] = edge;
        this.edges.push(edge);
    };
    GraphBase.prototype.addNode = function (node) {
        this.nodeMap[node.key] = node;
        this.nodes.push(node.key);
    };
    GraphBase.prototype.getNode = function (key) {
        return this.nodeMap[key];
    };
    GraphBase.prototype.getEdge = function (key) {
        return this.edgeMap[key];
    };
    GraphBase.prototype.isEmpty = function () {
        return !this.nodes.length && !this.edges.length;
    };
    GraphBase.prototype.getAdjacentEdges = function (nodeKey, connectionMode) {
        if (connectionMode === void 0) { connectionMode = Structures_1.ConnectionMode.OutgoingAndIncoming; }
        return this.edges.filter(function (e) {
            return connectionMode & Structures_1.ConnectionMode.Incoming && e.to === nodeKey ||
                connectionMode & Structures_1.ConnectionMode.Outgoing && e.from === nodeKey;
        });
    };
    return GraphBase;
}());
var Graph = (function (_super) {
    __extends(Graph, _super);
    function Graph() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Graph.prototype.cast = function (castNode, castEdge) {
        var _this = this;
        var newNodes = this.nodes.map(function (nk) { return castNode(_this.getNode(nk)); });
        var newEdges = this.edges.map(function (e) { return castEdge ? castEdge(e) : e; });
        return new Graph(newNodes, newEdges);
    };
    Graph.prototype.getConnectedComponents = function () {
        var iterator = this.createIterator(Structures_1.ConnectionMode.OutgoingAndIncoming);
        iterator.visitEachEdgeOnce = true;
        var components = [];
        var _loop_1 = function (i) {
            var nodes = [];
            var edges = [];
            iterator.onNode = function (n) { return nodes.push(n); };
            iterator.onEdge = function (e) { return edges.push(e); };
            iterator.iterate(this_1.nodes[i]);
            if (nodes.length)
                components.push(new Graph(nodes, edges));
        };
        var this_1 = this;
        for (var i = 0; i < this.nodes.length; i++) {
            _loop_1(i);
        }
        return components;
    };
    Graph.prototype.createIterator = function (connectionMode) {
        var iterator = new GraphIterator(this, connectionMode);
        iterator.comparer = function (a, b) { return a.weight - b.weight; };
        return iterator;
    };
    Graph.prototype.getSpanningGraph = function (rootKey, connectionMode, edgeWeightFunc) {
        var _this = this;
        if (edgeWeightFunc === void 0) { edgeWeightFunc = undefined; }
        if (!this.nodes.length)
            return new Graph([], []);
        if (!edgeWeightFunc)
            edgeWeightFunc = function (e) { return e.weight; };
        var sortedAdjacentEdges = [];
        var spanningTreeNodesSet = new ListUtils_1.HashSet();
        var spanningTreeEdgesSet = new ListUtils_1.HashSet([], function (e) { return e.getHashKey(); });
        this.addNodeToSpanningGraph(rootKey, connectionMode, sortedAdjacentEdges, spanningTreeNodesSet, spanningTreeEdgesSet, edgeWeightFunc);
        while (sortedAdjacentEdges.length && spanningTreeNodesSet.length !== this.nodes.length) {
            var minWeighedEdge = sortedAdjacentEdges.shift();
            spanningTreeEdgesSet.tryPush(minWeighedEdge);
            var node = spanningTreeNodesSet.contains(minWeighedEdge.from) ? minWeighedEdge.to : minWeighedEdge.from;
            this.addNodeToSpanningGraph(node, connectionMode, sortedAdjacentEdges, spanningTreeNodesSet, spanningTreeEdgesSet, edgeWeightFunc);
            sortedAdjacentEdges = sortedAdjacentEdges.filter(function (e) { return !spanningTreeNodesSet.contains(e.from) || !spanningTreeNodesSet.contains(e.to); });
        }
        return new Graph(spanningTreeNodesSet.list().map(function (nk) { return _this.getNode(nk); }), spanningTreeEdgesSet.list());
    };
    Graph.prototype.addNodeToSpanningGraph = function (nodeKey, connectionMode, adjacentEdges, spanningTreeNodesSet, spanningTreeEdgesSet, edgeWeightFunc) {
        spanningTreeNodesSet.tryPush(nodeKey);
        this.getAdjacentEdges(nodeKey, connectionMode)
            .filter(function (e) { return !spanningTreeEdgesSet.contains(e); })
            .forEach(function (e) {
            var weight = edgeWeightFunc(e);
            var pos = search_1.SearchUtils.binaryIndexOf(adjacentEdges, function (a) { return a.weight - weight; });
            pos = pos < 0 ? ~pos : pos;
            while (pos < adjacentEdges.length && edgeWeightFunc(adjacentEdges[pos]) === weight)
                pos++;
            adjacentEdges.splice(pos, 0, new Structures_1.Edge(e.key, e.from, e.to, weight));
        });
    };
    Graph.create = function (shapes, connectors) {
        var nodes = shapes;
        var edges = connectors
            .filter(function (i) { return i.beginItem && i.endItem instanceof Shape_1.Shape && i.endItem && i.endItem instanceof Shape_1.Shape && i.beginItem !== i.endItem; })
            .map(function (i) { return new Structures_1.Edge(i.key, i.beginItem && i.beginItem.key, i.endItem && i.endItem.key); });
        return new Graph(nodes, edges);
    };
    return Graph;
}(GraphBase));
exports.Graph = Graph;
var FastGraph = (function (_super) {
    __extends(FastGraph, _super);
    function FastGraph() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FastGraph.prototype.onInit = function () {
        this.parentToChildren = {};
        this.childToParents = {};
    };
    FastGraph.prototype.addEdge = function (edge) {
        _super.prototype.addEdge.call(this, edge);
        (this.parentToChildren[edge.from] || (this.parentToChildren[edge.from] = [])).push(edge.to);
        (this.childToParents[edge.to] || (this.childToParents[edge.to] = [])).push(edge.from);
    };
    FastGraph.prototype.getChildren = function (parent) {
        return this.parentToChildren[parent] || [];
    };
    FastGraph.prototype.getParents = function (child) {
        return this.childToParents[child] || [];
    };
    FastGraph.prototype.createIterator = function (connectionMode) {
        return new GraphIterator(this, connectionMode);
    };
    return FastGraph;
}(GraphBase));
exports.FastGraph = FastGraph;
var GraphIterator = (function () {
    function GraphIterator(graph, connectionMode) {
        if (connectionMode === void 0) { connectionMode = Structures_1.ConnectionMode.OutgoingAndIncoming; }
        this.graph = graph;
        this.connectionMode = connectionMode;
        this.visitEachEdgeOnce = true;
        this.visitEachNodeOnce = true;
        this.visitedNodes = {};
        this.visitedEdges = {};
    }
    GraphIterator.prototype.iterate = function (nodeKey) {
        if (!this.visitEachNodeOnce && !this.visitEachEdgeOnce && !this.skipNode)
            throw "skipNode or visitEachNodeOnce or visitEachEdgeOnce must be set to avoid SOF";
        this.iterateCore(nodeKey);
    };
    GraphIterator.prototype.iterateCore = function (nodeKey) {
        var _this = this;
        var node = this.graph.getNode(nodeKey);
        if (!node || (this.skipNode && this.skipNode(node)) || (this.visitEachNodeOnce && this.isNodeVisited(nodeKey)))
            return;
        this.visitedNodes[nodeKey] = true;
        this.onNode && this.onNode(node);
        var edges = this.graph.getAdjacentEdges(nodeKey, this.connectionMode);
        if (this.skipEdge)
            edges = edges.filter(function (e) { return !_this.skipEdge(e); });
        if (this.connectionMode & Structures_1.ConnectionMode.Outgoing) {
            var outgoing = edges.filter(function (e) { return e.from === nodeKey; });
            if (this.comparer)
                outgoing.sort(this.comparer);
            outgoing.forEach(function (e) {
                if (_this.visitEachEdgeOnce && _this.visitedEdges[e.key])
                    return;
                _this.visitedEdges[e.key] = true;
                _this.onEdge && _this.onEdge(e, true);
                _this.iterateCore(e.to);
                _this.onAfterEdge && _this.onAfterEdge(e, true);
            });
        }
        this.onAllEdges && this.onAllEdges(node, true);
        if (this.connectionMode & Structures_1.ConnectionMode.Incoming) {
            var incoming = edges.filter(function (e) { return e.to === nodeKey; });
            if (this.comparer)
                incoming.sort(this.comparer);
            incoming.forEach(function (e) {
                if (_this.visitEachEdgeOnce && _this.visitedEdges[e.key])
                    return;
                _this.visitedEdges[e.key] = true;
                _this.onEdge && _this.onEdge(e, false);
                _this.iterateCore(e.from);
                _this.onAfterEdge && _this.onAfterEdge(e, false);
            });
        }
        this.onAllEdges && this.onAllEdges(node, false);
    };
    GraphIterator.prototype.isNodeVisited = function (nodeKey) {
        return !!this.visitedNodes[nodeKey];
    };
    GraphIterator.prototype.isEdgeVisited = function (edgeKey) {
        return !!this.visitedEdges[edgeKey];
    };
    return GraphIterator;
}());
exports.GraphIterator = GraphIterator;
//# sourceMappingURL=Graph.js.map