﻿/**
* DevExpress Dashboard (kpi-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KpiItem = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const series_item_1 = require("../series-item");
const _kpi_item_1 = require("./metadata/_kpi-item");
class KpiItem extends series_item_1.SeriesItem {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    _getInfoCore() {
        return _kpi_item_1.kpiDashboardItemSerializationsInfo;
    }
    _getMasterFilterMode() { return this.interactivityOptions.masterFilterMode(); }
    _getDrillDownEnabled() { return this.interactivityOptions.isDrillDownEnabled(); }
    _getIgnoreMasterFilter() { return this.interactivityOptions.ignoreMasterFilters(); }
}
exports.KpiItem = KpiItem;
