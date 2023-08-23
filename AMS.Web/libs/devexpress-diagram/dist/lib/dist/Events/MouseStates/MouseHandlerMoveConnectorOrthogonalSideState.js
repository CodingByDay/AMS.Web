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
exports.MouseHandlerMoveConnectorOrthogonalSideState = void 0;
var point_1 = require("@devexpress/utils/lib/geometry/point");
var Connector_1 = require("../../Model/Connectors/Connector");
var DiagramItem_1 = require("../../Model/DiagramItem");
var ModelUtils_1 = require("../../Model/ModelUtils");
var MouseHandlerDraggingState_1 = require("./MouseHandlerDraggingState");
var MouseHandlerMoveConnectorOrthogonalSideState = (function (_super) {
    __extends(MouseHandlerMoveConnectorOrthogonalSideState, _super);
    function MouseHandlerMoveConnectorOrthogonalSideState(handler, history, model) {
        var _this = _super.call(this, handler, history) || this;
        _this.model = model;
        return _this;
    }
    MouseHandlerMoveConnectorOrthogonalSideState.prototype.onMouseDown = function (evt) {
        this.startPoint = evt.modelPoint;
        this.connector = this.model.findConnector(evt.source.key);
        this.handler.addInteractingItem(this.connector);
        var renderPointIndexes = evt.source.value.split("_");
        var renderPointIndex1 = parseInt(renderPointIndexes[0]);
        var renderPointIndex2 = parseInt(renderPointIndexes[1]);
        var points = this.connector.getRenderPoints(true);
        this.renderPoint1 = points[renderPointIndex1].clone();
        this.renderPoint2 = points[renderPointIndex2].clone();
        this.isVerticalOrientation = this.renderPoint1.x === this.renderPoint2.x;
        if (this.renderPoint1.pointIndex !== -1) {
            this.pointIndex1 = this.renderPoint1.pointIndex;
            if (this.pointIndex1 === 0) {
                this.pointIndex1++;
                this.correctEdgePoint(this.renderPoint1, this.renderPoint2, this.connector.beginItem, this.connector.beginConnectionPointIndex);
            }
            else
                this.point1 = this.connector.points[this.pointIndex1].clone();
        }
        else
            this.pointIndex1 = this.findPointIndex(points, renderPointIndex1, false) + 1;
        if (this.renderPoint2.pointIndex !== -1) {
            this.pointIndex2 = this.renderPoint2.pointIndex;
            if (this.pointIndex2 === this.connector.points.length - 1)
                this.correctEdgePoint(this.renderPoint2, this.renderPoint1, this.connector.endItem, this.connector.endConnectionPointIndex);
            else
                this.point2 = this.connector.points[this.pointIndex2].clone();
        }
        else
            this.pointIndex2 = this.findPointIndex(points, renderPointIndex2, true);
        _super.prototype.onMouseDown.call(this, evt);
    };
    MouseHandlerMoveConnectorOrthogonalSideState.prototype.onApplyChanges = function (evt) {
        var _this = this;
        if (!this.pointCreated) {
            var createdPoint1 = void 0;
            var createdPoint2 = void 0;
            if (this.point1 === undefined) {
                this.point1 = new point_1.Point(this.renderPoint1.x, this.renderPoint1.y);
                ModelUtils_1.ModelUtils.addConnectorPoint(this.history, this.connector.key, this.pointIndex1, this.point1.clone());
                createdPoint1 = this.point1.clone();
                this.pointIndex2++;
            }
            if (this.point2 === undefined) {
                this.point2 = new point_1.Point(this.renderPoint2.x, this.renderPoint2.y);
                ModelUtils_1.ModelUtils.addConnectorPoint(this.history, this.connector.key, this.pointIndex2, this.point2.clone());
                createdPoint2 = this.point2.clone();
            }
            var excludePoints = [];
            if (createdPoint1)
                excludePoints.push(createdPoint1);
            if (createdPoint2)
                excludePoints.push(createdPoint2);
            var unnecessaryPoints = this.createUnnecessaryPoints(this.connector, excludePoints);
            Object.keys(unnecessaryPoints).forEach(function (key) {
                var pointIndex = parseInt(key);
                if (pointIndex < _this.pointIndex1)
                    _this.pointIndex1--;
                if (pointIndex < _this.pointIndex2)
                    _this.pointIndex2--;
            });
            this.pointCreated = true;
        }
        var point = this.getSnappedPoint(evt, evt.modelPoint);
        if (this.isVerticalOrientation) {
            this.point1.x = point.x;
            this.point2.x = point.x;
        }
        else {
            this.point1.y = point.y;
            this.point2.y = point.y;
        }
        ModelUtils_1.ModelUtils.moveConnectorRightAnglePoints(this.history, this.connector, this.point1.clone(), this.pointIndex1, this.point2.clone(), this.pointIndex2);
        this.handler.tryUpdateModelSize();
    };
    MouseHandlerMoveConnectorOrthogonalSideState.prototype.createUnnecessaryPoints = function (connector, excludePoints) {
        var oldRenderPoints = connector.getRenderPoints(true).map(function (p) { return p.clone(); });
        var unnecessaryRenderPoints = ModelUtils_1.ModelUtils.createUnnecessaryRenderPoints(oldRenderPoints.filter(function (p) { return !p.skipped; }).map(function (p) { return p.clone(); }), connector.skippedRenderPoints, function (removedPoint) { return ModelUtils_1.ModelUtils.findFirstPointIndex(oldRenderPoints, function (p) { return p.equals(removedPoint); }); }, function (p) { return !excludePoints.some(function (ep) { return ep.equals(p); }); });
        var result = {};
        if (Object.keys(unnecessaryRenderPoints).length) {
            var points = connector.points.map(function (p) { return p.clone(); });
            var lastPointIndex_1 = points.length - 1;
            points.forEach(function (p, index) {
                if (index !== 0 && index !== lastPointIndex_1 && !ModelUtils_1.ModelUtils.isNecessaryPoint(p, index, unnecessaryRenderPoints))
                    result[index] = p;
            });
        }
        return result;
    };
    MouseHandlerMoveConnectorOrthogonalSideState.prototype.onFinishWithChanges = function () {
        ModelUtils_1.ModelUtils.deleteConnectorUnnecessaryPoints(this.history, this.connector);
        ModelUtils_1.ModelUtils.fixConnectorBeginEndConnectionIndex(this.history, this.connector);
        this.handler.tryUpdateModelSize();
    };
    MouseHandlerMoveConnectorOrthogonalSideState.prototype.findPointIndex = function (points, index, direction) {
        var point;
        while (point = points[index]) {
            if (point.pointIndex !== -1)
                return point.pointIndex;
            index += direction ? 1 : -1;
        }
    };
    MouseHandlerMoveConnectorOrthogonalSideState.prototype.correctEdgePoint = function (point, directionPoint, item, connectionPointIndex) {
        var offset = 0;
        if (item) {
            var side = item.getConnectionPointSideByIndex(connectionPointIndex);
            var rect = item.rectangle;
            offset = Connector_1.Connector.minOffset;
            switch (side) {
                case DiagramItem_1.ConnectionPointSide.South:
                    offset += rect.bottom - point.y;
                    break;
                case DiagramItem_1.ConnectionPointSide.North:
                    offset += point.y - rect.y;
                    break;
                case DiagramItem_1.ConnectionPointSide.East:
                    offset += rect.right - point.x;
                    break;
                case DiagramItem_1.ConnectionPointSide.West:
                    offset += point.x - rect.x;
                    break;
            }
        }
        if (this.isVerticalOrientation)
            if (point.y > directionPoint.y)
                point.y -= Math.min(offset, point.y - directionPoint.y);
            else
                point.y += Math.min(offset, directionPoint.y - point.y);
        else if (point.x > directionPoint.x)
            point.x -= Math.min(offset, point.x - directionPoint.x);
        else
            point.x += Math.min(offset, directionPoint.x - point.x);
    };
    MouseHandlerMoveConnectorOrthogonalSideState.prototype.getDraggingElementKeys = function () {
        return [this.connector.key];
    };
    return MouseHandlerMoveConnectorOrthogonalSideState;
}(MouseHandlerDraggingState_1.MouseHandlerDraggingState));
exports.MouseHandlerMoveConnectorOrthogonalSideState = MouseHandlerMoveConnectorOrthogonalSideState;
//# sourceMappingURL=MouseHandlerMoveConnectorOrthogonalSideState.js.map