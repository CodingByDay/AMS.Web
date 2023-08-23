/**
* DevExpress Dashboard (_card-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardDashboardItemSerializationsInfo = exports.cardSparklineArgument = exports.cards = void 0;
const _data_item_1 = require("../../../data-item/metadata/_data-item");
const _base_metadata_1 = require("../../../metadata/_base-metadata");
const _kpi_item_1 = require("../../kpi/metadata/_kpi-item");
exports.cards = { propertyName: 'cards', modelName: 'Cards', displayName: 'DashboardStringId.DefaultNameCardItem', array: true };
exports.cardSparklineArgument = { propertyName: _base_metadata_1.sparklineArgumentPropertyName, modelName: 'SparklineArgument', displayName: 'DashboardStringId.CardCalculationAlongSparklineArgument', info: _data_item_1.dataItemLinkSerializationsInfo };
exports.cardDashboardItemSerializationsInfo = _kpi_item_1.kpiDashboardItemSerializationsInfo.concat([exports.cards, exports.cardSparklineArgument]);
