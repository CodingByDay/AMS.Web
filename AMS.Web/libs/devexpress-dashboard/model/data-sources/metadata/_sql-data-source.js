﻿/**
* DevExpress Dashboard (_sql-data-source.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlDataSourceSerializationsInfo = exports.connection = exports.selectedTables = exports.queries = void 0;
const connection_1 = require("../connection");
const _data_source_1 = require("./_data-source");
exports.queries = { propertyName: 'queries', modelName: 'Queries', array: true };
exports.selectedTables = { propertyName: 'selectedTables', modelName: 'SelectedTables', array: true };
exports.connection = { propertyName: 'connection', modelName: 'Connection', type: connection_1.SqlConnection };
exports.sqlDataSourceSerializationsInfo = _data_source_1.dataSourceSerializationsInfo.concat([exports.queries, exports.connection]);
