﻿/**
* DevExpress Dashboard (_chart-item-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartItemPropertiesComposer = void 0;
const ko = require("knockout");
const _default_1 = require("../../../data/localization/_default");
const _data_field_1 = require("../../../model/data-sources/_data-field");
const _chart_axis_1 = require("../../../model/items/chart/metadata/_chart-axis");
const _chart_item_1 = require("../../../model/items/chart/metadata/_chart-item");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _display_name_provider_1 = require("../../_display-name-provider");
const _base_properties_composer_1 = require("./_base-properties-composer");
const _chart_indicators_properties_composer_1 = require("./_chart-indicators-properties-composer");
const _data_item_properties_composer_1 = require("./_data-item-properties-composer");
const _shared_composers_1 = require("./_shared-composers");
class ChartItemPropertiesComposer extends _base_properties_composer_1.DashboardItemPropertiesComposer {
    constructor(options) {
        super(options.customizeHandler);
        this.options = options;
    }
    _getAxisXTabModel(model, dataSourceBrowser, argumentDataField) {
        var groupInterval = model.arguments()[0] ? model.arguments()[0].dateTimeGroupInterval() : 'None';
        var isOlap = argumentDataField && _data_field_1.DataField.isOlap(argumentDataField.dataMember());
        return _shared_composers_1.SharedComposers.getAxisWrapper(model.axisX, ko.pureComputed(() => {
            var argumentsNumber = model.arguments().length;
            if (!argumentsNumber) {
                return '';
            }
            else if (argumentsNumber === 1) {
                return model.arguments()[0] && _display_name_provider_1.getDataItemDisplayName(dataSourceBrowser, model, model.arguments()[0]);
            }
            else
                return 'Arguments';
        }), null, _data_field_1.DataField.isDateTime(argumentDataField) && !isOlap, _data_field_1.DataField.isNumeric(argumentDataField) && !isOlap, groupInterval);
    }
    _composeTabsCore(model, args) {
        let argumentDataField = ko.observable();
        if (model.arguments().length == 1) {
            var dimension = model.arguments()[0];
            args.dataSourceBrowser.findDataField(model.dataSource(), model.dataMember(), dimension.dataMember()).done(dataField => {
                argumentDataField(dataField);
            });
        }
        var result = [
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Common, 'DashboardWebStringId.AccordionTab.Common', _shared_composers_1.SharedComposers.getCommonWrapper(model, [_chart_item_1.chartRotated])),
        ];
        var axisXTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.AxisX, 'DashboardWebStringId.Chart.AxisX');
        axisXTab.tabModel(this._getAxisXTabModel(model, args.dataSourceBrowser, argumentDataField()));
        argumentDataField.subscribe(dataField => { axisXTab.tabModel(this._getAxisXTabModel(model, args.dataSourceBrowser, dataField)); });
        result.push(axisXTab);
        if (model) {
            model.panes().forEach((pane) => {
                var numberPostfix = model.panes().length === 1 ? '' : ' (' + pane.name() + ')';
                result.push(new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.AxisY + numberPostfix, _default_1.getLocalizationById('DashboardWebStringId.Chart.AxisY') + numberPostfix, _shared_composers_1.SharedComposers.getAxisWrapper(pane.primaryAxisY, ko.pureComputed(() => {
                    var series = pane.series().filter(s => !s.plotOnSecondaryAxis());
                    if (!series.length) {
                        return '';
                    }
                    var dataItems = series.reduce((array, singleSeries) => {
                        return array.concat(singleSeries
                            ._getBindingModel()
                            .map(b => singleSeries[b.propertyName])
                            .filter(dil => !!dil.dataItem())
                            .map(dil => dil.dataItem()));
                    }, []);
                    if (dataItems.length === 1) {
                        return _display_name_provider_1.getDataItemDisplayName(args.dataSourceBrowser, model, dataItems[0]);
                    }
                    else
                        return 'Values';
                }), _chart_axis_1.chartAlwaysShowZeroLevel)));
                if (pane.series().filter(s => s.plotOnSecondaryAxis()).length > 0) {
                    result.push(new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.AxisY + 'secondary' + numberPostfix, _default_1.getLocalizationById('DashboardWebStringId.Chart.AxisYSecondary') + numberPostfix, _shared_composers_1.SharedComposers.getAxisWrapper(pane.secondaryAxisY, ko.pureComputed(() => {
                        var series = pane.series().filter(s => s.plotOnSecondaryAxis());
                        if (!series.length) {
                            return '';
                        }
                        else if (series.length === 1) {
                            return _display_name_provider_1.getDataItemContainerDisplayName(args.dataSourceBrowser, model, series[0]);
                        }
                        else
                            return 'Values';
                    }), _chart_axis_1.chartAlwaysShowZeroLevel)));
                }
            });
        }
        result.push(new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Legend, 'DashboardWebStringId.AccordionTab.ChartLegend', _shared_composers_1.SharedComposers.getLegendWrapper(model)));
        result.push(new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.ConditionalFormatting, 'DashboardWebStringId.ConditionalFormatting', _data_item_properties_composer_1.DataItemsPropertiesComposer.getFormatRulesWrapper(model, () => this.options.createCFRuleDelegate(), () => true, this.options.editCFRuleHandler)));
        result.push(new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Indicators, 'DashboardWebStringId.Chart.Indicators', _chart_indicators_properties_composer_1.ChartIndicatorPropertiesComposer.getIndicatorsWrapper(model, () => this.options.createIndicatorDelegate(), this.options.editChartIndicatorHandler)));
        return result;
    }
}
exports.ChartItemPropertiesComposer = ChartItemPropertiesComposer;
