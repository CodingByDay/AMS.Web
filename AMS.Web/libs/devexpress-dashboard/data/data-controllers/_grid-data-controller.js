﻿/**
* DevExpress Dashboard (_grid-data-controller.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gridDataController = void 0;
const $ = require("jquery");
const item_data_axis_names_1 = require("../item-data/item-data-axis-names");
const _grid_bar_calculator_1 = require("../_grid-bar-calculator");
const _utils_1 = require("../_utils");
const _data_controller_base_1 = require("./_data-controller-base");
var GridColumnType = {
    Dimension: 'Dimension',
    Measure: 'Measure',
    Delta: 'Delta',
    Sparkline: 'Sparkline',
    Hyperlink: 'Hyperlink'
};
class gridDataController extends _data_controller_base_1.dataControllerBase {
    constructor(options) {
        super(options);
        var pushColumn = (columnName, columnViewModel) => {
            this._columnRepository[columnName] = {
                columnName: columnName,
                column: columnViewModel,
                barCalculator: columnViewModel.BarViewModel ? new _grid_bar_calculator_1.GridBarCalculator(columnViewModel.BarViewModel.AlwaysShowZeroLevel) : null
            };
            if (this.viewModel.SelectionDataMembers && this.viewModel.SelectionDataMembers.indexOf(columnName) !== -1) {
                this._selectionMembers.push(columnName);
            }
        };
        this._columnRepository = {};
        this._selectionMembers = [];
        if (!!this.multiData) {
            if (!!this.viewModel.HasDimensionColumns) {
                this._axisColumnPoints = this.multiData.getAxis(this.viewModel.ColumnAxisName).getPoints();
            }
            if (!!this.viewModel.SparklineAxisName) {
                this._axisSparklinePoints = this.multiData.getAxis(this.viewModel.SparklineAxisName).getPoints();
            }
            (this.viewModel.Columns || []).forEach(columnViewModel => {
                pushColumn(columnViewModel.DataId, columnViewModel);
                if (!!this._columnRepository[columnViewModel.DataId].barCalculator)
                    this.initializeColumnBarCalculator(this._columnRepository[columnViewModel.DataId]);
            });
        }
    }
    getDataSource() {
        var that = this, list = [], listItem, hasColumns = (that.viewModel.Columns || []).length > 0, axisPointsCount = !!that._axisColumnPoints ? that._axisColumnPoints.length : +hasColumns;
        for (var rowIndex = 0; rowIndex < axisPointsCount; rowIndex++) {
            listItem = { index: rowIndex };
            Object.keys(that._columnRepository).forEach(columnName => {
                let columnInfo = that._columnRepository[columnName];
                var valueItem = that._getValueItem(columnInfo, rowIndex);
                listItem[columnName] = valueItem.getValue();
                if (columnInfo.column.ColumnType === GridColumnType.Hyperlink && !!columnInfo.column.DataAttributeId) {
                    listItem[columnName + '_' + columnInfo.column.DataAttributeId] = valueItem.getUriValue();
                }
            });
            list.push(listItem);
        }
        return list;
    }
    initializeColumnBarCalculator(barColumn) {
        let columnValues = [];
        const axisPointsCount = !!this._axisColumnPoints ? this._axisColumnPoints.length : 1;
        for (let rowIndex = 0; rowIndex < axisPointsCount; rowIndex++)
            columnValues.push(this._getValueItem(barColumn, rowIndex).getValue());
        barColumn.barCalculator.initialize(Math.min(...columnValues), Math.max(...columnValues));
    }
    getValueItem(columnName, rowIndex) {
        return this._getValueItem(this._columnRepository[columnName], rowIndex);
    }
    _getValueItem(columnInfo, rowIndex) {
        var that = this;
        var columnName = columnInfo.columnName;
        switch (columnInfo.column.ColumnType) {
            case GridColumnType.Measure:
                if (columnInfo.column.DisplayMode === 'Bar') {
                    return this._getBarCellValue(columnName, rowIndex, columnInfo.barCalculator);
                }
                else {
                    return this._getMeasureCellValue(columnName, rowIndex);
                }
            case GridColumnType.Delta:
                return that._getDeltaValue(columnName, rowIndex, columnInfo.column.DisplayMode === 'Bar' ? columnInfo.barCalculator : null, columnInfo.column.DeltaValueType, columnInfo.column.IgnoreDeltaColor);
            case GridColumnType.Sparkline:
                return that._getSparklineCellValues(columnName, rowIndex, columnInfo.column.SparklineOptions);
            case GridColumnType.Hyperlink:
                return that._getCellValue(columnName, columnInfo.column.DataAttributeId, rowIndex);
            case GridColumnType.Dimension:
                return that._getCellValue(columnName, null, rowIndex);
        }
    }
    getSelectionValues(values) {
        var that = this, point, resultPoint, result = [], selectionMembers = that._selectionMembers, fit, columns = that.viewModel.Columns, visibleDimensions = columns.map(function (column) { return column.DataId; });
        if (values.length > selectionMembers.length)
            values = values.slice(-selectionMembers.length);
        $.each(that._axisColumnPoints, function (index, axisPoint) {
            fit = false;
            $.each(selectionMembers, function (memberIndex, member) {
                point = that._findAxisPoint(member, axisPoint);
                if (point && values.length > memberIndex) {
                    if (!_utils_1.checkValuesAreEqual(point.getUniqueValue(), values[memberIndex], true)) {
                        fit = false;
                        return false;
                    }
                    resultPoint = point;
                }
                fit = true;
            });
            if (fit && resultPoint) {
                result = resultPoint._selectPath(function (point) {
                    var index = visibleDimensions.indexOf(point.getDimension().id);
                    if (index === -1 || columns[index].DisplayMode != 'Image')
                        return point.getUniqueValue();
                    else
                        return;
                });
                return;
            }
        });
        return result;
    }
    getSelectedRowKeys(valuesSet) {
        var that = this, keys = [], selectionMembers = that._selectionMembers, checkAxisPoint = function (axisPoint, values) {
            var point;
            for (var i = 0; i < values.length; i++) {
                point = that._findAxisPoint(selectionMembers[i], axisPoint);
                if (!_utils_1.checkValuesAreEqual(point.getUniqueValue(), values[i], true))
                    return false;
            }
            return true;
        };
        $.each(that._axisColumnPoints, function (index, axisPoint) {
            $.each(valuesSet, function (_, values) {
                if (values.length > selectionMembers.length)
                    values = values.slice(-selectionMembers.length);
                if (checkAxisPoint(axisPoint, values)) {
                    keys.push(index);
                    return;
                }
            });
        });
        return keys;
    }
    getDimensionValues(rowIndex) {
        let columnAxisPoint = this._getColumnAxisPoint(rowIndex);
        return columnAxisPoint ? columnAxisPoint.getUniquePath() : [];
    }
    getTotalValue(measureId) {
        return this.multiData.getMeasureValue(measureId).getDisplayText();
    }
    _getBarCellValue(columnName, rowIndex, barCalculator) {
        var that = this, item = this.multiData.getMeasureValueByAxisPoints(columnName, that._getPointArray(rowIndex));
        barCalculator.addValue(rowIndex, item);
        return {
            getValue: function () {
                return item.getValue();
            },
            getData: function () {
                return that._getBarData(barCalculator, item, rowIndex);
            },
            getStyleSettingsInfo: function () {
                return that._getStyleSettingsInfo(columnName, rowIndex);
            }
        };
    }
    _getBarData(barCalculator, item, rowIndex) {
        return {
            zeroValue: barCalculator.getZeroPosition(),
            normalizedValue: barCalculator.getNormalizedValue(rowIndex || 0),
            text: item.getDisplayText()
        };
    }
    _getMeasureCellValue(columnName, rowIndex) {
        var that = this, item = that.multiData.getMeasureValueByAxisPoints(columnName, that._getPointArray(rowIndex)), value = item.getValue();
        return {
            getValue: function () {
                return value;
            },
            getData: function () {
                return {
                    value: item.getValue(),
                    displayText: item.getDisplayText()
                };
            },
            getStyleSettingsInfo: function () {
                return that._getStyleSettingsInfo(columnName, rowIndex);
            }
        };
    }
    _getCellValue(columnName, uriColumnName, rowIndex) {
        var that = this, item = undefined, uriItem = !!uriColumnName ? that.multiData.getMeasureValueByAxisPoints(uriColumnName, that._getPointArray(rowIndex)) : null, obtainItem = function () {
            if (item === undefined) {
                item = that._findAxisPoint(columnName, that._getColumnAxisPoint(rowIndex)) || {
                    getValue: function () {
                        return undefined;
                    },
                    getUniqueValue: function () {
                        return undefined;
                    },
                    getDisplayText: function () {
                        return '';
                    }
                };
            }
            return item;
        };
        var cellValue = {
            getValue: function () {
                return obtainItem().getValue();
            },
            getUniqueValue: function () {
                return obtainItem().getUniqueValue();
            },
            getData: function () {
                return {
                    value: obtainItem().getValue(),
                    displayText: obtainItem().getDisplayText()
                };
            },
            getStyleSettingsInfo: function () {
                return that._getStyleSettingsInfo(columnName, rowIndex);
            }
        };
        cellValue.getUriValue = function () {
            return !!uriItem ? uriItem.getValue() : obtainItem().getDisplayText();
        };
        return cellValue;
    }
    _getStyleSettingsInfo(columnName, rowIndex) {
        var that = this, rules = [], cellInfo = {
            rowIndex: rowIndex
        };
        if (that.cfModel) {
            rules = $.grep(that.cfModel.RuleModels, function (rule) {
                return rule.ApplyToRow || rule.ApplyToDataId === columnName;
            });
        }
        return that._getStyleSettingsInfoCore(cellInfo, rules, that.viewModel.ColumnAxisName, item_data_axis_names_1.itemDataAxisNames.defaultAxis);
    }
    _getStyleIndexes(rule, cellInfo, points) {
        var that = this, axisPoint, currentStyleIndexes, styleIndexes = [];
        axisPoint = cellInfo.rowIndex !== undefined ? that._getAxisPoint(cellInfo.rowIndex, rule.CalcByDataId) : undefined;
        if (axisPoint)
            points.push(axisPoint);
        currentStyleIndexes = that._getMeasureValueByAxisPoints(points, rule.FormatConditionMeasureId);
        if (currentStyleIndexes) {
            styleIndexes = styleIndexes.concat(currentStyleIndexes);
        }
        return styleIndexes;
    }
    _getAxisPoint(rowIndex, columnInfo) {
        var axisPoint = rowIndex !== undefined && !!this._axisColumnPoints ? this._axisColumnPoints[rowIndex] : undefined, correctAxisPoint = axisPoint ? this._findAxisPoint(columnInfo, axisPoint) : undefined;
        return correctAxisPoint || axisPoint;
    }
    _getDeltaValue(columnName, rowIndex, barCalculator, deltaType, useDefaultColor) {
        var that = this, deltaValue = null, deltaValueItem = null, measureValue = null, deltaDesriptor = that.multiData.getDeltaById(columnName), measureItem, idBarDisplayMode = !!barCalculator, getStyleSettingsInfo = function (columnName, rowIndex) {
            return that._getStyleSettingsInfo(columnName, rowIndex);
        };
        if (deltaDesriptor) {
            deltaValue = that.multiData.getDeltaValueByAxisPoints(columnName, that._getPointArray(rowIndex));
            deltaValueItem = that._getDeltaValueItem(deltaValue, deltaType);
            if (idBarDisplayMode)
                barCalculator.addValue(rowIndex, deltaValueItem);
            return {
                getValue: function () {
                    return deltaValueItem.getValue();
                },
                getData: function () {
                    if (idBarDisplayMode) {
                        return that._getBarData(barCalculator, deltaValueItem, rowIndex);
                    }
                    else {
                        return {
                            type: that._convertIndicatorType(deltaValue.getIndicatorType().getValue()),
                            hasPositiveMeaning: deltaValue.getIsGood().getValue(),
                            text: {
                                value: deltaValueItem.getDisplayText(),
                                useDefaultColor: useDefaultColor
                            }
                        };
                    }
                },
                getStyleSettingsInfo: function () {
                    return that._getStyleSettingsInfo(columnName, rowIndex);
                }
            };
        }
        else {
            measureItem = that.multiData.getMeasureValueByAxisPoints(columnName, that._getPointArray(rowIndex));
            if (idBarDisplayMode)
                barCalculator.addValue(rowIndex, measureItem);
            return {
                getValue: function () {
                    return measureItem.getValue();
                },
                getData: function () {
                    if (idBarDisplayMode) {
                        return that._getBarData(barCalculator, measureItem, rowIndex);
                    }
                    else {
                        return {
                            type: null,
                            hasPositiveMeaning: null,
                            text: {
                                value: measureItem.getDisplayText(),
                                useDefaultColor: null
                            }
                        };
                    }
                },
                getStyleSettingsInfo: function () {
                    return that._getStyleSettingsInfo(columnName, rowIndex);
                }
            };
        }
    }
    _getDeltaValueItem(deltaValue, deltaValueType) {
        switch (deltaValueType) {
            case 'ActualValue':
                return deltaValue.getActualValue();
            case 'AbsoluteVariation':
                return deltaValue.getAbsoluteVariation();
            case 'PercentVariation':
                return deltaValue.getPercentVariation();
            case 'PercentOfTarget':
                return deltaValue.getPercentOfTarget();
            case 'TargetValue':
                return deltaValue.getTargetValue();
        }
    }
    _getSparklineCellValues(columnName, rowIndex, sparklineOptions) {
        var that = this, measureDescriptor = that.multiData.getMeasureById(columnName), axisPoint = that._getPointArray(rowIndex), getValues = function (getter) {
            var result = [];
            if (!!that._axisSparklinePoints) {
                $.each(that._axisSparklinePoints, function (_, sparklinePoint) {
                    result.push(getter(that.multiData.getMeasureValueByAxisPoints(columnName, axisPoint.concat(sparklinePoint))));
                });
            }
            else {
                result.push(getter(that.multiData.getMeasureValueByAxisPoints(columnName, axisPoint)));
            }
            return result;
        }, values = getValues(function (item) {
            var value = item.getValue();
            return value || 0;
        });
        return {
            getValue: function () {
                return values;
            },
            getData: function () {
                var valuesItems = getValues(function (item) {
                    return item;
                }), startValue = valuesItems[0].getValue(), endValue = valuesItems[valuesItems.length - 1].getValue();
                return {
                    sparkline: that._generateSparklineOptions(values, sparklineOptions, measureDescriptor.format),
                    startText: startValue ? valuesItems[0].getDisplayText() : measureDescriptor.format(0),
                    endText: endValue ? valuesItems[valuesItems.length - 1].getDisplayText() : measureDescriptor.format(0)
                };
            },
            getStyleSettingsInfo: function () {
                return that._getStyleSettingsInfo(columnName, rowIndex);
            }
        };
    }
    _getColumnAxisPoint(rowIndex) {
        return !!this._axisColumnPoints ? this._axisColumnPoints[rowIndex] : undefined;
    }
    _getPointArray(rowIndex) {
        var point = this._getColumnAxisPoint(rowIndex), array = [];
        if (point)
            array.push(point);
        return array;
    }
}
exports.gridDataController = gridDataController;
