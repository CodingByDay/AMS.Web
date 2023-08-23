﻿/**
* DevExpress Dashboard (dashboard-layout-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardLayoutItem = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const dashboard_layout_node_1 = require("./dashboard-layout-node");
const _layout_utils_1 = require("./_layout-utils");
class DashboardLayoutItem extends dashboard_layout_node_1.DashboardLayoutNode {
    get _template() { return 'dx-dashboard-item'; }
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    _getDefaultItemType() { return 'LayoutItem'; }
    _deleteDashbordItem() {
        if (this._dashboard()) {
            this._dashboard().items.remove(this.item);
        }
    }
}
exports.DashboardLayoutItem = DashboardLayoutItem;
_layout_utils_1._layoutItemTypeMap['LayoutItem'] = DashboardLayoutItem;
