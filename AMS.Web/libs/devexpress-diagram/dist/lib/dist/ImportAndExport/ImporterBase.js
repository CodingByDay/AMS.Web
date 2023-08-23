"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImporterBase = void 0;
var Model_1 = require("../Model/Model");
var Shape_1 = require("../Model/Shapes/Shape");
var ImporterBase = (function () {
    function ImporterBase(shapeDescriptionManager) {
        this.shapeDescriptionManager = shapeDescriptionManager;
    }
    ImporterBase.prototype.import = function () {
        var model = new Model_1.DiagramModel();
        var obj = this.getObject();
        this.importPageSettings(model, this.getPageObject(obj));
        var shapes = this.importShapes(this.getShapeObjects(obj));
        for (var i = 0; i < shapes.length; i++) {
            var shape = shapes[i];
            if (model.findItem(shape.key))
                throw Error("Item key is duplicated");
            model.pushItem(shape);
        }
        var connectors = this.importConnectors(this.getConnectorObjects(obj));
        for (var i = 0; i < connectors.length; i++) {
            var connector = connectors[i];
            connector.endItem = model.findItem(connector["endItemKey"]) || undefined;
            delete connector["endItemKey"];
            connector.beginItem = model.findItem(connector["beginItemKey"]) || undefined;
            delete connector["beginItemKey"];
            if (model.findItem(connector.key))
                throw Error("Item key is duplicated");
            model.pushItem(connector);
            this.updateConnections(connector);
        }
        this.updateChildren(model.items, function (key) { return model.findItem(key); });
        return model;
    };
    ImporterBase.prototype.importItems = function (model) {
        var result = [];
        var obj = this.getObject();
        var itemHash = {};
        var shapes = this.importShapes(this.getShapeObjects(obj));
        var key;
        for (var i = 0; i < shapes.length; i++) {
            var shape = shapes[i];
            var oldKey = shape.key;
            key = model.getNextKey();
            shape.key = key;
            itemHash[oldKey] = shape;
            if (shape.dataKey !== undefined)
                shape.dataKey = undefined;
            result.push(shape);
        }
        var connectors = this.importConnectors(this.getConnectorObjects(obj));
        for (var i = 0; i < connectors.length; i++) {
            var connector = connectors[i];
            var oldKey = connector.key;
            key = model.getNextKey();
            connector.key = key;
            itemHash[oldKey] = connector;
            if (connector.dataKey !== undefined)
                connector.dataKey = undefined;
            var endItemKey = connector["endItemKey"];
            connector.endItem = itemHash[endItemKey];
            delete connector["endItemKey"];
            var beginItemKey = connector["beginItemKey"];
            connector.beginItem = itemHash[beginItemKey];
            delete connector["beginItemKey"];
            result.push(connector);
            this.updateConnections(connector);
        }
        this.updateChildren(result, function (key) { return itemHash[key]; });
        return result;
    };
    ImporterBase.prototype.importItemsData = function (model) {
        var obj = this.getObject();
        var shapes = this.importShapes(this.getShapeObjects(obj));
        var shapeDataKeys = {};
        for (var i = 0; i < shapes.length; i++) {
            var srcShape = shapes[i];
            var destShape = void 0;
            if (srcShape.dataKey !== undefined)
                destShape = model.findShapeByDataKey(srcShape.dataKey);
            if (destShape) {
                destShape.dataKey = srcShape.dataKey;
                shapeDataKeys[srcShape.key] = srcShape.dataKey;
                destShape.locked = srcShape.locked;
                destShape.position = srcShape.position.clone();
                destShape.expanded = srcShape.expanded;
                if (srcShape.expandedSize)
                    destShape.expandedSize = srcShape.expandedSize.clone();
                destShape.size = srcShape.size.clone();
                destShape.parameters = srcShape.parameters.clone();
                destShape.style = srcShape.style.clone();
                destShape.styleText = srcShape.styleText.clone();
                destShape.zIndex = srcShape.zIndex;
                destShape.text = srcShape.text;
                destShape.description = srcShape.description;
                destShape.image = srcShape.image.clone();
            }
        }
        var connectors = this.importConnectors(this.getConnectorObjects(obj));
        for (var i = 0; i < connectors.length; i++) {
            var srcConnector = connectors[i];
            var destConnector = void 0;
            if (srcConnector.dataKey !== undefined)
                destConnector = model.findConnectorByDataKey(srcConnector.dataKey);
            if (!destConnector)
                destConnector = model.findConnectorByBeginEndDataKeys(shapeDataKeys[srcConnector["beginItemKey"]], shapeDataKeys[srcConnector["endItemKey"]]);
            if (destConnector) {
                destConnector.dataKey = srcConnector.dataKey;
                destConnector.locked = srcConnector.locked;
                destConnector.points = srcConnector.points.slice();
                destConnector.properties = srcConnector.properties.clone();
                destConnector.style = srcConnector.style.clone();
                destConnector.endConnectionPointIndex = srcConnector.endConnectionPointIndex;
                destConnector.beginConnectionPointIndex = srcConnector.beginConnectionPointIndex;
                destConnector.texts = srcConnector.texts.clone();
                destConnector.styleText = srcConnector.styleText.clone();
                destConnector.zIndex = srcConnector.zIndex;
            }
        }
    };
    ImporterBase.prototype.importShapes = function (shapeObjs) {
        var result = [];
        if (!shapeObjs)
            return result;
        if (!Array.isArray(shapeObjs))
            throw Error("Invalid Format");
        for (var i = 0; i < shapeObjs.length; i++) {
            var shapeObj = shapeObjs[i];
            var shape = this.importShape(shapeObj);
            result.push(shape);
            result = result.concat(this.importShapeChildren(shapeObj, shape));
        }
        return result;
    };
    ImporterBase.prototype.importConnectors = function (connectorObjs) {
        var result = [];
        if (!connectorObjs)
            return result;
        if (!Array.isArray(connectorObjs))
            throw Error("Invalid Format");
        for (var i = 0; i < connectorObjs.length; i++) {
            var shapeObj = connectorObjs[i];
            result.push(this.importConnector(shapeObj));
        }
        return result;
    };
    ImporterBase.prototype.updateChildren = function (items, findItem) {
        items.forEach(function (item) {
            if (item instanceof Shape_1.Shape && item["childKeys"]) {
                item["childKeys"].forEach(function (childKey) {
                    var child = findItem(childKey);
                    if (child) {
                        if (item.children.indexOf(child) === -1)
                            item.children.push(child);
                        child.container = item;
                    }
                });
                delete item["childKeys"];
            }
        });
    };
    ImporterBase.prototype.updateConnections = function (connector) {
        if (connector.endItem)
            if (connector.endItem instanceof Shape_1.Shape) {
                connector.endItem.attachedConnectors.push(connector);
                connector.points[connector.points.length - 1] = connector.endItem.getConnectionPointPosition(connector.endConnectionPointIndex, connector.points[connector.points.length - 2]);
            }
            else {
                connector.endItem = undefined;
                connector.endConnectionPointIndex = -1;
            }
        if (connector.beginItem)
            if (connector.beginItem instanceof Shape_1.Shape) {
                connector.beginItem.attachedConnectors.push(connector);
                connector.points[0] = connector.beginItem.getConnectionPointPosition(connector.beginConnectionPointIndex, connector.points[1]);
            }
            else {
                connector.beginItem = undefined;
                connector.beginConnectionPointIndex = -1;
            }
    };
    ImporterBase.prototype.assert = function (value, type) {
        if (value === undefined)
            throw Error("Invalid Format");
        if (type !== undefined && typeof value !== type)
            throw Error("Invalid Format");
    };
    return ImporterBase;
}());
exports.ImporterBase = ImporterBase;
//# sourceMappingURL=ImporterBase.js.map