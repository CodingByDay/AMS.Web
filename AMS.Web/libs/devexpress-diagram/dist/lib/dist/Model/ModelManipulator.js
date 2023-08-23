"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelManipulator = void 0;
var offsets_1 = require("@devexpress/utils/lib/geometry/offsets");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var Diagnostics_1 = require("../Diagnostics");
var ImageCache_1 = require("../Images/ImageCache");
var ImageLoader_1 = require("../Images/ImageLoader");
var ModelOperationSettings_1 = require("../ModelOperationSettings");
var Utils_1 = require("../Utils");
var Connector_1 = require("./Connectors/Connector");
var ModelChange_1 = require("./ModelChange");
var ModelUtils_1 = require("./ModelUtils");
var ModelManipulator = (function () {
    function ModelManipulator(model, routingModel, permissionsProvider) {
        this.onModelChanged = new Utils_1.EventDispatcher();
        this.onModelSizeChanged = new Utils_1.EventDispatcher();
        this.initializeCore(model, routingModel);
        this.permissionsProvider = permissionsProvider;
        this.imageLoader = new ImageLoader_1.ImageLoader(this.updateShapeImage.bind(this));
    }
    ModelManipulator.prototype.initialize = function (model, routingModel) {
        this.initializeCore(model, routingModel);
        this.model.loadAllImages(this.imageLoader);
        this.updateModelSize();
    };
    ModelManipulator.prototype.initializeCore = function (model, routingModel) {
        var _this = this;
        this.model = model;
        this.routingModel = routingModel;
        if (this.routingModel) {
            this.routingModel.initialize(model);
            model.iterateItems(function (item) {
                if (item instanceof Connector_1.Connector) {
                    var routingStrategy = _this.routingModel.createStrategy(item.properties.lineOption);
                    if (routingStrategy)
                        item.changeRoutingStrategy(routingStrategy);
                    else
                        item.invalidateRenderPoints();
                }
            });
        }
    };
    ModelManipulator.prototype.commitPageChanges = function () {
        this.raisePageSizeChanged(this.model.pageSize.clone(), this.model.pageLandscape);
        this.raiseModelSizeChanged(this.model.size.clone());
        this.raisePageColorChanged(this.model.pageColor);
        this.raiseModelRectangleChanged(ModelUtils_1.ModelUtils.createRectangle(this.model.items));
    };
    ModelManipulator.prototype.commitItemsCreateChanges = function () {
        Diagnostics_1.Diagnostics.timer("new model: model changes");
        this.commitItemsChangesCore(ModelChange_1.ItemChangeType.Create, this.model.items);
        Diagnostics_1.Diagnostics.endTimer();
    };
    ModelManipulator.prototype.commitItemUpdateChanges = function (item) {
        this.commitItemsChangesCore(ModelChange_1.ItemChangeType.UpdateStructure, [item]);
    };
    ModelManipulator.prototype.commitItemsChangesCore = function (changeType, items) {
        var changes = [];
        items.forEach(function (item) {
            changes.push(new ModelChange_1.ItemChange(item, changeType));
        });
        if (changes.length)
            this.raiseModelChanged(changes);
    };
    ModelManipulator.prototype.insertToContainer = function (item, container) {
        if (item.container && container && item.container.key !== container.key)
            throw Error("To insert an item to a container it's necessary to remove it from the current container.");
        if (container) {
            if (container.children.indexOf(item) === -1)
                container.children.push(item);
            item.container = container;
            this.raiseModelChanged([new ModelChange_1.ItemChange(item, ModelChange_1.ItemChangeType.Update)]);
        }
    };
    ModelManipulator.prototype.removeFromContainer = function (item) {
        if (item.container) {
            var index = item.container.children.indexOf(item);
            item.container.children.splice(index, 1);
            item.container = undefined;
            this.raiseModelChanged([new ModelChange_1.ItemChange(item, ModelChange_1.ItemChangeType.Update)]);
        }
    };
    ModelManipulator.prototype.changeStyle = function (item, styleProperty, styleValue) {
        this.changeStyleCore(item, item.style, styleProperty, styleValue);
    };
    ModelManipulator.prototype.changeStyleText = function (item, styleProperty, styleValue) {
        this.changeStyleCore(item, item.styleText, styleProperty, styleValue);
    };
    ModelManipulator.prototype.changeStyleCore = function (item, styleObj, styleProperty, styleValue) {
        if (styleValue !== undefined)
            styleObj[styleProperty] = styleValue;
        else
            delete styleObj[styleProperty];
        this.raiseModelChanged([new ModelChange_1.ItemChange(item, ModelChange_1.ItemChangeType.UpdateProperties)]);
    };
    ModelManipulator.prototype.changeZIndex = function (item, zIndex) {
        item.zIndex = zIndex;
        this.raiseModelChanged([new ModelChange_1.ItemChange(item, ModelChange_1.ItemChangeType.Update)]);
    };
    ModelManipulator.prototype.changeLocked = function (item, locked) {
        item.locked = locked;
        this.raiseModelChanged([new ModelChange_1.ItemChange(item, ModelChange_1.ItemChangeType.UpdateClassName)]);
    };
    ModelManipulator.prototype.changeCustomData = function (item, data) {
        item.customData = Utils_1.ObjectUtils.cloneObject(data);
        this.raiseModelChanged([new ModelChange_1.ItemChange(item, ModelChange_1.ItemChangeType.UpdateStructure)]);
    };
    ModelManipulator.prototype.addShape = function (shape, key) {
        if (shape.attachedConnectors.length)
            throw Error("A creating shape should not contain existing connectors.");
        shape.key = key !== undefined ? key : this.model.getNextKey();
        return this.insertShape(shape);
    };
    ModelManipulator.prototype.insertShape = function (shape) {
        this.model.pushItem(shape);
        var allowed = this.permissionsProvider.canAddItems([shape]);
        this.raiseModelChanged([new ModelChange_1.ItemChange(shape, ModelChange_1.ItemChangeType.Create, allowed)]);
        this.model.loadAllImages(this.imageLoader);
        return shape;
    };
    ModelManipulator.prototype.resizeShape = function (shape, position, size) {
        shape.position = position;
        shape.size = size;
        var allowed = this.permissionsProvider.isStoredPermissionsGranted();
        var resizeInteractingItem = this.getInteractingItem(shape, ModelOperationSettings_1.DiagramModelOperation.ResizeShape);
        if (resizeInteractingItem) {
            var oldSize = resizeInteractingItem.size.clone();
            var size_2 = shape.size.clone();
            if (!size_2.equals(oldSize))
                allowed = this.permissionsProvider.canResizeShapes([{ shape: shape, size: size_2, oldSize: oldSize }]);
        }
        var moveInteractingItem = this.getInteractingItem(shape, ModelOperationSettings_1.DiagramModelOperation.MoveShape);
        if (moveInteractingItem) {
            var oldPosition = moveInteractingItem.position.clone();
            var position_1 = shape.position.clone();
            if (!position_1.equals(oldPosition))
                allowed = this.permissionsProvider.canMoveShapes([{ shape: shape, position: position_1, oldPosition: oldPosition }]);
        }
        this.raiseModelChanged([new ModelChange_1.ItemChange(shape, ModelChange_1.ItemChangeType.UpdateProperties, allowed)]);
    };
    ModelManipulator.prototype.moveShape = function (shape, position) {
        shape.position = position;
        var allowed = this.permissionsProvider.isStoredPermissionsGranted();
        var addInteractingItem = this.getInteractingItem(shape, ModelOperationSettings_1.DiagramModelOperation.AddShape);
        if (addInteractingItem)
            allowed = this.permissionsProvider.canAddItems([shape]);
        var moveInteractingItem = this.getInteractingItem(shape, ModelOperationSettings_1.DiagramModelOperation.MoveShape);
        if (moveInteractingItem) {
            var oldPosition = moveInteractingItem.position.clone();
            var position_2 = shape.position.clone();
            if (!position_2.equals(oldPosition))
                allowed = this.permissionsProvider.canMoveShapes([{ shape: shape, position: position_2, oldPosition: oldPosition }]);
        }
        this.raiseModelChanged([new ModelChange_1.ItemChange(shape, ModelChange_1.ItemChangeType.UpdateProperties, allowed)]);
    };
    ModelManipulator.prototype.changeShapeParameters = function (shape, parameters) {
        shape.parameters.forEach(function (p) {
            var parameter = parameters.get(p.key);
            if (parameter)
                p.value = parameter.value;
        });
        this.raiseModelChanged([new ModelChange_1.ItemChange(shape, ModelChange_1.ItemChangeType.UpdateProperties)]);
    };
    ModelManipulator.prototype.changeShapeText = function (shape, text) {
        shape.text = text;
        this.raiseModelChanged([new ModelChange_1.ItemChange(shape, ModelChange_1.ItemChangeType.UpdateStructure)]);
    };
    ModelManipulator.prototype.changeShapeImage = function (shape, image) {
        shape.image = image;
        var cachedImage = ImageCache_1.ImageCache.instance.createUnloadedInfoByShapeImageInfo(image);
        this.imageLoader.load(cachedImage);
        this.raiseModelChanged([new ModelChange_1.ItemChange(shape, ModelChange_1.ItemChangeType.UpdateStructure)]);
    };
    ModelManipulator.prototype.changeShapeExpanded = function (shape, expanded) {
        shape.expanded = expanded;
        shape.toggleExpandedSize();
        this.raiseModelChanged([new ModelChange_1.ItemChange(shape, ModelChange_1.ItemChangeType.UpdateStructure)]);
    };
    ModelManipulator.prototype.deleteShape = function (shape, allowed) {
        if (shape.attachedConnectors.length)
            throw Error("A removing shape should not contain existing connectors.");
        this.removeShape(shape, allowed);
    };
    ModelManipulator.prototype.removeShape = function (shape, allowed) {
        this.model.removeItem(shape);
        this.raiseModelChanged([new ModelChange_1.ItemChange(shape, ModelChange_1.ItemChangeType.Remove, allowed)]);
    };
    ModelManipulator.prototype.updateShapeImage = function (cacheImageInfo) {
        if (!cacheImageInfo.imageUrl)
            return;
        var shapes = this.model.findShapesByImageUrl(cacheImageInfo.imageUrl);
        shapes.forEach(function (shape) {
            if (cacheImageInfo.base64)
                shape.image.loadBase64Content(cacheImageInfo.base64);
            else
                shape.image.setUnableToLoadFlag();
        });
        this.commitItemsChangesCore(ModelChange_1.ItemChangeType.UpdateStructure, shapes);
    };
    ModelManipulator.prototype.updateShapeDescription = function (description) {
        var shapes = this.model.findShapesByDescription(description);
        this.commitItemsChangesCore(ModelChange_1.ItemChangeType.UpdateProperties, shapes);
    };
    ModelManipulator.prototype.addConnector = function (connector, key) {
        if (connector.beginItem || connector.endItem)
            throw Error("Creating connector should not contain begin/end items");
        connector.key = key !== undefined ? key : this.model.getNextKey();
        return this.insertConnector(connector);
    };
    ModelManipulator.prototype.insertConnector = function (connector) {
        this.model.pushItem(connector);
        var routingStrategy = this.routingModel.createStrategy(connector.properties.lineOption);
        if (routingStrategy)
            connector.changeRoutingStrategy(routingStrategy);
        else
            connector.clearRoutingStrategy();
        var allowed = this.permissionsProvider.canAddItems([connector]);
        this.raiseModelChanged([new ModelChange_1.ItemChange(connector, ModelChange_1.ItemChangeType.Create, allowed)]);
        return connector;
    };
    ModelManipulator.prototype.deleteConnector = function (connector) {
        if (connector.beginItem || connector.endItem)
            throw Error("Creating connector should not contain begin/end items");
        this.removeConnector(connector);
    };
    ModelManipulator.prototype.removeConnector = function (connector) {
        this.model.removeItem(connector);
        var allowed = this.permissionsProvider.canDeleteItems([connector]);
        this.raiseModelChanged([new ModelChange_1.ItemChange(connector, ModelChange_1.ItemChangeType.Remove, allowed)]);
    };
    ModelManipulator.prototype.addDeleteConnectorPoint = function (connector, callBack) {
        var oldConnectorPoints = this.getConnectorInteractingPoints(connector);
        callBack(connector);
        this.addDeleteConnectorPointCore(connector, oldConnectorPoints);
    };
    ModelManipulator.prototype.moveConnectorPoint = function (connector, pointIndex, callBack) {
        callBack(connector);
        this.moveConnectorPointCore(connector, pointIndex);
    };
    ModelManipulator.prototype.changeConnectorPoints = function (connector, callBack) {
        var _this = this;
        callBack(connector);
        connector.points.forEach(function (_, i) { return _this.moveConnectorPointCore(connector, i); });
    };
    ModelManipulator.prototype.moveConnectorPointCore = function (connector, pointIndex) {
        var interactingItem = this.getInteractingItem(connector);
        var allowed = this.permissionsProvider.isStoredPermissionsGranted();
        if (interactingItem) {
            var changeConnectionPoints = (0 < pointIndex && pointIndex < connector.points.length - 1);
            changeConnectionPoints = changeConnectionPoints || (pointIndex === 0 && !connector.beginItem);
            changeConnectionPoints = changeConnectionPoints || (pointIndex === connector.points.length - 1 && !connector.endItem);
            if (changeConnectionPoints) {
                var oldConnectorPoints = interactingItem.points.map(function (p) { return p.clone(); });
                var newConnectorPoints = connector.points.map(function (p) { return p.clone(); });
                if (!Utils_1.GeometryUtils.arePointsEqual(oldConnectorPoints, newConnectorPoints))
                    allowed = this.permissionsProvider.canChangeConnectorPoints(connector, oldConnectorPoints, newConnectorPoints);
            }
        }
        this.raiseModelChanged([new ModelChange_1.ItemChange(connector, ModelChange_1.ItemChangeType.UpdateProperties, allowed)]);
    };
    ModelManipulator.prototype.getConnectorInteractingPoints = function (connector) {
        var interactingItem = this.getInteractingItem(connector);
        return interactingItem ? interactingItem.points.map(function (p) { return p.clone(); }) : connector.points.map(function (p) { return p.clone(); });
    };
    ModelManipulator.prototype.addDeleteConnectorPointCore = function (connector, oldConnectorPoints) {
        var allowed = this.permissionsProvider.isStoredPermissionsGranted();
        var newConnectorPoints = connector.points.map(function (p) { return p.clone(); });
        if (!Utils_1.GeometryUtils.arePointsEqual(oldConnectorPoints, newConnectorPoints))
            allowed = this.permissionsProvider.canChangeConnectorPoints(connector, oldConnectorPoints, newConnectorPoints);
        this.raiseModelChanged([new ModelChange_1.ItemChange(connector, ModelChange_1.ItemChangeType.UpdateProperties, allowed)]);
    };
    ModelManipulator.prototype.addConnection = function (connector, item, connectionPointIndex, position) {
        var existingItem = connector.getExtremeItem(position);
        var existingConnectionPointIndex = connector.getExtremeConnectionPointIndex(position);
        if (existingItem === item && existingConnectionPointIndex === connectionPointIndex)
            return;
        else if (existingItem)
            throw Error("Connector is already connected");
        item.attachedConnectors.push(connector);
        if (position === Connector_1.ConnectorPosition.Begin) {
            connector.beginItem = item;
            connector.beginConnectionPointIndex = connectionPointIndex;
        }
        else {
            connector.endItem = item;
            connector.endConnectionPointIndex = connectionPointIndex;
        }
        connector.invalidateRenderPoints();
        var allowed = this.permissionsProvider.canChangeConnection(connector, item, undefined, position, connectionPointIndex);
        this.raiseModelChanged([new ModelChange_1.ItemChange(connector, ModelChange_1.ItemChangeType.UpdateProperties, allowed)]);
    };
    ModelManipulator.prototype.setConnectionPointIndex = function (connector, connectionPointIndex, position) {
        if (!connector.getExtremeItem(position))
            throw Error("Connection should be connected");
        if (position === Connector_1.ConnectorPosition.Begin)
            connector.beginConnectionPointIndex = connectionPointIndex;
        else
            connector.endConnectionPointIndex = connectionPointIndex;
        connector.invalidateRenderPoints();
        var item = connector.getExtremeItem(position);
        var allowed = this.permissionsProvider.canChangeConnection(connector, item, item, position, connectionPointIndex);
        this.raiseModelChanged([new ModelChange_1.ItemChange(connector, ModelChange_1.ItemChangeType.UpdateProperties, allowed)]);
    };
    ModelManipulator.prototype.deleteConnection = function (connector, position) {
        var item = connector.getExtremeItem(position);
        if (!item)
            return;
        item.attachedConnectors.splice(item.attachedConnectors.indexOf(connector), 1);
        if (position === Connector_1.ConnectorPosition.Begin) {
            connector.beginItem = null;
            connector.beginConnectionPointIndex = -1;
        }
        else {
            connector.endItem = null;
            connector.endConnectionPointIndex = -1;
        }
        connector.invalidateRenderPoints();
        var allowed = this.permissionsProvider.canChangeConnection(connector, undefined, item, position, -1);
        this.raiseModelChanged([new ModelChange_1.ItemChange(connector, ModelChange_1.ItemChangeType.UpdateProperties, allowed)]);
    };
    ModelManipulator.prototype.changeConnectorProperty = function (connector, propertyName, value) {
        connector.properties[propertyName] = value;
        if (propertyName === "lineOption") {
            var routingStrategy = this.routingModel ? this.routingModel.createStrategy(connector.properties.lineOption) : undefined;
            if (routingStrategy)
                connector.changeRoutingStrategy(routingStrategy);
            else
                connector.clearRoutingStrategy();
        }
        else
            connector.invalidateRenderPoints();
        this.raiseModelChanged([new ModelChange_1.ItemChange(connector, ModelChange_1.ItemChangeType.UpdateProperties)]);
    };
    ModelManipulator.prototype.changeConnectorText = function (connector, text, position) {
        connector.setText(text, position);
        this.raiseModelChanged([new ModelChange_1.ItemChange(connector, ModelChange_1.ItemChangeType.UpdateStructure)]);
    };
    ModelManipulator.prototype.changeConnectorTextPosition = function (connector, position, newPosition) {
        var text = connector.getText(position);
        connector.setText(null, position);
        connector.setText(text, newPosition);
        this.raiseModelChanged([new ModelChange_1.ItemChange(connector, ModelChange_1.ItemChangeType.UpdateProperties)]);
    };
    ModelManipulator.prototype.changeModelSize = function (size, offset) {
        this.model.size.width = size.width;
        this.model.size.height = size.height;
        this.raiseModelSizeChanged(this.model.size.clone(), offset);
        if (offset.left || offset.top) {
            this.model.snapStartPoint = this.model.snapStartPoint.clone().offset(offset.left, offset.top);
            this.raiseSnapPointChange(this.model.snapStartPoint);
        }
    };
    ModelManipulator.prototype.changePageSize = function (value) {
        if (!this.model.pageSize.equals(value)) {
            this.model.pageSize = value;
            this.model.size = new size_1.Size(this.model.pageWidth, this.model.pageHeight);
            this.raiseModelSizeChanged(this.model.size.clone());
            this.raisePageSizeChanged(this.model.pageSize, this.model.pageLandscape);
        }
    };
    ModelManipulator.prototype.changePageLandscape = function (value) {
        if (this.model.pageLandscape !== value) {
            this.model.pageLandscape = value;
            if (this.model.pageSize.width !== this.model.pageSize.height) {
                this.model.size = new size_1.Size(this.model.pageWidth, this.model.pageHeight);
                this.raiseModelSizeChanged(this.model.size.clone());
                this.raisePageSizeChanged(this.model.pageSize, this.model.pageLandscape);
            }
        }
    };
    ModelManipulator.prototype.changePageColor = function (value) {
        if (this.model.pageColor !== value) {
            this.model.pageColor = value;
            this.raisePageColorChanged(value);
        }
    };
    ModelManipulator.prototype.updateModelSize = function () {
        var offset = this.getModelSizeUpdateOffset();
        if (!offset.isEmpty()) {
            var newWidth = Math.max(this.model.size.width + offset.left + offset.right, this.model.pageWidth);
            var newHeight = Math.max(this.model.size.height + offset.top + offset.bottom, this.model.pageHeight);
            this.model.size = new size_1.Size(newWidth, newHeight);
        }
    };
    ModelManipulator.prototype.getModelSizeUpdateOffset = function () {
        var oldRectangle = this.model.getRectangle(false);
        var newRectangle = this.model.getRectangle(true);
        if (!newRectangle.equals(oldRectangle))
            this.raiseModelRectangleChanged(newRectangle);
        return this.createModelRectangleOffset(newRectangle);
    };
    ModelManipulator.prototype.createModelRectangleOffset = function (rectangle) {
        var pageWidth = this.model.pageWidth;
        var pageHeight = this.model.pageHeight;
        var size = this.model.size;
        return new offsets_1.Offsets(-Math.floor(rectangle.x / pageWidth) * pageWidth, -Math.floor((size.width - rectangle.right) / pageWidth) * pageWidth, -Math.floor(rectangle.y / pageHeight) * this.model.pageHeight, -Math.floor((size.height - rectangle.bottom) / pageHeight) * pageHeight);
    };
    ModelManipulator.prototype.raiseModelChanged = function (changes) {
        this.onModelChanged.raise1(function (l) { return l.notifyModelChanged(changes); });
    };
    ModelManipulator.prototype.raisePageColorChanged = function (color) {
        this.onModelChanged.raise1(function (l) { return l.notifyPageColorChanged(color); });
    };
    ModelManipulator.prototype.raisePageSizeChanged = function (pageSize, pageLandscape) {
        this.onModelChanged.raise1(function (l) { return l.notifyPageSizeChanged(pageSize, pageLandscape); });
    };
    ModelManipulator.prototype.raiseModelSizeChanged = function (size, offset) {
        this.onModelSizeChanged.raise1(function (l) { return l.notifyModelSizeChanged(size, offset); });
    };
    ModelManipulator.prototype.raiseModelRectangleChanged = function (rectangle) {
        this.onModelSizeChanged.raise1(function (l) { return l.notifyModelRectangleChanged(rectangle); });
    };
    ModelManipulator.prototype.raiseSnapPointChange = function (point) {
        this.onModelSizeChanged.raise1(function (l) { return l.notifySnapPointPositionChanged(point); });
    };
    ModelManipulator.prototype.getInteractingItem = function (item, operation) {
        return this.permissionsProvider.getInteractingItem(item, operation);
    };
    return ModelManipulator;
}());
exports.ModelManipulator = ModelManipulator;
//# sourceMappingURL=ModelManipulator.js.map