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
exports.CanvasItemsManager = exports.CONNECTOR_CAN_MOVE = exports.NOT_VALID_CSSCLASS = void 0;
var ModelChange_1 = require("../Model/ModelChange");
var Event_1 = require("../Events/Event");
var GroupPrimitive_1 = require("./Primitives/GroupPrimitive");
var Utils_1 = require("./Utils");
var Shape_1 = require("../Model/Shapes/Shape");
var Connector_1 = require("../Model/Connectors/Connector");
var dom_1 = require("@devexpress/utils/lib/utils/dom");
var CanvasManager_1 = require("./CanvasManager");
var ModelUtils_1 = require("../Model/ModelUtils");
exports.NOT_VALID_CSSCLASS = "not-valid";
exports.CONNECTOR_CAN_MOVE = "can-move";
var CanvasItemsManager = (function (_super) {
    __extends(CanvasItemsManager, _super);
    function CanvasItemsManager(viewElement, zoomLevel, dom, instanceId) {
        var _this = _super.call(this, zoomLevel, dom, instanceId) || this;
        _this.itemSelectorGroupContainers = {};
        _this.itemSelectorElements = {};
        _this.itemGroupContainers = {};
        _this.itemElements = {};
        _this.itemChildElements = {};
        _this.primitives = {};
        _this.selectorPrimitives = {};
        _this.selectedItems = {};
        _this.initializeContainerElements(viewElement);
        return _this;
    }
    CanvasItemsManager.prototype.initializeContainerElements = function (view) {
        this.itemSelectorsContainer = this.createAndChangePrimitiveElement(new GroupPrimitive_1.GroupPrimitive([], null), view);
        this.itemsContainer = this.createAndChangePrimitiveElement(new GroupPrimitive_1.GroupPrimitive([], null), view);
    };
    CanvasItemsManager.prototype.clear = function () {
        this.primitives = {};
        this.selectorPrimitives = {};
        Utils_1.RenderUtils.removeContent(this.itemSelectorsContainer);
        Utils_1.RenderUtils.removeContent(this.itemsContainer);
        this.itemSelectorGroupContainers = {};
        this.itemSelectorElements = {};
        this.itemGroupContainers = {};
        this.itemElements = {};
        this.itemChildElements = {};
        this.selectedItems = {};
    };
    CanvasItemsManager.prototype.applyChange = function (change) {
        var item = change.item;
        var itemParent = this.getItemParent(item.zIndex, item.container && item.container.key);
        if (!itemParent)
            return false;
        if (item instanceof Shape_1.Shape)
            this.applyShapeChange(item, change.type, change.isValid);
        else if (item instanceof Connector_1.Connector)
            this.applyConnectorChange(item, change.type, change.isValid);
        return true;
    };
    CanvasItemsManager.prototype.setPointerEventsNone = function (element, value) {
        var style = element.style;
        if (style !== undefined && style.pointerEvents !== undefined)
            style.pointerEvents = value ? "none" : "";
        var childNodes = element.childNodes;
        for (var i = 0; i < childNodes.length; i++)
            this.setPointerEventsNone(childNodes[i], value);
    };
    CanvasItemsManager.prototype.notifyDragStart = function (itemKeys) {
        var _this = this;
        itemKeys.forEach(function (itemKey) {
            if (_this.itemElements[itemKey])
                _this.setPointerEventsNone(_this.itemElements[itemKey], true);
            if (_this.itemChildElements[itemKey])
                _this.setPointerEventsNone(_this.itemChildElements[itemKey], true);
            if (_this.itemSelectorElements[itemKey])
                _this.setPointerEventsNone(_this.itemSelectorElements[itemKey], true);
        });
    };
    CanvasItemsManager.prototype.notifyDragEnd = function (itemKeys) {
        var _this = this;
        itemKeys.forEach(function (itemKey) {
            if (_this.itemElements[itemKey])
                _this.setPointerEventsNone(_this.itemElements[itemKey], false);
            if (_this.itemChildElements[itemKey])
                _this.setPointerEventsNone(_this.itemChildElements[itemKey], false);
            if (_this.itemSelectorElements[itemKey])
                _this.setPointerEventsNone(_this.itemSelectorElements[itemKey], false);
        });
    };
    CanvasItemsManager.prototype.notifyDragScrollStart = function () { };
    CanvasItemsManager.prototype.notifyDragScrollEnd = function () { };
    CanvasItemsManager.prototype.notifyTextInputStart = function (item, text, position, size) {
        var element = this.itemElements[item.key];
        dom_1.DomUtils.addClassName(element, "text-input");
    };
    CanvasItemsManager.prototype.notifyTextInputEnd = function (item, captureFocus) {
        var element = this.itemElements[item.key];
        dom_1.DomUtils.removeClassName(element, "text-input");
    };
    CanvasItemsManager.prototype.notifyTextInputPermissionsCheck = function (item, allowed) {
        var element = this.itemElements[item.key];
        if (allowed)
            dom_1.DomUtils.removeClassName(element, exports.NOT_VALID_CSSCLASS);
        else
            dom_1.DomUtils.addClassName(element, exports.NOT_VALID_CSSCLASS);
    };
    CanvasItemsManager.prototype.notifyActualZoomChanged = function (actualZoom) {
        var scale = "scale(" + actualZoom + ")";
        this.dom.changeByFunc(this.itemsContainer, function (e) { return e.setAttribute("transform", scale); });
        this.dom.changeByFunc(this.itemSelectorsContainer, function (e) { return e.setAttribute("transform", scale); });
        this.actualZoom = actualZoom;
    };
    CanvasItemsManager.prototype.notifyViewAdjusted = function (canvasOffset) { };
    CanvasItemsManager.prototype.invalidatePrimitives = function (item) {
        if (this.primitives[item.key]) {
            this.primitives[item.key].forEach(function (primitive) {
                primitive.dispose();
            });
            delete this.primitives[item.key];
        }
        if (this.selectorPrimitives[item.key]) {
            this.selectorPrimitives[item.key].forEach(function (primitive) {
                primitive.dispose();
            });
            delete this.selectorPrimitives[item.key];
        }
    };
    CanvasItemsManager.prototype.getPrimitives = function (item, instanceId) {
        if (!this.primitives[item.key])
            this.primitives[item.key] = item.createPrimitives(instanceId);
        return this.primitives[item.key];
    };
    CanvasItemsManager.prototype.getSelectorPrimitives = function (item) {
        if (!this.selectorPrimitives[item.key])
            this.selectorPrimitives[item.key] = item.createSelectorPrimitives();
        return this.selectorPrimitives[item.key];
    };
    CanvasItemsManager.prototype.getShapeSelectorClassName = function (shape) {
        var className = "shape";
        if (shape.enableChildren)
            className += " container";
        if (shape.isLocked)
            className += " locked";
        return className;
    };
    CanvasItemsManager.prototype.getShapeClassName = function (shape, isValid) {
        var selectorClassName = this.getShapeSelectorClassName(shape);
        return isValid ? selectorClassName : selectorClassName + " " + exports.NOT_VALID_CSSCLASS;
    };
    CanvasItemsManager.prototype.applyShapeChange = function (shape, type, isValid) {
        var key = shape.key;
        var containerKey = shape.container && shape.container.key;
        var itemSelectorParent = this.getItemSelectorGroupContainer(shape.zIndex, containerKey);
        var itemParent = this.getItemGroupContainer(shape.zIndex, containerKey);
        var itemClassName = this.getShapeClassName(shape, isValid);
        switch (type) {
            case ModelChange_1.ItemChangeType.Create:
                this.itemSelectorElements[key] = this.createItemElements(key, this.getSelectorPrimitives(shape), itemSelectorParent, this.getShapeSelectorClassName(shape), Event_1.MouseEventElementType.Shape);
                this.itemElements[key] = this.createItemElements(key, this.getPrimitives(shape, this.instanceId), itemParent, itemClassName, Event_1.MouseEventElementType.Shape);
                if (shape.enableChildren) {
                    this.itemChildElements[key] = this.createItemElements(key, [], itemParent, "container-children", Event_1.MouseEventElementType.Undefined);
                    this.changeItemChildrenVisibility(this.itemChildElements[key], shape.expanded);
                }
                break;
            case ModelChange_1.ItemChangeType.Remove:
                this.removeItemCustomContent(this.itemSelectorElements[key], this.getSelectorPrimitives(shape));
                this.removeItemCustomContent(this.itemElements[key], this.getPrimitives(shape, this.instanceId));
                this.invalidatePrimitives(shape);
                this.removeItemElements(this.itemSelectorElements[key]);
                delete this.itemSelectorElements[key];
                this.removeItemElements(this.itemElements[key]);
                delete this.itemElements[key];
                if (this.itemChildElements[key]) {
                    this.removeItemElements(this.itemChildElements[key]);
                    delete this.itemChildElements[key];
                    delete this.itemGroupContainers[key];
                    delete this.itemSelectorGroupContainers[key];
                }
                break;
            case ModelChange_1.ItemChangeType.UpdateStructure:
            case ModelChange_1.ItemChangeType.UpdateProperties:
            case ModelChange_1.ItemChangeType.Update:
                if (type !== ModelChange_1.ItemChangeType.Update) {
                    if (type === ModelChange_1.ItemChangeType.UpdateStructure) {
                        this.removeItemCustomContent(this.itemSelectorElements[key], this.getSelectorPrimitives(shape));
                        this.removeItemCustomContent(this.itemElements[key], this.getPrimitives(shape, this.instanceId));
                    }
                    this.invalidatePrimitives(shape);
                }
                this.changeItemElements(this.getSelectorPrimitives(shape), this.itemSelectorElements[key], type === ModelChange_1.ItemChangeType.UpdateStructure);
                this.changeItemElements(this.getPrimitives(shape, this.instanceId), this.itemElements[key], type === ModelChange_1.ItemChangeType.UpdateStructure);
                this.changeItemClassName(this.itemElements[key], itemClassName);
                if (this.itemChildElements[key])
                    this.changeItemChildrenVisibility(this.itemChildElements[key], shape.expanded);
                if (itemSelectorParent !== (this.itemSelectorElements[key] && this.itemSelectorElements[key].parentNode))
                    this.moveItemElements(itemSelectorParent, this.itemSelectorElements[key]);
                if (itemParent !== (this.itemElements[key] && this.itemElements[key].parentNode))
                    this.moveItemElements(itemParent, this.itemElements[key]);
                if (this.itemChildElements[key] && (itemParent !== this.itemChildElements[key].parentNode))
                    this.moveItemElements(itemParent, this.itemChildElements[key]);
                break;
            case ModelChange_1.ItemChangeType.UpdateClassName:
                this.changeItemClassName(this.itemElements[key], itemClassName);
        }
    };
    CanvasItemsManager.prototype.getConnectorSelectorClassName = function (connector) {
        var selectorClassName = "connector";
        return ModelUtils_1.ModelUtils.canMoveConnector(this.selectedItems, connector) ? selectorClassName + " " + exports.CONNECTOR_CAN_MOVE : selectorClassName;
    };
    CanvasItemsManager.prototype.getConnectorClassName = function (connector, isValid) {
        var selectorMoveClassName = this.getConnectorSelectorClassName(connector);
        return isValid ? selectorMoveClassName : selectorMoveClassName + " " + exports.NOT_VALID_CSSCLASS;
    };
    CanvasItemsManager.prototype.applyConnectorChange = function (connector, type, isValid) {
        var key = connector.key;
        var containerKey = connector.container && connector.container.key;
        var itemSelectorParent = this.getItemSelectorGroupContainer(connector.zIndex, containerKey);
        var itemParent = this.getItemGroupContainer(connector.zIndex, containerKey);
        var className = this.getConnectorClassName(connector, isValid);
        switch (type) {
            case ModelChange_1.ItemChangeType.Create:
                this.itemSelectorElements[key] = this.createItemElements(key, this.getSelectorPrimitives(connector), itemSelectorParent, this.getConnectorSelectorClassName(connector), Event_1.MouseEventElementType.Connector);
                this.itemElements[key] = this.createItemElements(key, this.getPrimitives(connector, this.instanceId), itemParent, className, Event_1.MouseEventElementType.Connector);
                break;
            case ModelChange_1.ItemChangeType.Remove:
                this.removeItemCustomContent(this.itemSelectorElements[key], this.getSelectorPrimitives(connector));
                this.removeItemCustomContent(this.itemElements[key], this.getPrimitives(connector, this.instanceId));
                this.invalidatePrimitives(connector);
                this.removeItemElements(this.itemSelectorElements[key]);
                delete this.itemSelectorElements[key];
                this.removeItemElements(this.itemElements[key]);
                delete this.itemElements[key];
                break;
            case ModelChange_1.ItemChangeType.UpdateStructure:
            case ModelChange_1.ItemChangeType.UpdateProperties:
            case ModelChange_1.ItemChangeType.Update:
                if (type !== ModelChange_1.ItemChangeType.Update) {
                    if (type === ModelChange_1.ItemChangeType.UpdateStructure) {
                        this.removeItemCustomContent(this.itemSelectorElements[key], this.getSelectorPrimitives(connector));
                        this.removeItemCustomContent(this.itemElements[key], this.getPrimitives(connector, this.instanceId));
                    }
                    this.invalidatePrimitives(connector);
                }
                this.changeItemElements(this.getSelectorPrimitives(connector), this.itemSelectorElements[key], type === ModelChange_1.ItemChangeType.UpdateStructure);
                this.changeItemClassName(this.itemSelectorElements[key], this.getConnectorSelectorClassName(connector));
                this.changeItemElements(this.getPrimitives(connector, this.instanceId), this.itemElements[key], type === ModelChange_1.ItemChangeType.UpdateStructure);
                this.changeItemClassName(this.itemElements[key], className);
                if (itemSelectorParent !== (this.itemSelectorElements[key] && this.itemSelectorElements[key].parentNode))
                    this.moveItemElements(itemSelectorParent, this.itemSelectorElements[key]);
                if (itemParent !== (this.itemElements[key] && this.itemElements[key].parentNode))
                    this.moveItemElements(itemParent, this.itemElements[key]);
                break;
            case ModelChange_1.ItemChangeType.UpdateClassName:
                this.changeItemClassName(this.itemSelectorElements[key], this.getConnectorSelectorClassName(connector));
                this.changeItemClassName(this.itemElements[key], className);
        }
    };
    CanvasItemsManager.prototype.createItemElements = function (key, primitives, parent, className, type) {
        var gEl = this.createAndChangePrimitiveElement(new GroupPrimitive_1.GroupPrimitive([], className, undefined, undefined, function (e) { return Utils_1.RenderUtils.setElementEventData(e, type, key); }), parent);
        this.createAndChangePrimitivesElements(primitives, gEl);
        return gEl;
    };
    CanvasItemsManager.prototype.changeItemElements = function (primitives, element, updateStructure) {
        if (updateStructure || primitives.length !== element.childNodes.length) {
            Utils_1.RenderUtils.removeContent(element);
            this.createAndChangePrimitivesElements(primitives, element);
        }
        else
            this.dom.changeChildrenByPrimitives(primitives, element);
    };
    CanvasItemsManager.prototype.changeItemClassName = function (element, className) {
        if (className && element)
            this.changePrimitiveElement(new GroupPrimitive_1.GroupPrimitive([], className), element);
    };
    CanvasItemsManager.prototype.removeItemElements = function (element) {
        if (element && element.parentNode)
            element.parentNode.removeChild(element);
    };
    CanvasItemsManager.prototype.removeItemCustomContent = function (element, primitives) {
        if (element && primitives && primitives.length === element.childNodes.length)
            primitives.forEach(function (primitive, index) {
                primitive.destroyCustomContent(element.childNodes[index]);
            });
    };
    CanvasItemsManager.prototype.moveItemElements = function (parent, element, sibling) {
        if (element && parent)
            if (sibling)
                parent.insertBefore(element, sibling);
            else
                parent.appendChild(element);
    };
    CanvasItemsManager.prototype.changeItemChildrenVisibility = function (element, expanded) {
        element.style.display = expanded ? "" : "none";
    };
    CanvasItemsManager.prototype.getItemGroupContainerKey = function (zIndex, parentContainerKey) {
        return parentContainerKey !== undefined ? zIndex + "_" + parentContainerKey : zIndex.toString();
    };
    CanvasItemsManager.prototype.getItemGroupContainer = function (zIndex, parentContainerKey) {
        var parent = parentContainerKey !== undefined ? this.getItemParent(zIndex, parentContainerKey) : this.itemsContainer;
        var key = parentContainerKey || "Main";
        if (this.itemGroupContainers[key] === undefined || this.itemGroupContainers[key][zIndex] === undefined) {
            if (this.itemGroupContainers[key] === undefined)
                this.itemGroupContainers[key] = [];
            var nextSiblingZIndex = Object.keys(this.itemGroupContainers[key]).map(function (z) { return +z; }).sort().filter(function (z) { return z > zIndex; })[0];
            this.itemGroupContainers[key][zIndex] = this.createAndChangePrimitiveElement(new GroupPrimitive_1.GroupPrimitive([], null, zIndex), parent, this.itemGroupContainers[key][nextSiblingZIndex]);
        }
        return this.itemGroupContainers[key][zIndex];
    };
    CanvasItemsManager.prototype.getItemSelectorGroupContainer = function (zIndex, parentContainerKey) {
        var parent = parentContainerKey !== undefined ? this.getItemSelectorParent(zIndex, parentContainerKey) : this.itemSelectorsContainer;
        var key = parentContainerKey || "Main";
        if (this.itemSelectorGroupContainers[key] === undefined || this.itemSelectorGroupContainers[key][zIndex] === undefined) {
            if (this.itemSelectorGroupContainers[key] === undefined)
                this.itemSelectorGroupContainers[key] = [];
            var nextSiblingZIndex = Object.keys(this.itemSelectorGroupContainers[key]).map(function (z) { return +z; }).sort().filter(function (z) { return z > zIndex; })[0];
            this.itemSelectorGroupContainers[key][zIndex] = this.createAndChangePrimitiveElement(new GroupPrimitive_1.GroupPrimitive([], null, zIndex), parent, this.itemSelectorGroupContainers[key][nextSiblingZIndex]);
        }
        return this.itemSelectorGroupContainers[key][zIndex];
    };
    CanvasItemsManager.prototype.getItemParent = function (zIndex, parentContainerKey) {
        return parentContainerKey !== undefined ?
            this.itemChildElements[parentContainerKey] :
            this.getItemGroupContainer(zIndex);
    };
    CanvasItemsManager.prototype.getItemSelectorParent = function (zIndex, parentContainerKey) {
        return parentContainerKey !== undefined ?
            this.itemChildElements[parentContainerKey] :
            this.getItemSelectorGroupContainer(zIndex);
    };
    CanvasItemsManager.prototype.notifySelectionChanged = function (selection) {
        var _this = this;
        var newSelectedItems = ModelUtils_1.ModelUtils.createSelectedItems(selection);
        var itemsToUpdate = [];
        this.populateItems(itemsToUpdate, newSelectedItems, this.selectedItems);
        this.populateItems(itemsToUpdate, this.selectedItems, newSelectedItems);
        this.selectedItems = newSelectedItems;
        itemsToUpdate.forEach(function (item) {
            if (item instanceof Connector_1.Connector)
                _this.applyOrPostponeChanges([new ModelChange_1.ItemChange(item, ModelChange_1.ItemChangeType.UpdateClassName, true)]);
        });
    };
    CanvasItemsManager.prototype.populateItems = function (target, sourceSet, checkSet) {
        Object.keys(sourceSet).forEach(function (key) {
            if (!checkSet[key])
                target.push(sourceSet[key]);
        });
    };
    return CanvasItemsManager;
}(CanvasManager_1.CanvasManager));
exports.CanvasItemsManager = CanvasItemsManager;
//# sourceMappingURL=CanvasItemsManager.js.map