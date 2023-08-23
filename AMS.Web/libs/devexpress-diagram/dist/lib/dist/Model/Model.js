"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagramModel = void 0;
var Shape_1 = require("./Shapes/Shape");
var Connector_1 = require("./Connectors/Connector");
var Utils_1 = require("../Utils");
var rectangle_1 = require("@devexpress/utils/lib/geometry/rectangle");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var ImageCache_1 = require("../Images/ImageCache");
var color_1 = require("@devexpress/utils/lib/utils/color");
var Enums_1 = require("../Enums");
var ModelUtils_1 = require("./ModelUtils");
var DiagramModel = (function () {
    function DiagramModel(pageSize) {
        if (pageSize === void 0) { pageSize = new size_1.Size(8391, 11906); }
        this.items = [];
        this.itemIndexByKey = {};
        this.keyCounter = 0;
        this.pageSize = new size_1.Size(8391, 11906);
        this.pageLandscape = false;
        this.pageColor = DiagramModel.defaultPageColor;
        this.units = Enums_1.DiagramUnit.In;
        this.snapStartPoint = new point_1.Point(0, 0);
        this.pageSize = pageSize;
        this.size = this.pageSize.clone();
        this.rectangle = rectangle_1.Rectangle.fromGeometry(new point_1.Point(0, 0), new size_1.Size(0, 0));
        this.initializeKeyCounter();
    }
    Object.defineProperty(DiagramModel.prototype, "pageWidth", {
        get: function () {
            return this.pageLandscape ? this.pageSize.height : this.pageSize.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramModel.prototype, "pageHeight", {
        get: function () {
            return this.pageLandscape ? this.pageSize.width : this.pageSize.height;
        },
        enumerable: false,
        configurable: true
    });
    DiagramModel.prototype.getRectangle = function (forceUpdate) {
        if (forceUpdate)
            this.rectangle = ModelUtils_1.ModelUtils.createRectangle(this.items);
        return this.rectangle;
    };
    DiagramModel.prototype.pushItem = function (item) {
        var index = this.items.push(item);
        this.itemIndexByKey[item.key] = index - 1;
        if (item instanceof Shape_1.Shape && !item.image.isEmpty)
            this.cacheShapeImage(item);
    };
    DiagramModel.prototype.removeItem = function (item) {
        var index = this.getItemIndex(item);
        delete this.itemIndexByKey[item.key];
        this.items.splice(index, 1);
        this.updateIndicesHash(index);
    };
    DiagramModel.prototype.updateIndicesHash = function (startIndex) {
        for (var i = startIndex; i < this.items.length; i++)
            this.itemIndexByKey[this.items[i].key] = i;
    };
    DiagramModel.prototype.getItemIndex = function (item) {
        return this.itemIndexByKey[item.key];
    };
    DiagramModel.prototype.findShape = function (key) {
        var shape = this.findItem(key);
        return shape instanceof Shape_1.Shape ? shape : undefined;
    };
    DiagramModel.prototype.findShapesCore = function (callback) {
        var shapes = [];
        this.items.forEach(function (item) {
            if (item instanceof Shape_1.Shape)
                if (callback(item)) {
                    shapes.push(item);
                    return;
                }
        });
        return shapes;
    };
    DiagramModel.prototype.findShapeCore = function (callback) {
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item instanceof Shape_1.Shape)
                if (callback(item))
                    return item;
        }
    };
    DiagramModel.prototype.findShapeAtPosition = function (position) {
        return this.findShapeCore(function (shape) { return shape.position.equals(position); });
    };
    DiagramModel.prototype.findShapeByDataKey = function (key) {
        return this.findShapeCore(function (shape) { return shape.dataKey === key; });
    };
    DiagramModel.prototype.findShapesByImageUrl = function (imageUrl) {
        return this.findShapesCore(function (shape) { return shape.image.url === imageUrl; });
    };
    DiagramModel.prototype.findShapesByDescription = function (description) {
        return this.findShapesCore(function (shape) { return shape.description.key === description.key; });
    };
    DiagramModel.prototype.cacheShapeImage = function (shape) {
        var cacheImageInfo = ImageCache_1.ImageCache.instance.createUnloadedInfoByShapeImageInfo(shape.image);
        if (cacheImageInfo.isLoaded)
            shape.image.loadBase64Content(cacheImageInfo.base64);
    };
    DiagramModel.prototype.loadAllImages = function (imageLoader) {
        ImageCache_1.ImageCache.instance.loadAllImages(imageLoader);
    };
    DiagramModel.prototype.findContainer = function (key) {
        var shape = this.findShape(key);
        return shape && shape.enableChildren ? shape : undefined;
    };
    DiagramModel.prototype.findNearestContainer = function (key) {
        var shape = this.findShape(key);
        if (shape)
            return shape.enableChildren ? shape : shape.container;
        else
            return undefined;
    };
    DiagramModel.prototype.getChildren = function (container) {
        var _this = this;
        return container.children.map(function (child) { return _this.findItem(child.key); }).filter(function (item) { return item; });
    };
    DiagramModel.prototype.findChild = function (container, key, recursive) {
        var _this = this;
        if (recursive === void 0) { recursive = true; }
        var result;
        container.children.forEach(function (child) {
            if (result)
                return;
            if (child.key === key) {
                result = child;
                return;
            }
            if (recursive && child instanceof Shape_1.Shape) {
                result = _this.findChild(child, key, recursive);
                if (result)
                    return;
            }
        });
        return result;
    };
    DiagramModel.prototype.findItemContainerCore = function (item, callback) {
        var container = item.container;
        while (container) {
            if (!callback || callback(container))
                break;
            container = container.container;
        }
        return container;
    };
    DiagramModel.prototype.findItemContainer = function (item) {
        return this.findItemContainerCore(item);
    };
    DiagramModel.prototype.findItemCollapsedContainer = function (item) {
        return this.findItemContainerCore(item, function (c) { return !c.expanded; });
    };
    DiagramModel.prototype.findItemTopCollapsedContainer = function (item) {
        var container = item.container;
        var collapsedContainer;
        while (container) {
            if (!container.expanded)
                collapsedContainer = container;
            container = container.container;
        }
        return collapsedContainer;
    };
    DiagramModel.prototype.isContainerItem = function (container, item) {
        return this.findItemContainerCore(item, function (c) { return c.key === container.key; }) !== undefined;
    };
    DiagramModel.prototype.findConnector = function (key) {
        var connector = this.findItem(key);
        return connector instanceof Connector_1.Connector ? connector : undefined;
    };
    DiagramModel.prototype.findConnectorCore = function (callback) {
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item instanceof Connector_1.Connector)
                if (callback(item))
                    return item;
        }
    };
    DiagramModel.prototype.findConnectorAtPoints = function (points) {
        return this.findConnectorCore(function (connector) { return Utils_1.GeometryUtils.arePointsEqual(connector.points, points); });
    };
    DiagramModel.prototype.findConnectorByDataKey = function (key) {
        return this.findConnectorCore(function (connector) { return connector.dataKey === key; });
    };
    DiagramModel.prototype.findConnectorByBeginEndDataKeys = function (beginDataKey, endDataKey) {
        return this.findConnectorCore(function (connector) { return (connector.beginItem && connector.beginItem.dataKey === beginDataKey) &&
            (connector.endItem && connector.endItem.dataKey === endDataKey); });
    };
    DiagramModel.prototype.findConnectorsCore = function (callback) {
        var result = [];
        this.items.forEach(function (item) {
            if (item instanceof Connector_1.Connector)
                if (callback(item)) {
                    result.push(item);
                    return;
                }
        });
        return result;
    };
    DiagramModel.prototype.findConnectorsWithoutBeginItem = function () {
        return this.findConnectorsCore(function (connector) { return !connector.beginItem; });
    };
    DiagramModel.prototype.findConnectorsWithoutEndItem = function () {
        return this.findConnectorsCore(function (connector) { return !connector.endItem; });
    };
    DiagramModel.prototype.findItem = function (key) {
        return this.items[this.itemIndexByKey[key]];
    };
    DiagramModel.prototype.findItemByDataKey = function (key) {
        return this.findItemCore(function (item) { return item.dataKey === key; });
    };
    DiagramModel.prototype.findItemCore = function (callback) {
        for (var i = 0; i < this.items.length; i++)
            if (callback(this.items[i]))
                return this.items[i];
    };
    DiagramModel.isIntersectedItems = function (item1, item2) {
        var result = false;
        if (item1 instanceof Shape_1.Shape)
            result = item2.intersectedByRect(item1.rectangle);
        else if (item1 instanceof Connector_1.Connector)
            item1.getSegments().forEach(function (s1) {
                if (item2 instanceof Shape_1.Shape)
                    result = result || s1.isIntersectedByRect(item2.rectangle);
                else if (item2 instanceof Connector_1.Connector)
                    item2.getSegments().forEach(function (s2) {
                        result = result || s1.isIntersected(s2);
                    });
            });
        return result;
    };
    DiagramModel.prototype.getIntersectItems = function (item) {
        var result = [];
        this.items.forEach(function (i) {
            if (i.container !== item.container)
                return;
            if (item !== i && (!(i instanceof Connector_1.Connector) || item.attachedConnectors.indexOf(i) === -1) &&
                DiagramModel.isIntersectedItems(i, item))
                result.push(i);
        });
        return result;
    };
    DiagramModel.prototype.getIntersectItemsMinZIndex = function (item) {
        var items = this.getIntersectItems(item);
        return items.map(function (i) { return i.zIndex; }).reduce(function (prev, cur) { return Math.min(prev, cur); }, Number.MAX_VALUE);
    };
    DiagramModel.prototype.getIntersectItemsMaxZIndex = function (item) {
        var items = this.getIntersectItems(item);
        return items.map(function (i) { return i.zIndex; }).reduce(function (prev, cur) { return Math.max(prev, cur); }, -Number.MAX_VALUE);
    };
    DiagramModel.prototype.iterateItems = function (callback) {
        this.items.forEach(callback);
    };
    DiagramModel.prototype.getNextKey = function () {
        return (this.keyCounter++).toString();
    };
    DiagramModel.prototype.initializeKeyCounter = function () {
        this.keyCounter = this.items.reduce(function (prev, cur) {
            var num = parseInt(cur.key);
            return Math.max(prev, isNaN(num) ? 0 : num + 1);
        }, this.items.length);
    };
    DiagramModel.defaultPageColor = color_1.ColorUtils.LIGHT_COLOR;
    return DiagramModel;
}());
exports.DiagramModel = DiagramModel;
//# sourceMappingURL=Model.js.map