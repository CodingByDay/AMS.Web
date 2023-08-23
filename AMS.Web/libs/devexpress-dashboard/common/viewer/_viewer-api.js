﻿/**
* DevExpress Dashboard (_viewer-api.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewerApi = exports.viewerApiEventsNames = void 0;
const ko = require("knockout");
const _drill_through_data_wrapper_1 = require("../../data/drill-through-data/_drill-through-data-wrapper");
const _default_1 = require("../../data/localization/_default");
const _common_1 = require("../../data/_common");
const model_1 = require("../../model");
const disposable_object_1 = require("../../model/disposable-object");
const _array_utils_1 = require("../../model/internal/_array-utils");
const _helper_classes_1 = require("../../model/internal/_helper-classes");
const _knockout_utils_1 = require("../../model/internal/_knockout-utils");
const data_dashboard_item_1 = require("../../model/items/data-dashboard-item");
const date_filter_item_1 = require("../../model/items/filter-items/date-filter-item");
const range_filter_item_1 = require("../../model/items/range-filter/range-filter-item");
const _events_helper_1 = require("../../viewer-parts/viewer/_events-helper");
const _underlying_data_provider_1 = require("../data/_underlying-data-provider");
const _options_manager_1 = require("../internal/_options-manager");
const _utils_1 = require("../internal/_utils");
const notificator_1 = require("../notification-controller/notificator");
exports.viewerApiEventsNames = [
    'itemClick',
    'itemSelectionChanged',
    'itemWidgetCreated',
    'itemWidgetUpdating',
    'itemWidgetUpdated',
    'itemWidgetOptionsPrepared',
    'itemElementCustomColor',
    'itemVisualInteractivity',
    'itemMasterFilterStateChanged',
    'itemDrillDownStateChanged',
    'itemActionAvailabilityChanged',
    'itemCaptionToolbarUpdated',
    'dashboardTitleToolbarUpdated',
    'selectedTabPageChanged'
];
class ViewerApi extends disposable_object_1.DisposableObject {
    constructor(dashboardControl) {
        super();
        this.dashboardControl = dashboardControl;
        this._viewerItems = {};
        this._dashboardDisposables = [];
        this._internalEvents = new _options_manager_1.EventManager();
        this.title = ko.observable(null);
        this._viewerItemCreated = (item, viewerItem) => {
            if (!!viewerItem) {
                if (item instanceof data_dashboard_item_1.DataDashboardItem) {
                    viewerItem.itemClick.add(this._raiseItemClick);
                    viewerItem.itemSelectionChanged.add(this._raiseItemSelectionChanged);
                    viewerItem.clearMasterFilter.add(this._raiseClearMasterFilter);
                }
                if (!!viewerItem['itemElementCustomColor']) {
                    viewerItem['itemElementCustomColor'].add(this._raiseItemElementCustomColor);
                }
                viewerItem.itemWidgetCreated.add(this._raiseItemWidgetCreated);
                viewerItem.itemWidgetUpdating.add(this._raiseItemWidgetUpdating);
                viewerItem.itemWidgetUpdated.add(this._raiseItemWidgetUpdated);
                viewerItem.itemWidgetOptionsPrepared.add(this._raiseItemWidgetOptionsPrepared);
                viewerItem.itemCaptionToolbarUpdated.add(this._raiseItemCaptionToolbarUpdated);
            }
            if (!this._viewerItems[item.componentName()]) {
                this._viewerItems[item.componentName()] = [];
            }
            if (this._viewerItems[item.componentName()].indexOf(viewerItem) === -1) {
                this._viewerItems[item.componentName()].push(viewerItem);
            }
        };
        this._viewerItemDispose = (item, viewerItem) => {
            if (!!viewerItem) {
                if (item instanceof data_dashboard_item_1.DataDashboardItem) {
                    viewerItem.itemClick.remove(this._raiseItemClick);
                    viewerItem.itemSelectionChanged.remove(this._raiseItemSelectionChanged);
                    viewerItem.clearMasterFilter.remove(this._raiseClearMasterFilter);
                }
                if (!!viewerItem['itemElementCustomColor']) {
                    viewerItem['itemElementCustomColor'].remove(this._raiseItemElementCustomColor);
                }
                viewerItem.itemWidgetCreated.remove(this._raiseItemWidgetCreated);
                viewerItem.itemWidgetUpdating.remove(this._raiseItemWidgetUpdating);
                viewerItem.itemWidgetUpdated.remove(this._raiseItemWidgetUpdated);
                viewerItem.itemCaptionToolbarUpdated.remove(this._raiseItemCaptionToolbarUpdated);
            }
            if (this._viewerItems[item.componentName()]) {
                var index = this._viewerItems[item.componentName()].indexOf(viewerItem);
                if (index > -1) {
                    this._viewerItems[item.componentName()].splice(index, 1);
                }
            }
        };
        this._beforeApplyViewerItemOptions = (item, options, isCreation, customInteractivityOptions) => {
            if (item instanceof data_dashboard_item_1.DataDashboardItem) {
                var isInteractivitySupported = item._isVisualInteractivitySupported();
                var isMasterFilter = item._isMasterFilter();
                var canPerformDrillDown = item._actions().indexOf(_common_1.viewerActions.drillDown) !== -1;
                if (isInteractivitySupported && !isMasterFilter && !canPerformDrillDown) {
                    this._internalEvents.raise('itemVisualInteractivity', _events_helper_1.createItemInteractivityEventArgs(item, customInteractivityOptions));
                }
            }
        };
        this._raiseItemActionAvailabilityChanged = (item) => {
            this._internalEvents.raise('itemActionAvailabilityChanged', {
                itemName: item.componentName(),
                dashboardItem: item,
            });
        };
        this._raiseItemClick = (itemName, dataPoint) => {
            this._internalEvents.raise('itemClick', _events_helper_1.createItemClickEventArgs(this._getDataItem(itemName), dataPoint, this.requestUnderlyingData));
        };
        this._raiseItemSelectionChanged = (itemName, tuples) => {
            this._internalEvents.raise('itemSelectionChanged', _events_helper_1.createItemSelectionChangedEventArgs(this._getDataItem(itemName), tuples));
        };
        this._raiseItemWidgetCreated = (name, viewControl) => {
            let item = this._getItem(name);
            this._internalEvents.raise('itemWidgetCreated', _events_helper_1.createWidgetEventArgs(item, viewControl));
        };
        this._raiseItemWidgetUpdating = (name, viewControl) => {
            let item = this._getItem(name);
            this._internalEvents.raise('itemWidgetUpdating', _events_helper_1.createWidgetEventArgs(item, viewControl));
        };
        this._raiseItemWidgetUpdated = (name, viewControl) => {
            let item = this._getItem(name);
            this._internalEvents.raise('itemWidgetUpdated', _events_helper_1.createWidgetEventArgs(item, viewControl));
        };
        this._raiseItemWidgetOptionsPrepared = (name, options) => {
            let item = this._getItem(name);
            this._internalEvents.raise('itemWidgetOptionsPrepared', _events_helper_1.createWidgetOptionsEventArgs(item, options));
        };
        this._raiseItemCaptionToolbarUpdated = (name, options) => {
            let item = this._getItem(name);
            this._internalEvents.raise('itemCaptionToolbarUpdated', { itemName: name, dashboardItem: item, options: options });
        };
        this._raiseTitleToolbarUpdated = (options) => {
            this._internalEvents.raise('dashboardTitleToolbarUpdated', { dashboard: this.dashboardControl.dashboard(), options: options });
        };
        this._raiseItemElementCustomColor = (itemName, eventArgs) => {
            this._internalEvents.raise('itemElementCustomColor', _events_helper_1.createItemElementCustomColorEventArgs(this._getDataItem(itemName), eventArgs));
        };
        this._raiseItemVisualInteractivity = (itemName, interactivityOptions) => {
            this._internalEvents.raise('itemVisualInteractivity', _events_helper_1.createItemInteractivityEventArgs(this._getDataItem(itemName), interactivityOptions));
        };
        this._raiseClearMasterFilter = (itemName) => {
            var item = this._getItem(itemName);
            this._internalEvents.raise('itemMasterFilterStateChanged', {
                itemName: item.componentName(),
                dashboardItem: item,
                values: null
            });
        };
        this.requestUnderlyingData = (itemName, args, onCompleted) => {
            var dataDashboardItem = this._getDataItem(itemName);
            var raiseOnCompleted = (underlyingData) => {
                var drillThroughData = new _drill_through_data_wrapper_1.DrillThroughDataWrapper(underlyingData);
                drillThroughData.initialize();
                onCompleted(drillThroughData);
            };
            var provider = new _underlying_data_provider_1.UnderlyingDataProvider(this.dashboardControl._serviceClient());
            provider.requestUnderlyingData(dataDashboardItem, args)
                .done(raiseOnCompleted)
                .fail(request => {
                var errorMessage = notificator_1.NotificationController._getErrorTextFromResponse(request);
                if (!errorMessage) {
                    errorMessage = _default_1.getLocalizationById('DashboardWebStringId.Notification.AttemptToGetUnderlyingData');
                }
                raiseOnCompleted({ ErrorMessage: errorMessage });
            });
        };
        this.on = this._internalEvents.on;
        this.off = this._internalEvents.off;
        this.toDispose(_knockout_utils_1.subscribeWithPrev(this.title, (oldValue, newValue) => {
            if (oldValue) {
                oldValue.onUpdated.remove(this._raiseTitleToolbarUpdated);
            }
            if (newValue) {
                newValue.onUpdated.add(this._raiseTitleToolbarUpdated);
            }
        }));
        this.toDispose(ko.computed(() => {
            var newDashboard = dashboardControl.dashboard();
            this._dashboardDisposables.forEach(d => d.dispose());
            this._dashboardDisposables = [];
            if (newDashboard) {
                newDashboard
                    .items()
                    .filter(item => item instanceof model_1.TabContainerItem)
                    .forEach((tabContainer) => {
                    tabContainer._activePageChanged = (prevPageName, pageName) => {
                        this._raiseSelectedTabPageChanged(tabContainer.componentName(), prevPageName, pageName);
                    };
                });
                newDashboard._dataDashboardItems().forEach(item => {
                    var itemName = item.componentName.peek();
                    this._raiseItemActionAvailabilityChanged(item);
                    var disposables = [_knockout_utils_1.subscribeWithPrev(item._actions, (prevActions, actions) => {
                            if (!_array_utils_1.arrayEquals(prevActions, actions)) {
                                this._raiseItemActionAvailabilityChanged(item);
                            }
                        })];
                    disposables.push(_knockout_utils_1.subscribeArrayChange(item._drillDownValues, {
                        added: (v) => {
                            this._internalEvents.raise('itemDrillDownStateChanged', {
                                itemName: itemName,
                                dashboardItem: item,
                                action: 'Down',
                                values: item._drillDownValues()
                            });
                        },
                        deleted: (v) => {
                            this._internalEvents.raise('itemDrillDownStateChanged', {
                                itemName: itemName,
                                dashboardItem: item,
                                action: 'Up',
                                values: item._drillDownValues()
                            });
                        }
                    }));
                    disposables.push(item._actualSelectionValues.subscribe(newValue => {
                        this._internalEvents.raise('itemMasterFilterStateChanged', {
                            itemName: itemName,
                            dashboardItem: item,
                            values: newValue
                        });
                    }));
                    Array.prototype.push.apply(this._dashboardDisposables, disposables);
                });
            }
        }));
    }
    _checkIsRangeFilterItem(itemName) {
        var item = this._getDataItem(itemName);
        if (!(item instanceof range_filter_item_1.RangeFilterItem) && !(item instanceof date_filter_item_1.DateFilterItem)) {
            throw new Error('Action is called for an unsupported dashboard item. This action can be performed only for Range Filter and Date Filter.');
        }
    }
    _raiseSelectedTabPageChanged(tabContainerName, prevPageName, pageName) {
        this._internalEvents.raise('selectedTabPageChanged', {
            tabContainerName: tabContainerName,
            selectedPage: pageName,
            previousPage: prevPageName
        });
    }
    start() {
        this.dashboardControl._dashboardContext.viewerItemCreated.add(this._viewerItemCreated);
        this.dashboardControl._dashboardContext.viewerItemDispose.add(this._viewerItemDispose);
        this.dashboardControl._dashboardContext.beforeApplyViewerItemOptions.add(this._beforeApplyViewerItemOptions);
    }
    stop() {
        this.dashboardControl._dashboardContext.viewerItemCreated.remove(this._viewerItemCreated);
        this.dashboardControl._dashboardContext.viewerItemDispose.remove(this._viewerItemDispose);
        this.dashboardControl._dashboardContext.beforeApplyViewerItemOptions.remove(this._beforeApplyViewerItemOptions);
    }
    _getItemCore(itemId, findItem) {
        let dashboard = this.dashboardControl.dashboard();
        if (dashboard) {
            var item = findItem(dashboard);
            if (item) {
                return item;
            }
            else {
                throw Error("The item with the '" + itemId + "' name does not exist");
            }
        }
        else {
            throw new Error('Cannot perform operation because the dashboard is not loaded');
        }
    }
    _getItem(itemId) {
        return this._getItemCore(itemId, dashboard => dashboard._allItems().filter(item => item.componentName() == itemId)[0]);
    }
    _getDataItem(itemName) {
        return this._getItemCore(itemName, dashboard => dashboard._findDataItem(itemName));
    }
    getCurrentRange(itemName) {
        this._checkIsRangeFilterItem(itemName);
        let item = this._getDataItem(itemName);
        let selection = item._actualSelectionValues() && item._actualSelectionValues()[0] || item._getEntireRange();
        return selection && selection.length > 0 ? {
            minimum: selection[0],
            maximum: selection[1]
        } : null;
    }
    getEntireRange(itemName) {
        this._checkIsRangeFilterItem(itemName);
        let entireRange = this._getDataItem(itemName)._getEntireRange();
        return entireRange.length > 0 ? {
            minimum: entireRange[0],
            maximum: entireRange[1]
        } : null;
    }
    setRange(itemName, range) {
        this._checkIsRangeFilterItem(itemName);
        this.setMasterFilter(itemName, [[range.minimum, range.maximum]]);
    }
    setPredefinedRange(itemName, dateTimePeriodName) {
        this._checkIsRangeFilterItem(itemName);
        let rangeFilter = this._getDataItem(itemName);
        let periods = rangeFilter.dateTimePeriods().filter(period => period.name() === dateTimePeriodName);
        if (periods.length === 0) {
            throw new Error("The predefined range with the '" + dateTimePeriodName + "' name does not exist");
        }
        rangeFilter._processItemSetPredefinedPeriod(dateTimePeriodName);
    }
    getAvailablePredefinedRanges(itemName) {
        this._checkIsRangeFilterItem(itemName);
        return this._getDataItem(itemName).dateTimePeriods().map(period => period.name());
    }
    getCurrentPredefinedRange(itemName) {
        this._checkIsRangeFilterItem(itemName);
        let period = this._getDataItem(itemName).currentSelectedDateTimePeriodName();
        return period ? period : '';
    }
    getCurrentSelection(itemName) {
        _helper_classes_1.Guard.isNotFalsy(itemName, 'itemName');
        var itemData = this._getDataItem(itemName)._getItemData(), tuples = [], viewerItem = this._getViewerItem(itemName);
        var selectedTuples = viewerItem && viewerItem.getSelectedTuples() || null;
        if (selectedTuples) {
            tuples = selectedTuples.map(selectedTuple => itemData.createTuple(selectedTuple));
        }
        return tuples;
    }
    canSetMasterFilter(itemName) {
        return this._getDataItem(itemName)._actions().indexOf(_common_1.viewerActions.setMasterFilter) !== -1;
    }
    canClearMasterFilter(itemName) {
        return this._getDataItem(itemName)._actions().indexOf(_common_1.viewerActions.clearMasterFilter) !== -1;
    }
    canPerformDrillDown(itemName) {
        return this._getDataItem(itemName)._actions().indexOf(_common_1.viewerActions.drillDown) !== -1;
    }
    canPerformDrillUp(itemName) {
        return this._getDataItem(itemName)._actions().indexOf(_common_1.viewerActions.drillUp) !== -1;
    }
    getItemData(itemName) {
        return this._getDataItem(itemName)._getItemData();
    }
    getCurrentFilterValues(itemName) {
        return this._getDataItem(itemName)._getCurrentFilterValues();
    }
    getAvailableFilterValues(itemName) {
        return this._getDataItem(itemName)._getAvailableFilterValues(itemName);
    }
    getCurrentDrillDownValues(itemName) {
        return this._getDataItem(itemName)._getCurrentDrillDownValues();
    }
    getAvailableDrillDownValues(itemName) {
        return this._getDataItem(itemName)._getAvailableDrillDownValues(itemName);
    }
    setMasterFilter(itemName, values) {
        this._getDataItem(itemName)._performSetMasterFilter(values);
    }
    clearMasterFilter(itemName) {
        this._getDataItem(itemName)._performClearMasterFilter();
    }
    performDrillDown(itemName, value) {
        this._getDataItem(itemName)._performDrillDown(value);
    }
    performDrillUp(itemName) {
        this._getDataItem(itemName)._performDrillUp();
    }
    getAvailableActions(itemName) {
        return this._getDataItem(itemName)._getAvailableActions();
    }
    updateItemCaptionToolbar(itemName) {
        var dashboardItemNames = itemName ?
            this.dashboardControl.dashboard().findItem(itemName) && [itemName] || []
            :
                this.dashboardControl
                    .dashboard()
                    ._allItems()
                    .map((item) => item.componentName());
        if (itemName && dashboardItemNames.length === 0) {
            throw new Error("The item with the '" + itemName + "' name does not exist");
        }
        dashboardItemNames.forEach((itemName) => {
            this._viewerItems[itemName] && this._viewerItems[itemName].forEach(viewerItem => viewerItem.updateCaptionToolbar());
        });
    }
    updateDashboardTitleToolbar() {
        if (this.title()) {
            this.title().update();
        }
    }
    setSelectedTabPage(tabPageName) {
        let dashboard = this.dashboardControl.dashboard();
        if (dashboard) {
            let tabPage = _utils_1.findItemForApi(this.dashboardControl.dashboard(), tabPageName, model_1.DashboardTabPage);
            let tabContainer = this._findParentTabContainer(tabPageName);
            if (tabContainer && tabPage)
                tabContainer._activeTabPage(tabPage);
        }
    }
    setSelectedTabPageIndex(tabContainerName, index) {
        let dashboard = this.dashboardControl.dashboard();
        if (dashboard) {
            let tabContainer = _utils_1.findItemForApi(this.dashboardControl.dashboard(), tabContainerName, model_1.TabContainerItem);
            if (index < 0 || index > tabContainer.tabPages().length - 1) {
                throw Error(`The '${tabContainerName}' tab container does not contain a tab page with the following index: ${index}`);
            }
            let tabContainerLayoutItem = this.dashboardControl.dashboard().layout().findLayoutItem(tabContainer);
            if (tabContainerLayoutItem) {
                this.setSelectedTabPage(tabContainerLayoutItem.childNodes()[index].dashboardItem());
            }
        }
    }
    getSelectedTabPageIndex(tabContainerName) {
        let dashboard = this.dashboardControl.dashboard();
        if (dashboard) {
            let tabContainer = _utils_1.findItemForApi(this.dashboardControl.dashboard(), tabContainerName, model_1.TabContainerItem);
            let tabContainerLayoutItem = this.dashboardControl.dashboard().layout().findLayoutItem(tabContainer);
            let activeTabPageLayoutItem = this.dashboardControl.dashboard().layout().findLayoutItem(tabContainer._activeTabPage());
            if (tabContainerLayoutItem && tabContainerLayoutItem) {
                return tabContainerLayoutItem.childNodes().indexOf(activeTabPageLayoutItem);
            }
        }
        return -1;
    }
    getSelectedTabPage(tabContainerName) {
        let dashboard = this.dashboardControl.dashboard();
        if (dashboard) {
            let tabContainer = _utils_1.findItemForApi(this.dashboardControl.dashboard(), tabContainerName, model_1.TabContainerItem);
            return tabContainer._activeTabPage() ? tabContainer._activeTabPage().componentName() : '';
        }
        return '';
    }
    _findParentTabContainer(tabPageName) {
        let tabContainers = this.dashboardControl.dashboard().items().filter(item => item instanceof model_1.TabContainerItem);
        let parentContainer;
        tabContainers.forEach((container) => {
            let pages = container.tabPages().filter(page => page.componentName() === tabPageName);
            if (pages.length > 0) {
                parentContainer = container;
            }
        });
        if (!parentContainer) {
            throw new Error("The tab container item with the page'" + tabPageName + "' name does not exist");
        }
        return parentContainer;
    }
    _getViewerItem(itemName) {
        var viewerItems = this._viewerItems[itemName] ? this._viewerItems[itemName].filter(viewer => viewer.hasWidget) : [];
        return viewerItems.length > 0 ? viewerItems[0] : undefined;
    }
}
exports.ViewerApi = ViewerApi;
