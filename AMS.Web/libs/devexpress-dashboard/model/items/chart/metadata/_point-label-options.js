﻿/**
* DevExpress Dashboard (_point-label-options.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointLabelOptionsSerializationsInfo = exports.contentType = exports.position = exports.showForZeroValues = exports.pointLabelOptionsBaseSerializationsInfo = exports.overlappingMode = exports.pointLabelOrientation = exports.showPointLabels = void 0;
const ko = require("knockout");
const enums_1 = require("../../../enums");
const _base_metadata_1 = require("../../../metadata/_base-metadata");
exports.showPointLabels = { propertyName: 'showPointLabels', modelName: '@Visible', displayName: 'DashboardWebStringId.Chart.ShowPointLablels', defaultVal: false, simpleFormAdapterItem: 'yesNoButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.pointLabelOrientation = {
    propertyName: 'orientation', modelName: '@Orientation', displayName: 'DashboardWebStringId.Chart.Orientation', defaultVal: 'Default', simpleFormAdapterItem: 'listEditor',
    values: {
        'Default': 'DashboardWebStringId.Chart.Orientation.Default',
        'RotateRight': 'DashboardWebStringId.Chart.Orientation.RotateRight',
        'RotateLeft': 'DashboardWebStringId.Chart.Orientation.RotateLeft'
    }
};
exports.overlappingMode = {
    propertyName: 'overlappingMode', modelName: '@OverlappingMode', displayName: 'DashboardWebStringId.Chart.OverlappingMode', defaultVal: 'Hide', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Hide': 'DashboardWebStringId.Chart.OverlappingMode.Hide',
        'None': 'DashboardWebStringId.Chart.OverlappingMode.None'
    }
};
exports.pointLabelOptionsBaseSerializationsInfo = [exports.showPointLabels, exports.pointLabelOrientation, exports.overlappingMode];
exports.showForZeroValues = { propertyName: 'showForZeroValues', modelName: '@ShowForZeroValues', displayName: 'DashboardWebStringId.Chart.ShowZeroValues', defaultVal: false, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.position = {
    propertyName: 'position', modelName: '@Position', displayName: 'DashboardWebStringId.Chart.Position', defaultVal: 'Outside', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Outside': 'DashboardWebStringId.Chart.Position.Outside',
        'Inside': 'DashboardWebStringId.Chart.Position.Inside'
    }
};
exports.contentType = {
    propertyName: 'contentType', modelName: '@ContentType', displayName: 'DashboardWebStringId.Chart.Content', defaultVal: 'None',
    from: st => ko.observable(enums_1.parsePointLabelContentType(st)), toJsonObject: enums_1.serializePointLabelContentType
};
exports.pointLabelOptionsSerializationsInfo = exports.pointLabelOptionsBaseSerializationsInfo.concat([exports.showForZeroValues, exports.position, exports.contentType]);
