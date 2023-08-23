"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagramControl = void 0;
var point_1 = require("@devexpress/utils/lib/geometry/point");
var ModelManipulator_1 = require("./Model/ModelManipulator");
var CommandManager_1 = require("./Commands/CommandManager");
var EventManager_1 = require("./Events/EventManager");
var Model_1 = require("./Model/Model");
var Selection_1 = require("./Selection/Selection");
var History_1 = require("./History/History");
var BarManager_1 = require("./UI/BarManager");
var RenderManager_1 = require("./Render/RenderManager");
var ShapeDescriptionManager_1 = require("./Model/Shapes/Descriptions/ShapeDescriptionManager");
var DocumentDataSource_1 = require("./Data/DocumentDataSource");
var Settings_1 = require("./Settings");
var ModelOperationSettings_1 = require("./ModelOperationSettings");
var ViewController_1 = require("./ViewController");
var ModelUtils_1 = require("./Model/ModelUtils");
var ToolboxManager_1 = require("./Render/Toolbox/ToolboxManager");
var Utils_1 = require("./Utils");
var ApiController_1 = require("./Api/ApiController");
var ImageCache_1 = require("./Images/ImageCache");
var PermissionsProvider_1 = require("./Model/Permissions/PermissionsProvider");
var ConnectorRoutingModel_1 = require("./Model/Connectors/Routing/ConnectorRoutingModel");
var TextMeasurer_1 = require("./Render/Measurer/TextMeasurer");
var Connector_1 = require("./Model/Connectors/Connector");
var DataLayoutParameters_1 = require("./Data/DataLayoutParameters");
var ReloadContentParameters_1 = require("./ReloadContentParameters");
var Utils_2 = require("./Render/Utils");
var _1 = require(".");
var math_1 = require("@devexpress/utils/lib/utils/math");
var DiagramControl = (function () {
    function DiagramControl() {
        this.updateLockCount = 0;
        this.shouldUpdateItemsByModel = false;
        this.reloadContentNeeded = false;
        this.reloadContentParameters = new ReloadContentParameters_1.ReloadContentParameters();
        this.reloadContentByExternalChangesParameters = new ReloadContentParameters_1.ReloadContentParameters();
        this.instanceId = math_1.MathUtils.generateGuid();
        this.settings = new Settings_1.DiagramSettings();
        this.shapeDescriptionManager = new ShapeDescriptionManager_1.ShapeDescriptionManager();
        this.shapeDescriptionManager.onShapeDecriptionChanged.add(this);
        this.model = new Model_1.DiagramModel();
        this.selection = new Selection_1.Selection(this.model);
        this.onNativeAction = new Utils_1.EventDispatcher();
        this.apiController = new ApiController_1.ApiController(this.onNativeAction, this.selection, this.model);
        this.permissionsProvider = new PermissionsProvider_1.PermissionsProvider(this.apiController);
        this.permissionsProvider.onRequestOperation.add(this);
        this.routingModel = new ConnectorRoutingModel_1.ConnectorRoutingModel();
        this.modelManipulator = new ModelManipulator_1.ModelManipulator(this.model, this.routingModel, this.permissionsProvider);
        this.modelManipulator.onModelChanged.add(this.permissionsProvider);
        this.history = new History_1.History(this.modelManipulator, this);
        this.barManager = new BarManager_1.BarManager(this);
        this.view = new ViewController_1.ViewController(this.settings, this.barManager);
        this.commandManager = new CommandManager_1.CommandManager(this);
        this.eventManager = new EventManager_1.EventManager(this);
        this.settings.onReadOnlyChanged.add(this.eventManager.mouseHandler);
        this.settings.onReadOnlyChanged.add(this.eventManager.visualizersManager);
        this.selection.onChanged.add(this.barManager);
        this.selection.onChanged.add(this.apiController);
        this.selection.onChanged.add(this.permissionsProvider);
        this.modelManipulator.commitItemsCreateChanges();
        this.history.onChanged.add(this);
        this.toolboxManager = new ToolboxManager_1.ToolboxManager(this.shapeDescriptionManager);
        this.settings.onConnectorRoutingModeChanged.add(this.routingModel);
        ImageCache_1.ImageCache.instance.onReadyStateChanged.add(this);
    }
    Object.defineProperty(DiagramControl.prototype, "operationSettings", {
        get: function () {
            return this.permissionsProvider.operationSettings;
        },
        enumerable: false,
        configurable: true
    });
    DiagramControl.prototype.cleanMarkup = function (removeElement) {
        removeElement = removeElement || (function (element) { Utils_2.RenderUtils.removeElement(element); });
        this.toolboxManager.clean(removeElement);
        this.barManager.clean();
        if (this.render) {
            this.settings.onZoomChanged.remove(this.render.view);
            this.settings.onViewChanged.remove(this.render.page);
            this.settings.onViewChanged.remove(this.render.view);
            this.settings.onReadOnlyChanged.remove(this.render);
            this.settings.onReadOnlyChanged.remove(this.render.selection);
            this.eventManager.cleanToolboxes(this.settings.onReadOnlyChanged);
            this.eventManager.onTextInputOperation.remove(this.render.input);
            this.eventManager.onTextInputOperation.remove(this.render.items);
            this.eventManager.onTextInputOperation.remove(this.render.selection);
            this.eventManager.onMouseOperation.remove(this.render.items);
            this.eventManager.onMouseOperation.remove(this.render.selection);
            this.eventManager.onMouseOperation.remove(this.render.view);
            this.eventManager.onMouseOperation.remove(this.render);
            this.eventManager.onVisualizersUpdate.remove(this.render.selection);
            this.modelManipulator.onModelSizeChanged.remove(this.render.view);
            this.modelManipulator.onModelSizeChanged.remove(this.render.page);
            this.modelManipulator.onModelChanged.remove(this.render.items);
            this.modelManipulator.onModelChanged.remove(this.render.page);
            this.modelManipulator.onModelChanged.remove(this.render.selection);
            this.selection.onChanged.remove(this.render.selection);
            this.selection.onChanged.remove(this.render.items);
            this.render.clean(removeElement);
            this.render = undefined;
        }
        if (this.measurer && this.measurer instanceof TextMeasurer_1.TextMeasurer)
            this.measurer.clean();
    };
    DiagramControl.prototype.dispose = function () {
        ImageCache_1.ImageCache.instance.onReadyStateChanged.remove(this);
    };
    DiagramControl.prototype.createDocument = function (parent, scrollView, focusElementsParent) {
        if (!this.measurer)
            this.initMeasurer(parent);
        if (this.render)
            this.render.replaceParent(parent, scrollView);
        else {
            this.render = new RenderManager_1.RenderManager(parent, this.eventManager, this.measurer, {
                pageColor: this.model.pageColor,
                modelSize: this.model.size,
                pageLandscape: this.model.pageLandscape,
                pageSize: this.model.pageSize,
                simpleView: this.settings.simpleView,
                readOnly: this.settings.readOnly,
                contextMenuEnabled: this.settings.contextMenuEnabled,
                gridSize: this.settings.gridSize,
                gridVisible: this.settings.showGrid,
                zoomLevel: this.settings.zoomLevel,
                autoZoom: this.settings.autoZoom,
                rectangle: this.model.getRectangle(true)
            }, this.instanceId, scrollView, focusElementsParent);
            this.settings.onZoomChanged.add(this.render.view);
            this.settings.onViewChanged.add(this.render.page);
            this.settings.onViewChanged.add(this.render.view);
            this.settings.onReadOnlyChanged.add(this.render);
            this.settings.onReadOnlyChanged.add(this.render.selection);
            this.eventManager.onTextInputOperation.add(this.render.input);
            this.eventManager.onTextInputOperation.add(this.render.items);
            this.eventManager.onTextInputOperation.add(this.render.selection);
            this.eventManager.onTextInputOperation.add(this);
            this.eventManager.onMouseOperation.add(this.render.items);
            this.eventManager.onMouseOperation.add(this.render.selection);
            this.eventManager.onMouseOperation.add(this.render.view);
            this.eventManager.onMouseOperation.add(this.render);
            this.eventManager.onVisualizersUpdate.add(this.render.selection);
            this.modelManipulator.onModelSizeChanged.add(this.render.view);
            this.modelManipulator.onModelSizeChanged.add(this.render.page);
            this.modelManipulator.onModelChanged.add(this.render.items);
            this.modelManipulator.onModelChanged.add(this.render.page);
            this.modelManipulator.onModelChanged.add(this.render.selection);
            this.selection.onChanged.add(this.render.selection);
            this.selection.onChanged.add(this.render.items);
            this.render.update(false);
            this.render.onNewModel(this.model.items);
            this.modelManipulator.commitItemsCreateChanges();
            this.view.initialize(this.render.view);
            if (this.settings.zoomLevelWasChanged)
                this.raiseCanvasViewActualZoomChanged();
            this.selection.raiseSelectionChanged();
        }
    };
    DiagramControl.prototype.createToolbox = function (parent, renderAsText, shapes, options) {
        var toolbox = this.toolboxManager.create(parent, this.settings.readOnly, true, renderAsText, shapes, this.getToolboxAllowedShapeTypes.bind(this), this.instanceId, options);
        this.settings.onReadOnlyChanged.add(toolbox);
        toolbox.onDragOperation.add(this);
        toolbox.onDragOperation.add(this.apiController);
        this.eventManager.registerToolbox(toolbox);
    };
    DiagramControl.prototype.createContextToolbox = function (parent, renderAsText, shapes, options, onClick) {
        this.cleanContextToolbox();
        this.contextToolbox = this.toolboxManager.create(parent, this.settings.readOnly, false, renderAsText, shapes, this.getToolboxAllowedShapeTypes.bind(this), this.instanceId, options);
        this.contextToolbox.onClickOperation.add(this);
        this.contextToolboxOnClick = onClick;
    };
    DiagramControl.prototype.getToolboxAllowedShapeTypes = function (shapeTypes) {
        var _this = this;
        var allowedShapeTypes = [];
        this.permissionsProvider.beginUpdateUI();
        shapeTypes.forEach(function (shapeType) {
            if (_this.permissionsProvider.canAddShapeFromToolbox(shapeType))
                allowedShapeTypes.push(shapeType);
        });
        this.permissionsProvider.endUpdateUI();
        return allowedShapeTypes;
    };
    DiagramControl.prototype.cleanContextToolbox = function () {
        if (this.contextToolbox) {
            this.toolboxManager.clean(undefined, this.contextToolbox);
            this.contextToolbox = undefined;
            this.contextToolboxOnClick = undefined;
        }
    };
    DiagramControl.prototype.refreshToolbox = function (toolboxes) {
        this.permissionsProvider.clearCache(ModelOperationSettings_1.DiagramModelOperation.AddShapeFromToolbox);
        this.toolboxManager.refresh(toolboxes);
    };
    DiagramControl.prototype.applyToolboxFilter = function (shapeSubstring, toolboxes) {
        return this.toolboxManager.applyFilter(shapeSubstring, toolboxes);
    };
    DiagramControl.prototype.notifyToolboxClick = function (shapeType) {
        if (this.contextToolboxOnClick)
            this.contextToolboxOnClick(shapeType);
    };
    DiagramControl.prototype.initMeasurer = function (parent) {
        this.measurer = new TextMeasurer_1.TextMeasurer(parent);
    };
    DiagramControl.prototype.onDimensionChanged = function () {
        if (!_1.Browser.TouchUI)
            this.updateLayout(true);
    };
    DiagramControl.prototype.updateLayout = function (resetScroll) {
        if (resetScroll === void 0) { resetScroll = false; }
        this.render && this.render.update(!resetScroll);
    };
    DiagramControl.prototype.captureFocus = function () {
        this.render && this.render.input.captureFocus();
    };
    DiagramControl.prototype.isFocused = function () {
        return !this.render || this.render.input.isFocused();
    };
    DiagramControl.prototype.registerBar = function (bar) {
        this.barManager.registerBar(bar);
    };
    DiagramControl.prototype.updateBarItemsState = function (bar, queryCommands) {
        this.barManager.updateBarItemsState(bar, queryCommands);
    };
    DiagramControl.prototype.getCommand = function (key) {
        return this.commandManager.getCommand(key);
    };
    DiagramControl.prototype.getNativeItemByKey = function (key) {
        var item = this.model.findItem(key);
        return item && this.apiController.createNativeItem(item);
    };
    DiagramControl.prototype.getNativeItemByDataKey = function (dataKey) {
        var item = this.model.findItemByDataKey(dataKey);
        return item && this.apiController.createNativeItem(item);
    };
    DiagramControl.prototype.getNativeItems = function () {
        var _this = this;
        return this.model.items.map(function (item) { return _this.apiController.createNativeItem(item); });
    };
    DiagramControl.prototype.getNativeSelectedItems = function () {
        var _this = this;
        return this.selection.getKeys().map(function (key) { return _this.apiController.createNativeItem(_this.model.findItem(key)); });
    };
    DiagramControl.prototype.setSelectedItems = function (keys) {
        this.selection.set(keys);
    };
    DiagramControl.prototype.scrollToItems = function (keys) {
        var _this = this;
        var rectangle = Utils_1.GeometryUtils.getCommonRectangle(keys.map(function (key) { return _this.model.findItem(key).rectangle; }));
        this.view.scrollIntoView(rectangle);
    };
    DiagramControl.prototype.setInitialStyleProperties = function (style) {
        this.selection.inputPosition.setInitialStyleProperties(style);
    };
    DiagramControl.prototype.setInitialTextStyleProperties = function (style) {
        this.selection.inputPosition.setInitialTextStyleProperties(style);
    };
    DiagramControl.prototype.setInitialConnectorProperties = function (properties) {
        this.selection.inputPosition.setInitialConnectorProperties(properties);
    };
    DiagramControl.prototype.addCustomShapes = function (shapes) {
        var _this = this;
        shapes.forEach(function (shape) {
            shape.apiController = _this.apiController;
            if (shape.defaultWidth)
                shape.defaultWidth = ModelUtils_1.ModelUtils.getTwipsValue(_this.model.units, shape.defaultWidth);
            if (shape.defaultHeight)
                shape.defaultHeight = ModelUtils_1.ModelUtils.getTwipsValue(_this.model.units, shape.defaultHeight);
            if (shape.minWidth)
                shape.minWidth = ModelUtils_1.ModelUtils.getTwipsValue(_this.model.units, shape.minWidth);
            if (shape.minHeight)
                shape.minHeight = ModelUtils_1.ModelUtils.getTwipsValue(_this.model.units, shape.minHeight);
            if (shape.maxWidth)
                shape.maxWidth = ModelUtils_1.ModelUtils.getTwipsValue(_this.model.units, shape.maxWidth);
            if (shape.maxHeight)
                shape.maxHeight = ModelUtils_1.ModelUtils.getTwipsValue(_this.model.units, shape.maxHeight);
            _this.shapeDescriptionManager.registerCustomShape(shape);
        });
    };
    DiagramControl.prototype.removeCustomShapes = function (shapeTypes) {
        var _this = this;
        shapeTypes.forEach(function (shapeType) {
            _this.shapeDescriptionManager.unregisterCustomShape(shapeType);
        });
    };
    DiagramControl.prototype.removeAllCustomShapes = function () {
        this.shapeDescriptionManager.unregisterAllCustomShapes();
    };
    DiagramControl.prototype.importModel = function (model) {
        model.units = this.model.units;
        this.model = model;
        this.model.initializeKeyCounter();
        this.apiController.model = model;
        this.onImportData();
    };
    DiagramControl.prototype.importItemsData = function () {
        this.onImportData();
    };
    DiagramControl.prototype.onImportData = function () {
        if (this.render) {
            this.render.clear();
            this.render.onNewModel(this.model.items);
        }
        this.permissionsProvider.clearCache();
        this.selection.initialize(this.model);
        this.modelManipulator.initialize(this.model, this.routingModel);
        this.history.clear();
        this.eventManager.initialize();
        this.modelManipulator.commitPageChanges();
        this.modelManipulator.commitItemsCreateChanges();
        this.notifyViewChanged();
        this.notifyHistoryChanged();
    };
    DiagramControl.prototype.createDocumentDataSource = function (nodeDataSource, edgeDataSource, parameters, nodeDataImporter, edgeDataImporter) {
        this.documentDataSource = new DocumentDataSource_1.DocumentDataSource(this, nodeDataSource, edgeDataSource, parameters, nodeDataImporter, edgeDataImporter);
        this.apiController.setDataSource(this.documentDataSource);
        return this.documentDataSource;
    };
    DiagramControl.prototype.deleteDocumentDataSource = function () {
        this.apiController.setDataSource(null);
        delete this.documentDataSource;
    };
    DiagramControl.prototype.applyShapeSizeSettings = function (settings) {
        this.settings.applyShapeSizeSettings(settings, this.model.units);
    };
    DiagramControl.prototype.applyOperationSettings = function (settings) {
        this.permissionsProvider.operationSettings.applySettings(settings);
    };
    DiagramControl.prototype.beginUpdateCanvas = function () {
        if (this.render) {
            this.render.items.beginUpdate();
            this.render.selection.beginUpdate();
        }
    };
    DiagramControl.prototype.endUpdateCanvas = function () {
        if (this.render) {
            this.render.items.endUpdate();
            this.render.selection.endUpdate();
        }
    };
    DiagramControl.prototype.beginUpdate = function () {
        this.barManager.beginUpdate();
        this.apiController.beginUpdate();
        this.eventManager.beginUpdate();
    };
    DiagramControl.prototype.endUpdate = function () {
        this.barManager.endUpdate();
        this.apiController.endUpdate();
        this.eventManager.endUpdate();
    };
    DiagramControl.prototype.notifyEdgeInserted = function (data, callback, errorCallback) {
        if (this.onEdgeInserted)
            this.onEdgeInserted(data, callback, errorCallback);
        else
            callback(data);
    };
    DiagramControl.prototype.notifyEdgeUpdated = function (key, data, callback, errorCallback) {
        if (this.onEdgeUpdated)
            this.onEdgeUpdated(key, data, callback, errorCallback);
        else
            callback(key, data);
    };
    DiagramControl.prototype.notifyEdgeRemoved = function (key, data, callback, errorCallback) {
        if (this.onEdgeUpdated)
            this.onEdgeRemoved(key, data, callback, errorCallback);
        else
            callback(key, data);
    };
    DiagramControl.prototype.notifyNodeInserted = function (data, callback, errorCallback) {
        if (this.onNodeInserted)
            this.onNodeInserted(data, callback, errorCallback);
        else
            callback(data);
    };
    DiagramControl.prototype.notifyNodeUpdated = function (key, data, callback, errorCallback) {
        if (this.onNodeUpdated)
            this.onNodeUpdated(key, data, callback, errorCallback);
        else
            callback(key, data);
    };
    DiagramControl.prototype.notifyNodeRemoved = function (key, data, callback, errorCallback) {
        if (this.onNodeRemoved)
            this.onNodeRemoved(key, data, callback, errorCallback);
        else
            callback(key, data);
    };
    DiagramControl.prototype.reloadInsertedItem = function (dataKey) {
        if (this.settings.reloadInsertedItemRequired)
            this.reloadContent(dataKey);
    };
    DiagramControl.prototype.reloadContent = function (dataKey, getData, layoutParameters, isExternalChanges) {
        if (!this.documentDataSource)
            return;
        if (this.isChangesLocked())
            this.reloadContentNeeded = true;
        var addNewHistoryItem = isExternalChanges === true || (isExternalChanges === undefined && !this.reloadContentNeeded);
        var reloadContentParameters = addNewHistoryItem ? this.reloadContentByExternalChangesParameters : this.reloadContentParameters;
        reloadContentParameters.add(dataKey, getData, layoutParameters);
        if (!this.isChangesLocked()) {
            this.reloadContentCore(reloadContentParameters, addNewHistoryItem);
            this.barManager.updateItemsState();
        }
    };
    DiagramControl.prototype.reloadContentCore = function (parameters, addNewHistoryItem) {
        var _this = this;
        var data = parameters.getData && parameters.getData();
        var changes = this.documentDataSource.refetchData(data && data.nodeDataSource, data && data.edgeDataSource);
        this.beginUpdateCanvas();
        this.permissionsProvider.lockPermissions();
        this.documentDataSource.updateModelItems(this.history, this.model, this.shapeDescriptionManager, this.selection, new DataLayoutParameters_1.DataLayoutParameters(this.settings, parameters.layoutParameters), addNewHistoryItem, parameters.dataKeys, function (item) {
            _this.modelManipulator.commitItemUpdateChanges(item);
        }, changes, this.settings.snapToGrid, this.settings.gridSize, this.measurer);
        this.permissionsProvider.unlockPermissions();
        this.endUpdateCanvas();
        parameters.clear();
    };
    DiagramControl.prototype.notifyHistoryChanged = function () {
        if (this.documentDataSource) {
            this.shouldUpdateItemsByModel = true;
            if (!this.settings.readOnly)
                this.notifyDataChanges();
        }
        else
            this.raiseOnChanged();
    };
    DiagramControl.prototype.notifyViewChanged = function () {
        this.settings.notifyViewChanged();
    };
    DiagramControl.prototype.notifyToolboxDragStart = function (evt) {
        this.render.notifyToolboxDragStart(evt);
        if (this.onToolboxDragStart)
            this.onToolboxDragStart();
    };
    DiagramControl.prototype.notifyToolboxDragEnd = function (evt) {
        this.render.notifyToolboxDragEnd(evt);
        if (this.onToolboxDragEnd)
            this.onToolboxDragEnd();
    };
    DiagramControl.prototype.notifyToolboxDraggingMouseMove = function (evt) {
        if (this.render)
            this.render.notifyToolboxDraggingMouseMove(evt);
    };
    DiagramControl.prototype.notifyTextInputStart = function (item, text, position, size) {
        if (this.onTextInputStart)
            this.onTextInputStart();
    };
    DiagramControl.prototype.notifyTextInputEnd = function (item, captureFocus) {
        if (this.onTextInputEnd)
            this.onTextInputEnd();
    };
    DiagramControl.prototype.notifyTextInputPermissionsCheck = function (item, allowed) { };
    DiagramControl.prototype.notifyToggleFullscreen = function (value) {
        if (this.onToggleFullscreen)
            this.onToggleFullscreen(value);
    };
    DiagramControl.prototype.notifyShowContextMenu = function (eventPoint, modelPoint) {
        if (this.onShowContextMenu && this.render) {
            var selection = void 0;
            var selectedItems = this.selection.getSelectedItems(true);
            if (selectedItems.length > 0) {
                var rect = ModelUtils_1.ModelUtils.createRectangle(this.selection.getSelectedItems(true));
                var pos = this.render.getEventPointByModelPoint(rect.createPosition());
                var size = this.render.view.getAbsoluteSize(rect.createSize());
                selection = { x: pos.x, y: pos.y, width: size.width, height: size.height };
            }
            if (eventPoint) {
                this.contextMenuPosition = new point_1.Point(eventPoint.x, eventPoint.y);
                this.onShowContextMenu(eventPoint.x, eventPoint.y, selection);
            }
            else if (modelPoint) {
                var point = this.render.getEventPointByModelPoint(modelPoint);
                this.contextMenuPosition = point.clone();
                this.onShowContextMenu(point.x, point.y, selection);
            }
        }
    };
    DiagramControl.prototype.notifyHideContextMenu = function () {
        if (this.onHideContextMenu && this.render)
            this.onHideContextMenu();
    };
    DiagramControl.prototype.notifyShowContextToolbox = function (modelPoint, getPositionToInsertShapeTo, side, category, callback) {
        if (this.onShowContextToolbox && this.render) {
            var point = this.render.getEventPointByModelPoint(modelPoint);
            this.onShowContextToolbox(point.x, point.y, side, category, callback);
            this.render.view.notifyShowContextToolbox();
        }
    };
    DiagramControl.prototype.notifyHideContextToolbox = function () {
        if (this.onHideContextToolbox && this.render) {
            this.onHideContextToolbox();
            this.render.view.notifyHideContextToolbox();
        }
        this.cleanContextToolbox();
    };
    DiagramControl.prototype.notifyShapeDescriptionChanged = function (description) {
        this.modelManipulator.updateShapeDescription(description);
    };
    DiagramControl.prototype.notifyImageCacheReadyStateChanged = function (ready) {
        this.barManager.updateItemsState();
    };
    DiagramControl.prototype.raiseCanvasViewActualZoomChanged = function () {
        this.render.view.raiseActualZoomChanged();
    };
    DiagramControl.prototype.notifyRequestOperation = function (operation, args) {
        if (this.requestOperationByDataSource(operation, args))
            return;
        if (this.onRequestOperation)
            this.onRequestOperation(operation, args);
    };
    DiagramControl.prototype.requestOperationByDataSource = function (operation, args) {
        if (!(this.documentDataSource && (this.documentDataSource.IsNodeParentIdMode() || this.documentDataSource.IsNodeItemsMode())))
            return false;
        if (operation === ModelOperationSettings_1.DiagramModelOperation.ChangeConnection) {
            var e = args;
            var shape = e.shape && this.model.findItem(e.shape.id);
            var connector = e.connector && this.model.findItem(e.connector.id);
            if (!(shape && connector))
                return;
            if (e.position === Connector_1.ConnectorPosition.End)
                for (var i = 0; i < shape.attachedConnectors.length; i++) {
                    var attachedConnector = shape.attachedConnectors[i];
                    if (attachedConnector !== connector && attachedConnector.endItem && attachedConnector.endItem === shape) {
                        e.allowed = false;
                        break;
                    }
                }
            if (e.allowed && connector.beginItem && connector.endItem && this.isShapeParent(connector.endItem, connector.beginItem))
                e.allowed = false;
        }
        return !args.allowed;
    };
    DiagramControl.prototype.isShapeParent = function (parentShape, shape) {
        if (parentShape === shape)
            return true;
        for (var i = 0; i < parentShape.attachedConnectors.length; i++) {
            var attachedConnector = parentShape.attachedConnectors[i];
            if (attachedConnector.beginItem === parentShape && attachedConnector.endItem) {
                var childShape = attachedConnector.endItem;
                if (childShape === shape || this.isShapeParent(childShape, shape))
                    return true;
            }
        }
        return false;
    };
    DiagramControl.prototype.isChangesLocked = function () {
        return this.updateLockCount > 0;
    };
    DiagramControl.prototype.beginChangesNotification = function () {
        if (!this.isChangesLocked())
            if (this.changesLockChanged)
                this.changesLockChanged(true);
        this.updateLockCount++;
    };
    DiagramControl.prototype.endChangesNotification = function (preventNotifyReloadContent) {
        var _this = this;
        this.updateLockCount--;
        if (!this.isChangesLocked()) {
            this.changesLockChanged(false);
            if (!preventNotifyReloadContent)
                setTimeout(function () {
                    _this.notifyReloadContent();
                    _this.notifyDataChanges();
                }, 0);
        }
    };
    DiagramControl.prototype.changesLockChanged = function (locked) {
        if (locked)
            this.lockedReadOnly = this.settings.readOnly;
        else
            locked = this.lockedReadOnly;
        this.commandManager.getCommand(CommandManager_1.DiagramCommand.ToggleReadOnly).execute(locked);
    };
    DiagramControl.prototype.notifyDataChanges = function () {
        if (this.isChangesLocked())
            return;
        if (this.shouldUpdateItemsByModel) {
            this.documentDataSource.updateItemsByModel(this.model);
            this.shouldUpdateItemsByModel = false;
        }
        this.raiseOnChanged();
    };
    DiagramControl.prototype.notifyReloadContent = function () {
        if (this.reloadContentNeeded) {
            if (!this.reloadContentParameters.empty)
                this.reloadContentCore(this.reloadContentParameters, false);
            if (!this.reloadContentByExternalChangesParameters.empty)
                this.reloadContentCore(this.reloadContentByExternalChangesParameters, true);
            this.reloadContentNeeded = false;
        }
    };
    DiagramControl.prototype.raiseOnChanged = function () {
        if (this.onChanged)
            this.onChanged();
    };
    return DiagramControl;
}());
exports.DiagramControl = DiagramControl;
//# sourceMappingURL=Diagram.js.map