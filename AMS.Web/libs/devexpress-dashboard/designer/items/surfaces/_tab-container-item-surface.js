﻿/**
* DevExpress Dashboard (_tab-container-item-surface.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabContainerItemSurface = void 0;
const ko = require("knockout");
const _tab_container_item_properties_composer_1 = require("../properties-composers/_tab-container-item-properties-composer");
const _tab_page_properties_composer_1 = require("../properties-composers/_tab-page-properties-composer");
const _section_descriptors_1 = require("../_section-descriptors");
const _base_item_surface_1 = require("./_base-item-surface");
class TabContainerItemSurface extends _base_item_surface_1.BaseItemSurface {
    constructor(dashboardItem, _dashboardModel, dataSourceBrowser) {
        super();
        this.dashboardItem = dashboardItem;
        this._dashboardModel = _dashboardModel;
    }
    getPropertiesComposer() {
        const editTabPageHandler = (tabPage, args) => {
            const composer = new _tab_page_properties_composer_1.DashboardTabPagePropertiesComposer(this._dashboardItemCustomization);
            const tabs = composer.composeTabs(tabPage);
            this.propertiesController.secondaryModel({
                displayText: ko.pureComputed(() => this._dashboardModel._getDisplayDashboardItem(tabPage).name()),
                data: {
                    model: tabPage,
                    propertiesTabs: ko.observableArray(tabs)
                },
                containingCollection: this.dashboardItem.tabPages
            });
        };
        return new _tab_container_item_properties_composer_1.TabContainerItemPropertiesComposer(editTabPageHandler);
    }
    dispose() {
    }
}
exports.TabContainerItemSurface = TabContainerItemSurface;
_section_descriptors_1.surfaceItemsFactory.register('TabContainer', TabContainerItemSurface);
