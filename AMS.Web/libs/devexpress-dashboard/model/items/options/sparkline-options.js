﻿/**
* DevExpress Dashboard (sparkline-options.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SparklineOptions = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const serializable_model_1 = require("../../serializable-model");
const _sparkline_options_1 = require("./metadata/_sparkline-options");
class SparklineOptions extends serializable_model_1.SerializableModel {
    constructor(JSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(JSON, serializer);
    }
    getInfo() {
        return _sparkline_options_1.sparklineOptionsSerializationsInfo;
    }
}
exports.SparklineOptions = SparklineOptions;
