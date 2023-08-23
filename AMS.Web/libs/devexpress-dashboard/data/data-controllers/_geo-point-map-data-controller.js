﻿/**
* DevExpress Dashboard (_geo-point-map-data-controller.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geoPointMapDataController = void 0;
const _jquery_helpers_1 = require("../_jquery-helpers");
const _geo_point_map_data_controller_base_1 = require("./_geo-point-map-data-controller-base");
class geoPointMapDataController extends _geo_point_map_data_controller_base_1.geoPointMapDataControllerBase {
    constructor(options) {
        super(options);
    }
    getPoint(index) {
        return _jquery_helpers_1.deepExtend(super.getPoint(index), {
            text: this._getMeasureDisplayText(index, this.viewModel.ValueId)
        });
    }
}
exports.geoPointMapDataController = geoPointMapDataController;
