/**
 * DevExtreme (bundles/__internal/grids/grid_core/adaptivity/m_adaptivity.js)
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
exports.adaptivityModule = void 0;
var _guid = _interopRequireDefault(require("../../../../core/guid"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _common = require("../../../../core/utils/common");
var _deferred = require("../../../../core/utils/deferred");
var _dom = require("../../../../core/utils/dom");
var _extend = require("../../../../core/utils/extend");
var _iterator = require("../../../../core/utils/iterator");
var _size = require("../../../../core/utils/size");
var _type = require("../../../../core/utils/type");
var _click = require("../../../../events/click");
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
var _index = require("../../../../events/utils/index");
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _form = _interopRequireDefault(require("../../../../ui/form"));
var _themes = require("../../../../ui/themes");
var _m_modules = _interopRequireDefault(require("../m_modules"));
var _m_utils = _interopRequireDefault(require("../m_utils"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
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
var COLUMN_HEADERS_VIEW = "columnHeadersView";
var ROWS_VIEW = "rowsView";
var FOOTER_VIEW = "footerView";
var COLUMN_VIEWS = [COLUMN_HEADERS_VIEW, ROWS_VIEW, FOOTER_VIEW];
var ADAPTIVE_NAMESPACE = "dxDataGridAdaptivity";
var HIDDEN_COLUMNS_WIDTH = "adaptiveHidden";
var ADAPTIVE_ROW_TYPE = "detailAdaptive";
var FORM_ITEM_CONTENT_CLASS = "dx-field-item-content";
var FORM_ITEM_MODIFIED = "dx-item-modified";
var HIDDEN_COLUMN_CLASS = "hidden-column";
var ADAPTIVE_COLUMN_BUTTON_CLASS = "adaptive-more";
var ADAPTIVE_COLUMN_NAME_CLASS = "dx-command-adaptive";
var COMMAND_ADAPTIVE_HIDDEN_CLASS = "dx-command-adaptive-hidden";
var ADAPTIVE_DETAIL_ROW_CLASS = "dx-adaptive-detail-row";
var ADAPTIVE_ITEM_TEXT_CLASS = "dx-adaptive-item-text";
var MASTER_DETAIL_CELL_CLASS = "dx-master-detail-cell";
var LAST_DATA_CELL_CLASS = "dx-last-data-cell";
var ADAPTIVE_COLUMN_NAME = "adaptive";
var EDIT_MODE_BATCH = "batch";
var EDIT_MODE_ROW = "row";
var EDIT_MODE_FORM = "form";
var EDIT_MODE_POPUP = "popup";
var REVERT_TOOLTIP_CLASS = "revert-tooltip";
var GROUP_CELL_CLASS = "dx-group-cell";
var GROUP_ROW_CLASS = "dx-group-row";
var EXPAND_ARIA_NAME = "dxDataGrid-ariaAdaptiveExpand";
var COLLAPSE_ARIA_NAME = "dxDataGrid-ariaAdaptiveCollapse";
var LEGACY_SCROLLING_MODE = "scrolling.legacyMode";

function getColumnId(that, column) {
    return that._columnsController.getColumnId(column)
}

function getDataCellElements($row) {
    return $row.find("td:not(.dx-datagrid-hidden-column):not([class*='dx-command-'])")
}

function adaptiveCellTemplate(container, options) {
    var $adaptiveColumnButton;
    var $container = (0, _renderer.default)(container);
    var adaptiveColumnsController = options.component.getController("adaptiveColumns");
    if ("data" === options.rowType) {
        $adaptiveColumnButton = (0, _renderer.default)("<span>").addClass(adaptiveColumnsController.addWidgetPrefix(ADAPTIVE_COLUMN_BUTTON_CLASS));
        _events_engine.default.on($adaptiveColumnButton, (0, _index.addNamespace)(_click.name, ADAPTIVE_NAMESPACE), adaptiveColumnsController.createAction((function() {
            adaptiveColumnsController.toggleExpandAdaptiveDetailRow(options.key)
        })));
        $adaptiveColumnButton.appendTo($container)
    } else {
        _m_utils.default.setEmptyText($container)
    }
}

function focusCellHandler(e) {
    var _a;
    var $nextCell = null === (_a = e.data) || void 0 === _a ? void 0 : _a.$nextCell;
    _events_engine.default.off($nextCell, "focus", focusCellHandler);
    _events_engine.default.trigger($nextCell, "dxclick")
}
var adaptiveColumnsControllerMembers = {
    _isRowEditMode: function() {
        var editMode = this._getEditMode();
        return editMode === EDIT_MODE_ROW
    },
    _isItemModified: function(item, cellOptions) {
        var columnIndex = this._columnsController.getVisibleIndex(item.column.index);
        var rowIndex = this._dataController.getRowIndexByKey(cellOptions.key);
        var row = this._dataController.items()[rowIndex + 1];
        return row && row.modifiedValues && (0, _type.isDefined)(row.modifiedValues[columnIndex])
    },
    _renderFormViewTemplate: function(item, cellOptions, $container) {
        var that = this;
        var column = item.column;
        var focusAction = that.createAction((function() {
            if (that._editingController.isEditing()) {
                _events_engine.default.trigger($container, _click.name)
            }
        }));
        var rowData = cellOptions.row.data;
        var value = column.calculateCellValue(rowData);
        var displayValue = _m_utils.default.getDisplayValue(column, value, rowData, cellOptions.rowType);
        var text = _m_utils.default.formatValue(displayValue, column);
        var isCellOrBatchEditMode = this._editingController.isCellOrBatchEditMode();
        var rowsView = that._rowsView;
        if (column.allowEditing && that.getController("keyboardNavigation").isKeyboardEnabled()) {
            $container.attr("tabIndex", that.option("tabIndex"));
            if (isCellOrBatchEditMode) {
                _events_engine.default.off($container, "focus", focusAction);
                _events_engine.default.on($container, "focus", focusAction)
            }
        }
        if (column.cellTemplate) {
            var templateOptions = (0, _extend.extend)({}, cellOptions, {
                value: value,
                displayValue: displayValue,
                text: text,
                column: column
            });
            rowsView.renderTemplate($container, column.cellTemplate, templateOptions, (0, _dom.isElementInDom)($container)).done((function() {
                rowsView._cellPrepared($container, cellOptions)
            }))
        } else {
            var container = $container.get(0);
            if (column.encodeHtml) {
                container.textContent = text
            } else {
                container.innerHTML = text
            }
            $container.addClass(ADAPTIVE_ITEM_TEXT_CLASS);
            if (!(0, _type.isDefined)(text) || "" === text) {
                $container.html("&nbsp;")
            }
            if (!that._isRowEditMode()) {
                if (that._isItemModified(item, cellOptions)) {
                    $container.addClass(FORM_ITEM_MODIFIED)
                }
            }
            rowsView._cellPrepared($container, cellOptions)
        }
    },
    _getTemplate: function(item, cellOptions) {
        var that = this;
        var column = item.column;
        var editingController = this.getController("editing");
        return function(options, container) {
            var $container = (0, _renderer.default)(container);
            var columnIndex = that._columnsController.getVisibleIndex(column.index);
            var templateOptions = (0, _extend.extend)({}, cellOptions);
            var renderFormTemplate = function() {
                var isItemEdited = that._isItemEdited(item);
                templateOptions.value = cellOptions.row.values[columnIndex];
                if (isItemEdited || column.showEditorAlways) {
                    editingController.renderFormEditorTemplate(templateOptions, item, options, $container, !isItemEdited)
                } else {
                    templateOptions.column = column;
                    templateOptions.columnIndex = columnIndex;
                    that._renderFormViewTemplate(item, templateOptions, $container)
                }
            };
            renderFormTemplate();
            templateOptions.watch && templateOptions.watch((function() {
                return {
                    isItemEdited: that._isItemEdited(item),
                    value: cellOptions.row.values[columnIndex]
                }
            }), (function() {
                $container.contents().remove();
                $container.removeClass(ADAPTIVE_ITEM_TEXT_CLASS);
                renderFormTemplate()
            }))
        }
    },
    _isVisibleColumnsValid: function(visibleColumns) {
        if (visibleColumns < 2) {
            return false
        }
        if (visibleColumns.length - function() {
                var result = 0;
                for (var j = 0; j < visibleColumns.length; j++) {
                    var visibleColumn = visibleColumns[j];
                    if (visibleColumn.command) {
                        result++
                    }
                }
                return result
            }() <= 1) {
            return false
        }
        return true
    },
    _calculatePercentWidths: function(widths, visibleColumns) {
        var that = this;
        var percentWidths = 0;
        visibleColumns.forEach((function(item, index) {
            if (widths[index] !== HIDDEN_COLUMNS_WIDTH) {
                percentWidths += that._getItemPercentWidth(item)
            }
        }));
        return percentWidths
    },
    _isPercentWidth: function(width) {
        return (0, _type.isString)(width) && width.endsWith("%")
    },
    _isColumnHidden: function(column) {
        return this._hiddenColumns.filter((function(hiddenColumn) {
            return hiddenColumn.index === column.index
        })).length > 0
    },
    _getAverageColumnsWidth: function(containerWidth, columns, columnsCanFit) {
        var that = this;
        var fixedColumnsWidth = 0;
        var columnsWithoutFixedWidthCount = 0;
        columns.forEach((function(column) {
            if (!that._isColumnHidden(column)) {
                var width = column.width;
                if ((0, _type.isDefined)(width) && !isNaN(parseFloat(width))) {
                    fixedColumnsWidth += that._isPercentWidth(width) ? that._calculatePercentWidth({
                        visibleIndex: column.visibleIndex,
                        columnsCount: columns.length,
                        columnsCanFit: columnsCanFit,
                        bestFitWidth: column.bestFitWidth,
                        columnWidth: width,
                        containerWidth: containerWidth
                    }) : parseFloat(width)
                } else {
                    columnsWithoutFixedWidthCount++
                }
            }
        }));
        return (containerWidth - fixedColumnsWidth) / columnsWithoutFixedWidthCount
    },
    _calculateColumnWidth: function(column, containerWidth, contentColumns, columnsCanFit) {
        var columnId = getColumnId(this, column);
        var widthOption = this._columnsController.columnOption(columnId, "width");
        var bestFitWidth = this._columnsController.columnOption(columnId, "bestFitWidth");
        var columnsCount = contentColumns.length;
        var colWidth;
        if (widthOption && "auto" !== widthOption) {
            if (this._isPercentWidth(widthOption)) {
                colWidth = this._calculatePercentWidth({
                    visibleIndex: column.visibleIndex,
                    columnsCount: columnsCount,
                    columnsCanFit: columnsCanFit,
                    bestFitWidth: bestFitWidth,
                    columnWidth: widthOption,
                    containerWidth: containerWidth
                })
            } else {
                return parseFloat(widthOption)
            }
        } else {
            var columnAutoWidth = this.option("columnAutoWidth");
            colWidth = columnAutoWidth || !!column.command ? bestFitWidth : this._getAverageColumnsWidth(containerWidth, contentColumns, columnsCanFit)
        }
        return colWidth
    },
    _calculatePercentWidth: function(options) {
        var columnFitted = options.visibleIndex < options.columnsCount - 1 && options.columnsCanFit;
        var partialWidth = options.containerWidth * parseFloat(options.columnWidth) / 100;
        var resultWidth = options.columnsCanFit && partialWidth < options.bestFitWidth ? options.bestFitWidth : partialWidth;
        return columnFitted ? options.containerWidth * parseFloat(options.columnWidth) / 100 : resultWidth
    },
    _getNotTruncatedColumnWidth: function(column, containerWidth, contentColumns, columnsCanFit) {
        var columnId = getColumnId(this, column);
        var widthOption = this._columnsController.columnOption(columnId, "width");
        var bestFitWidth = this._columnsController.columnOption(columnId, "bestFitWidth");
        if (widthOption && "auto" !== widthOption && !this._isPercentWidth(widthOption)) {
            return parseFloat(widthOption)
        }
        var colWidth = this._calculateColumnWidth(column, containerWidth, contentColumns, columnsCanFit);
        return colWidth < bestFitWidth ? null : colWidth
    },
    _getItemPercentWidth: function(item) {
        var result = 0;
        if (item.width && this._isPercentWidth(item.width)) {
            result = parseFloat(item.width)
        }
        return result
    },
    _getCommandColumnsWidth: function() {
        var that = this;
        var columns = that._columnsController.getVisibleColumns();
        var colWidth = 0;
        (0, _iterator.each)(columns, (function(index, column) {
            if (column.index < 0 || column.command) {
                colWidth += that._columnsController.columnOption(getColumnId(that, column), "bestFitWidth") || 0
            }
        }));
        return colWidth
    },
    _isItemEdited: function(item) {
        if (this.isFormOrPopupEditMode()) {
            return false
        }
        if (this._isRowEditMode()) {
            var editRowKey = this.option("editing.editRowKey");
            if ((0, _common.equalByValue)(editRowKey, this._dataController.adaptiveExpandedKey())) {
                return true
            }
        } else {
            var rowIndex = this._dataController.getRowIndexByKey(this._dataController.adaptiveExpandedKey()) + 1;
            var columnIndex = this._columnsController.getVisibleIndex(item.column.index);
            return this._editingController.isEditCell(rowIndex, columnIndex)
        }
    },
    _getFormItemsByHiddenColumns: function(hiddenColumns) {
        var items = [];
        (0, _iterator.each)(hiddenColumns, (function(_, column) {
            items.push({
                column: column,
                name: column.name,
                dataField: column.dataField,
                visibleIndex: column.visibleIndex
            })
        }));
        return items
    },
    _getAdaptiveColumnVisibleIndex: function(visibleColumns) {
        for (var i = 0; i < visibleColumns.length; i++) {
            var column = visibleColumns[i];
            if (column.command === ADAPTIVE_COLUMN_NAME) {
                return i
            }
        }
        return
    },
    _hideAdaptiveColumn: function(resultWidths, visibleColumns) {
        var visibleIndex = this._getAdaptiveColumnVisibleIndex(visibleColumns);
        if ((0, _type.isDefined)(visibleIndex)) {
            resultWidths[visibleIndex] = HIDDEN_COLUMNS_WIDTH;
            this._hideVisibleColumn({
                isCommandColumn: true,
                visibleIndex: visibleIndex
            })
        }
    },
    _showHiddenCellsInView: function(_ref) {
        var $cells = _ref.$cells,
            isCommandColumn = _ref.isCommandColumn;
        var cssClassNameToRemove = this.addWidgetPrefix(HIDDEN_COLUMN_CLASS);
        if (isCommandColumn) {
            cssClassNameToRemove = COMMAND_ADAPTIVE_HIDDEN_CLASS;
            $cells.attr({
                tabIndex: 0,
                "aria-hidden": null
            }).removeClass(cssClassNameToRemove)
        } else {
            $cells.removeClass(cssClassNameToRemove)
        }
    },
    _showHiddenColumns: function() {
        for (var i = 0; i < COLUMN_VIEWS.length; i++) {
            var view = this.getView(COLUMN_VIEWS[i]);
            if (view && view.isVisible() && view.element()) {
                var viewName = view.name;
                var $hiddenCommandCells = view.element().find(".".concat(COMMAND_ADAPTIVE_HIDDEN_CLASS));
                this._showHiddenCellsInView({
                    viewName: viewName,
                    $cells: $hiddenCommandCells,
                    isCommandColumn: true
                });
                var $hiddenCells = view.element().find(".".concat(this.addWidgetPrefix(HIDDEN_COLUMN_CLASS)));
                this._showHiddenCellsInView({
                    viewName: viewName,
                    $cells: $hiddenCells
                })
            }
        }
    },
    _isCellValid: function($cell) {
        return $cell && $cell.length && !$cell.hasClass(MASTER_DETAIL_CELL_CLASS) && !$cell.hasClass(GROUP_CELL_CLASS)
    },
    _hideVisibleColumn: function(_ref2) {
        var isCommandColumn = _ref2.isCommandColumn,
            visibleIndex = _ref2.visibleIndex;
        var that = this;
        COLUMN_VIEWS.forEach((function(viewName) {
            var view = that.getView(viewName);
            view && that._hideVisibleColumnInView({
                view: view,
                isCommandColumn: isCommandColumn,
                visibleIndex: visibleIndex
            })
        }))
    },
    _hideVisibleColumnInView: function(_ref3) {
        var view = _ref3.view,
            isCommandColumn = _ref3.isCommandColumn,
            visibleIndex = _ref3.visibleIndex;
        var viewName = view.name;
        var $cellElement;
        var column = this._columnsController.getVisibleColumns()[visibleIndex];
        var editFormRowIndex = this._editingController && this._editingController.getEditFormRowIndex();
        if (view && view.isVisible() && column) {
            var rowsCount = view.getRowsCount();
            var $rowElements = view._getRowElements();
            for (var rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
                var cancelClassAdding = rowIndex === editFormRowIndex && viewName === ROWS_VIEW && "popup" !== this.option("editing.mode");
                if (!cancelClassAdding) {
                    var currentVisibleIndex = viewName === COLUMN_HEADERS_VIEW ? this._columnsController.getVisibleIndex(column.index, rowIndex) : visibleIndex;
                    if (currentVisibleIndex >= 0) {
                        var $rowElement = $rowElements.eq(rowIndex);
                        $cellElement = this._findCellElementInRow($rowElement, currentVisibleIndex);
                        this._isCellValid($cellElement) && this._hideVisibleCellInView({
                            viewName: viewName,
                            isCommandColumn: isCommandColumn,
                            $cell: $cellElement
                        })
                    }
                }
            }
        }
    },
    _findCellElementInRow: function($rowElement, visibleColumnIndex) {
        var $rowCells = $rowElement.children();
        var visibleIndex = visibleColumnIndex;
        var cellIsInsideGroup = false;
        if ($rowElement.hasClass(GROUP_ROW_CLASS)) {
            var $groupCell = $rowElement.find(".".concat(GROUP_CELL_CLASS));
            var colSpan = $groupCell.attr("colspan");
            if ($groupCell.length && (0, _type.isDefined)(colSpan)) {
                var groupCellLength = parseInt(colSpan);
                var endGroupIndex = $groupCell.index() + groupCellLength - 1;
                if (visibleColumnIndex > endGroupIndex) {
                    visibleIndex = visibleColumnIndex - groupCellLength + 1
                } else {
                    cellIsInsideGroup = true
                }
            }
        }
        var $cellElement = !cellIsInsideGroup ? $rowCells.eq(visibleIndex) : void 0;
        return $cellElement
    },
    _hideVisibleCellInView: function(_ref4) {
        var $cell = _ref4.$cell,
            isCommandColumn = _ref4.isCommandColumn;
        var cssClassNameToAdd = isCommandColumn ? COMMAND_ADAPTIVE_HIDDEN_CLASS : this.addWidgetPrefix(HIDDEN_COLUMN_CLASS);
        $cell.attr({
            tabIndex: -1,
            "aria-hidden": true
        }).addClass(cssClassNameToAdd)
    },
    _getEditMode: function() {
        return this._editingController.getEditMode()
    },
    isFormOrPopupEditMode: function() {
        var editMode = this._getEditMode();
        return editMode === EDIT_MODE_FORM || editMode === EDIT_MODE_POPUP
    },
    hideRedundantColumns: function(resultWidths, visibleColumns, hiddenQueue) {
        this._hiddenColumns = [];
        if (this._isVisibleColumnsValid(visibleColumns) && hiddenQueue.length) {
            var totalWidth = 0;
            var $rootElement = this.component.$element();
            var rootElementWidth = (0, _size.getWidth)($rootElement) - this._getCommandColumnsWidth();
            var getVisibleContentColumns = function() {
                var _this = this;
                return visibleColumns.filter((function(item) {
                    return !item.command && 0 === _this._hiddenColumns.filter((function(i) {
                        return i.index === item.index
                    })).length
                }))
            }.bind(this);
            var visibleContentColumns = getVisibleContentColumns();
            var contentColumnsCount = visibleContentColumns.length;
            var i;
            var hasHiddenColumns;
            var needHideColumn;
            do {
                needHideColumn = false;
                totalWidth = 0;
                var percentWidths = this._calculatePercentWidths(resultWidths, visibleColumns);
                var columnsCanFit = percentWidths < 100 && 0 !== percentWidths;
                for (i = 0; i < visibleColumns.length; i++) {
                    var visibleColumn = visibleColumns[i];
                    var columnWidth = this._getNotTruncatedColumnWidth(visibleColumn, rootElementWidth, visibleContentColumns, columnsCanFit);
                    var columnId = getColumnId(this, visibleColumn);
                    var widthOption = this._columnsController.columnOption(columnId, "width");
                    var minWidth = this._columnsController.columnOption(columnId, "minWidth");
                    var columnBestFitWidth = this._columnsController.columnOption(columnId, "bestFitWidth");
                    if (resultWidths[i] === HIDDEN_COLUMNS_WIDTH) {
                        hasHiddenColumns = true;
                        continue
                    }
                    if (!columnWidth && !visibleColumn.command && !visibleColumn.fixed) {
                        needHideColumn = true;
                        break
                    }
                    if (!widthOption || "auto" === widthOption) {
                        columnWidth = Math.max(columnBestFitWidth || 0, minWidth || 0)
                    }
                    if (visibleColumn.command !== ADAPTIVE_COLUMN_NAME || hasHiddenColumns) {
                        totalWidth += columnWidth
                    }
                }
                needHideColumn = needHideColumn || totalWidth > (0, _size.getWidth)($rootElement);
                if (needHideColumn) {
                    var column = hiddenQueue.pop();
                    var visibleIndex = this._columnsController.getVisibleIndex(column.index);
                    rootElementWidth += this._calculateColumnWidth(column, rootElementWidth, visibleContentColumns, columnsCanFit);
                    this._hideVisibleColumn({
                        visibleIndex: visibleIndex
                    });
                    resultWidths[visibleIndex] = HIDDEN_COLUMNS_WIDTH;
                    this._hiddenColumns.push(column);
                    visibleContentColumns = getVisibleContentColumns()
                }
            } while (needHideColumn && visibleContentColumns.length > 1 && hiddenQueue.length);
            if (contentColumnsCount === visibleContentColumns.length) {
                this._hideAdaptiveColumn(resultWidths, visibleColumns)
            }
        } else {
            this._hideAdaptiveColumn(resultWidths, visibleColumns)
        }
    },
    getAdaptiveDetailItems: function() {
        return this._$itemContents
    },
    getItemContentByColumnIndex: function(visibleColumnIndex) {
        var $itemContent;
        for (var i = 0; i < this._$itemContents.length; i++) {
            $itemContent = this._$itemContents.eq(i);
            var item = $itemContent.data("dx-form-item");
            if (item && item.column && this._columnsController.getVisibleIndex(item.column.index) === visibleColumnIndex) {
                return $itemContent
            }
        }
    },
    toggleExpandAdaptiveDetailRow: function(key, alwaysExpanded) {
        if (!(this.isFormOrPopupEditMode() && this._editingController.isEditing())) {
            this.getController("data").toggleExpandAdaptiveDetailRow(key, alwaysExpanded)
        }
    },
    createFormByHiddenColumns: function(container, options) {
        var that = this;
        var $container = (0, _renderer.default)(container);
        var userFormOptions = {
            items: that._getFormItemsByHiddenColumns(that._hiddenColumns),
            formID: "dx-".concat(new _guid.default)
        };
        var defaultFormOptions = (0, _themes.isMaterial)() ? {
            colCount: 2
        } : {};
        this.executeAction("onAdaptiveDetailRowPreparing", {
            formOptions: userFormOptions
        });
        that._$itemContents = null;
        that._form = that._createComponent((0, _renderer.default)("<div>").appendTo($container), _form.default, (0, _extend.extend)(defaultFormOptions, userFormOptions, {
            customizeItem: function(item) {
                var column = item.column || that._columnsController.columnOption(item.name || item.dataField);
                if (column) {
                    item.label = item.label || {};
                    item.label.text = item.label.text || column.caption;
                    item.column = column;
                    item.template = that._getTemplate(item, options, that.updateForm.bind(that))
                }
                userFormOptions.customizeItem && userFormOptions.customizeItem.call(this, item)
            },
            onContentReady: function(e) {
                userFormOptions.onContentReady && userFormOptions.onContentReady.call(this, e);
                that._$itemContents = $container.find(".".concat(FORM_ITEM_CONTENT_CLASS))
            }
        }))
    },
    hasAdaptiveDetailRowExpanded: function() {
        return (0, _type.isDefined)(this._dataController.adaptiveExpandedKey())
    },
    updateForm: function(hiddenColumns) {
        if (this.hasAdaptiveDetailRowExpanded()) {
            if (this._form && (0, _type.isDefined)(this._form._contentReadyAction)) {
                if (hiddenColumns && hiddenColumns.length) {
                    this._form.option("items", this._getFormItemsByHiddenColumns(hiddenColumns))
                } else {
                    this._form.repaint()
                }
            }
        }
    },
    updateHidingQueue: function(columns) {
        var hideableColumns = columns.filter((function(column) {
            return column.visible && !column.type && !column.fixed && !((0, _type.isDefined)(column.groupIndex) && column.groupIndex >= 0)
        }));
        var columnsHasHidingPriority;
        var i;
        this._hidingColumnsQueue = [];
        if (this.option("allowColumnResizing") && "widget" === this.option("columnResizingMode")) {
            return this._hidingColumnsQueue
        }
        for (i = 0; i < hideableColumns.length; i++) {
            if ((0, _type.isDefined)(hideableColumns[i].hidingPriority) && hideableColumns[i].hidingPriority >= 0) {
                columnsHasHidingPriority = true;
                this._hidingColumnsQueue[hideableColumns[i].hidingPriority] = hideableColumns[i]
            }
        }
        if (columnsHasHidingPriority) {
            this._hidingColumnsQueue.reverse()
        } else if (this.option("columnHidingEnabled")) {
            for (i = 0; i < hideableColumns.length; i++) {
                var visibleIndex = this._columnsController.getVisibleIndex(hideableColumns[i].index);
                this._hidingColumnsQueue[visibleIndex] = hideableColumns[i]
            }
        }
        this._hidingColumnsQueue = this._hidingColumnsQueue.filter(Object);
        return this._hidingColumnsQueue
    },
    getHiddenColumns: function() {
        return this._hiddenColumns
    },
    hasHiddenColumns: function() {
        return this._hiddenColumns.length > 0
    },
    getHidingColumnsQueue: function() {
        return this._hidingColumnsQueue
    },
    init: function() {
        var that = this;
        that._columnsController = that.getController("columns");
        that._dataController = that.getController("data");
        that._rowsView = that.getView("rowsView");
        that._columnsController.addCommandColumn({
            type: ADAPTIVE_COLUMN_NAME,
            command: ADAPTIVE_COLUMN_NAME,
            visible: true,
            adaptiveHidden: true,
            cssClass: ADAPTIVE_COLUMN_NAME_CLASS,
            alignment: "center",
            width: "auto",
            cellTemplate: adaptiveCellTemplate,
            fixedPosition: "right"
        });
        that._columnsController.columnsChanged.add((function() {
            var isAdaptiveVisible = !!that.updateHidingQueue(that._columnsController.getColumns()).length;
            that._columnsController.columnOption("command:adaptive", "adaptiveHidden", !isAdaptiveVisible, true)
        }));
        that._editingController = that.getController("editing");
        that._hidingColumnsQueue = [];
        that._hiddenColumns = [];
        that.createAction("onAdaptiveDetailRowPreparing");
        that.callBase()
    },
    optionChanged: function(args) {
        if ("columnHidingEnabled" === args.name) {
            this._columnsController.columnOption("command:adaptive", "adaptiveHidden", !args.value)
        }
        this.callBase(args)
    },
    publicMethods: function() {
        return ["isAdaptiveDetailRowExpanded", "expandAdaptiveDetailRow", "collapseAdaptiveDetailRow"]
    },
    isAdaptiveDetailRowExpanded: function(key) {
        var dataController = this._dataController;
        return dataController.adaptiveExpandedKey() && (0, _common.equalByValue)(dataController.adaptiveExpandedKey(), key)
    },
    expandAdaptiveDetailRow: function(key) {
        if (!this.hasAdaptiveDetailRowExpanded()) {
            this.toggleExpandAdaptiveDetailRow(key)
        }
    },
    collapseAdaptiveDetailRow: function() {
        if (this.hasAdaptiveDetailRowExpanded()) {
            this.toggleExpandAdaptiveDetailRow()
        }
    },
    updateCommandAdaptiveAriaLabel: function(key, label) {
        var rowIndex = this._dataController.getRowIndexByKey(key);
        if (-1 === rowIndex) {
            return
        }
        var $row = (0, _renderer.default)(this.component.getRowElement(rowIndex));
        this.setCommandAdaptiveAriaLabel($row, label)
    },
    setCommandAdaptiveAriaLabel: function($row, labelName) {
        var $adaptiveCommand = $row.find(".dx-command-adaptive");
        $adaptiveCommand.attr("aria-label", _message.default.format(labelName))
    }
};
var AdaptiveColumnsController = _m_modules.default.ViewController.inherit(adaptiveColumnsControllerMembers);
var keyboardNavigation = function(Base) {
    return function(_Base) {
        _inheritsLoose(AdaptivityKeyboardNavigationExtender, _Base);

        function AdaptivityKeyboardNavigationExtender() {
            return _Base.apply(this, arguments) || this
        }
        var _proto = AdaptivityKeyboardNavigationExtender.prototype;
        _proto._isCellValid = function($cell, isClick) {
            return _Base.prototype._isCellValid.call(this, $cell, isClick) && !$cell.hasClass(this.addWidgetPrefix(HIDDEN_COLUMN_CLASS)) && !$cell.hasClass(COMMAND_ADAPTIVE_HIDDEN_CLASS)
        };
        _proto._processNextCellInMasterDetail = function($nextCell, $cell) {
            _Base.prototype._processNextCellInMasterDetail.call(this, $nextCell, $cell);
            var isCellOrBatchMode = this._editingController.isCellOrBatchEditMode();
            var isEditing = this._editingController.isEditing();
            if (isEditing && $nextCell && isCellOrBatchMode && !this._isInsideEditForm($nextCell)) {
                _events_engine.default.off($nextCell, "focus", focusCellHandler);
                _events_engine.default.on($nextCell, "focus", {
                    $nextCell: $nextCell
                }, focusCellHandler);
                _events_engine.default.trigger($cell, "focus")
            }
        };
        _proto._isCellElement = function($cell) {
            return _Base.prototype._isCellElement.call(this, $cell) || $cell.hasClass(ADAPTIVE_ITEM_TEXT_CLASS)
        };
        _proto.init = function() {
            _Base.prototype.init.call(this);
            this._adaptiveController = this.getController("adaptiveColumns")
        };
        return AdaptivityKeyboardNavigationExtender
    }(Base)
};
var adaptivityModule = {
    defaultOptions: function() {
        return {
            columnHidingEnabled: false,
            onAdaptiveDetailRowPreparing: null
        }
    },
    controllers: {
        adaptiveColumns: AdaptiveColumnsController
    },
    extenders: {
        views: {
            rowsView: {
                _getCellTemplate: function(options) {
                    var that = this;
                    var column = options.column;
                    if (options.rowType === ADAPTIVE_ROW_TYPE && "detail" === column.command) {
                        return function(container, options) {
                            that._adaptiveColumnsController.createFormByHiddenColumns((0, _renderer.default)(container), options)
                        }
                    }
                    return that.callBase(options)
                },
                _createRow: function(row) {
                    var $row = this.callBase.apply(this, arguments);
                    if (row && row.rowType === ADAPTIVE_ROW_TYPE && row.key === this._dataController.adaptiveExpandedKey()) {
                        $row.addClass(ADAPTIVE_DETAIL_ROW_CLASS)
                    }
                    return $row
                },
                _renderCells: function($row, options) {
                    this.callBase($row, options);
                    var adaptiveColumnsController = this._adaptiveColumnsController;
                    var hidingColumnsQueueLength = adaptiveColumnsController.getHidingColumnsQueue().length;
                    var hiddenColumnsLength = adaptiveColumnsController.getHiddenColumns().length;
                    if (hidingColumnsQueueLength && !hiddenColumnsLength) {
                        getDataCellElements($row).last().addClass(LAST_DATA_CELL_CLASS)
                    }
                    if ("data" === options.row.rowType) {
                        adaptiveColumnsController.setCommandAdaptiveAriaLabel($row, EXPAND_ARIA_NAME)
                    }
                },
                _getColumnIndexByElementCore: function($element) {
                    var $itemContent = $element.closest(".".concat(FORM_ITEM_CONTENT_CLASS));
                    if ($itemContent.length && $itemContent.closest(this.component.$element()).length) {
                        var formItem = $itemContent.length ? $itemContent.first().data("dx-form-item") : null;
                        return formItem && formItem.column && this._columnsController.getVisibleIndex(formItem.column.index)
                    }
                    return this.callBase($element)
                },
                _cellPrepared: function($cell, options) {
                    this.callBase.apply(this, arguments);
                    if (options.row.rowType !== ADAPTIVE_ROW_TYPE && options.column.visibleWidth === HIDDEN_COLUMNS_WIDTH) {
                        $cell.addClass(this.addWidgetPrefix(HIDDEN_COLUMN_CLASS))
                    }
                },
                getCell: function(cellPosition, rows) {
                    var item = this._dataController.items()[null === cellPosition || void 0 === cellPosition ? void 0 : cellPosition.rowIndex];
                    if ((null === item || void 0 === item ? void 0 : item.rowType) === ADAPTIVE_ROW_TYPE) {
                        var $adaptiveDetailItems = this._adaptiveColumnsController.getAdaptiveDetailItems();
                        return this.callBase(cellPosition, rows, $adaptiveDetailItems)
                    }
                    return this.callBase.apply(this, arguments)
                },
                _getCellElement: function(rowIndex, columnIdentifier) {
                    var item = this._dataController.items()[rowIndex];
                    if (item && item.rowType === ADAPTIVE_ROW_TYPE) {
                        return this._adaptiveColumnsController.getItemContentByColumnIndex(columnIdentifier)
                    }
                    return this.callBase.apply(this, arguments)
                },
                getContextMenuItems: function(options) {
                    if (options.row && "detailAdaptive" === options.row.rowType) {
                        var view = this.component.getView("columnHeadersView");
                        var formItem = (0, _renderer.default)(options.targetElement).closest(".dx-field-item-label").next().data("dx-form-item");
                        options.column = formItem ? formItem.column : options.column;
                        return view.getContextMenuItems && view.getContextMenuItems(options)
                    }
                    return this.callBase && this.callBase(options)
                },
                isClickableElement: function($target) {
                    var isClickable = this.callBase ? this.callBase($target) : false;
                    return isClickable || !!$target.closest(".".concat(ADAPTIVE_COLUMN_NAME_CLASS)).length
                },
                init: function() {
                    this.callBase();
                    this._adaptiveColumnsController = this.getController("adaptiveColumns")
                }
            }
        },
        controllers: {
            export: {
                _updateColumnWidth: function(column, width) {
                    this.callBase(column, column.visibleWidth === HIDDEN_COLUMNS_WIDTH ? column.bestFitWidth : width)
                }
            },
            columnsResizer: {
                _pointCreated: function(point, cellsLength, columns) {
                    var result = this.callBase(point, cellsLength, columns);
                    var currentColumn = columns[point.columnIndex] || {};
                    var nextColumnIndex = this._getNextColumnIndex(point.columnIndex);
                    var nextColumn = columns[nextColumnIndex] || {};
                    var hasHiddenColumnsOnly = nextColumnIndex !== point.columnIndex + 1 && nextColumn.command;
                    var hasAdaptiveHiddenWidth = currentColumn.visibleWidth === HIDDEN_COLUMNS_WIDTH || hasHiddenColumnsOnly;
                    return result || hasAdaptiveHiddenWidth
                },
                _getNextColumnIndex: function(currentColumnIndex) {
                    var visibleColumns = this._columnsController.getVisibleColumns();
                    var index = this.callBase(currentColumnIndex);
                    while (visibleColumns[index] && visibleColumns[index].visibleWidth === HIDDEN_COLUMNS_WIDTH) {
                        index++
                    }
                    return index
                }
            },
            draggingHeader: {
                _pointCreated: function(point, columns, location, sourceColumn) {
                    var result = this.callBase(point, columns, location, sourceColumn);
                    var column = columns[point.columnIndex - 1] || {};
                    var hasAdaptiveHiddenWidth = column.visibleWidth === HIDDEN_COLUMNS_WIDTH;
                    return result || hasAdaptiveHiddenWidth
                }
            },
            editing: {
                _isRowEditMode: function() {
                    return this.getEditMode() === EDIT_MODE_ROW
                },
                _getFormEditItemTemplate: function(cellOptions, column) {
                    if (this.getEditMode() !== EDIT_MODE_ROW && "detailAdaptive" === cellOptions.rowType) {
                        cellOptions.columnIndex = this._columnsController.getVisibleIndex(column.index);
                        return this.getColumnTemplate(cellOptions)
                    }
                    return this.callBase(cellOptions, column)
                },
                _closeEditItem: function($targetElement) {
                    var $itemContents = $targetElement.closest(".".concat(FORM_ITEM_CONTENT_CLASS));
                    var rowIndex = this._dataController.getRowIndexByKey(this._dataController.adaptiveExpandedKey()) + 1;
                    var formItem = $itemContents.length ? $itemContents.first().data("dx-form-item") : null;
                    var columnIndex = formItem && formItem.column && this._columnsController.getVisibleIndex(formItem.column.index);
                    if (!this.isEditCell(rowIndex, columnIndex)) {
                        this.callBase($targetElement)
                    }
                },
                _beforeUpdateItems: function(rowIndices, rowIndex) {
                    if (!this._adaptiveController.isFormOrPopupEditMode() && this._adaptiveController.hasHiddenColumns()) {
                        var items = this._dataController.items();
                        var item = items[rowIndex];
                        var oldExpandRowIndex = _m_utils.default.getIndexByKey(this._dataController.adaptiveExpandedKey(), items);
                        this._isForceRowAdaptiveExpand = !this._adaptiveController.hasAdaptiveDetailRowExpanded();
                        if (oldExpandRowIndex >= 0) {
                            rowIndices.push(oldExpandRowIndex + 1)
                        }
                        rowIndices.push(rowIndex + 1);
                        this._dataController.adaptiveExpandedKey(item.key)
                    }
                },
                _afterInsertRow: function(key) {
                    this.callBase.apply(this, arguments);
                    if (this._adaptiveController.hasHiddenColumns()) {
                        this._adaptiveController.toggleExpandAdaptiveDetailRow(key, this.isRowEditMode());
                        this._isForceRowAdaptiveExpand = true
                    }
                },
                _collapseAdaptiveDetailRow: function() {
                    if (this._isRowEditMode() && this._isForceRowAdaptiveExpand) {
                        this._adaptiveController.collapseAdaptiveDetailRow();
                        this._isForceRowAdaptiveExpand = false
                    }
                },
                _cancelEditAdaptiveDetailRow: function() {
                    if (this._adaptiveController.hasHiddenColumns()) {
                        this._collapseAdaptiveDetailRow()
                    }
                },
                _afterSaveEditData: function() {
                    var _this2 = this;
                    this.callBase.apply(this, arguments);
                    var deferred = new _deferred.Deferred;
                    if (this._isRowEditMode() && this._adaptiveController.hasHiddenColumns()) {
                        (0, _deferred.when)(this.getController("validating").validate(true)).done((function(isValid) {
                            if (isValid) {
                                _this2._cancelEditAdaptiveDetailRow()
                            }
                            deferred.resolve()
                        }))
                    } else {
                        deferred.resolve()
                    }
                    return deferred.promise()
                },
                _beforeCancelEditData: function() {
                    this.callBase();
                    this._cancelEditAdaptiveDetailRow()
                },
                _getRowIndicesForCascadeUpdating: function(row) {
                    var rowIndices = this.callBase.apply(this, arguments);
                    if (this._adaptiveController.isAdaptiveDetailRowExpanded(row.key)) {
                        rowIndices.push(row.rowType === ADAPTIVE_ROW_TYPE ? row.rowIndex - 1 : row.rowIndex + 1)
                    }
                    return rowIndices
                },
                _beforeCloseEditCellInBatchMode: function(rowIndices) {
                    var expandedKey = this._dataController._adaptiveExpandedKey;
                    if (expandedKey) {
                        var rowIndex = _m_utils.default.getIndexByKey(expandedKey, this._dataController.items());
                        if (rowIndex > -1) {
                            rowIndices.unshift(rowIndex)
                        }
                    }
                },
                editRow: function(rowIndex) {
                    if (this._adaptiveController.isFormOrPopupEditMode()) {
                        this._adaptiveController.collapseAdaptiveDetailRow()
                    }
                    this.callBase(rowIndex)
                },
                deleteRow: function(rowIndex) {
                    var rowKey = this._dataController.getKeyByRowIndex(rowIndex);
                    if (this.getEditMode() === EDIT_MODE_BATCH && this._adaptiveController.isAdaptiveDetailRowExpanded(rowKey)) {
                        this._adaptiveController.collapseAdaptiveDetailRow()
                    }
                    this.callBase(rowIndex)
                },
                init: function() {
                    this.callBase();
                    this._adaptiveController = this.getController("adaptiveColumns")
                }
            },
            resizing: {
                _needBestFit: function() {
                    return this.callBase() || !!this._adaptiveColumnsController.getHidingColumnsQueue().length
                },
                _correctColumnWidths: function(resultWidths, visibleColumns) {
                    var adaptiveController = this._adaptiveColumnsController;
                    var oldHiddenColumns = adaptiveController.getHiddenColumns();
                    var hidingColumnsQueue = adaptiveController.updateHidingQueue(this._columnsController.getColumns());
                    adaptiveController.hideRedundantColumns(resultWidths, visibleColumns, hidingColumnsQueue);
                    var hiddenColumns = adaptiveController.getHiddenColumns();
                    if (adaptiveController.hasAdaptiveDetailRowExpanded()) {
                        if (oldHiddenColumns.length !== hiddenColumns.length) {
                            adaptiveController.updateForm(hiddenColumns)
                        }
                    }!hiddenColumns.length && adaptiveController.collapseAdaptiveDetailRow();
                    return this.callBase.apply(this, arguments)
                },
                _toggleBestFitMode: function(isBestFit) {
                    isBestFit && this._adaptiveColumnsController._showHiddenColumns();
                    this.callBase(isBestFit)
                },
                _needStretch: function() {
                    var adaptiveColumnsController = this._adaptiveColumnsController;
                    return this.callBase.apply(this, arguments) || adaptiveColumnsController.getHidingColumnsQueue().length || adaptiveColumnsController.hasHiddenColumns()
                },
                init: function() {
                    this._adaptiveColumnsController = this.getController("adaptiveColumns");
                    this.callBase()
                },
                dispose: function() {
                    this.callBase.apply(this, arguments);
                    clearTimeout(this._updateScrollableTimeoutID)
                }
            },
            data: {
                _processItems: function(items, change) {
                    var changeType = change.changeType;
                    items = this.callBase.apply(this, arguments);
                    if ("loadingAll" === changeType || !(0, _type.isDefined)(this._adaptiveExpandedKey)) {
                        return items
                    }
                    var expandRowIndex = _m_utils.default.getIndexByKey(this._adaptiveExpandedKey, items);
                    var newMode = false === this.option(LEGACY_SCROLLING_MODE);
                    if (expandRowIndex >= 0) {
                        var item = items[expandRowIndex];
                        items.splice(expandRowIndex + 1, 0, {
                            visible: true,
                            rowType: ADAPTIVE_ROW_TYPE,
                            key: item.key,
                            data: item.data,
                            node: item.node,
                            modifiedValues: item.modifiedValues,
                            isNewRow: item.isNewRow,
                            values: item.values
                        })
                    } else if ("refresh" === changeType && !(newMode && change.repaintChangesOnly)) {
                        this._adaptiveExpandedKey = void 0
                    }
                    return items
                },
                _getRowIndicesForExpand: function(key) {
                    var rowIndices = this.callBase.apply(this, arguments);
                    if (this.getController("adaptiveColumns").isAdaptiveDetailRowExpanded(key)) {
                        var lastRowIndex = rowIndices[rowIndices.length - 1];
                        rowIndices.push(lastRowIndex + 1)
                    }
                    return rowIndices
                },
                adaptiveExpandedKey: function(value) {
                    if ((0, _type.isDefined)(value)) {
                        this._adaptiveExpandedKey = value
                    } else {
                        return this._adaptiveExpandedKey
                    }
                },
                toggleExpandAdaptiveDetailRow: function(key, alwaysExpanded) {
                    var oldExpandLoadedRowIndex = _m_utils.default.getIndexByKey(this._adaptiveExpandedKey, this._items);
                    var newExpandLoadedRowIndex = _m_utils.default.getIndexByKey(key, this._items);
                    if (oldExpandLoadedRowIndex >= 0 && oldExpandLoadedRowIndex === newExpandLoadedRowIndex && !alwaysExpanded) {
                        key = void 0;
                        newExpandLoadedRowIndex = -1
                    }
                    var oldKey = this._adaptiveExpandedKey;
                    this._adaptiveExpandedKey = key;
                    if (oldExpandLoadedRowIndex >= 0) {
                        oldExpandLoadedRowIndex++
                    }
                    if (newExpandLoadedRowIndex >= 0) {
                        newExpandLoadedRowIndex++
                    }
                    var rowIndexDelta = this.getRowIndexDelta();
                    this.updateItems({
                        allowInvisibleRowIndices: true,
                        changeType: "update",
                        rowIndices: [oldExpandLoadedRowIndex - rowIndexDelta, newExpandLoadedRowIndex - rowIndexDelta]
                    });
                    var adaptiveColumnsController = this.getController("adaptiveColumns");
                    adaptiveColumnsController.updateCommandAdaptiveAriaLabel(key, COLLAPSE_ARIA_NAME);
                    adaptiveColumnsController.updateCommandAdaptiveAriaLabel(oldKey, EXPAND_ARIA_NAME)
                },
                init: function() {
                    this.callBase();
                    this._adaptiveExpandedKey = void 0
                }
            },
            editorFactory: {
                _needHideBorder: function($element) {
                    return this.callBase($element) || (null === $element || void 0 === $element ? void 0 : $element.hasClass("dx-field-item-content")) && (null === $element || void 0 === $element ? void 0 : $element.find(".dx-checkbox").length)
                },
                _getFocusCellSelector: function() {
                    return "".concat(this.callBase(), ", .dx-adaptive-detail-row .dx-field-item > .dx-field-item-content")
                },
                _getRevertTooltipsSelector: function() {
                    return "".concat(this.callBase(), ", .dx-field-item-content .").concat(this.addWidgetPrefix(REVERT_TOOLTIP_CLASS))
                }
            },
            columns: {
                _isColumnVisible: function(column) {
                    return this.callBase(column) && !column.adaptiveHidden
                }
            },
            keyboardNavigation: keyboardNavigation
        }
    }
};
exports.adaptivityModule = adaptivityModule;
