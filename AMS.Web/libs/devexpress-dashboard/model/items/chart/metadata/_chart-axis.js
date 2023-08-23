﻿/**
* DevExpress Dashboard (_chart-axis.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scatterChartAxisYSerializationsInfo = exports.chartSecondaryAxisYSerializationsInfo = exports.chartAxisYSerializationsInfo = exports.chartAxisYBaseSerializationsInfo = exports.logarithmicBase = exports.logarithmic = exports.showGridLinesBaseInfo = exports.alwaysShowZeroLevelScatter = exports.chartAlwaysShowZeroLevel = exports.alwaysShowZeroLevelTemplate = exports.chartAxisXSerializationsInfo = exports.visiblePointsCount = exports.limitVisiblePoints = exports.enableZooming = exports.chartAxisSerializationsInfo = exports.title = exports.titleVisibleBaseInfo = exports.axisVisible = exports.reverse = void 0;
const _data_item_1 = require("../../../data-item/metadata/_data-item");
const _base_metadata_1 = require("../../../metadata/_base-metadata");
exports.reverse = { propertyName: 'reverse', modelName: '@Reverse', displayName: 'DashboardWebStringId.Chart.Reverse', defaultVal: false, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.axisVisible = { propertyName: 'visible', modelName: '@Visible', displayName: 'DashboardWebStringId.Chart.Visible', defaultVal: true, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.titleVisibleBaseInfo = { propertyName: 'titleVisible', modelName: '@TitleVisible', displayName: 'DashboardWebStringId.Chart.Title', simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
function getInfoTitleVisible(defaultVal) { return Object.assign({ defaultVal: defaultVal }, exports.titleVisibleBaseInfo); }
exports.title = { propertyName: 'title', modelName: '@Title', displayName: 'DashboardWebStringId.Chart.TitleText', simpleFormAdapterItem: 'textBoxEditor' };
exports.chartAxisSerializationsInfo = [exports.axisVisible, exports.reverse, exports.title, _data_item_1.numericFormat];
exports.enableZooming = { propertyName: 'enableZooming', modelName: '@EnableZooming', displayName: 'DashboardWebStringId.Chart.EnableZooming', defaultVal: false, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.limitVisiblePoints = { propertyName: 'limitVisiblePoints', modelName: '@LimitVisiblePoints', displayName: 'DashboardWebStringId.Chart.LimitVisiblePoints', defaultVal: false, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.visiblePointsCount = { propertyName: 'visiblePointsCount', modelName: '@VisiblePointsCount', displayName: 'DashboardWebStringId.Chart.VisiblePointsCount', defaultVal: 10, simpleFormAdapterItem: 'numberBoxEditor', from: _base_metadata_1.floatFromModel, validationRules: [{ type: 'range', min: 1, message: 'DashboardStringId.NumberRangeValidationMessage' }, _base_metadata_1.integerValidationRule] };
exports.chartAxisXSerializationsInfo = exports.chartAxisSerializationsInfo.concat([getInfoTitleVisible(false), exports.enableZooming, exports.limitVisiblePoints, exports.visiblePointsCount, _data_item_1.dateTimeFormat]);
exports.alwaysShowZeroLevelTemplate = { propertyName: 'alwaysShowZeroLevel', modelName: '@AlwaysShowZeroLevel', displayName: 'DashboardWebStringId.Chart.AlwaysShowZeroLevel', simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.chartAlwaysShowZeroLevel = Object.assign({ defaultVal: true }, exports.alwaysShowZeroLevelTemplate);
exports.alwaysShowZeroLevelScatter = Object.assign({ defaultVal: false }, exports.alwaysShowZeroLevelTemplate);
exports.showGridLinesBaseInfo = { propertyName: 'showGridLines', modelName: '@ShowGridLines', displayName: 'DashboardWebStringId.Chart.GridLines', simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
function getInfoShowGridLines(defaultVal) { return Object.assign({ defaultVal: defaultVal }, exports.showGridLinesBaseInfo); }
exports.logarithmic = { propertyName: 'logarithmic', modelName: '@Logarithmic', displayName: 'DashboardWebStringId.Chart.LogarithmicScale', defaultVal: false, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.logarithmicBase = {
    propertyName: 'logarithmicBase', modelName: '@LogarithmicBase', displayName: 'DashboardWebStringId.Chart.LogarithmicScaleBase', defaultVal: 'Base10', simpleFormAdapterItem: 'selectBoxEditor',
    values: {
        'Base2': 'DashboardWebStringId.Chart.LogarithmicScaleBase2',
        'Base5': 'DashboardWebStringId.Chart.LogarithmicScaleBase5',
        'Base10': 'DashboardWebStringId.Chart.LogarithmicScaleBase10'
    }
};
exports.chartAxisYBaseSerializationsInfo = exports.chartAxisSerializationsInfo.concat([exports.logarithmic, exports.logarithmicBase]);
exports.chartAxisYSerializationsInfo = exports.chartAxisYBaseSerializationsInfo.concat([exports.chartAlwaysShowZeroLevel, getInfoTitleVisible(true), getInfoShowGridLines(true)]);
exports.chartSecondaryAxisYSerializationsInfo = exports.chartAxisYBaseSerializationsInfo.concat([exports.chartAlwaysShowZeroLevel, getInfoTitleVisible(true), getInfoShowGridLines(false)]);
exports.scatterChartAxisYSerializationsInfo = exports.chartAxisYBaseSerializationsInfo.concat([exports.alwaysShowZeroLevelScatter, getInfoTitleVisible(true), getInfoShowGridLines(true)]);
