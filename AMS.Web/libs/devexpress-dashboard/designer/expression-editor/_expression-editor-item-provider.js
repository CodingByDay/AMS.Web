/**
* DevExpress Dashboard (_expression-editor-item-provider.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionEditorItemsProvider = void 0;
const ko = require("knockout");
const _data_source_browser_1 = require("../../common/_data-source-browser");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const index_internal_1 = require("../../data/index.internal");
const data_item_1 = require("../../model/data-item/data-item");
const olap_data_source_1 = require("../../model/data-sources/olap-data-source");
const _parameters_helper_1 = require("../../model/parameters/_parameters-helper");
class ExpressionEditorItemsProvider {
    constructor(dataFieldsProvider, dataSourceProvider, dataItemValuesProvider, parameters, dataSourceName, dataMember, filterPredicate = () => true) {
        this.dataFieldsProvider = dataFieldsProvider;
        this.dataSourceProvider = dataSourceProvider;
        this.dataItemValuesProvider = dataItemValuesProvider;
        this.parameters = parameters;
        this.dataSourceName = dataSourceName;
        this.dataMember = dataMember;
        this.filterPredicate = filterPredicate;
    }
    getValues(pathRequest) {
        const deferred = _jquery_helpers_1.createJQueryDeferred();
        this.dataFieldsProvider.findDataField(this.dataSourceName(), this.dataMember(), pathRequest.path).done((res) => {
            var _a;
            deferred.resolve((((_a = res['_model']) === null || _a === void 0 ? void 0 : _a.EditorValues) || []).map(x => ({
                value: x,
                display: x
            })));
        });
        return deferred.promise();
    }
    getItems(pathRequest) {
        var items = [], fullPath = pathRequest.fullPath && pathRequest.fullPath.toLowerCase() || '';
        if (fullPath === '') {
            items = [{
                    displayName: index_internal_1.getLocalizationById('DashboardWebStringId.DashboardParameters'),
                    name: 'Parameters',
                    isList: true,
                    specifics: 'parameters'
                }];
        }
        else if (fullPath === 'parameters') {
            items = (this.parameters && this.parameters || []).map(parameter => {
                const parameterType = _parameters_helper_1.ParameterHelper.typeValues.filter(item => item.value === parameter.type())[0];
                const parameterSpecific = parameterType && parameterType.specifics || 'Default';
                return {
                    displayName: parameter.name(),
                    name: parameter.name(),
                    isList: false,
                    specifics: parameterSpecific
                };
            });
        }
        else {
            var deferred = _jquery_helpers_1.createJQueryDeferred(), fieldPath = pathRequest.path, dataSource = this.dataSourceProvider.findDataSource(this.dataSourceName());
            if (!!this.dataMember) {
                fieldPath = _data_source_browser_1.trimLeadingPathElement(fieldPath, this.dataMember());
            }
            this.dataFieldsProvider.getDataFieldsArray(this.dataSourceName(), this.dataMember(), fieldPath, _data_source_browser_1.isNonCollectionDataField)
                .done(dataFields => {
                items = dataFields.filter(this.filterPredicate).map(field => {
                    return {
                        displayName: ko.unwrap(field.displayName),
                        name: dataSource instanceof olap_data_source_1.OlapDataSource ? field.dataMember() : field.name(),
                        field: field,
                        isList: !field.isDataFieldNode(),
                        hasItems: !field.isDataFieldNode(),
                        specifics: field.isDataFieldNode() ? data_item_1.DataItem.typesMap[field.fieldType()] || 'Default' : field.isList && field.isList() ? 'List' : 'Default'
                    };
                });
                deferred.resolve(items);
            });
            return deferred.promise();
        }
        return _jquery_helpers_1.createJQueryDeferred().resolve(items).promise();
    }
}
exports.ExpressionEditorItemsProvider = ExpressionEditorItemsProvider;
