﻿/**
* DevExpress Dashboard (_dashboard-item-factory.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDashboardItem = void 0;
const serializable_model_1 = require("../serializable-model");
const custom_item_1 = require("./custom-item/custom-item");
function createDashboardItem(dashboardItemJSON, serializer) {
    var customItemTypeName = dashboardItemJSON['@CustomItemType'];
    if (!customItemTypeName) {
        var itemTypeName = dashboardItemJSON['@ItemType'];
        var itemType = serializable_model_1.itemTypesMap[itemTypeName].type;
        return new itemType(dashboardItemJSON, serializer);
    }
    else {
        var customItemType = !!serializable_model_1.itemTypesMap[customItemTypeName] ? serializable_model_1.itemTypesMap[customItemTypeName].type : custom_item_1.CustomItem;
        return new customItemType(serializable_model_1.itemTypesMap[customItemTypeName], dashboardItemJSON, serializer);
    }
}
exports.createDashboardItem = createDashboardItem;
