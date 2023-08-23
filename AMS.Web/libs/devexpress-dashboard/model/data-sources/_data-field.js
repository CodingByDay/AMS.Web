﻿/**
* DevExpress Dashboard (_data-field.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataField = exports.IsOlapHierarchyField = exports.IsDateTime = exports.IsTextual = exports.IsNumeric = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const $ = require("jquery");
const ko = require("knockout");
const serializable_model_1 = require("../serializable-model");
const _data_field_1 = require("./metadata/_data-field");
let IsNumeric = (dataType) => (['Decimal', 'Float', 'Double', 'Integer'].indexOf(dataType) > -1);
exports.IsNumeric = IsNumeric;
let IsTextual = (dataType) => (['Enum', 'Text'].indexOf(dataType) > -1);
exports.IsTextual = IsTextual;
let IsDateTime = (dataType) => (['DateTime'].indexOf(dataType) > -1);
exports.IsDateTime = IsDateTime;
let IsOlapHierarchyField = dataField => !!dataField.groupIndex && dataField.groupIndex() !== undefined;
exports.IsOlapHierarchyField = IsOlapHierarchyField;
class DataField extends serializable_model_1.SerializableModel {
    constructor(dataFieldJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dataFieldJSON, serializer);
        this.expanded = true;
        this.childNodes = analytics_utils_1.deserializeArray(dataFieldJSON.ChildNodes, (item) => new DataField(item, serializer));
        if (!this.isDataFieldNode() || this.childNodes().length > 0) {
            this.fieldType(undefined);
        }
        this.groupDataItems = $.map(dataFieldJSON.GroupFieldTypes || {}, (type, name) => {
            return {
                dataMember: ko.observable(name),
                fieldType: ko.observable(type),
                displayName: ko.observable(dataFieldJSON.GroupCaptions[dataFieldJSON.GroupDataMembers.indexOf(name)]),
                isConvertible: ko.observable(true),
                isDataFieldNode: ko.observable(true)
            };
        });
        this.defaultNumericFormat = dataFieldJSON.DefaultNumericFormat;
    }
    static isNumeric(dataField) {
        return dataField && (exports.IsNumeric(dataField.fieldType()) || (dataField.fieldType() == 'Custom' && DataField.isOlap(dataField.dataMember())));
    }
    static isDateTime(dataField) {
        return dataField && exports.IsDateTime(dataField.fieldType());
    }
    static olapMarker() {
        return '].[';
    }
    static isOlap(dataMember) {
        return dataMember && ((dataMember.indexOf(DataField.olapMarker()) !== -1)
            || ((dataMember[0] === '[') && (dataMember.indexOf(']') === dataMember.length - 1)));
    }
    static isMeasure(dataField) {
        if (dataField.isAggregate && dataField.isAggregate())
            return true;
        var isOlap = DataField.isOlap(dataField.dataMember());
        return (!isOlap && DataField.isNumeric(dataField)) || (isOlap && DataField.isOrContainMeasures(dataField.dataMember()));
    }
    static isOrContainMeasures(dataMember) {
        return dataMember === '[Measures]' || dataMember.indexOf('[Measures]') !== -1;
    }
    static ifOlapThenOnlyMeasure(dataField) {
        return !DataField.isOlap(dataField.dataMember()) || DataField.isOrContainMeasures(dataField.dataMember());
    }
    static ifOlapThenOnlyDimension(dataField) {
        return !DataField.isOlap(dataField.dataMember()) || !DataField.isOrContainMeasures(dataField.dataMember());
    }
    static isContinous(dataField) {
        return dataField && (DataField.isNumeric(dataField) || dataField.fieldType() === 'DateTime');
    }
    static isOlapHierarchy(dataField) {
        return dataField && !!dataField.nodeType && dataField.nodeType() === 'OlapHierarchy';
    }
    getInfo() {
        return _data_field_1.dataFieldSerializationsInfo;
    }
}
exports.DataField = DataField;
