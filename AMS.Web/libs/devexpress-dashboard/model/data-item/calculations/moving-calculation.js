﻿/**
* DevExpress Dashboard (moving-calculation.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovingCalculation = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const measure_calculation_1 = require("./measure-calculation");
const _moving_calculation_1 = require("./metadata/_moving-calculation");
class MovingCalculation extends measure_calculation_1.MeasureCalculation {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    get name() {
        return 'DashboardWebStringId.Calculations.Moving';
    }
    getInfo() {
        return _moving_calculation_1.movingCalculationSerializationsInfo;
    }
    _createInstance() {
        return new MovingCalculation();
    }
    _getExpression(argument) {
        return `${this._getAggrName(this.summaryType())}(${argument}, -${this.previousValuesCount()}, ${this.nextValuesCount()})`;
    }
}
exports.MovingCalculation = MovingCalculation;
measure_calculation_1.calculationsTypesMap['Moving'] = MovingCalculation;
