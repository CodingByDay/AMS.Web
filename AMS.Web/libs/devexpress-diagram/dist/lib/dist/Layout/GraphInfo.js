"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphInfo = void 0;
var LayoutUtils_1 = require("./LayoutUtils");
var GraphInfo = (function () {
    function GraphInfo(container, sourceGraph) {
        this.container = container;
        this.sourceGraph = sourceGraph;
    }
    Object.defineProperty(GraphInfo.prototype, "graph", {
        get: function () {
            return this._graph || (this._graph = this.getNodeInfoGraph());
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GraphInfo.prototype, "level", {
        get: function () {
            return this._level !== undefined ? this._level : (this._level = this.getLevel());
        },
        enumerable: false,
        configurable: true
    });
    GraphInfo.prototype.getNodeInfoGraph = function () {
        return this.sourceGraph.cast(LayoutUtils_1.LayoutUtils.shapeToLayout);
    };
    GraphInfo.prototype.getLevel = function () {
        var level = 0;
        if (this.container)
            level = this.getContainerLevel(this.container);
        return level;
    };
    GraphInfo.prototype.getContainerLevel = function (container) {
        var level = 1;
        var parentContainer = container.container;
        if (parentContainer)
            level += this.getContainerLevel(parentContainer);
        return level;
    };
    return GraphInfo;
}());
exports.GraphInfo = GraphInfo;
//# sourceMappingURL=GraphInfo.js.map