﻿/**
* DevExpress Dashboard (extract-data-source.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractDataSource = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const data_source_1 = require("./data-source");
const _extract_data_source_1 = require("./metadata/_extract-data-source");
class ExtractDataSource extends data_source_1.DataSource {
    get _isFederationDataProvider() {
        return true;
    }
    constructor(dataSourceJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dataSourceJSON, serializer);
        this.hasCalculatedFields = true;
        this.hasFilter = true;
    }
    getInfo() {
        return _extract_data_source_1.extractDataSourceSerializationsInfo;
    }
    getDisplayNamePrefix() {
        return 'DashboardStringId.DefaultFileExtractDataSourceName';
    }
    _getDefaultItemType() {
        return 'ExtractFileDataSource';
    }
}
exports.ExtractDataSource = ExtractDataSource;
