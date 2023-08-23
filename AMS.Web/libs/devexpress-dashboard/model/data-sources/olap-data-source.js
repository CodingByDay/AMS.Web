﻿/**
* DevExpress Dashboard (olap-data-source.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OlapDataSource = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const data_source_1 = require("./data-source");
const _olap_data_source_1 = require("./metadata/_olap-data-source");
class OlapDataSource extends data_source_1.DataSource {
    constructor(dataSourceJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dataSourceJSON, serializer);
    }
    get _isFederationDataProvider() {
        return false;
    }
    getInfo() {
        return _olap_data_source_1.olapDataSourceSerializationsInfo;
    }
    getDisplayNamePrefix() {
        return 'DashboardStringId.DefaultOlapDataSourceName';
    }
    _getDefaultItemType() {
        return 'OLAPDataSource';
    }
}
exports.OlapDataSource = OlapDataSource;
