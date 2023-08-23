﻿/**
* DevExpress Dashboard (data-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataItemLink = exports.AcceptableShapingType = exports.DataItem = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const serializable_model_1 = require("../serializable-model");
const _data_item_1 = require("./metadata/_data-item");
class DataItem extends serializable_model_1.TypedSerializableModel {
    constructor(dataItemJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dataItemJSON, serializer);
    }
    getInfo() {
        return _data_item_1.dataItemSerializationsInfo;
    }
    grabFrom(dataItem) {
        this.name(dataItem.name());
        this.numericFormat.unit(dataItem.numericFormat.unit());
        this.numericFormat.precision(dataItem.numericFormat.precision());
        this.numericFormat.includeGroupSeparator(dataItem.numericFormat.includeGroupSeparator());
        this.numericFormat.formatType(dataItem.numericFormat.formatType());
        this.numericFormat.currencyCultureName(dataItem.numericFormat.currencyCultureName());
        this.dateTimeFormat.yearFormat(dataItem.dateTimeFormat.yearFormat());
        this.dateTimeFormat.quarterFormat(dataItem.dateTimeFormat.quarterFormat());
        this.dateTimeFormat.monthFormat(dataItem.dateTimeFormat.monthFormat());
        this.dateTimeFormat.dayOfWeekFormat(dataItem.dateTimeFormat.dayOfWeekFormat());
        this.dateTimeFormat.dateFormat(dataItem.dateTimeFormat.dateFormat());
        this.dateTimeFormat.dateHourFormat(dataItem.dateTimeFormat.dateHourFormat());
        this.dateTimeFormat.dateHourMinuteFormat(dataItem.dateTimeFormat.dateHourMinuteFormat());
        this.dateTimeFormat.dateTimeFormat(dataItem.dateTimeFormat.dateTimeFormat());
        this.dateTimeFormat.hourFormat(dataItem.dateTimeFormat.hourFormat());
        this.dateTimeFormat.exactDateFormat(dataItem.dateTimeFormat.exactDateFormat());
    }
    isDefinitionEquals(dataItem) {
        return !!dataItem && this.dataMember() === dataItem.dataMember();
    }
    getUniqueNamePrefix() {
        return 'DataItem';
    }
}
exports.DataItem = DataItem;
DataItem.typesMap = {
    Integer: 'integer',
    Float: 'double',
    Double: 'double',
    Decimal: 'double',
    DateTime: 'date',
    Text: 'string',
    String: 'string',
    Bool: 'Bool',
    Boolean: 'Bool',
    Enum: 'string'
};
var AcceptableShapingType;
(function (AcceptableShapingType) {
    AcceptableShapingType[AcceptableShapingType["Number"] = 0] = "Number";
    AcceptableShapingType[AcceptableShapingType["String"] = 1] = "String";
    AcceptableShapingType[AcceptableShapingType["RangeDate"] = 2] = "RangeDate";
    AcceptableShapingType[AcceptableShapingType["Attribute"] = 3] = "Attribute";
    AcceptableShapingType[AcceptableShapingType["Hidden"] = 4] = "Hidden";
})(AcceptableShapingType = exports.AcceptableShapingType || (exports.AcceptableShapingType = {}));
class DataItemLink extends serializable_model_1.TypedSerializableModel {
    constructor(dataItemProvider, dataItemLinkJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dataItemLinkJSON, serializer);
        this._dataItemProvider = ko.observable(null);
        this._specifics = {
            acceptableShapingType: AcceptableShapingType.Number,
            customOptionsProperties: [],
            customDataShapingProperties: [],
            isAttribute: false,
            skipFormatting: false,
            supportsTopNOther: true,
            forceAddOlapExactDateFormat: false
        };
        this._updateProvider(dataItemProvider);
        this.dataItem = ko.pureComputed({
            read: () => !!this._dataItemProvider() ? this._dataItemProvider()._getDataItem(this.uniqueName()) : undefined,
            write: (value) => this.uniqueName(value && value.uniqueName())
        });
    }
    static create(dataItemProvider, dataItemLink) {
        var link = new DataItemLink(dataItemProvider, { '@DefaultId': dataItemLink.uniqueName() }, undefined);
        return link;
    }
    getInfo() {
        return _data_item_1.dataItemLinkSerializationsInfo;
    }
    _getDefaultItemType() {
        return undefined;
    }
    _updateProvider(dataItemProvider) {
        this._dataItemProvider(dataItemProvider);
    }
}
exports.DataItemLink = DataItemLink;
