﻿/**
* DevExpress Dashboard (chart-calc-window-definition.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartWindowDefinition = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const measure_calc_window_definition_1 = require("./measure-calc-window-definition");
const _chart_calc_window_definition_1 = require("./metadata/_chart-calc-window-definition");
class ChartWindowDefinition extends measure_calc_window_definition_1.MeasureCalculationWindowDefinition {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return _chart_calc_window_definition_1.chartWindowDefinitionSerializationsInfo;
    }
    equals(def) {
        return (def instanceof ChartWindowDefinition) && (this.definitionMode() === def.definitionMode());
    }
}
exports.ChartWindowDefinition = ChartWindowDefinition;
measure_calc_window_definition_1.windowDefinitionsTypesMap['ChartWindowDefinition'] = ChartWindowDefinition;
