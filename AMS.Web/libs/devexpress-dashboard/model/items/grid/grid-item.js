﻿/**
* DevExpress Dashboard (grid-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridItem = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const _model_subscriber_1 = require("../../../common/dashboard-update-hub/_model-subscriber");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const grid_calc_window_definition_1 = require("../../data-item/window-definition/grid-calc-window-definition");
const _data_field_1 = require("../../data-sources/_data-field");
const _undo_engine_helper_1 = require("../../internal/_undo-engine-helper");
const _client_filter_manager_1 = require("../../internal/_client-filter-manager");
const serializable_model_1 = require("../../serializable-model");
const data_dashboard_item_1 = require("../data-dashboard-item");
const grid_columns_1 = require("./grid-columns");
const _grid_item_1 = require("./metadata/_grid-item");
class GridItem extends data_dashboard_item_1.DataDashboardItem {
    constructor(dashboardItemJSON = {}, serializer) {
        super(dashboardItemJSON, serializer);
        this._processClientFilterChanged = (clientFilter) => {
            if (this._canUpdateTotals()) {
                this._gridClientFilterManager.setFilterParams(clientFilter);
                this._dataQueryParams.notifySubscribers();
            }
        };
        this._processClientFilterStateChanged = (clientFilterState) => {
            this._gridClientFilterManager.setFilterState(clientFilterState);
        };
        this.columns = analytics_utils_1.deserializeArray(dashboardItemJSON.GridColumns, (item) => this._createGridColumn(item, serializer));
        this._attachDataItem(this, _grid_item_1.sparklineArgument.propertyName);
        this.interactivityOptions.masterFilterMode.subscribe(newMode => {
            if (newMode !== 'None') {
                this.gridOptions.allowCellMerge(false);
            }
        });
        this._gridClientFilterManager = new _client_filter_manager_1.ClientFilterManager(this.columnFilterOptions.updateTotals);
    }
    _canUpdateTotals() {
        return this.columnFilterOptions.updateTotals()
            && this.columns().length > 0
            && !_data_field_1.DataField.isOlap(this.columns()[0].actualDataItem.dataMember())
            && this.columns().some(c => c.totals().length > 0);
    }
    _clearBindings() {
        super._clearBindings();
        this.columns.removeAll();
    }
    _createGridColumn(columnJSON, serializer = new analytics_utils_1.ModelSerializer()) {
        var itemType = columnJSON['@ItemType'];
        return new GridItem._gridColumnTypesMap[itemType].constructor(this, columnJSON, serializer);
    }
    _getInfoCore() {
        return _grid_item_1.dashboardGridItemSerializationsInfo;
    }
    _getDefaultItemType() {
        return 'Grid';
    }
    _getMasterFilterMode() { return this.interactivityOptions.masterFilterMode(); }
    _getDrillDownEnabled() { return this.interactivityOptions.isDrillDownEnabled(); }
    _getIgnoreMasterFilter() { return this.interactivityOptions.ignoreMasterFilters(); }
    _getInteractivityDimensionLinks() {
        if (this.columns().length > 0) {
            var dimensionsMap = this.columns().map(col => col instanceof grid_columns_1.GridDimensionColumn || col instanceof grid_columns_1.GridHyperlinkColumn);
            var startIndex = dimensionsMap.indexOf(true);
            startIndex = startIndex == -1 ? dimensionsMap.length : startIndex;
            var endIndex = dimensionsMap.indexOf(false, startIndex);
            endIndex = endIndex == -1 ? dimensionsMap.length : endIndex;
            return this.columns().slice(startIndex, endIndex)
                .filter(col => col instanceof grid_columns_1.GridHyperlinkColumn || col.displayMode() !== 'Image')
                .map(col => col._actualDataItemLink);
        }
        else {
            return super._getInteractivityDimensionLinks();
        }
    }
    _cleanDataItemDependencies() {
        super._cleanDataItemDependencies();
        var columnsToRemove = this.columns().filter(column => {
            var bindings = column._getBindingModel();
            return bindings.every(binding => !column[binding.propertyName].dataItem());
        });
        columnsToRemove.forEach(column => this.columns.remove(column));
    }
    _updateContentViewModel(content) {
        super._updateContentViewModel(content);
        content.ViewModel = _jquery_helpers_1.deepExtend(content.ViewModel || {}, this.gridOptions._getViewModel(), this.columnFilterOptions._getViewModel());
        if (!!content.ViewModel.Columns) {
            content.ViewModel.Columns.forEach(columnModel => {
                var column = this.columns().filter(column => {
                    var actualDataItem = column.actualDataItem;
                    return actualDataItem ? columnModel.DataId == actualDataItem.uniqueName() : false;
                })[0];
                _jquery_helpers_1.deepExtend(columnModel, !!column ? column._getViewModel() : {});
            });
        }
    }
    _updateDataQueryParams(params) {
        super._updateDataQueryParams(params);
        params.ClientFilter = this._gridClientFilterManager.getFilterParams();
    }
    _updateDataManagerByPartialDataSource(content, itemDataDTO) {
        this._dataManager().updateTotals(itemDataDTO);
        this._gridClientFilterManager.clearFilterParams();
    }
    _extendContentState(content) {
        super._extendContentState(content);
        content.GridClientFilterState = this._gridClientFilterManager.getFilterState();
    }
    _isAttribute(dataItem) {
        return this.columns().some(c => c._isAttribute(dataItem));
    }
    _setColumnWidthOptions(clientState) {
        if (clientState.widthOptions) {
            _model_subscriber_1.ModelSubscriber.changePropertyQuietly(this.gridOptions.columnWidthMode, () => this.gridOptions.columnWidthMode(clientState.widthOptions.mode));
            clientState.widthOptions.columnsOptions.forEach((columnOptions, index) => {
                let column = this.columns()[columnOptions.actualIndex];
                _model_subscriber_1.ModelSubscriber.changePropertyQuietly(column.widthType, () => column.widthType(columnOptions.widthType));
                _model_subscriber_1.ModelSubscriber.changePropertyQuietly(column.weight, () => column.weight(columnOptions.weight));
            });
        }
    }
    _getDefaultCalculationWindowDefinition() {
        return new grid_calc_window_definition_1.GridWindowDefinition();
    }
    _setClientState(clientState) {
        super._setClientState(clientState);
        this._setColumnWidthOptions(clientState);
    }
    _getInteractivityAxisDimensionCount() {
        return this.columns().reduce((n, col) => {
            return (col instanceof grid_columns_1.GridDimensionColumn) || (col instanceof grid_columns_1.GridHyperlinkColumn) ? n + 1 : n;
        }, 0);
    }
}
GridItem._gridColumnTypesMap = {
    'GridDimensionColumn': {
        constructor: grid_columns_1.GridDimensionColumn,
        displayName: 'DashboardWebStringId.Grid.Dimension',
        icon: 'dx-dashboard-grid-column-dimension'
    },
    'GridMeasureColumn': {
        constructor: grid_columns_1.GridMeasureColumn,
        displayName: 'DashboardWebStringId.Grid.Measure',
        icon: 'dx-dashboard-grid-column-measure'
    },
    'GridDeltaColumn': {
        constructor: grid_columns_1.GridDeltaColumn,
        displayName: 'DashboardWebStringId.Grid.Delta',
        icon: 'dx-dashboard-grid-column-delta'
    },
    'GridSparklineColumn': {
        constructor: grid_columns_1.GridSparklineColumn,
        displayName: 'DashboardWebStringId.Grid.Sparkline',
        icon: 'dx-dashboard-grid-column-sparkline'
    },
    'GridHyperlinkColumn': {
        constructor: grid_columns_1.GridHyperlinkColumn,
        displayName: 'DashboardWebStringId.Grid.Hyperlink',
        icon: 'dx-dashboard-grid-column-hyperlink'
    }
};
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], GridItem.prototype, "_setColumnWidthOptions", null);
exports.GridItem = GridItem;
serializable_model_1.itemTypesMap['Grid'] = { type: GridItem, groupName: 'common', title: 'DashboardStringId.DefaultNameGridItem', index: 10 };
