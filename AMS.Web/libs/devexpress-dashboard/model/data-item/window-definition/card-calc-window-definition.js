﻿/**
* DevExpress Dashboard (card-calc-window-definition.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardWindowDefinition = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const measure_calc_window_definition_1 = require("./measure-calc-window-definition");
const _card_calc_window_definition_1 = require("./metadata/_card-calc-window-definition");
class CardWindowDefinition extends measure_calc_window_definition_1.MeasureCalculationWindowDefinition {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return _card_calc_window_definition_1.cardWindowDefinitionSerializationsInfo;
    }
    equals(def) {
        return (def instanceof CardWindowDefinition) && (this.definitionMode() === def.definitionMode());
    }
}
exports.CardWindowDefinition = CardWindowDefinition;
measure_calc_window_definition_1.windowDefinitionsTypesMap['CardWindowDefinition'] = CardWindowDefinition;
