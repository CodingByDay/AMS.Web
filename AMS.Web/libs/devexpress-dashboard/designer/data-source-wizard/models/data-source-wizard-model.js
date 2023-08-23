﻿/**
* DevExpress Dashboard (data-source-wizard-model.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDashboardDataSourceType = exports.ToDataSourceTypeNumber = void 0;
const analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
const OlapDataSourceType = 3099;
function ToDataSourceTypeNumber(dashboardType) {
    switch (dashboardType) {
        case 'Sql': return analytics_wizard_1.DataSourceType.Sql;
        case 'Json': return analytics_wizard_1.DataSourceType.Json;
        case 'Olap': return OlapDataSourceType;
        case 'Federation': return analytics_wizard_1.DataSourceType.Federation;
    }
}
exports.ToDataSourceTypeNumber = ToDataSourceTypeNumber;
function ToDashboardDataSourceType(typeNumber) {
    switch (typeNumber) {
        case analytics_wizard_1.DataSourceType.Sql: return 'Sql';
        case analytics_wizard_1.DataSourceType.Json: return 'Json';
        case OlapDataSourceType: return 'Olap';
        case analytics_wizard_1.DataSourceType.Federation: return 'Federation';
    }
    throw new Error('Unknown datasource type number: ' + typeNumber);
}
exports.ToDashboardDataSourceType = ToDashboardDataSourceType;
