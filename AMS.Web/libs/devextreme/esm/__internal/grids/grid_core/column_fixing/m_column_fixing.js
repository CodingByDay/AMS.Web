/**
 * DevExtreme (esm/__internal/grids/grid_core/column_fixing/m_column_fixing.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    move
} from "../../../../animation/translator";
import $ from "../../../../core/renderer";
import browser from "../../../../core/utils/browser";
import {
    extend
} from "../../../../core/utils/extend";
import {
    each
} from "../../../../core/utils/iterator";
import {
    getBoundingRect
} from "../../../../core/utils/position";
import {
    getOuterWidth
} from "../../../../core/utils/size";
import {
    isDefined
} from "../../../../core/utils/type";
import eventsEngine from "../../../../events/core/events_engine";
import {
    name as wheelEventName
} from "../../../../events/core/wheel";
import messageLocalization from "../../../../localization/message";
import Scrollable from "../../../../ui/scroll_view/ui.scrollable";
import gridCoreUtils from "../m_utils";
var CONTENT_CLASS = "content";
var CONTENT_FIXED_CLASS = "content-fixed";
var MASTER_DETAIL_CELL_CLASS = "dx-master-detail-cell";
var FIRST_CELL_CLASS = "dx-first-cell";
var LAST_CELL_CLASS = "dx-last-cell";
var HOVER_STATE_CLASS = "dx-state-hover";
var FIXED_COL_CLASS = "dx-col-fixed";
var FIXED_COLUMNS_CLASS = "dx-fixed-columns";
var POINTER_EVENTS_NONE_CLASS = "dx-pointer-events-none";
var COMMAND_TRANSPARENT = "transparent";
var GROUP_ROW_CLASS = "dx-group-row";
var DETAIL_ROW_CLASS = "dx-master-detail-row";
var getTransparentColumnIndex = function(fixedColumns) {
    var transparentColumnIndex = -1;
    each(fixedColumns, (index, column) => {
        if (column.command === COMMAND_TRANSPARENT) {
            transparentColumnIndex = index;
            return false
        }
        return
    });
    return transparentColumnIndex
};
var normalizeColumnWidths = function(fixedColumns, widths, fixedWidths) {
    var fixedColumnIndex = 0;
    if (fixedColumns && widths && fixedWidths) {
        for (var i = 0; i < fixedColumns.length; i++) {
            if (fixedColumns[i].command === COMMAND_TRANSPARENT) {
                fixedColumnIndex += fixedColumns[i].colspan
            } else {
                if (widths[fixedColumnIndex] < fixedWidths[i]) {
                    widths[fixedColumnIndex] = fixedWidths[i]
                }
                fixedColumnIndex++
            }
        }
    }
    return widths
};
var baseFixedColumns = {
    init() {
        this.callBase();
        this._isFixedTableRendering = false;
        this._isFixedColumns = false
    },
    _createCol(column) {
        return this.callBase(column).toggleClass(FIXED_COL_CLASS, !!(this._isFixedTableRendering && (column.fixed || column.command && column.command !== COMMAND_TRANSPARENT)))
    },
    _correctColumnIndicesForFixedColumns(fixedColumns, change) {
        var transparentColumnIndex = getTransparentColumnIndex(fixedColumns);
        var transparentColspan = fixedColumns[transparentColumnIndex].colspan;
        var columnIndices = change && change.columnIndices;
        if (columnIndices) {
            change.columnIndices = columnIndices.map(columnIndices => {
                if (columnIndices) {
                    return columnIndices.map(columnIndex => {
                        if (columnIndex < transparentColumnIndex) {
                            return columnIndex
                        }
                        if (columnIndex >= transparentColumnIndex + transparentColspan) {
                            return columnIndex - transparentColspan + 1
                        }
                        return -1
                    }).filter(columnIndex => columnIndex >= 0)
                }
            })
        }
    },
    _partialUpdateFixedTable(fixedColumns) {
        var fixedTableElement = this._fixedTableElement;
        var $rows = this._getRowElementsCore(fixedTableElement);
        var $colgroup = fixedTableElement.children("colgroup");
        $colgroup.replaceWith(this._createColGroup(fixedColumns));
        for (var i = 0; i < $rows.length; i++) {
            this._partialUpdateFixedRow($($rows[i]), fixedColumns)
        }
    },
    _partialUpdateFixedRow($row, fixedColumns) {
        var _a;
        var cellElements = $row.get(0).childNodes;
        var transparentColumnIndex = getTransparentColumnIndex(fixedColumns);
        var transparentColumn = fixedColumns[transparentColumnIndex];
        var columnIndexOffset = this._columnsController.getColumnIndexOffset();
        var groupCellOptions;
        var colIndex = columnIndexOffset + 1;
        var {
            colspan: colspan
        } = transparentColumn;
        if ($row.hasClass(DETAIL_ROW_CLASS)) {
            cellElements[0].setAttribute("colspan", null === (_a = this._columnsController.getVisibleColumns()) || void 0 === _a ? void 0 : _a.length);
            return
        }
        if ($row.hasClass(GROUP_ROW_CLASS)) {
            groupCellOptions = this._getGroupCellOptions({
                row: $row.data("options"),
                columns: this._columnsController.getVisibleColumns()
            });
            colspan = groupCellOptions.colspan - Math.max(0, cellElements.length - (groupCellOptions.columnIndex + 2))
        }
        for (var j = 0; j < cellElements.length; j++) {
            var needUpdateColspan = groupCellOptions ? j === groupCellOptions.columnIndex + 1 : j === transparentColumnIndex;
            cellElements[j].setAttribute("aria-colindex", colIndex);
            if (needUpdateColspan) {
                cellElements[j].setAttribute("colspan", colspan);
                colIndex += colspan
            } else {
                colIndex++
            }
        }
    },
    _renderTable(options) {
        var $fixedTable;
        var fixedColumns = this.getFixedColumns();
        this._isFixedColumns = !!fixedColumns.length;
        var $table = this.callBase(options);
        if (this._isFixedColumns) {
            var change = null === options || void 0 === options ? void 0 : options.change;
            this._isFixedTableRendering = true;
            if ((null === change || void 0 === change ? void 0 : change.virtualColumnsScrolling) && true !== this.option("scrolling.legacyMode")) {
                this._partialUpdateFixedTable(fixedColumns);
                this._isFixedTableRendering = false
            } else {
                var columnIndices = null === change || void 0 === change ? void 0 : change.columnIndices;
                this._correctColumnIndicesForFixedColumns(fixedColumns, change);
                $fixedTable = this._createTable(fixedColumns);
                this._renderRows($fixedTable, extend({}, options, {
                    columns: fixedColumns
                }));
                this._updateContent($fixedTable, change, true);
                if (columnIndices) {
                    change.columnIndices = columnIndices
                }
                this._isFixedTableRendering = false
            }
        } else {
            this._fixedTableElement && this._fixedTableElement.parent().remove();
            this._fixedTableElement = null
        }
        return $table
    },
    _renderRow($table, options) {
        var fixedCorrection;
        var {
            cells: cells
        } = options.row;
        this.callBase.apply(this, arguments);
        if (this._isFixedTableRendering && cells && cells.length) {
            fixedCorrection = 0;
            var fixedCells = options.row.cells || [];
            cells = cells.slice();
            options.row.cells = cells;
            for (var i = 0; i < fixedCells.length; i++) {
                if (fixedCells[i].column && fixedCells[i].column.command === COMMAND_TRANSPARENT) {
                    fixedCorrection = (fixedCells[i].column.colspan || 1) - 1;
                    continue
                }
                cells[i + fixedCorrection] = fixedCells[i]
            }
        }
    },
    _createCell(options) {
        var {
            column: column
        } = options;
        var columnCommand = column && column.command;
        var {
            rowType: rowType
        } = options;
        var $cell = this.callBase.apply(this, arguments);
        var fixedColumns;
        var prevFixedColumn;
        var transparentColumnIndex;
        if (this._isFixedTableRendering || "filter" === rowType) {
            fixedColumns = this.getFixedColumns();
            transparentColumnIndex = getTransparentColumnIndex(fixedColumns);
            prevFixedColumn = fixedColumns[transparentColumnIndex - 1]
        }
        if (this._isFixedTableRendering) {
            if (columnCommand === COMMAND_TRANSPARENT) {
                $cell.addClass(POINTER_EVENTS_NONE_CLASS).toggleClass(FIRST_CELL_CLASS, 0 === transparentColumnIndex || prevFixedColumn && "expand" === prevFixedColumn.command).toggleClass(LAST_CELL_CLASS, fixedColumns.length && transparentColumnIndex === fixedColumns.length - 1);
                if ("freeSpace" !== rowType) {
                    gridCoreUtils.setEmptyText($cell)
                }
            }
        } else if ("filter" === rowType) {
            $cell.toggleClass(FIRST_CELL_CLASS, options.columnIndex === transparentColumnIndex)
        }
        var isRowAltStyle = this.option("rowAlternationEnabled") && options.isAltRow;
        var isSelectAllCell = "multiple" === this.option("selection.mode") && 0 === options.columnIndex && "header" === options.rowType;
        if (browser.mozilla && options.column.fixed && "group" !== options.rowType && !isRowAltStyle && !isSelectAllCell) {
            $cell.addClass(FIXED_COL_CLASS)
        }
        return $cell
    },
    _getContent(isFixedTableRendering) {
        var _a;
        return isFixedTableRendering ? null === (_a = this._fixedTableElement) || void 0 === _a ? void 0 : _a.parent() : this.callBase.apply(this, arguments)
    },
    _wrapTableInScrollContainer($table, isFixedTableRendering) {
        var $scrollContainer = this.callBase.apply(this, arguments);
        if (this._isFixedTableRendering || isFixedTableRendering) {
            $scrollContainer.addClass(this.addWidgetPrefix(CONTENT_FIXED_CLASS))
        }
        return $scrollContainer
    },
    _renderCellContent($cell, options) {
        var isEmptyCell;
        var {
            column: column
        } = options;
        var isFixedTableRendering = this._isFixedTableRendering;
        var isGroupCell = "group" === options.rowType && isDefined(column.groupIndex);
        if (isFixedTableRendering && isGroupCell && !column.command && !column.groupCellTemplate) {
            $cell.css("pointerEvents", "none")
        }
        if (!isFixedTableRendering && this._isFixedColumns) {
            isEmptyCell = column.fixed || column.command && false !== column.fixed;
            if (isGroupCell) {
                isEmptyCell = false;
                if (options.row.summaryCells && options.row.summaryCells.length) {
                    var columns = this._columnsController.getVisibleColumns();
                    var alignByFixedColumnCellCount = this._getAlignByColumnCellCount ? this._getAlignByColumnCellCount(column.colspan, {
                        columns: columns,
                        row: options.row,
                        isFixed: true
                    }) : 0;
                    if (alignByFixedColumnCellCount > 0) {
                        var transparentColumnIndex = getTransparentColumnIndex(this._columnsController.getFixedColumns());
                        isEmptyCell = columns.length - alignByFixedColumnCellCount < transparentColumnIndex
                    }
                }
            }
            if (isEmptyCell) {
                if (column.command && "buttons" !== column.type || "group" === options.rowType) {
                    $cell.html("&nbsp;").addClass(column.cssClass);
                    return
                }
                $cell.addClass("dx-hidden-cell")
            }
        }
        if (column.command !== COMMAND_TRANSPARENT) {
            this.callBase.apply(this, arguments)
        }
    },
    _getCellElementsCore(rowIndex) {
        var cellElements = this.callBase.apply(this, arguments);
        var isGroupRow = null === cellElements || void 0 === cellElements ? void 0 : cellElements.parent().hasClass(GROUP_ROW_CLASS);
        var headerRowIndex = "columnHeadersView" === this.name ? rowIndex : void 0;
        if (this._fixedTableElement && cellElements) {
            var fixedColumns = this.getFixedColumns(headerRowIndex);
            var fixedCellElements = this._getRowElements(this._fixedTableElement).eq(rowIndex).children("td");
            each(fixedCellElements, (columnIndex, cell) => {
                if (isGroupRow) {
                    if (cellElements[columnIndex] && "hidden" !== cell.style.visibility) {
                        cellElements[columnIndex] = cell
                    }
                } else {
                    var fixedColumn = fixedColumns[columnIndex];
                    if (fixedColumn) {
                        if (fixedColumn.command === COMMAND_TRANSPARENT) {
                            if (fixedCellElements.eq(columnIndex).hasClass(MASTER_DETAIL_CELL_CLASS)) {
                                cellElements[columnIndex] = cell || cellElements[columnIndex]
                            }
                        } else {
                            var fixedColumnIndex = this._columnsController.getVisibleIndexByColumn(fixedColumn, headerRowIndex);
                            cellElements[fixedColumnIndex] = cell || cellElements[fixedColumnIndex]
                        }
                    }
                }
            })
        }
        return cellElements
    },
    getColumnWidths() {
        var result = this.callBase();
        var fixedColumns = this.getFixedColumns();
        var fixedWidths = this._fixedTableElement && result.length ? this.callBase(this._fixedTableElement) : void 0;
        return normalizeColumnWidths(fixedColumns, result, fixedWidths)
    },
    getTableElement(isFixedTableRendering) {
        isFixedTableRendering = this._isFixedTableRendering || isFixedTableRendering;
        var tableElement = isFixedTableRendering ? this._fixedTableElement : this.callBase();
        return tableElement
    },
    setTableElement(tableElement, isFixedTableRendering) {
        if (this._isFixedTableRendering || isFixedTableRendering) {
            this._fixedTableElement = tableElement.addClass(POINTER_EVENTS_NONE_CLASS)
        } else {
            this.callBase(tableElement)
        }
    },
    getColumns(rowIndex, $tableElement) {
        $tableElement = $tableElement || this.getTableElement();
        if (this._isFixedTableRendering || $tableElement && $tableElement.closest("table").parent(".".concat(this.addWidgetPrefix(CONTENT_FIXED_CLASS))).length) {
            return this.getFixedColumns(rowIndex)
        }
        return this.callBase(rowIndex, $tableElement)
    },
    getRowIndex($row) {
        var $fixedTable = this._fixedTableElement;
        if ($fixedTable && $fixedTable.find($row).length) {
            return this._getRowElements($fixedTable).index($row)
        }
        return this.callBase($row)
    },
    getTableElements() {
        var result = this.callBase.apply(this, arguments);
        if (this._fixedTableElement) {
            result = $([result.get(0), this._fixedTableElement.get(0)])
        }
        return result
    },
    getFixedColumns(rowIndex) {
        return this._columnsController.getFixedColumns(rowIndex)
    },
    getFixedColumnsOffset() {
        var offset = {
            left: 0,
            right: 0
        };
        var $transparentColumn;
        if (this._fixedTableElement) {
            $transparentColumn = this.getTransparentColumnElement();
            var positionTransparentColumn = $transparentColumn.position();
            offset = {
                left: positionTransparentColumn.left,
                right: getOuterWidth(this.element(), true) - (getOuterWidth($transparentColumn, true) + positionTransparentColumn.left)
            }
        }
        return offset
    },
    getTransparentColumnElement() {
        return this._fixedTableElement && this._fixedTableElement.find(".".concat(POINTER_EVENTS_NONE_CLASS)).first()
    },
    getFixedTableElement() {
        return this._fixedTableElement
    },
    isFixedColumns() {
        return this._isFixedColumns
    },
    _resizeCore() {
        this.callBase();
        this.synchronizeRows()
    },
    setColumnWidths(options) {
        var columns;
        var visibleColumns = this._columnsController.getVisibleColumns();
        var {
            widths: widths
        } = options;
        var isWidthsSynchronized = widths && widths.length && isDefined(visibleColumns[0].visibleWidth);
        var {
            optionNames: optionNames
        } = options;
        var isColumnWidthChanged = optionNames && optionNames.width;
        var useVisibleColumns = false;
        this.callBase.apply(this, arguments);
        if (this._fixedTableElement) {
            var hasAutoWidth = widths && widths.some(width => "auto" === width);
            useVisibleColumns = hasAutoWidth && (!isWidthsSynchronized || !this.isScrollbarVisible(true));
            if (useVisibleColumns) {
                columns = visibleColumns
            }
            this.callBase(extend({}, options, {
                $tableElement: this._fixedTableElement,
                columns: columns,
                fixed: true
            }))
        }
        if (isWidthsSynchronized || isColumnWidthChanged && this.option("wordWrapEnabled")) {
            this.synchronizeRows()
        }
    },
    _createColGroup(columns) {
        if (this._isFixedTableRendering && !this.option("columnAutoWidth")) {
            var visibleColumns = this._columnsController.getVisibleColumns();
            var useVisibleColumns = visibleColumns.filter(column => !column.width).length;
            if (useVisibleColumns) {
                columns = visibleColumns
            }
        }
        return this.callBase(columns)
    },
    _getClientHeight(element) {
        var boundingClientRectElement = element.getBoundingClientRect && getBoundingRect(element);
        return boundingClientRectElement && boundingClientRectElement.height ? boundingClientRectElement.height : element.clientHeight
    },
    synchronizeRows() {
        var rowHeights = [];
        var fixedRowHeights = [];
        var rowIndex;
        var $rowElements;
        var $fixedRowElements;
        var $contentElement;
        this.waitAsyncTemplates(true).done(() => {
            if (this._isFixedColumns && this._tableElement && this._fixedTableElement) {
                var heightTable = this._getClientHeight(this._tableElement.get(0));
                var heightFixedTable = this._getClientHeight(this._fixedTableElement.get(0));
                $rowElements = this._getRowElements(this._tableElement);
                $fixedRowElements = this._getRowElements(this._fixedTableElement);
                $contentElement = this._findContentElement();
                if (heightTable !== heightFixedTable) {
                    $contentElement && $contentElement.css("height", heightTable);
                    $rowElements.css("height", "");
                    $fixedRowElements.css("height", "");
                    for (rowIndex = 0; rowIndex < $rowElements.length; rowIndex++) {
                        rowHeights.push(this._getClientHeight($rowElements.get(rowIndex)));
                        fixedRowHeights.push(this._getClientHeight($fixedRowElements.get(rowIndex)))
                    }
                    for (rowIndex = 0; rowIndex < $rowElements.length; rowIndex++) {
                        var rowHeight = rowHeights[rowIndex];
                        var fixedRowHeight = fixedRowHeights[rowIndex];
                        if (rowHeight > fixedRowHeight) {
                            $fixedRowElements.eq(rowIndex).css("height", rowHeight)
                        } else if (rowHeight < fixedRowHeight) {
                            $rowElements.eq(rowIndex).css("height", fixedRowHeight)
                        }
                    }
                    $contentElement && $contentElement.css("height", "")
                }
            }
        })
    },
    setScrollerSpacing(width) {
        var rtlEnabled = this.option("rtlEnabled");
        this.callBase(width);
        this.element().children(".".concat(this.addWidgetPrefix(CONTENT_FIXED_CLASS))).css({
            paddingLeft: rtlEnabled ? width : "",
            paddingRight: !rtlEnabled ? width : ""
        })
    }
};
var ColumnHeadersViewFixedColumnsExtender = extend({}, baseFixedColumns, {
    _getRowVisibleColumns(rowIndex) {
        if (this._isFixedTableRendering) {
            return this.getFixedColumns(rowIndex)
        }
        return this.callBase(rowIndex)
    },
    getContextMenuItems(options) {
        var {
            column: column
        } = options;
        var columnFixingOptions = this.option("columnFixing");
        var items = this.callBase(options);
        if (options.row && "header" === options.row.rowType) {
            if (true === columnFixingOptions.enabled && column && column.allowFixing) {
                var onItemClick = params => {
                    switch (params.itemData.value) {
                        case "none":
                            this._columnsController.columnOption(column.index, "fixed", false);
                            break;
                        case "left":
                            this._columnsController.columnOption(column.index, {
                                fixed: true,
                                fixedPosition: "left"
                            });
                            break;
                        case "right":
                            this._columnsController.columnOption(column.index, {
                                fixed: true,
                                fixedPosition: "right"
                            })
                    }
                };
                items = items || [];
                items.push({
                    text: columnFixingOptions.texts.fix,
                    beginGroup: true,
                    items: [{
                        text: columnFixingOptions.texts.leftPosition,
                        value: "left",
                        disabled: column.fixed && (!column.fixedPosition || "left" === column.fixedPosition),
                        onItemClick: onItemClick
                    }, {
                        text: columnFixingOptions.texts.rightPosition,
                        value: "right",
                        disabled: column.fixed && "right" === column.fixedPosition,
                        onItemClick: onItemClick
                    }]
                }, {
                    text: columnFixingOptions.texts.unfix,
                    value: "none",
                    disabled: !column.fixed,
                    onItemClick: onItemClick
                })
            }
        }
        return items
    },
    getFixedColumnElements(rowIndex) {
        if (isDefined(rowIndex)) {
            return this._fixedTableElement && this._getRowElements(this._fixedTableElement).eq(rowIndex).children()
        }
        var columnElements = this.getColumnElements();
        var $transparentColumnElement = this.getTransparentColumnElement();
        if (columnElements && $transparentColumnElement && $transparentColumnElement.length) {
            var transparentColumnIndex = getTransparentColumnIndex(this.getFixedColumns());
            columnElements.splice(transparentColumnIndex, $transparentColumnElement.get(0).colSpan, $transparentColumnElement.get(0))
        }
        return columnElements
    },
    getColumnWidths() {
        var fixedWidths;
        var result = this.callBase();
        var $fixedColumnElements = this.getFixedColumnElements();
        var fixedColumns = this.getFixedColumns();
        if (this._fixedTableElement) {
            if ($fixedColumnElements && $fixedColumnElements.length) {
                fixedWidths = this._getWidths($fixedColumnElements)
            } else {
                fixedWidths = this.callBase(this._fixedTableElement)
            }
        }
        return normalizeColumnWidths(fixedColumns, result, fixedWidths)
    }
});
var RowsViewFixedColumnsExtender = extend({}, baseFixedColumns, {
    _detachHoverEvents() {
        this._fixedTableElement && eventsEngine.off(this._fixedTableElement, "mouseover mouseout", ".dx-data-row");
        this._tableElement && eventsEngine.off(this._tableElement, "mouseover mouseout", ".dx-data-row")
    },
    _attachHoverEvents() {
        var that = this;
        var attachHoverEvent = function($table) {
            eventsEngine.on($table, "mouseover mouseout", ".dx-data-row", that.createAction(args => {
                var {
                    event: event
                } = args;
                var rowIndex = that.getRowIndex($(event.target).closest(".dx-row"));
                var isHover = "mouseover" === event.type;
                if (rowIndex >= 0) {
                    that._tableElement && that._getRowElements(that._tableElement).eq(rowIndex).toggleClass(HOVER_STATE_CLASS, isHover);
                    that._fixedTableElement && that._getRowElements(that._fixedTableElement).eq(rowIndex).toggleClass(HOVER_STATE_CLASS, isHover)
                }
            }))
        };
        if (that._fixedTableElement && that._tableElement) {
            attachHoverEvent(that._fixedTableElement);
            attachHoverEvent(that._tableElement)
        }
    },
    _getScrollDelay() {
        var _a;
        var hasResizeTimeout = null === (_a = this.getController("resizing")) || void 0 === _a ? void 0 : _a.hasResizeTimeout();
        if (hasResizeTimeout) {
            return this.option("scrolling.updateTimeout")
        }
        return browser.mozilla ? 60 : 0
    },
    _findContentElement(isFixedTableRendering) {
        var $content;
        var scrollTop;
        var contentClass = this.addWidgetPrefix(CONTENT_CLASS);
        var element = this.element();
        isFixedTableRendering = this._isFixedTableRendering || isFixedTableRendering;
        if (element && isFixedTableRendering) {
            $content = element.children(".".concat(contentClass));
            var scrollable = this.getScrollable();
            if (!$content.length && scrollable) {
                $content = $("<div>").addClass(contentClass);
                eventsEngine.on($content, "scroll", e => {
                    var {
                        target: target
                    } = e;
                    var scrollDelay = this._getScrollDelay();
                    clearTimeout(this._fixedScrollTimeout);
                    this._fixedScrollTimeout = setTimeout(() => {
                        scrollTop = $(target).scrollTop();
                        scrollable.scrollTo({
                            y: scrollTop
                        })
                    }, scrollDelay)
                });
                eventsEngine.on($content, wheelEventName, e => {
                    var $nearestScrollable = $(e.target).closest(".dx-scrollable");
                    var shouldScroll = false;
                    if (scrollable && scrollable.$element().is($nearestScrollable)) {
                        shouldScroll = true
                    } else {
                        var nearestScrollableInstance = $nearestScrollable.length && Scrollable.getInstance($nearestScrollable.get(0));
                        var nearestScrollableHasVerticalScrollbar = nearestScrollableInstance && nearestScrollableInstance.scrollHeight() - nearestScrollableInstance.clientHeight() > 0;
                        shouldScroll = nearestScrollableInstance && !nearestScrollableHasVerticalScrollbar
                    }
                    if (shouldScroll) {
                        scrollTop = scrollable.scrollTop();
                        scrollable.scrollTo({
                            y: scrollTop - e.delta
                        });
                        var scrollableTop = scrollable.scrollTop() + scrollable.clientHeight();
                        var scrollableHeight = scrollable.scrollHeight() + this.getScrollbarWidth();
                        var isPreventDefault = scrollable.scrollTop() > 0 && scrollableTop < scrollableHeight;
                        if (isPreventDefault) {
                            return false
                        }
                    }
                    return
                });
                $content.appendTo(element)
            }
            return $content
        }
        return this.callBase()
    },
    _updateScrollable() {
        this.callBase();
        var scrollable = this.getScrollable();
        if (null === scrollable || void 0 === scrollable ? void 0 : scrollable._disposed) {
            return
        }
        var scrollTop = scrollable && scrollable.scrollOffset().top;
        this._updateFixedTablePosition(scrollTop)
    },
    _renderContent(contentElement, tableElement, isFixedTableRendering) {
        if (this._isFixedTableRendering || isFixedTableRendering) {
            return contentElement.empty().addClass("".concat(this.addWidgetPrefix(CONTENT_CLASS), " ").concat(this.addWidgetPrefix(CONTENT_FIXED_CLASS))).append(tableElement)
        }
        return this.callBase(contentElement, tableElement)
    },
    _getGroupCellOptions(options) {
        if (this._isFixedTableRendering) {
            return this.callBase(extend({}, options, {
                columns: this._columnsController.getVisibleColumns()
            }))
        }
        return this.callBase(options)
    },
    _renderGroupedCells($row, options) {
        return this.callBase($row, extend({}, options, {
            columns: this._columnsController.getVisibleColumns()
        }))
    },
    _renderGroupSummaryCells($row, options) {
        if (this._isFixedTableRendering) {
            this.callBase($row, extend({}, options, {
                columns: this._columnsController.getVisibleColumns()
            }))
        } else {
            this.callBase($row, options)
        }
    },
    _hasAlignByColumnSummaryItems(columnIndex, options) {
        var result = this.callBase.apply(this, arguments);
        var column = options.columns[columnIndex];
        if (options.isFixed) {
            return column.fixed && (result || "right" === column.fixedPosition)
        }
        return result && (!this._isFixedColumns || !column.fixed)
    },
    _renderGroupSummaryCellsCore($groupCell, options, groupCellColSpan, alignByColumnCellCount) {
        var alignByFixedColumnCellCount;
        if (this._isFixedTableRendering) {
            options.isFixed = true;
            alignByFixedColumnCellCount = this._getAlignByColumnCellCount(groupCellColSpan, options);
            options.isFixed = false;
            var startColumnIndex = options.columns.length - alignByFixedColumnCellCount;
            options = extend({}, options, {
                columns: this.getFixedColumns()
            });
            var transparentColumnIndex = getTransparentColumnIndex(options.columns);
            if (startColumnIndex < transparentColumnIndex) {
                alignByFixedColumnCellCount -= options.columns[transparentColumnIndex].colspan - 1 || 0;
                groupCellColSpan -= options.columns[transparentColumnIndex].colspan - 1 || 0
            } else if (alignByColumnCellCount > 0) {
                $groupCell.css("visibility", "hidden")
            }
            alignByColumnCellCount = alignByFixedColumnCellCount
        }
        this.callBase($groupCell, options, groupCellColSpan, alignByColumnCellCount)
    },
    _getSummaryCellIndex(columnIndex, columns) {
        if (this._isFixedTableRendering) {
            var transparentColumnIndex = getTransparentColumnIndex(columns);
            if (columnIndex > transparentColumnIndex) {
                columnIndex += columns[transparentColumnIndex].colspan - 1
            }
            return columnIndex
        }
        return this.callBase.apply(this, arguments)
    },
    _renderCore(change) {
        this._detachHoverEvents();
        var deferred = this.callBase(change);
        var isFixedColumns = this._isFixedColumns;
        this.element().toggleClass(FIXED_COLUMNS_CLASS, isFixedColumns);
        if (this.option("hoverStateEnabled") && isFixedColumns) {
            deferred.done(() => {
                this._attachHoverEvents()
            })
        }
        return deferred
    },
    setRowsOpacity(columnIndex, value) {
        this.callBase(columnIndex, value);
        var $rows = this._getRowElements(this._fixedTableElement);
        this._setRowsOpacityCore($rows, this.getFixedColumns(), columnIndex, value)
    },
    optionChanged(args) {
        this.callBase(args);
        if ("hoverStateEnabled" === args.name && this._isFixedColumns) {
            args.value ? this._attachHoverEvents() : this._detachHoverEvents()
        }
    },
    getCellIndex($cell) {
        var $fixedTable = this._fixedTableElement;
        var cellIndex = 0;
        if ($fixedTable && $cell.is("td") && $cell.closest($fixedTable).length) {
            var columns = this.getFixedColumns();
            each(columns, (index, column) => {
                if (index === $cell[0].cellIndex) {
                    return false
                }
                if (column.colspan) {
                    cellIndex += column.colspan;
                    return
                }
                cellIndex++;
                return
            });
            return cellIndex
        }
        return this.callBase.apply(this, arguments)
    },
    _updateFixedTablePosition(scrollTop, needFocus) {
        if (this._fixedTableElement && this._tableElement) {
            var $focusedElement;
            var editorFactory = this.getController("editorFactory");
            this._fixedTableElement.parent().scrollTop(scrollTop);
            if (needFocus && editorFactory) {
                $focusedElement = editorFactory.focus();
                $focusedElement && editorFactory.focus($focusedElement)
            }
        }
    },
    setScrollerSpacing(vWidth, hWidth) {
        var styles = {
            marginBottom: 0
        };
        var $fixedContent = this.element().children(".".concat(this.addWidgetPrefix(CONTENT_FIXED_CLASS)));
        if ($fixedContent.length && this._fixedTableElement) {
            $fixedContent.css(styles);
            this._fixedTableElement.css(styles);
            styles[this.option("rtlEnabled") ? "marginLeft" : "marginRight"] = vWidth;
            styles.marginBottom = hWidth;
            var useNativeScrolling = this._scrollable && this._scrollable.option("useNative");
            (useNativeScrolling ? $fixedContent : this._fixedTableElement).css(styles)
        }
    },
    _getElasticScrollTop(e) {
        var elasticScrollTop = 0;
        if (e.scrollOffset.top < 0) {
            elasticScrollTop = -e.scrollOffset.top
        } else if (e.reachedBottom) {
            var $scrollableContent = $(e.component.content());
            var $scrollableContainer = $(e.component.container());
            var maxScrollTop = Math.max($scrollableContent.get(0).clientHeight - $scrollableContainer.get(0).clientHeight, 0);
            elasticScrollTop = Math.min(maxScrollTop - e.scrollOffset.top, 0)
        }
        return Math.floor(elasticScrollTop)
    },
    _applyElasticScrolling(e) {
        if (this._fixedTableElement) {
            var elasticScrollTop = this._getElasticScrollTop(e);
            if (0 !== Math.ceil(elasticScrollTop)) {
                move(this._fixedTableElement, {
                    top: elasticScrollTop
                })
            } else {
                this._fixedTableElement.css("transform", "")
            }
        }
    },
    _handleScroll(e) {
        this._updateFixedTablePosition(e.scrollOffset.top, true);
        this._applyElasticScrolling(e);
        this.callBase(e)
    },
    _updateContentPosition(isRender) {
        this.callBase.apply(this, arguments);
        if (!isRender) {
            this._updateFixedTablePosition(this._scrollTop)
        }
    },
    _afterRowPrepared(e) {
        if (this._isFixedTableRendering) {
            return
        }
        this.callBase(e)
    },
    _scrollToElement($element) {
        this.callBase($element, this.getFixedColumnsOffset())
    },
    dispose() {
        this.callBase.apply(this, arguments);
        clearTimeout(this._fixedScrollTimeout)
    }
});
var FooterViewFixedColumnsExtender = baseFixedColumns;
export var columnFixingModule = {
    defaultOptions: () => ({
        columnFixing: {
            enabled: false,
            texts: {
                fix: messageLocalization.format("dxDataGrid-columnFixingFix"),
                unfix: messageLocalization.format("dxDataGrid-columnFixingUnfix"),
                leftPosition: messageLocalization.format("dxDataGrid-columnFixingLeftPosition"),
                rightPosition: messageLocalization.format("dxDataGrid-columnFixingRightPosition")
            }
        }
    }),
    extenders: {
        views: {
            columnHeadersView: ColumnHeadersViewFixedColumnsExtender,
            rowsView: RowsViewFixedColumnsExtender,
            footerView: FooterViewFixedColumnsExtender
        },
        controllers: {
            draggingHeader: {
                _generatePointsByColumns(options) {
                    var visibleColumns = options.columns;
                    var {
                        targetDraggingPanel: targetDraggingPanel
                    } = options;
                    if (targetDraggingPanel && "headers" === targetDraggingPanel.getName() && targetDraggingPanel.isFixedColumns()) {
                        if (options.sourceColumn.fixed) {
                            if (!options.rowIndex) {
                                options.columnElements = targetDraggingPanel.getFixedColumnElements(0)
                            }
                            options.columns = targetDraggingPanel.getFixedColumns(options.rowIndex);
                            var pointsByColumns = this.callBase(options);
                            ! function(columns, fixedColumns, pointsByColumns) {
                                var transparentColumnIndex = getTransparentColumnIndex(fixedColumns);
                                var correctIndex = columns.length - fixedColumns.length;
                                each(pointsByColumns, (_, point) => {
                                    if (point.index > transparentColumnIndex) {
                                        point.columnIndex += correctIndex;
                                        point.index += correctIndex
                                    }
                                });
                                return pointsByColumns
                            }(visibleColumns, options.columns, pointsByColumns);
                            return pointsByColumns
                        }
                    }
                    return this.callBase(options)
                },
                _pointCreated(point, columns, location, sourceColumn) {
                    var result = this.callBase.apply(this, arguments);
                    var targetColumn = columns[point.columnIndex];
                    var $transparentColumn = this._columnHeadersView.getTransparentColumnElement();
                    if (!result && "headers" === location && $transparentColumn && $transparentColumn.length) {
                        var boundingRect = getBoundingRect($transparentColumn.get(0));
                        if (sourceColumn && sourceColumn.fixed) {
                            return "right" === sourceColumn.fixedPosition ? point.x < boundingRect.right : point.x > boundingRect.left
                        }
                        if (targetColumn && targetColumn.fixed && "right" !== targetColumn.fixedPosition) {
                            return true
                        }
                        return point.x < boundingRect.left || point.x > boundingRect.right
                    }
                    return result
                }
            },
            columnsResizer: {
                _generatePointsByColumns() {
                    var that = this;
                    var columnsController = that._columnsController;
                    var columns = columnsController && that._columnsController.getVisibleColumns();
                    var fixedColumns = columnsController && that._columnsController.getFixedColumns();
                    var transparentColumnIndex = getTransparentColumnIndex(fixedColumns);
                    var correctIndex = columns.length - fixedColumns.length;
                    var cells = that._columnHeadersView.getFixedColumnElements();
                    that.callBase();
                    if (cells && cells.length > 0) {
                        that._pointsByFixedColumns = gridCoreUtils.getPointsByColumns(cells, point => {
                            if (point.index > transparentColumnIndex) {
                                point.columnIndex += correctIndex;
                                point.index += correctIndex
                            }
                            return that._pointCreated(point, columns.length, columns)
                        })
                    }
                },
                _getTargetPoint(pointsByColumns, currentX, deltaX) {
                    var $transparentColumn = this._columnHeadersView.getTransparentColumnElement();
                    if ($transparentColumn && $transparentColumn.length) {
                        var boundingRect = getBoundingRect($transparentColumn.get(0));
                        if (currentX <= boundingRect.left || currentX >= boundingRect.right) {
                            return this.callBase(this._pointsByFixedColumns, currentX, deltaX)
                        }
                    }
                    return this.callBase(pointsByColumns, currentX, deltaX)
                }
            }
        }
    }
};
