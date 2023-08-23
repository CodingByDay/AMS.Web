﻿/**
* DevExpress Dashboard (format-condition-base.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatConditionBase = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const serializable_model_1 = require("../../serializable-model");
const _format_condition_base_1 = require("./metadata/_format-condition-base");
class FormatConditionBase extends serializable_model_1.SerializableModel {
    constructor(modelJson, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson || {}, serializer);
        this.dataType = ko.observable();
        this.dateTimeGroupInterval = ko.observable();
        this._empty = true;
        this.isEmpty = ko.observable();
        this.isEmpty(!modelJson);
    }
    get _isApplyToRowColumnRestricted() { return false; }
    getInfo() {
        return _format_condition_base_1.formatConditionBaseSerializationsInfo;
    }
    isValid() {
        return true;
    }
    isRange() {
        return false;
    }
    isGradient() {
        return false;
    }
    init() {
        this.isEmpty(false);
    }
}
exports.FormatConditionBase = FormatConditionBase;
