﻿/**
* DevExpress Dashboard (scatter-point-label-options.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScatterPointLabelOptions = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const point_label_options_1 = require("../chart/point-label-options");
const _scatter_point_label_options_1 = require("./metadata/_scatter-point-label-options");
class ScatterPointLabelOptions extends point_label_options_1.PointLabelOptionsBase {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return _scatter_point_label_options_1.scatterPointLabelOptionsSerializationsInfo;
    }
}
exports.ScatterPointLabelOptions = ScatterPointLabelOptions;
