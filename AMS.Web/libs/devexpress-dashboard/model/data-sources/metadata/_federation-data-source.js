﻿/**
* DevExpress Dashboard (_federation-data-source.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.federationDataSourceSerializationsInfo = exports.sources = exports.sourceSerializationsInfo = exports.dataMemberProperty = exports.dataSourceProperty = exports.context = exports.contextItemSerializationsInfo = exports.idProperty = exports.queryNodes = exports.queryNodeSerializationsInfo = exports.queryTypeProperty = exports.aliasProperty = void 0;
const _base_metadata_1 = require("../../metadata/_base-metadata");
const _data_source_1 = require("./_data-source");
exports.aliasProperty = { propertyName: 'alias', modelName: '@Alias' };
exports.queryTypeProperty = { propertyName: '_queryType', modelName: '@QueryType' };
exports.queryNodeSerializationsInfo = [_base_metadata_1.itemType, exports.aliasProperty, exports.queryTypeProperty];
exports.queryNodes = { propertyName: 'queries', modelName: 'Queries', array: true };
exports.idProperty = { propertyName: 'id', modelName: '@ID' };
exports.contextItemSerializationsInfo = [_base_metadata_1.itemType, exports.idProperty];
exports.context = { propertyName: 'context', modelName: 'Context', array: true };
exports.dataSourceProperty = { propertyName: 'dataSource', modelName: 'DataSource' };
exports.dataMemberProperty = { propertyName: 'dataMember', modelName: 'DataMember' };
exports.sourceSerializationsInfo = [_base_metadata_1.itemType, exports.dataSourceProperty, exports.dataMemberProperty, _base_metadata_1.name];
exports.sources = { propertyName: 'sources', modelName: 'Sources', array: true };
exports.federationDataSourceSerializationsInfo = _data_source_1.dataSourceSerializationsInfo.concat([exports.queryNodes, exports.context, exports.sources]);
