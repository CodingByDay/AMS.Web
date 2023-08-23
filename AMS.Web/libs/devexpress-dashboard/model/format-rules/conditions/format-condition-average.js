﻿/**
* DevExpress Dashboard (format-condition-average.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatConditionAverage = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const format_condition_style_base_1 = require("./format-condition-style-base");
const _format_condition_average_1 = require("./metadata/_format-condition-average");
class FormatConditionAverage extends format_condition_style_base_1.FormatConditionStyleBase {
    constructor(modelJson, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.getSpecificType = () => this.averageType();
        this.setSpecificType = (type) => {
            this.averageType(type);
        };
    }
    _getInfoButStyleSettings() {
        return _format_condition_average_1.formatConditionAverageSerializationsInfo;
    }
}
exports.FormatConditionAverage = FormatConditionAverage;
