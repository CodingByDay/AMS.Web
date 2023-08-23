﻿/**
* DevExpress Dashboard (_data-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataItemSerializationsInfo = exports.dataItemLinkSerializationsInfo = exports.showGrandTotals = exports.showTotals = exports.showValues = exports.percentOfTargetNumericFormat = exports.percentVariationNumericFormat = exports.absoluteVariationNumericFormat = exports.dateTimeFormat = exports.numericFormat = exports.dataItemDataMember = exports.uniqueName = exports.dataItem = void 0;
const _base_metadata_1 = require("../../metadata/_base-metadata");
const data_item_format_1 = require("../data-item-format");
exports.dataItem = { propertyName: 'dataItem', displayName: 'DashboardWebStringId.DataItem' };
exports.uniqueName = { propertyName: 'uniqueName', modelName: '@DefaultId' };
exports.dataItemDataMember = { propertyName: 'dataMember', modelName: '@DataMember' };
exports.numericFormat = { propertyName: 'numericFormat', modelName: 'NumericFormat', displayName: 'DashboardWebStringId.TextBoxFormatText', type: data_item_format_1.DataItemNumericFormat };
exports.dateTimeFormat = { propertyName: 'dateTimeFormat', modelName: 'DateTimeFormat', displayName: 'DashboardWebStringId.TextBoxFormatText', type: data_item_format_1.DataItemDateTimeFormat };
exports.absoluteVariationNumericFormat = { propertyName: 'absoluteVariationNumericFormat', modelName: 'AbsoluteVariationNumericFormat', type: data_item_format_1.AbsoluteVariationNumericFormat };
exports.percentVariationNumericFormat = { propertyName: 'percentVariationNumericFormat', modelName: 'PercentVariationNumericFormat', type: data_item_format_1.PercentVariationNumericFormat };
exports.percentOfTargetNumericFormat = { propertyName: 'percentOfTargetNumericFormat', modelName: 'PercentOfTargetNumericFormat', type: data_item_format_1.PercentOfTargetNumericFormat };
exports.showValues = { propertyName: 'showValues', modelName: '@ShowValues', displayName: 'DashboardWebStringId.DataItem.ShowValues', defaultVal: true, simpleFormAdapterItem: 'yesNoButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.showTotals = { propertyName: 'showTotals', modelName: '@ShowTotals', displayName: 'DashboardWebStringId.DataItem.ShowTotals', defaultVal: true, simpleFormAdapterItem: 'yesNoButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.showGrandTotals = { propertyName: 'showGrandTotals', modelName: '@ShowGrandTotals', displayName: 'DashboardWebStringId.DataItem.ShowGrandTotals', defaultVal: true, simpleFormAdapterItem: 'yesNoButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.dataItemLinkSerializationsInfo = [_base_metadata_1.itemType, exports.uniqueName, exports.dataItem];
exports.dataItemSerializationsInfo = [_base_metadata_1.itemType, exports.dataItemDataMember, _base_metadata_1.name, exports.uniqueName, exports.numericFormat, exports.dateTimeFormat, exports.showValues, exports.showTotals, exports.showGrandTotals];
