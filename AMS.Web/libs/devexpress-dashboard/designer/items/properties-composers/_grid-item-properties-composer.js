﻿/**
* DevExpress Dashboard (_grid-item-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridItemPropertiesComposer = void 0;
const _dashboard_item_format_rule_1 = require("../../../model/format-rules/metadata/_dashboard-item-format-rule");
const data_dashboard_item_1 = require("../../../model/items/data-dashboard-item");
const _grid_column_filter_options_1 = require("../../../model/items/grid/metadata/_grid-column-filter-options");
const _grid_options_1 = require("../../../model/items/grid/metadata/_grid-options");
const _data_dashboard_item_1 = require("../../../model/items/metadata/_data-dashboard-item");
const _form_adapter_editors_1 = require("../../form-adapter/_form-adapter-editors");
const _object_properties_wrapper_1 = require("../../form-adapter/_object-properties-wrapper");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _base_properties_composer_1 = require("./_base-properties-composer");
const _shared_composers_1 = require("./_shared-composers");
class GridItemPropertiesComposer extends _base_properties_composer_1.DashboardItemPropertiesComposer {
    constructor(customizeHandler, editRuleHandler, dataSourceBrowser) {
        super(customizeHandler);
        this.editRuleHandler = editRuleHandler;
        this.dataSourceBrowser = dataSourceBrowser;
    }
    _composeTabsCore(model, args) {
        var result = [
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Common, 'DashboardWebStringId.AccordionTab.Common', _shared_composers_1.SharedComposers.getCommonWrapper(model)),
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Layout, 'DashboardWebStringId.AccordionTab.Layout', this.getLayoutWrapper(model.gridOptions)),
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.GridColumnFilter, 'DashboardWebStringId.Grid.GridColumnFilter', this.getColumnFilterWrapper(model)),
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.ConditionalFormatting, 'DashboardWebStringId.ConditionalFormatting', this.getFormatRulesWrapper(model, args.dataSourceBrowser))
        ];
        return result;
    }
    getColumnFilterWrapper(model) {
        const disabledRules = {};
        const dataSource = this.dataSourceBrowser.findDataSource(model.dataSource());
        const isUpdateTotalsDisabled = () => !dataSource || dataSource.itemType() === 'OLAPDataSource';
        disabledRules[_grid_column_filter_options_1.updateTotals.propertyName] = isUpdateTotalsDisabled;
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model.columnFilterOptions,
            properties: [
                _grid_column_filter_options_1.showFilterRow,
                _grid_column_filter_options_1.updateTotals
            ],
            disabledFilterRules: disabledRules
        });
    }
    getLayoutWrapper(model) {
        var properties = [
            _grid_options_1.showHorizontalLines,
            _grid_options_1.showVerticalLines,
            _grid_options_1.enableBandedRows,
            _grid_options_1.showColumnHeaders,
            _grid_options_1.wordWrap,
            _grid_options_1.columnWidthMode
        ];
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: properties
        });
    }
    getFormatRulesWrapper(model, dataSourceBrowser) {
        const collectionEditorOptions = {
            propertyName: _dashboard_item_format_rule_1.classCaption.propertyName,
            createNewItemHandler: () => data_dashboard_item_1.DataDashboardItem._createFormatRule(null, { '@ItemType': 'GridItemFormatRule' }),
            editItemHandler: this.editRuleHandler
        };
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: [Object.assign(Object.assign({}, _data_dashboard_item_1.formatRules), { formAdapterItem: _form_adapter_editors_1.collectionEditor(collectionEditorOptions) })]
        });
    }
}
exports.GridItemPropertiesComposer = GridItemPropertiesComposer;
