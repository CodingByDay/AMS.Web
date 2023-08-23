﻿/**
* DevExpress Dashboard (range-set.js)
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
exports.RangeSet = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const _utils_1 = require("../../../internal/_utils");
const serializable_model_1 = require("../../../serializable-model");
const _range_set_1 = require("./metadata/_range-set");
const range_info_1 = require("./range-info");
class RangeSet extends serializable_model_1.SerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.ranges = analytics_utils_1.deserializeArray(modelJson.Ranges, (range) => new range_info_1.RangeInfo(range, serializer));
    }
    getInfo() {
        return _range_set_1.rangeSetSerializationsInfo;
    }
}
__decorate([
    _utils_1.collectionItemType('RangeInfo')
], RangeSet.prototype, "ranges", void 0);
exports.RangeSet = RangeSet;
