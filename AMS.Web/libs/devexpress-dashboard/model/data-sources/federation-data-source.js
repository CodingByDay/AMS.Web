﻿/**
* DevExpress Dashboard (federation-data-source.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Source = exports.ContextItem = exports.QueryNode = exports.FederationDataSource = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const serializable_model_1 = require("../serializable-model");
const data_source_1 = require("./data-source");
const _federation_data_source_1 = require("./metadata/_federation-data-source");
const _data_source_factory_base_1 = require("./_data-source-factory-base");
class FederationDataSource extends data_source_1.DataSource {
    constructor(dataSourceJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dataSourceJSON, serializer);
        this.queries = analytics_utils_1.deserializeArray(dataSourceJSON.Queries, json => new QueryNode(json, serializer));
        this.context = analytics_utils_1.deserializeArray(dataSourceJSON.Context, json => new ContextItem(json, serializer));
        this.sources = analytics_utils_1.deserializeArray(dataSourceJSON.Sources, json => new Source(json, serializer));
        this.hasCalculatedFields = true;
        this.supportDataMembers = true;
    }
    get _isFederationDataProvider() {
        return true;
    }
    getInfo() {
        return _federation_data_source_1.federationDataSourceSerializationsInfo;
    }
    getDisplayNamePrefix() {
        return 'DashboardStringId.DefaultFederationDataSourceName';
    }
    _getDefaultItemType() {
        return 'FederationDataSource';
    }
}
exports.FederationDataSource = FederationDataSource;
class QueryNode extends serializable_model_1.SerializableModel {
    constructor(json = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(json, serializer);
    }
    get queryType() { return this._queryType(); }
    getInfo() {
        return _federation_data_source_1.queryNodeSerializationsInfo;
    }
    _getDefaultItemType() {
        return 'QueryNode';
    }
}
exports.QueryNode = QueryNode;
class ContextItem extends serializable_model_1.SerializableModel {
    constructor(json = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(json, serializer);
        this.source = ko.observable(null);
        for (let key in _data_source_factory_base_1._baseDataSourceTypesMap) {
            var dataSourceJson = json[key];
            if (dataSourceJson !== undefined) {
                this.source(new _data_source_factory_base_1._baseDataSourceTypesMap[key](dataSourceJson || {}));
                break;
            }
        }
    }
    getInfo() {
        return _federation_data_source_1.contextItemSerializationsInfo;
    }
    _getDefaultItemType() {
        return 'ContextItem';
    }
}
exports.ContextItem = ContextItem;
class Source extends serializable_model_1.SerializableModel {
    constructor(json = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(json, serializer);
    }
    getInfo() {
        return _federation_data_source_1.sourceSerializationsInfo;
    }
    _getDefaultItemType() {
        return 'Source';
    }
}
exports.Source = Source;
