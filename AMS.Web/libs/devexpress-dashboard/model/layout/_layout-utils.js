﻿/**
* DevExpress Dashboard (_layout-utils.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeDashboardLayoutNode = exports._layoutItemTypeMap = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
exports._layoutItemTypeMap = {};
function deserializeDashboardLayoutNode(itemModel, serializer = new analytics_utils_1.ModelSerializer()) {
    var itemType = itemModel['@ItemType'];
    return new exports._layoutItemTypeMap[itemType](itemModel, serializer);
}
exports.deserializeDashboardLayoutNode = deserializeDashboardLayoutNode;
