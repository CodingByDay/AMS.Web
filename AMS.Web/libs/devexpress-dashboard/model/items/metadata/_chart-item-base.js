﻿/**
* DevExpress Dashboard (_chart-item-base.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chartItemBaseSerializationsInfo = exports.chartArgumentsMeta = void 0;
const _base_metadata_1 = require("../../metadata/_base-metadata");
const _coloring_options_1 = require("../options/metadata/_coloring-options");
const _series_item_1 = require("./_series-item");
exports.chartArgumentsMeta = { propertyName: _base_metadata_1.argumentsPropertyName, modelName: 'Arguments', displayName: 'DashboardStringId.ChartCalculationAlongArguments', array: true };
exports.chartItemBaseSerializationsInfo = _series_item_1.seriesDashboardItemSerializationsInfo.concat([exports.chartArgumentsMeta, _coloring_options_1.coloringOptions]);
