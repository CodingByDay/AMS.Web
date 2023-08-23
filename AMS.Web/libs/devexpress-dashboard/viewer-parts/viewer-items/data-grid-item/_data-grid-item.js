﻿/**
* DevExpress Dashboard (_data-grid-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataGridItem = void 0;
const string_1 = require("devextreme/core/utils/string");
const data_grid_1 = require("devextreme/ui/data_grid");
const _default_1 = require("../../../data/localization/_default");
const _common_1 = require("../../../data/_common");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _localization_ids_1 = require("../../../data/_localization-ids");
const _localizer_1 = require("../../../data/_localizer");
const _utils_1 = require("../../../data/_utils");
const _style_settings_provider_1 = require("../../conditional-formatting/_style-settings-provider");
const legacy_settings_1 = require("../../legacy-settings");
const _base_item_1 = require("../_base-item");
const _column_width_calculator_1 = require("./_column-width-calculator");
const _grid_column_painter_1 = require("./_grid-column-painter");
const _grid_filter_parser_1 = require("./_grid-filter-parser");
const _grid_filter_patcher_1 = require("./_grid-filter-patcher");
var MAX_CELL_COUNT = 2000, HEIGHT_DELTA_INDICATOR = 12, DATAGRID_CONTEXT_MENU_ICON = 'dashboard-datagriditem-resetcolumnwidths';
class dataGridItem extends _base_item_1.baseItem {
    constructor(container, options) {
        super(container, options);
        this._updateLocked = false;
        this._digits_string = '0123456789';
        this.clientFilterChanged = _jquery_helpers_1.createJQueryCallbacks();
        this.clientFilterStateChanged = _jquery_helpers_1.createJQueryCallbacks();
        this.TextAlignment = {
            Left: 'left',
            Right: 'right',
            Center: 'center'
        };
        this.DisplayMode = {
            Value: 'Value',
            Delta: 'Delta',
            Bar: 'Bar',
            Sparkline: 'Sparkline',
            Image: 'Image',
            Hyperlink: 'Hyperlink'
        };
        this.SummaryType = {
            Count: 'Count',
            Min: 'Min',
            Max: 'Max',
            Avg: 'Avg',
            Sum: 'Sum'
        };
        this.CssClasses = {
            wordWrap: 'dx-dashboard-word-wrap',
            gridAdaptiveCellValue: 'dx-adaptive-item-text'
        };
        this._bestFitProvider = {
            getBestFit: (index) => {
                let bestFit = 0;
                let columnViewModel = this.options.ViewModel.Columns[index];
                if (columnViewModel.DisplayMode === this.DisplayMode.Sparkline) {
                    let columnName = this.options.Name + columnViewModel.DataId;
                    let startValues = _jquery_helpers_1.$unwrap(this._dataGrid.element()).querySelectorAll('.' + columnName + '_startValue');
                    let endValues = _jquery_helpers_1.$unwrap(this._dataGrid.element()).querySelectorAll('.' + columnName + '_endValue');
                    let maxStartWidth = _grid_column_painter_1.GridColumnPainter.calcMaxWidth(startValues);
                    let maxEndWidth = _grid_column_painter_1.GridColumnPainter.calcMaxWidth(endValues);
                    bestFit = Math.round(this._getDefaultBestCharacterCount(index) * this.charWidth) + maxStartWidth + maxEndWidth;
                }
                else if (columnViewModel.DisplayMode === this.DisplayMode.Bar) {
                    bestFit = Math.round(this._getDefaultBestCharacterCount(index) * this.charWidth);
                }
                else {
                    bestFit = this._dataGrid.columnOption(index, 'bestFitWidth');
                }
                return bestFit;
            }
        };
        this._clientStateUpdateDebounced = _utils_1.debounce((widthOptions) => {
            this.gridWidthOptionsChanged && this.gridWidthOptionsChanged({
                widthOptions: widthOptions
            });
        }, 300);
        this._customizeViewOptions = (opts) => {
            opts.columnAutoWidth = true;
        };
        this.isSummaryFilterCollecting = false;
        this.canRaiseFilterChanged = true;
        this._calculator = new _column_width_calculator_1.ColumnWidthCalculator();
        this._styleSettingsProvider = new _style_settings_provider_1.styleSettingsProvider();
        this._styleSettingsProvider.initialize(this.options.ConditionalFormattingModel, this.options.ViewModel ? this.options.ViewModel.WordWrap : false);
    }
    get _captionToolbarSeparatorRequired() {
        return !this.hasParentContainer() || (this.hasParentContainer() && this.visualMode === 'caption');
    }
    get dataController() { return this._dataController; }
    set dataController(dataController) { this._dataController = dataController; }
    dispose() {
        super.dispose();
        this._dataGrid && this._dataGrid.dispose();
        this._styleSettingsProvider.dispose();
    }
    _clearSelectionUnsafe() {
        this._dataGrid.clearSelection();
    }
    _setSelectionUnsafe(values) {
        super._setSelectionUnsafe(values);
        this.clearSelection();
        if (values)
            this._setGridSelection(values);
    }
    _selectTuplesCore(tuples, updateTupleDelegate, state) {
        var that = this, currentSelection = that._dataGrid.getSelectedRowKeys(), values = [], processKeys = function (keys) {
            keys.forEach(key => {
                if (state) {
                    currentSelection.push(key);
                }
                else {
                    currentSelection.splice(currentSelection.indexOf(key), 1);
                }
            });
            return currentSelection;
        };
        tuples.forEach(tuple => {
            var res = updateTupleDelegate(tuple);
            if (res != null && res[0] != null) {
                values.push(res[0].value);
            }
        });
        that._setGridSelection(values, processKeys);
    }
    renderPartialContentUnsafe() {
        setTimeout(() => {
            this._dataGrid.refresh(true);
        });
    }
    renderContentUnsafe(element, changeExisting, afterRenderCallback) {
        if (!this.options)
            return false;
        let opts = this._getViewOptions();
        if (this.options.ViewModel && this.options.ViewModel.WordWrap) {
            element.classList.add(this.CssClasses.wordWrap);
        }
        else {
            element.classList.remove(this.CssClasses.wordWrap);
        }
        if (changeExisting && this._dataGrid) {
            if (this.resetClientStateOnUpdate) {
                this._resetColumnWidths();
            }
            _jquery_helpers_1.deepExtend(opts, this._getCommonOptions());
            this._raiseItemWidgetOptionsPrepared(opts);
            this.canRaiseFilterChanged = false;
            this._dataGrid.option('filterSyncEnabled', false);
            this._dataGrid.option(opts);
            this.canRaiseFilterChanged = true;
        }
        else {
            var options = Object.assign(Object.assign(Object.assign({}, opts), this._getCommonOptions()), { scrolling: { mode: 'virtual' } });
            this._raiseItemWidgetOptionsPrepared(options);
            this._dataGrid = new data_grid_1.default(element, options);
            this._updateCharWidth();
        }
        return false;
    }
    getInfoUnsafe() {
        var that = this, gridScroll = this._dataGrid.getScrollable(), isVScrollbarVisible = that._dataGrid.isScrollbarVisible(), isHScrollbarVisible = gridScroll.scrollWidth() > gridScroll.clientWidth(), scrollRowData = that._dataGrid.getTopVisibleRowData(), combinedFilter = that._dataGrid.getCombinedFilter(), visibleColumns = that._dataGrid.getVisibleColumns(), topPath = [], leftPath = [];
        if (scrollRowData) {
            that.options.ViewModel.RowIdentificatorDataMembers.forEach(dataMember => {
                var value = scrollRowData[dataMember];
                topPath.push(value);
            });
            leftPath.push(this._calculator.getLeftPrintingColumnIndex(gridScroll.scrollLeft()));
        }
        return _jquery_helpers_1.deepExtend(super.getInfoUnsafe(), {
            scroll: {
                horizontal: isHScrollbarVisible,
                vertical: isVScrollbarVisible,
                topPath: topPath,
                leftPath: leftPath
            },
            sortInfo: that._getSortInfo(),
            combinedFilter: combinedFilter !== undefined ? _grid_filter_parser_1.parseFilter(combinedFilter, visibleColumns, undefined, this.dateToString) : '',
            widthOptions: that._calculator.getClientWidthOptions()
        });
    }
    _getSortInfo() {
        var that = this, sortInfo = [];
        that._dataGrid.getVisibleColumns().forEach(info => {
            if (info.sortIndex != undefined && info.sortOrder != undefined) {
                sortInfo.push({
                    dataField: info.dataField,
                    sortIndex: info.sortIndex,
                    sortOrder: info.sortOrder
                });
            }
        });
        sortInfo.sort(function (a, b) {
            return a.sortIndex - b.sortIndex;
        });
        return sortInfo;
    }
    _initializeData(newOptions) {
        super._initializeData(newOptions);
        this.options.GridClientFilterState = newOptions.GridClientFilterState;
        var isResetColumnWidthsRequired = !!this.options && !!this.options.ViewModel && !!newOptions.ViewModel && this.options.ViewModel.ColumnWidthMode !== newOptions.ViewModel.ColumnWidthMode;
        if (isResetColumnWidthsRequired) {
            this._resetColumnWidths();
        }
        if (this._styleSettingsProvider) {
            this._styleSettingsProvider.initialize(this.options.ConditionalFormattingModel, this.options.ViewModel ? this.options.ViewModel.WordWrap : false);
        }
    }
    getValueItem(columnName, index) {
        return this._dataController.getValueItem(columnName, index);
    }
    _resetColumnWidths() {
        this._calculator.reset(this.options.ViewModel, this._getColumnWidthMode());
        let columnsWidth = this._calculator.calcColumnsWidth(this._bestFitProvider, (_jquery_helpers_1.$wrap(this._dataGrid.element())).width() - this._dataGrid.getScrollbarWidth(), this.charWidth);
        this._updateColumnsWidth(columnsWidth);
        this._applySelection();
    }
    _updateColumnsWidth(columnWidths) {
        this._beginResize();
        columnWidths.forEach((width, i) => {
            this._dataGrid.columnOption(i, this._getColumnWidthProperty(), width);
        });
        this._endResize();
    }
    _getColumnWidthProperty() {
        return 'visibleWidth';
    }
    _getColumnWidthMode() {
        return this.options.ViewModel.ColumnWidthMode;
    }
    _getDefaultBestCharacterCount(index) {
        return this.options.ViewModel.Columns[index].DefaultBestCharacterCount;
    }
    _beginResize() {
        this._updateLocked = true;
        this._dataGrid.beginUpdate();
    }
    _endResize() {
        this._dataGrid.endUpdate();
        this._updateLocked = false;
    }
    _updateCharWidth() {
        var span = document.createElement('span');
        span.classList.add('dx-widget');
        span.style.display = 'inline-block';
        span.innerText = this._digits_string;
        document.body.appendChild(span);
        this.charWidth = _jquery_helpers_1.getWidth(span) / 10;
        document.body.removeChild(span);
    }
    _onColumnsChanging(e) {
        var grid = e.component, columnResized = e.optionNames.width, gridResized = e.optionNames.visibleWidth && grid.columnOption(0, 'visibleWidth') !== undefined, viewModel = this.options.ViewModel;
        if (this._updateLocked || !viewModel || !viewModel.Columns ||
            viewModel.Columns.length == 0 || grid.columnCount() !== viewModel.Columns.length) {
            return;
        }
        if (grid.getController('data').isLoaded() && gridResized && !columnResized) {
            this._calculator.onDataLoaded(viewModel, this._getColumnWidthMode());
        }
        if (columnResized) {
            let leftColumnIndex = grid.getController('columnsResizer')._resizingInfo.currentColumnIndex;
            let leftColumnWidth = this._dataGrid.columnOption(leftColumnIndex, 'width');
            let rightColumnWidth = this._dataGrid.columnOption(leftColumnIndex + 1, 'width');
            let columnWidths = this._calculator.onColumnResized(leftColumnIndex, leftColumnWidth, rightColumnWidth);
            this._updateColumnsWidth(columnWidths);
            this._clientStateUpdateDebounced(this._calculator.widthOptions);
        }
        else if (gridResized) {
            let columnsWidth = this._calculator.calcColumnsWidth(this._bestFitProvider, _jquery_helpers_1.$wrap(this._dataGrid.element()).width() - this._dataGrid.getScrollbarWidth(), this.charWidth);
            this._updateColumnsWidth(columnsWidth);
        }
    }
    _getViewOptions() {
        var viewModel = this.options.ViewModel;
        if (!viewModel)
            return null;
        var dataSource = this._dataController.getDataSource();
        var columns = this._getColumns();
        var hasSlowColumns = columns.some((c) => { return c.displayMode == this.DisplayMode.Bar || c.displayMode == this.DisplayMode.Sparkline || c.displayMode == this.DisplayMode.Image; });
        var viewOptions = {
            filterValue: !this.options.GridClientFilterState ? null : this.options.GridClientFilterState,
            dataSource: dataSource,
            keyExpr: 'index',
            columns: columns,
            summary: {
                totalItems: this._getTotals(),
                calculateCustomSummary: (options) => {
                    if (options.summaryProcess == 'finalize') {
                        options.totalValue = this._dataController.getTotalValue(options.name);
                    }
                },
            },
            filterRow: { visible: viewModel.ShowFilterRow },
            rowAlternationEnabled: viewModel.EnableBandedRows,
            showRowLines: viewModel.ShowHorizontalLines,
            showColumnLines: viewModel.ShowVerticalLines,
            wordWrapEnabled: viewModel.WordWrap,
            showColumnHeaders: viewModel.ShowColumnHeaders,
            allowColumnResizing: this._getColumnWidthMode() !== 'AutoFitToContents',
        };
        this._customizeViewOptions(viewOptions);
        return viewOptions;
    }
    _getCommonOptions() {
        var that = this, commonOptions = {};
        commonOptions.paging = { enabled: false };
        commonOptions.sorting = {
            mode: 'multiple',
            ascendingText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.GridSortAscending),
            descendingText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.GridSortDescending),
            clearText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.GridClearSorting)
        };
        if (this.manualyResetClientState) {
            commonOptions.onContextMenuPreparing = (options) => {
                if (options.target === 'content' && this._calculator.columnsResized) {
                    options.items = [{
                            text: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.GridResetColumnWidths),
                            icon: DATAGRID_CONTEXT_MENU_ICON,
                            onItemClick: () => {
                                this._resetColumnWidths();
                            }
                        }];
                }
            };
        }
        commonOptions.onContentReady = () => {
            that._styleSettingsProvider.draw();
            this._changeGridSparklineColumnsWidth(this.options && this.options.ViewModel && this.options.ViewModel.Columns);
        };
        commonOptions.noDataText = _localizer_1.localizer.getString(_localization_ids_1.localizationId.MessageGridHasNoData);
        commonOptions.onCellClick = (data) => {
            let columnType = data.column && data.column.type || null;
            if (data.rowType === 'data' && columnType !== 'adaptive')
                that._raiseItemClick(data);
        };
        commonOptions.onCellHoverChanged = function (args) {
            that._raiseItemHover(args, args.eventType == 'mouseover');
        };
        commonOptions['onColumnsChanging'] = (e) => this._onColumnsChanging(e);
        commonOptions.width = '100%';
        commonOptions.cellHintEnabled = true;
        commonOptions.loadPanel = { enabled: false };
        commonOptions.searchPanel = { visible: false };
        commonOptions.keyboardNavigation = { enabled: false };
        commonOptions.filterSyncEnabled = true;
        commonOptions.onOptionChanged = (e) => {
            if (e.name == 'filterValue') {
                this._raiseClientFilterChanged(e);
                this.clientFilterStateChanged.fire(e.value);
            }
        };
        commonOptions.onEditorPreparing = (e) => {
            if (e.parentType === 'filterRow')
                e.editorOptions.valueChangeEvent = 'change';
        };
        return commonOptions;
    }
    _getRowsValues(data) {
        var that = this, selectionMembers = that.options.ViewModel.SelectionDataMembers, visibleValues = [], value;
        selectionMembers.forEach(member => {
            value = that.getValueItem(member, data.index).getUniqueValue();
            if (value !== undefined) {
                visibleValues.push(value);
            }
        });
        return that._dataController.getSelectionValues(visibleValues);
    }
    _getSelectedRowIndices() {
        var selectedValues = this._getSelectedValues();
        return selectedValues ? this._dataController.getSelectedRowKeys(selectedValues) : [];
    }
    _getTotalCaptionTemplate(totalType) {
        if (totalType == 'Auto') {
            return _default_1.getLocalizationById('DashboardStringId.GridTotalAutoTemplate');
        }
        else {
            let id;
            switch (totalType) {
                case 'Min':
                    id = 'DashboardStringId.GridTotalTypeMin';
                    break;
                case 'Max':
                    id = 'DashboardStringId.GridTotalTypeMax';
                    break;
                case 'Avg':
                    id = 'DashboardStringId.GridTotalTypeAvg';
                    break;
                case 'Sum':
                    id = 'DashboardStringId.GridTotalTypeSum';
                    break;
                default:
                    id = 'DashboardStringId.GridTotalTypeCount';
                    break;
            }
            return string_1.format(_default_1.getLocalizationById('DashboardStringId.GridTotalTemplate'), _default_1.getLocalizationById(id), _default_1.getLocalizationById('DashboardStringId.GridTotalValueTemplate'));
        }
    }
    _getTotals() {
        var that = this, res = [], columns = that.options.ViewModel.Columns || [];
        columns.forEach(column => {
            var columnName = column.DataId, totalsViewModel = column.Totals || [];
            totalsViewModel.forEach(totalModel => {
                res.push({
                    name: totalModel.DataId,
                    showInColumn: columnName,
                    summaryType: 'custom',
                    displayFormat: this._getTotalCaptionTemplate(totalModel.TotalType),
                });
            });
        });
        return res;
    }
    _calculateCustomSummary(options) {
        options.totalValue = 0;
    }
    _getColumnName(columnViewModel) {
        let gridName = this.options.Name;
        let fieldName = columnViewModel.DataId;
        return gridName + fieldName;
    }
    calculateFilterExpressionHandler(column) {
        return (filterValue, selectedFilterOperation) => {
            const gridColumn = this._dataGrid.getVisibleColumns().filter(c => c.dataField === column.dataField)[0];
            const canPatchFilter = !this.isSummaryFilterCollecting && gridColumn.dataType === 'string' && _grid_filter_patcher_1.allowedStringOperations.some(x => x === selectedFilterOperation);
            if (canPatchFilter) {
                return (values) => {
                    const cellValue = values[gridColumn.dataField.toString()];
                    return _grid_filter_patcher_1.getCaseSensitiveFilterExpression(cellValue, filterValue, selectedFilterOperation);
                };
            }
            return gridColumn.defaultCalculateFilterExpression.call(gridColumn, filterValue, selectedFilterOperation);
        };
    }
    _getColumns() {
        var that = this, res = [], columns = that.options.ViewModel.Columns || [], popupContainer = this.options.controlContainer;
        columns.forEach((column, columnIndex) => {
            var fieldName = column.DataId, columnName = this._getColumnName(column), gridColumn = {
                allowEditing: false,
                dataField: fieldName,
                encodeHtml: that._isEncodeHtml(),
                caption: column.Caption,
                alignment: column.HorzAlignment === 'Right' ? that.TextAlignment.Right : that.TextAlignment.Left,
                allowFiltering: column.SupportClientFilter
            };
            if (legacy_settings_1.DashboardPrivateSettings.gridColumnFilterMode === 'CaseSensitive')
                gridColumn.calculateFilterExpression = this.calculateFilterExpressionHandler(gridColumn).bind(this);
            gridColumn[_common_1.DashboardDataIdField] = column.DataId;
            gridColumn.headerAlignment = that.TextAlignment.Left;
            gridColumn.displayMode = column.DisplayMode;
            switch (column.DisplayMode) {
                case that.DisplayMode.Value:
                    gridColumn.cellTemplate = (containerElement, options) => {
                        let container = _jquery_helpers_1.$unwrap(containerElement);
                        var valueItem = that.getValueItem(fieldName, options.data.index);
                        _grid_column_painter_1.GridColumnPainter.renderValue(container, valueItem.getData().displayText, that._isEncodeHtml());
                        let isDetail = that._isDetail(options.rowType);
                        let colummPrefix = isDetail ? columnName + '_detail' : columnName;
                        that._styleSettingsProvider.applyStyleSettings(container, popupContainer, valueItem.getStyleSettingsInfo(), false, colummPrefix, isDetail);
                        if (isDetail)
                            container.classList.add(that.CssClasses.gridAdaptiveCellValue);
                    };
                    gridColumn.resized = () => {
                        var visibleWidthReset = that._dataGrid && (that._dataGrid.columnOption(columnIndex, 'visibleWidth') === undefined);
                        if (!visibleWidthReset) {
                            that._styleSettingsProvider.updateBarWidth(columnName);
                            that._styleSettingsProvider.updateBarWidth(columnName + '_detail');
                        }
                    };
                    break;
                case that.DisplayMode.Delta:
                    gridColumn.cellTemplate = function (containerElement, options) {
                        let container = _jquery_helpers_1.$unwrap(containerElement);
                        var valueItem = that.getValueItem(fieldName, options.data.index);
                        let isDetail = that._isDetail(options.rowType);
                        _grid_column_painter_1.GridColumnPainter.renderDelta(container, valueItem.getData(), isDetail);
                        that._styleSettingsProvider.applyStyleSettings(container, popupContainer, valueItem.getStyleSettingsInfo(), true);
                        if (isDetail)
                            container.classList.add(that.CssClasses.gridAdaptiveCellValue);
                    };
                    break;
                case that.DisplayMode.Hyperlink:
                    gridColumn.cellTemplate = function (containerElement, options) {
                        let container = _jquery_helpers_1.$unwrap(containerElement);
                        var valueItem = that.getValueItem(fieldName, options.data.index), uri = fieldName ? string_1.format(!!column.UriPattern ? column.UriPattern : '{0}', valueItem.getUriValue()) : undefined;
                        _grid_column_painter_1.GridColumnPainter.renderHyperlink(container, uri, valueItem.getData().displayText, that._isEncodeHtml());
                        that._styleSettingsProvider.applyStyleSettings(container, popupContainer, valueItem.getStyleSettingsInfo(), false, columnName);
                        if (that._isDetail(options.rowType))
                            container.classList.add(that.CssClasses.gridAdaptiveCellValue);
                    };
                    break;
                case that.DisplayMode.Sparkline:
                    gridColumn.alignment = that.TextAlignment.Left;
                    gridColumn.cssClass = 'dx-dashboard-datagrid-column-visible-cell-content';
                    gridColumn.cellTemplate = (containerElement, options) => {
                        let container = _jquery_helpers_1.$unwrap(containerElement);
                        var valueItem = that.getValueItem(fieldName, options.data.index);
                        _grid_column_painter_1.GridColumnPainter.renderSparkline(columnName, column.ShowStartEndValues, container, valueItem.getData());
                        that._styleSettingsProvider.applyStyleSettings(container, popupContainer, valueItem.getStyleSettingsInfo(), true);
                        if (that._isDetail(options.rowType))
                            container.classList.add(that.CssClasses.gridAdaptiveCellValue);
                    };
                    gridColumn.resized = () => that._changeGridSparklineColumnsWidth([column]);
                    break;
                case that.DisplayMode.Bar:
                    gridColumn.alignment = that.TextAlignment.Left;
                    gridColumn.cssClass = 'dx-dashboard-datagrid-column-visible-cell-content';
                    gridColumn.cellTemplate = function (containerElement, options) {
                        let container = _jquery_helpers_1.$unwrap(containerElement);
                        var valueItem = that.getValueItem(fieldName, options.data.index);
                        var barData = valueItem.getData();
                        _grid_column_painter_1.GridColumnPainter.renderBar(columnName, container, barData.text, barData.normalizedValue, barData.zeroValue);
                        that._styleSettingsProvider.applyStyleSettings(container, popupContainer, valueItem.getStyleSettingsInfo(), true);
                        if (that._isDetail(options.rowType))
                            container.classList.add(that.CssClasses.gridAdaptiveCellValue);
                    };
                    gridColumn.resized = function () {
                        var gridRootElement = that._dataGrid ? _jquery_helpers_1.$unwrap(that._dataGrid.element()) : undefined;
                        if (gridRootElement) {
                            _grid_column_painter_1.GridColumnPainter.changeGridBarColumnsWidth(gridRootElement, columnName);
                        }
                    };
                    break;
                case that.DisplayMode.Image:
                    gridColumn.cellTemplate = function (containerElement, options) {
                        let container = _jquery_helpers_1.$unwrap(containerElement);
                        var valueItem = that.getValueItem(fieldName, options.data.index);
                        _grid_column_painter_1.GridColumnPainter.renderImage(container, valueItem.getData());
                        that._styleSettingsProvider.applyStyleSettings(container, popupContainer, valueItem.getStyleSettingsInfo(), true);
                        if (that._isDetail(options.rowType))
                            container.classList.add(that.CssClasses.gridAdaptiveCellValue);
                    };
                    break;
            }
            res.push(gridColumn);
        });
        return res;
    }
    _changeGridSparklineColumnsWidth(columnViewModels) {
        if (columnViewModels) {
            let gridRootElement = this._dataGrid ? _jquery_helpers_1.$unwrap(this._dataGrid.element()) : undefined;
            if (gridRootElement) {
                let sparklineViewModels = columnViewModels.filter(columnViewModel => columnViewModel.DisplayMode === this.DisplayMode.Sparkline);
                sparklineViewModels.forEach(columnViewModel => {
                    _grid_column_painter_1.GridColumnPainter.changeGridSparklineColumnsWidth(gridRootElement, this._getColumnName(columnViewModel));
                });
            }
        }
    }
    _isDetail(rowType) {
        return rowType === 'detailAdaptive';
    }
    _applySelectionUnsafe() {
        this.setSelection(this.options.SelectedValues);
    }
    _resizeUnsafe() {
        super._resizeUnsafe();
        this._dataGrid.resize();
    }
    _getDataPoint(element) {
        var that = this;
        return {
            getValues: function (name) {
                return (name === 'Default') ? that._dataController.getDimensionValues(element.data.index) : null;
            },
            getDeltaIds: function () {
                return that._getColumnDataIdsByColumnType('Delta');
            },
            getMeasureIds: function () {
                return that._getColumnDataIdsByColumnType('Measure');
            },
            getSelectionValues: function (name) {
                return that._getRowsValues(element.data);
            }
        };
    }
    _getColumnsByColumnType(columnType) {
        var columns = this.options.ViewModel.Columns, foundColumns = [];
        columns.forEach(column => {
            if (column.ColumnType === columnType)
                foundColumns.push(column);
        });
        return foundColumns;
    }
    _getColumnDataIdsByColumnType(columnType) {
        var that = this, columns = that._getColumnsByColumnType(columnType), ids = [];
        columns.forEach(column => {
            ids.push(column.DataId);
        });
        return ids;
    }
    _getElementInteractionValue(element, viewModel) {
        return this._getRowsValues(element.data);
    }
    _getWidget() {
        return this._dataGrid;
    }
    _setGridSelection(values, keyProcessingDelegate) {
        if (values && values.length > 0) {
            var that = this, selectionKeys = that._dataController.getSelectedRowKeys(values);
            that._selectRows(keyProcessingDelegate ? keyProcessingDelegate(selectionKeys) : selectionKeys);
        }
    }
    _selectRows(data) {
        if (this._dataGrid) {
            this._dataGrid.selectRows(data);
        }
    }
    _isMultiDataSupported() {
        return true;
    }
    _raiseClientFilterChanged(e) {
        if (this.canRaiseFilterChanged) {
            let visibleColumns = this._dataGrid.getVisibleColumns();
            this.isSummaryFilterCollecting = true;
            let combinedFilter = this._dataGrid.getCombinedFilter();
            this.isSummaryFilterCollecting = false;
            let filter = combinedFilter !== undefined ? _grid_filter_parser_1.parseFilter(combinedFilter, visibleColumns, undefined, this.dateToString) : '';
            this.clientFilterChanged.fire(filter);
        }
    }
}
exports.dataGridItem = dataGridItem;
