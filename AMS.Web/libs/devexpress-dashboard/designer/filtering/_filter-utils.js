/**
* DevExpress Dashboard (_filter-utils.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createItemFilterOptions = exports.getValuesList = exports.formatValue = void 0;
const analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
const ko = require("knockout");
const _formatter_1 = require("../../data/_formatter");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const data_item_1 = require("../../model/data-item/data-item");
const dimension_1 = require("../../model/data-item/dimension");
const _parameters_helper_1 = require("../../model/parameters/_parameters-helper");
const _dx_designer_integration_1 = require("../_dx-designer-integration");
function formatValue(value, dataItem, fieldTypeName) {
    var getFormatViewModel = (fieldTypeName) => {
        var fieldType = data_item_1.DataItem.typesMap[fieldTypeName];
        switch (fieldType) {
            case data_item_1.DataItem.typesMap.DateTime:
                return dataItem.dateTimeFormat._getViewModel(dataItem instanceof dimension_1.Dimension ? dataItem.dateTimeGroupInterval() : undefined);
            case data_item_1.DataItem.typesMap.Decimal:
            case data_item_1.DataItem.typesMap.Double:
            case data_item_1.DataItem.typesMap.Integer:
                return dataItem.numericFormat._getViewModel();
            default:
                return undefined;
        }
    };
    var formatViewModel = getFormatViewModel(fieldTypeName);
    return !!formatViewModel ? _formatter_1.format(value, formatViewModel) : value;
}
exports.formatValue = formatValue;
var getValuesList = ({ dataItemValuesProvider, dataSource, dataMember, dataField, dataItem }) => {
    var deferred = _jquery_helpers_1.createJQueryDeferred();
    dataItemValuesProvider.getDimensionUniqueValues(dataSource, dataMember, dataItem)
        .done(values => {
        deferred.resolve((values || [])
            .filter(value => value !== null)
            .map(value => {
            if (dataField.fieldType() === 'Text') {
                return value;
            }
            else {
                return {
                    value: value,
                    display: formatValue(value, dataItem, dataField.fieldType())
                };
            }
        }));
    });
    return deferred.promise();
};
exports.getValuesList = getValuesList;
var createItemFilterOptions = (expression, item, _dataSourceBrowser, title) => {
    return ko.computed(() => {
        var options = new analytics_widgets_1.FilterStringOptions(expression, undefined, undefined, title);
        options.popupContainer = '.dx-dashboard-widget-container';
        options.helper.aceTheme = _dx_designer_integration_1.getAceTheme();
        if (_dataSourceBrowser && _dataSourceBrowser.parameters) {
            options.helper.parameters(_dataSourceBrowser.parameters().map(parameter => {
                var shortTypeName = parameter.type().split(',')[0];
                return { displayName: parameter.name(), name: parameter.name(), specifics: _parameters_helper_1.ParameterHelper.typeValues.filter(typeDescription => typeDescription.value === shortTypeName)[0].specifics || 'string' };
            }));
            options.helper.canChoiceParameters = true;
        }
        if (item) {
            options['item'] = item;
        }
        return options;
    });
};
exports.createItemFilterOptions = createItemFilterOptions;
