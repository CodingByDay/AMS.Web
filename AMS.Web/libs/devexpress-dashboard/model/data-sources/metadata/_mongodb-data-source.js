﻿/**
* DevExpress Dashboard (_mongodb-data-source.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoDBQuerySerializationsInfo = exports.collectionNameProperty = exports.mongoQueryAliasProperty = exports.mongoDBDataSourceSerializationsInfo = void 0;
const _base_metadata_1 = require("../../metadata/_base-metadata");
const _data_source_1 = require("./_data-source");
exports.mongoDBDataSourceSerializationsInfo = _data_source_1.dataSourceSerializationsInfo.concat([]);
exports.mongoQueryAliasProperty = { propertyName: 'alias', modelName: '@Alias' };
exports.collectionNameProperty = { propertyName: 'collectionName', modelName: '@CollectionName' };
exports.mongoDBQuerySerializationsInfo = [_base_metadata_1.itemType, exports.mongoQueryAliasProperty, exports.collectionNameProperty];
