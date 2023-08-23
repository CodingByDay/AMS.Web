﻿/**
* DevExpress Dashboard (_base-metadata.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorPropertyName = exports.weightPropertyName = exports.sparklineArgumentPropertyName = exports.targetValuePropertyName = exports.actualValuePropertyName = exports.valuePropertyName = exports.argumentPropertyName = exports.valuesPropertyName = exports.argumentsPropertyName = exports.rowsPropertyName = exports.columnsPropertyName = exports.BindingSectionTitles = exports.contentLineCount = exports.contentArrangementMode = exports.filter = exports.dataMember = exports.nameTag = exports.name_ViewModel = exports.name = exports.url = exports.componentName = exports.itemType = exports.integerValidationRule = exports.nullableFloatToModel = exports.fromDateToString = exports.fromStringToDate = exports.floatFromModel = exports.parseBool = exports.PropertyCategory = exports.NotSupportedProperty = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const _date_utils_1 = require("../internal/_date-utils");
exports.NotSupportedProperty = 'NotSupportedProperty';
function testCast() {
    var a = { propertyName: '123' };
    var b = a;
    return b;
}
var PropertyCategory;
(function (PropertyCategory) {
    PropertyCategory[PropertyCategory["ClientState"] = 0] = "ClientState";
    PropertyCategory[PropertyCategory["Data"] = 1] = "Data";
    PropertyCategory[PropertyCategory["Interactivity"] = 2] = "Interactivity";
    PropertyCategory[PropertyCategory["ViewModel"] = 3] = "ViewModel";
    PropertyCategory[PropertyCategory["Map"] = 4] = "Map";
    PropertyCategory[PropertyCategory["Initialize"] = 5] = "Initialize";
    PropertyCategory[PropertyCategory["Coloring"] = 6] = "Coloring";
    PropertyCategory[PropertyCategory["NoUpdate"] = 7] = "NoUpdate";
    PropertyCategory[PropertyCategory["NoUpdateByObservableValue"] = 8] = "NoUpdateByObservableValue";
})(PropertyCategory = exports.PropertyCategory || (exports.PropertyCategory = {}));
function parseBool(value) {
    return analytics_utils_1.parseBool(value);
}
exports.parseBool = parseBool;
function floatFromModel(value) {
    return ko.observable(parseFloat(value));
}
exports.floatFromModel = floatFromModel;
function fromStringToDate(val) {
    return ko.observable(_date_utils_1.toUtcDate(val));
}
exports.fromStringToDate = fromStringToDate;
function fromDateToString(date) {
    return _date_utils_1.fromUtcDateToString(date);
}
exports.fromDateToString = fromDateToString;
function nullableFloatToModel(value) {
    if (!isNaN(value))
        return JSON.stringify(value);
    return {};
}
exports.nullableFloatToModel = nullableFloatToModel;
exports.integerValidationRule = {
    type: 'custom',
    validationCallback: (e) => Math.abs(Math.round(e.value) - e.value) === 0 || isNaN(e.value)
};
exports.itemType = { propertyName: 'itemType', modelName: '@ItemType', defaultVal: '' };
exports.componentName = { propertyName: 'componentName', modelName: '@ComponentName', displayName: 'DashboardWebStringId.Dashboard.ComponentName', simpleFormAdapterItem: 'textBoxEditor' };
exports.url = { propertyName: 'url', modelName: '@RequestUrl' };
exports.name = { propertyName: 'name', modelName: '@Name', displayName: 'DashboardWebStringId.Options.Caption', simpleFormAdapterItem: 'textBoxEditor' };
exports.name_ViewModel = { propertyName: 'name', modelName: '@Name', displayName: 'DashboardWebStringId.Options.Caption', simpleFormAdapterItem: 'textBoxEditor', category: PropertyCategory.ViewModel };
exports.nameTag = { propertyName: 'name', modelName: 'Name' };
exports.dataMember = { propertyName: 'dataMember', modelName: '@DataMember', displayName: 'DashboardStringId.DataSourceDataMember', simpleFormAdapterItem: 'textBoxEditor' };
exports.filter = { propertyName: 'filter', modelName: 'Filter' };
exports.contentArrangementMode = {
    propertyName: 'contentArrangementMode', modelName: '@ContentArrangementMode', displayName: 'DashboardWebStringId.Cards.ArrangementMode', defaultVal: 'Auto', simpleFormAdapterItem: 'listEditor',
    values: {
        'Auto': 'DashboardWebStringId.Cards.ArrangementMode.Auto',
        'FixedRowCount': 'DashboardWebStringId.Cards.ArrangementMode.FixedRows',
        'FixedColumnCount': 'DashboardWebStringId.Cards.ArrangementMode.FixedColumns'
    }
};
exports.contentLineCount = {
    propertyName: 'contentLineCount',
    modelName: '@ContentLineCount',
    displayName: 'DashboardWebStringId.Cards.LineCount',
    defaultVal: 3,
    simpleFormAdapterItem: 'numberBoxEditor',
    from: floatFromModel,
    editorOptions: { min: 1 },
    validationRules: [exports.integerValidationRule]
};
exports.BindingSectionTitles = {
    Arguments: 'DashboardStringId.DescriptionArguments',
    SingleArgument: 'DashboardWebStringId.Binding.Argument',
    SeriesDimension: 'DashboardStringId.DescriptionSeries'
};
exports.columnsPropertyName = '__columns';
exports.rowsPropertyName = '__rows';
exports.argumentsPropertyName = '__arguments';
exports.valuesPropertyName = '__values';
exports.argumentPropertyName = '__argument';
exports.valuePropertyName = '__value';
exports.actualValuePropertyName = '__actualValue';
exports.targetValuePropertyName = '__targetValue';
exports.sparklineArgumentPropertyName = '__sparklineArgument';
exports.weightPropertyName = '__weight';
exports.colorPropertyName = '__color';
