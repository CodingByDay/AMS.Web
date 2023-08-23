﻿/**
* DevExpress Dashboard (_bubble-map-data-controller.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bubbleMapDataController = void 0;
const _jquery_helpers_1 = require("../_jquery-helpers");
const _geo_point_map_data_controller_base_1 = require("./_geo-point-map-data-controller-base");
class bubbleMapDataController extends _geo_point_map_data_controller_base_1.geoPointMapDataControllerBase {
    constructor(options) {
        super(options);
    }
    getPoint(index) {
        return _jquery_helpers_1.deepExtend(super.getPoint(index), {
            weight: this._getMeasureValue(index, this.viewModel.WeightId),
            color: this._getMeasureValue(index, this.viewModel.ColorId),
            weightText: this._getMeasureDisplayText(index, this.viewModel.WeightId),
            colorText: this._getMeasureDisplayText(index, this.viewModel.ColorId)
        });
    }
    formatColor(value) {
        var measure = this.multiData.getMeasureById(this.viewModel.ColorId);
        return measure ? measure.format(value) : value;
    }
    formatWeight(value) {
        var measure = this.multiData.getMeasureById(this.viewModel.WeightId);
        return measure ? measure.format(value) : value;
    }
}
exports.bubbleMapDataController = bubbleMapDataController;
