﻿/**
* DevExpress Dashboard (_pivot-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pivotDashboardItemSerializationsInfo = exports.layoutType = exports.columnTotalsPosition = exports.rowTotalsPosition = exports.valuesPosition = exports.showRowTotals = exports.showColumnTotals = exports.showRowGrandTotals = exports.showColumnGrandTotals = exports.autoExpandRowGroups = exports.autoExpandColumnGroups = exports.pivotValues = exports.pivotRows = exports.pivotColumns = void 0;
const _base_metadata_1 = require("../../../metadata/_base-metadata");
const _data_dashboard_item_1 = require("../../metadata/_data-dashboard-item");
const interactivity_options_1 = require("../../options/interactivity-options");
exports.pivotColumns = { propertyName: _base_metadata_1.columnsPropertyName, modelName: 'Columns', displayName: 'DashboardStringId.DescriptionColumns', array: true };
exports.pivotRows = { propertyName: _base_metadata_1.rowsPropertyName, modelName: 'Rows', displayName: 'DashboardStringId.DescriptionRows', array: true };
exports.pivotValues = { propertyName: _base_metadata_1.valuesPropertyName, modelName: 'Values', displayName: 'DashboardStringId.DescriptionValues', array: true };
exports.autoExpandColumnGroups = { propertyName: 'autoExpandColumnGroups', modelName: 'AutoExpandColumnGroups', displayName: 'DashboardWebStringId.PivotGrid.AutoExpandColumnGroups', defaultVal: false, simpleFormAdapterItem: 'yesNoButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.autoExpandRowGroups = { propertyName: 'autoExpandRowGroups', modelName: 'AutoExpandRowGroups', displayName: 'DashboardWebStringId.PivotGrid.AutoExpandRowGroups', defaultVal: false, simpleFormAdapterItem: 'yesNoButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.showColumnGrandTotals = { propertyName: 'showColumnGrandTotals', modelName: 'ShowColumnGrandTotals', displayName: 'DashboardWebStringId.PivotGrid.ColumnGrandTotals', defaultVal: true, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.showRowGrandTotals = { propertyName: 'showRowGrandTotals', modelName: 'ShowRowGrandTotals', displayName: 'DashboardWebStringId.PivotGrid.RowGrandTotals', defaultVal: true, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.showColumnTotals = { propertyName: 'showColumnTotals', modelName: 'ShowColumnTotals', displayName: 'DashboardWebStringId.PivotGrid.ColumnTotals', defaultVal: true, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.showRowTotals = { propertyName: 'showRowTotals', modelName: 'ShowRowTotals', displayName: 'DashboardWebStringId.PivotGrid.RowTotals', defaultVal: true, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.valuesPosition = {
    propertyName: 'valuesPosition', modelName: 'ValuesPosition', displayName: 'DashboardWebStringId.PivotGrid.ValuesPosition', defaultVal: 'Columns', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Columns': 'DashboardWebStringId.PivotGrid.ValuesPositionColumns',
        'Rows': 'DashboardWebStringId.PivotGrid.ValuesPositionRows'
    }
};
exports.rowTotalsPosition = {
    propertyName: 'rowTotalsPosition', modelName: 'RowTotalsPosition', displayName: 'DashboardWebStringId.PivotGrid.RowTotalsPosition', defaultVal: 'Bottom', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Bottom': 'DashboardWebStringId.PivotGrid.RowTotalsPositionBottom',
        'Top': 'DashboardWebStringId.PivotGrid.RowTotalsPositionTop'
    }
};
exports.columnTotalsPosition = {
    propertyName: 'columnTotalsPosition', modelName: 'ColumnTotalsPosition', displayName: 'DashboardWebStringId.PivotGrid.ColumnTotalsPosition', defaultVal: 'Far', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Far': 'DashboardWebStringId.PivotGrid.ColumnTotalsPositionFar',
        'Near': 'DashboardWebStringId.PivotGrid.ColumnTotalsPositionNear'
    }
};
exports.layoutType = {
    propertyName: 'layoutType', modelName: 'LayoutType', displayName: 'DashboardWebStringId.PivotGrid.LayoutType', defaultVal: 'Compact', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Compact': 'DashboardWebStringId.PivotGrid.LayoutTypeCompact',
        'Tabular': 'DashboardWebStringId.PivotGrid.LayoutTypeTabular'
    }
};
exports.pivotDashboardItemSerializationsInfo = _data_dashboard_item_1.dataDashboardItemSerializationsInfo.concat([exports.pivotColumns, exports.pivotRows, exports.pivotValues, exports.autoExpandColumnGroups, exports.autoExpandRowGroups, exports.showColumnGrandTotals, exports.showRowGrandTotals, exports.showColumnTotals, exports.showRowTotals, exports.valuesPosition, exports.rowTotalsPosition, exports.columnTotalsPosition, exports.layoutType, interactivity_options_1._baseInteractivityOptionsMeta]);
