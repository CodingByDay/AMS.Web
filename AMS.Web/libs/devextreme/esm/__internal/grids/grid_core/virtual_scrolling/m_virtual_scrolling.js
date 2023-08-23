/**
 * DevExtreme (esm/__internal/grids/grid_core/virtual_scrolling/m_virtual_scrolling.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import $ from "../../../../core/renderer";
import browser from "../../../../core/utils/browser";
import {
    Deferred,
    when
} from "../../../../core/utils/deferred";
import {
    isElementInDom
} from "../../../../core/utils/dom";
import {
    each
} from "../../../../core/utils/iterator";
import {
    getBoundingRect
} from "../../../../core/utils/position";
import {
    getOuterHeight
} from "../../../../core/utils/size";
import {
    isDefined
} from "../../../../core/utils/type";
import {
    getWindow
} from "../../../../core/utils/window";
import LoadIndicator from "../../../../ui/load_indicator";
import gridCoreUtils from "../m_utils";
import {
    subscribeToExternalScrollers,
    VirtualScrollController
} from "./m_virtual_scrolling_core";
var BOTTOM_LOAD_PANEL_CLASS = "bottom-load-panel";
var TABLE_CONTENT_CLASS = "table-content";
var GROUP_SPACE_CLASS = "group-space";
var CONTENT_CLASS = "content";
var FREESPACE_CLASS = "dx-freespace-row";
var COLUMN_LINES_CLASS = "dx-column-lines";
var VIRTUAL_ROW_CLASS = "dx-virtual-row";
var ROW_INSERTED = "dx-row-inserted";
var SCROLLING_MODE_INFINITE = "infinite";
var SCROLLING_MODE_VIRTUAL = "virtual";
var LOAD_TIMEOUT = 300;
var LEGACY_SCROLLING_MODE = "scrolling.legacyMode";
var VISIBLE_PAGE_INDEX = "paging.pageIndex";
var isVirtualMode = function(that) {
    return that.option("scrolling.mode") === SCROLLING_MODE_VIRTUAL
};
var isAppendMode = function(that) {
    return that.option("scrolling.mode") === SCROLLING_MODE_INFINITE
};
var isVirtualPaging = function(that) {
    return isVirtualMode(that) || isAppendMode(that)
};
var correctCount = function(items, count, fromEnd, isItemCountableFunc) {
    for (var i = 0; i < count + 1; i++) {
        var item = items[fromEnd ? items.length - 1 - i : i];
        if (item && !isItemCountableFunc(item, i === count, fromEnd)) {
            count++
        }
    }
    return count
};
var isItemCountableByDataSource = function(item, dataSource) {
    return "data" === item.rowType && !item.isNewRow || "group" === item.rowType && dataSource.isGroupItemCountable(item.data)
};
var updateItemIndices = function(items) {
    items.forEach((item, index) => {
        item.rowIndex = index
    });
    return items
};
var VirtualScrollingDataSourceAdapterExtender = function() {
    var updateLoading = function(that) {
        var beginPageIndex = that._virtualScrollController.beginPageIndex(-1);
        if (isVirtualMode(that)) {
            if (beginPageIndex < 0 || that.viewportSize() >= 0 && that.getViewportItemIndex() >= 0 && (beginPageIndex * that.pageSize() > that.getViewportItemIndex() || beginPageIndex * that.pageSize() + that.itemsCount() < that.getViewportItemIndex() + that.viewportSize()) && that._dataSource.isLoading()) {
                if (!that._isLoading) {
                    that._isLoading = true;
                    that.loadingChanged.fire(true)
                }
            } else if (that._isLoading) {
                that._isLoading = false;
                that.loadingChanged.fire(false)
            }
        }
    };
    var result = {
        init() {
            this.callBase.apply(this, arguments);
            this._items = [];
            this._totalCount = -1;
            this._isLoaded = true;
            this._loadPageCount = 1;
            this._virtualScrollController = new VirtualScrollController(this.component, this._getVirtualScrollDataOptions())
        },
        _getVirtualScrollDataOptions() {
            var that = this;
            return {
                pageSize: () => that.pageSize(),
                totalItemsCount: () => that.totalItemsCount(),
                hasKnownLastPage: () => that.hasKnownLastPage(),
                pageIndex: index => that._dataSource.pageIndex(index),
                isLoading: () => that._dataSource.isLoading() && !that.isCustomLoading(),
                pageCount: () => that.pageCount(),
                load: () => that._dataSource.load(),
                updateLoading() {
                    updateLoading(that)
                },
                itemsCount: () => that.itemsCount(true),
                items: () => that._dataSource.items(),
                viewportItems(items) {
                    if (items) {
                        that._items = items
                    }
                    return that._items
                },
                onChanged(e) {
                    that.changed.fire(e)
                },
                changingDuration() {
                    if (that.isLoading()) {
                        return LOAD_TIMEOUT
                    }
                    return that._renderTime || 0
                }
            }
        },
        _handleLoadingChanged(isLoading) {
            if (false === this.option(LEGACY_SCROLLING_MODE)) {
                this.callBase.apply(this, arguments);
                return
            }
            if (!isVirtualMode(this) || this._isLoadingAll) {
                this._isLoading = isLoading;
                this.callBase.apply(this, arguments)
            }
            if (isLoading) {
                this._startLoadTime = new Date
            } else {
                this._startLoadTime = void 0
            }
        },
        _handleLoadError() {
            if (false !== this.option(LEGACY_SCROLLING_MODE)) {
                this._isLoading = false;
                this.loadingChanged.fire(false)
            }
            this.callBase.apply(this, arguments)
        },
        _handleDataChanged(e) {
            if (false === this.option(LEGACY_SCROLLING_MODE)) {
                this._items = this._dataSource.items().slice();
                this._totalCount = this._dataSourceTotalCount(true);
                this.callBase.apply(this, arguments);
                return
            }
            var callBase = this.callBase.bind(this);
            this._virtualScrollController.handleDataChanged(callBase, e)
        },
        _customizeRemoteOperations(options, operationTypes) {
            var newMode = false === this.option(LEGACY_SCROLLING_MODE);
            var renderAsync = this.option("scrolling.renderAsync");
            if (!isDefined(renderAsync)) {
                renderAsync = this._renderTime >= this.option("scrolling.renderingThreshold")
            }
            if ((isVirtualMode(this) || isAppendMode(this) && newMode) && !operationTypes.reload && (operationTypes.skip || newMode) && !renderAsync) {
                options.delay = void 0
            }
            this.callBase.apply(this, arguments)
        },
        items() {
            return this._items
        },
        _dataSourceTotalCount(isBase) {
            return false === this.option(LEGACY_SCROLLING_MODE) && isVirtualMode(this) && !isBase ? this._totalCount : this.callBase()
        },
        itemsCount(isBase) {
            if (isBase || false === this.option(LEGACY_SCROLLING_MODE)) {
                return this.callBase()
            }
            return this._virtualScrollController.itemsCount()
        },
        load(loadOptions) {
            if (false === this.option(LEGACY_SCROLLING_MODE) || loadOptions) {
                return this.callBase(loadOptions)
            }
            return this._virtualScrollController.load()
        },
        isLoading() {
            return false === this.option(LEGACY_SCROLLING_MODE) ? this._dataSource.isLoading() : this._isLoading
        },
        isLoaded() {
            return this._dataSource.isLoaded() && this._isLoaded
        },
        resetPagesCache(isLiveUpdate) {
            if (!isLiveUpdate) {
                this._virtualScrollController.reset(true)
            }
            this.callBase.apply(this, arguments)
        },
        _changeRowExpandCore() {
            var result = this.callBase.apply(this, arguments);
            if (false === this.option(LEGACY_SCROLLING_MODE)) {
                return result
            }
            this.resetPagesCache();
            updateLoading(this);
            return result
        },
        reload() {
            this._dataSource.pageIndex(this.pageIndex());
            var virtualScrollController = this._virtualScrollController;
            if (false !== this.option(LEGACY_SCROLLING_MODE) && virtualScrollController) {
                var d = new Deferred;
                this.callBase.apply(this, arguments).done(r => {
                    var delayDeferred = virtualScrollController.getDelayDeferred();
                    if (delayDeferred) {
                        delayDeferred.done(d.resolve).fail(d.reject)
                    } else {
                        d.resolve(r)
                    }
                }).fail(d.reject);
                return d
            }
            return this.callBase.apply(this, arguments)
        },
        refresh(options, operationTypes) {
            if (false !== this.option(LEGACY_SCROLLING_MODE)) {
                var {
                    storeLoadOptions: storeLoadOptions
                } = options;
                var dataSource = this._dataSource;
                if (operationTypes.reload) {
                    this._virtualScrollController.reset();
                    dataSource.items().length = 0;
                    this._isLoaded = false;
                    updateLoading(this);
                    this._isLoaded = true;
                    if (isAppendMode(this)) {
                        this.pageIndex(0);
                        dataSource.pageIndex(0);
                        storeLoadOptions.pageIndex = 0;
                        options.pageIndex = 0;
                        storeLoadOptions.skip = 0
                    } else {
                        dataSource.pageIndex(this.pageIndex());
                        if (dataSource.paginate()) {
                            options.pageIndex = this.pageIndex();
                            storeLoadOptions.skip = this.pageIndex() * this.pageSize()
                        }
                    }
                } else if (isAppendMode(this) && storeLoadOptions.skip && this._totalCountCorrection < 0) {
                    storeLoadOptions.skip += this._totalCountCorrection
                }
            }
            return this.callBase.apply(this, arguments)
        },
        dispose() {
            this._virtualScrollController.dispose();
            this.callBase.apply(this, arguments)
        },
        loadPageCount(count) {
            if (!isDefined(count)) {
                return this._loadPageCount
            }
            this._loadPageCount = count
        },
        _handleDataLoading(options) {
            var loadPageCount = this.loadPageCount();
            var pageSize = this.pageSize();
            var newMode = false === this.option(LEGACY_SCROLLING_MODE);
            var {
                storeLoadOptions: storeLoadOptions
            } = options;
            var takeIsDefined = isDefined(storeLoadOptions.take);
            options.loadPageCount = loadPageCount;
            if (!options.isCustomLoading && newMode && takeIsDefined && loadPageCount > 1 && pageSize > 0) {
                storeLoadOptions.take = loadPageCount * pageSize
            }
            this.callBase.apply(this, arguments)
        },
        _loadPageSize() {
            return this.callBase.apply(this, arguments) * this.loadPageCount()
        }
    };
    ["beginPageIndex", "endPageIndex", "pageIndex"].forEach(name => {
        result[name] = function() {
            if (false === this.option(LEGACY_SCROLLING_MODE)) {
                var dataSource = this._dataSource;
                return dataSource.pageIndex.apply(dataSource, arguments)
            }
            var virtualScrollController = this._virtualScrollController;
            return virtualScrollController[name].apply(virtualScrollController, arguments)
        }
    });
    ["virtualItemsCount", "getContentOffset", "getVirtualContentSize", "setContentItemSizes", "setViewportPosition", "getViewportItemIndex", "setViewportItemIndex", "getItemIndexByPosition", "viewportSize", "viewportItemSize", "getItemSize", "getItemSizes", "loadIfNeed"].forEach(name => {
        result[name] = function() {
            var virtualScrollController = this._virtualScrollController;
            return virtualScrollController[name].apply(virtualScrollController, arguments)
        }
    });
    return result
}();
var VirtualScrollingRowsViewExtender = function() {
    var removeEmptyRows = function($emptyRows, className) {
        var tBodies = $emptyRows.toArray().map(row => $(row).parent(".".concat(className)).get(0)).filter(row => row);
        if (tBodies.length) {
            $emptyRows = $(tBodies)
        }
        var rowCount = className === FREESPACE_CLASS ? $emptyRows.length - 1 : $emptyRows.length;
        for (var i = 0; i < rowCount; i++) {
            $emptyRows.eq(i).remove()
        }
    };
    return {
        init() {
            var _a;
            var dataController = this.getController("data");
            this.callBase();
            dataController.pageChanged.add(pageIndex => {
                var scrollTop = this._scrollTop;
                this.scrollToPage(null !== pageIndex && void 0 !== pageIndex ? pageIndex : dataController.pageIndex());
                if (false === this.option(LEGACY_SCROLLING_MODE) && this._scrollTop === scrollTop) {
                    dataController.updateViewport()
                }
            });
            dataController.dataSourceChanged.add(() => {
                !this._scrollTop && this._scrollToCurrentPageOnResize()
            });
            null === (_a = dataController.stateLoaded) || void 0 === _a ? void 0 : _a.add(() => {
                this._scrollToCurrentPageOnResize()
            });
            this._scrollToCurrentPageOnResize()
        },
        _scrollToCurrentPageOnResize() {
            var dataController = this.getController("data");
            if (dataController.pageIndex() > 0) {
                var resizeHandler = () => {
                    this.resizeCompleted.remove(resizeHandler);
                    this.scrollToPage(dataController.pageIndex())
                };
                this.resizeCompleted.add(resizeHandler)
            }
        },
        scrollToPage(pageIndex) {
            var dataController = this._dataController;
            var pageSize = dataController ? dataController.pageSize() : 0;
            var scrollPosition;
            if (isVirtualMode(this) || isAppendMode(this)) {
                var itemSize = dataController.getItemSize();
                var itemSizes = dataController.getItemSizes();
                var itemIndex = pageIndex * pageSize;
                scrollPosition = itemIndex * itemSize;
                for (var index in itemSizes) {
                    if (parseInt(index) < itemIndex) {
                        scrollPosition += itemSizes[index] - itemSize
                    }
                }
            } else {
                scrollPosition = 0
            }
            this.scrollTo({
                y: scrollPosition,
                x: this._scrollLeft
            })
        },
        renderDelayedTemplates() {
            this.waitAsyncTemplates().done(() => {
                this._updateContentPosition(true)
            });
            this.callBase.apply(this, arguments)
        },
        _renderCore(e) {
            var startRenderTime = new Date;
            var deferred = this.callBase.apply(this, arguments);
            var dataSource = this._dataController._dataSource;
            if (dataSource && e) {
                var itemCount = e.items ? e.items.length : 20;
                var viewportSize = this._dataController.viewportSize() || 20;
                if (gridCoreUtils.isVirtualRowRendering(this) && itemCount > 0 && false !== this.option(LEGACY_SCROLLING_MODE)) {
                    dataSource._renderTime = (new Date - startRenderTime) * viewportSize / itemCount
                } else {
                    dataSource._renderTime = new Date - startRenderTime
                }
            }
            return deferred
        },
        _getRowElements(tableElement) {
            var $rows = this.callBase(tableElement);
            return $rows && $rows.not(".".concat(VIRTUAL_ROW_CLASS))
        },
        _removeRowsElements(contentTable, removeCount, changeType) {
            var rowElements = this._getRowElements(contentTable).toArray();
            if ("append" === changeType) {
                rowElements = rowElements.slice(0, removeCount)
            } else {
                rowElements = rowElements.slice(-removeCount)
            }
            var errorHandlingController = this.getController("errorHandling");
            rowElements.map(rowElement => {
                var $rowElement = $(rowElement);
                errorHandlingController && errorHandlingController.removeErrorRow($rowElement.next());
                $rowElement.remove()
            })
        },
        _updateContent(tableElement, change) {
            var $freeSpaceRowElements;
            var contentElement = this._findContentElement();
            var changeType = change && change.changeType;
            var d = Deferred();
            var contentTable = contentElement.children().first();
            if ("append" === changeType || "prepend" === changeType) {
                this.waitAsyncTemplates().done(() => {
                    var $tBodies = this._getBodies(tableElement);
                    if (1 === $tBodies.length) {
                        this._getBodies(contentTable)["append" === changeType ? "append" : "prepend"]($tBodies.children())
                    } else {
                        $tBodies["append" === changeType ? "appendTo" : "prependTo"](contentTable)
                    }
                    tableElement.remove();
                    $freeSpaceRowElements = this._getFreeSpaceRowElements(contentTable);
                    removeEmptyRows($freeSpaceRowElements, FREESPACE_CLASS);
                    if (change.removeCount) {
                        this._removeRowsElements(contentTable, change.removeCount, changeType)
                    }
                    this._restoreErrorRow(contentTable);
                    d.resolve()
                }).fail(d.reject)
            } else {
                this.callBase.apply(this, arguments).done(() => {
                    if ("update" === changeType) {
                        this._restoreErrorRow(contentTable)
                    }
                    d.resolve()
                }).fail(d.reject)
            }
            return d.promise().done(() => {
                this._updateBottomLoading()
            })
        },
        _addVirtualRow($table, isFixed, location, position) {
            if (!position) {
                return
            }
            var $virtualRow = this._createEmptyRow(VIRTUAL_ROW_CLASS, isFixed, position);
            $virtualRow = this._wrapRowIfNeed($table, $virtualRow);
            this._appendEmptyRow($table, $virtualRow, location)
        },
        _updateContentItemSizes() {
            var rowHeights = this._getRowHeights();
            var correctedRowHeights = this._correctRowHeights(rowHeights);
            this._dataController.setContentItemSizes(correctedRowHeights)
        },
        _updateViewportSize(viewportHeight, scrollTop) {
            if (!isDefined(viewportHeight)) {
                viewportHeight = this._hasHeight ? getOuterHeight(this.element()) : getOuterHeight(getWindow())
            }
            this._dataController.viewportHeight(viewportHeight, scrollTop)
        },
        _getRowHeights() {
            var _a, _b;
            var isPopupEditMode = null === (_b = null === (_a = this.getController("editing")) || void 0 === _a ? void 0 : _a.isPopupEditMode) || void 0 === _b ? void 0 : _b.call(_a);
            var rowElements = this._getRowElements(this._tableElement).toArray();
            if (isPopupEditMode) {
                rowElements = rowElements.filter(row => !$(row).hasClass(ROW_INSERTED))
            }
            return rowElements.map(row => getBoundingRect(row).height)
        },
        _correctRowHeights(rowHeights) {
            var dataController = this._dataController;
            var dataSource = dataController._dataSource;
            var correctedRowHeights = [];
            var visibleRows = dataController.getVisibleRows();
            var itemSize = 0;
            var firstCountableItem = true;
            var lastLoadIndex = -1;
            for (var i = 0; i < rowHeights.length; i++) {
                var currentItem = visibleRows[i];
                if (!isDefined(currentItem)) {
                    continue
                }
                if (false === this.option(LEGACY_SCROLLING_MODE)) {
                    if (lastLoadIndex >= 0 && lastLoadIndex !== currentItem.loadIndex) {
                        correctedRowHeights.push(itemSize);
                        itemSize = 0
                    }
                    lastLoadIndex = currentItem.loadIndex
                } else if (isItemCountableByDataSource(currentItem, dataSource)) {
                    if (firstCountableItem) {
                        firstCountableItem = false
                    } else {
                        correctedRowHeights.push(itemSize);
                        itemSize = 0
                    }
                }
                itemSize += rowHeights[i]
            }
            itemSize > 0 && correctedRowHeights.push(itemSize);
            return correctedRowHeights
        },
        _updateContentPosition(isRender) {
            var dataController = this._dataController;
            var rowHeight = this._rowHeight || 20;
            dataController.viewportItemSize(rowHeight);
            if (isVirtualMode(this) || gridCoreUtils.isVirtualRowRendering(this)) {
                if (!isRender) {
                    this._updateContentItemSizes()
                }
                var top = dataController.getContentOffset("begin");
                var bottom = dataController.getContentOffset("end");
                var $tables = this.getTableElements();
                var $virtualRows = $tables.children("tbody").children(".".concat(VIRTUAL_ROW_CLASS));
                removeEmptyRows($virtualRows, VIRTUAL_ROW_CLASS);
                $tables.each((index, element) => {
                    var isFixed = index > 0;
                    var prevFixed = this._isFixedTableRendering;
                    this._isFixedTableRendering = isFixed;
                    this._addVirtualRow($(element), isFixed, "top", top);
                    this._addVirtualRow($(element), isFixed, "bottom", bottom);
                    this._isFixedTableRendering = prevFixed
                })
            }
        },
        _isTableLinesDisplaysCorrect(table) {
            var hasColumnLines = table.find(".".concat(COLUMN_LINES_CLASS)).length > 0;
            return hasColumnLines === this.option("showColumnLines")
        },
        _isColumnElementsEqual($columns, $virtualColumns) {
            var result = $columns.length === $virtualColumns.length;
            if (result) {
                each($columns, (index, element) => {
                    if (element.style.width !== $virtualColumns[index].style.width) {
                        result = false;
                        return result
                    }
                    return
                })
            }
            return result
        },
        _getCellClasses(column) {
            var classes = [];
            var {
                cssClass: cssClass
            } = column;
            var isExpandColumn = "expand" === column.command;
            cssClass && classes.push(cssClass);
            isExpandColumn && classes.push(this.addWidgetPrefix(GROUP_SPACE_CLASS));
            return classes
        },
        _findBottomLoadPanel($contentElement) {
            var $element = $contentElement || this.element();
            var $bottomLoadPanel = $element && $element.find(".".concat(this.addWidgetPrefix(BOTTOM_LOAD_PANEL_CLASS)));
            if ($bottomLoadPanel && $bottomLoadPanel.length) {
                return $bottomLoadPanel
            }
        },
        _updateBottomLoading() {
            var virtualMode = isVirtualMode(this);
            var appendMode = isAppendMode(this);
            var showBottomLoading = !this._dataController.hasKnownLastPage() && this._dataController.isLoaded() && (virtualMode || appendMode);
            var $contentElement = this._findContentElement();
            var bottomLoadPanelElement = this._findBottomLoadPanel($contentElement);
            if (showBottomLoading) {
                if (!bottomLoadPanelElement) {
                    $("<div>").addClass(this.addWidgetPrefix(BOTTOM_LOAD_PANEL_CLASS)).append(this._createComponent($("<div>"), LoadIndicator).$element()).appendTo($contentElement)
                }
            } else if (bottomLoadPanelElement) {
                bottomLoadPanelElement.remove()
            }
        },
        _handleScroll(e) {
            var legacyScrollingMode = true === this.option(LEGACY_SCROLLING_MODE);
            var zeroTopPosition = 0 === e.scrollOffset.top;
            var isScrollTopChanged = this._scrollTop !== e.scrollOffset.top;
            var hasScrolled = isScrollTopChanged || e.forceUpdateScrollPosition;
            var isValidScrollTarget = this._hasHeight || !legacyScrollingMode && zeroTopPosition;
            if (hasScrolled && isValidScrollTarget && this._rowHeight) {
                this._scrollTop = e.scrollOffset.top;
                var isVirtualRowRendering = isVirtualMode(this) || "standard" !== this.option("scrolling.rowRenderingMode");
                if (isVirtualRowRendering && false === this.option(LEGACY_SCROLLING_MODE)) {
                    this._updateContentItemSizes();
                    this._updateViewportSize(null, this._scrollTop)
                }
                this._dataController.setViewportPosition(e.scrollOffset.top)
            }
            this.callBase.apply(this, arguments)
        },
        _needUpdateRowHeight(itemsCount) {
            return this.callBase.apply(this, arguments) || itemsCount > 0 && isAppendMode(this) && !gridCoreUtils.isVirtualRowRendering(this)
        },
        _updateRowHeight() {
            this.callBase.apply(this, arguments);
            if (this._rowHeight) {
                this._updateContentPosition();
                var viewportHeight = this._hasHeight ? getOuterHeight(this.element()) : getOuterHeight(getWindow());
                var dataController = this._dataController;
                if (false === this.option(LEGACY_SCROLLING_MODE)) {
                    this._updateViewportSize(viewportHeight);
                    dataController.updateViewport()
                } else {
                    dataController.viewportSize(Math.ceil(viewportHeight / this._rowHeight))
                }
            }
        },
        updateFreeSpaceRowHeight() {
            var result = this.callBase.apply(this, arguments);
            if (result) {
                this._updateContentPosition()
            }
            return result
        },
        setLoading(isLoading, messageText) {
            var dataController = this._dataController;
            var hasBottomLoadPanel = dataController.pageIndex() > 0 && dataController.isLoaded() && !!this._findBottomLoadPanel();
            if (false === this.option(LEGACY_SCROLLING_MODE) && isLoading && dataController.isViewportChanging()) {
                return
            }
            if (hasBottomLoadPanel) {
                isLoading = false
            }
            this.callBase.call(this, isLoading, messageText)
        },
        _resizeCore() {
            var that = this;
            var $element = that.element();
            that.callBase();
            if (that.component.$element() && !that._windowScroll && isElementInDom($element)) {
                that._windowScroll = subscribeToExternalScrollers($element, scrollPos => {
                    if (!that._hasHeight && that._rowHeight) {
                        that._dataController.setViewportPosition(scrollPos)
                    }
                }, that.component.$element());
                that.on("disposing", () => {
                    that._windowScroll.dispose()
                })
            }
            if (false !== this.option(LEGACY_SCROLLING_MODE)) {
                that.loadIfNeed()
            }
        },
        loadIfNeed() {
            var _a;
            var dataController = this._dataController;
            null === (_a = null === dataController || void 0 === dataController ? void 0 : dataController.loadIfNeed) || void 0 === _a ? void 0 : _a.call(dataController)
        },
        setColumnWidths(widths) {
            var scrollable = this.getScrollable();
            var $content;
            this.callBase.apply(this, arguments);
            if ("virtual" === this.option("scrolling.mode")) {
                $content = scrollable ? $(scrollable.content()) : this.element();
                this.callBase(widths, $content.children(".".concat(this.addWidgetPrefix(CONTENT_CLASS))).children(":not(.".concat(this.addWidgetPrefix(TABLE_CONTENT_CLASS), ")")))
            }
        },
        _restoreErrorRow() {
            if (false === this.option(LEGACY_SCROLLING_MODE)) {
                var errorHandling = this.getController("errorHandling");
                null === errorHandling || void 0 === errorHandling ? void 0 : errorHandling.removeErrorRow()
            }
            this.callBase.apply(this, arguments)
        },
        dispose() {
            clearTimeout(this._scrollTimeoutID);
            this.callBase()
        }
    }
}();
export var virtualScrollingModule = {
    defaultOptions: () => ({
        scrolling: {
            timeout: 300,
            updateTimeout: 300,
            minTimeout: 0,
            renderingThreshold: 100,
            removeInvisiblePages: true,
            rowPageSize: 5,
            prerenderedRowChunkSize: 1,
            mode: "standard",
            preloadEnabled: false,
            rowRenderingMode: "standard",
            loadTwoPagesOnStart: false,
            legacyMode: false,
            prerenderedRowCount: 1
        }
    }),
    extenders: {
        dataSourceAdapter: VirtualScrollingDataSourceAdapterExtender,
        controllers: {
            data: function() {
                var members = {
                    _refreshDataSource() {
                        var baseResult = this.callBase.apply(this, arguments) || (new Deferred).resolve().promise();
                        baseResult.done(this.initVirtualRows.bind(this));
                        return baseResult
                    },
                    _loadDataSource() {
                        var _a;
                        if (this._rowsScrollController && isVirtualPaging(this)) {
                            var {
                                loadPageCount: loadPageCount
                            } = isDefined(this._loadViewportParams) ? this.getLoadPageParams() : {
                                loadPageCount: void 0
                            };
                            loadPageCount >= 1 && (null === (_a = this._dataSource) || void 0 === _a ? void 0 : _a.loadPageCount(loadPageCount))
                        }
                        return this.callBase.apply(this, arguments)
                    },
                    getRowPageSize() {
                        var rowPageSize = this.option("scrolling.rowPageSize");
                        var pageSize = this.pageSize();
                        return pageSize && pageSize < rowPageSize ? pageSize : rowPageSize
                    },
                    reload() {
                        var rowsScrollController = this._rowsScrollController || this._dataSource;
                        var itemIndex = rowsScrollController && rowsScrollController.getItemIndexByPosition();
                        var result = this.callBase.apply(this, arguments);
                        return result && result.done(() => {
                            var _a;
                            if (isVirtualMode(this) || gridCoreUtils.isVirtualRowRendering(this)) {
                                var rowIndexOffset = this.getRowIndexOffset();
                                var rowIndex = Math.floor(itemIndex) - rowIndexOffset;
                                var {
                                    component: component
                                } = this;
                                var scrollable = component.getScrollable && component.getScrollable();
                                var isSortingOperation = this.dataSource().operationTypes().sorting;
                                if (scrollable && !isSortingOperation && rowIndex >= 0) {
                                    var rowElement = component.getRowElement(rowIndex);
                                    var $rowElement = rowElement && rowElement[0] && $(rowElement[0]);
                                    var top = $rowElement && $rowElement.position().top;
                                    var isChromeLatest = browser.chrome && Number(null !== (_a = browser.version) && void 0 !== _a ? _a : 0) >= 91;
                                    var allowedTopOffset = browser.mozilla || isChromeLatest ? 1 : 0;
                                    if (top > allowedTopOffset) {
                                        top = Math.round(top + getOuterHeight($rowElement) * (itemIndex % 1));
                                        scrollable.scrollTo({
                                            y: top
                                        })
                                    }
                                }
                            }
                        })
                    },
                    initVirtualRows() {
                        var virtualRowsRendering = gridCoreUtils.isVirtualRowRendering(this);
                        this._allItems = null;
                        this._loadViewportParams = null;
                        if ("virtual" !== this.option("scrolling.mode") && !virtualRowsRendering || !virtualRowsRendering || false !== this.option(LEGACY_SCROLLING_MODE) && !this.option("scrolling.rowPageSize")) {
                            this._visibleItems = null;
                            this._rowsScrollController = null;
                            return
                        }
                        var pageIndex = !isVirtualMode(this) && this.pageIndex() >= this.pageCount() ? this.pageCount() - 1 : this.pageIndex();
                        this._rowPageIndex = Math.ceil(pageIndex * this.pageSize() / this.getRowPageSize());
                        this._visibleItems = false === this.option(LEGACY_SCROLLING_MODE) ? null : [];
                        this._viewportChanging = false;
                        this._needUpdateViewportAfterLoading = false;
                        if (!this._rowsScrollController) {
                            this._rowsScrollController = new VirtualScrollController(this.component, this._getRowsScrollDataOptions(), true);
                            this._rowsScrollController.positionChanged.add(() => {
                                var _a;
                                if (false === this.option(LEGACY_SCROLLING_MODE)) {
                                    this._viewportChanging = true;
                                    this.loadViewport();
                                    this._viewportChanging = false;
                                    return
                                }
                                null === (_a = this._dataSource) || void 0 === _a ? void 0 : _a.setViewportItemIndex(this._rowsScrollController.getViewportItemIndex())
                            })
                        }
                        if (false === this.option(LEGACY_SCROLLING_MODE)) {
                            this._updateLoadViewportParams()
                        }
                        if (this.isLoaded() && false !== this.option(LEGACY_SCROLLING_MODE)) {
                            this._rowsScrollController.load()
                        }
                    },
                    isViewportChanging() {
                        return this._viewportChanging
                    },
                    _getRowsScrollDataOptions() {
                        var that = this;
                        var isItemCountable = function(item) {
                            return isItemCountableByDataSource(item, that._dataSource)
                        };
                        return {
                            pageSize: () => that.getRowPageSize(),
                            loadedOffset() {
                                var _a;
                                return isVirtualMode(that) && (null === (_a = that._dataSource) || void 0 === _a ? void 0 : _a.lastLoadOptions().skip) || 0
                            },
                            loadedItemCount: () => that._itemCount,
                            totalItemsCount() {
                                if (isVirtualPaging(that)) {
                                    return that.totalItemsCount()
                                }
                                return false === that.option(LEGACY_SCROLLING_MODE) ? that._itemCount : that._items.filter(isItemCountable).length
                            },
                            hasKnownLastPage: () => false === that.option(LEGACY_SCROLLING_MODE) ? that.hasKnownLastPage() : true,
                            pageIndex(index) {
                                if (void 0 !== index) {
                                    that._rowPageIndex = index
                                }
                                return that._rowPageIndex
                            },
                            isLoading: () => that.isLoading(),
                            pageCount() {
                                var pageCount = Math.ceil(this.totalItemsCount() / this.pageSize());
                                return pageCount || 1
                            },
                            load() {
                                if (that._rowsScrollController.pageIndex() >= this.pageCount()) {
                                    that._rowPageIndex = this.pageCount() - 1;
                                    that._rowsScrollController.pageIndex(that._rowPageIndex)
                                }
                                if (!this.items().length && this.totalItemsCount()) {
                                    return
                                }
                                that._rowsScrollController.handleDataChanged(change => {
                                    change = change || {};
                                    change.changeType = change.changeType || "refresh";
                                    change.items = change.items || that._visibleItems;
                                    that._visibleItems.forEach((item, index) => {
                                        item.rowIndex = index
                                    });
                                    that._fireChanged(change)
                                })
                            },
                            updateLoading() {},
                            itemsCount() {
                                return this.items(true).length
                            },
                            correctCount: (items, count, fromEnd) => correctCount(items, count, fromEnd, (item, isNextAfterLast, fromEnd) => {
                                if (item.isNewRow) {
                                    return isNextAfterLast && !fromEnd
                                }
                                if (isNextAfterLast && fromEnd) {
                                    return !item.isNewRow
                                }
                                return isItemCountable(item)
                            }),
                            items(countableOnly) {
                                var result = that._items;
                                if (that.option(LEGACY_SCROLLING_MODE)) {
                                    var dataSource = that.dataSource();
                                    var virtualItemsCount = null === dataSource || void 0 === dataSource ? void 0 : dataSource.virtualItemsCount();
                                    var begin = virtualItemsCount ? virtualItemsCount.begin : 0;
                                    var rowPageSize = that.getRowPageSize();
                                    var skip = that._rowPageIndex * rowPageSize - begin;
                                    var take = rowPageSize;
                                    if (skip < 0) {
                                        return []
                                    }
                                    if (skip) {
                                        skip = this.correctCount(result, skip);
                                        result = result.slice(skip)
                                    }
                                    if (take) {
                                        take = this.correctCount(result, take);
                                        result = result.slice(0, take)
                                    }
                                }
                                return countableOnly ? result.filter(isItemCountable) : result
                            },
                            viewportItems(items) {
                                if (items && false !== that.option(LEGACY_SCROLLING_MODE)) {
                                    that._visibleItems = items
                                }
                                return that._visibleItems
                            },
                            onChanged() {},
                            changingDuration() {
                                var dataSource = that.dataSource();
                                if ((null === dataSource || void 0 === dataSource ? void 0 : dataSource.isLoading()) && false !== that.option(LEGACY_SCROLLING_MODE)) {
                                    return LOAD_TIMEOUT
                                }
                                return (null === dataSource || void 0 === dataSource ? void 0 : dataSource._renderTime) || 0
                            }
                        }
                    },
                    _updateItemsCore(change) {
                        var delta = this.getRowIndexDelta();
                        this.callBase.apply(this, arguments);
                        if (false === this.option(LEGACY_SCROLLING_MODE) && gridCoreUtils.isVirtualRowRendering(this)) {
                            if ("update" === change.changeType && 0 === change.rowIndices.length && change.cancelEmptyChanges) {
                                change.cancel = true
                            }
                            return
                        }
                        var rowsScrollController = this._rowsScrollController;
                        if (rowsScrollController) {
                            var visibleItems = this._visibleItems;
                            var isRefresh = "refresh" === change.changeType || change.isLiveUpdate;
                            if ("append" === change.changeType && change.items && !change.items.length) {
                                return
                            }
                            if (isRefresh || "append" === change.changeType || "prepend" === change.changeType) {
                                change.cancel = true;
                                isRefresh && rowsScrollController.reset(true);
                                rowsScrollController.load()
                            } else {
                                if ("update" === change.changeType) {
                                    change.rowIndices.forEach((rowIndex, index) => {
                                        var changeType = change.changeTypes[index];
                                        var newItem = change.items[index];
                                        if ("update" === changeType) {
                                            visibleItems[rowIndex] = newItem
                                        } else if ("insert" === changeType) {
                                            visibleItems.splice(rowIndex, 0, newItem)
                                        } else if ("remove" === changeType) {
                                            visibleItems.splice(rowIndex, 1)
                                        }
                                    })
                                } else {
                                    visibleItems.forEach((item, index) => {
                                        visibleItems[index] = this._items[index + delta] || visibleItems[index]
                                    });
                                    change.items = visibleItems
                                }
                                updateItemIndices(visibleItems)
                            }
                        }
                    },
                    _updateLoadViewportParams() {
                        var viewportParams = this._rowsScrollController.getViewportParams();
                        var pageSize = this.pageSize();
                        if (viewportParams && !isVirtualPaging(this) && pageSize > 0) {
                            var pageOffset = this.pageIndex() * pageSize;
                            viewportParams.skip += pageOffset
                        }
                        this._loadViewportParams = viewportParams
                    },
                    _processItems() {
                        var _a;
                        var resultItems = this.callBase.apply(this, arguments);
                        if (false === this.option(LEGACY_SCROLLING_MODE)) {
                            var dataSource = this._dataSource;
                            var currentIndex = null !== (_a = null === dataSource || void 0 === dataSource ? void 0 : dataSource.lastLoadOptions().skip) && void 0 !== _a ? _a : 0;
                            var prevCountable;
                            var prevRowType;
                            var isPrevRowNew;
                            var wasCountableItem = false;
                            var newRows = [];
                            resultItems.forEach(item => {
                                var {
                                    rowType: rowType
                                } = item;
                                var itemCountable = isItemCountableByDataSource(item, dataSource);
                                var isNextGroupItem = "group" === rowType && (prevCountable || itemCountable || "group" !== prevRowType && currentIndex > 0);
                                var isNextDataItem = "data" === rowType && itemCountable && (prevCountable || "group" !== prevRowType);
                                if (!item.isNewRow && isDefined(prevCountable)) {
                                    var isPrevNewRowFirst = isPrevRowNew && !wasCountableItem;
                                    if ((isNextGroupItem || isNextDataItem) && !isPrevNewRowFirst) {
                                        currentIndex++
                                    }
                                }
                                if (isNextGroupItem || isNextDataItem) {
                                    wasCountableItem = true
                                }
                                if (item.isNewRow) {
                                    newRows.push(item)
                                } else {
                                    newRows.forEach(it => {
                                        it.loadIndex = currentIndex
                                    });
                                    newRows = []
                                }
                                item.loadIndex = currentIndex;
                                prevCountable = itemCountable;
                                prevRowType = rowType;
                                isPrevRowNew = item.isNewRow
                            });
                            newRows.forEach(it => {
                                it.loadIndex = currentIndex
                            })
                        }
                        return resultItems
                    },
                    _afterProcessItems(items) {
                        this._itemCount = items.filter(item => isItemCountableByDataSource(item, this._dataSource)).length;
                        if (isDefined(this._loadViewportParams)) {
                            this._updateLoadViewportParams();
                            var result = items;
                            this._allItems = items;
                            if (items.length) {
                                var {
                                    skipForCurrentPage: skipForCurrentPage
                                } = this.getLoadPageParams(true);
                                var skip = items[0].loadIndex + skipForCurrentPage;
                                var {
                                    take: take
                                } = this._loadViewportParams;
                                result = items.filter(it => {
                                    var isNewRowInEmptyData = it.isNewRow && it.loadIndex === skip && 0 === take;
                                    var isLoadIndexGreaterStart = it.loadIndex >= skip;
                                    var isLoadIndexLessEnd = it.loadIndex < skip + take || isNewRowInEmptyData;
                                    return isLoadIndexGreaterStart && isLoadIndexLessEnd
                                })
                            }
                            return result
                        }
                        return this.callBase.apply(this, arguments)
                    },
                    _applyChange(change) {
                        var that = this;
                        var {
                            items: items
                        } = change;
                        var {
                            changeType: changeType
                        } = change;
                        var {
                            removeCount: removeCount
                        } = change;
                        if (removeCount) {
                            var fromEnd = "prepend" === changeType;
                            removeCount = correctCount(that._items, removeCount, fromEnd, (item, isNextAfterLast) => "data" === item.rowType && !item.isNewRow || "group" === item.rowType && (that._dataSource.isGroupItemCountable(item.data) || isNextAfterLast));
                            change.removeCount = removeCount
                        }
                        switch (changeType) {
                            case "prepend":
                                that._items.unshift.apply(that._items, items);
                                if (removeCount) {
                                    that._items.splice(-removeCount)
                                }
                                break;
                            case "append":
                                that._items.push.apply(that._items, items);
                                if (removeCount) {
                                    that._items.splice(0, removeCount)
                                }
                                break;
                            default:
                                that.callBase(change)
                        }
                    },
                    items(allItems) {
                        return allItems ? this._allItems || this._items : this._visibleItems || this._items
                    },
                    getRowIndexDelta() {
                        var delta = 0;
                        if (this.option(LEGACY_SCROLLING_MODE)) {
                            var visibleItems = this._visibleItems;
                            if (visibleItems && visibleItems[0]) {
                                delta = this._items.indexOf(visibleItems[0])
                            }
                        }
                        return delta < 0 ? 0 : delta
                    },
                    getRowIndexOffset(byLoadedRows) {
                        var _a;
                        var offset = 0;
                        var dataSource = this.dataSource();
                        var rowsScrollController = this._rowsScrollController;
                        var newMode = false === this.option(LEGACY_SCROLLING_MODE);
                        var virtualPaging = isVirtualPaging(this);
                        if (rowsScrollController && !byLoadedRows) {
                            if (newMode && isDefined(this._loadViewportParams)) {
                                var {
                                    skipForCurrentPage: skipForCurrentPage,
                                    pageIndex: pageIndex
                                } = this.getLoadPageParams(true);
                                var items = this.items(true);
                                offset = virtualPaging ? pageIndex * this.pageSize() : 0;
                                if (items.length) {
                                    var firstLoadIndex = items[0].loadIndex;
                                    offset += items.filter(item => item.loadIndex < firstLoadIndex + skipForCurrentPage).length
                                }
                            } else {
                                offset = rowsScrollController.beginPageIndex() * rowsScrollController.pageSize()
                            }
                        } else if (virtualPaging && newMode && dataSource) {
                            offset = null !== (_a = dataSource.lastLoadOptions().skip) && void 0 !== _a ? _a : 0
                        } else if (isVirtualMode(this) && dataSource) {
                            offset = dataSource.beginPageIndex() * dataSource.pageSize()
                        }
                        return offset
                    },
                    getDataIndex() {
                        if (false === this.option(LEGACY_SCROLLING_MODE)) {
                            return this.getRowIndexOffset(true)
                        }
                        return this.callBase.apply(this, arguments)
                    },
                    viewportSize() {
                        var rowsScrollController = this._rowsScrollController;
                        var dataSource = this._dataSource;
                        var result = null === rowsScrollController || void 0 === rowsScrollController ? void 0 : rowsScrollController.viewportSize.apply(rowsScrollController, arguments);
                        if (false === this.option(LEGACY_SCROLLING_MODE)) {
                            return result
                        }
                        return null === dataSource || void 0 === dataSource ? void 0 : dataSource.viewportSize.apply(dataSource, arguments)
                    },
                    viewportHeight(height, scrollTop) {
                        var _a;
                        null === (_a = this._rowsScrollController) || void 0 === _a ? void 0 : _a.viewportHeight(height, scrollTop)
                    },
                    viewportItemSize() {
                        var rowsScrollController = this._rowsScrollController;
                        var dataSource = this._dataSource;
                        var result = null === rowsScrollController || void 0 === rowsScrollController ? void 0 : rowsScrollController.viewportItemSize.apply(rowsScrollController, arguments);
                        if (false === this.option(LEGACY_SCROLLING_MODE)) {
                            return result
                        }
                        return null === dataSource || void 0 === dataSource ? void 0 : dataSource.viewportItemSize.apply(dataSource, arguments)
                    },
                    setViewportPosition() {
                        var rowsScrollController = this._rowsScrollController;
                        var dataSource = this._dataSource;
                        this._isPaging = false;
                        if (rowsScrollController) {
                            rowsScrollController.setViewportPosition.apply(rowsScrollController, arguments)
                        } else {
                            null === dataSource || void 0 === dataSource ? void 0 : dataSource.setViewportPosition.apply(dataSource, arguments)
                        }
                    },
                    setContentItemSizes(sizes) {
                        var rowsScrollController = this._rowsScrollController;
                        var dataSource = this._dataSource;
                        var result = null === rowsScrollController || void 0 === rowsScrollController ? void 0 : rowsScrollController.setContentItemSizes(sizes);
                        if (false === this.option(LEGACY_SCROLLING_MODE)) {
                            return result
                        }
                        return null === dataSource || void 0 === dataSource ? void 0 : dataSource.setContentItemSizes(sizes)
                    },
                    getPreloadedRowCount() {
                        var preloadCount = this.option("scrolling.preloadedRowCount");
                        var preloadEnabled = this.option("scrolling.preloadEnabled");
                        if (isDefined(preloadCount)) {
                            return preloadCount
                        }
                        var viewportSize = this.viewportSize();
                        return preloadEnabled ? 2 * viewportSize : viewportSize
                    },
                    getLoadPageParams(byLoadedPage) {
                        var _a, _b;
                        var pageSize = this.pageSize();
                        var viewportParams = this._loadViewportParams;
                        var lastLoadOptions = null === (_a = this._dataSource) || void 0 === _a ? void 0 : _a.lastLoadOptions();
                        var loadedPageIndex = (null === lastLoadOptions || void 0 === lastLoadOptions ? void 0 : lastLoadOptions.pageIndex) || 0;
                        var loadedTake = (null === lastLoadOptions || void 0 === lastLoadOptions ? void 0 : lastLoadOptions.take) || 0;
                        var isScrollingBack = this._rowsScrollController.isScrollingBack();
                        var topPreloadCount = isScrollingBack ? this.getPreloadedRowCount() : 0;
                        var bottomPreloadCount = isScrollingBack ? 0 : this.getPreloadedRowCount();
                        var totalCountCorrection = (null === (_b = this._dataSource) || void 0 === _b ? void 0 : _b.totalCountCorrection()) || 0;
                        var skipWithPreload = Math.max(0, viewportParams.skip - topPreloadCount);
                        var pageIndex = byLoadedPage ? loadedPageIndex : Math.floor(pageSize ? skipWithPreload / pageSize : 0);
                        var pageOffset = pageIndex * pageSize;
                        var skipForCurrentPage = viewportParams.skip - pageOffset;
                        var loadingTake = viewportParams.take + skipForCurrentPage + bottomPreloadCount - totalCountCorrection;
                        var take = byLoadedPage ? loadedTake : loadingTake;
                        var loadPageCount = Math.ceil(pageSize ? take / pageSize : 0);
                        return {
                            pageIndex: pageIndex,
                            loadPageCount: Math.max(1, loadPageCount),
                            skipForCurrentPage: Math.max(0, skipForCurrentPage)
                        }
                    },
                    _updateVisiblePageIndex(currentPageIndex) {
                        if (!this._rowsScrollController) {
                            return
                        }
                        if (isDefined(currentPageIndex)) {
                            this._silentOption(VISIBLE_PAGE_INDEX, currentPageIndex);
                            this.pageChanged.fire();
                            return
                        }
                        var viewPortItemIndex = this._rowsScrollController.getViewportItemIndex();
                        var newPageIndex = Math.floor(viewPortItemIndex / this.pageSize());
                        if (this.pageIndex() !== newPageIndex) {
                            this._silentOption(VISIBLE_PAGE_INDEX, newPageIndex);
                            this.updateItems({
                                changeType: "pageIndex"
                            })
                        }
                    },
                    _getChangedLoadParams() {
                        var loadedPageParams = this.getLoadPageParams(true);
                        var {
                            pageIndex: pageIndex,
                            loadPageCount: loadPageCount
                        } = this.getLoadPageParams();
                        var pageIndexIsValid = this._pageIndexIsValid(pageIndex);
                        var result = null;
                        if (!this._isLoading && pageIndexIsValid && (pageIndex !== loadedPageParams.pageIndex || loadPageCount !== loadedPageParams.loadPageCount)) {
                            result = {
                                pageIndex: pageIndex,
                                loadPageCount: loadPageCount
                            }
                        }
                        return result
                    },
                    _pageIndexIsValid(pageIndex) {
                        var result = true;
                        if (isAppendMode(this) && this.hasKnownLastPage() || isVirtualMode(this)) {
                            result = pageIndex * this.pageSize() < this.totalItemsCount()
                        }
                        return result
                    },
                    _loadItems(checkLoading, viewportIsFilled) {
                        var _a, _b;
                        var virtualPaging = isVirtualPaging(this);
                        var dataSourceAdapter = this._dataSource;
                        var changedParams = this._getChangedLoadParams();
                        var currentLoadPageCount = null !== (_a = null === dataSourceAdapter || void 0 === dataSourceAdapter ? void 0 : dataSourceAdapter.loadPageCount()) && void 0 !== _a ? _a : 0;
                        var lastRequiredItemCount = this.pageSize() * currentLoadPageCount;
                        var currentPageIndex = null !== (_b = null === dataSourceAdapter || void 0 === dataSourceAdapter ? void 0 : dataSourceAdapter.pageIndex()) && void 0 !== _b ? _b : 0;
                        var pageIndexNotChanged = (null === changedParams || void 0 === changedParams ? void 0 : changedParams.pageIndex) === currentPageIndex;
                        var allLoadedInAppendMode = isAppendMode(this) && this.totalItemsCount() < lastRequiredItemCount;
                        var isRepaintMode = "repaint" === this.option("editing.refreshMode");
                        var pageIndexIncreased = (null === changedParams || void 0 === changedParams ? void 0 : changedParams.pageIndex) > currentPageIndex;
                        var result = false;
                        if (!dataSourceAdapter || virtualPaging && checkLoading && (isRepaintMode && viewportIsFilled || pageIndexIncreased || pageIndexNotChanged && allLoadedInAppendMode)) {
                            return result
                        }
                        if (virtualPaging && this._isLoading) {
                            this._needUpdateViewportAfterLoading = true
                        }
                        if (virtualPaging && changedParams) {
                            result = true;
                            dataSourceAdapter.pageIndex(changedParams.pageIndex);
                            dataSourceAdapter.loadPageCount(changedParams.loadPageCount);
                            this._repaintChangesOnly = true;
                            this._needUpdateDimensions = true;
                            var viewportChanging = this._viewportChanging;
                            this.load().always(() => {
                                this._repaintChangesOnly = void 0;
                                this._needUpdateDimensions = void 0
                            }).done(() => {
                                var isLastPage = this.pageCount() > 0 && this.pageIndex() === this.pageCount() - 1;
                                (viewportChanging || isLastPage) && this._updateVisiblePageIndex();
                                if (this._needUpdateViewportAfterLoading) {
                                    this._needUpdateViewportAfterLoading = false;
                                    this.loadViewport({
                                        checkLoadedParamsOnly: true
                                    })
                                }
                            })
                        }
                        return result
                    },
                    loadViewport(params) {
                        var _a, _b;
                        var {
                            checkLoadedParamsOnly: checkLoadedParamsOnly,
                            checkLoading: checkLoading,
                            viewportIsNotFilled: viewportIsNotFilled
                        } = null !== params && void 0 !== params ? params : {};
                        var virtualPaging = isVirtualPaging(this);
                        if (virtualPaging || gridCoreUtils.isVirtualRowRendering(this)) {
                            this._updateLoadViewportParams();
                            var loadingItemsStarted = this._loadItems(checkLoading, !viewportIsNotFilled);
                            var needToUpdateItems = !(loadingItemsStarted || this._isLoading && checkLoading || checkLoadedParamsOnly);
                            if (needToUpdateItems) {
                                var noPendingChangesInEditing = !(null === (_b = null === (_a = this.getController("editing")) || void 0 === _a ? void 0 : _a.getChanges()) || void 0 === _b ? void 0 : _b.length);
                                this.updateItems({
                                    repaintChangesOnly: true,
                                    needUpdateDimensions: true,
                                    useProcessedItemsCache: noPendingChangesInEditing,
                                    cancelEmptyChanges: true
                                })
                            }
                        }
                    },
                    updateViewport() {
                        var _a, _b;
                        var viewportSize = this.viewportSize();
                        var itemCount = this.items().length;
                        var viewportIsNotFilled = viewportSize > itemCount;
                        var currentTake = null !== (_b = null === (_a = this._loadViewportParams) || void 0 === _a ? void 0 : _a.take) && void 0 !== _b ? _b : 0;
                        var rowsScrollController = this._rowsScrollController;
                        var newTake = null === rowsScrollController || void 0 === rowsScrollController ? void 0 : rowsScrollController.getViewportParams().take;
                        (viewportIsNotFilled || currentTake < newTake) && !this._isPaging && itemCount && this.loadViewport({
                            checkLoading: true,
                            viewportIsNotFilled: viewportIsNotFilled
                        })
                    },
                    loadIfNeed() {
                        if (false === this.option(LEGACY_SCROLLING_MODE)) {
                            return
                        }
                        var rowsScrollController = this._rowsScrollController;
                        rowsScrollController && rowsScrollController.loadIfNeed();
                        var dataSource = this._dataSource;
                        return dataSource && dataSource.loadIfNeed()
                    },
                    getItemSize() {
                        var rowsScrollController = this._rowsScrollController;
                        if (rowsScrollController) {
                            return rowsScrollController.getItemSize.apply(rowsScrollController, arguments)
                        }
                        var dataSource = this._dataSource;
                        return dataSource && dataSource.getItemSize.apply(dataSource, arguments)
                    },
                    getItemSizes() {
                        var rowsScrollController = this._rowsScrollController;
                        if (rowsScrollController) {
                            return rowsScrollController.getItemSizes.apply(rowsScrollController, arguments)
                        }
                        var dataSource = this._dataSource;
                        return dataSource && dataSource.getItemSizes.apply(dataSource, arguments)
                    },
                    getContentOffset() {
                        var rowsScrollController = this._rowsScrollController;
                        if (rowsScrollController) {
                            return rowsScrollController.getContentOffset.apply(rowsScrollController, arguments)
                        }
                        var dataSource = this._dataSource;
                        return dataSource && dataSource.getContentOffset.apply(dataSource, arguments)
                    },
                    refresh(options) {
                        var dataSource = this._dataSource;
                        if (dataSource && options && options.load && isAppendMode(this)) {
                            dataSource.resetCurrentTotalCount()
                        }
                        return this.callBase.apply(this, arguments)
                    },
                    dispose() {
                        var rowsScrollController = this._rowsScrollController;
                        rowsScrollController && rowsScrollController.dispose();
                        this.callBase.apply(this, arguments)
                    },
                    topItemIndex() {
                        var _a;
                        return null === (_a = this._loadViewportParams) || void 0 === _a ? void 0 : _a.skip
                    },
                    bottomItemIndex() {
                        var viewportParams = this._loadViewportParams;
                        return viewportParams && viewportParams.skip + viewportParams.take
                    },
                    virtualItemsCount() {
                        var rowsScrollController = this._rowsScrollController;
                        if (rowsScrollController) {
                            return rowsScrollController.virtualItemsCount.apply(rowsScrollController, arguments)
                        }
                        var dataSource = this._dataSource;
                        return null === dataSource || void 0 === dataSource ? void 0 : dataSource.virtualItemsCount.apply(dataSource, arguments)
                    },
                    pageIndex(pageIndex) {
                        var _a;
                        var virtualPaging = isVirtualPaging(this);
                        var rowsScrollController = this._rowsScrollController;
                        if (false === this.option(LEGACY_SCROLLING_MODE) && virtualPaging && rowsScrollController) {
                            if (void 0 === pageIndex) {
                                return null !== (_a = this.option(VISIBLE_PAGE_INDEX)) && void 0 !== _a ? _a : 0
                            }
                        }
                        return this.callBase.apply(this, arguments)
                    },
                    _fireChanged(e) {
                        this.callBase.apply(this, arguments);
                        var {
                            operationTypes: operationTypes
                        } = e;
                        if (false === this.option(LEGACY_SCROLLING_MODE) && isVirtualPaging(this) && operationTypes) {
                            var {
                                fullReload: fullReload,
                                pageIndex: pageIndex
                            } = operationTypes;
                            if (e.isDataChanged && !fullReload && pageIndex) {
                                this._updateVisiblePageIndex(this._dataSource.pageIndex())
                            }
                        }
                    },
                    _getPagingOptionValue(optionName) {
                        var result = this.callBase.apply(this, arguments);
                        if (false === this.option(LEGACY_SCROLLING_MODE) && isVirtualPaging(this)) {
                            result = this[optionName]()
                        }
                        return result
                    },
                    isEmpty() {
                        return false === this.option(LEGACY_SCROLLING_MODE) ? !this.items(true).length : this.callBase(this, arguments)
                    },
                    isLastPageLoaded() {
                        var result = false;
                        if (false === this.option(LEGACY_SCROLLING_MODE) && isVirtualPaging(this)) {
                            var {
                                pageIndex: pageIndex,
                                loadPageCount: loadPageCount
                            } = this.getLoadPageParams(true);
                            var pageCount = this.pageCount();
                            result = pageIndex + loadPageCount >= pageCount
                        } else {
                            result = this.callBase.apply(this, arguments)
                        }
                        return result
                    },
                    reset() {
                        this._itemCount = 0;
                        this._allItems = null;
                        this.callBase.apply(this, arguments)
                    },
                    _applyFilter() {
                        var _a;
                        null === (_a = this._dataSource) || void 0 === _a ? void 0 : _a.loadPageCount(1);
                        this.callBase.apply(this, arguments)
                    }
                };
                gridCoreUtils.proxyMethod(members, "getVirtualContentSize");
                gridCoreUtils.proxyMethod(members, "setViewportItemIndex");
                return members
            }(),
            resizing: {
                _updateMasterDataGridCore(masterDataGrid) {
                    return when(this.callBase.apply(this, arguments)).done(masterDataGridUpdated => {
                        var isNewVirtualMode = isVirtualMode(masterDataGrid) && false === masterDataGrid.option(LEGACY_SCROLLING_MODE);
                        if (!masterDataGridUpdated && isNewVirtualMode) {
                            var scrollable = masterDataGrid.getScrollable();
                            if (scrollable) {
                                masterDataGrid.updateDimensions()
                            }
                        }
                    })
                },
                hasResizeTimeout() {
                    return !!this._resizeTimeout
                },
                resize() {
                    var {
                        callBase: callBase
                    } = this;
                    var result;
                    if (isVirtualMode(this) || gridCoreUtils.isVirtualRowRendering(this)) {
                        clearTimeout(this._resizeTimeout);
                        this._resizeTimeout = null;
                        var diff = new Date - this._lastTime;
                        var updateTimeout = this.option("scrolling.updateTimeout");
                        if (this._lastTime && diff < updateTimeout) {
                            result = new Deferred;
                            this._resizeTimeout = setTimeout(() => {
                                this._resizeTimeout = null;
                                callBase.apply(this).done(result.resolve).fail(result.reject);
                                this._lastTime = new Date
                            }, updateTimeout);
                            this._lastTime = new Date
                        } else {
                            result = callBase.apply(this);
                            if (this._dataController.isLoaded()) {
                                this._lastTime = new Date
                            }
                        }
                    } else {
                        result = callBase.apply(this)
                    }
                    return result
                },
                dispose() {
                    this.callBase.apply(this, arguments);
                    clearTimeout(this._resizeTimeout)
                }
            }
        },
        views: {
            rowsView: VirtualScrollingRowsViewExtender
        }
    }
};
