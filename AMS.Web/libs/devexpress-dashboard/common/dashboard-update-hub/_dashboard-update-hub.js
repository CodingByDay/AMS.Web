﻿/**
* DevExpress Dashboard (_dashboard-update-hub.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardUpdateHub = void 0;
const _default_1 = require("../../data/localization/_default");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _utils_1 = require("../../data/_utils");
const model_1 = require("../../model");
const disposable_object_1 = require("../../model/disposable-object");
const data_dashboard_item_1 = require("../../model/items/data-dashboard-item");
const filter_element_item_base_1 = require("../../model/items/filter-items/filter-element-item-base");
const range_filter_item_1 = require("../../model/items/range-filter/range-filter-item");
const _pane_content_holder_1 = require("../../model/items/_pane-content-holder");
const _base_metadata_1 = require("../../model/metadata/_base-metadata");
const notificator_1 = require("../notification-controller/notificator");
const _dashboard_event_1 = require("./_dashboard-event");
const _item_change_subscriber_1 = require("./_item-change-subscriber");
class DashboardUpdateHub extends disposable_object_1.DisposableObject {
    constructor(_dashboard, _dataRequestOptions, _callBacks, _requestVisibleItemsProvider) {
        super();
        this._dashboard = _dashboard;
        this._dataRequestOptions = _dataRequestOptions;
        this._callBacks = _callBacks;
        this._requestVisibleItemsProvider = _requestVisibleItemsProvider;
        this._timer = 0;
        this._requestQueue = [];
        this.initializeItem = (item) => {
            if (item instanceof data_dashboard_item_1.DataDashboardItem && !item._useNeutralFilterMode()) {
                item._beforeMasterFilterSetByUserInteraction = () => {
                    if (!this._isUpdating() && !this._suspendItem) {
                        this._suspendItem = item;
                    }
                };
                item._afterMasterFilterSetByUserInteraction = () => {
                    if (!this._isUpdating() && this._suspendItem === item) {
                        this._suspendItem = null;
                    }
                };
                item._drillDownChangedByUserInteraction = () => {
                    if (this._suspendItem === item) {
                        this._suspendItem = null;
                    }
                };
            }
            item._getContentCategories().forEach(category => this._itemChanged(item, category));
        };
        this.dataSourcePropertyChanged = new _dashboard_event_1.DashboardEvent();
        this.dashboardItemPropertyChanged = new _dashboard_event_1.DashboardEvent();
        var itemSubscription = {
            itemAdded: this.initializeItem,
            itemDeleted: (item) => {
                if (item instanceof data_dashboard_item_1.DataDashboardItem) {
                    item._beforeMasterFilterSetByUserInteraction = null;
                }
            },
            itemChanged: (item, category) => {
                if (item instanceof data_dashboard_item_1.DataDashboardItem && category !== _base_metadata_1.PropertyCategory.ViewModel) {
                    item._limitDataState.reset();
                    if (item instanceof model_1.GridItem)
                        item._processClientFilterStateChanged(null);
                }
                this._itemChanged(item, category);
                this.dashboardItemPropertyChanged.fire({ item, category });
            }
        };
        this.toDispose(new _item_change_subscriber_1.ItemsChangeSubscriber(this._dashboard.items, itemSubscription));
        this.toDispose(new _item_change_subscriber_1.ItemsChangeSubscriber(this._dashboard.groups, itemSubscription));
        this.toDispose(new _item_change_subscriber_1.ItemsChangeSubscriber(this._dashboard._tabPages, itemSubscription));
        this.toDispose(new _item_change_subscriber_1.DataSourcesSubscriber(this._dashboard.dataSources, (args) => {
            var affectedItems = this._dashboard._dataDashboardItems().filter(item => item.dataSource() === args.dataSource.componentName());
            if (args.queryName) {
                affectedItems = affectedItems.filter(item => item.dataMember() == args.queryName);
            }
            if (args.fieldName) {
                affectedItems = affectedItems.filter(item => !!item.dataItems().filter(dataItem => dataItem.dataMember() == args.fieldName)[0]);
            }
            affectedItems.forEach(item => this._itemChanged(item, _base_metadata_1.PropertyCategory.Data));
            this.dataSourcePropertyChanged.fire(args);
        }));
        this.toDispose(this._dashboard.currencyCultureName.subscribe(_ => {
            this.reloadAllItems(_base_metadata_1.PropertyCategory.Data);
        }));
        this.toDispose(this._dashboard._queryParameters.subscribe(_ => {
            this.reloadAllItems(_base_metadata_1.PropertyCategory.ClientState);
        }));
        this.toDispose(new _item_change_subscriber_1.ColorSchemeSubscriber(_dashboard.colorScheme, () => {
            this.reloadGlobalColoredItems(_base_metadata_1.PropertyCategory.Data);
        }));
        if (this._dataRequestOptions.itemDataRequestMode === 'BatchRequests') {
            var itemsToRequest = {};
            var performBatchRequest = _utils_1.debounce(() => {
                let itemsToRequestCopy = Object.assign({}, itemsToRequest);
                itemsToRequest = {};
                this._callBacks.getBatchItemData(Object.keys(itemsToRequestCopy).map(itemName => itemsToRequestCopy[itemName].itemModel))
                    .done(result => {
                    Object.keys(result).forEach(itemName => itemsToRequestCopy[itemName].deferred.resolve(result[itemName]));
                })
                    .fail(result => {
                    Object.keys(itemsToRequestCopy).forEach(itemName => itemsToRequestCopy[itemName].deferred.reject(result));
                });
            }, 1);
            this._getItemData = (item) => {
                var def = _jquery_helpers_1.createJQueryDeferred();
                itemsToRequest[item.componentName()] = {
                    itemModel: item,
                    deferred: def
                };
                performBatchRequest();
                return def.promise();
            };
        }
        else {
            this._getItemData = (item) => this._callBacks.getItemData(item);
        }
    }
    _isUpdating() {
        return !!this._requestQueue.length;
    }
    _dequeueRequest(queueItem) {
        var itemIndex = this._requestQueue.indexOf(queueItem);
        if (itemIndex !== -1) {
            this._requestQueue.splice(itemIndex, 1);
            if (_pane_content_holder_1.getCategoryContentName(queueItem.category) === 'data') {
                this.itemEndUpdate && this.itemEndUpdate(queueItem.item.componentName());
            }
            if (this._requestQueue.filter(item => this.visibleItemsFilter(item)).length === 0) {
                this.dashboardEndUpdate && this.dashboardEndUpdate();
                this._suspendItem = null;
            }
        }
    }
    _enqueueRequest(item, category) {
        var compatibleCategories = item._paneContentHolder.getCompatibleCategories(category);
        if (!this._requestQueue.some(queueItem => queueItem.item === item && compatibleCategories.indexOf(queueItem.category) !== -1)) {
            this._requestQueue.push({ item: item, category: category });
            if (this._requestQueue.filter(item => this.visibleItemsFilter(item)).length === 1) {
                this.dashboardBeginUpdate && this.dashboardBeginUpdate();
            }
            if (_pane_content_holder_1.getCategoryContentName(category) === 'data') {
                this.itemBeginUpdate && this.itemBeginUpdate(item.componentName());
            }
        }
    }
    _getDataRequestPriority(dashboardItem) {
        if (dashboardItem instanceof filter_element_item_base_1.FilterElementItemBase || dashboardItem instanceof range_filter_item_1.RangeFilterItem) {
            return 2;
        }
        else if (dashboardItem instanceof data_dashboard_item_1.DataDashboardItem && dashboardItem._masterFilterMode() === 'Single') {
            return 1;
        }
        return 0;
    }
    _getRequestLockingMasterFilterItems(dashboardItem) {
        if (dashboardItem instanceof data_dashboard_item_1.DataDashboardItem) {
            return dashboardItem._masterFilterItems()
                .filter(masterItem => {
                if (masterItem instanceof range_filter_item_1.RangeFilterItem || masterItem._isSingleMasterFilter()) {
                    return true;
                }
                else {
                    return !masterItem._useNeutralFilterMode() && masterItem instanceof filter_element_item_base_1.FilterElementItemBase;
                }
            });
        }
        return [];
    }
    visibleItemsFilter(queueItem) {
        if (this._dataRequestOptions.itemDataLoadingMode === 'OnDemand' && this._visibleItemsProvider && this._visibleItemsProvider.visibleItems().indexOf(queueItem.item) === -1) {
            if (queueItem.item instanceof data_dashboard_item_1.DataDashboardItem) {
                return this._visibleItemsProvider.visibleItems().some(visibleItem => {
                    return this._getRequestLockingMasterFilterItems(visibleItem).indexOf(queueItem.item) !== -1;
                });
            }
            else {
                return false;
            }
        }
        return true;
    }
    _resolveItems() {
        this._requestQueue
            .filter(queueItem => !queueItem.item._paneContentHolder.isWaitingForContent(queueItem.category))
            .sort((a, b) => {
            if (this._visibleItemsProvider) {
                var aNumber = this._visibleItemsProvider.visibleItems().indexOf(a.item) !== -1 ? 1 : 0;
                var bNumber = this._visibleItemsProvider.visibleItems().indexOf(b.item) !== -1 ? 1 : 0;
                return bNumber - aNumber;
            }
            else {
                return 0;
            }
        })
            .filter(queueItem => this.visibleItemsFilter(queueItem))
            .filter(queueItem => {
            if (queueItem.item instanceof data_dashboard_item_1.DataDashboardItem && queueItem.item.dataItems().length > 0) {
                return this._getRequestLockingMasterFilterItems(queueItem.item)
                    .filter(masterItem => {
                    var circularDependencyIndex = this._getRequestLockingMasterFilterItems(masterItem)
                        .indexOf(queueItem.item);
                    if (circularDependencyIndex > -1) {
                        let itemPriority = this._getDataRequestPriority(queueItem.item);
                        let masterItemPriority = this._getDataRequestPriority(masterItem);
                        if (itemPriority === masterItemPriority) {
                            return this._dashboard.items().indexOf(queueItem.item) > this._dashboard.items().indexOf(masterItem);
                        }
                        else {
                            return itemPriority < masterItemPriority;
                        }
                    }
                    return true;
                })
                    .every(dependence => {
                    return this._requestQueue.filter(queueItem => queueItem.item === dependence).length === 0;
                });
            }
            return true;
        })
            .forEach(queueItem => {
            if (this._dashboard.findItem(queueItem.item.componentName())) {
                var category = queueItem.category;
                queueItem.item._paneContentHolder.beginRequest(category);
                if (queueItem.item._paneContentHolder.needRequestContentFromServer(category)) {
                    this._performServerRequest(queueItem.item, queueItem.category).done(result => {
                        queueItem.item._paneContentHolder.endRequest({ response: result, category: category });
                        if (queueItem.item._paneContentHolder.isValid(category)) {
                            this._dequeueRequest(queueItem);
                        }
                        this._resolveItems();
                        return result;
                    }).fail(result => {
                        var errorTitle = _default_1.getLocalizationById('DashboardWebStringId.Errors.AttemptToLoadData');
                        var errorDetail = notificator_1.NotificationController._getDetailedErrorMessage(result);
                        queueItem.item._errorState({ title: errorTitle, detail: errorDetail });
                        queueItem.item._paneContentHolder.endRequest({ response: {}, category: category });
                        this._dequeueRequest(queueItem);
                        this._resolveItems();
                    });
                }
                else {
                    queueItem.item._paneContentHolder.endRequest({ response: {}, category: category });
                    this._dequeueRequest(queueItem);
                }
            }
            else {
                this._dequeueRequest(queueItem);
            }
        });
    }
    _processItemChanged(dashboardItem, changeCategory) {
        if (dashboardItem instanceof model_1.MapItem && changeCategory === _base_metadata_1.PropertyCategory.Map && dashboardItem._paneContentHolder.valid()) {
            dashboardItem._isGeometryChangedCallback();
        }
        dashboardItem._paneContentHolder.itemChanged(changeCategory);
        dashboardItem._errorState(null);
        if (dashboardItem instanceof data_dashboard_item_1.DataDashboardItem) {
            if (changeCategory === _base_metadata_1.PropertyCategory.Data || changeCategory === _base_metadata_1.PropertyCategory.Interactivity) {
                dashboardItem._dataManager(null);
                dashboardItem._clearInteractivityState();
            }
        }
    }
    _itemChanged(dashboardItem, changeCategory) {
        if (changeCategory === _base_metadata_1.PropertyCategory.ClientState && this._suspendItem === dashboardItem) {
            return;
        }
        this._processItemChanged(dashboardItem, changeCategory);
        this._enqueueRequest(dashboardItem, changeCategory);
        if (dashboardItem instanceof data_dashboard_item_1.DataDashboardItem) {
            if ((dashboardItem._isGloballyColored && changeCategory === _base_metadata_1.PropertyCategory.Data) || changeCategory === _base_metadata_1.PropertyCategory.Coloring) {
                this._dashboard._dataDashboardItems()
                    .filter(item => item._isGloballyColored)
                    .forEach(item => {
                    this._processItemChanged(dashboardItem, _base_metadata_1.PropertyCategory.Data);
                    this._enqueueRequest(item, _base_metadata_1.PropertyCategory.Data);
                });
            }
        }
        this._resolveItemsDeffered();
    }
    _resolveItemsDeffered() {
        clearTimeout(this._timer);
        this._timer = window.setTimeout(() => {
            this._resolveItems();
        }, 10);
    }
    _performServerRequest(item, category) {
        var contentName = _pane_content_holder_1.getCategoryContentName(category);
        switch (contentName) {
            case 'data':
                return this._getItemData(item);
            case 'map':
                return this._callBacks.getMapShapeFile(item);
            default:
                throw new Error();
        }
    }
    refreshItems(itemsNames) {
        this._dashboard._dataDashboardItems()
            .filter(item => itemsNames.indexOf(item.componentName()) !== -1)
            .forEach(item => { this._itemChanged(item, _base_metadata_1.PropertyCategory.ClientState); });
    }
    reloadAllItems(caterory) {
        this._callBacks.clearDimensionValuesCache && this._callBacks.clearDimensionValuesCache();
        this._dashboard._dataDashboardItems().forEach(item => { this._itemChanged(item, caterory); });
    }
    reloadGlobalColoredItems(caterory) {
        this._dashboard._dataDashboardItems().filter(item => item.coloringOptions && item.coloringOptions.useGlobalColors()).forEach(item => { this._itemChanged(item, caterory); });
    }
    initialize() {
        if (this._requestVisibleItemsProvider) {
            this._visibleItemsProvider = this._requestVisibleItemsProvider();
        }
        if (this._visibleItemsProvider) {
            this.toDispose(this._visibleItemsProvider.visibleItems.subscribe(_ => this._resolveItemsDeffered()));
        }
        this._dashboard.items().forEach(this.initializeItem);
        this._dashboard.groups().forEach(this.initializeItem);
        this._dashboard._tabPages().forEach(this.initializeItem);
    }
    dispose() {
        clearTimeout(this._timer);
        this._timer = null;
        this._requestQueue.splice(0, this._requestQueue.length);
        super.dispose();
    }
}
exports.DashboardUpdateHub = DashboardUpdateHub;
