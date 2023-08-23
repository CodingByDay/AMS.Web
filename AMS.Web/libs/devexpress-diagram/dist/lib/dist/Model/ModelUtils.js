"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelUtils = void 0;
var unit_converter_1 = require("@devexpress/utils/lib/class/unit-converter");
var metrics_1 = require("@devexpress/utils/lib/geometry/metrics");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var rectangle_1 = require("@devexpress/utils/lib/geometry/rectangle");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var vector_1 = require("@devexpress/utils/lib/geometry/vector");
var math_1 = require("@devexpress/utils/lib/utils/math");
var Enums_1 = require("../Enums");
var AddConnectionHistoryItem_1 = require("../History/Common/AddConnectionHistoryItem");
var AddConnectorHistoryItem_1 = require("../History/Common/AddConnectorHistoryItem");
var AddConnectorPointHistoryItem_1 = require("../History/Common/AddConnectorPointHistoryItem");
var AddShapeHistoryItem_1 = require("../History/Common/AddShapeHistoryItem");
var ChangeConnectorPointsHistoryItem_1 = require("../History/Common/ChangeConnectorPointsHistoryItem");
var ChangeShapeParametersHistoryItem_1 = require("../History/Common/ChangeShapeParametersHistoryItem");
var DeleteConnectionHistoryItem_1 = require("../History/Common/DeleteConnectionHistoryItem");
var DeleteConnectorHistoryItem_1 = require("../History/Common/DeleteConnectorHistoryItem");
var DeleteShapeHistoryItem_1 = require("../History/Common/DeleteShapeHistoryItem");
var InsertToContainerHistoryItem_1 = require("../History/Common/InsertToContainerHistoryItem");
var MoveConnectorPointHistoryItem_1 = require("../History/Common/MoveConnectorPointHistoryItem");
var MoveShapeHistoryItem_1 = require("../History/Common/MoveShapeHistoryItem");
var RemoveFromContainerHistoryItem_1 = require("../History/Common/RemoveFromContainerHistoryItem");
var ResizeShapeHistoryItem_1 = require("../History/Common/ResizeShapeHistoryItem");
var SetSelectionHistoryItem_1 = require("../History/Common/SetSelectionHistoryItem");
var ModelResizeHistoryItem_1 = require("../History/Page/ModelResizeHistoryItem");
var UpdatePositionsOnPageResizeHistoryItem_1 = require("../History/Page/UpdatePositionsOnPageResizeHistoryItem");
var ChangeConnectorPropertyHistoryItem_1 = require("../History/Properties/ChangeConnectorPropertyHistoryItem");
var ChangeConnectorTextHistoryItem_1 = require("../History/Properties/ChangeConnectorTextHistoryItem");
var ChangeCustomDataHistoryItem_1 = require("../History/Properties/ChangeCustomDataHistoryItem");
var ChangeLockedHistoryItem_1 = require("../History/Properties/ChangeLockedHistoryItem");
var ChangeStyleHistoryItem_1 = require("../History/StyleProperties/ChangeStyleHistoryItem");
var ChangeStyleTextHistoryItem_1 = require("../History/StyleProperties/ChangeStyleTextHistoryItem");
var Graph_1 = require("../Layout/Graph");
var GraphInfo_1 = require("../Layout/GraphInfo");
var Structures_1 = require("../Layout/Structures");
var Utils_1 = require("../Utils");
var Connector_1 = require("./Connectors/Connector");
var ConnectorProperties_1 = require("./Connectors/ConnectorProperties");
var ConnectorRenderPoint_1 = require("./Connectors/ConnectorRenderPoint");
var ConnectorRenderPointsContext_1 = require("./Connectors/Routing/ConnectorRenderPointsContext");
var Shape_1 = require("./Shapes/Shape");
var ModelUtils = (function () {
    function ModelUtils() {
    }
    ModelUtils.setShapePosition = function (history, model, shape, newPosition, includeChildren) {
        if (includeChildren === void 0) { includeChildren = true; }
        if (!shape.position.equals(newPosition)) {
            var delta_1 = newPosition.clone().offset(-shape.position.x, -shape.position.y);
            history.addAndRedo(new MoveShapeHistoryItem_1.MoveShapeHistoryItem(shape.key, newPosition));
            if (includeChildren)
                shape.children.forEach(function (child) {
                    if (child instanceof Shape_1.Shape) {
                        var childPosition = child.position.clone().offset(delta_1.x, delta_1.y);
                        ModelUtils.setShapePosition(history, model, child, childPosition);
                    }
                });
        }
    };
    ModelUtils.setShapeSize = function (history, model, shape, newPosition, newSize) {
        if (!shape.size.equals(newSize) || !shape.position.equals(newPosition))
            history.addAndRedo(new ResizeShapeHistoryItem_1.ResizeShapeHistoryItem(shape.key, newPosition, newSize));
    };
    ModelUtils.addConnectorPoint = function (history, connectorKey, pointIndex, position) {
        history.addAndRedo(new AddConnectorPointHistoryItem_1.AddConnectorPointHistoryItem(connectorKey, pointIndex, position));
    };
    ModelUtils.deleteConnectorCustomPoints = function (history, connector) {
        if (connector.points.length > 2) {
            var oldContext = connector.tryCreateRenderPointsContext();
            if (connector.properties.lineOption === ConnectorProperties_1.ConnectorLineOption.Straight || !oldContext)
                history.addAndRedo(new ChangeConnectorPointsHistoryItem_1.ReplaceConnectorPointsHistoryItem(connector.key, [
                    connector.points[0].clone(),
                    connector.points[connector.points.length - 1].clone()
                ]));
            else {
                var beginPoint = connector.points[0].clone();
                var lastPoint = connector.points[connector.points.length - 1].clone();
                history.addAndRedo(new ChangeConnectorPointsHistoryItem_1.ChangeConnectorPointsHistoryItem(connector.key, [beginPoint, lastPoint], new ConnectorRenderPointsContext_1.ConnectorRenderPointsContext([
                    new ConnectorRenderPoint_1.ConnectorRenderPoint(beginPoint.x, beginPoint.y, 0),
                    new ConnectorRenderPoint_1.ConnectorRenderPoint(lastPoint.x, lastPoint.y, 1)
                ], false, oldContext.actualRoutingMode)));
            }
        }
    };
    ModelUtils.deleteConnectorUnnecessaryPoints = function (history, connector) {
        var oldRenderPoints = connector.getRenderPoints(true).map(function (p) { return p.clone(); });
        if (connector.properties.lineOption === ConnectorProperties_1.ConnectorLineOption.Straight) {
            var unnecessaryPoints = ModelUtils.createUnnecessaryRenderPoints(oldRenderPoints.filter(function (p) { return !p.skipped; }).map(function (p) { return p.clone(); }), connector.skippedRenderPoints, function (removedPoint) { return ModelUtils.findFirstPointIndex(oldRenderPoints, function (p) { return p.equals(removedPoint); }); });
            if (Object.keys(unnecessaryPoints).length)
                history.addAndRedo(new ChangeConnectorPointsHistoryItem_1.ReplaceConnectorPointsHistoryItem(connector.key, ModelUtils.createNecessaryPoints(connector.points.map(function (p) { return p.clone(); }), unnecessaryPoints)));
        }
        else {
            var oldContext = connector.tryCreateRenderPointsContext(true);
            var newRenderPoints = oldRenderPoints.filter(function (p) { return !p.skipped; }).map(function (p) { return p.clone(); });
            var unnecessaryPoints = ModelUtils.createUnnecessaryRightAngleRenderPoints(newRenderPoints, connector.skippedRenderPoints, function (removedPoint) { return ModelUtils.findFirstPointIndex(oldRenderPoints, function (p) { return p.equals(removedPoint); }); });
            if (Object.keys(unnecessaryPoints).length) {
                var newPoints = ModelUtils.createNecessaryPoints(connector.points.map(function (p) { return p.clone(); }), unnecessaryPoints);
                var newRenderContext = new ConnectorRenderPointsContext_1.ConnectorRenderPointsContext(ModelUtils.validateRenderPointIndexes(newPoints, newRenderPoints, 0), oldContext.lockCreateRenderPoints, oldContext.actualRoutingMode);
                history.addAndRedo(new ChangeConnectorPointsHistoryItem_1.ChangeConnectorPointsHistoryItem(connector.key, newPoints, newRenderContext));
            }
        }
    };
    ModelUtils.fixConnectorBeginEndConnectionIndex = function (history, connector) {
        if (connector.beginItem && connector.beginConnectionPointIndex === -1) {
            var beginConnectionPointIndex = connector.beginItem.getNearestConnectionPoint(connector.points[0]);
            history.addAndRedo(new AddConnectionHistoryItem_1.SetConnectionPointIndexHistoryItem(connector, beginConnectionPointIndex, Connector_1.ConnectorPosition.Begin));
        }
        if (connector.endItem && connector.endConnectionPointIndex === -1) {
            var endConnectionPointIndex = connector.endItem.getNearestConnectionPoint(connector.points[connector.points.length - 1]);
            history.addAndRedo(new AddConnectionHistoryItem_1.SetConnectionPointIndexHistoryItem(connector, endConnectionPointIndex, Connector_1.ConnectorPosition.End));
        }
    };
    ModelUtils.skipUnnecessaryRenderPoints = function (points) {
        var clonedPoints = points.map(function (p) { return p.clone(); });
        ModelUtils.removeUnnecessaryRenderPoints(clonedPoints);
        points.forEach(function (p) { return p.skipped = clonedPoints.some(function (cp) { return cp.skipped && cp.equals(p); }); });
        points[0].skipped = false;
        points[points.length - 1].skipped = false;
    };
    ModelUtils.skipUnnecessaryRightAngleRenderPoints = function (points) {
        var clonedPoints = points.map(function (p) { return p.clone(); });
        ModelUtils.removeUnnecessaryRightAngleRenderPoints(clonedPoints);
        points.forEach(function (p) { return p.skipped = clonedPoints.some(function (cp) { return cp.skipped && cp.equals(p); }); });
        points[0].skipped = false;
        points[points.length - 1].skipped = false;
    };
    ModelUtils.removeUnnecessaryRenderPoints = function (points) {
        Utils_1.GeometryUtils.removeUnnecessaryPoints(points, function (pt, index) { return ModelUtils.removeUnnecessaryPoint(points, pt, index); }, function (pt) { return pt !== undefined && !pt.skipped; });
        points[0].skipped = false;
        points[points.length - 1].skipped = false;
    };
    ModelUtils.removeUnnecessaryRightAngleRenderPoints = function (points) {
        Utils_1.GeometryUtils.removeUnnecessaryRightAnglePoints(points, function (p, index) { return ModelUtils.removeUnnecessaryPoint(points, p, index); }, function (p) { return p !== undefined && !p.skipped; });
        points[0].skipped = false;
        points[points.length - 1].skipped = false;
    };
    ModelUtils.createUnnecessaryRenderPoints = function (renderPointsWithoutSkipped, skippedRenderPoints, getPosition, predicate) {
        if (predicate === void 0) { predicate = function (_) { return true; }; }
        var result = {};
        Utils_1.GeometryUtils.removeUnnecessaryPoints(renderPointsWithoutSkipped, function (removedPoint, removedIndex) {
            return ModelUtils.collectNotSkippedRenderPoints(result, renderPointsWithoutSkipped, removedPoint, removedIndex, getPosition, predicate);
        });
        ModelUtils.collectSkippedRenderPoints(result, skippedRenderPoints, getPosition, predicate);
        return result;
    };
    ModelUtils.createUnnecessaryRightAngleRenderPoints = function (renderPointsWithoutSkipped, skippedRenderPoints, getPosition, predicate) {
        if (predicate === void 0) { predicate = function (_) { return true; }; }
        var result = {};
        Utils_1.GeometryUtils.removeUnnecessaryRightAnglePoints(renderPointsWithoutSkipped, function (removedPoint, removedIndex) {
            return ModelUtils.collectNotSkippedRenderPoints(result, renderPointsWithoutSkipped, removedPoint, removedIndex, getPosition, predicate);
        });
        ModelUtils.collectSkippedRenderPoints(result, skippedRenderPoints, getPosition, predicate);
        return result;
    };
    ModelUtils.createNecessaryPoints = function (points, unnecessaryPoints) {
        var _this = this;
        var result = [];
        var lastPointIndex = points.length - 1;
        points.forEach(function (p, index) {
            if (index === 0 || index === lastPointIndex || _this.isNecessaryPoint(p, index, unnecessaryPoints))
                result.push(p.clone());
        });
        return result;
    };
    ModelUtils.isNecessaryPoint = function (point, pointIndex, unnecessaryPoints) {
        return !Object.keys(unnecessaryPoints).some(function (key) {
            var unnecessaryPoint = unnecessaryPoints[key];
            return unnecessaryPoint.pointIndex === pointIndex && Utils_1.GeometryUtils.areDuplicatedPoints(point, unnecessaryPoint);
        });
    };
    ModelUtils.collectSkippedRenderPoints = function (targetRenderPoints, skippedRenderPoints, getPosition, predicate) {
        if (predicate === void 0) { predicate = function (_) { return true; }; }
        skippedRenderPoints && skippedRenderPoints.forEach(function (skippedPoint) {
            if (predicate(skippedPoint)) {
                var positionIndex = getPosition(skippedPoint);
                if (targetRenderPoints[positionIndex] === undefined)
                    targetRenderPoints[positionIndex] = skippedPoint;
            }
        });
    };
    ModelUtils.collectNotSkippedRenderPoints = function (targetRenderPoints, sourceRenderPoints, removedPoint, removedIndex, getPosition, predicate) {
        if (predicate === void 0) { predicate = function (_) { return true; }; }
        if (!predicate(removedPoint))
            return false;
        var positionIndex = getPosition(removedPoint);
        if (targetRenderPoints[positionIndex] === undefined) {
            targetRenderPoints[positionIndex] = removedPoint;
            removedPoint.skipped = true;
            sourceRenderPoints.splice(removedIndex, 1);
        }
        return true;
    };
    ModelUtils.removeUnnecessaryPoint = function (points, point, removedIndex) {
        if (point.pointIndex === -1) {
            points.splice(removedIndex, 1);
            return true;
        }
        point.skipped = true;
        return false;
    };
    ModelUtils.validateRenderPointIndexes = function (points, renderPoints, startIndex) {
        var _this = this;
        var result = renderPoints.map(function (rp, i) { return new ConnectorRenderPoint_1.ConnectorRenderPoint(rp.x, rp.y, i >= startIndex && rp.pointIndex >= 0 ? _this.findFirstPointIndex(points, function (p) { return p.equals(rp); }) : rp.pointIndex, rp.skipped); });
        result[0].skipped = false;
        result[result.length - 1].skipped = false;
        return result;
    };
    ModelUtils.findFirstPointIndex = function (points, predicate) {
        if (!points || !predicate)
            return -1;
        for (var i = 0; i < points.length; i++)
            if (predicate(points[i]))
                return i;
        return -1;
    };
    ModelUtils.moveConnectorRightAnglePoints = function (history, connector, firstPoint, firstPointIndex, lastPoint, lastPointIndex) {
        if (!Utils_1.GeometryUtils.areDuplicatedPoints(connector.points[firstPointIndex], firstPoint) ||
            !Utils_1.GeometryUtils.areDuplicatedPoints(connector.points[lastPointIndex], lastPoint))
            history.addAndRedo(new MoveConnectorPointHistoryItem_1.MoveConnectorRightAnglePointsHistoryItem(connector.key, firstPointIndex, firstPoint, lastPointIndex, lastPoint));
    };
    ModelUtils.moveConnectorPoint = function (history, connector, pointIndex, newPosition) {
        if (!connector.points[pointIndex].equals(newPosition)) {
            history.addAndRedo(new MoveConnectorPointHistoryItem_1.MoveConnectorPointHistoryItem(connector.key, pointIndex, newPosition));
            return true;
        }
        return false;
    };
    ModelUtils.updateConnectorAttachedPoints = function (history, model, connector) {
        history.beginTransaction();
        var beginContainer = connector.beginItem && model.findItemCollapsedContainer(connector.beginItem);
        var beginAttachedToContainer = beginContainer && (!connector.endItem || !model.isContainerItem(beginContainer, connector.endItem));
        var endContainer = connector.endItem && model.findItemCollapsedContainer(connector.endItem);
        var endAttachedToContainer = endContainer && (!connector.beginItem || !model.isContainerItem(endContainer, connector.beginItem));
        var changed = false;
        if (beginAttachedToContainer)
            changed = this.updateConnectorBeginPoint(history, connector, beginContainer, (endAttachedToContainer && endContainer) || connector.endItem, function (index) { return beginContainer.getConnectionPointIndexForItem(connector.beginItem, index); }) || changed;
        else
            changed = this.updateConnectorBeginPoint(history, connector, connector.beginItem, (endAttachedToContainer && endContainer) || connector.endItem) || changed;
        if (endAttachedToContainer)
            changed = this.updateConnectorEndPoint(history, connector, endContainer, function (index) { return endContainer.getConnectionPointIndexForItem(connector.beginItem, index); }) || changed;
        else
            changed = this.updateConnectorEndPoint(history, connector, connector.endItem) || changed;
        history.endTransaction();
        return changed;
    };
    ModelUtils.updateConnectorBeginPoint = function (history, connector, beginItem, endItem, getConnectionPointIndex) {
        if (beginItem) {
            var connectionPointIndex = getConnectionPointIndex !== undefined ?
                getConnectionPointIndex(connector.beginConnectionPointIndex) : connector.beginConnectionPointIndex;
            var targetPoint = connector.points[1];
            if (endItem && connector.points.length === 2)
                if (connector.endConnectionPointIndex !== -1)
                    targetPoint = endItem.getConnectionPointPosition(connector.endConnectionPointIndex, point_1.Point.zero());
                else
                    targetPoint = endItem.rectangle.center;
            var newPoint = beginItem.getConnectionPointPosition(connectionPointIndex, targetPoint);
            return this.moveConnectorPoint(history, connector, 0, newPoint.clone());
        }
    };
    ModelUtils.updateConnectorEndPoint = function (history, connector, endItem, getConnectionPointIndex) {
        if (endItem) {
            var connectionPointIndex = getConnectionPointIndex !== undefined ?
                getConnectionPointIndex(connector.endConnectionPointIndex) : connector.endConnectionPointIndex;
            var newPoint = endItem.getConnectionPointPosition(connectionPointIndex, connector.points[connector.points.length - 2]);
            return this.moveConnectorPoint(history, connector, connector.points.length - 1, newPoint);
        }
    };
    ModelUtils.updateContainerConnectorsAttachedPoints = function (history, model, rootContainer, container) {
        var _this = this;
        if (container === void 0) { container = rootContainer; }
        history.beginTransaction();
        var children = model.getChildren(container);
        children.forEach(function (child) {
            if (child instanceof Shape_1.Shape) {
                child.attachedConnectors.forEach(function (connector) {
                    var beginItemInContainer = connector.beginItem && model.isContainerItem(container, connector.beginItem);
                    var endItemInContainer = connector.endItem && model.isContainerItem(container, connector.endItem);
                    if (beginItemInContainer && !endItemInContainer) {
                        var collapsedContainer = model.findItemTopCollapsedContainer(connector.beginItem);
                        var endCollapsedContainer = connector.endItem && model.findItemTopCollapsedContainer(connector.endItem);
                        if (!collapsedContainer)
                            _this.updateConnectorBeginPoint(history, connector, connector.beginItem, endCollapsedContainer || connector.endItem);
                        else
                            _this.updateConnectorBeginPoint(history, connector, collapsedContainer, endCollapsedContainer || connector.endItem, function (index) { return rootContainer.getConnectionPointIndexForItem(connector.beginItem, index); });
                    }
                    if (endItemInContainer && !beginItemInContainer) {
                        var collapsedContainer = model.findItemTopCollapsedContainer(connector.endItem);
                        if (!collapsedContainer)
                            _this.updateConnectorEndPoint(history, connector, connector.endItem);
                        else
                            _this.updateConnectorEndPoint(history, connector, collapsedContainer, function (index) { return rootContainer.getConnectionPointIndexForItem(connector.endItem, index); });
                    }
                });
                _this.updateContainerConnectorsAttachedPoints(history, model, rootContainer, child);
            }
        });
        history.endTransaction();
    };
    ModelUtils.getConnectorsWithoutBeginItemInfo = function (model) {
        var connectors = model.findConnectorsWithoutBeginItem();
        return connectors.map(function (c) {
            return {
                connector: c,
                point: c.points[0].clone()
            };
        });
    };
    ModelUtils.getConnectorsWithoutEndItemInfo = function (model) {
        var connectors = model.findConnectorsWithoutEndItem();
        return connectors.map(function (c) {
            return {
                connector: c,
                point: c.points[c.points.length - 1].clone()
            };
        });
    };
    ModelUtils.updateShapeAttachedConnectors = function (history, model, shape) {
        var _this = this;
        shape.attachedConnectors.forEach(function (connector) {
            _this.tryRemoveConnectorIntermediatePoints(history, connector);
            _this.updateConnectorAttachedPoints(history, model, connector);
        });
    };
    ModelUtils.updateMovingShapeConnections = function (history, shape, beginPointsInfo, endPointsInfo, resetTargetCallback, updateTargetCallback, beforeAttachConnectorCallback) {
        var _this = this;
        resetTargetCallback();
        beginPointsInfo.forEach(function (pi) {
            var connectionPointIndex = _this.getMovingShapeConnectionPointIndex(shape, pi.point);
            if (shape.rectangle.containsPoint(pi.point) || connectionPointIndex > -1) {
                updateTargetCallback(shape, connectionPointIndex);
                if (connectionPointIndex !== pi.connector.beginConnectionPointIndex && pi.connector.beginItem)
                    history.addAndRedo(new DeleteConnectionHistoryItem_1.DeleteConnectionHistoryItem(pi.connector, Connector_1.ConnectorPosition.Begin));
                beforeAttachConnectorCallback(pi.connector);
                history.addAndRedo(new AddConnectionHistoryItem_1.AddConnectionHistoryItem(pi.connector, shape, connectionPointIndex, Connector_1.ConnectorPosition.Begin));
            }
            else if (pi.connector.beginItem) {
                history.addAndRedo(new DeleteConnectionHistoryItem_1.DeleteConnectionHistoryItem(pi.connector, Connector_1.ConnectorPosition.Begin));
                history.addAndRedo(new MoveConnectorPointHistoryItem_1.MoveConnectorPointHistoryItem(pi.connector.key, 0, pi.point));
            }
        });
        endPointsInfo.forEach(function (pi) {
            var connectionPointIndex = _this.getMovingShapeConnectionPointIndex(shape, pi.point);
            if (shape.rectangle.containsPoint(pi.point) || connectionPointIndex > -1) {
                updateTargetCallback(shape, connectionPointIndex);
                if (connectionPointIndex !== pi.connector.endConnectionPointIndex && pi.connector.endItem)
                    history.addAndRedo(new DeleteConnectionHistoryItem_1.DeleteConnectionHistoryItem(pi.connector, Connector_1.ConnectorPosition.End));
                beforeAttachConnectorCallback(pi.connector);
                history.addAndRedo(new AddConnectionHistoryItem_1.AddConnectionHistoryItem(pi.connector, shape, connectionPointIndex, Connector_1.ConnectorPosition.End));
            }
            else if (pi.connector.endItem) {
                history.addAndRedo(new DeleteConnectionHistoryItem_1.DeleteConnectionHistoryItem(pi.connector, Connector_1.ConnectorPosition.End));
                history.addAndRedo(new MoveConnectorPointHistoryItem_1.MoveConnectorPointHistoryItem(pi.connector.key, pi.connector.points.length - 1, pi.point));
            }
        });
    };
    ModelUtils.getMovingShapeConnectionPointIndex = function (shape, point) {
        var _this = this;
        var connectionPointIndex = -1;
        shape.getConnectionPoints().forEach(function (pt, index) {
            if (metrics_1.Metrics.euclideanDistance(point, pt) < _this.connectionPointActionSize)
                connectionPointIndex = index;
        });
        return connectionPointIndex;
    };
    ModelUtils.shouldRemoveConnectorIntermediatePoints = function (connector, shapes) {
        if (connector.properties.lineOption !== ConnectorProperties_1.ConnectorLineOption.Orthogonal || connector.points.length === 2 || !shapes || !shapes.length)
            return false;
        var index = 0;
        var shape;
        while (shape = shapes[index]) {
            if (this.isShapeIntersectConnectorCustomPoints(shape, connector))
                return true;
            index++;
        }
        return false;
    };
    ModelUtils.tryRemoveConnectorIntermediatePoints = function (history, connector) {
        if (this.shouldRemoveConnectorIntermediatePoints(connector, [connector.beginItem, connector.endItem]))
            this.deleteConnectorCustomPoints(history, connector);
    };
    ModelUtils.isShapeIntersectConnectorCustomPoints = function (shape, connector) {
        if (!shape)
            return false;
        var customRenderPoints = connector.getCustomRenderPoints(true);
        if (!customRenderPoints.length)
            return false;
        var offset = Connector_1.Connector.minOffset - unit_converter_1.UnitConverter.pixelsToTwips(1);
        return Utils_1.GeometryUtils.areIntersectedSegments(Utils_1.GeometryUtils.createSegments(customRenderPoints), Utils_1.GeometryUtils.createSegmentsFromRectangle(shape.rectangle.clone().inflate(offset, offset)));
    };
    ModelUtils.getSnappedPos = function (model, gridSize, pos, isHorizontal) {
        var snapOffset = isHorizontal ? model.snapStartPoint.x : model.snapStartPoint.y;
        return Math.round((pos - snapOffset) / gridSize) * gridSize + snapOffset;
    };
    ModelUtils.tryUpdateModelRectangle = function (history, processPoints) {
        var offset = history.modelManipulator.getModelSizeUpdateOffset();
        if (!offset.isEmpty()) {
            history.addAndRedo(new ModelResizeHistoryItem_1.ModelResizeHistoryItem(offset));
            if (offset.left || offset.top) {
                history.addAndRedo(new UpdatePositionsOnPageResizeHistoryItem_1.UpdatePositionsOnPageResizeHistoryItem(new vector_1.Vector(offset.left, offset.top)));
                if (processPoints !== undefined)
                    processPoints(offset.left, offset.top);
            }
            history.modelManipulator.raiseModelRectangleChanged(history.modelManipulator.model.getRectangle(true));
        }
    };
    ModelUtils.deleteItems = function (history, model, selection, items, deleteLocked) {
        history.beginTransaction();
        var itemsHash = {};
        items.forEach(function (item) { return itemsHash[item.key] = item; });
        var selectionKeys = selection.getKeys().filter(function (key) { return !itemsHash[key]; });
        history.addAndRedo(new SetSelectionHistoryItem_1.SetSelectionHistoryItem(selection, selectionKeys));
        this.deleteItemsCore(history, model, items, deleteLocked);
        this.tryUpdateModelRectangle(history);
        history.endTransaction();
    };
    ModelUtils.deleteItemsCore = function (history, model, items, deleteLocked) {
        var _this = this;
        items.sort(function (a, b) {
            var v1 = (a instanceof Connector_1.Connector) ? 0 : 1;
            var v2 = (b instanceof Connector_1.Connector) ? 0 : 1;
            return v1 - v2;
        });
        items.forEach(function (item) {
            if (item.container)
                _this.removeFromContainer(history, model, item);
            if (item instanceof Shape_1.Shape) {
                var children = model.getChildren(item);
                if (children.length) {
                    children.forEach(function (child) {
                        history.addAndRedo(new RemoveFromContainerHistoryItem_1.RemoveFromContainerHistoryItem(child));
                        _this.updateAttachedConnectorsContainer(history, model, child);
                    });
                    _this.deleteItemsCore(history, model, children.filter(function (child) { return !child.locked || deleteLocked; }), deleteLocked);
                }
                if (model.findItem(item.key))
                    _this.deleteShape(history, item);
            }
            if (item instanceof Connector_1.Connector)
                if (model.findItem(item.key))
                    _this.deleteConnector(history, item);
        });
    };
    ModelUtils.detachConnectors = function (history, shape) {
        history.beginTransaction();
        while (shape.attachedConnectors.length > 0) {
            var connector = shape.attachedConnectors[0];
            history.addAndRedo(new DeleteConnectionHistoryItem_1.DeleteConnectionHistoryItem(connector, connector.beginItem === shape ? Connector_1.ConnectorPosition.Begin : Connector_1.ConnectorPosition.End));
        }
        history.endTransaction();
    };
    ModelUtils.deleteShape = function (history, shape) {
        var allowed = history.modelManipulator.permissionsProvider.canDeleteItems([shape]);
        history.beginTransaction();
        this.detachConnectors(history, shape);
        history.addAndRedo(new DeleteShapeHistoryItem_1.DeleteShapeHistoryItem(shape.key, allowed));
        history.endTransaction();
    };
    ModelUtils.deleteConnector = function (history, connector) {
        history.beginTransaction();
        if (connector.beginItem)
            history.addAndRedo(new DeleteConnectionHistoryItem_1.DeleteConnectionHistoryItem(connector, Connector_1.ConnectorPosition.Begin));
        if (connector.endItem)
            history.addAndRedo(new DeleteConnectionHistoryItem_1.DeleteConnectionHistoryItem(connector, Connector_1.ConnectorPosition.End));
        history.addAndRedo(new DeleteConnectorHistoryItem_1.DeleteConnectorHistoryItem(connector.key));
        history.endTransaction();
    };
    ModelUtils.deleteAllItems = function (history, model, selection) {
        this.deleteItems(history, model, selection, model.items.slice(), true);
    };
    ModelUtils.deleteSelection = function (history, model, selection) {
        this.deleteItems(history, model, selection, selection.getSelectedItems());
    };
    ModelUtils.changeSelectionLocked = function (history, model, selection, locked) {
        history.beginTransaction();
        var items = selection.getSelectedItems(true);
        items.forEach(function (item) {
            history.addAndRedo(new ChangeLockedHistoryItem_1.ChangeLockedHistoryItem(item, locked));
        });
        ModelUtils.updateSelection(history, selection);
        history.endTransaction();
    };
    ModelUtils.copyStylesToItem = function (history, model, fromItem, newItemKey) {
        var toItem = model.findItem(newItemKey);
        fromItem.styleText.forEach(function (propertyName) {
            if (fromItem.styleText[propertyName] !== toItem.styleText[propertyName])
                history.addAndRedo(new ChangeStyleTextHistoryItem_1.ChangeStyleTextHistoryItem(newItemKey, propertyName, fromItem.styleText[propertyName]));
        });
        fromItem.style.forEach(function (propertyName) {
            if (fromItem.style[propertyName] !== toItem.style[propertyName])
                history.addAndRedo(new ChangeStyleHistoryItem_1.ChangeStyleHistoryItem(newItemKey, propertyName, fromItem.style[propertyName]));
        });
    };
    ModelUtils.updateSelection = function (history, selection) {
        history.addAndRedo(new SetSelectionHistoryItem_1.SetSelectionHistoryItem(selection, selection.getKeys(), true));
    };
    ModelUtils.cloneShapeToOffset = function (history, model, shape, dx, dy) {
        history.beginTransaction();
        var newPosition = shape.position.clone().offset(dx, dy);
        var addHistoryItem = new AddShapeHistoryItem_1.AddShapeHistoryItem(shape.description, newPosition, shape.text);
        history.addAndRedo(addHistoryItem);
        var newKey = addHistoryItem.shapeKey;
        history.addAndRedo(new ResizeShapeHistoryItem_1.ResizeShapeHistoryItem(newKey, newPosition, shape.size.clone()));
        history.addAndRedo(new ChangeCustomDataHistoryItem_1.ChangeCustomDataHistoryItem(newKey, Utils_1.ObjectUtils.cloneObject(shape.customData)));
        history.addAndRedo(new ChangeShapeParametersHistoryItem_1.ChangeShapeParametersHistoryItem(newKey, shape.parameters.clone()));
        this.copyStylesToItem(history, model, shape, newKey);
        history.endTransaction();
        return newKey;
    };
    ModelUtils.applyOffsetToConnectorRenderPointsContext = function (context, dx, dy) {
        return context && context.renderPoints ? new ConnectorRenderPointsContext_1.ConnectorRenderPointsContext(context.renderPoints.map(function (p) { return p.clone().offset(dx, dy); }), true, context.actualRoutingMode) : undefined;
    };
    ModelUtils.cloneConnectorToOffset = function (history, model, connector, beginItemKey, endItemKey, dx, dy) {
        history.beginTransaction();
        var newPoints = connector.points.map(function (p) { return p.clone().offset(dx, dy); });
        var addHistoryItem = new AddConnectorHistoryItem_1.AddConnectorHistoryItem(newPoints, undefined, this.applyOffsetToConnectorRenderPointsContext(connector.tryCreateRenderPointsContext(), dx, dy));
        history.addAndRedo(addHistoryItem);
        var newKey = addHistoryItem.connectorKey;
        var newConnector = model.findConnector(newKey);
        connector.properties.forEach(function (propertyName) {
            if (connector.properties[propertyName] !== newConnector.properties[propertyName])
                history.addAndRedo(new ChangeConnectorPropertyHistoryItem_1.ChangeConnectorPropertyHistoryItem(newKey, propertyName, connector.properties[propertyName]));
        });
        if (beginItemKey) {
            var from = model.findShape(beginItemKey);
            history.addAndRedo(new AddConnectionHistoryItem_1.AddConnectionHistoryItem(newConnector, from, connector.beginConnectionPointIndex, Connector_1.ConnectorPosition.Begin));
        }
        if (endItemKey) {
            var to = model.findShape(endItemKey);
            history.addAndRedo(new AddConnectionHistoryItem_1.AddConnectionHistoryItem(newConnector, to, connector.endConnectionPointIndex, Connector_1.ConnectorPosition.End));
        }
        var newTexts = connector.texts.clone();
        newTexts.forEach(function (connectorText) {
            history.addAndRedo(new ChangeConnectorTextHistoryItem_1.ChangeConnectorTextHistoryItem(newConnector, connectorText.position, connectorText.value));
        });
        this.copyStylesToItem(history, model, connector, newKey);
        history.endTransaction();
        return newKey;
    };
    ModelUtils.cloneSelectionToOffset = function (history, model, onItemAdded, selection, dx, dy) {
        var _this = this;
        history.beginTransaction();
        var newShapes = {};
        var ids = [];
        selection.getSelectedShapes().forEach(function (shape) {
            var newKey = _this.cloneShapeToOffset(history, model, shape, dx, dy);
            newShapes[shape.key] = newKey;
            ids.push(newKey);
            if (onItemAdded)
                onItemAdded(newKey);
        });
        selection.getSelectedConnectors().forEach(function (connector) {
            var beginItemKey = connector.beginItem ? newShapes[connector.beginItem.key] : null;
            var endItemKey = connector.endItem ? newShapes[connector.endItem.key] : null;
            var newKey = _this.cloneConnectorToOffset(history, model, connector, beginItemKey, endItemKey, dx, dy);
            ids.push(newKey);
            if (onItemAdded)
                onItemAdded(newKey);
        });
        history.addAndRedo(new SetSelectionHistoryItem_1.SetSelectionHistoryItem(selection, ids));
        ModelUtils.tryUpdateModelRectangle(history);
        history.endTransaction();
    };
    ModelUtils.findContainerByEventKey = function (model, selection, key) {
        var container = model.findContainer(key);
        if (container && !container.isLocked)
            return container;
        else {
            var shape = model.findShape(key);
            if (shape && shape.container && !selection.hasKey(shape.key))
                return ModelUtils.findContainerByEventKey(model, selection, shape.container.key);
        }
    };
    ModelUtils.canInsertToContainer = function (model, item, container) {
        if (item === container)
            return false;
        if (item instanceof Shape_1.Shape)
            if (model.findChild(item, container.key))
                return false;
        return true;
    };
    ModelUtils.canInsertSelectionToContainer = function (model, selection, container) {
        var result = true;
        selection.getSelectedItems().forEach(function (item) {
            if (item === container) {
                result = false;
                return;
            }
            if (item instanceof Shape_1.Shape)
                if (model.findChild(item, container.key)) {
                    result = false;
                    return;
                }
        });
        return result;
    };
    ModelUtils.insertToContainer = function (history, model, item, container) {
        if (!container.enableChildren)
            throw Error("Inpossible to add children to non-container shape.");
        if (!this.canInsertToContainer(model, item, container))
            return;
        var oldContainer = item.container;
        if (oldContainer !== container) {
            history.beginTransaction();
            if (oldContainer) {
                history.addAndRedo(new RemoveFromContainerHistoryItem_1.RemoveFromContainerHistoryItem(item));
                item.attachedConnectors.forEach(function (connector) {
                    if (connector.container)
                        history.addAndRedo(new RemoveFromContainerHistoryItem_1.RemoveFromContainerHistoryItem(connector));
                });
            }
            history.addAndRedo(new InsertToContainerHistoryItem_1.InsertToContainerHistoryItem(item, container));
            this.updateAttachedConnectorsContainer(history, model, item);
            history.endTransaction();
        }
    };
    ModelUtils.removeFromContainer = function (history, model, item) {
        if (item.container) {
            history.beginTransaction();
            history.addAndRedo(new RemoveFromContainerHistoryItem_1.RemoveFromContainerHistoryItem(item));
            this.updateAttachedConnectorsContainer(history, model, item);
            history.endTransaction();
        }
    };
    ModelUtils.insertSelectionToContainer = function (history, model, selection, container) {
        var _this = this;
        history.beginTransaction();
        var selectedItems = selection.getSelectedItems();
        var items = selectedItems.filter(function (item) { return !item.container || selectedItems.indexOf(item.container) === -1; });
        items.forEach(function (item) {
            _this.insertToContainer(history, model, item, container);
        });
        history.endTransaction();
    };
    ModelUtils.removeSelectionFromContainer = function (history, model, selection) {
        var _this = this;
        history.beginTransaction();
        selection.getSelectedItems().forEach(function (item) {
            if (item.container && !selection.hasKey(item.container.key)) {
                history.addAndRedo(new RemoveFromContainerHistoryItem_1.RemoveFromContainerHistoryItem(item));
                _this.updateAttachedConnectorsContainer(history, model, item);
            }
        });
        history.endTransaction();
    };
    ModelUtils.getConnectorContainer = function (connector) {
        if (connector.beginItem && connector.endItem) {
            var beginItemContainers = {};
            var containerForBeginItem = connector.beginItem.container;
            while (containerForBeginItem) {
                beginItemContainers[containerForBeginItem.key] = true;
                containerForBeginItem = containerForBeginItem.container;
            }
            var containerForEndItem = connector.endItem.container;
            while (containerForEndItem) {
                if (beginItemContainers[containerForEndItem.key] !== undefined)
                    return containerForEndItem;
                containerForEndItem = containerForEndItem.container;
            }
        }
    };
    ModelUtils.updateAttachedConnectorsContainer = function (history, model, item) {
        var _this = this;
        history.beginTransaction();
        item.attachedConnectors.forEach(function (connector) {
            _this.updateConnectorContainer(history, model, connector);
        });
        history.endTransaction();
    };
    ModelUtils.updateConnectorContainer = function (history, model, connector) {
        var container = this.getConnectorContainer(connector);
        if (container)
            history.addAndRedo(new InsertToContainerHistoryItem_1.InsertToContainerHistoryItem(connector, container));
        else if (connector.container)
            history.addAndRedo(new RemoveFromContainerHistoryItem_1.RemoveFromContainerHistoryItem(connector));
    };
    ModelUtils.updateNewShapeProperties = function (history, selection, itemKey) {
        var style = selection.inputPosition.getDefaultStyle();
        style.forEach(function (propertyName) {
            history.addAndRedo(new ChangeStyleHistoryItem_1.ChangeStyleHistoryItem(itemKey, propertyName, selection.inputPosition.getDefaultStylePropertyValue(propertyName)));
        });
        var textStyle = selection.inputPosition.getDefaultTextStyle();
        textStyle.forEach(function (propertyName) {
            history.addAndRedo(new ChangeStyleTextHistoryItem_1.ChangeStyleTextHistoryItem(itemKey, propertyName, selection.inputPosition.getDefaultTextStylePropertyValue(propertyName)));
        });
    };
    ModelUtils.updateNewConnectorProperties = function (history, selection, itemKey) {
        var connectorProperties = selection.inputPosition.getDefaultConnectorProperties();
        connectorProperties.forEach(function (propertyName) {
            history.addAndRedo(new ChangeConnectorPropertyHistoryItem_1.ChangeConnectorPropertyHistoryItem(itemKey, propertyName, selection.inputPosition.getDefaultConnectorPropertyValue(propertyName)));
        });
        var style = selection.inputPosition.getDefaultStyle();
        style.forEach(function (propertyName) {
            history.addAndRedo(new ChangeStyleHistoryItem_1.ChangeStyleHistoryItem(itemKey, propertyName, selection.inputPosition.getDefaultStylePropertyValue(propertyName)));
        });
        var textStyle = selection.inputPosition.getDefaultTextStyle();
        textStyle.forEach(function (propertyName) {
            history.addAndRedo(new ChangeStyleTextHistoryItem_1.ChangeStyleTextHistoryItem(itemKey, propertyName, selection.inputPosition.getDefaultTextStylePropertyValue(propertyName)));
        });
    };
    ModelUtils.applyLayout = function (history, model, container, graph, layout, nonGraphItems, settings, snapToGrid, gridSize, skipPointIndices) {
        history.beginTransaction();
        var occupiedRectangles = this.getOccupiedRectangles(nonGraphItems, container);
        layout = this.offsetLayoutToFreeSpace(layout, container && container.clientRectangle, occupiedRectangles, settings.containerPadding);
        if (snapToGrid)
            this.adjustLayoutToSnapGrid(model, layout, gridSize);
        if (container)
            this.resizeContainerOnLayout(history, model, layout, container, settings.containerPadding);
        this.applyLayoutToNodes(history, model, layout, graph.edges.map(function (e) { return model.findConnector(e.key); }));
        this.applyLayoutToConnectors(history, model, layout, graph.edges.map(function (e) { return model.findConnector(e.key); }), skipPointIndices);
        history.endTransaction();
        return layout.getRectangle(true);
    };
    ModelUtils.getNonGraphItems = function (model, container, nodeKeyMap, shapes, connectors) {
        var allItems = container ? model.getChildren(container) : model.items.filter(function (item) { return !item.container; });
        return allItems.filter(function (item) {
            if (item instanceof Connector_1.Connector)
                return (!item.beginItem || !nodeKeyMap[item.beginItem.key]) && (!item.endItem || !nodeKeyMap[item.endItem.key]) &&
                    connectors.indexOf(item) === -1;
            if (item instanceof Shape_1.Shape)
                return !nodeKeyMap[item.key] &&
                    shapes.indexOf(item) === -1;
        });
    };
    ModelUtils.getOccupiedRectangles = function (nonGraphItems, container) {
        var occupiedRectangles = nonGraphItems.map(function (i) { return i.rectangle; });
        if (container && occupiedRectangles.length) {
            var rect = container.clientRectangle;
            occupiedRectangles.push(new rectangle_1.Rectangle(rect.right, rect.y, 1, 1));
            occupiedRectangles.push(new rectangle_1.Rectangle(rect.right, rect.bottom, 1, 1));
        }
        return occupiedRectangles;
    };
    ModelUtils.offsetLayoutToFreeSpace = function (layout, containerRect, occupiedRectangles, spacing) {
        var graphItemRect = layout.getRectangle(true);
        var freePoint = Utils_1.GeometryUtils.findFreeSpace(occupiedRectangles, graphItemRect.createSize().offset(spacing, spacing).nonNegativeSize(), false, containerRect);
        if (freePoint) {
            var x = freePoint.x + spacing;
            var y = freePoint.y + spacing;
            return layout.offsetNodes(x, y);
        }
        var maxX = occupiedRectangles && occupiedRectangles.length ?
            occupiedRectangles.reduce(function (max, rect) { return rect.right > max ? rect.right : max; }, 0) :
            (containerRect ? containerRect.x : 0);
        var minY = containerRect ? containerRect.y : Math.max(0, graphItemRect.y);
        return layout.offsetNodes(maxX + spacing, minY + spacing);
    };
    ModelUtils.resizeContainerOnLayout = function (history, model, layout, container, spacing) {
        var layoutRect = layout.getRectangle(true);
        var nonLayoutRectangles = container.children
            .filter(function (item) {
            if (item instanceof Shape_1.Shape)
                return layout.nodeKeys.indexOf(item.key) === -1;
            if (item instanceof Connector_1.Connector && item.beginItem && item.endItem)
                return layout.nodeKeys.indexOf(item.beginItem.key) === -1 && layout.nodeKeys.indexOf(item.endItem.key) === -1;
            return false;
        })
            .map(function (item) { return item.rectangle; });
        var right = nonLayoutRectangles.map(function (rect) { return rect.right; }).reduce(function (prev, cur) { return Math.max(prev, cur); }, layoutRect.right);
        var bottom = nonLayoutRectangles.map(function (rect) { return rect.bottom; }).reduce(function (prev, cur) { return Math.max(prev, cur); }, layoutRect.bottom);
        var width = container.rectangle.width + right + spacing - container.rectangle.right;
        var height = container.rectangle.height + bottom + spacing - container.rectangle.bottom;
        ModelUtils.setShapeSize(history, model, container, container.position, new size_1.Size(width, height));
        ModelUtils.updateShapeAttachedConnectors(history, model, container);
    };
    ModelUtils.applyLayoutToNodes = function (history, model, layout, connectors) {
        var _this = this;
        var connectorsSet = connectors.reduce(function (acc, c) { return acc[c.key] = true && acc; }, {});
        layout.forEachNode(function (nl, nk) {
            var shape = model.findShape(nk);
            _this.applyLayoutToNode(history, model, shape, nl.position, connectorsSet);
        });
    };
    ModelUtils.applyLayoutToNode = function (history, model, shape, position, connectorsSet) {
        var _this = this;
        var delta = position.clone().offset(-shape.position.x, -shape.position.y);
        ModelUtils.setShapePosition(history, model, shape, position, false);
        if (delta.x !== 0 || delta.y !== 0) {
            shape.attachedConnectors
                .filter(function (c) { return !connectorsSet[c.key]; })
                .forEach(function (connector) {
                _this.updateConnectorAttachedPoints(history, model, connector);
                var beginPointIndex = connector.beginItem ? 1 : 0;
                var endPointIndex = connector.endItem ? (connector.points.length - 2) : (connector.points.length - 1);
                for (var i = beginPointIndex; i <= endPointIndex; i++)
                    _this.moveConnectorPoint(history, connector, i, connector.points[i].offset(delta.x, delta.y));
            });
            model.getChildren(shape).forEach(function (child) {
                if (child instanceof Shape_1.Shape) {
                    var childPosition = child.position.clone().offset(delta.x, delta.y);
                    _this.applyLayoutToNode(history, model, child, childPosition, connectorsSet);
                }
            });
        }
    };
    ModelUtils.applyLayoutToConnectors = function (history, model, layout, connectors, skipPointIndices) {
        var _this = this;
        connectors.filter(function (c) { return c.beginItem || c.endItem; }).forEach(function (connector) {
            var edgeLayout = layout.edgeToPosition[connector.key];
            if (connector.beginItem && connector.endItem && !skipPointIndices && edgeLayout) {
                var beginIndex = connector.beginItem.getConnectionPointIndexForSide(edgeLayout.beginIndex);
                if (beginIndex !== connector.beginConnectionPointIndex)
                    history.addAndRedo(new AddConnectionHistoryItem_1.SetConnectionPointIndexHistoryItem(connector, beginIndex, Connector_1.ConnectorPosition.Begin));
                var endIndex = connector.endItem.getConnectionPointIndexForSide(edgeLayout.endIndex);
                if (endIndex !== connector.endConnectionPointIndex)
                    history.addAndRedo(new AddConnectionHistoryItem_1.SetConnectionPointIndexHistoryItem(connector, endIndex, Connector_1.ConnectorPosition.End));
            }
            _this.updateConnectorAttachedPoints(history, model, connector);
            if (edgeLayout)
                _this.deleteConnectorCustomPoints(history, connector);
        });
    };
    ModelUtils.adjustLayoutToSnapGrid = function (model, layout, gridSize) {
        var _this = this;
        layout.nodeKeys.forEach(function (key) {
            layout.nodeToLayout[key].position.x = _this.getSnappedPos(model, gridSize, layout.nodeToLayout[key].position.x, true);
            layout.nodeToLayout[key].position.y = _this.getSnappedPos(model, gridSize, layout.nodeToLayout[key].position.y, false);
        });
    };
    ModelUtils.getGraphInfoByItems = function (model, shapes, connectors, isDatabinding) {
        if (isDatabinding === void 0) { isDatabinding = true; }
        var itemsByContainerKey = {};
        var items = [].concat(shapes).concat(connectors);
        items.forEach(function (item) {
            var containerKey = item.container && item.container.key;
            if (!itemsByContainerKey[containerKey])
                itemsByContainerKey[containerKey] = [];
            itemsByContainerKey[containerKey].push(item);
        });
        var result = [];
        for (var key in itemsByContainerKey) {
            if (!Object.prototype.hasOwnProperty.call(itemsByContainerKey, key))
                continue;
            var container = key && model.findContainer(key);
            if (!container || (container.expanded && !model.findItemCollapsedContainer(container))) {
                var containerKey = container && container.key;
                var graph = this.getGraphByItems(model, itemsByContainerKey[key], containerKey, !isDatabinding);
                var allowCreateInfo = false;
                if (graph.nodes.length > 1)
                    allowCreateInfo = true;
                else if (graph.nodes.length)
                    if (isDatabinding)
                        allowCreateInfo = true;
                    else if (container && itemsByContainerKey[container.container && container.container.key])
                        allowCreateInfo = true;
                if (allowCreateInfo)
                    result.push(new GraphInfo_1.GraphInfo(container, graph));
            }
        }
        return result.sort(function (a, b) { return b.level - a.level; });
    };
    ModelUtils.getGraphByItems = function (model, items, containerKey, skipLocked) {
        var _this = this;
        var graph = new Graph_1.Graph([], []);
        var knownIds = {};
        items.forEach(function (item) {
            _this.extendByConnectedComponents(item, graph, containerKey, knownIds, skipLocked);
        });
        graph.nodes.sort(function (a, b) { return model.getItemIndex(model.findItem(a)) - model.getItemIndex(model.findItem(b)); });
        graph.edges.sort(function (a, b) { return model.getItemIndex(model.findItem(a.key)) - model.getItemIndex(model.findItem(b.key)); });
        graph.edges = graph.edges.filter(function (e) { return graph.getNode(e.from) && graph.getNode(e.to); });
        return graph;
    };
    ModelUtils.extendByConnectedComponents = function (item, graph, containerKey, knownIds, skipLocked) {
        var _this = this;
        if (!item || (skipLocked && item.locked) || knownIds[item.key])
            return;
        knownIds[item.key] = true;
        if (item instanceof Connector_1.Connector && (item.container && item.container.key) === containerKey &&
            item.beginItem && (!item.beginItem.locked || !skipLocked) && item.endItem && (!item.endItem.locked || !skipLocked) &&
            item.beginItem !== item.endItem) {
            graph.addEdge(new Structures_1.Edge(item.key, item.beginItem && item.beginItem.key, item.endItem && item.endItem.key));
            this.extendByConnectedComponents(item.beginItem, graph, containerKey, knownIds, skipLocked);
            this.extendByConnectedComponents(item.endItem, graph, containerKey, knownIds, skipLocked);
        }
        else if (item instanceof Shape_1.Shape && (item.container && item.container.key) === containerKey) {
            graph.addNode(item);
            item.attachedConnectors.forEach(function (c) { return _this.extendByConnectedComponents(c, graph, containerKey, knownIds, skipLocked); });
        }
    };
    ModelUtils.getlUnitValue = function (units, twipsValue) {
        switch (units) {
            case Enums_1.DiagramUnit.Cm:
                return unit_converter_1.UnitConverter.twipsToCentimeters(twipsValue);
            case Enums_1.DiagramUnit.In:
                return unit_converter_1.UnitConverter.twipsToInches(twipsValue);
            case Enums_1.DiagramUnit.Px:
                return unit_converter_1.UnitConverter.twipsToPixels(twipsValue);
        }
    };
    ModelUtils.getUnitText = function (units, unitItems, formatUnit, twipsValue, fractionDigits) {
        if (fractionDigits === void 0) { fractionDigits = 2; }
        var unitItemText = unitItems[units] ? " " + unitItems[units] : "";
        var unitValue = this.getlUnitValue(units, twipsValue);
        switch (units) {
            case Enums_1.DiagramUnit.Cm:
                return formatUnit(+unitValue.toFixed(fractionDigits)) + unitItemText;
            case Enums_1.DiagramUnit.In:
                return formatUnit(+unitValue.toFixed(fractionDigits)) + unitItemText;
            case Enums_1.DiagramUnit.Px:
                return formatUnit(+unitValue.toFixed(0)) + unitItemText;
        }
    };
    ModelUtils.getTwipsValue = function (units, value) {
        switch (units) {
            case Enums_1.DiagramUnit.Cm:
                return unit_converter_1.UnitConverter.centimetersToTwips(value);
            case Enums_1.DiagramUnit.In:
                return unit_converter_1.UnitConverter.inchesToTwips(value);
            case Enums_1.DiagramUnit.Px:
                return unit_converter_1.UnitConverter.pixelsToTwips(value);
        }
    };
    ModelUtils.getGuidItemKey = function () {
        return math_1.MathUtils.generateGuid();
    };
    ModelUtils.createSelectedItems = function (selection) {
        var result = {};
        selection.getSelectedItems(true).forEach(function (i) { return result[i.key] = i; });
        return result;
    };
    ModelUtils.canMoveConnector = function (selectedItems, connector) {
        var beginItem = connector.beginItem;
        var endItem = connector.endItem;
        if (!beginItem && !endItem)
            return !connector.isLocked;
        if (!selectedItems[connector.key])
            return false;
        if (beginItem === endItem)
            return !!selectedItems[beginItem.key];
        if (!beginItem)
            return !!selectedItems[endItem.key];
        if (!endItem)
            return !!selectedItems[beginItem.key];
        return !!selectedItems[beginItem.key] && !!selectedItems[endItem.key];
    };
    ModelUtils.createRectangle = function (items) {
        return Utils_1.GeometryUtils.getCommonRectangle(items.map(function (i) { return i.rectangle; }));
    };
    ModelUtils.connectionPointActionSize = unit_converter_1.UnitConverter.pixelsToTwips(8);
    return ModelUtils;
}());
exports.ModelUtils = ModelUtils;
//# sourceMappingURL=ModelUtils.js.map