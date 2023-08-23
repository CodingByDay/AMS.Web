﻿/**
* DevExpress Dashboard (specific-calc-window-definition.js)
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
exports.SpecificWindowDefinition = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const _array_utils_1 = require("../../internal/_array-utils");
const _utils_1 = require("../../internal/_utils");
const data_item_1 = require("../data-item");
const measure_calc_window_definition_1 = require("./measure-calc-window-definition");
const _specific_calc_window_definition_1 = require("./metadata/_specific-calc-window-definition");
class SpecificWindowDefinition extends measure_calc_window_definition_1.MeasureCalculationWindowDefinition {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.dimensions = analytics_utils_1.deserializeArray(modelJson && modelJson.Dimensions, (item) => {
            return new data_item_1.DataItemLink(null, item, serializer);
        });
    }
    getInfo() {
        var dimensionsInfo = _specific_calc_window_definition_1.sliceTableDimensions;
        if (!!this._dimensionsInfoPatcher) {
            dimensionsInfo = this._dimensionsInfoPatcher(dimensionsInfo);
        }
        return super.getInfo().concat([dimensionsInfo]);
    }
    equals(def) {
        return (def instanceof SpecificWindowDefinition) &&
            _array_utils_1.compareNotOrderedArrays(this.dimensions(), def.dimensions(), (d1, d2) => d1.uniqueName() === d2.uniqueName());
    }
}
__decorate([
    _utils_1.collectionItemType('Dimension')
], SpecificWindowDefinition.prototype, "dimensions", void 0);
exports.SpecificWindowDefinition = SpecificWindowDefinition;
measure_calc_window_definition_1.windowDefinitionsTypesMap['SpecificWindowDefinition'] = SpecificWindowDefinition;
