﻿/**
* DevExpress Dashboard (data-source.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSource = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const serializable_model_1 = require("../serializable-model");
const calculated_field_1 = require("./calculated-field");
class DataSource extends serializable_model_1.TypedSerializableModel {
    constructor(dataSourceJSON = {}, serializer) {
        super(dataSourceJSON, serializer);
        this.hasCalculatedFields = false;
        this.supportDataMembers = false;
        this.hasFilter = false;
        this.calculatedFields = analytics_utils_1.deserializeArray(dataSourceJSON.CalculatedFields, (item) => new calculated_field_1.CalculatedField(item, serializer));
    }
    getJson() {
        return new analytics_utils_1.ModelSerializer({ useRefs: false }).serialize(this);
    }
    getUniqueNamePrefix() {
        return super._getUniqueNamePrefix();
    }
}
exports.DataSource = DataSource;
