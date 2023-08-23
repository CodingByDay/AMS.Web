﻿/**
* DevExpress Dashboard (_data-source-browser.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataFields = exports.isNonCollectionDataField = exports.DataSourceBrowser = exports.getFirstDataMember = exports.findDataMember = exports.isStartedWith = exports.splitFullFieldName = exports.trimLeadingPathElement = exports.patchCalcFieldPath = void 0;
const analytics_data_1 = require("@devexpress/analytics-core/analytics-data");
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const _jquery_helpers_1 = require("../data/_jquery-helpers");
const ef_data_source_1 = require("../model/data-sources/ef-data-source");
const federation_data_source_1 = require("../model/data-sources/federation-data-source");
const mongodb_data_source_1 = require("../model/data-sources/mongodb-data-source");
const object_data_source_1 = require("../model/data-sources/object-data-source");
const sql_data_source_1 = require("../model/data-sources/sql-data-source");
const _data_field_1 = require("../model/data-sources/_data-field");
const _date_utils_1 = require("../model/internal/_date-utils");
const _knockout_utils_1 = require("../model/internal/_knockout-utils");
function patchCalcFieldPath(dataSource, calculatedField, fieldName) {
    if (fieldName.indexOf('Parameters.Parameters.') === 0) {
        return 'Parameters.' + fieldName.split('.')[2];
    }
    if (dataSource instanceof sql_data_source_1.SqlDataSource) {
        var query = dataSource.queries().filter(query => query.name() === calculatedField.dataMember())[0];
        if (!!query && query instanceof analytics_data_1.TableQuery) {
            var table = query.tables().filter(table => fieldName.indexOf((table.alias() || table.name()) + '.') === 0)[0];
            if (!!table) {
                return trimLeadingPathElement(fieldName, table.alias() || table.name());
            }
        }
    }
    return fieldName;
}
exports.patchCalcFieldPath = patchCalcFieldPath;
function trimLeadingPathElement(path = '', element) {
    var str = path;
    if (path.indexOf(element) === 0) {
        str = path.substring(element.length);
    }
    return str[0] === '.' ? str.substring(1) : str;
}
exports.trimLeadingPathElement = trimLeadingPathElement;
function splitFullFieldName(fullFieldName) {
    let parts = fullFieldName.split('.');
    return {
        path: parts.slice(0, parts.length - 1).join('.'),
        name: parts[parts.length - 1] || ''
    };
}
exports.splitFullFieldName = splitFullFieldName;
function isStartedWith(path, value) {
    return path.indexOf(value) === 0 && (path.length === value.length || path[value.length] === '.');
}
exports.isStartedWith = isStartedWith;
function findDataMember(dataSource, path) {
    var dataMember = '';
    var fieldPath = path;
    if (dataSource instanceof sql_data_source_1.SqlDataSource) {
        let query = dataSource.queries().filter(q => isStartedWith(path, q.name()))[0];
        if (!!query) {
            dataMember = query.name();
            fieldPath = trimLeadingPathElement(path, dataMember);
        }
    }
    else if (dataSource instanceof ef_data_source_1.EFDataSource) {
        let table = dataSource._tables().filter(t => isStartedWith(path, t.dataMember()))[0];
        if (!!table) {
            dataMember = table.dataMember();
            fieldPath = trimLeadingPathElement(path, dataMember);
        }
    }
    else if (dataSource instanceof federation_data_source_1.FederationDataSource) {
        let query = dataSource.queries().filter(q => isStartedWith(path, q.alias()))[0];
        if (!!query) {
            dataMember = query.alias();
            fieldPath = trimLeadingPathElement(path, dataMember);
        }
    }
    else if (dataSource instanceof mongodb_data_source_1.MongoDBDataSource) {
        let query = dataSource.queries().filter(q => isStartedWith(path, q._actualName()))[0];
        if (!!query) {
            dataMember = query._actualName();
            fieldPath = trimLeadingPathElement(path, dataMember);
        }
    }
    return {
        dataMember: dataMember,
        fieldPath: fieldPath
    };
}
exports.findDataMember = findDataMember;
function getFirstDataMember(dataSource) {
    if (dataSource instanceof sql_data_source_1.SqlDataSource && dataSource.queries().length > 0) {
        return dataSource.queries()[0].name();
    }
    else if (dataSource instanceof ef_data_source_1.EFDataSource && dataSource._tables().length > 0) {
        return dataSource._tables()[0].dataMember();
    }
    else if (dataSource instanceof federation_data_source_1.FederationDataSource && dataSource.queries().length > 0) {
        return dataSource.queries()[0].alias();
    }
    else if (dataSource instanceof mongodb_data_source_1.MongoDBDataSource && dataSource.queries().length > 0) {
        return dataSource.queries()[0]._actualName();
    }
    else if (dataSource instanceof object_data_source_1.ObjectDataSource)
        return undefined;
    throw new Error();
}
exports.getFirstDataMember = getFirstDataMember;
class DataSourceBrowser {
    constructor(_dataSources, isDesignMode, parameters, _serviceClient, isLoading = ko.observable(false)) {
        this._dataSources = _dataSources;
        this.isDesignMode = isDesignMode;
        this.parameters = parameters;
        this._serviceClient = _serviceClient;
        this.isLoading = isLoading;
        this._disposables = [];
        this._dynamicParametersValueCache = {};
        this._dimensionValuesCache = {};
        this._fieldsCache = {};
        this.removeDataSource = (dataSource) => {
            this._dataSources.remove(dataSource);
            this.clearFieldsCache(dataSource.componentName());
        };
        if (isDesignMode()) {
            this._subscribeDataSources();
        }
        this._disposables.push(this.isDesignMode.subscribe(isDesignMode => {
            if (isDesignMode) {
                this._subscribeDataSources();
            }
            else {
                this._unsubscribeDataSources();
            }
        }));
    }
    _cacheNestedFields(path, field) {
        if (field.childNodes().length > 0 && !!field.childNodes()[0].dataMember()) {
            var nestedPath = !!path ? path + '.' + field.dataMember() : field.dataMember();
            this._fieldsCache[nestedPath] = _jquery_helpers_1.createJQueryDeferred().resolve(field.childNodes()).promise();
            field.childNodes().forEach(member => this._cacheNestedFields(nestedPath, member));
        }
    }
    _findInFieldsCache(dataSourceName, dataMemberName, fieldName, constraint, separateGroupFields) {
        var deferred = _jquery_helpers_1.createJQueryDeferred();
        var result = { path: '', field: undefined };
        var keys = Object.keys(this._fieldsCache);
        var fieldPath = dataMemberName ? [dataSourceName, dataMemberName].join('.') : dataSourceName;
        var i = 0;
        var findPromises = [];
        while (!result.field && i < keys.length) {
            var path = keys[i];
            if (path === fieldPath || path.indexOf(fieldPath + '.') === 0) {
                var a = (notClosuredPath, notClosuredFieldPath) => {
                    return (fields) => {
                        let filteredFields = fields.filter(isNonCollectionDataField);
                        for (let i = 0; i < filteredFields.length; i++) {
                            let field = filteredFields[i];
                            var foundField = field.dataMember() === fieldName && constraint(field) ? field : undefined;
                            var groupDataItems = field['groupDataItems'];
                            if ((!foundField || separateGroupFields) && !!groupDataItems && groupDataItems.length > 0) {
                                let foundGroupField = groupDataItems.filter((groupField) => groupField.dataMember() === fieldName)[0];
                                if (foundGroupField) {
                                    foundField = separateGroupFields ? foundGroupField : field;
                                }
                            }
                            if (!!foundField) {
                                result.path = notClosuredPath.substr(notClosuredFieldPath.length).split('.').filter(item => !!item).join('.');
                                result.field = foundField;
                                deferred.resolve(result);
                                break;
                            }
                        }
                    };
                };
                findPromises.push(this._fieldsCache[path].done(a(path, fieldPath)));
            }
            i++;
        }
        _jquery_helpers_1.jqueryWhenArray(findPromises).done(function () {
            if (!result.field) {
                deferred.resolve(result);
            }
        });
        return deferred.promise();
    }
    getDimensionFilterItems(dashboardItem, dimensionDataMember, previousState, branch) {
        var deferred = _jquery_helpers_1.createJQueryDeferred();
        var result = deferred.promise();
        if (!!dashboardItem && !!dimensionDataMember) {
            this._serviceClient.peek().getDimensionFilterItems(dashboardItem, dimensionDataMember, previousState, branch).done((list) => {
                deferred.resolve(list);
            }).fail(() => {
                deferred.resolve([]);
            });
        }
        else {
            deferred.resolve([]);
        }
        return result;
    }
    getDimensionFilterString(dashboardItem, dimensionDataMember, previousState) {
        var deferred = _jquery_helpers_1.createJQueryDeferred();
        var result = deferred.promise();
        if (!!dashboardItem && !!dimensionDataMember) {
            this._serviceClient.peek().getDimensionFilterString(dashboardItem, dimensionDataMember, previousState).done((filterString) => {
                deferred.resolve(filterString);
            }).fail(() => {
                deferred.resolve('');
            });
        }
        else {
            deferred.resolve('');
        }
        return result;
    }
    getDataFieldsArray(dataSourceName, dataMember, fieldPath, filterDelegate = () => true) {
        var id = !!dataMember ? [dataSourceName, dataMember].join('.') : dataSourceName;
        id = !!fieldPath ? [id, fieldPath].join('.') : id;
        var dataSource = this.findDataSource(dataSourceName);
        if (!dataSource) {
            return _jquery_helpers_1.createJQueryDeferred().resolve([]).promise();
        }
        dataSource.calculatedFields().forEach(calcField => {
            var expression = calcField.expression();
            var fieldType = calcField.fieldType();
            var name = calcField.name();
        });
        var result = _jquery_helpers_1.createJQueryDeferred();
        var parentRequests = Object.keys(this._fieldsCache)
            .filter(cachedKey => id.indexOf(cachedKey) === 0)
            .map(cachedKey => this._fieldsCache[cachedKey]);
        if (parentRequests.length === 0) {
            parentRequests = [_jquery_helpers_1.createJQueryDeferred().resolve().promise()];
        }
        _jquery_helpers_1.jqueryWhenArray(parentRequests).done(() => {
            var cachedValue = this._fieldsCache[id];
            if (cachedValue) {
                cachedValue.done((dataFields) => {
                    result.resolve(dataFields.filter(filterDelegate));
                });
            }
            else {
                if (!!dataSourceName && !!dataSource && !!this._serviceClient) {
                    let valueToCache = _jquery_helpers_1.createJQueryDeferred();
                    this._fieldsCache[id] = valueToCache.promise();
                    setTimeout(() => {
                        this._serviceClient.peek().getFieldList(dataSource, dataMember, fieldPath).done((list) => {
                            var members = [];
                            (list || []).forEach(field => {
                                var dataField = new _data_field_1.DataField(field);
                                members.push(dataField);
                                this._cacheNestedFields(id, dataField);
                            });
                            if (!fieldPath) {
                                members = members
                                    .sort((f1, f2) => f1.displayName().localeCompare(f2.displayName()));
                            }
                            valueToCache
                                .resolve(members)
                                .done((dataFields) => result.resolve(dataFields.filter(filterDelegate)));
                        }).fail(() => {
                            valueToCache
                                .resolve([])
                                .done(dataFields => {
                                result.resolve(dataFields);
                            });
                        });
                    }, 1);
                }
                else {
                    result.resolve([]);
                }
            }
        });
        return result.promise();
    }
    isFolder(path) {
        return !!this._fieldsCache[path];
    }
    findPathToFieldInTree(dataSourceName, dataMemberName, fieldName, constraint) {
        var deferred = _jquery_helpers_1.createJQueryDeferred();
        this.getDataFieldsArray(dataSourceName, dataMemberName, '', isNonCollectionDataField).done(() => {
            this._findInFieldsCache(dataSourceName, dataMemberName, fieldName, constraint, false).done(info => deferred.resolve(info.path));
        });
        return deferred.promise();
    }
    findDataField(dataSourceName, dataMemberName, fullFieldName, separateGroupFields = false) {
        var deferred = _jquery_helpers_1.createJQueryDeferred();
        let dataSource = this._dataSources().filter(ds => ds.componentName() === dataSourceName)[0];
        let info = {
            path: '',
            name: fullFieldName
        };
        if (dataSource instanceof object_data_source_1.ObjectDataSource || dataSource instanceof ef_data_source_1.EFDataSource) {
            info = splitFullFieldName(fullFieldName);
        }
        this.getDataFieldsArray(dataSourceName, dataMemberName, info.path, isNonCollectionDataField).done(() => {
            this._findInFieldsCache(dataSourceName, dataMemberName, fullFieldName, (field) => true, separateGroupFields).done(info => deferred.resolve(info.field));
        });
        return deferred.promise();
    }
    fuzzyFindFields(startPath, searchFor) {
        var deferred = _jquery_helpers_1.createJQueryDeferred(), result = [], findPromises = [];
        var strContains = (str, substr) => str.toLowerCase().indexOf(substr.toLowerCase()) !== -1;
        Object.keys(this._fieldsCache).forEach(path => {
            if (path === startPath || path.indexOf(startPath + '.') === 0) {
                findPromises.push(this._fieldsCache[path].done(fields => {
                    fields
                        .filter(field => isNonCollectionDataField)
                        .filter(field => strContains(field.dataMember(), searchFor) || strContains(field.displayName(), searchFor))
                        .forEach(field => result.push({ path: path, field: field }));
                }));
            }
        });
        _jquery_helpers_1.jqueryWhenArray(findPromises).done(() => deferred.resolve(result));
        return deferred.promise();
    }
    findDataSource(dsName) {
        return this._dataSources().filter(ds => ds.componentName() === dsName)[0];
    }
    dataMembersSupported(dsc) {
        var dataSource = dsc && this.findDataSource(dsc.dataSource()) || null;
        return dataSource && dataSource.supportDataMembers;
    }
    getDataFields(dsc) {
        var result = ko.observableArray();
        if (dsc) {
            this.getDataFieldsArray(dsc.dataSource(), dsc.dataMember(), '', isNonCollectionDataField).done((members) => {
                result(members.map(member => member.displayName()));
            });
        }
        return result;
    }
    clearFieldsCache(path) {
        Object.keys(this._fieldsCache).forEach(key => {
            if (key === path || key.indexOf(path + '.') === 0) {
                delete this._fieldsCache[key];
            }
        });
    }
    clearDynamicParametersValueCache() {
        this._dynamicParametersValueCache = {};
    }
    clearDimensionValuesCache() {
        this._dimensionValuesCache = {};
    }
    initDataSource(dataSource) {
        if (dataSource instanceof sql_data_source_1.SqlDataSource) {
            this._fieldsCache[dataSource.componentName()] = _jquery_helpers_1.createJQueryDeferred().resolve(dataSource.queries().map((query) => {
                let queryField = new _data_field_1.DataField({ 'DataMember': query.name(), 'Name': query.name(), 'DisplayName': query.name() });
                queryField.hasCalculatedFields = true;
                queryField.isDataSourceNode(true);
                return queryField;
            })).promise();
        }
        else if (dataSource instanceof ef_data_source_1.EFDataSource) {
            this.isLoading(true);
            this.getDataFieldsArray(dataSource.componentName(), '', '', isNonCollectionDataField).done(members => {
                dataSource._tables(members);
                this.isLoading(false);
            });
        }
    }
    getParameterValues(parameterType, dynamicListLookUpSettings) {
        var dsc = dynamicListLookUpSettings;
        var valueMember = dynamicListLookUpSettings.valueMemberName();
        var displayMember = dynamicListLookUpSettings.displayMemberName() || valueMember;
        var sortOrder = dynamicListLookUpSettings.sortOrder();
        var sortByMember = dynamicListLookUpSettings.sortByMember();
        var selectedValues = '';
        if (this.parameters) {
            selectedValues = this.parameters.peek()
                .map(p => {
                return {
                    name: p.name(),
                    value: _date_utils_1.toStringArray(p._actualValue.peek())
                };
            })
                .sort((p1, p2) => p1.name.localeCompare(p2.name))
                .reduce((acc, param) => {
                let value = `${param.name}:${param.value instanceof Array ? param.value.slice().sort().join('|') : param.value}`;
                return !!acc ? `${acc},${value}` : value;
            }, '');
        }
        var key = [parameterType, dsc.dataSource(), dsc.dataMember(), valueMember, displayMember, sortOrder, sortByMember, selectedValues].join('.');
        var parameterValues = this._dynamicParametersValueCache[key];
        if (!parameterValues) {
            parameterValues = ko.observableArray();
            if (!!valueMember && !!displayMember) {
                this._dynamicParametersValueCache[key] = parameterValues;
                this._serviceClient.peek().getParameterValues(dsc.dataSource(), this.findDataSource(dsc.dataSource()), dsc.dataMember(), valueMember, displayMember, sortOrder, sortByMember, parameterType)
                    .done((result) => {
                    parameterValues(result ? result.map(value => ({
                        Value: _date_utils_1.tryConvertToDateTime(value.Value),
                        DisplayText: value.DisplayText
                    })) : undefined);
                    this.dynamicLookUpValuesLoaded && this.dynamicLookUpValuesLoaded(dynamicListLookUpSettings);
                });
            }
        }
        return parameterValues;
    }
    getDimensionUniqueValues(dataSourceName, dataMember, dimension) {
        var def = _jquery_helpers_1.createJQueryDeferred();
        var key = 'DataSource=' + dataSourceName
            + 'DataMember=' + dataMember
            + 'Dimension=' + JSON.stringify(new analytics_utils_1.ModelSerializer({ useRefs: false }).serialize(dimension));
        var dimensionValues = this._dimensionValuesCache[key];
        if (!dimensionValues) {
            dimensionValues = ko.observableArray();
            var dataSource = this.findDataSource(dataSourceName);
            if (!!dataSource && !!dimension) {
                this._dimensionValuesCache[key] = dimensionValues;
                this._serviceClient.peek().getDimensionUniqueValues(dataSource, dataMember, dimension)
                    .done((result) => {
                    if (Array.isArray(result))
                        result = result.map(val => _date_utils_1.tryConvertToDateTime(val));
                    dimensionValues(result);
                    def.resolve(dimensionValues());
                });
            }
        }
        else {
            def.resolve(dimensionValues());
        }
        return def.promise();
    }
    splitFullPath(fullPath = '') {
        var dataSource = '';
        var dataSourceObj = this._dataSources().filter(ds => isStartedWith(fullPath, ds.componentName()))[0];
        if (!!dataSourceObj) {
            dataSource = dataSourceObj.componentName();
        }
        var { dataMember, fieldPath } = findDataMember(dataSourceObj, trimLeadingPathElement(fullPath, dataSource));
        return {
            dataSource: dataSource,
            dataMember: dataMember,
            fieldPath: fieldPath
        };
    }
    _subscribeDataSources() {
        this._dataSources().forEach(dataSource => {
            this.initDataSource(dataSource);
        });
        this._dataSourcesSubscription = _knockout_utils_1.subscribeArrayChange(this._dataSources, {
            added: ds => this.initDataSource(ds),
            deleted: ds => this.clearFieldsCache(ds.componentName())
        });
        this._disposables.push(this._dataSourcesSubscription);
    }
    _unsubscribeDataSources() {
        if (this._dataSourcesSubscription) {
            this._disposables.splice(this._disposables.indexOf(this._dataSourcesSubscription), 1);
            this._dataSourcesSubscription.dispose();
            this._dataSourcesSubscription = undefined;
            this._dataSources().forEach(dataSource => {
                this.clearFieldsCache(dataSource.componentName());
            });
        }
    }
    dispose() {
        this.dynamicLookUpValuesLoaded = null;
        this._disposables.forEach((d) => {
            d.dispose();
        });
    }
}
exports.DataSourceBrowser = DataSourceBrowser;
function isNonCollectionDataField(dataField) {
    if (!dataField)
        return;
    let nodeType = ko.unwrap(dataField.nodeType);
    let childNodes = ko.unwrap(dataField.childNodes);
    let isList = dataField.isList && ko.unwrap(dataField.isList);
    return !(nodeType === 'DataMember' && isList);
}
exports.isNonCollectionDataField = isNonCollectionDataField;
function getDataFields(fieldsNames, dataSource, dataMember, dataFieldProvider) {
    var deferred = _jquery_helpers_1.createJQueryDeferred();
    const promises = fieldsNames.map(field => dataFieldProvider.findDataField(dataSource, dataMember, field, true));
    _jquery_helpers_1.jqueryWhen(...promises).done((...fields) => {
        deferred.resolve(fields.filter(field => !!field));
    });
    return deferred.promise();
}
exports.getDataFields = getDataFields;
