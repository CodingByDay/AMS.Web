﻿/**
* DevExpress Dashboard (_calculated-field.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatedFieldSerializationsInfo = exports.calculatedFieldType = exports.calcFieldExpressionEditable = exports.calcFieldExpression = exports.calcFieldDataMember = void 0;
const _base_metadata_1 = require("../../metadata/_base-metadata");
exports.calcFieldDataMember = { propertyName: 'dataMember', modelName: '@DataMember' };
exports.calcFieldExpression = { propertyName: 'expression', modelName: '@Expression', defaultVal: '' };
exports.calcFieldExpressionEditable = { propertyName: 'expressionEditable', displayName: 'DashboardStringId.CalculationTypeExpression' };
exports.calculatedFieldType = {
    propertyName: 'fieldType', modelName: '@DataType', displayName: 'DevExpressWebStringId.CalculatedFieldDataType', defaultVal: 'String', simpleFormAdapterItem: 'selectBoxEditor', values: {
        'Auto': 'DashboardStringId.CalculatedFieldTypeAuto',
        'String': 'DashboardStringId.CalculatedFieldTypeString',
        'Integer': 'DashboardStringId.CalculatedFieldTypeLong',
        'Double': 'DashboardStringId.CalculatedFieldTypeDouble',
        'Decimal': 'DashboardStringId.CalculatedFieldTypeDecimal',
        'Boolean': 'DashboardStringId.CalculatedFieldTypeBoolean',
        'DateTime': 'DashboardStringId.CalculatedFieldTypeDateTime',
        'Object': 'DashboardStringId.CalculatedFieldTypeObject'
    }
};
exports.calculatedFieldSerializationsInfo = [_base_metadata_1.itemType, _base_metadata_1.name, exports.calcFieldExpression, exports.calculatedFieldType, exports.calcFieldDataMember];
