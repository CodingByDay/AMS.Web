﻿/**
* DevExpress Dashboard (_grid-item-surface.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridItemSurface = void 0;
const ko = require("knockout");
const dimension_1 = require("../../../model/data-item/dimension");
const measure_1 = require("../../../model/data-item/measure");
const _data_field_1 = require("../../../model/data-sources/_data-field");
const grid_columns_1 = require("../../../model/items/grid/grid-columns");
const grid_item_1 = require("../../../model/items/grid/grid-item");
const _grid_item_1 = require("../../../model/items/grid/metadata/_grid-item");
const _format_rule_surface_1 = require("../../conditional-formatting/items/surfaces/_format-rule-surface");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _collection_editor_viewmodel_1 = require("../../ui-widgets/collection-editor/_collection-editor-viewmodel");
const _data_item_properties_composer_1 = require("../properties-composers/_data-item-properties-composer");
const _grid_column_properties_composer_1 = require("../properties-composers/_grid-column-properties-composer");
const _grid_item_properties_composer_1 = require("../properties-composers/_grid-item-properties-composer");
const _data_item_container_collection_surface_1 = require("../sections/_data-item-container-collection-surface");
const _single_data_item_surface_1 = require("../sections/_single-data-item-surface");
const _section_descriptors_1 = require("../_section-descriptors");
const _base_item_surface_1 = require("./_base-item-surface");
const _delta_numeric_format_surface_1 = require("./_delta-numeric-format-surface");
class GridItemSurface extends _base_item_surface_1.DataDashboardItemSurface {
    constructor(dashboardItem, dashboardModel, dataSourceBrowser, notificationController) {
        super(dashboardItem, dashboardModel, dataSourceBrowser, notificationController);
    }
    addConditionalFormattingOptions(tabs, dataItem) {
        if (dataItem && dataItem.uniqueName()) {
            var editRuleHandler = (selection, args, container) => {
                var surface = new _format_rule_surface_1.FormatRuleSurface(container, this.dashboardItem, this._dataSourceBrowser, this.propertiesController);
                surface.startEditing(args);
            };
            var dataItemApplyTo = dataItem;
            if (dataItemApplyTo instanceof measure_1.Measure && this.dashboardItem.hiddenMeasures().indexOf(dataItemApplyTo) !== -1) {
                var valueApplyTo = this.dashboardItem.columns().filter(column => !(column instanceof grid_columns_1.GridDeltaColumn))[0];
                dataItemApplyTo = valueApplyTo && valueApplyTo.actualDataItem;
            }
            tabs.push(new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.ConditionalFormatting, 'DashboardWebStringId.ConditionalFormatting', _data_item_properties_composer_1.DataItemsPropertiesComposer.getFormatRulesWrapper(this.dashboardItem, _data_item_properties_composer_1.DataItemsPropertiesComposer.getCellFormatRuleCreator(dataItem, dataItemApplyTo, 'GridItemFormatRule'), _data_item_properties_composer_1.DataItemsPropertiesComposer.getCellFormatRuleFilter(dataItem), editRuleHandler)));
        }
    }
    extendHiddenMeasuresTabs(tabs, model) {
        this.addConditionalFormattingOptions(tabs, model);
    }
    fillSections() {
        var editRuleHandler = (selection, args, container) => {
            var surface = new _format_rule_surface_1.FormatRuleSurface(container, this.dashboardItem, this._dataSourceBrowser, this.propertiesController);
            surface.startEditing(args);
        };
        this.editRuleHandler = editRuleHandler;
        var editDeltaFormatHandler = (model) => {
            var surface = new _delta_numeric_format_surface_1.DeltaNumericFormatSurface(model, this.propertiesController);
            surface.startEditing(new _collection_editor_viewmodel_1.CollectionEditorEditItemArguments());
        };
        var sectionInfo = {
            title: 'DashboardWebStringId.Binding.Columns',
            bindingProperty: {
                propertyName: _grid_item_1.gridColumns.propertyName,
                emptyPlaceholder: 'DashboardWebStringId.Binding.AddColumn',
                selectedPlaceholder: 'DashboardWebStringId.Binding.ConfigureColumn',
                groupName: 'Column',
                creator: (itemType, dataField, existingDataItem) => {
                    if (!itemType) {
                        var dimensionDisplayMode = null;
                        if (existingDataItem) {
                            if (existingDataItem instanceof dimension_1.Dimension) {
                                itemType = 'GridDimensionColumn';
                            }
                            else if (existingDataItem instanceof measure_1.Measure) {
                                itemType = 'GridMeasureColumn';
                            }
                        }
                        else if (_data_field_1.DataField.isMeasure(dataField)) {
                            itemType = 'GridMeasureColumn';
                        }
                        else {
                            itemType = 'GridDimensionColumn';
                            if (dataField.fieldType() === 'Custom') {
                                dimensionDisplayMode = 'Image';
                            }
                        }
                    }
                    var columnJson = { '@ItemType': itemType };
                    if (dimensionDisplayMode) {
                        columnJson['@DisplayMode'] = dimensionDisplayMode;
                    }
                    return this.dashboardItem._createGridColumn(columnJson);
                },
                containersMap: grid_item_1.GridItem._gridColumnTypesMap,
                dataItemType: undefined
            },
            detailsPropertiesComposer: new _grid_column_properties_composer_1.GridColumnPropertiesComposer(this._dataItemContainerCustomization, editRuleHandler, editDeltaFormatHandler)
        };
        this.dataSections.push(new _data_item_container_collection_surface_1.DataItemContainerCollectionSurface(this, this.dashboardItem, sectionInfo, ko.computed(() => this.dashboardItem.columns().length === 0 && !!this.dashboardItem.sparklineArgument() && !!this.dashboardItem.sparklineArgument().uniqueName())));
        this.dataSections.push(new _single_data_item_surface_1.SingleDataItemSurface({
            itemSurface: this,
            sectionInfo: _section_descriptors_1.SectionDescriptors.SparklineArgument,
            warning: ko.computed(() => {
                return !(this.dashboardItem.sparklineArgument() && this.dashboardItem.sparklineArgument().uniqueName())
                    && this.dashboardItem.columns().some((column) => column.itemType() === 'GridSparklineColumn');
            }),
            fieldConstraint: (dataField) => {
                return _data_field_1.DataField.isContinous(dataField);
            }
        }));
    }
    getPropertiesComposer() {
        return new _grid_item_properties_composer_1.GridItemPropertiesComposer(this._dashboardItemCustomization, this.editRuleHandler, this.dataSourceBrowser);
    }
}
exports.GridItemSurface = GridItemSurface;
_section_descriptors_1.surfaceItemsFactory.register('Grid', GridItemSurface);
