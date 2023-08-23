﻿/**
* DevExpress Dashboard (_pivot-grid-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pivotGridItem = void 0;
const pivot_grid_1 = require("devextreme/ui/pivot_grid");
const data_source_1 = require("devextreme/ui/pivot_grid/data_source");
const item_data_axis_names_1 = require("../../../data/item-data/item-data-axis-names");
const special_values_1 = require("../../../data/special-values");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _localization_ids_1 = require("../../../data/_localization-ids");
const _localizer_1 = require("../../../data/_localizer");
const _utils_1 = require("../../../data/_utils");
const _style_settings_provider_1 = require("../../conditional-formatting/_style-settings-provider");
const _base_item_1 = require("../_base-item");
const _pivot_grid_item_helper_1 = require("./_pivot-grid-item-helper");
var PIVOT_BAR_ID = 'pivotBar';
class pivotGridItem extends _base_item_1.baseItem {
    constructor(container, options) {
        super(container, options);
        this._conditionalFormattingInfoCache = [];
        this._pointsCache = { columns: {}, rows: {} };
        this.expandStateChanged = _jquery_helpers_1.createJQueryCallbacks();
        this._expandValueChangingHandler = (args) => {
            this._resetPivotLoadingDeferred();
            this._dataUpdateHook && this._dataUpdateHook.reject();
            this._dataUpdateHook = _jquery_helpers_1.createJQueryDeferred();
            const isColumn = args.area === 'column';
            const values = args.path;
            this._onExpandValue({
                values: values,
                isColumn: isColumn,
                isExpand: args.expanded,
                isRequestData: !!args.needExpandData
            });
            this.onCollapseStateChanged(isColumn, values, !args.expanded);
        };
        this._collapseStateCache = {};
        this._conditionalFormattingInfoCache = [];
        this._styleSettingsProvider = new _style_settings_provider_1.styleSettingsProvider();
        this._styleSettingsProvider.initialize(this.options.ConditionalFormattingModel);
    }
    get dataController() { return this._dataController; }
    set dataController(dataController) { this._dataController = dataController; }
    get _captionToolbarSeparatorRequired() {
        return !this.hasParentContainer() || (this.hasParentContainer() && this.visualMode === 'caption');
    }
    get _multiData() {
        return this.options.multiData;
    }
    get _viewModel() {
        return this.options.ViewModel;
    }
    dispose() {
        super.dispose();
        this.pivotGridViewer && this.pivotGridViewer.dispose();
        this._styleSettingsProvider.dispose();
        this._pivotLoadingDeferred && this._pivotLoadingDeferred.reject();
        this._dataUpdateHook.reject();
    }
    hideLoadingPanel() {
        if (this._pivotLoadingDeferred) {
            this._pivotLoadingDeferred.promise().then(() => {
                super.hideLoadingPanel();
            });
        }
        else {
            super.hideLoadingPanel();
        }
    }
    renderContentUnsafe(element, changeExisting, afterRenderCallback) {
        this._resetPivotLoadingDeferred();
        if (this.options) {
            this._createAndLoadDataSource().then(result => {
                var pivotOptions = this._getPivotGridOptions(result.dataSource, result.fields);
                this._raiseItemWidgetOptionsPrepared(pivotOptions);
                if (changeExisting && this.pivotGridViewer) {
                    this.pivotGridViewer.option(pivotOptions);
                }
                else {
                    this.pivotGridViewer = new pivot_grid_1.default(element, pivotOptions);
                }
                this._conditionalFormattingInfoCache = [];
                afterRenderCallback();
            });
        }
        return true;
    }
    renderPartialContentUnsafe() {
        this._conditionalFormattingInfoCache = [];
    }
    getInfoUnsafe() {
        return _jquery_helpers_1.deepExtend(super.getInfoUnsafe(), {
            scroll: {
                topPath: this.pivotGridViewer.getScrollPath('row'),
                leftPath: this.pivotGridViewer.getScrollPath('column'),
                horizontal: this.pivotGridViewer.hasScroll('column'),
                vertical: this.pivotGridViewer.hasScroll('row')
            }
        });
    }
    getExpandingState(isRowsExpanding = true, isColumnsExpanding = true) {
        var ds = this.pivotGridViewer ? this.pivotGridViewer.getDataSource() : undefined;
        return {
            rows: isRowsExpanding ? this._getStatePaths(ds, false, true) : this._getStatePaths(ds, false, false),
            columns: isColumnsExpanding ? this._getStatePaths(ds, true, true) : this._getStatePaths(ds, true, false)
        };
    }
    _onExpandStateChanged(dxPivotState) {
        this.expandStateChanged.fire(dxPivotState);
    }
    _getStatePaths(ds, isColumn, getExpanded) {
        if (!ds)
            return [];
        var result = [], data = ds.getData() || [], area = isColumn ? 'column' : 'row', fields = ds.getAreaFields(area, false);
        var foreachTreeItem = (items, members, callback) => {
            members = members || [];
            items = items || [];
            var item;
            for (var i = 0; i < items.length; i++) {
                item = items[i];
                members.unshift(item);
                callback(members, i);
                if (item.children) {
                    foreachTreeItem(item.children, members, callback);
                }
                members.shift();
            }
        };
        var createPath = items => {
            var result = [];
            for (var i = items.length - 1; i >= 0; i--) {
                result.push(items[i].key || items[i].value);
            }
            return result;
        };
        foreachTreeItem(data[area + 's'], undefined, function (items) {
            var item = items[0], path = createPath(items);
            let expanded = !!item.children;
            if (getExpanded && expanded || !getExpanded && !expanded)
                (path.length < fields.length) && result.push(path.slice());
        });
        return result;
    }
    _initializeData(newOptions) {
        super._initializeData(newOptions);
        if (!this._dataUpdateHook) {
            this._dataUpdateHook = _jquery_helpers_1.createJQueryDeferred();
        }
        this._dataUpdateHook.resolve();
        this.options.PivotExpandViewState = newOptions.PivotExpandViewState;
        if (this._styleSettingsProvider) {
            this._styleSettingsProvider.initialize(this.options.ConditionalFormattingModel);
        }
    }
    _loadState(fields) {
        let previousState = this.options.PivotExpandViewState;
        if (previousState) {
            let fieldsCopy = fields.map(field => (Object.assign({}, field)));
            fieldsCopy.forEach(actualField => {
                var stateField = previousState.fields.filter(field => field.name == actualField.name)[0];
                if (stateField) {
                    actualField.expanded = stateField.expanded;
                }
            });
            previousState.fields = fieldsCopy;
        }
        return previousState;
    }
    _getPivotGridOptions(dataSource, fields) {
        let viewModel = this._viewModel;
        if (!viewModel) {
            return {};
        }
        const commonOptions = {};
        commonOptions.dataSource = dataSource;
        commonOptions.fieldChooser = { enabled: false };
        commonOptions.loadPanel = { enabled: false };
        commonOptions.contextMenuEnabled = false;
        commonOptions.showRowGrandTotals = this._showRowGrandTotals(fields);
        commonOptions.showColumnGrandTotals = this._getShowColumnGrandTotals(fields);
        commonOptions.showColumnTotals = viewModel.ShowColumnTotals;
        commonOptions.showRowTotals = viewModel.ShowRowTotals;
        commonOptions.dataFieldArea = viewModel.ValuesPosition == 'Rows' ? 'row' : 'column';
        if (viewModel.LayoutType == 'Compact') {
            commonOptions.rowHeaderLayout = 'tree';
            if (viewModel.ColumnTotalsPosition == 'Near')
                commonOptions.showTotalsPrior = 'columns';
            else
                commonOptions.showTotalsPrior = 'none';
        }
        else {
            commonOptions.rowHeaderLayout = 'standard';
            if (viewModel.RowTotalsPosition == 'Top' && viewModel.ColumnTotalsPosition == 'Near')
                commonOptions.showTotalsPrior = 'both';
            else if (viewModel.RowTotalsPosition == 'Top')
                commonOptions.showTotalsPrior = 'rows';
            else if (viewModel.ColumnTotalsPosition == 'Near')
                commonOptions.showTotalsPrior = 'columns';
            else
                commonOptions.showTotalsPrior = 'none';
        }
        commonOptions.encodeHtml = this._isEncodeHtml();
        commonOptions.scrolling = {
            mode: 'virtual'
        };
        commonOptions.stateStoring = {
            enabled: true,
            type: 'custom',
            savingTimeout: 0,
            customLoad: () => {
                return _jquery_helpers_1.createJQueryDeferred().resolve(this._loadState(fields)).promise();
            },
            customSave: (dxPivotState) => {
                this._onExpandStateChanged(dxPivotState);
            }
        },
            commonOptions.onExpandValueChanging = this._expandValueChangingHandler;
        commonOptions.texts = {
            grandTotal: _localizer_1.localizer.getString(_localization_ids_1.localizationId.PivotGridGrandTotal),
            total: _localizer_1.localizer.getString(_localization_ids_1.localizationId.PivotGridTotal),
            noData: _localizer_1.localizer.getString(_localization_ids_1.localizationId.MessagePivotHasNoData)
        };
        commonOptions.onCellClick = (e) => {
            if (e.area === 'data') {
                this._raiseItemClick(e.cell);
            }
        };
        commonOptions.onCellPrepared = (e) => this._onCellPrepared(e);
        commonOptions.onContentReady = (e) => {
            this._styleSettingsProvider.draw();
            this._resolvePivotLoadingDeferred();
        };
        return commonOptions;
    }
    _getShowColumnGrandTotals(fields) {
        let viewModel = this._viewModel;
        let columnFields = fields.filter(function (field) { return field.area == 'column'; });
        let rowFields = fields.filter(function (field) { return field.area == 'row'; });
        if (!viewModel.ShowColumnGrandTotals && (columnFields.length === 0 && rowFields.length !== 0)) {
            return true;
        }
        return viewModel.ShowColumnGrandTotals;
    }
    _showRowGrandTotals(fields) {
        let viewModel = this._viewModel;
        let columnFields = fields.filter(function (field) { return field.area == 'column'; });
        let rowFields = fields.filter(function (field) { return field.area == 'row'; });
        if (!viewModel.ShowRowGrandTotals && (columnFields.length !== 0 && rowFields.length === 0)) {
            return true;
        }
        return viewModel.ShowRowGrandTotals;
    }
    _resetPivotLoadingDeferred() {
        this._pivotLoadingDeferred && this._pivotLoadingDeferred.reject();
        this._pivotLoadingDeferred = _jquery_helpers_1.createJQueryDeferred();
    }
    _resolvePivotLoadingDeferred() {
        this._pivotLoadingDeferred && this._pivotLoadingDeferred.resolve();
        this._pivotLoadingDeferred = null;
    }
    onCollapseStateChanged(isColumn, values, collapse) {
        let that = this;
        let collapseStateKey = values.concat(isColumn ? 'column' : 'row').toString();
        that._conditionalFormattingInfoCache = [];
        if (collapse)
            that._collapseStateCache[collapseStateKey] = true;
        else
            delete that._collapseStateCache[collapseStateKey];
    }
    _resizeUnsafe() {
        super._resizeUnsafe();
        this.pivotGridViewer && this.pivotGridViewer.resize();
        this._styleSettingsProvider.updateBarWidth(PIVOT_BAR_ID);
    }
    _getDataPoint(element) {
        var that = this, viewModel = that.options.ViewModel;
        return {
            getValues(name) {
                switch (name) {
                    case item_data_axis_names_1.itemDataAxisNames.pivotRowAxis:
                        return element.rowPath;
                    case item_data_axis_names_1.itemDataAxisNames.pivotColumnAxis:
                        return element.columnPath;
                    default:
                        return null;
                }
            },
            getDeltaIds: function () {
                return [];
            },
            getMeasureIds: function () {
                var dataIndex = element.dataIndex;
                if (dataIndex != undefined) {
                    return [viewModel.Values[dataIndex].DataId];
                }
                return null;
            }
        };
    }
    _getWidget() {
        return this.pivotGridViewer;
    }
    _onCellPrepared(element) {
        var styleSettingsInfo, isMeasureHeader = (element.area === _utils_1.pivotArea.column || element.area === _utils_1.pivotArea.row) && element.cell.dataIndex !== undefined, cellItem = {
            area: element.area
        };
        if (!isMeasureHeader) {
            if (element.area === _utils_1.pivotArea.column) {
                cellItem.columnPath = element.cell.path;
                cellItem.columnType = element.cell.type;
            }
            else if (element.area === _utils_1.pivotArea.row) {
                cellItem.rowPath = element.cell.path;
                cellItem.rowType = element.cell.type;
            }
            else {
                cellItem.columnPath = element.cell.columnPath;
                cellItem.rowPath = element.cell.rowPath;
                cellItem.cellIndex = element.cell.dataIndex;
                cellItem.columnType = element.cell.columnType;
                cellItem.rowType = element.cell.rowType;
            }
            styleSettingsInfo = this._dataController.getStyleSettingsInfo(cellItem, this._collapseStateCache, this._conditionalFormattingInfoCache, this._pointsCache);
            this._styleSettingsProvider.applyStyleSettings(_jquery_helpers_1.$unwrap(element.cellElement), this.options.controlContainer, styleSettingsInfo, false, PIVOT_BAR_ID);
        }
    }
    _getFields() {
        if (!this._viewModel) {
            return undefined;
        }
        let columnFields = _pivot_grid_item_helper_1.pivotHelper.createAreaFields(this._viewModel.Columns, 'column', this._viewModel.AutoExpandColumnGroups);
        for (var i = 0; i < this._viewModel.Columns.length; i++) {
            columnFields[i].showTotals = this._viewModel.Columns[i].ShowTotals;
        }
        let rowFields = _pivot_grid_item_helper_1.pivotHelper.createAreaFields(this._viewModel.Rows, 'row', this._viewModel.AutoExpandRowGroups);
        for (var i = 0; i < this._viewModel.Rows.length; i++) {
            rowFields[i].showTotals = this._viewModel.Rows[i].ShowTotals;
        }
        let dataFields = _pivot_grid_item_helper_1.pivotHelper.createAreaFields(this._viewModel.Values, 'data');
        for (var i = 0; i < this._viewModel.Values.length; i++) {
            dataFields[i].showValues = this._viewModel.Values[i].ShowValues;
            dataFields[i].showTotals = this._viewModel.Values[i].ShowTotals;
            dataFields[i].showGrandTotals = this._viewModel.Values[i].ShowGrandTotals;
        }
        return columnFields
            .concat(rowFields)
            .concat(dataFields);
    }
    _createAndLoadDataSource() {
        return new Promise((resolve) => {
            let fields = this._getFields();
            let firstRequest = true;
            var dataSource = new data_source_1.default({
                remoteOperations: true,
                fields: fields,
                retrieveFields: false,
                load: (loadOptions) => {
                    if (firstRequest) {
                        firstRequest = false;
                        return [_pivot_grid_item_helper_1.pivotHelper.getSchemaRow(fields)];
                    }
                    else {
                        return this._dataUpdateHook ? this._dataUpdateHook.then(() => this._getLoadData(loadOptions)) : _jquery_helpers_1.createJQueryDeferred().reject().promise();
                    }
                }
            });
            dataSource.state(this._loadState(fields));
            dataSource.on('loadingChanged', args => {
                if (!dataSource.isLoading()) {
                    resolve({ dataSource, fields });
                }
            });
        });
    }
    _getLoadData(loadOptions) {
        if (!this._multiData || this._multiData.isEmpty()) {
            return undefined;
        }
        let group = loadOptions.group;
        let groupSummary = loadOptions.groupSummary;
        let totalSummary = loadOptions.totalSummary;
        let filter = _pivot_grid_item_helper_1.OneElementFilterRemover.simplify(loadOptions.filter);
        let availableByArea = {
            columns: _pivot_grid_item_helper_1.pivotHelper.getColumnAxis(this._multiData).getDimensions().map(c => c.id),
            rows: _pivot_grid_item_helper_1.pivotHelper.getRowAxis(this._multiData).getDimensions().map(r => r.id)
        };
        let filteredFields = _pivot_grid_item_helper_1.FieldsExtractor.extract(filter);
        let filteredByArea = {
            columns: filteredFields
                .filter(f => availableByArea.columns.filter(c => c === f)[0] != undefined)
                .sort((a, b) => availableByArea.columns.indexOf(a) - availableByArea.columns.indexOf(b)),
            rows: filteredFields
                .filter(f => availableByArea.rows.filter(c => c === f)[0] != undefined)
                .sort((a, b) => availableByArea.rows.indexOf(a) - availableByArea.rows.indexOf(b))
        };
        let groupedFields = group ? group.map(g => g.selector) : [];
        let groupedByArea = {
            columns: groupedFields.filter(f => availableByArea.columns.filter(c => c === f)[0] != undefined),
            rows: groupedFields.filter(f => availableByArea.rows.filter(c => c === f)[0] != undefined)
        };
        let firstIndexInGroup = {
            column: _utils_1.findIndex(groupedFields, f => availableByArea.columns.filter(c => c === f)[0] !== undefined),
            row: _utils_1.findIndex(groupedFields, f => availableByArea.rows.filter(c => c === f)[0] !== undefined)
        };
        let onlyFilteredByArea = {
            columns: _utils_1.distinct(_utils_1.minus(filteredByArea.columns, groupedByArea.columns)),
            rows: _utils_1.distinct(_utils_1.minus(filteredByArea.rows, groupedByArea.rows))
        };
        let fields;
        if (firstIndexInGroup.column === -1) {
            fields = onlyFilteredByArea.rows.concat(groupedFields).concat(onlyFilteredByArea.columns);
        }
        else if (firstIndexInGroup.row === -1) {
            fields = onlyFilteredByArea.columns.concat(groupedFields).concat(onlyFilteredByArea.rows);
        }
        else if (firstIndexInGroup.column < firstIndexInGroup.row) {
            fields = onlyFilteredByArea.columns
                .concat(groupedFields.slice(firstIndexInGroup.column, firstIndexInGroup.row))
                .concat(onlyFilteredByArea.rows)
                .concat(groupedFields.slice(firstIndexInGroup.row));
        }
        else {
            fields = onlyFilteredByArea.rows
                .concat(groupedFields.slice(firstIndexInGroup.row, firstIndexInGroup.column))
                .concat(onlyFilteredByArea.columns)
                .concat(groupedFields.slice(firstIndexInGroup.column));
        }
        let columnRoot = _pivot_grid_item_helper_1.pivotHelper.getColumnAxis(this._multiData).getRootPoint();
        let rowRoot = _pivot_grid_item_helper_1.pivotHelper.getRowAxis(this._multiData).getRootPoint();
        let getItems = (index, isColumn, point, oppositePoint, dimensionValues) => {
            let isLastGrouping = index + 1 >= fields.length;
            let items = [];
            let children = point.getChildren();
            let nextLevelIsColumn;
            let changeAreas;
            let name = fields[index];
            let onlyFiltered = isColumn ? onlyFilteredByArea.columns : onlyFilteredByArea.rows;
            let isOnlyFiltered = onlyFiltered.filter(f => f === name)[0] !== undefined;
            if (!isLastGrouping) {
                nextLevelIsColumn = availableByArea.columns.filter(c => c === fields[index + 1])[0] !== undefined;
                changeAreas = isColumn && !nextLevelIsColumn || !isColumn && nextLevelIsColumn;
            }
            let areaCache = isColumn ? this._pointsCache.columns : this._pointsCache.rows;
            for (let i = 0; i < children.length; i++) {
                let child = children[i];
                areaCache[child.getUniquePath().toString()] = child;
                let value = child.getUniqueValue();
                let dimVals = Object.assign(Object.assign({}, dimensionValues), { [name]: value });
                if (filter && !_pivot_grid_item_helper_1.FilterChecker.fits(dimVals, filter))
                    continue;
                let subItems;
                if (!isLastGrouping) {
                    let nextLevelPoint = child;
                    let nextLevelOppositePoint = oppositePoint;
                    if (changeAreas) {
                        nextLevelPoint = oppositePoint;
                        nextLevelOppositePoint = child;
                    }
                    subItems = getItems(index + 1, nextLevelIsColumn, nextLevelPoint, nextLevelOppositePoint, dimVals);
                }
                else {
                    subItems = null;
                }
                if (isOnlyFiltered) {
                    if (subItems && subItems.length > 0)
                        items = items.concat(subItems);
                }
                else {
                    items.push({
                        key: value,
                        displayText: value === special_values_1.specialValues.olapNullValueGuid ? _localizer_1.localizer.getString(_localization_ids_1.localizationId.OlapRaggedHierarchyNoneItemCaption) : child.getDisplayText(),
                        items: subItems,
                        summary: groupSummary.map(s => this._multiData.getMeasureValueByAxisPoints(s.selector, [child, oppositePoint]).getDisplayText())
                    });
                }
            }
            return items.length !== 0 ? items : null;
        };
        let res = {};
        if (groupedFields && groupedFields.length > 0) {
            let isColumn = !!availableByArea.columns.filter(c => c === fields[0])[0];
            res.data = getItems(0, isColumn, isColumn ? columnRoot : rowRoot, isColumn ? rowRoot : columnRoot, {}) || [];
        }
        else {
            res.data = [_pivot_grid_item_helper_1.pivotHelper.getSchemaRow(this._getFields())];
        }
        if (totalSummary)
            res.summary = totalSummary.map(s => this._multiData.getMeasureValueByAxisPoints(s.selector, [columnRoot, rowRoot]).getDisplayText());
        return res;
    }
}
exports.pivotGridItem = pivotGridItem;
