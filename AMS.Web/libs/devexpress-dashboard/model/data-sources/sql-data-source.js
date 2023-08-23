﻿/**
* DevExpress Dashboard (sql-data-source.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlDataSource = void 0;
const analytics_data_1 = require("@devexpress/analytics-core/analytics-data");
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const utils_1 = require("@devexpress/analytics-core/query-builder/dataSource/utils");
const data_source_1 = require("./data-source");
const _sql_data_source_1 = require("./metadata/_sql-data-source");
class SqlDataSource extends data_source_1.DataSource {
    constructor(dataSourceJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dataSourceJSON, serializer);
        this.queries = analytics_utils_1.deserializeArray(dataSourceJSON.Queries, item => {
            if (item['@Type'] === utils_1.SqlQueryType.customSqlQuery) {
                return new analytics_data_1.CustomSqlQuery(item, null, serializer);
            }
            else if (item['@Type'] === utils_1.SqlQueryType.tableQuery) {
                return new analytics_data_1.TableQuery(item, null, serializer);
            }
            else if (item['@Type'] === utils_1.SqlQueryType.storedProcQuery) {
                return new analytics_data_1.StoredProcQuery(item, null, serializer);
            }
            else {
                throw new Error('Unknown sql query type.');
            }
        });
        this.hasCalculatedFields = true;
        this.supportDataMembers = true;
    }
    get _isFederationDataProvider() {
        return true;
    }
    getInfo() {
        return _sql_data_source_1.sqlDataSourceSerializationsInfo;
    }
    getDisplayNamePrefix() {
        return 'DashboardStringId.DefaultSqlDataSourceName';
    }
    _getDefaultItemType() {
        return 'SqlDataSource';
    }
}
exports.SqlDataSource = SqlDataSource;
