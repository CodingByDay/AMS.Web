﻿/**
* DevExpress Dashboard (map-legend.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapLegend = exports.WeightedLegend = exports.MapLegendBase = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const serializable_model_1 = require("../../serializable-model");
const _map_legend_1 = require("./metadata/_map-legend");
class MapLegendBase extends serializable_model_1.SerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
}
exports.MapLegendBase = MapLegendBase;
class WeightedLegend extends MapLegendBase {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return _map_legend_1.weightedLegendSerializationsInfo;
    }
}
exports.WeightedLegend = WeightedLegend;
class MapLegend extends MapLegendBase {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return _map_legend_1.mapLegendSerializationsInfo;
    }
}
exports.MapLegend = MapLegend;
