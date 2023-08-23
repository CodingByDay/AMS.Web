﻿/**
* DevExpress Dashboard (grid-columns.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridHyperlinkColumn = exports.GridSparklineColumn = exports.GridDeltaColumn = exports.GridMeasureColumn = exports.GridDimensionColumn = exports.GridColumn = exports.GridColumnType = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const data_item_1 = require("../../data-item/data-item");
const measure_1 = require("../../data-item/measure");
const _data_field_1 = require("../../data-sources/_data-field");
const _utils_1 = require("../../internal/_utils");
const data_item_container_1 = require("../data-item-container");
const grid_column_total_1 = require("./grid-column-total");
const _grid_column_total_1 = require("./metadata/_grid-column-total");
const _grid_columns_1 = require("./metadata/_grid-columns");
var GridColumnType;
(function (GridColumnType) {
    GridColumnType[GridColumnType["Dimension"] = 0] = "Dimension";
    GridColumnType[GridColumnType["Measure"] = 1] = "Measure";
    GridColumnType[GridColumnType["Delta"] = 2] = "Delta";
    GridColumnType[GridColumnType["Sparkline"] = 3] = "Sparkline";
    GridColumnType[GridColumnType["Hyperlink"] = 4] = "Hyperlink";
})(GridColumnType = exports.GridColumnType || (exports.GridColumnType = {}));
class GridColumn extends data_item_container_1.DataItemContainer {
    constructor(dataItemProvider, dashboardItemJSON = {}, serializer) {
        super(dashboardItemJSON, serializer);
        this._displayNameSeparator = 'vs';
        this.totals = analytics_utils_1.deserializeArray(dashboardItemJSON.Totals, (item) => new grid_column_total_1.GridColumnTotal(item, serializer));
    }
    get actualDataItem() {
        var dataItemLink = this._getActualDataItemLink();
        return !!dataItemLink ? dataItemLink.dataItem() : undefined;
    }
    get _actualDataItemLink() {
        return this._getActualDataItemLink();
    }
    grabFrom(column) {
        super.grabFrom(column);
        this.weight(column.weight());
        this.fixedWidth(column.fixedWidth());
        this.widthType(column.widthType());
    }
    _getInfoCore() {
        return _grid_columns_1.gridColumnBaseSerializationsInfo;
    }
    _getColumnType() {
        return undefined;
    }
    _getDataId() {
        return this.actualDataItem && this.actualDataItem.uniqueName() || null;
    }
    _isAttribute(dataItem) {
        return false;
    }
    _getViewModel() {
        return {
            Weight: this.weight(),
            FixedWidth: this.fixedWidth(),
            WidthType: this.widthType()
        };
    }
    _getAvailableTotalTypes(dataItemProvider) {
        return _grid_column_total_1.totalTypeValues.commonCountTypes;
    }
    _getTotalTypes(dataType) {
        var possibleTypes = _grid_column_total_1.totalTypeValues.commonCountTypes;
        if (_data_field_1.IsNumeric(dataType)) {
            return _grid_column_total_1.totalTypeValues.commonMinMaxTypes.concat(_grid_column_total_1.totalTypeValues.numericTypes).concat(possibleTypes);
        }
        else if (_data_field_1.IsTextual(dataType) || _data_field_1.IsDateTime(dataType)) {
            return _grid_column_total_1.totalTypeValues.commonMinMaxTypes.concat(possibleTypes);
        }
        else {
            return possibleTypes;
        }
    }
}
__decorate([
    _utils_1.collectionItemType('Total')
], GridColumn.prototype, "totals", void 0);
exports.GridColumn = GridColumn;
class GridDimensionColumn extends GridColumn {
    constructor(dataItemProvider, dashboardItemJSON = {}, serializer) {
        super(dataItemProvider, dashboardItemJSON, serializer);
        dataItemProvider._attachDataItem(this, _grid_columns_1.dimension.propertyName);
    }
    _getInfoCore() {
        return _grid_columns_1.gridDimensionColumnSerializationsInfo;
    }
    _getColumnType() {
        return GridColumnType.Dimension;
    }
    _getActualDataItemLink() {
        return this.__dimension;
    }
    _getAvailableTotalTypes(dataItemProvider) {
        var dataItem = this.actualDataItem;
        if (dataItem) {
            return this._getTotalTypes(dataItemProvider._getFinalDataType(dataItem.uniqueName()));
        }
        else {
            return super._getAvailableTotalTypes(dataItemProvider);
        }
    }
    _getDefaultItemType() {
        return 'GridDimensionColumn';
    }
    _getBindingModel() {
        return [{
                propertyName: _grid_columns_1.dimension.propertyName,
                dataItemType: 'Dimension',
                emptyPlaceholder: 'DashboardStringId.DescriptionItemDimension'
            }];
    }
}
exports.GridDimensionColumn = GridDimensionColumn;
class GridMeasureColumn extends GridColumn {
    constructor(dataItemProvider, dashboardItemJSON = {}, serializer) {
        super(dataItemProvider, dashboardItemJSON, serializer);
        dataItemProvider._attachDataItem(this, _grid_columns_1.measure.propertyName);
        this.__measure._specifics.acceptableShapingType = data_item_1.AcceptableShapingType.String;
    }
    _getInfoCore() {
        return _grid_columns_1.gridMeasureColumnSerializationsInfo;
    }
    _getColumnType() {
        return GridColumnType.Measure;
    }
    _getActualDataItemLink() {
        return this.__measure;
    }
    _getAvailableTotalTypes(dataItemProvider) {
        var dataItem = this.actualDataItem;
        if (dataItem instanceof measure_1.Measure) {
            var totalTypes = this._getTotalTypes(dataItemProvider._getFinalDataType(dataItem.uniqueName()));
            if (dataItem.expression() == null && dataItem.calculation.calculation() == null)
                totalTypes = totalTypes.concat(_grid_column_total_1.totalTypeValues.autoTypes);
            return totalTypes;
        }
        else {
            return super._getAvailableTotalTypes(dataItemProvider);
        }
    }
    _getDefaultItemType() {
        return 'GridMeasureColumn';
    }
    _getBindingModel() {
        return [{
                propertyName: _grid_columns_1.measure.propertyName,
                dataItemType: 'Measure',
                emptyPlaceholder: 'DashboardStringId.DescriptionItemMeasure'
            }];
    }
}
exports.GridMeasureColumn = GridMeasureColumn;
class GridDeltaColumn extends GridColumn {
    constructor(dataItemProvider, dashboardItemJSON = {}, serializer) {
        super(dataItemProvider, dashboardItemJSON, serializer);
        dataItemProvider._attachDataItem(this, _grid_columns_1.gridColumnActualValue.propertyName);
        dataItemProvider._attachDataItem(this, _grid_columns_1.gridColumnTargetValue.propertyName);
        ko.computed(() => {
            this.__actualValue._specifics.skipFormatting = true;
            this.__targetValue._specifics.skipFormatting = true;
            if (!this.__actualValue.dataItem() && this.__targetValue.dataItem()) {
                this.__targetValue._specifics.skipFormatting = false;
            }
            if (this.__actualValue.dataItem() && !this.__targetValue.dataItem()) {
                this.__actualValue._specifics.skipFormatting = false;
            }
            else if (this.__actualValue.dataItem() && this.__targetValue.dataItem() && this.deltaOptions.valueType() === 'ActualValue') {
                this.__actualValue._specifics.skipFormatting = false;
            }
        });
    }
    _getInfoCore() {
        return _grid_columns_1.gridDeltaColumnSerializationsInfo;
    }
    _getColumnType() {
        return GridColumnType.Delta;
    }
    _getActualDataItemLink() {
        return !!this.__actualValue.dataItem() ? this.__actualValue : this.__targetValue;
    }
    _getDefaultItemType() {
        return 'GridDeltaColumn';
    }
    _getBindingModel() {
        return [{
                propertyName: _grid_columns_1.gridColumnActualValue.propertyName,
                dataItemType: 'Measure',
                emptyPlaceholder: 'DashboardStringId.ActualValueCaption'
            }, {
                propertyName: _grid_columns_1.gridColumnTargetValue.propertyName,
                dataItemType: 'Measure',
                emptyPlaceholder: 'DashboardStringId.TargetValueCaption'
            }];
    }
}
exports.GridDeltaColumn = GridDeltaColumn;
class GridSparklineColumn extends GridColumn {
    constructor(dataItemProvider, dashboardItemJSON = {}, serializer) {
        super(dataItemProvider, dashboardItemJSON, serializer);
        dataItemProvider._attachDataItem(this, _grid_columns_1.sparkline.propertyName);
    }
    _getInfoCore() {
        return _grid_columns_1.gridSparklineColumnSerializationsInfo;
    }
    _getColumnType() {
        return GridColumnType.Sparkline;
    }
    _getActualDataItemLink() {
        return this.__measure;
    }
    _getDefaultItemType() {
        return 'GridSparklineColumn';
    }
    _getBindingModel() {
        return [{
                propertyName: _grid_columns_1.sparkline.propertyName,
                dataItemType: 'Measure',
                emptyPlaceholder: 'DashboardWebStringId.Grid.Sparkline'
            }];
    }
}
exports.GridSparklineColumn = GridSparklineColumn;
class GridHyperlinkColumn extends GridColumn {
    constructor(dataItemProvider, dashboardItemJSON = {}, serializer) {
        super(dataItemProvider, dashboardItemJSON, serializer);
        dataItemProvider._attachDataItem(this, _grid_columns_1.displayValue.propertyName);
        this.__uriAttribute = data_item_1.DataItemLink.create(dataItemProvider, this.__uriAttribute);
        this.__uriAttribute._specifics.isAttribute = true;
        this.__uriAttribute._specifics.acceptableShapingType = data_item_1.AcceptableShapingType.Attribute;
        this._displayNameSeparator = '/';
        var isUriPatternChangedCallback = (value) => {
            this.uriPattern(_grid_columns_1.checkGridUriPattern(value));
        };
        this.uriPattern.subscribe(isUriPatternChangedCallback);
    }
    _getInfoCore() {
        return _grid_columns_1.gridHyperlinkColumnSerializationsInfo;
    }
    _getColumnType() {
        return GridColumnType.Hyperlink;
    }
    _getActualDataItemLink() {
        return this.__displayValue;
    }
    _getDefaultItemType() {
        return 'GridHyperlinkColumn';
    }
    _isAttribute(dataItem) {
        return dataItem === this.__uriAttribute.dataItem();
    }
    _getBindingModel() {
        return [{
                propertyName: _grid_columns_1.displayValue.propertyName,
                dataItemType: 'Dimension',
                emptyPlaceholder: 'DashboardStringId.DisplayValueCaption'
            }, {
                propertyName: _grid_columns_1.uri.propertyName,
                dataItemType: 'Measure',
                emptyPlaceholder: 'DashboardStringId.UriCaption'
            }];
    }
    _getAvailableTotalTypes(dataItemProvider) {
        if (this.actualDataItem) {
            return this._getTotalTypes(dataItemProvider._getFinalDataType(this.actualDataItem.uniqueName()));
        }
        else {
            return super._getAvailableTotalTypes(dataItemProvider);
        }
    }
}
exports.GridHyperlinkColumn = GridHyperlinkColumn;
