﻿/**
* DevExpress Dashboard (coloring-options.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardItemColoringOptions = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const serializable_model_1 = require("../../serializable-model");
const _dashboard_item_coloring_options_1 = require("./metadata/_dashboard-item-coloring-options");
class DashboardItemColoringOptions extends serializable_model_1.SerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return _dashboard_item_coloring_options_1.dashboardItemColoringOptionsSerializationsInfo;
    }
}
exports.DashboardItemColoringOptions = DashboardItemColoringOptions;
