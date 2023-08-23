﻿/**
* DevExpress Dashboard (_calculation-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCalculationArgumentExpression = exports.CalculationPropertiesComposer = void 0;
const ko = require("knockout");
const _helpers_1 = require("../../../common/_helpers");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _helpers_2 = require("../../../model/data-item/_helpers");
const _measure_1 = require("../../../model/data-item/metadata/_measure");
const _expression_utils_1 = require("../../../model/internal/_expression-utils");
const _window_definition_editor_1 = require("../../calculations/_window-definition-editor");
const _expression_editor_display_name_provider_1 = require("../../expression-editor/_expression-editor-display-name-provider");
const _expression_editor_item_provider_1 = require("../../expression-editor/_expression-editor-item-provider");
const _form_adapter_editors_1 = require("../../form-adapter/_form-adapter-editors");
const _object_properties_wrapper_1 = require("../../form-adapter/_object-properties-wrapper");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
class CalculationPropertiesComposer {
    composeTabs(model, args) {
        var commonTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Common, 'DashboardWebStringId.AccordionTab.Common');
        this.fillCommonWrapper(commonTab, model, args.dashboardItem, args.dataSourceBrowser);
        return [commonTab];
    }
    fillCommonWrapper(tab, model, dashboardItem, dataSourceBrowser) {
        var p = [];
        var visibilityRules = {};
        p.push(Object.assign(Object.assign({}, _measure_1.windowDefinition), { formAdapterItem: _window_definition_editor_1.windowDefinitionEditor({ dataDashboardItem: dashboardItem, dataSourceBrowser: dataSourceBrowser }) }));
        if (!model.expression()) {
            p.push({
                container: _measure_1.calculation,
                properties: [{
                        container: (model.calculation.getInfo()[0]),
                        properties: (model.calculation.calculation().getInfo())
                    }]
            });
        }
        var wrapper = new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: p,
            visibilityFilterRules: visibilityRules
        });
        let expressionArgument = ko.observable();
        var getExpression = () => {
            if (!!model.expression()) {
                return model.expression();
            }
            return !!model.calculation.calculation() ? model.calculation.calculation()._getExpression(expressionArgument()) : '';
        };
        getCalculationArgumentExpression(model, dashboardItem, dataSourceBrowser)
            .done(expr => {
            expressionArgument(expr);
        });
        var expression = ko.computed({
            read: getExpression,
            write: (val) => {
                if (val !== getExpression()) {
                    model.expression(val);
                }
            }
        });
        var expressionOptions = {
            value: expression,
            path: ko.observable(dashboardItem.dataMember() ? [dashboardItem.dataSource(), dashboardItem.dataMember()].join('.') : dashboardItem.dataSource()),
            patchFieldName: (fieldPath) => {
                if (fieldPath.indexOf('Parameters.Parameters.') === 0) {
                    return 'Parameters.' + fieldPath.split('.')[2];
                }
                return fieldPath;
            },
        };
        var itemsProvider = new _expression_editor_item_provider_1.ExpressionEditorItemsProvider(dataSourceBrowser, dataSourceBrowser, dataSourceBrowser, dataSourceBrowser.parameters && dataSourceBrowser.parameters(), dashboardItem.dataSource, dashboardItem.dataMember);
        let displayNameProvider = _expression_editor_display_name_provider_1.ExpressionEditorDisplayNameProvider.create(dataSourceBrowser, dataSourceBrowser, dashboardItem.dataSource(), dashboardItem.dataMember());
        const collectionEditorOptions = {
            options: ko.observable(expressionOptions),
            fieldListProvider: ko.observable(itemsProvider),
            displayNameProvider: displayNameProvider
        };
        wrapper.addProperty(ko.observable(), { propertyName: 'expressionOptions', displayName: 'DashboardStringId.CalculationTypeExpression', formAdapterItem: _form_adapter_editors_1.calculationExpressionEditor(collectionEditorOptions) });
        tab.tabModel(wrapper);
    }
}
exports.CalculationPropertiesComposer = CalculationPropertiesComposer;
function getCalculationArgumentExpression(measure, dashboardItem, dataFieldProvider) {
    let deferred = _jquery_helpers_1.createJQueryDeferred();
    let summaryExpression = _helpers_2.getSummaryExpression(measure.dataMember(), measure.summaryType());
    if (!measure.filterString())
        return deferred.resolve(summaryExpression).promise();
    _helpers_1.getDimensionsExpressions(dashboardItem, dataFieldProvider)
        .done(dimnensionsExpressions => {
        let patchedExpression = _expression_utils_1.insertDimensionsExpressionsIntoFilterExpression(measure.filterString(), dimnensionsExpressions);
        deferred.resolve(`filter(${summaryExpression}, ${patchedExpression})`);
    });
    return deferred.promise();
}
exports.getCalculationArgumentExpression = getCalculationArgumentExpression;
