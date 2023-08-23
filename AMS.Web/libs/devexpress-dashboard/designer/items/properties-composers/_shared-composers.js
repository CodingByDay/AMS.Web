﻿/**
* DevExpress Dashboard (_shared-composers.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedComposers = void 0;
const ko = require("knockout");
const _default_1 = require("../../../data/localization/_default");
const model_1 = require("../../../model");
const _data_item_1 = require("../../../model/data-item/metadata/_data-item");
const _data_item_format_1 = require("../../../model/data-item/metadata/_data-item-format");
const _helper_classes_1 = require("../../../model/internal/_helper-classes");
const _knockout_utils_1 = require("../../../model/internal/_knockout-utils");
const chart_series_1 = require("../../../model/items/chart/chart-series");
const _chart_axis_1 = require("../../../model/items/chart/metadata/_chart-axis");
const _chart_item_1 = require("../../../model/items/chart/metadata/_chart-item");
const _chart_legend_1 = require("../../../model/items/chart/metadata/_chart-legend");
const _chart_series_1 = require("../../../model/items/chart/metadata/_chart-series");
const _point_label_options_1 = require("../../../model/items/chart/metadata/_point-label-options");
const _map_item_1 = require("../../../model/items/map/metadata/_map-item");
const _map_legend_1 = require("../../../model/items/map/metadata/_map-legend");
const _dashboard_item_1 = require("../../../model/items/metadata/_dashboard-item");
const _delta_options_1 = require("../../../model/items/options/metadata/_delta-options");
const _sparkline_options_1 = require("../../../model/items/options/metadata/_sparkline-options");
const date_time_period_1 = require("../../../model/items/range-filter/date-time-period");
const _range_filter_item_1 = require("../../../model/items/range-filter/metadata/_range-filter-item");
const _scatter_point_label_options_1 = require("../../../model/items/scatter-chart/metadata/_scatter-point-label-options");
const scatter_chart_item_1 = require("../../../model/items/scatter-chart/scatter-chart-item");
const _base_metadata_1 = require("../../../model/metadata/_base-metadata");
const legacy_settings_1 = require("../../../viewer-parts/legacy-settings");
const _form_adapter_editors_1 = require("../../form-adapter/_form-adapter-editors");
const _object_properties_wrapper_1 = require("../../form-adapter/_object-properties-wrapper");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _collection_editor_viewmodel_1 = require("../../ui-widgets/collection-editor/_collection-editor-viewmodel");
const _collection_editor_viewmodel_base_1 = require("../../ui-widgets/collection-editor/_collection-editor-viewmodel-base");
const _map_custom_shapefile_surface_1 = require("../surfaces/_map-custom-shapefile-surface");
class SharedComposers {
    static getCommonTab(model, properties = [], disabledRules = {}) {
        var wrapper = this.getCommonWrapper(model, properties, disabledRules);
        return new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Common, 'DashboardWebStringId.AccordionTab.Common', wrapper);
    }
    static getAllTab(model) {
        return new _accordion_tab_1.AccordionTab('ALL', 'All', new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: []
        }));
    }
    static getContentArrangementTab(model) {
        return new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.ContentArrangement, 'DashboardWebStringId.AccordionTab.Layout', this.getContentArrangementWrapper(model));
    }
    static getCommonWrapper(model, specificProperties = [], specificDisabledRules = {}, specificVisibilityRules = {}) {
        var properties = [
            _dashboard_item_1.showCaption,
            _base_metadata_1.name
        ];
        properties = properties.concat(specificProperties);
        var disabledRules = {};
        Object.keys(specificDisabledRules).forEach((key) => {
            disabledRules[key] = specificDisabledRules[key];
        });
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: properties,
            visibilityFilterRules: specificVisibilityRules,
            disabledFilterRules: disabledRules
        });
    }
    static getCommonMapWrapper(model, propertiesController, specificProperties = []) {
        const editHandler = () => {
            var surface = new _map_custom_shapefile_surface_1.MapCustomShapeFileSurface(model.customShapefile, propertiesController);
            surface.startEditing(new _collection_editor_viewmodel_1.CollectionEditorEditItemArguments());
        };
        const editorOptions = {
            dataSource: Object.keys(_map_item_1.area.values),
            getDisplayText: (item) => _default_1.getLocalizationById(_map_item_1.area.values[item]),
            enableEditItem: (item) => item === 'Custom',
            editItemHandler: editHandler,
            onSelectionChanged: (item) => {
                if (item === 'Custom' && !model.customShapefile.url() && !model.customShapefile.data.shapeData())
                    editHandler();
            },
        };
        var properties = [Object.assign(Object.assign({}, _map_item_1.area), { formAdapterItem: _form_adapter_editors_1.editableListEditor(editorOptions) })].concat(specificProperties);
        return SharedComposers.getCommonWrapper(model, properties);
    }
    static updateValidationMessages(rules) {
        _chart_axis_1.visiblePointsCount.validationRules.forEach((rule) => {
            if (rule.message)
                rule.message = _default_1.getLocalizationById(rule.message);
        });
    }
    static getAxisWrapper(model, axisComputedTitle, alwaysShowZeroLevelInfo, isDateField = false, isNumericField = true, groupInterval = 'None') {
        var disabledRules = {};
        var visibilityRules = {};
        disabledRules[_chart_axis_1.titleVisibleBaseInfo.propertyName] = [_chart_axis_1.axisVisible.propertyName, '=', false];
        disabledRules[_chart_axis_1.title.propertyName] = [[_chart_axis_1.titleVisibleBaseInfo.propertyName, '=', false], 'or', [_chart_axis_1.axisVisible.propertyName, '=', false]];
        disabledRules[_chart_axis_1.logarithmicBase.propertyName] = [_chart_axis_1.logarithmic.propertyName, '=', false];
        disabledRules[_chart_axis_1.limitVisiblePoints.propertyName] = [_chart_axis_1.axisVisible.propertyName, '=', false];
        disabledRules[_chart_axis_1.visiblePointsCount.propertyName] = [[_chart_axis_1.limitVisiblePoints.propertyName, '=', false], 'or', [_chart_axis_1.axisVisible.propertyName, '=', false]];
        disabledRules[_data_item_1.numericFormat.propertyName] = [_data_item_1.numericFormat.propertyName, '=', false];
        disabledRules[_data_item_1.dateTimeFormat.propertyName] = [_data_item_1.dateTimeFormat.propertyName, '=', false];
        this.updateValidationMessages(_chart_axis_1.visiblePointsCount.validationRules);
        var properties = alwaysShowZeroLevelInfo ? [alwaysShowZeroLevelInfo] : [];
        properties = properties.concat([
            _chart_axis_1.reverse,
            _chart_axis_1.showGridLinesBaseInfo,
            _chart_axis_1.axisVisible,
            _chart_axis_1.titleVisibleBaseInfo,
            Object.assign({ editorOptions: { placeholder: axisComputedTitle } }, _chart_axis_1.title),
            _chart_axis_1.logarithmic,
            _chart_axis_1.logarithmicBase,
            _chart_axis_1.enableZooming,
            _chart_axis_1.limitVisiblePoints,
            _chart_axis_1.visiblePointsCount,
        ]);
        if (isDateField) {
            properties.push({
                container: _data_item_1.dateTimeFormat,
                properties: [
                    _data_item_format_1.yearFormat,
                    _data_item_format_1.monthFormat,
                    _data_item_format_1.quarterFormat,
                    _data_item_format_1.dayOfWeekFormat,
                    _data_item_format_1.hourFormat,
                    _data_item_format_1.dateFormat,
                    _data_item_format_1.dateHourFormat,
                    _data_item_format_1.dateHourMinuteFormat,
                    _data_item_format_1.dateTimeWithSecondsFormat,
                    _data_item_format_1.exactDateFormat
                ]
            });
            visibilityRules[_data_item_format_1.yearFormat.propertyName] = () => groupInterval === 'Year';
            visibilityRules[_data_item_format_1.quarterFormat.propertyName] = () => groupInterval === 'Quarter';
            visibilityRules[_data_item_format_1.monthFormat.propertyName] = () => groupInterval === 'Month';
            visibilityRules[_data_item_format_1.hourFormat.propertyName] = () => groupInterval === 'Hour';
            visibilityRules[_data_item_format_1.dayOfWeekFormat.propertyName] = () => groupInterval === 'DayOfWeek';
            visibilityRules[_data_item_format_1.dateFormat.propertyName] = () => groupInterval === 'DayMonthYear';
            visibilityRules[_data_item_format_1.dateHourFormat.propertyName] = () => groupInterval === 'DateHour';
            visibilityRules[_data_item_format_1.dateHourMinuteFormat.propertyName] = () => groupInterval === 'DateHourMinute';
            visibilityRules[_data_item_format_1.dateTimeWithSecondsFormat.propertyName] = () => groupInterval === 'DateHourMinuteSecond';
            visibilityRules[_data_item_format_1.exactDateFormat.propertyName] = () => groupInterval === 'None';
        }
        if (isNumericField) {
            properties.push(Object.assign(Object.assign({ sourceObject: this.getNumericFormatWrapper(model.numericFormat) }, _data_item_1.numericFormat), { displayName: null, formAdapterItem: _form_adapter_editors_1.nestedPropertyGridEditor(_default_1.getLocalizationById(_data_item_1.numericFormat.displayName)) }));
        }
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: properties,
            disabledFilterRules: disabledRules,
            visibilityFilterRules: visibilityRules
        });
    }
    static getLegendWrapper(model) {
        var properties = [
            _chart_legend_1.chartLegendVisible,
            _chart_legend_1.isInsideDiagram,
            _chart_legend_1.insidePosition,
            _chart_legend_1.outsidePosition,
        ];
        var disabledRules = {};
        disabledRules[_chart_legend_1.isInsideDiagram.propertyName] = [_chart_legend_1.chartLegendVisible.propertyName, '=', false];
        disabledRules[_chart_legend_1.insidePosition.propertyName] = [_chart_legend_1.chartLegendVisible.propertyName, '=', false];
        disabledRules[_chart_legend_1.outsidePosition.propertyName] = [_chart_legend_1.chartLegendVisible.propertyName, '=', false];
        var visibleRules = {};
        visibleRules[_chart_legend_1.insidePosition.propertyName] = [_chart_legend_1.isInsideDiagram.propertyName, '=', true];
        visibleRules[_chart_legend_1.outsidePosition.propertyName] = [_chart_legend_1.isInsideDiagram.propertyName, '=', false];
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: [{
                    container: _chart_item_1.chartLegend,
                    properties: properties
                }],
            disabledFilterRules: disabledRules,
            visibilityFilterRules: visibleRules
        });
    }
    static getContentArrangementWrapper(model) {
        var properties = [
            _base_metadata_1.contentArrangementMode,
            _base_metadata_1.contentLineCount
        ];
        var disabledRules = {};
        disabledRules[_base_metadata_1.contentLineCount.propertyName] = [_base_metadata_1.contentArrangementMode.propertyName, '=', 'Auto'];
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: properties,
            disabledFilterRules: disabledRules
        });
    }
    static getLabelsWrapper(model) {
        if (model) {
            let simpleSeries = model instanceof chart_series_1.SimpleSeries ? model : null;
            var properties = [];
            if (model instanceof scatter_chart_item_1.ScatterChartItem) {
                properties.push(_point_label_options_1.showPointLabels);
                properties.push(_scatter_point_label_options_1.content);
            }
            else {
                let isFullStackedSeries = simpleSeries && ['FullStackedBar', 'FullStackedLine', 'FullStackedArea', 'FullStackedSplineArea'].indexOf(simpleSeries.seriesType()) >= 0;
                var avaliablePointLabelContentTypes = isFullStackedSeries ?
                    [
                        { value: model_1.PointLabelContentType.Argument, displayValueId: 'DashboardStringId.PointLabelContentTypeArgument' },
                        { value: model_1.PointLabelContentType.SeriesName, displayValueId: 'DashboardStringId.PointLabelContentTypeSeriesName' },
                        { value: model_1.PointLabelContentType.Value, displayValueId: 'DashboardStringId.PointLabelContentTypeValue' },
                        { value: model_1.PointLabelContentType.Percent, displayValueId: 'DashboardStringId.PointLabelContentTypePercent' }
                    ]
                    :
                        [
                            { value: model_1.PointLabelContentType.Argument, displayValueId: 'DashboardStringId.PointLabelContentTypeArgument' },
                            { value: model_1.PointLabelContentType.SeriesName, displayValueId: 'DashboardStringId.PointLabelContentTypeSeriesName' },
                            { value: model_1.PointLabelContentType.Value, displayValueId: 'DashboardStringId.PointLabelContentTypeValue' }
                        ];
                properties.push(Object.assign(Object.assign({}, _point_label_options_1.contentType), { formAdapterItem: _form_adapter_editors_1.flagsEnumListEditor({
                        values: avaliablePointLabelContentTypes,
                        enumDeclaration: model_1.PointLabelContentType
                    }) }));
            }
            properties = properties.concat([
                _point_label_options_1.overlappingMode,
                _point_label_options_1.pointLabelOrientation
            ]);
            if (simpleSeries && simpleSeries.seriesType().indexOf('Bar') > -1) {
                properties.push(_point_label_options_1.showForZeroValues);
                properties.push(_point_label_options_1.position);
            }
            if (model instanceof scatter_chart_item_1.ScatterChartItem) {
                properties.push(_point_label_options_1.position);
            }
            return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
                model: model,
                properties: [{
                        container: _chart_series_1.chartSeriesPointLabelOptions,
                        properties: properties
                    }],
                summary: ko.computed(() => (model.pointLabelOptions && model.pointLabelOptions.showPointLabels()) ? 'DashboardWebStringId.ButtonOn' : '')
            });
        }
        return null;
    }
    static getAttributeNamesSerializationInfo(model, propertyInfo, includeNoneValue = true, noneValueCaption = 'DashboardStringId.MapShapeNoneAttribute') {
        var attributeNames = _knockout_utils_1.safeComputed({ attributeNames: model._shapeFilesAttributeNameList }, args => {
            var attributes = args.attributeNames.map(attr => { return { value: attr, displayValueId: attr }; });
            if (includeNoneValue) {
                attributes.splice(0, 0, {
                    value: '',
                    displayValueId: noneValueCaption
                });
            }
            return attributes;
        });
        var info = Object.assign(Object.assign({}, propertyInfo), { formAdapterItem: _form_adapter_editors_1.dynamicSelectBoxEditor({ values: attributeNames }) });
        return info;
    }
    static getShapeTitleSerializationInfo(model) {
        return SharedComposers.getAttributeNamesSerializationInfo(model, _map_item_1.shapeTitleAttributeName);
    }
    static getColorLegendWrapper(model) {
        var properties = [
            _map_legend_1.legendVisible,
            _map_legend_1.legendPosition
        ];
        var disabledRules = {};
        disabledRules[_map_legend_1.legendPosition.propertyName] = [_map_legend_1.legendVisible.propertyName, '=', false];
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: [{
                    container: _map_item_1.colorLegend,
                    properties: properties
                }],
            disabledFilterRules: disabledRules
        });
    }
    static getWeightedLegendWrapper(model) {
        var properties = [
            _map_legend_1.weightedLegendVisible,
            _map_legend_1.legendType,
            _map_legend_1.legendPosition
        ];
        var disabledRules = {};
        disabledRules[_map_legend_1.legendType.propertyName] = [_map_legend_1.weightedLegendVisible.propertyName, '=', false];
        disabledRules[_map_legend_1.legendPosition.propertyName] = [_map_legend_1.weightedLegendVisible.propertyName, '=', false];
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: [{
                    container: _map_item_1.weightedLegend,
                    properties: properties
                }],
            disabledFilterRules: disabledRules
        });
    }
    static getNumericFormatWrapper(model) {
        var measuredInUnits = (numericFormat) => {
            return numericFormat.formatType() === 'Number' || numericFormat.formatType() === 'Currency';
        };
        var notCustomizedFormat = (numericFormat) => {
            return numericFormat.formatType() === 'Auto' || numericFormat.formatType() === 'General';
        };
        var isCustomFormat = (numericFormat) => {
            return numericFormat.formatType() === 'Custom';
        };
        var disabledRules = {};
        disabledRules[_data_item_format_1.unit.propertyName] = (numericFormat) => !measuredInUnits(numericFormat);
        disabledRules[_data_item_format_1.precision.propertyName] = (numericFormat) => {
            return notCustomizedFormat(numericFormat) || (measuredInUnits(numericFormat) && numericFormat.unit() === 'Auto');
        };
        disabledRules[_data_item_format_1.includeGroupSeparator.propertyName] = (numericFormat) => {
            return notCustomizedFormat(numericFormat) || numericFormat.formatType() === 'Scientific';
        };
        disabledRules[_data_item_format_1.dataItemCurrencyCultureName.propertyName] = (numericFormat) => numericFormat.formatType() !== 'Currency';
        const visibilityFilterRules = {};
        visibilityFilterRules[_data_item_format_1.unit.propertyName] = (model) => !isCustomFormat(model);
        visibilityFilterRules[_data_item_format_1.precision.propertyName] = (model) => !isCustomFormat(model);
        visibilityFilterRules[_data_item_format_1.includeGroupSeparator.propertyName] = (model) => !isCustomFormat(model);
        visibilityFilterRules[_data_item_format_1.dataItemCurrencyCultureName.propertyName] = (model) => !isCustomFormat(model);
        visibilityFilterRules[_data_item_format_1.customFormatString.propertyName] = (model) => isCustomFormat(model);
        var properties = [
            _data_item_format_1.formatType,
            _data_item_format_1.unit,
            _data_item_format_1.precision,
            _data_item_format_1.includeGroupSeparator,
            Object.assign(Object.assign({}, _data_item_format_1.dataItemCurrencyCultureName), { formAdapterItem: _form_adapter_editors_1.currencyEditor() }),
            _data_item_format_1.customFormatString
        ];
        if (legacy_settings_1.DashboardPrivateSettings.customNumericFormatMode !== 'Enabled') {
            var restrictedFormatTypeValues = (Object.assign({}, _data_item_format_1.formatTypeValues));
            delete restrictedFormatTypeValues['Custom'];
            properties = [
                Object.assign(Object.assign({}, _data_item_format_1.formatType), { values: Object.assign({}, restrictedFormatTypeValues) }),
                ...properties.filter(p => p.propertyName !== _data_item_format_1.formatType.propertyName && p.propertyName !== _data_item_format_1.customFormatString.propertyName)
            ];
        }
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: properties,
            disabledFilterRules: disabledRules,
            visibilityFilterRules: visibilityFilterRules,
            summary: ko.pureComputed(() => notCustomizedFormat(model) ? '' : (_data_item_format_1.formatTypeValues[model.formatType()] || model.formatType()))
        });
    }
    static getDeltaOptionsWrapper(model) {
        var disabledRules = {};
        disabledRules[_delta_options_1.resultIndicationThresholdType.propertyName] = (deltaOptions) => deltaOptions.resultIndicationMode() === 'NoIndication';
        disabledRules[_delta_options_1.resultIndicationThreshold.propertyName] = (deltaOptions) => deltaOptions.resultIndicationMode() === 'NoIndication';
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: [],
            disabledFilterRules: disabledRules
        });
    }
    static getDeltaFormatsOptionsWrapper(model, editFormat = (model) => { }, ...additionalFormats) {
        var formats = this.getDeltaFormats(model);
        additionalFormats.forEach(format => formats.push(format));
        const collectionEditorOptions = {
            propertyName: 'title',
            editItemHandler: editFormat,
            allowAddItem: false,
            allowReorderItem: false,
            allowRemoveItem: false
        };
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: { deltaFormats: ko.observableArray(formats) },
            properties: [{
                    formAdapterItem: _form_adapter_editors_1.collectionEditor(collectionEditorOptions),
                    propertyName: 'deltaFormats'
                }]
        });
    }
    static getDeltaFormats(kpiElement) {
        var formats = [];
        var actualValueFormat = kpiElement.actualValue() ? kpiElement.actualValue().numericFormat : null;
        var targetValueFormat = kpiElement.targetValue() ? kpiElement.targetValue().numericFormat : null;
        actualValueFormat && formats.push({ title: _default_1.getLocalizationById('DashboardStringId.DeltaValueTypeActualValueCaption'), numericFormat: actualValueFormat });
        targetValueFormat && formats.push({ title: _default_1.getLocalizationById('DashboardStringId.CardRowDataElementTypeTargetValueCaption'), numericFormat: targetValueFormat });
        return formats.concat([
            { title: _default_1.getLocalizationById('DashboardStringId.DeltaValueTypeAbsoluteVariationCaption'), numericFormat: kpiElement.absoluteVariationNumericFormat },
            { title: _default_1.getLocalizationById('DashboardStringId.DeltaValueTypePercentVariationCaption'), numericFormat: kpiElement.percentVariationNumericFormat },
            { title: _default_1.getLocalizationById('DashboardStringId.DeltaValueTypePercentOfTargetCaption'), numericFormat: kpiElement.percentOfTargetNumericFormat }
        ]);
    }
    static getCustomRangesWrapper(model, editRuleHandler, dataSourceBrowser, dimension) {
        let namePrefix = _default_1.getLocalizationById('DashboardStringId.DefaultPeriodName') + ' ';
        let isDateTimePeriodsPropertyVisible = ko.observable(false);
        let visibilityRules = {};
        visibilityRules[_range_filter_item_1.dateTimePeriods.propertyName] = () => {
            return isDateTimePeriodsPropertyVisible();
        };
        ko.computed(() => {
            if (dimension()) {
                dataSourceBrowser.findDataField(model.dataSource(), model.dataMember(), dimension().dataMember()).done((dataField) => {
                    isDateTimePeriodsPropertyVisible(dataField && dataField.fieldType() === 'DateTime');
                });
            }
        });
        const customItemTemplate = (itemData, itemIndex, itemElement) => {
            const name = ko.unwrap(itemData.name);
            const div = document.createElement('div');
            div.innerText = name;
            div.style.fontWeight = model.defaultDateTimePeriodName() === name ? '800' : 'normal';
            itemElement.appendChild(div);
            return div;
        };
        const refreshCallback = new _collection_editor_viewmodel_base_1.CollectionEditorRefreshCallback();
        const subscriptions = [];
        subscriptions.push(_knockout_utils_1.safeSubscribe({ defaultPeriod: model.defaultDateTimePeriodName }, _ => refreshCallback.refresh()));
        subscriptions.push(_knockout_utils_1.subscribeToArrayItemProperties(model.dateTimePeriods, (period) => period.name.subscribe(() => refreshCallback.refresh())));
        const collectionEditorOptions = {
            propertyName: 'name',
            createNewItemHandler: () => new date_time_period_1.DateTimePeriod({ '@ItemType': 'DateTimePeriod', '@Name': _helper_classes_1.NameGenerator.generateName(namePrefix, model.dateTimePeriods(), 'name', 1) }),
            editItemHandler: editRuleHandler,
            customTemplate: customItemTemplate,
            forceRefreshCallback: refreshCallback,
        };
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            visibilityFilterRules: visibilityRules,
            properties: [Object.assign(Object.assign({}, _range_filter_item_1.dateTimePeriods), { formAdapterItem: _form_adapter_editors_1.collectionEditor(collectionEditorOptions) })],
            disposableModelSubscriptions: subscriptions,
        });
    }
    static getSparklineOptionsProperties() {
        let viewTypesMap = {
            'Line': {
                icon: 'dx-dashboard-chart-series-line',
                displayName: 'DashboardStringId.SparklineIndicationModeLine'
            },
            'Area': {
                icon: 'dx-dashboard-chart-series-area',
                displayName: 'DashboardStringId.SparklineIndicationModeArea'
            },
            'Bar': {
                icon: 'dx-dashboard-chart-series-bar',
                displayName: 'DashboardStringId.SparklineIndicationModeBar'
            },
            'WinLoss': {
                icon: 'dx-dashboard-sparkline-win-loss',
                displayName: 'DashboardStringId.SparklineIndicationModeWinLoss'
            }
        };
        return [
            Object.assign(Object.assign({}, _sparkline_options_1.viewType), { formAdapterItem: _form_adapter_editors_1.iconTypeEditor({ containersMap: viewTypesMap }) }),
            _sparkline_options_1.highlightMinMaxPoints,
            _sparkline_options_1.highlightStartEndPoints
        ];
    }
}
exports.SharedComposers = SharedComposers;
