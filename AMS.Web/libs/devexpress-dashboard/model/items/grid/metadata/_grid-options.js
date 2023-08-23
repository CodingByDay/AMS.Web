﻿/**
* DevExpress Dashboard (_grid-options.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gridOptionsSerializationsInfo = exports.wordWrap = exports.showColumnHeaders = exports.showHorizontalLines = exports.showVerticalLines = exports.enableBandedRows = exports.columnWidthMode = exports.allowCellMerge = void 0;
const _base_metadata_1 = require("../../../metadata/_base-metadata");
exports.allowCellMerge = { propertyName: 'allowCellMerge', modelName: '@AllowGridCellMerge', displayName: 'DashboardWebStringId.Grid.MergeCells', defaultVal: false, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool, category: _base_metadata_1.PropertyCategory.ViewModel };
exports.columnWidthMode = {
    propertyName: 'columnWidthMode', modelName: '@ColumnWidthMode', displayName: 'DashboardWebStringId.Grid.ColumnWidthMode', defaultVal: 'AutoFitToGrid', simpleFormAdapterItem: 'listEditor', category: _base_metadata_1.PropertyCategory.ViewModel,
    values: {
        'AutoFitToContents': 'DashboardWebStringId.Grid.AutoFitToContentsColumnWidthMode',
        'AutoFitToGrid': 'DashboardWebStringId.Grid.AutoFitToGridColumnWidthMode',
        'Manual': 'DashboardWebStringId.Grid.ManualGridColumnWidthMode'
    }
};
exports.enableBandedRows = { propertyName: 'enableBandedRows', modelName: '@EnableBandedRows', displayName: 'DashboardWebStringId.Grid.BandedRows', defaultVal: false, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool, category: _base_metadata_1.PropertyCategory.ViewModel };
exports.showVerticalLines = { propertyName: 'showVerticalLines', modelName: '@ShowVerticalLines', displayName: 'DashboardWebStringId.Grid.VerticalLines', defaultVal: true, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool, category: _base_metadata_1.PropertyCategory.ViewModel };
exports.showHorizontalLines = { propertyName: 'showHorizontalLines', modelName: '@ShowHorizontalLines', displayName: 'DashboardWebStringId.Grid.HorizontalLines', defaultVal: true, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool, category: _base_metadata_1.PropertyCategory.ViewModel };
exports.showColumnHeaders = { propertyName: 'showColumnHeaders', modelName: '@ShowColumnHeaders', displayName: 'DashboardWebStringId.Grid.ColumnHeaders', defaultVal: true, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool, category: _base_metadata_1.PropertyCategory.ViewModel };
exports.wordWrap = { propertyName: 'wordWrap', modelName: '@WordWrap', displayName: 'DashboardWebStringId.Grid.WordWrap', defaultVal: false, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool, category: _base_metadata_1.PropertyCategory.ViewModel };
exports.gridOptionsSerializationsInfo = [exports.enableBandedRows, exports.showVerticalLines, exports.showHorizontalLines, exports.allowCellMerge, exports.showColumnHeaders, exports.columnWidthMode, exports.wordWrap];
