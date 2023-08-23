﻿/**
* DevExpress Dashboard (dashboard-tab-page.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardTabPage = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const dashboard_item_1 = require("../dashboard-item");
const _dashboard_tab_page_1 = require("./metadata/_dashboard-tab-page");
class DashboardTabPage extends dashboard_item_1.DashboardItem {
    constructor(dashboardItemJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dashboardItemJSON, serializer);
        this._uniqueNamePrefix = 'dashboardTabPage';
    }
    _getInfoCore() {
        return _dashboard_tab_page_1.tabPageSerializationInfo;
    }
    getUniqueNamePrefix() {
        return this._uniqueNamePrefix;
    }
    _getDefaultItemType() {
        return 'Page';
    }
}
exports.DashboardTabPage = DashboardTabPage;
