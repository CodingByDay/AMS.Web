/**
* DevExpress Dashboard (_chart-indicators-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartIndicatorPropertiesComposer = void 0;
const ko = require("knockout");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _chart_utils_1 = require("../../../model/internal/_chart-utils");
const _knockout_utils_1 = require("../../../model/internal/_knockout-utils");
const _chart_indicators_1 = require("../../../model/items/chart/metadata/_chart-indicators");
const _chart_item_1 = require("../../../model/items/chart/metadata/_chart-item");
const _chart_pane_1 = require("../../../model/items/chart/metadata/_chart-pane");
const _form_adapter_editors_1 = require("../../form-adapter/_form-adapter-editors");
const _object_properties_wrapper_1 = require("../../form-adapter/_object-properties-wrapper");
const _collection_editor_viewmodel_base_1 = require("../../ui-widgets/collection-editor/_collection-editor-viewmodel-base");
function updateValueLevelIems(model, dashboardItem) {
    const currentValueLevel = model.valueLevel();
    const valueLevelIems = _chart_utils_1.getAvailableValueLevels(model.value.peek(), dashboardItem);
    if (valueLevelIems.length && (!currentValueLevel || valueLevelIems.filter(item => item.value === currentValueLevel).length === 0)) {
        model.valueLevel(valueLevelIems[0].value);
    }
    return valueLevelIems || [];
}
function updateDisplayName(model, dashboardItem, dataSourceBrowser) {
    let seriesDataId = model.value();
    let legendText = model.legendText();
    if (legendText || seriesDataId) {
        let displayName = legendText;
        if (!displayName && seriesDataId) {
            displayName = _chart_utils_1.getIndicatorDisplayNameFromSeries(model, dashboardItem, dataSourceBrowser);
        }
        model.displayName(displayName);
    }
}
class ChartIndicatorPropertiesComposer {
    static getIndicatorsWrapper(model, createIndicatorDelegate, editHandler) {
        const subscriptions = [];
        const refreshCallback = new _collection_editor_viewmodel_base_1.CollectionEditorRefreshCallback();
        subscriptions.push(_knockout_utils_1.subscribeToArrayItemProperties(model.indicators, (indicator) => indicator.name.subscribe(() => refreshCallback.refresh())));
        var collectionEditorOptions = {
            createNewItemHandler: createIndicatorDelegate,
            propertyName: _chart_pane_1.chartPaneName.propertyName,
            editItemHandler: editHandler,
            visibleItemsFilter: () => true,
            forceRefreshCallback: refreshCallback
        };
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: [Object.assign(Object.assign({}, _chart_item_1.chartIndicators), { formAdapterItem: _form_adapter_editors_1.collectionEditor(collectionEditorOptions) })],
            disposableModelSubscriptions: subscriptions
        });
    }
    static getIndicatorPropertiesWrapper(model, dashboardItem, dataSourceBrowser, requestRecalculation, findExtension) {
        var _a;
        const disposables = [];
        const seriesDataItems = ko.pureComputed(() => {
            const chartSeries = _chart_utils_1.getChartApplyToDataItems(dashboardItem, dataSourceBrowser, _chart_utils_1.getChartSeries)();
            return chartSeries.map((m) => ({ value: ko.unwrap(m.uniqueName), displayValueId: ko.unwrap(m.displayName) }));
        });
        const seriesDataItemNames = seriesDataItems().map(dataItem => ko.unwrap(dataItem.value));
        if (!model.value() && seriesDataItemNames.length) {
            model.value(seriesDataItemNames[0]);
        }
        const valueLevelItems = ko.pureComputed(() => {
            const seriesDataId = model.value();
            if (seriesDataId) {
                return updateValueLevelIems(model, dashboardItem);
            }
            return [];
        });
        if (model.value()) {
            updateValueLevelIems(model, dashboardItem);
            setTimeout(() => {
                requestRecalculation.fire();
            });
        }
        disposables.push(seriesDataItems, valueLevelItems);
        disposables.push(_knockout_utils_1.safeSubscribe({
            seriesDataId: model.value,
            legendText: model.legendText,
            itemType: model.itemType
        }, () => updateDisplayName(model, dashboardItem, dataSourceBrowser)));
        disposables.push(_knockout_utils_1.safeSubscribe({
            typeName: model._typeName
        }, () => model._updateItemType()));
        const seriesDataIdProperty = Object.assign(Object.assign({}, _chart_indicators_1.chartIndicatorValue), { formAdapterItem: _form_adapter_editors_1.dynamicSelectBoxEditor({ values: seriesDataItems }) });
        const valueLevelProperty = Object.assign(Object.assign({}, _chart_indicators_1.chartIndicatorValueLevel), { formAdapterItem: _form_adapter_editors_1.dynamicSelectBoxEditor({ values: valueLevelItems }) });
        const thickness = Object.assign(Object.assign({}, _chart_indicators_1.chartIndicatorThickness), { formAdapterItem: _form_adapter_editors_1.numberBoxEditor({ min: 1, format: '#' }) });
        const customTypeMap = {};
        const indicatorsExtension = findExtension('chartIndicators');
        (_a = indicatorsExtension === null || indicatorsExtension === void 0 ? void 0 : indicatorsExtension.customChartIndicators) === null || _a === void 0 ? void 0 : _a.forEach(indicatorType => {
            customTypeMap[indicatorType.type] = indicatorType.displayName;
        });
        const type = Object.assign(Object.assign({}, _chart_indicators_1.chartIndicatorType), { propertyName: '_typeName', values: _jquery_helpers_1.extend({}, _chart_indicators_1.chartIndicatorType.values, customTypeMap) });
        const properties = [
            _chart_pane_1.chartPaneName, type, seriesDataIdProperty, valueLevelProperty,
            _chart_indicators_1.chartIndicatorValueLevel, _chart_indicators_1.chartIndicatorShowInLegend,
            _chart_indicators_1.chartIndicatorLegendText, _chart_indicators_1.chartIndicatorDashStyle,
            _chart_indicators_1.chartIndicatorColor, thickness, _chart_indicators_1.chartIndicatorVisible
        ];
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: properties,
            disabledFilterRules: {},
            visibilityFilterRules: {},
            disposableModelSubscriptions: disposables
        });
    }
}
exports.ChartIndicatorPropertiesComposer = ChartIndicatorPropertiesComposer;
