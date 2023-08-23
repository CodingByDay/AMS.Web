﻿/**
* DevExpress Dashboard (_chart-data-controller.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chartDataController = void 0;
const _localization_ids_1 = require("../_localization-ids");
const _localizer_1 = require("../_localizer");
const _chart_data_controller_proto_1 = require("./_chart-data-controller-proto");
class chartDataController extends _chart_data_controller_proto_1.chartDataControllerProto {
    getArgumentBindingValue(argumentPoint, pointIndex) {
        if (this.isQualitativeArgument() || this.isDiscreteArgument()) {
            if (argumentPoint.getParent() != null) {
                return pointIndex.toString();
            }
            else {
                return _localizer_1.localizer.getString(_localization_ids_1.localizationId.ChartTotalValue);
            }
        }
        return argumentPoint.getValue();
    }
}
exports.chartDataController = chartDataController;
