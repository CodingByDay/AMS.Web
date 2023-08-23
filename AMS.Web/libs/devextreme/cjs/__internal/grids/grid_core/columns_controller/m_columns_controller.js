/**
 * DevExtreme (cjs/__internal/grids/grid_core/columns_controller/m_columns_controller.js)
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
exports.columnsControllerModule = exports.ColumnsController = void 0;
var _config = _interopRequireDefault(require("../../../../core/config"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _callbacks = _interopRequireDefault(require("../../../../core/utils/callbacks"));
var _data = require("../../../../core/utils/data");
var _deferred = require("../../../../core/utils/deferred");
var _extend = require("../../../../core/utils/extend");
var _inflector = require("../../../../core/utils/inflector");
var _iterator = require("../../../../core/utils/iterator");
var _object = require("../../../../core/utils/object");
var _type = require("../../../../core/utils/type");
var _variable_wrapper = _interopRequireDefault(require("../../../../core/utils/variable_wrapper"));
var _abstract_store = _interopRequireDefault(require("../../../../data/abstract_store"));
var _data_source = require("../../../../data/data_source/data_source");
var _utils = require("../../../../data/data_source/utils");
var _date = _interopRequireDefault(require("../../../../localization/date"));
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _filtering = _interopRequireDefault(require("../../../../ui/shared/filtering"));
var _ui = _interopRequireDefault(require("../../../../ui/widget/ui.errors"));
var _m_modules = _interopRequireDefault(require("../m_modules"));
var _m_utils = _interopRequireDefault(require("../m_utils"));
var _const = require("./const");
var _m_columns_controller_utils = require("./m_columns_controller_utils");

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
var ColumnsController = function(_modules$Controller) {
    _inheritsLoose(ColumnsController, _modules$Controller);

    function ColumnsController() {
        return _modules$Controller.apply(this, arguments) || this
    }
    var _proto = ColumnsController.prototype;
    _proto._getExpandColumnOptions = function() {
        return {
            type: "expand",
            command: "expand",
            width: "auto",
            cssClass: _const.COMMAND_EXPAND_CLASS,
            allowEditing: false,
            allowGrouping: false,
            allowSorting: false,
            allowResizing: false,
            allowReordering: false,
            allowHiding: false
        }
    };
    _proto._getFirstItems = function(dataSource) {
        var groupsCount;
        var items = [];
        if (dataSource && dataSource.items().length > 0) {
            groupsCount = _m_utils.default.normalizeSortingInfo(dataSource.group()).length;
            items = function getFirstItemsCore(items, groupsCount) {
                if (!items || !groupsCount) {
                    return items
                }
                for (var i = 0; i < items.length; i++) {
                    var childItems = getFirstItemsCore(items[i].items || items[i].collapsedItems, groupsCount - 1);
                    if (childItems && childItems.length) {
                        return childItems
                    }
                }
            }(dataSource.items(), groupsCount) || []
        }
        return items
    };
    _proto._endUpdateCore = function() {
        !this._skipProcessingColumnsChange && (0, _m_columns_controller_utils.fireColumnsChanged)(this)
    };
    _proto.init = function(isApplyingUserState) {
        var columns = this.option("columns");
        this._commandColumns = this._commandColumns || [];
        this._columns = this._columns || [];
        this._isColumnsFromOptions = !!columns;
        if (this._isColumnsFromOptions) {
            (0, _m_columns_controller_utils.assignColumns)(this, columns ? (0, _m_columns_controller_utils.createColumnsFromOptions)(this, columns) : []);
            (0, _m_columns_controller_utils.applyUserState)(this)
        } else {
            (0, _m_columns_controller_utils.assignColumns)(this, this._columnsUserState ? (0, _m_columns_controller_utils.createColumnsFromOptions)(this, this._columnsUserState) : this._columns)
        }(0, _m_columns_controller_utils.addExpandColumn)(this);
        if (this._dataSourceApplied) {
            this.applyDataSource(this._dataSource, true, isApplyingUserState)
        } else {
            (0, _m_columns_controller_utils.updateIndexes)(this)
        }
        this._checkColumns()
    };
    _proto.callbackNames = function() {
        return ["columnsChanged"]
    };
    _proto.getColumnByPath = function(path, columns) {
        var column;
        var columnIndexes = [];
        path.replace(_const.COLUMN_OPTION_REGEXP, (function(_, columnIndex) {
            columnIndexes.push(parseInt(columnIndex));
            return ""
        }));
        if (columnIndexes.length) {
            if (columns) {
                column = columnIndexes.reduce((function(column, index) {
                    return column && column.columns && column.columns[index]
                }), {
                    columns: columns
                })
            } else {
                column = (0, _m_columns_controller_utils.getColumnByIndexes)(this, columnIndexes)
            }
        }
        return column
    };
    _proto.optionChanged = function(args) {
        var needUpdateRequireResize;
        switch (args.name) {
            case "adaptColumnWidthByRatio":
                args.handled = true;
                break;
            case "dataSource":
                if (args.value !== args.previousValue && !this.option("columns") && (!Array.isArray(args.value) || !Array.isArray(args.previousValue))) {
                    this._columns = []
                }
                break;
            case "columns":
                needUpdateRequireResize = this._skipProcessingColumnsChange;
                args.handled = true;
                if (!this._skipProcessingColumnsChange) {
                    if (args.name === args.fullName) {
                        this._columnsUserState = null;
                        this._ignoreColumnOptionNames = null;
                        this.init()
                    } else {
                        this._columnOptionChanged(args);
                        needUpdateRequireResize = true
                    }
                }
                if (needUpdateRequireResize) {
                    this._updateRequireResize(args)
                }
                break;
            case "commonColumnSettings":
            case "columnAutoWidth":
            case "allowColumnResizing":
            case "allowColumnReordering":
            case "columnFixing":
            case "grouping":
            case "groupPanel":
            case "regenerateColumnsByVisibleItems":
            case "customizeColumns":
            case "columnHidingEnabled":
            case "dateSerializationFormat":
            case "columnResizingMode":
            case "columnMinWidth":
            case "columnWidth":
                args.handled = true;
                var ignoreColumnOptionNames = "columnWidth" === args.fullName && ["width"];
                this.reinit(ignoreColumnOptionNames);
                break;
            case "rtlEnabled":
                this.reinit();
                break;
            default:
                _modules$Controller.prototype.optionChanged.call(this, args)
        }
    };
    _proto._columnOptionChanged = function(args) {
        var columnOptionValue = {};
        var column = this.getColumnByPath(args.fullName);
        var columnOptionName = args.fullName.replace(_const.COLUMN_OPTION_REGEXP, "");
        if (column) {
            if (columnOptionName) {
                columnOptionValue[columnOptionName] = args.value
            } else {
                columnOptionValue = args.value
            }
            this._skipProcessingColumnsChange = args.fullName;
            this.columnOption(column.index, columnOptionValue);
            this._skipProcessingColumnsChange = false
        }
    };
    _proto._updateRequireResize = function(args) {
        var component = this.component;
        if ("width" === args.fullName.replace(_const.COLUMN_OPTION_REGEXP, "") && component._updateLockCount) {
            component._requireResize = true
        }
    };
    _proto.publicMethods = function() {
        return ["addColumn", "deleteColumn", "columnOption", "columnCount", "clearSorting", "clearGrouping", "getVisibleColumns", "getVisibleColumnIndex"]
    };
    _proto.applyDataSource = function(dataSource, forceApplying, isApplyingUserState) {
        var isDataSourceLoaded = dataSource && dataSource.isLoaded();
        this._dataSource = dataSource;
        if (!this._dataSourceApplied || 0 === this._dataSourceColumnsCount || forceApplying || this.option("regenerateColumnsByVisibleItems")) {
            if (isDataSourceLoaded) {
                if (!this._isColumnsFromOptions) {
                    var columnsFromDataSource = (0, _m_columns_controller_utils.createColumnsFromDataSource)(this, dataSource);
                    if (columnsFromDataSource.length) {
                        (0, _m_columns_controller_utils.assignColumns)(this, columnsFromDataSource);
                        this._dataSourceColumnsCount = this._columns.length;
                        (0, _m_columns_controller_utils.applyUserState)(this)
                    }
                }
                return this.updateColumns(dataSource, forceApplying, isApplyingUserState)
            }
            this._dataSourceApplied = false;
            (0, _m_columns_controller_utils.updateIndexes)(this)
        } else if (isDataSourceLoaded && !this.isAllDataTypesDefined(true) && this.updateColumnDataTypes(dataSource)) {
            (0, _m_columns_controller_utils.updateColumnChanges)(this, "columns");
            (0, _m_columns_controller_utils.fireColumnsChanged)(this);
            return (new _deferred.Deferred).reject().promise()
        }
    };
    _proto.reset = function() {
        this._dataSource = null;
        this._dataSourceApplied = false;
        this._dataSourceColumnsCount = void 0;
        this.reinit()
    };
    _proto.resetColumnsCache = function() {
        this._visibleColumns = void 0;
        this._fixedColumns = void 0;
        this._rowCount = void 0;
        (0, _m_columns_controller_utils.resetBandColumnsCache)(this)
    };
    _proto.reinit = function(ignoreColumnOptionNames) {
        this._columnsUserState = this.getUserState();
        this._ignoreColumnOptionNames = ignoreColumnOptionNames || null;
        this.init();
        if (ignoreColumnOptionNames) {
            this._ignoreColumnOptionNames = null
        }
    };
    _proto.isInitialized = function() {
        return !!this._columns.length || !!this.option("columns")
    };
    _proto.isDataSourceApplied = function() {
        return this._dataSourceApplied
    };
    _proto.getCommonSettings = function(column) {
        var _a, _b;
        var commonColumnSettings = (!column || !column.type) && this.option("commonColumnSettings") || {};
        var groupingOptions = null !== (_a = this.option("grouping")) && void 0 !== _a ? _a : {};
        var groupPanelOptions = null !== (_b = this.option("groupPanel")) && void 0 !== _b ? _b : {};
        return (0, _extend.extend)({
            allowFixing: this.option("columnFixing.enabled"),
            allowResizing: this.option("allowColumnResizing") || void 0,
            allowReordering: this.option("allowColumnReordering"),
            minWidth: this.option("columnMinWidth"),
            width: this.option("columnWidth"),
            autoExpandGroup: groupingOptions.autoExpandAll,
            allowCollapsing: groupingOptions.allowCollapsing,
            allowGrouping: groupPanelOptions.allowColumnDragging && groupPanelOptions.visible || groupingOptions.contextMenuEnabled
        }, commonColumnSettings)
    };
    _proto.isColumnOptionUsed = function(optionName) {
        for (var i = 0; i < this._columns.length; i++) {
            if (this._columns[i][optionName]) {
                return true
            }
        }
    };
    _proto.isAllDataTypesDefined = function(checkSerializers) {
        var columns = this._columns;
        if (!columns.length) {
            return false
        }
        for (var i = 0; i < columns.length; i++) {
            if (!columns[i].dataField && columns[i].calculateCellValue === columns[i].defaultCalculateCellValue) {
                continue
            }
            if (!columns[i].dataType || checkSerializers && columns[i].deserializeValue && void 0 === columns[i].serializationFormat) {
                return false
            }
        }
        return true
    };
    _proto.getColumns = function() {
        return this._columns
    };
    _proto.isBandColumnsUsed = function() {
        return this.getColumns().some((function(column) {
            return column.isBand
        }))
    };
    _proto.getGroupColumns = function() {
        var result = [];
        (0, _iterator.each)(this._columns, (function() {
            if ((0, _type.isDefined)(this.groupIndex)) {
                result[this.groupIndex] = this
            }
        }));
        return result
    };
    _proto._shouldReturnVisibleColumns = function() {
        return true
    };
    _proto._compileVisibleColumns = function(rowIndex) {
        this._visibleColumns = this._visibleColumns || this._compileVisibleColumnsCore();
        rowIndex = (0, _type.isDefined)(rowIndex) ? rowIndex : this._visibleColumns.length - 1;
        return this._visibleColumns[rowIndex] || []
    };
    _proto.getVisibleColumns = function(rowIndex, isBase) {
        if (!this._shouldReturnVisibleColumns()) {
            return []
        }
        return this._compileVisibleColumns.apply(this, arguments)
    };
    _proto.getFixedColumns = function(rowIndex) {
        this._fixedColumns = this._fixedColumns || this._getFixedColumnsCore();
        rowIndex = (0, _type.isDefined)(rowIndex) ? rowIndex : this._fixedColumns.length - 1;
        return this._fixedColumns[rowIndex] || []
    };
    _proto.getFilteringColumns = function() {
        return this.getColumns().filter((function(item) {
            return (item.dataField || item.name) && (item.allowFiltering || item.allowHeaderFiltering)
        })).map((function(item) {
            var field = (0, _extend.extend)(true, {}, item);
            if (!(0, _type.isDefined)(field.dataField)) {
                field.dataField = field.name
            }
            field.filterOperations = item.filterOperations !== item.defaultFilterOperations ? field.filterOperations : null;
            return field
        }))
    };
    _proto.getColumnIndexOffset = function() {
        return 0
    };
    _proto._getFixedColumnsCore = function() {
        var result = [];
        var rowCount = this.getRowCount();
        var isColumnFixing = this._isColumnFixing();
        var transparentColumn = {
            command: "transparent"
        };
        var transparentColspan = 0;
        var notFixedColumnCount;
        var transparentColumnIndex;
        var lastFixedPosition;
        if (isColumnFixing) {
            for (var i = 0; i <= rowCount; i++) {
                notFixedColumnCount = 0;
                lastFixedPosition = null;
                transparentColumnIndex = null;
                var visibleColumns = this.getVisibleColumns(i, true);
                for (var j = 0; j < visibleColumns.length; j++) {
                    var prevColumn = visibleColumns[j - 1];
                    var column = visibleColumns[j];
                    if (!column.fixed) {
                        if (0 === i) {
                            if (column.isBand && column.colspan) {
                                transparentColspan += column.colspan
                            } else {
                                transparentColspan++
                            }
                        }
                        notFixedColumnCount++;
                        if (!(0, _type.isDefined)(transparentColumnIndex)) {
                            transparentColumnIndex = j
                        }
                    } else if (prevColumn && prevColumn.fixed && (0, _m_columns_controller_utils.getFixedPosition)(this, prevColumn) !== (0, _m_columns_controller_utils.getFixedPosition)(this, column)) {
                        if (!(0, _type.isDefined)(transparentColumnIndex)) {
                            transparentColumnIndex = j
                        }
                    } else {
                        lastFixedPosition = column.fixedPosition
                    }
                }
                if (0 === i && (0 === notFixedColumnCount || notFixedColumnCount >= visibleColumns.length)) {
                    return []
                }
                if (!(0, _type.isDefined)(transparentColumnIndex)) {
                    transparentColumnIndex = "right" === lastFixedPosition ? 0 : visibleColumns.length
                }
                result[i] = visibleColumns.slice(0);
                if (!transparentColumn.colspan) {
                    transparentColumn.colspan = transparentColspan
                }
                result[i].splice(transparentColumnIndex, notFixedColumnCount, transparentColumn)
            }
        }
        return result.map((function(columns) {
            return columns.map((function(column) {
                var newColumn = _extends({}, column);
                if (newColumn.headerId) {
                    newColumn.headerId += "-fixed"
                }
                return newColumn
            }))
        }))
    };
    _proto._isColumnFixing = function() {
        var isColumnFixing = this.option("columnFixing.enabled");
        !isColumnFixing && (0, _iterator.each)(this._columns, (function(_, column) {
            if (column.fixed) {
                isColumnFixing = true;
                return false
            }
        }));
        return isColumnFixing
    };
    _proto._getExpandColumnsCore = function() {
        return this.getGroupColumns()
    };
    _proto.getExpandColumns = function() {
        var expandColumns = this._getExpandColumnsCore();
        var expandColumn;
        var firstGroupColumn = expandColumns.filter((function(column) {
            return 0 === column.groupIndex
        }))[0];
        var isFixedFirstGroupColumn = firstGroupColumn && firstGroupColumn.fixed;
        var isColumnFixing = this._isColumnFixing();
        var rtlEnabled = this.option("rtlEnabled");
        if (expandColumns.length) {
            expandColumn = this.columnOption("command:expand")
        }
        expandColumns = (0, _iterator.map)(expandColumns, (function(column) {
            return (0, _extend.extend)({}, column, {
                visibleWidth: null,
                minWidth: null,
                cellTemplate: !(0, _type.isDefined)(column.groupIndex) ? column.cellTemplate : null,
                headerCellTemplate: null,
                fixed: !(0, _type.isDefined)(column.groupIndex) || !isFixedFirstGroupColumn ? isColumnFixing : true,
                fixedPosition: rtlEnabled ? "right" : "left"
            }, expandColumn, {
                index: column.index,
                type: column.type || _const.GROUP_COMMAND_COLUMN_NAME
            })
        }));
        return expandColumns
    };
    _proto.getBandColumnsCache = function() {
        if (!this._bandColumnsCache) {
            var columns = this._columns;
            var columnChildrenByIndex = {};
            var columnParentByIndex = {};
            var isPlain = true;
            columns.forEach((function(column) {
                var ownerBand = column.ownerBand;
                var parentIndex = (0, _type.isObject)(ownerBand) ? ownerBand.index : ownerBand;
                var parent = columns[parentIndex];
                if (column.hasColumns) {
                    isPlain = false
                }
                if (column.colspan) {
                    column.colspan = void 0
                }
                if (column.rowspan) {
                    column.rowspan = void 0
                }
                if (parent) {
                    columnParentByIndex[column.index] = parent
                } else {
                    parentIndex = -1
                }
                columnChildrenByIndex[parentIndex] = columnChildrenByIndex[parentIndex] || [];
                columnChildrenByIndex[parentIndex].push(column)
            }));
            this._bandColumnsCache = {
                isPlain: isPlain,
                columnChildrenByIndex: columnChildrenByIndex,
                columnParentByIndex: columnParentByIndex
            }
        }
        return this._bandColumnsCache
    };
    _proto._isColumnVisible = function(column) {
        return column.visible && this.isParentColumnVisible(column.index)
    };
    _proto._isColumnInGroupPanel = function(column) {
        return (0, _type.isDefined)(column.groupIndex) && !column.showWhenGrouped
    };
    _proto.hasVisibleDataColumns = function() {
        var _this = this;
        var columns = this._columns;
        return columns.some((function(column) {
            var isVisible = _this._isColumnVisible(column);
            var isInGroupPanel = _this._isColumnInGroupPanel(column);
            var isCommand = !!column.command;
            return isVisible && !isInGroupPanel && !isCommand
        }))
    };
    _proto._compileVisibleColumnsCore = function() {
        var bandColumnsCache = this.getBandColumnsCache();
        var columns = (0, _m_columns_controller_utils.mergeColumns)(this, this._columns, this._commandColumns, true);
        (0, _m_columns_controller_utils.processBandColumns)(this, columns, bandColumnsCache);
        var indexedColumns = this._getIndexedColumns(columns);
        var visibleColumns = this._getVisibleColumnsFromIndexed(indexedColumns);
        var isDataColumnsInvisible = !this.hasVisibleDataColumns();
        if (isDataColumnsInvisible && this._columns.length) {
            visibleColumns[visibleColumns.length - 1].push({
                command: "empty"
            })
        }
        return visibleColumns
    };
    _proto._getIndexedColumns = function(columns) {
        var _this2 = this;
        var rtlEnabled = this.option("rtlEnabled");
        var rowCount = this.getRowCount();
        var columnDigitsCount = (0, _m_columns_controller_utils.digitsCount)(columns.length);
        var bandColumnsCache = this.getBandColumnsCache();
        var positiveIndexedColumns = [];
        var negativeIndexedColumns = [];
        for (var i = 0; i < rowCount; i += 1) {
            negativeIndexedColumns[i] = [{}];
            positiveIndexedColumns[i] = [{}, {}, {}]
        }
        columns.forEach((function(column) {
            var _a, _b, _c, _d;
            var visibleIndex = column.visibleIndex;
            var indexedColumns;
            var parentBandColumns = (0, _m_columns_controller_utils.getParentBandColumns)(column.index, bandColumnsCache.columnParentByIndex);
            var isVisible = _this2._isColumnVisible(column);
            var isInGroupPanel = _this2._isColumnInGroupPanel(column);
            if (isVisible && !isInGroupPanel) {
                var rowIndex = parentBandColumns.length;
                if (visibleIndex < 0) {
                    visibleIndex = -visibleIndex;
                    indexedColumns = negativeIndexedColumns[rowIndex]
                } else {
                    column.fixed = null !== (_b = null === (_a = parentBandColumns[0]) || void 0 === _a ? void 0 : _a.fixed) && void 0 !== _b ? _b : column.fixed;
                    column.fixedPosition = null !== (_d = null === (_c = parentBandColumns[0]) || void 0 === _c ? void 0 : _c.fixedPosition) && void 0 !== _d ? _d : column.fixedPosition;
                    if (column.fixed) {
                        var isDefaultCommandColumn = !!column.command && !(0, _m_columns_controller_utils.isCustomCommandColumn)(_this2, column);
                        var isFixedToEnd = "right" === column.fixedPosition;
                        if (rtlEnabled && !isDefaultCommandColumn) {
                            isFixedToEnd = !isFixedToEnd
                        }
                        indexedColumns = isFixedToEnd ? positiveIndexedColumns[rowIndex][2] : positiveIndexedColumns[rowIndex][0]
                    } else {
                        indexedColumns = positiveIndexedColumns[rowIndex][1]
                    }
                }
                if (parentBandColumns.length) {
                    visibleIndex = (0, _m_columns_controller_utils.numberToString)(visibleIndex, columnDigitsCount);
                    for (var _i = parentBandColumns.length - 1; _i >= 0; _i -= 1) {
                        visibleIndex = (0, _m_columns_controller_utils.numberToString)(parentBandColumns[_i].visibleIndex, columnDigitsCount) + visibleIndex
                    }
                }
                indexedColumns[visibleIndex] = indexedColumns[visibleIndex] || [];
                indexedColumns[visibleIndex].push(column)
            }
        }));
        return {
            positiveIndexedColumns: positiveIndexedColumns,
            negativeIndexedColumns: negativeIndexedColumns
        }
    };
    _proto._getVisibleColumnsFromIndexed = function(_ref) {
        var _this3 = this;
        var positiveIndexedColumns = _ref.positiveIndexedColumns,
            negativeIndexedColumns = _ref.negativeIndexedColumns;
        var result = [];
        var rowCount = this.getRowCount();
        var expandColumns = (0, _m_columns_controller_utils.mergeColumns)(this, this.getExpandColumns(), this._columns);
        var rowspanGroupColumns = 0;
        var rowspanExpandColumns = 0;
        var _loop = function(rowIndex) {
            result.push([]);
            (0, _object.orderEach)(negativeIndexedColumns[rowIndex], (function(_, columns) {
                result[rowIndex].unshift.apply(result[rowIndex], columns)
            }));
            var firstPositiveIndexColumn = result[rowIndex].length;
            var positiveIndexedRowColumns = positiveIndexedColumns[rowIndex];
            positiveIndexedRowColumns.forEach((function(columnsByFixing) {
                (0, _object.orderEach)(columnsByFixing, (function(_, columnsByVisibleIndex) {
                    result[rowIndex].push.apply(result[rowIndex], columnsByVisibleIndex)
                }))
            }));
            if (rowspanExpandColumns <= rowIndex) {
                rowspanExpandColumns += _m_columns_controller_utils.processExpandColumns.call(_this3, result[rowIndex], expandColumns, _const.DETAIL_COMMAND_COLUMN_NAME, firstPositiveIndexColumn)
            }
            if (rowspanGroupColumns <= rowIndex) {
                rowspanGroupColumns += _m_columns_controller_utils.processExpandColumns.call(_this3, result[rowIndex], expandColumns, _const.GROUP_COMMAND_COLUMN_NAME, firstPositiveIndexColumn)
            }
        };
        for (var rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
            _loop(rowIndex)
        }
        result.push((0, _m_columns_controller_utils.getDataColumns)(result));
        return result
    };
    _proto.getInvisibleColumns = function(columns, bandColumnIndex) {
        var that = this;
        var result = [];
        var hiddenColumnsByBand;
        columns = columns || that._columns;
        (0, _iterator.each)(columns, (function(_, column) {
            if (column.ownerBand !== bandColumnIndex) {
                return
            }
            if (column.isBand) {
                if (!column.visible) {
                    hiddenColumnsByBand = that.getChildrenByBandColumn(column.index)
                } else {
                    hiddenColumnsByBand = that.getInvisibleColumns(that.getChildrenByBandColumn(column.index), column.index)
                }
                if (hiddenColumnsByBand.length) {
                    result.push(column);
                    result = result.concat(hiddenColumnsByBand)
                }
                return
            }
            if (!column.visible) {
                result.push(column)
            }
        }));
        return result
    };
    _proto.getChooserColumns = function(getAllColumns) {
        var columns = getAllColumns ? this.getColumns() : this.getInvisibleColumns();
        var columnChooserColumns = columns.filter((function(column) {
            return column.showInColumnChooser
        }));
        var sortOrder = this.option("columnChooser.sortOrder");
        return (0, _m_columns_controller_utils.sortColumns)(columnChooserColumns, sortOrder)
    };
    _proto.allowMoveColumn = function(fromVisibleIndex, toVisibleIndex, sourceLocation, targetLocation) {
        var columnIndex = (0, _m_columns_controller_utils.getColumnIndexByVisibleIndex)(this, fromVisibleIndex, sourceLocation);
        var sourceColumn = this._columns[columnIndex];
        if (sourceColumn && (sourceColumn.allowReordering || sourceColumn.allowGrouping || sourceColumn.allowHiding)) {
            if (sourceLocation === targetLocation) {
                if (sourceLocation === _const.COLUMN_CHOOSER_LOCATION) {
                    return false
                }
                fromVisibleIndex = (0, _type.isObject)(fromVisibleIndex) ? fromVisibleIndex.columnIndex : fromVisibleIndex;
                toVisibleIndex = (0, _type.isObject)(toVisibleIndex) ? toVisibleIndex.columnIndex : toVisibleIndex;
                return fromVisibleIndex !== toVisibleIndex && fromVisibleIndex + 1 !== toVisibleIndex
            }
            if (sourceLocation === _const.GROUP_LOCATION && targetLocation !== _const.COLUMN_CHOOSER_LOCATION || targetLocation === _const.GROUP_LOCATION) {
                return sourceColumn && sourceColumn.allowGrouping
            }
            if (sourceLocation === _const.COLUMN_CHOOSER_LOCATION || targetLocation === _const.COLUMN_CHOOSER_LOCATION) {
                return sourceColumn && sourceColumn.allowHiding
            }
            return true
        }
        return false
    };
    _proto.moveColumn = function(fromVisibleIndex, toVisibleIndex, sourceLocation, targetLocation) {
        var options = {};
        var prevGroupIndex;
        var fromIndex = (0, _m_columns_controller_utils.getColumnIndexByVisibleIndex)(this, fromVisibleIndex, sourceLocation);
        var toIndex = (0, _m_columns_controller_utils.getColumnIndexByVisibleIndex)(this, toVisibleIndex, targetLocation);
        var targetGroupIndex;
        if (fromIndex >= 0) {
            var column = this._columns[fromIndex];
            toVisibleIndex = (0, _type.isObject)(toVisibleIndex) ? toVisibleIndex.columnIndex : toVisibleIndex;
            targetGroupIndex = toIndex >= 0 ? this._columns[toIndex].groupIndex : -1;
            if ((0, _type.isDefined)(column.groupIndex) && sourceLocation === _const.GROUP_LOCATION) {
                if (targetGroupIndex > column.groupIndex) {
                    targetGroupIndex--
                }
                if (targetLocation !== _const.GROUP_LOCATION) {
                    options.groupIndex = void 0
                } else {
                    prevGroupIndex = column.groupIndex;
                    delete column.groupIndex;
                    (0, _m_columns_controller_utils.updateColumnGroupIndexes)(this)
                }
            }
            if (targetLocation === _const.GROUP_LOCATION) {
                options.groupIndex = (0, _m_columns_controller_utils.moveColumnToGroup)(this, column, targetGroupIndex);
                column.groupIndex = prevGroupIndex
            } else if (toVisibleIndex >= 0) {
                var targetColumn = this._columns[toIndex];
                if (!targetColumn || column.ownerBand !== targetColumn.ownerBand) {
                    options.visibleIndex = _const.MAX_SAFE_INTEGER
                } else if ((0, _m_columns_controller_utils.isColumnFixed)(this, column) ^ (0, _m_columns_controller_utils.isColumnFixed)(this, targetColumn)) {
                    options.visibleIndex = _const.MAX_SAFE_INTEGER
                } else {
                    options.visibleIndex = targetColumn.visibleIndex
                }
            }
            var isVisible = targetLocation !== _const.COLUMN_CHOOSER_LOCATION;
            if (column.visible !== isVisible) {
                options.visible = isVisible
            }
            this.columnOption(column.index, options)
        }
    };
    _proto.changeSortOrder = function(columnIndex, sortOrder) {
        var options = {};
        var sortingOptions = this.option("sorting");
        var sortingMode = sortingOptions && sortingOptions.mode;
        var needResetSorting = "single" === sortingMode || !sortOrder;
        var allowSorting = "single" === sortingMode || "multiple" === sortingMode;
        var column = this._columns[columnIndex];
        if (allowSorting && column && column.allowSorting) {
            if (needResetSorting && !(0, _type.isDefined)(column.groupIndex)) {
                (0, _iterator.each)(this._columns, (function(index) {
                    if (index !== columnIndex && this.sortOrder) {
                        if (!(0, _type.isDefined)(this.groupIndex)) {
                            delete this.sortOrder
                        }
                        delete this.sortIndex
                    }
                }))
            }
            if ((0, _m_columns_controller_utils.isSortOrderValid)(sortOrder)) {
                if (column.sortOrder !== sortOrder) {
                    options.sortOrder = sortOrder
                }
            } else if ("none" === sortOrder) {
                if (column.sortOrder) {
                    options.sortIndex = void 0;
                    options.sortOrder = void 0
                }
            } else {
                ! function(column) {
                    if ("ctrl" === sortOrder) {
                        if (!("sortOrder" in column && "sortIndex" in column)) {
                            return false
                        }
                        options.sortOrder = void 0;
                        options.sortIndex = void 0
                    } else if ((0, _type.isDefined)(column.groupIndex) || (0, _type.isDefined)(column.sortIndex)) {
                        options.sortOrder = "desc" === column.sortOrder ? "asc" : "desc"
                    } else {
                        options.sortOrder = "asc"
                    }
                    return true
                }(column)
            }
        }
        this.columnOption(column.index, options)
    };
    _proto.getSortDataSourceParameters = function(useLocalSelector) {
        var sortColumns = [];
        var sort = [];
        (0, _iterator.each)(this._columns, (function() {
            if ((this.dataField || this.selector || this.calculateCellValue) && (0, _type.isDefined)(this.sortIndex) && !(0, _type.isDefined)(this.groupIndex)) {
                sortColumns[this.sortIndex] = this
            }
        }));
        (0, _iterator.each)(sortColumns, (function() {
            var sortOrder = this && this.sortOrder;
            if ((0, _m_columns_controller_utils.isSortOrderValid)(sortOrder)) {
                var sortItem = {
                    selector: this.calculateSortValue || this.displayField || this.calculateDisplayValue || useLocalSelector && this.selector || this.dataField || this.calculateCellValue,
                    desc: "desc" === this.sortOrder
                };
                if (this.sortingMethod) {
                    sortItem.compare = this.sortingMethod.bind(this)
                }
                sort.push(sortItem)
            }
        }));
        return sort.length > 0 ? sort : null
    };
    _proto.getGroupDataSourceParameters = function(useLocalSelector) {
        var group = [];
        (0, _iterator.each)(this.getGroupColumns(), (function() {
            var selector = this.calculateGroupValue || this.displayField || this.calculateDisplayValue || useLocalSelector && this.selector || this.dataField || this.calculateCellValue;
            if (selector) {
                var groupItem = {
                    selector: selector,
                    desc: "desc" === this.sortOrder,
                    isExpanded: !!this.autoExpandGroup
                };
                if (this.sortingMethod) {
                    groupItem.compare = this.sortingMethod.bind(this)
                }
                group.push(groupItem)
            }
        }));
        return group.length > 0 ? group : null
    };
    _proto.refresh = function(updateNewLookupsOnly) {
        var deferreds = [];
        (0, _iterator.each)(this._columns, (function() {
            var lookup = this.lookup;
            if (lookup && !this.calculateDisplayValue) {
                if (updateNewLookupsOnly && lookup.valueMap) {
                    return
                }
                if (lookup.update) {
                    deferreds.push(lookup.update())
                }
            }
        }));
        return _deferred.when.apply(_renderer.default, deferreds).done(_m_columns_controller_utils.resetColumnsCache.bind(null, this))
    };
    _proto._updateColumnOptions = function(column, columnIndex) {
        column.selector = column.selector || function(data) {
            return column.calculateCellValue(data)
        };
        if (this._reinitAfterLookupChanges && this._previousColumns) {
            column.selector.columnIndex = columnIndex;
            column.selector.originalCallback = this._previousColumns[columnIndex].selector.originalCallback
        } else {
            column.selector.columnIndex = columnIndex;
            column.selector.originalCallback = column.selector
        }(0, _iterator.each)(["calculateSortValue", "calculateGroupValue", "calculateDisplayValue"], (function(_, calculateCallbackName) {
            var calculateCallback = column[calculateCallbackName];
            if ((0, _type.isFunction)(calculateCallback)) {
                if (!calculateCallback.originalCallback) {
                    var context = {
                        column: column
                    };
                    column[calculateCallbackName] = function(data) {
                        return calculateCallback.call(context.column, data)
                    };
                    column[calculateCallbackName].originalCallback = calculateCallback;
                    column[calculateCallbackName].columnIndex = columnIndex;
                    column[calculateCallbackName].context = context
                } else {
                    column[calculateCallbackName].context.column = column
                }
            }
        }));
        if ((0, _type.isString)(column.calculateDisplayValue)) {
            column.displayField = column.calculateDisplayValue;
            column.calculateDisplayValue = (0, _data.compileGetter)(column.displayField)
        }
        if (column.calculateDisplayValue) {
            column.displayValueMap = column.displayValueMap || {}
        }(0, _m_columns_controller_utils.updateSerializers)(column, column.dataType);
        var lookup = column.lookup;
        if (lookup) {
            (0, _m_columns_controller_utils.updateSerializers)(lookup, lookup.dataType)
        }
        var dataType = lookup ? lookup.dataType : column.dataType;
        if (dataType) {
            column.alignment = column.alignment || (0, _m_columns_controller_utils.getAlignmentByDataType)(dataType, this.option("rtlEnabled"));
            column.format = column.format || _m_utils.default.getFormatByDataType(dataType);
            column.customizeText = column.customizeText || (0, _m_columns_controller_utils.getCustomizeTextByDataType)(dataType);
            column.defaultFilterOperations = column.defaultFilterOperations || !lookup && _const.DATATYPE_OPERATIONS[dataType] || [];
            if (!(0, _type.isDefined)(column.filterOperations)) {
                (0, _m_columns_controller_utils.setFilterOperationsAsDefaultValues)(column)
            }
            column.defaultFilterOperation = column.filterOperations && column.filterOperations[0] || "=";
            column.showEditorAlways = (0, _type.isDefined)(column.showEditorAlways) ? column.showEditorAlways : "boolean" === dataType && !column.cellTemplate && !column.lookup
        }
    };
    _proto.updateColumnDataTypes = function(dataSource) {
        var that = this;
        var dateSerializationFormat = that.option("dateSerializationFormat");
        var firstItems = that._getFirstItems(dataSource);
        var isColumnDataTypesUpdated = false;
        (0, _iterator.each)(that._columns, (function(index, column) {
            var i;
            var value;
            var dataType;
            var lookupDataType;
            var valueDataType;
            var lookup = column.lookup;
            if (_m_utils.default.isDateType(column.dataType) && void 0 === column.serializationFormat) {
                column.serializationFormat = dateSerializationFormat
            }
            if (lookup && _m_utils.default.isDateType(lookup.dataType) && void 0 === column.serializationFormat) {
                lookup.serializationFormat = dateSerializationFormat
            }
            if (column.calculateCellValue && firstItems.length) {
                if (!column.dataType || lookup && !lookup.dataType) {
                    for (i = 0; i < firstItems.length; i++) {
                        value = column.calculateCellValue(firstItems[i]);
                        if (!column.dataType) {
                            valueDataType = (0, _m_columns_controller_utils.getValueDataType)(value);
                            dataType = dataType || valueDataType;
                            if (dataType && valueDataType && dataType !== valueDataType) {
                                dataType = "string"
                            }
                        }
                        if (lookup && !lookup.dataType) {
                            valueDataType = (0, _m_columns_controller_utils.getValueDataType)(_m_utils.default.getDisplayValue(column, value, firstItems[i]));
                            lookupDataType = lookupDataType || valueDataType;
                            if (lookupDataType && valueDataType && lookupDataType !== valueDataType) {
                                lookupDataType = "string"
                            }
                        }
                    }
                    if (dataType || lookupDataType) {
                        if (dataType) {
                            column.dataType = dataType
                        }
                        if (lookup && lookupDataType) {
                            lookup.dataType = lookupDataType
                        }
                        isColumnDataTypesUpdated = true
                    }
                }
                if (void 0 === column.serializationFormat || lookup && void 0 === lookup.serializationFormat) {
                    for (i = 0; i < firstItems.length; i++) {
                        value = column.calculateCellValue(firstItems[i], true);
                        if (void 0 === column.serializationFormat) {
                            column.serializationFormat = (0, _m_columns_controller_utils.getSerializationFormat)(column.dataType, value)
                        }
                        if (lookup && void 0 === lookup.serializationFormat) {
                            lookup.serializationFormat = (0, _m_columns_controller_utils.getSerializationFormat)(lookup.dataType, lookup.calculateCellValue(value, true))
                        }
                    }
                }
            }
            that._updateColumnOptions(column, index)
        }));
        return isColumnDataTypesUpdated
    };
    _proto._customizeColumns = function(columns) {
        var customizeColumns = this.option("customizeColumns");
        if (customizeColumns) {
            var hasOwnerBand = columns.some((function(column) {
                return (0, _type.isObject)(column.ownerBand)
            }));
            if (hasOwnerBand) {
                (0, _m_columns_controller_utils.updateIndexes)(this)
            }
            customizeColumns(columns);
            (0, _m_columns_controller_utils.assignColumns)(this, (0, _m_columns_controller_utils.createColumnsFromOptions)(this, columns))
        }
    };
    _proto.updateColumns = function(dataSource, forceApplying, isApplyingUserState) {
        var _this4 = this;
        if (!forceApplying) {
            this.updateSortingGrouping(dataSource)
        }
        if (!dataSource || dataSource.isLoaded()) {
            var sortParameters = dataSource ? dataSource.sort() || [] : this.getSortDataSourceParameters();
            var groupParameters = dataSource ? dataSource.group() || [] : this.getGroupDataSourceParameters();
            var filterParameters = null === dataSource || void 0 === dataSource ? void 0 : dataSource.lastLoadOptions().filter;
            if (!isApplyingUserState) {
                this._customizeColumns(this._columns)
            }(0, _m_columns_controller_utils.updateIndexes)(this);
            var columns = this._columns;
            return (0, _deferred.when)(this.refresh(true)).always((function() {
                if (_this4._columns !== columns) {
                    return
                }
                _this4._updateChanges(dataSource, {
                    sorting: sortParameters,
                    grouping: groupParameters,
                    filtering: filterParameters
                });
                (0, _m_columns_controller_utils.fireColumnsChanged)(_this4)
            }))
        }
    };
    _proto._updateChanges = function(dataSource, parameters) {
        if (dataSource) {
            this.updateColumnDataTypes(dataSource);
            this._dataSourceApplied = true
        }
        if (!_m_utils.default.equalSortParameters(parameters.sorting, this.getSortDataSourceParameters())) {
            (0, _m_columns_controller_utils.updateColumnChanges)(this, "sorting")
        }
        if (!_m_utils.default.equalSortParameters(parameters.grouping, this.getGroupDataSourceParameters())) {
            (0, _m_columns_controller_utils.updateColumnChanges)(this, "grouping")
        }
        var dataController = this.getController("data");
        if (dataController && !_m_utils.default.equalFilterParameters(parameters.filtering, dataController.getCombinedFilter())) {
            (0, _m_columns_controller_utils.updateColumnChanges)(this, "filtering")
        }(0, _m_columns_controller_utils.updateColumnChanges)(this, "columns")
    };
    _proto.updateSortingGrouping = function(dataSource, fromDataSource) {
        var that = this;
        var sortParameters;
        var isColumnsChanged;
        var updateSortGroupParameterIndexes = function(columns, sortParameters, indexParameterName) {
            (0, _iterator.each)(columns, (function(index, column) {
                delete column[indexParameterName];
                if (sortParameters) {
                    for (var i = 0; i < sortParameters.length; i++) {
                        var selector = sortParameters[i].selector;
                        var isExpanded = sortParameters[i].isExpanded;
                        if (selector === column.dataField || selector === column.name || selector === column.selector || selector === column.calculateCellValue || selector === column.calculateGroupValue || selector === column.calculateDisplayValue) {
                            if (fromDataSource) {
                                column.sortOrder = "sortOrder" in column ? column.sortOrder : sortParameters[i].desc ? "desc" : "asc"
                            } else {
                                column.sortOrder = column.sortOrder || (sortParameters[i].desc ? "desc" : "asc")
                            }
                            if (void 0 !== isExpanded) {
                                column.autoExpandGroup = isExpanded
                            }
                            column[indexParameterName] = i;
                            break
                        }
                    }
                }
            }))
        };
        if (dataSource) {
            sortParameters = _m_utils.default.normalizeSortingInfo(dataSource.sort());
            var groupParameters = _m_utils.default.normalizeSortingInfo(dataSource.group());
            var columnsGroupParameters = that.getGroupDataSourceParameters();
            var columnsSortParameters = that.getSortDataSourceParameters();
            var groupingChanged = !_m_utils.default.equalSortParameters(groupParameters, columnsGroupParameters, true);
            var groupExpandingChanged = !groupingChanged && !_m_utils.default.equalSortParameters(groupParameters, columnsGroupParameters);
            if (!that._columns.length) {
                (0, _iterator.each)(groupParameters, (function(index, group) {
                    that._columns.push(group.selector)
                }));
                (0, _iterator.each)(sortParameters, (function(index, sort) {
                    if (!(0, _type.isFunction)(sort.selector)) {
                        that._columns.push(sort.selector)
                    }
                }));
                (0, _m_columns_controller_utils.assignColumns)(that, (0, _m_columns_controller_utils.createColumnsFromOptions)(that, that._columns))
            }
            if ((fromDataSource || !columnsGroupParameters && !that._hasUserState) && (groupingChanged || groupExpandingChanged)) {
                updateSortGroupParameterIndexes(that._columns, groupParameters, "groupIndex");
                if (fromDataSource) {
                    groupingChanged && (0, _m_columns_controller_utils.updateColumnChanges)(that, "grouping");
                    groupExpandingChanged && (0, _m_columns_controller_utils.updateColumnChanges)(that, "groupExpanding");
                    isColumnsChanged = true
                }
            }
            if ((fromDataSource || !columnsSortParameters && !that._hasUserState) && !_m_utils.default.equalSortParameters(sortParameters, columnsSortParameters)) {
                updateSortGroupParameterIndexes(that._columns, sortParameters, "sortIndex");
                if (fromDataSource) {
                    (0, _m_columns_controller_utils.updateColumnChanges)(that, "sorting");
                    isColumnsChanged = true
                }
            }
            if (isColumnsChanged) {
                (0, _m_columns_controller_utils.fireColumnsChanged)(that)
            }
        }
    };
    _proto.updateFilter = function(filter, remoteFiltering, columnIndex, filterValue) {
        if (!Array.isArray(filter)) {
            return filter
        }
        filter = (0, _extend.extend)([], filter);
        columnIndex = void 0 !== filter.columnIndex ? filter.columnIndex : columnIndex;
        filterValue = void 0 !== filter.filterValue ? filter.filterValue : filterValue;
        if ((0, _type.isString)(filter[0]) && "!" !== filter[0]) {
            var column = this.columnOption(filter[0]);
            if (remoteFiltering) {
                if ((0, _config.default)().forceIsoDateParsing && column && column.serializeValue && filter.length > 1) {
                    filter[filter.length - 1] = column.serializeValue(filter[filter.length - 1], "filter")
                }
            } else if (column && column.selector) {
                filter[0] = column.selector;
                filter[0].columnIndex = column.index
            }
        } else if ((0, _type.isFunction)(filter[0])) {
            filter[0].columnIndex = columnIndex;
            filter[0].filterValue = filterValue;
            filter[0].selectedFilterOperation = filter.selectedFilterOperation
        }
        for (var i = 0; i < filter.length; i++) {
            filter[i] = this.updateFilter(filter[i], remoteFiltering, columnIndex, filterValue)
        }
        return filter
    };
    _proto.columnCount = function() {
        return this._columns ? this._columns.length : 0
    };
    _proto.columnOption = function(identifier, option, value, notFireEvent) {
        var that = this;
        var columns = that._columns.concat(that._commandColumns);
        var column = (0, _m_columns_controller_utils.findColumn)(columns, identifier);
        if (column) {
            if (1 === arguments.length) {
                return (0, _extend.extend)({}, column)
            }
            if ((0, _type.isString)(option)) {
                if (2 === arguments.length) {
                    return (0, _m_columns_controller_utils.columnOptionCore)(that, column, option)
                }(0, _m_columns_controller_utils.columnOptionCore)(that, column, option, value, notFireEvent)
            } else if ((0, _type.isObject)(option)) {
                (0, _iterator.each)(option, (function(optionName, value) {
                    (0, _m_columns_controller_utils.columnOptionCore)(that, column, optionName, value, notFireEvent)
                }))
            }(0, _m_columns_controller_utils.fireColumnsChanged)(that)
        }
    };
    _proto.clearSorting = function() {
        var columnCount = this.columnCount();
        this.beginUpdate();
        for (var i = 0; i < columnCount; i++) {
            this.columnOption(i, "sortOrder", void 0);
            delete(0, _m_columns_controller_utils.findColumn)(this._columns, i).sortOrder
        }
        this.endUpdate()
    };
    _proto.clearGrouping = function() {
        var columnCount = this.columnCount();
        this.beginUpdate();
        for (var i = 0; i < columnCount; i++) {
            this.columnOption(i, "groupIndex", void 0)
        }
        this.endUpdate()
    };
    _proto.getVisibleIndex = function(index, rowIndex) {
        var columns = this.getVisibleColumns(rowIndex);
        for (var i = columns.length - 1; i >= 0; i--) {
            if (columns[i].index === index) {
                return i
            }
        }
        return -1
    };
    _proto.getVisibleIndexByColumn = function(column, rowIndex) {
        var visibleColumns = this.getVisibleColumns(rowIndex);
        var visibleColumn = visibleColumns.filter((function(col) {
            return col.index === column.index && col.command === column.command
        }))[0];
        return visibleColumns.indexOf(visibleColumn)
    };
    _proto.getVisibleColumnIndex = function(id, rowIndex) {
        var index = this.columnOption(id, "index");
        return this.getVisibleIndex(index, rowIndex)
    };
    _proto.addColumn = function(options) {
        var column = (0, _m_columns_controller_utils.createColumn)(this, options);
        var index = this._columns.length;
        this._columns.push(column);
        if (column.isBand) {
            this._columns = (0, _m_columns_controller_utils.createColumnsFromOptions)(this, this._columns);
            column = this._columns[index]
        }
        column.added = options;
        (0, _m_columns_controller_utils.updateIndexes)(this, column);
        this.updateColumns(this._dataSource);
        this._checkColumns()
    };
    _proto.deleteColumn = function(id) {
        var column = this.columnOption(id);
        if (column && column.index >= 0) {
            (0, _m_columns_controller_utils.convertOwnerBandToColumnReference)(this._columns);
            this._columns.splice(column.index, 1);
            if (column.isBand) {
                var childIndexes = this.getChildrenByBandColumn(column.index).map((function(column) {
                    return column.index
                }));
                this._columns = this._columns.filter((function(column) {
                    return childIndexes.indexOf(column.index) < 0
                }))
            }(0, _m_columns_controller_utils.updateIndexes)(this);
            this.updateColumns(this._dataSource)
        }
    };
    _proto.addCommandColumn = function(options) {
        var commandColumn = this._commandColumns.filter((function(column) {
            return column.command === options.command
        }))[0];
        if (!commandColumn) {
            commandColumn = options;
            this._commandColumns.push(commandColumn)
        }
    };
    _proto.getUserState = function() {
        var columns = this._columns;
        var result = [];
        var i;

        function handleStateField(index, value) {
            if (void 0 !== columns[i][value]) {
                result[i][value] = columns[i][value]
            }
        }
        for (i = 0; i < columns.length; i++) {
            result[i] = {};
            (0, _iterator.each)(_const.USER_STATE_FIELD_NAMES, handleStateField)
        }
        return result
    };
    _proto.setName = function(column) {
        column.name = column.name || column.dataField || column.type
    };
    _proto.setUserState = function(state) {
        var dataSource = this._dataSource;
        var ignoreColumnOptionNames = this.option("stateStoring.ignoreColumnOptionNames");
        null === state || void 0 === state ? void 0 : state.forEach(this.setName);
        if (!ignoreColumnOptionNames) {
            ignoreColumnOptionNames = [];
            var commonColumnSettings = this.getCommonSettings();
            if (!this.option("columnChooser.enabled")) {
                ignoreColumnOptionNames.push("visible")
            }
            if ("none" === this.option("sorting.mode")) {
                ignoreColumnOptionNames.push("sortIndex", "sortOrder")
            }
            if (!commonColumnSettings.allowGrouping) {
                ignoreColumnOptionNames.push("groupIndex")
            }
            if (!commonColumnSettings.allowFixing) {
                ignoreColumnOptionNames.push("fixed", "fixedPosition")
            }
            if (!commonColumnSettings.allowResizing) {
                ignoreColumnOptionNames.push("width", "visibleWidth")
            }
            var isFilterPanelHidden = !this.option("filterPanel.visible");
            if (!this.option("filterRow.visible") && isFilterPanelHidden) {
                ignoreColumnOptionNames.push("filterValue", "selectedFilterOperation")
            }
            if (!this.option("headerFilter.visible") && isFilterPanelHidden) {
                ignoreColumnOptionNames.push("filterValues", "filterType")
            }
        }
        this._columnsUserState = state;
        this._ignoreColumnOptionNames = ignoreColumnOptionNames;
        this._hasUserState = !!state;
        (0, _m_columns_controller_utils.updateColumnChanges)(this, "filtering");
        this.init(true);
        if (dataSource) {
            dataSource.sort(this.getSortDataSourceParameters());
            dataSource.group(this.getGroupDataSourceParameters())
        }
    };
    _proto._checkColumns = function() {
        var usedNames = {};
        var hasEditableColumnWithoutName = false;
        var duplicatedNames = [];
        this._columns.forEach((function(column) {
            var _a;
            var name = column.name;
            var isBand = null === (_a = column.columns) || void 0 === _a ? void 0 : _a.length;
            var isEditable = column.allowEditing && (column.dataField || column.setCellValue) && !isBand;
            if (name) {
                if (usedNames[name]) {
                    duplicatedNames.push('"'.concat(name, '"'))
                }
                usedNames[name] = true
            } else if (isEditable) {
                hasEditableColumnWithoutName = true
            }
        }));
        if (duplicatedNames.length) {
            _ui.default.log("E1059", duplicatedNames.join(", "))
        }
        if (hasEditableColumnWithoutName) {
            _ui.default.log("E1060")
        }
    };
    _proto._createCalculatedColumnOptions = function(columnOptions, bandColumn) {
        var calculatedColumnOptions = {};
        var dataField = columnOptions.dataField;
        if (Array.isArray(columnOptions.columns) && columnOptions.columns.length || columnOptions.isBand) {
            calculatedColumnOptions.isBand = true;
            dataField = null
        }
        if (dataField) {
            if ((0, _type.isString)(dataField)) {
                var getter = (0, _data.compileGetter)(dataField);
                calculatedColumnOptions = {
                    caption: (0, _inflector.captionize)(dataField),
                    calculateCellValue: function(data, skipDeserialization) {
                        var value = getter(data);
                        return this.deserializeValue && !skipDeserialization ? this.deserializeValue(value) : value
                    },
                    setCellValue: _m_columns_controller_utils.defaultSetCellValue,
                    parseValue: function(text) {
                        var result;
                        var parsedValue;
                        if ("number" === this.dataType) {
                            if ((0, _type.isString)(text) && this.format) {
                                result = (0, _m_columns_controller_utils.strictParseNumber)(text.trim(), this.format)
                            } else if ((0, _type.isDefined)(text) && (0, _type.isNumeric)(text)) {
                                result = Number(text)
                            }
                        } else if ("boolean" === this.dataType) {
                            if (text === this.trueText) {
                                result = true
                            } else if (text === this.falseText) {
                                result = false
                            }
                        } else if (_m_utils.default.isDateType(this.dataType)) {
                            parsedValue = _date.default.parse(text, this.format);
                            if (parsedValue) {
                                result = parsedValue
                            }
                        } else {
                            result = text
                        }
                        return result
                    }
                }
            }
            calculatedColumnOptions.allowFiltering = true
        } else {
            calculatedColumnOptions.allowFiltering = !!columnOptions.calculateFilterExpression
        }
        calculatedColumnOptions.calculateFilterExpression = function() {
            return _filtering.default.defaultCalculateFilterExpression.apply(this, arguments)
        };
        calculatedColumnOptions.defaultFilterOperation = "=";
        calculatedColumnOptions.createFilterExpression = function(filterValue, selectedFilterOperation) {
            var result;
            if (this.calculateFilterExpression) {
                result = this.calculateFilterExpression.apply(this, arguments)
            }
            if ((0, _type.isFunction)(result)) {
                result = [result, "=", true]
            }
            if (result) {
                result.columnIndex = this.index;
                result.filterValue = filterValue;
                result.selectedFilterOperation = selectedFilterOperation
            }
            return result
        };
        if (!dataField || !(0, _type.isString)(dataField)) {
            (0, _extend.extend)(true, calculatedColumnOptions, {
                allowSorting: false,
                allowGrouping: false,
                calculateCellValue: function() {
                    return null
                }
            })
        }
        if (bandColumn) {
            calculatedColumnOptions.allowFixing = false
        }
        if (columnOptions.dataType) {
            calculatedColumnOptions.userDataType = columnOptions.dataType
        }
        if (columnOptions.selectedFilterOperation && !("defaultSelectedFilterOperation" in calculatedColumnOptions)) {
            calculatedColumnOptions.defaultSelectedFilterOperation = columnOptions.selectedFilterOperation
        }
        if (columnOptions.lookup) {
            calculatedColumnOptions.lookup = {
                calculateCellValue: function(value, skipDeserialization) {
                    if (this.valueExpr) {
                        value = this.valueMap && this.valueMap[value]
                    }
                    return this.deserializeValue && !skipDeserialization ? this.deserializeValue(value) : value
                },
                updateValueMap: function() {
                    this.valueMap = {};
                    if (this.items) {
                        var calculateValue = (0, _data.compileGetter)(this.valueExpr);
                        var calculateDisplayValue = (0, _data.compileGetter)(this.displayExpr);
                        for (var i = 0; i < this.items.length; i++) {
                            var item = this.items[i];
                            var displayValue = calculateDisplayValue(item);
                            this.valueMap[calculateValue(item)] = displayValue;
                            this.dataType = this.dataType || (0, _m_columns_controller_utils.getValueDataType)(displayValue)
                        }
                    }
                },
                update: function() {
                    var that = this;
                    var dataSource = that.dataSource;
                    if (dataSource) {
                        if ((0, _type.isFunction)(dataSource) && !_variable_wrapper.default.isWrapped(dataSource)) {
                            dataSource = dataSource({})
                        }
                        if ((0, _type.isPlainObject)(dataSource) || dataSource instanceof _abstract_store.default || Array.isArray(dataSource)) {
                            if (that.valueExpr) {
                                var dataSourceOptions = (0, _utils.normalizeDataSourceOptions)(dataSource);
                                dataSourceOptions.paginate = false;
                                dataSource = new _data_source.DataSource(dataSourceOptions);
                                return dataSource.load().done((function(data) {
                                    that.items = data;
                                    that.updateValueMap && that.updateValueMap()
                                }))
                            }
                        } else {
                            _ui.default.log("E1016")
                        }
                    } else {
                        that.updateValueMap && that.updateValueMap()
                    }
                }
            }
        }
        calculatedColumnOptions.resizedCallbacks = (0, _callbacks.default)();
        if (columnOptions.resized) {
            calculatedColumnOptions.resizedCallbacks.add(columnOptions.resized.bind(columnOptions))
        }(0, _iterator.each)(calculatedColumnOptions, (function(optionName) {
            if ((0, _type.isFunction)(calculatedColumnOptions[optionName]) && 0 !== optionName.indexOf("default")) {
                var defaultOptionName = "default".concat(optionName.charAt(0).toUpperCase()).concat(optionName.substr(1));
                calculatedColumnOptions[defaultOptionName] = calculatedColumnOptions[optionName]
            }
        }));
        return calculatedColumnOptions
    };
    _proto.getRowCount = function() {
        this._rowCount = this._rowCount || (0, _m_columns_controller_utils.getRowCount)(this);
        return this._rowCount
    };
    _proto.getRowIndex = function(columnIndex, alwaysGetRowIndex) {
        var column = this._columns[columnIndex];
        var bandColumnsCache = this.getBandColumnsCache();
        return column && (alwaysGetRowIndex || column.visible && !(column.command || (0, _type.isDefined)(column.groupIndex))) ? (0, _m_columns_controller_utils.getParentBandColumns)(columnIndex, bandColumnsCache.columnParentByIndex).length : 0
    };
    _proto.getChildrenByBandColumn = function(bandColumnIndex, onlyVisibleDirectChildren) {
        var bandColumnsCache = this.getBandColumnsCache();
        var result = (0, _m_columns_controller_utils.getChildrenByBandColumn)(bandColumnIndex, bandColumnsCache.columnChildrenByIndex, !onlyVisibleDirectChildren);
        if (onlyVisibleDirectChildren) {
            return result.filter((function(column) {
                return column.visible && !column.command
            })).sort((function(column1, column2) {
                return column1.visibleIndex - column2.visibleIndex
            }))
        }
        return result
    };
    _proto.isParentBandColumn = function(columnIndex, bandColumnIndex) {
        var result = false;
        var column = this._columns[columnIndex];
        var bandColumnsCache = this.getBandColumnsCache();
        var parentBandColumns = column && (0, _m_columns_controller_utils.getParentBandColumns)(columnIndex, bandColumnsCache.columnParentByIndex);
        if (parentBandColumns) {
            (0, _iterator.each)(parentBandColumns, (function(_, bandColumn) {
                if (bandColumn.index === bandColumnIndex) {
                    result = true;
                    return false
                }
            }))
        }
        return result
    };
    _proto.isParentColumnVisible = function(columnIndex) {
        var result = true;
        var bandColumnsCache = this.getBandColumnsCache();
        var bandColumns = columnIndex >= 0 && (0, _m_columns_controller_utils.getParentBandColumns)(columnIndex, bandColumnsCache.columnParentByIndex);
        bandColumns && (0, _iterator.each)(bandColumns, (function(_, bandColumn) {
            result = result && bandColumn.visible;
            return result
        }));
        return result
    };
    _proto.getColumnId = function(column) {
        if (column.command && column.type === _const.GROUP_COMMAND_COLUMN_NAME) {
            if ((0, _m_columns_controller_utils.isCustomCommandColumn)(this, column)) {
                return "type:".concat(column.type)
            }
            return "command:".concat(column.command)
        }
        return column.index
    };
    _proto.getCustomizeTextByDataType = function(dataType) {
        return (0, _m_columns_controller_utils.getCustomizeTextByDataType)(dataType)
    };
    _proto.getHeaderContentAlignment = function(columnAlignment) {
        var rtlEnabled = this.option("rtlEnabled");
        if (rtlEnabled) {
            return "left" === columnAlignment ? "right" : "left"
        }
        return columnAlignment
    };
    return ColumnsController
}(_m_modules.default.Controller);
exports.ColumnsController = ColumnsController;
var columnsControllerModule = {
    defaultOptions: function() {
        return {
            commonColumnSettings: {
                allowFiltering: true,
                allowHiding: true,
                allowSorting: true,
                allowEditing: true,
                encodeHtml: true,
                trueText: _message.default.format("dxDataGrid-trueText"),
                falseText: _message.default.format("dxDataGrid-falseText")
            },
            allowColumnReordering: false,
            allowColumnResizing: false,
            columnResizingMode: "nextColumn",
            columnMinWidth: void 0,
            columnWidth: void 0,
            adaptColumnWidthByRatio: true,
            columns: void 0,
            regenerateColumnsByVisibleItems: false,
            customizeColumns: null,
            dateSerializationFormat: void 0
        }
    },
    controllers: {
        columns: ColumnsController
    }
};
exports.columnsControllerModule = columnsControllerModule;
