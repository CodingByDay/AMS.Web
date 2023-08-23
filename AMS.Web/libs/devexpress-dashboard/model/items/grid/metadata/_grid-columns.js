﻿/**
* DevExpress Dashboard (_grid-columns.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gridHyperlinkColumnSerializationsInfo = exports.gridColumnUriPattern = exports.uriPatternValidationRules = exports.gridValidateUriPattern = exports.validateGridUriPattern = exports.checkGridUriPattern = exports.displayValue = exports.uri = exports.gridSparklineColumnSerializationsInfo = exports.sparklineOptions = exports.sparkline = exports.showStartEndValues = exports.gridDeltaColumnSerializationsInfo = exports.gridColumnTargetValue = exports.gridColumnActualValue = exports.gridColumnDeltaOptions = exports.gridMeasureColumnSerializationsInfo = exports.measure = exports.alwaysShowZeroLevel = exports.gridDimensionColumnSerializationsInfo = exports.dimensionDisplayMode = exports.dimension = exports.gridColumnBaseSerializationsInfo = exports.totalsTemplate = exports.widthType = exports.fixedWidth = exports.columnWeight = exports.displayMode = exports.columnType = void 0;
const _data_item_1 = require("../../../data-item/metadata/_data-item");
const _base_metadata_1 = require("../../../metadata/_base-metadata");
const delta_options_1 = require("../../options/delta-options");
const sparkline_options_1 = require("../../options/sparkline-options");
exports.columnType = { propertyName: 'containerType', displayName: 'DashboardWebStringId.Grid.ColumnType' };
exports.displayMode = {
    propertyName: 'displayMode', modelName: '@DisplayMode', displayName: 'DashboardWebStringId.Grid.DisplayMode', defaultVal: 'Value', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Value': 'DashboardWebStringId.Grid.DisplayMode.Value',
        'Bar': 'DashboardWebStringId.Grid.DisplayMode.Bar'
    }
};
exports.columnWeight = { propertyName: 'weight', modelName: '@Weight', displayName: 'DashboardStringId.WeightCaption', defaultVal: 75, simpleFormAdapterItem: 'numberBoxEditor', from: _base_metadata_1.floatFromModel, category: _base_metadata_1.PropertyCategory.ViewModel,
    isTwoWay: true
};
exports.fixedWidth = { propertyName: 'fixedWidth', modelName: '@FixedWidth', displayName: 'DashboardWebStringId.Grid.FixedWidth', defaultVal: 0, simpleFormAdapterItem: 'numberBoxEditor', from: _base_metadata_1.floatFromModel, category: _base_metadata_1.PropertyCategory.ViewModel };
exports.widthType = {
    propertyName: 'widthType', modelName: '@WidthType', displayName: 'DashboardWebStringId.Grid.WidthType', defaultVal: 'Weight', simpleFormAdapterItem: 'listEditor', category: _base_metadata_1.PropertyCategory.ViewModel,
    values: {
        'Weight': 'DashboardWebStringId.Grid.WidthType.Weight',
        'FitToContent': 'DashboardWebStringId.Grid.WidthType.FitToContent',
        'FixedWidth': 'DashboardWebStringId.Grid.FixedWidth'
    },
    isTwoWay: true
};
exports.totalsTemplate = { propertyName: 'totals', modelName: 'Totals', array: true };
exports.gridColumnBaseSerializationsInfo = [_base_metadata_1.itemType, _base_metadata_1.name, exports.columnWeight, exports.fixedWidth, exports.widthType, exports.totalsTemplate];
exports.dimension = { propertyName: '__dimension', modelName: 'Dimension', info: _data_item_1.dataItemLinkSerializationsInfo, displayName: 'DashboardStringId.DescriptionItemDimension' };
exports.dimensionDisplayMode = {
    propertyName: 'displayMode', modelName: '@DisplayMode', displayName: 'DashboardWebStringId.Grid.DisplayMode', defaultVal: 'Text', simpleFormAdapterItem: 'selectBoxEditor',
    values: {
        'Text': 'DashboardWebStringId.Grid.DisplayMode.Text',
        'Image': 'DashboardWebStringId.Grid.DisplayMode.Image'
    }
};
exports.gridDimensionColumnSerializationsInfo = exports.gridColumnBaseSerializationsInfo.concat([exports.dimensionDisplayMode, exports.dimension]);
exports.alwaysShowZeroLevel = { propertyName: 'alwaysShowZeroLevel', modelName: '@AlwaysShowZeroLevel', displayName: 'DashboardWebStringId.Chart.AlwaysShowZeroLevel', defaultVal: false, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.measure = { propertyName: '__measure', modelName: 'Measure', info: _data_item_1.dataItemLinkSerializationsInfo, displayName: 'DashboardStringId.DescriptionItemMeasure' };
exports.gridMeasureColumnSerializationsInfo = exports.gridColumnBaseSerializationsInfo.concat([exports.displayMode, exports.alwaysShowZeroLevel, exports.measure]);
exports.gridColumnDeltaOptions = { propertyName: 'deltaOptions', modelName: 'DeltaOptions', displayName: 'DashboardWebStringId.Grid.DeltaOptions', type: delta_options_1.DeltaOptions };
exports.gridColumnActualValue = { propertyName: _base_metadata_1.actualValuePropertyName, modelName: 'ActualValue', info: _data_item_1.dataItemLinkSerializationsInfo, displayName: 'DashboardStringId.ActualValueCaption' };
exports.gridColumnTargetValue = { propertyName: _base_metadata_1.targetValuePropertyName, modelName: 'TargetValue', info: _data_item_1.dataItemLinkSerializationsInfo, displayName: 'DashboardStringId.TargetValueCaption' };
exports.gridDeltaColumnSerializationsInfo = exports.gridColumnBaseSerializationsInfo.concat([exports.gridColumnDeltaOptions, exports.displayMode, exports.alwaysShowZeroLevel, exports.gridColumnActualValue, exports.gridColumnTargetValue, _data_item_1.absoluteVariationNumericFormat, _data_item_1.percentVariationNumericFormat, _data_item_1.percentOfTargetNumericFormat]);
exports.showStartEndValues = { propertyName: 'showStartEndValues', modelName: '@ShowStartEndValues', displayName: 'DashboardWebStringId.Grid.ShowStartEndValues', defaultVal: false, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.sparkline = { propertyName: '__measure', modelName: 'SparklineValue', info: _data_item_1.dataItemLinkSerializationsInfo, displayName: 'DashboardWebStringId.Binding.Sparkline' };
exports.sparklineOptions = { propertyName: 'sparklineOptions', modelName: 'SparklineOptions', displayName: 'DashboardWebStringId.Card.SparklineOptions', type: sparkline_options_1.SparklineOptions };
exports.gridSparklineColumnSerializationsInfo = exports.gridColumnBaseSerializationsInfo.concat([exports.showStartEndValues, exports.sparkline, exports.sparklineOptions]);
exports.uri = { propertyName: '__uriAttribute', modelName: 'UriAttribute', info: _data_item_1.dataItemLinkSerializationsInfo, displayName: 'DashboardStringId.UriCaption' };
exports.displayValue = { propertyName: '__displayValue', modelName: 'DisplayValue', info: _data_item_1.dataItemLinkSerializationsInfo, displayName: 'DashboardStringId.DisplayValueCaption' };
function checkGridUriPattern(value) {
    var removes = [];
    var result = '';
    for (var i = 0; i < value.length; i++) {
        if (value[i] == '{') {
            if (value.length < i + 2 || value[i + 1] != '0' || value[i + 2] != '}')
                removes.push(i);
        }
        if (value[i] == '}') {
            if (i < 2 || value[i - 1] != '0' || value[i - 2] != '{')
                removes.push(i);
        }
    }
    for (var i = 0; i < value.length; i++) {
        if (removes.indexOf(i) == -1)
            result = result + value[i];
    }
    return result;
}
exports.checkGridUriPattern = checkGridUriPattern;
function validateGridUriPattern(value) {
    var newValue = checkGridUriPattern(value);
    return newValue.length == value.length;
}
exports.validateGridUriPattern = validateGridUriPattern;
function gridValidateUriPattern(uriPattern) {
    return validateGridUriPattern(uriPattern);
}
exports.gridValidateUriPattern = gridValidateUriPattern;
exports.uriPatternValidationRules = [{ type: 'custom', validationCallback: (options) => { return gridValidateUriPattern(options.value); }, message: 'DashboardStringId.GridHyperlinkUriPatternErrorMessage' }];
exports.gridColumnUriPattern = { propertyName: 'uriPattern', modelName: '@UriPattern', displayName: 'DashboardStringId.UriPatternCaption', simpleFormAdapterItem: 'textBoxEditor', validateBeforeSet: true, editorOptions: { placeholder: '{0}' }, validationRules: exports.uriPatternValidationRules };
exports.gridHyperlinkColumnSerializationsInfo = exports.gridColumnBaseSerializationsInfo.concat([exports.uri, exports.displayValue, exports.gridColumnUriPattern]);
