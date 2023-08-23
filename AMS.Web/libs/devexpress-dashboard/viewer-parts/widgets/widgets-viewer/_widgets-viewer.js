﻿/**
* DevExpress Dashboard (_widgets-viewer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dxWidgetsViewer = void 0;
const $ = require("jquery");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _utils_1 = require("../../../data/_utils");
const _cssHelper_1 = require("../../viewer/_cssHelper");
const _dashboard_viewer_constants_1 = require("../../viewer/_dashboard-viewer-constants");
const _render_helper_1 = require("../_render-helper");
const _card_item_1 = require("./cards/_card-item");
const _arrangement_info_1 = require("./_arrangement-info");
const _css_class_names_1 = require("./_css-class-names");
const _widget_item_1 = require("./_widget-item");
const _widgets_viewer_base_1 = require("./_widgets-viewer-base");
var viewerCount = 0;
class dxWidgetsViewer extends _widgets_viewer_base_1.WidgetsViewerBase {
    constructor(element, options) {
        super(element, options);
    }
    _getDefaultOptions() {
        return {
            dataSource: [],
            viewer: {
                hoverEnabled: false,
                overflow: 'auto',
                method: 'auto',
                count: 1,
                widgetType: 'card',
                redrawOnResize: false,
                onclick: null,
                onRenderComplete: null,
                onAllItemsRenderComplete: null,
                bulkTimesRenderingTimeInterval: 200,
                useNativeScrolling: 'auto',
                ignorePadding: false,
                supportAnimation: false
            },
            itemOptions: {
                encodeHtml: true,
                minWidth: undefined,
                proportions: undefined,
                ignoreProportions: false,
                itemMargin: {
                    width: 5,
                    height: 5
                },
                borderWidth: 1,
                hasSparkline: false
            }
        };
    }
    _init() {
        let viewer = this._option.viewer;
        this._viewerID = viewerCount++;
        this.initContainer();
        this._content = _render_helper_1.RenderHelper.wrapScrollable(this.container, viewer.overflow, 'both');
        this._scrollBarWidth = this._getScrollBarWidth();
        this._updateByOptions();
        this._createItems();
        this.totalMarginsAndBorders = this._calcTotalMarginsAndBorders();
        this._render();
    }
    _update() {
        this._updateByOptions();
        this._createItems();
        this._render();
    }
    initContainer() {
        this.container = document.createElement('div');
        _jquery_helpers_1.$unwrap(this.element()).appendChild(this.container);
        this.container.classList.add(_css_class_names_1.cssClassNames.widgetsViewerScrollableHolder);
    }
    clear() {
        this.container.parentElement.removeChild(this.container);
    }
    dispose() {
        var that = this;
        clearTimeout(that._drawTimer);
        that._drawTimer = null;
        (that.itemsList || []).forEach(item => item.dispose());
        that._content = null;
        that._scrollBarWidth = null;
        that._widgetType = null;
        that.itemsList = null;
        that.totalMarginsAndBorders = null;
        that._resizeHandler = null;
        if (that._styleTag) {
            that._styleTag();
            that._styleTag = null;
        }
        super.dispose();
    }
    _getScrollable() {
        return _render_helper_1.RenderHelper.getScrollable(this.container);
    }
    _updateScrollable() {
        _render_helper_1.RenderHelper.updateScrollable(this.container);
    }
    _scrollTo(left, top) {
        var that = this, scrollable = this._getScrollable();
        if (scrollable) {
            scrollable.scrollTo({ x: left, y: top });
        }
        else {
            $.fn.constructor(that._rootContent()).scrollLeft(left);
            $.fn.constructor(that._rootContent()).scrollTop(top);
        }
    }
    _scrollOffset() {
        var that = this, scrollable = this._getScrollable();
        if (scrollable) {
            return scrollable.scrollOffset();
        }
        else {
            return {
                left: $.fn.constructor(that._rootContent()).scrollLeft(),
                top: $.fn.constructor(that._rootContent()).scrollTop()
            };
        }
    }
    _rootContent() {
        return this._content;
    }
    _parentHeight() {
        var offset = 0;
        return $.fn.constructor(this.container).height() - offset;
    }
    _parentWidth() {
        var offset = 0;
        return $.fn.constructor(this.container).width() - offset;
    }
    _parentWidthWithoutScroll() {
        var that = this;
        return that._parentWidth() - that._scrollBarWidth * that._hasVerticalScroll;
    }
    _parentHeightWithoutScroll() {
        var that = this;
        return that._parentHeight() - that._scrollBarWidth * that._hasHorizontalScroll;
    }
    _getResizeHandler() {
        var that = this;
        return function () {
            that.redraw();
        };
    }
    _updateByOptions() {
        var viewerOptions = this._option.viewer, itemOptions = this._option.itemOptions, proportions = itemOptions.proportions, width = itemOptions.minWidth;
        this._widgetType = viewerOptions.widgetType.toLowerCase();
        this.align = viewerOptions.align;
        if (this._widgetType === 'card') {
            this.align = this.align || 'left';
            this.minItemWidth = this.curItemWidth = width || 180;
            this._itemProportions = proportions || (itemOptions.hasSparkline ? 0.625 : 0.5);
        }
        else {
            this.align = this.align || 'center';
            this.minItemWidth = this.curItemWidth = width || 200;
            this._itemProportions = proportions || 1;
            this._needVerticalCentering = true;
        }
        this.minItemHeight = this.curItemHeight = this._itemProportions * this.minItemWidth;
    }
    getSizeParams() {
        let scrollOffset = this._scrollOffset();
        let scrollableContent = this.container.querySelector('.' + _css_class_names_1.cssClassNames.widgetViewerTable);
        let itemMargin = this._option.itemOptions.itemMargin;
        return {
            virtualSize: {
                width: $.fn.constructor(scrollableContent).outerWidth(),
                height: $.fn.constructor(scrollableContent).outerHeight()
            },
            scroll: {
                top: scrollOffset.top,
                left: scrollOffset.left,
                size: this._scrollBarWidth,
                horizontal: this._hasHorizontalScroll === 1,
                vertical: this._hasVerticalScroll === 1
            },
            itemMargin: {
                width: itemMargin.width,
                height: itemMargin.height
            }
        };
    }
    getSelectedItems() {
        return this.itemsList.filter(item => item._isSelected);
    }
    clearSelections() {
        this.itemsList.forEach(item => item.clearSelection());
    }
    _createItems() {
        let data = this._option.dataSource;
        let itemOptions = this._option.itemOptions;
        let rootElement = this._rootContent();
        (this.itemsList || []).forEach(item => item.dispose());
        this.itemsList = [];
        data.forEach(dataItem => {
            itemOptions.widgetType = this._widgetType;
            itemOptions.hoverEnabled = dataItem.hoverEnabled;
            itemOptions.isSelected = dataItem.isSelected;
            itemOptions.cursor = dataItem.cursor;
            itemOptions.tag = dataItem.tag;
            itemOptions.parentRootElement = rootElement;
            this.itemsList.push((this._widgetType == 'card') ? new _card_item_1.CardItem(dataItem, itemOptions) : new _widget_item_1.WidgetItem(dataItem, itemOptions));
        });
        this._firstDraw = true;
        delete this._viewerParams;
    }
    _refresh() {
        this.curItemWidth = this.minItemWidth;
        this.curItemHeight = this.minItemHeight;
        this._createItems();
    }
    _calcTotalMarginsAndBorders() {
        var itemOptions = this._option.itemOptions, borderWidth = itemOptions.borderWidth || 0;
        return {
            width: 2 * (itemOptions.itemMargin.width + borderWidth),
            height: 2 * (itemOptions.itemMargin.height + borderWidth)
        };
    }
    _render(drawOptions) {
        let viewer = this._option.viewer;
        let onRenderComplete = viewer.onRenderComplete;
        let method = viewer.method.toLowerCase();
        let itemCount = viewer.count;
        let clickHandler = viewer.onclick;
        let hoverHandler = viewer.onhover;
        let supportAnimation = viewer.supportAnimation;
        let table;
        let contentElement = this._rootContent();
        let overflowX = contentElement.style.overflowX;
        let overflowY = contentElement.style.overflowY;
        let parentRoot = contentElement.parentElement;
        let overflowXParentRoot = parentRoot.style.overflowX;
        let overflowYParentRoot = parentRoot.style.overflowY;
        let scrollOffset = this._scrollOffset();
        let animationEnabled = supportAnimation && !contentElement.innerHTML && this.itemsList.length <= _dashboard_viewer_constants_1.DashboardViewerConstants.elementsCountAnimationThreshold;
        clearTimeout(this._drawTimer);
        table = this._drawItems(method, itemCount, animationEnabled);
        contentElement.innerHTML = '';
        contentElement.style.overflow = 'hidden';
        parentRoot.style.overflow = 'hidden';
        if (table) {
            this.innerContainer = document.createElement('div');
            this.innerContainer.classList.add(_css_class_names_1.cssClassNames.widgetViewerContainer);
            this.innerContainer.style.textAlign = this.align;
            this.innerContainer.style.padding = '0';
            this.innerContainer.style.margin = '0';
            contentElement.appendChild(this.innerContainer);
            this.innerContainer.appendChild(table);
            this.itemsList.forEach(item => {
                item.finishRender({
                    clickHandler: clickHandler, hoverHandler: hoverHandler, drawOptions: drawOptions
                });
            });
            if (this._needVerticalCentering && this.innerContainer && this._viewerParams.direction === 'Horizontal') {
                this._verticalCentering(table);
            }
        }
        contentElement.style.overflowX = overflowX;
        contentElement.style.overflowY = overflowY;
        parentRoot.style.overflowX = overflowXParentRoot;
        parentRoot.style.overflowY = overflowYParentRoot;
        this._updateScrollable();
        this._scrollTo(scrollOffset.left, scrollOffset.top);
        if (onRenderComplete) {
            onRenderComplete.call(null);
        }
    }
    _verticalCentering(table) {
        var that = this, differenceTop = that._parentHeight() - $.fn.constructor(that.container.querySelector('.' + _css_class_names_1.cssClassNames.widgetViewerContainer)).height();
        if (differenceTop > 0) {
            that.innerContainer.style.paddingTop = ~~((differenceTop) / 2) + 'px';
        }
        else {
            that.innerContainer.style.paddingTop = '0px';
        }
    }
    redraw() {
        this._render();
    }
    _calcItemIndex(i, j, direction, rowCount, columnCount) {
        return direction == _arrangement_info_1.positioningDirection.Horizontal ?
            i * columnCount + j : j * rowCount + i;
    }
    _calcVisibleRow(cardHeight) {
        var height = this._parentHeight();
        return Math.ceil(height / cardHeight);
    }
    _calcVisibleColumn(cardWidth) {
        var width = this._parentWidth();
        return Math.ceil(width / cardWidth);
    }
    _getPartArray(array, count, indexOfPart) {
        var result = [], i = 0, beg = count * indexOfPart;
        for (i = beg; i < beg + count; i++) {
            result.push(array[i]);
        }
        return result;
    }
    _createTable(arrangementInfo, enableAnimation) {
        var that = this, tableStruct, i, j, indexItem, col, row, item, isHorizontal = arrangementInfo.direction == _arrangement_info_1.positioningDirection.Horizontal, itemMargin = this._option.itemOptions.itemMargin, ignorePadding = this._option.viewer.ignorePadding, columnCount = isHorizontal ? arrangementInfo.itemsOnRowCount : arrangementInfo.itemsOnColumnCount, rowCount = isHorizontal ? arrangementInfo.itemsOnColumnCount : arrangementInfo.itemsOnRowCount, action, itemsListLen = that.itemsList.length, tableWidth, widthMarginsAndBorders = that.totalMarginsAndBorders.width, heightMarginsAndBorders = that.totalMarginsAndBorders.height, parentWidthWithoutScroll = that._parentWidthWithoutScroll(), parentHeightWithoutScroll = that._parentHeightWithoutScroll(), rowHeight, rowWidth, cellHeight, cellWidth, curItemWidth = that.curItemWidth, curItemHeight = that.curItemHeight, curItemWidthWithoutWidthMargins = curItemWidth - 2 * itemMargin.width, curItemHeightWithoutHeightMargins = curItemHeight - 2 * itemMargin.height, curItem;
        if (rowCount <= 0) {
            return undefined;
        }
        tableStruct = document.createElement('div');
        tableStruct.classList.add(_css_class_names_1.cssClassNames.widgetViewerTable);
        tableStruct.classList.add(_css_class_names_1.cssClassNames.widgetViewerIdPrefix + that._viewerID);
        tableStruct.style.overflow = 'hidden';
        tableStruct.style.marginLeft = '0px';
        tableStruct.style.marginRight = '0px';
        if (that._widgetType !== 'card') {
            cellWidth = ~~(Math.max((parentWidthWithoutScroll - columnCount * widthMarginsAndBorders) / columnCount, curItemWidthWithoutWidthMargins));
            cellHeight = !isHorizontal ? ~~(Math.max((parentHeightWithoutScroll - rowCount * heightMarginsAndBorders) / rowCount, curItemHeightWithoutHeightMargins)) : curItemHeightWithoutHeightMargins;
        }
        else {
            cellWidth = curItemWidthWithoutWidthMargins;
            cellHeight = curItemHeightWithoutHeightMargins;
        }
        rowWidth = (cellWidth + 2 * itemMargin.width) * columnCount;
        if (ignorePadding) {
            rowWidth -= 2 * itemMargin.width;
        }
        tableWidth = rowWidth;
        tableStruct.style.height = '100%';
        tableStruct.style.width = tableWidth + 'px';
        if (this._option.useFlex) {
            tableStruct.style.display = 'flex';
            tableStruct.style.flexDirection = 'column';
            tableStruct.style.alignItems = 'center';
        }
        for (i = 0; i < rowCount; i++) {
            rowHeight = curItemHeight;
            if (ignorePadding) {
                if (i === 0 && rowCount === 1) {
                    rowHeight -= 2 * itemMargin.height;
                }
                else if (i === 0 || i === rowCount - 1) {
                    rowHeight -= itemMargin.height;
                }
            }
            row = document.createElement('div');
            row.classList.add(_css_class_names_1.cssClassNames.widgetViewerRow);
            row.style.clear = 'both';
            row.style.padding = '0px';
            row.style.margin = '0px';
            row.style.height = rowHeight + 'px';
            if (!this._option.useFlex)
                row.style.width = rowWidth + 'px';
            for (j = 0; j < columnCount; j++) {
                item = null;
                col = document.createElement('div');
                col.classList.add(_css_class_names_1.cssClassNames.widgetViewerCell);
                col.style.paddingLeft = ignorePadding && (j === 0) ? '0' : itemMargin.width + 'px';
                col.style.paddingRight = ignorePadding && (j === columnCount - 1) ? '0' : itemMargin.width + 'px';
                col.style.paddingTop = ignorePadding && (i === 0) ? '0' : itemMargin.height + 'px';
                col.style.paddingBottom = ignorePadding && (i === rowCount - 1) ? '0' : itemMargin.height + 'px';
                col.style.margin = '0px';
                col.style.width = cellWidth + 'px';
                col.style.height = cellHeight + 'px';
                col.style.cssFloat = 'left';
                indexItem = that._calcItemIndex(i, j, arrangementInfo.direction, rowCount, columnCount);
                if (indexItem < itemsListLen) {
                    curItem = that.itemsList[indexItem];
                    if (that._firstDraw) {
                        item = curItem.initDraw(curItemWidth - widthMarginsAndBorders, curItemHeight - heightMarginsAndBorders, indexItem);
                        action = 'draw';
                    }
                    else {
                        curItem.detachItem();
                        item = curItem.getItemContainer();
                        action = 'resize';
                    }
                    if (item) {
                        col.appendChild(item);
                    }
                }
                row.appendChild(col);
            }
            tableStruct.appendChild(row);
        }
        that._processBatchItems(action, 0, enableAnimation);
        that._firstDraw = false;
        return tableStruct;
    }
    _getItemProportions() {
        return this._itemProportions;
    }
    _calcViewerParams(parentWidth, parentHeight, itemCount, method) {
        var that = this, calcRes = that._calculateArrangementInfo(parentWidth, parentHeight, itemCount, method), getRowCount = function () {
            var rowCount = undefined;
            if (calcRes.direction === _arrangement_info_1.positioningDirection.Vertical) {
                rowCount = calcRes.itemsOnRowCount;
            }
            if (calcRes.direction === _arrangement_info_1.positioningDirection.Horizontal) {
                rowCount = calcRes.itemsOnColumnCount;
            }
            return rowCount;
        }, getColumnCount = function () {
            var colCount = undefined;
            if (calcRes.direction === _arrangement_info_1.positioningDirection.Vertical) {
                colCount = calcRes.itemsOnColumnCount;
            }
            if (calcRes.direction === _arrangement_info_1.positioningDirection.Horizontal) {
                colCount = calcRes.itemsOnRowCount;
            }
            return colCount;
        }, getWidthByHeight = function (height) {
            var newItemWidth = ~~(height / (that._getItemProportions() * getRowCount()));
            return newWidth = newItemWidth * getColumnCount();
        }, getHeightByWidth = function (width) {
            var newItemHeight = ~~(width * that._getItemProportions() / getColumnCount());
            return newItemHeight * getRowCount();
        };
        that._hasHorizontalScroll = 0;
        that._hasVerticalScroll = 0;
        if (getColumnCount() * calcRes.getWidth() > parentWidth) {
            calcRes = that._calculateArrangementInfo(parentWidth, parentHeight - that._scrollBarWidth, itemCount, method);
            if (calcRes.direction === _arrangement_info_1.positioningDirection.Vertical && (getColumnCount() * calcRes.getWidth() < parentWidth)) {
                var newHeight = getHeightByWidth(parentWidth);
                if (newHeight <= parentHeight)
                    return that._calculateArrangementInfo(parentWidth, newHeight, itemCount, method);
            }
            that._hasHorizontalScroll = 1;
        }
        if (getRowCount() * calcRes.getHeight() > parentHeight) {
            calcRes = that._calculateArrangementInfo(parentWidth - that._scrollBarWidth, parentHeight, itemCount, method);
            if (calcRes.direction === _arrangement_info_1.positioningDirection.Horizontal && (getRowCount() * calcRes.getHeight() < parentHeight)) {
                var newWidth = getWidthByHeight(parentHeight);
                if (newWidth <= parentWidth)
                    return that._calculateArrangementInfo(newWidth, parentHeight, itemCount, method);
            }
            that._hasVerticalScroll = 1;
        }
        return calcRes;
    }
    _createArrangementInfo(width, lineCount, itemMinWidth, proportions, direction) {
        var that = this, itemWidth, itemHeight, options = {};
        if (lineCount < 1) {
            lineCount = 1;
        }
        if (that.itemsList.length < lineCount) {
            lineCount = that.itemsList.length;
        }
        itemWidth = width / lineCount;
        itemHeight = ~~(itemWidth * proportions);
        if (itemWidth < itemMinWidth) {
            itemWidth = itemMinWidth;
            itemHeight = ~~(itemWidth * proportions);
        }
        return new _arrangement_info_1.ArrangementInfo(that.itemsList.length, lineCount, itemWidth, itemHeight, this._option.itemOptions.itemMargin, direction, options);
    }
    _calculateArrangementInfo(width, height, itemCount, method) {
        var that = this, horzInfo, newHorzInfo, nextHorzInfo, vertInfo, itemHeight, itemWidth, countOnWidth, i, itemMargin = this._option.itemOptions.itemMargin, itemProportions = that._getItemProportions(), options = {};
        switch (method) {
            case 'column':
                return that._createArrangementInfo(width, itemCount, that.minItemWidth, itemProportions, _arrangement_info_1.positioningDirection.Horizontal);
            case 'row':
                return that._createArrangementInfo(height, itemCount, that.minItemHeight, 1 / itemProportions, _arrangement_info_1.positioningDirection.Vertical);
            case 'auto':
                if (height < that.minItemHeight && width / that.minItemWidth >= that.itemsList.length) {
                    return new _arrangement_info_1.ArrangementInfo(that.itemsList.length, that.itemsList.length, that.minItemWidth, that.minItemHeight, itemMargin, _arrangement_info_1.positioningDirection.Horizontal, options);
                }
                horzInfo = that._createArrangementInfo(width, ~~(width / that.minItemWidth), that.minItemWidth, itemProportions, _arrangement_info_1.positioningDirection.Horizontal);
                for (i = horzInfo.itemsOnRowCount - 1; i >= 1; i--) {
                    newHorzInfo = that._createArrangementInfo(width, i, that.minItemWidth, itemProportions, _arrangement_info_1.positioningDirection.Horizontal);
                    if (height >= newHorzInfo.itemsOnColumnCount * newHorzInfo.getHeight(false))
                        horzInfo = newHorzInfo;
                    else
                        break;
                }
                nextHorzInfo = that._createArrangementInfo(width, horzInfo.itemsOnRowCount - 1, that.minItemWidth, itemProportions, _arrangement_info_1.positioningDirection.Horizontal);
                vertInfo = that._createArrangementInfo(height, nextHorzInfo.itemsOnColumnCount, that.minItemHeight, 1 / itemProportions, _arrangement_info_1.positioningDirection.Vertical);
                itemHeight = vertInfo.getHeight(false);
                itemWidth = vertInfo.getWidth(false);
                countOnWidth = nextHorzInfo.itemsOnRowCount;
                if (horzInfo.getHeight(false) < itemHeight && width >= countOnWidth * itemWidth)
                    horzInfo = new _arrangement_info_1.ArrangementInfo(that.itemsList.length, countOnWidth, itemWidth, itemHeight, itemMargin, _arrangement_info_1.positioningDirection.Horizontal, options);
                if (height < horzInfo.itemsOnColumnCount * horzInfo.getHeight(false)) {
                    vertInfo = that._createArrangementInfo(height, horzInfo.itemsOnColumnCount, that.minItemHeight, 1 / itemProportions, _arrangement_info_1.positioningDirection.Vertical);
                    itemHeight = vertInfo.getHeight(false);
                    itemWidth = vertInfo.getWidth(false);
                    countOnWidth = vertInfo.itemsOnColumnCount;
                    if (height >= vertInfo.itemsOnRowCount * itemHeight && width >= countOnWidth * itemWidth)
                        horzInfo = new _arrangement_info_1.ArrangementInfo(that.itemsList.length, Math.min(~~(width / itemWidth), that.itemsList.length), itemWidth, itemHeight, itemMargin, _arrangement_info_1.positioningDirection.Horizontal, options);
                }
                return horzInfo;
            default:
                return null;
        }
    }
    _drawItems(method, itemCount, enableAnimation) {
        method = method || 'auto';
        itemCount = itemCount || 1;
        var that = this, parentWidth = that._parentWidth(), parentHeight = that._parentHeight(), viewerParams = that._viewerParams, itemsList = that.itemsList, ignorePadding = this._option.viewer.ignorePadding, itemMargin = this._option.itemOptions.itemMargin, extendedWidth = ignorePadding ? 2 * itemMargin.width : 0, extendedHeight = ignorePadding ? 2 * itemMargin.height : 0;
        if (!itemsList.length) {
            return null;
        }
        viewerParams = that._viewerParams = that._calcViewerParams(parentWidth + extendedWidth, parentHeight + extendedHeight, itemCount, method);
        that.curItemHeight = ~~viewerParams.getHeight();
        that.curItemWidth = ~~viewerParams.getWidth();
        return that._createTable(that._viewerParams, enableAnimation);
    }
    getItemByIndex(index) {
        var indexForCheck, result;
        if (_utils_1.type.isNumeric(index)) {
            indexForCheck = Number(index);
            result = this.itemsList[indexForCheck];
        }
        return _utils_1.type.isDefined(result) ? result : null;
    }
    _getScrollBarWidth() {
        var that = this, useNativeScrolling = that._option.viewer.useNativeScrolling, scrollBarWidth = 0;
        if (useNativeScrolling == 'auto' || useNativeScrolling === false) {
            return scrollBarWidth;
        }
        var container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.top = '0';
        container.style.left = '0';
        container.style.visibility = 'hidden';
        container.style.width = '200px';
        container.style.height = '150px';
        container.style.overflow = 'hidden';
        document.body.appendChild(container);
        var p = document.createElement('p');
        p.style.width = '100%';
        p.style.height = '300px';
        container.appendChild(p);
        var widthWithoutScrollBar = $.fn.constructor(p).width();
        var scrollableContent = _render_helper_1.RenderHelper.wrapScrollable(container, this._option.viewer.overflow, 'both');
        if (scrollableContent == container) {
            scrollableContent = p;
        }
        scrollBarWidth = widthWithoutScrollBar - $.fn.constructor(scrollableContent).width();
        if (scrollBarWidth > 0) {
            scrollBarWidth++;
        }
        container.parentElement.removeChild(container);
        return scrollBarWidth;
    }
    _processBatchItems(functionName, startIndex, enableAnimation) {
        var that = this, dateStart = Date.now(), itemsList = that.itemsList, itemsListLen = itemsList.length, totalMarginsAndBorders = that.totalMarginsAndBorders, widthMarginsAndBorders = totalMarginsAndBorders.width, heightMarginsAndBorders = totalMarginsAndBorders.height, viewer = this._option.viewer, onAllItemsRenderComplete = viewer.onAllItemsRenderComplete, bulkTimesRenderingTimeInterval = viewer.bulkTimesRenderingTimeInterval, itemWidth = that.curItemWidth - widthMarginsAndBorders, itemHeight = that.curItemHeight - heightMarginsAndBorders, commonItemsOptions, itemsStyle;
        if (!itemsList[startIndex]) {
            return;
        }
        commonItemsOptions = itemsList[startIndex].calcCommonItemSpecificOptions(itemWidth, itemHeight);
        itemsStyle = itemsList[startIndex].getCssStyle(itemWidth, itemHeight, commonItemsOptions, '.' + _css_class_names_1.cssClassNames.widgetViewerIdPrefix + that._viewerID);
        that._styleTag && that._styleTag();
        that._styleTag = _cssHelper_1.addToStyles(itemsStyle);
        var internalProcessBatchItems = function () {
            if (typeof itemsList[startIndex][functionName] === 'function') {
                dateStart = Date.now();
                do {
                    if (startIndex < itemsListLen) {
                        itemsList[startIndex][functionName](itemWidth, itemHeight, startIndex, commonItemsOptions);
                        ++startIndex;
                    }
                    if (!itemsList[startIndex]) {
                        if (typeof onAllItemsRenderComplete === 'function') {
                            onAllItemsRenderComplete.call(null);
                        }
                        return;
                    }
                } while (Date.now() - dateStart < bulkTimesRenderingTimeInterval);
                that._drawTimer = window.setTimeout(function () { internalProcessBatchItems(); }, 0);
            }
        };
        if (enableAnimation)
            that._drawTimer = window.setTimeout(function () { internalProcessBatchItems(); }, 0);
        else
            internalProcessBatchItems();
    }
}
exports.dxWidgetsViewer = dxWidgetsViewer;
