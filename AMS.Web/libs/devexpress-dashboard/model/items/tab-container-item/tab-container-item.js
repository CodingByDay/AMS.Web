﻿/**
* DevExpress Dashboard (tab-container-item.js)
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
exports.TabContainerItem = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const _default_1 = require("../../../data/localization/_default");
const dashboard_state_1 = require("../../dashboard-state");
const _helper_classes_1 = require("../../internal/_helper-classes");
const _knockout_utils_1 = require("../../internal/_knockout-utils");
const _utils_1 = require("../../internal/_utils");
const serializable_model_1 = require("../../serializable-model");
const dashboard_item_1 = require("../dashboard-item");
const dashboard_tab_page_1 = require("./dashboard-tab-page");
const _tab_container_item_1 = require("./metadata/_tab-container-item");
class TabContainerItem extends dashboard_item_1.DashboardItem {
    constructor(dashboardItemJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dashboardItemJSON, serializer);
        this.tabPages = analytics_utils_1.deserializeArray(dashboardItemJSON.Pages, (item) => new dashboard_tab_page_1.DashboardTabPage(item, serializer));
        if (this.tabPages().length === 0) {
            this._addNewPage();
        }
        this._activeTabPage = ko.observable();
        _knockout_utils_1.subscribeWithPrev(this._activeTabPage, (prevPage, page) => {
            let prevPageName = prevPage && this.tabPages().indexOf(prevPage) != -1 ? prevPage.componentName() : '';
            let activePageName = page && this.tabPages().indexOf(page) != -1 ? page.componentName() : '';
            if (this._activePageChanged && (prevPageName !== activePageName || (!prevPageName && !page))) {
                this._activePageChanged(prevPageName, activePageName);
            }
        });
        this._state = ko.computed(() => {
            var state = new dashboard_state_1.ItemState();
            if (this._activeTabPage() && this.tabPages().indexOf(this._activeTabPage()) !== -1) {
                state.TabPageName = this._activeTabPage().componentName();
            }
            return state;
        });
    }
    _setState(itemState) {
        super._setState(itemState);
        if (itemState.TabPageName) {
            let page = this.tabPages().filter(page => page.componentName() === itemState.TabPageName)[0];
            if (page && (!this._activeTabPage() || this._activeTabPage().name() !== page.name())) {
                this._activeTabPage(page);
            }
        }
    }
    _getInfoCore() {
        return _tab_container_item_1.tabContainerItemSerializationInfo;
    }
    _getDefaultItemType() {
        return 'TabContainer';
    }
    _addNewPage() {
        var tabPage = new dashboard_tab_page_1.DashboardTabPage({});
        tabPage.name(_helper_classes_1.NameGenerator.generateName(_default_1.getLocalizationById('DashboardStringId.DefaultNameTabPage') + ' ', this.tabPages(), 'name', 1));
        this.tabPages.push(tabPage);
        return tabPage;
    }
}
__decorate([
    _utils_1.collectionItemType('Page')
], TabContainerItem.prototype, "tabPages", void 0);
exports.TabContainerItem = TabContainerItem;
serializable_model_1.itemTypesMap['TabContainer'] = { type: TabContainerItem, groupName: 'layout', title: 'DashboardStringId.DefaultNameTabContainerItem', index: 115 };
