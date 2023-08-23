"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutBuilder = void 0;
var LayoutSettings_1 = require("../LayoutSettings");
var LayoutBuilder = (function () {
    function LayoutBuilder(settings, graph) {
        this.settings = settings;
        this.graph = graph;
    }
    LayoutBuilder.prototype.getBreadthNodeSizeCore = function (node, excludeMargins) {
        var size = this.settings.orientation === LayoutSettings_1.DataLayoutOrientation.Vertical ? node.size.width : node.size.height;
        if (!excludeMargins)
            size += this.settings.orientation === LayoutSettings_1.DataLayoutOrientation.Vertical ? (node.margin.left + node.margin.right) : (node.margin.top + node.margin.bottom);
        return size;
    };
    LayoutBuilder.prototype.getDepthNodeSizeCore = function (node) {
        return this.settings.orientation === LayoutSettings_1.DataLayoutOrientation.Horizontal ?
            (node.size.width + node.margin.left + node.margin.right) :
            (node.size.height + node.margin.top + node.margin.bottom);
    };
    LayoutBuilder.prototype.chooseDirectionValue = function (near, far) {
        return this.settings.direction === LayoutSettings_1.LogicalDirectionKind.Forward ? near : far;
    };
    LayoutBuilder.prototype.getDirectionValue = function (value) {
        return this.settings.direction === LayoutSettings_1.LogicalDirectionKind.Forward ? value : -value;
    };
    LayoutBuilder.prototype.getComponentOffset = function (graphLayout) {
        var rect = graphLayout.getRectangle(true);
        var offset = this.settings.orientation === LayoutSettings_1.DataLayoutOrientation.Vertical ? rect.width : rect.height;
        return offset + this.settings.componentSpacing;
    };
    LayoutBuilder.prototype.setComponentOffset = function (graphLayout, offset) {
        return this.settings.orientation === LayoutSettings_1.DataLayoutOrientation.Vertical ?
            graphLayout.offsetNodes(offset) :
            graphLayout.offsetNodes(0, offset);
    };
    return LayoutBuilder;
}());
exports.LayoutBuilder = LayoutBuilder;
//# sourceMappingURL=BaseBuilder.js.map