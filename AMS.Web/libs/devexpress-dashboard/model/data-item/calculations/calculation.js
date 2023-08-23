﻿/**
* DevExpress Dashboard (calculation.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculation = exports._currentCalculationInfo = void 0;
const analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const serializable_model_1 = require("../../serializable-model");
const measure_calculation_1 = require("./measure-calculation");
const _calculation_1 = require("./metadata/_calculation");
let _currentCalculationInfo = (model) => {
    if (!model.calculationType)
        return [];
    return [{
            propertyName: 'calculation',
            modelName: model.calculationType() || 'FakeCalculationForModelSubscriber',
            from: (json, serializer) => { return new measure_calculation_1.calculationsTypesMap[model.calculationType()](json, serializer); },
            toJsonObject: (value, serializer, refs) => {
                var result = serializer.serialize(value, null, refs);
                if (analytics_internal_1.isEmptyObject(result)) {
                    return null;
                }
                return result;
            }
        }];
};
exports._currentCalculationInfo = _currentCalculationInfo;
class Calculation extends serializable_model_1.SerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.calculationType = ko.observable();
        this.calculation = ko.observable();
        this.calculationType(Object.keys(measure_calculation_1.calculationsTypesMap).filter(mapItem => !!modelJson && modelJson[mapItem] !== undefined)[0]);
        if (!!this.calculationType()) {
            this.calculation(new (measure_calculation_1.calculationsTypesMap[this.calculationType()])((modelJson || {})[this.calculationType()]));
            delete this['_model'][this.calculationType()];
        }
        this.calculation.subscribe(calculation => {
            this.calculationType(Object.keys(measure_calculation_1.calculationsTypesMap).filter(mapItem => calculation instanceof measure_calculation_1.calculationsTypesMap[mapItem])[0]);
        });
    }
    getInfo() {
        return _calculation_1.calculationSerializationsInfo.concat(exports._currentCalculationInfo(this));
    }
    isEmpty() {
        return !this.calculation();
    }
}
exports.Calculation = Calculation;
