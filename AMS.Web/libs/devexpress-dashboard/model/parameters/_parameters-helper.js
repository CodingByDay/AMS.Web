﻿/**
* DevExpress Dashboard (_parameters-helper.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterHelper = exports.validateGuid = void 0;
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _date_utils_1 = require("../internal/_date-utils");
const _base_metadata_1 = require("../metadata/_base-metadata");
function validateGuid(guid) {
    return guid && (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(guid)
        || /^\{[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\}$/.test(guid)
        || /^\([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\)$/.test(guid)
        || /^[0-9a-fA-F]{32}$/.test(guid));
}
exports.validateGuid = validateGuid;
class ParameterHelper {
    static getInfoPerType(valueType) {
        var value = { propertyName: 'value', modelName: '#text', displayName: 'DashboardStringId.ParametersFormValueColumnCaption', simpleFormAdapterItem: 'textBoxEditor' };
        if (valueType) {
            const { simpleFormAdapterItem } = ParameterHelper.getEditorType(valueType());
            return [_jquery_helpers_1.deepExtend({}, value, { simpleFormAdapterItems: simpleFormAdapterItem }), _base_metadata_1.itemType];
        }
        return [value, _base_metadata_1.itemType];
    }
    static getEditorType(typeString) {
        if (typeString === 'Enum') {
            return { simpleFormAdapterItem: 'selectBoxEditor', editorOptions: undefined };
        }
        if (typeString === 'System.String') {
            return { simpleFormAdapterItem: 'textBoxEditor', editorOptions: undefined };
        }
        if (typeString === 'System.Guid') {
            return { simpleFormAdapterItem: 'guidEditor', editorOptions: undefined };
        }
        if (typeString === 'System.SByte'
            || typeString === 'System.Int64'
            || typeString === 'System.Int32'
            || typeString === 'System.Int16'
            || typeString === 'System.Byte'
            || typeString === 'System.UInt16'
            || typeString === 'System.UInt32'
            || typeString === 'System.UInt64') {
            return {
                simpleFormAdapterItem: 'numberBoxEditor',
                editorOptions: {
                    format: '0#'
                }
            };
        }
        if (typeString === 'System.Single'
            || typeString === 'System.Double'
            || typeString === 'System.Decimal') {
            return {
                simpleFormAdapterItem: 'numberBoxEditor',
                editorOptions: {
                    format: ''
                }
            };
        }
        if (typeString === 'System.Boolean') {
            return { simpleFormAdapterItem: 'onOffButtonGroupEditor', editorOptions: undefined };
        }
        if (typeString === 'System.DateTime') {
            return { simpleFormAdapterItem: 'dateBoxEditor', editorOptions: undefined };
        }
        return { simpleFormAdapterItem: 'textBoxEditor', editorOptions: undefined };
    }
    static _getTypeValue(typeName) {
        var values = ParameterHelper.typeValues.filter((type) => { return type.value === typeName; });
        return values.length > 0 ? values[0] : null;
    }
    static _tryConvertValue(value, type, allowNull) {
        var condition = val => {
            return val !== void 0 && val !== null && !isNaN(typeof val === 'string' ? '' : val);
        };
        if (!condition(value)) {
            return { isValid: allowNull, newValue: null };
        }
        var typeValue = this._getTypeValue(type), converter = (typeValue && typeValue.valueConverter) || (val => typeValue && typeValue.defaultValue), newValue = converter(value);
        return { isValid: condition(newValue), newValue: newValue };
    }
    static getDefaultTypeValue(type) {
        var typeValue = this._getTypeValue(type);
        return typeValue ? typeValue.defaultValue : '';
    }
    static convertSingleValue(value, type, allowNull = false) {
        var result = this._tryConvertValue(value, type, allowNull);
        return result.isValid ? result.newValue : this.getDefaultTypeValue(type);
    }
}
exports.ParameterHelper = ParameterHelper;
ParameterHelper.typeValues = [
    { value: 'System.String', displayValue: 'AnalyticsCoreStringId.Parameter_Type_String', defaultValue: '', specifics: 'String', valueConverter: val => { return val.toString(); } },
    { value: 'System.DateTime', displayValue: 'AnalyticsCoreStringId.Parameter_Type_DateTime', defaultValue: _base_metadata_1.fromDateToString(new Date(new Date().setHours(0, 0, 0, 0))), specifics: 'Date', valueConverter: val => { return _date_utils_1.toUtcDate(val); } },
    { value: 'System.Int16', displayValue: 'AnalyticsCoreStringId.Parameter_Type_Int16', defaultValue: 0, specifics: 'Integer', valueConverter: val => { return parseInt(val); } },
    { value: 'System.Int32', displayValue: 'AnalyticsCoreStringId.Parameter_Type_Int32', defaultValue: 0, specifics: 'Integer', valueConverter: val => { return parseInt(val); } },
    { value: 'System.Int64', displayValue: 'AnalyticsCoreStringId.Parameter_Type_Int64', defaultValue: '0', specifics: 'String', valueConverter: val => { try {
            return BigInt(val).toString();
        }
        catch (e) {
            return NaN;
        } } },
    { value: 'System.Single', displayValue: 'AnalyticsCoreStringId.Parameter_Type_Float', defaultValue: 0, specifics: 'Float', valueConverter: val => { return parseFloat(val); } },
    { value: 'System.Double', displayValue: 'AnalyticsCoreStringId.Parameter_Type_Double', defaultValue: 0, specifics: 'Float', valueConverter: val => { return parseFloat(val); } },
    { value: 'System.Decimal', displayValue: 'AnalyticsCoreStringId.Parameter_Type_Decimal', defaultValue: 0, specifics: 'Float', valueConverter: val => { return parseFloat(val); } },
    { value: 'System.Boolean', displayValue: 'AnalyticsCoreStringId.Parameter_Type_Boolean', defaultValue: false, specifics: 'Bool', valueConverter: val => { return String(val).toLowerCase() === 'true' ? true : (String(val).toLowerCase() === 'false' ? false : false); } },
    { value: 'System.Guid', displayValue: 'AnalyticsCoreStringId.Parameter_Type_Guid', defaultValue: '00000000-0000-0000-0000-000000000000', specifics: 'String', valueConverter: val => { return validateGuid(val) ? val : '00000000-0000-0000-0000-000000000000'; } }
];
