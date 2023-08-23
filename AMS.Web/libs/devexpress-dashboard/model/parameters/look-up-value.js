﻿/**
* DevExpress Dashboard (look-up-value.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LookUpValue = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const _date_utils_1 = require("../internal/_date-utils");
const serializable_model_1 = require("../serializable-model");
const _parameters_helper_1 = require("./_parameters-helper");
class LookUpValue extends serializable_model_1.TypedSerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.valueType = ko.observable('');
        this.value(_date_utils_1.tryConvertToDateTime(this.value()));
    }
    getInfo() {
        return _parameters_helper_1.ParameterHelper.getInfoPerType(this.valueType);
    }
    _getDefaultItemType() {
        return 'Value';
    }
}
exports.LookUpValue = LookUpValue;
