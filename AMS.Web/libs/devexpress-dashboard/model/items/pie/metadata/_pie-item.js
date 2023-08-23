﻿/**
* DevExpress Dashboard (_pie-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pieDashboardItemSerializationsInfo = exports.labelPosition = exports.showPieCaptions = exports.pieType = exports.tooltipContentType = exports.labelContentType = exports.pieValues = void 0;
const _base_metadata_1 = require("../../../metadata/_base-metadata");
const _chart_item_base_1 = require("../../metadata/_chart-item-base");
const interactivity_options_1 = require("../../options/interactivity-options");
exports.pieValues = { propertyName: _base_metadata_1.valuesPropertyName, modelName: 'Values', displayName: 'DashboardWebStringId.Binding.Values', array: true };
exports.labelContentType = {
    propertyName: 'labelContentType', modelName: '@LabelContentType', displayName: 'DashboardWebStringId.Chart.LabelContent', defaultVal: 'ArgumentAndPercent', simpleFormAdapterItem: 'listEditor',
    values: {
        'None': 'DashboardWebStringId.Pie.LabelContentType.None',
        'Argument': 'DashboardWebStringId.Pie.LabelContentType.Argument',
        'Percent': 'DashboardWebStringId.Pie.LabelContentType.Percent',
        'ArgumentAndPercent': 'DashboardWebStringId.Pie.LabelContentType.ArgumentAndPercent',
        'Value': 'DashboardWebStringId.Pie.LabelContentType.Value',
        'ArgumentAndValue': 'DashboardWebStringId.Pie.LabelContentType.ArgumentAndValue',
        'ValueAndPercent': 'DashboardWebStringId.Pie.LabelContentType.ValueAndPercent',
        'ArgumentValueAndPercent': 'DashboardWebStringId.Pie.LabelContentType.ArgumentValueAndPercent'
    }
};
exports.tooltipContentType = {
    propertyName: 'tooltipContentType', modelName: '@TooltipContentType', displayName: 'DashboardWebStringId.Chart.TooltipContent', defaultVal: 'ArgumentValueAndPercent', simpleFormAdapterItem: 'listEditor',
    values: {
        'None': 'DashboardWebStringId.Pie.LabelContentType.None',
        'Argument': 'DashboardWebStringId.Pie.LabelContentType.Argument',
        'Percent': 'DashboardWebStringId.Pie.LabelContentType.Percent',
        'ArgumentAndPercent': 'DashboardWebStringId.Pie.LabelContentType.ArgumentAndPercent',
        'Value': 'DashboardWebStringId.Pie.LabelContentType.Value',
        'ArgumentAndValue': 'DashboardWebStringId.Pie.LabelContentType.ArgumentAndValue',
        'ValueAndPercent': 'DashboardWebStringId.Pie.LabelContentType.ValueAndPercent',
        'ArgumentValueAndPercent': 'DashboardWebStringId.Pie.LabelContentType.ArgumentValueAndPercent'
    }
};
exports.pieType = {
    propertyName: 'pieType', modelName: '@PieType', displayName: 'DashboardWebStringId.Pie.Type', defaultVal: 'Pie',
    valuesArray: [
        { value: 'Pie', displayValue: 'DashboardWebStringId.Pie' },
        { value: 'Donut', displayValue: 'DashboardWebStringId.Pie.Donut' }
    ]
};
exports.showPieCaptions = { propertyName: 'showPieCaptions', modelName: '@ShowPieCaptions', displayName: 'DashboardWebStringId.Pie.ShowCaptions', defaultVal: true, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.labelPosition = {
    propertyName: 'labelPosition', modelName: '@LabelPosition', displayName: 'DashboardWebStringId.Pie.LabelPosition', defaultVal: 'Outside', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Outside': 'DashboardWebStringId.Pie.LabelPositionOutside',
        'Inside': 'DashboardWebStringId.Pie.LabelPositionInside'
    }
};
exports.pieDashboardItemSerializationsInfo = _chart_item_base_1.chartItemBaseSerializationsInfo.concat([exports.pieValues, exports.labelContentType, exports.tooltipContentType, exports.pieType, _base_metadata_1.contentArrangementMode, _base_metadata_1.contentLineCount, exports.showPieCaptions, interactivity_options_1._chartItemInteractivityOptionsMeta, exports.labelPosition]);
