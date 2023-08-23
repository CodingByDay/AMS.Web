﻿/**
* DevExpress Dashboard (format-condition-range-set.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatConditionRangeSet = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const format_condition_range_base_1 = require("./format-condition-range-base");
const _format_condition_range_set_1 = require("./metadata/_format-condition-range-set");
const range_generator_1 = require("./range-generator");
class FormatConditionRangeSet extends format_condition_range_base_1.FormatConditionRangeBase {
    constructor(modelJson, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return _format_condition_range_set_1.formatConditionRangeSetSerializationsInfo;
    }
    getActualPredefinedType() {
        return range_generator_1.FormatConditionRangeGenerator.getPredefinedType(this.actualStyles, type => {
            var c = new FormatConditionRangeSet();
            range_generator_1.FormatConditionRangeGenerator.generateRangeSet(c, type);
            return c;
        });
    }
    setActualPredefinedType(type) {
        range_generator_1.FormatConditionRangeGenerator.generateRangeSet(this, type);
    }
}
exports.FormatConditionRangeSet = FormatConditionRangeSet;
