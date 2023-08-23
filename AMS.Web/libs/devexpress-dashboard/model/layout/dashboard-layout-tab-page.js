﻿/**
* DevExpress Dashboard (dashboard-layout-tab-page.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardLayoutTabPage = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const dashboard_layout_group_1 = require("./dashboard-layout-group");
const _layout_utils_1 = require("./_layout-utils");
class DashboardLayoutTabPage extends dashboard_layout_group_1.DashboardLayoutGroup {
    get _template() { return 'dx-layout-group-container'; }
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    _getDefaultItemType() { return 'LayoutTabPage'; }
    _deleteDashbordItem() {
        super._deleteDashbordItem();
        this.childNodes()
            .filter(item => item instanceof dashboard_layout_group_1.DashboardLayoutGroup)
            .forEach(group => group.dashboardItem() && group._deleteDashbordItem());
        var tabContainer = this.parentNode().item;
        let page = this.item;
        let deletedPageIndex = tabContainer.tabPages().indexOf(page);
        if (tabContainer._activeTabPage() === page) {
            let newIndex = deletedPageIndex === tabContainer.tabPages().length - 1 && tabContainer.tabPages().length > 1 ? deletedPageIndex - 1 : deletedPageIndex;
            tabContainer.tabPages.remove(page);
            tabContainer._activeTabPage(tabContainer.tabPages()[newIndex]);
        }
        else {
            tabContainer.tabPages.remove(page);
        }
    }
}
exports.DashboardLayoutTabPage = DashboardLayoutTabPage;
_layout_utils_1._layoutItemTypeMap['LayoutTabPage'] = DashboardLayoutTabPage;
