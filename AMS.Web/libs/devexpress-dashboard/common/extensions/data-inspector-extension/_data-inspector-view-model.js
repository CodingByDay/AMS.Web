﻿/**
* DevExpress Dashboard (_data-inspector-view-model.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataInspectorViewModel = exports.DataInspectorViewModelOptions = void 0;
const string_1 = require("devextreme/core/utils/string");
const themes_1 = require("devextreme/ui/themes");
const ko = require("knockout");
const _default_1 = require("../../../data/localization/_default");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _utils_1 = require("../../../data/_utils");
const model_1 = require("../../../model");
const _dashboard_layout_mode_helper_1 = require("../../../viewer-parts/_dashboard-layout-mode-helper");
const _aggregated_data_source_1 = require("./_aggregated-data-source");
const _underlying_data_source_1 = require("./_underlying-data-source");
class DataInspectorViewModelOptions {
}
exports.DataInspectorViewModelOptions = DataInspectorViewModelOptions;
class DataInspectorViewModel {
    constructor(options) {
        this.options = options;
        this._dashboardItem = ko.observable();
        this.avaliableInspectedDataType = [{
                value: 'Aggregated',
                text: _default_1.getLocalizationById('DashboardStringId.AggregatedDataType')
            }, {
                value: 'Raw',
                text: _default_1.getLocalizationById('DashboardStringId.RawDataType')
            }];
        this.allowSwitchInspectedDataType = ko.observable(false);
        this.inspectedDataType = ko.observable();
        this.title = ko.computed(() => {
            return (this._dashboardItem() && this._dashboardItem().name() || '') + (!this.allowSwitchInspectedDataType() ?
                ' ' + string_1.format(_default_1.getLocalizationById('DashboardStringId.InspectedTypeFormatString'), this.inspectedDataType()) :
                '');
        });
        this.visible = ko.observable(false);
        this.container = ko.observable(null);
        this.gridDataSource = ko.observable(null);
        this.gridOptions = ko.computed(() => {
            let gridDataSource = this.gridDataSource();
            if (!gridDataSource) {
                return null;
            }
            let dataSource = gridDataSource.data || null;
            let columns = gridDataSource.columns || null;
            let options = {
                customizeColumns: gridDataSource.customizeColumns,
                onContentReady: this.options.onGridContentReady,
                onInitialized: this.options.onGridInitialized,
                showBorders: true,
                scrolling: {
                    mode: 'virtual'
                },
                loadPanel: {
                    text: _default_1.getLocalizationById('DashboardWebStringId.Loading')
                },
                filterRow: {
                    visible: true,
                    applyFilterText: _default_1.getLocalizationById('DashboardWebStringId.Grid.FilterClause.ApplyFilter'),
                    betweenEndText: _default_1.getLocalizationById('DashboardWebStringId.Grid.FilterClause.BetweenEnd'),
                    betweenStartText: _default_1.getLocalizationById('DashboardWebStringId.Grid.FilterClause.BetweenStart'),
                    resetOperationText: _default_1.getLocalizationById('DashboardWebStringId.Grid.FilterClause.ResetOperation'),
                    operationDescriptions: {
                        between: _default_1.getLocalizationById('DashboardWebStringId.Grid.FilterClause.Between'),
                        contains: _default_1.getLocalizationById('DashboardWebStringId.Grid.FilterClause.Contains'),
                        endsWith: _default_1.getLocalizationById('DashboardWebStringId.Grid.FilterClause.EndsWith'),
                        equal: _default_1.getLocalizationById('DashboardWebStringId.Grid.FilterClause.Equals'),
                        greaterThan: _default_1.getLocalizationById('DashboardWebStringId.Grid.FilterClause.Greater'),
                        greaterThanOrEqual: _default_1.getLocalizationById('DashboardWebStringId.Grid.FilterClause.GreaterOrEqual'),
                        lessThan: _default_1.getLocalizationById('DashboardWebStringId.Grid.FilterClause.Less'),
                        lessThanOrEqual: _default_1.getLocalizationById('DashboardWebStringId.Grid.FilterClause.LessOrEqual'),
                        notContains: _default_1.getLocalizationById('DashboardWebStringId.Grid.FilterClause.DoesNotContain'),
                        notEqual: _default_1.getLocalizationById('DashboardWebStringId.Grid.FilterClause.DoesNotEqual'),
                        startsWith: _default_1.getLocalizationById('DashboardWebStringId.Grid.FilterClause.StartsWith'),
                    }
                },
                onCellPrepared: (e) => {
                    if (e.rowType === 'data') {
                        var cellData = e.data[e.column.dataField];
                        if (cellData) {
                            if (cellData.displayValueAsImage) {
                                e.cellElement.innerText = '';
                                _utils_1.renderImage(e.cellElement, { value: cellData.value });
                            }
                            else if (cellData.displayValue) {
                                _jquery_helpers_1.$unwrap(e.cellElement).innerText = cellData.displayValue;
                            }
                        }
                    }
                },
                columnHidingEnabled: this.isMobile,
                rowAlternationEnabled: true,
                noDataText: _default_1.getLocalizationById('DashboardStringId.MessageGridHasNoData'),
                dataSource: dataSource,
                columns: columns,
            };
            if (themes_1.default.isMaterial(themes_1.default.current()))
                options.showColumnLines = true;
            return options;
        });
        this.closeButtonStylingMode = themes_1.default.isMaterial(themes_1.default.current()) ? 'contained' : undefined;
        this.closeButtonType = themes_1.default.isMaterial(themes_1.default.current()) ? 'normal' : undefined;
        this.visible.subscribe(visible => {
            if (!visible) {
                this._clearDataSource();
            }
        });
        this._dashboardItem.subscribe(_ => { this._clearDataSource(); });
        this.inspectedDataType.subscribe(() => {
            if (this.visible()) {
                this._bindGrid();
            }
        });
    }
    setUnderlyingDataProvider(underlyingDataProvider) {
        this.underlyingDataProvider = underlyingDataProvider;
    }
    _bindGrid() {
        var dashboardItem = this._dashboardItem();
        var inspectedDataType = this.inspectedDataType();
        var dataSource = inspectedDataType === 'Raw' ? this._getRawDataSource(dashboardItem) : this._getAggregatedDataSource(dashboardItem);
        if (dataSource !== this.gridDataSource()) {
            this.gridDataSource(dataSource);
        }
    }
    _clearDataSource() {
        this._rawDataSource = null;
        this._aggregatedDataSource = null;
    }
    _getInitialMode(allowInspectAggregatedData, allowInspectRawData, initialMode, prevMode) {
        if (initialMode) {
            return initialMode;
        }
        else if (prevMode && allowInspectAggregatedData && allowInspectRawData) {
            return prevMode;
        }
        else if (allowInspectAggregatedData) {
            return 'Aggregated';
        }
        else if (allowInspectRawData) {
            return 'Raw';
        }
        else
            return 'Aggregated';
    }
    _getRawDataSource(dashbordItem) {
        if (!this._rawDataSource) {
            this._rawDataSource = _underlying_data_source_1.generateUnderlyingDataSource(this.underlyingDataProvider, dashbordItem);
        }
        return this._rawDataSource;
    }
    _getAggregatedDataSource(dashbordItem) {
        if (!this._aggregatedDataSource) {
            this._aggregatedDataSource = _aggregated_data_source_1.generateAggregatedSource(dashbordItem._getItemData(), this._getAggregatedDataSourceArgs(dashbordItem));
        }
        return this._aggregatedDataSource;
    }
    _getAggregatedDataSourceArgs(dashboardItem) {
        if (dashboardItem instanceof model_1.CardItem) {
            if (dashboardItem.sparklineArgument()) {
                return {
                    addSparklineTotal: true,
                    sparklineMeasures: dashboardItem
                        .cards()
                        .map(card => card.actualValue().uniqueName())
                };
            }
        }
        else if (dashboardItem instanceof model_1.GridItem) {
            return {
                addSparklineTotal: false,
                sparklineMeasures: dashboardItem
                    .columns()
                    .filter(column => column instanceof model_1.GridSparklineColumn)
                    .map(column => column.measure().uniqueName())
            };
        }
        return {
            addSparklineTotal: false, sparklineMeasures: []
        };
    }
    _getPopupOptions() {
        const popupOptions = {
            container: this.container,
            title: this.title,
            onShowing: this.options.onDialogShowing,
            onShown: this.options.onDialogShown,
            onHidden: this.options.onDialogHidden,
            visible: this.visible,
            fullScreen: this.isMobile,
            height: '80%',
            position: {
                my: 'center',
                at: 'center',
                of: this.isMobile ? window : this.container
            },
            toolbarItems: [{
                    toolbar: 'bottom',
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        text: _default_1.getLocalizationById('DashboardStringId.DataInspectorButtonClose'),
                        onClick: () => this.visible(false),
                        stylingMode: this.closeButtonStylingMode,
                        type: this.closeButtonType,
                    }
                }],
            wrapperAttr: {
                class: 'dx-dashboard-data-inspector-dialog'
            },
            showCloseButton: true
        };
        if (!this.isMobile) {
            popupOptions.position['boundary'] = this.container;
        }
        return popupOptions;
    }
    get isMobile() {
        return _dashboard_layout_mode_helper_1.DashboardLayoutModeHelper.isMobile;
    }
    show(dashboardItem, allowInspectAggregatedData, allowInspectRawData, initialMode) {
        this.allowSwitchInspectedDataType(allowInspectAggregatedData && allowInspectRawData);
        this.inspectedDataType(this._getInitialMode(allowInspectAggregatedData, allowInspectRawData, initialMode, this.inspectedDataType()));
        this._dashboardItem(dashboardItem);
        this.container(this.options.getContainer());
        this.visible(true);
        this._bindGrid();
    }
}
exports.DataInspectorViewModel = DataInspectorViewModel;
