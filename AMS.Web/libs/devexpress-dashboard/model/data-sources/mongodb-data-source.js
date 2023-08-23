﻿/**
* DevExpress Dashboard (mongodb-data-source.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBQuery = exports.MongoDBDataSource = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const _knockout_utils_1 = require("../internal/_knockout-utils");
const serializable_model_1 = require("../serializable-model");
const data_source_1 = require("./data-source");
const _mongodb_data_source_1 = require("./metadata/_mongodb-data-source");
class MongoDBDataSource extends data_source_1.DataSource {
    constructor(dataSourceJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dataSourceJSON, serializer);
        this.queries = analytics_utils_1.deserializeArray(dataSourceJSON.Queries, json => new MongoDBQuery(json, serializer));
        this.hasCalculatedFields = true;
        this.supportDataMembers = true;
    }
    get _isFederationDataProvider() {
        return true;
    }
    getInfo() {
        return _mongodb_data_source_1.mongoDBDataSourceSerializationsInfo;
    }
    getDisplayNamePrefix() {
        return 'DashboardStringId.DefaultMongoDBDataSourceName';
    }
    _getDefaultItemType() {
        return 'MongoDBDataSource';
    }
}
exports.MongoDBDataSource = MongoDBDataSource;
class MongoDBQuery extends serializable_model_1.SerializableModel {
    constructor(json = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(json, serializer);
        this._actualName = _knockout_utils_1.safeComputed({ alias: this.alias, collectionName: this.collectionName }, (args) => {
            return args.alias || args.collectionName;
        });
    }
    getInfo() {
        return _mongodb_data_source_1.mongoDBQuerySerializationsInfo;
    }
    _getDefaultItemType() {
        return 'Query';
    }
}
exports.MongoDBQuery = MongoDBQuery;
