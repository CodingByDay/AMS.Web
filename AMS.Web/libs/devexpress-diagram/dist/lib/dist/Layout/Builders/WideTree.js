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
exports.TreeLayoutBuilder = void 0;
var GraphLayout_1 = require("../GraphLayout");
var Tree_1 = require("../Tree");
var NodeLayout_1 = require("../NodeLayout");
var Utils_1 = require("../../Utils");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var BaseBuilder_1 = require("./BaseBuilder");
var Structures_1 = require("../Structures");
var DiagramItem_1 = require("../../Model/DiagramItem");
var LayoutSettings_1 = require("../LayoutSettings");
var Graph_1 = require("../Graph");
var TreeLayoutBuilder = (function (_super) {
    __extends(TreeLayoutBuilder, _super);
    function TreeLayoutBuilder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodeToLevel = {};
        _this.levelDepthSize = {};
        return _this;
    }
    TreeLayoutBuilder.prototype.build = function () {
        var _this = this;
        var layout = new GraphLayout_1.GraphLayout();
        var offset = 0;
        this.graph.getConnectedComponents().forEach(function (c) {
            var tree = Tree_1.Tree.createSpanningTree(c);
            var componentLayout = _this.processTree(tree);
            var subOffset = _this.getComponentOffset(componentLayout);
            while (componentLayout.nodeKeys.length < c.nodes.length) {
                var subGraph = new Graph_1.Graph(c.nodes.filter(function (n) { return !componentLayout.nodeToLayout[n]; }).map(function (n) { return c.getNode(n); }), c.edges.filter(function (e) { return !componentLayout.edgeToPosition[e.key]; }));
                var subTree = Tree_1.Tree.createSpanningTree(subGraph);
                var subComponentLayout = _this.processTree(subTree);
                componentLayout.extend(_this.setComponentOffset(subComponentLayout, subOffset));
                subOffset += _this.getComponentOffset(subComponentLayout);
            }
            layout.extend(_this.setComponentOffset(componentLayout, offset));
            offset += _this.getComponentOffset(componentLayout);
        });
        return layout;
    };
    TreeLayoutBuilder.prototype.preProcessTree = function (tree, parents, level) {
        var _this = this;
        parents = parents.filter(function (p) { return (_this.nodeToLevel[p.key] === undefined ? (_this.nodeToLevel[p.key] = level) : -1) >= 0; });
        if (parents.length) {
            var maxDepthSize = this.getMaxDepthSize(parents);
            this.levelDepthSize[level] = maxDepthSize;
            this.preProcessTree(tree, [].concat.apply([], parents.map(function (p) { return tree.getChildren(p); })), level + 1);
        }
    };
    TreeLayoutBuilder.prototype.loadNodes = function (tree, layout, parent) {
        if (!parent)
            return [layout.addNode(new NodeLayout_1.NodeLayout(tree.root, point_1.Point.zero()))];
        return tree.getChildren(parent.info).map(function (child) {
            return !layout.hasNode(child.key) ? layout.addNode(new NodeLayout_1.NodeLayout(child, point_1.Point.zero())) : undefined;
        }).filter(function (nl) { return nl; });
    };
    TreeLayoutBuilder.prototype.processTree = function (tree) {
        var _this = this;
        var layout = new GraphLayout_1.GraphLayout();
        this.preProcessTree(tree, [tree.root], 0);
        this.processLevel(tree, layout, 0, new Utils_1.Range(0), 0);
        if (this.settings.direction === LayoutSettings_1.LogicalDirectionKind.Backward) {
            var levelDepths = Object.keys(this.levelDepthSize).map(function (l) { return _this.levelDepthSize[l]; });
            var mostDepthPos_1 = levelDepths.reduce(function (acc, v) { return acc + v; }, 0) + (levelDepths.length - 1) * this.settings.layerSpacing;
            layout.forEachNode(function (n) { return _this.setDepthPos(n, _this.getDepthPos(n) + mostDepthPos_1); });
        }
        return layout;
    };
    TreeLayoutBuilder.prototype.processLevel = function (tree, layout, depthPos, breadthParentRange, level, parent) {
        var _this = this;
        var nodes = this.addNodes(tree, layout, level, parent);
        var parentEdges = parent ? this.graph.getAdjacentEdges(parent.key, Structures_1.ConnectionMode.Outgoing) : [];
        var maxDepthSize = this.getDirectionValue(this.levelDepthSize[level]);
        var layerSpacing = this.getDirectionValue(this.settings.layerSpacing);
        var prevRange;
        nodes.forEach(function (node) {
            var range = Utils_1.Range.fromLength(prevRange ? (prevRange.to + _this.settings.columnSpacing) : breadthParentRange.from, _this.getBreadthNodeSizeCore(node.info));
            node.position = _this.getNodePosition(range.from, depthPos, maxDepthSize).clone().offset(node.info.margin.left, node.info.margin.top);
            _this.processLevel(tree, layout, depthPos + maxDepthSize + layerSpacing, range, level + 1, node);
            _this.updateEdgeConnections(layout, parentEdges, node);
            breadthParentRange.extend(range);
            prevRange = range;
        });
        if (parent && nodes.length) {
            var lastChild = nodes[nodes.length - 1];
            var childRange = new Utils_1.Range(this.getBreadthPos(nodes[0]), this.getBreadthPos(lastChild) + this.getBreadthNodeSizeCore(lastChild.info, true));
            this.alignParent(parent, childRange, breadthParentRange);
        }
    };
    TreeLayoutBuilder.prototype.addNodes = function (tree, layout, level, parent) {
        var _this = this;
        if (level === 0)
            return [layout.addNode(new NodeLayout_1.NodeLayout(tree.root, point_1.Point.zero()))];
        return tree.getChildren(parent.info)
            .reduce(function (acc, n) {
            if (_this.nodeToLevel[n.key] === level && !layout.hasNode(n.key))
                acc.push(layout.addNode(new NodeLayout_1.NodeLayout(n, point_1.Point.zero())));
            return acc;
        }, []);
    };
    TreeLayoutBuilder.prototype.getMaxDepthSize = function (nodes) {
        var _this = this;
        return nodes.reduce(function (acc, node) { return Math.max(acc, _this.getDepthNodeSizeCore(node)); }, 0);
    };
    TreeLayoutBuilder.prototype.getNodePosition = function (breadthPos, depthPos, maxDepthSide) {
        if (this.settings.direction === LayoutSettings_1.LogicalDirectionKind.Forward)
            return this.settings.orientation === LayoutSettings_1.DataLayoutOrientation.Vertical ? new point_1.Point(breadthPos, depthPos) : new point_1.Point(depthPos, breadthPos);
        return this.settings.orientation === LayoutSettings_1.DataLayoutOrientation.Vertical ? new point_1.Point(breadthPos, depthPos + maxDepthSide) : new point_1.Point(depthPos + maxDepthSide, breadthPos);
    };
    TreeLayoutBuilder.prototype.updateEdgeConnections = function (layout, edges, node) {
        var _this = this;
        edges.filter(function (e) { return e.to === node.key; }).forEach(function (e) {
            var beginIndex = _this.getBeginEdgeIndex();
            var endIndex = _this.getEndEdgeIndex();
            layout.addEdge(new NodeLayout_1.EdgeLayout(e.key, beginIndex, endIndex));
        });
    };
    TreeLayoutBuilder.prototype.getBeginEdgeIndex = function () {
        if (this.settings.direction === LayoutSettings_1.LogicalDirectionKind.Forward)
            return this.isVertical() ? DiagramItem_1.ConnectionPointSide.South : DiagramItem_1.ConnectionPointSide.East;
        return this.isVertical() ? DiagramItem_1.ConnectionPointSide.North : DiagramItem_1.ConnectionPointSide.West;
    };
    TreeLayoutBuilder.prototype.getEndEdgeIndex = function () {
        if (this.settings.direction === LayoutSettings_1.LogicalDirectionKind.Forward)
            return this.isVertical() ? DiagramItem_1.ConnectionPointSide.North : DiagramItem_1.ConnectionPointSide.West;
        return this.isVertical() ? DiagramItem_1.ConnectionPointSide.South : DiagramItem_1.ConnectionPointSide.East;
    };
    TreeLayoutBuilder.prototype.alignParent = function (parent, childRange, availableRange) {
        if (this.settings.alignment === LayoutSettings_1.Alignment.Center) {
            var alignedPosition = childRange.from + childRange.length / 2 - this.getBreadthNodeSizeCore(parent.info, true) / 2;
            if (this.settings.orientation === LayoutSettings_1.DataLayoutOrientation.Vertical) {
                parent.position.x = Math.max(availableRange.from + parent.info.margin.left, alignedPosition);
                parent.position.x = Math.min(availableRange.to - parent.info.size.width - parent.info.margin.right, parent.position.x);
            }
            else {
                parent.position.y = Math.max(availableRange.from + parent.info.margin.top, alignedPosition);
                parent.position.y = Math.min(availableRange.to - parent.info.size.height - parent.info.margin.bottom, parent.position.y);
            }
        }
    };
    TreeLayoutBuilder.prototype.getDepthPos = function (node) {
        return this.settings.orientation === LayoutSettings_1.DataLayoutOrientation.Vertical ? node.position.y : node.position.x;
    };
    TreeLayoutBuilder.prototype.getBreadthPos = function (node) {
        return this.settings.orientation === LayoutSettings_1.DataLayoutOrientation.Vertical ? node.position.x : node.position.y;
    };
    TreeLayoutBuilder.prototype.setDepthPos = function (node, pos) {
        if (this.settings.orientation === LayoutSettings_1.DataLayoutOrientation.Vertical)
            node.position.y = pos;
        else
            node.position.x = pos;
    };
    TreeLayoutBuilder.prototype.isVertical = function () {
        return this.settings.orientation === LayoutSettings_1.DataLayoutOrientation.Vertical;
    };
    return TreeLayoutBuilder;
}(BaseBuilder_1.LayoutBuilder));
exports.TreeLayoutBuilder = TreeLayoutBuilder;
//# sourceMappingURL=WideTree.js.map