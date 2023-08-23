﻿/**
* DevExpress Dashboard (_card.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardSerializationsInfo = exports.layoutTemplate = exports.showSparkline = exports.cardSparklineOptions = exports.cardDeltaOptions = void 0;
const _base_metadata_1 = require("../../../metadata/_base-metadata");
const _kpi_element_1 = require("../../kpi/metadata/_kpi-element");
const delta_options_1 = require("../../options/delta-options");
const sparkline_options_1 = require("../../options/sparkline-options");
exports.cardDeltaOptions = { propertyName: 'cardDeltaOptions', modelName: 'CardDeltaOptions', displayName: 'DashboardWebStringId.Grid.DeltaOptions', type: delta_options_1.CardDeltaOptions };
exports.cardSparklineOptions = { propertyName: 'sparklineOptions', modelName: 'SparklineOptions', displayName: 'DashboardWebStringId.Card.SparklineOptions', type: sparkline_options_1.SparklineOptions };
exports.showSparkline = { propertyName: 'showSparkline', modelName: '@ShowStartEndValues', displayName: 'DashboardWebStringId.Card.SparklineVisible', defaultVal: true, simpleFormAdapterItem: 'yesNoButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.layoutTemplate = { propertyName: 'layoutTemplate', modelName: 'LayoutTemplate' };
exports.cardSerializationsInfo = _kpi_element_1.kpiElementSerializationsInfo.concat([exports.cardDeltaOptions, exports.cardSparklineOptions, exports.showSparkline, exports.layoutTemplate]);
