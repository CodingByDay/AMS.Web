﻿/**
* DevExpress Dashboard (_lookup-values-editors.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multipleLookupValueEditor = exports.singleLookupValueEditor = void 0;
const custom_store_1 = require("devextreme/data/custom_store");
const data_source_1 = require("devextreme/data/data_source");
const tag_box_1 = require("devextreme/ui/tag_box");
const ko = require("knockout");
const _default_1 = require("../../data/localization/_default");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const look_up_value_1 = require("../../model/parameters/look-up-value");
const singleLookupValueEditor = options => context => {
    return {
        editorType: 'dxSelectBox',
        editorOptions: getLookupValueEditorOptions(options.parameter, options.dataSourceBrowser, context.widgetContainer)
    };
};
exports.singleLookupValueEditor = singleLookupValueEditor;
const multipleLookupValueEditor = options => context => {
    return {
        template: (args) => {
            var div = document.createElement('div');
            new tag_box_1.default(div, Object.assign(Object.assign({}, args.editorOptions), getLookupValuesEditorOptions(options.parameter, options.dataSourceBrowser, context.widgetContainer)));
            return div;
        }
    };
};
exports.multipleLookupValueEditor = multipleLookupValueEditor;
function getLookupValueEditorOptions(parameter, dataSourceBrowser, container) {
    let items = ko.observable([]);
    let dataSource = new data_source_1.default({
        store: getSortableCustomStorage(items, 'DisplayText'),
        paginate: true,
        pageSize: 100
    });
    const subscribeDataSource = (e) => {
        const disposables = e.component.__DX_DASHBOARD_DISPOSABLES = (e.component.__DX_DASHBOARD_DISPOSABLES || []);
        disposables.push(ko.computed(() => {
            if (!!parameter.staticListLookUpSettings()) {
                items(parameter.staticListLookUpSettings().values().filter(lookUpValue => !!lookUpValue.value()).map(lookUpValue => { return { Value: lookUpValue.value(), DisplayText: lookUpValue.value() }; }));
            }
            else if (!!parameter.dynamicListLookUpSettings()) {
                const parameterValues = dataSourceBrowser.getParameterValues(parameter.type(), parameter.dynamicListLookUpSettings());
                if (parameterValues().length === 0) {
                    parameterValues.subscribe(newValues => items(newValues));
                }
                else {
                    items(parameterValues());
                }
            }
        }));
        disposables.push(items.subscribe(newItems => {
            dataSource.reload();
        }));
    };
    return {
        dataSource: dataSource,
        searchEnabled: true,
        valueExpr: 'Value',
        searchExpr: ['Value', 'DisplayText'],
        displayExpr: 'DisplayText',
        noDataText: _default_1.getLocalizationById('DashboardStringId.FilterElementNoDataToDisplay'),
        placeholder: _default_1.getLocalizationById('DashboardStringId.ParametersSelectorText'),
        encodeNoDataText: true,
        showClearButton: true,
        multiline: false,
        showSelectionControls: true,
        dropDownOptions: {
            container: container
        },
        onInitialized: subscribeDataSource,
        onDisposing: (e) => {
            (e.component.__DX_DASHBOARD_DISPOSABLES || []).forEach(d => d && d.dispose());
            e.component.__DX_DASHBOARD_DISPOSABLES = [];
        }
    };
}
function getLookupValuesEditorOptions(parameter, dataSourceBrowser, container) {
    return Object.assign(Object.assign({}, getLookupValueEditorOptions(parameter, dataSourceBrowser, container)), { value: parameter._valuesOfDefaultValues.peek(), onValueChanged: (e) => {
            parameter.defaultValues((e.value || []).map(val => {
                let lookUpValue = new look_up_value_1.LookUpValue();
                lookUpValue.value(val);
                return lookUpValue;
            }));
        } });
}
function getSortableCustomStorage(getItems, sortPropertyName) {
    return new custom_store_1.default({
        load: (options) => {
            var result = [].concat(_sortItems(getItems(), sortPropertyName));
            if (options.take)
                result = result.splice(options.skip, options.take);
            return _jquery_helpers_1.$promiseAdapter(_jquery_helpers_1.createJQueryDeferred().resolve(result).promise());
        },
        loadMode: 'raw'
    });
}
function _sortItems(items, sortPropertyName) {
    return items.sort((a, b) => {
        var propA = ko.unwrap(a[sortPropertyName]), propB = ko.unwrap(b[sortPropertyName]);
        if (propA && propB) {
            var diff = propA - propB;
            if (!isNaN(diff))
                return diff;
            propA = propA.toLowerCase ? propA.toLowerCase() : propA;
            propB = propB.toLowerCase ? propB.toLowerCase() : propB;
            return (propA < propB) ? -1 : (propA > propB) ? 1 : 0;
        }
    });
}
