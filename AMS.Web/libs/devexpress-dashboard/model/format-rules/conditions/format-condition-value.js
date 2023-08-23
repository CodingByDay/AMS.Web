﻿/**
* DevExpress Dashboard (format-condition-value.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatConditionValue = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const _parameters_helper_1 = require("../../parameters/_parameters-helper");
const _format_rules_common_1 = require("../metadata/_format-rules-common");
const format_condition_style_base_1 = require("./format-condition-style-base");
const _format_condition_value_1 = require("./metadata/_format-condition-value");
class FormatConditionValue extends format_condition_style_base_1.FormatConditionStyleBase {
    constructor(modelJson, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.getSpecificType = () => this.condition();
        this.setSpecificType = (type) => {
            this.condition(type);
            if (!this.value1.type()) {
                this.value1.type(_format_rules_common_1.fieldTypes[this.dataType()]);
                var defaultValue = _parameters_helper_1.ParameterHelper.convertSingleValue(null, this.value1.type());
                if (this.value1.type() === 'System.String' && defaultValue === undefined) {
                    defaultValue = '';
                }
                this.value1.value(defaultValue);
            }
            if (type.toLowerCase().indexOf('between') !== -1) {
                if (!this.value2.type()) {
                    this.value2.value(this.value1.value());
                    this.value2.type(this.value1.type());
                }
            }
            else {
                this.value2.type(null);
            }
        };
    }
    _getInfoButStyleSettings() {
        return _format_condition_value_1.formatConditionValueSerializationsInfo;
    }
}
exports.FormatConditionValue = FormatConditionValue;
