﻿/**
* DevExpress Dashboard (dashboard-control.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardControl = void 0;
const analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
const analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
const events_strategy_1 = require("devextreme/core/events_strategy");
const options_1 = require("devextreme/core/options");
const popup_1 = require("devextreme/ui/popup");
const $ = require("jquery");
const ko = require("knockout");
const _jquery_helpers_1 = require("../data/_jquery-helpers");
const _utils_1 = require("../data/_utils");
const _default_1 = require("../data/localization/_default");
const dashboard_1 = require("../model/dashboard");
const _knockout_utils_1 = require("../model/internal/_knockout-utils");
const _obsolete_helper_1 = require("../model/internal/_obsolete-helper");
const custom_item_1 = require("../model/items/custom-item/custom-item");
const serializable_model_1 = require("../model/serializable-model");
const _dx_devextreme_themes_integration_1 = require("../viewer-parts/_dx-devextreme-themes-integration");
const legacy_settings_1 = require("../viewer-parts/legacy-settings");
const _cssHelper_1 = require("../viewer-parts/viewer/_cssHelper");
const _data_source_browser_1 = require("./_data-source-browser");
const _helpers_1 = require("./_helpers");
const _service_client_1 = require("./_service-client");
const control_options_1 = require("./control-options");
const _dashboard_update_hub_1 = require("./dashboard-update-hub/_dashboard-update-hub");
const _docking_layout_adapter_1 = require("./docking-layout/_docking-layout-adapter");
const _interfaces_1 = require("./internal/_interfaces");
const _options_manager_1 = require("./internal/_options-manager");
const _update_controller_1 = require("./internal/_update-controller");
const notificator_1 = require("./notification-controller/notificator");
const remote_service_1 = require("./remote-service");
const resource_manager_1 = require("./resource-manager");
const _viewer_api_1 = require("./viewer/_viewer-api");
const _item_viewer_adapter_factory_1 = require("./viewer/adapters/_item-viewer-adapter-factory");
class DashboardControl {
    constructor(element, options = {}) {
        this._repaintRequest = _jquery_helpers_1.createJQueryCallbacks();
        this._extensions = ko.observableArray();
        this._serviceClient = ko.observable();
        this._displayAllData = ko.observable();
        this._isLoading = ko.observable(false);
        this._perDashboardDisposables = [];
        this._layoutInfo = ko.observable(null);
        this._layoutInfoProviderCollection = [];
        this._actualLayoutController = ko.pureComputed(() => this._layoutInfo() && this._layoutInfo().layoutController());
        this._emptyControlTemplates = ko.observableArray();
        this._surfaceLeft = ko.observable(0);
        this._surfaceTop = ko.observable(0);
        this.surfaceLeft = ko.observable(0);
        this.surfaceTop = ko.observable(0);
        this.isDesignMode = ko.observable(true);
        this.dashboardContainer = ko.observable();
        this.dashboard = ko.computed(() => this.dashboardContainer() && this.dashboardContainer().dashboard || null);
        this.customTemplates = ko.observableArray();
        this.getWidgetContainer = () => {
            if (!this._widgetContainer) {
                let wc = this._element.querySelector('.dx-dashboard-widget-container');
                if (wc) {
                    this._widgetContainer = wc;
                }
            }
            return this._widgetContainer;
        };
        this._updateController = new _update_controller_1.UpdateController({
            'updateItemToolbars': {
                action: () => {
                    if (this.dashboard()) {
                        this._viewerApi.updateItemCaptionToolbar();
                    }
                },
                masterActions: ['refreshData', 'reinitializeDashboard', 'loadDashboard']
            },
            'updateDashboardToolbar': {
                action: () => this._reinitializeDashboard(),
                masterActions: ['reinitializeDashboard', 'loadDashboard']
            },
            'refreshData': {
                action: () => this._reinitializeDashboard(),
                masterActions: ['reinitializeDashboard', 'loadDashboard']
            },
            'reinitializeDashboard': {
                action: () => this._reinitializeDashboard(),
                masterActions: ['loadDashboard']
            },
            'loadDashboard': {
                action: () => {
                    if (this.option('dashboardId')) {
                        this._loadDashboardCore(this.option('dashboardId'));
                    }
                    else {
                        this._unloadDashboardCore();
                    }
                }
            },
            'noop': {
                action: () => { },
                masterActions: ['updateItemToolbars', 'updateDashboardToolbar', 'refreshData', 'reinitializeDashboard', 'loadDashboard'],
            }
        }, (stateProvider, action) => {
            switch (stateProvider()) {
                case 'controlInitializing':
                    return 'noop';
                case 'controlInitialized':
                case 'dashboardLoading':
                case 'dashboardLoaded':
                case 'dashboardInitializing':
                    return action === 'loadDashboard' ? action : 'noop';
                case 'dashboardInitialized':
                    return action;
            }
        });
        this._workingModeChangeDeferred = _jquery_helpers_1.createJQueryDeferred();
        _cssHelper_1.createStylesElement(options.nonce);
        this._updateController.switchControlState('controlInitializing');
        this._element = element;
        this._controlOptions = this._getDefaultOptions();
        this._defaultControlOptions = this._getDefaultOptions();
        this._eventsStrategy = events_strategy_1.EventsStrategy.create(this, options.eventsStrategy);
        this._options = new options_1.Options(this._controlOptions, this._defaultControlOptions, this._getOptionsByReference(), this._getDeprecatedOptions());
        this._options.onChanging((name, previousValue, value) => this._optionChanging(name, value, previousValue));
        this._options.onChanged((name, value, previousValue) => this._notifyOptionChanged(name, value));
        this._options.onStartChange(() => this.beginUpdate());
        this._options.onEndChange(() => this.endUpdate());
        if (options.extensions) {
            for (let extensionName in options.extensions) {
                if (control_options_1.extensionNameMap.hasOwnProperty(extensionName)) {
                    const newName = control_options_1.extensionNameMap[extensionName];
                    if (newName !== extensionName) {
                        options.extensions[newName] = options.extensions[extensionName];
                        delete options.extensions[extensionName];
                    }
                }
            }
        }
        this.resizeByTimer = ko.observable(this._defaultControlOptions.resizeByTimer);
        this.option(options);
        this._endpointCollection = this._unrollEndpointCollection(this.option());
        this.remoteService = this._remoteServiceFactory();
        legacy_settings_1.LegacySettings._useCardLegacyLayout = this.option('useCardLegacyLayout');
        this.surfaceLeft.subscribe(value => {
            this._surfaceLeft(value);
            this.repaint();
        });
        this.surfaceTop.subscribe(value => {
            this._surfaceTop(value);
            this.repaint();
        });
        this._dashboardContext = {
            beforeApplyViewerItemOptions: _jquery_helpers_1.createJQueryCallbacks(),
            viewerItemCreated: _jquery_helpers_1.createJQueryCallbacks(),
            viewerItemDispose: _jquery_helpers_1.createJQueryCallbacks(),
            addContextToolbarItems: _jquery_helpers_1.createJQueryCallbacks(),
            viewerItemCreator: {},
            refresh: (itemName) => this.refresh(itemName),
            useNeutralFilterMode: () => this.option('useNeutralFilterMode'),
            isDesignMode: this.isDesignMode,
            viewerItemsManager: null
        };
        this._dashboardContext.beforeApplyViewerItemOptions.add((item, itemOptions, isCreation) => {
            itemOptions.useNeutralFilterMode = this.option('useNeutralFilterMode');
            itemOptions.encodeHtml = this.encodeHtml;
        });
        this._externalTemplates = ko.computed(() => {
            var result = [];
            this.customTemplates().forEach(template => {
                result.push(template);
            });
            this._extensions().forEach(extension => {
                if (extension['template']) {
                    if (typeof extension['template'] === 'string') {
                        result.push({
                            name: extension['template'],
                            data: extension
                        });
                    }
                    else {
                        result.push(extension['template']);
                    }
                }
            });
            return result;
        });
        this.notificationController = new notificator_1.NotificationController();
        this.isDesignMode.subscribe(isDesignMode => {
            this._validateWorkingMode();
        }, null, 'beforeChange');
        this.isDesignMode.subscribe(isDesignMode => {
            this._validateWorkingMode();
            this._initializeServiceClient(this.dashboardContainer());
        });
        this._allowSwitchToDesigner = this.option('workingMode') !== 'ViewerOnly';
        let extensionsToRegister = {};
        for (let name in control_options_1.defaultExtensions) {
            extensionsToRegister[name] = control_options_1.defaultExtensions[name];
        }
        if (this.allowSwitchToDesigner) {
            for (let name in control_options_1.designerExtensions) {
                extensionsToRegister[name] = control_options_1.designerExtensions[name];
            }
        }
        analytics_internal_1._setShowMessageFunc((msg, type, displayTime, debugInfo) => { });
        this._dockingLayoutAdapter = new _docking_layout_adapter_1.DockingLayoutAdapter(this);
        this._dockingLayoutAdapter.start();
        this._raiseEvent('initializing', { component: this });
        this._viewerApi = new _viewer_api_1.ViewerApi(this);
        this._viewerApi.start();
        this._registerDefaultExtensions(extensionsToRegister, this.option('extensions'));
        this._registerKeyProcessing();
        this._isLoading.subscribe(isLoading => this.notificationController.suspended(isLoading));
        this._isLoading(true);
        this._updateController.switchControlState('controlInitialized');
        setTimeout(() => {
            if (!this.dashboard()) {
                this._loadInitialDashboard()
                    .done(() => {
                    var initialDashboardState = this.option('initialDashboardState');
                    if (initialDashboardState) {
                        this.dashboard().stateString = initialDashboardState;
                    }
                })
                    .always(() => { this._isLoading(false); });
            }
            else {
                this._isLoading(false);
            }
        }, 1);
        _defineDashboardControlObsoleteMethods(this);
        if (this.option('renderImmediately')) {
            this.render();
        }
    }
    static _recursiveAsyncEval(sequence, cancellationToken, previousOptions, currentIndex = 0) {
        if (!previousOptions) {
            previousOptions = {
                surfaceLeft: 0
            };
        }
        var def = _jquery_helpers_1.createJQueryDeferred();
        let sequenceActions = sequence[currentIndex];
        if (sequenceActions) {
            let actions = sequenceActions.map(sa => sa.cancelableAction);
            $.when(...actions.map(a => a(previousOptions, cancellationToken)))
                .done((...options) => {
                if (cancellationToken.canceled)
                    def.reject();
                else {
                    DashboardControl._recursiveAsyncEval(sequence, cancellationToken, _helpers_1.combineOptions(previousOptions, options), currentIndex + 1)
                        .done((opts) => {
                        if (cancellationToken.canceled)
                            def.reject();
                        else
                            def.resolve(opts);
                    })
                        .fail(() => def.reject());
                }
            })
                .fail(() => def.reject());
        }
        else {
            if (cancellationToken.canceled)
                def.reject();
            else {
                if (cancellationToken.canceled)
                    def.reject();
                else
                    def.resolve(previousOptions);
            }
        }
        return def.promise();
    }
    get _updateHub() {
        return this._updateHubPrivate;
    }
    get encodeHtml() {
        return this.option('encodeHtml');
    }
    get showConfirmationOnBrowserClosing() { return this.option('showConfirmationOnBrowserClosing'); }
    get allowSwitchToDesigner() {
        return this._allowSwitchToDesigner;
    }
    get maximizedDashboardItemName() {
        var fullscreenItemProvider = this._getFullscreenItemProvider();
        return fullscreenItemProvider && fullscreenItemProvider.maximizedItemName || '';
    }
    get extensions() {
        return this._extensions();
    }
    get _classList() {
        if (this._surfaceTop() !== 0) {
            return 'dx-dashboard-surface-toolbar-visible';
        }
    }
    element() {
        return this._element;
    }
    on(eventName, eventHandler) {
        this._eventsStrategy.on(eventName, eventHandler);
    }
    off(eventName, eventHandler) {
        this._eventsStrategy.off(eventName, eventHandler);
    }
    _raiseEvent(eventName, eventArgs) {
        this._eventsStrategy.fireEvent(eventName, [eventArgs]);
        var optionName = _options_manager_1.getOptionNameByEvent(eventName);
        if (optionName) {
            let func = this.option(optionName);
            if (func) {
                func.call(this, eventArgs);
            }
        }
    }
    option(...args) {
        return this._options.option(...args);
    }
    _silent(...args) {
        return this._options.silent(...args);
    }
    resetOption(name) {
        this.beginUpdate();
        this._options.reset(name);
        this.endUpdate();
    }
    beginUpdate() {
        this._updateController.beginUpdate();
    }
    endUpdate() {
        this._updateController.endUpdate();
    }
    _getOptionValue(name, context) {
        const value = this.option(name);
        return value;
    }
    _getDefaultOptions() {
        return {
            limitVisibleDataMode: 'Designer',
            resizeByTimer: true,
            encodeHtml: true,
            useNeutralFilterMode: true,
            allowMaximizeItems: true,
            useCardLegacyLayout: false,
            showConfirmationOnBrowserClosing: true,
            workingMode: 'Designer',
            loadDefaultDashboard: true,
            dataRequestOptions: {},
            extensions: {}
        };
    }
    _getOptionsByReference() {
        return {};
    }
    _getDeprecatedOptions() {
        return {};
    }
    _notifyOptionChanged(option, value) {
        document.createElement;
        const name = option;
        const args = {
            name: name.split(/[.[]/)[0],
            fullName: name,
            value: value,
            component: this
        };
        this._optionChanged(args);
        this._raiseEvent('optionChanged', args);
    }
    _reinitializeDashboard() {
        if (this.dashboard()) {
            var dashboardState = this.getDashboardState();
            this.initializeDashboard(this.option('dashboardId'), this.dashboard().getJSON(), dashboardState && JSON.parse(this.getDashboardState()) || '');
        }
    }
    _getCebabCaseExtensionName(extensionName) {
        const index = Object.keys(control_options_1.extensionNameMap).map(k => control_options_1.extensionNameMap[k]).indexOf(extensionName);
        return index === -1 ? extensionName : Object.keys(control_options_1.extensionNameMap)[index];
    }
    _getCamelCaseExtensionName(extensionName) {
        return control_options_1.extensionNameMap[extensionName] || extensionName;
    }
    _optionChanging(name, value, previousValue) {
        switch (name) {
            case 'workingMode':
                if (this._updateController.getControlState() !== 'controlInitializing' && (previousValue === 'ViewerOnly' || value === 'ViewerOnly')) {
                    throw new Error(`Cannot switch to ${value} from ${previousValue} mode.`);
                }
                break;
        }
    }
    _optionChanged(args) {
        switch (args.name) {
            case 'dashboardId':
                if (this._updateController.getControlState() !== 'dashboardInitializing')
                    this._updateController.addAction('loadDashboard');
                break;
            case 'workingMode':
                if (this._updateController.getControlState() === 'controlInitializing') {
                    this.isDesignMode(args.value === 'Designer');
                }
                else {
                    if (args.value === 'Designer') {
                        this._switchToDesigner();
                    }
                    else {
                        this._switchToViewer();
                    }
                }
                break;
            case 'initialDashboardState':
                break;
            case 'useNeutralFilterMode':
                this._updateController.addAction('reinitializeDashboard');
                break;
            case 'useCardLegacyLayout':
                break;
            case 'resizeByTimer':
                this.resizeByTimer(args.value);
                break;
            case 'endpoint':
                break;
            case 'dataRequestOptions':
                this._updateController.addAction('reinitializeDashboard');
                break;
            case 'encodeHtml':
                this._updateController.addAction('reinitializeDashboard');
                break;
            case 'ajaxRemoteService':
            case 'fetchRemoteService':
                this._updateRemoteServiceOptions(args.name);
                break;
            case 'limitVisibleDataMode':
                this._updateController.addAction('reinitializeDashboard');
                break;
            case 'onInitializing':
            case 'onOptionChanged':
                break;
            case 'allowMaximizeItems':
                if (this._actualLayoutController()) {
                    this._actualLayoutController().allowMaximizeItems = args.value;
                }
                this._updateController.addAction('updateItemToolbars');
                break;
            case 'extensions':
                if (this._updateController.getControlState() !== 'controlInitializing') {
                    this._processExtensionsOption(args);
                }
                break;
            case 'onDashboardInitializing':
            case 'onDashboardInitialized':
            case 'onDashboardStateChanged':
            case 'onItemBeginUpdate':
            case 'onItemEndUpdate':
            case 'onDashboardBeginUpdate':
            case 'onDashboardEndUpdate':
            case 'showConfirmationOnBrowserClosing':
            case 'loadDefaultDashboard':
                break;
        }
        this._updateController.commitUpdate();
    }
    _updateRemoteServiceOptions(remoteServiceOptionsKey) {
        const remoteServiceOptions = this.option(remoteServiceOptionsKey);
        const remoteServiceType = remoteServiceOptionsKey === 'ajaxRemoteService' ? remote_service_1.AjaxRemoteService : remote_service_1.FetchRemoteService;
        const controlState = this._updateController.getControlState();
        const canChangeRemoteService = controlState === 'controlInitializing' || controlState === 'controlInitialized';
        if (this.remoteService && this.remoteService instanceof remoteServiceType) {
            if (canChangeRemoteService && !remoteServiceOptions) {
                this.remoteService = null;
            }
            else {
                this.remoteService._applyOptions(remoteServiceOptions);
            }
        }
        else if (canChangeRemoteService) {
            this.remoteService = this._remoteServiceFactory();
        }
    }
    _processExtensionsOption(args) {
        if (args.name === args.fullName && args.value === false) {
            this._unregisterExtensionCore(...this._extensions().map(extension => extension.name));
            return;
        }
        if (args.name === args.fullName && typeof args.value === 'object') {
            this._processExtensionsOptions(args.value);
            return;
        }
        else {
            const parts = args.fullName
                .split(/(?:\[|\]|\.)/)
                .filter(item => !!item.length);
            const extensionName = parts[1];
            let extensionOptionParts = parts.slice(2);
            this._processExtensionsOptions({
                [extensionName]: this._createExtensionOption(extensionOptionParts, args.value)
            });
        }
    }
    _createExtensionOption(parts, value) {
        if (parts.length === 0)
            return value;
        return parts.slice(0, parts.length - 1).reverse().reduce((acc, cur) => {
            return { [cur]: acc };
        }, {
            [parts[parts.length - 1]]: value
        });
    }
    _processExtensionsOptions(extensionsOptions) {
        Object.keys(extensionsOptions).forEach(key => {
            let extensionName = key;
            let extensionOptions = extensionsOptions[extensionName];
            if (extensionOptions === false) {
                this._unregisterExtensionCore(extensionName);
            }
            else if (typeof extensionOptions === 'object') {
                var extension = this.findExtension(extensionName);
                if (!extension) {
                    const extensionsFactory = Object.assign(Object.assign({}, control_options_1.defaultExtensions), control_options_1.designerExtensions);
                    const extensionCreator = extensionsFactory[this._getCebabCaseExtensionName(extensionName)];
                    _utils_1.type.isFunction(extensionCreator) && this.registerExtension(extensionCreator(this, extensionOptions));
                }
                else {
                    var optionsManager = extension && extension._optionsManager;
                    if (optionsManager) {
                        Object.keys(extensionOptions).forEach((optionName) => {
                            const extensionArgs = { name: optionName, fullName: optionName, value: extensionOptions[optionName] };
                            var extensionAction = optionsManager.optionChanged(extensionArgs);
                            if (extensionAction)
                                this._updateController.addAction(extensionAction);
                        });
                    }
                }
            }
        });
    }
    _updateLayout() {
        var binders = this._layoutInfoProviderCollection;
        var binder = binders.filter(b => b.condition())[0];
        if (binder && (!this._layoutInfo() || binder.name !== this._layoutInfo().template.name)) {
            this._layoutInfo({
                template: {
                    name: binder.name,
                    data: binder.getViewModel(),
                },
                layoutController: binder.getLayoutController(),
            });
        }
    }
    get _colorSchemeCss() {
        return _dx_devextreme_themes_integration_1.getBaseColorScheme() === 'light' ? 'dx-color-scheme-light' : 'dx-color-scheme-dark';
    }
    repaint() {
        this._repaintRequest.fire();
    }
    render() {
        resource_manager_1.ResourceManager._embedBundledResourcesCore(this._element);
        this._raiseEvent('beforeRender', { component: this });
        var openComment = document.createComment(" ko template: { name: 'dx-dashboard-control' } "), closingComment = document.createComment(' /ko ');
        this._element.appendChild(openComment);
        this._element.appendChild(closingComment);
        this._applyBindings(this._element);
    }
    maximizeDashboardItem(itemName) {
        if (this.dashboard()) {
            var dashboardItem = this.dashboard().findItem(itemName);
            if (dashboardItem) {
                var fullscreenItemProvider = this._getFullscreenItemProvider();
                if (fullscreenItemProvider) {
                    fullscreenItemProvider.maximizeItem(dashboardItem);
                }
            }
            else {
                throw Error("The item with the '" + itemName + "' name does not exist");
            }
        }
    }
    restoreDashboardItem() {
        var fullscreenItemProvider = this._getFullscreenItemProvider();
        fullscreenItemProvider && fullscreenItemProvider.restoreDownItem();
    }
    initializeDashboard(id, dashboardJson, initialState) {
        this._updateController.switchControlState('dashboardInitializing');
        if (this.option('dashboardId') !== id) {
            this.option('dashboardId', id);
        }
        this._unloadDashboardServices();
        var dashboard = new dashboard_1.Dashboard(dashboardJson);
        if (initialState) {
            dashboard._state(initialState);
        }
        let e = {
            component: this,
            dashboard: dashboard,
            dashboardId: id,
            ready: _jquery_helpers_1.createJQueryDeferred().resolve().promise()
        };
        this._raiseEvent('dashboardInitializing', e);
        e.ready.done(() => {
            dashboard.items().forEach(item => item._useNeutralFilterMode(this.option('useNeutralFilterMode')));
            this._perDashboardDisposables.push(_knockout_utils_1.subscribeArrayChange(dashboard.items, {
                added: (newItem) => newItem._useNeutralFilterMode(this.option('useNeutralFilterMode'))
            }));
            var dashboardContainer = { id: id, dashboard: dashboard };
            this._initializeServiceClient(dashboardContainer);
            this._dataSourceBrowser = new _data_source_browser_1.DataSourceBrowser(dashboard.dataSources, this.isDesignMode, dashboard.parameters, this._serviceClient, this._isLoading);
            this._dashboardContext.viewerItemsManager = new _item_viewer_adapter_factory_1.ViewerItemAdaptersManager();
            this._perDashboardDisposables.push(this._dashboardContext.viewerItemsManager);
            this._updateHubPrivate = new _dashboard_update_hub_1.DashboardUpdateHub(dashboard, this.option('dataRequestOptions'), {
                getItemData: (item) => this._serviceClient().getItemData(item, isModeAllowsToReduceData()),
                getBatchItemData: (items) => this._serviceClient().getBatchItemData(items, isModeAllowsToReduceData()),
                getMapShapeFile: (item) => this._serviceClient().getMapShapeFile(item.componentName()),
                clearDimensionValuesCache: () => { var _a; return (_a = this._dataSourceBrowser) === null || _a === void 0 ? void 0 : _a.clearDimensionValuesCache(); }
            }, () => this._actualLayoutController() && this._actualLayoutController().visibleItemsProvider || null);
            this._updateHubPrivate.dashboardBeginUpdate = () => this._raiseEvent('dashboardBeginUpdate', {
                component: this,
                dashboardId: this.dashboardContainer().id
            });
            this._updateHubPrivate.dashboardEndUpdate = () => this._raiseEvent('dashboardEndUpdate', {
                component: this,
                dashboardId: this.dashboardContainer().id
            });
            this._updateHubPrivate.itemBeginUpdate = (itemName) => this._raiseEvent('itemBeginUpdate', {
                component: this,
                dashboardId: this.dashboardContainer().id,
                itemName: itemName
            });
            this._updateHubPrivate.itemEndUpdate = (itemName) => this._raiseEvent('itemEndUpdate', {
                component: this,
                dashboardId: this.dashboardContainer().id,
                itemName: itemName
            });
            this.dashboardContainer(dashboardContainer);
            this.notificationController.reset();
            this._updateController.switchControlState('dashboardInitialized');
            this._raiseEvent('dashboardInitialized', {
                component: this,
                dashboardId: id,
                dashboard: dashboard
            });
            this._raiseEvent('dashboardStateChanged', {
                component: this,
                dashboard: dashboard,
                dashboardId: id,
                stateString: dashboard.stateString
            });
            let isModeAllowsToReduceData = () => {
                var limitMode = this.option('limitVisibleDataMode');
                return limitMode === 'DesignerAndViewer' || (this.isDesignMode() && limitMode === 'Designer');
            };
            this._updateHubPrivate.initialize();
            this._perDashboardDisposables.push(this.dashboard()._state.subscribe((_) => {
                this._raiseEvent('dashboardStateChanged', {
                    component: this,
                    dashboard: this.dashboard(),
                    dashboardId: this.dashboardContainer().id,
                    stateString: dashboard.stateString
                });
            }));
        }).fail(() => {
            this.notificationController.reset();
        });
    }
    requestDashboardList() {
        var urls = this._endpointCollection.dashboardUrls;
        if (urls) {
            return this.remoteService.getFromServer(urls.GetDashboardsAction, null, { cache: false })
                .fail(() => {
                this.notificationController.showError(_default_1.getLocalizationById('DashboardWebStringId.Notification.AttemptToLoadDashboards'));
            });
        }
        return _jquery_helpers_1.createJQueryDeferred().reject().promise();
    }
    loadDashboard(dashboardId) {
        var def = _jquery_helpers_1.createJQueryDeferred();
        if (this._dashboardLoadingDeferred) {
            this._dashboardLoadingDeferred.reject();
        }
        this._dashboardLoadingDeferred = def;
        if (this.option('dashboardId') === dashboardId) {
            this._loadDashboardCore(dashboardId);
        }
        else {
            this.option('dashboardId', dashboardId);
        }
        return def.promise();
    }
    _loadDashboardCore(dashboardId) {
        let isValidRequest = _helpers_1.requestParamsValidator.isValid({ dashboardId });
        var urls = this._endpointCollection && this._endpointCollection.dashboardUrls || null;
        if (urls && isValidRequest) {
            const prevDashboardState = this._updateController.getControlState();
            this._updateController.switchControlState('dashboardLoading');
            this.notificationController.showState(_default_1.getLocalizationById('DashboardWebStringId.Notification.DashboardLoading'));
            return this.remoteService.getFromServer(urls.DashboardAction + '/' + encodeURIComponent(dashboardId), null, { cache: false })
                .done((result) => {
                this._updateController.switchControlState('dashboardLoaded');
                if (this.option('dashboardId') === dashboardId) {
                    this.initializeDashboard(dashboardId, result.Dashboard, result.initialState);
                    this._dashboardLoadingDeferred && this._dashboardLoadingDeferred.resolve();
                }
            }).fail((val) => {
                this._updateController.switchControlState(prevDashboardState);
                this._dashboardLoadingDeferred && this._dashboardLoadingDeferred.reject();
                this.notificationController.showError(_default_1.getLocalizationById('DashboardWebStringId.Notification.AttemptToLoadDashboard') + dashboardId, val);
            });
        }
        this._dashboardLoadingDeferred && this._dashboardLoadingDeferred.reject();
        this.notificationController.showError(_default_1.getLocalizationById('DashboardWebStringId.Notification.AttemptToLoadDashboard') + String(dashboardId));
        return _jquery_helpers_1.createJQueryDeferred().reject().promise();
    }
    unloadDashboard() {
        this.option('dashboardId', null);
    }
    _unloadDashboardCore() {
        this._unloadDashboardServices();
        this.dashboardContainer(null);
    }
    switchToViewer() {
        this.option('workingMode', 'Viewer');
    }
    _switchToViewer() {
        var actions = this.extensions
            .filter(extension => !!extension.designerToViewerAction)
            .map(extension => _helpers_1.toCancelableSequenceAction(extension.designerToViewerAction))
            .sort((a, b) => a.orderNo - b.orderNo);
        let groups = _utils_1.groupByProperty(actions, 'orderNo');
        this._workingModeChangeDeferred.reject();
        this._workingModeChangeDeferred = _jquery_helpers_1.createJQueryDeferred();
        return DashboardControl._recursiveAsyncEval(groups, new _helpers_1.CancellationToken(this._workingModeChangeDeferred), { surfaceLeft: this._surfaceLeft(), surfaceTop: this._surfaceTop() })
            .then(options => {
            this.surfaceLeft(options.surfaceLeft);
            this.surfaceTop(options.surfaceTop);
            this.isDesignMode(false);
            this._workingModeChangeDeferred.resolve();
        }, () => this.switchToDesigner());
    }
    switchToDesigner() {
        this.option('workingMode', 'Designer');
    }
    _switchToDesigner() {
        this._validateWorkingMode();
        var actions = this.extensions
            .filter(extension => !!extension.viewerToDesignerAction)
            .map(extension => _helpers_1.toCancelableSequenceAction(extension.viewerToDesignerAction))
            .sort((a, b) => a.orderNo - b.orderNo);
        let groups = _utils_1.groupByProperty(actions, 'orderNo');
        this._workingModeChangeDeferred.reject();
        this._workingModeChangeDeferred = _jquery_helpers_1.createJQueryDeferred();
        return DashboardControl._recursiveAsyncEval(groups, new _helpers_1.CancellationToken(this._workingModeChangeDeferred), { surfaceLeft: this._surfaceLeft(), surfaceTop: this._surfaceTop() })
            .then((options) => {
            this.surfaceLeft(options.surfaceLeft);
            this.surfaceTop(options.surfaceTop);
            this.isDesignMode(true);
            this._workingModeChangeDeferred.resolve();
        }, () => this.switchToViewer());
    }
    reloadData() {
        if (this.dashboard()) {
            this._serviceClient().markDataSourcesForReload().done((result) => {
                this.refresh();
            });
        }
    }
    refresh(args) {
        if (this.dashboard()) {
            var itemNames = [];
            if (!args) {
                itemNames = this.dashboard()._dataDashboardItems().map(item => item.componentName());
            }
            else if (typeof args === 'string') {
                itemNames = [args];
            }
            else if (Array.isArray(itemNames)) {
                itemNames = args;
            }
            else {
                throw Error('Invalid arguments');
            }
            this._updateHubPrivate.refreshItems(itemNames);
        }
    }
    getDashboardState() {
        var dashboard = this.dashboard();
        if (dashboard)
            return dashboard.stateString;
        return null;
    }
    setDashboardState(dashboardState) {
        var dashboard = this.dashboard();
        if (dashboard) {
            if (typeof dashboardState === 'string') {
                dashboard.stateString = dashboardState;
            }
            else {
                dashboard._state(dashboardState);
            }
        }
    }
    getDashboardId() {
        var dashboardContainer = this.dashboardContainer();
        if (dashboardContainer)
            return dashboardContainer.id;
        return null;
    }
    registerIcon(icon) {
        resource_manager_1.ResourceManager.registerIcon(icon);
    }
    registerExtension(...extensions) {
        extensions.forEach(extension => {
            if (this._canAddExtension(extension))
                this._registerExtensionCore(extension);
        });
    }
    _registerExtensionCore(extension) {
        const camelCaseExtensionName = this._getCamelCaseExtensionName(extension.name);
        const optionsManager = extension._optionsManager;
        if (optionsManager) {
            if (typeof this._controlOptions.extensions !== 'object') {
                this._controlOptions.extensions = {};
            }
            this._controlOptions.extensions[camelCaseExtensionName] = optionsManager.getInitialOptions();
            this._defaultControlOptions.extensions[camelCaseExtensionName] = optionsManager.getDefaultOptions();
        }
        else {
            this._controlOptions.extensions = this._controlOptions.extensions || {};
            this._controlOptions.extensions[camelCaseExtensionName] = {};
        }
        this._addExtension(extension);
        this._startExtension(extension);
    }
    findExtension(extensionName) {
        const camelName = this._getCamelCaseExtensionName(extensionName);
        return this._extensions().find(ext => ext.name === camelName);
    }
    unregisterExtension(...extensionNames) {
        extensionNames.forEach(name => {
            const camelName = this._getCamelCaseExtensionName(name);
            this.option(`extensions.${camelName}`, false);
            this._defaultControlOptions.extensions[camelName] = false;
        });
    }
    _unregisterExtensionCore(...extensionNames) {
        extensionNames.forEach(extensionName => {
            var extension = this.findExtension(extensionName);
            if (!!extension) {
                var customItemExtension = extension;
                if (customItemExtension.createViewerItem) {
                    this._dashboardContext.viewerItemCreator[extension.name] = undefined;
                }
                if (customItemExtension.metaData) {
                    delete serializable_model_1.itemTypesMap[extension.name];
                }
                extension.stop && extension.stop();
                this._extensions.remove(extension);
            }
        });
    }
    subscribeExtensionsChanged(handlers) {
        return _knockout_utils_1.subscribeArrayChange(this._extensions, handlers);
    }
    dispose() {
        this._unloadDashboardCore();
        this._viewerApi.stop();
        this._dockingLayoutAdapter.dispose();
        $.fn.constructor(document).off('.dx-dshd');
        ko.cleanNode(this._element);
        this._element.innerHTML = '';
        resource_manager_1.ResourceManager._removeEmbeddedResourcesCore(this._element);
    }
    _renderDashboardItem(element, dashboardItemName, isStandalone = true) {
        var openComment = document.createComment(" ko template: { name: 'dx-dashboard-standalone-item' } "), closingComment = document.createComment(' /ko ');
        element.appendChild(openComment);
        element.appendChild(closingComment);
        var dashboardItem = ko.computed(() => this.dashboard() && this.dashboard().items().filter(i => i.componentName.peek() === dashboardItemName)[0]);
        this._applyBindings(element, {
            dashboardItem: dashboardItem,
            context: this._dashboardContext,
            sizeController: new _interfaces_1.SingleItemSizeController(element, this._repaintRequest),
            isStandalone: isStandalone
        });
    }
    _getFullscreenItemProvider() {
        return this._actualLayoutController() && this._actualLayoutController().fullscreenItemProvider;
    }
    _registerKeyProcessing() {
        _staticInitialize();
        var _ignoreKeyProcessing = () => {
            if (!this.isDesignMode() || !this._actualLayoutController()) {
                return true;
            }
            var activeElement = $.fn.constructor(document.activeElement);
            if (activeElement.is('textarea') || activeElement.is(':input') && (['password', 'text', 'number'].indexOf(activeElement.attr('type')) != -1)) {
                return true;
            }
            return false;
        };
        $.fn.constructor(document).on('keyup.dx-dshd', (e) => {
            if (_ignoreKeyProcessing()) {
                return;
            }
            if (this._dockingLayoutAdapter.processKeyEvent && this._dockingLayoutAdapter.processKeyEvent('keyup', e)) {
                return false;
            }
            var i;
            for (i = 0; i < this._extensions().length; i++) {
                var extension = this._extensions()[i];
                if (extension.processKeyEvent && extension.processKeyEvent('keyup', e)) {
                    return false;
                }
            }
        });
        $.fn.constructor(document).on('keydown.dx-dshd', (e) => {
            if (_ignoreKeyProcessing()) {
                return;
            }
            var i;
            for (i = 0; i < this._extensions().length; i++) {
                var extension = this._extensions()[i];
                if (extension.processKeyEvent && extension.processKeyEvent('keydown', e)) {
                    return false;
                }
            }
        });
    }
    _registerDefaultExtensions(extensions, extensionOptions = {}) {
        if (extensionOptions !== false) {
            for (let extensionName in extensions) {
                const camelName = this._getCamelCaseExtensionName(extensionName);
                let options = extensionOptions[camelName];
                if (options !== false) {
                    if (!!options && typeof options !== 'object') {
                        throw Error('Extension options ');
                    }
                    let extension = extensions[extensionName](this, options);
                    this._canAddExtension(extension) && this._addExtension(extension);
                    var optionsManager = extension._optionsManager;
                    this._controlOptions.extensions[camelName] = _jquery_helpers_1.deepExtend({}, optionsManager && optionsManager.getInitialOptions(), options);
                    this._defaultControlOptions.extensions[camelName] = optionsManager && optionsManager.getDefaultOptions();
                }
            }
            if (typeof extensionOptions === 'object') {
                for (let extensionName in extensionOptions) {
                    const camelName = this._getCamelCaseExtensionName(extensionName);
                    let options = extensionOptions[camelName];
                    if (typeof options === 'function') {
                        let extensionCreator = options;
                        let extension = extensionCreator(this);
                        this._canAddExtension(extension) && this._addExtension(extension);
                        var optionsManager = extension._optionsManager;
                        this._controlOptions.extensions[camelName] = optionsManager && optionsManager.getInitialOptions();
                        this._defaultControlOptions.extensions[camelName] = optionsManager && optionsManager.getDefaultOptions();
                    }
                }
            }
        }
        this.extensions.forEach(extension => this._startExtension(extension));
    }
    _unrollEndpointCollection(options) {
        if (options['endpointCollection']) {
            return options['endpointCollection'];
        }
        else if (options.endpoint) {
            return {
                dashboardUrls: {
                    DashboardAction: options.endpoint + '/dashboards',
                    GetDashboardsAction: options.endpoint + '/dashboards'
                },
                dataSourceUrls: {
                    GetDataSourcesAction: options.endpoint + '/dataSources'
                },
                dataSourceWizardUrls: {
                    DataSourceWizardAction: options.endpoint + '/data/DataSourceWizardAction',
                    GetConnectionStringsAction: options.endpoint + '/data/GetConnectionStringsAction'
                },
                dataServiceUrls: {
                    ConvertItemAction: options.endpoint + '/data/ConvertItemAction',
                    DashboardItemGetAction: options.endpoint + '/data/DashboardItemGetAction',
                    DimensionFilterItemsAction: options.endpoint + '/data/DimensionFilterItemsAction',
                    DimensionFilterStringAction: options.endpoint + '/data/DimensionFilterStringAction',
                    DimensionUniqueValuesAction: options.endpoint + '/data/DimensionUniqueValuesAction',
                    FieldListAction: options.endpoint + '/data/FieldListAction',
                    GetColoringSchemeAction: options.endpoint + '/data/GetColoringSchemeAction',
                    GetDashboardPaletteAction: options.endpoint + '/data/GetDashboardPaletteAction',
                    GetMapShapeFileAction: options.endpoint + '/data/GetMapShapeFileAction',
                    GetUnderlyingDataAction: options.endpoint + '/data/GetUnderlyingDataAction',
                    MarkDataSourcesForReloadAction: options.endpoint + '/data/MarkDataSourcesForReloadAction',
                    ParameterValuesAction: options.endpoint + '/data/ParameterValuesAction',
                    PerformExportAction: options.endpoint + '/data/PerformExportAction',
                    DashboardItemBatchGetAction: options.endpoint + '/data/DashboardItemBatchGetAction',
                    GetAvailableFontFamiliesAction: options.endpoint + '/data/GetAvailableFontFamiliesAction'
                }
            };
        }
        else {
            return {};
        }
    }
    _loadInitialDashboard() {
        if (!!this.option('dashboardId')) {
            return this._loadDashboardCore(this.option('dashboardId'));
        }
        else if (!!this.option('initialDashboardId')) {
            return this.loadDashboard(this.option('initialDashboardId'));
        }
        else if (!!this.option('loadDefaultDashboard')) {
            var res = _jquery_helpers_1.createJQueryDeferred();
            this.requestDashboardList()
                .done(items => {
                if (items[0]) {
                    this.loadDashboard(items[0].id)
                        .done(() => res.resolve())
                        .fail(() => res.reject());
                }
                else {
                    res.reject();
                }
            })
                .fail(() => {
                res.reject();
            });
            return res.promise();
        }
        else {
            return _jquery_helpers_1.createJQueryDeferred().resolve().promise();
        }
    }
    _initializeServiceClient(dashboardContainer) {
        var serviceClient = this.isDesignMode() ?
            !this._validateWorkingMode() && new _service_client_1.DesignerDataServiceClient(dashboardContainer, this.notificationController, this._endpointCollection.dataServiceUrls, this.remoteService) || null :
            new _service_client_1.ViewerDataServiceClient(dashboardContainer, this.notificationController, this._endpointCollection.dataServiceUrls, this.remoteService);
        this._serviceClient(serviceClient);
    }
    _validateWorkingMode() {
        if (!this.allowSwitchToDesigner) {
            throw Error('Cannot switch to Designer from the ViewerOnly mode.');
        }
        return false;
    }
    _canAddExtension(extension) {
        if (!!this.findExtension(extension.name)) {
            console.error("The extension with the '" + extension.name + "' name is already registered.");
            return false;
        }
        return true;
    }
    _addExtension(extension) {
        this._extensions.push(extension);
        var customItemExtension = extension;
        if (customItemExtension.createViewerItem) {
            this._dashboardContext.viewerItemCreator[extension.name] = customItemExtension.createViewerItem;
        }
        if (customItemExtension.metaData) {
            serializable_model_1.itemTypesMap[extension.name] = _jquery_helpers_1.deepExtend({
                type: custom_item_1.CustomItem,
                customItemType: extension.name,
            }, customItemExtension.metaData);
        }
    }
    _startExtension(extension) {
        extension.start && extension.start();
    }
    _unloadDashboardServices() {
        var dashboard = this.dashboard();
        if (dashboard) {
            dashboard.dispose();
            if (this._updateHubPrivate) {
                this._updateHubPrivate.dispose();
                this._updateHubPrivate = null;
            }
            if (this._dataSourceBrowser) {
                this._dataSourceBrowser.dispose();
                this._dataSourceBrowser = null;
            }
        }
        this._perDashboardDisposables.forEach(d => d.dispose());
        this._perDashboardDisposables.splice(0, this._perDashboardDisposables.length);
    }
    _applyBindings(element, additionalProperties) {
        var viewModel = Object.assign({ getWidgetContainer: this.getWidgetContainer, surfaceLeft: this._surfaceLeft, surfaceTop: this._surfaceTop, colorSchemeCss: this._colorSchemeCss, classList: () => this._classList, isDashboardLoaded: ko.computed(() => !!this.dashboard()), layoutTemplate: _knockout_utils_1.safeComputed({ info: this._layoutInfo }, ({ info }) => info.template), externalTemplates: this._externalTemplates, emptyControlTemplates: this._emptyControlTemplates, notificationController: this.notificationController, isLoading: this._isLoading, getLocalizationById: _default_1.getLocalizationById, extend: _jquery_helpers_1.extend, $unwrap: _jquery_helpers_1.$unwrap, $: $, ko: ko }, additionalProperties);
        analytics_internal_1.appendStaticContextToRootViewModel(viewModel);
        ko.applyBindings(viewModel, element);
    }
    _remoteServiceFactory() {
        return this._createRemoteService({
            ajaxRemoteService: this.option('ajaxRemoteService'),
            fetchRemoteService: this.option('fetchRemoteService')
        });
    }
    _createRemoteService(option) {
        if (_utils_1.type.isDefined(option.ajaxRemoteService) && _utils_1.type.isDefined(option.fetchRemoteService)) {
            throw new Error('You cannot register more than one type of remote service. Use either ajaxRemoteService or fetchRemoteService.');
        }
        if (_utils_1.type.isDefined(option.ajaxRemoteService)) {
            return new remote_service_1.AjaxRemoteService(option.ajaxRemoteService);
        }
        return new remote_service_1.FetchRemoteService(option.fetchRemoteService);
    }
}
exports.DashboardControl = DashboardControl;
ko.bindingHandlers['element-height-change-provider'] = {
    init: (el, valueAccessor, allbindings, viewmodel, bindingcontext) => {
        var data = ko.unwrap(valueAccessor());
        var recalculate = () => {
            setTimeout(() => {
                data.height(_jquery_helpers_1.getHeight(el));
            }, 0);
        };
        data.model.subscribe(function () {
            recalculate();
        });
        recalculate();
    }
};
ko.bindingHandlers['xlinkHref'] = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        element.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#' + valueAccessor());
    }
};
ko.bindingHandlers['dxAttach2Model'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var attachmentName = ko.unwrap(valueAccessor());
        if (['getLookupDefaultValuesSelectBoxOptions', 'getLookupDefaultValueSelectBoxOptions', 'dataSourceBrowser'].indexOf(attachmentName) === -1) {
            throw 'non supported';
        }
        var findAttachment = (name) => {
            var context = bindingContext.$parents.filter((item) => { return item[name] !== undefined; })[0];
            if (context) {
                return context[name];
            }
            return null;
        }, attachment = findAttachment(attachmentName);
        if (attachment) {
            viewModel[attachmentName] = attachment;
        }
    }
};
function _staticInitialize() {
    popup_1.default.defaultOptions({
        options: {
            onInitialized: (e) => {
                var popup = e.component;
                popup.registerKeyHandler('escape', function (e) {
                    e.originalEvent.stopPropagation();
                    popup.hide();
                });
            }
        }
    });
}
function _defineDashboardControlObsoleteMethods(control) {
    _obsolete_helper_1.defineObsoleteProperty({
        target: control,
        memberName: 'toolbox',
        oldMemberDisplayName: 'DashboardControl.toolbox',
        newMemberDisplayName: 'ToolboxExtension.toolboxGroups',
        action: () => {
            var toolboxExtension = control.findExtension('toolbox');
            if (toolboxExtension) {
                return toolboxExtension.toolboxGroups;
            }
            else {
                console.error('The ToolboxExtension could not be found.');
            }
        }
    });
    _obsolete_helper_1.defineObsoleteProperty({
        target: control,
        memberName: 'toolbarItems',
        oldMemberDisplayName: 'DashboardControl.toolbarItems',
        newMemberDisplayName: 'ToolboxExtension.toolbarGroups',
        action: () => {
            var toolboxExtension = control.findExtension('toolbox');
            if (toolboxExtension) {
                return toolboxExtension.toolbarGroups;
            }
            else {
                console.error('The ToolboxExtension could not be found.');
            }
        }
    });
    _obsolete_helper_1.defineObsoleteProperty({
        target: control,
        memberName: 'menuItems',
        oldMemberDisplayName: 'DashboardControl.menuItems',
        newMemberDisplayName: 'ToolboxExtension.menuItems',
        action: () => {
            var toolboxExtension = control.findExtension('toolbox');
            if (toolboxExtension) {
                return toolboxExtension.menuItems;
            }
            else {
                console.error('The ToolboxExtension could not be found.');
            }
        }
    });
    _obsolete_helper_1.defineObsoleteProperty({
        target: control,
        memberName: 'menuVisible',
        oldMemberDisplayName: 'DashboardControl.menuVisible',
        newMemberDisplayName: 'ToolboxExtension.menuVisible',
        action: () => {
            var toolboxExtension = control.findExtension('toolbox');
            if (toolboxExtension) {
                return toolboxExtension.menuVisible;
            }
            else {
                console.error('The toolboxExtension could not be found.');
            }
        }
    });
    _obsolete_helper_1.defineObsoleteProperty({
        target: control,
        memberName: 'selectMenuItem',
        oldMemberDisplayName: 'DashboardControl.selectMenuItem',
        newMemberDisplayName: 'ToolboxExtension.selectMenuItem',
        action: () => {
            var toolboxExtension = control.findExtension('toolbox');
            if (toolboxExtension) {
                return toolboxExtension.selectMenuItem;
            }
            else {
                console.error('The toolboxExtension could not be found.');
            }
        }
    });
    _obsolete_helper_1.defineObsoleteProperty({
        target: control,
        memberName: 'undoEngine',
        oldMemberDisplayName: 'DashboardControl.undoEngine',
        newMemberDisplayName: 'UndoRedoExtension.undoEngine',
        action: () => {
            var undoEngineExtension = control.findExtension('undoRedo');
            if (undoEngineExtension) {
                return undoEngineExtension.undoEngine;
            }
            else {
                console.error('The UndoRedoExtension could not be found.');
            }
        }
    });
    _obsolete_helper_1.defineObsoleteProperty({
        target: control,
        memberName: 'colorSchemeCss',
        warmMessage: 'The DashboardControl.colorSchemeCss is obsolete. Use the DevExpress.ui.themes.current method instead.',
        action: () => control._colorSchemeCss
    });
    _obsolete_helper_1.defineObsoleteMethod({
        target: control,
        memberName: 'saveDashboard',
        oldMemberDisplayName: 'DashboardControl.saveDashboard',
        newMemberDisplayName: 'SaveDashboardExtension.saveDashboard',
        action: () => {
            var saveDashboardExtension = control.findExtension('saveDashboard');
            if (saveDashboardExtension) {
                return saveDashboardExtension.saveDashboard();
            }
            else {
                console.error('The SaveDashboardExtension could not be found.');
            }
        }
    });
    _obsolete_helper_1.defineObsoleteMethod({
        target: control,
        memberName: 'ensureDashboardSaved',
        oldMemberDisplayName: 'DashboardControl.ensureDashboardSaved',
        newMemberDisplayName: 'SaveDashboardExtension.ensureDashboardSaved',
        action: (action) => {
            var saveDashboardExtension = control.findExtension('saveDashboard');
            if (saveDashboardExtension) {
                return saveDashboardExtension.ensureDashboardSaved(action);
            }
            else {
                console.error('The SaveDashboardExtension could not be found.');
            }
        }
    });
    _obsolete_helper_1.defineObsoleteMethod({
        target: control,
        memberName: 'clearDesigner',
        oldMemberDisplayName: 'DashboardControl.clearDesigner',
        newMemberDisplayName: 'DashboardControl.unloadDashboard',
        action: () => control.unloadDashboard()
    });
    _obsolete_helper_1.defineObsoleteMethod({
        target: control,
        memberName: 'close',
        oldMemberDisplayName: 'DashboardControl.close',
        newMemberDisplayName: 'DashboardControl.unloadDashboard',
        action: () => control.unloadDashboard()
    });
}
analytics_widgets_internal_1.addToBindingsCache('template: { name: \'dx-dashboard-control\' }', function () {
    return {
        'template': function () {
            return { name: 'dx-dashboard-control' };
        }
    };
});
analytics_widgets_internal_1.addToBindingsCache('dxControlsDescendantBindings: true', function () {
    return {
        'dxControlsDescendantBindings': function () {
            return true;
        }
    };
});
