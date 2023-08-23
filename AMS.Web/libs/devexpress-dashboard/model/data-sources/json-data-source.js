﻿/**
* DevExpress Dashboard (json-data-source.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonDataSource = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const data_source_1 = require("./data-source");
const _json_data_source_1 = require("./metadata/_json-data-source");
class JsonDataSource extends data_source_1.DataSource {
    constructor(dataSourceJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dataSourceJSON, serializer);
        this.hasCalculatedFields = true;
        this.hasFilter = true;
    }
    get _isFederationDataProvider() {
        return true;
    }
    getInfo() {
        return _json_data_source_1.jsonDataSourceSerializationsInfo;
    }
    getDisplayNamePrefix() {
        return 'DashboardStringId.DefaultJsonDataSourceName';
    }
    _getDefaultItemType() {
        return 'JsonDataSource';
    }
}
exports.JsonDataSource = JsonDataSource;
