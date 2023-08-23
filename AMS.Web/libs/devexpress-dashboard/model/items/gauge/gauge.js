﻿/**
* DevExpress Dashboard (gauge.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gauge = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const kpi_element_1 = require("../kpi/kpi-element");
const _gauge_1 = require("./metadata/_gauge");
class Gauge extends kpi_element_1.KpiElement {
    constructor(dataItemProvider, modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dataItemProvider, modelJson, serializer);
        this.__targetValue._specifics.skipFormatting = true;
    }
    _getInfoCore() {
        return _gauge_1.gaugeSerializationsInfo;
    }
    _getDefaultItemType() { return 'Gauge'; }
}
exports.Gauge = Gauge;
