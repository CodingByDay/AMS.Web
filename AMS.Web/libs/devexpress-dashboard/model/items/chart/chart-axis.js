﻿/**
* DevExpress Dashboard (chart-axis.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartSecondaryAxisY = exports.ScatterChartAxisY = exports.ChartAxisY = exports.ChartAxisX = exports.ChartAxis = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const serializable_model_1 = require("../../serializable-model");
const _chart_axis_1 = require("./metadata/_chart-axis");
class ChartAxis extends serializable_model_1.SerializableModel {
    constructor(JSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(JSON, serializer);
    }
    getInfo() {
        return _chart_axis_1.chartAxisSerializationsInfo;
    }
}
exports.ChartAxis = ChartAxis;
class ChartAxisX extends ChartAxis {
    constructor(JSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(JSON, serializer);
    }
    getInfo() {
        return _chart_axis_1.chartAxisXSerializationsInfo;
    }
}
exports.ChartAxisX = ChartAxisX;
class ChartAxisY extends ChartAxis {
    constructor(JSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(JSON, serializer);
    }
    getInfo() {
        return _chart_axis_1.chartAxisYSerializationsInfo;
    }
}
exports.ChartAxisY = ChartAxisY;
class ScatterChartAxisY extends ChartAxisY {
    constructor(JSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(JSON, serializer);
    }
    getInfo() {
        return _chart_axis_1.scatterChartAxisYSerializationsInfo;
    }
}
exports.ScatterChartAxisY = ScatterChartAxisY;
class ChartSecondaryAxisY extends ChartAxisY {
    constructor(JSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(JSON, serializer);
    }
    getInfo() {
        return _chart_axis_1.chartSecondaryAxisYSerializationsInfo;
    }
}
exports.ChartSecondaryAxisY = ChartSecondaryAxisY;
