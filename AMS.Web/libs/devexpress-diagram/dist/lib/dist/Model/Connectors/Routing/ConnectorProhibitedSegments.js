"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectorProhibitedSegments = void 0;
var ConnectorProhibitedSegments = (function () {
    function ConnectorProhibitedSegments() {
        this.segments = [];
        this.exludedPoints = {};
    }
    ConnectorProhibitedSegments.prototype.addSegment = function (segment) {
        this.segments.push(segment);
    };
    ConnectorProhibitedSegments.prototype.addExludedPoint = function (point) {
        this.exludedPoints[point.toString()] = point;
    };
    ConnectorProhibitedSegments.prototype.allowPoint = function (point) {
        if (this.exludedPoints[point.toString()] === undefined)
            for (var i = 0; i < this.segments.length; i++)
                if (this.segments[i].containsPoint(point))
                    return false;
        return true;
    };
    return ConnectorProhibitedSegments;
}());
exports.ConnectorProhibitedSegments = ConnectorProhibitedSegments;
//# sourceMappingURL=ConnectorProhibitedSegments.js.map