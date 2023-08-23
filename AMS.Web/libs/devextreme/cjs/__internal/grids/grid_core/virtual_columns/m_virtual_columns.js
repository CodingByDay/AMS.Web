/**
 * DevExtreme (cjs/__internal/grids/grid_core/virtual_columns/m_virtual_columns.js)
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
exports.virtualColumnsModule = void 0;
var _size = require("../../../../core/utils/size");
var _type = require("../../../../core/utils/type");
var _window = require("../../../../core/utils/window");
var _m_virtual_columns_core = require("./m_virtual_columns_core");
var DEFAULT_COLUMN_WIDTH = 50;
var VirtualScrollingRowsViewExtender = {
    _resizeCore: function() {
        this.callBase.apply(this, arguments);
        this._columnsController.resize()
    },
    _handleScroll: function(e) {
        var that = this;
        var scrollable = this.getScrollable();
        var left = e.scrollOffset.left;
        that.callBase.apply(that, arguments);
        if (that.option("rtlEnabled") && scrollable) {
            left = (0, _size.getWidth)(scrollable.$content()) - (0, _size.getWidth)(scrollable.$element()) - left
        }
        that._columnsController.setScrollPosition(left)
    },
    _restoreScrollTop: function() {
        var scrollable = this.getScrollable();
        var scrollTop = null === scrollable || void 0 === scrollable ? void 0 : scrollable.scrollTop();
        if (this._scrollTop > 0 && scrollTop !== this._scrollTop) {
            scrollable.scrollTo({
                y: this._scrollTop
            })
        }
    },
    _renderCore: function(e) {
        var _this = this;
        if (null === e || void 0 === e ? void 0 : e.virtualColumnsScrolling) {
            var resizeCompletedHandler = function resizeCompletedHandler() {
                _this.resizeCompleted.remove(resizeCompletedHandler);
                _this._restoreScrollTop()
            };
            this.resizeCompleted.add(resizeCompletedHandler)
        }
        return this.callBase.apply(this, arguments)
    }
};
var HeaderViewExtender = {
    _renderCore: function() {
        var deferred = this.callBase.apply(this, arguments);
        if (this._columnsController.isVirtualMode()) {
            this._updateScrollLeftPosition()
        }
        return deferred
    }
};
var ColumnsControllerExtender = function() {
    var getWidths = function(columns) {
        return columns.map((function(column) {
            return column.visibleWidth || parseFloat(column.width) || DEFAULT_COLUMN_WIDTH
        }))
    };
    var members = {
        init: function() {
            var that = this;
            that.callBase.apply(this, arguments);
            that._beginPageIndex = null;
            that._endPageIndex = null;
            that._position = 0;
            that._virtualVisibleColumns = {}
        },
        resetColumnsCache: function() {
            this.callBase();
            this._virtualVisibleColumns = {}
        },
        getBeginPageIndex: function(position) {
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
        getTotalWidth: function() {
            var width = this.option("width");
            if ("number" === typeof width) {
                return width
            }
            return this.getController("resizing")._lastWidth || (0, _size.getOuterWidth)(this.component.$element())
        },
        getEndPageIndex: function(position) {
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
        getColumnPageSize: function() {
            return this.option("scrolling.columnPageSize")
        },
        _fireColumnsChanged: function() {
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
        getScrollingTimeout: function() {
            var renderingThreshold = this.option("scrolling.columnRenderingThreshold");
            var renderAsync = this.option("scrolling.renderAsync");
            var scrollingTimeout = 0;
            if (!(0, _type.isDefined)(renderAsync) && this._renderTime > renderingThreshold || renderAsync) {
                scrollingTimeout = this.option("scrolling.timeout")
            }
            return scrollingTimeout
        },
        setScrollPosition: function(position) {
            var _this2 = this;
            var scrollingTimeout = this.getScrollingTimeout();
            if (scrollingTimeout > 0) {
                clearTimeout(this._changedTimeout);
                this._changedTimeout = setTimeout((function() {
                    _this2._setScrollPositionCore(position)
                }), scrollingTimeout)
            } else {
                this._setScrollPositionCore(position)
            }
        },
        isVirtualMode: function() {
            return (0, _window.hasWindow)() && "virtual" === this.option("scrolling.columnRenderingMode")
        },
        resize: function() {
            this._setScrollPositionCore(this._position)
        },
        _setScrollPositionCore: function(position) {
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
        getFixedColumns: function(rowIndex, isBase) {
            var fixedColumns = this.callBase(rowIndex);
            if (this.isVirtualMode() && !isBase && fixedColumns.length) {
                var transparentColumnIndex = fixedColumns.map((function(c) {
                    return c.command
                })).indexOf("transparent");
                fixedColumns[transparentColumnIndex].colspan = this.getVisibleColumns().length - this.callBase().length + 1;
                return fixedColumns
            }
            return fixedColumns
        },
        _compileVisibleColumns: function(rowIndex, isBase) {
            var _a;
            if (isBase || !this.isVirtualMode() || !this._shouldReturnVisibleColumns()) {
                return this.callBase(rowIndex)
            }
            if ((null === (_a = this._columns) || void 0 === _a ? void 0 : _a.length) && !(0, _type.isDefined)(this._beginPageIndex) && !(0, _type.isDefined)(this._endPageIndex)) {
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
            var transparentColumnIndex = fixedColumns.map((function(c) {
                return c.command
            })).indexOf("transparent");
            var beginFixedColumnCount = fixedColumns.length ? transparentColumnIndex : 0;
            var beginFixedColumns = visibleColumns.slice(0, beginFixedColumnCount);
            var beginColumns = visibleColumns.slice(beginFixedColumnCount, startIndex);
            var beginWidth = getWidths(beginColumns).reduce((function(a, b) {
                return a + b
            }), 0);
            if (!beginWidth) {
                startIndex = 0
            }
            var endFixedColumnCount = fixedColumns.length ? fixedColumns.length - transparentColumnIndex - 1 : 0;
            var endFixedColumns = visibleColumns.slice(visibleColumns.length - endFixedColumnCount);
            var endColumns = visibleColumns.slice(endIndex, visibleColumns.length - endFixedColumnCount);
            var endWidth = getWidths(endColumns).reduce((function(a, b) {
                return a + b
            }), 0);
            if (!endWidth) {
                endIndex = visibleColumns.length
            }
            if (rowCount > 1 && "number" === typeof rowIndex) {
                var columnsInfo = [];
                for (var i = 0; i <= rowCount; i++) {
                    columnsInfo.push(this.callBase(i))
                }
                beginFixedColumns = (0, _m_virtual_columns_core.createColumnsInfo)(columnsInfo, 0, beginFixedColumns.length)[rowIndex] || [];
                endFixedColumns = (0, _m_virtual_columns_core.createColumnsInfo)(columnsInfo, visibleColumns.length - endFixedColumns.length, visibleColumns.length)[rowIndex] || [];
                visibleColumns = (0, _m_virtual_columns_core.createColumnsInfo)(columnsInfo, startIndex, endIndex)[rowIndex] || []
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
        getColumnIndexOffset: function() {
            var offset = 0;
            if (this._beginPageIndex > 0) {
                var fixedColumns = this.getFixedColumns();
                var transparentColumnIndex = fixedColumns.map((function(c) {
                    return c.command
                })).indexOf("transparent");
                var leftFixedColumnCount = transparentColumnIndex >= 0 ? transparentColumnIndex : 0;
                offset = this._beginPageIndex * this.getColumnPageSize() - leftFixedColumnCount - 1
            }
            return offset > 0 ? offset : 0
        },
        dispose: function() {
            clearTimeout(this._changedTimeout);
            this.callBase.apply(this, arguments)
        }
    };
    return members
}();
var virtualColumnsModule = {
    defaultOptions: function() {
        return {
            scrolling: {
                columnRenderingMode: "standard",
                columnPageSize: 5,
                columnRenderingThreshold: 300
            }
        }
    },
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
exports.virtualColumnsModule = virtualColumnsModule;
