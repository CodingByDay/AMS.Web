﻿/**
* DevExpress Dashboard (_color-scheme-entry.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dimensionKeySerializationInfo = exports.colorShemeValue = exports.definition = exports.valueInfo = exports.dimensionValue = exports.colorShemetype = exports.colorSchemeEntrySerializationInfo = exports.measureKey = exports.dimensionKeys = exports.measureKeySerializationInfo = exports.definitionsInMeasureDefinition = exports.definitionInfo = exports.dimensionInfoDateTimeGroupInterval = exports.colorSchemeSummaryType = exports.paletteIndex = exports.colorSchemeColor = exports.colorSchemeDataMember = exports.colorSchemeDataSource = void 0;
const color_1 = require("../../color");
const _measure_1 = require("../../data-item/metadata/_measure");
const _base_metadata_1 = require("../../metadata/_base-metadata");
exports.colorSchemeDataSource = { propertyName: 'dataSource', modelName: '@DataSource', displayName: 'DevExpress.DashboardCommon.DynamicListLookUpSettings.DataSource', defaultVal: '', simpleFormAdapterItem: 'textBoxEditor' };
exports.colorSchemeDataMember = { propertyName: 'dataMember', modelName: '@DataMember', displayName: 'DashboardStringId.DataSourceDataMember', defaultVal: '', simpleFormAdapterItem: 'textBoxEditor' };
exports.colorSchemeColor = { propertyName: 'color', modelName: '@Color', displayName: 'DashboardStringId.DescriptionItemColor', defaultVal: null, simpleFormAdapterItem: 'textBoxEditor', from: color_1.Color._colorFromModel, toJsonObject: color_1.Color._colorToModel };
exports.paletteIndex = { propertyName: 'paletteIndex', modelName: '@PaletteIndex', displayName: 'DashboardStringId.ColorPaletteIndex', defaultVal: null, simpleFormAdapterItem: 'numberBoxEditor' };
exports.colorSchemeSummaryType = { propertyName: 'summaryType', modelName: '@SummaryType', displayName: 'DashboardWebStringId.SummaryType', defaultVal: 'Sum', simpleFormAdapterItem: 'textBoxEditor' };
exports.dimensionInfoDateTimeGroupInterval = { propertyName: 'dateTimeGroupInterval', modelName: '@DateTimeGroupInterval', displayName: 'DashboardWebStringId.Colorization.GroupInterval', defaultVal: 'Year', simpleFormAdapterItem: 'textBoxEditor' };
exports.definitionInfo = [exports.colorSchemeDataMember, exports.dimensionInfoDateTimeGroupInterval];
exports.definitionsInMeasureDefinition = { propertyName: 'definitions', modelName: 'Definitions', array: true };
exports.measureKeySerializationInfo = [exports.colorSchemeDataMember, exports.colorSchemeSummaryType, _measure_1.calculation, _measure_1.windowDefinition, _measure_1.expression, _measure_1.measureFilterString, exports.definitionsInMeasureDefinition];
exports.dimensionKeys = { propertyName: 'dimensionKeys', modelName: 'DimensionKeys', displayName: 'DashboardStringId.DescriptionDimensions', array: true };
exports.measureKey = { propertyName: 'measureKeys', modelName: 'MeasureKey', displayName: 'DashboardStringId.DescriptionMeasures', array: true, info: exports.measureKeySerializationInfo };
exports.colorSchemeEntrySerializationInfo = [_base_metadata_1.itemType, exports.colorSchemeDataSource, exports.colorSchemeDataMember, exports.colorSchemeColor, exports.paletteIndex, exports.dimensionKeys, exports.measureKey];
exports.colorShemetype = { propertyName: 'type', modelName: '@Type', displayName: 'DashboardWebStringId.Type', simpleFormAdapterItem: 'textBoxEditor' };
exports.dimensionValue = { propertyName: 'value', modelName: '@Value', displayName: 'DashboardStringId.ValueCaption', simpleFormAdapterItem: 'textBoxEditor' };
exports.valueInfo = [exports.colorShemetype, exports.dimensionValue];
exports.definition = { propertyName: 'definition', modelName: 'Definition', info: exports.definitionInfo, defaultVal: '' };
exports.colorShemeValue = { propertyName: 'value', modelName: 'Value', displayName: 'DashboardStringId.ValueCaption', info: exports.valueInfo };
exports.dimensionKeySerializationInfo = [exports.definition, exports.colorShemeValue];
