﻿/**
* DevExpress Dashboard (_field-list-provider.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlatteningDataFieldsProviderWrapper = exports.getFieldList = void 0;
const ko = require("knockout");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _utils_1 = require("../../../data/_utils");
const _helper_classes_1 = require("../../../model/internal/_helper-classes");
const _helpers_1 = require("../../_helpers");
function getFieldList(pathRequest, dataFieldsProvider, dataSourceProvider, filterDelegate = (field) => true) {
    _helper_classes_1.Guard.requires(_utils_1.type.isDefined(pathRequest));
    _helper_classes_1.Guard.requires(_utils_1.type.isDefined(dataFieldsProvider));
    _helper_classes_1.Guard.requires(_utils_1.type.isDefined(dataSourceProvider));
    let pathParts;
    let dataSourceComponentName;
    if (pathRequest.ref || pathRequest.id) {
        dataSourceComponentName = pathRequest.ref || pathRequest.id;
        pathParts = [dataSourceComponentName].concat(pathRequest.path ? pathRequest.path.split('.') : []);
    }
    else if (pathRequest.pathParts && pathRequest.pathParts.length > 0) {
        pathParts = pathRequest.pathParts;
        dataSourceComponentName = pathParts[0];
    }
    else {
        pathParts = pathRequest.fullPath ? pathRequest.fullPath.split('.') : [];
        dataSourceComponentName = pathParts[0];
    }
    let dataSource = dataSourceProvider.findDataSource(dataSourceComponentName);
    if (!dataSource)
        throw new Error(`The '${dataSourceComponentName}' DataSource cannot be found.`);
    let dataMember;
    let fieldPath;
    if (dataSource.supportDataMembers) {
        dataMember = pathParts[1] || '';
        fieldPath = pathParts.slice(2).join('.');
    }
    else {
        dataMember = '';
        fieldPath = pathParts.slice(1).join('.');
    }
    let deferred = _jquery_helpers_1.createJQueryDeferred();
    dataFieldsProvider
        .getDataFieldsArray(dataSourceComponentName, dataMember, fieldPath, filterDelegate)
        .done(dataFields => {
        let items = dataFields.map(field => _helpers_1.createDataMemberInfo(field, dataSource));
        deferred.resolve(items);
    });
    return deferred.promise();
}
exports.getFieldList = getFieldList;
class FlatteningDataFieldsProviderWrapper {
    constructor(basic, shouldFlatten = (field) => false) {
        _helper_classes_1.Guard.isNotFalsy(basic, 'The basic fields provider for a flattening fields provider');
        this._basic = basic;
        this._shouldFlatten = shouldFlatten;
    }
    findDataField(dataSourceName, dataMemberName, fullFieldName, hasGroupSeparator) {
        throw new Error('The method is not implemented.');
    }
    getDataFieldsArray(dataSourceName, dataMember, fieldPath, filterDelegate) {
        let deferred = _jquery_helpers_1.createJQueryDeferred();
        let flattenPromises = [];
        let notFlattened = [];
        this._basic.getDataFieldsArray(dataSourceName, dataMember, fieldPath, filterDelegate)
            .done(dataFields => {
            dataFields.forEach(field => {
                if (this._shouldFlatten(field)) {
                    if (field.isDataSourceNode && field.isDataSourceNode())
                        throw new Error('Flattening of the datasource and query nodes is not supported.');
                    let flattenDeferred = _jquery_helpers_1.createJQueryDeferred();
                    flattenPromises.push(flattenDeferred.promise());
                    let fieldName = field.dataMember ? ko.unwrap(field.dataMember) : '';
                    let newDataMember = dataMember || '';
                    let newFieldPath = fieldPath ? (fieldPath + '.' + fieldName) : fieldName;
                    this.getDataFieldsArray(dataSourceName, newDataMember, newFieldPath, filterDelegate)
                        .done(fields => flattenDeferred.resolve(fields))
                        .fail(() => flattenDeferred.reject());
                }
                else {
                    notFlattened.push(field);
                }
            });
            if (flattenPromises.length > 0)
                _jquery_helpers_1.jqueryWhenArray(flattenPromises).done((...flattenedDataFieldsArrays) => {
                    let flattenedDataFields = flattenedDataFieldsArrays.reduce((acc, items) => acc.concat(items), []);
                    deferred.resolve(notFlattened.concat(flattenedDataFields));
                })
                    .fail(() => deferred.reject());
            else
                deferred.resolve(notFlattened);
        });
        return deferred.promise();
    }
}
exports.FlatteningDataFieldsProviderWrapper = FlatteningDataFieldsProviderWrapper;
