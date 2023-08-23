/**
 * DevExtreme (cjs/__internal/grids/pivot_grid/export/m_export.js)
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
exports.default = exports.PivotGridExport = exports.ExportController = exports.DataProvider = void 0;
var _class = _interopRequireDefault(require("../../../../core/class"));
var _deferred = require("../../../../core/utils/deferred");
var _extend = require("../../../../core/utils/extend");
var _iterator = require("../../../../core/utils/iterator");
var _position = require("../../../../core/utils/position");
var _type = require("../../../../core/utils/type");
var _window = require("../../../../core/utils/window");
var _format_helper = _interopRequireDefault(require("../../../../format_helper"));
var _number = _interopRequireDefault(require("../../../../localization/number"));
var _m_export = require("../../../grids/grid_core/m_export");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
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
var DEFAULT_DATA_TYPE = "string";
var DEFAUL_COLUMN_WIDTH = 100;
var ExportController = {
    exportTo: function() {
        var onExporting = this._createActionByOption("onExporting");
        var eventArgs = {
            rtlEnabled: this.option("rtlEnabled"),
            fileName: "PivotGrid",
            cancel: false
        };
        (0, _type.isFunction)(onExporting) && onExporting(eventArgs)
    },
    _getLength: function(items) {
        var i;
        var itemCount = items[0].length;
        var cellCount = 0;
        for (i = 0; i < itemCount; i += 1) {
            cellCount += items[0][i].colspan || 1
        }
        return cellCount
    },
    _correctCellsInfoItemLengths: function(cellsInfo, expectedLength) {
        for (var i = 0; i < cellsInfo.length; i += 1) {
            while (cellsInfo[i].length < expectedLength) {
                cellsInfo[i].push({})
            }
        }
        return cellsInfo
    },
    _calculateCellInfoItemLength: function(columnsRow) {
        var result = 0;
        for (var columnIndex = 0; columnIndex < columnsRow.length; columnIndex += 1) {
            result += (0, _type.isDefined)(columnsRow[columnIndex].colspan) ? columnsRow[columnIndex].colspan : 1
        }
        return result
    },
    _getEmptyCell: function() {
        return {
            text: "",
            value: void 0,
            colspan: 1,
            rowspan: 1
        }
    },
    _getAllItems: function(columnsInfo, rowsInfoItems, cellsInfo) {
        var cellIndex;
        var rowIndex;
        var correctedCellsInfo = cellsInfo;
        var rowsLength = this._getLength(rowsInfoItems);
        var headerRowsCount = columnsInfo.length;
        if (columnsInfo.length > 0 && columnsInfo[0].length > 0 && cellsInfo.length > 0 && 0 === cellsInfo[0].length) {
            var cellInfoItemLength = this._calculateCellInfoItemLength(columnsInfo[0]);
            if (cellInfoItemLength > 0) {
                correctedCellsInfo = this._correctCellsInfoItemLengths(cellsInfo, cellInfoItemLength)
            }
        }
        if (0 === correctedCellsInfo.length) {
            var rowsCount = rowsInfoItems.length;
            var collapsedColumnCount = columnsInfo.map((function(headerRowWithColumns) {
                return headerRowWithColumns.filter((function(row) {
                    return !row.expanded
                })).length
            })).reduce((function(result, collapsedCount) {
                return result + collapsedCount
            }), 0);
            for (var rowIdx = 0; rowIdx < rowsCount; rowIdx += 1) {
                correctedCellsInfo[rowIdx] = [];
                for (var colIdx = 0; colIdx < collapsedColumnCount; colIdx += 1) {
                    correctedCellsInfo[rowIdx][colIdx] = this._getEmptyCell()
                }
            }
        }
        var sourceItems = columnsInfo.concat(correctedCellsInfo);
        for (rowIndex = 0; rowIndex < rowsInfoItems.length; rowIndex += 1) {
            for (cellIndex = rowsInfoItems[rowIndex].length - 1; cellIndex >= 0; cellIndex -= 1) {
                if (!(0, _type.isDefined)(sourceItems[rowIndex + headerRowsCount])) {
                    sourceItems[rowIndex + headerRowsCount] = []
                }
                sourceItems[rowIndex + headerRowsCount].splice(0, 0, (0, _extend.extend)({}, rowsInfoItems[rowIndex][cellIndex]))
            }
        }
        sourceItems[0].splice(0, 0, (0, _extend.extend)({}, this._getEmptyCell(), {
            alignment: (0, _position.getDefaultAlignment)(this._options.rtlEnabled),
            colspan: rowsLength,
            rowspan: headerRowsCount
        }));
        return (0, _m_export.prepareItems)(sourceItems, this._getEmptyCell())
    },
    getDataProvider: function() {
        return new DataProvider(this)
    }
};
exports.ExportController = ExportController;
var DataProvider = _class.default.inherit({
    ctor: function(exportController) {
        this._exportController = exportController
    },
    ready: function() {
        this._initOptions();
        var options = this._options;
        return (0, _deferred.when)(options.items).done((function(items) {
            var headerSize = items[0][0].rowspan;
            var columns = items[headerSize - 1];
            (0, _iterator.each)(columns, (function(_, column) {
                column.width = DEFAUL_COLUMN_WIDTH
            }));
            options.columns = columns;
            options.items = items
        }))
    },
    _initOptions: function() {
        var exportController = this._exportController;
        var dataController = exportController._dataController;
        var items = new _deferred.Deferred;
        dataController.beginLoading();
        setTimeout((function() {
            var columnsInfo = (0, _extend.extend)(true, [], dataController.getColumnsInfo(true));
            var rowsInfoItems = (0, _extend.extend)(true, [], dataController.getRowsInfo(true));
            var cellsInfo = dataController.getCellsInfo(true);
            items.resolve(exportController._getAllItems(columnsInfo, rowsInfoItems, cellsInfo));
            dataController.endLoading()
        }));
        this._options = {
            items: items,
            rtlEnabled: exportController.option("rtlEnabled"),
            dataFields: exportController.getDataSource().getAreaFields("data"),
            rowsArea: exportController._rowsArea,
            columnsArea: exportController._columnsArea
        }
    },
    getColumns: function() {
        return this._options.columns
    },
    getColumnsWidths: function() {
        var colsArea = this._options.columnsArea;
        var rowsArea = this._options.rowsArea;
        var columns = this._options.columns;
        var useDefaultWidth = !(0, _window.hasWindow)() || "virtual" === colsArea.option("scrolling.mode") || colsArea.element().is(":hidden");
        return useDefaultWidth ? columns.map((function() {
            return DEFAUL_COLUMN_WIDTH
        })) : rowsArea.getColumnsWidth().concat(colsArea.getColumnsWidth())
    },
    getRowsCount: function() {
        return this._options.items.length
    },
    getGroupLevel: function() {
        return 0
    },
    getCellMerging: function(rowIndex, cellIndex) {
        var items = this._options.items;
        var item = items[rowIndex] && items[rowIndex][cellIndex];
        return item ? {
            colspan: item.colspan - 1,
            rowspan: item.rowspan - 1
        } : {
            colspan: 0,
            rowspan: 0
        }
    },
    getFrozenArea: function() {
        return {
            x: this.getRowAreaColCount(),
            y: this.getColumnAreaRowCount()
        }
    },
    getCellType: function(rowIndex, cellIndex) {
        var style = this.getStyles()[this.getStyleId(rowIndex, cellIndex)];
        return style && style.dataType || "string"
    },
    getCellData: function(rowIndex, cellIndex, isExcelJS) {
        var result = {};
        var items = this._options.items;
        var item = items[rowIndex] && items[rowIndex][cellIndex] || {};
        if (isExcelJS) {
            result.cellSourceData = item;
            var areaName = this._tryGetAreaName(item, rowIndex, cellIndex);
            if (areaName) {
                result.cellSourceData.area = areaName
            }
            result.cellSourceData.rowIndex = rowIndex;
            result.cellSourceData.columnIndex = cellIndex
        }
        if ("string" === this.getCellType(rowIndex, cellIndex)) {
            result.value = item.text
        } else {
            result.value = item.value
        }
        if (result.cellSourceData && result.cellSourceData.isWhiteSpace) {
            result.value = ""
        }
        return result
    },
    _tryGetAreaName: function(item, rowIndex, cellIndex) {
        if (this.isColumnAreaCell(rowIndex, cellIndex)) {
            return "column"
        }
        if (this.isRowAreaCell(rowIndex, cellIndex)) {
            return "row"
        }
        if ((0, _type.isDefined)(item.dataIndex)) {
            return "data"
        }
        return
    },
    isRowAreaCell: function(rowIndex, cellIndex) {
        return rowIndex >= this.getColumnAreaRowCount() && cellIndex < this.getRowAreaColCount()
    },
    isColumnAreaCell: function(rowIndex, cellIndex) {
        return cellIndex >= this.getRowAreaColCount() && rowIndex < this.getColumnAreaRowCount()
    },
    getColumnAreaRowCount: function() {
        return this._options.items[0][0].rowspan
    },
    getRowAreaColCount: function() {
        return this._options.items[0][0].colspan
    },
    getHeaderStyles: function() {
        return [{
            alignment: "center",
            dataType: "string"
        }, {
            alignment: (0, _position.getDefaultAlignment)(this._options.rtlEnabled),
            dataType: "string"
        }]
    },
    getDataFieldStyles: function() {
        var _this = this;
        var dataFields = this._options.dataFields;
        var dataItemStyle = {
            alignment: this._options.rtlEnabled ? "left" : "right"
        };
        var dataFieldStyles = [];
        if (dataFields.length) {
            dataFields.forEach((function(dataField) {
                dataFieldStyles.push(_extends(_extends({}, dataItemStyle), {
                    format: dataField.format,
                    dataType: _this.getCellDataType(dataField)
                }))
            }));
            return dataFieldStyles
        }
        return [dataItemStyle]
    },
    getStyles: function() {
        if (this._styles) {
            return this._styles
        }
        this._styles = [].concat(_toConsumableArray(this.getHeaderStyles()), _toConsumableArray(this.getDataFieldStyles()));
        return this._styles
    },
    getCellDataType: function(field) {
        if (field && field.customizeText) {
            return "string"
        }
        if (field.dataType) {
            return field.dataType
        }
        if (field.format) {
            if (1 === _number.default.parse(_format_helper.default.format(1, field.format))) {
                return "number"
            }
            if (_format_helper.default.format(new Date, field.format)) {
                return "date"
            }
        }
        return DEFAULT_DATA_TYPE
    },
    getStyleId: function(rowIndex, cellIndex) {
        var items = this._options.items;
        var item = items[rowIndex] && items[rowIndex][cellIndex] || {};
        if (0 === cellIndex && 0 === rowIndex || this.isColumnAreaCell(rowIndex, cellIndex)) {
            return 0
        }
        if (this.isRowAreaCell(rowIndex, cellIndex)) {
            return 1
        }
        return this.getHeaderStyles().length + (item.dataIndex || 0)
    }
});
exports.DataProvider = DataProvider;
var PivotGridExport = {
    DEFAUL_COLUMN_WIDTH: DEFAUL_COLUMN_WIDTH
};
exports.PivotGridExport = PivotGridExport;
var _default = {
    ExportController: ExportController,
    PivotGridExport: PivotGridExport,
    DataProvider: DataProvider
};
exports.default = _default;
