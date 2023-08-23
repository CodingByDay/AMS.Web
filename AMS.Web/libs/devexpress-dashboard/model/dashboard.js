﻿/**
* DevExpress Dashboard (dashboard.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const _default_1 = require("../data/localization/_default");
const color_scheme_entry_1 = require("./colorization/color-scheme-entry");
const _custom_properties_utils_1 = require("./custom-properties/_custom-properties-utils");
const dashboard_state_1 = require("./dashboard-state");
const ef_data_source_1 = require("./data-sources/ef-data-source");
const federation_data_source_1 = require("./data-sources/federation-data-source");
const mongodb_data_source_1 = require("./data-sources/mongodb-data-source");
const sql_data_source_1 = require("./data-sources/sql-data-source");
const _data_source_factory_base_1 = require("./data-sources/_data-source-factory-base");
const _array_utils_1 = require("./internal/_array-utils");
const _dashboard_component_name_generator_1 = require("./internal/_dashboard-component-name-generator");
const _dashboard_item_helper_1 = require("./internal/_dashboard-item_helper");
const _date_utils_1 = require("./internal/_date-utils");
const _helper_classes_1 = require("./internal/_helper-classes");
const _knockout_utils_1 = require("./internal/_knockout-utils");
const _undo_engine_helper_1 = require("./internal/_undo-engine-helper");
const data_dashboard_item_1 = require("./items/data-dashboard-item");
const group_item_1 = require("./items/group/group-item");
const tab_container_item_1 = require("./items/tab-container-item/tab-container-item");
const _dashboard_item_factory_1 = require("./items/_dashboard-item-factory");
const dashboard_layout_group_1 = require("./layout/dashboard-layout-group");
const dashboard_layout_item_1 = require("./layout/dashboard-layout-item");
const _dashboard_layout_creator_1 = require("./layout/_dashboard-layout-creator");
const _layout_utils_1 = require("./layout/_layout-utils");
const _dashboard_1 = require("./metadata/_dashboard");
const parameter_1 = require("./parameters/parameter");
const serializable_model_1 = require("./serializable-model");
class Dashboard extends serializable_model_1.SerializableModel {
    constructor(dashboardJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dashboardJSON, serializer);
        this.dashboardJSON = dashboardJSON;
        this._disposables = [];
        this.dataSources = analytics_utils_1.deserializeArray(dashboardJSON.DataSources, (item) => Dashboard._createDataSource(item, serializer));
        this.groups = analytics_utils_1.deserializeArray(dashboardJSON.Groups, (group) => _dashboard_item_factory_1.createDashboardItem(group, serializer));
        this.items = analytics_utils_1.deserializeArray(dashboardJSON.Items, (item) => _dashboard_item_factory_1.createDashboardItem(item, serializer));
        this._tabPages = ko.observableArray();
        this._componentNameGenerator = new _dashboard_component_name_generator_1.DashboardUniqueNameGenerator('componentName', 1, this.dataSources, this.items, this.groups, this._tabPages);
        this._allItems = ko.pureComputed(() => [...this.items(), ...this.groups(), ...this._tabPages()]);
        _knockout_utils_1.subscribeArrayChange(this.dataSources, {
            added: (newDataSource) => {
                if (newDataSource instanceof federation_data_source_1.FederationDataSource) {
                    newDataSource.context()
                        .forEach(contextItem => {
                        var dataSourceToAdd = contextItem.source();
                        if (dataSourceToAdd) {
                            if (!this.dataSources().includes(dataSourceToAdd)) {
                                if (!dataSourceToAdd.componentName() || this.dataSources().find(ds => ds.componentName() === dataSourceToAdd.componentName()) === undefined)
                                    this.dataSources.push(dataSourceToAdd);
                                else {
                                }
                            }
                            newDataSource.sources()
                                .filter(source => source.dataSource() === contextItem.id())
                                .forEach(source => source.dataSource(dataSourceToAdd.componentName()));
                        }
                    });
                    newDataSource.context.removeAll();
                }
                if (!newDataSource.name()) {
                    newDataSource.name(_helper_classes_1.NameGenerator.generateName(_default_1.getLocalizationById('DashboardStringId.DefaultDataSourceName') + ' ', ko.unwrap(this.dataSources), 'name', 1));
                }
            }
        });
        this._disposables.push(ko.computed(() => {
            var newTabPagesList = this.items()
                .filter(item => item instanceof tab_container_item_1.TabContainerItem)
                .reduce((acc, tabPage) => acc.concat(tabPage.tabPages()), []);
            this._tabPages()
                .filter(removedTabPage => newTabPagesList.indexOf(removedTabPage) === -1)
                .forEach(removedTabPage => this._tabPages.remove(removedTabPage));
            newTabPagesList
                .filter(newTabPage => this._tabPages().indexOf(newTabPage) === -1)
                .forEach(newTabPage => this._tabPages.push(newTabPage));
        }));
        this._disposables.push(this._componentNameGenerator);
        this.parameters = ko.observableArray();
        this.parameters(analytics_utils_1.deserializeArray(dashboardJSON.Parameters, (item) => new parameter_1.Parameter(item, serializer))());
        this.colorScheme = analytics_utils_1.deserializeArray(dashboardJSON.ColorScheme, (item) => new color_scheme_entry_1.ColorSchemeEntry(item, serializer));
        this._disposables.push(_knockout_utils_1.subscribeArrayChange(this.dataSources, {
            deleted: this._processDeleteDataSource.bind(this)
        }));
        this._queryParameters = ko.computed(() => {
            return parameter_1._getParametersQuery(this.parameters());
        });
        this._dataDashboardItems = ko.computed(() => {
            return this.items().filter(item => item instanceof data_dashboard_item_1.DataDashboardItem);
        });
        this._masterFilterItems = ko.computed(() => {
            return this._dataDashboardItems()
                .filter(item => item._isMasterFilter() && this._interactivityGroupPathToRoot(item).every(containerItem => containerItem.interactivityOptions.isMasterFilter()));
        });
        this._disposables.push(ko.computed(() => {
            this._dataDashboardItems().forEach(detailItem => {
                var masterItems = this._dataDashboardItems()
                    .filter(item => item !== detailItem && item._isMasterFilter())
                    .filter(item => {
                    if (item.isMasterFilterCrossDataSource())
                        return true;
                    return item.dataSource() == detailItem.dataSource() && item.dataMember() == detailItem.dataMember();
                })
                    .filter(item => {
                    let masterGroups = this._interactivityGroupPathToRoot(item).reverse();
                    let detailGroups = this._interactivityGroupPathToRoot(detailItem).reverse();
                    while (masterGroups.length && detailGroups.length && masterGroups[0] === detailGroups[0]) {
                        masterGroups.shift();
                        detailGroups.shift();
                    }
                    if (masterGroups.some(masterGroup => !masterGroup.interactivityOptions.isMasterFilter())) {
                        return false;
                    }
                    if (detailGroups.length === 0) {
                        return !detailItem._isIgnoreMasterFilter();
                    }
                    else {
                        return !detailGroups[0].interactivityOptions.ignoreMasterFilters();
                    }
                });
                if (!_array_utils_1.arrayEquals(detailItem._masterFilterItems.peek(), masterItems)) {
                    detailItem._masterFilterItems(masterItems);
                }
            });
        }));
        this._state = ko.computed({
            read: () => {
                var state = new dashboard_state_1.DashboardState();
                if (this.parameters().length > 0) {
                    var parametersState = {};
                    this.parameters().forEach(param => {
                        parametersState[param.name()] = _date_utils_1.toStringArray(param._actualValue());
                    });
                    if (Object.keys(parametersState).length) {
                        state.Parameters = parametersState;
                    }
                }
                if (this.items().length > 0) {
                    var itemsState = {};
                    this.items().forEach(item => {
                        var itemState = item._state();
                        if (itemState && Object.keys(itemState).length) {
                            itemsState[item.componentName()] = itemState;
                        }
                    });
                    if (Object.keys(itemsState).length) {
                        state.Items = itemsState;
                    }
                }
                return state;
            },
            write: (dashboardState) => {
                var obsoleteDashboardState = dashboardState;
                var parametersState = dashboardState.Parameters || obsoleteDashboardState.parameters;
                if (parametersState) {
                    this.parameters().forEach(parameter => {
                        if (parametersState[parameter.name()] !== undefined) {
                            var parameterValue = parametersState[parameter.name()];
                            if (Array.isArray(parameterValue)) {
                                parameterValue = parameterValue.map(_date_utils_1.tryConvertToDateTime);
                            }
                            else {
                                parameterValue = _date_utils_1.tryConvertToDateTime(parameterValue);
                            }
                            parameter._value(parameterValue);
                        }
                    });
                }
                var itemsState = dashboardState.Items || obsoleteDashboardState.items;
                if (itemsState) {
                    Object.keys(itemsState).forEach((name) => {
                        var dashboardItemModel = this.findItem(name);
                        if (dashboardItemModel) {
                            dashboardItemModel._setState(itemsState[name]);
                        }
                    });
                }
            }
        });
        var item = new dashboard_layout_group_1.DashboardLayoutRootGroup(this, dashboardJSON.LayoutTree || {}, serializer);
        this.layout(item);
        this._colorableItems = ko.pureComputed(() => this._dataDashboardItems().filter(dataDashboardItem => dataDashboardItem._isGloballyColored));
    }
    static _createDataSource(dataSourceJSON, serializer) {
        var itemTypeName = dataSourceJSON['@ItemType'];
        var itemType = Dashboard._dataSourceTypesMap[itemTypeName];
        return new itemType(dataSourceJSON, serializer);
    }
    get stateString() {
        var state = this._state();
        return Object.keys(state).length ? JSON.stringify(state) : '';
    }
    set stateString(stateVal) {
        if (!stateVal)
            return;
        this._state(JSON.parse(stateVal));
    }
    dispose() {
        this._disposables.map(disposable => disposable.dispose());
    }
    getInfo() {
        return _dashboard_1.dashboardSerializationsInfo.concat(_custom_properties_utils_1.getCustomPropertiesSerializationInfo(this));
    }
    getJSON() {
        return new analytics_utils_1.ModelSerializer({ useRefs: false, serializeDate: _date_utils_1.serializeDate }).serialize(this, this.getInfo());
    }
    findItem(itemId) {
        var item = this.items().filter(filterItem => filterItem.componentName() === itemId)[0];
        if (!item) {
            item = this.groups().filter(filterItem => filterItem.componentName() === itemId)[0];
        }
        if (!item) {
            item = this._tabPages().filter(filterItem => filterItem.componentName() === itemId)[0];
        }
        return item;
    }
    rebuildLayout(clientWidth = 1, clientHeight = 1) {
        new _dashboard_layout_creator_1.DashboardLayoutCreator(clientWidth, clientHeight, this).rebuildLayout();
    }
    _getDisplayDashboardItem(tabPage) {
        if (!tabPage || !tabPage.showItemAsTabPage())
            return tabPage;
        let itemsOnTabPage = this.items().concat(this.groups()).filter(item => item.parentContainer() === tabPage.componentName());
        return itemsOnTabPage.length === 1 && !(itemsOnTabPage[0] instanceof group_item_1.GroupItem) ? itemsOnTabPage[0] : tabPage;
    }
    _changeItem(oldItem, newItem) {
        var dashboardLayoutItem = this.layout().findLayoutItem(oldItem);
        this.items.replace(oldItem, newItem);
        if (dashboardLayoutItem) {
            dashboardLayoutItem.item = newItem;
        }
    }
    _duplicateItem(item) {
        var dashboardLayoutItem = this.layout().findLayoutItem(item);
        var serializer = new analytics_utils_1.ModelSerializer({ useRefs: false });
        var itemJSON = serializer.serialize(item);
        var itemCopy = _dashboard_item_factory_1.createDashboardItem(itemJSON, serializer);
        itemCopy.componentName(undefined);
        this.items.push(itemCopy);
        var newDashboardLayoutItem = new dashboard_layout_item_1.DashboardLayoutItem();
        newDashboardLayoutItem.item = itemCopy;
        newDashboardLayoutItem.weight(dashboardLayoutItem.weight());
        dashboardLayoutItem.insert(newDashboardLayoutItem, 'left');
    }
    _createDashboardLayoutItem(modelItemJson) {
        if (!!modelItemJson) {
            var newItemModel = _dashboard_item_factory_1.createDashboardItem(modelItemJson);
            newItemModel.name(_helper_classes_1.NameGenerator.generateName(_dashboard_item_helper_1.getItemTitle(newItemModel) + ' ', this.items().concat(this.groups()), 'name', 1));
            if (this.dataSources().length > 0 && newItemModel instanceof data_dashboard_item_1.DataDashboardItem) {
                newItemModel.dataSource(this.dataSources()[0].componentName());
                if (this.dataSources()[0] instanceof sql_data_source_1.SqlDataSource) {
                    var sqlDataSource = (this.dataSources()[0]);
                    sqlDataSource.queries().length > 0 && newItemModel.dataMember(sqlDataSource.queries()[0].name());
                }
                if (this.dataSources()[0] instanceof ef_data_source_1.EFDataSource) {
                    var efDataSource = (this.dataSources()[0]);
                    if (!efDataSource._tables().length) {
                        var subscription = efDataSource._tables.subscribe((tables) => {
                            let dataDashboardItem = newItemModel;
                            if (dataDashboardItem.dataSource() === efDataSource.componentName() && !dataDashboardItem.dataMember.peek()) {
                                newItemModel.dataMember(tables[0].dataMember());
                            }
                            subscription.dispose();
                        });
                    }
                    else {
                        newItemModel.dataMember(efDataSource._tables()[0].dataMember());
                    }
                }
                if (this.dataSources()[0] instanceof federation_data_source_1.FederationDataSource) {
                    var feredationDataSource = (this.dataSources()[0]);
                    feredationDataSource.queries().length > 0 && newItemModel.dataMember(feredationDataSource.queries()[0].alias());
                }
                if (this.dataSources()[0] instanceof mongodb_data_source_1.MongoDBDataSource) {
                    let mongoDBDataSource = (this.dataSources()[0]);
                    mongoDBDataSource.queries().length > 0 && newItemModel.dataMember(mongoDBDataSource.queries()[0]._actualName());
                }
            }
            if (newItemModel instanceof group_item_1.GroupItem) {
                this.groups.push(newItemModel);
            }
            else {
                this.items.push(newItemModel);
            }
            return this._createDashboardLayoutNode(newItemModel);
        }
        return new dashboard_layout_group_1.DashboardLayoutGroup();
    }
    _createDashboardLayoutNode(dashboardItem) {
        var itemType = null;
        if (dashboardItem instanceof group_item_1.GroupItem) {
            itemType = 'LayoutGroup';
        }
        else if (dashboardItem instanceof tab_container_item_1.TabContainerItem) {
            itemType = 'LayoutTabContainer';
        }
        else {
            itemType = 'LayoutItem';
        }
        var newLayoutItemModel = _layout_utils_1.deserializeDashboardLayoutNode({ '@ItemType': itemType });
        newLayoutItemModel.item = dashboardItem;
        return newLayoutItemModel;
    }
    _findDataItem(itemId) {
        return this._dataDashboardItems().filter(item => item.componentName() == itemId)[0];
    }
    _interactivityGroupPathToRoot(dashboardItem) {
        let getParentContainerItem = (item) => {
            return (!!item.parentContainer() && this.findItem(item.parentContainer()) || undefined);
        };
        let parentContainers = [];
        let parentContainerItem = dashboardItem;
        do {
            parentContainerItem = getParentContainerItem(parentContainerItem);
            if (parentContainerItem) {
                parentContainers.push(parentContainerItem);
            }
        } while (parentContainerItem);
        return parentContainers;
    }
    _processDeleteDataSource(dataSource) {
        this._dataDashboardItems()
            .filter(item => item.dataSource() == dataSource.componentName())
            .forEach(item => item._clearBindings());
    }
}
Dashboard._dataSourceTypesMap = Object.assign({ 'FederationDataSource': federation_data_source_1.FederationDataSource }, _data_source_factory_base_1._baseDataSourceTypesMap);
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], Dashboard.prototype, "_changeItem", null);
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], Dashboard.prototype, "_duplicateItem", null);
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], Dashboard.prototype, "_processDeleteDataSource", null);
exports.Dashboard = Dashboard;
