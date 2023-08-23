﻿/**
* DevExpress Dashboard (_scatter-chart-item-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScatterChartItemPropertiesComposer = void 0;
const ko = require("knockout");
const _chart_axis_1 = require("../../../model/items/chart/metadata/_chart-axis");
const _chart_item_1 = require("../../../model/items/chart/metadata/_chart-item");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _display_name_provider_1 = require("../../_display-name-provider");
const _base_properties_composer_1 = require("./_base-properties-composer");
const _data_item_properties_composer_1 = require("./_data-item-properties-composer");
const _shared_composers_1 = require("./_shared-composers");
class ScatterChartItemPropertiesComposer extends _base_properties_composer_1.DashboardItemPropertiesComposer {
    constructor(customizeHandler, editCFRuleHandler, createCFRuleDelegate) {
        super(customizeHandler);
        this.editCFRuleHandler = editCFRuleHandler;
        this.createCFRuleDelegate = createCFRuleDelegate;
    }
    _composeTabsCore(model, args) {
        var result = [
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Common, 'DashboardWebStringId.AccordionTab.Common', _shared_composers_1.SharedComposers.getCommonWrapper(model, [_chart_item_1.chartRotated])),
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.AxisX, 'DashboardWebStringId.Chart.AxisX', _shared_composers_1.SharedComposers.getAxisWrapper(model.axisX, ko.pureComputed(() => {
                return model.axisXMeasure() && _display_name_provider_1.getDataItemDisplayName(args.dataSourceBrowser, model, model.axisXMeasure());
            }), null)),
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.AxisY, 'DashboardWebStringId.Chart.AxisY', _shared_composers_1.SharedComposers.getAxisWrapper(model.axisY, ko.pureComputed(() => {
                return model.axisYMeasure() && _display_name_provider_1.getDataItemDisplayName(args.dataSourceBrowser, model, model.axisYMeasure());
            }), _chart_axis_1.alwaysShowZeroLevelScatter)),
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Labels, 'DashboardWebStringId.AccordionTab.Labels', _shared_composers_1.SharedComposers.getLabelsWrapper(model)),
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Legend, 'DashboardWebStringId.AccordionTab.ChartLegend', _shared_composers_1.SharedComposers.getLegendWrapper(model)),
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.ConditionalFormatting, 'DashboardWebStringId.ConditionalFormatting', _data_item_properties_composer_1.DataItemsPropertiesComposer.getFormatRulesWrapper(model, () => this.createCFRuleDelegate(), () => true, this.editCFRuleHandler))
        ];
        return result;
    }
}
exports.ScatterChartItemPropertiesComposer = ScatterChartItemPropertiesComposer;
