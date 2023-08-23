﻿/**
* DevExpress Dashboard (ef-data-source.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EFDataSource = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const data_source_1 = require("./data-source");
const _ef_data_source_1 = require("./metadata/_ef-data-source");
class EFDataSource extends data_source_1.DataSource {
    constructor(dataSourceJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dataSourceJSON, serializer);
        this._tables = ko.observableArray();
        this.hasCalculatedFields = true;
        this.supportDataMembers = true;
    }
    get _isFederationDataProvider() {
        return true;
    }
    getInfo() {
        return _ef_data_source_1.efDataSourceSerializationsInfo;
    }
    getDisplayNamePrefix() {
        return 'DashboardStringId.DefaultEFDataSourceName';
    }
    _getDefaultItemType() {
        return 'EFDataSource';
    }
}
exports.EFDataSource = EFDataSource;
