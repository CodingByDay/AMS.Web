/**
 * DevExtreme (cjs/__internal/grids/grid_core/columns_controller/m_columns_controller_utils.js)
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
exports.applyUserState = exports.addExpandColumn = void 0;
exports.assignColumns = assignColumns;
exports.isCustomCommandColumn = exports.isColumnFixed = exports.getValueDataType = exports.getSerializationFormat = exports.getRowCount = exports.getParentBandColumns = exports.getFixedPosition = exports.getDataColumns = exports.getCustomizeTextByDataType = exports.getColumnIndexByVisibleIndex = exports.getColumnFullPath = exports.getColumnByIndexes = exports.getChildrenByBandColumn = exports.getAlignmentByDataType = exports.fireOptionChanged = exports.fireColumnsChanged = exports.findColumn = exports.digitsCount = exports.defaultSetCellValue = exports.customizeTextForBooleanDataType = exports.createColumnsFromOptions = exports.createColumnsFromDataSource = exports.createColumn = exports.convertOwnerBandToColumnReference = exports.columnOptionCore = exports.calculateColspan = void 0;
exports.isSortOrderValid = isSortOrderValid;
exports.updateSortOrderWhenGrouping = exports.updateSerializers = exports.updateIndexes = exports.updateColumnVisibleIndexes = exports.updateColumnSortIndexes = exports.updateColumnIndexes = exports.updateColumnGroupIndexes = exports.updateColumnChanges = exports.strictParseNumber = exports.sortColumns = exports.setFilterOperationsAsDefaultValues = exports.resetColumnsCache = exports.resetBandColumnsCache = exports.processExpandColumns = exports.processBandColumns = exports.numberToString = exports.moveColumnToGroup = exports.mergeColumns = void 0;
var _array = require("../../../../core/utils/array");
var _common = require("../../../../core/utils/common");
var _data = require("../../../../core/utils/data");
var _date_serialization = _interopRequireDefault(require("../../../../core/utils/date_serialization"));
var _extend = require("../../../../core/utils/extend");
var _iterator = require("../../../../core/utils/iterator");
var _object = require("../../../../core/utils/object");
var _position = require("../../../../core/utils/position");
var _type = require("../../../../core/utils/type");
var _variable_wrapper = _interopRequireDefault(require("../../../../core/utils/variable_wrapper"));
var _number = _interopRequireDefault(require("../../../../localization/number"));
var _m_utils = _interopRequireDefault(require("../m_utils"));
var _const = require("./const");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var setFilterOperationsAsDefaultValues = function(column) {
    column.filterOperations = column.defaultFilterOperations
};
exports.setFilterOperationsAsDefaultValues = setFilterOperationsAsDefaultValues;
var globalColumnId = 1;
var createColumn = function(that, columnOptions, userStateColumnOptions, bandColumn) {
    var commonColumnOptions = {};
    if (columnOptions) {
        if ((0, _type.isString)(columnOptions)) {
            columnOptions = {
                dataField: columnOptions
            }
        }
        that.setName(columnOptions);
        var result = {};
        if (columnOptions.command) {
            result = (0, _object.deepExtendArraySafe)(commonColumnOptions, columnOptions)
        } else {
            commonColumnOptions = that.getCommonSettings(columnOptions);
            if (userStateColumnOptions && userStateColumnOptions.name && userStateColumnOptions.dataField) {
                columnOptions = (0, _extend.extend)({}, columnOptions, {
                    dataField: userStateColumnOptions.dataField
                })
            }
            var calculatedColumnOptions = that._createCalculatedColumnOptions(columnOptions, bandColumn);
            if (!columnOptions.type) {
                result = {
                    headerId: "dx-col-".concat(globalColumnId++)
                }
            }
            result = (0, _object.deepExtendArraySafe)(result, _const.DEFAULT_COLUMN_OPTIONS);
            (0, _object.deepExtendArraySafe)(result, commonColumnOptions);
            (0, _object.deepExtendArraySafe)(result, calculatedColumnOptions);
            (0, _object.deepExtendArraySafe)(result, columnOptions);
            (0, _object.deepExtendArraySafe)(result, {
                selector: null
            })
        }
        if (columnOptions.filterOperations === columnOptions.defaultFilterOperations) {
            setFilterOperationsAsDefaultValues(result)
        }
        return result
    }
};
exports.createColumn = createColumn;
var createColumnsFromOptions = function createColumnsFromOptions(that, columnsOptions, bandColumn) {
    var result = [];
    if (columnsOptions) {
        (0, _iterator.each)(columnsOptions, (function(index, columnOptions) {
            var userStateColumnOptions = that._columnsUserState && checkUserStateColumn(columnOptions, that._columnsUserState[index]) && that._columnsUserState[index];
            var column = createColumn(that, columnOptions, userStateColumnOptions, bandColumn);
            if (column) {
                if (bandColumn) {
                    column.ownerBand = bandColumn
                }
                result.push(column);
                if (column.columns) {
                    result = result.concat(createColumnsFromOptions(that, column.columns, column));
                    delete column.columns;
                    column.hasColumns = true
                }
            }
        }))
    }
    return result
};
exports.createColumnsFromOptions = createColumnsFromOptions;
var getParentBandColumns = function(columnIndex, columnParentByIndex) {
    var result = [];
    var parent = columnParentByIndex[columnIndex];
    while (parent) {
        result.unshift(parent);
        columnIndex = parent.index;
        parent = columnParentByIndex[columnIndex]
    }
    return result
};
exports.getParentBandColumns = getParentBandColumns;
var getChildrenByBandColumn = function getChildrenByBandColumn(columnIndex, columnChildrenByIndex, recursive) {
    var result = [];
    var children = columnChildrenByIndex[columnIndex];
    if (children) {
        for (var i = 0; i < children.length; i++) {
            var column = children[i];
            if (!(0, _type.isDefined)(column.groupIndex) || column.showWhenGrouped) {
                result.push(column);
                if (recursive && column.isBand) {
                    result = result.concat(getChildrenByBandColumn(column.index, columnChildrenByIndex, recursive))
                }
            }
        }
    }
    return result
};
exports.getChildrenByBandColumn = getChildrenByBandColumn;
var getColumnByIndexes = function(that, columnIndexes) {
    var result;
    var columns;
    var bandColumnsCache = that.getBandColumnsCache();
    var callbackFilter = function(column) {
        var ownerBand = result ? result.index : void 0;
        return column.ownerBand === ownerBand
    };
    if (bandColumnsCache.isPlain) {
        result = that._columns[columnIndexes[0]]
    } else {
        columns = that._columns.filter(callbackFilter);
        for (var i = 0; i < columnIndexes.length; i++) {
            result = columns[columnIndexes[i]];
            if (result) {
                columns = that._columns.filter(callbackFilter)
            }
        }
    }
    return result
};
exports.getColumnByIndexes = getColumnByIndexes;
var getColumnFullPath = function(that, column) {
    var result = [];
    var columns;
    var bandColumnsCache = that.getBandColumnsCache();
    var callbackFilter = function(item) {
        return item.ownerBand === column.ownerBand
    };
    if (bandColumnsCache.isPlain) {
        var columnIndex = that._columns.indexOf(column);
        if (columnIndex >= 0) {
            result = ["columns[".concat(columnIndex, "]")]
        }
    } else {
        columns = that._columns.filter(callbackFilter);
        while (columns.length && -1 !== columns.indexOf(column)) {
            result.unshift("columns[".concat(columns.indexOf(column), "]"));
            column = bandColumnsCache.columnParentByIndex[column.index];
            columns = column ? that._columns.filter(callbackFilter) : []
        }
    }
    return result.join(".")
};
exports.getColumnFullPath = getColumnFullPath;
var calculateColspan = function calculateColspan(that, columnID) {
    var colspan = 0;
    var columns = that.getChildrenByBandColumn(columnID, true);
    (0, _iterator.each)(columns, (function(_, column) {
        if (column.isBand) {
            column.colspan = column.colspan || calculateColspan(that, column.index);
            colspan += column.colspan || 1
        } else {
            colspan += 1
        }
    }));
    return colspan
};
exports.calculateColspan = calculateColspan;
var processBandColumns = function(that, columns, bandColumnsCache) {
    var rowspan;
    for (var i = 0; i < columns.length; i++) {
        var column = columns[i];
        if (column.visible || column.command) {
            if (column.isBand) {
                column.colspan = column.colspan || calculateColspan(that, column.index)
            }
            if (!column.isBand || !column.colspan) {
                rowspan = that.getRowCount();
                if (!column.command && (!(0, _type.isDefined)(column.groupIndex) || column.showWhenGrouped)) {
                    rowspan -= getParentBandColumns(column.index, bandColumnsCache.columnParentByIndex).length
                }
                if (rowspan > 1) {
                    column.rowspan = rowspan
                }
            }
        }
    }
};
exports.processBandColumns = processBandColumns;
var getValueDataType = function(value) {
    var dataType = (0, _type.type)(value);
    if ("string" !== dataType && "boolean" !== dataType && "number" !== dataType && "date" !== dataType && "object" !== dataType) {
        dataType = void 0
    }
    return dataType
};
exports.getValueDataType = getValueDataType;
var getSerializationFormat = function(dataType, value) {
    switch (dataType) {
        case "date":
        case "datetime":
            return _date_serialization.default.getDateSerializationFormat(value);
        case "number":
            if ((0, _type.isString)(value)) {
                return "string"
            }
            if ((0, _type.isNumeric)(value)) {
                return null
            }
    }
};
exports.getSerializationFormat = getSerializationFormat;
var updateSerializers = function(options, dataType) {
    if (!options.deserializeValue) {
        if (_m_utils.default.isDateType(dataType)) {
            options.deserializeValue = function(value) {
                return _date_serialization.default.deserializeDate(value)
            };
            options.serializeValue = function(value) {
                return (0, _type.isString)(value) ? value : _date_serialization.default.serializeDate(value, this.serializationFormat)
            }
        }
        if ("number" === dataType) {
            options.deserializeValue = function(value) {
                var parsedValue = parseFloat(value);
                return isNaN(parsedValue) ? value : parsedValue
            };
            options.serializeValue = function(value, target) {
                if ("filter" === target) {
                    return value
                }
                return (0, _type.isDefined)(value) && "string" === this.serializationFormat ? value.toString() : value
            }
        }
    }
};
exports.updateSerializers = updateSerializers;
var getAlignmentByDataType = function(dataType, isRTL) {
    switch (dataType) {
        case "number":
            return "right";
        case "boolean":
            return "center";
        default:
            return (0, _position.getDefaultAlignment)(isRTL)
    }
};
exports.getAlignmentByDataType = getAlignmentByDataType;
var customizeTextForBooleanDataType = function(e) {
    if (true === e.value) {
        return this.trueText || "true"
    }
    if (false === e.value) {
        return this.falseText || "false"
    }
    return e.valueText || ""
};
exports.customizeTextForBooleanDataType = customizeTextForBooleanDataType;
var getCustomizeTextByDataType = function(dataType) {
    if ("boolean" === dataType) {
        return customizeTextForBooleanDataType
    }
};
exports.getCustomizeTextByDataType = getCustomizeTextByDataType;
var createColumnsFromDataSource = function(that, dataSource) {
    var firstItems = that._getFirstItems(dataSource);
    var fieldName;
    var processedFields = {};
    var result = [];
    for (var i = 0; i < firstItems.length; i++) {
        if (firstItems[i]) {
            for (fieldName in firstItems[i]) {
                if (!(0, _type.isFunction)(firstItems[i][fieldName]) || _variable_wrapper.default.isWrapped(firstItems[i][fieldName])) {
                    processedFields[fieldName] = true
                }
            }
        }
    }
    for (fieldName in processedFields) {
        if (0 !== fieldName.indexOf("__")) {
            var column = createColumn(that, fieldName);
            result.push(column)
        }
    }
    return result
};
exports.createColumnsFromDataSource = createColumnsFromDataSource;
var updateColumnIndexes = function(that) {
    (0, _iterator.each)(that._columns, (function(index, column) {
        column.index = index
    }));
    (0, _iterator.each)(that._columns, (function(index, column) {
        if ((0, _type.isObject)(column.ownerBand)) {
            column.ownerBand = column.ownerBand.index
        }
    }));
    (0, _iterator.each)(that._commandColumns, (function(index, column) {
        column.index = -(index + 1)
    }))
};
exports.updateColumnIndexes = updateColumnIndexes;
var updateColumnGroupIndexes = function(that, currentColumn) {
    (0, _array.normalizeIndexes)(that._columns, "groupIndex", currentColumn, (function(column) {
        var grouped = column.grouped;
        delete column.grouped;
        return grouped
    }))
};
exports.updateColumnGroupIndexes = updateColumnGroupIndexes;
var updateColumnSortIndexes = function(that, currentColumn) {
    (0, _iterator.each)(that._columns, (function(index, column) {
        if ((0, _type.isDefined)(column.sortIndex) && !isSortOrderValid(column.sortOrder)) {
            delete column.sortIndex
        }
    }));
    (0, _array.normalizeIndexes)(that._columns, "sortIndex", currentColumn, (function(column) {
        return !(0, _type.isDefined)(column.groupIndex) && isSortOrderValid(column.sortOrder)
    }))
};
exports.updateColumnSortIndexes = updateColumnSortIndexes;
var updateColumnVisibleIndexes = function(that, currentColumn) {
    var column;
    var result = [];
    var bandColumnsCache = that.getBandColumnsCache();
    var bandedColumns = [];
    var columns = that._columns.filter((function(column) {
        return !column.command
    }));
    for (var i = 0; i < columns.length; i++) {
        column = columns[i];
        var parentBandColumns = getParentBandColumns(i, bandColumnsCache.columnParentByIndex);
        if (parentBandColumns.length) {
            bandedColumns.push(column)
        } else {
            result.push(column)
        }
    }(0, _array.normalizeIndexes)(bandedColumns, "visibleIndex", currentColumn);
    (0, _array.normalizeIndexes)(result, "visibleIndex", currentColumn)
};
exports.updateColumnVisibleIndexes = updateColumnVisibleIndexes;
var getColumnIndexByVisibleIndex = function(that, visibleIndex, location) {
    var rowIndex = (0, _type.isObject)(visibleIndex) ? visibleIndex.rowIndex : null;
    var columns = location === _const.GROUP_LOCATION ? that.getGroupColumns() : location === _const.COLUMN_CHOOSER_LOCATION ? that.getChooserColumns() : that.getVisibleColumns(rowIndex);
    var column;
    visibleIndex = (0, _type.isObject)(visibleIndex) ? visibleIndex.columnIndex : visibleIndex;
    column = columns[visibleIndex];
    if (column && column.type === _const.GROUP_COMMAND_COLUMN_NAME) {
        column = that._columns.filter((function(col) {
            return column.type === col.type
        }))[0] || column
    }
    return column && (0, _type.isDefined)(column.index) ? column.index : -1
};
exports.getColumnIndexByVisibleIndex = getColumnIndexByVisibleIndex;
var moveColumnToGroup = function(that, column, groupIndex) {
    var groupColumns = that.getGroupColumns();
    var i;
    if (groupIndex >= 0) {
        for (i = 0; i < groupColumns.length; i++) {
            if (groupColumns[i].groupIndex >= groupIndex) {
                groupColumns[i].groupIndex++
            }
        }
    } else {
        groupIndex = 0;
        for (i = 0; i < groupColumns.length; i++) {
            groupIndex = Math.max(groupIndex, groupColumns[i].groupIndex + 1)
        }
    }
    return groupIndex
};
exports.moveColumnToGroup = moveColumnToGroup;

function checkUserStateColumn(column, userStateColumn) {
    return column && userStateColumn && userStateColumn.name === (column.name || column.dataField) && (userStateColumn.dataField === column.dataField || column.name)
}
var applyUserState = function(that) {
    var columnsUserState = that._columnsUserState;
    var ignoreColumnOptionNames = that._ignoreColumnOptionNames || [];
    var columns = that._columns;
    var columnCountById = {};
    var resultColumns = [];
    var allColumnsHaveState = true;
    var userStateColumnIndexes = [];
    var column;
    var userStateColumnIndex;
    var i;

    function applyFieldsState(column, userStateColumn) {
        if (!userStateColumn) {
            return
        }
        for (var index = 0; index < _const.USER_STATE_FIELD_NAMES.length; index++) {
            var fieldName = _const.USER_STATE_FIELD_NAMES[index];
            if (ignoreColumnOptionNames.includes(fieldName)) {
                continue
            }
            if ("dataType" === fieldName) {
                column[fieldName] = column[fieldName] || userStateColumn[fieldName]
            } else if (_const.USER_STATE_FIELD_NAMES_15_1.includes(fieldName)) {
                if (fieldName in userStateColumn) {
                    column[fieldName] = userStateColumn[fieldName]
                }
            } else {
                if ("selectedFilterOperation" === fieldName && userStateColumn[fieldName]) {
                    column.defaultSelectedFilterOperation = column[fieldName] || null
                }
                column[fieldName] = userStateColumn[fieldName]
            }
        }
    }

    function findUserStateColumn(columnsUserState, column) {
        var id = column.name || column.dataField;
        var count = columnCountById[id] || 0;
        for (var j = 0; j < columnsUserState.length; j++) {
            if (checkUserStateColumn(column, columnsUserState[j])) {
                if (count) {
                    count--
                } else {
                    columnCountById[id] = columnCountById[id] || 0;
                    columnCountById[id]++;
                    return j
                }
            }
        }
        return -1
    }
    if (columnsUserState) {
        for (i = 0; i < columns.length; i++) {
            userStateColumnIndex = findUserStateColumn(columnsUserState, columns[i]);
            allColumnsHaveState = allColumnsHaveState && userStateColumnIndex >= 0;
            userStateColumnIndexes.push(userStateColumnIndex)
        }
        for (i = 0; i < columns.length; i++) {
            column = columns[i];
            userStateColumnIndex = userStateColumnIndexes[i];
            if (that._hasUserState || allColumnsHaveState) {
                applyFieldsState(column, columnsUserState[userStateColumnIndex])
            }
            if (userStateColumnIndex >= 0 && (0, _type.isDefined)(columnsUserState[userStateColumnIndex].initialIndex)) {
                resultColumns[userStateColumnIndex] = column
            } else {
                resultColumns.push(column)
            }
        }
        var hasAddedBands = false;
        for (i = 0; i < columnsUserState.length; i++) {
            var columnUserState = columnsUserState[i];
            if (columnUserState.added && findUserStateColumn(columns, columnUserState) < 0) {
                column = createColumn(that, columnUserState.added);
                applyFieldsState(column, columnUserState);
                resultColumns.push(column);
                if (columnUserState.added.columns) {
                    hasAddedBands = true
                }
            }
        }
        if (hasAddedBands) {
            updateColumnIndexes(that);
            resultColumns = createColumnsFromOptions(that, resultColumns)
        }
        assignColumns(that, resultColumns)
    }
};
exports.applyUserState = applyUserState;
var updateIndexes = function(that, column) {
    updateColumnIndexes(that);
    updateColumnGroupIndexes(that, column);
    updateColumnSortIndexes(that, column);
    resetBandColumnsCache(that);
    updateColumnVisibleIndexes(that, column)
};
exports.updateIndexes = updateIndexes;
var resetColumnsCache = function(that) {
    that.resetColumnsCache()
};
exports.resetColumnsCache = resetColumnsCache;

function assignColumns(that, columns) {
    that._previousColumns = that._columns;
    that._columns = columns;
    resetColumnsCache(that);
    that.updateColumnDataTypes()
}
var updateColumnChanges = function(that, changeType, optionName, columnIndex) {
    var _a;
    var columnChanges = that._columnChanges || {
        optionNames: {
            length: 0
        },
        changeTypes: {
            length: 0
        },
        columnIndex: columnIndex
    };
    optionName = optionName || "all";
    optionName = optionName.split(".")[0];
    var changeTypes = columnChanges.changeTypes;
    if (changeType && !changeTypes[changeType]) {
        changeTypes[changeType] = true;
        changeTypes.length++
    }
    var optionNames = columnChanges.optionNames;
    if (optionName && !optionNames[optionName]) {
        optionNames[optionName] = true;
        optionNames.length++
    }
    if (void 0 === columnIndex || columnIndex !== columnChanges.columnIndex) {
        if ((0, _type.isDefined)(columnIndex)) {
            null !== (_a = columnChanges.columnIndices) && void 0 !== _a ? _a : columnChanges.columnIndices = [columnChanges.columnIndex];
            columnChanges.columnIndices.push(columnIndex)
        }
        delete columnChanges.columnIndex
    }
    that._columnChanges = columnChanges;
    resetColumnsCache(that)
};
exports.updateColumnChanges = updateColumnChanges;
var fireColumnsChanged = function(that) {
    var onColumnsChanging = that.option("onColumnsChanging");
    var columnChanges = that._columnChanges;
    var reinitOptionNames = ["dataField", "lookup", "dataType", "columns"];
    if (that.isInitialized() && !that._updateLockCount && columnChanges) {
        if (onColumnsChanging) {
            that._updateLockCount++;
            onColumnsChanging((0, _extend.extend)({
                component: that.component
            }, columnChanges));
            that._updateLockCount--
        }
        that._columnChanges = void 0;
        if (options = columnChanges.optionNames, options && reinitOptionNames.some((function(name) {
                return options[name]
            }))) {
            that._reinitAfterLookupChanges = null === columnChanges || void 0 === columnChanges ? void 0 : columnChanges.optionNames.lookup;
            that.reinit();
            that._reinitAfterLookupChanges = void 0
        } else {
            that.columnsChanged.fire(columnChanges)
        }
    }
    var options
};
exports.fireColumnsChanged = fireColumnsChanged;
var updateSortOrderWhenGrouping = function(that, column, groupIndex, prevGroupIndex) {
    var columnWasGrouped = prevGroupIndex >= 0;
    if (groupIndex >= 0) {
        if (!columnWasGrouped) {
            column.lastSortOrder = column.sortOrder
        }
    } else {
        var sortMode = that.option("sorting.mode");
        var sortOrder = column.lastSortOrder;
        if ("single" === sortMode) {
            var sortedByAnotherColumn = that._columns.some((function(col) {
                return col !== column && (0, _type.isDefined)(col.sortIndex)
            }));
            if (sortedByAnotherColumn) {
                sortOrder = void 0
            }
        }
        column.sortOrder = sortOrder
    }
};
exports.updateSortOrderWhenGrouping = updateSortOrderWhenGrouping;
var fireOptionChanged = function(that, options) {
    var value = options.value;
    var optionName = options.optionName;
    var prevValue = options.prevValue;
    var fullOptionName = options.fullOptionName;
    var fullOptionPath = "".concat(fullOptionName, ".").concat(optionName);
    if (!_const.IGNORE_COLUMN_OPTION_NAMES[optionName] && that._skipProcessingColumnsChange !== fullOptionPath) {
        that._skipProcessingColumnsChange = fullOptionPath;
        that.component._notifyOptionChanged(fullOptionPath, value, prevValue);
        that._skipProcessingColumnsChange = false
    }
};
exports.fireOptionChanged = fireOptionChanged;
var columnOptionCore = function(that, column, optionName, value, notFireEvent) {
    var optionGetter = (0, _data.compileGetter)(optionName);
    var columnIndex = column.index;
    var columns;
    var changeType;
    var initialColumn;
    if (3 === arguments.length) {
        return optionGetter(column, {
            functionsAsIs: true
        })
    }
    var prevValue = optionGetter(column, {
        functionsAsIs: true
    });
    if (!(0, _common.equalByValue)(prevValue, value, {
            maxDepth: 5
        })) {
        if ("groupIndex" === optionName || "calculateGroupValue" === optionName) {
            changeType = "grouping";
            updateSortOrderWhenGrouping(that, column, value, prevValue)
        } else if ("sortIndex" === optionName || "sortOrder" === optionName || "calculateSortValue" === optionName) {
            changeType = "sorting"
        } else {
            changeType = "columns"
        }
        var optionSetter = (0, _data.compileSetter)(optionName);
        optionSetter(column, value, {
            functionsAsIs: true
        });
        var fullOptionName = getColumnFullPath(that, column);
        if (_const.COLUMN_INDEX_OPTIONS[optionName]) {
            updateIndexes(that, column);
            value = optionGetter(column)
        }
        if ("name" === optionName || "allowEditing" === optionName) {
            that._checkColumns()
        }
        if (!(0, _type.isDefined)(prevValue) && !(0, _type.isDefined)(value) && 0 !== optionName.indexOf("buffer")) {
            notFireEvent = true
        }
        if (!notFireEvent) {
            if (!_const.USER_STATE_FIELD_NAMES.includes(optionName) && "visibleWidth" !== optionName) {
                columns = that.option("columns");
                initialColumn = that.getColumnByPath(fullOptionName, columns);
                if ((0, _type.isString)(initialColumn)) {
                    initialColumn = columns[columnIndex] = {
                        dataField: initialColumn
                    }
                }
                if (initialColumn && checkUserStateColumn(initialColumn, column)) {
                    optionSetter(initialColumn, value, {
                        functionsAsIs: true
                    })
                }
            }
            updateColumnChanges(that, changeType, optionName, columnIndex)
        } else {
            resetColumnsCache(that)
        }
        fullOptionName && fireOptionChanged(that, {
            fullOptionName: fullOptionName,
            optionName: optionName,
            value: value,
            prevValue: prevValue
        })
    }
};
exports.columnOptionCore = columnOptionCore;

function isSortOrderValid(sortOrder) {
    return "asc" === sortOrder || "desc" === sortOrder
}
var addExpandColumn = function(that) {
    var options = that._getExpandColumnOptions();
    that.addCommandColumn(options)
};
exports.addExpandColumn = addExpandColumn;
var defaultSetCellValue = function(data, value) {
    if (!this.dataField) {
        return
    }
    var path = this.dataField.split(".");
    var dotCount = path.length - 1;
    if (this.serializeValue) {
        value = this.serializeValue(value)
    }
    for (var i = 0; i < dotCount; i++) {
        var name = path[i];
        data = data[name] = data[name] || {}
    }
    data[path[dotCount]] = value
};
exports.defaultSetCellValue = defaultSetCellValue;
var getDataColumns = function getDataColumns(columns, rowIndex, bandColumnID) {
    var result = [];
    rowIndex = rowIndex || 0;
    columns[rowIndex] && (0, _iterator.each)(columns[rowIndex], (function(_, column) {
        if (column.ownerBand === bandColumnID || column.type === _const.GROUP_COMMAND_COLUMN_NAME) {
            if (!column.isBand || !column.colspan) {
                if (!column.command || rowIndex < 1) {
                    result.push(column)
                }
            } else {
                result.push.apply(result, getDataColumns(columns, rowIndex + 1, column.index))
            }
        }
    }));
    return result
};
exports.getDataColumns = getDataColumns;
var getRowCount = function(that) {
    var rowCount = 1;
    var bandColumnsCache = that.getBandColumnsCache();
    var columnParentByIndex = bandColumnsCache.columnParentByIndex;
    that._columns.forEach((function(column) {
        var parents = getParentBandColumns(column.index, columnParentByIndex);
        var invisibleParents = parents.filter((function(column) {
            return !column.visible
        }));
        if (column.visible && !invisibleParents.length) {
            rowCount = Math.max(rowCount, parents.length + 1)
        }
    }));
    return rowCount
};
exports.getRowCount = getRowCount;
var isCustomCommandColumn = function(that, commandColumn) {
    var customCommandColumns = that._columns.filter((function(column) {
        return column.type === commandColumn.type
    }));
    return !!customCommandColumns.length
};
exports.isCustomCommandColumn = isCustomCommandColumn;
var getFixedPosition = function(that, column) {
    var rtlEnabled = that.option("rtlEnabled");
    if (column.command && !isCustomCommandColumn(that, column) || !column.fixedPosition) {
        return rtlEnabled ? "right" : "left"
    }
    return column.fixedPosition
};
exports.getFixedPosition = getFixedPosition;
var processExpandColumns = function(columns, expandColumns, type, columnIndex) {
    var customColumnIndex;
    var rowCount = this.getRowCount();
    var rowspan = columns[columnIndex] && columns[columnIndex].rowspan;
    var expandColumnsByType = expandColumns.filter((function(column) {
        return column.type === type
    }));
    columns.forEach((function(column, index) {
        if (column.type === type) {
            customColumnIndex = index;
            rowspan = columns[index + 1] ? columns[index + 1].rowspan : rowCount
        }
    }));
    if (rowspan > 1) {
        expandColumnsByType = (0, _iterator.map)(expandColumnsByType, (function(expandColumn) {
            return (0, _extend.extend)({}, expandColumn, {
                rowspan: rowspan
            })
        }))
    }
    expandColumnsByType.unshift.apply(expandColumnsByType, (0, _type.isDefined)(customColumnIndex) ? [customColumnIndex, 1] : [columnIndex, 0]);
    columns.splice.apply(columns, expandColumnsByType);
    return rowspan || 1
};
exports.processExpandColumns = processExpandColumns;
var digitsCount = function(number) {
    var i;
    for (i = 0; number > 1; i++) {
        number /= 10
    }
    return i
};
exports.digitsCount = digitsCount;
var numberToString = function(number, digitsCount) {
    var str = number ? number.toString() : "0";
    while (str.length < digitsCount) {
        str = "0".concat(str)
    }
    return str
};
exports.numberToString = numberToString;
var mergeColumns = function(that, columns, commandColumns, needToExtend) {
    var column;
    var commandColumnIndex;
    var result = columns.slice().map((function(column) {
        return (0, _extend.extend)({}, column)
    }));
    var isColumnFixing = that._isColumnFixing();
    var defaultCommandColumns = commandColumns.slice().map((function(column) {
        return (0, _extend.extend)({
            fixed: isColumnFixing
        }, column)
    }));
    var getCommandColumnIndex = function(column) {
        return commandColumns.reduce((function(result, commandColumn, index) {
            var columnType = needToExtend && column.type === _const.GROUP_COMMAND_COLUMN_NAME ? "expand" : column.type;
            return commandColumn.type === columnType || commandColumn.command === column.command ? index : result
        }), -1)
    };
    var callbackFilter = function(commandColumn) {
        return commandColumn.command !== commandColumns[commandColumnIndex].command
    };
    for (var i = 0; i < columns.length; i++) {
        column = columns[i];
        commandColumnIndex = column && (column.type || column.command) ? getCommandColumnIndex(column) : -1;
        if (commandColumnIndex >= 0) {
            if (needToExtend) {
                result[i] = (0, _extend.extend)({
                    fixed: isColumnFixing
                }, commandColumns[commandColumnIndex], column);
                if (column.type !== _const.GROUP_COMMAND_COLUMN_NAME) {
                    defaultCommandColumns = defaultCommandColumns.filter(callbackFilter)
                }
            } else {
                var columnOptions = {
                    visibleIndex: column.visibleIndex,
                    index: column.index,
                    headerId: column.headerId,
                    allowFixing: 0 === column.groupIndex,
                    allowReordering: 0 === column.groupIndex,
                    groupIndex: column.groupIndex
                };
                result[i] = (0, _extend.extend)({}, column, commandColumns[commandColumnIndex], column.type === _const.GROUP_COMMAND_COLUMN_NAME && columnOptions)
            }
        }
    }
    if (columns.length && needToExtend && defaultCommandColumns.length) {
        result = result.concat(defaultCommandColumns)
    }
    return result
};
exports.mergeColumns = mergeColumns;
var isColumnFixed = function(that, column) {
    return (0, _type.isDefined)(column.fixed) || !column.type ? column.fixed : that._isColumnFixing()
};
exports.isColumnFixed = isColumnFixed;
var convertOwnerBandToColumnReference = function(columns) {
    columns.forEach((function(column) {
        if ((0, _type.isDefined)(column.ownerBand)) {
            column.ownerBand = columns[column.ownerBand]
        }
    }))
};
exports.convertOwnerBandToColumnReference = convertOwnerBandToColumnReference;
var resetBandColumnsCache = function(that) {
    that._bandColumnsCache = void 0
};
exports.resetBandColumnsCache = resetBandColumnsCache;
var findColumn = function(columns, identifier) {
    var identifierOptionName = (0, _type.isString)(identifier) && identifier.substr(0, identifier.indexOf(":"));
    var column;
    if (void 0 === identifier) {
        return
    }
    if (identifierOptionName) {
        identifier = identifier.substr(identifierOptionName.length + 1)
    }
    if (identifierOptionName) {
        column = columns.filter((function(column) {
            return "".concat(column[identifierOptionName]) === identifier
        }))[0]
    } else {
        ["index", "name", "dataField", "caption"].some((function(optionName) {
            column = columns.filter((function(column) {
                return column[optionName] === identifier
            }))[0];
            return !!column
        }))
    }
    return column
};
exports.findColumn = findColumn;
var sortColumns = function(columns, sortOrder) {
    if ("asc" !== sortOrder && "desc" !== sortOrder) {
        return columns
    }
    var sign = "asc" === sortOrder ? 1 : -1;
    columns.sort((function(column1, column2) {
        var caption1 = column1.caption || "";
        var caption2 = column2.caption || "";
        return sign * caption1.localeCompare(caption2)
    }));
    return columns
};
exports.sortColumns = sortColumns;
var strictParseNumber = function(text, format) {
    var parsedValue = _number.default.parse(text);
    if ((0, _type.isNumeric)(parsedValue)) {
        var formattedValue = _number.default.format(parsedValue, format);
        var formattedValueWithDefaultFormat = _number.default.format(parsedValue, "decimal");
        if (formattedValue === text || formattedValueWithDefaultFormat === text) {
            return parsedValue
        }
    }
};
exports.strictParseNumber = strictParseNumber;
