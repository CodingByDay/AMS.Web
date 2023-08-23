"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutingGrid = void 0;
var search_1 = require("@devexpress/utils/lib/utils/search");
var RoutingGrid = (function () {
    function RoutingGrid(verticalGridLines, horizontalGridLines, createPoint) {
        this.verticalGridLines = verticalGridLines;
        this.horizontalGridLines = horizontalGridLines;
        this.createPoint = createPoint;
    }
    RoutingGrid.create = function (points, boundsSet, createPoint) {
        var _this = this;
        var verticalLines = [];
        var horizontalLines = [];
        var varticalHashMap = {};
        var horizontalHashMap = {};
        boundsSet.forEach(function (x) {
            _this.addLine(x.x, verticalLines, varticalHashMap);
            _this.addLine(x.right, verticalLines, varticalHashMap);
            _this.addLine(x.y, horizontalLines, horizontalHashMap);
            _this.addLine(x.bottom, horizontalLines, horizontalHashMap);
        });
        points.forEach(function (p) {
            _this.addLine(p.x, verticalLines, varticalHashMap);
            _this.addLine(p.y, horizontalLines, horizontalHashMap);
        });
        verticalLines.sort(function (a, b) { return a - b; });
        horizontalLines.sort(function (a, b) { return a - b; });
        return new RoutingGrid(verticalLines, horizontalLines, createPoint);
    };
    RoutingGrid.addLine = function (line, lines, hashMap) {
        if (!hashMap[line]) {
            lines.push(line);
            hashMap[line] = true;
        }
    };
    RoutingGrid.prototype.getNeighborPoints = function (point) {
        var result = [];
        if (!this.horizontalGridLines || !this.horizontalGridLines.length ||
            !this.verticalGridLines || !this.verticalGridLines.length)
            return result;
        var verticalIndex = search_1.SearchUtils.binaryIndexOf(this.verticalGridLines, function (x) { return x - point.x; });
        if (verticalIndex < 0) {
            verticalIndex = ~verticalIndex;
            if (this.isValidArrayIndex(this.verticalGridLines, verticalIndex))
                result.push(this.createPoint(this.verticalGridLines[verticalIndex], point.y));
        }
        else if (this.isValidArrayIndex(this.verticalGridLines, verticalIndex + 1))
            result.push(this.createPoint(this.verticalGridLines[verticalIndex + 1], point.y));
        if (this.isValidArrayIndex(this.verticalGridLines, verticalIndex - 1))
            result.push(this.createPoint(this.verticalGridLines[verticalIndex - 1], point.y));
        var horizontalIndex = search_1.SearchUtils.binaryIndexOf(this.horizontalGridLines, function (y) { return y - point.y; });
        if (horizontalIndex < 0) {
            horizontalIndex = ~horizontalIndex;
            if (this.isValidArrayIndex(this.horizontalGridLines, horizontalIndex))
                result.push(this.createPoint(point.x, this.horizontalGridLines[horizontalIndex]));
        }
        else if (this.isValidArrayIndex(this.horizontalGridLines, horizontalIndex + 1))
            result.push(this.createPoint(point.x, this.horizontalGridLines[horizontalIndex + 1]));
        if (this.isValidArrayIndex(this.horizontalGridLines, horizontalIndex - 1))
            result.push(this.createPoint(point.x, this.horizontalGridLines[horizontalIndex - 1]));
        return result;
    };
    RoutingGrid.prototype.isValidArrayIndex = function (array, index) {
        return array && index >= 0 && index < array.length;
    };
    return RoutingGrid;
}());
exports.RoutingGrid = RoutingGrid;
//# sourceMappingURL=RoutingGrid.js.map