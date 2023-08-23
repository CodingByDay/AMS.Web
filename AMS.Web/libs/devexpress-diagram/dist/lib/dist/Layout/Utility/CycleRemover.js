"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CycleRemover = void 0;
var Graph_1 = require("../Graph");
var Structures_1 = require("../Structures");
var ListUtils_1 = require("../../ListUtils");
var CycleRemover = (function () {
    function CycleRemover() {
    }
    CycleRemover.removeCycles = function (graph) {
        var feedbackSet = this.getFeedbackSet(graph);
        return this.reverseEdges(graph, feedbackSet);
    };
    CycleRemover.getFeedbackSet = function (graph) {
        var _this = this;
        var feedbackSet = {};
        var nonTrivialStronglyConnectedComponents = this.getNonTrivialStronglyConnectedComponents(graph);
        while (nonTrivialStronglyConnectedComponents.length) {
            nonTrivialStronglyConnectedComponents.forEach(function (g) {
                var maxCyclicEdges = _this.getMaxCyclicEdges(g);
                maxCyclicEdges.forEach(function (e) { return delete feedbackSet[e.reverse().getHashKey()]; });
                maxCyclicEdges.forEach(function (e) { return feedbackSet[e.getHashKey()] = true; });
            });
            nonTrivialStronglyConnectedComponents = this.getNonTrivialStronglyConnectedComponents(this.reverseEdges(graph, feedbackSet).graph);
        }
        return feedbackSet;
    };
    CycleRemover.getMaxCyclicEdges = function (graph) {
        var black = {};
        var gray = {};
        var edgeCycleCount = {};
        var visitedEdges = [];
        var cycles = [];
        var iterator = graph.createIterator(Structures_1.ConnectionMode.Outgoing);
        iterator.visitEachEdgeOnce = false;
        iterator.onNode = function (n) {
            gray[n.key] = true;
        };
        iterator.skipNode = function (n) {
            if (gray[n.key]) {
                var cycle = [];
                for (var i = 0; i < visitedEdges.length; i++) {
                    var e = visitedEdges[i];
                    if (edgeCycleCount[e.key] === undefined)
                        edgeCycleCount[e.key] = 0;
                    edgeCycleCount[e.key]++;
                    cycle.push(e);
                    if (e.from === n.key)
                        break;
                }
                cycles.push(cycle);
            }
            return gray[n.key] || black[n.key];
        };
        iterator.skipEdge = function (e) { return false; };
        iterator.onEdge = function (e) {
            visitedEdges.splice(0, 0, e);
        };
        iterator.onAfterEdge = function (e) {
            visitedEdges.splice(0, 1);
        };
        iterator.onAllEdges = function (e) {
            black[e.key] = true;
            gray[e.key] = false;
        };
        iterator.iterate(graph.nodes[0]);
        var edgeSet = new ListUtils_1.HashSet([], function (e) { return e.key; });
        cycles.forEach(function (c) {
            edgeSet.tryPush(c.reduce(function (max, curr) { return edgeCycleCount[curr.key] > edgeCycleCount[max.key] ? curr : max; }, c[0]));
        });
        return edgeSet.list();
    };
    CycleRemover.reverseEdges = function (graph, feedbackSet) {
        var edges = new ListUtils_1.HashSet([], function (e) { return e.getHashKey(); });
        var reversedEdges = {};
        var removedEdges = {};
        graph.edges.forEach(function (e) {
            if (feedbackSet[e.getHashKey()]) {
                e = e.reverse();
                reversedEdges[e.key] = true;
            }
            if (!edges.tryPush(e)) {
                removedEdges[e.key] = true;
                delete reversedEdges[e.key];
            }
        });
        return {
            graph: new Graph_1.Graph(graph.nodes.map(function (n) { return graph.getNode(n); }), edges.list()),
            reversedEdges: reversedEdges,
            removedEdges: removedEdges
        };
    };
    CycleRemover.getNonTrivialStronglyConnectedComponents = function (graph) {
        return this.getStronglyConnectedComponents(graph).filter(function (g) { return g.edges.length; });
    };
    CycleRemover.getStronglyConnectedComponents = function (graph) {
        var _this = this;
        var nodesStack = [];
        var index = 0;
        var lowIndex = {};
        var lowLink = {};
        var onStack = {};
        var components = [];
        var visitedNodes = {};
        for (var i = 0; i < graph.nodes.length; i++) {
            var nodeKey = graph.nodes[i];
            var iterator = graph.createIterator(Structures_1.ConnectionMode.Outgoing);
            iterator.visitEachEdgeOnce = false;
            iterator.visitEachNodeOnce = false;
            iterator.onNode = function (n) {
                visitedNodes[n.key] = true;
                nodesStack.push(n);
                onStack[n.key] = true;
                lowLink[n.key] = index;
                lowIndex[n.key] = index;
                index++;
            };
            iterator.skipNode = function (n) { return visitedNodes[n.key]; };
            iterator.skipEdge = function (e) {
                var isVisited = visitedNodes[e.to];
                if (isVisited && onStack[e.to])
                    lowLink[e.from] = Math.min(lowLink[e.from], lowIndex[e.to]);
                return isVisited;
            };
            iterator.onAfterEdge = function (e) {
                lowLink[e.from] = Math.min(lowLink[e.from], lowLink[e.to]);
            };
            iterator.onAllEdges = function (n, outgoing) {
                if (outgoing && lowLink[n.key] === lowIndex[n.key])
                    components.push(_this.getStronglyConnectedComponent(graph, n, nodesStack, onStack));
            };
            iterator.iterate(nodeKey);
        }
        return components;
    };
    CycleRemover.getStronglyConnectedComponent = function (graph, root, nodesStack, onStack) {
        var itemsMap = {};
        var nodes = [];
        var edges = [];
        var topStackNode;
        do {
            topStackNode = nodesStack.pop();
            if (!itemsMap[topStackNode.key])
                nodes.push(topStackNode);
            itemsMap[topStackNode.key] = true;
            onStack[topStackNode.key] = false;
        } while (topStackNode !== root);
        nodes.forEach(function (n) {
            var aEdges = graph.getAdjacentEdges(n.key, Structures_1.ConnectionMode.Outgoing);
            edges = edges.concat(aEdges.filter(function (e) { return !itemsMap[e.key] && itemsMap[e.to]; }));
            aEdges.forEach(function (e) { return itemsMap[e.key] = true; });
        });
        return new Graph_1.Graph(nodes, edges);
    };
    return CycleRemover;
}());
exports.CycleRemover = CycleRemover;
//# sourceMappingURL=CycleRemover.js.map