﻿/**
* DevExpress Dashboard (_data-source-factory-base.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._baseDataSourceTypesMap = void 0;
const ef_data_source_1 = require("./ef-data-source");
const excel_data_source_1 = require("./excel-data-source");
const extract_data_source_1 = require("./extract-data-source");
const json_data_source_1 = require("./json-data-source");
const mongodb_data_source_1 = require("./mongodb-data-source");
const object_data_source_1 = require("./object-data-source");
const olap_data_source_1 = require("./olap-data-source");
const sql_data_source_1 = require("./sql-data-source");
const xpo_data_source_1 = require("./xpo-data-source");
exports._baseDataSourceTypesMap = {
    'ObjectDataSource': object_data_source_1.ObjectDataSource,
    'SqlDataSource': sql_data_source_1.SqlDataSource,
    'OLAPDataSource': olap_data_source_1.OlapDataSource,
    'EFDataSource': ef_data_source_1.EFDataSource,
    'ExcelDataSource': excel_data_source_1.ExcelDataSource,
    'ExtractFileDataSource': extract_data_source_1.ExtractDataSource,
    'JsonDataSource': json_data_source_1.JsonDataSource,
    'XPObjectSource': xpo_data_source_1.XpoDataSource,
    'MongoDBDataSource': mongodb_data_source_1.MongoDBDataSource
};
