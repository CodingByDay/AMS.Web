﻿/**
* DevExpress Dashboard (measure.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Measure = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const data_item_1 = require("./data-item");
const _measure_1 = require("./metadata/_measure");
class Measure extends data_item_1.DataItem {
    constructor(dataItemJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dataItemJSON, serializer);
        this.expression.subscribe(val => {
            if (val !== undefined) {
                this.calculation.calculation(undefined);
            }
        });
    }
    getInfo() {
        return _measure_1.measureItemSerializationsInfo;
    }
    grabFrom(dataItem) {
        super.grabFrom(dataItem);
        if (!(dataItem instanceof Measure))
            return;
        this.summaryType(dataItem.summaryType());
    }
    isDefinitionEquals(dataItem) {
        return super.isDefinitionEquals(dataItem) && (dataItem instanceof Measure) &&
            this.summaryType() === dataItem.summaryType() && this.expression() === dataItem.expression() &&
            this.calculation.calculationType() === dataItem.calculation.calculationType() &&
            this.windowDefinition.equals(dataItem.windowDefinition) &&
            this.filterString() === dataItem.filterString();
    }
    _hasCalculation() {
        return !this.calculation.isEmpty() || !!this.expression();
    }
    _getDefaultItemType() {
        return 'Measure';
    }
}
exports.Measure = Measure;
