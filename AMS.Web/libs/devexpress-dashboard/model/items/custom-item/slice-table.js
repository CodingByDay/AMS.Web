﻿/**
* DevExpress Dashboard (slice-table.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliceTable = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const data_item_1 = require("../../data-item/data-item");
const _utils_1 = require("../../internal/_utils");
const serializable_model_1 = require("../../serializable-model");
const _slice_table_1 = require("./metadata/_slice-table");
class SliceTable extends serializable_model_1.SerializableModel {
    constructor(_dataItemProvider, modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this._dataItemProvider = _dataItemProvider;
        this.dimensions = analytics_utils_1.deserializeArray(modelJson.Dimensions, (item) => new data_item_1.DataItemLink(_dataItemProvider, item, serializer));
        this.measures = analytics_utils_1.deserializeArray(modelJson.Measures, (item) => new data_item_1.DataItemLink(_dataItemProvider, item, serializer));
    }
    getInfo() {
        return _slice_table_1.sliceTableSerializationsInfo;
    }
    push(bindings, dataItemType) {
        var targetArray = dataItemType === 'Dimension' ? this.dimensions : this.measures;
        targetArray.push.apply(targetArray, bindings.map(link => data_item_1.DataItemLink.create(this._dataItemProvider, link)));
    }
}
__decorate([
    _utils_1.collectionItemType('Dimension')
], SliceTable.prototype, "dimensions", void 0);
__decorate([
    _utils_1.collectionItemType('Measure')
], SliceTable.prototype, "measures", void 0);
exports.SliceTable = SliceTable;
