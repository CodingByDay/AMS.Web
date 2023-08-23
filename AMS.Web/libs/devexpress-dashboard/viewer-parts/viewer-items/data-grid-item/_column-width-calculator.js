﻿/**
* DevExpress Dashboard (_column-width-calculator.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnWidthCalculator = void 0;
const $ = require("jquery");
var COLUMN_MIN_WIDTH = 10;
class ColumnWidthCalculator {
    get columnsResized() {
        return this._columnWidthsStorage && this._columnWidthsStorage.columnsResized ? true : false;
    }
    reset(viewModel, columnWidthMode) {
        this._resetWidthOptions(viewModel, columnWidthMode);
        this._columnWidthsStorage = undefined;
    }
    getLeftPrintingColumnIndex(hScrollPosition) {
        var that = this, columnIndex = 0, widthSum = 0;
        $.each(that._columnWidths, function (index, width) {
            if (hScrollPosition < widthSum + width / 2) {
                columnIndex = index;
                return false;
            }
            widthSum += width;
        });
        return columnIndex;
    }
    getClientWidthOptions() {
        var that = this, clientWidthOptions;
        if (that.widthOptions) {
            clientWidthOptions = {
                mode: that.widthOptions.mode,
                columnsOptions: []
            };
            $.each(that.widthOptions.columnsOptions, function (i, info) {
                clientWidthOptions.columnsOptions[i] = {
                    widthType: info.widthType,
                    weight: info.weight
                };
            });
        }
        return clientWidthOptions;
    }
    onDataLoaded(viewModel, columnWidthMode) {
        var that = this;
        this._resetWidthOptions(viewModel, columnWidthMode);
        if (that._columnWidthsStorage) {
            that.widthOptions.mode = that._columnWidthsStorage.mode;
            $.each(that.widthOptions.columnsOptions, function (i, info) {
                $.each(that._columnWidthsStorage.columnsOptions, function (j, storageWidthInfo) {
                    if (info.actualIndex === storageWidthInfo.actualIndex) {
                        info.widthType = storageWidthInfo.widthType;
                        info.weight = storageWidthInfo.weight;
                    }
                });
            });
        }
    }
    calcColumnsWidth(bestFitProvider, maxVisibleWidth, charWidth) {
        this._columnWidths = [];
        let widthInfo = this._createWidthInfo(bestFitProvider, charWidth);
        this._calcWidth(widthInfo, maxVisibleWidth);
        widthInfo.columnsOptions.forEach((columnInfo) => {
            this._columnWidths.push(columnInfo.actualWidth);
        });
        return this._columnWidths;
    }
    onColumnResized(leftColumnIndex, leftColumnWidth, rightColumnWidth) {
        this._unfixColumnWidth(leftColumnIndex);
        if (leftColumnWidth < COLUMN_MIN_WIDTH) {
            rightColumnWidth = leftColumnWidth + rightColumnWidth - COLUMN_MIN_WIDTH;
            leftColumnWidth = COLUMN_MIN_WIDTH;
        }
        else if (rightColumnWidth < COLUMN_MIN_WIDTH) {
            leftColumnWidth = leftColumnWidth + rightColumnWidth - COLUMN_MIN_WIDTH;
            rightColumnWidth = COLUMN_MIN_WIDTH;
        }
        this._columnWidths[leftColumnIndex] = leftColumnWidth;
        this._columnWidths[leftColumnIndex + 1] = rightColumnWidth;
        this._updateWeight(this.widthOptions.columnsOptions, this._columnWidths);
        this._updateColumnWidthsStorage();
        return this._columnWidths;
    }
    _unfixColumnWidth(leftColumnIndex) {
        var that = this, leftColumnInfo = that.widthOptions.columnsOptions[leftColumnIndex], rightColumnInfo = that.widthOptions.columnsOptions[leftColumnIndex + 1], unfixColumnWidth = function (info) {
            info.widthType = 'Weight';
        };
        that.widthOptions.mode = 'Manual';
        if (that._isAllColumnsFixed()) {
            $.each(that.widthOptions.columnsOptions, function (_, info) {
                unfixColumnWidth(info);
            });
        }
        else {
            unfixColumnWidth(leftColumnInfo);
            unfixColumnWidth(rightColumnInfo);
        }
    }
    _calcWidth(optionsInfo, maxVisibleWidth) {
        var actualWidthSum = 0, autoFitToContents = optionsInfo.mode === 'AutoFitToContents';
        $.each(optionsInfo.columnsOptions, function (_, info) {
            info.actualWidth = info.initialWidth;
            actualWidthSum += info.initialWidth;
        });
        if (actualWidthSum !== maxVisibleWidth && (!autoFitToContents || (autoFitToContents && actualWidthSum < maxVisibleWidth))) {
            actualWidthSum = this._scaleColumns(optionsInfo, false, maxVisibleWidth, actualWidthSum);
            if (actualWidthSum !== maxVisibleWidth) {
                this._scaleColumns(optionsInfo, true, maxVisibleWidth, actualWidthSum);
            }
        }
    }
    _scaleColumns(optionsInfo, isFixed, maxVisibleWidth, actualWidthSum) {
        var that = this, scalingColumnSum, targetScalingColumnSum, updatedActualWidthSum, nonScalingColumnSum = 0;
        $.each(optionsInfo.columnsOptions, function (_, columnInfo) {
            if (!that._isScaledColumns(optionsInfo.mode, columnInfo.widthType, isFixed)) {
                nonScalingColumnSum += columnInfo.actualWidth;
            }
        });
        scalingColumnSum = actualWidthSum - nonScalingColumnSum;
        targetScalingColumnSum = Math.abs(maxVisibleWidth - nonScalingColumnSum);
        updatedActualWidthSum = nonScalingColumnSum;
        $.each(optionsInfo.columnsOptions, function (_, columnInfo) {
            if (that._isScaledColumns(optionsInfo.mode, columnInfo.widthType, isFixed)) {
                var correctedWidth = Math.round(targetScalingColumnSum * columnInfo.actualWidth / scalingColumnSum), actualWidth = Math.max(correctedWidth, COLUMN_MIN_WIDTH);
                columnInfo.actualWidth = actualWidth;
                updatedActualWidthSum += actualWidth;
            }
        });
        return that._spreadRemainder(optionsInfo, isFixed, maxVisibleWidth, updatedActualWidthSum);
    }
    _spreadRemainder(optionsInfo, isFixed, maxVisibleWidth, actualWidthSum) {
        for (var i = optionsInfo.columnsOptions.length - 1; i >= 0; i--) {
            var columnInfo = optionsInfo.columnsOptions[i];
            var remainder = actualWidthSum - maxVisibleWidth;
            if (remainder === 0)
                return actualWidthSum;
            if (this._isScaledColumns(optionsInfo.mode, columnInfo.widthType, isFixed)) {
                columnInfo.actualWidth -= remainder;
                actualWidthSum -= remainder;
                if (columnInfo.actualWidth < COLUMN_MIN_WIDTH) {
                    actualWidthSum += Math.abs(columnInfo.actualWidth - COLUMN_MIN_WIDTH);
                    columnInfo.actualWidth = COLUMN_MIN_WIDTH;
                }
            }
        }
        return actualWidthSum;
    }
    _isScaledColumns(widthMode, widthType, isFixed) {
        var isFixedWidth = function (widthMode, widthType) {
            return widthMode !== 'Manual' || widthType != 'Weight';
        };
        return isFixedWidth(widthMode, widthType) === isFixed;
    }
    _resetWidthOptions(viewModel, columnWidthMode) {
        var that = this, columns = viewModel.Columns, isManualColumnWidthMode = columnWidthMode == 'Manual';
        that.widthOptions = {
            mode: columnWidthMode,
            columnsOptions: []
        };
        $.each(columns, function (i, column) {
            that.widthOptions.columnsOptions[i] = {
                actualIndex: column.ActualIndex,
                widthType: column.WidthType,
                weight: column.Weight,
                fixedWidth: column.FixedWidth
            };
        });
    }
    _createWidthInfo(bestFitProvider, charWidth) {
        var that = this, isManualMode = that.widthOptions.mode == 'Manual', widthInfo = {
            mode: that.widthOptions.mode,
            columnsOptions: []
        };
        $.each(that.widthOptions.columnsOptions, function (i, info) {
            var initialWidth = 0;
            if (!isManualMode || info.widthType === 'FitToContent') {
                initialWidth = bestFitProvider.getBestFit(i);
            }
            else if (isManualMode && info.widthType === 'FixedWidth') {
                initialWidth = Math.round(info.fixedWidth * charWidth);
            }
            else {
                initialWidth = info.weight;
            }
            widthInfo.columnsOptions.push({
                widthType: info.widthType,
                initialWidth: initialWidth,
                actualWidth: 0,
            });
        });
        return widthInfo;
    }
    _updateColumnWidthsStorage() {
        var that = this, found, res = {
            columnsResized: true,
            mode: that.widthOptions.mode,
            columnsOptions: []
        };
        for (var i = 0; i < that.widthOptions.columnsOptions.length; i++) {
            res.columnsOptions.push(that.widthOptions.columnsOptions[i]);
        }
        if (that._columnWidthsStorage) {
            for (var i = 0; i < that._columnWidthsStorage.columnsOptions.length; i++) {
                found = false;
                for (var j = 0; j < res.columnsOptions.length; j++) {
                    if (that._columnWidthsStorage.columnsOptions[i].actualIndex === res.columnsOptions[j].actualIndex) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    res.columnsOptions.push(that._columnWidthsStorage.columnsOptions[i]);
                }
            }
        }
        this._columnWidthsStorage = res;
    }
    _isAllColumnsFixed() {
        var that = this, allColumnsFixed = true;
        $.each(that.widthOptions.columnsOptions, function (_, info) {
            if (info.widthType === 'Weight') {
                allColumnsFixed = false;
                return false;
            }
        });
        return allColumnsFixed;
    }
    _updateWeight(columnsWidthInfo, columnWidths) {
        var widthSum = 0;
        var weightSum = 0;
        $.each(columnsWidthInfo, function (i, info) {
            if (info.widthType === 'Weight') {
                widthSum += columnWidths[i];
                weightSum += info.weight;
            }
        });
        $.each(columnsWidthInfo, function (i, info) {
            if (info.widthType === 'Weight') {
                info.weight = columnWidths[i] * weightSum / widthSum;
            }
        });
    }
}
exports.ColumnWidthCalculator = ColumnWidthCalculator;
