/**
 * DevExtreme (esm/__internal/grids/grid_core/virtual_columns/m_virtual_columns.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    getOuterWidth,
    getWidth
} from "../../../../core/utils/size";
import {
    isDefined
} from "../../../../core/utils/type";
import {
    hasWindow
} from "../../../../core/utils/window";
import {
    createColumnsInfo
} from "./m_virtual_columns_core";
var DEFAULT_COLUMN_WIDTH = 50;
var VirtualScrollingRowsViewExtender = {
    _resizeCore() {
        this.callBase.apply(this, arguments);
        this._columnsController.resize()
    },
    _handleScroll(e) {
        var scrollable = this.getScrollable();
        var {
            left: left
        } = e.scrollOffset;
        this.callBase.apply(this, arguments);
        if (this.option("rtlEnabled") && scrollable) {
            left = getWidth(scrollable.$content()) - getWidth(scrollable.$element()) - left
        }
        this._columnsController.setScrollPosition(left)
    },
    _restoreScrollTop() {
        var scrollable = this.getScrollable();
        var scrollTop = null === scrollable || void 0 === scrollable ? void 0 : scrollable.scrollTop();
        if (this._scrollTop > 0 && scrollTop !== this._scrollTop) {
            scrollable.scrollTo({
                y: this._scrollTop
            })
        }
    },
    _renderCore(e) {
        if (null === e || void 0 === e ? void 0 : e.virtualColumnsScrolling) {
            var resizeCompletedHandler = () => {
                this.resizeCompleted.remove(resizeCompletedHandler);
                this._restoreScrollTop()
            };
            this.resizeCompleted.add(resizeCompletedHandler)
        }
        return this.callBase.apply(this, arguments)
    }
};
var HeaderViewExtender = {
    _renderCore() {
        var deferred = this.callBase.apply(this, arguments);
        if (this._columnsController.isVirtualMode()) {
            this._updateScrollLeftPosition()
        }
        return deferred
    }
};
var ColumnsControllerExtender = function() {
    var getWidths = function(columns) {
        return columns.map(column => column.visibleWidth || parseFloat(column.width) || DEFAULT_COLUMN_WIDTH)
    };
    var members = {
        init() {
            this.callBase.apply(this, arguments);
            this._beginPageIndex = null;
            this._endPageIndex = null;
            this._position = 0;
            this._virtualVisibleColumns = {}
        },
        resetColumnsCache() {
            this.callBase();
            this._virtualVisibleColumns = {}
        },
        getBeginPageIndex(position) {
            var visibleColumns = this.getVisibleColumns(void 0, true);
            var widths = getWidths(visibleColumns);
            var currentPosition = 0;
            for (var index = 0; index < widths.length; index++) {
                if (currentPosition >= position) {
                    return Math.floor(index / this.getColumnPageSize())
                }
                currentPosition += widths[index]
            }
            return 0
        },
        getTotalWidth() {
            var width = this.option("width");
            if ("number" === typeof width) {
                return width
            }
            return this.getController("resizing")._lastWidth || getOuterWidth(this.component.$element())
        },
        getEndPageIndex(position) {
            var visibleColumns = this.getVisibleColumns(void 0, true);
            var widths = getWidths(visibleColumns);
            var currentPosition = 0;
            position += this.getTotalWidth();
            for (var index = 0; index < widths.length; index++) {
                if (currentPosition >= position) {
                    return Math.ceil(index / this.getColumnPageSize())
                }
                currentPosition += widths[index]
            }
            return Math.ceil(widths.length / this.getColumnPageSize())
        },
        getColumnPageSize() {
            return this.option("scrolling.columnPageSize")
        },
        _fireColumnsChanged() {
            var date = new Date;
            this.columnsChanged.fire({
                optionNames: {
                    all: true,
                    length: 1
                },
                changeTypes: {
                    columns: true,
                    virtualColumnsScrolling: true,
                    length: 2
                }
            });
            this._renderTime = new Date - date
        },
        getScrollingTimeout() {
            var renderingThreshold = this.option("scrolling.columnRenderingThreshold");
            var renderAsync = this.option("scrolling.renderAsync");
            var scrollingTimeout = 0;
            if (!isDefined(renderAsync) && this._renderTime > renderingThreshold || renderAsync) {
                scrollingTimeout = this.option("scrolling.timeout")
            }
            return scrollingTimeout
        },
        setScrollPosition(position) {
            var scrollingTimeout = this.getScrollingTimeout();
            if (scrollingTimeout > 0) {
                clearTimeout(this._changedTimeout);
                this._changedTimeout = setTimeout(() => {
                    this._setScrollPositionCore(position)
                }, scrollingTimeout)
            } else {
                this._setScrollPositionCore(position)
            }
        },
        isVirtualMode() {
            return hasWindow() && "virtual" === this.option("scrolling.columnRenderingMode")
        },
        resize() {
            this._setScrollPositionCore(this._position)
        },
        _setScrollPositionCore(position) {
            if (this.isVirtualMode()) {
                var beginPageIndex = this.getBeginPageIndex(position);
                var endPageIndex = this.getEndPageIndex(position);
                var needColumnsChanged = position < this._position ? this._beginPageIndex > beginPageIndex : this._endPageIndex < endPageIndex;
                this._position = position;
                if (needColumnsChanged) {
                    this._beginPageIndex = beginPageIndex;
                    this._endPageIndex = endPageIndex;
                    this._fireColumnsChanged()
                }
            }
        },
        getFixedColumns(rowIndex, isBase) {
            var fixedColumns = this.callBase(rowIndex);
            if (this.isVirtualMode() && !isBase && fixedColumns.length) {
                var transparentColumnIndex = fixedColumns.map(c => c.command).indexOf("transparent");
                fixedColumns[transparentColumnIndex].colspan = this.getVisibleColumns().length - this.callBase().length + 1;
                return fixedColumns
            }
            return fixedColumns
        },
        _compileVisibleColumns(rowIndex, isBase) {
            var _a;
            if (isBase || !this.isVirtualMode() || !this._shouldReturnVisibleColumns()) {
                return this.callBase(rowIndex)
            }
            if ((null === (_a = this._columns) || void 0 === _a ? void 0 : _a.length) && !isDefined(this._beginPageIndex) && !isDefined(this._endPageIndex)) {
                this._beginPageIndex = this.getBeginPageIndex(this._position);
                this._endPageIndex = this.getEndPageIndex(this._position)
            }
            var beginPageIndex = this._beginPageIndex;
            var endPageIndex = this._endPageIndex;
            var visibleColumnsHash = "".concat(rowIndex, "-").concat(beginPageIndex, "-").concat(endPageIndex);
            if (this._virtualVisibleColumns[visibleColumnsHash]) {
                return this._virtualVisibleColumns[visibleColumnsHash]
            }
            var visibleColumns = this.callBase();
            var rowCount = this.getRowCount();
            var pageSize = this.getColumnPageSize();
            var startIndex = beginPageIndex * pageSize;
            var endIndex = endPageIndex * pageSize;
            var fixedColumns = this.getFixedColumns(void 0, true);
            var transparentColumnIndex = fixedColumns.map(c => c.command).indexOf("transparent");
            var beginFixedColumnCount = fixedColumns.length ? transparentColumnIndex : 0;
            var beginFixedColumns = visibleColumns.slice(0, beginFixedColumnCount);
            var beginColumns = visibleColumns.slice(beginFixedColumnCount, startIndex);
            var beginWidth = getWidths(beginColumns).reduce((a, b) => a + b, 0);
            if (!beginWidth) {
                startIndex = 0
            }
            var endFixedColumnCount = fixedColumns.length ? fixedColumns.length - transparentColumnIndex - 1 : 0;
            var endFixedColumns = visibleColumns.slice(visibleColumns.length - endFixedColumnCount);
            var endColumns = visibleColumns.slice(endIndex, visibleColumns.length - endFixedColumnCount);
            var endWidth = getWidths(endColumns).reduce((a, b) => a + b, 0);
            if (!endWidth) {
                endIndex = visibleColumns.length
            }
            if (rowCount > 1 && "number" === typeof rowIndex) {
                var columnsInfo = [];
                for (var i = 0; i <= rowCount; i++) {
                    columnsInfo.push(this.callBase(i))
                }
                beginFixedColumns = createColumnsInfo(columnsInfo, 0, beginFixedColumns.length)[rowIndex] || [];
                endFixedColumns = createColumnsInfo(columnsInfo, visibleColumns.length - endFixedColumns.length, visibleColumns.length)[rowIndex] || [];
                visibleColumns = createColumnsInfo(columnsInfo, startIndex, endIndex)[rowIndex] || []
            } else {
                visibleColumns = visibleColumns.slice(startIndex, endIndex)
            }
            if (beginWidth) {
                visibleColumns.unshift({
                    command: "virtual",
                    width: beginWidth
                });
                visibleColumns = beginFixedColumns.concat(visibleColumns)
            }
            if (endWidth) {
                visibleColumns.push({
                    command: "virtual",
                    width: endWidth
                });
                visibleColumns = visibleColumns.concat(endFixedColumns)
            }
            this._virtualVisibleColumns[visibleColumnsHash] = visibleColumns;
            return visibleColumns
        },
        getColumnIndexOffset() {
            var offset = 0;
            if (this._beginPageIndex > 0) {
                var fixedColumns = this.getFixedColumns();
                var transparentColumnIndex = fixedColumns.map(c => c.command).indexOf("transparent");
                var leftFixedColumnCount = transparentColumnIndex >= 0 ? transparentColumnIndex : 0;
                offset = this._beginPageIndex * this.getColumnPageSize() - leftFixedColumnCount - 1
            }
            return offset > 0 ? offset : 0
        },
        dispose() {
            clearTimeout(this._changedTimeout);
            this.callBase.apply(this, arguments)
        }
    };
    return members
}();
export var virtualColumnsModule = {
    defaultOptions: () => ({
        scrolling: {
            columnRenderingMode: "standard",
            columnPageSize: 5,
            columnRenderingThreshold: 300
        }
    }),
    extenders: {
        controllers: {
            columns: ColumnsControllerExtender
        },
        views: {
            columnHeadersView: HeaderViewExtender,
            rowsView: VirtualScrollingRowsViewExtender
        }
    }
};
