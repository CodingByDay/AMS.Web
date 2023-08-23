﻿/**
* DevExpress Dashboard (format-rules-common.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplexValue = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const _parameters_helper_1 = require("../parameters/_parameters-helper");
const serializable_model_1 = require("../serializable-model");
const _format_rules_common_1 = require("./metadata/_format-rules-common");
class ComplexValue extends serializable_model_1.SerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        if (!this.isEmpty() && !this.isInfinity) {
            this._persistedValue(_parameters_helper_1.ParameterHelper.convertSingleValue(this._persistedValue(), this.type()));
        }
        this.value = ko.pureComputed({
            read: () => this._persistedValue(),
            write: (val) => {
                if (val === _format_rules_common_1.negativeInfinity) {
                    this.type('System.Double');
                }
                this._persistedValue(val);
            }
        });
    }
    isEmpty() {
        return !this._persistedValue || !this.type || !this.type();
    }
    get isInfinity() {
        return this._persistedValue() == _format_rules_common_1.negativeInfinity;
    }
    getInfo() {
        return _format_rules_common_1.complexValueInfo;
    }
    setValue(value, type) {
        this.value(value);
        this.type(type);
    }
}
exports.ComplexValue = ComplexValue;
