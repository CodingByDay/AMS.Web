﻿/**
* DevExpress Dashboard (_helpers.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDataMemberInfo = void 0;
const ko = require("knockout");
const data_item_1 = require("../model/data-item/data-item");
const olap_data_source_1 = require("../model/data-sources/olap-data-source");
function createDataMemberInfo(field, dataSource) {
    let dataMemberInfo = {
        name: dataSource instanceof olap_data_source_1.OlapDataSource ? field.dataMember() : field.name(),
        displayName: ko.unwrap(field.displayName),
        isList: !field.isDataFieldNode(),
        specifics: field.isDataFieldNode() ? field.fieldType && data_item_1.DataItem.typesMap[field.fieldType()] || 'Default' :
            field.isDataSourceNode && field.isDataSourceNode() ||
                field.isDataTableNode && field.isDataTableNode() ||
                field.isExpressionsNode && field.isExpressionsNode() ||
                field.isList && field.isList() ? 'List' :
                'Default',
    };
    return Object.assign(Object.assign({}, dataMemberInfo), { hasItems: !field.isDataFieldNode(), field: field });
}
exports.createDataMemberInfo = createDataMemberInfo;
