﻿/**
* DevExpress Dashboard (_data-source-factory-base.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { EFDataSource } from './ef-data-source';
import { ExcelDataSource } from './excel-data-source';
import { ExtractDataSource } from './extract-data-source';
import { JsonDataSource } from './json-data-source';
import { MongoDBDataSource } from './mongodb-data-source';
import { ObjectDataSource } from './object-data-source';
import { OlapDataSource } from './olap-data-source';
import { SqlDataSource } from './sql-data-source';
import { XpoDataSource } from './xpo-data-source';
export declare let _baseDataSourceTypesMap: {
    ObjectDataSource: typeof ObjectDataSource;
    SqlDataSource: typeof SqlDataSource;
    OLAPDataSource: typeof OlapDataSource;
    EFDataSource: typeof EFDataSource;
    ExcelDataSource: typeof ExcelDataSource;
    ExtractFileDataSource: typeof ExtractDataSource;
    JsonDataSource: typeof JsonDataSource;
    XPObjectSource: typeof XpoDataSource;
    MongoDBDataSource: typeof MongoDBDataSource;
};
