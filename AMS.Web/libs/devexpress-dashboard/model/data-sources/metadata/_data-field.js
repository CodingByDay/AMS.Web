﻿/**
* DevExpress Dashboard (_data-field.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataFieldSerializationsInfo = exports.dataFieldIsExpressionsNode = exports.dataFieldIsDataTableNode = exports.dataFieldIsDataSourceNode = exports.dataFieldIsCorruptedCalcField = exports.dataFieldIsList = exports.dataFieldIsComparable = exports.dataFieldIsConvertible = exports.dataFieldIsDataMemberNode = exports.dataFieldIsAggregate = exports.dataFieldIsDataFieldNode = exports.dataFieldFieldType = exports.dataFieldDisplayName = exports.dataFieldChildNodes = exports.groupIndex = exports.nodeType = exports.dataFieldName = exports.dataFieldDataMember = void 0;
const ko = require("knockout");
const _base_metadata_1 = require("../../metadata/_base-metadata");
exports.dataFieldDataMember = { propertyName: 'dataMember', modelName: 'DataMember' };
exports.dataFieldName = { propertyName: 'name', modelName: 'Name' };
exports.nodeType = { propertyName: 'nodeType', modelName: 'NodeType' };
exports.groupIndex = { propertyName: 'groupIndex', modelName: 'GroupIndex' };
exports.dataFieldChildNodes = { propertyName: 'childNodes', modelName: 'ChildNodes', array: true };
exports.dataFieldDisplayName = { propertyName: 'displayName', modelName: 'DisplayName' };
exports.dataFieldFieldType = {
    propertyName: 'fieldType', modelName: 'FieldType',
    defaultVal: 'Unknown',
    from: (value) => ko.observable(value === 'String' ? 'Text' : value)
};
exports.dataFieldIsDataFieldNode = { propertyName: 'isDataFieldNode', modelName: 'IsDataFieldNode', from: _base_metadata_1.parseBool };
exports.dataFieldIsAggregate = { propertyName: 'isAggregate', modelName: 'IsAggregateCalculatedField', from: _base_metadata_1.parseBool };
exports.dataFieldIsDataMemberNode = { propertyName: 'isDataMemberNode', modelName: 'IsDataMemberNode', from: _base_metadata_1.parseBool };
exports.dataFieldIsConvertible = { propertyName: 'isConvertible', modelName: 'IsConvertible', from: _base_metadata_1.parseBool };
exports.dataFieldIsComparable = { propertyName: 'isComparable', modelName: 'IsComparable', from: _base_metadata_1.parseBool };
exports.dataFieldIsList = { propertyName: 'isList', modelName: 'IsList', from: _base_metadata_1.parseBool };
exports.dataFieldIsCorruptedCalcField = { propertyName: 'isCorruptedCalcField', modelName: 'IsCorruptedCalculatedField', from: _base_metadata_1.parseBool };
exports.dataFieldIsDataSourceNode = { propertyName: 'isDataSourceNode', modelName: 'IsDataSourceNode', from: _base_metadata_1.parseBool };
exports.dataFieldIsDataTableNode = { propertyName: 'isDataTableNode', modelName: 'IsDataTableNode', from: _base_metadata_1.parseBool };
exports.dataFieldIsExpressionsNode = { propertyName: 'isExpressionsNode', modelName: 'IsExpressionsNode', from: _base_metadata_1.parseBool };
exports.dataFieldSerializationsInfo = [exports.dataFieldDataMember, exports.dataFieldName, exports.dataFieldChildNodes, exports.dataFieldDisplayName, exports.dataFieldFieldType, exports.dataFieldIsDataMemberNode, exports.dataFieldIsDataFieldNode, exports.dataFieldIsConvertible, exports.dataFieldIsComparable, exports.nodeType, exports.groupIndex, exports.dataFieldIsAggregate, exports.dataFieldIsList, exports.dataFieldIsCorruptedCalcField, exports.dataFieldIsDataSourceNode, exports.dataFieldIsDataTableNode, exports.dataFieldIsExpressionsNode];
