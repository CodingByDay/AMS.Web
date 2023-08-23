/**
 * DevExtreme (cjs/renovation/ui/scheduler/workspaces/base/utils.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.isCellAllDay = exports.getTotalRowCount = exports.getTotalCellCount = exports.getSelectedCells = exports.getRowCountWithAllDayRow = exports.getHiddenInterval = exports.getDateTableWidth = exports.getDateForHeaderText = exports.getCellIndices = exports.createVirtualScrollingOptions = exports.createCellElementMetaData = exports.compareCellsByDateAndIndex = exports.DATE_TABLE_MIN_CELL_WIDTH = void 0;
var _date = _interopRequireDefault(require("../../../../../core/utils/date"));
var _utils = require("../../../../../ui/scheduler/resources/utils");
var _utils2 = require("../utils");
var _const = require("../const");

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
var DAY_MS = _date.default.dateToMilliseconds("day");
var HOUR_MS = _date.default.dateToMilliseconds("hour");
var DATE_TABLE_MIN_CELL_WIDTH = 75;
exports.DATE_TABLE_MIN_CELL_WIDTH = DATE_TABLE_MIN_CELL_WIDTH;
var getTotalRowCount = function(rowCount, groupOrientation, groups, isAllDayPanelVisible) {
    var isVerticalGrouping = (0, _utils2.isVerticalGroupingApplied)(groups, groupOrientation);
    var groupCount = (0, _utils.getGroupCount)(groups);
    var totalRowCount = isVerticalGrouping ? rowCount * groupCount : rowCount;
    return isAllDayPanelVisible ? totalRowCount + groupCount : totalRowCount
};
exports.getTotalRowCount = getTotalRowCount;
var getTotalCellCount = function(cellCount, groupOrientation, groups) {
    var isHorizontalGrouping = (0, _utils2.isHorizontalGroupingApplied)(groups, groupOrientation);
    var groupCount = (0, _utils.getGroupCount)(groups);
    return isHorizontalGrouping ? cellCount * groupCount : cellCount
};
exports.getTotalCellCount = getTotalCellCount;
var getRowCountWithAllDayRow = function(rowCount, isAllDayPanelVisible) {
    return isAllDayPanelVisible ? rowCount + 1 : rowCount
};
exports.getRowCountWithAllDayRow = getRowCountWithAllDayRow;
var getHiddenInterval = function(hoursInterval, cellCountInDay) {
    var visibleInterval = hoursInterval * cellCountInDay * HOUR_MS;
    return DAY_MS - visibleInterval
};
exports.getHiddenInterval = getHiddenInterval;
var createCellElementMetaData = function(tableRect, cellRect) {
    var bottom = cellRect.bottom,
        height = cellRect.height,
        left = cellRect.left,
        right = cellRect.right,
        top = cellRect.top,
        width = cellRect.width,
        x = cellRect.x,
        y = cellRect.y;
    return {
        right: right,
        bottom: bottom,
        left: left - tableRect.left,
        top: top - tableRect.top,
        width: width,
        height: height,
        x: x,
        y: y
    }
};
exports.createCellElementMetaData = createCellElementMetaData;
var getDateForHeaderText = function(_, date) {
    return date
};
exports.getDateForHeaderText = getDateForHeaderText;
var getDateTableWidth = function(scrollableWidth, dateTable, viewDataProvider, workSpaceConfig) {
    var dateTableCell = dateTable.querySelector("td:not(.dx-scheduler-virtual-cell)");
    var cellWidth = dateTableCell.getBoundingClientRect().width;
    if (cellWidth < DATE_TABLE_MIN_CELL_WIDTH) {
        cellWidth = DATE_TABLE_MIN_CELL_WIDTH
    }
    var cellCount = viewDataProvider.getCellCount(workSpaceConfig);
    var totalCellCount = getTotalCellCount(cellCount, workSpaceConfig.groupOrientation, workSpaceConfig.groups);
    var minTablesWidth = totalCellCount * cellWidth;
    return scrollableWidth < minTablesWidth ? minTablesWidth : scrollableWidth
};
exports.getDateTableWidth = getDateTableWidth;
var createVirtualScrollingOptions = function(options) {
    return {
        getCellHeight: function() {
            return options.cellHeight
        },
        getCellWidth: function() {
            return options.cellWidth
        },
        getCellMinWidth: function() {
            return DATE_TABLE_MIN_CELL_WIDTH
        },
        isRTL: function() {
            return options.rtlEnabled
        },
        getSchedulerHeight: function() {
            return options.schedulerHeight
        },
        getSchedulerWidth: function() {
            return options.schedulerWidth
        },
        getViewHeight: function() {
            return options.viewHeight
        },
        getViewWidth: function() {
            return options.viewWidth
        },
        getScrolling: function() {
            return options.scrolling
        },
        getScrollableOuterWidth: function() {
            return options.scrollableWidth
        },
        getGroupCount: function() {
            return (0, _utils.getGroupCount)(options.groups)
        },
        isVerticalGrouping: function() {
            return options.isVerticalGrouping
        },
        getTotalRowCount: function() {
            return options.completeRowCount
        },
        getTotalCellCount: function() {
            return options.completeColumnCount
        },
        getWindowHeight: function() {
            return options.windowHeight
        },
        getWindowWidth: function() {
            return options.windowWidth
        }
    }
};
exports.createVirtualScrollingOptions = createVirtualScrollingOptions;
var getCellIndices = function(cell) {
    var row = cell.closest(".".concat(_const.DATE_TABLE_ROW_CLASS, ", .").concat(_const.ALL_DAY_ROW_CLASS));
    var rowParent = row.parentNode;
    var cellParent = cell.parentNode;
    var columnIndex = _toConsumableArray(Array.from(cellParent.children)).filter((function(child) {
        return child.className.includes(_const.DATE_TABLE_CELL_CLASS) || child.className.includes(_const.ALL_DAY_PANEL_CELL_CLASS)
    })).indexOf(cell);
    var rowIndex = _toConsumableArray(Array.from(rowParent.children)).filter((function(child) {
        return child.className.includes(_const.DATE_TABLE_ROW_CLASS)
    })).indexOf(row);
    return {
        columnIndex: columnIndex,
        rowIndex: rowIndex
    }
};
exports.getCellIndices = getCellIndices;
var compareCellsByDateAndIndex = function(daysAndIndexes) {
    var date = daysAndIndexes.date,
        firstDate = daysAndIndexes.firstDate,
        firstIndex = daysAndIndexes.firstIndex,
        index = daysAndIndexes.index,
        lastDate = daysAndIndexes.lastDate,
        lastIndex = daysAndIndexes.lastIndex;
    if (firstDate === lastDate) {
        var validFirstIndex = firstIndex;
        var validLastIndex = lastIndex;
        if (validFirstIndex > validLastIndex) {
            var _ref = [validLastIndex, validFirstIndex];
            validFirstIndex = _ref[0];
            validLastIndex = _ref[1]
        }
        return firstDate === date && index >= validFirstIndex && index <= validLastIndex
    }
    return date === firstDate && index >= firstIndex || date === lastDate && index <= lastIndex || firstDate < date && date < lastDate
};
exports.compareCellsByDateAndIndex = compareCellsByDateAndIndex;
var filterCellsByDateAndIndex = function(cellsRow, filterData) {
    var firstDate = filterData.firstDate,
        firstIndex = filterData.firstIndex,
        lastDate = filterData.lastDate,
        lastIndex = filterData.lastIndex;
    var firstDay = _date.default.trimTime(firstDate).getTime();
    var lastDay = _date.default.trimTime(lastDate).getTime();
    return cellsRow.filter((function(cell) {
        var index = cell.index,
            startDate = cell.startDate;
        var day = _date.default.trimTime(startDate).getTime();
        var daysAndIndexes = {
            date: day,
            index: index,
            firstDate: firstDay,
            firstIndex: firstIndex,
            lastDate: lastDay,
            lastIndex: lastIndex
        };
        return compareCellsByDateAndIndex(daysAndIndexes)
    }))
};
var getSelectedCells = function(viewDataProvider, firstSelectedCell, lastSelectedCell, isLastSelectedCellAllDay) {
    var firstCell = firstSelectedCell;
    var lastCell = lastSelectedCell;
    if (firstCell.startDate.getTime() > lastCell.startDate.getTime()) {
        var _ref2 = [lastCell, firstCell];
        firstCell = _ref2[0];
        lastCell = _ref2[1]
    }
    var _firstCell = firstCell,
        firstGroupIndex = _firstCell.groupIndex,
        firstCellIndex = _firstCell.index,
        firstStartDate = _firstCell.startDate;
    var _lastCell = lastCell,
        lastCellIndex = _lastCell.index,
        lastStartDate = _lastCell.startDate;
    var cells = viewDataProvider.getCellsByGroupIndexAndAllDay(null !== firstGroupIndex && void 0 !== firstGroupIndex ? firstGroupIndex : 0, isLastSelectedCellAllDay);
    var filteredCells = cells.reduce((function(selectedCells, cellsRow) {
        var filterData = {
            firstDate: firstStartDate,
            lastDate: lastStartDate,
            firstIndex: firstCellIndex,
            lastIndex: lastCellIndex
        };
        var filteredRow = filterCellsByDateAndIndex(cellsRow, filterData);
        selectedCells.push.apply(selectedCells, _toConsumableArray(filteredRow));
        return selectedCells
    }), []);
    var selectedCells = filteredCells.sort((function(firstArg, secondArg) {
        return firstArg.startDate.getTime() - secondArg.startDate.getTime()
    }));
    return selectedCells
};
exports.getSelectedCells = getSelectedCells;
var isCellAllDay = function(cell) {
    return cell.className.includes(_const.ALL_DAY_PANEL_CELL_CLASS)
};
exports.isCellAllDay = isCellAllDay;
