﻿/**
* DevExpress Dashboard (dimension.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dimension = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const _data_field_1 = require("../data-sources/_data-field");
const _knockout_utils_1 = require("../internal/_knockout-utils");
const data_item_1 = require("./data-item");
const _dimension_1 = require("./metadata/_dimension");
class Dimension extends data_item_1.DataItem {
    constructor(dataItemJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dataItemJSON, serializer);
        this.realSortMode = ko.computed({
            read: () => {
                if (this.sortMeasure())
                    return this.sortMeasure();
                var valueModes = ['DXDisplayText', 'DXValue', 'DXID', 'DXKey'];
                var actualModes = ['DisplayText', 'Value', 'ID', 'Key'];
                return valueModes[actualModes.indexOf(this.sortMode())];
            },
            write: (val) => {
                var valueModes = ['DXDisplayText', 'DXValue', 'DXID', 'DXKey'];
                var actualModes = ['DisplayText', 'Value', 'ID', 'Key'];
                if (valueModes.indexOf(val) !== -1) {
                    this.sortMode(actualModes[valueModes.indexOf(val)]);
                    this.sortMeasure(null);
                }
                else {
                    this.sortMode('Value');
                    this.sortMeasure(val);
                }
            }
        });
        this._actualDateTimeGroupInterval = _knockout_utils_1.safeComputed({ dateTimeGroupInterval: this.dateTimeGroupInterval, dataMember: this.dataMember }, (args) => {
            return _data_field_1.DataField.isOlap(args.dataMember) ? 'None' : args.dateTimeGroupInterval;
        });
    }
    getInfo() {
        return _dimension_1.dimensionItemSerializationsInfo;
    }
    grabFrom(dataItem) {
        super.grabFrom(dataItem);
        if (!(dataItem instanceof Dimension))
            return;
        this.sortOrder(dataItem.sortOrder());
        this.sortMeasure(dataItem.sortMeasure());
        this.sortMode(dataItem.sortMode());
        this.dateTimeGroupInterval(dataItem.dateTimeGroupInterval());
        this.textGroupInterval(dataItem.textGroupInterval());
        this.isDiscreteNumericScale(dataItem.isDiscreteNumericScale());
        this.groupChildValues(dataItem.groupChildValues());
        this.coloringMode(dataItem.coloringMode());
        this.topNOptionsEnabled(dataItem.topNOptionsEnabled());
        this.topNOptionsMode(dataItem.topNOptionsMode());
        this.topNOptionsCount(dataItem.topNOptionsCount());
        this.topNOptionsMeasureName(dataItem.topNOptionsMeasureName());
        this.topNOptionsShowOthers(dataItem.topNOptionsShowOthers());
        this.groupIndex(dataItem.groupIndex());
    }
    isDefinitionEquals(dataItem) {
        return super.isDefinitionEquals(dataItem) && (dataItem instanceof Dimension) &&
            this.dateTimeGroupInterval() === dataItem.dateTimeGroupInterval() && this.textGroupInterval() == dataItem.textGroupInterval();
    }
    _getDefaultItemType() {
        return 'Dimension';
    }
}
exports.Dimension = Dimension;
