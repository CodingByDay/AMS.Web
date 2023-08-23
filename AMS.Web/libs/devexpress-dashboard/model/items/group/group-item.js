﻿/**
* DevExpress Dashboard (group-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupItem = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const serializable_model_1 = require("../../serializable-model");
const dashboard_item_1 = require("../dashboard-item");
const _group_item_1 = require("./metadata/_group-item");
class GroupItem extends dashboard_item_1.DashboardItem {
    constructor(dashboardItemJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dashboardItemJSON, serializer);
    }
    _getInfoCore() {
        return _group_item_1.groupItemSerializationInfo;
    }
    _getDefaultItemType() {
        return 'Group';
    }
}
exports.GroupItem = GroupItem;
serializable_model_1.itemTypesMap['Group'] = { type: GroupItem, groupName: 'layout', title: 'DashboardStringId.DefaultNameItemGroup', index: 25 };
