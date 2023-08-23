/**
* DevExpress Dashboard (_item-filter-items-provider.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemFilterItemsProvider = exports.isCategoricalDateTime = exports.getRealDimensionType = void 0;
const date_1 = require("devextreme/localization/date");
const _data_source_browser_1 = require("../../common/_data-source-browser");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const data_item_1 = require("../../model/data-item/data-item");
const dimension_1 = require("../../model/data-item/dimension");
const _data_field_1 = require("../../model/data-sources/_data-field");
const _display_name_provider_1 = require("../_display-name-provider");
const _filter_utils_1 = require("./_filter-utils");
var getRealDimensionType = (dimension, dataField) => {
    return exports.isCategoricalDateTime(dimension, dataField) ? 'Integer' : dataField.fieldType();
};
exports.getRealDimensionType = getRealDimensionType;
var isCategoricalDateTime = (dimension, dataField) => {
    return dataField.fieldType() === 'DateTime' && ['Year', 'Quarter', 'Month', 'Day', 'Hour', 'Minute', 'Second',
        'DayOfYear', 'DayOfWeek', 'WeekOfYear', 'WeekOfMonth'].indexOf(dimension.dateTimeGroupInterval() || 'Year') !== -1;
};
exports.isCategoricalDateTime = isCategoricalDateTime;
class ItemFilterItemsProvider {
    constructor(dataItemValuesProvider, dataFieldProvider, parameters, dataDashboardItem, filterPredicate = () => true) {
        this.dataItemValuesProvider = dataItemValuesProvider;
        this.dataFieldProvider = dataFieldProvider;
        this.parameters = parameters;
        this.dataDashboardItem = dataDashboardItem;
        this.filterPredicate = filterPredicate;
    }
    getItems(pathRequest) {
        var deferred = _jquery_helpers_1.createJQueryDeferred();
        if (pathRequest.fullPath === 'Parameters') {
            deferred.resolve(this.parameters()
                .map(parameter => {
                return {
                    displayName: parameter.name(),
                    name: parameter.name()
                };
            }));
        }
        else {
            this._getDashboardItemDataFields().done(dataFields => {
                deferred.resolve(this.dataDashboardItem
                    ._uniqueDataItems
                    .filter(this.filterPredicate)
                    .map(dataItem => {
                    let dataField = dataFields.filter(dataField => dataField.dataMember() === dataItem.dataMember())[0];
                    let itemType = 'string';
                    if (dataField) {
                        itemType = dataItem instanceof dimension_1.Dimension ? exports.getRealDimensionType(dataItem, dataField) : dataField.fieldType();
                    }
                    return {
                        displayName: _display_name_provider_1.getDataItemDisplayName(this.dataFieldProvider, this.dataDashboardItem, dataItem),
                        name: dataItem.uniqueName(),
                        specifics: data_item_1.DataItem.typesMap[itemType] || 'string'
                    };
                }));
            });
        }
        return deferred.promise();
    }
    getValues(pathRequest) {
        var dataItem = this.dataDashboardItem._dimensions.filter(di => di.uniqueName() === pathRequest.path)[0];
        var def = _jquery_helpers_1.createJQueryDeferred();
        if (!dataItem) {
            return def.resolve([]).promise();
        }
        this._getDashboardItemDataFields()
            .done(dataFields => {
            var dataField = dataFields.filter(dataField => dataField.dataMember() === dataItem.dataMember())[0];
            if (!dataField) {
                return def.resolve([]).promise();
            }
            if (dataItem.dateTimeGroupInterval() === 'DayOfWeek' && dataField.fieldType() === 'DateTime') {
                def.resolve([0, 1, 2, 3, 4, 5, 6].map(index => ({
                    value: index,
                    display: date_1.default.getDayNames(undefined)[index]
                })));
            }
            else if (_data_field_1.IsNumeric(dataField.fieldType()) || _data_field_1.IsTextual(dataField.fieldType()) || exports.isCategoricalDateTime(dataItem, dataField) ||
                dataItem.dateTimeGroupInterval() === 'WeekYear') {
                _filter_utils_1.getValuesList({
                    dataItemValuesProvider: this.dataItemValuesProvider,
                    dataField: dataField,
                    dataItem: dataItem,
                    dataMember: this.dataDashboardItem.dataMember(),
                    dataSource: this.dataDashboardItem.dataSource()
                }).done((res) => def.resolve(res));
            }
            else {
                return def.resolve([]);
            }
        });
        return def.promise();
    }
    _getDashboardItemDataFields() {
        let fieldsNames = this.dataDashboardItem
            ._uniqueDataItems
            .filter(this.filterPredicate)
            .map(dataItem => dataItem.dataMember());
        return _data_source_browser_1.getDataFields(fieldsNames, this.dataDashboardItem.dataSource(), this.dataDashboardItem.dataMember(), this.dataFieldProvider);
    }
}
exports.ItemFilterItemsProvider = ItemFilterItemsProvider;
