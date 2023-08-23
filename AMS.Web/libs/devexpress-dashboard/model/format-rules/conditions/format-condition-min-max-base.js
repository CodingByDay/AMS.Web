﻿/**
* DevExpress Dashboard (format-condition-min-max-base.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatConditionMinMaxBase = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const format_condition_style_base_1 = require("./format-condition-style-base");
const _format_condition_min_max_base_1 = require("./metadata/_format-condition-min-max-base");
class FormatConditionMinMaxBase extends format_condition_style_base_1.FormatConditionStyleBase {
    constructor(modelJson, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    _getInfoButStyleSettings() {
        return _format_condition_min_max_base_1.formatConditionMinMaxBaseSerializationsInfo;
    }
}
exports.FormatConditionMinMaxBase = FormatConditionMinMaxBase;
