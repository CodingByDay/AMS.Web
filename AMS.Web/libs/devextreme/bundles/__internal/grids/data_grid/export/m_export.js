/**
 * DevExtreme (bundles/__internal/grids/data_grid/export/m_export.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ExportController = exports.DataProvider = void 0;
require("../../../../ui/button");
require("../../../../ui/drop_down_button");
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _deferred = require("../../../../core/utils/deferred");
var _extend = require("../../../../core/utils/extend");
var _position = require("../../../../core/utils/position");
var _string = require("../../../../core/utils/string");
var _type = require("../../../../core/utils/type");
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _list_light = _interopRequireDefault(require("../../../../ui/list_light"));
var _m_export = require("../../../grids/grid_core/m_export");
var _m_core = _interopRequireDefault(require("../m_core"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    };
    return _extends.apply(this, arguments)
}

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) {
        return
    }
    if ("string" === typeof o) {
        return _arrayLikeToArray(o, minLen)
    }
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if ("Object" === n && o.constructor) {
        n = o.constructor.name
    }
    if ("Map" === n || "Set" === n) {
        return Array.from(o)
    }
    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
        return _arrayLikeToArray(o, minLen)
    }
}

function _iterableToArray(iter) {
    if ("undefined" !== typeof Symbol && null != iter[Symbol.iterator] || null != iter["@@iterator"]) {
        return Array.from(iter)
    }
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        return _arrayLikeToArray(arr)
    }
}

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
}
var DATAGRID_EXPORT_MENU_CLASS = "dx-datagrid-export-menu";
var DATAGRID_EXPORT_BUTTON_CLASS = "dx-datagrid-export-button";
var DATAGRID_EXPORT_TOOLBAR_BUTTON_NAME = "exportButton";
var DATAGRID_EXPORT_ICON = "export";
var DATAGRID_EXPORT_EXCEL_ICON = "xlsxfile";
var DATAGRID_EXPORT_SELECTED_ICON = "exportselected";
var DATAGRID_PDF_EXPORT_ICON = "pdffile";
var DataProvider = function() {
    function DataProvider(exportController, initialColumnWidthsByColumnIndex, selectedRowsOnly) {
        this._exportController = exportController;
        this._initialColumnWidthsByColumnIndex = initialColumnWidthsByColumnIndex;
        this._selectedRowsOnly = selectedRowsOnly
    }
    var _proto = DataProvider.prototype;
    _proto._getGroupValue = function(item) {
        var key = item.key,
            data = item.data,
            rowType = item.rowType,
            groupIndex = item.groupIndex,
            summaryCells = item.summaryCells;
        var groupColumn = this._options.groupColumns[groupIndex];
        var value = _m_core.default.getDisplayValue(groupColumn, groupColumn.deserializeValue ? groupColumn.deserializeValue(key[groupIndex]) : key[groupIndex], data, rowType);
        var result = "".concat(groupColumn.caption, ": ").concat(_m_core.default.formatValue(value, groupColumn));
        if (summaryCells && summaryCells[0] && summaryCells[0].length) {
            result += " ".concat(_m_core.default.getGroupRowSummaryText(summaryCells[0], this._options.summaryTexts))
        }
        return result
    };
    _proto._correctCellIndex = function(cellIndex) {
        return cellIndex
    };
    _proto._initOptions = function() {
        var exportController = this._exportController;
        var groupColumns = exportController._columnsController.getGroupColumns();
        this._options = {
            columns: exportController._getColumns(this._initialColumnWidthsByColumnIndex),
            groupColumns: groupColumns,
            items: this._selectedRowsOnly || exportController._selectionOnly ? exportController._getSelectedItems() : exportController._getAllItems(),
            isHeadersVisible: exportController.option("showColumnHeaders"),
            summaryTexts: exportController.option("summary.texts"),
            rtlEnabled: exportController.option("rtlEnabled")
        }
    };
    _proto.getHeaderStyles = function() {
        return [{
            bold: true,
            alignment: "center"
        }, {
            bold: true,
            alignment: "left"
        }, {
            bold: true,
            alignment: "right"
        }]
    };
    _proto.getGroupRowStyle = function() {
        return {
            bold: true,
            alignment: (0, _position.getDefaultAlignment)(this._options.rtlEnabled)
        }
    };
    _proto.getColumnStyles = function() {
        var columnStyles = [];
        this.getColumns().forEach((function(column) {
            columnStyles.push({
                alignment: column.alignment || "left",
                format: column.format,
                dataType: column.dataType
            })
        }));
        return columnStyles
    };
    _proto.getStyles = function() {
        return [].concat(_toConsumableArray(this.getHeaderStyles()), _toConsumableArray(this.getColumnStyles()), [this.getGroupRowStyle()])
    };
    _proto._getTotalCellStyleId = function(cellIndex) {
        var _a;
        var alignment = (null === (_a = this.getColumns()[cellIndex]) || void 0 === _a ? void 0 : _a.alignment) || "right";
        return this.getHeaderStyles().map((function(style) {
            return style.alignment
        })).indexOf(alignment)
    };
    _proto.getStyleId = function(rowIndex, cellIndex) {
        if (rowIndex < this.getHeaderRowCount()) {
            return 0
        }
        if (this.isTotalCell(rowIndex - this.getHeaderRowCount(), cellIndex)) {
            return this._getTotalCellStyleId(cellIndex)
        }
        if (this.isGroupRow(rowIndex - this.getHeaderRowCount())) {
            return this.getHeaderStyles().length + this.getColumns().length
        }
        return cellIndex + this.getHeaderStyles().length
    };
    _proto.getColumns = function(getColumnsByAllRows) {
        var columns = this._options.columns;
        return getColumnsByAllRows ? columns : columns[columns.length - 1]
    };
    _proto.getColumnsWidths = function() {
        var columns = this.getColumns();
        return (0, _type.isDefined)(columns) ? columns.map((function(c) {
            return c.width
        })) : void 0
    };
    _proto.getRowsCount = function() {
        return this._options.items.length + this.getHeaderRowCount()
    };
    _proto.getHeaderRowCount = function() {
        if (this.isHeadersVisible()) {
            return this._options.columns.length - 1
        }
        return 0
    };
    _proto.isGroupRow = function(rowIndex) {
        return rowIndex < this._options.items.length && "group" === this._options.items[rowIndex].rowType
    };
    _proto.getGroupLevel = function(rowIndex) {
        var item = this._options.items[rowIndex - this.getHeaderRowCount()];
        var groupIndex = item && item.groupIndex;
        if (item && "totalFooter" === item.rowType) {
            return 0
        }
        return (0, _type.isDefined)(groupIndex) ? groupIndex : this._options.groupColumns.length
    };
    _proto.getCellType = function(rowIndex, cellIndex) {
        var columns = this.getColumns();
        if (rowIndex < this.getHeaderRowCount()) {
            return "string"
        }
        rowIndex -= this.getHeaderRowCount();
        if (cellIndex < columns.length) {
            var item = this._options.items.length && this._options.items[rowIndex];
            var column = columns[cellIndex];
            if (item && "data" === item.rowType) {
                if (isFinite(item.values[this._correctCellIndex(cellIndex)]) && !(0, _type.isDefined)(column.customizeText)) {
                    return (0, _type.isDefined)(column.lookup) ? column.lookup.dataType : column.dataType
                }
            }
            return "string"
        }
    };
    _proto.ready = function() {
        this._initOptions();
        var options = this._options;
        return (0, _deferred.when)(options.items).done((function(items) {
            options.items = items
        })).fail((function() {
            options.items = []
        }))
    };
    _proto._convertFromGridGroupSummaryItems = function(gridGroupSummaryItems) {
        if ((0, _type.isDefined)(gridGroupSummaryItems) && gridGroupSummaryItems.length > 0) {
            return gridGroupSummaryItems.map((function(item) {
                return {
                    value: item.value,
                    name: item.name
                }
            }))
        }
    };
    _proto.getCellData = function(rowIndex, cellIndex, isExcelJS) {
        var value;
        var column;
        var result = {
            cellSourceData: {},
            value: value
        };
        var columns = this.getColumns();
        var correctedCellIndex = this._correctCellIndex(cellIndex);
        if (rowIndex < this.getHeaderRowCount()) {
            var columnsRow = this.getColumns(true)[rowIndex];
            column = columnsRow[cellIndex];
            result.cellSourceData.rowType = "header";
            result.cellSourceData.column = column && column.gridColumn;
            result.value = column && column.caption
        } else {
            rowIndex -= this.getHeaderRowCount();
            var item = this._options.items.length && this._options.items[rowIndex];
            if (item) {
                var itemValues = item.values;
                result.cellSourceData.rowType = item.rowType;
                result.cellSourceData.column = columns[cellIndex] && columns[cellIndex].gridColumn;
                switch (item.rowType) {
                    case "groupFooter":
                    case "totalFooter":
                        if (correctedCellIndex < itemValues.length) {
                            value = itemValues[correctedCellIndex];
                            if ((0, _type.isDefined)(value)) {
                                result.cellSourceData.value = value.value;
                                result.cellSourceData.totalSummaryItemName = value.name;
                                result.value = _m_core.default.getSummaryText(value, this._options.summaryTexts)
                            } else {
                                result.cellSourceData.value = void 0
                            }
                        }
                        break;
                    case "group":
                        result.cellSourceData.groupIndex = item.groupIndex;
                        if (cellIndex < 1) {
                            result.cellSourceData.column = this._options.groupColumns[item.groupIndex];
                            result.cellSourceData.value = item.key[item.groupIndex];
                            result.cellSourceData.groupSummaryItems = this._convertFromGridGroupSummaryItems(item.summaryCells[0]);
                            result.value = this._getGroupValue(item)
                        } else {
                            var summaryItems = item.values[correctedCellIndex];
                            if (Array.isArray(summaryItems)) {
                                result.cellSourceData.groupSummaryItems = this._convertFromGridGroupSummaryItems(summaryItems);
                                value = "";
                                for (var i = 0; i < summaryItems.length; i++) {
                                    value += (i > 0 ? isExcelJS ? "\n" : " \n " : "") + _m_core.default.getSummaryText(summaryItems[i], this._options.summaryTexts)
                                }
                                result.value = value
                            } else {
                                result.cellSourceData.value = void 0
                            }
                        }
                        break;
                    default:
                        column = columns[cellIndex];
                        if (column) {
                            var _value = itemValues[correctedCellIndex];
                            var displayValue = _m_core.default.getDisplayValue(column, _value, item.data, item.rowType);
                            if (!isFinite(displayValue) || (0, _type.isDefined)(column.customizeText)) {
                                if (isExcelJS && (0, _type.isDefined)(column.customizeText) && column.customizeText === this._exportController._columnsController.getCustomizeTextByDataType("boolean")) {
                                    result.value = displayValue
                                } else {
                                    result.value = _m_core.default.formatValue(displayValue, column)
                                }
                            } else {
                                result.value = displayValue
                            }
                            result.cellSourceData.value = _value
                        }
                        result.cellSourceData.data = item.data
                }
            }
        }
        return result
    };
    _proto.isHeadersVisible = function() {
        return this._options.isHeadersVisible
    };
    _proto.isTotalCell = function(rowIndex, cellIndex) {
        var items = this._options.items;
        var item = items[rowIndex];
        var correctCellIndex = this._correctCellIndex(cellIndex);
        var isSummaryAlignByColumn = item.summaryCells && item.summaryCells[correctCellIndex] && item.summaryCells[correctCellIndex].length > 0 && item.summaryCells[correctCellIndex][0].alignByColumn;
        return item && "groupFooter" === item.rowType || "totalFooter" === item.rowType || isSummaryAlignByColumn
    };
    _proto.getCellMerging = function(rowIndex, cellIndex) {
        var columns = this._options.columns;
        var column = columns[rowIndex] && columns[rowIndex][cellIndex];
        return column ? {
            colspan: (column.exportColspan || 1) - 1,
            rowspan: (column.rowspan || 1) - 1
        } : {
            colspan: 0,
            rowspan: 0
        }
    };
    _proto.getFrozenArea = function() {
        return {
            x: 0,
            y: this.getHeaderRowCount()
        }
    };
    return DataProvider
}();
exports.DataProvider = DataProvider;
var ExportController = function(_dataGridCore$ViewCon) {
    _inheritsLoose(ExportController, _dataGridCore$ViewCon);

    function ExportController() {
        return _dataGridCore$ViewCon.apply(this, arguments) || this
    }
    var _proto2 = ExportController.prototype;
    _proto2._getEmptyCell = function() {
        return {
            caption: "",
            colspan: 1,
            rowspan: 1
        }
    };
    _proto2._updateColumnWidth = function(column, width) {
        column.width = width
    };
    _proto2._getColumns = function(initialColumnWidthsByColumnIndex) {
        var result = [];
        var i;
        var columns;
        var columnsController = this._columnsController;
        var rowCount = columnsController.getRowCount();
        for (i = 0; i <= rowCount; i++) {
            var currentHeaderRow = [];
            columns = columnsController.getVisibleColumns(i, true);
            var columnWidthsByColumnIndex = void 0;
            if (i === rowCount) {
                if (this._updateLockCount) {
                    columnWidthsByColumnIndex = initialColumnWidthsByColumnIndex
                } else {
                    var columnWidths = this._getColumnWidths(this._headersView, this._rowsView);
                    if (columnWidths && columnWidths.length) {
                        columnWidthsByColumnIndex = {};
                        for (var _i = 0; _i < columns.length; _i++) {
                            columnWidthsByColumnIndex[columns[_i].index] = columnWidths[_i]
                        }
                    }
                }
            }
            for (var j = 0; j < columns.length; j++) {
                var column = (0, _extend.extend)({}, columns[j], {
                    dataType: "datetime" === columns[j].dataType ? "date" : columns[j].dataType,
                    gridColumn: columns[j]
                });
                if (this._needColumnExporting(column)) {
                    var currentColspan = this._calculateExportColspan(column);
                    if ((0, _type.isDefined)(currentColspan)) {
                        column.exportColspan = currentColspan
                    }
                    if (columnWidthsByColumnIndex) {
                        this._updateColumnWidth(column, columnWidthsByColumnIndex[column.index])
                    }
                    currentHeaderRow.push(column)
                }
            }
            result.push(currentHeaderRow)
        }
        columns = result[rowCount];
        result = (0, _m_export.prepareItems)(result.slice(0, -1), this._getEmptyCell());
        result.push(columns);
        return result
    };
    _proto2._calculateExportColspan = function(column) {
        var _this = this;
        if (!column.isBand) {
            return
        }
        var childColumns = this._columnsController.getChildrenByBandColumn(column.index, true);
        if (!(0, _type.isDefined)(childColumns)) {
            return
        }
        return childColumns.reduce((function(result, childColumn) {
            if (_this._needColumnExporting(childColumn)) {
                return result + (_this._calculateExportColspan(childColumn) || 1)
            }
            return result
        }), 0)
    };
    _proto2._needColumnExporting = function(column) {
        return !column.command && (column.allowExporting || void 0 === column.allowExporting)
    };
    _proto2._getFooterSummaryItems = function(summaryCells, isTotal) {
        var result = [];
        var estimatedItemsCount = 1;
        var i = 0;
        do {
            var values = [];
            for (var j = 0; j < summaryCells.length; j++) {
                var summaryCell = summaryCells[j];
                var itemsLength = summaryCell.length;
                if (estimatedItemsCount < itemsLength) {
                    estimatedItemsCount = itemsLength
                }
                values.push(summaryCell[i])
            }
            result.push({
                values: values,
                rowType: isTotal ? "totalFooter" : "groupFooter"
            })
        } while (i++ < estimatedItemsCount - 1);
        return result
    };
    _proto2._hasSummaryGroupFooters = function() {
        var groupItems = this.option("summary.groupItems");
        if ((0, _type.isDefined)(groupItems)) {
            for (var i = 0; i < groupItems.length; i++) {
                if (groupItems[i].showInGroupFooter) {
                    return true
                }
            }
        }
        return false
    };
    _proto2._getItemsWithSummaryGroupFooters = function(sourceItems) {
        var result = [];
        var beforeGroupFooterItems = [];
        var groupFooterItems = [];
        for (var i = 0; i < sourceItems.length; i++) {
            var item = sourceItems[i];
            if ("groupFooter" === item.rowType) {
                groupFooterItems = this._getFooterSummaryItems(item.summaryCells);
                result = result.concat(beforeGroupFooterItems, groupFooterItems);
                beforeGroupFooterItems = []
            } else {
                beforeGroupFooterItems.push(item)
            }
        }
        return result.length ? result : beforeGroupFooterItems
    };
    _proto2._updateGroupValuesWithSummaryByColumn = function(sourceItems) {
        var summaryValues = [];
        for (var i = 0; i < sourceItems.length; i++) {
            var item = sourceItems[i];
            var summaryCells = item.summaryCells;
            if ("group" === item.rowType && summaryCells && summaryCells.length > 1) {
                var groupColumnCount = item.values.length;
                for (var j = 1; j < summaryCells.length; j++) {
                    for (var k = 0; k < summaryCells[j].length; k++) {
                        var summaryItem = summaryCells[j][k];
                        if (summaryItem && summaryItem.alignByColumn) {
                            if (!Array.isArray(summaryValues[j - groupColumnCount])) {
                                summaryValues[j - groupColumnCount] = []
                            }
                            summaryValues[j - groupColumnCount].push(summaryItem)
                        }
                    }
                }
                if (summaryValues.length > 0) {
                    var _item$values;
                    (_item$values = item.values).push.apply(_item$values, _toConsumableArray(summaryValues));
                    summaryValues = []
                }
            }
        }
    };
    _proto2._processUnExportedItems = function(items) {
        var columns = this._columnsController.getVisibleColumns(null, true);
        var groupColumns = this._columnsController.getGroupColumns();
        var values;
        var summaryCells;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var isCommand = false;
            values = [];
            summaryCells = [];
            for (var j = 0; j < columns.length; j++) {
                var column = columns[j];
                isCommand || (isCommand = ["detailExpand", "buttons"].includes(column.type));
                if (this._needColumnExporting(column)) {
                    if (item.values) {
                        if ("group" === item.rowType && !values.length) {
                            values.push(item.key[item.groupIndex])
                        } else {
                            values.push(item.values[j])
                        }
                    }
                    if (item.summaryCells) {
                        if ("group" === item.rowType && !summaryCells.length) {
                            var index = j - groupColumns.length + item.groupIndex;
                            summaryCells.push(item.summaryCells[isCommand ? index : index + 1])
                        } else {
                            summaryCells.push(item.summaryCells[j])
                        }
                    }
                }
            }
            if (values.length) {
                item.values = values
            }
            if (summaryCells.length) {
                item.summaryCells = summaryCells
            }
        }
    };
    _proto2._getAllItems = function(data) {
        var skipFilter = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : false;
        var that = this;
        var d = new _deferred.Deferred;
        var dataController = this.getController("data");
        var footerItems = dataController.footerItems();
        var totalItem = footerItems.length && footerItems[0];
        var summaryTotalItems = that.option("summary.totalItems");
        var summaryCells;
        (0, _deferred.when)(data).done((function(data) {
            dataController.loadAll(data, skipFilter).done((function(sourceItems, totalAggregates) {
                that._updateGroupValuesWithSummaryByColumn(sourceItems);
                if (that._hasSummaryGroupFooters()) {
                    sourceItems = that._getItemsWithSummaryGroupFooters(sourceItems)
                }
                summaryCells = totalItem && totalItem.summaryCells;
                if ((0, _type.isDefined)(totalAggregates) && summaryTotalItems) {
                    summaryCells = that._getSummaryCells(summaryTotalItems, totalAggregates)
                }
                var summaryItems = totalItem && that._getFooterSummaryItems(summaryCells, true);
                if (summaryItems) {
                    sourceItems = sourceItems.concat(summaryItems)
                }
                that._processUnExportedItems(sourceItems);
                d.resolve(sourceItems)
            })).fail(d.reject)
        })).fail(d.reject);
        return d
    };
    _proto2._getSummaryCells = function(summaryTotalItems, totalAggregates) {
        var dataController = this.getController("data");
        var columnsController = dataController._columnsController;
        return dataController._calculateSummaryCells(summaryTotalItems, totalAggregates, columnsController.getVisibleColumns(null, true), (function(summaryItem, column) {
            return dataController._isDataColumn(column) ? column.index : -1
        }))
    };
    _proto2._getSelectedItems = function() {
        var selectionController = this.getController("selection");
        if (this.needLoadItemsOnExportingSelectedItems()) {
            return this._getAllItems(selectionController.loadSelectedItemsWithFilter(), true)
        }
        return this._getAllItems(selectionController.getSelectedRowsData())
    };
    _proto2._getColumnWidths = function(headersView, rowsView) {
        return headersView && headersView.isVisible() ? headersView.getColumnWidths() : rowsView.getColumnWidths()
    };
    _proto2.init = function() {
        this._columnsController = this.getController("columns");
        this._rowsView = this.getView("rowsView");
        this._headersView = this.getView("columnHeadersView");
        this.createAction("onExporting", {
            excludeValidators: ["disabled", "readOnly"]
        })
    };
    _proto2.callbackNames = function() {
        return ["selectionOnlyChanged"]
    };
    _proto2.getDataProvider = function(selectedRowsOnly) {
        var columnWidths = this._getColumnWidths(this._headersView, this._rowsView);
        var initialColumnWidthsByColumnIndex;
        if (columnWidths && columnWidths.length) {
            initialColumnWidthsByColumnIndex = {};
            var columnsLastRowVisibleColumns = this._columnsController.getVisibleColumns(this._columnsController.getRowCount(), true);
            for (var i = 0; i < columnsLastRowVisibleColumns.length; i++) {
                initialColumnWidthsByColumnIndex[columnsLastRowVisibleColumns[i].index] = columnWidths[i]
            }
        }
        return new DataProvider(this, initialColumnWidthsByColumnIndex, selectedRowsOnly)
    };
    _proto2.exportTo = function(selectedRowsOnly, format) {
        this._selectionOnly = selectedRowsOnly;
        var onExporting = this.getAction("onExporting");
        var eventArgs = {
            rtlEnabled: this.option("rtlEnabled"),
            selectedRowsOnly: !!selectedRowsOnly,
            format: format,
            fileName: "DataGrid",
            cancel: false
        };
        (0, _type.isFunction)(onExporting) && onExporting(eventArgs)
    };
    _proto2.publicMethods = function() {
        return ["getDataProvider"]
    };
    _proto2.selectionOnly = function(value) {
        if ((0, _type.isDefined)(value)) {
            this._isSelectedRows = value;
            this.selectionOnlyChanged.fire()
        } else {
            return this._isSelectedRows
        }
    };
    _proto2.needLoadItemsOnExportingSelectedItems = function() {
        var _a;
        return null !== (_a = this.option("loadItemsOnExportingSelectedItems")) && void 0 !== _a ? _a : this.getController("data")._dataSource.remoteOperations().filtering
    };
    return ExportController
}(_m_core.default.ViewController);
exports.ExportController = ExportController;
_m_core.default.registerModule("export", {
    defaultOptions: function() {
        return {
            export: {
                enabled: false,
                fileName: "DataGrid",
                formats: ["xlsx"],
                allowExportSelectedData: false,
                texts: {
                    exportTo: _message.default.format("dxDataGrid-exportTo"),
                    exportAll: _message.default.format("dxDataGrid-exportAll"),
                    exportSelectedRows: _message.default.format("dxDataGrid-exportSelectedRows")
                }
            }
        }
    },
    controllers: {
        export: ExportController
    },
    extenders: {
        controllers: {
            editing: {
                callbackNames: function() {
                    var callbackList = this.callBase();
                    return (0, _type.isDefined)(callbackList) ? callbackList.push("editingButtonsUpdated") : ["editingButtonsUpdated"]
                },
                _updateEditButtons: function() {
                    this.callBase();
                    this.editingButtonsUpdated.fire()
                }
            }
        },
        views: {
            headerPanel: {
                _getToolbarItems: function() {
                    var items = this.callBase();
                    var exportButton = this._getExportToolbarButton();
                    if (exportButton) {
                        items.push(exportButton);
                        this._correctItemsPosition(items)
                    }
                    return items
                },
                _getExportToolbarButton: function() {
                    var _this2 = this;
                    var items = this._getExportToolbarItems();
                    if (0 === items.length) {
                        return null
                    }
                    var disabled = this._needDisableExportButton();
                    var toolbarButtonOptions = {
                        name: DATAGRID_EXPORT_TOOLBAR_BUTTON_NAME,
                        location: "after",
                        locateInMenu: "auto",
                        sortIndex: 30,
                        options: {
                            items: items
                        },
                        disabled: disabled
                    };
                    if (1 === items.length) {
                        var widgetOptions = _extends(_extends({}, items[0]), {
                            hint: items[0].text,
                            elementAttr: {
                                class: DATAGRID_EXPORT_BUTTON_CLASS
                            }
                        });
                        toolbarButtonOptions.widget = "dxButton";
                        toolbarButtonOptions.showText = "inMenu";
                        toolbarButtonOptions.options = widgetOptions
                    } else {
                        var _widgetOptions = {
                            icon: DATAGRID_EXPORT_ICON,
                            displayExpr: "text",
                            items: items,
                            hint: this.option("export.texts.exportTo"),
                            elementAttr: {
                                class: DATAGRID_EXPORT_BUTTON_CLASS
                            },
                            dropDownOptions: {
                                width: "auto",
                                _wrapperClassExternal: DATAGRID_EXPORT_MENU_CLASS
                            }
                        };
                        toolbarButtonOptions.options = _widgetOptions;
                        toolbarButtonOptions.widget = "dxDropDownButton";
                        toolbarButtonOptions.menuItemTemplate = function(_data, _index, container) {
                            _this2._createComponent((0, _renderer.default)(container), _list_light.default, {
                                items: items
                            })
                        }
                    }
                    return toolbarButtonOptions
                },
                _getExportToolbarItems: function() {
                    var _this3 = this;
                    var _a;
                    var exportOptions = this.option("export");
                    var texts = this.option("export.texts");
                    var formats = null !== (_a = this.option("export.formats")) && void 0 !== _a ? _a : [];
                    if (!exportOptions.enabled) {
                        return []
                    }
                    var items = [];
                    formats.forEach((function(formatType) {
                        var formatName = formatType.toUpperCase();
                        var exportAllIcon = DATAGRID_EXPORT_ICON;
                        var exportSelectedIcon = DATAGRID_EXPORT_SELECTED_ICON;
                        if ("xlsx" === formatType) {
                            formatName = "Excel";
                            exportAllIcon = DATAGRID_EXPORT_EXCEL_ICON
                        }
                        if ("pdf" === formatType) {
                            exportAllIcon = DATAGRID_PDF_EXPORT_ICON
                        }
                        items.push({
                            text: (0, _string.format)(texts.exportAll, formatName),
                            icon: exportAllIcon,
                            onClick: function() {
                                _this3._exportController.exportTo(false, formatType)
                            }
                        });
                        if (exportOptions.allowExportSelectedData) {
                            items.push({
                                text: (0, _string.format)(texts.exportSelectedRows, formatName),
                                icon: exportSelectedIcon,
                                onClick: function() {
                                    _this3._exportController.exportTo(true, formatType)
                                }
                            })
                        }
                    }));
                    return items
                },
                _correctItemsPosition: function(items) {
                    items.sort((function(itemA, itemB) {
                        return itemA.sortIndex - itemB.sortIndex
                    }))
                },
                _isExportButtonVisible: function() {
                    return this.option("export.enabled")
                },
                optionChanged: function(args) {
                    this.callBase(args);
                    if ("export" === args.name) {
                        args.handled = true;
                        this._invalidate()
                    }
                },
                _needDisableExportButton: function() {
                    var isDataColumnsInvisible = !this._columnsController.hasVisibleDataColumns();
                    var hasUnsavedChanges = this._editingController.hasChanges();
                    return isDataColumnsInvisible || hasUnsavedChanges
                },
                _columnOptionChanged: function(e) {
                    this.callBase(e);
                    var isColumnLocationChanged = _m_core.default.checkChanges(e.optionNames, ["groupIndex", "visible", "all"]);
                    if (isColumnLocationChanged) {
                        var disabled = this._needDisableExportButton();
                        this.setToolbarItemDisabled("exportButton", disabled)
                    }
                },
                init: function() {
                    var _this4 = this;
                    this.callBase();
                    this._exportController = this.getController("export");
                    this._editingController = this.getController("editing");
                    this._editingController.editingButtonsUpdated.add((function() {
                        var disabled = _this4._needDisableExportButton();
                        _this4.setToolbarItemDisabled("exportButton", disabled)
                    }))
                },
                isVisible: function() {
                    return this.callBase() || this._isExportButtonVisible()
                }
            }
        }
    }
});
