"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventUtils = exports.HtmlFocusUtils = exports.ObjectUtils = exports.GeometryUtils = exports.Utils = exports.EventDispatcher = exports.Range = exports.LineEquation = void 0;
require("es6-object-assign/auto");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var rectangle_1 = require("@devexpress/utils/lib/geometry/rectangle");
var search_1 = require("@devexpress/utils/lib/utils/search");
var metrics_1 = require("@devexpress/utils/lib/geometry/metrics");
var math_1 = require("@devexpress/utils/lib/utils/math");
var vector_1 = require("@devexpress/utils/lib/geometry/vector");
var segment_1 = require("@devexpress/utils/lib/geometry/segment");
var Style_1 = require("./Model/Style");
var browser_1 = require("@devexpress/utils/lib/browser");
var evt_1 = require("@devexpress/utils/lib/utils/evt");
var LineEquation = (function () {
    function LineEquation(aParam, bParam, cParam) {
        this.aParam = aParam;
        this.bParam = bParam;
        this.cParam = cParam;
    }
    LineEquation.fromPoints = function (pointA, pointB, accuracy) {
        if (accuracy === void 0) { accuracy = 0.00001; }
        return !GeometryUtils.areDuplicatedPoints(pointA, pointB, accuracy) ?
            new LineEquation(pointB.y - pointA.y, pointA.x - pointB.x, pointB.x * pointA.y - pointA.x * pointB.y) : undefined;
    };
    LineEquation.prototype.getPointIntersection = function (other, accuracy) {
        if (accuracy === void 0) { accuracy = 0.00001; }
        var A1 = this.aParam;
        var B1 = this.bParam;
        var C1 = this.cParam;
        var A2 = other.aParam;
        var B2 = other.bParam;
        var C2 = other.cParam;
        var v = A2 * B1 - A1 * B2;
        if (math_1.MathUtils.numberCloseTo(v, 0, accuracy))
            return null;
        if (A1 === 0) {
            var x = (B2 * C1 - C2 * B1) / (B1 * A2);
            return this.createPoint(x, -C1 / B1);
        }
        var y = (C2 * A1 - C1 * A2) / v;
        return this.createPoint((-B1 * y - C1) / A1, y);
    };
    LineEquation.prototype.containsPoint = function (point, accuracy) {
        if (accuracy === void 0) { accuracy = 0.00001; }
        return math_1.MathUtils.numberCloseTo(this.aParam * point.x + this.bParam * point.y + this.cParam, 0, accuracy);
    };
    LineEquation.prototype.createPoint = function (x, y, accuracy) {
        if (accuracy === void 0) { accuracy = 0.00001; }
        return new point_1.Point(math_1.MathUtils.numberCloseTo(x, 0, accuracy) ? 0 : x, math_1.MathUtils.numberCloseTo(y, 0, accuracy) ? 0 : y);
    };
    return LineEquation;
}());
exports.LineEquation = LineEquation;
var Range = (function () {
    function Range(from, to) {
        this.from = from;
        this.to = to !== undefined ? to : from;
    }
    Object.defineProperty(Range.prototype, "length", {
        get: function () {
            return Math.abs(this.to - this.from);
        },
        enumerable: false,
        configurable: true
    });
    Range.prototype.extend = function (range) {
        this.from = Math.min(range.from, this.from);
        this.to = Math.max(range.to, this.to);
    };
    Range.prototype.includes = function (value) {
        return value >= this.from && value <= this.to;
    };
    Range.fromLength = function (from, length) {
        return new Range(from, from + length);
    };
    return Range;
}());
exports.Range = Range;
var EventDispatcher = (function () {
    function EventDispatcher() {
        this.listeners = [];
    }
    EventDispatcher.prototype.add = function (listener) {
        if (!listener)
            throw new Error("Not Implemented");
        if (!this.hasEventListener(listener))
            this.listeners.push(listener);
    };
    EventDispatcher.prototype.remove = function (listener) {
        for (var i = 0, currentListener = void 0; currentListener = this.listeners[i]; i++)
            if (currentListener === listener) {
                this.listeners.splice(i, 1);
                break;
            }
    };
    EventDispatcher.prototype.raise = function (funcName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        for (var i = 0, listener = void 0; listener = this.listeners[i]; i++) {
            var func = listener[funcName];
            func && func.apply(listener, args);
        }
    };
    EventDispatcher.prototype.raise1 = function (action) {
        for (var i = 0, listener = void 0; listener = this.listeners[i]; i++)
            action(listener);
    };
    EventDispatcher.prototype.hasEventListener = function (listener) {
        for (var i = 0, l = this.listeners.length; i < l; i++)
            if (this.listeners[i] === listener)
                return true;
        return false;
    };
    return EventDispatcher;
}());
exports.EventDispatcher = EventDispatcher;
var Utils = (function () {
    function Utils() {
    }
    Utils.flatten = function (arr) {
        return [].concat.apply([], arr);
    };
    return Utils;
}());
exports.Utils = Utils;
var GeometryUtils = (function () {
    function GeometryUtils() {
    }
    GeometryUtils.getCommonRectangle = function (rects) {
        if (!rects.length)
            return new rectangle_1.Rectangle(0, 0, 0, 0);
        var minX = Number.MAX_VALUE;
        var maxX = -Number.MAX_VALUE;
        var minY = Number.MAX_VALUE;
        var maxY = -Number.MAX_VALUE;
        rects.forEach(function (rect) {
            minX = Math.min(minX, rect.x);
            maxX = Math.max(maxX, rect.right);
            minY = Math.min(minY, rect.y);
            maxY = Math.max(maxY, rect.bottom);
        });
        return new rectangle_1.Rectangle(minX, minY, maxX - minX, maxY - minY);
    };
    GeometryUtils.findFreeSpace = function (rects, size, exact, targetRect) {
        var xs = [targetRect ? targetRect.x : 0];
        var ys = [targetRect ? targetRect.y : 0];
        rects.forEach(function (r) {
            xs.push(r.x);
            xs.push(r.right);
            ys.push(r.y);
            ys.push(r.bottom);
        });
        xs = xs.sort(function (a, b) { return a - b; }).reduce(function (acc, v, index) { return (xs[index - 1] !== v && acc.push(v) && acc) || acc; }, []);
        ys = ys.sort(function (a, b) { return a - b; }).reduce(function (acc, v, index) { return (ys[index - 1] !== v && acc.push(v) && acc) || acc; }, []);
        var matrix = ys.map(function (y) { return xs.map(function (x, i) { return xs[i + 1] - x; }); });
        var _loop_1 = function (i, rect) {
            var xi0 = search_1.SearchUtils.binaryIndexOf(xs, function (a) { return a - rect.x; });
            var xi1 = search_1.SearchUtils.binaryIndexOf(xs, function (a) { return a - rect.right; });
            var yi0 = search_1.SearchUtils.binaryIndexOf(ys, function (a) { return a - rect.y; });
            var yi1 = search_1.SearchUtils.binaryIndexOf(ys, function (a) { return a - rect.bottom; });
            for (var y = yi0; y < yi1; y++)
                for (var x = xi0; x < xi1; x++)
                    matrix[y][x] *= -1;
        };
        for (var i = 0, rect = void 0; rect = rects[i]; i++) {
            _loop_1(i, rect);
        }
        for (var yi = 0; yi < ys.length; yi++)
            for (var xi = 0; xi < xs.length - 1; xi++) {
                var checkResult = this.checkRect(matrix, ys, xs, yi, xi, size, exact);
                if (checkResult > 0)
                    xi = checkResult;
                else if (checkResult === 0)
                    return new point_1.Point(xs[xi], ys[yi]);
            }
        return null;
    };
    GeometryUtils.checkRect = function (matrix, ys, xs, yimin, ximin, size, exact) {
        var height = 0;
        var width = 0;
        var ximax = xs.length - 2;
        for (var yi = yimin; yi < ys.length; yi++) {
            height = ys[yi + 1] - ys[yimin];
            for (var xi = ximin; xi <= ximax; xi++) {
                if (matrix[yi][xi] < 0)
                    return xi === 0 ? -1 : xi;
                width = xs[xi + 1] - xs[ximin];
                if (size.width <= width || (!exact && xi === xs.length - 2 && size.width / 2 <= width)) {
                    if (size.height <= height || (!exact && yi === ys.length - 2 && size.height / 2 <= height))
                        return 0;
                    ximax = xi;
                }
            }
        }
    };
    GeometryUtils.getArrowPoints = function (point, directionPoint, arrowHeight, arrowWidth) {
        if (point.x === directionPoint.x && point.y === directionPoint.y)
            return { point1: point.clone(), point2: point.clone(), point3: point.clone() };
        var catX = directionPoint.x - point.x;
        var catY = directionPoint.y - point.y;
        var hypotenuse = Math.sqrt(Math.pow(catX, 2) + Math.pow(catY, 2));
        var cos = catX / hypotenuse;
        var sin = catY / hypotenuse;
        var x1 = point.x + arrowHeight * cos + arrowWidth * sin;
        var y1 = point.y + arrowHeight * sin - arrowWidth * cos;
        var x2 = point.x + arrowHeight * cos - arrowWidth * sin;
        var y2 = point.y + arrowHeight * sin + arrowWidth * cos;
        var x3 = point.x + arrowHeight * cos;
        var y3 = point.y + arrowHeight * sin;
        return { point1: new point_1.Point(x1, y1), point2: new point_1.Point(x2, y2), point3: new point_1.Point(x3, y3) };
    };
    GeometryUtils.createSegments = function (points) {
        var result = [];
        for (var i = 1; i < points.length; i++)
            result.push(new segment_1.Segment(points[i - 1], points[i]));
        return result;
    };
    GeometryUtils.createRectagle = function (points) {
        var xarr = points.map(function (p) { return p.x; });
        var yarr = points.map(function (p) { return p.y; });
        var minX = xarr.reduce(function (prev, cur) { return Math.min(prev, cur); }, Number.MAX_VALUE);
        var maxX = xarr.reduce(function (prev, cur) { return Math.max(prev, cur); }, -Number.MAX_VALUE);
        var minY = yarr.reduce(function (prev, cur) { return Math.min(prev, cur); }, Number.MAX_VALUE);
        var maxY = yarr.reduce(function (prev, cur) { return Math.max(prev, cur); }, -Number.MAX_VALUE);
        return new rectangle_1.Rectangle(minX, minY, maxX - minX, maxY - minY);
    };
    GeometryUtils.createSegmentsFromRectangle = function (rect) {
        var result = [];
        var topLeft = new point_1.Point(rect.x, rect.y);
        var topRight = new point_1.Point(rect.right, rect.y);
        var bottomRight = new point_1.Point(rect.right, rect.bottom);
        var bottomLeft = new point_1.Point(rect.x, rect.bottom);
        result.push(new segment_1.Segment(topLeft, topRight));
        result.push(new segment_1.Segment(topRight, bottomRight));
        result.push(new segment_1.Segment(bottomRight, bottomLeft));
        result.push(new segment_1.Segment(bottomLeft, topLeft));
        return result;
    };
    GeometryUtils.areSegmentsCutRectangle = function (segments, rect) {
        if (!rect)
            return false;
        var rectanlePolygonalChain = GeometryUtils.createSegmentsFromRectangle(rect);
        var hasSegmentIn = false;
        var hasSegmentOut = false;
        var _loop_2 = function (i) {
            if (hasSegmentIn && hasSegmentOut)
                return { value: true };
            var segment = segments[i];
            if (segment.isIntersectedByRect(rect)) {
                var startPoint_1 = segment.startPoint;
                var endPoint_1 = segment.endPoint;
                var currentContainsStart = rect.containsPoint(startPoint_1);
                var currentContainsEnd = rect.containsPoint(endPoint_1);
                if (!currentContainsStart && !currentContainsEnd)
                    return { value: true };
                if (currentContainsStart && !currentContainsEnd) {
                    var rectLinesContainsStart_1 = rectanlePolygonalChain.filter(function (s) { return s.containsPoint(startPoint_1); });
                    if (rectLinesContainsStart_1.length > 0) {
                        var otherRectSegments = rectanlePolygonalChain.filter(function (s) {
                            if (rectLinesContainsStart_1.length === 1)
                                return !s.containsPoint(rectLinesContainsStart_1[0].startPoint) && !s.containsPoint(rectLinesContainsStart_1[0].endPoint);
                            return s !== rectLinesContainsStart_1[0] && s !== rectLinesContainsStart_1[1];
                        });
                        if (otherRectSegments.some(function (s) { return segment.isIntersected(s); }) && !hasSegmentIn)
                            hasSegmentIn = true;
                    }
                    if (!hasSegmentOut)
                        hasSegmentOut = true;
                    return "continue";
                }
                if (!currentContainsStart && currentContainsEnd) {
                    if (!hasSegmentIn) {
                        hasSegmentIn = true;
                        if (hasSegmentOut)
                            hasSegmentOut = false;
                    }
                    var rectLinesContainsEnd_1 = rectanlePolygonalChain.filter(function (s) { return s.containsPoint(endPoint_1); });
                    if (rectLinesContainsEnd_1.length > 0) {
                        var otherRectSegments = rectanlePolygonalChain.filter(function (s) {
                            if (rectLinesContainsEnd_1.length === 1)
                                return !s.containsPoint(rectLinesContainsEnd_1[0].startPoint) && !s.containsPoint(rectLinesContainsEnd_1[0].endPoint);
                            return s !== rectLinesContainsEnd_1[0] && s !== rectLinesContainsEnd_1[1];
                        });
                        if (otherRectSegments.some(function (s) { return segment.isIntersected(s); }) && !hasSegmentOut)
                            hasSegmentOut = true;
                    }
                    return "continue";
                }
                var rectLinesContainsStart = rectanlePolygonalChain.filter(function (s) { return s.containsPoint(startPoint_1); });
                var rectLinesContainsEnd = rectanlePolygonalChain.filter(function (s) { return s.containsPoint(endPoint_1); });
                if (rectLinesContainsStart.length === 2 && rectLinesContainsEnd.length === 2)
                    return { value: true };
                if (rectLinesContainsStart.length === 1 && rectLinesContainsEnd.length === 1 &&
                    rectLinesContainsStart[0] !== rectLinesContainsEnd[0])
                    return { value: true };
                if (!hasSegmentOut && rectLinesContainsEnd.length === 1 && !rectLinesContainsStart.length)
                    hasSegmentOut = true;
                if (!hasSegmentIn && rectLinesContainsStart.length === 1 && !rectLinesContainsEnd.length) {
                    hasSegmentIn = true;
                    if (hasSegmentOut)
                        hasSegmentOut = false;
                }
            }
        };
        for (var i = 0; i < segments.length; i++) {
            var state_1 = _loop_2(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return hasSegmentIn && hasSegmentOut;
    };
    GeometryUtils.areIntersectedSegments = function (segments, otherSegments) {
        if (!otherSegments)
            return false;
        var segmentIndex = 0;
        var segment;
        while (segment = segments[segmentIndex]) {
            var otherSegmentIndex = 0;
            var otherSegment = void 0;
            while (otherSegment = otherSegments[otherSegmentIndex]) {
                if (otherSegment.isIntersected(segment))
                    return true;
                otherSegmentIndex++;
            }
            segmentIndex++;
        }
        return false;
    };
    GeometryUtils.isLineIntersected = function (beginLinePoint, endLinePoint, segment, excludeBeginPoint, excludeEndPoint) {
        var line = LineEquation.fromPoints(beginLinePoint, endLinePoint);
        var segmentStartPoint = segment.startPoint;
        var segmentEndPoint = segment.endPoint;
        if (line.containsPoint(segmentStartPoint) && line.containsPoint(segmentEndPoint))
            return !excludeBeginPoint && !excludeEndPoint;
        var segmentLine = LineEquation.fromPoints(segmentStartPoint, segmentEndPoint);
        var intersection = segmentLine.getPointIntersection(line);
        if (!intersection || !segment.containsPoint(intersection))
            return false;
        if (excludeBeginPoint)
            return !GeometryUtils.areDuplicatedPoints(segmentStartPoint, intersection);
        if (excludeEndPoint)
            return !GeometryUtils.areDuplicatedPoints(segmentEndPoint, intersection);
        return true;
    };
    GeometryUtils.removeUnnecessaryPoints = function (points, removeCallback, checkCallback, accuracy) {
        if (checkCallback === void 0) { checkCallback = function (p) { return p !== undefined; }; }
        if (accuracy === void 0) { accuracy = 0.00001; }
        this.removeUnnecessaryPointsCore(points, removeCallback, checkCallback, accuracy);
        this.removeBackwardPoints(points, removeCallback, checkCallback, accuracy);
        this.removeUnnecessaryPointsCore(points, removeCallback, checkCallback, accuracy);
    };
    GeometryUtils.removeUnnecessaryRightAnglePoints = function (points, removeCallback, checkCallback, accuracy) {
        if (checkCallback === void 0) { checkCallback = function (p) { return p !== undefined; }; }
        if (accuracy === void 0) { accuracy = 0.00001; }
        this.removeUnnecessaryPointsCore(points, removeCallback, checkCallback, accuracy);
        this.removeBackwardPoints(points, removeCallback, checkCallback, accuracy);
        this.removeNotRightAnglePoints(points, removeCallback, checkCallback, accuracy);
        this.removeUnnecessaryPointsCore(points, removeCallback, checkCallback, accuracy);
    };
    GeometryUtils.removeUnnecessaryPointsCore = function (points, removeCallback, checkCallback, accuracy) {
        if (checkCallback === void 0) { checkCallback = function (p) { return p !== undefined; }; }
        if (accuracy === void 0) { accuracy = 0.00001; }
        this.removeDuplicatedPoints(points, removeCallback, checkCallback, accuracy);
        this.removeNotCornersPoints(points, removeCallback, checkCallback, accuracy);
    };
    GeometryUtils.removeNotRightAnglePoints = function (points, removeCallback, checkCallback, accuracy) {
        if (checkCallback === void 0) { checkCallback = function (p) { return p !== undefined; }; }
        if (accuracy === void 0) { accuracy = 0.00001; }
        var index = 0;
        var point;
        while ((point = points[index]) && points.length > 2) {
            var nextPoint = this.getNextPoint(points, index, 1, checkCallback);
            var prevPoint = this.getNextPoint(points, index, -1, checkCallback);
            if (!prevPoint || !nextPoint ||
                GeometryUtils.isRightAngleCorner(prevPoint, point, nextPoint, accuracy) ||
                !removeCallback(point, index))
                index++;
        }
    };
    GeometryUtils.removeDuplicatedPoints = function (points, removeCallback, checkCallback, accuracy) {
        if (checkCallback === void 0) { checkCallback = function (p) { return p !== undefined; }; }
        if (accuracy === void 0) { accuracy = 0.00001; }
        var index = 0;
        var point;
        while ((point = points[index]) && points.length > 2) {
            var nextPoint = this.getNextPoint(points, index, 1, checkCallback);
            if (nextPoint && GeometryUtils.areDuplicatedPoints(point, nextPoint, accuracy)) {
                var actualIndex = index === points.length - 2 ? index : index + 1;
                if (removeCallback(points[actualIndex], actualIndex))
                    continue;
            }
            index++;
        }
    };
    GeometryUtils.removeNotCornersPoints = function (points, removeCallback, checkCallback, accuracy) {
        if (checkCallback === void 0) { checkCallback = function (p) { return p !== undefined; }; }
        if (accuracy === void 0) { accuracy = 0.00001; }
        var index = 0;
        var point;
        while ((point = points[index]) && points.length > 2) {
            var nextPoint = this.getNextPoint(points, index, 1, checkCallback);
            var prevPoint = this.getNextPoint(points, index, -1, checkCallback);
            if (!prevPoint || !nextPoint ||
                GeometryUtils.isCorner(prevPoint, point, nextPoint, accuracy) ||
                !removeCallback(point, index))
                index++;
        }
    };
    GeometryUtils.removeBackwardPoints = function (points, removeCallback, checkCallback, accuracy) {
        if (checkCallback === void 0) { checkCallback = function (p) { return p !== undefined; }; }
        if (accuracy === void 0) { accuracy = 0.00001; }
        var index = 0;
        var point;
        while ((point = points[index]) && points.length > 2) {
            var nextPoint = this.getNextPoint(points, index, 1, checkCallback);
            var prevPoint = this.getNextPoint(points, index, -1, checkCallback);
            if (!prevPoint || !nextPoint ||
                !GeometryUtils.isBackwardPoint(prevPoint, point, nextPoint, accuracy) ||
                !removeCallback(point, index))
                index++;
        }
    };
    GeometryUtils.isRightAngleCorner = function (prev, current, next, accuracy) {
        if (accuracy === void 0) { accuracy = 0.00001; }
        return math_1.MathUtils.numberCloseTo(GeometryUtils.createAngle(prev, current, next), Math.PI / 2.0, accuracy) ||
            math_1.MathUtils.numberCloseTo(GeometryUtils.createAngle(prev, current, next), Math.PI, accuracy) ||
            math_1.MathUtils.numberCloseTo(GeometryUtils.createAngle(prev, current, next), 3.0 * Math.PI / 2.0, accuracy);
    };
    GeometryUtils.isCorner = function (prev, current, next, accuracy) {
        if (accuracy === void 0) { accuracy = 0.00001; }
        return !math_1.MathUtils.numberCloseTo(GeometryUtils.createAngle(prev, current, next), 0, accuracy);
    };
    GeometryUtils.areDuplicatedPoints = function (current, next, accuracy) {
        if (accuracy === void 0) { accuracy = 0.00001; }
        return (math_1.MathUtils.numberCloseTo(current.x, next.x, accuracy) && math_1.MathUtils.numberCloseTo(current.y, next.y, accuracy));
    };
    GeometryUtils.isBackwardPoint = function (prev, current, next, accuracy) {
        if (accuracy === void 0) { accuracy = 0.00001; }
        return math_1.MathUtils.numberCloseTo(GeometryUtils.createAngle(prev, current, next), Math.PI, accuracy);
    };
    GeometryUtils.createAngle = function (prev, current, next) {
        var vector1 = vector_1.Vector.fromPoints(current, next);
        var vector2 = vector_1.Vector.fromPoints(prev, current);
        var vector1X = vector1.x;
        var vector1Y = vector1.y;
        var vector2X = vector2.x;
        var vector2Y = vector2.y;
        var atan = Math.atan2(vector1X * vector2Y - vector2X * vector1Y, vector1X * vector2X + vector1Y * vector2Y);
        return atan < 0 ? 2 * Math.PI + atan : atan;
    };
    GeometryUtils.getNextPoint = function (points, index, step, checkCallback) {
        var result;
        var newIndex = index + step;
        while (result = points[newIndex]) {
            if (checkCallback(result))
                return result;
            newIndex = newIndex + step;
        }
    };
    GeometryUtils.addSelectedLinesTo = function (prevPt, pt, nextPt, offsetX, offsetY, offsetXNegative, offsetYNegative, nextOffsetX, nextOffsetY, nextOffsetXNegative, nextOffsetYNegative, addSelectedLine, addSelectedLineWB, accuracy) {
        if (accuracy === void 0) { accuracy = 0.00001; }
        var a1 = pt.y - prevPt.y;
        var a2 = nextPt.y - pt.y;
        var b1 = prevPt.x - pt.x;
        var b2 = pt.x - nextPt.x;
        var det = a1 * b2 - a2 * b1;
        if (!math_1.MathUtils.numberCloseTo(det, 0, accuracy)) {
            var c1 = a1 * (prevPt.x + offsetX) + b1 * (prevPt.y + offsetY);
            var c2 = a2 * (pt.x + nextOffsetX) + b2 * (pt.y + nextOffsetY);
            addSelectedLine((b2 * c1 - b1 * c2) / det, (a1 * c2 - a2 * c1) / det);
            var c1WB = a1 * (prevPt.x + offsetXNegative) + b1 * (prevPt.y + offsetYNegative);
            var c2WB = a2 * (pt.x + nextOffsetXNegative) + b2 * (pt.y + nextOffsetYNegative);
            addSelectedLineWB((b2 * c1WB - b1 * c2WB) / det, (a1 * c2WB - a2 * c1WB) / det);
        }
    };
    GeometryUtils.getSelectionOffsetPoint = function (prev, current, distance) {
        return new point_1.Point((prev.y - current.y) / distance, (current.x - prev.x) / distance);
    };
    GeometryUtils.getSelectionTextStartEndPoints = function (prev, current, distance, center, size, align) {
        var cos = (current.x - prev.x) / distance;
        var sin = (current.y - prev.y) / distance;
        var width = size.width * cos + size.height * sin;
        switch (align) {
            case Style_1.TextAlignment.Left:
                return [center, new point_1.Point(center.x + cos * width, center.y + sin * width)];
            case Style_1.TextAlignment.Right:
                return [new point_1.Point(center.x - cos * width, center.y - sin * width), center];
            default:
                return [
                    new point_1.Point(center.x - 0.5 * cos * width, center.y - 0.5 * sin * width),
                    new point_1.Point(center.x + 0.5 * cos * width, center.y + 0.5 * sin * width)
                ];
        }
    };
    GeometryUtils.getPathLength = function (points) {
        var length = 0;
        var prevPt;
        points.forEach(function (pt) {
            if (prevPt !== undefined)
                length += metrics_1.Metrics.euclideanDistance(pt, prevPt);
            prevPt = pt;
        });
        return length;
    };
    GeometryUtils.getPathPointByPosition = function (points, relativePosition) {
        if (!points.length)
            throw new Error("Invalid points");
        if (0 > relativePosition || relativePosition > 1)
            throw new Error("Invalid relative position");
        var length = this.getPathLength(points);
        if (points.length <= 2 && length === 0 || relativePosition === 0)
            return [points[0], 0];
        var targetLength = length * relativePosition;
        var currentLength = 0;
        for (var i = 1; i < points.length; i++) {
            var lineLength = metrics_1.Metrics.euclideanDistance(points[i], points[i - 1]);
            if (currentLength + lineLength >= targetLength) {
                var delta = targetLength - currentLength;
                var cos = (points[i].x - points[i - 1].x) / lineLength;
                var sin = (points[i].y - points[i - 1].y) / lineLength;
                return [new point_1.Point(points[i - 1].x + cos * delta, points[i - 1].y + sin * delta), i];
            }
            currentLength += lineLength;
        }
        return [points[points.length - 1], points.length - 1];
    };
    GeometryUtils.getLineAngle = function (beginPoint, endPoint) {
        return Math.atan2(endPoint.y - beginPoint.y, endPoint.x - beginPoint.x);
    };
    GeometryUtils.getTriangleBeginAngle = function (beginPoint, endPoint, point) {
        var lineAngle = this.getLineAngle(beginPoint, endPoint);
        var beginPointAngle = this.getLineAngle(beginPoint, point);
        return Math.abs(beginPointAngle - lineAngle);
    };
    GeometryUtils.getTriangleEndAngle = function (beginPoint, endPoint, point) {
        var lineAngle = this.getLineAngle(beginPoint, endPoint);
        var endPointAngle = this.getLineAngle(point, endPoint);
        return Math.abs(lineAngle - endPointAngle);
    };
    GeometryUtils.getPathPointByPoint = function (points, point) {
        if (!points.length)
            throw new Error("Invalid points");
        if (points.length === 1)
            return points[0];
        var distance = Number.MAX_VALUE;
        var result;
        for (var i = 1; i < points.length; i++) {
            var beginPoint = points[i - 1];
            var endPoint = points[i];
            if (point.equals(beginPoint)) {
                result = beginPoint.clone();
                break;
            }
            if (point.equals(endPoint)) {
                result = endPoint.clone();
                break;
            }
            var beginAngle = this.getTriangleBeginAngle(beginPoint, endPoint, point);
            var endAngle = this.getTriangleEndAngle(beginPoint, endPoint, point);
            var beginDistance = metrics_1.Metrics.euclideanDistance(point, beginPoint);
            var endDistance = metrics_1.Metrics.euclideanDistance(point, endPoint);
            var orthOffset = beginDistance * Math.sin(beginAngle);
            var currentDistance = void 0;
            if (Math.PI / 2 <= beginAngle && beginAngle <= Math.PI * 3 / 2)
                currentDistance = beginDistance;
            else if (Math.PI / 2 <= endAngle && endAngle <= Math.PI * 3 / 2)
                currentDistance = endDistance;
            else
                currentDistance = Math.abs(orthOffset);
            if (currentDistance < distance) {
                distance = currentDistance;
                if (Math.PI / 2 <= beginAngle && beginAngle <= Math.PI * 3 / 2)
                    result = beginPoint.clone();
                else if (Math.PI / 2 <= endAngle && endAngle <= Math.PI * 3 / 2)
                    result = endPoint.clone();
                else {
                    var round = Math.fround || Math.round;
                    var lineAngle = this.getLineAngle(beginPoint, endPoint);
                    var offsetX = round(Math.abs(orthOffset * Math.sin(lineAngle)));
                    var offsetY = round(Math.abs(orthOffset * Math.cos(lineAngle)));
                    var isAbove = point.y - beginPoint.y < round((point.x - beginPoint.x) * Math.tan(lineAngle));
                    if (0 <= lineAngle && lineAngle <= Math.PI / 2) {
                        offsetX *= isAbove ? -1 : 1;
                        offsetY *= isAbove ? 1 : -1;
                    }
                    else if (Math.PI / 2 <= lineAngle && lineAngle <= Math.PI) {
                        offsetX *= isAbove ? 1 : -1;
                        offsetY *= isAbove ? 1 : -1;
                    }
                    else if (0 >= lineAngle && lineAngle >= -Math.PI / 2) {
                        offsetX *= isAbove ? 1 : -1;
                        offsetY *= isAbove ? 1 : -1;
                    }
                    else if (-Math.PI / 2 >= lineAngle && lineAngle >= -Math.PI) {
                        offsetX *= isAbove ? -1 : 1;
                        offsetY *= isAbove ? 1 : -1;
                    }
                    result = point.clone().offset(offsetX, offsetY);
                }
            }
        }
        return result;
    };
    GeometryUtils.getPathPositionByPoint = function (points, point, maxPositionCount) {
        if (maxPositionCount === void 0) { maxPositionCount = 100; }
        point = this.getPathPointByPoint(points, point);
        var length = this.getPathLength(points);
        var currentLength = 0;
        for (var i = 1; i < points.length; i++) {
            var beginPoint = points[i - 1];
            var endPoint = points[i];
            var lineLength = metrics_1.Metrics.euclideanDistance(endPoint, beginPoint);
            var angle = Math.atan((endPoint.y - beginPoint.y) / (endPoint.x - beginPoint.x));
            var round = Math.fround || Math.round;
            if ((point.x === endPoint.x && point.x === beginPoint.x) || (point.y === endPoint.y && point.y === beginPoint.y) ||
                round(point.y - beginPoint.y) === round((point.x - beginPoint.x) * Math.tan(angle))) {
                if (Math.sin(angle) !== 0)
                    currentLength += Math.abs((point.y - beginPoint.y) / Math.sin(angle));
                else
                    currentLength += Math.abs(point.x - beginPoint.x);
                return Math.round(currentLength * maxPositionCount / length) / maxPositionCount;
            }
            currentLength += lineLength;
        }
        return 1;
    };
    GeometryUtils.arePointsEqual = function (points1, points2) {
        var count1 = points1.length;
        var count2 = points2.length;
        if (count1 !== count2)
            return false;
        for (var i = 0; i < count1; i++)
            if (!points1[i].equals(points2[i]))
                return false;
        return true;
    };
    GeometryUtils.getMaxRectangleEnscribedInEllipse = function (ellipseSize) {
        var dx = ellipseSize.width * Math.sqrt(2) / 2;
        var dy = ellipseSize.height * Math.sqrt(2) / 2;
        return new size_1.Size(dx, dy);
    };
    GeometryUtils.getEllipseByEnscribedRectangle = function (rectSize) {
        return new size_1.Size(2 * rectSize.width / Math.sqrt(2), 2 * rectSize.height / Math.sqrt(2));
    };
    return GeometryUtils;
}());
exports.GeometryUtils = GeometryUtils;
var ObjectUtils = (function () {
    function ObjectUtils() {
    }
    ObjectUtils.cloneObject = function (source) {
        return source && Object.assign({}, source);
    };
    ObjectUtils.compareObjects = function (obj1, obj2) {
        if (obj1 === obj2)
            return true;
        if (typeof obj1 === "object" && typeof obj2 === "object")
            return this.isDeepEqual(obj1, obj2);
        return false;
    };
    ObjectUtils.isDeepEqual = function (obj1, obj2) {
        var props1 = obj1 ? Object.getOwnPropertyNames(obj1) : [];
        var props2 = obj2 ? Object.getOwnPropertyNames(obj2) : [];
        if (props1.length !== props2.length)
            return false;
        for (var i = 0; i < props1.length; i++) {
            var property = props1[i];
            switch (typeof obj1[property]) {
                case "object": {
                    if (!this.isDeepEqual(obj1[property], obj2[property]))
                        return false;
                    break;
                }
                case "number": {
                    if (!isNaN(obj1[property]) || !isNaN(obj2[property]))
                        if (obj1[property] !== obj2[property])
                            return false;
                    break;
                }
                default: {
                    if (obj1[property] !== obj2[property])
                        return false;
                }
            }
        }
        return true;
    };
    return ObjectUtils;
}());
exports.ObjectUtils = ObjectUtils;
var HtmlFocusUtils = (function () {
    function HtmlFocusUtils() {
    }
    HtmlFocusUtils.focusWithPreventScroll = function (element) {
        try {
            var isPreventScrollNotSupported = browser_1.Browser.Safari;
            var savedDocumentScrollPosition = isPreventScrollNotSupported && this.getHtmlScrollPosition();
            if (isPreventScrollNotSupported) {
                var parentPos = element.parentElement && element.parentElement.getBoundingClientRect();
                if (parentPos) {
                    var left = parentPos.left < 0 ? -parentPos.left + 1 : 0;
                    var top_1 = parentPos.top < 0 ? -parentPos.top + 1 : 0;
                    var iframePos = window.frameElement && window.frameElement.getBoundingClientRect();
                    if (iframePos) {
                        if (iframePos.top < 0 && (-iframePos.top > parentPos.top))
                            top_1 = -iframePos.top - parentPos.top + 1;
                        if (iframePos.left < 0 && (-iframePos.left > parentPos.left))
                            left = -iframePos.left - parentPos.left + 1;
                    }
                    element.style.setProperty("left", left + "px", "important");
                    element.style.setProperty("top", top_1 + "px", "important");
                }
            }
            element.focus({ preventScroll: true });
            if (isPreventScrollNotSupported) {
                var newDocumentScrollPosition = this.getHtmlScrollPosition();
                if (!ObjectUtils.compareObjects(savedDocumentScrollPosition, newDocumentScrollPosition))
                    this.setHtmlScrollPosition(savedDocumentScrollPosition);
                element.style.setProperty("left", "-1000px", "important");
                element.style.setProperty("top", "-1000px", "important");
            }
        }
        catch (e) {
        }
    };
    HtmlFocusUtils.getHtmlScrollPosition = function () {
        return {
            pos: this.getDocumentScrollPosition(window, document),
            iframePos: window.top !== window && this.getDocumentScrollPosition(window.top, window.top.document)
        };
    };
    HtmlFocusUtils.getDocumentScrollPosition = function (win, doc) {
        return {
            left: win.pageXOffset || doc.documentElement.scrollLeft || doc.body.scrollLeft,
            top: win.pageYOffset || doc.documentElement.scrollTop || doc.body.scrollTop
        };
    };
    HtmlFocusUtils.setHtmlScrollPosition = function (position) {
        this.setDocumentScrollPosition(document, position.pos);
        if (window.top !== window && position.iframePos)
            this.setDocumentScrollPosition(window.top.document, position.iframePos);
    };
    HtmlFocusUtils.setDocumentScrollPosition = function (doc, pos) {
        doc.documentElement.scrollTop = pos.top;
        doc.documentElement.scrollLeft = pos.left;
        doc.body.scrollTop = pos.top;
        doc.body.scrollLeft = pos.left;
    };
    return HtmlFocusUtils;
}());
exports.HtmlFocusUtils = HtmlFocusUtils;
var EventUtils = (function () {
    function EventUtils() {
    }
    EventUtils.isLeftButtonPressed = function (evt) {
        return evt_1.EvtUtils.isLeftButtonPressed(evt);
    };
    EventUtils.isPointerEvents = function () {
        return window.PointerEvent;
    };
    EventUtils.isMousePointer = function (evt) {
        return this.isPointerEvents() && ((evt.pointerType && evt.pointerType === "mouse") || (browser_1.Browser.Firefox && evt.type === "click"));
    };
    EventUtils.isTouchMode = function () {
        return browser_1.Browser.TouchUI || (window.navigator && window.navigator.maxTouchPoints > 0);
    };
    EventUtils.isTouchEvent = function (evt) {
        return browser_1.Browser.TouchUI || !EventUtils.isMousePointer(evt);
    };
    return EventUtils;
}());
exports.EventUtils = EventUtils;
//# sourceMappingURL=Utils.js.map