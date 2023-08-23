﻿/**
* DevExpress Dashboard (xpo-data-source.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XpoDataSource = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const data_source_1 = require("./data-source");
const _xpo_data_source_1 = require("./metadata/_xpo-data-source");
class XpoDataSource extends data_source_1.DataSource {
    get _isFederationDataProvider() {
        return true;
    }
    constructor(dataSourceJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dataSourceJSON, serializer);
        this.hasFilter = true;
        this.hasCalculatedFields = true;
    }
    getInfo() {
        return _xpo_data_source_1.xpoDataSourceSerializationsInfo;
    }
    getDisplayNamePrefix() {
        return 'DashboardStringId.DefaultXpoDataSourceName';
    }
    _getDefaultItemType() {
        return 'XPObjectSource';
    }
}
exports.XpoDataSource = XpoDataSource;
