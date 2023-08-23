"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutUtils = void 0;
var NodeLayout_1 = require("./NodeLayout");
var LayoutUtils = (function () {
    function LayoutUtils() {
    }
    LayoutUtils.shapeToLayout = function (shape) {
        var margin = new NodeLayout_1.Margin(0);
        var shapeRect = shape.rectangle;
        shape.attachedConnectors.filter(function (c) { return !c.beginItem || !c.endItem; }).forEach(function (c) {
            var connRect = c.rectangle;
            margin.left = Math.max(margin.left, shapeRect.x - connRect.x);
            margin.right = Math.max(margin.right, connRect.right - shapeRect.right);
            margin.top = Math.max(margin.top, shapeRect.y - connRect.y);
            margin.bottom = Math.max(margin.bottom, connRect.bottom - shapeRect.bottom);
        });
        var layout = new NodeLayout_1.NodeInfo(shape.key, margin, shape.size.clone());
        layout.connectionPoints = shape.description.getConnectionPoints();
        return layout;
    };
    return LayoutUtils;
}());
exports.LayoutUtils = LayoutUtils;
//# sourceMappingURL=LayoutUtils.js.map