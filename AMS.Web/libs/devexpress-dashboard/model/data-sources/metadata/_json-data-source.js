﻿/**
* DevExpress Dashboard (_json-data-source.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonDataSourceSerializationsInfo = void 0;
const analytics_data_1 = require("@devexpress/analytics-core/analytics-data");
const ko = require("knockout");
const _base_metadata_1 = require("../../metadata/_base-metadata");
const _data_source_1 = require("./_data-source");
exports.jsonDataSourceSerializationsInfo = _data_source_1.dataSourceSerializationsInfo.concat([
    _base_metadata_1.filter,
    { propertyName: 'connectionName', modelName: '@ConnectionName' },
    { propertyName: 'rootElement', modelName: '@RootElement', defaultVal: 'root' },
    {
        propertyName: 'schema', modelName: 'Schema',
        from: (model, serializer) => ko.observable(analytics_data_1.JsonSchemaRootNode.from(model, serializer)),
        toJsonObject: analytics_data_1.JsonSchemaRootNode.toJson,
        category: _base_metadata_1.PropertyCategory.NoUpdateByObservableValue
    }
]);
