﻿/**
* DevExpress Dashboard (_grid-column-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridColumnPropertiesComposer = void 0;
const ko = require("knockout");
const _default_1 = require("../../../data/localization/_default");
const _data_field_1 = require("../../../model/data-sources/_data-field");
const _dashboard_item_format_rule_1 = require("../../../model/format-rules/metadata/_dashboard-item-format-rule");
const _knockout_utils_1 = require("../../../model/internal/_knockout-utils");
const data_dashboard_item_1 = require("../../../model/items/data-dashboard-item");
const grid_column_total_1 = require("../../../model/items/grid/grid-column-total");
const grid_columns_1 = require("../../../model/items/grid/grid-columns");
const grid_item_1 = require("../../../model/items/grid/grid-item");
const _grid_columns_1 = require("../../../model/items/grid/metadata/_grid-columns");
const _data_dashboard_item_1 = require("../../../model/items/metadata/_data-dashboard-item");
const _delta_options_1 = require("../../../model/items/options/metadata/_delta-options");
const _base_metadata_1 = require("../../../model/metadata/_base-metadata");
const _display_name_provider_1 = require("../../_display-name-provider");
const _form_adapter_editors_1 = require("../../form-adapter/_form-adapter-editors");
const _object_properties_wrapper_1 = require("../../form-adapter/_object-properties-wrapper");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _container_type_selector_1 = require("../container-type-selector/_container-type-selector");
const _base_properties_composer_1 = require("./_base-properties-composer");
const _shared_composers_1 = require("./_shared-composers");
class GridColumnPropertiesComposer extends _base_properties_composer_1.DataItemContainerPropertiesComposer {
    constructor(customizeHandler, editRuleHandler, editDeltaFormatHandler = (model) => { }) {
        super(customizeHandler);
        this.editRuleHandler = editRuleHandler;
        this.editDeltaFormatHandler = editDeltaFormatHandler;
    }
    _composeTabsCore(model, args) {
        var columnWidthTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Common, 'DashboardWebStringId.Grid.ColumnWidth'), deltaTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.DeltaOptions, 'DashboardWebStringId.Grid.DeltaOptions'), deltaFormatsTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.DeltaFormats, 'DashboardWebStringId.CardLayout.Editor.FormatOptions'), sparklineTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.SparklineOptions, 'DashboardWebStringId.Card.SparklineOptions'), conditionalFormattingTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.ConditionalFormatting, 'DashboardWebStringId.ConditionalFormatting'), totalTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Totals, 'DashboardWebStringId.AccordionTab.ShowTotals');
        let gridItem = args.dashboardItem;
        let result = [
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Common, 'DashboardWebStringId.Options', this.getColumnWrapper(model, args.dashboardItem, args.dataSourceBrowser)),
            columnWidthTab,
            deltaTab,
            sparklineTab,
            totalTab,
            conditionalFormattingTab,
            deltaFormatsTab
        ];
        let isOlap = model.actualDataItem ? _data_field_1.DataField.isOlap(model.actualDataItem.dataMember()) : false;
        if (!isOlap || args.containerType() !== 'GridDimensionColumn')
            result.unshift(new _accordion_tab_1.TypeAccordionTab(_accordion_tab_1.KnownTabs.Type, 'DashboardWebStringId.Type', this.getColumnTypeWrapper(model, args.containerType)));
        if (gridItem.gridOptions.columnWidthMode() === 'Manual') {
            columnWidthTab.tabModel(this.getWidthWrapper(model));
        }
        if (model instanceof grid_columns_1.GridDeltaColumn) {
            deltaTab.tabModel(this.getDeltaWrapper(model));
            deltaFormatsTab.tabModel(_shared_composers_1.SharedComposers.getDeltaFormatsOptionsWrapper(model, this.editDeltaFormatHandler));
        }
        if (model instanceof grid_columns_1.GridSparklineColumn) {
            sparklineTab.tabModel(this.getSparklineWrapper(model));
        }
        if ((model instanceof grid_columns_1.GridDimensionColumn) || (model instanceof grid_columns_1.GridMeasureColumn)) {
            conditionalFormattingTab.tabModel(this.getFormatRulesWrapper(model, gridItem));
        }
        if (model instanceof grid_columns_1.GridColumn) {
            totalTab.tabModel(this.getTotalsWrapper(model, args.dashboardItem));
        }
        return result;
    }
    getColumnTypeWrapper(model, containerType) {
        if (model) {
            var properties = [
                _grid_columns_1.columnType
            ];
            let isOlap = model.actualDataItem ? _data_field_1.DataField.isOlap(model.actualDataItem.dataMember()) : undefined;
            let buttonTypes;
            if (!isOlap)
                buttonTypes = grid_item_1.GridItem._gridColumnTypesMap;
            else {
                buttonTypes = Object.assign({}, grid_item_1.GridItem._gridColumnTypesMap);
                delete buttonTypes['GridDimensionColumn'];
            }
            return new _container_type_selector_1.ContainerTypeSelector(buttonTypes, containerType);
        }
        return null;
    }
    getColumnWrapper(model, dashboardItem, dataSourceBrowser) {
        var properties = [Object.assign({ editorOptions: { placeholder: _display_name_provider_1.getDataItemContainerDisplayName(dataSourceBrowser, dashboardItem, model) } }, _base_metadata_1.name)];
        var disabledRules = {};
        var visibilityRules = {};
        if (model instanceof grid_columns_1.GridDimensionColumn) {
            properties.push(_grid_columns_1.dimensionDisplayMode);
            visibilityRules[_grid_columns_1.dimensionDisplayMode.propertyName] = () => {
                var result = false;
                if (model.dimension()) {
                    dataSourceBrowser
                        .findDataField(dashboardItem.dataSource(), dashboardItem.dataMember(), model.dimension().dataMember())
                        .done(dataField => {
                        result = dataField && dataField.fieldType() === 'Custom';
                    });
                }
                return result;
            };
        }
        if (model instanceof grid_columns_1.GridMeasureColumn) {
            properties.push(_grid_columns_1.displayMode);
            properties.push(_grid_columns_1.alwaysShowZeroLevel);
            disabledRules[_grid_columns_1.alwaysShowZeroLevel.propertyName] = [_grid_columns_1.displayMode.propertyName, '<>', 'Bar'];
        }
        if (model instanceof grid_columns_1.GridHyperlinkColumn) {
            _grid_columns_1.gridColumnUriPattern.validationRules.forEach(rule => { if (rule.message) {
                rule.message = _default_1.getLocalizationById(rule.message);
            } });
            properties.push(_grid_columns_1.gridColumnUriPattern);
        }
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: properties,
            disabledFilterRules: disabledRules,
            visibilityFilterRules: visibilityRules
        });
    }
    getWidthWrapper(model) {
        var properties = [
            _grid_columns_1.widthType,
            _grid_columns_1.fixedWidth,
            _grid_columns_1.columnWeight,
        ];
        var disabledRules = {};
        disabledRules[_grid_columns_1.fixedWidth.propertyName] = [_grid_columns_1.widthType.propertyName, '<>', 'FixedWidth'];
        disabledRules[_grid_columns_1.columnWeight.propertyName] = [_grid_columns_1.widthType.propertyName, '<>', 'Weight'];
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: properties,
            disabledFilterRules: disabledRules
        });
    }
    getTotalsWrapper(model, p) {
        var collectionEditorOptions = {
            dataFields: [grid_column_total_1._totalTypeTemplate.propertyName],
            noDataText: 'DashboardWebStringId.CollectionEditor.Totals.NoItems',
            gridColumns: [{
                    dataField: grid_column_total_1._totalTypeTemplate.propertyName,
                    calculateDisplayValue: (rowData) => grid_column_total_1.GridColumnTotal.getDisplayValue(rowData.totalType),
                    lookup: {
                        displayExpr: 'displayValue',
                        valueExpr: 'value'
                    }
                }],
            customizeInlineEditor: (e) => {
                const totalTypes = ko.pureComputed(() => model._getAvailableTotalTypes(p).map(totalType => {
                    return { value: totalType.value, displayValue: _default_1.getLocalizationById(totalType.displayValue) };
                }));
                const { dataSource, dispose: dataSourceDispose } = _knockout_utils_1.createObservableDataSource({ totalTypes }, arg => arg.totalTypes);
                e.editorOptions.dataSource = dataSource;
                e.editorOptions.onDisposing = () => {
                    dataSourceDispose();
                    totalTypes.dispose();
                };
            },
            createNewItemHandler: () => new grid_column_total_1.GridColumnTotal({}),
        };
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: [Object.assign(Object.assign({}, _grid_columns_1.totalsTemplate), { formAdapterItem: _form_adapter_editors_1.inlineEditCollectionEditor(collectionEditorOptions) })],
            summary: ko.computed(() => model.totals().length ? 'DashboardWebStringId.ButtonOn' : '')
        });
    }
    getDeltaWrapper(model) {
        var properties = [
            _grid_columns_1.displayMode,
            _grid_columns_1.alwaysShowZeroLevel,
            {
                container: _grid_columns_1.gridColumnDeltaOptions,
                properties: _delta_options_1.deltaOptionsSerializationsInfo
            }
        ];
        var visibleRules = {};
        visibleRules[_grid_columns_1.alwaysShowZeroLevel.propertyName] = [_grid_columns_1.displayMode.propertyName, '=', 'Bar'];
        _delta_options_1.deltaOptionsSerializationsInfo.forEach(opt => {
            visibleRules[opt.propertyName] = [_grid_columns_1.displayMode.propertyName, '=', 'Value'];
        });
        var disabledRules = {};
        disabledRules[_delta_options_1.resultIndicationThresholdType.propertyName] = (deltaOptions) => deltaOptions.resultIndicationMode() === 'NoIndication';
        disabledRules[_delta_options_1.resultIndicationThreshold.propertyName] = (deltaOptions) => deltaOptions.resultIndicationMode() === 'NoIndication';
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: properties,
            disabledFilterRules: disabledRules,
            visibilityFilterRules: visibleRules
        });
    }
    getSparklineWrapper(model) {
        var properties = [
            _grid_columns_1.showStartEndValues,
            {
                container: _grid_columns_1.sparklineOptions,
                properties: _shared_composers_1.SharedComposers.getSparklineOptionsProperties()
            }
        ];
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: properties
        });
    }
    getFormatRulesWrapper(model, dashboardItem) {
        var collectionEditorOptions = {
            propertyName: _dashboard_item_format_rule_1.classCaption.propertyName,
            createNewItemHandler: () => data_dashboard_item_1.DataDashboardItem._createFormatRule(null, {
                '@ItemType': 'GridItemFormatRule',
                '@DataItem': model.actualDataItem && model.actualDataItem.uniqueName() || undefined,
                '@DataItemApplyTo': model.actualDataItem && model.actualDataItem.uniqueName() || undefined
            }),
            editItemHandler: this.editRuleHandler,
            visibleItemsFilter: (rule) => {
                let uniqueName = model.actualDataItem && model.actualDataItem.uniqueName() || undefined;
                return rule.dataItemName() === uniqueName || rule.dataItemApplyToName() === uniqueName;
            },
        };
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: dashboardItem,
            properties: [Object.assign(Object.assign({}, _data_dashboard_item_1.formatRules), { formAdapterItem: _form_adapter_editors_1.collectionEditor(collectionEditorOptions) })]
        });
    }
}
exports.GridColumnPropertiesComposer = GridColumnPropertiesComposer;
