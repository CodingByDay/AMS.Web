/**
 * DevExtreme (cjs/exporter/exceljs/export_merged_ranges_manager.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.MergedRangesManager = void 0;
var MergedRangesManager = function() {
    function MergedRangesManager(dataProvider, worksheet) {
        this.dataProvider = dataProvider;
        this.worksheet = worksheet;
        this.mergedCells = [];
        this.mergedRanges = []
    }
    var _proto = MergedRangesManager.prototype;
    _proto.updateMergedRanges = function(excelCell, rowIndex, cellIndex, helpers) {
        if (helpers._isHeaderCell(rowIndex, cellIndex) && !this.isCellInMergedRanges(rowIndex, cellIndex)) {
            var _this$dataProvider$ge = this.dataProvider.getCellMerging(rowIndex, cellIndex),
                rowspan = _this$dataProvider$ge.rowspan,
                colspan = _this$dataProvider$ge.colspan;
            var isMasterCellOfMergedRange = colspan || rowspan;
            if (isMasterCellOfMergedRange) {
                var allowToMergeRange = helpers._allowToMergeRange(rowIndex, cellIndex, rowspan, colspan);
                this.updateMergedCells(excelCell, rowIndex, cellIndex, rowspan, colspan);
                if (allowToMergeRange) {
                    var shouldReduceInfoRange = helpers._isInfoCell(rowIndex, cellIndex) && helpers._allowExportRowFieldHeaders();
                    this.mergedRanges.push({
                        masterCell: excelCell,
                        rowspan: rowspan - (shouldReduceInfoRange && rowspan > 0),
                        colspan: colspan
                    })
                }
            }
        }
    };
    _proto.isCellInMergedRanges = function(rowIndex, cellIndex) {
        return this.mergedCells[rowIndex] && this.mergedCells[rowIndex][cellIndex]
    };
    _proto.findMergedCellInfo = function(rowIndex, cellIndex, isHeaderCell) {
        if (isHeaderCell && this.isCellInMergedRanges(rowIndex, cellIndex)) {
            return this.mergedCells[rowIndex][cellIndex]
        }
    };
    _proto.updateMergedCells = function(excelCell, rowIndex, cellIndex, rowspan, colspan) {
        for (var i = rowIndex; i <= rowIndex + rowspan; i++) {
            for (var j = cellIndex; j <= cellIndex + colspan; j++) {
                if (!this.mergedCells[i]) {
                    this.mergedCells[i] = []
                }
                this.mergedCells[i][j] = {
                    masterCell: excelCell
                }
            }
        }
    };
    _proto.addMergedRange = function(masterCell, rowspan, colspan) {
        this.mergedRanges.push({
            masterCell: masterCell,
            rowspan: rowspan,
            colspan: colspan
        })
    };
    _proto.applyMergedRages = function() {
        var _this = this;
        this.mergedRanges.forEach((function(range) {
            var startRowIndex = range.masterCell.fullAddress.row;
            var startColumnIndex = range.masterCell.fullAddress.col;
            var endRowIndex = startRowIndex + range.rowspan;
            var endColumnIndex = startColumnIndex + range.colspan;
            _this.worksheet.mergeCells(startRowIndex, startColumnIndex, endRowIndex, endColumnIndex)
        }))
    };
    return MergedRangesManager
}();
exports.MergedRangesManager = MergedRangesManager;
