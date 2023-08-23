"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectorRenderSegment = void 0;
var segment_1 = require("@devexpress/utils/lib/geometry/segment");
var ConnectorProhibitedSegments_1 = require("./ConnectorProhibitedSegments");
var ConnectorRenderSegment = (function () {
    function ConnectorRenderSegment(startInfo, endInfo, startPointIndex, previousCustomSegment) {
        this.startInfo = startInfo;
        this.endInfo = endInfo;
        this.startPointIndex = startPointIndex;
        this.previousCustomSegment = previousCustomSegment;
    }
    Object.defineProperty(ConnectorRenderSegment.prototype, "startPathPoint", {
        get: function () {
            return this.startInfo instanceof segment_1.Segment ? this.startInfo.endPoint : this.startInfo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConnectorRenderSegment.prototype, "endPathPoint", {
        get: function () {
            return this.endInfo instanceof segment_1.Segment ? this.endInfo.startPoint : this.endInfo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConnectorRenderSegment.prototype, "startPoint", {
        get: function () {
            return this.startInfo instanceof segment_1.Segment ? this.startInfo.startPoint : this.startInfo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConnectorRenderSegment.prototype, "endPoint", {
        get: function () {
            return this.endInfo instanceof segment_1.Segment ? this.endInfo.endPoint : this.endInfo;
        },
        enumerable: false,
        configurable: true
    });
    ConnectorRenderSegment.prototype.createGridPoints = function () {
        var result = [];
        if (this.endInfo instanceof segment_1.Segment) {
            result.push(this.endInfo.startPoint);
            result.push(this.endInfo.endPoint);
        }
        else
            result.push(this.endInfo);
        return result;
    };
    ConnectorRenderSegment.prototype.createProhibitedSegments = function () {
        if (this.startInfo instanceof segment_1.Segment) {
            var result = this.createProhibitedSegmentsCore(this.startInfo);
            if (this.endInfo instanceof segment_1.Segment) {
                result.addSegment(this.endInfo);
                result.addExludedPoint(this.endInfo.startPoint);
            }
            if (this.previousCustomSegment)
                result.addSegment(this.previousCustomSegment);
            return result;
        }
        if (this.endInfo instanceof segment_1.Segment) {
            var result = this.createProhibitedSegmentsCore(this.endInfo);
            result.addExludedPoint(this.endInfo.startPoint);
            if (this.previousCustomSegment)
                result.addSegment(this.previousCustomSegment);
            return result;
        }
        return this.previousCustomSegment ? this.createProhibitedSegmentsCore(this.previousCustomSegment) : undefined;
    };
    ConnectorRenderSegment.prototype.createProhibitedSegmentsCore = function (segment) {
        var result = new ConnectorProhibitedSegments_1.ConnectorProhibitedSegments();
        result.addSegment(segment);
        return result;
    };
    return ConnectorRenderSegment;
}());
exports.ConnectorRenderSegment = ConnectorRenderSegment;
//# sourceMappingURL=ConnectorRenderSegment.js.map