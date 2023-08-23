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
exports.ApiController = void 0;
var batch_updatable_1 = require("@devexpress/utils/lib/class/batch-updatable");
var Event_1 = require("../Events/Event");
var ModelUtils_1 = require("../Model/ModelUtils");
var __1 = require("..");
var ApiController = (function (_super) {
    __extends(ApiController, _super);
    function ApiController(events, selection, model) {
        var _this = _super.call(this) || this;
        _this.events = events;
        _this.model = model;
        _this.selection = selection;
        return _this;
    }
    ApiController.prototype.notifySelectionChanged = function (selection) {
        if (this.isUpdateLocked())
            this.registerOccurredEvent(ApiControllerAction.SelectionChanged);
        else
            this.raiseSelectionChanged();
    };
    ApiController.prototype.notifyToolboxDragStart = function () {
        this.events.raise("notifyToolboxItemDragStart");
    };
    ApiController.prototype.notifyToolboxDragEnd = function () {
        this.events.raise("notifyToolboxItemDragEnd");
    };
    ApiController.prototype.notifyToolboxDraggingMouseMove = function () {
    };
    ApiController.prototype.notifyClick = function (evt) {
        var _this = this;
        this.tryRaiseUserAction(evt, function (i) { return _this.events.raise("notifyItemClick", i); });
    };
    ApiController.prototype.notifyDblClick = function (evt) {
        var _this = this;
        this.tryRaiseUserAction(evt, function (i) { return _this.events.raise("notifyItemDblClick", i); });
    };
    ApiController.prototype.createNativeItem = function (item) {
        return item && this.cleanupNativeItem(item.toNative(this.model.units));
    };
    ApiController.prototype.createNativeShape = function (shape) {
        return this.createNativeItem(shape);
    };
    ApiController.prototype.createNativeConnector = function (connector) {
        return this.createNativeItem(connector);
    };
    ApiController.prototype.convertUnit = function (value) {
        return ModelUtils_1.ModelUtils.getlUnitValue(this.model.units, value);
    };
    ApiController.prototype.convertPoint = function (point) {
        return new __1.Point(this.convertUnit(point.x), this.convertUnit(point.y));
    };
    ApiController.prototype.convertSize = function (size) {
        return new __1.Size(this.convertUnit(size.width), this.convertUnit(size.height));
    };
    ApiController.prototype.cleanupNativeItem = function (item) {
        var ds = this.dataSource;
        if (ds) {
            if (ds.isAutoGeneratedKey(item.fromKey))
                item.fromKey = undefined;
            if (ds.isAutoGeneratedKey(item.key))
                item.key = undefined;
            if (ds.isAutoGeneratedKey(item.toKey))
                item.toKey = undefined;
        }
        return item;
    };
    ApiController.prototype.setDataSource = function (dataSource) {
        this.dataSource = dataSource;
    };
    ApiController.prototype.tryRaiseUserAction = function (evt, callEvent) {
        var _this = this;
        if (this.isUserAction(evt)) {
            var item_1 = this.model.findItem(evt.source.key);
            item_1 && this.events.raise1(function (l) { return callEvent(_this.createNativeItem(item_1)); });
        }
    };
    ApiController.prototype.isUserAction = function (evt) {
        return evt.source && (evt.source.type === Event_1.MouseEventElementType.Shape ||
            evt.source.type === Event_1.MouseEventElementType.ShapeExpandButton ||
            evt.source.type === Event_1.MouseEventElementType.ShapeParameterBox ||
            evt.source.type === Event_1.MouseEventElementType.ShapeResizeBox ||
            evt.source.type === Event_1.MouseEventElementType.ShapeConnectionPoint ||
            evt.source.type === Event_1.MouseEventElementType.Connector ||
            evt.source.type === Event_1.MouseEventElementType.ConnectorPoint ||
            evt.source.type === Event_1.MouseEventElementType.ConnectorSide ||
            evt.source.type === Event_1.MouseEventElementType.ConnectorOrthogonalSide ||
            evt.source.type === Event_1.MouseEventElementType.ConnectorText);
    };
    ApiController.prototype.onUpdateUnlocked = function (occurredEvents) {
        if (occurredEvents & ApiControllerAction.SelectionChanged)
            this.raiseSelectionChanged();
    };
    ApiController.prototype.raiseSelectionChanged = function () {
        var _this = this;
        var items = this.selection.getKeys().map(function (key) { return _this.createNativeItem(_this.model.findItem(key)); });
        this.events.raise1(function (l) { return l.notifySelectionChanged(items); });
    };
    return ApiController;
}(batch_updatable_1.BatchUpdatableObject));
exports.ApiController = ApiController;
var ApiControllerAction;
(function (ApiControllerAction) {
    ApiControllerAction[ApiControllerAction["SelectionChanged"] = 1] = "SelectionChanged";
})(ApiControllerAction || (ApiControllerAction = {}));
//# sourceMappingURL=ApiController.js.map