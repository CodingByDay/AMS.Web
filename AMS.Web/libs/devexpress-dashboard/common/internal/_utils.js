﻿/**
* DevExpress Dashboard (_utils.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findItemForApi = void 0;
function findItemForApi(dashboard, itemName, expectedItemClass) {
    let dashboardItem = dashboard.findItem(itemName);
    if (!dashboardItem) {
        throw new Error("The item with the '" + itemName + "' name does not exist");
    }
    if (!(dashboardItem instanceof expectedItemClass))
        throw new Error("The '" + itemName + "' item has incorrect type.");
    return dashboardItem;
}
exports.findItemForApi = findItemForApi;
