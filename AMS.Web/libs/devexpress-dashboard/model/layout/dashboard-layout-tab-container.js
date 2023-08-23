﻿/**
* DevExpress Dashboard (dashboard-layout-tab-container.js)
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
exports.DashboardLayoutTabContainer = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const _undo_engine_helper_1 = require("../../model/internal/_undo-engine-helper");
const _knockout_utils_1 = require("../internal/_knockout-utils");
const dashboard_layout_group_1 = require("./dashboard-layout-group");
const dashboard_layout_tab_page_1 = require("./dashboard-layout-tab-page");
const _layout_utils_1 = require("./_layout-utils");
class DashboardLayoutTabContainer extends dashboard_layout_group_1.DashboardLayoutGroup {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this._activeTabIndex = ko.computed(() => {
            return this.childNodes().map(node => node.item).indexOf(this._activeTabPage());
        });
        this._activeTabPage = ko.computed({
            read: () => {
                return this.item ? this.item._activeTabPage() : undefined;
            },
            write: (tabPage) => {
                let containerItem = this.item;
                if (containerItem && containerItem._activeTabPage() !== tabPage) {
                    containerItem._activeTabPage(tabPage);
                }
            }
        });
        this._visibleItemsCore = ko.observableArray();
        ko.computed(() => {
            let tabContainerItem = this.item;
            if (tabContainerItem && !tabContainerItem._activeTabPage.peek()) {
                let firstTabPageLayoutItem = this.childNodes()[0];
                if (firstTabPageLayoutItem && firstTabPageLayoutItem.item) {
                    tabContainerItem._activeTabPage(firstTabPageLayoutItem.item);
                }
            }
        });
        _knockout_utils_1.subscribeArrayChange(this.childNodes, {
            added: (page, index) => {
                if (this.childNodes().length === 1 && !this._activeTabPage()) {
                    if (page.item) {
                        this._activeTabPage(page.item);
                    }
                    else {
                        let _disposables = ko.computed(() => {
                            if (page.item) {
                                this._activeTabPage(page.item);
                                _disposables.dispose();
                            }
                        });
                    }
                }
            },
            deleted: (page) => {
                if (this._activeTabPage() && this._activeTabPage().componentName() === page.dashboardItem()) {
                    this._activeTabPage(this.childNodes().length ? this.childNodes()[0].item : null);
                }
            }
        });
        ko.computed(() => {
            this._visibleItemsCore.removeAll();
            if (this._tabContainer && this._tabContainer._activeTabPage()) {
                var item = this.childNodes().filter(childNode => childNode.item === this._tabContainer._activeTabPage())[0];
                if (item)
                    this._visibleItemsCore.push(item);
            }
        });
    }
    get _tabContainer() { return this.item; }
    _getDefaultItemType() { return 'LayoutTabContainer'; }
    get _template() { return 'dx-dashboard-tab-container'; }
    get _visibleItems() { return this._visibleItemsCore; }
    get _ignoreChildMaxHeight() { return true; }
    get _dragOverInnerElementController() {
        return {
            selector: '.dx-layout-item-container .dx-tab',
            onDragOver: (index) => {
                if (this._tabContainer) {
                    this._activeTabPage(this.childNodes()[index].item);
                }
            }
        };
    }
    _setItemCore(newItem) {
        super._setItemCore(newItem);
        var tabContainerItem = newItem;
        tabContainerItem.tabPages().forEach(tabPage => this._addLayoutTabPage(tabPage));
    }
    _createTabPage() {
        if (this._tabContainer) {
            var tabPageModel = this._tabContainer._addNewPage();
            let layoutTabPage = this._addLayoutTabPage(tabPageModel);
            this._activeTabPage(tabPageModel);
            return layoutTabPage;
        }
        return undefined;
    }
    _removeLayoutTabPage(tabPageModel) {
        var tabPageLayoutItem = this._dashboard().layout().findLayoutItem(tabPageModel);
        if (tabPageLayoutItem) {
            tabPageLayoutItem._createViewModel().delete();
        }
    }
    _deleteDashbordItem() {
        if (this._dashboard()) {
            super._deleteDashbordItem();
            this.childNodes().forEach(layoutPage => layoutPage._deleteDashbordItem());
            this._dashboard().items.remove(this.item);
        }
    }
    _addLayoutTabPage(tabPageModel) {
        var layoutItem = new dashboard_layout_tab_page_1.DashboardLayoutTabPage();
        layoutItem.item = tabPageModel;
        this.childNodes.push(layoutItem);
        return layoutItem;
    }
}
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], DashboardLayoutTabContainer.prototype, "_createTabPage", null);
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], DashboardLayoutTabContainer.prototype, "_removeLayoutTabPage", null);
exports.DashboardLayoutTabContainer = DashboardLayoutTabContainer;
_layout_utils_1._layoutItemTypeMap['LayoutTabContainer'] = DashboardLayoutTabContainer;
