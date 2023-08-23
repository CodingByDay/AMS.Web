/**
* DevExpress Dashboard (_indicator-item-surface.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndicatorSurface = void 0;
const ko = require("knockout");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _chart_indicators_properties_composer_1 = require("../properties-composers/_chart-indicators-properties-composer");
class IndicatorSurface {
    constructor(model, dashboardItem, dataSourceBrowser, propertiesController) {
        this.model = model;
        this.dashboardItem = dashboardItem;
        this.dataSourceBrowser = dataSourceBrowser;
        this.propertiesController = propertiesController;
    }
    updatePropertiesTabs(requestRecalculation, findExtension) {
        var propertiesTabs = [
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.IndicatorSettings, 'DashboardWebStringId.Chart.IndicatorSettings', _chart_indicators_properties_composer_1.ChartIndicatorPropertiesComposer.getIndicatorPropertiesWrapper(this.model(), this.dashboardItem, this.dataSourceBrowser, requestRecalculation, findExtension))
        ];
        this.propertiesController.secondaryModel({
            displayText: this.model().name,
            data: {
                model: this.model(),
                propertiesTabs: ko.observableArray(propertiesTabs)
            },
            containingCollection: this.dashboardItem.indicators
        });
    }
    startEditing(args, findExtension) {
        args.createImmediately = false;
        this.updatePropertiesTabs(args.requestRecalculation, findExtension);
    }
}
exports.IndicatorSurface = IndicatorSurface;
