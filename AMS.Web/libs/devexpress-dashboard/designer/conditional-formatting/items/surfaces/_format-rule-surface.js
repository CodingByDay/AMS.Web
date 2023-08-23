﻿/**
* DevExpress Dashboard (_format-rule-surface.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatRuleSurface = void 0;
const ko = require("knockout");
const card_item_delta_format_rule_1 = require("../../../../model/format-rules/card-item-delta-format-rule");
const card_item_format_rule_1 = require("../../../../model/format-rules/card-item-format-rule");
const chart_item_format_rule_1 = require("../../../../model/format-rules/chart-item-format-rule");
const grid_item_format_rule_1 = require("../../../../model/format-rules/grid-item-format-rule");
const pivot_item_format_rule_1 = require("../../../../model/format-rules/pivot-item-format-rule");
const scatter_chart_item_format_rule_1 = require("../../../../model/format-rules/scatter-chart-item-format-rule");
const _card_item_format_rule_properties_composer_1 = require("../properties-composers/_card-item-format-rule-properties-composer");
const _chart_item_format_rule_properties_composer_1 = require("../properties-composers/_chart-item-format-rule-properties-composer");
const _grid_item_format_rule_properties_composer_1 = require("../properties-composers/_grid-item-format-rule-properties-composer");
const _pivot_item_format_rule_properties_composer_1 = require("../properties-composers/_pivot-item-format-rule-properties-composer");
const _scatter_chart_item_format_rule_properties_composer_1 = require("../properties-composers/_scatter-chart-item-format-rule-properties-composer");
class FormatRuleSurface {
    constructor(model, dashboardItem, dataSourceBrowser, propertiesController) {
        this.model = model;
        this.dashboardItem = dashboardItem;
        this.dataSourceBrowser = dataSourceBrowser;
        this.propertiesController = propertiesController;
        this._disposables = [];
    }
    updatePropertiesTabs(requestRecalculation) {
        var composer = null;
        if (this.model() instanceof card_item_delta_format_rule_1.CardItemDeltaFormatRule) {
            composer = _card_item_format_rule_properties_composer_1.createCardItemDeltaFormatRulePropertiesComposer(this.model);
        }
        else if (this.model() instanceof card_item_format_rule_1.CardItemFormatRule) {
            composer = _card_item_format_rule_properties_composer_1.createCardItemFormatRulePropertiesComposer(this.model);
        }
        else if (this.model() instanceof grid_item_format_rule_1.GridItemFormatRule) {
            composer = _grid_item_format_rule_properties_composer_1.createGridItemFormatRulePropertiesComposer();
        }
        else if (this.model() instanceof pivot_item_format_rule_1.PivotItemFormatRule) {
            composer = _pivot_item_format_rule_properties_composer_1.createPivotItemFormatRulePropertiesComposer();
        }
        else if (this.model() instanceof chart_item_format_rule_1.ChartItemFormatRule) {
            composer = _chart_item_format_rule_properties_composer_1.createChartItemFormatRulePropertiesComposer();
        }
        else if (this.model() instanceof scatter_chart_item_format_rule_1.ScatterChartItemFormatRule) {
            composer = _scatter_chart_item_format_rule_properties_composer_1.createScatterChartItemFormatRulePropertiesComposer();
        }
        var propertiesTabs = composer.composeTabs(this.model(), {
            dashboardItem: this.dashboardItem,
            dataSourceBrowser: this.dataSourceBrowser,
            requestRecalculation,
            specificTypeChanged: () => {
                this.propertiesController.secondarySelectedIndex(1);
            }
        });
        this.propertiesController.secondaryModel({
            displayText: this.model()._classCaption,
            data: {
                model: this.model(),
                propertiesTabs: ko.observableArray(propertiesTabs)
            },
            containingCollection: this.dashboardItem.formatRules
        });
        if (this.model().condition()) {
            this.propertiesController.secondarySelectedIndex(1);
        }
    }
    startEditing(args) {
        args.createImmediately = false;
        this.updatePropertiesTabs(args.requestRecalculation);
        args.requestRecalculation.add(() => this.updatePropertiesTabs(args.requestRecalculation));
        this.model.subscribe(() => this.updatePropertiesTabs(args.requestRecalculation));
    }
    dispose() {
        this._disposables.forEach((d) => {
            d.dispose();
        });
    }
}
exports.FormatRuleSurface = FormatRuleSurface;
