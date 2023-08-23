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
exports.EdgeOnLayer = exports.NodeOnLayer = exports.SugiyamaNodesOrderer = exports.SugiyamaLayerDistributor = exports.SugiyamaLayoutBuilder = void 0;
var BaseBuilder_1 = require("./BaseBuilder");
var Graph_1 = require("../Graph");
var NodeLayout_1 = require("../NodeLayout");
var Structures_1 = require("../Structures");
var ListUtils_1 = require("../../ListUtils");
var search_1 = require("@devexpress/utils/lib/utils/search");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var LayoutSettings_1 = require("../LayoutSettings");
var GraphLayout_1 = require("../GraphLayout");
var Connector_1 = require("../../Model/Connectors/Connector");
var CycleRemover_1 = require("../Utility/CycleRemover");
var SugiyamaLayoutBuilder = (function (_super) {
    __extends(SugiyamaLayoutBuilder, _super);
    function SugiyamaLayoutBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SugiyamaLayoutBuilder.prototype.build = function () {
        var _this = this;
        var offset = 0;
        var layout = new GraphLayout_1.GraphLayout();
        var nodeOrderer = new SugiyamaNodesOrderer();
        this.graph.getConnectedComponents()
            .forEach(function (component) {
            var acyclicGraphInfo = CycleRemover_1.CycleRemover.removeCycles(component);
            var layers = SugiyamaLayerDistributor.getLayers(acyclicGraphInfo.graph);
            var orderedGraph = nodeOrderer.orderNodes(acyclicGraphInfo.graph, layers);
            var removedEdges = Object.keys(acyclicGraphInfo.removedEdges).map(function (ek) { return component.getEdge(ek); });
            var coordinatedGraph = nodeOrderer.assignAbsCoordinates(orderedGraph);
            var componentLayout = _this.createInfoGraphLayout(coordinatedGraph, acyclicGraphInfo.reversedEdges, removedEdges);
            layout.extend(_this.setComponentOffset(componentLayout, offset));
            offset += _this.getComponentOffset(componentLayout);
        });
        return layout;
    };
    SugiyamaLayoutBuilder.prototype.createInfoGraphLayout = function (coordinatedGraph, reversedEdges, removedEdges) {
        var _this = this;
        var currentPosition = new point_1.Point(0, 0);
        var items = coordinatedGraph.items;
        var sortedLayers = new ListUtils_1.HashSet(items.map(function (n) { return n.layer; }).sort(function (a, b) { return a - b; }));
        var absOffsetInfo = this.getAbsOffsetInfo(coordinatedGraph.items);
        var positions = {};
        var totalDepth = 0;
        var leftEdge = Number.MAX_SAFE_INTEGER || Number.MAX_VALUE;
        var rightEdge = Number.MIN_SAFE_INTEGER || Number.MAX_VALUE;
        var _loop_1 = function (i) {
            var layer = sortedLayers.item(i);
            var maxDepthLayer = 0;
            items
                .filter(function (n) { return n.layer === layer; })
                .sort(function (a, b) { return a.position - b.position; })
                .forEach(function (n) {
                var depthNodeSize = _this.getDepthNodeSize(n);
                var directionOffset = _this.chooseDirectionValue(0, depthNodeSize);
                var absPosition = _this.getAbsPosition(n.position, _this.getBreadthNodeSize(n), absOffsetInfo);
                currentPosition = _this.setBreadth(currentPosition, absPosition);
                var nodePosition = _this.setDepthOffset(currentPosition, -directionOffset);
                positions[n.key] = nodePosition;
                if (n.isDummy)
                    return;
                var breadth = _this.settings.orientation === LayoutSettings_1.DataLayoutOrientation.Horizontal ? nodePosition.y : nodePosition.x;
                leftEdge = Math.min(leftEdge, breadth);
                rightEdge = Math.max(rightEdge, breadth + _this.getBreadthNodeSize(n));
                maxDepthLayer = Math.max(maxDepthLayer, _this.getDepthNodeSize(n));
            });
            totalDepth += maxDepthLayer;
            currentPosition = this_1.setBreadth(currentPosition, 0);
            currentPosition = this_1.setDepthOffset(currentPosition, this_1.getDirectionValue(maxDepthLayer + this_1.settings.layerSpacing));
        };
        var this_1 = this;
        for (var i = 0; i < sortedLayers.length; i++) {
            _loop_1(i);
        }
        totalDepth += (sortedLayers.length - 1) * this.settings.layerSpacing;
        var layout = new GraphLayout_1.GraphLayout();
        this.createNodesLayout(coordinatedGraph, layout, leftEdge, totalDepth, positions);
        this.createEdgesLayout(coordinatedGraph, layout, reversedEdges, removedEdges);
        return layout;
    };
    SugiyamaLayoutBuilder.prototype.createNodesLayout = function (infoGraph, layout, leftEdge, totalDepth, positions) {
        var _this = this;
        var offset = this.settings.orientation === LayoutSettings_1.DataLayoutOrientation.Vertical ?
            new point_1.Point(-leftEdge, this.chooseDirectionValue(0, totalDepth)) :
            new point_1.Point(this.chooseDirectionValue(0, totalDepth), -leftEdge);
        infoGraph.items.forEach(function (n) {
            if (!n.isDummy) {
                var node = _this.graph.getNode(n.key);
                layout.addNode(new NodeLayout_1.NodeLayout(node, positions[n.key].clone().offset(offset.x, offset.y)));
            }
        });
    };
    SugiyamaLayoutBuilder.prototype.createEdgesLayout = function (infoGraph, layout, reversedEdges, removedEdges) {
        var DIRECT = this.getDirectEdgeLayout();
        var TOP_TO_BOTTOM = this.getDiffLevelEdgeLayout(true);
        var BOTTOM_TO_TOP = this.getDiffLevelEdgeLayout(false);
        var TOP_TO_TOP = this.getSameLevelEdgeLayout(true);
        var BOTTOM_TO_BOTTOM = this.getSameLevelEdgeLayout(false);
        var occupied = {};
        infoGraph.edges
            .filter(function (e) { return !e.isDummy; })
            .concat(removedEdges.map(function (e) { return new EdgeOnLayer(e.key, false, e.from, e.to); }))
            .sort(function (a, b) {
            return (infoGraph.getNode(a.originFrom).layer - infoGraph.getNode(b.originFrom).layer) ||
                (infoGraph.getNode(a.to).layer - infoGraph.getNode(b.to).layer);
        })
            .forEach(function (e) {
            var isReversed = reversedEdges[e.key];
            var from = infoGraph.getNode(isReversed ? e.to : e.originFrom);
            var to = infoGraph.getNode(isReversed ? e.originFrom : e.to);
            if (to.layer - from.layer === 1)
                layout.addEdge(new NodeLayout_1.EdgeLayout(e.key, DIRECT.from, DIRECT.to));
            else {
                var candidates_1 = [];
                if (to.position - from.position >= 1) {
                    candidates_1.push(TOP_TO_BOTTOM);
                    candidates_1.push({ from: DIRECT.from, to: TOP_TO_BOTTOM.to });
                    candidates_1.push({ from: TOP_TO_BOTTOM.from, to: DIRECT.to });
                }
                else if (to.position - from.position <= -1) {
                    candidates_1.push(BOTTOM_TO_TOP);
                    candidates_1.push({ from: DIRECT.from, to: BOTTOM_TO_TOP.to });
                    candidates_1.push({ from: BOTTOM_TO_TOP.from, to: DIRECT.to });
                }
                else {
                    var oneliner = from.position === to.position && to.position === 0 ? [TOP_TO_TOP, BOTTOM_TO_BOTTOM] : [BOTTOM_TO_BOTTOM, TOP_TO_TOP];
                    oneliner.forEach(function (c) { return candidates_1.push(c); });
                    oneliner.forEach(function (c) {
                        candidates_1.push({ from: c.from, to: DIRECT.to });
                        candidates_1.push({ from: DIRECT.from, to: c.to });
                    });
                }
                candidates_1.push(DIRECT);
                for (var i = 0, candidate = void 0; candidate = candidates_1[i]; i++) {
                    var fromKey = from.key + "_" + candidate.from;
                    var toKey = to.key + "_" + candidate.to;
                    if (occupied[fromKey] !== Connector_1.ConnectorPosition.End && occupied[toKey] !== Connector_1.ConnectorPosition.Begin) {
                        layout.addEdge(new NodeLayout_1.EdgeLayout(e.key, candidate.from, candidate.to));
                        occupied[fromKey] = Connector_1.ConnectorPosition.Begin;
                        occupied[toKey] = Connector_1.ConnectorPosition.End;
                        break;
                    }
                }
            }
        });
    };
    SugiyamaLayoutBuilder.prototype.getDirectEdgeLayout = function () {
        if (this.settings.orientation === LayoutSettings_1.DataLayoutOrientation.Horizontal)
            return this.settings.direction === LayoutSettings_1.LogicalDirectionKind.Forward ? { from: 1, to: 3 } : { from: 3, to: 1 };
        return this.settings.direction === LayoutSettings_1.LogicalDirectionKind.Forward ? { from: 2, to: 0 } : { from: 0, to: 2 };
    };
    SugiyamaLayoutBuilder.prototype.getDiffLevelEdgeLayout = function (topToBottom) {
        if (this.settings.orientation === LayoutSettings_1.DataLayoutOrientation.Horizontal)
            return topToBottom ? { from: 2, to: 0 } : { from: 0, to: 2 };
        return topToBottom ? { from: 3, to: 1 } : { from: 1, to: 3 };
    };
    SugiyamaLayoutBuilder.prototype.getSameLevelEdgeLayout = function (topToBottom) {
        if (this.settings.orientation === LayoutSettings_1.DataLayoutOrientation.Horizontal)
            return topToBottom ? { from: 0, to: 0 } : { from: 2, to: 2 };
        return topToBottom ? { from: 3, to: 3 } : { from: 1, to: 1 };
    };
    SugiyamaLayoutBuilder.prototype.getAbsOffsetInfo = function (nodesInfos) {
        var _this = this;
        var absOffsetMatrix = {};
        var addCell = function (n, intAbsCoord) {
            if (absOffsetMatrix[intAbsCoord] === undefined)
                absOffsetMatrix[intAbsCoord] = _this.getBreadthNodeSize(n);
            absOffsetMatrix[intAbsCoord] = Math.max(absOffsetMatrix[intAbsCoord], _this.getBreadthNodeSize(n));
        };
        nodesInfos.forEach(function (n) {
            var intAbsCoord = trunc(n.position);
            addCell(n, intAbsCoord);
            if (absOffsetMatrix[intAbsCoord] % 1 !== 0)
                addCell(n, intAbsCoord + 1);
        });
        var absOffsetInfo = {};
        var leftOffset = 0;
        Object.keys(absOffsetMatrix).sort(function (a, b) { return parseFloat(a) - parseFloat(b); }).forEach(function (coord) {
            absOffsetInfo[coord] = { leftOffset: leftOffset, width: absOffsetMatrix[coord] };
            leftOffset += absOffsetMatrix[coord] + _this.settings.columnSpacing;
        });
        return absOffsetInfo;
    };
    SugiyamaLayoutBuilder.prototype.setBreadth = function (position, breadthPosition) {
        if (this.settings.orientation === LayoutSettings_1.DataLayoutOrientation.Vertical)
            return new point_1.Point(breadthPosition, position.y);
        return new point_1.Point(position.x, breadthPosition);
    };
    SugiyamaLayoutBuilder.prototype.setDepthOffset = function (position, offset) {
        if (this.settings.orientation === LayoutSettings_1.DataLayoutOrientation.Horizontal)
            return new point_1.Point(position.x + offset, position.y);
        return new point_1.Point(position.x, position.y + offset);
    };
    SugiyamaLayoutBuilder.prototype.getAbsPosition = function (absCoordinate, itemSize, absoluteOffsetInfo) {
        var intAbsCoord = trunc(absCoordinate);
        var absLeftOffset = absoluteOffsetInfo[intAbsCoord].leftOffset;
        var cellWidth = absoluteOffsetInfo[intAbsCoord].width;
        if (absCoordinate % 1 === 0)
            return absLeftOffset + (cellWidth - itemSize) / 2;
        return absLeftOffset + cellWidth - (itemSize - this.settings.columnSpacing) / 2;
    };
    SugiyamaLayoutBuilder.prototype.getBreadthNodeSize = function (node) {
        return node.isDummy ? 0 : this.getBreadthNodeSizeCore(this.graph.getNode(node.key));
    };
    SugiyamaLayoutBuilder.prototype.getDepthNodeSize = function (node) {
        return node.isDummy ? 0 : this.getDepthNodeSizeCore(this.graph.getNode(node.key));
    };
    return SugiyamaLayoutBuilder;
}(BaseBuilder_1.LayoutBuilder));
exports.SugiyamaLayoutBuilder = SugiyamaLayoutBuilder;
var SugiyamaLayerDistributor = (function () {
    function SugiyamaLayerDistributor() {
    }
    SugiyamaLayerDistributor.getLayers = function (acyclicGraph) {
        var feasibleTree = this.getFeasibleTree(acyclicGraph);
        return this.calcNodesLayers(feasibleTree);
    };
    SugiyamaLayerDistributor.getFeasibleTree = function (graph) {
        var layers = this.initLayerAssignment(graph);
        return graph.getSpanningGraph(graph.nodes[0], Structures_1.ConnectionMode.OutgoingAndIncoming, function (e) { return layers[e.to] - layers[e.from]; });
    };
    SugiyamaLayerDistributor.initLayerAssignment = function (graph) {
        var layers = {};
        var currentLayer = 0;
        var actualAssignedNodes = {};
        var assigningNodes = graph.nodes.filter(function (n) { return !graph.getAdjacentEdges(n, Structures_1.ConnectionMode.Incoming).length; });
        var _loop_2 = function () {
            assigningNodes.forEach(function (n) {
                layers[n] = currentLayer;
                actualAssignedNodes[n] = true;
            });
            Object.keys(actualAssignedNodes).forEach(function (n) {
                if (graph.getAdjacentEdges(n, Structures_1.ConnectionMode.Outgoing).filter(function (e) { return layers[e.to] === undefined; }).length === 0)
                    delete actualAssignedNodes[n];
            });
            var assigningNodesSet = {};
            Object.keys(actualAssignedNodes).forEach(function (n) {
                graph.getAdjacentEdges(n, Structures_1.ConnectionMode.Outgoing)
                    .map(function (e) { return e.to; })
                    .filter(function (n) { return layers[n] === undefined && graph.getAdjacentEdges(n, Structures_1.ConnectionMode.Incoming).reduce(function (acc, e) { return acc && layers[e.from] !== undefined; }, true); })
                    .forEach(function (n) { return assigningNodesSet[n] = true; });
            });
            assigningNodes = Object.keys(assigningNodesSet);
            currentLayer++;
        };
        while (assigningNodes.length) {
            _loop_2();
        }
        return layers;
    };
    SugiyamaLayerDistributor.calcNodesLayers = function (graph) {
        var layers = {};
        var minLayer = Number.MAX_SAFE_INTEGER || Number.MAX_VALUE;
        var currentLevel = 0;
        var iterator = graph.createIterator(Structures_1.ConnectionMode.OutgoingAndIncoming);
        iterator.visitEachEdgeOnce = false;
        iterator.onNode = function (n) {
            layers[n.key] = currentLevel;
            minLayer = Math.min(minLayer, currentLevel);
        };
        iterator.skipNode = function (n) { return layers[n.key] !== undefined; };
        iterator.skipEdge = function (e) { return layers[e.from] !== undefined && layers[e.to] !== undefined; };
        iterator.onEdge = function (e, out) {
            if (out)
                currentLevel = layers[e.from] + 1;
            else
                currentLevel = layers[e.to] - 1;
        };
        iterator.iterate(graph.nodes[0]);
        for (var key in layers) {
            if (!Object.prototype.hasOwnProperty.call(layers, key))
                continue;
            layers[key] -= minLayer;
        }
        return layers;
    };
    return SugiyamaLayerDistributor;
}());
exports.SugiyamaLayerDistributor = SugiyamaLayerDistributor;
var SugiyamaNodesOrderer = (function () {
    function SugiyamaNodesOrderer() {
        this.idCounter = -10000;
    }
    SugiyamaNodesOrderer.prototype.orderNodes = function (graph, layers) {
        var maxIteration = 14;
        var currentIteration = 1;
        var graphInfo = this.initGraphInfo(graph, layers);
        var nodeInfos = graphInfo.items;
        var orderInfo = this.initOrder(nodeInfos);
        var bestNodesPositions = this.getNodeToPositionMap(nodeInfos);
        var bestCrossCount = this.getCrossCount(orderInfo, graphInfo);
        var isParentToChildren = true;
        while (currentIteration < maxIteration && bestCrossCount !== 0) {
            orderInfo = this.getNodesOrder(orderInfo, graphInfo, isParentToChildren);
            var crossCount = this.getCrossCount(orderInfo, graphInfo);
            if (crossCount < bestCrossCount) {
                bestNodesPositions = this.getNodeToPositionMap(graphInfo.items);
                bestCrossCount = crossCount;
            }
            isParentToChildren = !isParentToChildren;
            currentIteration++;
        }
        graphInfo.items.forEach(function (n) { return n.position = bestNodesPositions[n.key]; });
        return graphInfo;
    };
    SugiyamaNodesOrderer.prototype.getNodesOrder = function (current, graph, isParentToChildren) {
        var _this = this;
        var order = {};
        var _loop_3 = function (layer) {
            if (!Object.prototype.hasOwnProperty.call(current, layer))
                return "continue";
            var nodePositions = {};
            var nodeKeys = [];
            current[layer].forEach(function (ni) {
                var adjacentNodesPositions = (isParentToChildren ? graph.getChildren(ni.key) : graph.getParents(ni.key))
                    .map(function (nk) { return graph.getNode(nk).position; });
                nodeKeys.push(ni.key);
                nodePositions[ni.key] = _this.getNodePosition(adjacentNodesPositions);
            });
            order[layer] = this_2.sortNodes(nodeKeys, nodePositions, graph);
        };
        var this_2 = this;
        for (var layer in current) {
            _loop_3(layer);
        }
        return order;
    };
    SugiyamaNodesOrderer.prototype.sortNodes = function (nodeKeys, nodePositions, graph) {
        return nodeKeys
            .sort(function (a, b) { return nodePositions[a] - nodePositions[b]; })
            .map(function (nk, index) {
            var node = graph.getNode(nk);
            node.position = index;
            return node;
        });
    };
    SugiyamaNodesOrderer.prototype.getNodePosition = function (adjacentNodesPositions) {
        adjacentNodesPositions = adjacentNodesPositions.sort(function (a, b) { return a - b; });
        if (!adjacentNodesPositions.length)
            return 0;
        var medianIndex = Math.floor(adjacentNodesPositions.length / 2);
        if (adjacentNodesPositions.length === 2 || adjacentNodesPositions.length % 2 === 1)
            return adjacentNodesPositions[medianIndex];
        var leftMedianPosition = adjacentNodesPositions[medianIndex - 1] - adjacentNodesPositions[0];
        var rightMedianPosition = adjacentNodesPositions[adjacentNodesPositions.length - 1] - adjacentNodesPositions[medianIndex];
        return Math.floor((adjacentNodesPositions[medianIndex - 1] * rightMedianPosition + adjacentNodesPositions[medianIndex] * leftMedianPosition) /
            (leftMedianPosition + rightMedianPosition));
    };
    SugiyamaNodesOrderer.prototype.initOrder = function (nodeInfos) {
        var result = {};
        nodeInfos.forEach(function (ni) { return (result[ni.layer] || (result[ni.layer] = [])).push(ni); });
        return result;
    };
    SugiyamaNodesOrderer.prototype.getCrossCount = function (orderInfo, graph) {
        var count = 0;
        var _loop_4 = function (layer) {
            if (!Object.prototype.hasOwnProperty.call(orderInfo, layer))
                return "continue";
            var viewedAdjacentNodesPositions = [];
            orderInfo[layer].forEach(function (n) {
                var positions = graph.getChildren(n.key).map(function (c) { return graph.getNode(c).position; });
                positions.forEach(function (p) {
                    count += viewedAdjacentNodesPositions.filter(function (vp) { return p < vp; }).length;
                });
                viewedAdjacentNodesPositions = viewedAdjacentNodesPositions.concat(positions);
            });
        };
        for (var layer in orderInfo) {
            _loop_4(layer);
        }
        return count;
    };
    SugiyamaNodesOrderer.prototype.initGraphInfo = function (graph, layers) {
        var _this = this;
        var countNodesOnLayer = {};
        var nodesInfoMap = {};
        var nodeInfos = [];
        var edgeInfos = [];
        graph.nodes.forEach(function (n) {
            var layer = layers[n];
            if (countNodesOnLayer[layer] === undefined)
                countNodesOnLayer[layer] = 0;
            var info = new NodeOnLayer(n, false, layer, countNodesOnLayer[layer]++);
            nodesInfoMap[n] = info;
            nodeInfos.push(info);
        });
        graph.edges.forEach(function (e) {
            var span = layers[e.to] - layers[e.from];
            if (span > 1) {
                var prevNodeInfo = nodesInfoMap[e.from];
                for (var delta = 1; delta < span; delta++) {
                    var dNodeInfo = new NodeOnLayer(_this.createDummyID(), true, layers[e.from] + delta, countNodesOnLayer[layers[e.from] + delta]++);
                    edgeInfos.push(new EdgeOnLayer(_this.createDummyID(), true, prevNodeInfo.key, dNodeInfo.key));
                    nodeInfos.push(dNodeInfo);
                    prevNodeInfo = dNodeInfo;
                }
                edgeInfos.push(new EdgeOnLayer(e.key, false, prevNodeInfo.key, nodesInfoMap[e.to].key, nodesInfoMap[e.from].key));
            }
            else
                edgeInfos.push(new EdgeOnLayer(e.key, false, nodesInfoMap[e.from].key, nodesInfoMap[e.to].key));
        });
        return new Graph_1.FastGraph(nodeInfos, edgeInfos);
    };
    SugiyamaNodesOrderer.prototype.createDummyID = function () {
        return "dummy_" + --this.idCounter;
    };
    SugiyamaNodesOrderer.prototype.getNodeToPositionMap = function (nodeInfos) {
        return nodeInfos.reduce(function (acc, ni) {
            acc[ni.key] = ni.position;
            return acc;
        }, {});
    };
    SugiyamaNodesOrderer.prototype.assignAbsCoordinates = function (graph) {
        var absCoordinates = this.getAbsCoodinate(graph);
        return new Graph_1.FastGraph(graph.items.map(function (n) { return new NodeOnLayer(n.key, n.isDummy, n.layer, absCoordinates[n.key]); }), graph.edges.slice(0));
    };
    SugiyamaNodesOrderer.prototype.getAbsCoodinate = function (graph) {
        var _this = this;
        var orderInfo = graph.items.reduce(function (acc, n) {
            acc[n.layer] = acc[n.layer] || [];
            var pos = search_1.SearchUtils.binaryIndexOf(acc[n.layer], function (ni) { return ni.position - n.position; });
            acc[n.layer].splice(pos < 0 ? ~pos : pos, 0, n);
            return acc;
        }, {});
        var medianPositions = [MedianAlignmentMode.TopLeft, MedianAlignmentMode.TopRight, MedianAlignmentMode.BottomLeft, MedianAlignmentMode.BottomRight]
            .map(function (alignment) { return _this.getPositionByMedian(graph, alignment, orderInfo); });
        var nodeToPosition = {};
        graph.items.forEach(function (n) {
            var posList = medianPositions.map(function (positions) { return positions[n.key]; }).sort(function (a, b) { return a - b; });
            nodeToPosition[n.key] = (posList[1] + posList[2]) / 2;
        });
        return nodeToPosition;
    };
    SugiyamaNodesOrderer.prototype.getPositionByMedian = function (graph, alignment, orderInfo) {
        var nodeInfos = graph.items;
        var positions = this.getNodeToPositionMap(nodeInfos);
        var medians = this.getMedians(graph, nodeInfos, alignment);
        medians = this.resolveMedianConflicts(graph, orderInfo, medians, alignment);
        this.getSortedBlocks(graph, nodeInfos, medians, alignment)
            .forEach(function (block) {
            var maxPos = block.reduce(function (acc, n) { return positions[n.key] > acc ? positions[n.key] : acc; }, -2);
            block.forEach(function (n) {
                var delta = maxPos - positions[n.key];
                if (delta > 0)
                    orderInfo[n.layer]
                        .filter(function (ln) { return ln.position > n.position; })
                        .forEach(function (ln) { return positions[ln.key] += delta; });
                positions[n.key] = maxPos;
            });
        });
        return positions;
    };
    SugiyamaNodesOrderer.prototype.getSortedBlocks = function (graph, nodeInfos, medians, alignment) {
        var blocks = [];
        var isBottom = alignment === MedianAlignmentMode.BottomLeft || alignment === MedianAlignmentMode.BottomRight;
        var allNodesInfo = new ListUtils_1.HashSet(nodeInfos.slice(0).sort(function (a, b) { return isBottom ? (a.layer - b.layer) : (b.layer - a.layer); }), function (n) { return n.key; });
        while (allNodesInfo.length) {
            var firstNode = allNodesInfo.item(0);
            var block = this.getBlock(graph, firstNode, medians, alignment);
            blocks.push(block);
            block.forEach(function (n) { return allNodesInfo.remove(n); });
        }
        blocks.sort(function (x, y) {
            var xMinNodeInfo = x.reduce(function (min, n) { return n.position < min.position ? n : min; }, x[0]);
            var yOnMinXLayer = y.filter(function (n) { return n.layer === xMinNodeInfo.layer; })[0];
            if (yOnMinXLayer)
                return xMinNodeInfo.position > yOnMinXLayer.position ? 1 : -1;
            var yMinNodeInfo = y.reduce(function (min, n) { return n.position < min.position ? n : min; }, y[0]);
            var xOnMinYLayer = x.filter(function (n) { return n.layer === yMinNodeInfo.layer; })[0];
            if (xOnMinYLayer)
                return xOnMinYLayer.position > yMinNodeInfo.position ? 1 : -1;
            return xMinNodeInfo.layer > yMinNodeInfo.layer ? 1 : -1;
        });
        return blocks;
    };
    SugiyamaNodesOrderer.prototype.getBlock = function (graph, root, medians, alignment) {
        var block = [];
        var median = null;
        do {
            if (median)
                root = alignment === MedianAlignmentMode.TopLeft || alignment === MedianAlignmentMode.TopRight ? graph.getNode(median.from) : graph.getNode(median.to);
            block.push(root);
            median = medians[root.key];
        } while (median);
        return block;
    };
    SugiyamaNodesOrderer.prototype.resolveMedianConflicts = function (graph, layers, medians, alignment) {
        var _this = this;
        var filteredMedians = {};
        var _loop_5 = function (layer) {
            if (!Object.prototype.hasOwnProperty.call(layers, layer))
                return "continue";
            var minPos;
            var maxPos;
            var nodeInfos = layers[layer];
            if (alignment === MedianAlignmentMode.TopRight || alignment === MedianAlignmentMode.BottomRight)
                nodeInfos = nodeInfos.slice(0).sort(function (a, b) { return b.position - a.position; });
            nodeInfos.forEach(function (n) {
                var median = medians[n.key];
                if (!median)
                    filteredMedians[n.key] = null;
                else {
                    var medianItemKey = alignment === MedianAlignmentMode.TopLeft || alignment === MedianAlignmentMode.TopRight ? median.from : median.to;
                    var medianPosition = graph.getNode(medianItemKey).position;
                    if (_this.checkMedianConfict(minPos, maxPos, medianPosition, alignment))
                        filteredMedians[n.key] = null;
                    else {
                        minPos = minPos === undefined ? medianPosition : Math.min(minPos, medianPosition);
                        maxPos = maxPos === undefined ? medianPosition : Math.max(maxPos, medianPosition);
                        filteredMedians[n.key] = median;
                    }
                }
            });
        };
        for (var layer in layers) {
            _loop_5(layer);
        }
        return filteredMedians;
    };
    SugiyamaNodesOrderer.prototype.checkMedianConfict = function (min, max, medianPosition, alignment) {
        if (min === undefined || max === undefined)
            return false;
        if (alignment === MedianAlignmentMode.TopLeft || alignment === MedianAlignmentMode.BottomLeft)
            return max >= medianPosition;
        return min <= medianPosition;
    };
    SugiyamaNodesOrderer.prototype.getMedians = function (graph, nodeInfos, alignment) {
        var _this = this;
        var medians = {};
        nodeInfos.forEach(function (n) {
            var actualAdjacentEdges = _this.getActualAdjacentEdges(graph, n, alignment);
            var medianPosition = _this.getMedianPosition(actualAdjacentEdges.length, alignment);
            medians[n.key] = actualAdjacentEdges[medianPosition];
        });
        return medians;
    };
    SugiyamaNodesOrderer.prototype.getMedianPosition = function (length, alignment) {
        if (length === 0)
            return -1;
        if (length % 2 !== 0)
            return Math.floor(length / 2);
        if (alignment === MedianAlignmentMode.TopLeft || alignment === MedianAlignmentMode.BottomLeft)
            return Math.floor(length / 2) - 1;
        if (alignment === MedianAlignmentMode.TopRight || alignment === MedianAlignmentMode.BottomRight)
            return Math.floor(length / 2);
        throw new Error("Invalid Operation");
    };
    SugiyamaNodesOrderer.prototype.getActualAdjacentEdges = function (graph, node, alignment) {
        if (alignment === MedianAlignmentMode.TopLeft || alignment === MedianAlignmentMode.TopRight)
            return graph.getAdjacentEdges(node.key, Structures_1.ConnectionMode.Incoming).sort(function (a, b) { return graph.getNode(a.from).position - graph.getNode(b.from).position; });
        return graph.getAdjacentEdges(node.key, Structures_1.ConnectionMode.Outgoing).sort(function (a, b) { return graph.getNode(a.to).position - graph.getNode(b.to).position; });
    };
    return SugiyamaNodesOrderer;
}());
exports.SugiyamaNodesOrderer = SugiyamaNodesOrderer;
var NodeOnLayer = (function () {
    function NodeOnLayer(key, isDummy, layer, position) {
        this.key = key;
        this.isDummy = isDummy;
        this.layer = layer;
        this.position = position;
    }
    NodeOnLayer.prototype.getHashCode = function () {
        return this.key.toString();
    };
    return NodeOnLayer;
}());
exports.NodeOnLayer = NodeOnLayer;
var EdgeOnLayer = (function () {
    function EdgeOnLayer(key, isDummy, from, to, originFrom) {
        this.key = key;
        this.isDummy = isDummy;
        this.from = from;
        this.to = to;
        this._originFrom = originFrom;
    }
    EdgeOnLayer.prototype.getHashCode = function () {
        return this.from + "-" + this.to;
    };
    Object.defineProperty(EdgeOnLayer.prototype, "originFrom", {
        get: function () {
            return this._originFrom !== undefined ? this._originFrom : this.from;
        },
        enumerable: false,
        configurable: true
    });
    return EdgeOnLayer;
}());
exports.EdgeOnLayer = EdgeOnLayer;
var MedianAlignmentMode;
(function (MedianAlignmentMode) {
    MedianAlignmentMode[MedianAlignmentMode["TopLeft"] = 0] = "TopLeft";
    MedianAlignmentMode[MedianAlignmentMode["TopRight"] = 1] = "TopRight";
    MedianAlignmentMode[MedianAlignmentMode["BottomLeft"] = 2] = "BottomLeft";
    MedianAlignmentMode[MedianAlignmentMode["BottomRight"] = 3] = "BottomRight";
})(MedianAlignmentMode || (MedianAlignmentMode = {}));
function trunc(val) {
    if (Math.trunc)
        return Math.trunc(val);
    if (!isFinite(val))
        return val;
    return (val - val % 1) || (val < 0 ? -0 : val === 0 ? val : 0);
}
//# sourceMappingURL=Sugiyama.js.map